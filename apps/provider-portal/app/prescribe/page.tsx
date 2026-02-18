
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";
import { Input } from "@rx/ui/input";
import { Label } from "@rx/ui/label";
import { cookies } from "next/headers";

interface Compound {
  id: string;
  name: string;
  dosageForm: string;
  strength: string | null;
  isActive: boolean;
}

interface CompoundsResponse {
  data: Compound[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

const getCompounds = async (): Promise<CompoundsResponse | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(
      `${baseUrl}/api/compounds?isActive=true&pageSize=20`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json() as CompoundsResponse;
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

const PrescribePage = async () => {
  const result = await getCompounds();
  const compounds = result?.data ?? [];

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
                <Label htmlFor="medication">Compound</Label>
                <Input id="medication" placeholder="Search compounds..." />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refills">Refills (0-12)</Label>
                  <Input id="refills" type="number" placeholder="2" min="0" max="12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="directions">Directions</Label>
                <Input
                  id="directions"
                  placeholder="e.g., Inject 0.5mL intramuscularly once weekly"
                />
              </div>

              <div className="flex gap-3">
                <Button>Submit Prescription</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Available Compounds</CardTitle>
              <CardDescription>
                {compounds.length > 0
                  ? `${String(result?.pagination.total ?? compounds.length)} compounds available`
                  : "Loading..."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {compounds.length > 0 ? (
                  compounds.map((compound) => (
                    <button
                      key={compound.id}
                      className="w-full border border-neutral-200 p-3 text-left transition-colors hover:bg-neutral-50"
                    >
                      <p className="font-medium">{compound.name}</p>
                      <p className="text-sm text-neutral-500">
                        {formatDosageForm(compound.dosageForm)}
                        {compound.strength && ` • ${compound.strength}`}
                      </p>
                    </button>
                  ))
                ) : (
                  <p className="text-center py-4 text-neutral-500">
                    No compounds available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrescribePage;
