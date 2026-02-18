import { redirect } from "next/navigation";

import { prisma } from "@rx/database";
import { getSession } from "@rx/auth";
import { getPatientIdFromAuth0Id } from "@rx/api-server";
import { Badge } from "@rx/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@rx/ui/card";
import { formatDate } from "@rx/utils";

interface OrderWithRelations {
  id: string;
  orderNumber: string;
  status: string;
  trackingNumber: string | null;
  shippingCarrier: string | null;
  estimatedDelivery: Date | null;
  createdAt: Date;
  prescription: {
    strength: string | null;
    compound: {
      name: string;
      defaultStrength: string;
    };
  };
  shippingAddress: {
    street1: string;
    city: string;
    state: string;
    zipCode: string;
  } | null;
}

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "success" | "warning" | "secondary"> = {
    delivered: "success",
    shipped: "default",
    packaging: "default",
    processing: "warning",
    compounding: "warning",
    quality_check: "warning",
    pending: "secondary",
    cancelled: "secondary",
  };
  return <Badge variant={variants[status] ?? "secondary"}>{status.replace("_", " ")}</Badge>;
};

const OrdersPage = async () => {
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

  const orders = await prisma.order.findMany({
    where: { patientId },
    include: {
      prescription: {
        include: {
          compound: {
            select: {
              name: true,
              defaultStrength: true,
            },
          },
        },
      },
      shippingAddress: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Order History</h1>
        <p className="mt-1 text-neutral-600">
          Track your medication orders and deliveries
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-600">
          You don't have any orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: OrderWithRelations) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">
                  {order.orderNumber}
                </CardTitle>
                {getStatusBadge(order.status)}
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm text-neutral-500">Medication</p>
                    <p className="font-medium">
                      {order.prescription.compound.name}{" "}
                      {order.prescription.strength ?? order.prescription.compound.defaultStrength}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Order Date</p>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                  {order.trackingNumber && (
                    <div>
                      <p className="text-sm text-neutral-500">Tracking</p>
                      <p className="font-medium text-patient-600">
                        {order.shippingCarrier}: {order.trackingNumber}
                      </p>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div>
                      <p className="text-sm text-neutral-500">Est. Delivery</p>
                      <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
