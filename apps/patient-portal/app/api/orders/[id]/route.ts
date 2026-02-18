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

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      prescription: {
        select: {
          id: true,
          directions: true,
          quantity: true,
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
      },
      shipAddress: true,
      statusLogs: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!order) {
    return apiNotFound("Order");
  }

  if (order.patientId !== patientId) {
    return apiNotFound("Order");
  }

  return apiSuccess(order);
});
