import { prisma } from "@rx/database";

export interface ProviderWithDetails {
  id: string;
  userId: string;
  type: string;
  npi: string;
  firstName: string;
  lastName: string;
  credentialingStatus: string;
  telemedicineEnabled: boolean;
  practiceName: string | null;
  employmentStartDate: Date | null;
  compensationModel: string | null;
  createdAt: Date;
  updatedAt: Date;
  licenses: {
    id: string;
    state: string;
    licenseNumber: string;
    expirationDate: Date;
    status: string;
  }[];
  specialties: {
    id: string;
    specialty: string;
  }[];
}

export const getProviderFromAuth0Id = async (
  auth0Id: string
): Promise<ProviderWithDetails | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    include: {
      provider: {
        include: {
          licenses: true,
          specialties: true,
        },
      },
    },
  });

  if (!user?.provider) {
    return null;
  }

  return user.provider;
};

export const getProviderIdFromAuth0Id = async (
  auth0Id: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    select: {
      provider: {
        select: {
          id: true,
        },
      },
    },
  });

  return user?.provider?.id ?? null;
};

export const getProviderWithUser = async (
  auth0Id: string
): Promise<{ provider: ProviderWithDetails; email: string } | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    include: {
      provider: {
        include: {
          licenses: true,
          specialties: true,
        },
      },
    },
  });

  if (!user?.provider) {
    return null;
  }

  return {
    provider: user.provider,
    email: user.email,
  };
};

export const providerHasActiveLicenseForState = async (
  providerId: string,
  state: string
): Promise<boolean> => {
  const license = await prisma.stateLicense.findFirst({
    where: {
      providerId,
      state,
      status: "active",
      expirationDate: {
        gt: new Date(),
      },
    },
  });

  return license !== null;
};
