import { prisma } from "@rx/database";

type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];
import {
  apiPaginated,
  apiSuccess,
  apiUnauthorized,
  apiBadRequest,
  getPatientIdFromAuth0Id,
  getPatientFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { orderQuerySchema, orderCreateSchema } from "@rx/schemas";

export const GET = withAuth(async ({ user, request }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const { searchParams } = new URL(request.url);
  const query = orderQuerySchema.parse({
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    startDate: searchParams.get("startDate") ?? undefined,
    endDate: searchParams.get("endDate") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: searchParams.get("sortOrder") ?? undefined,
  });

  const where = {
    patientId,
    ...(query.status && { status: query.status }),
    ...(query.startDate && { createdAt: { gte: query.startDate } }),
    ...(query.endDate && { createdAt: { lte: query.endDate } }),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        prescription: {
          select: {
            id: true,
            directions: true,
            compound: {
              select: {
                id: true,
                name: true,
                dosageForm: true,
                defaultStrength: true,
              },
            },
          },
        },
        shipAddress: true,
      },
      orderBy: {
        [query.sortBy ?? "createdAt"]: query.sortOrder,
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    prisma.order.count({ where }),
  ]);

  return apiPaginated(orders, {
    page: query.page,
    pageSize: query.pageSize,
    total,
    hasMore: query.page * query.pageSize < total,
  });
});

export const POST = withAuth(async ({ user, request }) => {
  const patient = await getPatientFromAuth0Id(user.sub);

  if (!patient) {
    return apiUnauthorized("Patient profile not found");
  }

  const body = await request.json();
  const data = orderCreateSchema.parse(body);

  const prescription = await prisma.prescription.findUnique({
    where: { id: data.prescriptionId },
    select: {
      id: true,
      patientId: true,
      refills: true,
      refillsUsed: true,
      status: true,
      compound: {
        select: {
          cashPrice: true,
        },
      },
    },
  });

  if (!prescription) {
    return apiBadRequest("Prescription not found");
  }

  if (prescription.patientId !== patient.id) {
    return apiBadRequest("Prescription not found");
  }

  if (prescription.status === "cancelled") {
    return apiBadRequest("Cannot order from a cancelled prescription");
  }

  const refillsRemaining = prescription.refills - prescription.refillsUsed;
  if (refillsRemaining <= 0) {
    return apiBadRequest("No refills remaining on this prescription");
  }

  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

  const order = await prisma.$transaction(async (tx: TransactionClient) => {
    await tx.prescription.update({
      where: { id: prescription.id },
      data: { refillsUsed: { increment: 1 } },
    });

    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        patientId: patient.id,
        prescriptionId: prescription.id,
        status: "pending",
        totalAmount: prescription.compound.cashPrice ?? 0,
        shipAddress: {
          create: {
            street1: data.shippingAddress.street1,
            street2: data.shippingAddress.street2,
            city: data.shippingAddress.city,
            state: data.shippingAddress.state,
            zipCode: data.shippingAddress.zipCode,
            country: data.shippingAddress.country,
          },
        },
      },
      include: {
        shipAddress: true,
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
        orderId: newOrder.id,
        status: "pending",
        note: "Order created",
      },
    });

    return newOrder;
  });

  return apiSuccess(order, 201);
});
