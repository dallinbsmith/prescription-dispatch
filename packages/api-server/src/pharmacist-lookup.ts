import { prisma } from "@rx/database";

const PHARMACY_ROLES = ["pharmacist", "technician", "system_admin"] as const;

export interface PharmacyStaffUser {
  id: string;
  email: string;
  phone: string | null;
  role: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getPharmacyStaffFromAuth0Id = async (
  auth0Id: string
): Promise<PharmacyStaffUser | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    select: {
      id: true,
      email: true,
      phone: true,
      role: true,
      platform: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return null;
  }

  const isPharmacyStaff = PHARMACY_ROLES.includes(
    user.role as (typeof PHARMACY_ROLES)[number]
  );

  if (!isPharmacyStaff) {
    return null;
  }

  return user;
};

export const getPharmacyStaffIdFromAuth0Id = async (
  auth0Id: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    select: {
      id: true,
      role: true,
    },
  });

  if (!user) {
    return null;
  }

  const isPharmacyStaff = PHARMACY_ROLES.includes(
    user.role as (typeof PHARMACY_ROLES)[number]
  );

  if (!isPharmacyStaff) {
    return null;
  }

  return user.id;
};

export const userHasPharmacyRole = async (auth0Id: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    select: {
      role: true,
    },
  });

  if (!user) {
    return false;
  }

  return PHARMACY_ROLES.includes(user.role as (typeof PHARMACY_ROLES)[number]);
};

export const isPharmacist = async (auth0Id: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    select: {
      role: true,
    },
  });

  return user?.role === "pharmacist";
};
