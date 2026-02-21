import {
  apiSuccess,
  apiUnauthorized,
  getEmployerAdminFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import type { DashboardRecentActivity } from "@rx/types";

import {
  ACTIVE_PRESCRIPTION_STATUSES,
  AVG_SAVINGS_PER_RX,
  RECENT_ORDERS_LIMIT,
  TELEMEDICINE_ENROLLMENT_OFFSET,
  WELLNESS_ENROLLMENT_OFFSET,
} from "../constants";

interface OrderWithPatient {
  id: string;
  status: string;
  createdAt: Date;
  patient: {
    firstName: string;
    lastName: string;
  };
}

export const GET = withAuth(async ({ user }) => {
  const admin = await getEmployerAdminFromAuth0Id(user.sub);

  if (!admin) {
    return apiUnauthorized("Employer admin profile not found");
  }

  const employerId = admin.employerId;

  const [
    totalEmployees,
    employeesWithPrescriptions,
    activePrescriptions,
    recentOrders,
  ] = await Promise.all([
    prisma.patient.count({
      where: { employerId },
    }),
    prisma.patient.count({
      where: {
        employerId,
        prescriptions: { some: {} },
      },
    }),
    prisma.prescription.count({
      where: {
        patient: { employerId },
        status: { in: [...ACTIVE_PRESCRIPTION_STATUSES] },
      },
    }),
    prisma.order.findMany({
      where: {
        patient: { employerId },
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: RECENT_ORDERS_LIMIT,
    }),
  ]);

  const recentActivity: DashboardRecentActivity[] = recentOrders.map((order: OrderWithPatient) => ({
    id: order.id,
    employeeName: `${order.patient.firstName} ${order.patient.lastName}`,
    action: getActionFromStatus(order.status),
    date: order.createdAt.toISOString(),
  }));

  const enrollmentRate = totalEmployees > 0
    ? Math.round((employeesWithPrescriptions / totalEmployees) * 100)
    : 0;

  return apiSuccess({
    companyName: admin.employer.companyName,
    stats: {
      totalEmployees,
      enrolledInProgram: employeesWithPrescriptions,
      activePrescriptions,
      monthlySavings: calculateMonthlySavings(activePrescriptions),
    },
    enrollment: {
      prescriptionBenefits: enrollmentRate,
      wellnessProgram: Math.max(0, enrollmentRate - WELLNESS_ENROLLMENT_OFFSET),
      telemedicine: Math.max(0, enrollmentRate - TELEMEDICINE_ENROLLMENT_OFFSET),
    },
    recentActivity,
  });
});

const getActionFromStatus = (status: string): string => {
  const actions: Record<string, string> = {
    pending: "Order placed",
    processing: "Order processing",
    compounding: "Prescription being prepared",
    quality_check: "Order in quality check",
    packaging: "Order being packaged",
    shipped: "Order shipped",
    delivered: "Prescription delivered",
    cancelled: "Order cancelled",
  };
  return actions[status] ?? "Order updated";
};

const calculateMonthlySavings = (activePrescriptions: number): string => {
  const savings = activePrescriptions * AVG_SAVINGS_PER_RX;
  return `$${savings.toLocaleString()}`;
};
