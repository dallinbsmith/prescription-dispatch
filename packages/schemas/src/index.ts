import { z } from "zod";

export const platformSchema = z.enum([
  "patient",
  "doctor",
  "pharmacy",
  "employer",
]);

export const userRoleSchema = z.enum([
  "patient",
  "caregiver",
  "prescriber",
  "pharmacist",
  "technician",
  "hr_admin",
  "system_admin",
]);

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: userRoleSchema,
  platform: platformSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const patientSchema = userSchema.extend({
  role: z.literal("patient"),
  dateOfBirth: z.coerce.date(),
  allergies: z.array(z.string()),
  medications: z.array(z.string()),
});

export const prescriptionStatusSchema = z.enum([
  "pending",
  "verified",
  "compounding",
  "quality_check",
  "ready",
  "shipped",
  "delivered",
  "cancelled",
]);

export const prescriptionSchema = z.object({
  id: z.string().uuid(),
  patientId: z.string().uuid(),
  prescriberId: z.string().uuid(),
  drugName: z.string().min(1),
  dosage: z.string().min(1),
  quantity: z.number().int().positive(),
  refillsRemaining: z.number().int().min(0),
  status: prescriptionStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type Platform = z.infer<typeof platformSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type User = z.infer<typeof userSchema>;
export type Patient = z.infer<typeof patientSchema>;
export type PrescriptionStatus = z.infer<typeof prescriptionStatusSchema>;
export type Prescription = z.infer<typeof prescriptionSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
