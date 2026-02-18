export * from "./employer";

export type Platform = "patient" | "doctor" | "pharmacy" | "employer";

export type UserRole =
  | "patient"
  | "caregiver"
  | "prescriber"
  | "pharmacist"
  | "technician"
  | "hr_admin"
  | "system_admin"
  | "developer";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  platform: Platform;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  role: "patient";
  dateOfBirth: Date;
  allergies: string[];
  medications: string[];
}

export interface Prescription {
  id: string;
  patientId: string;
  prescriberId: string;
  drugName: string;
  dosage: string;
  quantity: number;
  refillsRemaining: number;
  status: PrescriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type PrescriptionStatus =
  | "pending"
  | "verified"
  | "compounding"
  | "quality_check"
  | "ready"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderStatus =
  | "pending"
  | "processing"
  | "compounding"
  | "quality_check"
  | "packaging"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}
