import { Skeleton } from "@rx/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rx/ui/table";

const EmployeesLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-5 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <Skeleton className="h-10 flex-1 min-w-[200px] max-w-md" />
        <Skeleton className="h-10 w-[160px]" />
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Enrollment</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Active Rx</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="mt-1 h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-8" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-14" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeesLoading;
