"use client";

import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";
import { Checkbox } from "@rx/ui/checkbox";
import { Input } from "@rx/ui/input";
import { Label } from "@rx/ui/label";
import { useActionState } from "react";

import {
  updateBillingAddress,
  updateCompanyInfo,
  updateContact,
  updateNotifications,
} from "./actions";

interface FormState {
  success: boolean;
  error?: string;
}

const initialState: FormState = { success: false };

interface CompanyFormProps {
  company: {
    name: string;
    taxId: string | null;
    industry: string | null;
    size: string | null;
  };
}

export const CompanyForm = ({ company }: CompanyFormProps) => {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      return updateCompanyInfo(formData);
    },
    initialState
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>Update your organization details</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" name="companyName" defaultValue={company.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID / EIN</Label>
            <Input id="taxId" name="taxId" defaultValue={company.taxId ?? ""} placeholder="XX-XXXXXXX" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" name="industry" defaultValue={company.industry ?? ""} placeholder="Technology" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Company Size</Label>
              <Input id="size" name="size" defaultValue={company.size ?? ""} placeholder="200-500 employees" />
            </div>
          </div>
          {state.error && <p className="text-sm text-red-600">{state.error}</p>}
          {state.success && <p className="text-sm text-green-600">Saved</p>}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface ContactFormProps {
  contact: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string | null;
  };
}

export const ContactForm = ({ contact }: ContactFormProps) => {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      return updateContact(formData);
    },
    initialState
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Primary Contact</CardTitle>
        <CardDescription>HR administrator information</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" defaultValue={contact.firstName ?? ""} placeholder="First name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" defaultValue={contact.lastName ?? ""} placeholder="Last name" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={contact.email} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" defaultValue={contact.phone ?? ""} placeholder="(555) 123-4567" />
          </div>
          {state.error && <p className="text-sm text-red-600">{state.error}</p>}
          {state.success && <p className="text-sm text-green-600">Saved</p>}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Update Contact"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface BillingAddressFormProps {
  billingAddress: {
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
  };
}

export const BillingAddressForm = ({ billingAddress }: BillingAddressFormProps) => {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      return updateBillingAddress(formData);
    },
    initialState
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Address</CardTitle>
        <CardDescription>Address for invoices and statements</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" name="street" defaultValue={billingAddress.street ?? ""} placeholder="123 Main St" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" defaultValue={billingAddress.city ?? ""} placeholder="City" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" defaultValue={billingAddress.state ?? ""} placeholder="ST" maxLength={2} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" name="zip" defaultValue={billingAddress.zip ?? ""} placeholder="00000" required />
            </div>
          </div>
          {state.error && <p className="text-sm text-red-600">{state.error}</p>}
          {state.success && <p className="text-sm text-green-600">Saved</p>}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Update Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface NotificationsFormProps {
  notifications: {
    enrollmentUpdates: boolean;
    monthlyReports: boolean;
    billingAlerts: boolean;
  };
}

export const NotificationsForm = ({ notifications }: NotificationsFormProps) => {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      return updateNotifications(formData);
    },
    initialState
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Email notification preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enrollment Updates</p>
              <p className="text-sm text-neutral-500">
                Get notified when employees enroll or unenroll
              </p>
            </div>
            <Checkbox
              id="enrollmentUpdates"
              name="enrollmentUpdates"
              defaultChecked={notifications.enrollmentUpdates}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Monthly Reports</p>
              <p className="text-sm text-neutral-500">
                Receive automated monthly summary reports
              </p>
            </div>
            <Checkbox
              id="monthlyReports"
              name="monthlyReports"
              defaultChecked={notifications.monthlyReports}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Billing Alerts</p>
              <p className="text-sm text-neutral-500">
                Get notified about upcoming invoices
              </p>
            </div>
            <Checkbox
              id="billingAlerts"
              name="billingAlerts"
              defaultChecked={notifications.billingAlerts}
            />
          </div>
          {state.error && <p className="text-sm text-red-600">{state.error}</p>}
          {state.success && <p className="text-sm text-green-600">Saved</p>}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Preferences"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
