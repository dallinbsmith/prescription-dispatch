import { prisma } from "@rx/database";

export interface PatientWithAddress {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  employerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  address: {
    id: string;
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } | null;
}

export const getPatientFromAuth0Id = async (
  auth0Id: string
): Promise<PatientWithAddress | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    include: {
      patient: {
        include: {
          address: true,
        },
      },
    },
  });

  if (!user?.patient) {
    return null;
  }

  return user.patient;
};

export const getPatientIdFromAuth0Id = async (
  auth0Id: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    select: {
      patient: {
        select: {
          id: true,
        },
      },
    },
  });

  return user?.patient?.id ?? null;
};
