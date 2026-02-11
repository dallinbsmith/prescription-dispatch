import { Badge } from "@rx/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@rx/ui/card";

const mockOrders = [
  {
    id: "ORD-2024-0042",
    medication: "Testosterone Cypionate 200mg/mL",
    status: "shipped",
    orderDate: "2024-02-05",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    estimatedDelivery: "2024-02-08",
  },
  {
    id: "ORD-2024-0041",
    medication: "Semaglutide 0.5mg",
    status: "processing",
    orderDate: "2024-02-03",
    trackingNumber: null,
    carrier: null,
    estimatedDelivery: null,
  },
  {
    id: "ORD-2024-0038",
    medication: "Sermorelin 9mg vial",
    status: "delivered",
    orderDate: "2024-01-25",
    trackingNumber: "1Z999AA10123456780",
    carrier: "UPS",
    estimatedDelivery: null,
    deliveredDate: "2024-01-28",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "success" | "warning" | "secondary"> = {
    delivered: "success",
    shipped: "default",
    processing: "warning",
    pending: "secondary",
  };
  return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
};

const OrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Order History</h1>
        <p className="mt-1 text-neutral-600">
          Track your medication orders and deliveries
        </p>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                {order.id}
              </CardTitle>
              {getStatusBadge(order.status)}
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-neutral-500">Medication</p>
                  <p className="font-medium">{order.medication}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Order Date</p>
                  <p className="font-medium">{order.orderDate}</p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-neutral-500">Tracking</p>
                    <p className="font-medium text-patient-600">
                      {order.carrier}: {order.trackingNumber}
                    </p>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-neutral-500">Est. Delivery</p>
                    <p className="font-medium">{order.estimatedDelivery}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
