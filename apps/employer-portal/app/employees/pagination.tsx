"use client";

import { useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@rx/ui";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export const Pagination = ({ currentPage, totalPages, totalCount, pageSize }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  if (totalPages <= 1) {
    return null;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className={`flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 ${isPending ? "opacity-50" : ""}`}>
      <p className="text-sm text-neutral-600">
        Showing {start} to {end} of {totalCount} employees
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isPending}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isPending}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
