export const RECENT_ORDERS_LIMIT = 5;
export const RECENT_PRESCRIPTIONS_LIMIT = 10;
export const MONTHLY_SUMMARY_MONTHS = 6;

export const AVG_SAVINGS_PER_RX = 85;

export const WELLNESS_ENROLLMENT_OFFSET = 7;
export const TELEMEDICINE_ENROLLMENT_OFFSET = 24;

export const FALLBACK_WELLNESS_RATE = 0.75;
export const FALLBACK_TELEMEDICINE_RATE = 0.58;

export const ACTIVE_PRESCRIPTION_STATUSES = [
  "pending",
  "verified",
  "compounding",
  "quality_check",
  "ready",
] as const;

export const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
] as const;
