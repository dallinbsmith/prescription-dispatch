import { prisma } from "@rx/database";

type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];
import {
  apiSuccess,
  apiUnauthorized,
  getPatientFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { patientProfileUpdateSchema } from "@rx/schemas";

export const GET = withAuth(async ({ user }) => {
  const patient = await getPatientFromAuth0Id(user.sub);

  if (!patient) {
    return apiUnauthorized("Patient profile not found");
  }

  const fullPatient = await prisma.patient.findUnique({
    where: { id: patient.id },
    include: {
      address: true,
      user: {
        select: {
          email: true,
          phone: true,
        },
      },
      allergies: {
        orderBy: { createdAt: "desc" },
      },
      medications: {
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return apiSuccess(fullPatient);
});

export const PATCH = withAuth(async ({ user, request }) => {
  const patient = await getPatientFromAuth0Id(user.sub);

  if (!patient) {
    return apiUnauthorized("Patient profile not found");
  }

  const body = await request.json();
  const data = patientProfileUpdateSchema.parse(body);

  const updatedPatient = await prisma.$transaction(async (tx: TransactionClient) => {
    if (data.phone !== undefined) {
      await tx.user.update({
        where: { id: patient.userId },
        data: { phone: data.phone },
      });
    }

    if (data.address) {
      await tx.address.upsert({
        where: { patientId: patient.id },
        create: {
          patientId: patient.id,
          street1: data.address.street1,
          street2: data.address.street2,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          country: data.address.country,
        },
        update: {
          street1: data.address.street1,
          street2: data.address.street2,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          country: data.address.country,
        },
      });
    }

    return tx.patient.findUnique({
      where: { id: patient.id },
      include: {
        address: true,
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
      },
    });
  });

  return apiSuccess(updatedPatient);
});
