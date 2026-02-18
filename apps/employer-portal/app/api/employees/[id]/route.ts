import {
  apiSuccess,
  apiUnauthorized,
  getEmployerIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { NextResponse } from "next/server";

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

  const { id } = await params;

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
        take: 10,
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
        take: 5,
      },
    },
  });

  if (!patient || patient.employerId !== employerId) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Employee not found" } },
      { status: 404 }
    );
  }

  const activeStatuses = ["pending", "verified", "compounding", "quality_check", "ready"];
  const activePrescriptions = patient.prescriptions.filter(
    (rx: PrescriptionWithCompound) => activeStatuses.includes(rx.status)
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
