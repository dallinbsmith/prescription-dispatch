import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@rx/ui/card";

const mockAppointments = [
  {
    id: "APT-001",
    patient: "Emily Davis",
    time: "9:00 AM",
    type: "telemedicine",
    status: "confirmed",
    reason: "Initial consultation for hormone therapy",
  },
  {
    id: "APT-002",
    patient: "Robert Chen",
    time: "10:30 AM",
    type: "telemedicine",
    status: "confirmed",
    reason: "Follow-up: Weight management program",
  },
  {
    id: "APT-003",
    patient: "Lisa Anderson",
    time: "2:00 PM",
    type: "telemedicine",
    status: "pending",
    reason: "New patient consultation",
  },
  {
    id: "APT-004",
    patient: "David Martinez",
    time: "3:30 PM",
    type: "telemedicine",
    status: "confirmed",
    reason: "Prescription renewal review",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "success" | "warning" | "secondary"> = {
    confirmed: "success",
    pending: "warning",
    cancelled: "secondary",
  };
  return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
};

const getTypeBadge = (type: string) => {
  return (
    <Badge variant="outline">
      {type === "telemedicine" ? "Video" : "In-Person"}
    </Badge>
  );
};

const AppointmentsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
          <p className="mt-1 text-neutral-600">
            Today&apos;s schedule - February 10, 2024
          </p>
        </div>
        <Button>Schedule Appointment</Button>
      </div>

      <div className="space-y-4">
        {mockAppointments.map((appt) => (
          <Card key={appt.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-4">
                <CardTitle className="text-lg">{appt.time}</CardTitle>
                <span className="text-neutral-500">•</span>
                <span className="font-medium">{appt.patient}</span>
              </div>
              <div className="flex items-center gap-2">
                {getTypeBadge(appt.type)}
                {getStatusBadge(appt.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-neutral-600">{appt.reason}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Chart
                  </Button>
                  <Button size="sm">Start Visit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
