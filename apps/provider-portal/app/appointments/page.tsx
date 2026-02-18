
import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@rx/ui/card";
import { cookies } from "next/headers";
import Link from "next/link";

interface Appointment {
  id: string;
  scheduledAt: string;
  duration: number;
  type: string;
  status: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  consultationSummary: {
    chiefComplaint: string;
  } | null;
}

interface AppointmentsResponse {
  data: Appointment[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

const getAppointments = async (): Promise<AppointmentsResponse | null> => {
  try {
    const cookieStore = await cookies();
    const today = new Date().toISOString().split("T")[0] ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(
      `${baseUrl}/api/appointments?date=${today}&pageSize=50&sortOrder=asc`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json() as AppointmentsResponse;
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

const formatDateHeader = () => {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getStatusBadge = (status: string) => {
  const variants: Record<string, "success" | "warning" | "secondary" | "error"> = {
    scheduled: "secondary",
    confirmed: "success",
    in_progress: "warning",
    completed: "success",
    cancelled: "error",
    no_show: "error",
  };
  const labels: Record<string, string> = {
    scheduled: "Scheduled",
    confirmed: "Confirmed",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
    no_show: "No Show",
  };
  return <Badge variant={variants[status] ?? "secondary"}>{labels[status] ?? status}</Badge>;
};

const getTypeBadge = (type: string) => {
  return (
    <Badge variant="outline">
      {type === "telemedicine" ? "Video" : "In-Person"}
    </Badge>
  );
};

const AppointmentsPage = async () => {
  const result = await getAppointments();
  const appointments = result?.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
          <p className="mt-1 text-neutral-600">{formatDateHeader()}</p>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <Card key={appt.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <CardTitle className="text-lg">{formatTime(appt.scheduledAt)}</CardTitle>
                  <span className="text-neutral-500">•</span>
                  <span className="font-medium">
                    {appt.patient.firstName} {appt.patient.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(appt.type)}
                  {getStatusBadge(appt.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-neutral-600">
                    {appt.consultationSummary?.chiefComplaint ?? "No consultation summary"}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/patients/${appt.patient.id}`}>
                      <Button variant="outline" size="sm">
                        View Chart
                      </Button>
                    </Link>
                    {appt.status === "scheduled" || appt.status === "confirmed" ? (
                      <Link href={`/appointments/${appt.id}`}>
                        <Button size="sm">Start Visit</Button>
                      </Link>
                    ) : appt.status === "in_progress" ? (
                      <Link href={`/appointments/${appt.id}`}>
                        <Button size="sm">Continue Visit</Button>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-neutral-500">
              No appointments scheduled for today
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
