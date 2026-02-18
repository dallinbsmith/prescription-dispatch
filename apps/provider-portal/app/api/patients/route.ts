import {
  apiPaginated,
  apiUnauthorized,
  getProviderIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { patientSearchQuerySchema } from "@rx/schemas";

interface PatientWithRelations {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  user: {
    email: string;
    phone: string | null;
  };
  address: {
    state: string;
  } | null;
  prescriptions: { id: string }[];
  appointments: {
    scheduledAt: Date;
    status: string;
  }[];
}

export const GET = withAuth(async ({ user, request }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const { searchParams } = new URL(request.url);
  const query = patientSearchQuerySchema.parse({
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: searchParams.get("sortOrder") ?? undefined,
  });

  const patientIdsFromAppointments = await prisma.appointment.findMany({
    where: { providerId },
    select: { patientId: true },
    distinct: ["patientId"],
  });

  const patientIdsFromPrescriptions = await prisma.prescription.findMany({
    where: { providerId },
    select: { patientId: true },
    distinct: ["patientId"],
  });

  const allPatientIds = [
    ...new Set([
      ...patientIdsFromAppointments.map((a: { patientId: string }) => a.patientId),
      ...patientIdsFromPrescriptions.map((p: { patientId: string }) => p.patientId),
    ]),
  ];

  if (allPatientIds.length === 0) {
    return apiPaginated([], {
      page: query.page,
      pageSize: query.pageSize,
      total: 0,
      hasMore: false,
    });
  }

  const searchFilter = query.search
    ? {
        OR: [
          { firstName: { contains: query.search, mode: "insensitive" as const } },
          { lastName: { contains: query.search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const where = {
    id: { in: allPatientIds },
    ...searchFilter,
  };

  const [patients, total] = await Promise.all([
    prisma.patient.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
        address: {
          select: {
            state: true,
          },
        },
        prescriptions: {
          where: {
            providerId,
            status: { notIn: ["cancelled", "delivered"] },
          },
          select: { id: true },
        },
        appointments: {
          where: { providerId },
          orderBy: { scheduledAt: "desc" },
          take: 1,
          select: {
            scheduledAt: true,
            status: true,
          },
        },
      },
      orderBy: { [query.sortBy ?? "lastName"]: query.sortOrder },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    prisma.patient.count({ where }),
  ]);

  const patientsWithStatus = patients.map((patient: PatientWithRelations) => {
    const lastAppointment = patient.appointments[0];
    let status: "active" | "follow-up" | "inactive" = "active";

    if (lastAppointment) {
      const daysSinceLastVisit = Math.floor(
        (Date.now() - lastAppointment.scheduledAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastVisit > 90) {
        status = "inactive";
      } else if (lastAppointment.status === "completed" && patient.prescriptions.length > 0) {
        status = "follow-up";
      }
    }

    if (query.status && status !== query.status) {
      return null;
    }

    return {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      email: patient.user.email,
      phone: patient.user.phone,
      state: patient.address?.state ?? null,
      status,
      activeRxCount: patient.prescriptions.length,
      lastVisit: lastAppointment?.scheduledAt ?? null,
    };
  }).filter(Boolean);

  return apiPaginated(patientsWithStatus, {
    page: query.page,
    pageSize: query.pageSize,
    total,
    hasMore: query.page * query.pageSize < total,
  });
});
