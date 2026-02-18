"use client";


import { Input } from "@rx/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rx/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
];

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

  const handleSearchChange = (value: string) => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ search: value === "" ? null : value })}`);
    });
  };

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
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          className={isPending ? "opacity-50" : ""}
        />
      </div>
      <Select
        defaultValue={searchParams.get("status") ?? "all"}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-[160px]">
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
        <SelectTrigger className="w-[180px]">
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
