import { prisma } from "@rx/database";
import {
  apiSuccess,
  apiNotFound,
  apiUnauthorized,
  getPatientIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";

export const DELETE = withAuth<{ id: string }>(async ({ user, params }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const allergy = await prisma.patientAllergy.findUnique({
    where: { id: params.id },
  });

  if (!allergy) {
    return apiNotFound("Allergy");
  }

  if (allergy.patientId !== patientId) {
    return apiNotFound("Allergy");
  }

  await prisma.patientAllergy.delete({
    where: { id: params.id },
  });

  return apiSuccess({ deleted: true });
});
