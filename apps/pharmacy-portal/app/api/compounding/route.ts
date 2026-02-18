import {
  apiSuccess,
  apiUnauthorized,
  getPharmacyStaffIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

interface OrderWithCompound {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: Date;
  prescription: {
    compound: {
      id: string;
      name: string;
      dosageForm: string;
      defaultStrength: string | null;
    };
  };
}

interface BatchGroup {
  compoundId: string;
  compoundName: string;
  dosageForm: string;
  strength: string | null;
  orders: {
    id: string;
    orderNumber: string;
    status: string;
    createdAt: Date;
  }[];
  orderCount: number;
  statuses: {
    compounding: number;
    quality_check: number;
  };
}

export const GET = withAuth(async ({ user }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const orders = await prisma.order.findMany({
    where: {
      status: { in: ["compounding", "quality_check"] },
    },
    include: {
      prescription: {
        select: {
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
    },
    orderBy: { createdAt: "asc" },
  });

  const batchMap = new Map<string, BatchGroup>();

  orders.forEach((order: OrderWithCompound) => {
    const compound = order.prescription.compound;
    const existing = batchMap.get(compound.id);

    if (existing) {
      existing.orders.push({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        createdAt: order.createdAt,
      });
      existing.orderCount++;
      if (order.status === "compounding") {
        existing.statuses.compounding++;
      } else if (order.status === "quality_check") {
        existing.statuses.quality_check++;
      }
    } else {
      batchMap.set(compound.id, {
        compoundId: compound.id,
        compoundName: compound.name,
        dosageForm: compound.dosageForm,
        strength: compound.defaultStrength,
        orders: [
          {
            id: order.id,
            orderNumber: order.orderNumber,
            status: order.status,
            createdAt: order.createdAt,
          },
        ],
        orderCount: 1,
        statuses: {
          compounding: order.status === "compounding" ? 1 : 0,
          quality_check: order.status === "quality_check" ? 1 : 0,
        },
      });
    }
  });

  const batches = Array.from(batchMap.values()).map((batch) => {
    const totalOrders = batch.orderCount;
    const completedQC = batch.statuses.quality_check;
    const progress = totalOrders > 0 ? Math.round((completedQC / totalOrders) * 100) : 0;

    let currentStep = "Compounding";
    if (batch.statuses.compounding === 0 && batch.statuses.quality_check > 0) {
      currentStep = "Quality Check";
    }

    return {
      compoundId: batch.compoundId,
      compoundName: batch.compoundName,
      dosageForm: batch.dosageForm,
      strength: batch.strength,
      orderCount: batch.orderCount,
      orders: batch.orders,
      currentStep,
      progress,
      statuses: batch.statuses,
    };
  });

  return apiSuccess({
    batches,
    totalBatches: batches.length,
    totalOrders: orders.length,
  });
});
