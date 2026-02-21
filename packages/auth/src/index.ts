import type { Platform, UserRole } from "@rx/types";

export * from "./auth0";
export * from "./types";
export * from "./middleware";

export interface Permission {
  action: string;
  resource: string;
  conditions?: Record<string, unknown>;
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

export const PERMISSIONS: Record<UserRole, Permission[]> = {
  patient: [
    { action: "read", resource: "own_prescriptions" },
    { action: "read", resource: "own_orders" },
    { action: "create", resource: "own_orders" },
    { action: "read", resource: "own_profile" },
    { action: "update", resource: "own_profile" },
  ],
  caregiver: [
    { action: "read", resource: "patient_prescriptions" },
    { action: "read", resource: "patient_orders" },
    { action: "create", resource: "patient_orders" },
  ],
  prescriber: [
    { action: "read", resource: "patients" },
    { action: "create", resource: "prescriptions" },
    { action: "read", resource: "prescriptions" },
    { action: "update", resource: "prescriptions" },
  ],
  pharmacist: [
    { action: "read", resource: "prescriptions" },
    { action: "update", resource: "prescriptions" },
    { action: "verify", resource: "prescriptions" },
    { action: "read", resource: "orders" },
    { action: "update", resource: "orders" },
  ],
  technician: [
    { action: "read", resource: "prescriptions" },
    { action: "read", resource: "orders" },
    { action: "update", resource: "orders" },
  ],
  hr_admin: [
    { action: "read", resource: "employees" },
    { action: "create", resource: "employees" },
    { action: "update", resource: "employees" },
    { action: "read", resource: "benefits" },
  ],
  system_admin: [
    { action: "*", resource: "*" },
  ],
};

export const hasPermission = (
  role: UserRole,
  action: string,
  resource: string
): boolean => {
  const permissions = PERMISSIONS[role];
  return permissions.some(
    (p) =>
      (p.action === "*" || p.action === action) &&
      (p.resource === "*" || p.resource === resource)
  );
};

export const getPlatformForRole = (role: UserRole): Platform => {
  switch (role) {
    case "patient":
    case "caregiver":
      return "patient";
    case "prescriber":
      return "doctor";
    case "pharmacist":
    case "technician":
      return "pharmacy";
    case "hr_admin":
      return "employer";
    case "system_admin":
      return "pharmacy";
    default: {
      const _exhaustiveCheck: never = role;
      throw new Error(`Unhandled role: ${String(_exhaustiveCheck)}`);
    }
  }
};

export const PORTAL_ROLES = {
  patient: ["patient", "caregiver"],
  provider: ["prescriber"],
  pharmacy: ["pharmacist", "technician", "system_admin"],
  employer: ["hr_admin"],
} as const;
