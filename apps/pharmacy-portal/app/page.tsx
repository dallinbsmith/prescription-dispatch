import { Badge } from "@rx/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";

const stats = [
  { label: "Pending Orders", value: "24", urgent: 3 },
  { label: "Awaiting Verification", value: "8", urgent: 0 },
  { label: "In Compounding", value: "12", urgent: 0 },
  { label: "Ready to Ship", value: "15", urgent: 0 },
];

const recentOrders = [
  { id: "ORD-2024-0156", patient: "John Smith", medication: "Testosterone Cypionate 200mg/mL", status: "pending", priority: "normal" },
  { id: "ORD-2024-0155", patient: "Sarah Wilson", medication: "Semaglutide 0.5mg", status: "verification", priority: "rush" },
  { id: "ORD-2024-0154", patient: "Michael Brown", medication: "BPC-157 5mg vial", status: "compounding", priority: "normal" },
  { id: "ORD-2024-0153", patient: "Emily Davis", medication: "Sermorelin 9mg vial", status: "quality_check", priority: "normal" },
];

const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: "default" | "warning" | "success" | "secondary" }> = {
    pending: { label: "Pending", variant: "secondary" },
    verification: { label: "Verification", variant: "warning" },
    compounding: { label: "Compounding", variant: "default" },
    quality_check: { label: "QC", variant: "success" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={variant}>{label}</Badge>;
};

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Pharmacy Dashboard</h1>
        <p className="mt-1 text-neutral-600">
          Order processing overview
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center justify-between">
                {stat.label}
                {stat.urgent > 0 && (
                  <Badge variant="error">{stat.urgent} urgent</Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-pharmacy-600">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders in the queue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border border-neutral-200 p-4"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-neutral-500">{order.patient}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm text-neutral-600">{order.medication}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {order.priority === "rush" && (
                    <Badge variant="error">Rush</Badge>
                  )}
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
