import type { DashboardData } from "@rx/types";
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";
import { EmptyState } from "@rx/ui/empty-state";
import { Activity } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";


interface DashboardResponse {
  data: DashboardData;
}

const getDashboardData = async (): Promise<DashboardData | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(`${baseUrl}/api/dashboard`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as DashboardResponse;
    return result.data;
  } catch {
    return null;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const DashboardPage = async () => {
  const data = await getDashboardData();

  const stats = data
    ? [
        { label: "Total Employees", value: String(data.stats.totalEmployees) },
        { label: "Enrolled in Program", value: String(data.stats.enrolledInProgram) },
        { label: "Active Prescriptions", value: String(data.stats.activePrescriptions) },
        { label: "Monthly Savings", value: data.stats.monthlySavings },
      ]
    : [
        { label: "Total Employees", value: "—" },
        { label: "Enrolled in Program", value: "—" },
        { label: "Active Prescriptions", value: "—" },
        { label: "Monthly Savings", value: "—" },
      ];

  const enrollment = data?.enrollment ?? {
    wellnessProgram: 0,
    prescriptionBenefits: 0,
    telemedicine: 0,
  };

  const recentActivity = data?.recentActivity ?? [];
  const companyName = data?.companyName ?? "Your Company";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Employer Dashboard</h1>
        <p className="mt-1 text-neutral-600">
          {companyName} - Benefits Overview
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-employer-600">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Program Enrollment</CardTitle>
            <CardDescription>Employee participation rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span id="wellness-label">Wellness Program</span>
                  <span className="font-medium">{enrollment.wellnessProgram}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={enrollment.wellnessProgram}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-labelledby="wellness-label"
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200"
                >
                  <div
                    className="h-full rounded-full bg-employer-500"
                    style={{ width: `${String(enrollment.wellnessProgram)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span id="prescription-label">Prescription Benefits</span>
                  <span className="font-medium">{enrollment.prescriptionBenefits}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={enrollment.prescriptionBenefits}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-labelledby="prescription-label"
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200"
                >
                  <div
                    className="h-full rounded-full bg-employer-500"
                    style={{ width: `${String(enrollment.prescriptionBenefits)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span id="telemedicine-label">Telemedicine</span>
                  <span className="font-medium">{enrollment.telemedicine}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={enrollment.telemedicine}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-labelledby="telemedicine-label"
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200"
                >
                  <div
                    className="h-full rounded-full bg-employer-500"
                    style={{ width: `${String(enrollment.telemedicine)}%` }}
                  />
                </div>
              </div>
            </div>
            <Link href="/benefits" className="mt-4 block">
              <Button variant="outline" className="w-full">
                View All Benefits
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest employee actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 p-3"
                  >
                    <div>
                      <p className="font-medium">{activity.employeeName}</p>
                      <p className="text-sm text-neutral-500">{activity.action}</p>
                    </div>
                    <span className="text-sm text-neutral-400">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyState
                  icon={Activity}
                  title="No recent activity"
                  description="Employee activity will appear here as they enroll and use their benefits."
                  className="py-4"
                />
              )}
            </div>
            <Link href="/employees" className="mt-4 block">
              <Button variant="outline" className="w-full">
                View All Employees
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
