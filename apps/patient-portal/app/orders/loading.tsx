import { Skeleton } from "@rx/ui";

const OrdersLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-6 h-8 w-36" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border border-neutral-200 p-4">
            <Skeleton className="h-12 w-12" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-5 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersLoading;
