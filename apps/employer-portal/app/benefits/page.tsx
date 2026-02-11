import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";

const benefitPlans = [
  {
    id: "plan-wellness",
    name: "Wellness Program",
    description: "Comprehensive wellness services including health screenings and preventive care",
    enrolled: 186,
    eligible: 248,
    monthlyRate: "$45/employee",
    status: "active",
    features: ["Annual health screenings", "Preventive care consultations", "Wellness coaching"],
  },
  {
    id: "plan-rx",
    name: "Prescription Benefits",
    description: "Compounded medications at reduced rates through our pharmacy network",
    enrolled: 204,
    eligible: 248,
    monthlyRate: "$65/employee",
    status: "active",
    features: ["Discounted compound medications", "Home delivery", "Refill reminders"],
  },
  {
    id: "plan-tele",
    name: "Telemedicine",
    description: "24/7 access to licensed healthcare providers via video consultation",
    enrolled: 144,
    eligible: 248,
    monthlyRate: "$25/employee",
    status: "active",
    features: ["Unlimited video visits", "E-prescriptions", "Mental health support"],
  },
];

const BenefitsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Benefits Plans</h1>
          <p className="mt-1 text-neutral-600">
            Manage your company&apos;s benefit offerings
          </p>
        </div>
        <Button>Add New Plan</Button>
      </div>

      <div className="space-y-6">
        {benefitPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{plan.name}</CardTitle>
                  <Badge variant="success">{plan.status}</Badge>
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
                    {Math.round((plan.enrolled / plan.eligible) * 100)}% participation
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Monthly Cost</p>
                  <p className="text-2xl font-bold">{plan.monthlyRate}</p>
                  <p className="text-sm text-neutral-500">
                    Est. ${(plan.enrolled * parseInt(plan.monthlyRate.replace(/\D/g, ""))).toLocaleString()}/month
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Features</p>
                  <ul className="mt-1 space-y-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 bg-employer-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BenefitsPage;
