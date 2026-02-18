import {
  apiBadRequest,
  apiNotFound,
  apiSuccess,
  apiUnauthorized,
  getEmployerIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { employeeIdParamSchema } from "@rx/schemas";

import {
  ACTIVE_PRESCRIPTION_STATUSES,
  RECENT_ORDERS_LIMIT,
  RECENT_PRESCRIPTIONS_LIMIT,
} from "../../constants";

interface PrescriptionWithCompound {
  id: string;
  status: string;
  quantity: number;
  prescribedAt: Date;
  compound: {
    name: string;
    dosageForm: string;
  };
}

export const GET = withAuth(async ({ user, params }) => {
  const employerId = await getEmployerIdFromAuth0Id(user.sub);

  if (!employerId) {
    return apiUnauthorized("Employer admin profile not found");
  }

  const paramResult = employeeIdParamSchema.safeParse(params);

  if (!paramResult.success) {
    return apiBadRequest("Invalid employee ID");
  }

  const { id } = paramResult.data;

  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          email: true,
          phone: true,
        },
      },
      prescriptions: {
        select: {
          id: true,
          status: true,
          quantity: true,
          prescribedAt: true,
          compound: {
            select: {
              name: true,
              dosageForm: true,
            },
          },
        },
        orderBy: { prescribedAt: "desc" },
        take: RECENT_PRESCRIPTIONS_LIMIT,
      },
      orders: {
        select: {
          id: true,
          orderNumber: true,
          status: true,
          totalAmount: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: RECENT_ORDERS_LIMIT,
      },
    },
  });

  if (patient?.employerId !== employerId) {
    return apiNotFound("Employee");
  }

  const activePrescriptions = patient.prescriptions.filter(
    (rx: PrescriptionWithCompound) => ACTIVE_PRESCRIPTION_STATUSES.includes(rx.status as typeof ACTIVE_PRESCRIPTION_STATUSES[number])
  ).length;

  const enrollmentStatus = activePrescriptions > 0
    ? "enrolled"
    : patient.prescriptions.length > 0
      ? "pending"
      : "not_enrolled";

  return apiSuccess({
    id: patient.id,
    name: `${patient.firstName} ${patient.lastName}`,
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.user.email,
    phone: patient.user.phone,
    dateOfBirth: patient.dateOfBirth,
    enrollmentStatus,
    hireDate: patient.createdAt,
    activePrescriptions,
    totalPrescriptions: patient.prescriptions.length,
    prescriptions: patient.prescriptions.map((rx: PrescriptionWithCompound) => ({
      id: rx.id,
      medication: rx.compound.name,
      dosageForm: rx.compound.dosageForm,
      quantity: rx.quantity,
      status: rx.status,
      prescribedAt: rx.prescribedAt,
    })),
    recentOrders: patient.orders,
  });
});
