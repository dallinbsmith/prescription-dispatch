import {
  apiSuccess,
  apiUnauthorized,
  getPharmacyStaffIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { NextResponse } from "next/server";

type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

type CompoundingStatus = "compounding" | "quality_check" | "packaging";

const VALID_TRANSITIONS: Record<CompoundingStatus, CompoundingStatus[]> = {
  compounding: ["quality_check"],
  quality_check: ["packaging", "compounding"],
  packaging: [],
};

interface CompoundIngredient {
  quantity: string;
  unit: string;
  ingredient: {
    name: string;
  };
}

export const GET = withAuth(async ({ user, params }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Order ID is required" } },
      { status: 400 }
    );
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      patient: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      prescription: {
        select: {
          id: true,
          quantity: true,
          directions: true,
          compound: {
            select: {
              id: true,
              name: true,
              dosageForm: true,
              defaultStrength: true,
              description: true,
              ingredients: {
                select: {
                  quantity: true,
                  unit: true,
                  ingredient: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      statusLogs: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!order) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Order not found" } },
      { status: 404 }
    );
  }

  if (!["compounding", "quality_check"].includes(order.status)) {
    return NextResponse.json(
      { error: { code: "INVALID_STATE", message: "Order is not in compounding stage" } },
      { status: 400 }
    );
  }

  return apiSuccess({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    createdAt: order.createdAt,
    patient: {
      id: order.patient.id,
      name: `${order.patient.firstName} ${order.patient.lastName}`,
    },
    prescription: {
      id: order.prescription.id,
      quantity: order.prescription.quantity,
      directions: order.prescription.directions,
    },
    compound: {
      id: order.prescription.compound.id,
      name: order.prescription.compound.name,
      dosageForm: order.prescription.compound.dosageForm,
      strength: order.prescription.compound.defaultStrength,
      description: order.prescription.compound.description,
      ingredients: order.prescription.compound.ingredients.map((ci: CompoundIngredient) => ({
        name: ci.ingredient.name,
        quantity: ci.quantity,
        unit: ci.unit,
      })),
    },
    statusLogs: order.statusLogs,
  });
});

export const PATCH = withAuth(async ({ user, params, request }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Order ID is required" } },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { status, note } = body as {
    status: CompoundingStatus;
    note?: string;
  };

  if (!status || !["compounding", "quality_check", "packaging"].includes(status)) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Invalid status" } },
      { status: 400 }
    );
  }

  const order = await prisma.order.findUnique({
    where: { id },
    select: { status: true },
  });

  if (!order) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Order not found" } },
      { status: 404 }
    );
  }

  if (!["compounding", "quality_check"].includes(order.status)) {
    return NextResponse.json(
      { error: { code: "INVALID_STATE", message: "Order is not in compounding stage" } },
      { status: 400 }
    );
  }

  const currentStatus = order.status as CompoundingStatus;
  const allowedTransitions = VALID_TRANSITIONS[currentStatus];

  if (!allowedTransitions?.includes(status)) {
    return NextResponse.json(
      {
        error: {
          code: "INVALID_TRANSITION",
          message: `Cannot transition from ${order.status} to ${status}`,
        },
      },
      { status: 400 }
    );
  }

  const updatedOrder = await prisma.$transaction(async (tx: TransactionClient) => {
    const updated = await tx.order.update({
      where: { id },
      data: { status },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        prescription: {
          select: {
            compound: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    await tx.orderStatusLog.create({
      data: {
        orderId: id,
        status,
        note,
        createdBy: userId,
      },
    });

    return updated;
  });

  return apiSuccess({
    id: updatedOrder.id,
    orderNumber: updatedOrder.orderNumber,
    status: updatedOrder.status,
    patient: {
      name: `${updatedOrder.patient.firstName} ${updatedOrder.patient.lastName}`,
    },
    compound: updatedOrder.prescription.compound.name,
  });
});
