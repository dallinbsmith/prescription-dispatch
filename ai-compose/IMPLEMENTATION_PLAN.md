# Implementation Plan

> Optimization plan for the Compounding Pharmacy Platform

This document details step-by-step improvements with atomic changes that maintain existing functionality.

---

## Analysis

### 1. Code Organization & Structure

**Observations:**

**Positive:**
- Well-organized monorepo structure using Turborepo and pnpm workspaces
- Clean separation of packages (@rx/ui, @rx/auth, @rx/schemas, etc.)
- Shared Tailwind config in tooling directory
- Consistent file structure across all 4 portals

**Issues:**

1. **Middleware Duplication (Critical):** All 4 portals duplicate the same middleware logic including:
   - `decodeJwtPayload` function (identical in all 4 files)
   - Auth0Client instantiation
   - ROLES_CLAIM constant
   - Role checking logic

   The `@rx/auth` package exports `createPortalMiddleware` but portals don't use it. Additionally, the shared middleware doesn't decode the JWT (it reads from `session.user[ROLES_CLAIM]` which doesn't work with Auth0 v4).

2. **Missing UserProvider:** Layouts don't wrap children with `UserProvider` from `@auth0/nextjs-auth0/client`, making the `useUser()` hook unavailable for client components.

3. **Inconsistent Auth Pattern:** Nav components use async server component pattern with `auth0.getSession()`, but there's no client-side hook access for interactive components.

4. **Empty API Directories:** All portal `/app/api/` directories are empty - no API routes implemented.

5. **File Naming:** Most files use kebab-case which matches the project rules, but some Prisma enums use PascalCase values instead of SCREAMING_SNAKE_CASE.

### 2. Code Quality & Best Practices

**Observations:**

**Positive:**
- Arrow functions used consistently in components
- TypeScript strict mode enabled
- Zod schemas properly defined with type inference
- CVA (class-variance-authority) used for component variants
- React.forwardRef pattern used correctly

**Issues:**

1. **Function Declaration in Middleware:** All portal middleware files use `export async function middleware()` instead of arrow functions, violating the project rule: "Always use arrow functions. Never use function declarations."

2. **Mock Data Everywhere:** All pages use hardcoded mock data instead of fetching from APIs or database:
   - `mockPrescriptions` in prescriptions page
   - `mockOrders` in orders/queue pages
   - `mockEmployees`, `mockInventory`, `mockPatients`, etc.

3. **No Form Validation:** Despite React Hook Form + Zod being in the tech stack, no forms use proper validation. The prescribe page has inputs without any form handling.

4. **Missing Type Safety:** Some type assertions used (`as string[]`) that could be avoided with proper typing.

5. **Unused Exports:** `@rx/auth` exports `syncUserToDatabase` and `createPortalMiddleware` that are never called anywhere.

6. **No Error Handling:** No try/catch blocks, no error boundaries, no Result pattern usage despite it being defined in project rules.

7. **Inconsistent Import Patterns:** Some files import from `@rx/ui/button` directly, others from `@rx/ui`. Should be consistent.

### 3. UI/UX

**Observations:**

**Positive:**
- Clean, professional aesthetic matching healthcare context
- Consistent use of platform colors (patient-600, pharmacy-600, etc.)
- Responsive grid layouts
- Dark mode support in Tailwind config

**Issues:**

1. **No Active Nav State:** Nav links don't show which page is currently active - no visual indicator.

2. **No Mobile Navigation:** No hamburger menu or mobile-responsive navigation. Nav items will overflow on small screens.

3. **No Loading States:** Pages have no loading indicators, skeletons, or suspense boundaries.

4. **No Empty States:** When data is empty (no prescriptions, no orders), there's no friendly empty state message.

5. **Progress Bars Have No Radius:** After removing rounded corners, progress bars now look disconnected. The design should use a different visual treatment.

6. **Buttons Don't Link:** Home page buttons say "View Prescriptions" but don't actually navigate anywhere (no href).

7. **Inconsistent Spacing:** Some pages use `py-8`, others use different values. Header heights vary.

8. **No Toast/Notification System:** Toast component exists but isn't integrated into any page for feedback.

9. **Unauthorized Page is Basic:** Just shows "Access Denied" with no helpful information or redirect options.

10. **No Keyboard Navigation:** Focus states exist but no skip-to-content link or proper tab order management.

---

## Phase 1: Fix Critical Auth Infrastructure

### Step 1.1: Consolidate Middleware with JWT Decoding

**Task**: Update `@rx/auth` middleware factory to include JWT decoding, then refactor all portal middleware to use it.

**Files**:
- `packages/auth/src/middleware.ts`: Add `decodeJwtPayload` function, update `createPortalMiddleware` to decode JWT from `session.tokenSet?.idToken`
- `packages/auth/src/index.ts`: Export `createPortalMiddleware`
- `apps/patient-portal/middleware.ts`: Replace with factory usage
- `apps/provider-portal/middleware.ts`: Replace with factory usage
- `apps/pharmacy-portal/middleware.ts`: Replace with factory usage
- `apps/employer-portal/middleware.ts`: Replace with factory usage

**Step Dependencies**: None

**Success Criteria**: All portals use shared middleware, `decodeJwtPayload` exists only in `@rx/auth`

---

### Step 1.2: Add UserProvider to All Layouts

**Task**: Wrap layout children with Auth0 UserProvider for client-side auth hooks.

**Files**:
- `apps/patient-portal/app/layout.tsx`: Add UserProvider wrapper
- `apps/provider-portal/app/layout.tsx`: Add UserProvider wrapper
- `apps/pharmacy-portal/app/layout.tsx`: Add UserProvider wrapper
- `apps/employer-portal/app/layout.tsx`: Add UserProvider wrapper

**Step Dependencies**: None

**Success Criteria**: `useUser()` hook works in client components across all portals

---

## Phase 2: Code Quality Improvements

### Step 2.1: Fix Arrow Function Violations in Middleware

**Task**: Convert middleware function declarations to arrow function syntax.

**Files**:
- `packages/auth/src/middleware.ts`: Change `async function middleware` to arrow function

**Step Dependencies**: Step 1.1

**Success Criteria**: No `function` keyword in middleware, ESLint passes

---

### Step 2.2: Standardize UI Package Imports

**Task**: Create barrel export in @rx/ui and update all imports to use consistent pattern.

**Files**:
- `packages/ui/src/index.ts`: Add barrel exports for all components
- `apps/patient-portal/components/nav.tsx`: Update imports to `import { Button, cn } from "@rx/ui"`
- `apps/provider-portal/components/nav.tsx`: Update imports
- `apps/pharmacy-portal/components/nav.tsx`: Update imports
- `apps/employer-portal/components/nav.tsx`: Update imports

**Step Dependencies**: None

**Success Criteria**: All imports use `@rx/ui` barrel export, no direct file imports like `@rx/ui/button`

---

### Step 2.3: Add Result Pattern Utility

**Task**: Create shared Result type and helper functions in @rx/utils for consistent error handling.

**Files**:
- `packages/utils/src/result.ts`: Create `Result<T, E>` type, `ok()`, `err()`, `isOk()`, `isErr()` helpers
- `packages/utils/src/index.ts`: Export result utilities

**Step Dependencies**: None

**Success Criteria**: Result pattern available for use in API routes and services

---

## Phase 3: Navigation Improvements

### Step 3.1: Add Active State to Nav Links

**Task**: Highlight current page in navigation using `usePathname()` hook.

**Files**:
- `apps/patient-portal/components/nav.tsx`: Convert to client component with usePathname, add active styles
- `apps/provider-portal/components/nav.tsx`: Same changes
- `apps/pharmacy-portal/components/nav.tsx`: Same changes
- `apps/employer-portal/components/nav.tsx`: Same changes

**Step Dependencies**: Step 1.2 (UserProvider needed for client components)

**Success Criteria**: Current page nav link is visually distinct (bold, underline, or color change)

---

### Step 3.2: Add Mobile Navigation

**Task**: Add responsive hamburger menu for mobile viewports.

**Files**:
- `packages/ui/src/sheet.tsx`: Create Sheet component (slide-out panel) using Radix Dialog
- `packages/ui/src/index.ts`: Export Sheet
- `apps/patient-portal/components/nav.tsx`: Add mobile menu using Sheet
- `apps/provider-portal/components/nav.tsx`: Add mobile menu
- `apps/pharmacy-portal/components/nav.tsx`: Add mobile menu
- `apps/employer-portal/components/nav.tsx`: Add mobile menu

**Step Dependencies**: Step 3.1

**Success Criteria**: Navigation works on mobile with hamburger menu, collapses below md breakpoint

---

## Phase 4: Page UX Improvements

### Step 4.1: Add Loading States with Suspense

**Task**: Create Skeleton components and wrap pages with Suspense boundaries.

**Files**:
- `packages/ui/src/skeleton.tsx`: Create Skeleton component with shimmer animation
- `packages/ui/src/index.ts`: Export Skeleton
- `apps/patient-portal/app/prescriptions/loading.tsx`: Create loading state
- `apps/patient-portal/app/orders/loading.tsx`: Create loading state
- `apps/pharmacy-portal/app/queue/loading.tsx`: Create loading state
- `apps/pharmacy-portal/app/inventory/loading.tsx`: Create loading state

**Step Dependencies**: None

**Success Criteria**: Pages show skeleton loader during data fetch

---

### Step 4.2: Add Empty States

**Task**: Create EmptyState component and add to data pages.

**Files**:
- `packages/ui/src/empty-state.tsx`: Create EmptyState component with icon, title, description, action
- `packages/ui/src/index.ts`: Export EmptyState
- `apps/patient-portal/app/prescriptions/page.tsx`: Add empty state when no prescriptions
- `apps/patient-portal/app/orders/page.tsx`: Add empty state when no orders

**Step Dependencies**: None

**Success Criteria**: Friendly message shown when data arrays are empty

---

### Step 4.3: Fix Home Page Button Navigation

**Task**: Make home page action buttons navigate to correct pages.

**Files**:
- `apps/patient-portal/app/page.tsx`: Wrap buttons with Link or use Next.js Link component
- `apps/provider-portal/app/page.tsx`: Fix navigation buttons
- `apps/pharmacy-portal/app/page.tsx`: Fix navigation buttons
- `apps/employer-portal/app/page.tsx`: Fix navigation buttons

**Step Dependencies**: None

**Success Criteria**: All dashboard action buttons navigate to their respective pages

---

### Step 4.4: Improve Unauthorized Page

**Task**: Create informative unauthorized page with helpful messaging.

**Files**:
- `apps/patient-portal/app/unauthorized/page.tsx`: Add role info, contact support link, return home button
- `apps/provider-portal/app/unauthorized/page.tsx`: Same improvements
- `apps/pharmacy-portal/app/unauthorized/page.tsx`: Same improvements
- `apps/employer-portal/app/unauthorized/page.tsx`: Same improvements

**Step Dependencies**: None

**Success Criteria**: Unauthorized page explains why access was denied and provides next steps

---

## Phase 5: Error Handling Infrastructure

### Step 5.1: Add Error Boundary Component

**Task**: Create reusable ErrorBoundary component for catching render errors.

**Files**:
- `packages/ui/src/error-boundary.tsx`: Create ErrorBoundary class component with fallback UI
- `packages/ui/src/index.ts`: Export ErrorBoundary
- `apps/patient-portal/app/layout.tsx`: Wrap main content with ErrorBoundary
- `apps/provider-portal/app/layout.tsx`: Wrap with ErrorBoundary
- `apps/pharmacy-portal/app/layout.tsx`: Wrap with ErrorBoundary
- `apps/employer-portal/app/layout.tsx`: Wrap with ErrorBoundary

**Step Dependencies**: Step 1.2

**Success Criteria**: Unhandled errors show friendly error UI instead of crashing

---

### Step 5.2: Add Global Error Page

**Task**: Create Next.js error.tsx pages for each portal.

**Files**:
- `apps/patient-portal/app/error.tsx`: Create error page with retry button
- `apps/provider-portal/app/error.tsx`: Create error page
- `apps/pharmacy-portal/app/error.tsx`: Create error page
- `apps/employer-portal/app/error.tsx`: Create error page

**Step Dependencies**: None

**Success Criteria**: Route-level errors show custom error page with retry option

---

### Step 5.3: Add Not Found Pages

**Task**: Create custom 404 pages for each portal.

**Files**:
- `apps/patient-portal/app/not-found.tsx`: Create 404 page with navigation back
- `apps/provider-portal/app/not-found.tsx`: Create 404 page
- `apps/pharmacy-portal/app/not-found.tsx`: Create 404 page
- `apps/employer-portal/app/not-found.tsx`: Create 404 page

**Step Dependencies**: None

**Success Criteria**: Invalid routes show custom 404 page instead of default Next.js page

---

## Phase 6: Toast Notification Integration

### Step 6.1: Set Up Toast Provider

**Task**: Create Toaster component and add to layouts for global toast notifications.

**Files**:
- `packages/ui/src/toaster.tsx`: Create Toaster provider component using existing toast primitives
- `packages/ui/src/use-toast.ts`: Create useToast hook for triggering toasts
- `packages/ui/src/index.ts`: Export Toaster and useToast
- `apps/patient-portal/app/layout.tsx`: Add Toaster component
- `apps/provider-portal/app/layout.tsx`: Add Toaster component
- `apps/pharmacy-portal/app/layout.tsx`: Add Toaster component
- `apps/employer-portal/app/layout.tsx`: Add Toaster component

**Step Dependencies**: Step 1.2

**Success Criteria**: `useToast()` hook available throughout app, toasts appear in bottom-right corner

---

## Phase 7: Accessibility Improvements

### Step 7.1: Add Skip to Content Link

**Task**: Add keyboard-accessible skip link for screen reader users.

**Files**:
- `packages/ui/src/skip-link.tsx`: Create visually-hidden skip link that appears on focus
- `packages/ui/src/index.ts`: Export SkipLink
- `apps/patient-portal/app/layout.tsx`: Add SkipLink before Nav, add id="main-content" to main
- `apps/provider-portal/app/layout.tsx`: Add SkipLink
- `apps/pharmacy-portal/app/layout.tsx`: Add SkipLink
- `apps/employer-portal/app/layout.tsx`: Add SkipLink

**Step Dependencies**: None

**Success Criteria**: Tab on page load shows "Skip to content" link, clicking skips to main content

---

### Step 7.2: Add Focus Visible Styles

**Task**: Ensure consistent focus-visible styles across all interactive elements.

**Files**:
- `tooling/tailwind-config/tailwind.config.ts`: Add focus-visible ring styles to extend
- `packages/ui/src/button.tsx`: Verify focus-visible classes present
- `packages/ui/src/input.tsx`: Add focus-visible classes
- `packages/ui/src/select.tsx`: Verify focus-visible classes

**Step Dependencies**: None

**Success Criteria**: All interactive elements show visible focus ring when focused via keyboard

---

## Summary

| Phase | Steps | Files Modified | Priority |
|-------|-------|----------------|----------|
| 1: Auth Infrastructure | 2 | 10 | Critical |
| 2: Code Quality | 3 | 11 | High |
| 3: Navigation | 2 | 10 | High |
| 4: Page UX | 4 | 16 | Medium |
| 5: Error Handling | 3 | 14 | Medium |
| 6: Toast Integration | 1 | 8 | Medium |
| 7: Accessibility | 2 | 9 | Medium |

**Total: 17 steps, ~78 file modifications**

---

## Next Steps After This Plan

After completing this optimization plan, the next major milestone is **implementing actual API routes and data fetching**:

1. Create API routes in each portal for their domain entities
2. Implement server actions for form submissions
3. Add React Query or SWR for client-side data fetching
4. Connect to the Prisma database
5. Implement the `syncUserToDatabase` function on login callback
6. Replace mock data with real database queries
7. Add form validation with React Hook Form + Zod
