import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Input } from "@rx/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rx/ui/table";

const mockPatients = [
  {
    id: "P-001",
    name: "John Smith",
    dob: "1985-03-15",
    lastVisit: "2024-02-01",
    status: "active",
    rxCount: 3,
  },
  {
    id: "P-002",
    name: "Sarah Wilson",
    dob: "1990-07-22",
    lastVisit: "2024-01-28",
    status: "active",
    rxCount: 2,
  },
  {
    id: "P-003",
    name: "Michael Brown",
    dob: "1978-11-08",
    lastVisit: "2024-01-15",
    status: "follow-up",
    rxCount: 4,
  },
  {
    id: "P-004",
    name: "Emily Davis",
    dob: "1995-02-14",
    lastVisit: "2023-12-20",
    status: "inactive",
    rxCount: 1,
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "success" | "warning" | "secondary"> = {
    active: "success",
    "follow-up": "warning",
    inactive: "secondary",
  };
  return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
};

const PatientsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Patients</h1>
          <p className="mt-1 text-neutral-600">
            Manage your patient panel
          </p>
        </div>
        <Button>Add Patient</Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search patients by name, DOB, or ID..."
          className="max-w-md"
        />
      </div>

      <div className="border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Rx</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>{getStatusBadge(patient.status)}</TableCell>
                <TableCell>{patient.rxCount}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Chart
                    </Button>
                    <Button variant="outline" size="sm">
                      Prescribe
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientsPage;
