# Pharmacy Portal API Routes - Optimization Plan

## Analysis

### Current State

All 5 pharmacy portal pages use hardcoded mock data with no API integration:

| Page | File | Mock Data | Status |
|------|------|-----------|--------|
| Dashboard | `app/page.tsx` | `stats`, `recentOrders` | Non-async, no API |
| Queue | `app/queue/page.tsx` | `mockOrders` | Non-async, no API |
| Verification | `app/verification/page.tsx` | `mockPrescriptions` | Non-async, no API |
| Compounding | `app/compounding/page.tsx` | `mockBatches` | Non-async, no API |
| Inventory | `app/inventory/page.tsx` | `mockInventory` | Non-async, no API |

**No API routes exist** - the `/apps/pharmacy-portal/app/api/` directory is empty.

### Database Models Available

The Prisma schema has pharmacy-relevant models:

- `Prescription` - status flow: `pending → verified → compounding → quality_check → ready → shipped → delivered`
- `Order` - status flow: `pending → processing → compounding → quality_check → packaging → shipped → delivered`
- `OrderStatusLog` - audit trail for order status changes
- `Compound`, `Ingredient`, `CompoundIngredient` - compound catalog and ingredients

### Discrepancies Identified

1. **Missing Inventory Model**: The UI shows inventory management but there's no `InventoryItem` model in the schema. The mock data shows fields like `reorderPoint`, `lotNumber`, `expiryDate` that don't exist.

2. **Missing Batch Model**: The compounding page shows batch processing but there's no `Batch` or `ManufacturingBatch` model in the schema.

3. **User Role Lookup**: No `getPharmacistFromAuth0Id` utility exists in `@rx/api-server` - needs to be created.

4. **Prescription vs Order Confusion**: The UI shows "orders" in the queue but the verification page shows "prescriptions". Need to clarify the workflow:
   - Prescriptions are created by providers
   - Pharmacist verifies prescription → status: `verified`
   - Order is created from prescription when patient pays
   - Order goes through: `processing → compounding → quality_check → packaging → shipped`

### Design Decisions

For this implementation, we will:

1. **Work with existing models**: Use `Prescription` and `Order` without adding Inventory/Batch models
2. **Queue = Orders with status pending/processing**: The queue shows orders awaiting work
3. **Verification = Prescriptions with status pending**: Prescriptions awaiting pharmacist review
4. **Compounding = Orders with status compounding**: Orders in production (simulate batch grouping via query)
5. **Inventory**: Create API that returns compound/ingredient data as inventory placeholder

---

## Implementation Plan

### Phase 1: Pharmacist Lookup Utility

**File**: `packages/api-server/src/pharmacist-lookup.ts`

Add utility functions for pharmacist authentication similar to provider-lookup.ts:

```typescript
// Functions to add:
// - getPharmacistFromAuth0Id(auth0Id): Get user with pharmacist/technician role
// - getUserIdFromAuth0Id(auth0Id): Get userId for pharmacy staff
// - userHasPharmacyRole(auth0Id): Check if user has pharmacist/technician/system_admin role
```

**File**: `packages/api-server/src/index.ts`

Export new pharmacist lookup functions.

---

### Phase 2: Dashboard API

**File**: `apps/pharmacy-portal/app/api/dashboard/route.ts`

**Endpoint**: `GET /api/dashboard`

Returns:
- Stats: pending orders count, prescriptions awaiting verification, orders in compounding, orders ready to ship
- Recent orders (last 10) with patient/prescription info

**Data sources**:
- `prisma.prescription.count({ where: { status: "pending" } })` - verification queue
- `prisma.order.count({ where: { status: "pending" } })` - pending orders
- `prisma.order.count({ where: { status: "compounding" } })` - in compounding
- `prisma.order.count({ where: { status: "packaging" } })` - ready to ship
- `prisma.order.findMany(...)` - recent orders with relations

---

### Phase 3: Orders Queue API

**File**: `apps/pharmacy-portal/app/api/orders/route.ts`

**Endpoint**: `GET /api/orders`

Query params: `status`, `priority`, `page`, `pageSize`, `sortBy`, `sortOrder`

Returns paginated orders with:
- Order details (orderNumber, status, totalAmount)
- Patient info (name)
- Prescription compound info (medication name, dosage)
- Priority (based on order creation date or future priority field)

**File**: `apps/pharmacy-portal/app/api/orders/[id]/route.ts`

**Endpoints**:
- `GET /api/orders/:id` - Single order with full details
- `PATCH /api/orders/:id` - Update order status, add status log

---

### Phase 4: Prescription Verification API

**File**: `apps/pharmacy-portal/app/api/prescriptions/route.ts`

**Endpoint**: `GET /api/prescriptions`

Query params: `status` (default: "pending"), `page`, `pageSize`

Returns prescriptions awaiting verification with:
- Prescription details
- Patient info (name, DOB, allergies)
- Provider info (prescriber name)
- Compound details

**File**: `apps/pharmacy-portal/app/api/prescriptions/[id]/route.ts`

**Endpoints**:
- `GET /api/prescriptions/:id` - Single prescription with full details
- `PATCH /api/prescriptions/:id` - Verify/reject prescription (update status, verifiedAt, verifiedBy)

---

### Phase 5: Compounding API

**File**: `apps/pharmacy-portal/app/api/compounding/route.ts`

**Endpoint**: `GET /api/compounding`

Returns orders grouped by compound (simulating batches):
- Group orders with status `compounding` or `quality_check` by compound
- Return batch-like structure with order counts, compound info, status

**File**: `apps/pharmacy-portal/app/api/compounding/[id]/route.ts`

**Endpoints**:
- `GET /api/compounding/:id` - Single order in compounding with details
- `PATCH /api/compounding/:id` - Update order progress (move to quality_check, packaging)

---

### Phase 6: Inventory API (Simplified)

**File**: `apps/pharmacy-portal/app/api/inventory/route.ts`

**Endpoint**: `GET /api/inventory`

Returns compound ingredients as inventory items (simplified approach):
- Query `Ingredient` table
- Add computed status (in_stock, low_stock, critical) - placeholder values
- Note: Full inventory management would require schema changes

---

### Phase 7: Zod Schemas

**File**: `packages/schemas/src/pharmacy.ts`

Add validation schemas:
- `pharmacyOrderQuerySchema` - order list query params
- `orderStatusUpdateSchema` - status update payload
- `prescriptionVerificationSchema` - verify/reject payload
- `pharmacyPrescriptionQuerySchema` - prescription list query params

**File**: `packages/schemas/src/index.ts`

Export new pharmacy schemas.

---

### Phase 8: Update Dashboard Page

**File**: `apps/pharmacy-portal/app/page.tsx`

- Convert to async server component
- Add `getDashboardData()` fetch function using cookies pattern
- Replace hardcoded `stats` and `recentOrders` with API data
- Handle loading/empty states

---

### Phase 9: Update Queue Page

**File**: `apps/pharmacy-portal/app/queue/page.tsx`

- Convert to async server component
- Add `getOrders()` fetch function
- Replace `mockOrders` with API data
- Add pagination support
- Handle empty state

---

### Phase 10: Update Verification Page

**File**: `apps/pharmacy-portal/app/verification/page.tsx`

- Convert to async server component
- Add `getPendingPrescriptions()` fetch function
- Replace `mockPrescriptions` with API data
- Handle empty state

---

### Phase 11: Update Compounding Page

**File**: `apps/pharmacy-portal/app/compounding/page.tsx`

- Convert to async server component
- Add `getCompoundingOrders()` fetch function
- Replace `mockBatches` with API data (grouped orders)
- Handle empty state

---

### Phase 12: Update Inventory Page

**File**: `apps/pharmacy-portal/app/inventory/page.tsx`

- Convert to async server component
- Add `getInventory()` fetch function
- Replace `mockInventory` with API data
- Handle empty state

---

### Phase 13: Verification

- Run `pnpm typecheck` from monorepo root
- Run `pnpm lint` from monorepo root
- Fix any type errors or lint issues
- Verify all API routes respond correctly

---

## Files Summary

### New Files (11)

| File | Purpose |
|------|---------|
| `packages/api-server/src/pharmacist-lookup.ts` | Auth lookup utilities |
| `packages/schemas/src/pharmacy.ts` | Zod validation schemas |
| `apps/pharmacy-portal/app/api/dashboard/route.ts` | Dashboard stats API |
| `apps/pharmacy-portal/app/api/orders/route.ts` | Orders list API |
| `apps/pharmacy-portal/app/api/orders/[id]/route.ts` | Single order API |
| `apps/pharmacy-portal/app/api/prescriptions/route.ts` | Prescriptions list API |
| `apps/pharmacy-portal/app/api/prescriptions/[id]/route.ts` | Single prescription API |
| `apps/pharmacy-portal/app/api/compounding/route.ts` | Compounding list API |
| `apps/pharmacy-portal/app/api/compounding/[id]/route.ts` | Single compounding order API |
| `apps/pharmacy-portal/app/api/inventory/route.ts` | Inventory list API |
| `apps/pharmacy-portal/app/api/auth/[auth0]/route.ts` | Auth0 route handler |

### Modified Files (7)

| File | Change |
|------|--------|
| `packages/api-server/src/index.ts` | Export pharmacist lookup |
| `packages/schemas/src/index.ts` | Export pharmacy schemas |
| `apps/pharmacy-portal/app/page.tsx` | Integrate dashboard API |
| `apps/pharmacy-portal/app/queue/page.tsx` | Integrate orders API |
| `apps/pharmacy-portal/app/verification/page.tsx` | Integrate prescriptions API |
| `apps/pharmacy-portal/app/compounding/page.tsx` | Integrate compounding API |
| `apps/pharmacy-portal/app/inventory/page.tsx` | Integrate inventory API |

---

## Notes

### Future Schema Considerations

For full pharmacy functionality, these models would be beneficial:

1. **InventoryItem**: Track raw materials, packaging, expiry dates, lot numbers, reorder points
2. **ManufacturingBatch**: Group orders for batch compounding with assigned technician, progress tracking
3. **QualityCheckResult**: Record QC outcomes with pass/fail, notes, checked by

These are out of scope for this implementation but noted for future enhancement.

### Security Considerations

- All API routes use `withAuth` wrapper
- Verify user has pharmacy role (pharmacist, technician, system_admin)
- Status transitions should be validated (can't skip steps)
- verifiedBy field should use authenticated user's ID
