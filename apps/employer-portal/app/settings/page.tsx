import type { EmployerSettingsData } from "@rx/types";
import { cookies } from "next/headers";

import {
  BillingAddressForm,
  CompanyForm,
  ContactForm,
  NotificationsForm,
} from "./settings-forms";


interface SettingsResponse {
  data: EmployerSettingsData;
}

const getSettingsData = async (): Promise<EmployerSettingsData | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(`${baseUrl}/api/settings`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as SettingsResponse;
    return result.data;
  } catch {
    return null;
  }
};

const SettingsPage = async () => {
  const data = await getSettingsData();

  const company = data?.company ?? {
    name: "",
    taxId: null,
    industry: null,
    size: null,
  };

  const contact = data?.contact ?? {
    firstName: null,
    lastName: null,
    email: "",
    phone: null,
  };

  const billingAddress = data?.billingAddress ?? {
    street: null,
    city: null,
    state: null,
    zip: null,
  };

  const notifications = data?.notifications ?? {
    enrollmentUpdates: true,
    monthlyReports: true,
    billingAlerts: true,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="mt-1 text-neutral-600">
          Manage your company account and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CompanyForm company={company} />
        <ContactForm contact={contact} />
        <BillingAddressForm billingAddress={billingAddress} />
        <NotificationsForm notifications={notifications} />
      </div>
    </div>
  );
};

export default SettingsPage;
