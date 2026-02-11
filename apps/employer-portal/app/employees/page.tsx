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

const mockEmployees = [
  {
    id: "EMP-001",
    name: "John Smith",
    email: "john.smith@acme.com",
    department: "Engineering",
    enrollmentStatus: "enrolled",
    hireDate: "2022-03-15",
    activePrescriptions: 2,
  },
  {
    id: "EMP-002",
    name: "Sarah Wilson",
    email: "sarah.wilson@acme.com",
    department: "Marketing",
    enrollmentStatus: "enrolled",
    hireDate: "2021-08-01",
    activePrescriptions: 1,
  },
  {
    id: "EMP-003",
    name: "Michael Brown",
    email: "michael.brown@acme.com",
    department: "Sales",
    enrollmentStatus: "pending",
    hireDate: "2024-01-10",
    activePrescriptions: 0,
  },
  {
    id: "EMP-004",
    name: "Emily Davis",
    email: "emily.davis@acme.com",
    department: "HR",
    enrollmentStatus: "enrolled",
    hireDate: "2020-11-20",
    activePrescriptions: 3,
  },
  {
    id: "EMP-005",
    name: "Robert Chen",
    email: "robert.chen@acme.com",
    department: "Engineering",
    enrollmentStatus: "not_enrolled",
    hireDate: "2023-06-01",
    activePrescriptions: 0,
  },
];

const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: "success" | "warning" | "secondary" }> = {
    enrolled: { label: "Enrolled", variant: "success" },
    pending: { label: "Pending", variant: "warning" },
    not_enrolled: { label: "Not Enrolled", variant: "secondary" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={variant}>{label}</Badge>;
};

const EmployeesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Employees</h1>
          <p className="mt-1 text-neutral-600">
            Manage employee benefits enrollment
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export List</Button>
          <Button>Invite Employees</Button>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Search employees..."
          className="max-w-md"
        />
        <Button variant="outline">Filter by Department</Button>
      </div>

      <div className="border border-neutral-200 bg-white">
        <Table>
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
            {mockEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-neutral-500">{employee.email}</p>
                  </div>
                </TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{getStatusBadge(employee.enrollmentStatus)}</TableCell>
                <TableCell className="text-neutral-500">{employee.hireDate}</TableCell>
                <TableCell>{employee.activePrescriptions}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    {employee.enrollmentStatus === "not_enrolled" && (
                      <Button size="sm">Send Invite</Button>
                    )}
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

export default EmployeesPage;
