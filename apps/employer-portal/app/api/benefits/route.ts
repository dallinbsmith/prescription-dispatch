import {
  apiSuccess,
  apiUnauthorized,
  getEmployerIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

import { FALLBACK_TELEMEDICINE_RATE, FALLBACK_WELLNESS_RATE } from "../constants";

interface BenefitPlan {
  id: string;
  name: string;
  description: string;
  enrolled: number;
  eligible: number;
  monthlyRateAmount: number;
  monthlyRate: string;
  status: "active" | "inactive";
  features: string[];
}

const PLAN_RATES = {
  wellness: 45,
  prescription: 65,
  telemedicine: 25,
} as const;

const formatRate = (amount: number): string => `$${String(amount)}/employee`;

export const GET = withAuth(async ({ user }) => {
  const employerId = await getEmployerIdFromAuth0Id(user.sub);

  if (!employerId) {
    return apiUnauthorized("Employer admin profile not found");
  }

  const [
    totalEmployees,
    employeesWithPrescriptions,
    employeesWithAppointments,
  ] = await Promise.all([
    prisma.patient.count({
      where: { employerId },
    }),
    prisma.patient.count({
      where: {
        employerId,
        prescriptions: { some: {} },
      },
    }),
    prisma.patient.count({
      where: {
        employerId,
        appointments: { some: {} },
      },
    }),
  ]);

  const wellnessEnrolled = Math.round(totalEmployees * FALLBACK_WELLNESS_RATE);
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- 0 appointments should use fallback rate
  const telemedicineEnrolled = employeesWithAppointments || Math.round(totalEmployees * FALLBACK_TELEMEDICINE_RATE);

  const benefitPlans: BenefitPlan[] = [
    {
      id: "plan-wellness",
      name: "Wellness Program",
      description: "Comprehensive wellness services including health screenings and preventive care",
      enrolled: wellnessEnrolled,
      eligible: totalEmployees,
      monthlyRateAmount: PLAN_RATES.wellness,
      monthlyRate: formatRate(PLAN_RATES.wellness),
      status: "active",
      features: [
        "Annual health screenings",
        "Preventive care consultations",
        "Wellness coaching",
      ],
    },
    {
      id: "plan-rx",
      name: "Prescription Benefits",
      description: "Compounded medications at reduced rates through our pharmacy network",
      enrolled: employeesWithPrescriptions,
      eligible: totalEmployees,
      monthlyRateAmount: PLAN_RATES.prescription,
      monthlyRate: formatRate(PLAN_RATES.prescription),
      status: "active",
      features: [
        "Discounted compound medications",
        "Home delivery",
        "Refill reminders",
      ],
    },
    {
      id: "plan-tele",
      name: "Telemedicine",
      description: "24/7 access to licensed healthcare providers via video consultation",
      enrolled: telemedicineEnrolled,
      eligible: totalEmployees,
      monthlyRateAmount: PLAN_RATES.telemedicine,
      monthlyRate: formatRate(PLAN_RATES.telemedicine),
      status: "active",
      features: [
        "Unlimited video visits",
        "E-prescriptions",
        "Mental health support",
      ],
    },
  ];

  const totalMonthlySpend = benefitPlans.reduce(
    (sum, plan) => sum + plan.enrolled * plan.monthlyRateAmount,
    0
  );

  return apiSuccess({
    plans: benefitPlans,
    summary: {
      totalPlans: benefitPlans.length,
      activePlans: benefitPlans.filter((p) => p.status === "active").length,
      totalEligible: totalEmployees,
      totalMonthlySpend: `$${totalMonthlySpend.toLocaleString()}`,
    },
  });
});
