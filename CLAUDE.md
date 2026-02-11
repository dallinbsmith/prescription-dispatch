# Project Rules

> Compounding Pharmacy Platform - rx-platform-core

## Documentation References

- **Architecture**: `docs/platform-architecture.md` - System design, microservices, data models, tech stack
- **Implementation**: `docs/implementation-standards.md` - Coding standards, patterns, best practices
- **Design System**: `docs/design-system.md` - UI/UX specifications, components, colors, typography

---

## Core Principles

- No artifacts
- Less code is better than more code
- No fallback mechanisms — they hide real failures
- Rewrite existing components over adding new ones
- Flag obsolete files to keep the codebase lightweight
- Avoid race conditions at all costs

## Response Guidelines

- Always output the full component unless told otherwise
- Never say "X remains unchanged" — always show the code
- Be explicit on where snippets go (e.g., below "abc", above "xyz")
- If only one function changes, just show that one
- Take your time to ultrathink when on extended thinking mode — thinking is cheaper than fixing bugs

---

## Code Style

### Functions

Always use arrow functions. Never use function declarations.

```typescript
// Correct
const handleSubmit = () => {};
const fetchData = async () => {};
const Button = ({ children }: ButtonProps) => {};

// Wrong
function handleSubmit() {}
async function fetchData() {}
function Button({ children }: ButtonProps) {}
```

### Comments

Minimal comments. Only add comments for genuinely complex logic.

- No comments explaining obvious code
- No section header comments like `// Filter` or `// Handle submit`
- No JSDoc unless explicitly requested
- Let clear variable/function names document intent

```typescript
// Wrong
// Filter active users
const activeUsers = users.filter((u) => u.active);

// Correct - the code is self-documenting
const activeUsers = users.filter((u) => u.active);

// Correct - complex logic that needs explanation
// Bitwise check for permissions: read=1, write=2, admin=4
const canWrite = (permissions & 2) !== 0;
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+ (App Router), React 19, Tailwind CSS |
| UI Components | shadcn/ui, Radix primitives |
| State | Zustand or Jotai |
| Forms | React Hook Form + Zod |
| Backend | Node.js/TypeScript, NestJS or Fastify |
| API | tRPC (internal) + REST (external) |
| Database | PostgreSQL, Prisma ORM |
| Auth | Auth0 |
| Package Manager | pnpm |
| Monorepo | Turborepo |

---

## Project Structure

```
rx-platform-core/
├── packages/           # Shared libraries (@rx/*)
│   ├── ui/            # React components
│   ├── hooks/         # React hooks
│   ├── schemas/       # Zod validation schemas
│   ├── types/         # TypeScript types
│   ├── api-client/    # Frontend API utilities
│   ├── api-server/    # Backend API utilities
│   ├── auth/          # Auth logic
│   ├── utils/         # Pure utility functions
│   ├── database/      # Prisma client
│   └── testing/       # Test utilities
├── tooling/           # Shared configs
│   ├── eslint-config/
│   ├── typescript-config/
│   └── tailwind-config/
└── docs/              # Documentation
```

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `patient-card.tsx` |
| Hooks | kebab-case with use- prefix | `use-debounce.ts` |
| Utilities | kebab-case | `format-date.ts` |
| Types | kebab-case | `patient-types.ts` |
| Constants | kebab-case | `api-endpoints.ts` |

### Code

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PatientCard` |
| Hooks | camelCase with use prefix | `useDebounce` |
| Functions | camelCase | `formatDate` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| Types/Interfaces | PascalCase | `Patient`, `ApiResponse` |
| Enums | PascalCase | `PrescriptionStatus` |

---

## Import Order

1. Built-in modules (node:, react)
2. External packages
3. Internal packages (@rx/*)
4. Parent imports (../)
5. Sibling imports (./)

```typescript
import { useEffect, useState } from "react";

import { z } from "zod";

import { Button } from "@rx/ui";
import { useDebounce } from "@rx/hooks";
import type { Patient } from "@rx/types";

import { usePatientStore } from "../stores/patient-store";

import { PatientAvatar } from "./patient-avatar";
```

---

## Component Patterns

### Props Interface

```typescript
interface PatientCardProps {
  patient: Patient;
  onSelect?: (id: string) => void;
  className?: string;
}

const PatientCard = ({ patient, onSelect, className }: PatientCardProps) => {
  return (
    <div className={cn("rounded-lg border p-4", className)}>
      {/* ... */}
    </div>
  );
};
```

### Forwarded Refs

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

---

## API Patterns

### Server Actions (Next.js)

```typescript
"use server";

import { revalidatePath } from "next/cache";

import { prescriptionSchema } from "@rx/schemas";
import { prisma } from "@rx/database";

export const createPrescription = async (formData: FormData) => {
  const data = prescriptionSchema.parse(Object.fromEntries(formData));

  const prescription = await prisma.prescription.create({ data });

  revalidatePath("/prescriptions");
  return prescription;
};
```

### API Routes

```typescript
import { NextResponse } from "next/server";

import { validateRequest } from "@rx/api-server";
import { prescriptionSchema } from "@rx/schemas";

export const POST = async (request: Request) => {
  const body = await request.json();
  const data = validateRequest(prescriptionSchema, body);

  // ... handle request

  return NextResponse.json({ data });
};
```

---

## Error Handling

```typescript
// Use Result pattern for expected errors
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Throw for unexpected errors
const fetchPatient = async (id: string): Promise<Result<Patient>> => {
  const patient = await prisma.patient.findUnique({ where: { id } });

  if (!patient) {
    return { success: false, error: new Error("Patient not found") };
  }

  return { success: true, data: patient };
};
```

---

## Healthcare-Specific Rules

### Patient Safety

- Never use optimistic UI for clinical actions (prescriptions, verifications)
- Always confirm destructive actions with explicit dialogs
- Drug interaction alerts must be acknowledged before proceeding
- Patient identifiers (name, DOB, allergies) must be visible on clinical screens

### Data Display

- Dates: `Jan 15, 2024` (no ambiguous formats like 01/15/24)
- Times: `2:30 PM` (12-hour with AM/PM)
- Dosages: Always include units (`10 mg` not `10`)
- Phone: `(801) 555-1234`
- Prescription IDs: `RX-XXXX-XXXX`

### Accessibility

- WCAG 2.1 AA minimum
- All interactive elements keyboard accessible
- Minimum touch target: 44x44px
- Color contrast: 4.5:1 for text, 3:1 for UI elements

---

## Color System

### Backgrounds

- Light mode: Mercury White `#F4F5F8`
- Dark mode: Nordic Gray `#222326`

### Platform Colors

| Platform | Primary | Usage |
|----------|---------|-------|
| Patient | `#29B5E8` (Blue) | Patient-facing apps |
| Doctor | `#DC3545` (Red) | Provider/prescriber apps |
| Pharmacy | `#7D44CF` (Purple) | Pharmacist/technician apps |
| Employer | `#FF9F36` (Orange) | HR/benefits admin apps |

---

## Git Conventions

### Committing Changes

- **Commit frequently**: Break large tasks into smaller steps and commit after each meaningful step
- **Commit only your changes**: Do NOT include pre-existing working tree files or untracked files you didn't create/modify

### Commit Message Format

- First line: `type: brief description` (e.g., `feat: add user authentication`)
- Supported types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- Add blank line, then detailed explanation if needed
- Do NOT add "Co-authored-by" footers

### Branch Names

- Feature: `feat/add-patient-search`
- Fix: `fix/prescription-validation`
- Chore: `chore/update-dependencies`

---

## Testing

- Unit tests for utilities and hooks
- Integration tests for API routes
- E2E tests for critical flows (prescription creation, verification)
- Test files colocated: `patient-card.test.tsx` next to `patient-card.tsx`

---

## Performance

- Images: Use Next.js Image component with proper sizing
- Lists: Virtualize lists > 50 items
- Data fetching: Use React Query/SWR with proper cache invalidation
- Bundle: Keep initial JS < 200KB gzipped
