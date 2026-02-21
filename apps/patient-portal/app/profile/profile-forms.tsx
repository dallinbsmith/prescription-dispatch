"use client";

import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rx/ui/card";
import { Input } from "@rx/ui/input";
import { Label } from "@rx/ui/label";
import { formatDateForInput, parseDate } from "@rx/utils";
import { useActionState } from "react";

import {
  updateProfile,
  addAllergy,
  deleteAllergy,
  addMedication,
  deleteMedication,
} from "./actions";
import type { Allergy, Medication, PatientProfile } from "./types";

interface ActionResult {
  success: boolean;
  data?: unknown;
  error?: { message: string };
}

interface PersonalInfoFormProps {
  profile: PatientProfile;
}

export const PersonalInfoForm = ({ profile }: PersonalInfoFormProps) => {
  const [, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    async (_prevState, formData) => updateProfile(formData),
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
            <Input
              id="email"
              type="email"
              value={profile.user.email}
              disabled
            />
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
  const [, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    async (_prevState, formData) => updateProfile(formData),
    null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>
          Where should we send your medications?
        </CardDescription>
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
              <Input id="city" name="city" defaultValue={address?.city ?? ""} />
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
  const [, addAction, isAdding] = useActionState<ActionResult | null, FormData>(
    async (_prevState, formData) => {
      const result = await addAllergy(formData);
      if (result.success) {
        const form = document.getElementById(
          "add-allergy-form"
        ) as HTMLFormElement | null;
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
        <CardDescription>
          List your known allergies for safe prescribing
        </CardDescription>
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
                    <p className="text-sm text-neutral-500">
                      {allergy.reaction}
                    </p>
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
        <form
          id="add-allergy-form"
          action={addAction}
          className="space-y-2 border-t pt-4"
        >
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
  const [, addAction, isAdding] = useActionState<ActionResult | null, FormData>(
    async (_prevState, formData) => {
      const result = await addMedication(formData);
      if (result.success) {
        const form = document.getElementById(
          "add-medication-form"
        ) as HTMLFormElement | null;
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
        <CardDescription>
          List medications you&apos;re currently taking
        </CardDescription>
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
        <form
          id="add-medication-form"
          action={addAction}
          className="space-y-2 border-t pt-4"
        >
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
