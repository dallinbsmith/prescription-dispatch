import {
  apiSuccess,
  apiUnauthorized,
  getPharmacyStaffIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: Date;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  prescription: {
    id: string;
    compound: {
      name: string;
      dosageForm: string;
      defaultStrength: string | null;
    };
  };
}

export const GET = withAuth(async ({ user }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const [
    pendingOrdersCount,
    processingOrdersCount,
    compoundingOrdersCount,
    qualityCheckOrdersCount,
    packagingOrdersCount,
    pendingPrescriptionsCount,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count({
      where: { status: "pending" },
    }),

    prisma.order.count({
      where: { status: "processing" },
    }),

    prisma.order.count({
      where: { status: "compounding" },
    }),

    prisma.order.count({
      where: { status: "quality_check" },
    }),

    prisma.order.count({
      where: { status: "packaging" },
    }),

    prisma.prescription.count({
      where: { status: "pending" },
    }),

    prisma.order.findMany({
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
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return apiSuccess({
    stats: {
      pendingOrders: pendingOrdersCount + processingOrdersCount,
      awaitingVerification: pendingPrescriptionsCount,
      inCompounding: compoundingOrdersCount + qualityCheckOrdersCount,
      readyToShip: packagingOrdersCount,
    },
    recentOrders: recentOrders.map((order: RecentOrder) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      createdAt: order.createdAt,
      patient: {
        id: order.patient.id,
        name: `${order.patient.firstName} ${order.patient.lastName}`,
      },
      medication: order.prescription.compound.name,
      dosage: order.prescription.compound.defaultStrength,
      dosageForm: order.prescription.compound.dosageForm,
    })),
  });
});
