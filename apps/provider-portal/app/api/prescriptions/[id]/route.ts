import {
  apiSuccess,
  apiNotFound,
  apiUnauthorized,
  apiForbidden,
  getProviderIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { prescriptionUpdateSchema } from "@rx/schemas";

interface PrescriptionWithDetails {
  id: string;
  quantity: number;
  directions: string;
  status: string;
  refills: number;
  refillsUsed: number;
  prescribedAt: Date;
  providerId: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    user: {
      email: string;
      phone: string | null;
    };
    address: {
      street1: string;
      street2: string | null;
      city: string;
      state: string;
      zipCode: string;
    } | null;
    allergies: {
      id: string;
      allergen: string;
      severity: string | null;
    }[];
  };
  compound: {
    id: string;
    name: string;
    dosageForm: string;
    defaultStrength: string | null;
    ingredients: {
      id: string;
      ingredient: {
        id: string;
        name: string;
      };
      quantity: unknown;
      unit: string;
    }[];
  };
  appointment: {
    id: string;
    scheduledAt: Date;
    type: string;
  } | null;
  order: {
    id: string;
    status: string;
    trackingNumber: string | null;
    carrier: string | null;
  } | null;
}

export const GET = withAuth<{ id: string }>(async ({ user, params }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const prescriptionId = params.id;

  const prescription = await prisma.prescription.findUnique({
    where: { id: prescriptionId },
    include: {
      patient: {
        include: {
          user: {
            select: {
              email: true,
              phone: true,
            },
          },
          address: {
            select: {
              street1: true,
              street2: true,
              city: true,
              state: true,
              zipCode: true,
            },
          },
          allergies: {
            select: {
              id: true,
              allergen: true,
              severity: true,
            },
          },
        },
      },
      compound: {
        include: {
          ingredients: {
            include: {
              ingredient: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
      appointment: {
        select: {
          id: true,
          scheduledAt: true,
          type: true,
        },
      },
      orders: {
        select: {
          id: true,
          status: true,
          trackingNumber: true,
          carrier: true,
        },
      },
    },
  });

  if (!prescription) {
    return apiNotFound("Prescription");
  }

  const typedPrescription = prescription as unknown as PrescriptionWithDetails;

  if (typedPrescription.providerId !== providerId) {
    return apiForbidden("You do not have access to this prescription");
  }

  return apiSuccess({
    id: typedPrescription.id,
    quantity: typedPrescription.quantity,
    directions: typedPrescription.directions,
    status: typedPrescription.status,
    refills: typedPrescription.refills,
    refillsUsed: typedPrescription.refillsUsed,
    prescribedAt: typedPrescription.prescribedAt,
    patient: {
      id: typedPrescription.patient.id,
      firstName: typedPrescription.patient.firstName,
      lastName: typedPrescription.patient.lastName,
      dateOfBirth: typedPrescription.patient.dateOfBirth,
      email: typedPrescription.patient.user.email,
      phone: typedPrescription.patient.user.phone,
      address: typedPrescription.patient.address,
      allergies: typedPrescription.patient.allergies,
    },
    compound: {
      id: typedPrescription.compound.id,
      name: typedPrescription.compound.name,
      dosageForm: typedPrescription.compound.dosageForm,
      strength: typedPrescription.compound.defaultStrength,
      ingredients: typedPrescription.compound.ingredients.map((ci) => ({
        id: ci.ingredient.id,
        name: ci.ingredient.name,
        quantity: ci.quantity ? Number(ci.quantity) : null,
        unit: ci.unit,
      })),
    },
    appointment: typedPrescription.appointment,
    order: typedPrescription.order,
  });
});

export const PATCH = withAuth<{ id: string }>(async ({ user, params, request }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const prescriptionId = params.id;

  const existingPrescription = await prisma.prescription.findUnique({
    where: { id: prescriptionId },
    select: { id: true, providerId: true, status: true },
  });

  if (!existingPrescription) {
    return apiNotFound("Prescription");
  }

  if (existingPrescription.providerId !== providerId) {
    return apiForbidden("You do not have access to this prescription");
  }

  if (!["pending", "verified"].includes(existingPrescription.status)) {
    return apiForbidden("Cannot modify a prescription that is already being processed");
  }

  const body = await request.json();
  const data = prescriptionUpdateSchema.parse(body);

  const updatedPrescription = await prisma.prescription.update({
    where: { id: prescriptionId },
    data,
    include: {
      patient: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
      compound: {
        select: {
          id: true,
          name: true,
          dosageForm: true,
          defaultStrength: true,
        },
      },
    },
  });

  return apiSuccess({
    id: updatedPrescription.id,
    quantity: updatedPrescription.quantity,
    directions: updatedPrescription.directions,
    status: updatedPrescription.status,
    refills: updatedPrescription.refills,
    refillsUsed: updatedPrescription.refillsUsed,
    prescribedAt: updatedPrescription.prescribedAt,
    patient: updatedPrescription.patient,
    compound: {
      id: updatedPrescription.compound.id,
      name: updatedPrescription.compound.name,
      dosageForm: updatedPrescription.compound.dosageForm,
      strength: updatedPrescription.compound.defaultStrength,
    },
  });
});
