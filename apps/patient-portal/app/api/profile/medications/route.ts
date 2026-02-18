import { prisma } from "@rx/database";
import {
  apiSuccess,
  apiUnauthorized,
  getPatientIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { medicationCreateSchema } from "@rx/schemas";

export const GET = withAuth(async ({ user }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const medications = await prisma.patientMedication.findMany({
    where: { patientId },
    orderBy: [{ isActive: "desc" }, { createdAt: "desc" }],
  });

  return apiSuccess(medications);
});

export const POST = withAuth(async ({ user, request }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const body = await request.json();
  const data = medicationCreateSchema.parse(body);

  const medication = await prisma.patientMedication.create({
    data: {
      patientId,
      name: data.name,
      dosage: data.dosage,
      frequency: data.frequency,
      startDate: data.startDate,
      endDate: data.endDate,
      isActive: true,
    },
  });

  return apiSuccess(medication, 201);
});
