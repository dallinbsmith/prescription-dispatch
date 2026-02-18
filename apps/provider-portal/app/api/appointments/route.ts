import {
  apiPaginated,
  apiSuccess,
  apiUnauthorized,
  getProviderIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { providerAppointmentQuerySchema, appointmentCreateSchema } from "@rx/schemas";

interface AppointmentWithRelations {
  id: string;
  scheduledAt: Date;
  duration: number;
  type: string;
  status: string;
  paymentMethod: string;
  cashPrice: unknown;
  videoRoomId: string | null;
  visitNotes: string | null;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
  };
  consultation: {
    id: string;
    summary: {
      chiefComplaint: string;
      symptomsSummary: string;
      riskFlags: string[];
      severityAssessment: string | null;
    } | null;
  } | null;
}

export const GET = withAuth(async ({ user, request }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const { searchParams } = new URL(request.url);
  const query = providerAppointmentQuerySchema.parse({
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
    date: searchParams.get("date") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: searchParams.get("sortOrder") ?? undefined,
  });

  const dateFilter = query.date
    ? {
        scheduledAt: {
          gte: new Date(query.date.setHours(0, 0, 0, 0)),
          lt: new Date(query.date.setHours(23, 59, 59, 999)),
        },
      }
    : {};

  const where = {
    providerId,
    ...dateFilter,
    ...(query.status && { status: query.status }),
    ...(query.type && { type: query.type }),
  };

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
          },
        },
        consultation: {
          include: {
            summary: {
              select: {
                chiefComplaint: true,
                symptomsSummary: true,
                riskFlags: true,
                severityAssessment: true,
              },
            },
          },
        },
      },
      orderBy: { scheduledAt: query.sortOrder === "desc" ? "desc" : "asc" },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    prisma.appointment.count({ where }),
  ]);

  const formattedAppointments = appointments.map((appt: AppointmentWithRelations) => ({
    id: appt.id,
    scheduledAt: appt.scheduledAt,
    duration: appt.duration,
    type: appt.type,
    status: appt.status,
    paymentMethod: appt.paymentMethod,
    cashPrice: appt.cashPrice ? Number(appt.cashPrice) : null,
    videoRoomId: appt.videoRoomId,
    patient: {
      id: appt.patient.id,
      firstName: appt.patient.firstName,
      lastName: appt.patient.lastName,
      dateOfBirth: appt.patient.dateOfBirth,
    },
    consultationSummary: appt.consultation?.summary
      ? {
          chiefComplaint: appt.consultation.summary.chiefComplaint,
          symptomsSummary: appt.consultation.summary.symptomsSummary,
          riskFlags: appt.consultation.summary.riskFlags,
          severityAssessment: appt.consultation.summary.severityAssessment,
        }
      : null,
  }));

  return apiPaginated(formattedAppointments, {
    page: query.page,
    pageSize: query.pageSize,
    total,
    hasMore: query.page * query.pageSize < total,
  });
});

export const POST = withAuth(async ({ user, request }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const body = await request.json();
  const data = appointmentCreateSchema.parse(body);

  const patient = await prisma.patient.findUnique({
    where: { id: data.patientId },
    select: { id: true },
  });

  if (!patient) {
    return apiUnauthorized("Patient not found");
  }

  const appointment = await prisma.appointment.create({
    data: {
      patientId: data.patientId,
      providerId,
      scheduledAt: data.scheduledAt,
      duration: data.duration,
      type: data.type,
      paymentMethod: data.paymentMethod,
      consultationId: data.consultationId,
      status: "scheduled",
    },
    include: {
      patient: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
    },
  });

  return apiSuccess(
    {
      id: appointment.id,
      scheduledAt: appointment.scheduledAt,
      duration: appointment.duration,
      type: appointment.type,
      status: appointment.status,
      paymentMethod: appointment.paymentMethod,
      patient: appointment.patient,
    },
    201
  );
});
