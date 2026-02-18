
import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@rx/ui/card";
import { cookies } from "next/headers";

interface Batch {
  compoundId: string;
  compoundName: string;
  dosageForm: string;
  strength: string | null;
  orderCount: number;
  orders: {
    id: string;
    orderNumber: string;
    status: string;
    createdAt: string;
  }[];
  currentStep: string;
  progress: number;
  statuses: {
    compounding: number;
    quality_check: number;
  };
}

interface CompoundingResponse {
  data: {
    batches: Batch[];
    totalBatches: number;
    totalOrders: number;
  };
}

const getCompoundingData = async (): Promise<CompoundingResponse | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(`${baseUrl}/api/compounding`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as CompoundingResponse;
  } catch {
    return null;
  }
};

const formatDosageForm = (form: string) => {
  const labels: Record<string, string> = {
    injection: "Injection",
    capsule: "Capsule",
    troche: "Troche",
    cream: "Cream",
    nasal_spray: "Nasal Spray",
    sublingual: "Sublingual",
    tablet: "Tablet",
    solution: "Solution",
    suspension: "Suspension",
  };
  return labels[form] ?? form;
};

const getStatusBadge = (step: string, statuses: { compounding: number; quality_check: number }) => {
  if (statuses.quality_check > 0 && statuses.compounding === 0) {
    return <Badge variant="warning">QC Review</Badge>;
  }
  if (statuses.compounding > 0 && statuses.quality_check > 0) {
    return <Badge variant="default">Mixed</Badge>;
  }
  return <Badge variant="default">Compounding</Badge>;
};

const CompoundingPage = async () => {
  const result = await getCompoundingData();
  const batches = result?.data.batches ?? [];
  const totalOrders = result?.data.totalOrders ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Compounding Lab</h1>
          <p className="mt-1 text-neutral-600">
            {batches.length} active batches ({totalOrders} orders) in production
          </p>
        </div>
        <Button>Create New Batch</Button>
      </div>

      <div className="space-y-4">
        {batches.length > 0 ? (
          batches.map((batch) => (
            <Card key={batch.compoundId}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <CardTitle className="text-lg">{batch.compoundName}</CardTitle>
                  {getStatusBadge(batch.currentStep, batch.statuses)}
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm text-neutral-500">Dosage Form</p>
                    <p className="font-medium">
                      {formatDosageForm(batch.dosageForm)}
                      {batch.strength && ` • ${batch.strength}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Orders in Batch</p>
                    <p className="font-medium">{batch.orderCount} orders</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Compounding</p>
                    <p className="font-medium">{batch.statuses.compounding} orders</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Quality Check</p>
                    <p className="font-medium">{batch.statuses.quality_check} orders</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Current Step: {batch.currentStep}</span>
                    <span className="font-medium">{batch.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden bg-neutral-200">
                    <div
                      className="h-full bg-pharmacy-500 transition-all"
                      style={{ width: `${String(batch.progress)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-neutral-500">
              No active batches in production
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompoundingPage;
