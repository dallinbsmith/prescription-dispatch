import { prisma } from "@rx/database";
import {
  apiSuccess,
  apiNotFound,
  apiUnauthorized,
  getPatientIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { medicationUpdateSchema } from "@rx/schemas";

export const PATCH = withAuth<{ id: string }>(async ({ user, params, request }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const medication = await prisma.patientMedication.findUnique({
    where: { id: params.id },
  });

  if (!medication) {
    return apiNotFound("Medication");
  }

  if (medication.patientId !== patientId) {
    return apiNotFound("Medication");
  }

  const body = await request.json();
  const data = medicationUpdateSchema.parse(body);

  const updatedMedication = await prisma.patientMedication.update({
    where: { id: params.id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.dosage !== undefined && { dosage: data.dosage }),
      ...(data.frequency !== undefined && { frequency: data.frequency }),
      ...(data.startDate !== undefined && { startDate: data.startDate }),
      ...(data.endDate !== undefined && { endDate: data.endDate }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
  });

  return apiSuccess(updatedMedication);
});

export const DELETE = withAuth<{ id: string }>(async ({ user, params }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const medication = await prisma.patientMedication.findUnique({
    where: { id: params.id },
  });

  if (!medication) {
    return apiNotFound("Medication");
  }

  if (medication.patientId !== patientId) {
    return apiNotFound("Medication");
  }

  await prisma.patientMedication.delete({
    where: { id: params.id },
  });

  return apiSuccess({ deleted: true });
});
