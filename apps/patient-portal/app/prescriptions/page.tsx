import { Badge } from "@rx/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rx/ui/table";

const mockPrescriptions = [
  {
    id: "RX-2024-0001",
    medication: "Testosterone Cypionate",
    dosage: "200mg/mL",
    status: "ready",
    refillsRemaining: 2,
    prescribedDate: "2024-01-15",
  },
  {
    id: "RX-2024-0002",
    medication: "Semaglutide",
    dosage: "0.5mg",
    status: "compounding",
    refillsRemaining: 5,
    prescribedDate: "2024-01-20",
  },
  {
    id: "RX-2024-0003",
    medication: "Sermorelin",
    dosage: "9mg vial",
    status: "pending",
    refillsRemaining: 3,
    prescribedDate: "2024-02-01",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "success" | "warning" | "secondary"> = {
    ready: "success",
    compounding: "warning",
    pending: "secondary",
    shipped: "default",
  };
  return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
};

const PrescriptionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">My Prescriptions</h1>
        <p className="mt-1 text-neutral-600">
          View and manage your active prescriptions
        </p>
      </div>

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPrescriptions.map((rx) => (
              <TableRow key={rx.id}>
                <TableCell className="font-medium">{rx.id}</TableCell>
                <TableCell>{rx.medication}</TableCell>
                <TableCell>{rx.dosage}</TableCell>
                <TableCell>{getStatusBadge(rx.status)}</TableCell>
                <TableCell>{rx.refillsRemaining}</TableCell>
                <TableCell>{rx.prescribedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
