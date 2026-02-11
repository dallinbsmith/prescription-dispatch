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

const mockInventory = [
  {
    id: "INV-001",
    name: "Testosterone Cypionate Powder",
    category: "API",
    quantity: 500,
    unit: "g",
    reorderPoint: 200,
    status: "in_stock",
    expiryDate: "2025-06-15",
    lotNumber: "TC-2024-001",
  },
  {
    id: "INV-002",
    name: "Semaglutide Powder",
    category: "API",
    quantity: 50,
    unit: "g",
    reorderPoint: 100,
    status: "low_stock",
    expiryDate: "2024-12-01",
    lotNumber: "SEM-2024-003",
  },
  {
    id: "INV-003",
    name: "Bacteriostatic Water",
    category: "Diluent",
    quantity: 200,
    unit: "vials",
    reorderPoint: 50,
    status: "in_stock",
    expiryDate: "2025-03-20",
    lotNumber: "BW-2024-012",
  },
  {
    id: "INV-004",
    name: "Sermorelin Acetate",
    category: "API",
    quantity: 25,
    unit: "g",
    reorderPoint: 30,
    status: "low_stock",
    expiryDate: "2024-09-15",
    lotNumber: "SER-2024-002",
  },
  {
    id: "INV-005",
    name: "Sterile Vials 10mL",
    category: "Packaging",
    quantity: 1500,
    unit: "units",
    reorderPoint: 500,
    status: "in_stock",
    expiryDate: "N/A",
    lotNumber: "VL10-2024-005",
  },
  {
    id: "INV-006",
    name: "BPC-157",
    category: "API",
    quantity: 5,
    unit: "g",
    reorderPoint: 20,
    status: "critical",
    expiryDate: "2024-08-01",
    lotNumber: "BPC-2024-001",
  },
];

const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
    in_stock: { label: "In Stock", variant: "success" },
    low_stock: { label: "Low Stock", variant: "warning" },
    critical: { label: "Critical", variant: "error" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "warning" as const };
  return <Badge variant={variant}>{label}</Badge>;
};

const InventoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Inventory Management</h1>
          <p className="mt-1 text-neutral-600">
            Track and manage pharmacy inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>Add Item</Button>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Search inventory..."
          className="max-w-md"
        />
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
            {mockInventory.map((item) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryPage;
