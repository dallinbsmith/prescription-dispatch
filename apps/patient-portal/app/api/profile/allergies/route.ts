import { prisma } from "@rx/database";
import {
  apiSuccess,
  apiUnauthorized,
  getPatientIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { allergyCreateSchema } from "@rx/schemas";

export const GET = withAuth(async ({ user }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const allergies = await prisma.patientAllergy.findMany({
    where: { patientId },
    orderBy: { createdAt: "desc" },
  });

  return apiSuccess(allergies);
});

export const POST = withAuth(async ({ user, request }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const body = await request.json();
  const data = allergyCreateSchema.parse(body);

  const allergy = await prisma.patientAllergy.create({
    data: {
      patientId,
      allergen: data.allergen,
      severity: data.severity,
      reaction: data.reaction,
    },
  });

  return apiSuccess(allergy, 201);
});
