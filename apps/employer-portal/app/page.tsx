import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";

const stats = [
  { label: "Total Employees", value: "248" },
  { label: "Enrolled in Program", value: "186" },
  { label: "Active Prescriptions", value: "312" },
  { label: "Monthly Savings", value: "$24,500" },
];

const recentActivity = [
  { employee: "John Smith", action: "Enrolled in wellness program", date: "2024-02-10" },
  { employee: "Sarah Wilson", action: "Prescription filled", date: "2024-02-09" },
  { employee: "Michael Brown", action: "Completed health screening", date: "2024-02-09" },
  { employee: "Emily Davis", action: "Enrolled in wellness program", date: "2024-02-08" },
];

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Employer Dashboard</h1>
        <p className="mt-1 text-neutral-600">
          Acme Corporation - Benefits Overview
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
                  <span>Wellness Program</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden bg-neutral-200">
                  <div className="h-full w-3/4 bg-employer-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Prescription Benefits</span>
                  <span className="font-medium">82%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden bg-neutral-200">
                  <div className="h-full bg-employer-500" style={{ width: "82%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Telemedicine</span>
                  <span className="font-medium">58%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden bg-neutral-200">
                  <div className="h-full bg-employer-500" style={{ width: "58%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest employee actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-neutral-200 p-3"
                >
                  <div>
                    <p className="font-medium">{activity.employee}</p>
                    <p className="text-sm text-neutral-500">{activity.action}</p>
                  </div>
                  <span className="text-sm text-neutral-400">{activity.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
