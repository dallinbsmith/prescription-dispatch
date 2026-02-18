"use client";

import { cn } from "./utils";

interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

const SkipLink = ({
  href = "#main-content",
  children = "Skip to content",
  className,
}: SkipLinkProps) => {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:focus:bg-neutral-900 dark:focus:text-neutral-50 dark:focus:ring-neutral-300",
        className
      )}
    >
      {children}
    </a>
  );
};

export { SkipLink };
