import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rx/ui/table";

const mockOrders = [
  {
    id: "ORD-2024-0156",
    patient: "John Smith",
    medication: "Testosterone Cypionate",
    dosage: "200mg/mL",
    quantity: 1,
    priority: "normal",
    received: "2024-02-10 09:15",
    status: "pending",
  },
  {
    id: "ORD-2024-0155",
    patient: "Sarah Wilson",
    medication: "Semaglutide",
    dosage: "0.5mg",
    quantity: 4,
    priority: "rush",
    received: "2024-02-10 08:45",
    status: "pending",
  },
  {
    id: "ORD-2024-0154",
    patient: "Michael Brown",
    medication: "BPC-157",
    dosage: "5mg vial",
    quantity: 2,
    priority: "normal",
    received: "2024-02-10 08:30",
    status: "pending",
  },
  {
    id: "ORD-2024-0153",
    patient: "Emily Davis",
    medication: "Sermorelin",
    dosage: "9mg vial",
    quantity: 1,
    priority: "normal",
    received: "2024-02-09 16:20",
    status: "pending",
  },
  {
    id: "ORD-2024-0152",
    patient: "Robert Chen",
    medication: "NAD+ Nasal Spray",
    dosage: "100mg/mL",
    quantity: 1,
    priority: "normal",
    received: "2024-02-09 15:00",
    status: "pending",
  },
];

const QueuePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Order Queue</h1>
          <p className="mt-1 text-neutral-600">
            {mockOrders.length} orders awaiting processing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Print Batch</Button>
          <Button>Process Selected</Button>
        </div>
      </div>

      <div className="border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="border-neutral-300" />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <input type="checkbox" className="border-neutral-300" />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.patient}</TableCell>
                <TableCell>
                  <div>
                    <p>{order.medication}</p>
                    <p className="text-sm text-neutral-500">{order.dosage}</p>
                  </div>
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  {order.priority === "rush" ? (
                    <Badge variant="error">Rush</Badge>
                  ) : (
                    <Badge variant="secondary">Normal</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-neutral-500">
                  {order.received}
                </TableCell>
                <TableCell>
                  <Button size="sm">Start Processing</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QueuePage;
