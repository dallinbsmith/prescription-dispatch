export type EmployeeEnrollmentStatus = "enrolled" | "pending" | "not_enrolled";

export type BenefitPlanStatus = "active" | "inactive";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  enrollmentStatus: EmployeeEnrollmentStatus;
  hireDate: string;
  activePrescriptions: number;
}

export interface EmployeeDetail extends Employee {
  firstName: string;
  lastName: string;
  phone: string | null;
  dateOfBirth: string;
  totalPrescriptions: number;
  prescriptions: EmployeePrescription[];
}

export interface EmployeePrescription {
  id: string;
  compoundName: string;
  status: string;
  prescribedAt: string;
  directions: string;
}

export interface BenefitPlan {
  id: string;
  name: string;
  description: string;
  enrolled: number;
  eligible: number;
  monthlyRateAmount: number;
  monthlyRate: string;
  status: BenefitPlanStatus;
  features: string[];
}

export interface BenefitsSummary {
  totalPlans: number;
  activePlans: number;
  totalEligible: number;
  totalMonthlySpend: string;
}

export interface BenefitsData {
  plans: BenefitPlan[];
  summary: BenefitsSummary;
}

export interface ReportType {
  id: string;
  name: string;
  description: string;
  lastGenerated: string | null;
}

export interface MonthlySummary {
  month: string;
  enrolled: number;
  claims: number;
  savings: number;
}

export interface ReportsTotals {
  totalEnrolled: number;
  totalClaims: number;
  totalSavings: number;
}

export interface ReportsData {
  reportTypes: ReportType[];
  monthlySummary: MonthlySummary[];
  totals: ReportsTotals;
}

export interface EmployerSettingsCompany {
  id: string;
  name: string;
  taxId: string | null;
  industry: string | null;
  size: string | null;
}

export interface EmployerSettingsContact {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
}

export interface EmployerSettingsBillingAddress {
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
}

export interface EmployerSettingsNotifications {
  enrollmentUpdates: boolean;
  monthlyReports: boolean;
  billingAlerts: boolean;
}

export interface EmployerSettingsData {
  company: EmployerSettingsCompany;
  contact: EmployerSettingsContact;
  billingAddress: EmployerSettingsBillingAddress;
  notifications: EmployerSettingsNotifications;
}

export interface DashboardStats {
  totalEmployees: number;
  enrolledInProgram: number;
  activePrescriptions: number;
  monthlySavings: string;
}

export interface DashboardEnrollment {
  prescriptionBenefits: number;
  wellnessProgram: number;
  telemedicine: number;
}

export interface DashboardRecentActivity {
  id: string;
  employeeName: string;
  action: string;
  date: string;
}

export interface DashboardData {
  companyName: string;
  stats: DashboardStats;
  enrollment: DashboardEnrollment;
  recentActivity: DashboardRecentActivity[];
}
