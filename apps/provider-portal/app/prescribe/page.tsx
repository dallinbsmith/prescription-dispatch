import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";
import { Input } from "@rx/ui/input";
import { Label } from "@rx/ui/label";

const commonMedications = [
  { name: "Testosterone Cypionate", dosages: ["100mg/mL", "200mg/mL"] },
  { name: "Semaglutide", dosages: ["0.25mg", "0.5mg", "1mg", "2.4mg"] },
  { name: "Sermorelin", dosages: ["6mg vial", "9mg vial", "15mg vial"] },
  { name: "BPC-157", dosages: ["5mg vial", "10mg vial"] },
];

const PrescribePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">New Prescription</h1>
        <p className="mt-1 text-neutral-600">
          Create a new prescription for a patient
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Details</CardTitle>
              <CardDescription>Enter the prescription information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Input id="patient" placeholder="Search for patient..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medication">Medication</Label>
                <Input id="medication" placeholder="Search medications..." />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input id="dosage" placeholder="e.g., 200mg/mL" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refills">Refills</Label>
                  <Input id="refills" type="number" placeholder="2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="directions">Directions</Label>
                <Input
                  id="directions"
                  placeholder="e.g., Inject 0.5mL intramuscularly once weekly"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Clinical Notes (optional)</Label>
                <Input
                  id="notes"
                  placeholder="Additional notes for the pharmacist..."
                />
              </div>

              <div className="flex gap-3">
                <Button>Submit Prescription</Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Select</CardTitle>
              <CardDescription>Common medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {commonMedications.map((med) => (
                  <button
                    key={med.name}
                    className="w-full border border-neutral-200 p-3 text-left transition-colors hover:bg-neutral-50"
                  >
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-neutral-500">
                      {med.dosages.join(", ")}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrescribePage;
