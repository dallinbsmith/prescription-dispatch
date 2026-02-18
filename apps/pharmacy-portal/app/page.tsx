
import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";
import { cookies } from "next/headers";
import Link from "next/link";

interface DashboardData {
  stats: {
    pendingOrders: number;
    awaitingVerification: number;
    inCompounding: number;
    readyToShip: number;
  };
  recentOrders: {
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
  }[];
}

const getDashboardData = async (): Promise<DashboardData | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(`${baseUrl}/api/dashboard`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as { data: DashboardData };
    return result.data;
  } catch {
    return null;
  }
};

const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: "default" | "warning" | "success" | "secondary" }> = {
    pending: { label: "Pending", variant: "secondary" },
    processing: { label: "Processing", variant: "secondary" },
    compounding: { label: "Compounding", variant: "default" },
    quality_check: { label: "QC", variant: "warning" },
    packaging: { label: "Packaging", variant: "success" },
    shipped: { label: "Shipped", variant: "success" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={variant}>{label}</Badge>;
};

const DashboardPage = async () => {
  const data = await getDashboardData();

  const stats = data
    ? [
        { label: "Pending Orders", value: String(data.stats.pendingOrders) },
        { label: "Awaiting Verification", value: String(data.stats.awaitingVerification) },
        { label: "In Compounding", value: String(data.stats.inCompounding) },
        { label: "Ready to Ship", value: String(data.stats.readyToShip) },
      ]
    : [
        { label: "Pending Orders", value: "—" },
        { label: "Awaiting Verification", value: "—" },
        { label: "In Compounding", value: "—" },
        { label: "Ready to Ship", value: "—" },
      ];

  const recentOrders = data?.recentOrders ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Pharmacy Dashboard</h1>
        <p className="mt-1 text-neutral-600">Order processing overview</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
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
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border border-neutral-200 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-neutral-500">{order.patient.name}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm text-neutral-600">
                        {order.medication}
                        {order.dosage && ` ${order.dosage}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-neutral-500">No recent orders</p>
            )}
          </div>
          <Link href="/queue" className="mt-4 block">
            <Button variant="outline" className="w-full">
              View Full Queue
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
