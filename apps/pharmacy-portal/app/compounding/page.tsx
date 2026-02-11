import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@rx/ui/card";

const mockBatches = [
  {
    id: "BATCH-2024-0023",
    medication: "Semaglutide 0.5mg",
    orders: 4,
    status: "in_progress",
    assignedTo: "Tech: Maria Garcia",
    startedAt: "2024-02-10 10:30",
    estimatedCompletion: "2024-02-10 12:00",
    step: "Compounding",
    progress: 60,
  },
  {
    id: "BATCH-2024-0022",
    medication: "Testosterone Cypionate 200mg/mL",
    orders: 6,
    status: "quality_check",
    assignedTo: "Tech: James Lee",
    startedAt: "2024-02-10 08:00",
    estimatedCompletion: "2024-02-10 11:00",
    step: "Quality Check",
    progress: 90,
  },
  {
    id: "BATCH-2024-0021",
    medication: "BPC-157 5mg vial",
    orders: 3,
    status: "packaging",
    assignedTo: "Tech: Sarah Kim",
    startedAt: "2024-02-09 14:00",
    estimatedCompletion: "2024-02-10 10:30",
    step: "Packaging",
    progress: 95,
  },
];

const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: "default" | "warning" | "success" }> = {
    in_progress: { label: "In Progress", variant: "default" },
    quality_check: { label: "QC Review", variant: "warning" },
    packaging: { label: "Packaging", variant: "success" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "default" as const };
  return <Badge variant={variant}>{label}</Badge>;
};

const CompoundingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Compounding Lab
          </h1>
          <p className="mt-1 text-neutral-600">
            {mockBatches.length} active batches in production
          </p>
        </div>
        <Button>Create New Batch</Button>
      </div>

      <div className="space-y-4">
        {mockBatches.map((batch) => (
          <Card key={batch.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-4">
                <CardTitle className="text-lg">{batch.id}</CardTitle>
                {getStatusBadge(batch.status)}
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-neutral-500">Medication</p>
                  <p className="font-medium">{batch.medication}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Orders in Batch</p>
                  <p className="font-medium">{batch.orders} orders</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Assigned To</p>
                  <p className="font-medium">{batch.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Est. Completion</p>
                  <p className="font-medium">{batch.estimatedCompletion}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Current Step: {batch.step}</span>
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
        ))}
      </div>
    </div>
  );
};

export default CompoundingPage;
