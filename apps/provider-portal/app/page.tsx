
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";
import { cookies } from "next/headers";
import Link from "next/link";

interface DashboardData {
  today: {
    appointments: number;
    scheduled: number;
    confirmed: number;
    inProgress: number;
    completed: number;
  };
  overview: {
    pendingPrescriptions: number;
    activePatients: number;
    monthlyAppointments: number;
    monthlyPrescriptions: number;
  };
  upcomingAppointments: {
    id: string;
    scheduledAt: string;
    type: string;
    patient: {
      id: string;
      name: string;
    };
  }[];
  recentPrescriptions: {
    id: string;
    status: string;
    prescribedAt: string;
    patient: {
      id: string;
      name: string;
    };
    compound: string;
  }[];
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

    const result = (await response.json()) as { data: DashboardData };
    return result.data;
  } catch {
    return null;
  }
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatAppointmentType = (type: string) => {
  return type === "telemedicine" ? "Telemedicine" : "In Person";
};

const DashboardPage = async () => {
  const data = await getDashboardData();

  const stats = data
    ? [
        { label: "Today's Appointments", value: String(data.today.appointments) },
        { label: "Pending Prescriptions", value: String(data.overview.pendingPrescriptions) },
        { label: "Active Patients", value: String(data.overview.activePatients) },
        { label: "Monthly Prescriptions", value: String(data.overview.monthlyPrescriptions) },
      ]
    : [
        { label: "Today's Appointments", value: "—" },
        { label: "Pending Prescriptions", value: "—" },
        { label: "Active Patients", value: "—" },
        { label: "Monthly Prescriptions", value: "—" },
      ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Provider Dashboard</h1>
        <p className="mt-1 text-neutral-600">Welcome back</p>
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
            <CardTitle>Recent Prescriptions</CardTitle>
            <CardDescription>Prescriptions written in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.recentPrescriptions && data.recentPrescriptions.length > 0 ? (
                data.recentPrescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="flex items-center justify-between border border-neutral-200 p-3"
                  >
                    <div>
                      <span className="font-medium">{rx.patient.name}</span>
                      <p className="text-sm text-neutral-500">{rx.compound}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        rx.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : rx.status === "verified"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {rx.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-neutral-500 py-4">No recent prescriptions</p>
              )}
            </div>
            <Link href="/patients" className="mt-4 block">
              <Button variant="outline" className="w-full">
                View All Patients
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your next scheduled visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.upcomingAppointments && data.upcomingAppointments.length > 0 ? (
                data.upcomingAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-center justify-between border border-neutral-200 p-3"
                  >
                    <div>
                      <p className="font-medium">{appt.patient.name}</p>
                      <p className="text-sm text-neutral-500">
                        {formatTime(appt.scheduledAt)} • {formatAppointmentType(appt.type)}
                      </p>
                    </div>
                    <Link href={`/appointments?id=${appt.id}`}>
                      <Button size="sm">Start Visit</Button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-neutral-500 py-4">No upcoming appointments</p>
              )}
            </div>
            <Link href="/appointments" className="mt-4 block">
              <Button variant="outline" className="w-full">
                View Full Schedule
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
