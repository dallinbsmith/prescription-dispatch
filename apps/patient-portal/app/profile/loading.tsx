import { Card, CardContent, CardHeader } from "@rx/ui/card";

const ProfileLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-200" />
        <div className="mt-2 h-5 w-72 animate-pulse rounded bg-neutral-200" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-40 animate-pulse rounded bg-neutral-200" />
              <div className="mt-1 h-4 w-56 animate-pulse rounded bg-neutral-200" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
                  <div className="h-10 w-full animate-pulse rounded bg-neutral-200" />
                </div>
              ))}
              <div className="h-10 w-32 animate-pulse rounded bg-neutral-200" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileLoading;
