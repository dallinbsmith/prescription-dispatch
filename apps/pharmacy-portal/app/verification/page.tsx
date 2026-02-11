import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@rx/ui/card";

const mockPrescriptions = [
  {
    id: "RX-2024-0089",
    patient: {
      name: "Sarah Wilson",
      dob: "1990-07-22",
      allergies: ["Penicillin"],
    },
    prescriber: "Dr. Johnson",
    medication: "Semaglutide",
    dosage: "0.5mg weekly injection",
    quantity: 4,
    refills: 2,
    directions: "Inject 0.5mg subcutaneously once weekly",
    prescribedDate: "2024-02-10",
    flags: ["First fill", "High-cost medication"],
  },
  {
    id: "RX-2024-0088",
    patient: {
      name: "Robert Chen",
      dob: "1985-03-14",
      allergies: [],
    },
    prescriber: "Dr. Martinez",
    medication: "Testosterone Cypionate",
    dosage: "200mg/mL",
    quantity: 1,
    refills: 5,
    directions: "Inject 0.5mL intramuscularly every 7 days",
    prescribedDate: "2024-02-09",
    flags: [],
  },
];

const VerificationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Prescription Verification
        </h1>
        <p className="mt-1 text-neutral-600">
          {mockPrescriptions.length} prescriptions awaiting pharmacist review
        </p>
      </div>

      <div className="space-y-6">
        {mockPrescriptions.map((rx) => (
          <Card key={rx.id} className="border-l-4 border-l-pharmacy-500">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {rx.id}
                  {rx.flags.map((flag) => (
                    <Badge key={flag} variant="warning">
                      {flag}
                    </Badge>
                  ))}
                </CardTitle>
                <p className="mt-1 text-sm text-neutral-500">
                  Prescribed by {rx.prescriber} on {rx.prescribedDate}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Reject
                </Button>
                <Button size="sm">Verify & Approve</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500">
                      Patient Information
                    </h4>
                    <p className="font-medium">{rx.patient.name}</p>
                    <p className="text-sm text-neutral-600">
                      DOB: {rx.patient.dob}
                    </p>
                    <p className="text-sm text-neutral-600">
                      Allergies:{" "}
                      {rx.patient.allergies.length > 0
                        ? rx.patient.allergies.join(", ")
                        : "None reported"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500">
                      Prescription Details
                    </h4>
                    <p className="font-medium">
                      {rx.medication} {rx.dosage}
                    </p>
                    <p className="text-sm text-neutral-600">
                      Qty: {rx.quantity} | Refills: {rx.refills}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500">
                      Directions
                    </h4>
                    <p className="text-sm text-neutral-600">{rx.directions}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerificationPage;
