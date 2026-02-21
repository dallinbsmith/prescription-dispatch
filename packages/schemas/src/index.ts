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

export const orderStatusSchema = z.enum([
  "pending",
  "processing",
  "compounding",
  "quality_check",
  "packaging",
  "shipped",
  "delivered",
  "cancelled",
]);

export const dosageFormSchema = z.enum([
  "injection",
  "capsule",
  "troche",
  "cream",
  "nasal_spray",
  "sublingual",
  "tablet",
  "solution",
  "suspension",
]);

export const appointmentTypeSchema = z.enum(["telemedicine", "in_person"]);

export const appointmentStatusSchema = z.enum([
  "scheduled",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
  "no_show",
]);

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const dateRangeQuerySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const prescriptionQuerySchema = paginationQuerySchema.merge(
  dateRangeQuerySchema.extend({
    status: prescriptionStatusSchema.optional(),
  })
);

export const orderQuerySchema = paginationQuerySchema.merge(
  dateRangeQuerySchema.extend({
    status: orderStatusSchema.optional(),
  })
);

export const prescriptionCreateSchema = z.object({
  patientId: z.string().cuid(),
  compoundId: z.string().cuid(),
  quantity: z.number().int().positive(),
  refills: z.number().int().min(0).max(12).default(0),
  directions: z.string().min(1).max(500),
  appointmentId: z.string().cuid().optional(),
});

export const prescriptionUpdateSchema = z.object({
  quantity: z.number().int().positive().optional(),
  directions: z.string().min(1).max(500).optional(),
});

export const prescriptionVerifySchema = z.object({
  verified: z.literal(true),
});

export const orderCreateSchema = z.object({
  prescriptionId: z.string().cuid(),
  shippingAddress: z.object({
    street1: z.string().min(1).max(200),
    street2: z.string().max(200).optional(),
    city: z.string().min(1).max(100),
    state: z.string().length(2),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    country: z.string().default("US"),
  }),
});

export const orderUpdateSchema = z.object({
  status: orderStatusSchema.optional(),
  trackingNumber: z.string().max(100).optional(),
  carrier: z.string().max(50).optional(),
});

export const patientProfileUpdateSchema = z.object({
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/).optional(),
  address: z
    .object({
      street1: z.string().min(1).max(200),
      street2: z.string().max(200).optional(),
      city: z.string().min(1).max(100),
      state: z.string().length(2),
      zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
      country: z.string().default("US"),
    })
    .optional(),
});

export const allergyCreateSchema = z.object({
  allergen: z.string().min(1).max(200),
  severity: z.enum(["mild", "moderate", "severe"]).optional(),
  reaction: z.string().max(500).optional(),
});

export const medicationCreateSchema = z.object({
  name: z.string().min(1).max(200),
  dosage: z.string().max(100).optional(),
  frequency: z.string().max(100).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const medicationUpdateSchema = medicationCreateSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const appointmentCreateSchema = z.object({
  patientId: z.string().cuid(),
  scheduledAt: z.coerce.date(),
  duration: z.number().int().min(15).max(120).default(30),
  type: appointmentTypeSchema,
  paymentMethod: z.enum(["cash", "insurance"]),
  consultationId: z.string().cuid().optional(),
});

export const appointmentUpdateSchema = z.object({
  status: appointmentStatusSchema.optional(),
  visitNotes: z.string().max(5000).optional(),
  videoRoomId: z.string().max(100).optional(),
});

export const compoundQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
  dosageForm: dosageFormSchema.optional(),
  isActive: z.coerce.boolean().optional(),
});

export const compoundUpdateSchema = z.object({
  cashPrice: z.number().positive().optional(),
  isActive: z.boolean().optional(),
});

export const employeeQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
  enrolled: z.coerce.boolean().optional(),
});

export const employeeEnrollmentStatusSchema = z.enum([
  "enrolled",
  "pending",
  "not_enrolled",
]);

export const employerEmployeeQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
  status: employeeEnrollmentStatusSchema.optional(),
  department: z.string().optional(),
});

export const employeeIdParamSchema = z.object({
  id: z.string().cuid(),
});

export const employerCompanyUpdateSchema = z.object({
  name: z.string().min(1).max(200),
  taxId: z.string().regex(/^\d{2}-\d{7}$/).optional().or(z.literal("")),
  industry: z.string().max(100).optional().or(z.literal("")),
  size: z.string().max(50).optional().or(z.literal("")),
});

export const employerContactUpdateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/).optional().or(z.literal("")),
});

export const employerBillingAddressUpdateSchema = z.object({
  street: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  state: z.string().length(2),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/),
});

export const employerNotificationsUpdateSchema = z.object({
  enrollmentUpdates: z.boolean(),
  monthlyReports: z.boolean(),
  billingAlerts: z.boolean(),
});

export const patientStatusSchema = z.enum(["active", "follow-up", "inactive"]);

export const patientSearchQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
  status: patientStatusSchema.optional(),
});

export const providerAppointmentQuerySchema = paginationQuerySchema.extend({
  date: z.coerce.date().optional(),
  status: appointmentStatusSchema.optional(),
  type: appointmentTypeSchema.optional(),
});

export const providerPrescriptionQuerySchema = paginationQuerySchema.merge(
  dateRangeQuerySchema.extend({
    patientId: z.string().cuid().optional(),
    status: prescriptionStatusSchema.optional(),
  })
);

export const visitNotesUpdateSchema = z.object({
  visitNotes: z.string().max(10000),
});

export const startVisitSchema = z.object({
  videoRoomId: z.string().max(100).optional(),
});

export type Platform = z.infer<typeof platformSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type User = z.infer<typeof userSchema>;
export type Patient = z.infer<typeof patientSchema>;
export type PrescriptionStatus = z.infer<typeof prescriptionStatusSchema>;
export type Prescription = z.infer<typeof prescriptionSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type DosageForm = z.infer<typeof dosageFormSchema>;
export type AppointmentType = z.infer<typeof appointmentTypeSchema>;
export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type DateRangeQuery = z.infer<typeof dateRangeQuerySchema>;
export type PrescriptionQuery = z.infer<typeof prescriptionQuerySchema>;
export type OrderQuery = z.infer<typeof orderQuerySchema>;
export type PrescriptionCreate = z.infer<typeof prescriptionCreateSchema>;
export type PrescriptionUpdate = z.infer<typeof prescriptionUpdateSchema>;
export type OrderCreate = z.infer<typeof orderCreateSchema>;
export type OrderUpdate = z.infer<typeof orderUpdateSchema>;
export type PatientProfileUpdate = z.infer<typeof patientProfileUpdateSchema>;
export type AllergyCreate = z.infer<typeof allergyCreateSchema>;
export type MedicationCreate = z.infer<typeof medicationCreateSchema>;
export type MedicationUpdate = z.infer<typeof medicationUpdateSchema>;
export type AppointmentCreate = z.infer<typeof appointmentCreateSchema>;
export type AppointmentUpdate = z.infer<typeof appointmentUpdateSchema>;
export type CompoundQuery = z.infer<typeof compoundQuerySchema>;
export type CompoundUpdate = z.infer<typeof compoundUpdateSchema>;
export type EmployeeQuery = z.infer<typeof employeeQuerySchema>;
export type EmployeeEnrollmentStatus = z.infer<typeof employeeEnrollmentStatusSchema>;
export type EmployerEmployeeQuery = z.infer<typeof employerEmployeeQuerySchema>;
export type EmployeeIdParam = z.infer<typeof employeeIdParamSchema>;
export type PatientStatus = z.infer<typeof patientStatusSchema>;
export type PatientSearchQuery = z.infer<typeof patientSearchQuerySchema>;
export type ProviderAppointmentQuery = z.infer<typeof providerAppointmentQuerySchema>;
export type ProviderPrescriptionQuery = z.infer<typeof providerPrescriptionQuerySchema>;
export type VisitNotesUpdate = z.infer<typeof visitNotesUpdateSchema>;
export type StartVisit = z.infer<typeof startVisitSchema>;
export type EmployerCompanyUpdate = z.infer<typeof employerCompanyUpdateSchema>;
export type EmployerContactUpdate = z.infer<typeof employerContactUpdateSchema>;
export type EmployerBillingAddressUpdate = z.infer<typeof employerBillingAddressUpdateSchema>;
export type EmployerNotificationsUpdate = z.infer<typeof employerNotificationsUpdateSchema>;
