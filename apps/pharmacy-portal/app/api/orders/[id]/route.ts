import {
  apiSuccess,
  apiUnauthorized,
  getPharmacyStaffIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { NextResponse } from "next/server";

type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

type OrderStatus =
  | "pending"
  | "processing"
  | "compounding"
  | "quality_check"
  | "packaging"
  | "shipped"
  | "delivered"
  | "cancelled";

const VALID_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["processing", "cancelled"],
  processing: ["compounding", "cancelled"],
  compounding: ["quality_check", "cancelled"],
  quality_check: ["packaging", "compounding"],
  packaging: ["shipped", "quality_check"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

export const GET = withAuth(async ({ user, params }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      patient: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
      prescription: {
        select: {
          id: true,
          quantity: true,
          directions: true,
          refills: true,
          refillsUsed: true,
          prescribedAt: true,
          compound: {
            select: {
              id: true,
              name: true,
              dosageForm: true,
              defaultStrength: true,
            },
          },
          provider: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      shipAddress: true,
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

  return apiSuccess({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    totalAmount: order.totalAmount,
    createdAt: order.createdAt,
    paidAt: order.paidAt,
    shippedAt: order.shippedAt,
    deliveredAt: order.deliveredAt,
    trackingNumber: order.trackingNumber,
    carrier: order.carrier,
    patient: {
      id: order.patient.id,
      name: `${order.patient.firstName} ${order.patient.lastName}`,
      dateOfBirth: order.patient.dateOfBirth,
    },
    prescription: {
      id: order.prescription.id,
      quantity: order.prescription.quantity,
      directions: order.prescription.directions,
      refills: order.prescription.refills,
      refillsUsed: order.prescription.refillsUsed,
      prescribedAt: order.prescription.prescribedAt,
      compound: {
        id: order.prescription.compound.id,
        name: order.prescription.compound.name,
        dosageForm: order.prescription.compound.dosageForm,
        strength: order.prescription.compound.defaultStrength,
      },
      provider: {
        id: order.prescription.provider.id,
        name: `${order.prescription.provider.firstName} ${order.prescription.provider.lastName}`,
      },
    },
    shipAddress: order.shipAddress,
    statusLogs: order.statusLogs,
  });
});

export const PATCH = withAuth(async ({ user, params, request }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { id } = await params;
  const body = await request.json();
  const { status, note, trackingNumber, carrier } = body as {
    status?: OrderStatus;
    note?: string;
    trackingNumber?: string;
    carrier?: string;
  };

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

  if (status) {
    const currentStatus = order.status as OrderStatus;
    const allowedTransitions = VALID_STATUS_TRANSITIONS[currentStatus];
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
  }

  const updateData: Record<string, unknown> = {};

  if (status) {
    updateData.status = status;

    if (status === "shipped") {
      updateData.shippedAt = new Date();
    } else if (status === "delivered") {
      updateData.deliveredAt = new Date();
    }
  }

  if (trackingNumber) {
    updateData.trackingNumber = trackingNumber;
  }

  if (carrier) {
    updateData.carrier = carrier;
  }

  const updatedOrder = await prisma.$transaction(async (tx: TransactionClient) => {
    const updated = await tx.order.update({
      where: { id },
      data: updateData,
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
            compound: {
              select: {
                name: true,
                dosageForm: true,
                defaultStrength: true,
              },
            },
          },
        },
      },
    });

    if (status) {
      await tx.orderStatusLog.create({
        data: {
          orderId: id,
          status,
          note,
          createdBy: userId,
        },
      });
    }

    return updated;
  });

  return apiSuccess({
    id: updatedOrder.id,
    orderNumber: updatedOrder.orderNumber,
    status: updatedOrder.status,
    totalAmount: updatedOrder.totalAmount,
    createdAt: updatedOrder.createdAt,
    trackingNumber: updatedOrder.trackingNumber,
    carrier: updatedOrder.carrier,
    patient: {
      id: updatedOrder.patient.id,
      name: `${updatedOrder.patient.firstName} ${updatedOrder.patient.lastName}`,
    },
    medication: updatedOrder.prescription.compound.name,
  });
});
