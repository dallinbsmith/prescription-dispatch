import { cookies } from "next/headers";

import {
  PersonalInfoForm,
  AddressForm,
  AllergiesForm,
  MedicationsForm,
} from "./profile-forms";
import type { PatientProfile } from "./types";

interface ProfileResponse {
  success: boolean;
  data?: PatientProfile;
  error?: { message: string };
}

const getProfileData = async (): Promise<PatientProfile | null> => {
  const cookieStore = await cookies();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

  const response = await fetch(`${baseUrl}/api/profile`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const result = (await response.json()) as ProfileResponse;
  return result.success ? result.data ?? null : null;
};

const ProfilePage = async () => {
  const profile = await getProfileData();

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Unable to load profile. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Profile Settings</h1>
        <p className="mt-1 text-neutral-600">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PersonalInfoForm profile={profile} />
        <AddressForm address={profile.address} />
        <AllergiesForm allergies={profile.allergies} />
        <MedicationsForm medications={profile.medications} />
      </div>
    </div>
  );
};

export default ProfilePage;
