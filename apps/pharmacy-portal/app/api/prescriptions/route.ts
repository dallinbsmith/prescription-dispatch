import {
  apiPaginated,
  apiUnauthorized,
  getPharmacyStaffIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

type PrescriptionStatus =
  | "pending"
  | "verified"
  | "compounding"
  | "quality_check"
  | "ready"
  | "shipped"
  | "delivered"
  | "cancelled";

interface PrescriptionWithRelations {
  id: string;
  quantity: number;
  directions: string;
  status: string;
  refills: number;
  prescribedAt: Date;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    allergies: { allergen: string; severity: string | null }[];
  };
  provider: {
    id: string;
    firstName: string;
    lastName: string;
  };
  compound: {
    id: string;
    name: string;
    dosageForm: string;
    defaultStrength: string | null;
  };
}

export const GET = withAuth(async ({ user, request }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { searchParams } = new URL(request.url);
  const status = (searchParams.get("status") ?? "pending") as PrescriptionStatus;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));
  const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

  const where = {
    status,
  };

  const [prescriptions, total] = await Promise.all([
    prisma.prescription.findMany({
      where,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            allergies: {
              select: {
                allergen: true,
                severity: true,
              },
            },
          },
        },
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
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
      orderBy: { prescribedAt: sortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.prescription.count({ where }),
  ]);

  const formattedPrescriptions = prescriptions.map((rx: PrescriptionWithRelations) => ({
    id: rx.id,
    quantity: rx.quantity,
    directions: rx.directions,
    status: rx.status,
    refills: rx.refills,
    prescribedAt: rx.prescribedAt,
    patient: {
      id: rx.patient.id,
      name: `${rx.patient.firstName} ${rx.patient.lastName}`,
      dateOfBirth: rx.patient.dateOfBirth,
      allergies: rx.patient.allergies,
    },
    prescriber: `Dr. ${rx.provider.lastName}`,
    providerId: rx.provider.id,
    compound: {
      id: rx.compound.id,
      name: rx.compound.name,
      dosageForm: rx.compound.dosageForm,
      strength: rx.compound.defaultStrength,
    },
  }));

  return apiPaginated(formattedPrescriptions, {
    page,
    pageSize,
    total,
    hasMore: page * pageSize < total,
  });
});
