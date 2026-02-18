import { redirect } from "next/navigation";

import { prisma } from "@rx/database";
import { getSession } from "@rx/auth";
import { getPatientIdFromAuth0Id } from "@rx/api-server";
import { Badge } from "@rx/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rx/ui/table";
import { formatDate } from "@rx/utils";

interface PrescriptionWithRelations {
  id: string;
  rxNumber: string;
  status: string;
  strength: string | null;
  refillsRemaining: number;
  prescribedAt: Date;
  compound: {
    id: string;
    name: string;
    genericName: string | null;
    dosageForm: string;
    defaultStrength: string;
  };
  provider: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "success" | "warning" | "secondary"> = {
    ready: "success",
    shipped: "success",
    delivered: "success",
    verified: "default",
    compounding: "warning",
    quality_check: "warning",
    pending: "secondary",
    cancelled: "secondary",
  };
  return <Badge variant={variants[status] ?? "secondary"}>{status.replace("_", " ")}</Badge>;
};

const PrescriptionsPage = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/login");
  }

  const patientId = await getPatientIdFromAuth0Id(session.user.sub);

  if (!patientId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Patient profile not found. Please contact support.
        </div>
      </div>
    );
  }

  const prescriptions = await prisma.prescription.findMany({
    where: { patientId },
    include: {
      compound: {
        select: {
          id: true,
          name: true,
          genericName: true,
          dosageForm: true,
          defaultStrength: true,
        },
      },
      provider: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { prescribedAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">My Prescriptions</h1>
        <p className="mt-1 text-neutral-600">
          View and manage your active prescriptions
        </p>
      </div>

      {prescriptions.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-600">
          You don't have any prescriptions yet.
        </div>
      ) : (
        <div className="border border-neutral-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rx Number</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Refills</TableHead>
                <TableHead>Prescribed</TableHead>
                <TableHead>Provider</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((rx: PrescriptionWithRelations) => (
                <TableRow key={rx.id}>
                  <TableCell className="font-medium">{rx.rxNumber}</TableCell>
                  <TableCell>{rx.compound.name}</TableCell>
                  <TableCell>{rx.strength ?? rx.compound.defaultStrength}</TableCell>
                  <TableCell>{getStatusBadge(rx.status)}</TableCell>
                  <TableCell>{rx.refillsRemaining}</TableCell>
                  <TableCell>{formatDate(rx.prescribedAt)}</TableCell>
                  <TableCell>
                    Dr. {rx.provider.lastName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PrescriptionsPage;
