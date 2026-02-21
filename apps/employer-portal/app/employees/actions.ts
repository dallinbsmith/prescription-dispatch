"use server";

import { getEmployerIdFromAuth0Id } from "@rx/api-server";
import { getSession } from "@rx/auth";
import { prisma } from "@rx/database";

import { ACTIVE_PRESCRIPTION_STATUSES, DEPARTMENTS } from "../api/constants";

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

const getDepartment = (index: number): string => {
  return DEPARTMENTS[index % DEPARTMENTS.length] ?? "General";
};

const getEnrollmentStatus = (prescriptionCount: number, hasActivePrescriptions: boolean): EnrollmentStatus => {
  if (hasActivePrescriptions) return "enrolled";
  if (prescriptionCount > 0) return "pending";
  return "not_enrolled";
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const exportEmployeesCSV = async (): Promise<{ success: true; csv: string } | { success: false; error: string }> => {
  const session = await getSession();
  if (!session?.user.sub) {
    return { success: false, error: "Not authenticated" };
  }

  const employerId = await getEmployerIdFromAuth0Id(session.user.sub);
  if (!employerId) {
    return { success: false, error: "Employer not found" };
  }

  const patients = await prisma.patient.findMany({
    where: { employerId },
    include: {
      user: {
        select: { email: true },
      },
      prescriptions: {
        select: { id: true, status: true },
      },
    },
    orderBy: { lastName: "asc" },
  });

  const rows = patients.map((patient: PatientWithUser, index: number) => {
    const activePrescriptions = patient.prescriptions.filter(
      (rx) => ACTIVE_PRESCRIPTION_STATUSES.includes(rx.status as typeof ACTIVE_PRESCRIPTION_STATUSES[number])
    ).length;

    const enrollmentStatus = getEnrollmentStatus(
      patient.prescriptions.length,
      activePrescriptions > 0
    );

    return {
      name: `${patient.firstName} ${patient.lastName}`,
      email: patient.user.email,
      department: getDepartment(index),
      enrollmentStatus,
      hireDate: formatDate(patient.createdAt),
      activePrescriptions,
    };
  });

  const headers = ["Name", "Email", "Department", "Enrollment Status", "Hire Date", "Active Prescriptions"];
  const csvRows = [
    headers.join(","),
    ...rows.map((row) =>
      [
        `"${row.name}"`,
        `"${row.email}"`,
        `"${row.department}"`,
        `"${row.enrollmentStatus}"`,
        `"${row.hireDate}"`,
        row.activePrescriptions,
      ].join(",")
    ),
  ];

  return { success: true, csv: csvRows.join("\n") };
};
