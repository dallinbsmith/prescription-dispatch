import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";

const stats = [
  { label: "Patients Today", value: "12" },
  { label: "Pending Reviews", value: "5" },
  { label: "Prescriptions Written", value: "28" },
  { label: "Upcoming Appointments", value: "8" },
];

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Provider Dashboard</h1>
        <p className="mt-1 text-neutral-600">
          Welcome back, Dr. Johnson
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-doctor-600">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Patients seen in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["John Smith", "Sarah Wilson", "Michael Brown"].map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between border border-neutral-200 p-3"
                >
                  <span className="font-medium">{name}</span>
                  <Button variant="outline" size="sm">
                    View Chart
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>Upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "9:00 AM", patient: "Emily Davis", type: "Telemedicine" },
                { time: "10:30 AM", patient: "Robert Chen", type: "Follow-up" },
                { time: "2:00 PM", patient: "Lisa Anderson", type: "New Patient" },
              ].map((appt) => (
                <div
                  key={appt.time}
                  className="flex items-center justify-between border border-neutral-200 p-3"
                >
                  <div>
                    <p className="font-medium">{appt.patient}</p>
                    <p className="text-sm text-neutral-500">
                      {appt.time} • {appt.type}
                    </p>
                  </div>
                  <Button size="sm">Start Visit</Button>
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
