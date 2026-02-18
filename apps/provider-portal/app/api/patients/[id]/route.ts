import {
  apiSuccess,
  apiNotFound,
  apiUnauthorized,
  apiForbidden,
  getProviderIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

interface AllergyRecord {
  id: string;
  allergen: string;
  severity: string | null;
  reaction: string | null;
}

interface MedicationRecord {
  id: string;
  name: string;
  dosage: string | null;
  frequency: string | null;
}

interface PrescriptionRecord {
  id: string;
  quantity: number;
  directions: string;
  status: string;
  refills: number;
  refillsUsed: number;
  prescribedAt: Date;
  compound: {
    id: string;
    name: string;
    dosageForm: string;
    defaultStrength: string | null;
  };
}

interface ConsultationSummaryRecord {
  chiefComplaint: string;
  symptomsSummary: string;
  relevantHistory: string | null;
  riskFlags: string[];
  severityAssessment: string | null;
}

interface AppointmentRecord {
  id: string;
  scheduledAt: Date;
  type: string;
  status: string;
  visitNotes: string | null;
  consultation: {
    summary: ConsultationSummaryRecord | null;
  } | null;
}

interface ConsultationRecord {
  id: string;
  status: string;
  startedAt: Date;
  completedAt: Date | null;
  summary: ConsultationSummaryRecord | null;
}

export const GET = withAuth<{ id: string }>(async ({ user, params }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const patientId = params.id;

  const hasRelationship = await prisma.$transaction(async (tx: TransactionClient) => {
    const appointment = await tx.appointment.findFirst({
      where: { providerId, patientId },
      select: { id: true },
    });

    if (appointment) return true;

    const prescription = await tx.prescription.findFirst({
      where: { providerId, patientId },
      select: { id: true },
    });

    return prescription !== null;
  });

  if (!hasRelationship) {
    return apiForbidden("You do not have access to this patient's records");
  }

  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: {
      user: {
        select: {
          email: true,
          phone: true,
        },
      },
      address: true,
      allergies: {
        orderBy: { createdAt: "desc" },
      },
      medications: {
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      },
      prescriptions: {
        where: { providerId },
        include: {
          compound: {
            select: {
              id: true,
              name: true,
              dosageForm: true,
              defaultStrength: true,
            },
          },
        },
        orderBy: { prescribedAt: "desc" },
        take: 20,
      },
      appointments: {
        where: { providerId },
        include: {
          consultation: {
            include: {
              summary: true,
            },
          },
        },
        orderBy: { scheduledAt: "desc" },
        take: 10,
      },
      consultations: {
        include: {
          summary: true,
        },
        orderBy: { startedAt: "desc" },
        take: 5,
      },
    },
  });

  if (!patient) {
    return apiNotFound("Patient");
  }

  const lastAppointment = patient.appointments[0];
  let status: "active" | "follow-up" | "inactive" = "active";

  if (lastAppointment) {
    const daysSinceLastVisit = Math.floor(
      (Date.now() - lastAppointment.scheduledAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastVisit > 90) {
      status = "inactive";
    } else if (
      lastAppointment.status === "completed" &&
      patient.prescriptions.some((rx: PrescriptionRecord) => !["cancelled", "delivered"].includes(rx.status))
    ) {
      status = "follow-up";
    }
  }

  return apiSuccess({
    id: patient.id,
    firstName: patient.firstName,
    lastName: patient.lastName,
    dateOfBirth: patient.dateOfBirth,
    email: patient.user.email,
    phone: patient.user.phone,
    address: patient.address,
    status,
    allergies: patient.allergies.map((a: AllergyRecord) => ({
      id: a.id,
      allergen: a.allergen,
      severity: a.severity,
      reaction: a.reaction,
    })),
    currentMedications: patient.medications.map((m: MedicationRecord) => ({
      id: m.id,
      name: m.name,
      dosage: m.dosage,
      frequency: m.frequency,
    })),
    prescriptionHistory: patient.prescriptions.map((rx: PrescriptionRecord) => ({
      id: rx.id,
      compound: rx.compound,
      quantity: rx.quantity,
      directions: rx.directions,
      status: rx.status,
      refills: rx.refills,
      refillsUsed: rx.refillsUsed,
      prescribedAt: rx.prescribedAt,
    })),
    appointmentHistory: patient.appointments.map((appt: AppointmentRecord) => ({
      id: appt.id,
      scheduledAt: appt.scheduledAt,
      type: appt.type,
      status: appt.status,
      visitNotes: appt.visitNotes,
      consultationSummary: appt.consultation?.summary
        ? {
            chiefComplaint: appt.consultation.summary.chiefComplaint,
            symptomsSummary: appt.consultation.summary.symptomsSummary,
            riskFlags: appt.consultation.summary.riskFlags,
          }
        : null,
    })),
    recentConsultations: patient.consultations.map((c: ConsultationRecord) => ({
      id: c.id,
      status: c.status,
      startedAt: c.startedAt,
      completedAt: c.completedAt,
      summary: c.summary
        ? {
            chiefComplaint: c.summary.chiefComplaint,
            symptomsSummary: c.summary.symptomsSummary,
            relevantHistory: c.summary.relevantHistory,
            riskFlags: c.summary.riskFlags,
            severityAssessment: c.summary.severityAssessment,
          }
        : null,
    })),
  });
});
