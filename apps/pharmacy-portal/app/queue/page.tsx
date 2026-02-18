
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
import { cookies } from "next/headers";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  patient: {
    id: string;
    name: string;
  };
  medication: string;
  dosage: string | null;
  dosageForm: string;
  quantity: number;
}

interface OrdersResponse {
  data: Order[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

const getOrders = async (): Promise<OrdersResponse | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(
      `${baseUrl}/api/orders?status=pending&pageSize=50&sortOrder=asc`,
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

    return (await response.json()) as OrdersResponse;
  } catch {
    return null;
  }
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const QueuePage = async () => {
  const result = await getOrders();
  const orders = result?.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Order Queue</h1>
          <p className="mt-1 text-neutral-600">
            {result?.pagination.total ?? 0} orders awaiting processing
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
              <TableHead>Status</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <input type="checkbox" className="border-neutral-300" />
                  </TableCell>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.patient.name}</TableCell>
                  <TableCell>
                    <div>
                      <p>{order.medication}</p>
                      {order.dosage && (
                        <p className="text-sm text-neutral-500">{order.dosage}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {order.status === "pending" ? "Pending" : order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-500">
                    {formatDateTime(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button size="sm">Start Processing</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-neutral-500">
                  No orders in queue
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QueuePage;
