import {
  apiPaginated,
  apiUnauthorized,
  getProviderIdFromAuth0Id,
  withAuth,
} from "@rx/api-server";
import { prisma } from "@rx/database";
import { compoundQuerySchema } from "@rx/schemas";

interface CompoundWithRelations {
  id: string;
  name: string;
  description: string | null;
  dosageForm: string;
  defaultStrength: string | null;
  cashPrice: unknown;
  isActive: boolean;
  ingredients: {
    id: string;
    quantity: unknown;
    unit: string;
    ingredient: {
      id: string;
      name: string;
    };
  }[];
  _count: {
    prescriptions: number;
  };
}

export const GET = withAuth(async ({ user, request }) => {
  const providerId = await getProviderIdFromAuth0Id(user.sub);

  if (!providerId) {
    return apiUnauthorized("Provider profile not found");
  }

  const { searchParams } = new URL(request.url);
  const query = compoundQuerySchema.parse({
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    dosageForm: searchParams.get("dosageForm") ?? undefined,
    isActive: searchParams.get("isActive") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: searchParams.get("sortOrder") ?? undefined,
  });

  const searchFilter = query.search
    ? {
        OR: [
          { name: { contains: query.search, mode: "insensitive" as const } },
          { description: { contains: query.search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const where = {
    ...searchFilter,
    ...(query.dosageForm && { dosageForm: query.dosageForm }),
    ...(query.isActive !== undefined && { isActive: query.isActive }),
  };

  const [compounds, total] = await Promise.all([
    prisma.compound.findMany({
      where,
      include: {
        ingredients: {
          include: {
            ingredient: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            prescriptions: true,
          },
        },
      },
      orderBy: { [query.sortBy ?? "name"]: query.sortOrder === "desc" ? "desc" : "asc" },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    prisma.compound.count({ where }),
  ]);

  const formattedCompounds = compounds.map((compound: CompoundWithRelations) => ({
    id: compound.id,
    name: compound.name,
    description: compound.description,
    dosageForm: compound.dosageForm,
    strength: compound.defaultStrength,
    cashPrice: compound.cashPrice ? Number(compound.cashPrice) : null,
    isActive: compound.isActive,
    ingredients: compound.ingredients.map((ci) => ({
      id: ci.ingredient.id,
      name: ci.ingredient.name,
      quantity: ci.quantity ? Number(ci.quantity) : null,
      unit: ci.unit,
    })),
    prescriptionCount: compound._count.prescriptions,
  }));

  return apiPaginated(formattedCompounds, {
    page: query.page,
    pageSize: query.pageSize,
    total,
    hasMore: query.page * query.pageSize < total,
  });
});
