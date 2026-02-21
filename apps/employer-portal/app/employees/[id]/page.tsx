import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Mail, Phone, Pill } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rx/ui";

interface EmployeeDetail {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  dateOfBirth: string | null;
  enrollmentStatus: "enrolled" | "pending" | "not_enrolled";
  hireDate: string;
  activePrescriptions: number;
  totalPrescriptions: number;
  prescriptions: {
    id: string;
    medication: string;
    dosageForm: string;
    quantity: number;
    status: string;
    prescribedAt: string;
  }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: string;
  }[];
}

interface EmployeeResponse {
  data: EmployeeDetail;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const getEmployee = async (id: string): Promise<EmployeeDetail | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(`${baseUrl}/api/employees/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as EmployeeResponse;
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

const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: "success" | "warning" | "secondary" }> = {
    enrolled: { label: "Enrolled", variant: "success" },
    pending: { label: "Pending", variant: "warning" },
    not_enrolled: { label: "Not Enrolled", variant: "secondary" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={variant}>{label}</Badge>;
};

const getPrescriptionStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: "success" | "warning" | "secondary" | "error" }> = {
    pending: { label: "Pending", variant: "warning" },
    verified: { label: "Verified", variant: "success" },
    compounding: { label: "Compounding", variant: "warning" },
    quality_check: { label: "Quality Check", variant: "warning" },
    ready: { label: "Ready", variant: "success" },
    shipped: { label: "Shipped", variant: "success" },
    delivered: { label: "Delivered", variant: "success" },
    cancelled: { label: "Cancelled", variant: "error" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={variant}>{label}</Badge>;
};

const EmployeeDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const employee = await getEmployee(id);

  if (!employee) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/employees" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Employees
        </Link>
      </div>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{employee.name}</h1>
          <div className="mt-2 flex items-center gap-4 text-neutral-600">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {employee.email}
            </span>
            {employee.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {employee.phone}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(employee.enrollmentStatus)}
          {employee.enrollmentStatus === "not_enrolled" && (
            <Button size="sm">Send Invite</Button>
          )}
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hire Date</CardDescription>
            <CardTitle className="text-lg">{formatDate(employee.hireDate)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Prescriptions</CardDescription>
            <CardTitle className="text-lg">{employee.activePrescriptions}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Prescriptions</CardDescription>
            <CardTitle className="text-lg">{employee.totalPrescriptions}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Prescriptions</CardTitle>
          <CardDescription>Most recent prescriptions for this employee</CardDescription>
        </CardHeader>
        <CardContent>
          {employee.prescriptions.length > 0 ? (
            <Table role="table" aria-label="Recent prescriptions">
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage Form</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.prescriptions.map((rx) => (
                  <TableRow key={rx.id}>
                    <TableCell className="font-medium">{rx.medication}</TableCell>
                    <TableCell className="capitalize">{rx.dosageForm.replace("_", " ")}</TableCell>
                    <TableCell>{rx.quantity}</TableCell>
                    <TableCell>{getPrescriptionStatusBadge(rx.status)}</TableCell>
                    <TableCell className="text-neutral-500">{formatDate(rx.prescribedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon={Pill}
              title="No prescriptions"
              description="This employee has no prescription history."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetailPage;
