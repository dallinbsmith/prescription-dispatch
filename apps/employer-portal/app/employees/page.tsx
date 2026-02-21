import { cookies } from "next/headers";
import Link from "next/link";

import { Users } from "lucide-react";

import type { Employee, PaginatedResponse } from "@rx/types";
import {
  Badge,
  Button,
  EmptyState,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rx/ui";

import { EmployeeFilters } from "./employee-filters";
import { ExportButton } from "./export-button";
import { Pagination } from "./pagination";


type EmployeesResponse = PaginatedResponse<Employee>;

interface SearchParams {
  search?: string;
  status?: string;
  department?: string;
  page?: string;
}

const getEmployees = async (searchParams: SearchParams): Promise<EmployeesResponse | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

    const params = new URLSearchParams({ pageSize: "50" });
    if (searchParams.search) params.set("search", searchParams.search);
    if (searchParams.status) params.set("status", searchParams.status);
    if (searchParams.department) params.set("department", searchParams.department);
    if (searchParams.page) params.set("page", searchParams.page);

    const response = await fetch(`${baseUrl}/api/employees?${params.toString()}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as EmployeesResponse;
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

interface EmployeesPageProps {
  searchParams: Promise<SearchParams>;
}

const EmployeesPage = async ({ searchParams }: EmployeesPageProps) => {
  const params = await searchParams;
  const result = await getEmployees(params);
  const employees = result?.data ?? [];
  const pagination = result?.pagination;
  const totalCount = pagination?.total ?? 0;
  const currentPage = pagination?.page ?? 1;
  const pageSize = pagination?.pageSize ?? 50;
  const totalPages = Math.ceil(totalCount / pageSize);

  const hasFilters = Boolean(params.search ?? params.status ?? params.department);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Employees</h1>
          <p className="mt-1 text-neutral-600">
            {totalCount} employee{totalCount !== 1 ? "s" : ""} in benefits program
          </p>
        </div>
        <div className="flex gap-2">
          <ExportButton />
          <Button>Invite Employees</Button>
        </div>
      </div>

      <EmployeeFilters />

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <Table role="table" aria-label="Employee list">
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Enrollment</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Active Rx</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-neutral-500">{employee.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{getStatusBadge(employee.enrollmentStatus)}</TableCell>
                  <TableCell className="text-neutral-500">
                    {formatDate(employee.hireDate)}
                  </TableCell>
                  <TableCell>{employee.activePrescriptions}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/employees/${employee.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      {employee.enrollmentStatus === "not_enrolled" && (
                        <Button size="sm">Send Invite</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-0">
                  <EmptyState
                    icon={Users}
                    title={hasFilters ? "No employees match your filters" : "No employees found"}
                    description={
                      hasFilters
                        ? "Try adjusting your search or filter criteria."
                        : "Get started by inviting employees to your benefits program."
                    }
                    action={hasFilters ? undefined : <Button>Invite Employees</Button>}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default EmployeesPage;
