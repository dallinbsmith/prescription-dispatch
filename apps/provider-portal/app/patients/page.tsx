
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
import { cookies } from "next/headers";
import Link from "next/link";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  status: "active" | "follow-up" | "inactive";
  activeRxCount: number;
  lastVisit: string | null;
}

interface PatientsResponse {
  data: Patient[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

const getPatients = async (): Promise<PatientsResponse | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(
      `${baseUrl}/api/patients?pageSize=50`,
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

    return await response.json() as PatientsResponse;
  } catch {
    return null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusBadge = (status: string) => {
  const variants: Record<string, "success" | "warning" | "secondary"> = {
    active: "success",
    "follow-up": "warning",
    inactive: "secondary",
  };
  return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
};

const PatientsPage = async () => {
  const result = await getPatients();
  const patients = result?.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Patients</h1>
          <p className="mt-1 text-neutral-600">
            Manage your patient panel ({result?.pagination.total ?? 0} patients)
          </p>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search patients by name..."
          className="max-w-md"
        />
      </div>

      <div className="border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Rx</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    {patient.firstName} {patient.lastName}
                  </TableCell>
                  <TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
                  <TableCell>
                    {patient.lastVisit ? formatDate(patient.lastVisit) : "—"}
                  </TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>{patient.activeRxCount}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/patients/${patient.id}`}>
                        <Button variant="outline" size="sm">
                          Chart
                        </Button>
                      </Link>
                      <Link href={`/prescribe?patientId=${patient.id}`}>
                        <Button variant="outline" size="sm">
                          Prescribe
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-neutral-500">
                  No patients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientsPage;
