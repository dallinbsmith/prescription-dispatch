# React Server Component Migration - Optimization Plan

## Overview

This optimization plan focuses on migrating components to React Server Components (RSC) following Next.js 14+ best practices. The goal is to improve SEO, reduce client-side JavaScript bundle size, and enable direct server-side data fetching.

## Current State Analysis

| Metric | Value |
|--------|-------|
| Total TSX files in apps | 52 |
| Client Components ("use client") | 13 (25%) |
| Server Components | 39 (75%) |

### Client Components Audit

| File | Status | Justification |
|------|--------|---------------|
| `apps/*/app/error.tsx` (4 files) | ✅ Keep | Requires useEffect, onClick for error recovery |
| `apps/*/components/nav.tsx` (4 files) | ✅ Keep | Uses useState, useUser, usePathname |
| `employer-portal/app/employees/pagination.tsx` | ✅ Keep | Uses useTransition, useRouter |
| `employer-portal/app/employees/export-button.tsx` | ✅ Keep | Uses useTransition, onClick |
| `employer-portal/app/employees/employee-filters.tsx` | ✅ Keep | Uses URL state management hooks |
| `employer-portal/app/settings/settings-forms.tsx` | ✅ Keep | Uses useActionState (correct pattern) |
| `patient-portal/app/profile/page.tsx` | ❌ **REFACTOR** | Page doing client-side data fetching |

---

## Step 1: Refactor Patient Profile Page to Server Component

**Priority:** High
**Scope:** 6 files (1 modified, 5 new)

### Problem

The `patient-portal/app/profile/page.tsx` is a 425-line client component that:
- Uses `useEffect` to fetch profile data from `/api/profile`
- Manages loading/error states with `useState`
- Contains 4 interactive cards (Personal Info, Address, Allergies, Medications)

This violates RSC principles by fetching data client-side when it should be fetched on the server.

### Solution

Split the monolithic client component into:
1. **Server Component** (`page.tsx`) - Fetches data and renders layout
2. **Client Sub-components** - Handle form interactivity

### Files to Create/Modify

#### 1.1 Create Server Actions File

**File:** `apps/patient-portal/app/profile/actions.ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const getBaseUrl = () => process.env.NEXT_PUBLIC_APP_URL ?? "";

export const updateProfile = async (formData: FormData) => {
  const cookieStore = await cookies();
  const phone = formData.get("phone") as string | null;
  const address = {
    street1: formData.get("street1") as string,
    street2: formData.get("street2") as string | null,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zipCode: formData.get("zipCode") as string,
    country: "US",
  };

  const response = await fetch(`${getBaseUrl()}/api/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      phone: phone || undefined,
      address: address.street1 ? address : undefined,
    }),
  });

  const result = await response.json();

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};

export const addAllergy = async (formData: FormData) => {
  const cookieStore = await cookies();
  const data = {
    allergen: formData.get("allergen") as string,
    severity: formData.get("severity") as string,
    reaction: formData.get("reaction") as string | null,
  };

  const response = await fetch(`${getBaseUrl()}/api/profile/allergies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};

export const deleteAllergy = async (id: string) => {
  const cookieStore = await cookies();

  const response = await fetch(`${getBaseUrl()}/api/profile/allergies/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const result = await response.json();

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};

export const addMedication = async (formData: FormData) => {
  const cookieStore = await cookies();
  const data = {
    name: formData.get("name") as string,
    dosage: formData.get("dosage") as string | null,
    frequency: formData.get("frequency") as string | null,
  };

  const response = await fetch(`${getBaseUrl()}/api/profile/medications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};

export const deleteMedication = async (id: string) => {
  const cookieStore = await cookies();

  const response = await fetch(`${getBaseUrl()}/api/profile/medications/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const result = await response.json();

  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
};
```

#### 1.2 Create Types File

**File:** `apps/patient-portal/app/profile/types.ts`

```typescript
export interface PatientProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } | null;
  user: {
    email: string;
    phone: string | null;
  };
  allergies: Allergy[];
  medications: Medication[];
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: string;
  reaction: string | null;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string | null;
  frequency: string | null;
  isActive: boolean;
}
```

#### 1.3 Create Client Form Components

**File:** `apps/patient-portal/app/profile/profile-forms.tsx`

```typescript
"use client";

import { useActionState } from "react";

import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";
import { Input } from "@rx/ui/input";
import { Label } from "@rx/ui/label";
import { Badge } from "@rx/ui/badge";
import { formatDateForInput, parseDate } from "@rx/utils";

import { updateProfile, addAllergy, deleteAllergy, addMedication, deleteMedication } from "./actions";
import type { PatientProfile, Allergy, Medication } from "./types";

interface PersonalInfoFormProps {
  profile: PatientProfile;
}

export const PersonalInfoForm = ({ profile }: PersonalInfoFormProps) => {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => updateProfile(formData),
    null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={profile.firstName} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={profile.lastName} disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={profile.user.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={profile.user.phone ?? ""}
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formatDateForInput(parseDate(profile.dateOfBirth))}
              disabled
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface AddressFormProps {
  address: PatientProfile["address"];
}

export const AddressForm = ({ address }: AddressFormProps) => {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => updateProfile(formData),
    null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>Where should we send your medications?</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street1">Street Address</Label>
            <Input
              id="street1"
              name="street1"
              defaultValue={address?.street1 ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street2">Apt, Suite, etc. (optional)</Label>
            <Input
              id="street2"
              name="street2"
              defaultValue={address?.street2 ?? ""}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                defaultValue={address?.city ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                defaultValue={address?.state ?? ""}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              defaultValue={address?.zipCode ?? ""}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Update Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface AllergiesFormProps {
  allergies: Allergy[];
}

export const AllergiesForm = ({ allergies }: AllergiesFormProps) => {
  const [addState, addAction, isAdding] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const result = await addAllergy(formData);
      if (result.success) {
        const form = document.getElementById("add-allergy-form") as HTMLFormElement;
        form?.reset();
      }
      return result;
    },
    null
  );

  const handleDelete = async (id: string) => {
    await deleteAllergy(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Allergies</CardTitle>
        <CardDescription>List your known allergies for safe prescribing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {allergies.length > 0 && (
          <div className="space-y-2">
            {allergies.map((allergy) => (
              <div
                key={allergy.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <span className="font-medium">{allergy.allergen}</span>
                  <Badge variant="secondary" className="ml-2">
                    {allergy.severity}
                  </Badge>
                  {allergy.reaction && (
                    <p className="text-sm text-neutral-500">{allergy.reaction}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(allergy.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        <form id="add-allergy-form" action={addAction} className="space-y-2 border-t pt-4">
          <Label>Add Allergy</Label>
          <div className="flex gap-2">
            <Input
              name="allergen"
              placeholder="Allergen (e.g., Penicillin)"
              required
            />
            <select
              name="severity"
              className="rounded-md border px-3"
              defaultValue="mild"
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <Input name="reaction" placeholder="Reaction (optional)" />
          <Button type="submit" disabled={isAdding}>
            {isAdding ? "Adding..." : "Add Allergy"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface MedicationsFormProps {
  medications: Medication[];
}

export const MedicationsForm = ({ medications }: MedicationsFormProps) => {
  const [addState, addAction, isAdding] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const result = await addMedication(formData);
      if (result.success) {
        const form = document.getElementById("add-medication-form") as HTMLFormElement;
        form?.reset();
      }
      return result;
    },
    null
  );

  const handleDelete = async (id: string) => {
    await deleteMedication(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Medications</CardTitle>
        <CardDescription>List medications you're currently taking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {medications.length > 0 && (
          <div className="space-y-2">
            {medications.map((med) => (
              <div
                key={med.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <span className="font-medium">{med.name}</span>
                  {med.dosage && (
                    <span className="ml-2 text-neutral-500">{med.dosage}</span>
                  )}
                  {med.frequency && (
                    <p className="text-sm text-neutral-500">{med.frequency}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(med.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        <form id="add-medication-form" action={addAction} className="space-y-2 border-t pt-4">
          <Label>Add Medication</Label>
          <Input name="name" placeholder="Medication name" required />
          <div className="flex gap-2">
            <Input name="dosage" placeholder="Dosage (e.g., 10mg)" />
            <Input name="frequency" placeholder="Frequency (e.g., once daily)" />
          </div>
          <Button type="submit" disabled={isAdding}>
            {isAdding ? "Adding..." : "Add Medication"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
```

#### 1.4 Update Page to Server Component

**File:** `apps/patient-portal/app/profile/page.tsx` (replace entire file)

```typescript
import { cookies } from "next/headers";

import { PersonalInfoForm, AddressForm, AllergiesForm, MedicationsForm } from "./profile-forms";
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
```

### Success Criteria

- [ ] Page loads without "Loading profile..." flash (SSR)
- [ ] Profile data renders immediately on page load
- [ ] All form submissions work correctly
- [ ] `revalidatePath` refreshes data after mutations
- [ ] No `useEffect` for data fetching
- [ ] Bundle analyzer shows reduced client-side JS for profile route

---

## Step 2: Add Loading UI for Server Component

**Priority:** Medium
**Scope:** 1 file (new)

### Rationale

With server-side data fetching, we need a `loading.tsx` file to show during the initial server render.

### Files to Create

**File:** `apps/patient-portal/app/profile/loading.tsx`

```typescript
import { Card, CardContent, CardHeader } from "@rx/ui/card";

const ProfileLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-200" />
        <div className="mt-2 h-5 w-72 animate-pulse rounded bg-neutral-200" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-40 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-56 animate-pulse rounded bg-neutral-200" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-10 w-full animate-pulse rounded bg-neutral-200" />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileLoading;
```

### Success Criteria

- [ ] Skeleton UI displays during navigation to /profile
- [ ] Smooth transition from loading to loaded state
- [ ] No layout shift when content loads

---

## Step 3: Audit Other Page Components

**Priority:** Low
**Scope:** Verification only (no changes expected)

### Pages to Verify

Confirm these pages follow RSC patterns (server-side data fetching):

| Portal | Page | Expected Pattern |
|--------|------|------------------|
| patient-portal | `/prescriptions` | Server fetch |
| patient-portal | `/orders` | Server fetch |
| provider-portal | `/patients` | Server fetch |
| provider-portal | `/appointments` | Server fetch |
| pharmacy-portal | `/orders` | Server fetch |
| employer-portal | `/employees` | Server fetch ✅ (verified) |
| employer-portal | `/settings` | Server fetch ✅ (verified) |

### Success Criteria

- [ ] All page.tsx files in app directories are Server Components (no "use client")
- [ ] Data fetching happens server-side with cookies forwarding
- [ ] Interactive elements are in separate client component files

---

## Summary

| Step | Files Modified | Files Created | Priority |
|------|----------------|---------------|----------|
| Step 1 | 1 | 4 | High |
| Step 2 | 0 | 1 | Medium |
| Step 3 | 0 | 0 | Low |
| **Total** | **1** | **5** | - |

### Benefits After Migration

1. **Improved Initial Load**: Profile data renders on first paint (no loading flash)
2. **Reduced Bundle Size**: ~400 lines of client JS moved to server
3. **Better SEO**: Profile content is server-rendered
4. **Simplified State**: No useState for loading/error/data states
5. **Consistent Pattern**: Matches employer-portal settings implementation
