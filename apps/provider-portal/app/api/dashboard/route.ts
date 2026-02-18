import {
  apiSuccess,
  apiUnauthorized,
  getProviderIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

interface UpcomingAppointment {
  id: string;
  scheduledAt: Date;
  duration: number;
  type: string;
  status: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface RecentPrescription {
  id: string;
  status: string;
  prescribedAt: Date;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  compound: {
    name: string;
  };
}

export const GET = withAuth(async ({ user }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const [
    todayAppointments,
    upcomingAppointments,
    pendingPrescriptions,
    recentPrescriptions,
    activePatientIds,
    monthlyAppointmentCount,
    monthlyPrescriptionCount,
  ] = await Promise.all([
    prisma.appointment.count({
      where: {
        providerId,
        scheduledAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    }),

    prisma.appointment.findMany({
      where: {
        providerId,
        scheduledAt: {
          gte: now,
        },
        status: { in: ["scheduled", "confirmed"] },
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { scheduledAt: "asc" },
      take: 5,
    }),

    prisma.prescription.count({
      where: {
        providerId,
        status: "pending",
      },
    }),

    prisma.prescription.findMany({
      where: {
        providerId,
        prescribedAt: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        compound: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { prescribedAt: "desc" },
      take: 5,
    }),

    prisma.appointment.findMany({
      where: {
        providerId,
        scheduledAt: {
          gte: ninetyDaysAgo,
        },
      },
      select: { patientId: true },
      distinct: ["patientId"],
    }),

    prisma.appointment.count({
      where: {
        providerId,
        scheduledAt: {
          gte: thirtyDaysAgo,
        },
      },
    }),

    prisma.prescription.count({
      where: {
        providerId,
        prescribedAt: {
          gte: thirtyDaysAgo,
        },
      },
    }),
  ]);

  const todayBreakdown = await prisma.appointment.groupBy({
    by: ["status"],
    where: {
      providerId,
      scheduledAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    _count: true,
  });

  const statusCounts = todayBreakdown.reduce(
    (acc: Record<string, number>, item: { status: string; _count: number }) => {
      acc[item.status] = item._count;
      return acc;
    },
    {} as Record<string, number>
  );

  return apiSuccess({
    today: {
      appointments: todayAppointments,
      scheduled: statusCounts.scheduled ?? 0,
      confirmed: statusCounts.confirmed ?? 0,
      inProgress: statusCounts.in_progress ?? 0,
      completed: statusCounts.completed ?? 0,
      cancelled: statusCounts.cancelled ?? 0,
      noShow: statusCounts.no_show ?? 0,
    },
    overview: {
      pendingPrescriptions,
      activePatients: activePatientIds.length,
      monthlyAppointments: monthlyAppointmentCount,
      monthlyPrescriptions: monthlyPrescriptionCount,
    },
    upcomingAppointments: upcomingAppointments.map((appt: UpcomingAppointment) => ({
      id: appt.id,
      scheduledAt: appt.scheduledAt,
      duration: appt.duration,
      type: appt.type,
      status: appt.status,
      patient: {
        id: appt.patient.id,
        name: `${appt.patient.firstName} ${appt.patient.lastName}`,
      },
    })),
    recentPrescriptions: recentPrescriptions.map((rx: RecentPrescription) => ({
      id: rx.id,
      status: rx.status,
      prescribedAt: rx.prescribedAt,
      patient: {
        id: rx.patient.id,
        name: `${rx.patient.firstName} ${rx.patient.lastName}`,
      },
      compound: rx.compound.name,
    })),
  });
});
