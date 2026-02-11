import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-patient-100 text-patient-800 dark:bg-patient-900 dark:text-patient-100",
        secondary: "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
        success: "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100",
        warning: "bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100",
        error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100",
        outline: "border border-neutral-300 bg-transparent dark:border-neutral-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
