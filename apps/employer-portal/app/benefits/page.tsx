import { cookies } from "next/headers";

import { Gift } from "lucide-react";

import type { BenefitsData } from "@rx/types";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
} from "@rx/ui";


interface BenefitsResponse {
  data: BenefitsData;
}

const getBenefitsData = async (): Promise<BenefitsData | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(`${baseUrl}/api/benefits`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as BenefitsResponse;
    return result.data;
  } catch {
    return null;
  }
};

const getStatusBadge = (status: string) => {
  if (status === "active") {
    return <Badge variant="success">Active</Badge>;
  }
  return <Badge variant="secondary">Inactive</Badge>;
};

const BenefitsPage = async () => {
  const data = await getBenefitsData();
  const plans = data?.plans ?? [];
  const summary = data?.summary;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Benefits Plans</h1>
          <p className="mt-1 text-neutral-600">
            {summary
              ? `${String(summary.activePlans)} active plan${summary.activePlans !== 1 ? "s" : ""} · ${summary.totalMonthlySpend}/month total`
              : "Manage your company's benefit offerings"}
          </p>
        </div>
        <Button>Add New Plan</Button>
      </div>

      <div className="space-y-6">
        {plans.length > 0 ? (
          plans.map((plan) => {
            const participationRate = plan.eligible > 0
              ? Math.round((plan.enrolled / plan.eligible) * 100)
              : 0;
            const estimatedMonthlyCost = plan.enrolled * plan.monthlyRateAmount;

            return (
              <Card key={plan.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{plan.name}</CardTitle>
                      {getStatusBadge(plan.status)}
                    </div>
                    <CardDescription className="mt-1">
                      {plan.description}
                    </CardDescription>
                  </div>
                  <Button variant="outline">Edit Plan</Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div>
                      <p className="text-sm text-neutral-500">Enrollment</p>
                      <p className="text-2xl font-bold text-employer-600">
                        {plan.enrolled}
                        <span className="text-lg font-normal text-neutral-400">
                          /{plan.eligible}
                        </span>
                      </p>
                      <p className="text-sm text-neutral-500">
                        {participationRate}% participation
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Monthly Cost</p>
                      <p className="text-2xl font-bold">{plan.monthlyRate}</p>
                      <p className="text-sm text-neutral-500">
                        Est. ${estimatedMonthlyCost.toLocaleString()}/month
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Features</p>
                      <ul className="mt-1 space-y-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-employer-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent>
              <EmptyState
                icon={Gift}
                title="No benefit plans configured"
                description="Set up your first benefit plan to start offering coverage to employees."
                action={<Button>Add New Plan</Button>}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BenefitsPage;
