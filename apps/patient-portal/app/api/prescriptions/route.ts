import { prisma } from "@rx/database";
import {
  apiPaginated,
  apiUnauthorized,
  getPatientIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prescriptionQuerySchema } from "@rx/schemas";

export const GET = withAuth(async ({ user, request }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const { searchParams } = new URL(request.url);
  const query = prescriptionQuerySchema.parse({
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
    ...(query.startDate && { prescribedAt: { gte: query.startDate } }),
    ...(query.endDate && { prescribedAt: { lte: query.endDate } }),
  };

  const [prescriptions, total] = await Promise.all([
    prisma.prescription.findMany({
      where,
      include: {
        compound: {
          select: {
            id: true,
            name: true,
            genericName: true,
            dosageForm: true,
            defaultStrength: true,
          },
        },
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        [query.sortBy ?? "prescribedAt"]: query.sortOrder,
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    prisma.prescription.count({ where }),
  ]);

  return apiPaginated(prescriptions, {
    page: query.page,
    pageSize: query.pageSize,
    total,
    hasMore: query.page * query.pageSize < total,
  });
});
