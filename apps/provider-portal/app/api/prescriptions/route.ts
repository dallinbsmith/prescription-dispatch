import {
  apiPaginated,
  apiSuccess,
  apiUnauthorized,
  apiForbidden,
  getProviderIdFromAuth0Id,
  providerHasActiveLicenseForState,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { providerPrescriptionQuerySchema, prescriptionCreateSchema } from "@rx/schemas";

interface PrescriptionWithRelations {
  id: string;
  quantity: number;
  directions: string;
  status: string;
  refills: number;
  refillsUsed: number;
  prescribedAt: Date;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
  };
  compound: {
    id: string;
    name: string;
    dosageForm: string;
    defaultStrength: string | null;
  };
}

export const GET = withAuth(async ({ user, request }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const { searchParams } = new URL(request.url);
  const query = providerPrescriptionQuerySchema.parse({
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
    startDate: searchParams.get("startDate") ?? undefined,
    endDate: searchParams.get("endDate") ?? undefined,
    patientId: searchParams.get("patientId") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: searchParams.get("sortOrder") ?? undefined,
  });

  const dateFilter =
    query.startDate || query.endDate
      ? {
          prescribedAt: {
            ...(query.startDate && { gte: query.startDate }),
            ...(query.endDate && { lte: query.endDate }),
          },
        }
      : {};

  const where = {
    providerId,
    ...dateFilter,
    ...(query.patientId && { patientId: query.patientId }),
    ...(query.status && { status: query.status }),
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
      orderBy: { prescribedAt: query.sortOrder === "asc" ? "asc" : "desc" },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    prisma.prescription.count({ where }),
  ]);

  const formattedPrescriptions = prescriptions.map((rx: PrescriptionWithRelations) => ({
    id: rx.id,
    quantity: rx.quantity,
    directions: rx.directions,
    status: rx.status,
    refills: rx.refills,
    refillsUsed: rx.refillsUsed,
    prescribedAt: rx.prescribedAt,
    patient: {
      id: rx.patient.id,
      firstName: rx.patient.firstName,
      lastName: rx.patient.lastName,
      dateOfBirth: rx.patient.dateOfBirth,
    },
    compound: {
      id: rx.compound.id,
      name: rx.compound.name,
      dosageForm: rx.compound.dosageForm,
      strength: rx.compound.defaultStrength,
    },
  }));

  return apiPaginated(formattedPrescriptions, {
    page: query.page,
    pageSize: query.pageSize,
    total,
    hasMore: query.page * query.pageSize < total,
  });
});

export const POST = withAuth(async ({ user, request }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const body = await request.json();
  const data = prescriptionCreateSchema.parse(body);

  const patient = await prisma.patient.findUnique({
    where: { id: data.patientId },
    include: {
      address: {
        select: { state: true },
      },
    },
  });

  if (!patient) {
    return apiUnauthorized("Patient not found");
  }

  if (patient.address?.state) {
    const hasLicense = await providerHasActiveLicenseForState(providerId, patient.address.state);
    if (!hasLicense) {
      return apiForbidden(`You do not have an active license to prescribe in ${patient.address.state}`);
    }
  }

  const compound = await prisma.compound.findUnique({
    where: { id: data.compoundId },
    select: { id: true, isActive: true },
  });

  if (!compound) {
    return apiUnauthorized("Compound not found");
  }

  if (!compound.isActive) {
    return apiForbidden("This compound is not currently available for prescribing");
  }

  const prescription = await prisma.prescription.create({
    data: {
      patientId: data.patientId,
      providerId,
      compoundId: data.compoundId,
      quantity: data.quantity,
      refills: data.refills,
      directions: data.directions,
      appointmentId: data.appointmentId,
      status: "pending",
      prescribedAt: new Date(),
    },
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

  return apiSuccess(
    {
      id: prescription.id,
      quantity: prescription.quantity,
      directions: prescription.directions,
      status: prescription.status,
      refills: prescription.refills,
      refillsUsed: prescription.refillsUsed,
      prescribedAt: prescription.prescribedAt,
      patient: prescription.patient,
      compound: {
        id: prescription.compound.id,
        name: prescription.compound.name,
        dosageForm: prescription.compound.dosageForm,
        strength: prescription.compound.defaultStrength,
      },
    },
    201
  );
});
