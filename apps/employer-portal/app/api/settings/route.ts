import {
  apiSuccess,
  apiUnauthorized,
  getEmployerAdminFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

interface SettingsData {
  company: {
    id: string;
    name: string;
    taxId: string | null;
    industry: string | null;
    size: string | null;
  };
  contact: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string | null;
  };
  billingAddress: {
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
  };
  notifications: {
    enrollmentUpdates: boolean;
    monthlyReports: boolean;
    billingAlerts: boolean;
  };
}

export const GET = withAuth(async ({ user }) => {
  const employerAdmin = await getEmployerAdminFromAuth0Id(user.sub);

  if (!employerAdmin) {
    return apiUnauthorized("Employer admin profile not found");
  }

  const adminUser = await prisma.user.findUnique({
    where: { id: employerAdmin.userId },
    select: {
      email: true,
      phone: true,
    },
  });

  const settings: SettingsData = {
    company: {
      id: employerAdmin.employer.id,
      name: employerAdmin.employer.companyName,
      taxId: employerAdmin.employer.taxId,
      industry: employerAdmin.employer.industry,
      size: employerAdmin.employer.size,
    },
    contact: {
      firstName: employerAdmin.firstName,
      lastName: employerAdmin.lastName,
      email: adminUser?.email ?? "",
      phone: adminUser?.phone ?? null,
    },
    billingAddress: {
      street: employerAdmin.employer.billingStreet,
      city: employerAdmin.employer.billingCity,
      state: employerAdmin.employer.billingState,
      zip: employerAdmin.employer.billingZip,
    },
    notifications: {
      enrollmentUpdates: employerAdmin.enrollmentUpdates,
      monthlyReports: employerAdmin.monthlyReports,
      billingAlerts: employerAdmin.billingAlerts,
    },
  };

  return apiSuccess(settings);
});
