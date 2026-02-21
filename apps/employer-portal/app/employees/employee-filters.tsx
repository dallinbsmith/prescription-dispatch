"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "@rx/hooks";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rx/ui";

import { DEPARTMENTS } from "../api/constants";

const STATUS_OPTIONS = [
  { value: "enrolled", label: "Enrolled" },
  { value: "pending", label: "Pending" },
  { value: "not_enrolled", label: "Not Enrolled" },
];

export const EmployeeFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(searchValue, 300);

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      params.delete("page");

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";
    if (debouncedSearch !== currentSearch) {
      startTransition(() => {
        router.push(`${pathname}?${createQueryString({ search: debouncedSearch === "" ? null : debouncedSearch })}`);
      });
    }
  }, [debouncedSearch, searchParams, pathname, router, createQueryString]);

  const handleStatusChange = (value: string) => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ status: value === "all" ? null : value })}`);
    });
  };

  const handleDepartmentChange = (value: string) => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ department: value === "all" ? null : value })}`);
    });
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <Input
          placeholder="Search employees..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={isPending ? "opacity-50" : ""}
          aria-label="Search employees by name or email"
        />
      </div>
      <Select
        defaultValue={searchParams.get("status") ?? "all"}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-[160px]" aria-label="Filter by enrollment status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={searchParams.get("department") ?? "all"}
        onValueChange={handleDepartmentChange}
      >
        <SelectTrigger className="w-[180px]" aria-label="Filter by department">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {DEPARTMENTS.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
