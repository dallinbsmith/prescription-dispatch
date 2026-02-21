import { prisma } from "@rx/database";

export interface EmployerAdminUser {
  id: string;
  userId: string;
  employerId: string;
  firstName: string | null;
  lastName: string | null;
  enrollmentUpdates: boolean;
  monthlyReports: boolean;
  billingAlerts: boolean;
  createdAt: Date;
  employer: {
    id: string;
    companyName: string;
    taxId: string | null;
    industry: string | null;
    size: string | null;
    billingStreet: string | null;
    billingCity: string | null;
    billingState: string | null;
    billingZip: string | null;
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
          firstName: true,
          lastName: true,
          enrollmentUpdates: true,
          monthlyReports: true,
          billingAlerts: true,
          createdAt: true,
          employer: {
            select: {
              id: true,
              companyName: true,
              taxId: true,
              industry: true,
              size: true,
              billingStreet: true,
              billingCity: true,
              billingState: true,
              billingZip: true,
            },
          },
        },
      },
    },
  });

  if (user?.role !== "hr_admin" || !user.employer) {
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
