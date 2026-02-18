"use server";

import { getEmployerAdminFromAuth0Id } from "@rx/api-server";
import { getSession } from "@rx/auth";
import { prisma } from "@rx/database";
import {
  employerBillingAddressUpdateSchema,
  employerCompanyUpdateSchema,
  employerContactUpdateSchema,
  employerNotificationsUpdateSchema,
} from "@rx/schemas";
import { revalidatePath } from "next/cache";

interface ActionResult {
  success: boolean;
  error?: string;
}

const getAuthenticatedEmployerAdmin = async () => {
  const session = await getSession();
  if (!session?.user.sub) {
    return null;
  }
  return getEmployerAdminFromAuth0Id(session.user.sub);
};

export const updateCompanyInfo = async (formData: FormData): Promise<ActionResult> => {
  const admin = await getAuthenticatedEmployerAdmin();
  if (!admin) {
    return { success: false, error: "Not authenticated" };
  }

  const result = employerCompanyUpdateSchema.safeParse({
    name: formData.get("companyName"),
    taxId: formData.get("taxId") ?? undefined,
    industry: formData.get("industry") ?? undefined,
    size: formData.get("size") ?? undefined,
  });

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid data" };
  }

  await prisma.employer.update({
    where: { id: admin.employerId },
    data: {
      companyName: result.data.name,
    },
  });

  revalidatePath("/settings");
  return { success: true };
};

export const updateContact = async (formData: FormData): Promise<ActionResult> => {
  const admin = await getAuthenticatedEmployerAdmin();
  if (!admin) {
    return { success: false, error: "Not authenticated" };
  }

  const result = employerContactUpdateSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? undefined,
  });

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid data" };
  }

  await prisma.user.update({
    where: { id: admin.userId },
    data: {
      email: result.data.email,
      phone: result.data.phone ?? null,
    },
  });

  revalidatePath("/settings");
  return { success: true };
};

export const updateBillingAddress = async (formData: FormData): Promise<ActionResult> => {
  const admin = await getAuthenticatedEmployerAdmin();
  if (!admin) {
    return { success: false, error: "Not authenticated" };
  }

  const result = employerBillingAddressUpdateSchema.safeParse({
    street: formData.get("street"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
  });

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid data" };
  }

  revalidatePath("/settings");
  return { success: true };
};

export const updateNotifications = async (formData: FormData): Promise<ActionResult> => {
  const admin = await getAuthenticatedEmployerAdmin();
  if (!admin) {
    return { success: false, error: "Not authenticated" };
  }

  const result = employerNotificationsUpdateSchema.safeParse({
    enrollmentUpdates: formData.get("enrollmentUpdates") === "on",
    monthlyReports: formData.get("monthlyReports") === "on",
    billingAlerts: formData.get("billingAlerts") === "on",
  });

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid data" };
  }

  revalidatePath("/settings");
  return { success: true };
};
