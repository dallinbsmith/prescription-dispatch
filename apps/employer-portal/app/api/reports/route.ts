import {
  apiSuccess,
  apiUnauthorized,
  getEmployerIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

import { AVG_SAVINGS_PER_RX, MONTHLY_SUMMARY_MONTHS } from "../constants";

interface ReportType {
  id: string;
  name: string;
  description: string;
  lastGenerated: string | null;
}

interface MonthlySummary {
  month: string;
  enrolled: number;
  claims: number;
  savings: number;
}

const REPORT_DEFINITIONS: Omit<ReportType, "lastGenerated">[] = [
  {
    id: "enrollment",
    name: "Enrollment Report",
    description: "Summary of employee enrollment across all benefit programs",
  },
  {
    id: "utilization",
    name: "Utilization Report",
    description: "Program usage statistics and trends",
  },
  {
    id: "cost",
    name: "Cost Analysis",
    description: "Detailed breakdown of benefit costs and savings",
  },
  {
    id: "claims",
    name: "Claims Summary",
    description: "Overview of prescription claims and processing status",
  },
];

const formatMonth = (date: Date): string => {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const getLastNMonths = (n: number): Date[] => {
  const months: Date[] = [];
  const now = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(date);
  }

  return months;
};

export const GET = withAuth(async ({ user }) => {
  const employerId = await getEmployerIdFromAuth0Id(user.sub);

  if (!employerId) {
    return apiUnauthorized("Employer admin profile not found");
  }

  const months = getLastNMonths(MONTHLY_SUMMARY_MONTHS);

  const monthlySummaryPromises = months.map(async (monthStart) => {
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0, 23, 59, 59);

    const [enrolledCount, claimsCount] = await Promise.all([
      prisma.patient.count({
        where: {
          employerId,
          prescriptions: {
            some: {
              prescribedAt: {
                gte: monthStart,
                lte: monthEnd,
              },
            },
          },
        },
      }),
      prisma.order.count({
        where: {
          patient: { employerId },
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
    ]);

    return {
      month: formatMonth(monthStart),
      enrolled: enrolledCount,
      claims: claimsCount,
      savings: claimsCount * AVG_SAVINGS_PER_RX,
    };
  });

  const monthlySummary: MonthlySummary[] = await Promise.all(monthlySummaryPromises);

  const lastOrder = await prisma.order.findFirst({
    where: {
      patient: { employerId },
    },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });

  const lastGeneratedDate: string | null = lastOrder
    ? (lastOrder.createdAt.toISOString().split("T")[0] ?? null)
    : null;

  const reportTypes: ReportType[] = REPORT_DEFINITIONS.map((report) => ({
    ...report,
    lastGenerated: lastGeneratedDate,
  }));

  const totals = monthlySummary.reduce(
    (acc, month) => ({
      totalEnrolled: Math.max(acc.totalEnrolled, month.enrolled),
      totalClaims: acc.totalClaims + month.claims,
      totalSavings: acc.totalSavings + month.savings,
    }),
    { totalEnrolled: 0, totalClaims: 0, totalSavings: 0 }
  );

  return apiSuccess({
    reportTypes,
    monthlySummary,
    totals,
  });
});
