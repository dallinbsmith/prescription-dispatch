import { prisma } from "@rx/database";

export interface EmployerAdminUser {
  id: string;
  userId: string;
  employerId: string;
  createdAt: Date;
  employer: {
    id: string;
    companyName: string;
  };
}

export const getEmployerAdminFromAuth0Id = async (
  auth0Id: string
): Promise<EmployerAdminUser | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    select: {
      id: true,
      role: true,
      employer: {
        select: {
          id: true,
          userId: true,
          employerId: true,
          createdAt: true,
          employer: {
            select: {
              id: true,
              companyName: true,
            },
          },
        },
      },
    },
  });

  if (!user || user.role !== "hr_admin") {
    return null;
  }

  if (!user.employer) {
    return null;
  }

  return user.employer;
};

export const getEmployerIdFromAuth0Id = async (
  auth0Id: string
): Promise<string | null> => {
  const admin = await getEmployerAdminFromAuth0Id(auth0Id);
  return admin?.employerId ?? null;
};

export const getEmployerAdminIdFromAuth0Id = async (
  auth0Id: string
): Promise<string | null> => {
  const admin = await getEmployerAdminFromAuth0Id(auth0Id);
  return admin?.id ?? null;
};
