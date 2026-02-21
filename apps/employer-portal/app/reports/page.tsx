import { cookies } from "next/headers";

import { BarChart3, FileText } from "lucide-react";

import type { ReportsData } from "@rx/types";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
} from "@rx/ui";


interface ReportsResponse {
  data: ReportsData;
}

const getReportsData = async (): Promise<ReportsData | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(`${baseUrl}/api/reports`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as ReportsResponse;
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

const ReportsPage = async () => {
  const data = await getReportsData();
  const reportTypes = data?.reportTypes ?? [];
  const monthlySummary = data?.monthlySummary ?? [];
  const totals = data?.totals;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Reports</h1>
        <p className="mt-1 text-neutral-600">
          {totals
            ? `${totals.totalClaims.toLocaleString()} claims processed · $${totals.totalSavings.toLocaleString()} total savings`
            : "Generate and download benefit program reports"}
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportTypes.length > 0 ? (
          reportTypes.map((report) => (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{report.name}</CardTitle>
                <CardDescription className="text-xs">
                  {report.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-xs text-neutral-500">
                  Last generated: {report.lastGenerated ? formatDate(report.lastGenerated) : "Never"}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View
                  </Button>
                  <Button size="sm" className="flex-1">
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="sm:col-span-2 lg:col-span-4">
            <CardContent>
              <EmptyState
                icon={FileText}
                title="No report types available"
                description="Reports will appear here once your benefit programs are active."
              />
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
          <CardDescription>Program performance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          {monthlySummary.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table" aria-label="Monthly program summary">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th scope="col" className="pb-3 text-left font-medium text-neutral-500">Month</th>
                    <th scope="col" className="pb-3 text-left font-medium text-neutral-500">Enrolled</th>
                    <th scope="col" className="pb-3 text-left font-medium text-neutral-500">Claims Processed</th>
                    <th scope="col" className="pb-3 text-left font-medium text-neutral-500">Est. Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySummary.map((row) => (
                    <tr key={row.month} className="border-b border-neutral-100">
                      <td className="py-3 font-medium">{row.month}</td>
                      <td className="py-3">{row.enrolled} employees</td>
                      <td className="py-3">{row.claims} claims</td>
                      <td className="py-3 text-success-600">${row.savings.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={BarChart3}
              title="No data available"
              description="Monthly summaries will appear here as employees start using their benefits."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
