
import { Button } from "@rx/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@rx/ui/card";
import { cookies } from "next/headers";

interface Prescription {
  id: string;
  quantity: number;
  directions: string;
  status: string;
  refills: number;
  prescribedAt: string;
  patient: {
    id: string;
    name: string;
    dateOfBirth: string;
    allergies: { allergen: string; severity: string | null }[];
  };
  prescriber: string;
  providerId: string;
  compound: {
    id: string;
    name: string;
    dosageForm: string;
    strength: string | null;
  };
}

interface PrescriptionsResponse {
  data: Prescription[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

const getPendingPrescriptions = async (): Promise<PrescriptionsResponse | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(
      `${baseUrl}/api/prescriptions?status=pending&pageSize=50&sortOrder=asc`,
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

    return (await response.json()) as PrescriptionsResponse;
  } catch {
    return null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

const VerificationPage = async () => {
  const result = await getPendingPrescriptions();
  const prescriptions = result?.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Prescription Verification
        </h1>
        <p className="mt-1 text-neutral-600">
          {result?.pagination.total ?? 0} prescriptions awaiting pharmacist review
        </p>
      </div>

      <div className="space-y-6">
        {prescriptions.length > 0 ? (
          prescriptions.map((rx) => (
            <Card key={rx.id} className="border-l-4 border-l-pharmacy-500">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {rx.id.slice(0, 13)}
                  </CardTitle>
                  <p className="mt-1 text-sm text-neutral-500">
                    Prescribed by {rx.prescriber} on {formatDate(rx.prescribedAt)}
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
                        DOB: {formatDate(rx.patient.dateOfBirth)}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Allergies:{" "}
                        {rx.patient.allergies.length > 0
                          ? rx.patient.allergies.map((a) => a.allergen).join(", ")
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
                        {rx.compound.name}
                        {rx.compound.strength && ` ${rx.compound.strength}`}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {formatDosageForm(rx.compound.dosageForm)} | Qty: {rx.quantity} | Refills: {rx.refills}
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
          ))
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-neutral-500">
              No prescriptions awaiting verification
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
