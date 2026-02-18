"use client";

import { useEffect, useState } from "react";

import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";
import { Input } from "@rx/ui/input";
import { Label } from "@rx/ui/label";
import { Badge } from "@rx/ui/badge";
import { formatDateForInput, parseDate } from "@rx/utils";

interface PatientProfile {
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
  allergies: Array<{
    id: string;
    allergen: string;
    severity: string;
    reaction: string | null;
  }>;
  medications: Array<{
    id: string;
    name: string;
    dosage: string | null;
    frequency: string | null;
    isActive: boolean;
  }>;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  const [saving, setSaving] = useState(false);

  const [newAllergy, setNewAllergy] = useState({ allergen: "", severity: "mild", reaction: "" });
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "", frequency: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profile");
      const result = await response.json();

      if (!result.success) {
        setError(result.error?.message ?? "Failed to load profile");
        setLoading(false);
        return;
      }

      setProfile(result.data);
      setPhone(result.data.user.phone ?? "");
      if (result.data.address) {
        setAddress({
          street1: result.data.address.street1,
          street2: result.data.address.street2 ?? "",
          city: result.data.address.city,
          state: result.data.address.state,
          zipCode: result.data.address.zipCode,
          country: result.data.address.country,
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone || undefined,
        address: address.street1 ? address : undefined,
      }),
    });
    const result = await response.json();

    if (result.success) {
      setProfile((prev) => prev ? { ...prev, ...result.data } : prev);
    }
    setSaving(false);
  };

  const handleAddAllergy = async () => {
    if (!newAllergy.allergen) return;

    const response = await fetch("/api/profile/allergies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAllergy),
    });
    const result = await response.json();

    if (result.success) {
      setProfile((prev) =>
        prev ? { ...prev, allergies: [result.data, ...prev.allergies] } : prev
      );
      setNewAllergy({ allergen: "", severity: "mild", reaction: "" });
    }
  };

  const handleDeleteAllergy = async (id: string) => {
    const response = await fetch(`/api/profile/allergies/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (result.success) {
      setProfile((prev) =>
        prev ? { ...prev, allergies: prev.allergies.filter((a) => a.id !== id) } : prev
      );
    }
  };

  const handleAddMedication = async () => {
    if (!newMedication.name) return;

    const response = await fetch("/api/profile/medications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMedication),
    });
    const result = await response.json();

    if (result.success) {
      setProfile((prev) =>
        prev ? { ...prev, medications: [result.data, ...prev.medications] } : prev
      );
      setNewMedication({ name: "", dosage: "", frequency: "" });
    }
  };

  const handleDeleteMedication = async (id: string) => {
    const response = await fetch(`/api/profile/medications/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (result.success) {
      setProfile((prev) =>
        prev ? { ...prev, medications: prev.medications.filter((m) => m.id !== id) } : prev
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-neutral-600">Loading profile...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error ?? "Profile not found"}
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
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" value={formatDateForInput(parseDate(profile.dateOfBirth))} disabled />
            </div>
            <Button onClick={handleSaveProfile} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
            <CardDescription>Where should we send your medications?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street1">Street Address</Label>
              <Input
                id="street1"
                value={address.street1}
                onChange={(e) => setAddress((prev) => ({ ...prev, street1: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street2">Apt, Suite, etc. (optional)</Label>
              <Input
                id="street2"
                value={address.street2}
                onChange={(e) => setAddress((prev) => ({ ...prev, street2: e.target.value }))}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={address.state}
                  onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                value={address.zipCode}
                onChange={(e) => setAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
              />
            </div>
            <Button onClick={handleSaveProfile} disabled={saving}>
              {saving ? "Saving..." : "Update Address"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allergies</CardTitle>
            <CardDescription>
              List your known allergies for safe prescribing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.allergies.length > 0 && (
              <div className="space-y-2">
                {profile.allergies.map((allergy) => (
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
                      onClick={() => handleDeleteAllergy(allergy.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-2 border-t pt-4">
              <Label>Add Allergy</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Allergen (e.g., Penicillin)"
                  value={newAllergy.allergen}
                  onChange={(e) => setNewAllergy((prev) => ({ ...prev, allergen: e.target.value }))}
                />
                <select
                  className="rounded-md border px-3"
                  value={newAllergy.severity}
                  onChange={(e) => setNewAllergy((prev) => ({ ...prev, severity: e.target.value }))}
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
              <Input
                placeholder="Reaction (optional)"
                value={newAllergy.reaction}
                onChange={(e) => setNewAllergy((prev) => ({ ...prev, reaction: e.target.value }))}
              />
              <Button onClick={handleAddAllergy} disabled={!newAllergy.allergen}>
                Add Allergy
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Medications</CardTitle>
            <CardDescription>
              List medications you're currently taking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.medications.length > 0 && (
              <div className="space-y-2">
                {profile.medications.map((med) => (
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
                      onClick={() => handleDeleteMedication(med.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-2 border-t pt-4">
              <Label>Add Medication</Label>
              <Input
                placeholder="Medication name"
                value={newMedication.name}
                onChange={(e) => setNewMedication((prev) => ({ ...prev, name: e.target.value }))}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Dosage (e.g., 10mg)"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, dosage: e.target.value }))}
                />
                <Input
                  placeholder="Frequency (e.g., once daily)"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, frequency: e.target.value }))}
                />
              </div>
              <Button onClick={handleAddMedication} disabled={!newMedication.name}>
                Add Medication
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
