import { Card, CardContent, CardHeader } from "@rx/ui/card";
import { Skeleton } from "@rx/ui/skeleton";

const BenefitsLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-36" />
          <Skeleton className="mt-2 h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="mt-2 h-4 w-80" />
              </div>
              <Skeleton className="h-10 w-24" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-3">
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-2 h-8 w-24" />
                  <Skeleton className="mt-1 h-4 w-28" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-2 h-8 w-20" />
                  <Skeleton className="mt-1 h-4 w-32" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16" />
                  <div className="mt-2 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-28" />
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

export default BenefitsLoading;
