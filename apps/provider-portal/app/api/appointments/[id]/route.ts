import {
  apiSuccess,
  apiNotFound,
  apiUnauthorized,
  apiForbidden,
  getProviderIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { appointmentUpdateSchema } from "@rx/schemas";

interface AppointmentWithDetails {
  id: string;
  scheduledAt: Date;
  duration: number;
  type: string;
  status: string;
  paymentMethod: string;
  cashPrice: unknown;
  videoRoomId: string | null;
  visitNotes: string | null;
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
    allergies: {
      id: string;
      allergen: string;
      severity: string | null;
    }[];
    medications: {
      id: string;
      name: string;
      dosage: string | null;
    }[];
  };
  consultation: {
    id: string;
    status: string;
    summary: {
      chiefComplaint: string;
      symptomsSummary: string;
      relevantHistory: string | null;
      riskFlags: string[];
      severityAssessment: string | null;
    } | null;
  } | null;
}

export const GET = withAuth<{ id: string }>(async ({ user, params }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const appointmentId = params.id;

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      patient: {
        include: {
          user: {
            select: {
              email: true,
              phone: true,
            },
          },
          allergies: {
            select: {
              id: true,
              allergen: true,
              severity: true,
            },
          },
          medications: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              dosage: true,
            },
          },
        },
      },
      consultation: {
        include: {
          summary: true,
        },
      },
    },
  });

  if (!appointment) {
    return apiNotFound("Appointment");
  }

  const typedAppointment = appointment as unknown as AppointmentWithDetails;

  if (typedAppointment.providerId !== providerId) {
    return apiForbidden("You do not have access to this appointment");
  }

  return apiSuccess({
    id: typedAppointment.id,
    scheduledAt: typedAppointment.scheduledAt,
    duration: typedAppointment.duration,
    type: typedAppointment.type,
    status: typedAppointment.status,
    paymentMethod: typedAppointment.paymentMethod,
    cashPrice: typedAppointment.cashPrice ? Number(typedAppointment.cashPrice) : null,
    videoRoomId: typedAppointment.videoRoomId,
    visitNotes: typedAppointment.visitNotes,
    patient: {
      id: typedAppointment.patient.id,
      firstName: typedAppointment.patient.firstName,
      lastName: typedAppointment.patient.lastName,
      dateOfBirth: typedAppointment.patient.dateOfBirth,
      email: typedAppointment.patient.user.email,
      phone: typedAppointment.patient.user.phone,
      allergies: typedAppointment.patient.allergies,
      currentMedications: typedAppointment.patient.medications,
    },
    consultation: typedAppointment.consultation
      ? {
          id: typedAppointment.consultation.id,
          status: typedAppointment.consultation.status,
          summary: typedAppointment.consultation.summary
            ? {
                chiefComplaint: typedAppointment.consultation.summary.chiefComplaint,
                symptomsSummary: typedAppointment.consultation.summary.symptomsSummary,
                relevantHistory: typedAppointment.consultation.summary.relevantHistory,
                riskFlags: typedAppointment.consultation.summary.riskFlags,
                severityAssessment: typedAppointment.consultation.summary.severityAssessment,
              }
            : null,
        }
      : null,
  });
});

export const PATCH = withAuth<{ id: string }>(async ({ user, params, request }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const appointmentId = params.id;

  const existingAppointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    select: { id: true, providerId: true },
  });

  if (!existingAppointment) {
    return apiNotFound("Appointment");
  }

  if (existingAppointment.providerId !== providerId) {
    return apiForbidden("You do not have access to this appointment");
  }

  const body = await request.json();
  const data = appointmentUpdateSchema.parse(body);

  const updatedAppointment = await prisma.appointment.update({
    where: { id: appointmentId },
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
    },
  });

  return apiSuccess({
    id: updatedAppointment.id,
    scheduledAt: updatedAppointment.scheduledAt,
    duration: updatedAppointment.duration,
    type: updatedAppointment.type,
    status: updatedAppointment.status,
    paymentMethod: updatedAppointment.paymentMethod,
    videoRoomId: updatedAppointment.videoRoomId,
    visitNotes: updatedAppointment.visitNotes,
    patient: updatedAppointment.patient,
  });
});
