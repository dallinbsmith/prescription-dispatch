import {
  apiBadRequest,
  apiPaginated,
  apiUnauthorized,
  getEmployerIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { employerEmployeeQuerySchema } from "@rx/schemas";

import { ACTIVE_PRESCRIPTION_STATUSES, DEPARTMENTS } from "../constants";

interface PatientWithUser {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  user: {
    email: string;
  };
  prescriptions: {
    id: string;
    status: string;
  }[];
}

type EnrollmentStatus = "enrolled" | "pending" | "not_enrolled";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  enrollmentStatus: EnrollmentStatus;
  hireDate: Date;
  activePrescriptions: number;
}

const getDepartment = (index: number): string => {
  return DEPARTMENTS[index % DEPARTMENTS.length] ?? "General";
};

const getEnrollmentStatus = (prescriptionCount: number, hasActivePrescriptions: boolean): EnrollmentStatus => {
  if (hasActivePrescriptions) return "enrolled";
  if (prescriptionCount > 0) return "pending";
  return "not_enrolled";
};

export const GET = withAuth(async ({ user, request }) => {
  const employerId = await getEmployerIdFromAuth0Id(user.sub);

  if (!employerId) {
    return apiUnauthorized("Employer admin profile not found");
  }

  const { searchParams } = new URL(request.url);
  const queryResult = employerEmployeeQuerySchema.safeParse({
    search: searchParams.get("search") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    department: searchParams.get("department") ?? undefined,
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
  });

  if (!queryResult.success) {
    return apiBadRequest("Invalid query parameters");
  }

  const { search = "", status, department, page, pageSize } = queryResult.data;

  const where = {
    employerId,
    ...(search && {
      OR: [
        { firstName: { contains: search, mode: "insensitive" as const } },
        { lastName: { contains: search, mode: "insensitive" as const } },
        { user: { email: { contains: search, mode: "insensitive" as const } } },
      ],
    }),
  };

  const [patients, total] = await Promise.all([
    prisma.patient.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
          },
        },
        prescriptions: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { lastName: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.patient.count({ where }),
  ]);

  let employees = patients.map((patient: PatientWithUser, index: number) => {
    const activePrescriptions = patient.prescriptions.filter(
      (rx) => ACTIVE_PRESCRIPTION_STATUSES.includes(rx.status as typeof ACTIVE_PRESCRIPTION_STATUSES[number])
    ).length;

    const enrollmentStatus = getEnrollmentStatus(
      patient.prescriptions.length,
      activePrescriptions > 0
    );

    return {
      id: patient.id,
      name: `${patient.firstName} ${patient.lastName}`,
      email: patient.user.email,
      department: getDepartment(index),
      enrollmentStatus,
      hireDate: patient.createdAt,
      activePrescriptions,
    };
  });

  if (status) {
    employees = employees.filter((emp: Employee) => emp.enrollmentStatus === status);
  }

  if (department) {
    employees = employees.filter((emp: Employee) => emp.department === department);
  }

  return apiPaginated(employees, {
    page,
    pageSize,
    total,
    hasMore: page * pageSize < total,
  });
});
