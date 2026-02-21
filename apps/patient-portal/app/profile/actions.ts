"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface ActionResult {
  success: boolean;
  data?: unknown;
  error?: { message: string };
}

const getBaseUrl = () => process.env.NEXT_PUBLIC_APP_URL ?? "";

const emptyToNull = (value: string | null): string | null =>
  value?.trim() ? value : null;

export const updateProfile = async (formData: FormData): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const phone = formData.get("phone") as string | null;
  const street1 = formData.get("street1") as string | null;

  const street2 = emptyToNull(formData.get("street2") as string | null);
  const address = street1
    ? {
        street1,
        street2,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zipCode: formData.get("zipCode") as string,
        country: "US",
      }
    : undefined;

  const response = await fetch(`${getBaseUrl()}/api/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      phone: phone ?? undefined,
      address,
    }),
  });

  const result = (await response.json()) as ActionResult;

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};

export const addAllergy = async (formData: FormData): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const data = {
    allergen: formData.get("allergen") as string,
    severity: formData.get("severity") as string,
    reaction: emptyToNull(formData.get("reaction") as string | null),
  };

  const response = await fetch(`${getBaseUrl()}/api/profile/allergies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as ActionResult;

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};

export const deleteAllergy = async (id: string): Promise<ActionResult> => {
  const cookieStore = await cookies();

  const response = await fetch(`${getBaseUrl()}/api/profile/allergies/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const result = (await response.json()) as ActionResult;

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};

export const addMedication = async (formData: FormData): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const data = {
    name: formData.get("name") as string,
    dosage: emptyToNull(formData.get("dosage") as string | null),
    frequency: emptyToNull(formData.get("frequency") as string | null),
  };

  const response = await fetch(`${getBaseUrl()}/api/profile/medications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as ActionResult;

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};

export const deleteMedication = async (id: string): Promise<ActionResult> => {
  const cookieStore = await cookies();

  const response = await fetch(`${getBaseUrl()}/api/profile/medications/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const result = (await response.json()) as ActionResult;

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};
