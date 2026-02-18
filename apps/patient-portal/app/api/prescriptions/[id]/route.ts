import { prisma } from "@rx/database";
import {
  apiSuccess,
  apiNotFound,
  apiUnauthorized,
  getPatientIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";

export const GET = withAuth<{ id: string }>(async ({ user, params }) => {
  const patientId = await getPatientIdFromAuth0Id(user.sub);

  if (!patientId) {
    return apiUnauthorized("Patient profile not found");
  }

  const prescription = await prisma.prescription.findUnique({
    where: { id: params.id },
    include: {
      compound: {
        select: {
          id: true,
          name: true,
          genericName: true,
          description: true,
          dosageForm: true,
          defaultStrength: true,
          cashPrice: true,
        },
      },
      provider: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          npi: true,
        },
      },
      orders: {
        select: {
          id: true,
          orderNumber: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!prescription) {
    return apiNotFound("Prescription");
  }

  if (prescription.patientId !== patientId) {
    return apiNotFound("Prescription");
  }

  return apiSuccess(prescription);
});
