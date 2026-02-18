import {
  apiPaginated,
  apiUnauthorized,
  getEmployerIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

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

const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];

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
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));

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

  const activeStatuses = ["pending", "verified", "compounding", "quality_check", "ready"];

  let employees = patients.map((patient: PatientWithUser, index: number) => {
    const activePrescriptions = patient.prescriptions.filter(
      (rx) => activeStatuses.includes(rx.status)
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

  return apiPaginated(employees, {
    page,
    pageSize,
    total,
    hasMore: page * pageSize < total,
  });
});
