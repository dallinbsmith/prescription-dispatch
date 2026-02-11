import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";

const reportTypes = [
  {
    id: "enrollment",
    name: "Enrollment Report",
    description: "Summary of employee enrollment across all benefit programs",
    lastGenerated: "2024-02-09",
  },
  {
    id: "utilization",
    name: "Utilization Report",
    description: "Program usage statistics and trends",
    lastGenerated: "2024-02-08",
  },
  {
    id: "cost",
    name: "Cost Analysis",
    description: "Detailed breakdown of benefit costs and savings",
    lastGenerated: "2024-02-01",
  },
  {
    id: "claims",
    name: "Claims Summary",
    description: "Overview of prescription claims and processing status",
    lastGenerated: "2024-02-07",
  },
];

const monthlySummary = [
  { month: "Jan 2024", enrolled: 178, claims: 312, savings: 18500 },
  { month: "Feb 2024", enrolled: 186, claims: 298, savings: 24500 },
];

const ReportsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Reports</h1>
        <p className="mt-1 text-neutral-600">
          Generate and download benefit program reports
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((report) => (
          <Card key={report.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{report.name}</CardTitle>
              <CardDescription className="text-xs">
                {report.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-xs text-neutral-500">
                Last generated: {report.lastGenerated}
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
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
          <CardDescription>Program performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="pb-3 text-left font-medium text-neutral-500">Month</th>
                  <th className="pb-3 text-left font-medium text-neutral-500">Enrolled</th>
                  <th className="pb-3 text-left font-medium text-neutral-500">Claims Processed</th>
                  <th className="pb-3 text-left font-medium text-neutral-500">Est. Savings</th>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
