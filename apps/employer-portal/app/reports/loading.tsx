import { Card, CardContent, CardHeader } from "@rx/ui/card";
import { Skeleton } from "@rx/ui/skeleton";

const ReportsLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="mt-2 h-5 w-80" />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-3 h-3 w-36" />
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex border-b border-neutral-200 pb-3">
              <Skeleton className="h-4 w-20 flex-1" />
              <Skeleton className="h-4 w-20 flex-1" />
              <Skeleton className="h-4 w-28 flex-1" />
              <Skeleton className="h-4 w-24 flex-1" />
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex border-b border-neutral-100 py-3">
                <Skeleton className="h-5 w-16 flex-1" />
                <Skeleton className="h-5 w-24 flex-1" />
                <Skeleton className="h-5 w-20 flex-1" />
                <Skeleton className="h-5 w-16 flex-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsLoading;
