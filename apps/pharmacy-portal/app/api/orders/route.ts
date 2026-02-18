import {
  apiPaginated,
  apiUnauthorized,
  getPharmacyStaffIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

type OrderStatus =
  | "pending"
  | "processing"
  | "compounding"
  | "quality_check"
  | "packaging"
  | "shipped"
  | "delivered"
  | "cancelled";

interface OrderWithRelations {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: unknown;
  createdAt: Date;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  prescription: {
    id: string;
    quantity: number;
    compound: {
      name: string;
      dosageForm: string;
      defaultStrength: string | null;
    };
  };
}

export const GET = withAuth(async ({ user, request }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as OrderStatus | null;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));
  const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

  const where = {
    ...(status && { status }),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
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
      orderBy: { createdAt: sortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.order.count({ where }),
  ]);

  const formattedOrders = orders.map((order: OrderWithRelations) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    totalAmount: order.totalAmount,
    createdAt: order.createdAt,
    patient: {
      id: order.patient.id,
      name: `${order.patient.firstName} ${order.patient.lastName}`,
    },
    medication: order.prescription.compound.name,
    dosage: order.prescription.compound.defaultStrength,
    dosageForm: order.prescription.compound.dosageForm,
    quantity: order.prescription.quantity,
  }));

  return apiPaginated(formattedOrders, {
    page,
    pageSize,
    total,
    hasMore: page * pageSize < total,
  });
});
