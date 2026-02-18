import { cn } from "./utils";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse bg-neutral-200 dark:bg-neutral-800", className)}
      {...props}
    />
  );
};

export { Skeleton };
