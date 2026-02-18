
import { Badge } from "@rx/ui/badge";
import { Button } from "@rx/ui/button";
import { Input } from "@rx/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rx/ui/table";
import { cookies } from "next/headers";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  status: "in_stock" | "low_stock" | "critical";
  lotNumber: string;
  expiryDate: string;
  isActive: boolean;
  usedInCompounds: { id: string; name: string }[];
}

interface InventoryResponse {
  data: InventoryItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

const getInventory = async (): Promise<InventoryResponse | null> => {
  try {
    const cookieStore = await cookies();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const response = await fetch(`${baseUrl}/api/inventory?pageSize=50`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as InventoryResponse;
  } catch {
    return null;
  }
};

const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
    in_stock: { label: "In Stock", variant: "success" },
    low_stock: { label: "Low Stock", variant: "warning" },
    critical: { label: "Critical", variant: "error" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "warning" as const };
  return <Badge variant={variant}>{label}</Badge>;
};

const InventoryPage = async () => {
  const result = await getInventory();
  const inventory = result?.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Inventory Management</h1>
          <p className="mt-1 text-neutral-600">
            {result?.pagination.total ?? 0} items in inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>Add Item</Button>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <Input placeholder="Search inventory..." className="max-w-md" />
        <Button variant="outline">Filter</Button>
      </div>

      <div className="border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reorder Point</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lot #</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell>
                    {item.reorderPoint} {item.unit}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-sm text-neutral-500">
                    {item.lotNumber}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-500">
                    {item.expiryDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Adjust
                      </Button>
                      <Button variant="outline" size="sm">
                        Order
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-neutral-500">
                  No inventory items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryPage;
