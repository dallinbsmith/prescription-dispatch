import {
  apiSuccess,
  apiUnauthorized,
  getPharmacyStaffIdFromAuth0Id,
  isPharmacist,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { NextResponse } from "next/server";

interface CompoundIngredientWithName {
  quantity: string;
  unit: string;
  ingredient: {
    name: string;
  };
}

export const GET = withAuth(async ({ user, params }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { id } = await params;

  const prescription = await prisma.prescription.findUnique({
    where: { id },
    include: {
      patient: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
          allergies: {
            select: {
              id: true,
              allergen: true,
              severity: true,
              reaction: true,
            },
          },
          medications: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              dosage: true,
              frequency: true,
            },
          },
        },
      },
      provider: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          npi: true,
          licenses: {
            where: { status: "active" },
            select: {
              state: true,
              licenseNumber: true,
              expirationDate: true,
            },
          },
        },
      },
      compound: {
        select: {
          id: true,
          name: true,
          genericName: true,
          dosageForm: true,
          defaultStrength: true,
          description: true,
          ingredients: {
            select: {
              quantity: true,
              unit: true,
              ingredient: {
                select: {
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
    },
  });

  if (!prescription) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Prescription not found" } },
      { status: 404 }
    );
  }

  return apiSuccess({
    id: prescription.id,
    quantity: prescription.quantity,
    directions: prescription.directions,
    status: prescription.status,
    refills: prescription.refills,
    refillsUsed: prescription.refillsUsed,
    prescribedAt: prescription.prescribedAt,
    verifiedAt: prescription.verifiedAt,
    verifiedBy: prescription.verifiedBy,
    patient: {
      id: prescription.patient.id,
      name: `${prescription.patient.firstName} ${prescription.patient.lastName}`,
      dateOfBirth: prescription.patient.dateOfBirth,
      allergies: prescription.patient.allergies,
      medications: prescription.patient.medications,
    },
    provider: {
      id: prescription.provider.id,
      name: `Dr. ${prescription.provider.firstName} ${prescription.provider.lastName}`,
      npi: prescription.provider.npi,
      licenses: prescription.provider.licenses,
    },
    compound: {
      id: prescription.compound.id,
      name: prescription.compound.name,
      genericName: prescription.compound.genericName,
      dosageForm: prescription.compound.dosageForm,
      strength: prescription.compound.defaultStrength,
      description: prescription.compound.description,
      ingredients: prescription.compound.ingredients.map((ci: CompoundIngredientWithName) => ({
        name: ci.ingredient.name,
        quantity: ci.quantity,
        unit: ci.unit,
      })),
    },
    appointment: prescription.appointment,
  });
});

export const PATCH = withAuth(async ({ user, params, request }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { id } = await params;
  const body = await request.json();
  const { action, rejectionReason } = body as {
    action: "verify" | "reject";
    rejectionReason?: string;
  };

  if (!action || !["verify", "reject"].includes(action)) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Invalid action. Must be 'verify' or 'reject'" } },
      { status: 400 }
    );
  }

  const prescription = await prisma.prescription.findUnique({
    where: { id },
    select: { status: true },
  });

  if (!prescription) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Prescription not found" } },
      { status: 404 }
    );
  }

  if (prescription.status !== "pending") {
    return NextResponse.json(
      { error: { code: "INVALID_STATE", message: "Only pending prescriptions can be verified or rejected" } },
      { status: 400 }
    );
  }

  if (action === "verify") {
    const canVerify = await isPharmacist(user.sub);
    if (!canVerify) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Only pharmacists can verify prescriptions" } },
        { status: 403 }
      );
    }

    const updatedPrescription = await prisma.prescription.update({
      where: { id },
      data: {
        status: "verified",
        verifiedAt: new Date(),
        verifiedBy: userId,
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        compound: {
          select: {
            name: true,
          },
        },
      },
    });

    return apiSuccess({
      id: updatedPrescription.id,
      status: updatedPrescription.status,
      verifiedAt: updatedPrescription.verifiedAt,
      verifiedBy: updatedPrescription.verifiedBy,
      patient: {
        id: updatedPrescription.patient.id,
        name: `${updatedPrescription.patient.firstName} ${updatedPrescription.patient.lastName}`,
      },
      compound: updatedPrescription.compound.name,
    });
  }

  if (action === "reject") {
    if (!rejectionReason) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Rejection reason is required" } },
        { status: 400 }
      );
    }

    const updatedPrescription = await prisma.prescription.update({
      where: { id },
      data: {
        status: "cancelled",
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        compound: {
          select: {
            name: true,
          },
        },
      },
    });

    return apiSuccess({
      id: updatedPrescription.id,
      status: updatedPrescription.status,
      rejectionReason,
      patient: {
        id: updatedPrescription.patient.id,
        name: `${updatedPrescription.patient.firstName} ${updatedPrescription.patient.lastName}`,
      },
      compound: updatedPrescription.compound.name,
    });
  }

  return NextResponse.json(
    { error: { code: "BAD_REQUEST", message: "Invalid action" } },
    { status: 400 }
  );
});
