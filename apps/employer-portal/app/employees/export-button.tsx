"use client";

import { useTransition } from "react";

import { Button, useToast } from "@rx/ui";

import { exportEmployeesCSV } from "./actions";

export const ExportButton = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleExport = () => {
    startTransition(async () => {
      const result = await exportEmployeesCSV();

      if (!result.success) {
        toast({
          title: "Export failed",
          description: result.error ?? "Unable to export employee list. Please try again.",
          variant: "error",
        });
        return;
      }

      const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `employees-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export complete",
        description: "Employee list has been downloaded.",
        variant: "success",
      });
    });
  };

  return (
    <Button variant="outline" onClick={handleExport} disabled={isPending}>
      {isPending ? "Exporting..." : "Export List"}
    </Button>
  );
};
