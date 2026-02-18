import {
  apiSuccess,
  apiUnauthorized,
  getEmployerIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

interface BenefitPlan {
  id: string;
  name: string;
  description: string;
  enrolled: number;
  eligible: number;
  monthlyRate: string;
  status: "active" | "inactive";
  features: string[];
}

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

  const wellnessEnrolled = Math.round(totalEmployees * 0.75);
  const telemedicineEnrolled = employeesWithAppointments || Math.round(totalEmployees * 0.58);

  const benefitPlans: BenefitPlan[] = [
    {
      id: "plan-wellness",
      name: "Wellness Program",
      description: "Comprehensive wellness services including health screenings and preventive care",
      enrolled: wellnessEnrolled,
      eligible: totalEmployees,
      monthlyRate: "$45/employee",
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
      monthlyRate: "$65/employee",
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
      monthlyRate: "$25/employee",
      status: "active",
      features: [
        "Unlimited video visits",
        "E-prescriptions",
        "Mental health support",
      ],
    },
  ];

  const totalMonthlySpend = benefitPlans.reduce((sum, plan) => {
    const rate = parseInt(plan.monthlyRate.replace(/\D/g, ""), 10);
    return sum + plan.enrolled * rate;
  }, 0);

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
