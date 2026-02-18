import {
  apiPaginated,
  apiUnauthorized,
  getPharmacyStaffIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";

interface IngredientWithCompounds {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  compounds: {
    compound: {
      id: string;
      name: string;
    };
  }[];
}

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

const getInventoryStatus = (index: number): "in_stock" | "low_stock" | "critical" => {
  const statuses: ("in_stock" | "low_stock" | "critical")[] = [
    "in_stock",
    "in_stock",
    "in_stock",
    "low_stock",
    "critical",
  ];
  return statuses[index % statuses.length] ?? "in_stock";
};

const getPlaceholderQuantity = (index: number): number => {
  const quantities = [500, 250, 100, 50, 25, 1000, 75, 150];
  return quantities[index % quantities.length] ?? 100;
};

const getPlaceholderReorderPoint = (index: number): number => {
  const points = [100, 50, 30, 20, 10, 200, 25, 40];
  return points[index % points.length] ?? 50;
};

const getCategory = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("water") || lowerName.includes("saline")) {
    return "Diluent";
  }
  if (lowerName.includes("vial") || lowerName.includes("syringe") || lowerName.includes("cap")) {
    return "Packaging";
  }
  return "API";
};

export const GET = withAuth(async ({ user, request }) => {
  const userId = await getPharmacyStaffIdFromAuth0Id(user.sub);

  if (!userId) {
    return apiUnauthorized("Pharmacy staff profile not found");
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));

  const where = {
    isActive: true,
    ...(search && {
      name: { contains: search, mode: "insensitive" as const },
    }),
  };

  const [ingredients, total] = await Promise.all([
    prisma.ingredient.findMany({
      where,
      include: {
        compounds: {
          select: {
            compound: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          take: 5,
        },
      },
      orderBy: { name: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.ingredient.count({ where }),
  ]);

  let inventoryItems = ingredients.map((ingredient: IngredientWithCompounds, index: number) => {
    const itemCategory = getCategory(ingredient.name);
    const itemStatus = getInventoryStatus(index);
    const quantity = getPlaceholderQuantity(index);
    const reorderPoint = getPlaceholderReorderPoint(index);

    return {
      id: ingredient.id,
      name: ingredient.name,
      category: itemCategory,
      quantity,
      unit: itemCategory === "Packaging" ? "units" : "g",
      reorderPoint,
      status: itemStatus,
      lotNumber: `LOT-${ingredient.id.slice(0, 8).toUpperCase()}`,
      expiryDate: itemCategory === "Packaging" ? "N/A" : "2025-12-31",
      isActive: ingredient.isActive,
      usedInCompounds: ingredient.compounds.map((c) => ({
        id: c.compound.id,
        name: c.compound.name,
      })),
    };
  });

  if (category) {
    inventoryItems = inventoryItems.filter((item: InventoryItem) => item.category === category);
  }

  if (status) {
    inventoryItems = inventoryItems.filter((item: InventoryItem) => item.status === status);
  }

  return apiPaginated(inventoryItems, {
    page,
    pageSize,
    total,
    hasMore: page * pageSize < total,
  });
});
