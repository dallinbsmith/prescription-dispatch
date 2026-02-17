# Implementation Standards

> Technical rules and conventions for building the Compounding Pharmacy Platform

This document defines the **how** of implementation. For system architecture and **what** to build, see [platform-architecture.md](./platform-architecture.md).

---

## Table of Contents

1. [Code Style & Conventions](#code-style--conventions)
2. [State Management](#state-management)
3. [Component Architecture](#component-architecture)
4. [Form Handling](#form-handling)
5. [Component Library](#component-library)
6. [Storybook](#storybook)
7. [Error Boundaries & Suspense](#error-boundaries--suspense)
8. [API Design Standards](#api-design-standards)
9. [Database Standards](#database-standards)
10. [Error Handling](#error-handling)
11. [User-Facing Communication](#user-facing-communication)
12. [Logging Standards](#logging-standards)
13. [Security Rules](#security-rules)
14. [Testing Requirements](#testing-requirements)
15. [Service Communication](#service-communication)
16. [Configuration Management](#configuration-management)
17. [Deployment Standards](#deployment-standards)
18. [PHI/PII Handling Rules](#phipii-handling-rules)
19. [Performance Standards](#performance-standards)
20. [AI-Assisted Development](#ai-assisted-development)

---

## Code Style & Conventions

### Language & Runtime

```typescript
const techStack = {
  runtime: 'Node.js 20 LTS',
  language: 'TypeScript 5.x (strict mode)',
  frontend: 'Next.js 14+ (App Router)',
  styling: 'Tailwind CSS',
  packageManager: 'pnpm'
};
```

### TypeScript Rules

```typescript
// tsconfig.json strict settings - ALL required
const strictSettings = {
  strict: true,
  noImplicitAny: true,
  strictNullChecks: true,
  noUncheckedIndexedAccess: true,
  noImplicitReturns: true,
  noFallthroughCasesInSwitch: true,
  forceConsistentCasingInFileNames: true
};
```

### Function Style

**Always use arrow functions. Never use function declarations.**

```typescript
// ✅ CORRECT
const processOrder = async (orderId: string): Promise<Order> => {
  const order = await orderRepository.findById(orderId);
  return order;
};

const OrderCard = ({ order }: { order: Order }) => {
  return <div>{order.id}</div>;
};

// ❌ WRONG - never use function keyword
function processOrder(orderId: string): Promise<Order> {
  // ...
}

function OrderCard({ order }: { order: Order }) {
  // ...
}
```

### Naming Conventions

```typescript
const namingRules = {
  // Files
  components: 'PascalCase.tsx',        // OrderCard.tsx
  hooks: 'camelCase.ts',               // usePatientData.ts
  utilities: 'camelCase.ts',           // formatCurrency.ts
  constants: 'camelCase.ts',           // apiEndpoints.ts
  types: 'PascalCase.ts',              // PatientTypes.ts

  // Code
  variables: 'camelCase',              // patientName
  constants: 'SCREAMING_SNAKE_CASE',   // MAX_RETRY_ATTEMPTS
  functions: 'camelCase',              // calculateTotal
  components: 'PascalCase',            // PatientDashboard
  types: 'PascalCase',                 // PatientRecord
  interfaces: 'PascalCase',            // IPatientRepository (no I prefix preferred)
  enums: 'PascalCase',                 // OrderStatus
  enumValues: 'SCREAMING_SNAKE_CASE',  // PENDING_REVIEW

  // Database
  tables: 'snake_case',                // patient_records
  columns: 'snake_case',               // created_at
  indexes: 'idx_table_column',         // idx_patients_email
  foreignKeys: 'fk_table_reference'    // fk_orders_patient_id
};
```

### File Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── (patient)/         # Patient portal routes
│   ├── (provider)/        # Provider portal routes
│   └── (admin)/           # Admin portal routes
├── components/
│   ├── ui/                # Primitive UI components
│   ├── forms/             # Form components
│   └── [feature]/         # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Shared utilities
│   ├── api/              # API client functions
│   ├── utils/            # Pure utility functions
│   └── validators/       # Zod schemas
├── services/              # Business logic services
├── repositories/          # Data access layer
├── types/                 # TypeScript type definitions
└── config/               # Configuration files
```

### Import Order

```typescript
// 1. Node built-ins
import { readFile } from 'fs/promises';

// 2. External packages
import { z } from 'zod';
import { prisma } from '@prisma/client';

// 3. Internal aliases (@/)
import { Button } from '@/components/ui/Button';
import { usePatient } from '@/hooks/usePatient';

// 4. Relative imports
import { validateOrder } from './validators';
import type { OrderProps } from './types';

// 5. Type-only imports last
import type { Patient, Order } from '@/types';
```

### Comments

**Minimal comments. Code should be self-documenting.**

```typescript
const commentRules = {
  only: 'Add comments for genuinely complex logic',
  never: [
    'Comments explaining obvious code',
    'Section header comments (// --- Section ---)',
    'JSDoc unless explicitly requested',
    'Comments in JSX',
    'Emojis in code, comments, or logs'
  ],
  principle: 'Let clear variable/function names document intent'
};

const emojiPolicy = {
  inCode: 'Never',
  inComments: 'Never',
  inLogs: 'Never',
  inUI: 'Icons from icon libraries only (Lucide, Heroicons)',
  why: 'Emojis clutter code and render inconsistently across systems'
};

// ✅ CORRECT: Regulatory requirement not obvious from code
// FDA requires 14-day BUD for aqueous preparations without preservatives
const defaultBeyondUseDate = addDays(compoundingDate, 14);

// ✅ CORRECT: Complex regex
// NPI format: 10 digits, first digit 1 or 2, valid Luhn checksum
const NPI_PATTERN = /^[12]\d{9}$/;

// ❌ WRONG: Obvious from code
// Calculate the total
const total = items.reduce((sum, item) => sum + item.price, 0);

// ❌ WRONG: Section header
// --- Order Processing ---
const processOrder = async () => { };

// ❌ WRONG: JSDoc for simple function
/**
 * Formats a price as currency
 * @param price - The price to format
 * @returns The formatted price string
 */
const formatPrice = (price: number) => `$${price.toFixed(2)}`;

// ✅ CORRECT: Just the code, name is self-documenting
const formatPrice = (price: number) => `$${price.toFixed(2)}`;
```

### Clean Code Philosophy

Readability over cleverness:

```typescript
const cleanCodePrinciples = {
  meaningfulNaming: {
    avoid: ['temp', 'data', 'x', 'result', 'item', 'myFunction'],
    prefer: ['isUserAuthenticated', 'retryAttemptCount', 'activeSubscriptionUsers']
  },
  smallFunctions: {
    rule: 'A function does one thing well',
    signal: 'If you scroll to see the end, it\'s too long',
    target: '20-30 lines maximum'
  },
  declarativeOverImperative: {
    prefer: '.map(), .filter(), .reduce()',
    avoid: 'Manual for loops when functional works',
    why: 'Describes WHAT, not HOW'
  }
};

// ❌ WRONG
const data = items.filter(x => x.status === 4);

// ✅ CORRECT
const STATUS_PENDING = 4;
const pendingOrders = orders.filter(order => order.status === STATUS_PENDING);
```

### Automation (Linting & Formatting)

No manual style debates. Machines handle it:

```typescript
const automationStack = {
  formatter: {
    tool: 'Prettier',
    config: 'Opinionated defaults, minimal overrides',
    runs: 'On save, pre-commit'
  },
  linter: {
    tool: 'ESLint',
    catches: ['Unused variables', 'Insecure patterns', 'Code smells'],
    runs: 'On save, CI pipeline'
  },
  preCommit: {
    tool: 'Husky + lint-staged',
    blocks: 'Commits that fail style checks',
    principle: 'Bad code never enters the repo'
  }
};

const neverDebateInPR = [
  'Tabs vs spaces',
  'Semicolons',
  'Trailing commas',
  'Quote style',
  'Bracket placement'
];
```

### Type Safety

Static typing is standard, even in dynamic languages:

```typescript
const typeSafety = {
  typescript: 'Standard for professional web development',
  pythonHints: 'Common in enterprise backends',
  benefits: [
    'Bugs caught at compile-time',
    'Auto-complete intelligence',
    '10x faster development with IDE support'
  ]
};

// ❌ WRONG: Primitive obsession
const processUser = (email: string, status: string, type: string) => {
  // Easy to swap argument order, compiler won't catch it
};

// ✅ CORRECT: Domain types
type UserStatus = 'active' | 'pending' | 'suspended';
type UserType = 'patient' | 'provider' | 'admin';

interface ProcessUserParams {
  email: string;
  status: UserStatus;
  type: UserType;
}

const processUser = (params: ProcessUserParams) => {
  // Type-safe, impossible to mix up
};
```

### Version Control Etiquette

Commits are part of your coding style:

```typescript
const commitStandards = {
  atomicCommits: {
    rule: 'Each commit does exactly one thing',
    good: 'Fix login validation error',
    bad: 'Fix login and update CSS and add footer'
  },
  conventionalCommits: {
    feat: 'New feature',
    fix: 'Bug fix',
    chore: 'Maintenance',
    docs: 'Documentation',
    refactor: 'Code change without behavior change',
    test: 'Adding or updating tests'
  },
  messageFormat: 'type(scope): short description'
};

// Examples
const goodCommits = [
  'feat(auth): add MFA support for admin users',
  'fix(orders): prevent duplicate submission on double-click',
  'chore(deps): update React to 18.3'
];

const badCommits = [
  'fixed stuff',
  'WIP',
  'asdfasdf',
  'updates'
];
```

### Common Code Style Mistakes

#### Ghost of Comments Past

```typescript
const commentMistakes = {
  zombieCode: {
    mistake: 'Commented-out code blocks left in file',
    fix: 'Delete it. Git has history.'
  },
  outdatedComments: {
    mistake: 'Code changes but comments don\'t',
    result: 'Comments become lies that mislead developers',
    fix: 'Update or delete when code changes'
  },
  whatComments: {
    mistake: '// Add 1 to counter',
    fix: 'Delete—the code is obvious'
  }
};
```

#### The God Function

```typescript
const godFunctionProblem = {
  symptom: 'One function handles fetch + validate + transform + save',
  result: 'Impossible to unit test, black box when it fails',
  threshold: 'More than 20-30 lines = should probably split'
};

// ❌ WRONG
const handleOrderSubmission = async (formData: FormData) => {
  // 200 lines doing everything
};

// ✅ CORRECT
const handleOrderSubmission = async (formData: FormData) => {
  const validated = validateOrderForm(formData);
  const order = transformToOrder(validated);
  const saved = await saveOrder(order);
  await sendConfirmation(saved);
  return saved;
};
```

#### Inconsistent Naming

```typescript
const namingInconsistency = {
  mistake: 'user_id in one file, userId in another, user_ID in a third',
  result: 'Search/replace nightmare, LSP suggestions break',
  fix: 'Pick one standard, enforce with linter'
};

// ❌ WRONG: Mixed conventions
const user_id = getUserId();
const userName = getUsername();
const order_STATUS = getStatus();

// ✅ CORRECT: Consistent camelCase
const userId = getUserId();
const userName = getUsername();
const orderStatus = getStatus();
```

### AI-Assisted Code Style Pitfalls

#### Ghost of Context (Variable Naming)

```typescript
const aiNamingPitfall = {
  mistake: 'AI uses generic names: data, result, item, list',
  fix: 'Rename to domain purpose: activeSubscriptionUsers'
};

// ❌ AI-generated
const data = await fetch('/api/users');
const list = data.filter(item => item.active);

// ✅ Human-refined
const usersResponse = await fetch('/api/users');
const activeUsers = usersResponse.filter(user => user.isActive);
```

#### The Megalith (Function Bloat)

```typescript
const aiFunctionBloat = {
  cause: 'Easier to prompt "add this feature to existing code"',
  result: '200-line functions violating Single Responsibility',
  fix: 'Periodically ask AI: "refactor this into smaller, modular components"'
};
```

#### Dialect Drift (Inconsistent Casing)

```typescript
const dialectDrift = {
  cause: 'AI mixes snake_case and camelCase based on training data',
  examples: ['/UserComponents vs /utils', 'user_id vs userId'],
  fix: 'Specify convention in system prompt, enforce with linter'
};
```

#### Commentary vs Documentation

```typescript
const aiCommentPitfall = {
  aiDoes: 'Comments what code is doing ("Adding 1 to x")',
  aiMisses: 'Why a specific hack exists',
  fix: 'Delete "how" comments, keep "why" comments'
};
```

#### Import Jungle

```typescript
const importJungle = {
  cause: 'AI adds imports without cleaning old ones',
  result: 'Bloated import blocks with unused libraries',
  fix: 'Run "organize imports" regularly, group properly'
};

// Import order: External → Internal → Relative → Types
```

### Code Style Anti-Patterns

| Anti-Pattern | Example | Fix |
|--------------|---------|-----|
| Magic numbers | `if (status === 4)` | Use named constants |
| Primitive obsession | `fn(string, string, string)` | Use domain types |
| God function | 200-line monolith | Split by responsibility |
| Zombie code | Commented blocks | Delete (use git) |
| Mixed naming | `userId` + `user_id` | Pick one, lint it |
| What comments | `// Add 1 to x` | Delete obvious ones |
| Import clutter | Unused imports | Organize regularly |

### Code Style Checklist

```markdown
## Before Committing

### Naming
- [ ] Variables describe their purpose
- [ ] No generic names (data, result, temp)
- [ ] Consistent casing throughout
- [ ] Constants are SCREAMING_SNAKE_CASE

### Functions
- [ ] Each function does one thing
- [ ] Under 30 lines
- [ ] Descriptive name (verb + noun)
- [ ] Arrow function syntax

### Comments
- [ ] No "what" comments (obvious code)
- [ ] "Why" comments for non-obvious logic
- [ ] No commented-out code
- [ ] No emojis

### Formatting
- [ ] Prettier ran successfully
- [ ] ESLint passes
- [ ] Imports organized
- [ ] No unused imports/variables

### Commit
- [ ] Atomic (one logical change)
- [ ] Conventional format (feat/fix/chore)
- [ ] Descriptive message
```

---

## State Management

### Core Philosophy

**Server-first. Lean client. Seamless feel.**

```typescript
const statePhilosophy = {
  principle: 'Keep state on the server, cache intelligently on client',

  serverOwns: [
    'Auth tokens and session',
    'All business data (patients, orders, prescriptions)',
    'Permissions and access control',
    'Validation and business rules'
  ],

  clientManages: [
    'UI state (modals, dropdowns, active tabs)',
    'In-progress form edits (before submission)',
    'Optimistic update rollback state',
    'Derived/computed values for display'
  ],

  urlManages: [
    'Search queries',
    'Filters and sort order',
    'Pagination cursors',
    'Active tabs (when bookmarkable)'
  ]
};
```

### State Categories

| Category | Where It Lives | Example | Tool |
|----------|---------------|---------|------|
| **Server State** | Database → Server Component | Patient record, order history | RSC + `use()` |
| **Server Cache** | Server → Client cache | Drug catalog, provider list | Next.js cache / TanStack |
| **URL State** | Browser URL | `?status=pending&sort=-date` | `useSearchParams` |
| **Form State** | Component | In-progress edits | `useActionState` |
| **UI State** | Component | Modal open, accordion expanded | `useState` (minimal) |
| **Optimistic State** | Component | Pending mutation display | `useOptimistic` |

---

### React 19 Patterns (Primary)

#### Server Components + `use()` Hook

**Default pattern for data fetching. No loading states, no useEffect.**

```typescript
// app/patients/[id]/page.tsx - Server Component (default)
const PatientPage = async ({ params }: { params: { id: string } }) => {
  // Direct async/await in Server Components
  const patient = await getPatient(params.id);
  const prescriptions = await getPatientPrescriptions(params.id);

  return (
    <div>
      <PatientHeader patient={patient} />
      <PrescriptionList prescriptions={prescriptions} />
    </div>
  );
};

// For Client Components that need async data, use the use() hook
'use client';

const OrderDetails = ({ orderPromise }: { orderPromise: Promise<Order> }) => {
  const order = use(orderPromise); // Suspends until resolved

  return <div>{order.status}</div>;
};
```

#### Server Actions for Mutations

**Replace API routes + useMutation with Server Actions.**

```typescript
// actions/prescriptions.ts
'use server';

import { revalidatePath } from 'next/cache';

const createPrescription = async (formData: FormData): Promise<ActionResult> => {
  const validated = prescriptionSchema.safeParse({
    patientId: formData.get('patientId'),
    drugId: formData.get('drugId'),
    quantity: Number(formData.get('quantity')),
    instructions: formData.get('instructions')
  });

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten() };
  }

  const prescription = await prescriptionService.create(validated.data);

  // Invalidate relevant caches
  revalidatePath(`/patients/${validated.data.patientId}`);
  revalidatePath('/prescriptions');

  return { success: true, data: prescription };
};

// Component usage - pass directly to form
const NewPrescriptionForm = ({ patientId }: { patientId: string }) => {
  return (
    <form action={createPrescription}>
      <input type="hidden" name="patientId" value={patientId} />
      <DrugSelector name="drugId" />
      <input type="number" name="quantity" />
      <textarea name="instructions" />
      <SubmitButton />
    </form>
  );
};
```

#### `useActionState` for Form State

**Replaces manual form state management.**

```typescript
'use client';

import { useActionState } from 'react';

const PatientRegistrationForm = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, {
    success: false,
    errors: null
  });

  return (
    <form action={formAction}>
      <input
        name="email"
        type="email"
        aria-invalid={!!state.errors?.email}
      />
      {state.errors?.email && (
        <span className="text-red-500">{state.errors.email}</span>
      )}

      <input name="firstName" />
      <input name="lastName" />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </button>

      {state.success && <p>Registration successful!</p>}
    </form>
  );
};
```

#### `useOptimistic` for Premium Feel

**Instant UI feedback while server processes.**

```typescript
'use client';

import { useOptimistic } from 'react';

const PrescriptionList = ({
  prescriptions
}: {
  prescriptions: Prescription[]
}) => {
  const [optimisticRxs, addOptimisticRx] = useOptimistic(
    prescriptions,
    (state, newRx: Prescription) => [...state, { ...newRx, pending: true }]
  );

  const handleCreate = async (formData: FormData) => {
    const optimisticRx = {
      id: `temp-${Date.now()}`,
      drug: formData.get('drug') as string,
      pending: true
    };

    // Immediately show optimistic update
    addOptimisticRx(optimisticRx);

    // Server action runs in background
    await createPrescription(formData);
    // On success: revalidation replaces optimistic with real data
    // On failure: optimistic state automatically rolls back
  };

  return (
    <div>
      {optimisticRxs.map(rx => (
        <PrescriptionCard
          key={rx.id}
          prescription={rx}
          className={rx.pending ? 'opacity-50' : ''}
        />
      ))}
      <form action={handleCreate}>
        {/* form fields */}
      </form>
    </div>
  );
};
```

---

### URL as State

**Filters, search, pagination, and tabs belong in the URL.**

```typescript
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const PrescriptionFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 when filters change
    params.delete('cursor');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-4">
      <select
        value={searchParams.get('status') ?? ''}
        onChange={(e) => updateFilter('status', e.target.value || null)}
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="filled">Filled</option>
        <option value="shipped">Shipped</option>
      </select>

      <input
        type="search"
        placeholder="Search..."
        defaultValue={searchParams.get('q') ?? ''}
        onChange={(e) => updateFilter('q', e.target.value || null)}
      />
    </div>
  );
};

// Server Component reads URL state
const PrescriptionsPage = async ({
  searchParams
}: {
  searchParams: { status?: string; q?: string; cursor?: string }
}) => {
  const prescriptions = await getPrescriptions({
    status: searchParams.status,
    search: searchParams.q,
    cursor: searchParams.cursor
  });

  return (
    <>
      <PrescriptionFilters />
      <PrescriptionList prescriptions={prescriptions} />
    </>
  );
};
```

**Benefits:**
- Bookmarkable state
- Back button works correctly
- Shareable links with context
- Server Components can read directly

---

### When to Use TanStack Query

**TanStack Query is NOT the default.** Use it only when React 19 + Next.js patterns are insufficient.

```typescript
const useTanStackWhen = {
  // USE TanStack Query for these scenarios
  use: [
    'Polling/real-time data without WebSockets',
    'Complex cache invalidation across unrelated components',
    'Infinite scroll with complex prefetching',
    'Offline-first requirements',
    'Background refetching with window focus',
    'Parallel queries with shared loading states'
  ],

  // DON'T use TanStack Query for these
  dontUse: [
    'Simple page data fetching (use Server Components)',
    'Form submissions (use Server Actions)',
    'Data that only refreshes on user action (use revalidatePath)',
    'Static/semi-static data (use Next.js cache)'
  ]
};
```

#### TanStack Query Example (When Needed)

```typescript
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Real-time order status polling
const useOrderStatus = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId, 'status'],
    queryFn: () => fetchOrderStatus(orderId),
    refetchInterval: 30_000, // Poll every 30 seconds
    staleTime: 10_000,       // Consider fresh for 10 seconds
  });
};

// Complex cache invalidation example
const useUpdatePatientAllergies = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAllergies,
    onSuccess: (_, { patientId }) => {
      // Invalidate multiple related queries
      queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
      queryClient.invalidateQueries({ queryKey: ['prescriptions', { patientId }] });
      queryClient.invalidateQueries({ queryKey: ['dur-alerts', patientId] });
    }
  });
};
```

#### Cache Key Conventions (When Using TanStack)

```typescript
const cacheKeyPatterns = {
  // Entity by ID
  single: ['patient', patientId],

  // List with filters
  list: ['prescriptions', { status: 'pending', patientId }],

  // Nested resource
  nested: ['patient', patientId, 'prescriptions'],

  // Specific view/subset
  subset: ['patient', patientId, 'allergies'],

  // Invalidation patterns
  invalidateAll: { queryKey: ['prescriptions'] },           // All prescription queries
  invalidateFiltered: { queryKey: ['prescriptions', { patientId }] }, // Patient's prescriptions
};
```

#### Stale Time Guidelines

```typescript
const staleTimeByDataType = {
  // Static reference data - cache aggressively
  drugCatalog: 5 * 60 * 1000,        // 5 minutes
  stateList: Infinity,                // Never stale
  formulary: 60 * 60 * 1000,          // 1 hour

  // Semi-dynamic data
  providerSchedule: 60 * 1000,        // 1 minute
  patientProfile: 30 * 1000,          // 30 seconds

  // Volatile data - always refetch
  orderStatus: 0,                     // Always stale
  inventoryLevels: 0,                 // Always stale
  appointmentAvailability: 0          // Always stale
};
```

---

### Minimal Local State

**Local state is for UI concerns only. Keep it lean.**

> **Clarification: When useState IS Acceptable**
>
> The rule is "don't use useState for SERVER DATA," not "never use useState." These are valid uses:
> - **UI toggles**: `isOpen`, `isExpanded`, `activeTab`
> - **Form validation errors**: `errors` object (not input values)
> - **Temporary UI state**: `searchTerm` for filtering (if not URL-persisted)
> - **Dynamic form management**: tracking which items exist in add/remove scenarios
>
> What's NOT acceptable: storing fetched API data in useState and manually syncing it.

```typescript
// ✅ CORRECT - UI state only
const DrugSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Drugs come from server, not local state
  // Search filtering happens on server or is derived

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Results fetched based on searchTerm */}
    </Popover>
  );
};

// ❌ WRONG - syncing server data to local state
const DrugSelector = () => {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  useEffect(() => {
    fetchDrugs().then(setDrugs); // DON'T DO THIS
  }, []);

  // Now you have stale data, manual refetching, loading states...
};
```

### Derive, Don't Duplicate

```typescript
// ✅ CORRECT - derive filtered list during render
const PrescriptionList = ({ prescriptions }: { prescriptions: Prescription[] }) => {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status');

  // Derived - no useState needed
  const filteredPrescriptions = statusFilter
    ? prescriptions.filter(rx => rx.status === statusFilter)
    : prescriptions;

  // Derived - no useState needed
  const pendingCount = prescriptions.filter(rx => rx.status === 'pending').length;

  return (
    <div>
      <Badge>Pending: {pendingCount}</Badge>
      {filteredPrescriptions.map(rx => (
        <PrescriptionCard key={rx.id} prescription={rx} />
      ))}
    </div>
  );
};

// ❌ WRONG - duplicate state
const PrescriptionList = ({ prescriptions }: { prescriptions: Prescription[] }) => {
  const [filteredPrescriptions, setFilteredPrescriptions] = useState(prescriptions);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setFilteredPrescriptions(prescriptions.filter(...));
    setPendingCount(prescriptions.filter(...).length);
  }, [prescriptions, statusFilter]);

  // Unnecessary complexity, potential sync bugs
};
```

---

### Server-Side Session & Auth

**Tokens stay on the server. Never exposed to client JavaScript.**

```typescript
// Auth is handled entirely server-side
const authPattern = {
  storage: 'HttpOnly cookies (never localStorage)',
  validation: 'Server middleware on every request',
  clientAccess: 'Only user profile data, never tokens',

  // Client gets user info, not auth tokens
  clientUserShape: {
    id: 'usr_123',
    email: 'patient@example.com',
    role: 'patient',
    permissions: ['view_own_records', 'book_appointments']
    // NO tokens, NO secrets
  }
};

// middleware.ts - validates every request server-side
import { NextResponse } from 'next/server';

const middleware = async (request: NextRequest) => {
  const session = await getSession(request); // Reads HttpOnly cookie

  if (!session && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Attach user to request for downstream use
  const response = NextResponse.next();
  if (session) {
    response.headers.set('x-user-id', session.userId);
  }

  return response;
};

// Server Component access
const DashboardPage = async () => {
  const user = await getCurrentUser(); // Reads from cookie/session

  return <Dashboard userId={user.id} />;
};
```

---

### Anti-Patterns to Avoid

```typescript
const antiPatterns = {
  // ❌ Syncing server data to useState
  wrong: `
    const [patient, setPatient] = useState(null);
    useEffect(() => {
      fetchPatient(id).then(setPatient);
    }, [id]);
  `,
  right: 'Use Server Component with async/await or use() hook',

  // ❌ useEffect for data fetching
  wrong: `
    useEffect(() => {
      setLoading(true);
      fetch('/api/orders').then(r => r.json()).then(setOrders);
      setLoading(false);
    }, []);
  `,
  right: 'Server Component fetches data before render',

  // ❌ Manual loading states
  wrong: `
    const [isLoading, setIsLoading] = useState(true);
    // ... manage loading manually
  `,
  right: 'Suspense boundaries handle loading automatically',

  // ❌ Storing tokens in localStorage
  wrong: `localStorage.setItem('token', jwt);`,
  right: 'HttpOnly cookies managed by server',

  // ❌ Global state for server data
  wrong: 'Redux store holding patient/order data',
  right: 'Server Components + React cache for shared data',

  // ❌ Prop drilling server data
  wrong: 'Fetching at root, passing 5 levels down',
  right: 'Fetch in the component that needs it (RSC dedupes)'
};
```

---

### Decision Tree

```
Need data in a component?
│
├─ Is this a Server Component?
│  └─ YES → async/await directly, no hooks needed
│
├─ Is this a Client Component?
│  │
│  ├─ Can data be passed from parent Server Component?
│  │  └─ YES → Pass as props, fetch in parent
│  │
│  ├─ Need real-time updates / polling?
│  │  └─ YES → TanStack Query with refetchInterval
│  │
│  ├─ Complex cache invalidation across components?
│  │  └─ YES → TanStack Query with queryClient
│  │
│  └─ Simple one-time fetch?
│     └─ Use use() hook with promise from parent
│
├─ Need to mutate data?
│  └─ Server Action + useActionState + useOptimistic
│
├─ Need filters/search/pagination?
│  └─ URL searchParams
│
└─ Need UI toggle state?
   └─ useState (keep it minimal)
```

---

### 2026 State Management Landscape

#### Server State vs. Client State

**Data from an API is not "state"—it's a cache.**

```typescript
const stateCategories2026 = {
  serverState: {
    definition: 'Data you "borrow" from the backend',
    examples: ['Patient records', 'Prescription lists', 'Provider schedules'],
    tools: ['TanStack Query', 'SWR', 'Server Components'],
    rule: 'NEVER store API data in Zustand/Redux—let the cache library handle it'
  },

  clientState: {
    definition: 'Data that truly lives only in the browser',
    examples: ['Theme toggle', 'Modal visibility', 'Unsaved form input', 'Accordion expanded'],
    tools: ['useState', 'Zustand', 'Jotai'],
    rule: 'Keep it minimal and local'
  }
};
```

#### Fine-Grained Reactivity (Signals)

Modern frameworks have moved toward "Signals"—state that updates only the specific DOM nodes that changed, eliminating broad component tree re-renders.

```typescript
const signalsLandscape = {
  nativeSignals: ['Angular Signals', 'Svelte 5 Runes', 'Vue 3.5+ Reactivity'],
  reactOptions: ['Jotai atoms', 'Preact Signals', '@preact/signals-react'],

  benefit: 'Eliminates manual memoization (useMemo, useCallback)',
  how: 'Framework knows exactly which atom changed—surgical updates only'
};

// Jotai example - atomic state in React
import { atom, useAtom } from 'jotai';

const patientSearchAtom = atom('');
const selectedPharmacyAtom = atom<string | null>(null);

const PatientSearch = () => {
  const [search, setSearch] = useAtom(patientSearchAtom);
  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
};
```

#### Atomic State Management

Instead of one giant store, modern conventions favor small, independent atoms that can be combined.

```typescript
// ✅ CORRECT - Atomic approach with Jotai
import { atom } from 'jotai';

const userAtom = atom<User | null>(null);
const themeAtom = atom<'light' | 'dark'>('light');
const sidebarOpenAtom = atom(true);

// Derived atom - computed from other atoms
const userInitialsAtom = atom((get) => {
  const user = get(userAtom);
  if (!user) return '';
  return `${user.firstName[0]}${user.lastName[0]}`;
});

// ❌ WRONG - Monolithic store
const useStore = create((set) => ({
  user: null,
  theme: 'light',
  sidebarOpen: true,
  userInitials: '',
  notifications: [],
  cart: [],
  // Everything in one blob
}));
```

#### Zustand for Global Client Logic

For state that truly needs to be global (auth status, shopping cart), Zustand has replaced Redux for new projects.

> **Clarification: Server State vs. Client State**
>
> This document says both "NEVER put API data in Zustand" and "use Zustand for global state." These are not contradictory—they refer to different categories:
>
> | Category | Examples | Where It Lives |
> |----------|----------|----------------|
> | **Server State** | Patient records, orders, prescriptions | TanStack Query / Server Components |
> | **Global Client State** | Auth session, theme, feature flags | Zustand |
> | **Local Client State** | Modal open, form errors | useState |
>
> **Rule**: If the data comes from an API and could change on the server, it's SERVER STATE—use TanStack Query or Server Components. If the data is purely client-side and needs to be shared across components, it's CLIENT STATE—Zustand is appropriate.

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AuthStore {
  user: User | null;
  permissions: string[];
  setUser: (user: User | null) => void;
  hasPermission: (permission: string) => boolean;
}

const useAuthStore = create<AuthStore>()(
  immer((set, get) => ({
    user: null,
    permissions: [],

    setUser: (user) => set((state) => {
      state.user = user;
      state.permissions = user?.permissions ?? [];
    }),

    hasPermission: (permission) => get().permissions.includes(permission)
  }))
);

// Subscribe to specific slices only
const UserBadge = () => {
  const userName = useAuthStore((s) => s.user?.name);
  return <span>{userName}</span>;
};
```

---

### Common Pitfalls

#### 1. Over-Globalizing ("Single Source of Truth" Myth)

```typescript
// ❌ WRONG - Everything in global store
const useGlobalStore = create((set) => ({
  isDropdownOpen: false,
  searchQuery: '',
  modalVisible: false,
  activeTab: 'overview',
  // UI state that belongs in components
}));

// ✅ CORRECT - Rule of Proximity
// Local state for component-only concerns
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <div>...</div>;
};

// Global only for truly global data
const useAuthStore = create(() => ({ user: null }));
```

**The Fix:** Keep state as local as possible. Only go global for truly global data (auth, theme).

#### 2. Storing Derivable State (Redundancy)

```typescript
// ❌ WRONG - Storing derived data
const [patients, setPatients] = useState<Patient[]>([]);
const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
const [patientCount, setPatientCount] = useState(0);

useEffect(() => {
  setFilteredPatients(patients.filter(p => p.active));
  setPatientCount(patients.length);
}, [patients]);

// ✅ CORRECT - Derive during render
const [patients, setPatients] = useState<Patient[]>([]);
const filteredPatients = patients.filter(p => p.active);
const patientCount = patients.length;
```

**The Fix:** If you can calculate it, don't store it.

#### 3. State Mutation (The Silent Killer)

```typescript
// ❌ WRONG - Direct mutation
const updatePatient = (id: string, name: string) => {
  const patient = patients.find(p => p.id === id);
  patient.name = name; // Mutates existing object
  setPatients(patients); // Same reference, no re-render!
};

// ✅ CORRECT - Immutable update
const updatePatient = (id: string, name: string) => {
  setPatients(prev =>
    prev.map(p => p.id === id ? { ...p, name } : p)
  );
};

// ✅ ALSO CORRECT - Use Immer for complex updates
import { produce } from 'immer';

const updatePatient = (id: string, name: string) => {
  setPatients(produce(draft => {
    const patient = draft.find(p => p.id === id);
    if (patient) patient.name = name;
  }));
};
```

**The Fix:** Treat state as immutable. Use Immer for complex nested updates.

#### 4. Prop Drilling vs. Context Abuse

```typescript
// ❌ WRONG - Prop drilling through 5 layers
<App patient={patient}>
  <Layout patient={patient}>
    <Sidebar patient={patient}>
      <PatientNav patient={patient}>
        <PatientBadge patient={patient} />

// ❌ ALSO WRONG - Giant context with everything
const AppContext = createContext({
  patient: null,
  theme: 'light',
  notifications: [],
  cart: [],
  // Everything triggers re-render for everyone
});

// ✅ CORRECT - Composition pattern
<PatientPage>
  <Sidebar>
    <PatientBadge /> {/* Fetches own data or uses atomic state */}
  </Sidebar>
</PatientPage>

// ✅ CORRECT - Atomic state for cross-cutting concerns
const patientAtom = atom<Patient | null>(null);
```

#### 5. Stale Closures in Callbacks

```typescript
// ❌ WRONG - Stale closure
const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1); // Always uses initial count (0)
  }, 1000);
  return () => clearInterval(interval);
}, []); // Missing count dependency

// ✅ CORRECT - Functional update
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1); // Always has fresh value
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

**The Fix:** Respect linter warnings about dependency arrays. Use functional updates.

---

### AI-Assisted Development Pitfalls

#### 1. Prop Drilling Fatigue

AI often suggests "just pass it down" to make things work quickly.

```typescript
// AI generates this to "make it work"
<OrderPage orderId={orderId}>
  <OrderLayout orderId={orderId}>
    <OrderSidebar orderId={orderId}>
      <OrderActions orderId={orderId}>
        <CancelButton orderId={orderId} />

// What you should ask for instead:
// "Move orderId to context or use atomic state"
```

**Rule:** At 3+ levels of nesting, stop and restructure.

#### 2. State Primitive Bloat

AI defaults to creating many individual useState hooks.

```typescript
// ❌ AI generates this
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');
const [zip, setZip] = useState('');

// ✅ What you should have
const [formData, setFormData] = useState<PatientForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: { street: '', city: '', state: '', zip: '' }
});
```

**Rule:** Group related state. If values change together, store together.

#### 3. Sync-State Spiral

AI creates redundant state variables representing the same data.

```typescript
// ❌ AI generates this pattern
const [prescriptions, setPrescriptions] = useState<Rx[]>([]);
const [pendingRx, setPendingRx] = useState<Rx[]>([]);
const [completedRx, setCompletedRx] = useState<Rx[]>([]);
const [rxCount, setRxCount] = useState(0);

useEffect(() => {
  setPendingRx(prescriptions.filter(r => r.status === 'pending'));
  setCompletedRx(prescriptions.filter(r => r.status === 'completed'));
  setRxCount(prescriptions.length);
}, [prescriptions]);

// ✅ Derive everything
const [prescriptions, setPrescriptions] = useState<Rx[]>([]);
const pendingRx = prescriptions.filter(r => r.status === 'pending');
const completedRx = prescriptions.filter(r => r.status === 'completed');
const rxCount = prescriptions.length;
```

#### 4. Over-Globalizing to Avoid Drilling

When AI gets tired of prop drilling, it swings too far the other way.

```typescript
// ❌ AI puts everything in global store
const useStore = create((set) => ({
  searchInputValue: '',        // Should be local
  isDropdownOpen: false,       // Should be local
  accordionExpanded: [],       // Should be local
  currentPatientId: null,      // Maybe global
  user: null                   // Definitely global
}));

// ✅ Be selective about what's truly global
const useAuthStore = create(() => ({ user: null }));

const SearchInput = () => {
  const [value, setValue] = useState(''); // Local!
  return <input value={value} onChange={e => setValue(e.target.value)} />;
};
```

---

### Healthcare-Specific Concerns

#### 1. The "Single Source of Truth" Mirage

In healthcare, state is distributed across EHRs, wearables, and local caches.

```typescript
const healthcareStateRisk = {
  scenario: 'Nurse updates allergy on desktop, your app has stale cache',
  risk: 'Medical error from stale data',

  solution: {
    pattern: 'Aggressive revalidation, not long-lived global state',
    implementation: 'TanStack Query with short staleTime for clinical data',
    example: `
      useQuery({
        queryKey: ['patient', patientId, 'allergies'],
        queryFn: () => fetchAllergies(patientId),
        staleTime: 0,         // Always refetch
        refetchOnMount: true,
        refetchOnWindowFocus: true
      })
    `
  }
};
```

#### 2. PHI Leakage in State

```typescript
const phiLeakageRisks = {
  reduxDevTools: 'Patient data visible in browser extension',
  localStorage: 'PHI persisted unencrypted on device',
  errorLogging: 'Patient data in Sentry/LogRocket payloads',
  queryCache: 'Sensitive data cached after logout'
};

// ✅ Mitigations
const secureStatePatterns = {
  devTools: 'Disable Redux DevTools in production',
  persistence: 'Never persist PHI to localStorage',
  logging: 'Sanitize state before any logging',
  logout: 'Clear all caches and state on logout',

  clearOnLogout: `
    const logout = () => {
      queryClient.clear();
      useAuthStore.getState().reset();
      sessionStorage.clear();
    };
  `
};
```

#### 3. Race Conditions in Multi-User Environments

Multiple practitioners often view the same patient record simultaneously.

```typescript
// ❌ Optimistic update without conflict detection
const updateTreatmentPlan = async (plan: TreatmentPlan) => {
  optimisticallyUpdate(plan);
  await savePlan(plan); // Overwrites other doctor's changes!
};

// ✅ Version-based conflict detection
const updateTreatmentPlan = async (plan: TreatmentPlan) => {
  const response = await savePlan({
    ...plan,
    expectedVersion: plan.version // ETag / version check
  });

  if (response.status === 409) {
    const serverVersion = await fetchLatestPlan(plan.id);
    showConflictResolutionDialog(plan, serverVersion);
  }
};
```

#### 4. Audit Trail in State Transitions

HIPAA requires knowing who changed what and why.

```typescript
// ❌ Standard state update - no audit trail
dispatch({ type: 'REMOVE_MEDICATION', payload: { medicationId: 'med_123' } });

// ✅ Include audit metadata
dispatch({
  type: 'REMOVE_MEDICATION',
  payload: { medicationId: 'med_123' },
  meta: {
    userId: currentUser.id,
    timestamp: new Date().toISOString(),
    reason: 'PATIENT_ALLERGY_DISCOVERED',
    clientIp: session.ip
  }
});
```

---

### State Management Comparison

| Approach | Use Case | Pros | Cons |
|----------|----------|------|------|
| **Server Components** | Most data fetching | No client JS, automatic caching | No interactivity |
| **useState** | UI toggles, form input | Simple, local | Prop drilling at scale |
| **useActionState** | Form submission state | Built into React 19, handles pending | Form-specific only |
| **URL State** | Filters, search, pagination | Bookmarkable, shareable | Limited to strings |
| **TanStack Query** | Polling, complex cache | Powerful cache control | Extra dependency |
| **Jotai** | Cross-component atoms | Fine-grained, composable | Learning curve |
| **Zustand** | Global client state | Simple, hooks-first | Can be overused |
| **Context** | Theme, locale | Built-in | Re-renders all consumers |

---

### Checklist

Before shipping state management code:

- [ ] Server state uses Server Components or TanStack Query (not useState + useEffect)
- [ ] No API data stored in Zustand/Redux
- [ ] Derivable values computed during render (not stored)
- [ ] All state updates are immutable
- [ ] Local state stays local (not over-globalized)
- [ ] No prop drilling beyond 2 levels
- [ ] Dependency arrays complete (no stale closures)
- [ ] Form state uses useActionState or controlled inputs
- [ ] URL state for bookmarkable filters/search/pagination
- [ ] Clinical data has aggressive revalidation (staleTime: 0)
- [ ] PHI cleared from cache on logout
- [ ] No PHI in localStorage or DevTools in production
- [ ] Multi-user scenarios have conflict detection
- [ ] State transitions include audit metadata for compliance

---

## Component Architecture

### The "Default to Server" Rule

**Start every new file as a Server Component. Only add `'use client'` when you hit a client-only requirement.**

This is non-negotiable. Server Components are the default in Next.js App Router, and we treat them as the default in our architecture.

---

### When to Use Each

**Use Server Components when:**

| Scenario | Why Server |
|----------|-----------|
| **Data Fetching** | Fetch from database, file system, or internal API directly |
| **Security** | Handle sensitive info (API keys, tokens) that shouldn't reach browser |
| **Large Dependencies** | Heavy libraries (markdown parsers, date formatters) don't bloat client bundle |
| **SEO** | Fast First Contentful Paint, fully rendered HTML for crawlers |

**Use Client Components when:**

| Scenario | Why Client |
|----------|-----------|
| **Interactivity** | Need event listeners (`onClick`, `onChange`) |
| **Browser APIs** | Need `window`, `document`, `localStorage`, `navigator` |
| **State & Lifecycle** | Need `useState`, `useReducer`, `useEffect` |
| **Custom Hooks** | Any hook that relies on state or browser APIs |

---

### Decision Matrix

| Requirement | Server Component | Client Component |
|-------------|-----------------|------------------|
| Fetch data from DB/API | ✅ Best | ⚠️ Adds latency |
| Access secret API keys | ✅ | ❌ Security risk |
| Use `useState` or `useEffect` | ❌ | ✅ |
| Use `onClick` or `onChange` | ❌ | ✅ |
| Render interactive forms | ❌ | ✅ |
| Keep JS bundle small | ✅ | ❌ |
| Heavy library (no interactivity) | ✅ | ❌ |
| SEO-critical content | ✅ | ⚠️ May not be in initial HTML |

---

### The 3-Question Checklist

Ask these questions **in order**. Stop at the first "Yes."

```
1. Does it need to be interactive?
   └─ No? → Server Component ✅

2. Does it need window, localStorage, or browser APIs?
   └─ No? → Server Component ✅

3. Does it need a hook like useState or useActionState?
   └─ Yes? → Client Component
   └─ No? → Server Component ✅
```

---

### Architectural Patterns

#### Pattern A: The "Leaf" Strategy

**Push interactivity as far down the component tree as possible.**

```typescript
// ❌ WRONG: Entire Navbar is Client because of one search bar
'use client';

const Navbar = () => {
  const [search, setSearch] = useState('');

  return (
    <nav>
      <Logo />           {/* Didn't need to be client */}
      <NavLinks />       {/* Didn't need to be client */}
      <UserMenu />       {/* Didn't need to be client */}
      <input value={search} onChange={e => setSearch(e.target.value)} />
    </nav>
  );
};

// ✅ CORRECT: Only SearchBar is Client
// Navbar.tsx (Server Component)
const Navbar = () => {
  return (
    <nav>
      <Logo />
      <NavLinks />
      <UserMenu />
      <SearchBar />  {/* Only this is 'use client' */}
    </nav>
  );
};

// SearchBar.tsx (Client Component)
'use client';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return <input value={search} onChange={e => setSearch(e.target.value)} />;
};
```

#### Pattern B: The "Slot" Pattern (Composition)

**You cannot import a Server Component into a Client Component. But you can pass it as `children`.**

```typescript
// ✅ The Client Component acts as a "shell"
// The Server Component is passed through the "slot"

// ClientLayout.tsx
'use client';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={sidebarOpen ? 'with-sidebar' : 'collapsed'}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>Toggle</button>
      <main>{children}</main>  {/* Server Component renders here */}
    </div>
  );
};

// page.tsx (Server Component)
const DashboardPage = async () => {
  const data = await fetchDashboardData();

  return (
    <ClientLayout>
      {/* ServerDataList stays a Server Component */}
      <ServerDataList data={data} />
    </ClientLayout>
  );
};
```

#### Pattern C: The "Data Tunnelling" Rule

**Never fetch data in a Client Component if that data is needed for initial page load.**

Fetch in the Server Component, pass down as props. This prevents "waterfalls" where page loads → spinner appears → data finally arrives.

```typescript
// ❌ WRONG: Data waterfall
'use client';

const PatientProfile = ({ patientId }: { patientId: string }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/patients/${patientId}`)
      .then(r => r.json())
      .then(setPatient)
      .finally(() => setLoading(false));
  }, [patientId]);

  if (loading) return <Spinner />;  // User sees spinner
  return <div>{patient.name}</div>;
};

// ✅ CORRECT: Data tunnelled from server
// page.tsx (Server)
const PatientPage = async ({ params }: { params: { id: string } }) => {
  const patient = await getPatient(params.id);  // Fetched on server
  return <PatientProfile patient={patient} />;  // Passed as prop
};

// PatientProfile.tsx (Client - for interactivity, but data is already there)
'use client';

const PatientProfile = ({ patient }: { patient: Patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  // No loading state needed - data arrived with the HTML
  return (
    <div>
      <h1>{patient.name}</h1>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
};
```

---

### Over-Extraction Warning

**If you're passing 15+ props from Server to Client, you might be over-extracting.**

Keep logic where the data lives. Not every interactive element needs its own file.

```typescript
// ⚠️ Over-extracted: Too many props tunnelling
<PatientCard
  name={patient.name}
  dob={patient.dob}
  email={patient.email}
  phone={patient.phone}
  address={patient.address}
  insurance={patient.insurance}
  allergies={patient.allergies}
  onEdit={handleEdit}
  onDelete={handleDelete}
  // ... 10 more props
/>

// ✅ Better: Pass the object, keep it simple
<PatientCard patient={patient} />
```

---

### Full Example: The Composition Pattern

```typescript
// ✅ CORRECT - Server Component with minimal Client islands

// app/patients/[id]/page.tsx (Server Component - no directive)
const PatientPage = async ({ params }: { params: { id: string } }) => {
  const patient = await getPatient(params.id);
  const prescriptions = await getPatientPrescriptions(params.id);
  const allergies = await getPatientAllergies(params.id);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Server-rendered, zero JS */}
      <PatientHeader patient={patient} />

      {/* Server-rendered list, zero JS */}
      <AllergyList allergies={allergies} />

      {/* Only this component ships JS - it has interactivity */}
      <PrescriptionTable prescriptions={prescriptions} />

      {/* Server-rendered, zero JS */}
      <PatientNotes notes={patient.notes} />
    </div>
  );
};

// components/PatientHeader.tsx (Server Component - no directive)
const PatientHeader = ({ patient }: { patient: Patient }) => {
  return (
    <header>
      <h1>{patient.firstName} {patient.lastName}</h1>
      <p>DOB: {formatDate(patient.dateOfBirth)}</p>
      <PatientStatusBadge status={patient.status} />
    </header>
  );
};

// components/PrescriptionTable.tsx (Client Component - needs interactivity)
'use client';

const PrescriptionTable = ({ prescriptions }: { prescriptions: Prescription[] }) => {
  const [sortColumn, setSortColumn] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sorted = useMemo(() => {
    return [...prescriptions].sort((a, b) => {
      // sorting logic
    });
  }, [prescriptions, sortColumn, sortDirection]);

  return (
    <table>
      <thead>
        <tr>
          <SortableHeader
            column="drug"
            current={sortColumn}
            direction={sortDirection}
            onSort={setSortColumn}
          />
          {/* ... */}
        </tr>
      </thead>
      <tbody>
        {sorted.map(rx => (
          <PrescriptionRow key={rx.id} prescription={rx} />
        ))}
      </tbody>
    </table>
  );
};
```

```typescript
// ❌ WRONG - 'use client' too high, entire page ships JS

'use client'; // This makes EVERYTHING below a Client Component

const PatientPage = ({ params }: { params: { id: string } }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetchPatient(params.id).then(setPatient);
  }, []);

  if (!patient) return <Loading />;

  return (
    <div>
      {/* All of these now ship JS unnecessarily */}
      <PatientHeader patient={patient} />
      <AllergyList allergies={patient.allergies} />
      <PrescriptionTable prescriptions={patient.prescriptions} />
    </div>
  );
};
```

---

### The Children Pattern

**Pass Server Components as children to Client Components.**

```typescript
// Client Component that provides layout/interactivity
'use client';

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = true
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▼' : '▶'}
      </button>
      {isOpen && <div>{children}</div>}
    </section>
  );
};

// Server Component page passes Server Component children
// app/patients/[id]/page.tsx
const PatientPage = async ({ params }: { params: { id: string } }) => {
  const prescriptions = await getPatientPrescriptions(params.id);

  return (
    <div>
      {/* CollapsibleSection is Client (has useState) */}
      {/* But PrescriptionList is Server (passed as children) */}
      <CollapsibleSection title="Active Prescriptions">
        <PrescriptionList prescriptions={prescriptions} />
      </CollapsibleSection>

      <CollapsibleSection title="Medical History" defaultOpen={false}>
        <MedicalHistory patientId={params.id} />
      </CollapsibleSection>
    </div>
  );
};

// This works because children are rendered by the Server,
// then passed as a "slot" to the Client Component
```

---

### Boundary Placement Rules

```typescript
const boundaryRules = {
  // Place 'use client' at the leaf level
  principle: "Push client boundaries as deep as possible",

  examples: {
    // ❌ BAD - entire feature is client
    bad: `
      'use client'
      const OrdersFeature = () => { ... }
    `,

    // ✅ GOOD - only interactive parts are client
    good: `
      // OrdersPage.tsx (Server)
      // OrdersList.tsx (Server)
      // OrderRow.tsx (Server)
      // OrderActions.tsx (Client - has buttons)
      // OrderStatusDropdown.tsx (Client - has state)
    `
  },

  // File organization for mixed components
  fileStructure: `
    components/
    ├── orders/
    │   ├── OrdersPage.tsx        # Server
    │   ├── OrdersList.tsx        # Server
    │   ├── OrderRow.tsx          # Server
    │   ├── OrderActions.tsx      # Client ('use client')
    │   └── OrderStatusDropdown.tsx  # Client ('use client')
  `
};
```

---

### Passing Data from Server to Client

**Server fetches, Client receives as props.**

```typescript
// ✅ CORRECT - Server fetches, passes serializable data

// app/orders/page.tsx (Server)
const OrdersPage = async () => {
  const orders = await getOrders(); // Database call on server

  return (
    <div>
      <h1>Orders</h1>
      {/* Pass plain data, not functions or complex objects */}
      <OrderFilters initialOrders={orders} />
    </div>
  );
};

// components/OrderFilters.tsx (Client)
'use client';

const OrderFilters = ({ initialOrders }: { initialOrders: Order[] }) => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = statusFilter
    ? initialOrders.filter(o => o.status === statusFilter)
    : initialOrders;

  return (
    <>
      <select onChange={e => setStatusFilter(e.target.value || null)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
      </select>
      <OrderList orders={filtered} />
    </>
  );
};
```

```typescript
// What CAN be passed from Server to Client
const serializableProps = {
  allowed: [
    'Primitives (string, number, boolean, null)',
    'Plain objects and arrays',
    'Date (serialized as string)',
    'Server Components (as children/props)',
    'Server Actions (special case)'
  ],

  notAllowed: [
    'Functions (except Server Actions)',
    'Classes/class instances',
    'Symbols',
    'Circular references',
    'DOM nodes',
    'Event handlers'
  ]
};
```

---

### Server Actions in Client Components

**Server logic, Client triggers.**

```typescript
// actions/orders.ts
'use server';

const cancelOrder = async (orderId: string): Promise<ActionResult> => {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');

  const order = await orderRepository.findById(orderId);

  if (order.status !== 'pending') {
    return { success: false, error: 'Only pending orders can be cancelled' };
  }

  await orderRepository.cancel(orderId);
  revalidatePath('/orders');

  return { success: true };
};

// components/CancelOrderButton.tsx
'use client';

import { cancelOrder } from '@/actions/orders';

const CancelOrderButton = ({ orderId }: { orderId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(async () => {
      const result = await cancelOrder(orderId);

      if (!result.success) {
        toast.error(result.error);
      }
    });
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
    >
      {isPending ? 'Cancelling...' : 'Cancel Order'}
    </button>
  );
};
```

---

### Common Patterns

#### Pattern: Static Shell with Dynamic Islands

```typescript
// Dashboard with mostly static layout, few interactive widgets
const DashboardPage = async () => {
  const stats = await getDashboardStats();
  const recentOrders = await getRecentOrders();
  const alerts = await getAlerts();

  return (
    <div className="dashboard-grid">
      {/* Static - Server rendered */}
      <StatsCards stats={stats} />

      {/* Static list - Server rendered */}
      <RecentOrdersList orders={recentOrders} />

      {/* Interactive - Client Component */}
      <AlertsWidget initialAlerts={alerts} />

      {/* Interactive - Client Component */}
      <QuickActionsPanel />
    </div>
  );
};
```

#### Pattern: Form Page

```typescript
// app/patients/new/page.tsx (Server)
const NewPatientPage = async () => {
  const states = await getStates(); // Reference data
  const insurers = await getInsurers();

  return (
    <div>
      <h1>New Patient Registration</h1>
      {/* Form is Client Component, but receives server data */}
      <PatientRegistrationForm
        states={states}
        insurers={insurers}
      />
    </div>
  );
};

// components/PatientRegistrationForm.tsx (Client)
'use client';

const PatientRegistrationForm = ({
  states,
  insurers
}: {
  states: State[];
  insurers: Insurer[];
}) => {
  // Form logic with useState, validation, etc.
};
```

#### Pattern: Data Table with Server Pagination

```typescript
// app/prescriptions/page.tsx (Server)
const PrescriptionsPage = async ({
  searchParams
}: {
  searchParams: { page?: string; status?: string }
}) => {
  const page = parseInt(searchParams.page ?? '1');
  const status = searchParams.status;

  // Fetch happens on server, with pagination
  const { data, totalPages } = await getPrescriptions({
    page,
    status,
    pageSize: 20
  });

  return (
    <div>
      {/* Client - has filter dropdowns */}
      <PrescriptionFilters currentStatus={status} />

      {/* Server - just renders rows */}
      <PrescriptionTable prescriptions={data} />

      {/* Client - has click handlers for page navigation */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};
```

---

### Anti-Patterns

```typescript
const antiPatterns = {
  // ❌ Marking page.tsx as 'use client'
  wrong: `
    // app/dashboard/page.tsx
    'use client'

    export default function DashboardPage() { ... }
  `,
  why: "Loses all Server Component benefits for entire route",
  fix: "Keep page.tsx as Server Component, push 'use client' to children",

  // ❌ Importing Client Component into another Client Component unnecessarily
  wrong: `
    // Both files have 'use client' when only one needs it
  `,
  why: "Unnecessary, 'use client' already propagates down",
  fix: "Only top-level Client Component needs directive",

  // ❌ Fetching in useEffect when you could use Server Component
  wrong: `
    'use client'
    const PatientProfile = ({ id }) => {
      const [patient, setPatient] = useState(null);
      useEffect(() => {
        fetch(\`/api/patients/\${id}\`).then(r => r.json()).then(setPatient);
      }, [id]);
    }
  `,
  why: "Unnecessary client-side fetch, extra loading state",
  fix: "Make it a Server Component or receive data as props",

  // ❌ Server Component inside Client Component (doesn't work)
  wrong: `
    'use client'
    import { ServerComponent } from './ServerComponent';

    const ClientComponent = () => {
      return <ServerComponent />; // This becomes a Client Component!
    }
  `,
  why: "Importing into Client Component converts it to Client",
  fix: "Use children pattern - pass Server Component as children prop"
};
```

---

### Performance Implications

```typescript
const performanceImpact = {
  serverComponent: {
    bundleSize: '0 KB added to client bundle',
    ttfb: 'HTML includes rendered content',
    hydration: 'None needed',
    seo: 'Full content in initial HTML'
  },

  clientComponent: {
    bundleSize: 'Component JS added to bundle',
    ttfb: 'Placeholder until JS loads',
    hydration: 'Required before interactive',
    seo: 'Content may not be in initial HTML'
  },

  metrics: {
    // Real-world impact
    serverHeavyPage: {
      lcp: '~1.5s',
      fcp: '~0.8s',
      bundleSize: '~50KB'
    },
    clientHeavyPage: {
      lcp: '~2.5s',
      fcp: '~1.5s',
      bundleSize: '~200KB'
    }
  }
};
```

---

### Checklist Before Adding 'use client'

Before adding `'use client'` to a component, verify:

- [ ] Component requires useState, useEffect, or other hooks
- [ ] Component has event handlers (onClick, onChange, etc.)
- [ ] Component uses browser-only APIs
- [ ] Interactivity cannot be pushed to a child component
- [ ] You've considered the children pattern as an alternative
- [ ] The component is as small/leaf-level as possible

---

### 2026 Component Principles

#### Single Responsibility

A component should do one thing. If you're passing 15 props to handle 5 use cases, split it.

```typescript
const singleResponsibility = {
  logicVsPresentation: {
    smart: 'Fetches data, manages state, handles side effects',
    dumb: 'Takes props, renders UI, fires callbacks'
  },

  ruleOfThree: `
    Don't abstract until you've seen the pattern 3 times.
    Premature abstraction is worse than duplication.
  `
};

// ❌ One component doing everything
const PatientCard = ({
  patient,
  showAllergies,
  showMedications,
  showVitals,
  showBilling,
  isCompact,
  isExpanded,
  onEdit,
  onDelete,
  onArchive,
  // ... 10 more props
}) => { /* 500 lines of conditionals */ };

// ✅ Composed from focused components
const PatientCard = ({ patient }: { patient: Patient }) => (
  <Card>
    <PatientHeader patient={patient} />
    <PatientAllergies allergies={patient.allergies} />
    <PatientActions patientId={patient.id} />
  </Card>
);
```

#### Composition over Configuration

Instead of "God Components" with dozens of boolean flags, use composition.

```typescript
// ❌ Configuration approach - inflexible
<Card
  title="Patient"
  icon="user"
  showButton={true}
  buttonText="Edit"
  buttonVariant="primary"
  hasFooter={true}
  footerAlign="right"
/>

// ✅ Composition approach - flexible
<Card>
  <Card.Header icon={<UserIcon />}>Patient</Card.Header>
  <Card.Content>
    <PatientDetails patient={patient} />
  </Card.Content>
  <Card.Footer align="right">
    <Button variant="primary">Edit</Button>
  </Card.Footer>
</Card>
```

#### Headless UI Pattern

For complex interactive components (tabs, modals, selects), use headless libraries.

```typescript
const headlessApproach = {
  libraries: ['Radix UI', 'Headless UI', 'Ark UI', 'React Aria'],

  whatTheyHandle: [
    'Accessibility (ARIA attributes)',
    'Keyboard navigation',
    'Focus management',
    'State logic'
  ],

  whatYouHandle: ['Styling', 'Layout', 'Animation'],

  why: 'Building an accessible dropdown from scratch is incredibly difficult'
};

// Using Radix UI - logic handled, styling is yours
import * as Select from '@radix-ui/react-select';

const DrugSelect = ({ drugs, onSelect }: DrugSelectProps) => (
  <Select.Root onValueChange={onSelect}>
    <Select.Trigger className="your-trigger-styles">
      <Select.Value placeholder="Select drug" />
    </Select.Trigger>
    <Select.Content className="your-content-styles">
      {drugs.map(drug => (
        <Select.Item key={drug.id} value={drug.id}>
          {drug.name}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Root>
);
```

#### Feature-Based Folder Structure

Group by feature, not by file type.

```
// ❌ OLD - Grouped by type
src/
  components/
    PatientCard.tsx
    OrderList.tsx
    DrugSearch.tsx
  hooks/
    usePatient.ts
    useOrders.ts
  services/
    patientService.ts
    orderService.ts

// ✅ MODERN - Grouped by feature
src/
  features/
    patients/
      components/
        PatientCard.tsx
        PatientList.tsx
      hooks/
        usePatient.ts
      api/
        patientService.ts
      types.ts
    orders/
      components/
      hooks/
      api/
    prescriptions/
      ...
  shared/
    components/
      Button.tsx
      Input.tsx
      Card.tsx
    hooks/
      useDebounce.ts
```

#### Atomic Design Hierarchy

```typescript
const atomicDesign = {
  atoms: {
    description: 'Smallest functional units',
    examples: ['Button', 'Input', 'Label', 'Badge', 'Icon'],
    rule: 'Cannot be broken down further'
  },

  molecules: {
    description: 'Simple groups of atoms',
    examples: ['SearchField (Input + Button)', 'FormField (Label + Input + Error)'],
    rule: 'Single responsibility, composed of atoms'
  },

  organisms: {
    description: 'Complex UI sections',
    examples: ['Navbar', 'Sidebar', 'PatientCard', 'PrescriptionTable'],
    rule: 'Composed of molecules and atoms'
  },

  templates: {
    description: 'Page layouts without real data',
    examples: ['DashboardLayout', 'SettingsLayout'],
    rule: 'Placement of organisms, no business logic'
  },

  pages: {
    description: 'Templates with real data',
    examples: ['PatientDashboard', 'OrdersPage'],
    rule: 'Data fetching happens here (in RSC world)'
  }
};
```

#### Islands Architecture

Static by default, interactive only where needed.

```typescript
const islandsArchitecture = {
  principle: 'Most components render as static HTML on server',
  islands: 'Only hydrate specific components that need JavaScript',
  benefit: 'Drastically improved load times',

  example: `
    // This page is 95% static HTML
    // Only AlertsWidget and QuickActions hydrate with JS

    <DashboardPage>           // Server - static HTML
      <StatsCards />          // Server - static HTML
      <RecentOrdersList />    // Server - static HTML
      <AlertsWidget />        // Client - interactive island
      <QuickActions />        // Client - interactive island
    </DashboardPage>
  `
};
```

---

### Common Pitfalls

#### 1. The "Swiss Army Knife" Component (Over-Abstraction)

```typescript
// ❌ WRONG - One component handling every case
const Button = ({
  isHeader,
  isInForm,
  isNavigation,
  hasDoubleIcon,
  isBlueButGreenOnMobile,
  isPrimaryButSecondaryInModals,
  // ... 20 more boolean props
}: ButtonProps) => {
  // 300 lines of if/else and ternary operators
  if (isHeader && !isInForm && hasDoubleIcon) {
    // ...
  }
};

// ✅ CORRECT - Composition of focused components
const Button = ({ children, variant, size }: ButtonProps) => (
  <button className={buttonStyles({ variant, size })}>{children}</button>
);

const IconButton = ({ icon, ...props }: IconButtonProps) => (
  <Button {...props}>
    <Icon name={icon} />
  </Button>
);

const SubmitButton = ({ isSubmitting, ...props }: SubmitButtonProps) => (
  <Button type="submit" disabled={isSubmitting} {...props}>
    {isSubmitting ? 'Saving...' : props.children}
  </Button>
);
```

**The Fix:** Build small atomic components, compose them for specific use cases.

#### 2. Hardcoding Business Logic in UI

```typescript
// ❌ WRONG - API calls and logic inside presentational component
const PatientCard = ({ patientId }: { patientId: string }) => {
  const [patient, setPatient] = useState(null);
  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    fetch(`/api/patients/${patientId}`)
      .then(r => r.json())
      .then(data => {
        setPatient(data);
        if (data.age < 18) {
          setAllergies(data.allergies.filter(a => a.pediatricRelevant));
        } else {
          setAllergies(data.allergies);
        }
      });
  }, [patientId]);

  // UI mixed with business logic...
};

// ✅ CORRECT - Separated concerns
const usePatientWithAllergies = (patientId: string) => {
  // Logic in hook, testable independently
  const { data: patient } = useQuery(['patient', patientId], () =>
    fetchPatient(patientId)
  );

  const relevantAllergies = useMemo(() => {
    if (!patient) return [];
    return patient.age < 18
      ? patient.allergies.filter(a => a.pediatricRelevant)
      : patient.allergies;
  }, [patient]);

  return { patient, allergies: relevantAllergies };
};

const PatientCard = ({ patientId }: { patientId: string }) => {
  const { patient, allergies } = usePatientWithAllergies(patientId);
  // Pure presentation
};
```

**The Fix:** Keep UI components "dumb." Move logic to custom hooks or service layers.

#### 3. Neglecting Component Boundaries

```typescript
// ❌ WRONG - Component reaches outside itself
const PatientBadge = ({ patientId }: { patientId: string }) => {
  useEffect(() => {
    // Directly manipulating parent DOM
    document.querySelector('.header-title')!.textContent = 'Patient View';

    // Relying on global CSS class from parent
    // If moved elsewhere, breaks because .patient-context doesn't exist
  }, []);

  return <div className="uses-parent-patient-context-class">...</div>;
};

// ✅ CORRECT - Self-contained component
const PatientBadge = ({
  patient,
  onTitleChange
}: {
  patient: Patient;
  onTitleChange?: (title: string) => void;
}) => {
  useEffect(() => {
    onTitleChange?.('Patient View');
  }, [onTitleChange]);

  return (
    <div className={styles.badge}> {/* Scoped CSS Module */}
      {patient.name}
    </div>
  );
};
```

**The Fix:** Self-contained components. Use CSS Modules or CSS-in-JS. Pass everything via props.

#### 4. Over-Modularization (The Folder Labyrinth)

```typescript
// ❌ WRONG - Every element in separate files
components/
  PatientCard/
    PatientCard.tsx
    PatientCardContainer.tsx
    PatientCardHeader.tsx
    PatientCardHeaderTitle.tsx
    PatientCardHeaderTitleText.tsx  // Just a <span>!
    PatientCardHeaderTitleIcon.tsx
    PatientCardBody.tsx
    PatientCardFooter.tsx
    index.ts
    types.ts
    styles.ts
    constants.ts
    utils.ts

// ✅ CORRECT - Pragmatic organization
components/
  patients/
    PatientCard.tsx       // ~100 lines, includes subcomponents
    PatientList.tsx
    PatientSearch.tsx
```

**The Fix:** "Five-Minute Rule" - If UI isn't reused and isn't complex, keep it in the same file. Extract when file exceeds ~150 lines or component needs reuse.

#### 5. Prop Drilling Through Intermediaries

```typescript
// ❌ WRONG - Data passing through components that don't use it
const OrderPage = ({ orderId }: { orderId: string }) => {
  const order = useOrder(orderId);
  return <OrderLayout order={order} />;
};

const OrderLayout = ({ order }: { order: Order }) => (
  <div>
    <OrderSidebar order={order} />
    <OrderContent order={order} />
  </div>
);

const OrderSidebar = ({ order }: { order: Order }) => (
  <aside>
    <OrderActions order={order} />  {/* Only this needs order.id */}
  </aside>
);

// ✅ CORRECT - Composition pattern
const OrderPage = ({ orderId }: { orderId: string }) => {
  const order = useOrder(orderId);

  return (
    <OrderLayout
      sidebar={<OrderActions orderId={order.id} />}
      content={<OrderDetails order={order} />}
    />
  );
};

const OrderLayout = ({
  sidebar,
  content
}: {
  sidebar: ReactNode;
  content: ReactNode;
}) => (
  <div>
    <aside>{sidebar}</aside>
    <main>{content}</main>
  </div>
);
```

---

### AI-Assisted Development Pitfalls

#### 1. The "Everything Component" (Lack of Atomicity)

AI generates 500-line components with Header, Search, List, and Modal in one file.

```typescript
// ❌ AI generates this monolith
const PatientDashboard = () => {
  // 50 lines of state
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  // ... 20 more useState calls

  // 100 lines of effects
  useEffect(() => { /* fetch patients */ }, []);
  useEffect(() => { /* filter patients */ }, [search]);
  // ... more effects

  // 300 lines of JSX with everything inline
  return (
    <div>
      <header>...</header>
      <input value={search} />
      <table>...</table>
      {isModalOpen && <div className="modal">...</div>}
    </div>
  );
};
```

**The Fix:** Tell the AI: "Extract the table into PatientTable.tsx" and "Extract the modal into PatientModal.tsx."

#### 2. The Hard-Coded Trap

AI builds components with specific values that should be props.

```typescript
// ❌ AI generates this
const ProfileCard = () => (
  <div style={{ marginTop: '24px', marginBottom: '16px' }}>
    <h2 style={{ color: '#1a73e8' }}>John Smith</h2>
    <p>Patient ID: P-12345</p>
  </div>
);

// ✅ What you should have
const ProfileCard = ({
  patient,
  className
}: {
  patient: Patient;
  className?: string;
}) => (
  <div className={cn('profile-card', className)}>
    <h2>{patient.name}</h2>
    <p>Patient ID: {patient.id}</p>
  </div>
);
```

**The Fix:** Low-level components should be "dumb" - take props, render, no opinions about data or layout.

#### 3. Logic-UI Entanglement

AI mixes fetch calls, data transformation, and regex inside JSX.

```typescript
// ❌ AI generates this mess
const DrugList = ({ patientId }: { patientId: string }) => {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    fetch(`/api/patients/${patientId}/drugs`)
      .then(r => r.json())
      .then(data => {
        const filtered = data.filter(d =>
          d.status === 'active' &&
          !d.name.match(/discontinued/i) &&
          new Date(d.expiresAt) > new Date()
        );
        const sorted = filtered.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDrugs(sorted);
      });
  }, [patientId]);

  return drugs.map(d => <div key={d.id}>{d.name}</div>);
};

// ✅ Separated concerns
const useActiveDrugs = (patientId: string) => {
  return useQuery(['drugs', patientId, 'active'], async () => {
    const drugs = await fetchPatientDrugs(patientId);
    return filterActiveDrugs(drugs).sort(byName);
  });
};

const DrugList = ({ patientId }: { patientId: string }) => {
  const { data: drugs } = useActiveDrugs(patientId);
  return drugs?.map(d => <DrugCard key={d.id} drug={d} />);
};
```

#### 4. Fragmented Styling (CSS Chaos)

AI uses inconsistent utility classes or inline styles.

```typescript
// ❌ AI generates inconsistent styles
<Button className="rounded-lg px-4 py-2 bg-blue-500">Save</Button>
<Button className="rounded-md px-3 py-1.5 bg-blue-600">Cancel</Button>
<Button style={{ borderRadius: '8px', padding: '8px 16px' }}>Delete</Button>

// ✅ Use design system tokens
<Button variant="primary" size="md">Save</Button>
<Button variant="secondary" size="md">Cancel</Button>
<Button variant="danger" size="md">Delete</Button>
```

**The Fix:** Define base components early. Force AI to use them instead of raw HTML/Tailwind.

#### 5. Anonymous Component Anti-Pattern

AI defines components inside other components.

```typescript
// ❌ AI generates this - causes remount on every render!
const PatientList = ({ patients }: { patients: Patient[] }) => {
  const PatientRow = ({ patient }: { patient: Patient }) => (
    <tr>
      <td>{patient.name}</td>
      <td><input defaultValue={patient.email} /></td> {/* Loses focus! */}
    </tr>
  );

  return (
    <table>
      <tbody>
        {patients.map(p => <PatientRow key={p.id} patient={p} />)}
      </tbody>
    </table>
  );
};

// ✅ Define outside or use inline JSX
const PatientRow = ({ patient }: { patient: Patient }) => (
  <tr>
    <td>{patient.name}</td>
    <td><input defaultValue={patient.email} /></td>
  </tr>
);

const PatientList = ({ patients }: { patients: Patient[] }) => (
  <table>
    <tbody>
      {patients.map(p => <PatientRow key={p.id} patient={p} />)}
    </tbody>
  </table>
);
```

**The Fix:** Never define components inside other components. Extract to module level.

---

### Healthcare-Specific Concerns

#### 1. The "God Component" Pattern

Healthcare data is massive and interconnected, tempting developers to build monolithic components.

```typescript
// ❌ WRONG - One component handles everything
const PatientDashboard = ({ patientId }: { patientId: string }) => {
  const [medications, setMedications] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [billing, setBilling] = useState([]);
  const [encounters, setEncounters] = useState([]);
  // ... fetch all, render all, 800 lines

  // Bug in billing logic crashes entire view
  // Doctor can't see critical allergy info
};

// ✅ CORRECT - Isolated, data-agnostic components
const PatientDashboard = ({ patientId }: { patientId: string }) => (
  <ErrorBoundary fallback={<DashboardError />}>
    <Suspense fallback={<VitalsSkeleton />}>
      <VitalsPanel patientId={patientId} />
    </Suspense>
    <Suspense fallback={<AllergiesSkeleton />}>
      <AllergiesPanel patientId={patientId} /> {/* Isolated - always renders */}
    </Suspense>
    <Suspense fallback={<MedicationsSkeleton />}>
      <MedicationsPanel patientId={patientId} />
    </Suspense>
  </ErrorBoundary>
);
```

**The Risk:** A bug in one section can crash the entire view, blocking critical clinical information.

#### 2. Tight Coupling to Data Schemas (FHIR)

```typescript
// ❌ WRONG - Raw FHIR objects passed to UI
const PatientHeader = ({ patient }: { patient: fhir.Patient }) => (
  <div>
    {/* Deeply nested, breaks if schema changes */}
    <h1>{patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}</h1>
    <p>{patient.identifier?.[0]?.value}</p>
  </div>
);

// ✅ CORRECT - Transform layer (Adapter Pattern)
interface PatientViewModel {
  id: string;
  fullName: string;
  mrn: string;
  dateOfBirth: string;
}

const toPatientViewModel = (fhirPatient: fhir.Patient): PatientViewModel => ({
  id: fhirPatient.id ?? '',
  fullName: formatHumanName(fhirPatient.name?.[0]),
  mrn: extractMRN(fhirPatient.identifier),
  dateOfBirth: fhirPatient.birthDate ?? ''
});

const PatientHeader = ({ patient }: { patient: PatientViewModel }) => (
  <div>
    <h1>{patient.fullName}</h1>
    <p>MRN: {patient.mrn}</p>
  </div>
);
```

**The Risk:** Backend schema changes require rewriting every component.

#### 3. Ignoring Empty and Pending States

In clinics with spotty WiFi, components hang or show misleading blank screens.

```typescript
// ❌ WRONG - Ambiguous states
const AllergyList = ({ allergies }: { allergies: Allergy[] | undefined }) => {
  if (!allergies) return null; // Is this loading or empty?

  return allergies.map(a => <AllergyBadge key={a.id} allergy={a} />);
};

// ✅ CORRECT - Explicit states prevent clinical errors
const AllergyList = ({
  allergies,
  isLoading,
  error
}: AllergyListProps) => {
  if (isLoading) {
    return (
      <div className="allergies-loading">
        <Spinner />
        <span>Loading allergies...</span> {/* Clear loading state */}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="error">
        Unable to load allergies. Verify manually before prescribing.
      </Alert>
    );
  }

  if (allergies.length === 0) {
    return (
      <Alert variant="info">
        No known allergies recorded. {/* Explicit "none recorded" */}
        <span className="text-muted">Last verified: {lastVerifiedDate}</span>
      </Alert>
    );
  }

  return allergies.map(a => <AllergyBadge key={a.id} allergy={a} />);
};
```

**The Risk:** Clinician mistakes "loading" for "no allergies" and prescribes a dangerous medication.

#### 4. Clinical Logic Leaking into View

```typescript
// ❌ WRONG - Business rules trapped in component
const PrescriptionForm = ({ patient, drug }: Props) => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Clinical logic buried in UI - can't unit test, can't reuse
    if (
      patient.age < 18 &&
      drug.category === 'controlled' &&
      !patient.hasParentalConsent
    ) {
      setShowWarning(true);
    }
    if (patient.allergies.some(a => drug.ingredients.includes(a.substance))) {
      setShowWarning(true);
    }
  }, [patient, drug]);

  // ...
};

// ✅ CORRECT - Clinical rules in pure functions
const checkPrescriptionSafety = (
  patient: Patient,
  drug: Drug
): SafetyCheckResult => {
  const warnings: string[] = [];

  if (isPediatricControlledSubstance(patient, drug)) {
    warnings.push('Controlled substance requires parental consent for minors');
  }

  const allergyConflict = findAllergyConflict(patient.allergies, drug);
  if (allergyConflict) {
    warnings.push(`Patient allergic to ${allergyConflict.substance}`);
  }

  return { safe: warnings.length === 0, warnings };
};

const PrescriptionForm = ({ patient, drug }: Props) => {
  const safetyCheck = checkPrescriptionSafety(patient, drug);
  // UI just displays the result
};
```

**The Fix:** Keep clinical logic in pure functions. Testable, reusable, auditable.

#### 5. Context Contamination on Patient Switch

```typescript
// ❌ WRONG - Stale patient data during fast switching
const PatientNotes = () => {
  const { patientId } = usePatientContext();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes(patientId).then(setNotes);
    // If user switches patient quickly, notes from previous patient
    // might arrive AFTER the switch and display on wrong chart
  }, [patientId]);

  const saveNote = () => {
    savePatientNote(patientId, newNote); // Might save to wrong patient!
  };
};

// ✅ CORRECT - Strict cleanup on context change
const PatientNotes = () => {
  const { patientId } = usePatientContext();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    let cancelled = false;

    setNotes([]); // Clear immediately on patient change
    setNewNote(''); // Reset form

    fetchNotes(patientId).then(data => {
      if (!cancelled) setNotes(data);
    });

    return () => { cancelled = true; };
  }, [patientId]);

  // Or use React Query which handles this automatically
  const { data: notes } = useQuery(
    ['notes', patientId],
    () => fetchNotes(patientId),
    {
      enabled: !!patientId,
      // Data automatically cleared when key changes
    }
  );
};
```

**The Risk:** Data cross-contamination - saving a note to the wrong patient's chart.

---

### Component Architecture Comparison

| Pattern | When to Use | Pros | Cons |
|---------|-------------|------|------|
| **Atomic (atoms/molecules)** | Design systems, shared UI | Maximum reusability | Over-engineering risk |
| **Feature-based folders** | Large apps, team scaling | Clear ownership | Cross-feature sharing |
| **Headless UI** | Complex interactions | A11y handled, style freedom | Learning curve |
| **Composition (children)** | Flexible layouts | Avoids prop explosion | Verbose JSX |
| **Container/Presenter** | Complex logic | Testable, clear separation | More files |
| **Colocation** | Data requirements | Clear dependencies | GraphQL-specific |

---

### Component Architecture Checklist

Before shipping a component:

- [ ] Component does one thing (single responsibility)
- [ ] No more than 5-7 props (if more, consider composition)
- [ ] No business logic in presentational components
- [ ] No fetch calls in "dumb" components
- [ ] No components defined inside other components
- [ ] Uses headless library for complex interactions (tabs, modals, selects)
- [ ] Explicit loading, error, and empty states
- [ ] Self-contained - no DOM manipulation outside its tree
- [ ] Uses design system tokens, not arbitrary values
- [ ] Healthcare data transformed via adapter layer (not raw FHIR)
- [ ] Clinical logic in pure functions, not useEffect
- [ ] State cleanup on context changes (patient switching)
- [ ] File under 150 lines, or extracted for good reason

---

## Form Handling

### Philosophy

**Server Actions are the primary form handler. React 19 primitives over third-party libraries.**

```typescript
const formPhilosophy = {
  handler: 'Server Actions (not API routes)',
  state: 'useActionState (not useState + fetch)',
  pending: 'useFormStatus (not manual isLoading)',
  optimistic: 'useOptimistic (not manual rollback)',
  validation: 'Zod on server (client validation is UX only)',
  inputs: 'Uncontrolled with defaultValue (not controlled useState)',
  libraries: 'Avoid React Hook Form unless complexity demands it'
};
```

---

### Common Mistakes to Avoid

#### 1. The Controlled Input Performance Trap

**Don't use `useState` for every keystroke.** Re-rendering the entire form on each character causes lag in complex forms.

```typescript
// ❌ WRONG: Re-renders entire form on every keystroke
const BadForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} />
    </form>
  );
};

// ✅ CORRECT: Uncontrolled inputs, data extracted on submit
const GoodForm = () => {
  return (
    <form action={submitAction}>
      <input name="email" defaultValue="" />
      <input name="password" type="password" />
    </form>
  );
};
```

> **Clarification: useState in Forms**
>
> The rule is "don't use useState for INPUT VALUES," not "never use useState in forms."
>
> | Use Case | useState? | Why |
> |----------|-----------|-----|
> | Input values (`email`, `password`) | ❌ No | Causes re-render on every keystroke |
> | Validation errors (`errors` object) | ✅ Yes | Changes infrequently, on blur/submit |
> | Dynamic item arrays (add/remove rows) | ✅ Yes | Tracks which items exist, not their values |
> | UI state (`isSubmitting`, `showPassword`) | ✅ Yes | Pure UI concerns |
>
> The inputs themselves remain uncontrolled with `name` and `defaultValue`. useState manages everything else.

#### 2. Missing Pending State

**Users will click "Submit" five times if there's no feedback.** This causes duplicate submissions.

```typescript
// ✅ Use useFormStatus for automatic pending state
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? 'Submitting...' : children}
    </button>
  );
};

// Usage - button auto-disables during submission
<form action={createUser}>
  <input name="email" />
  <SubmitButton>Create Account</SubmitButton>
</form>
```

#### 3. Losing State on Error

**Nothing is more frustrating than a form clearing after a validation error.**

```typescript
// ❌ WRONG: User loses all input on error
const badAction = async (formData: FormData) => {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
    // Data is lost! Form clears!
  }
};

// ✅ CORRECT: Return data back so form preserves input
const goodAction = async (prevState: FormState, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      data // Send data back!
    };
  }
};

// Form uses defaultValue to preserve input
<input
  name="email"
  defaultValue={state?.data?.email ?? ''}
/>
```

#### 4. The JSON Body Reflex

**Don't `JSON.stringify` and `fetch` to API routes.** Use native FormData with Server Actions.

```typescript
// ❌ WRONG: SPA-era pattern
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
};

// ✅ CORRECT: Native form + Server Action
<form action={createUser}>
  <input name="email" />
  <input name="password" type="password" />
  <button type="submit">Submit</button>
</form>
```

#### 5. Hydration Mismatch with IDs

**Use `useId` for label/input connections.** Ensures server and client IDs match.

```typescript
import { useId } from 'react';

const EmailField = () => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} name="email" type="email" />
    </div>
  );
};
```

---

### Form Complexity Spectrum

| Complexity | Example | Pattern |
|------------|---------|---------|
| **Simple** | Login, search, single input | Server Action + `useActionState` |
| **Standard** | Patient registration, settings | Server Action + `useActionState` + Zod |
| **Multi-step** | Prescription intake wizard | URL-based steps + Server Action per step |
| **Dynamic** | Add/remove items, conditional fields | `useActionState` + controlled inputs |
| **Complex** | Nested objects, arrays, rich validation | React Hook Form + Server Action |

---

### Simple Forms

**Pattern: Server Action + useActionState + useFormStatus**

```typescript
// actions/auth.ts
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type LoginState = {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    form?: string;
  };
  data?: {
    email?: string;
  };
};

const login = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
  // Capture input data to return on error
  const inputData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const parsed = loginSchema.safeParse(inputData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      data: { email: inputData.email } // Return data so form doesn't clear
    };
  }

  const user = await authService.authenticate(parsed.data);

  if (!user) {
    return {
      success: false,
      errors: { form: 'Invalid email or password' },
      data: { email: inputData.email } // Preserve email on auth failure
    };
  }

  await createSession(user);
  redirect('/dashboard');
};
```

```typescript
// components/SubmitButton.tsx
'use client';

import { useFormStatus } from 'react-dom';

// Reusable submit button that auto-disables during submission
const SubmitButton = ({
  children,
  pendingText
}: {
  children: React.ReactNode;
  pendingText?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="submit-btn"
    >
      {pending ? (pendingText ?? 'Submitting...') : children}
    </button>
  );
};
```

```typescript
// components/LoginForm.tsx
'use client';

import { useActionState, useId } from 'react';
import { login } from '@/actions/auth';
import { SubmitButton } from './SubmitButton';

const LoginForm = () => {
  const [state, formAction] = useActionState(login, {
    success: false,
    errors: undefined,
    data: undefined
  });

  // useId ensures server/client ID match (no hydration warnings)
  const emailId = useId();
  const passwordId = useId();

  return (
    <form action={formAction}>
      {state.errors?.form && (
        <div role="alert" className="text-red-600">
          {state.errors.form}
        </div>
      )}

      <div>
        <label htmlFor={emailId}>Email</label>
        <input
          id={emailId}
          name="email"
          type="email"
          defaultValue={state.data?.email ?? ''} // Preserve on error
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? `${emailId}-error` : undefined}
        />
        {state.errors?.email && (
          <p id={`${emailId}-error`} className="text-red-500">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={passwordId}>Password</label>
        <input
          id={passwordId}
          name="password"
          type="password"
          aria-invalid={!!state.errors?.password}
          aria-describedby={state.errors?.password ? `${passwordId}-error` : undefined}
        />
        {state.errors?.password && (
          <p id={`${passwordId}-error`} className="text-red-500">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {/* useFormStatus inside SubmitButton handles pending state */}
      <SubmitButton pendingText="Signing in...">
        Sign In
      </SubmitButton>
    </form>
  );
};
```

**Key points:**
- **No `useState` for inputs** - uncontrolled with `defaultValue`
- **`useFormStatus`** - encapsulated pending state in SubmitButton
- **Return data on error** - `state.data.email` preserves input
- **`useId`** - prevents hydration mismatch warnings

---

### Validation Strategy

**Server is ALWAYS the authority. Client validation is UX only.**

```typescript
// Shared schema - same validation client and server
// lib/schemas/patient.ts
import { z } from 'zod';

const patientSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD format'),
  phone: z.string().regex(/^\+1\d{10}$/, 'Use +1XXXXXXXXXX format').optional()
});

type PatientInput = z.infer<typeof patientSchema>;
```

```typescript
// Client: Instant feedback (UX)
'use client';

const PatientForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBlur = (field: string, value: string) => {
    // Client-side preview - UX only, never trusted
    const fieldSchema = patientSchema.shape[field as keyof typeof patientSchema.shape];
    const result = fieldSchema?.safeParse(value);

    if (result && !result.success) {
      setErrors(prev => ({ ...prev, [field]: result.error.errors[0].message }));
    } else {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <form action={createPatient}>
      <input
        name="firstName"
        onBlur={(e) => handleBlur('firstName', e.target.value)}
      />
      {errors.firstName && <span>{errors.firstName}</span>}
      {/* ... */}
    </form>
  );
};
```

```typescript
// Server: Authority (security)
'use server';

const createPatient = async (prevState: FormState, formData: FormData) => {
  // ALWAYS validate on server - never trust client
  const parsed = patientSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    dateOfBirth: formData.get('dateOfBirth'),
    phone: formData.get('phone')
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  // Server validation passed - proceed
  const patient = await patientService.create(parsed.data);
  revalidatePath('/patients');

  return { success: true, data: patient };
};
```

---

### Multi-Step Wizards

**Use URL-based steps. Each step is a Server Action. Save progress server-side.**

```typescript
// URL Pattern: /patients/register?step=1
// Each step validates and saves, URL advances to next step

// app/patients/register/page.tsx (Server Component)
const RegisterPage = async ({
  searchParams
}: {
  searchParams: { step?: string; draftId?: string }
}) => {
  const step = parseInt(searchParams.step ?? '1');
  const draftId = searchParams.draftId;

  // Load existing draft if resuming
  const draft = draftId ? await getDraft(draftId) : null;

  return (
    <div>
      <StepIndicator currentStep={step} totalSteps={4} />

      {step === 1 && <PersonalInfoStep draft={draft} />}
      {step === 2 && <ContactInfoStep draft={draft} draftId={draftId} />}
      {step === 3 && <InsuranceStep draft={draft} draftId={draftId} />}
      {step === 4 && <ReviewStep draft={draft} draftId={draftId} />}
    </div>
  );
};
```

```typescript
// Step 1: Personal Info
'use client';

const PersonalInfoStep = ({ draft }: { draft: PatientDraft | null }) => {
  const [state, formAction, isPending] = useActionState(savePersonalInfo, {
    success: false
  });

  return (
    <form action={formAction}>
      <input
        name="firstName"
        defaultValue={draft?.firstName ?? ''}
        required
      />
      <input
        name="lastName"
        defaultValue={draft?.lastName ?? ''}
        required
      />
      <input
        name="dateOfBirth"
        type="date"
        defaultValue={draft?.dateOfBirth ?? ''}
        required
      />

      <div className="flex justify-between">
        <span /> {/* No back button on step 1 */}
        <button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Next: Contact Info'}
        </button>
      </div>
    </form>
  );
};
```

```typescript
// actions/registration.ts
'use server';

import { redirect } from 'next/navigation';

const savePersonalInfo = async (prevState: FormState, formData: FormData) => {
  const parsed = personalInfoSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    dateOfBirth: formData.get('dateOfBirth')
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  // Save to drafts table (server-side progress)
  const draft = await saveDraft({
    step: 1,
    ...parsed.data
  });

  // Redirect to next step with draft ID
  redirect(`/patients/register?step=2&draftId=${draft.id}`);
};

const saveContactInfo = async (prevState: FormState, formData: FormData) => {
  const draftId = formData.get('draftId') as string;
  const parsed = contactInfoSchema.safeParse({
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address')
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await updateDraft(draftId, {
    step: 2,
    ...parsed.data
  });

  redirect(`/patients/register?step=3&draftId=${draftId}`);
};

// Final step: Convert draft to patient
const completeRegistration = async (prevState: FormState, formData: FormData) => {
  const draftId = formData.get('draftId') as string;
  const draft = await getDraft(draftId);

  // Validate complete draft
  const parsed = fullPatientSchema.safeParse(draft);

  if (!parsed.success) {
    return { success: false, errors: { form: 'Please complete all required fields' } };
  }

  // Create actual patient record
  const patient = await patientService.create(parsed.data);

  // Clean up draft
  await deleteDraft(draftId);

  redirect(`/patients/${patient.id}/welcome`);
};
```

**Multi-Step Benefits:**
- URL is bookmarkable - user can resume later
- Back button works correctly
- Progress saved server-side (not localStorage)
- Each step validates independently
- Final step validates complete object

---

### Optimistic Updates

**Use `useOptimistic` for instant feedback on mutations.**

```typescript
'use client';

import { useOptimistic } from 'react';

const AllergyList = ({
  allergies,
  patientId
}: {
  allergies: Allergy[];
  patientId: string;
}) => {
  const [optimisticAllergies, addOptimistic] = useOptimistic(
    allergies,
    (state, newAllergy: Allergy) => [...state, newAllergy]
  );

  const handleSubmit = async (formData: FormData) => {
    const tempAllergy: Allergy = {
      id: `temp-${Date.now()}`,
      name: formData.get('name') as string,
      severity: formData.get('severity') as string,
      pending: true
    };

    // Immediately show optimistic update
    addOptimistic(tempAllergy);

    // Server action runs in background
    await addAllergy(formData);
    // revalidatePath in action replaces optimistic with real data
  };

  return (
    <div>
      <ul>
        {optimisticAllergies.map(allergy => (
          <li
            key={allergy.id}
            className={allergy.pending ? 'opacity-50' : ''}
          >
            {allergy.name} - {allergy.severity}
            {allergy.pending && <span> (saving...)</span>}
          </li>
        ))}
      </ul>

      <form action={handleSubmit}>
        <input type="hidden" name="patientId" value={patientId} />
        <input name="name" placeholder="Allergy name" required />
        <select name="severity">
          <option value="mild">Mild</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
        </select>
        <button type="submit">Add Allergy</button>
      </form>
    </div>
  );
};
```

---

### Dynamic Forms (Add/Remove Items)

**Pattern: Controlled inputs with FormData arrays**

```typescript
'use client';

const MedicationListForm = ({ patientId }: { patientId: string }) => {
  const [medications, setMedications] = useState([{ id: 1, name: '', dosage: '' }]);

  const addMedication = () => {
    setMedications(prev => [
      ...prev,
      { id: Date.now(), name: '', dosage: '' }
    ]);
  };

  const removeMedication = (id: number) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const updateMedication = (id: number, field: string, value: string) => {
    setMedications(prev =>
      prev.map(m => m.id === id ? { ...m, [field]: value } : m)
    );
  };

  return (
    <form action={saveMedications}>
      <input type="hidden" name="patientId" value={patientId} />

      {medications.map((med, index) => (
        <div key={med.id} className="flex gap-2">
          <input
            name={`medications[${index}].name`}
            value={med.name}
            onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
            placeholder="Medication name"
          />
          <input
            name={`medications[${index}].dosage`}
            value={med.dosage}
            onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
            placeholder="Dosage"
          />
          {medications.length > 1 && (
            <button type="button" onClick={() => removeMedication(med.id)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addMedication}>
        + Add Medication
      </button>

      <button type="submit">Save Medications</button>
    </form>
  );
};
```

```typescript
// Server Action handles array
'use server';

const saveMedications = async (prevState: FormState, formData: FormData) => {
  const patientId = formData.get('patientId') as string;

  // Parse array from FormData
  const medications: Medication[] = [];
  let index = 0;

  while (formData.has(`medications[${index}].name`)) {
    medications.push({
      name: formData.get(`medications[${index}].name`) as string,
      dosage: formData.get(`medications[${index}].dosage`) as string
    });
    index++;
  }

  const parsed = z.array(medicationSchema).safeParse(medications);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten() };
  }

  await medicationService.saveForPatient(patientId, parsed.data);
  revalidatePath(`/patients/${patientId}`);

  return { success: true };
};
```

---

### When to Use React Hook Form

**Only when native patterns become unwieldy.** Signs you need RHF:

```typescript
const useReactHookFormWhen = [
  'Deeply nested object structures (3+ levels)',
  'Complex conditional validation (field A depends on field B)',
  'Large forms with 20+ fields needing performance optimization',
  'Wizard forms where you need to preserve state across steps without server roundtrip',
  'Integration with complex UI libraries that need register/control'
];

const dontUseReactHookFormFor = [
  'Simple forms (< 10 fields)',
  'Standard CRUD forms',
  'Forms where Server Actions + useActionState work fine',
  'Just because you used it before'
];
```

**If you do use React Hook Form:**

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ComplexPrescriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PrescriptionInput>({
    resolver: zodResolver(prescriptionSchema)
  });

  const onSubmit = async (data: PrescriptionInput) => {
    // Convert to FormData for Server Action
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    await createPrescription(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('drugName')} />
      {errors.drugName && <span>{errors.drugName.message}</span>}

      {/* Complex nested fields */}
      <input {...register('dosage.amount')} />
      <select {...register('dosage.unit')}>
        <option value="mg">mg</option>
        <option value="ml">ml</option>
      </select>

      <button type="submit" disabled={isSubmitting}>
        Create Prescription
      </button>
    </form>
  );
};
```

---

### File Uploads

**Use FormData with Server Actions. Validate file type and size server-side.**

```typescript
'use client';

const DocumentUploadForm = ({ patientId }: { patientId: string }) => {
  const [state, formAction, isPending] = useActionState(uploadDocument, {
    success: false
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="patientId" value={patientId} />

      <input
        type="file"
        name="document"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      {state.errors?.document && (
        <p className="text-red-500">{state.errors.document}</p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Uploading...' : 'Upload Document'}
      </button>
    </form>
  );
};
```

```typescript
// actions/documents.ts
'use server';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const uploadDocument = async (prevState: FormState, formData: FormData) => {
  const patientId = formData.get('patientId') as string;
  const file = formData.get('document') as File;

  // Validate file
  if (!file || file.size === 0) {
    return { success: false, errors: { document: 'Please select a file' } };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, errors: { document: 'File must be under 10MB' } };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { success: false, errors: { document: 'Only PDF, JPG, PNG allowed' } };
  }

  // Upload to S3/storage
  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await storageService.upload({
    buffer,
    filename: file.name,
    contentType: file.type,
    patientId
  });

  // Create document record
  await documentService.create({
    patientId,
    url,
    filename: file.name,
    type: file.type
  });

  revalidatePath(`/patients/${patientId}/documents`);

  return { success: true };
};
```

---

### Accessibility Requirements

**All forms must be accessible. This is non-negotiable for healthcare.**

```typescript
const formAccessibility = {
  // Every input needs a label
  labels: `
    <label htmlFor="email">Email Address</label>
    <input id="email" name="email" type="email" />
  `,

  // Error states need ARIA
  errors: `
    <input
      id="email"
      name="email"
      aria-invalid={!!errors.email}
      aria-describedby={errors.email ? 'email-error' : undefined}
    />
    {errors.email && (
      <p id="email-error" role="alert">{errors.email}</p>
    )}
  `,

  // Required fields
  required: `
    <label htmlFor="name">
      Name <span aria-hidden="true">*</span>
      <span className="sr-only">(required)</span>
    </label>
    <input id="name" name="name" required aria-required="true" />
  `,

  // Fieldsets for groups
  groups: `
    <fieldset>
      <legend>Contact Information</legend>
      <input name="email" />
      <input name="phone" />
    </fieldset>
  `,

  // Focus management on errors
  focusOnError: `
    useEffect(() => {
      if (state.errors) {
        const firstError = document.querySelector('[aria-invalid="true"]');
        firstError?.focus();
      }
    }, [state.errors]);
  `,

  // Submit button states
  submitButton: `
    <button
      type="submit"
      disabled={isPending}
      aria-busy={isPending}
    >
      {isPending ? 'Submitting...' : 'Submit'}
    </button>
  `
};
```

---

### Healthcare-Specific Considerations

```typescript
const healthcareFormRules = {
  // PHI fields need extra protection
  phiFields: {
    autocomplete: 'off',         // Prevent browser storage
    autoCorrect: 'off',          // Prevent suggestions
    spellCheck: false,           // Prevent cloud spell check
    'data-1p-ignore': true       // Prevent password manager fill
  },

  // SSN/sensitive data
  sensitiveInput: `
    <input
      type="password"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
    />
  `,

  // Consent tracking
  consent: `
    <form action={submitWithConsent}>
      <input
        type="checkbox"
        name="hipaaConsent"
        required
        aria-describedby="hipaa-description"
      />
      <label htmlFor="hipaaConsent">
        I acknowledge the HIPAA Notice of Privacy Practices
      </label>
      <p id="hipaa-description" className="text-sm">
        <a href="/privacy" target="_blank">Read our privacy practices</a>
      </p>
    </form>
  `,

  // Audit trail
  auditOnSubmit: `
    const createPatient = async (formData: FormData) => {
      'use server';

      const user = await getCurrentUser();

      // Create patient
      const patient = await patientService.create(data);

      // Log PHI access
      await auditLog.create({
        action: 'PATIENT_CREATE',
        userId: user.id,
        patientId: patient.id,
        fieldsAccessed: Object.keys(data),
        timestamp: new Date()
      });
    };
  `
};
```

---

### Form Patterns Summary

| Pattern | When | Key Tools |
|---------|------|-----------|
| **Simple** | Login, search, single action | `useActionState` + Server Action |
| **Standard** | CRUD forms, settings | `useActionState` + Zod + Server Action |
| **Multi-step** | Registration, intake | URL params + Server Action per step + drafts |
| **Optimistic** | Inline add/edit | `useOptimistic` + Server Action |
| **Dynamic** | Add/remove items | `useState` + FormData arrays |
| **File upload** | Documents, images | FormData + Server Action + storage |
| **Complex** | Nested, conditional | React Hook Form + zodResolver |

---

### Anti-Patterns

```typescript
const formAntiPatterns = {
  // ❌ Using API routes instead of Server Actions
  wrong: `
    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch('/api/patients', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    };
  `,
  right: 'Use Server Actions with form action={serverAction}',

  // ❌ Storing form data in localStorage
  wrong: `
    localStorage.setItem('patientDraft', JSON.stringify(formData));
  `,
  right: 'Save drafts to database server-side',
  why: 'PHI should never be in localStorage',

  // ❌ Client-only validation
  wrong: `
    if (email.includes('@')) {
      submitForm();
    }
  `,
  right: 'Client validation for UX, server validation for security',
  why: 'Client validation can be bypassed',

  // ❌ Managing form state in Redux/global store
  wrong: `
    dispatch(updateFormField('email', value));
  `,
  right: 'Form state is local to the form component',
  why: 'Forms are inherently local UI state',

  // ❌ Preventing default without Server Actions
  wrong: `
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
  `,
  right: '<form action={serverAction}> - no preventDefault needed',
  why: 'Server Actions handle the submission lifecycle'
};
```

---

### 2026 Form Landscape

#### Schema-First Validation

Define a single source of truth for your data structure. Use it everywhere.

```typescript
const schemaFirstApproach = {
  workflow: [
    'Define schema once',
    'Frontend validation (UX)',
    'TypeScript type inference',
    'Backend/API validation (security)'
  ],

  libraries: {
    zod: {
      status: 'Industry standard',
      pros: 'Best DX, excellent TypeScript integration',
      cons: 'Larger bundle size'
    },
    valibot: {
      status: 'Rising fast in 2026',
      pros: 'Modular, tree-shakable—unused rules not in bundle',
      cons: 'Smaller ecosystem'
    }
  }
};

// Zod - industry standard
import { z } from 'zod';

const patientSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  dateOfBirth: z.string().date('Invalid date')
});

type PatientInput = z.infer<typeof patientSchema>;

// Valibot - tree-shakable alternative
import * as v from 'valibot';

const patientSchema = v.object({
  firstName: v.pipe(v.string(), v.minLength(1, 'Required')),
  lastName: v.pipe(v.string(), v.minLength(1, 'Required')),
  email: v.pipe(v.string(), v.email('Invalid email')),
  dateOfBirth: v.pipe(v.string(), v.isoDate('Invalid date'))
});

type PatientInput = v.InferOutput<typeof patientSchema>;
```

#### Progressive Enhancement

Forms should work even if JavaScript hasn't loaded yet.

```typescript
const progressiveEnhancement = {
  principle: 'Native <form> actions work without JS',
  enhancement: 'If JS available, intercept for smooth UX',

  pattern: `
    // Form works with or without JS
    <form action={serverAction}>
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>

    // JS enhances with:
    // - Instant validation feedback
    // - Loading states
    // - Optimistic updates
    // - No page refresh
  `
};
```

#### Modern UX Patterns

```typescript
const modernFormUX = {
  labels: {
    rule: 'Always visible—never use placeholder as label',
    why: 'Placeholder disappears when typing, users forget what field is for',
    pattern: 'Floating label if you want clean look'
  },

  layout: {
    rule: 'Single column forms',
    why: 'Research shows faster completion, fewer errors than multi-column'
  },

  validation: {
    rule: 'Validate on blur, not on change',
    why: 'Immediate red text while typing frustrates users',
    pattern: 'Show error only after user leaves field or submits'
  },

  inputMasking: {
    rule: 'Format as user types',
    examples: ['Phone: (555) 123-4567', 'SSN: ***-**-1234', 'Currency: $1,234.56'],
    libraries: ['react-number-format', 'imask']
  }
};

// Validate on blur pattern
const EmailField = () => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const result = emailSchema.safeParse(e.target.value);
    setError(result.success ? null : result.error.errors[0].message);
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onBlur={handleBlur}
        aria-invalid={touched && !!error}
      />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
};
```

#### The Placeholder Label Anti-Pattern

```typescript
// ❌ WRONG - Placeholder as only label
<input placeholder="Email address" />
// User types, placeholder disappears
// User gets interrupted, comes back
// "Wait, was this username or email?"

// ✅ CORRECT - Permanent visible label
<div>
  <label htmlFor="email">Email address</label>
  <input id="email" name="email" type="email" />
</div>

// ✅ ALSO CORRECT - Floating label pattern
<div className="floating-label">
  <input id="email" name="email" placeholder=" " />
  <label htmlFor="email">Email address</label>
  {/* CSS moves label above input when :not(:placeholder-shown) */}
</div>
```

---

### Additional Common Pitfalls

#### 1. State-Per-Input Performance Killer

```typescript
// ❌ WRONG - Re-renders entire form on every keystroke
const BadForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  // 20 more useState calls...

  // Clearing form = 20 setter calls
  // Submitting = gathering 20 values
  // Every keystroke = full re-render

  return (
    <form>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      {/* ... */}
    </form>
  );
};

// ✅ CORRECT - Single state object or uncontrolled
const GoodForm = () => {
  return (
    <form action={submitAction}>
      <input name="firstName" defaultValue="" />
      <input name="lastName" defaultValue="" />
      <input name="email" defaultValue="" />
      {/* FormData extracts values on submit */}
    </form>
  );
};
```

#### 2. Aggressive Validation (Too Early)

```typescript
// ❌ WRONG - Error appears on first keystroke
const AggressiveValidation = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // User types "j" → immediately sees "Invalid email"
    if (!e.target.value.includes('@')) {
      setError('Invalid email address');
    }
  };

  return (
    <div>
      <input value={email} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

// ✅ CORRECT - Validate on blur (after user finishes)
const LazyValidation = () => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const valid = e.target.value.includes('@');
    setError(valid ? '' : 'Invalid email address');
  };

  return (
    <div>
      <input name="email" onBlur={handleBlur} />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
};
```

#### 3. Error Summary Without Inline Errors

```typescript
// ❌ WRONG - Errors only at top, hard to find which field
const ErrorSummaryOnly = () => {
  return (
    <form>
      {errors.length > 0 && (
        <div className="error-summary">
          <p>Please fix the following errors:</p>
          <ul>
            {errors.map(e => <li key={e}>{e}</li>)}
          </ul>
        </div>
      )}

      {/* 20 fields below... user has to hunt for which one failed */}
      <input name="field1" />
      <input name="field2" />
      {/* ... */}
    </form>
  );
};

// ✅ CORRECT - Inline errors adjacent to each field
const InlineErrors = () => {
  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="error">{errors.email}</p>
        )}
      </div>
      {/* Error right next to the field */}
    </form>
  );
};
```

---

### AI-Assisted Development Pitfalls

#### 1. State Per Field Explosion

AI generates separate useState for every input.

```typescript
// ❌ AI generates this
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
// ... 15 more

// Clearing requires:
setFirstName('');
setLastName('');
setEmail('');
// ... 15 more calls

// ✅ Tell AI: "Use uncontrolled inputs with FormData"
<form action={submitAction}>
  <input name="firstName" />
  <input name="lastName" />
  <input name="email" />
</form>
```

#### 2. Happy Path Validation Only

AI focuses on success states, validation is simplistic or missing.

```typescript
// ❌ AI generates this
const handleSubmit = async (formData: FormData) => {
  const email = formData.get('email');
  if (!email) {
    return { error: 'Email required' };
  }
  // No format validation, no edge cases
  await createUser({ email });
};

// ✅ What you should have
const handleSubmit = async (formData: FormData) => {
  const parsed = userSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      data: { email: formData.get('email') }
    };
  }

  // Check email uniqueness
  const existing = await userService.findByEmail(parsed.data.email);
  if (existing) {
    return { errors: { email: ['Email already registered'] } };
  }

  await createUser(parsed.data);
};
```

#### 3. Manual Value Mapping Boilerplate

AI writes verbose onChange handlers for every field.

```typescript
// ❌ AI generates 20 of these
<input
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
/>
<input
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
/>
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
// ... repeat 20 times

// ✅ Use Server Actions + uncontrolled
<form action={submitAction}>
  <input name="firstName" defaultValue={data?.firstName} />
  <input name="lastName" defaultValue={data?.lastName} />
  <input name="email" defaultValue={data?.email} />
</form>

// ✅ Or React Hook Form if truly needed
const { register } = useForm();
<input {...register('firstName')} />
<input {...register('lastName')} />
<input {...register('email')} />
```

#### 4. Missing Loading/Disabled State

AI rarely adds pending states by default.

```typescript
// ❌ AI generates this - user can click 5 times
<button type="submit">Submit</button>

// ✅ Always track pending state
const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? 'Submitting...' : children}
    </button>
  );
};
```

---

### Healthcare-Specific Form Concerns

#### 1. The Ambiguous Units Trap

Healthcare data is meaningless without units.

```typescript
// ❌ DANGEROUS - No unit context
<input type="number" name="weight" placeholder="Weight" />
// User enters "80" - is that kg or lbs?
// Wrong interpretation = wrong medication dosage

// ✅ CORRECT - Unit-aware input
const WeightInput = ({ defaultUnit = 'kg' }: { defaultUnit?: 'kg' | 'lbs' }) => {
  const [unit, setUnit] = useState(defaultUnit);

  return (
    <div className="unit-input">
      <label htmlFor="weight">Weight</label>
      <div className="input-with-unit">
        <input
          id="weight"
          name="weight"
          type="number"
          step="0.1"
          required
        />
        <select
          name="weightUnit"
          value={unit}
          onChange={(e) => setUnit(e.target.value as 'kg' | 'lbs')}
        >
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
      </div>
    </div>
  );
};

// Server always stores in canonical unit (kg)
const normalizeWeight = (value: number, unit: string): number => {
  return unit === 'lbs' ? value * 0.453592 : value;
};
```

#### 2. Dangerous Autofill and Auto-Suggest

Browser autofill can cause patient misidentification.

```typescript
// ❌ DANGEROUS - Browser autofills clinician's data into patient record
<input name="address" autoComplete="street-address" />
// Clinician's home address ends up in patient chart
// Lab results mailed to wrong address = HIPAA violation

// ✅ CORRECT - Disable autofill for PHI fields
const PHIInput = ({
  name,
  label,
  type = 'text'
}: PHIInputProps) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      data-1p-ignore="true"
      data-lpignore="true"
    />
  </div>
);

// For medication search - require explicit selection
const DrugSearch = () => {
  const [query, setQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  // Must select from validated RxNorm list
  // No "fuzzy" matching that could cause wrong drug
  return (
    <div>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedDrug(null); // Clear selection when typing
        }}
        autoComplete="off"
      />
      {/* Dropdown with validated drug list */}
      <input
        type="hidden"
        name="drugId"
        value={selectedDrug?.rxcui ?? ''}
        required
      />
    </div>
  );
};
```

#### 3. Missing Auto-Save for Long Forms

Healthcare forms are long and prone to interruption.

```typescript
// ❌ WRONG - Data lost on interruption
const IntakeForm = () => {
  // 30-field form
  // Nurse gets called away for emergency
  // Returns to find browser crashed
  // All data lost, has to re-enter
};

// ✅ CORRECT - Auto-save to draft
const IntakeForm = ({ patientId, draftId }: IntakeFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        saveDraft(draftId, formData); // Server action, not localStorage
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, [draftId]);

  // Also save on blur of any field
  const handleFieldBlur = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      saveDraft(draftId, formData);
    }
  };

  return (
    <form ref={formRef} action={submitIntake}>
      <input name="chiefComplaint" onBlur={handleFieldBlur} />
      {/* ... 30 fields */}
      <p className="text-muted">Draft auto-saved</p>
    </form>
  );
};
```

#### 4. Multi-Tiered Clinical Validation

Healthcare validation goes beyond "is this a valid email?"

```typescript
const clinicalValidation = {
  uiLevel: 'Immediate feedback—value in plausible range',
  logicLevel: 'Cross-field validation—age vs medication',
  apiLevel: 'Strict schema enforcement—final gate'
};

// UI Level - instant feedback
const HeartRateInput = () => {
  const [warning, setWarning] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 30 || value > 250) {
      setWarning('Value outside normal range (30-250 bpm). Please verify.');
    } else {
      setWarning(null);
    }
  };

  return (
    <div>
      <label>Heart Rate (bpm)</label>
      <input name="heartRate" type="number" onBlur={handleBlur} />
      {warning && <span className="warning">{warning}</span>}
    </div>
  );
};

// Logic Level - cross-field validation
const validatePrescription = (data: PrescriptionInput): ValidationResult => {
  const errors: string[] = [];

  // Pediatric check
  if (data.patientAge < 18 && data.drug.adultOnly) {
    errors.push(`${data.drug.name} is not approved for patients under 18`);
  }

  // Pregnancy check
  if (data.patientPregnant && data.drug.pregnancyCategory === 'X') {
    errors.push(`${data.drug.name} is contraindicated during pregnancy`);
  }

  // Allergy check
  const allergyConflict = data.patientAllergies.find(a =>
    data.drug.ingredients.includes(a.substance)
  );
  if (allergyConflict) {
    errors.push(`Patient allergic to ${allergyConflict.substance}`);
  }

  return { valid: errors.length === 0, errors };
};
```

#### 5. Append-Only Audit Trail

Every form submission must be auditable.

```typescript
// ❌ WRONG - Simple UPDATE, no history
const updatePatient = async (formData: FormData) => {
  await db.patient.update({
    where: { id: patientId },
    data: { allergies: formData.get('allergies') }
  });
  // Who deleted the penicillin allergy? When? Why?
  // No way to know.
};

// ✅ CORRECT - Append-only with audit trail
const updatePatient = async (formData: FormData) => {
  const user = await getCurrentUser();
  const previousData = await db.patient.findUnique({ where: { id: patientId } });

  // Update the record
  const newData = {
    allergies: formData.get('allergies') as string
  };

  await db.patient.update({
    where: { id: patientId },
    data: newData
  });

  // Log the change
  await db.auditLog.create({
    data: {
      action: 'PATIENT_UPDATE',
      entityType: 'patient',
      entityId: patientId,
      userId: user.id,
      previousValue: JSON.stringify(previousData),
      newValue: JSON.stringify(newData),
      reason: formData.get('changeReason') as string,
      timestamp: new Date(),
      ipAddress: getClientIp()
    }
  });
};

// Form includes reason for change
<form action={updatePatient}>
  <textarea name="allergies" defaultValue={patient.allergies} />
  <select name="changeReason" required>
    <option value="">Select reason for change</option>
    <option value="NEW_INFORMATION">New information from patient</option>
    <option value="CORRECTION">Correcting previous error</option>
    <option value="CLARIFICATION">Clarifying existing entry</option>
  </select>
  <button type="submit">Save Changes</button>
</form>
```

---

### Form Handling Comparison

| Feature | The Mistake | The Modern Standard |
|---------|-------------|---------------------|
| **Data Access** | `const [val, setVal] = useState` per field | `new FormData(form)` or uncontrolled inputs |
| **Validation** | Manual if/else checks | Schema-based (Zod/Valibot) |
| **Feedback** | `alert("Error!")` or console.log | Inline, ARIA-aware error adjacent to field |
| **Submission** | `fetch()` in onClick handler | Server Actions with `action={...}` |
| **Labels** | Placeholder as label | Permanent visible `<label>` tags |
| **Pending State** | None (user clicks 5 times) | `useFormStatus` + disabled button |
| **Validation Timing** | On every keystroke | On blur (after user leaves field) |
| **PHI Storage** | localStorage | Server-side drafts table |
| **Units** | Naked number inputs | Unit-aware with explicit suffix |
| **History** | Simple UPDATE | Append-only with audit log |

---

### Form Handling Checklist

Before shipping a form:

- [ ] Uses Server Actions (not fetch to API routes)
- [ ] Uses uncontrolled inputs with `defaultValue` (not useState per field)
- [ ] Schema-based validation (Zod or Valibot)
- [ ] Validates on server (client is UX only)
- [ ] Validates on blur, not on change
- [ ] Returns form data on error (inputs don't clear)
- [ ] Submit button disabled during pending
- [ ] Uses `useFormStatus` for loading state
- [ ] Uses `useId` for label/input connections
- [ ] All inputs have visible labels (not placeholder-only)
- [ ] Error messages adjacent to fields (not summary-only)
- [ ] ARIA attributes for errors (`aria-invalid`, `aria-describedby`)
- [ ] Focus moves to first error field on submit failure
- [ ] Single-column layout for mobile
- [ ] PHI fields have autofill disabled
- [ ] Unit-aware inputs for measurements
- [ ] Auto-save to server-side drafts for long forms
- [ ] Multi-tiered validation for clinical data
- [ ] Audit trail logged on every submission
- [ ] Reason for change captured on updates

---

## Component Library

### Architecture: Engine + Paint + Blueprint

**Your UI library is a folder, not a dependency.**

```typescript
const componentArchitecture = {
  engine: {
    what: 'Radix UI primitives',
    why: 'Handles ARIA, keyboard nav, focus management',
    provides: 'Behavior with zero styles'
  },

  paint: {
    what: 'Tailwind CSS',
    why: 'Consistent design language, no global CSS conflicts',
    provides: 'Utility classes for all styling'
  },

  blueprint: {
    what: 'shadcn pattern (copy into project)',
    why: 'You own the code, full customization, no black box',
    provides: 'Components in your repo, not node_modules'
  }
};

// The result: package.json has primitives + utilities, not "UI libraries"
const dependencies = {
  // Primitives (logic only)
  '@radix-ui/react-dialog': '^1.x',
  '@radix-ui/react-dropdown-menu': '^2.x',
  '@radix-ui/react-select': '^2.x',
  '@radix-ui/react-tabs': '^1.x',
  // ... other Radix primitives as needed

  // Styling engine
  'tailwindcss': '^3.x',
  'class-variance-authority': '^0.7.x',  // For variant management
  'clsx': '^2.x',                         // Class merging
  'tailwind-merge': '^2.x',               // Tailwind-specific merge

  // NOT in dependencies:
  // '@shadcn/ui' - doesn't exist, you copy the code
  // 'antd', '@mui/material', '@chakra-ui/react' - NO
};
```

---

### Why This Architecture

| Approach | Today | 5 Years From Now |
|----------|-------|------------------|
| **Only Tailwind** | Beautiful buttons | Broken accessibility |
| **Only Radix** | Perfect a11y | Looks like Windows 95 |
| **NPM Library (MUI)** | Fast development | Stuck with their decisions, rewrite |
| **Engine + Paint + Blueprint** | Own everything | Edit your files, swap parts |

---

### Folder Structure

```
src/
├── components/
│   ├── ui/                    # Primitive components (shadcn-style)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   └── index.ts           # Barrel export
│   │
│   ├── composed/              # Multi-primitive compositions
│   │   ├── data-table.tsx     # Table + pagination + sorting
│   │   ├── combobox.tsx       # Input + popover + command
│   │   ├── date-picker.tsx    # Popover + calendar
│   │   └── file-upload.tsx    # Dropzone + progress
│   │
│   └── app/                   # App-specific components
│       ├── patient-card.tsx
│       ├── prescription-form.tsx
│       ├── order-status-badge.tsx
│       └── provider-schedule.tsx
│
├── lib/
│   └── utils.ts               # cn() helper, formatters
```

**Three tiers:**
1. **`ui/`** - Primitives. Direct Radix wrappers with Tailwind styling.
2. **`composed/`** - Combinations. Multiple primitives working together.
3. **`app/`** - Business components. Use primitives + composed, add domain logic.

---

### The `cn()` Utility

**Essential helper for merging Tailwind classes.**

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Usage: merges and dedupes Tailwind classes correctly
cn('px-4 py-2', 'px-6');           // → 'py-2 px-6' (px-6 wins)
cn('text-red-500', isError && 'text-red-700');  // Conditional
cn(baseStyles, variantStyles, className);        // Layer overrides
```

---

### Primitive Component Pattern

**Wrap Radix, style with Tailwind, expose consistent API.**

```typescript
// components/ui/button.tsx
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

**Key patterns:**
- `forwardRef` for ref forwarding
- `cva` for variant management
- `cn` for class merging
- `asChild` + `Slot` for polymorphism
- Consistent prop interface

---

### Radix Wrapper Pattern

**For interactive primitives (Dialog, Select, etc.)**

```typescript
// components/ui/dialog.tsx
'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
);

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
};
```

**Usage:**

```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const ConfirmDeleteDialog = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Patient</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p>This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

### Server vs Client Components in UI

```typescript
const componentClientRequirements = {
  // These MUST be 'use client' (have interactivity/state)
  clientComponents: [
    'Dialog',           // Open/close state
    'DropdownMenu',     // Open/close, keyboard navigation
    'Select',           // Open/close, selection state
    'Tabs',             // Active tab state
    'Toast',            // Show/hide, timers
    'Tooltip',          // Hover state
    'Popover',          // Open/close state
    'Accordion',        // Expand/collapse state
    'Combobox'          // Input + selection state
  ],

  // These can be Server Components (no interactivity)
  serverComponents: [
    'Button',           // Unless using asChild with client trigger
    'Badge',            // Pure display
    'Card',             // Pure layout
    'Table',            // Pure display (unless sortable)
    'Avatar',           // Pure display
    'Separator',        // Pure display
    'Label',            // Pure display
    'Input',            // Server unless controlled
    'Skeleton'          // Pure display
  ]
};
```

---

### Design Tokens

**Use CSS variables for theming. Tailwind references them.**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Brand colors */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    /* Component tokens */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    /* ... dark mode overrides */
  }
}
```

```typescript
// tailwind.config.ts
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  }
};
```

---

### Healthcare-Specific Components

**Components tailored for pharmacy/clinical use cases.**

```typescript
// components/app/patient-status-badge.tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type PatientStatus = 'active' | 'inactive' | 'pending' | 'on-hold';

const statusConfig: Record<PatientStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-100 text-green-800' },
  inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-800' },
  pending: { label: 'Pending Review', className: 'bg-yellow-100 text-yellow-800' },
  'on-hold': { label: 'On Hold', className: 'bg-red-100 text-red-800' }
};

const PatientStatusBadge = ({ status }: { status: PatientStatus }) => {
  const config = statusConfig[status];

  return (
    <Badge className={cn('font-medium', config.className)}>
      {config.label}
    </Badge>
  );
};
```

```typescript
// components/app/prescription-status.tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type RxStatus =
  | 'pending'
  | 'in-review'
  | 'approved'
  | 'compounding'
  | 'quality-check'
  | 'ready'
  | 'shipped'
  | 'delivered';

const rxStatusConfig: Record<RxStatus, {
  label: string;
  className: string;
  icon: string;
}> = {
  pending: { label: 'Pending', className: 'bg-gray-100', icon: '⏳' },
  'in-review': { label: 'In Review', className: 'bg-blue-100', icon: '👁️' },
  approved: { label: 'Approved', className: 'bg-green-100', icon: '✓' },
  compounding: { label: 'Compounding', className: 'bg-purple-100', icon: '🧪' },
  'quality-check': { label: 'QC', className: 'bg-orange-100', icon: '🔬' },
  ready: { label: 'Ready', className: 'bg-green-200', icon: '📦' },
  shipped: { label: 'Shipped', className: 'bg-blue-200', icon: '🚚' },
  delivered: { label: 'Delivered', className: 'bg-green-300', icon: '✅' }
};

const PrescriptionStatusBadge = ({ status }: { status: RxStatus }) => {
  const config = rxStatusConfig[status];

  return (
    <Badge className={cn('font-medium gap-1', config.className)}>
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </Badge>
  );
};
```

---

### Adding New Components

**Checklist when adding a new primitive:**

1. **Check if Radix has it** - [radix-ui.com/primitives](https://radix-ui.com/primitives)
2. **Check if shadcn has it** - [ui.shadcn.com](https://ui.shadcn.com)
3. **If shadcn has it:** Copy, adapt to your tokens
4. **If only Radix has it:** Create wrapper following the pattern above
5. **If neither has it:** Build from scratch with proper a11y

```typescript
// When building from scratch, ensure:
const accessibilityChecklist = [
  'Keyboard navigation (Tab, Enter, Escape, Arrows)',
  'Focus visible states',
  'ARIA labels and roles',
  'Screen reader announcements',
  'Reduced motion support',
  'Color contrast (4.5:1 minimum)',
  'Touch target size (44x44px minimum)'
];
```

---

### What NOT to Do

```typescript
const componentAntiPatterns = {
  // ❌ Installing full UI library
  wrong: 'npm install @mui/material @emotion/react',
  why: 'Massive bundle, style conflicts, locked in',

  // ❌ Importing from node_modules UI package
  wrong: "import { Button } from 'some-ui-library'",
  why: "Can't customize, hidden code",

  // ❌ Inline Tailwind without abstraction
  wrong: `
    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
      Click me
    </button>
  `,
  why: 'No consistency, repeated everywhere',

  // ❌ Custom CSS files for components
  wrong: 'button.module.css',
  why: 'Defeats the purpose of Tailwind, harder to maintain',

  // ❌ Skipping Radix for "simple" components
  wrong: 'Building custom Select without Radix',
  why: 'You will miss accessibility edge cases'
};
```

---

### Recommended Radix Primitives

**Start with these. Add others as needed.**

| Component | Radix Package | Priority |
|-----------|--------------|----------|
| Dialog/Modal | `@radix-ui/react-dialog` | High |
| Dropdown Menu | `@radix-ui/react-dropdown-menu` | High |
| Select | `@radix-ui/react-select` | High |
| Popover | `@radix-ui/react-popover` | High |
| Tooltip | `@radix-ui/react-tooltip` | High |
| Tabs | `@radix-ui/react-tabs` | High |
| Toast | `@radix-ui/react-toast` | High |
| Alert Dialog | `@radix-ui/react-alert-dialog` | Medium |
| Accordion | `@radix-ui/react-accordion` | Medium |
| Checkbox | `@radix-ui/react-checkbox` | Medium |
| Radio Group | `@radix-ui/react-radio-group` | Medium |
| Switch | `@radix-ui/react-switch` | Medium |
| Slider | `@radix-ui/react-slider` | Low |
| Progress | `@radix-ui/react-progress` | Low |
| Navigation Menu | `@radix-ui/react-navigation-menu` | Low |

---

### 2026 Component Library Standards

#### Design Tokens as Foundation

No more hardcoded `#3b82f6` or `16px`. Use design tokens—agnostic variables that store visual design data.

```typescript
const designTokenArchitecture = {
  standard: 'DTCG (Design Tokens Community Group)',
  benefit: 'Tokens work across CSS, Tailwind, iOS, Android',

  tiers: {
    global: {
      description: 'Raw values',
      examples: ['blue-500: #3b82f6', 'spacing-4: 16px', 'font-size-md: 14px']
    },
    semantic: {
      description: 'Intent-based aliases',
      examples: [
        'color-action-primary: {blue-500}',
        'color-feedback-error: {red-500}',
        'spacing-component-gap: {spacing-4}'
      ]
    },
    component: {
      description: 'Component-specific',
      examples: [
        'button-padding-lg: {spacing-4}',
        'card-border-radius: {radius-md}',
        'input-border-color: {color-border-default}'
      ]
    }
  },

  automation: ['Style Dictionary', 'Figma Variables', 'Tokens Studio']
};
```

```css
/* Token tiers in practice */
:root {
  /* Global tokens - raw values */
  --blue-500: 210 100% 50%;
  --blue-600: 210 100% 45%;
  --spacing-4: 1rem;
  --radius-md: 0.375rem;

  /* Semantic tokens - intent-based */
  --color-action-primary: var(--blue-500);
  --color-action-primary-hover: var(--blue-600);
  --color-feedback-success: var(--green-500);
  --color-feedback-error: var(--red-500);

  /* Component tokens */
  --button-bg-primary: var(--color-action-primary);
  --button-bg-primary-hover: var(--color-action-primary-hover);
  --button-padding-x: var(--spacing-4);
}

/* When brand changes from "Primary Blue" to "Deep Navy" */
/* Change ONE global token, everything updates */
```

#### Atomic & Composable API Design

Avoid "Mega-Components" with 50 props. Use compound components.

```typescript
// ❌ WRONG - Prop soup
<Modal
  title="Confirm Delete"
  showCloseIcon={true}
  showFooter={true}
  footerAlign="right"
  primaryButtonText="Delete"
  primaryButtonVariant="destructive"
  secondaryButtonText="Cancel"
  onPrimaryClick={handleDelete}
  onSecondaryClick={handleCancel}
  showOverlay={true}
  overlayBlur={true}
  size="medium"
  // ... 20 more props
/>

// ✅ CORRECT - Compound components
<Modal>
  <Modal.Header>
    <Modal.Title>Confirm Delete</Modal.Title>
    <Modal.CloseButton />
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this patient record?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
  </Modal.Footer>
</Modal>
```

| Approach | Pattern | Trade-off |
|----------|---------|-----------|
| **Prop-Heavy** | `<Modal title="Hi" showCloseIcon={true} />` | Rigid, hard to customize layout |
| **Compound** | `<Modal><Modal.Header />...</Modal>` | Flexible, more verbose |
| **Headless** | `useModal()` + your JSX | Maximum control, more work |

#### Documentation as Machine-Readable Experience

```typescript
const modernDocumentation = {
  interactivePlaygrounds: {
    tools: ['Storybook', 'Ladle'],
    benefit: 'Developers tweak props, see UI change in real-time'
  },

  aiFriendlyDocs: {
    requirement: 'Semantic HTML, clear hierarchy',
    benefit: 'AI assistants accurately suggest your components',
    pattern: 'JSDoc with @example blocks'
  },

  versioning: {
    labels: ['Experimental', 'Stable', 'Deprecated'],
    migrations: 'Provide codemods for breaking changes'
  }
};

// AI-friendly component documentation
/**
 * Primary button for user actions.
 *
 * @example
 * // Primary action
 * <Button variant="primary">Save Patient</Button>
 *
 * @example
 * // Destructive action
 * <Button variant="destructive">Delete Record</Button>
 *
 * @example
 * // With loading state
 * <Button disabled={isPending}>
 *   {isPending ? 'Saving...' : 'Save'}
 * </Button>
 */
```

#### Performance: Tree-Shaking & RSC Compatibility

```typescript
const performanceRequirements = {
  zeroRuntimeCSS: {
    approach: 'Build-time CSS (Tailwind, Vanilla Extract)',
    benefit: 'Smaller JavaScript bundle'
  },

  rscCompatibility: {
    requirement: 'Support React Server Components',
    pattern: 'Interactive components marked with "use client"',
    benefit: 'Improved LCP (Largest Contentful Paint)'
  },

  individualExports: {
    requirement: 'Users import only what they need',
    pattern: 'import { Button } from "@rx/ui"',
    antiPattern: 'Importing Button pulls in entire 500KB library'
  }
};

// Package structure for tree-shaking
// packages/ui/package.json
{
  "exports": {
    "./button": "./dist/button.js",
    "./dialog": "./dist/dialog.js",
    "./select": "./dist/select.js"
  },
  "sideEffects": false
}

// Consumer imports only what they need
import { Button } from '@rx/ui/button';
import { Dialog } from '@rx/ui/dialog';
```

#### Continuous Compliance in CI/CD

```typescript
const continuousCompliance = {
  visualRegressionTesting: {
    tool: 'Chromatic',
    pattern: 'Screenshot every component state',
    trigger: 'CI fails if visual change detected without approval'
  },

  automatedAccessibility: {
    tool: 'axe-core',
    coverage: '40-50% of common a11y issues',
    checks: ['Low contrast', 'Missing labels', 'Keyboard traps']
  },

  integration: `
    // In Storybook test-runner
    import { checkA11y } from '@storybook/addon-a11y';

    test('Button meets a11y requirements', async () => {
      await checkA11y(canvas);
    });
  `
};
```

---

### Common Pitfalls

#### 1. The "Prop Soup" Explosion

```typescript
// ❌ WRONG - Every variation is a prop
<Button
  primary
  big
  rounded
  iconLeft
  red
  outline
  shadowed
  loading
  fullWidth
  uppercase
/>
// Maintenance nightmare of nested ternary operators
// Developers must memorize massive API

// ✅ CORRECT - Composition
<Button variant="primary" size="lg">
  <Icon name="check" className="mr-2" />
  Save Changes
</Button>
```

**The Fix:** Compound components or explicit variant + size props. Not 20 boolean flags.

#### 2. Hardcoding the Brand

```typescript
// ❌ WRONG - Hex codes everywhere
const Button = styled.button`
  background: #3B82F6;
  color: #FFFFFF;
  padding: 8px 16px;
`;
// Marketing changes "Primary Blue" to "Deep Navy"
// Find and replace across 50 files

// ✅ CORRECT - Design tokens
const Button = styled.button`
  background: hsl(var(--color-action-primary));
  color: hsl(var(--color-action-primary-foreground));
  padding: var(--button-padding-y) var(--button-padding-x);
`;
// Change one token, everything updates
```

#### 3. High Framework Coupling

```typescript
// ❌ WRONG - Deeply tied to React 17 internals
const Modal = ({ children }) => {
  // Uses deprecated lifecycle methods
  // Uses legacy context API
  // Doesn't work with React 18 concurrent features
};
// Stuck on old React version forever

// ✅ CORRECT - Headless foundation
// Use Radix/Headless UI for logic
// They handle React version compatibility
// You just add styling layer
```

#### 4. The Accessibility Afterthought

```typescript
// ❌ WRONG - Custom select, no keyboard support
const CustomSelect = ({ options }) => (
  <div className="select-wrapper" onClick={toggleOpen}>
    {selectedOption}
    {isOpen && options.map(o => (
      <div onClick={() => select(o)}>{o.label}</div>
    ))}
  </div>
);
// Can't Tab to it, can't use arrow keys
// Screen readers see nothing

// ✅ CORRECT - Built on accessible primitives
import * as Select from '@radix-ui/react-select';

const AccessibleSelect = ({ options }) => (
  <Select.Root>
    <Select.Trigger>
      <Select.Value />
    </Select.Trigger>
    <Select.Content>
      {options.map(o => (
        <Select.Item key={o.value} value={o.value}>
          {o.label}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Root>
);
// Full keyboard navigation, screen reader support
```

#### 5. Speculative Architecture

```typescript
// ❌ WRONG - Build massive library before app
// Month 1: "Let's build the perfect Accordion"
// Month 2: "Let's add 20 animation options"
// Month 3: "Let's support RTL languages"
// Month 4: App launches, doesn't use Accordion at all

// ✅ CORRECT - Rule of Three
const ruleOfThree = {
  step1: 'Build component inline in first feature',
  step2: 'Copy-paste when needed in second feature',
  step3: 'On third use, extract to shared library',
  benefit: 'Only abstract what you actually need'
};
```

---

### AI-Assisted Development Pitfalls

#### 1. The Nested Trigger Trap

AI often nests button inside button when using Radix triggers.

```typescript
// ❌ AI generates this - button inside button!
<DropdownMenuTrigger>
  <Button>Open Menu</Button>
</DropdownMenuTrigger>
// Renders: <button><button>Open Menu</button></button>
// Console error, broken keyboard nav

// ✅ CORRECT - Use asChild
<DropdownMenuTrigger asChild>
  <Button>Open Menu</Button>
</DropdownMenuTrigger>
// Renders: <button>Open Menu</button>
// Radix passes trigger behavior to your Button
```

**Rule:** Always use `asChild` when putting custom components inside Radix triggers.

#### 2. Class War (Tailwind vs Library Defaults)

AI throws Tailwind at components without checking if the library handles it.

```typescript
// ❌ AI generates this - fighting the library
<DialogContent className="p-8 rounded-xl !bg-white">
  {/* Using !important to override library styles */}
  {/* Fighting CSS-in-JS with utility classes */}
</DialogContent>

// ✅ CORRECT - Work with the library
<DialogContent className="sm:max-w-md">
  {/* Only override what the library exposes */}
  {/* Check if there's a variant prop first */}
</DialogContent>
```

**Hint:** If you're using `!important` or complex overrides, you're fighting the architecture.

#### 3. Missing Controlled vs Uncontrolled Logic

AI mixes up state management patterns.

```typescript
// ❌ AI generates this - stuck component
<Select value={selectedValue}>
  {/* Passed value but no onChange */}
  {/* Component is now read-only */}
</Select>

// ❌ Also wrong - double control
const [value, setValue] = useState('');
<Select
  value={value}
  defaultValue="option1"  // Can't have both!
  onChange={setValue}
/>

// ✅ CORRECT - Controlled
<Select value={value} onValueChange={setValue}>
  {/* Your state drives the component */}
</Select>

// ✅ ALSO CORRECT - Uncontrolled
<Select defaultValue="option1">
  {/* Component manages its own state */}
</Select>
```

#### 4. ARIA Stripping

AI "cleans up" accessibility attributes it doesn't understand.

```typescript
// Original accessible component
<DialogContent
  aria-describedby="dialog-description"
  role="dialog"
  aria-modal="true"
>
  <DialogTitle id="dialog-title">Confirm</DialogTitle>
  <p id="dialog-description">Are you sure?</p>
</DialogContent>

// ❌ AI "cleans it up"
<DialogContent>
  <h2>Confirm</h2>  {/* Lost DialogTitle semantics */}
  <p>Are you sure?</p>  {/* Lost aria-describedby link */}
</DialogContent>
// Looks the same, invisible to screen readers
```

**Rule:** Never let AI remove ARIA attributes, `id` links, or semantic component wrappers.

#### 5. The Frankenstein Import

AI combines parts from incompatible libraries.

```typescript
// ❌ AI generates this - mixing libraries
import { Dialog } from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

<Dialog>
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <DialogContent>
          {/* Radix manages open/close state */}
          {/* Framer manages animation */}
          {/* They fight over the DOM */}
        </DialogContent>
      </motion.div>
    )}
  </AnimatePresence>
</Dialog>

// ✅ CORRECT - Use library's animation system
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="data-[state=open]:animate-in data-[state=closed]:animate-out">
    {/* Radix handles everything */}
    {/* Tailwind CSS animations */}
  </DialogContent>
</Dialog>
```

**Rule:** Stick to one library's ecosystem per feature.

---

### Healthcare-Specific Component Considerations

```typescript
const healthcareComponentRules = {
  statusIndicators: {
    requirement: 'Never rely on color alone',
    pattern: 'Color + icon + text label',
    reason: 'Color blindness affects 8% of male users'
  },

  criticalAlerts: {
    requirement: 'Allergies and warnings always visible',
    pattern: 'Persistent banner, not dismissible toast',
    reason: 'Clinical safety cannot be "dismissed"'
  },

  dataDisplay: {
    requirement: 'Always show units',
    pattern: '80 kg (not just "80")',
    reason: 'Ambiguous values cause dosing errors'
  },

  loadingStates: {
    requirement: 'Explicit "loading" vs "no data"',
    pattern: 'Skeleton with "Loading..." vs "No allergies recorded"',
    reason: 'Empty screen can be mistaken for "no allergies"'
  }
};

// Status badge with multiple indicators
const AllergyBadge = ({ severity }: { severity: 'mild' | 'moderate' | 'severe' }) => {
  const config = {
    mild: { icon: AlertCircle, color: 'yellow', label: 'Mild' },
    moderate: { icon: AlertTriangle, color: 'orange', label: 'Moderate' },
    severe: { icon: AlertOctagon, color: 'red', label: 'Severe' }
  };

  const { icon: Icon, color, label } = config[severity];

  return (
    <Badge className={`bg-${color}-100 text-${color}-800`}>
      <Icon className="w-4 h-4 mr-1" aria-hidden="true" />
      <span>{label}</span>
      <span className="sr-only">severity allergy</span>
    </Badge>
  );
};
```

---

### Component Library Comparison

| Approach | Customization | Bundle Size | A11y | Maintenance |
|----------|--------------|-------------|------|-------------|
| **Full Library (MUI)** | Limited | Large | Good | Their problem |
| **Headless (Radix)** | Full | Small | Excellent | Your styling |
| **Copy-Paste (shadcn)** | Full | Minimal | Excellent | Your code |
| **Custom Build** | Full | Varies | Your problem | Your problem |

---

### Component Library Checklist

Before publishing/updating components:

- [ ] Uses design tokens (no hardcoded colors/sizes)
- [ ] Three-tier tokens: global → semantic → component
- [ ] Built on accessible primitives (Radix/React Aria)
- [ ] Supports RSC (only interactive parts are 'use client')
- [ ] Tree-shakable (individual exports, no side effects)
- [ ] Compound component API (not prop soup)
- [ ] Uses `asChild` pattern for trigger composition
- [ ] Controlled AND uncontrolled modes supported
- [ ] All ARIA attributes preserved
- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrows)
- [ ] Focus visible states styled
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1)
- [ ] Touch targets minimum 44x44px
- [ ] Storybook stories for all variants
- [ ] Visual regression tests in CI (Chromatic)
- [ ] Axe-core accessibility tests passing
- [ ] JSDoc with @example for AI discoverability
- [ ] Healthcare: status uses color + icon + text
- [ ] Healthcare: units always displayed with values
- [ ] Healthcare: explicit loading vs empty states

---

## Storybook

### Purpose

**Develop components in isolation. Document visually. Test interactively.**

```typescript
const storybookPurpose = {
  development: 'Build components without spinning up the full app',
  documentation: 'Living documentation of all UI components',
  testing: 'Visual regression testing, interaction testing',
  collaboration: 'Designers and PMs can review components directly',
  isolation: 'Catch bugs before they reach the app'
};
```

---

### Setup in Core Packages Repo

Storybook lives in the `@rx/ui` package within `rx-platform-core`.

```
rx-platform-core/
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── button.tsx
│       │   ├── button.stories.tsx    # Stories alongside components
│       │   ├── dialog.tsx
│       │   ├── dialog.stories.tsx
│       │   └── ...
│       ├── .storybook/
│       │   ├── main.ts
│       │   ├── preview.ts
│       │   └── manager.ts
│       └── package.json
```

```typescript
// packages/ui/.storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',           // Accessibility testing
    '@storybook/addon-interactions',   // Interaction testing
    '@storybook/addon-designs'         // Figma integration
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'                    // Auto-generate docs
  }
};

export default config;
```

```typescript
// packages/ui/.storybook/preview.ts
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';    // Include Tailwind

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' }
      ]
    }
  },
  decorators: [
    (Story) => (
      <div className="font-sans antialiased">
        <Story />
      </div>
    )
  ]
};

export default preview;
```

---

### Story File Conventions

**Stories live alongside components. Same name, `.stories.tsx` suffix.**

```
button.tsx           →  button.stories.tsx
dialog.tsx           →  dialog.stories.tsx
data-table.tsx       →  data-table.stories.tsx
patient-card.tsx     →  patient-card.stories.tsx
```

---

### Story Structure

**Every component needs: Default, Variants, States, Edge Cases.**

```typescript
// src/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
    },
    disabled: { control: 'boolean' },
    asChild: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default state
export const Default: Story = {
  args: {
    children: 'Button'
  }
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔔</Button>
    </div>
  )
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true
  }
};

// Loading state (if applicable)
export const Loading: Story = {
  render: () => (
    <Button disabled>
      <span className="animate-spin mr-2">⏳</span>
      Loading...
    </Button>
  )
};

// With icon
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <span className="mr-2">📧</span>
        Email
      </Button>
      <Button variant="outline">
        Download
        <span className="ml-2">⬇️</span>
      </Button>
    </div>
  )
};
```

---

### Complex Component Stories

**For composed components, show realistic usage scenarios.**

```typescript
// src/data-table.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './data-table';
import { Badge } from './badge';

const meta: Meta<typeof DataTable> = {
  title: 'Composed/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Mock data
const prescriptions = [
  { id: '1', drug: 'Semaglutide 2.5mg', status: 'pending', date: '2024-01-15', cost: 150 },
  { id: '2', drug: 'Tirzepatide 5mg', status: 'shipped', date: '2024-01-14', cost: 200 },
  { id: '3', drug: 'Testosterone Cypionate', status: 'delivered', date: '2024-01-10', cost: 85 }
];

const columns = [
  { header: 'Drug', accessorKey: 'drug' },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <Badge variant={row.status === 'delivered' ? 'success' : 'default'}>
        {row.status}
      </Badge>
    )
  },
  { header: 'Date', accessorKey: 'date' },
  {
    header: 'Cost',
    accessorKey: 'cost',
    cell: ({ row }) => `$${row.cost.toFixed(2)}`
  }
];

// Default with data
export const Default: Story = {
  args: {
    data: prescriptions,
    columns
  }
};

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No prescriptions found'
  }
};

// Loading state
export const Loading: Story = {
  args: {
    data: [],
    columns,
    isLoading: true
  }
};

// With pagination
export const WithPagination: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: String(i + 1),
      drug: `Drug ${i + 1}`,
      status: ['pending', 'shipped', 'delivered'][i % 3],
      date: '2024-01-15',
      cost: 100 + i * 10
    })),
    columns,
    pageSize: 10
  }
};

// With selection
export const WithSelection: Story = {
  args: {
    data: prescriptions,
    columns,
    selectable: true,
    onSelectionChange: (selected) => console.log('Selected:', selected)
  }
};
```

---

### Healthcare Component Stories

**Domain-specific components need realistic healthcare context.**

```typescript
// src/patient-status-badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PatientStatusBadge } from './patient-status-badge';

const meta: Meta<typeof PatientStatusBadge> = {
  title: 'Healthcare/PatientStatusBadge',
  component: PatientStatusBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays patient status in a consistent, accessible format.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof PatientStatusBadge>;

export const Active: Story = {
  args: { status: 'active' }
};

export const Inactive: Story = {
  args: { status: 'inactive' }
};

export const Pending: Story = {
  args: { status: 'pending' }
};

export const OnHold: Story = {
  args: { status: 'on-hold' }
};

// All states together for comparison
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <PatientStatusBadge status="active" />
      <PatientStatusBadge status="inactive" />
      <PatientStatusBadge status="pending" />
      <PatientStatusBadge status="on-hold" />
    </div>
  )
};
```

---

### Interaction Testing

**Test user interactions directly in stories.**

```typescript
// src/dialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from './dialog';
import { Button } from './button';

const meta: Meta<typeof Dialog> = {
  title: 'Primitives/Dialog',
  component: Dialog,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog Title</DialogTitle>
        <p>Dialog content goes here.</p>
      </DialogContent>
    </Dialog>
  )
};

// Interaction test
export const OpensOnClick: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Test Dialog</DialogTitle>
        <p>This dialog was opened via interaction test.</p>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the trigger button
    const trigger = canvas.getByRole('button', { name: /open dialog/i });
    await userEvent.click(trigger);

    // Verify dialog opened
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();
    await expect(canvas.getByText('Test Dialog')).toBeVisible();
  }
};

// Test keyboard navigation
export const KeyboardNavigation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Keyboard Test</DialogTitle>
        <p>Press Escape to close.</p>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dialog
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);

    // Verify dialog is open
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();

    // Press Escape to close
    await userEvent.keyboard('{Escape}');

    // Verify dialog is closed (dialog should no longer be in document)
    // Note: Radix removes dialog from DOM when closed
  }
};
```

---

### Accessibility Testing

**Every story automatically gets a11y checks via the addon.**

```typescript
// .storybook/preview.ts additions
import { a11yConfig } from './a11y-config';

const preview: Preview = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // Enforce specific WCAG rules
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
          { id: 'aria-roles', enabled: true }
        ]
      }
    }
  }
};
```

**Check the "Accessibility" tab in Storybook for violations.**

```typescript
// For components with known accessibility requirements
export const AccessibleForm: Story = {
  render: () => (
    <form>
      <label htmlFor="email">Email</label>
      <Input id="email" type="email" aria-required="true" />
    </form>
  ),
  parameters: {
    a11y: {
      // Fail CI if any violations
      options: { runOnly: ['wcag2aa'] }
    }
  }
};
```

---

### Story Organization

**Organize by component type, not by page.**

```
📁 Primitives/          # Base UI components
   ├── Button
   ├── Input
   ├── Select
   ├── Dialog
   └── ...

📁 Composed/            # Multi-primitive components
   ├── DataTable
   ├── Combobox
   ├── DatePicker
   └── ...

📁 Forms/               # Form-specific components
   ├── FormField
   ├── FormError
   └── ...

📁 Healthcare/          # Domain-specific components
   ├── PatientStatusBadge
   ├── PrescriptionStatusBadge
   ├── DrugSearch
   ├── AllergyChips
   └── ...

📁 Layout/              # Layout components
   ├── Card
   ├── Separator
   └── ...
```

---

### Documentation in Stories

**Use JSDoc and MDX for component documentation.**

```typescript
// src/button.tsx - Add JSDoc for props
interface ButtonProps {
  /**
   * The visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

  /**
   * The size of the button
   * @default 'default'
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';

  /**
   * Render as a child component (for composition)
   * @default false
   */
  asChild?: boolean;
}
```

```mdx
{/* src/button.mdx - Extended documentation */}
import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ButtonStories from './button.stories';

<Meta of={ButtonStories} />

# Button

Buttons trigger actions. Use the right variant for the right context.

## When to Use

- **Default**: Primary actions (Submit, Save)
- **Secondary**: Less prominent actions
- **Destructive**: Dangerous actions (Delete, Remove)
- **Outline**: Alternative to secondary
- **Ghost**: Minimal visual weight
- **Link**: Navigation that looks like a link

## Examples

<Canvas of={ButtonStories.Default} />

## Props

<Controls />

## Accessibility

- All buttons are keyboard accessible (Enter/Space to activate)
- Use descriptive text, not just icons
- Disabled buttons remain focusable for screen readers
```

---

### Running Storybook

```bash
# Development
cd packages/ui
pnpm storybook              # Runs on localhost:6006

# Build static version
pnpm build-storybook        # Outputs to storybook-static/

# Run interaction tests
pnpm test-storybook         # Runs all play functions
```

---

### Publishing Storybook

**Deploy static Storybook for team access.**

```typescript
const publishingOptions = {
  // Option 1: Chromatic (recommended for visual testing)
  chromatic: {
    service: 'chromatic.com',
    features: ['Visual regression', 'Review workflow', 'Versioned history'],
    ci: 'npx chromatic --project-token=$CHROMATIC_TOKEN'
  },

  // Option 2: Static hosting
  staticHosting: {
    vercel: 'Deploy storybook-static/ folder',
    netlify: 'Deploy storybook-static/ folder',
    s3: 'Upload to S3 bucket with CloudFront'
  },

  // Option 3: GitHub Pages
  githubPages: {
    workflow: 'Build on push to main, deploy to gh-pages branch',
    url: 'https://rx-platform.github.io/rx-platform-core/'
  }
};
```

**CI workflow example:**

```yaml
# .github/workflows/storybook.yml
name: Storybook

on:
  push:
    branches: [main]
    paths:
      - 'packages/ui/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm --filter @rx/ui build-storybook

      # Deploy to Chromatic for visual testing
      - uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          workingDir: packages/ui
```

---

### Checklist: Adding a New Component

- [ ] Create component file (`button.tsx`)
- [ ] Create story file (`button.stories.tsx`)
- [ ] Add `tags: ['autodocs']` for auto-documentation
- [ ] Include all variants in stories
- [ ] Include edge cases (empty, loading, error, disabled)
- [ ] Add interaction tests for interactive components
- [ ] Verify accessibility tab shows no violations
- [ ] Export from package index

---

## Error Boundaries & Suspense

### Philosophy

**Errors should never crash the entire app. Graceful degradation, always.**

```typescript
const errorPhilosophy = {
  principle: 'Isolate failures, recover gracefully',

  layers: {
    route: 'error.tsx catches route-level errors',
    component: 'ErrorBoundary catches component errors',
    global: 'global-error.tsx catches root layout errors',
    suspense: 'Suspense handles loading states'
  },

  userExperience: {
    goal: 'User sees helpful message, not white screen',
    recovery: 'Offer retry, navigation, or support options',
    logging: 'All errors logged to monitoring service'
  }
};
```

---

### What Error Boundaries Do NOT Catch

**Error Boundaries are not a try/catch for your whole app.**

```typescript
const errorBoundaryLimitations = {
  // ❌ Does NOT catch these:
  doesNotCatch: {
    eventHandlers: 'Errors inside onClick, onChange, etc.',
    asyncCode: 'setTimeout, fetch, Promises, async/await',
    serverSideRendering: 'SSR errors (only catches client-side)',
    itselfCrashing: 'Cannot catch its own errors, only children'
  },

  // ✅ DOES catch these:
  doesCatch: {
    rendering: 'Errors during component render',
    lifecycle: 'Errors in lifecycle methods',
    constructors: 'Errors in child component constructors'
  }
};
```

**You still need try/catch for event handlers and async:**

```typescript
// Event handlers need their own error handling
const handleClick = async () => {
  try {
    await submitOrder();
  } catch (error) {
    // ErrorBoundary won't catch this!
    handleError(error);
  }
};

// Async operations need their own error handling
const fetchData = async () => {
  try {
    setLoading(true);
    const data = await api.get('/patients');
    setPatients(data);
  } catch (error) {
    // ErrorBoundary won't catch this!
    setError(parseError(error));
  } finally {
    setLoading(false); // ALWAYS reset loading in finally
  }
};
```

---

### Next.js Error Files

**Built-in error handling at the route level.**

```
app/
├── error.tsx              # Catches errors in this route and children
├── global-error.tsx       # Catches errors in root layout
├── not-found.tsx          # 404 page
├── loading.tsx            # Suspense fallback
│
├── patients/
│   ├── page.tsx
│   ├── error.tsx          # Catches errors only in /patients
│   └── loading.tsx        # Loading state for /patients
│
└── prescriptions/
    ├── page.tsx
    ├── error.tsx          # Catches errors only in /prescriptions
    └── [id]/
        ├── page.tsx
        └── error.tsx      # Catches errors only in /prescriptions/[id]
```

---

### Route Error Boundary (error.tsx)

**Catches errors in page.tsx and child components.**

```typescript
// app/patients/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@rx/ui';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const PatientError = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // Log to error monitoring service
    logErrorToService(error, {
      route: '/patients',
      digest: error.digest
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <AlertTriangle className="h-12 w-12 text-destructive" />

      <h2 className="text-xl font-semibold">Something went wrong</h2>

      <p className="text-muted-foreground text-center max-w-md">
        We couldn't load the patient information. This has been reported
        and we're working on it.
      </p>

      <div className="flex gap-2">
        <Button onClick={reset}>
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <a href="/dashboard">Go to Dashboard</a>
        </Button>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 p-4 bg-muted rounded-md max-w-lg">
          <summary className="cursor-pointer text-sm font-medium">
            Error Details
          </summary>
          <pre className="mt-2 text-xs overflow-auto">
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
};

export default PatientError;
```

**Key points:**
- Must be a Client Component (`'use client'`)
- Receives `error` and `reset` props
- `reset()` attempts to re-render the route segment
- `error.digest` is a hash for server-side error correlation

---

### Global Error Boundary (global-error.tsx)

**Catches errors in the root layout. Last resort.**

```typescript
// app/global-error.tsx
'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    // Log critical error
    logErrorToService(error, {
      severity: 'critical',
      route: 'global',
      digest: error.digest
    });
  }, [error]);

  // Note: global-error must include its own <html> and <body>
  // because root layout has failed
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>

          <p className="text-muted-foreground text-center max-w-md">
            We're experiencing technical difficulties.
            Please try refreshing the page.
          </p>

          <button
            onClick={reset}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Refresh Page
          </button>

          <a href="/" className="text-sm underline">
            Return to Home
          </a>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
```

---

### Component Error Boundary (react-error-boundary)

**Use the `react-error-boundary` library instead of writing class components.**

```bash
pnpm add react-error-boundary
```

```typescript
// components/error-fallback.tsx
'use client';

import { FallbackProps } from 'react-error-boundary';
import { Button } from '@rx/ui';
import { AlertCircle } from 'lucide-react';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert" className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <span className="font-medium">Something went wrong</span>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
          {error.message}
        </pre>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={resetErrorBoundary}
        className="mt-2"
      >
        Try Again
      </Button>
    </div>
  );
};

export { ErrorFallback };
```

**Usage with state reset:**

```typescript
'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/error-fallback';
import { useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/store';

const PatientDashboard = ({ patientId }: { patientId: string }) => {
  const queryClient = useQueryClient();
  const clearPatientState = useStore(state => state.clearPatientState);

  const handleReset = () => {
    // CRITICAL: Clear any "poisoned" state before retry
    clearPatientState();

    // Invalidate queries that might have bad data
    queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Each section fails independently */}
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={handleReset}
        onError={(error, info) => {
          // Log to monitoring service
          logErrorToService(error, {
            componentStack: info.componentStack,
            patientId
          });
        }}
      >
        <PrescriptionList patientId={patientId} />
      </ErrorBoundary>

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={handleReset}
      >
        <AllergyWidget patientId={patientId} />
      </ErrorBoundary>

      {/* Custom inline fallback */}
      <ErrorBoundary
        fallback={<div className="p-4 bg-muted rounded">Orders unavailable</div>}
      >
        <OrderHistory patientId={patientId} />
      </ErrorBoundary>
    </div>
  );
};
```

**Key props:**
- `FallbackComponent` - Component to render on error
- `onReset` - Called when user clicks retry (CLEAR STATE HERE)
- `onError` - Called when error is caught (LOG HERE)
- `resetKeys` - Array of values that trigger auto-reset when changed

---

### Suspense Boundaries

**Handle loading states gracefully.**

```typescript
// app/patients/[id]/page.tsx
import { Suspense } from 'react';
import { PatientHeader } from './patient-header';
import { PrescriptionList } from './prescription-list';
import { OrderHistory } from './order-history';
import { Skeleton } from '@rx/ui';

const PatientPage = async ({ params }: { params: { id: string } }) => {
  // This data is needed for the whole page
  const patient = await getPatient(params.id);

  return (
    <div>
      <PatientHeader patient={patient} />

      {/* Each section loads independently */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Suspense fallback={<PrescriptionListSkeleton />}>
          <PrescriptionList patientId={params.id} />
        </Suspense>

        <Suspense fallback={<OrderHistorySkeleton />}>
          <OrderHistory patientId={params.id} />
        </Suspense>
      </div>
    </div>
  );
};

// Skeleton components
const PrescriptionListSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-16 w-full" />
  </div>
);

const OrderHistorySkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-24 w-full" />
  </div>
);
```

---

### Combining Error Boundaries with Suspense

**Best practice: Wrap Suspense with ErrorBoundary.**

```typescript
const PatientPage = async ({ params }: { params: { id: string } }) => {
  const patient = await getPatient(params.id);

  return (
    <div>
      <PatientHeader patient={patient} />

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Error boundary outside, Suspense inside */}
        <ErrorBoundary fallback={<PrescriptionErrorState />}>
          <Suspense fallback={<PrescriptionListSkeleton />}>
            <PrescriptionList patientId={params.id} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<OrderErrorState />}>
          <Suspense fallback={<OrderHistorySkeleton />}>
            <OrderHistory patientId={params.id} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

// Custom error states
const PrescriptionErrorState = () => (
  <div className="p-4 border rounded-md bg-muted">
    <p className="text-muted-foreground">
      Unable to load prescriptions. <a href="#" className="underline">Retry</a>
    </p>
  </div>
);
```

---

### Loading States (loading.tsx)

**Automatic Suspense boundary for route segments.**

```typescript
// app/patients/loading.tsx
import { Skeleton } from '@rx/ui';

const PatientsLoading = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Filter skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Table skeleton */}
      <div className="border rounded-md">
        <Skeleton className="h-12 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full border-t" />
        ))}
      </div>
    </div>
  );
};

export default PatientsLoading;
```

---

### Not Found (not-found.tsx)

**Custom 404 pages.**

```typescript
// app/not-found.tsx
import { Button } from '@rx/ui';
import { FileQuestion } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />

      <h1 className="text-2xl font-semibold">Page Not Found</h1>

      <p className="text-muted-foreground text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Button asChild>
        <a href="/dashboard">Go to Dashboard</a>
      </Button>
    </div>
  );
};

export default NotFound;
```

```typescript
// app/patients/[id]/not-found.tsx - Route-specific 404
import { Button } from '@rx/ui';

const PatientNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h1 className="text-xl font-semibold">Patient Not Found</h1>

      <p className="text-muted-foreground">
        This patient record doesn't exist or you don't have access.
      </p>

      <Button asChild>
        <a href="/patients">View All Patients</a>
      </Button>
    </div>
  );
};

export default PatientNotFound;
```

**Trigger from Server Component:**

```typescript
// app/patients/[id]/page.tsx
import { notFound } from 'next/navigation';

const PatientPage = async ({ params }: { params: { id: string } }) => {
  const patient = await getPatient(params.id);

  if (!patient) {
    notFound(); // Renders not-found.tsx
  }

  return <PatientDetails patient={patient} />;
};
```

---

### Error Logging Service

**Send errors to monitoring (Sentry, DataDog, etc.)**

```typescript
// lib/error-logging.ts
interface ErrorContext {
  route?: string;
  userId?: string;
  digest?: string;
  severity?: 'info' | 'warning' | 'error' | 'critical';
  extra?: Record<string, unknown>;
}

const logErrorToService = async (
  error: Error,
  context: ErrorContext = {}
) => {
  // In development, just log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', error, context);
    return;
  }

  // In production, send to monitoring service
  try {
    // Sentry example
    // Sentry.captureException(error, {
    //   tags: { route: context.route },
    //   user: { id: context.userId },
    //   extra: context.extra
    // });

    // Or custom endpoint
    await fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        ...context,
        timestamp: new Date().toISOString()
      })
    });
  } catch (loggingError) {
    // Don't throw if logging fails
    console.error('Failed to log error:', loggingError);
  }
};

export { logErrorToService };
```

---

### Error Recovery Patterns

```typescript
const recoveryPatterns = {
  // Pattern 1: Retry with reset()
  retryReset: {
    when: 'Transient errors (network, timeout)',
    how: 'Call reset() to re-render the segment'
  },

  // Pattern 2: Refresh data
  refreshData: {
    when: 'Stale data errors',
    how: 'router.refresh() to refetch server data'
  },

  // Pattern 3: Navigate away
  navigate: {
    when: 'Unrecoverable error in this route',
    how: 'Provide link to safe route (dashboard, home)'
  },

  // Pattern 4: Retry with state reset
  retryWithReset: {
    when: 'Error caused by bad state',
    how: 'Clear relevant state before retry'
  }
};
```

```typescript
// Example: Retry with router.refresh()
'use client';

import { useRouter } from 'next/navigation';

const ErrorWithRefresh = ({ error, reset }: ErrorProps) => {
  const router = useRouter();

  const handleRetry = () => {
    // Refresh server data
    router.refresh();
    // Then reset error boundary
    reset();
  };

  return (
    <div>
      <p>Failed to load data</p>
      <Button onClick={handleRetry}>Retry</Button>
    </div>
  );
};
```

---

### Error Boundary Placement Strategy

```typescript
const placementStrategy = {
  // Route level (error.tsx)
  routeLevel: {
    catches: 'All errors in page.tsx and children',
    use: 'Default for most routes'
  },

  // Section level (ErrorBoundary component)
  sectionLevel: {
    catches: 'Errors in one section, rest of page works',
    use: 'Independent widgets, non-critical features'
  },

  // Component level (ErrorBoundary around single component)
  componentLevel: {
    catches: 'Errors in one specific component',
    use: 'Third-party components, experimental features'
  },

  // Global level (global-error.tsx)
  globalLevel: {
    catches: 'Errors in root layout',
    use: 'Last resort, app is broken'
  }
};
```

**Visual:**

```
┌─────────────────────────────────────────────────┐
│  global-error.tsx (root layout failures)        │
│  ┌─────────────────────────────────────────────┐│
│  │  error.tsx (route failures)                 ││
│  │  ┌─────────────────────────────────────────┐││
│  │  │  ErrorBoundary (section failures)       │││
│  │  │  ┌─────────────────────────────────────┐│││
│  │  │  │  Component (individual failures)    ││││
│  │  │  └─────────────────────────────────────┘│││
│  │  └─────────────────────────────────────────┘││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

---

### Healthcare-Specific Error Handling

```typescript
const healthcareErrorHandling = {
  // PHI-related errors - be vague to users
  phiErrors: {
    internalLog: 'Patient pat_123 access denied for user usr_456',
    userMessage: 'You do not have permission to view this record'
    // Never expose patient IDs or PHI in user-facing errors
  },

  // Critical medication errors - escalate immediately
  medicationErrors: {
    example: 'Drug interaction check failed',
    handling: 'Block action, log to compliance, alert pharmacist'
  },

  // Prescription errors - never lose data
  prescriptionErrors: {
    example: 'Failed to save prescription',
    handling: 'Save to local draft, retry, notify user of draft status'
  }
};
```

```typescript
// Example: Prescription form with recovery
'use client';

const PrescriptionFormWithRecovery = () => {
  const [draft, setDraft] = useLocalStorage<PrescriptionDraft | null>(
    'prescription-draft',
    null
  );

  const handleSubmitError = (error: Error) => {
    // Save to local storage as backup
    setDraft(currentFormData);

    // Log to monitoring
    logErrorToService(error, {
      severity: 'error',
      extra: { hasDraft: true }
    });

    // Show user-friendly message with recovery option
    toast.error(
      'Failed to save prescription. Your draft has been saved locally.',
      {
        action: {
          label: 'Retry',
          onClick: () => submitPrescription(currentFormData)
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {draft && (
        <div className="bg-yellow-50 p-2 rounded mb-4">
          You have an unsaved draft.
          <Button variant="link" onClick={restoreDraft}>
            Restore
          </Button>
        </div>
      )}
      {/* Form fields */}
    </form>
  );
};
```

---

### Common Mistakes to Avoid

#### 1. Empty Catch Blocks (Silent Failures)

**Never swallow errors. The app becomes a zombie.**

```typescript
// ❌ WRONG: Silent failure - user clicks, nothing happens
const handleSubmit = async () => {
  try {
    await submitOrder();
  } catch (error) {
    console.log(error); // Just logging is NOT handling
  }
};

// ✅ CORRECT: Always handle or re-throw
const handleSubmit = async () => {
  try {
    await submitOrder();
  } catch (error) {
    // Option 1: Show user feedback
    toast.error(parseErrorMessage(error));

    // Option 2: Re-throw to error boundary
    throw error;

    // Option 3: Update error state
    setError(parseErrorMessage(error));
  }
};
```

#### 2. Toast Overload Loop

**If 10 API calls fail, don't show 10 toasts.**

```typescript
// ❌ WRONG: Toast spam
const fetchAllData = async () => {
  for (const id of patientIds) {
    try {
      await fetchPatient(id);
    } catch (error) {
      toast.error('Failed to load patient'); // 10 toasts!
    }
  }
};

// ✅ CORRECT: Deduplicate errors
const fetchAllData = async () => {
  const errors: Error[] = [];

  for (const id of patientIds) {
    try {
      await fetchPatient(id);
    } catch (error) {
      errors.push(error);
    }
  }

  if (errors.length > 0) {
    toast.error(`Failed to load ${errors.length} patients`); // One toast
  }
};

// ✅ ALSO CORRECT: Use idempotent toast IDs
toast.error('Failed to load data', { id: 'load-error' }); // Same ID = no duplicate
```

#### 3. Forgetting to Reset Loading State

**Infinite spinner is effectively an error.**

```typescript
// ❌ WRONG: Spinner forever on error
const fetchData = async () => {
  setLoading(true);
  try {
    const data = await api.get('/patients');
    setPatients(data);
  } catch (error) {
    setError(error); // Forgot setLoading(false)!
  }
};

// ✅ CORRECT: Always use finally
const fetchData = async () => {
  try {
    setLoading(true);
    const data = await api.get('/patients');
    setPatients(data);
  } catch (error) {
    setError(parseErrorMessage(error));
  } finally {
    setLoading(false); // ALWAYS runs
  }
};
```

#### 4. Assuming Error Shape

**Errors can be anything. Defend against non-standard errors.**

```typescript
// ❌ WRONG: Assumes error has .message
const handleError = (error: unknown) => {
  toast.error(error.message); // Crashes if error is a string!
};

// ✅ CORRECT: Defensive error parsing
const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unexpected error occurred';
};

const handleError = (error: unknown) => {
  toast.error(parseErrorMessage(error));
};
```

#### 5. Not Clearing State on Retry

**If bad data crashed the app, retrying will crash again.**

```typescript
// ❌ WRONG: Retry without clearing state
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => {
    // Does nothing - poisoned state remains!
  }}
>
  <BrokenComponent />
</ErrorBoundary>

// ✅ CORRECT: Clear relevant state before retry
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => {
    // Clear the state that caused the crash
    store.clearPatientData();
    queryClient.removeQueries({ queryKey: ['patient'] });
    setLocalError(null);
  }}
>
  <PatientComponent />
</ErrorBoundary>
```

#### 6. Error Boundary Placement

**Too high = entire app crashes. Too low = micro-management hell.**

```typescript
// ❌ WRONG: One boundary at root - sidebar crash kills everything
<ErrorBoundary>
  <App /> {/* Everything dies together */}
</ErrorBoundary>

// ❌ WRONG: Boundary around every button
<ErrorBoundary>
  <button>Save</button> {/* Overkill */}
</ErrorBoundary>

// ✅ CORRECT: Boundary around logical features
<div className="grid grid-cols-12">
  <ErrorBoundary fallback={<SidebarError />}>
    <Sidebar /> {/* Fails independently */}
  </ErrorBoundary>

  <main>
    <ErrorBoundary fallback={<ContentError />}>
      <Content /> {/* Fails independently */}
    </ErrorBoundary>
  </main>
</div>
```

#### 7. Retry Without User Feedback

**"Something went wrong" with no way out.**

```typescript
// ❌ WRONG: No recovery options
const ErrorPage = () => (
  <div>Something went wrong.</div>
);

// ✅ CORRECT: Always provide recovery paths
const ErrorPage = ({ reset }: { reset: () => void }) => (
  <div>
    <p>Something went wrong.</p>
    <div className="flex gap-2">
      <Button onClick={reset}>Try Again</Button>
      <Button variant="outline" asChild>
        <a href="/dashboard">Go to Dashboard</a>
      </Button>
      <Button variant="link" asChild>
        <a href="/support">Contact Support</a>
      </Button>
    </div>
  </div>
);
```

---

### Defensive Error Utilities

**Standard utilities for the `@rx/utils` package:**

```typescript
// packages/utils/src/error.ts

/**
 * Safely extract error message from any thrown value
 */
const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    if ('error' in error && typeof error.error === 'string') {
      return error.error;
    }
  }
  return 'An unexpected error occurred';
};

/**
 * Check if error is a specific API error code
 */
const isApiError = (error: unknown, code: string): boolean => {
  return (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    error.code === code
  );
};

/**
 * Check if error is a network error
 */
const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return (
      error.name === 'NetworkError' ||
      error.message.includes('fetch') ||
      error.message.includes('network')
    );
  }
  return false;
};

/**
 * Create Error from unknown value (for re-throwing)
 */
const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  return new Error(parseErrorMessage(error));
};

export { parseErrorMessage, isApiError, isNetworkError, toError };
```

---

### Checklist: Error Handling Setup

**Route-level:**
- [ ] `global-error.tsx` at app root
- [ ] `error.tsx` for each major route segment
- [ ] `not-found.tsx` at app root and key routes
- [ ] `loading.tsx` for each route with async data

**Component-level:**
- [ ] `react-error-boundary` installed
- [ ] ErrorBoundary wrapping independent features
- [ ] `onReset` clears relevant state

**Utilities:**
- [ ] `parseErrorMessage()` in `@rx/utils`
- [ ] `logErrorToService()` configured
- [ ] Error monitoring (Sentry/DataDog) connected

**UI/UX:**
- [ ] Skeleton components for loading states
- [ ] User-friendly error messages (no stack traces in prod)
- [ ] Recovery options (retry, navigate) in all error states
- [ ] Toast deduplication (use IDs or aggregate)

**Patterns:**
- [ ] No empty catch blocks
- [ ] `finally` blocks reset loading states
- [ ] Defensive error parsing for unknown types

---

## API Design Standards

### REST Conventions

```typescript
const restConventions = {
  // Resource naming - plural nouns, lowercase, hyphens
  resources: {
    correct: '/api/v1/patients',
    correct: '/api/v1/prescription-orders',
    wrong: '/api/v1/getPatients',      // no verbs
    wrong: '/api/v1/patient',           // use plural
    wrong: '/api/v1/prescription_orders' // no underscores
  },

  // HTTP methods
  methods: {
    GET: 'Read (list or single)',
    POST: 'Create',
    PUT: 'Full replace',
    PATCH: 'Partial update',
    DELETE: 'Remove'
  },

  // Nested resources - max 2 levels deep
  nesting: {
    correct: '/api/v1/patients/{patientId}/prescriptions',
    wrong: '/api/v1/patients/{id}/prescriptions/{id}/refills/{id}/history'
  }
};
```

### API Versioning

```typescript
// Version in URL path, not headers
const versioningRules = {
  format: '/api/v{major}/',
  current: '/api/v1/',

  // Breaking changes require new version
  breakingChanges: [
    'Removing a field',
    'Changing field type',
    'Changing required/optional status',
    'Removing an endpoint',
    'Changing authentication method'
  ],

  // Non-breaking changes stay in current version
  nonBreaking: [
    'Adding optional fields',
    'Adding new endpoints',
    'Adding new enum values (if clients handle unknown)',
    'Deprecating (not removing) fields'
  ],

  // Deprecation policy
  deprecation: {
    noticeRequired: '6 months',
    headerToAdd: 'Deprecation: true',
    sunsetHeader: 'Sunset: Sat, 01 Jan 2028 00:00:00 GMT'
  }
};
```

### Request/Response Format

```typescript
// Standard success response
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      totalPages: number;
      totalItems: number;
    };
    requestId: string;
    timestamp: string;
  };
}

// Standard error response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;           // Machine-readable: 'PATIENT_NOT_FOUND'
    message: string;        // Human-readable: 'Patient with ID xyz not found'
    details?: unknown;      // Additional context
    field?: string;         // For validation errors
    requestId: string;
  };
}

// Example responses
const exampleSuccess: ApiResponse<Patient> = {
  success: true,
  data: {
    id: 'pat_123',
    firstName: 'John',
    lastName: 'Doe'
  },
  meta: {
    requestId: 'req_abc123',
    timestamp: '2024-01-15T10:30:00Z'
  }
};

const exampleError: ApiErrorResponse = {
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid date of birth format',
    field: 'dateOfBirth',
    details: { expected: 'YYYY-MM-DD', received: '01/15/1990' },
    requestId: 'req_abc123'
  }
};
```

### HTTP Status Codes

```typescript
const statusCodes = {
  // Success
  200: 'OK - GET, PUT, PATCH success',
  201: 'Created - POST success',
  204: 'No Content - DELETE success',

  // Client errors
  400: 'Bad Request - Validation failed',
  401: 'Unauthorized - No/invalid auth token',
  403: 'Forbidden - Valid token but insufficient permissions',
  404: 'Not Found - Resource does not exist',
  409: 'Conflict - Duplicate or state conflict',
  422: 'Unprocessable Entity - Business rule violation',
  429: 'Too Many Requests - Rate limited',

  // Server errors
  500: 'Internal Server Error - Unexpected error',
  502: 'Bad Gateway - Upstream service error',
  503: 'Service Unavailable - Maintenance/overload',
  504: 'Gateway Timeout - Upstream timeout'
};

// When to use 400 vs 422
const validationVsBusinessRule = {
  400: 'Invalid JSON, missing required field, wrong type',
  422: 'Valid request but business rule prevents it',

  examples: {
    400: 'dateOfBirth is not a valid date string',
    422: 'Patient must be 18+ to order this medication'
  }
};
```

### Pagination

```typescript
// Cursor-based pagination (preferred for large datasets)
interface CursorPaginationParams {
  cursor?: string;        // Opaque cursor from previous response
  limit?: number;         // Default 20, max 100
}

interface CursorPaginationMeta {
  nextCursor: string | null;
  hasMore: boolean;
  limit: number;
}

// Offset pagination (for admin UIs, small datasets)
interface OffsetPaginationParams {
  page?: number;          // Default 1
  pageSize?: number;      // Default 20, max 100
}

interface OffsetPaginationMeta {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

// Example: GET /api/v1/patients?cursor=abc123&limit=20
```

### Filtering & Sorting

```typescript
// Filtering via query params
const filteringConventions = {
  // Simple equality
  equality: '?status=active',

  // Multiple values (OR)
  multipleValues: '?status=active,pending',

  // Comparison operators
  comparison: {
    gt: '?createdAt[gt]=2024-01-01',
    gte: '?createdAt[gte]=2024-01-01',
    lt: '?createdAt[lt]=2024-12-31',
    lte: '?createdAt[lte]=2024-12-31'
  },

  // Text search
  search: '?q=john+doe',

  // Sorting
  sort: '?sort=-createdAt,lastName',  // - prefix for descending

  // Field selection (sparse fieldsets)
  fields: '?fields=id,firstName,lastName'
};
```

### Idempotency

```typescript
// All POST/PATCH requests should support idempotency keys
interface IdempotencyRequirements {
  header: 'Idempotency-Key';
  format: 'UUID v4';
  ttl: '24 hours';

  // Server behavior
  behavior: {
    firstRequest: 'Process and store result with key',
    duplicateRequest: 'Return stored result, do not reprocess',
    expiredKey: 'Process as new request'
  };
}

// Example request
// POST /api/v1/orders
// Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
//
// { "patientId": "pat_123", "items": [...] }
```

---

### Common Mistakes to Avoid

#### 1. Using the Wrong HTTP Verbs

**The "everything is a POST" mistake.**

```typescript
// ❌ WRONG: GET requests should NEVER mutate data
// Browsers and CDNs may pre-fetch GET links - this could accidentally delete data!
'GET /delete-user?id=10'
'GET /api/users/123/deactivate'

// ✅ CORRECT: Use appropriate verbs
'DELETE /api/v1/users/123'
'PATCH /api/v1/users/123 { "status": "inactive" }'

const httpVerbRules = {
  GET: 'Fetch data (safe, idempotent, cacheable)',
  POST: 'Create new resource',
  PUT: 'Replace entire resource',
  PATCH: 'Partial update',
  DELETE: 'Remove resource'
};
```

#### 2. Inconsistent Naming & Casing

**Pick one convention and enforce it everywhere.**

```typescript
// ❌ WRONG: Mixed casing across endpoints
// Endpoint A returns: { "user_id": 1, "first_name": "John" }
// Endpoint B returns: { "profileId": 1, "firstName": "John" }

// ✅ CORRECT: Consistent conventions
const casingStandard = {
  urls: 'kebab-case',         // /api/v1/user-profiles
  jsonProperties: 'camelCase', // { "userId": 1, "firstName": "John" }
  queryParams: 'camelCase',    // ?pageSize=20&sortBy=createdAt
  headers: 'Kebab-Pascal-Case' // Authorization, Content-Type, X-Request-Id
};

// ALL endpoints return the same shape
interface UserResponse {
  id: string;
  firstName: string;      // camelCase
  lastName: string;       // camelCase
  dateOfBirth: string;    // camelCase
  createdAt: string;      // camelCase
}
```

#### 3. The "200 OK" Liar

**The most frustrating mistake for frontend developers.**

```typescript
// ❌ WRONG: Returns 200 but body contains error
// Response: 200 OK
// Body: { "error": "Unauthorized", "success": false }

// This breaks automatic error handling:
const response = await fetch('/api/users');
// response.ok is TRUE even though it failed!

// ✅ CORRECT: Use proper status codes
// Response: 401 Unauthorized
// Body: { "success": false, "error": { "code": "UNAUTHORIZED", "message": "..." } }

// Now this works:
const response = await fetch('/api/users');
if (!response.ok) {
  // Automatically catches 4xx/5xx errors
  throw new Error(`HTTP ${response.status}`);
}
```

#### 4. The "God Object" Response

**Never pipe database rows directly to responses.**

```typescript
// ❌ WRONG: SELECT * and send everything
const getUser = async (id: string) => {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.json(user); // Exposes password_hash, internal_notes, etc!
};

// ✅ CORRECT: Use DTOs (Data Transfer Objects)
interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Explicitly list what's safe to expose
}

const toUserDTO = (user: UserRow): UserDTO => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email
  // password_hash, internal_notes, etc. are NOT included
});

const getUser = async (id: string) => {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.json({ success: true, data: toUserDTO(user) });
};
```

#### 5. Flat Lists Instead of Objects

**Always wrap responses in an object for extensibility.**

```typescript
// ❌ WRONG: Top-level array
// Response: [{ "id": 1 }, { "id": 2 }]

// Problem: Can't add metadata without breaking clients
// Response: [{ "id": 1 }, { "id": 2 }] ← no room for pagination!

// ✅ CORRECT: Top-level object
// Response:
{
  "success": true,
  "data": [{ "id": 1 }, { "id": 2 }],
  "meta": {
    "total": 100,
    "page": 1,
    "hasMore": true
  }
}

// Now you can add fields without breaking existing clients
```

#### 6. Offset Pagination at Scale

**Offset pagination breaks with large, frequently-updated datasets.**

```typescript
// ❌ PROBLEMATIC: Offset pagination
// Page 1: SELECT * FROM orders LIMIT 10 OFFSET 0
// Page 2: SELECT * FROM orders LIMIT 10 OFFSET 10
//
// If a new order is inserted while user is on page 1,
// page 2 will show a duplicate item!

// ✅ CORRECT: Cursor-based pagination for large/live datasets
// First request: GET /api/v1/orders?limit=10
// Response includes: { "nextCursor": "ord_abc123" }
// Next request: GET /api/v1/orders?cursor=ord_abc123&limit=10

const paginationGuidelines = {
  cursorBased: {
    use: 'Large datasets, real-time data, infinite scroll',
    pros: 'Stable results, performant at any depth',
    cons: 'Cannot jump to arbitrary page'
  },
  offsetBased: {
    use: 'Small datasets, admin dashboards, "Page X of Y" UI',
    pros: 'Can jump to any page, total count available',
    cons: 'Unstable with inserts/deletes, slow at high offsets'
  }
};
```

#### 7. Undefined vs Explicit False

**The "Property Discovery" problem.**

```typescript
// ❌ WRONG: Property only exists when true
// Admin user: { "id": 1, "isAdmin": true }
// Normal user: { "id": 2 } ← isAdmin is undefined

// Frontend has to guess:
if (user.isAdmin === undefined) {
  // Is the user not an admin? Or is the API broken?
}

// ✅ CORRECT: Always return explicit boolean values
// Admin user: { "id": 1, "isAdmin": true }
// Normal user: { "id": 2, "isAdmin": false }

// Frontend is simple:
if (user.isAdmin) {
  showAdminPanel();
}

// Apply this to all boolean properties:
interface UserResponse {
  id: string;
  isAdmin: boolean;       // Always present
  isVerified: boolean;    // Always present
  canPrescribe: boolean;  // Always present
  hasAcceptedTerms: boolean;
}
```

---

### Quick Reference: Bad vs Good

| Aspect | ❌ Bad | ✅ Good |
|--------|--------|---------|
| **URL** | `/getUserData?id=5` | `/api/v1/users/5` |
| **Status** | Always 200 | 201 for Created, 4xx for errors |
| **Auth** | API key in URL query | `Authorization` header |
| **JSON Casing** | `snake_case` or mixed | `camelCase` |
| **URL Casing** | `camelCase` or mixed | `kebab-case` |
| **Updates** | `POST /update-email` | `PATCH /users/5` |
| **Booleans** | `undefined` when false | Explicit `false` |
| **Lists** | `[...]` top-level | `{ "data": [...] }` |
| **Errors** | `{ "error": "..." }` with 200 | Proper 4xx/5xx status |

---

### AI-Assisted Development Pitfalls

**When using AI to generate API code, watch for these patterns.**

AI takes the path of least resistance. Without explicit constraints, it will:

```typescript
const aiPitfalls = {
  // 1. Kitchen Sink Response
  // AI returns entire database objects because it's easier
  problem: 'No DTO specified → AI leaks password_hash, internal_notes, etc.',
  fix: 'Always ask for explicit DTOs. "Create a UserDTO that only exposes..."',

  // 2. Chameleon Casing
  // AI shifts conventions mid-conversation without a style guide
  problem: 'GET /user_profile in one file, POST /updateUserProfile in another',
  fix: 'Establish casing rules in project context. Reference this doc.',

  // 3. RPC-Style URLs
  // Plain English prompts produce RPC patterns
  problem: '"Delete the user" → POST /deleteUser?id=10',
  fix: 'Explicitly request REST: "Create a REST endpoint to delete users"',

  // 4. Happy Path Obsession
  // AI is optimistic, treats errors as afterthought
  problem: 'Returns 200 OK with error in body, no error handling',
  fix: 'Always ask: "Include proper error responses with correct status codes"',

  // 5. Versionless Iteration
  // Fast iteration ignores API contracts
  problem: 'AI "updates the vibe" of a response, breaking existing clients',
  fix: 'Enforce /api/v1/ prefix. Ask: "Is this a breaking change?"'
};
```

**Prompting patterns that prevent these issues:**

```typescript
// ❌ VAGUE: Leads to kitchen sink + RPC patterns
'Create an endpoint to get user data'

// ✅ EXPLICIT: Forces proper patterns
`Create a REST endpoint:
- GET /api/v1/users/:id
- Return UserDTO (id, firstName, lastName, email only)
- 200 for success, 404 if not found, 401 if unauthorized
- Follow camelCase for JSON, kebab-case for URLs`

// ❌ VAGUE: AI writes happy path only
'Add a create order endpoint'

// ✅ EXPLICIT: Forces error handling
`Create POST /api/v1/orders:
- Validate request body with Zod schema
- Return 201 with OrderDTO on success
- Return 400 with validation errors
- Return 409 if duplicate idempotency key
- Return 422 if business rule violated (e.g., patient not eligible)`
```

**Review checklist for AI-generated API code:**

- [ ] No database fields leaked (check for password, hash, internal, secret)
- [ ] Consistent casing throughout (no snake_case in JSON)
- [ ] REST patterns used (no verbs in URLs)
- [ ] Proper status codes (not just 200 + error body)
- [ ] Error cases handled (not just happy path)
- [ ] Versioned endpoints (`/api/v1/`)
- [ ] DTOs defined (not raw Prisma/DB types)

---

### Checklist: API Design

**Fundamentals:**
- [ ] All endpoints versioned (`/api/v1/...`)
- [ ] Correct HTTP verbs (no GET mutations)
- [ ] Proper status codes (no "200 OK" liars)
- [ ] Consistent casing (camelCase JSON, kebab-case URLs)

**Response Shape:**
- [ ] All responses wrapped in `{ success, data, meta }` or `{ success, error }`
- [ ] DTOs for all responses (never raw database rows)
- [ ] Explicit boolean values (never undefined)
- [ ] `requestId` in all responses for debugging

**Security:**
- [ ] No sensitive data in URLs (use headers/body)
- [ ] No internal fields exposed (password_hash, notes, etc.)
- [ ] Auth tokens in `Authorization` header only

**Scalability:**
- [ ] Cursor-based pagination for large/live datasets
- [ ] Idempotency keys for POST/PATCH
- [ ] Rate limiting headers (`X-RateLimit-*`)

---

## Database Standards

### Schema Conventions

```typescript
const schemaRules = {
  // Table naming
  tables: {
    style: 'snake_case, plural',
    correct: ['patients', 'prescription_orders', 'audit_logs'],
    wrong: ['Patient', 'prescriptionOrder', 'audit-logs']
  },

  // Column naming
  columns: {
    style: 'snake_case',
    correct: ['first_name', 'created_at', 'patient_id'],
    wrong: ['firstName', 'createdAt', 'patientID']
  },

  // Primary keys
  primaryKeys: {
    name: 'id',
    type: 'UUID or prefixed CUID',
    format: 'pat_cuid123... or UUID'
  },

  // Timestamps - required on ALL tables
  timestamps: {
    required: ['created_at', 'updated_at'],
    optional: ['deleted_at'],  // for soft deletes
    type: 'TIMESTAMPTZ (with timezone)'
  },

  // Foreign keys
  foreignKeys: {
    naming: '{referenced_table_singular}_id',
    example: 'patient_id references patients(id)',
    onDelete: 'RESTRICT by default, CASCADE only when appropriate'
  }
};
```

### ID Format

```typescript
// Use prefixed IDs for debuggability
const idPrefixes = {
  patient: 'pat_',
  provider: 'prv_',
  prescription: 'rx_',
  order: 'ord_',
  consultation: 'con_',
  appointment: 'apt_',
  payment: 'pay_',
  shipment: 'shp_',
  document: 'doc_',
  audit: 'aud_',
  employer: 'emp_',
  user: 'usr_'
};

// Generation
import { createId } from '@paralleldrive/cuid2';

const generateId = (prefix: string): string => {
  return `${prefix}${createId()}`;
};

// Example: pat_clh1234567890abcdef
```

### Indexing Rules

```typescript
const indexingRules = {
  // Always index
  alwaysIndex: [
    'Foreign keys',
    'Columns used in WHERE clauses',
    'Columns used in ORDER BY',
    'Columns used in JOIN conditions'
  ],

  // Naming convention
  naming: {
    singleColumn: 'idx_{table}_{column}',
    composite: 'idx_{table}_{col1}_{col2}',
    unique: 'uniq_{table}_{column}',
    partial: 'idx_{table}_{column}_partial'
  },

  // Examples
  examples: [
    'CREATE INDEX idx_patients_email ON patients(email)',
    'CREATE INDEX idx_orders_patient_created ON orders(patient_id, created_at DESC)',
    'CREATE UNIQUE INDEX uniq_patients_email ON patients(email) WHERE deleted_at IS NULL',
    'CREATE INDEX idx_prescriptions_status ON prescriptions(status) WHERE status != \'completed\''
  ],

  // Avoid
  avoid: [
    'Indexing boolean columns alone',
    'Indexing low-cardinality columns alone',
    'Over-indexing (impacts write performance)'
  ]
};
```

### Query Rules

```typescript
const queryRules = {
  // Always use parameterized queries - NEVER string concatenation
  correct: `
    SELECT * FROM patients WHERE email = $1
  `,
  wrong: `
    SELECT * FROM patients WHERE email = '${email}'  // SQL INJECTION!
  `,

  // Use transactions for multi-step operations
  transactions: `
    BEGIN;
    INSERT INTO prescriptions (...) VALUES (...);
    UPDATE inventory SET quantity = quantity - 1 WHERE ...;
    INSERT INTO audit_logs (...) VALUES (...);
    COMMIT;
  `,

  // Pagination - use keyset, not OFFSET for large tables
  keysetPagination: `
    SELECT * FROM orders
    WHERE created_at < $1
    ORDER BY created_at DESC
    LIMIT 20
  `,

  // Avoid SELECT * in production code
  selectSpecificColumns: `
    SELECT id, first_name, last_name, email
    FROM patients
    WHERE id = $1
  `
};
```

### Migration Rules

```typescript
const migrationRules = {
  // File naming
  fileNaming: '{timestamp}_{description}.sql',
  example: '20240115103000_add_patient_allergies_table.sql',

  // Every migration must be reversible
  structure: {
    up: 'Forward migration',
    down: 'Rollback migration'
  },

  // Never in migrations
  never: [
    'DROP TABLE without backup plan',
    'ALTER COLUMN TYPE on large tables without strategy',
    'DELETE data without WHERE clause',
    'Rename columns (breaks running code during deploy)'
  ],

  // Safe column rename pattern
  safeRename: [
    '1. Add new column',
    '2. Deploy code that writes to both columns',
    '3. Backfill new column from old',
    '4. Deploy code that reads from new column',
    '5. Stop writing to old column',
    '6. Drop old column in later migration'
  ],

  // Large table changes - use pt-online-schema-change or similar
  largeTableThreshold: '1M rows'
};
```

### Soft Deletes

```typescript
// Use soft deletes for auditable entities
const softDeleteRules = {
  // Entities that require soft delete
  softDelete: [
    'patients',
    'providers',
    'prescriptions',
    'orders',
    'documents'
  ],

  // Entities that can hard delete
  hardDelete: [
    'session_tokens',
    'rate_limit_entries',
    'temporary_uploads'
  ],

  // Implementation
  columns: {
    deleted_at: 'TIMESTAMPTZ NULL',
    deleted_by: 'UUID NULL REFERENCES users(id)'
  },

  // Query pattern - always filter deleted
  queryPattern: 'WHERE deleted_at IS NULL',

  // Unique constraints must be partial
  uniqueConstraint: `
    CREATE UNIQUE INDEX uniq_patients_email
    ON patients(email)
    WHERE deleted_at IS NULL
  `
};
```

---

### Common Mistakes to Avoid

#### 1. The "Standardization" Paradox

**Standards that never evolve become technical debt.**

```typescript
const staleStandardsExample = {
  // Written 5 years ago for spinning HDDs
  oldRule: 'Maximum 5 indexes per table',

  // Modern NVMe SSDs change the equation
  reality: 'Some reporting tables genuinely need 20+ indexes',

  fix: 'Review standards annually. Benchmark, don\'t assume.'
};

// ❌ WRONG: Blindly following ancient rules
// "We can't add another index, the standard says max 5"

// ✅ CORRECT: Evidence-based decisions
// "Let's benchmark this index. Write performance dropped 2%,
//  but our critical query went from 800ms to 12ms. Worth it."
```

#### 2. Poor Naming Conventions

**If developers need a dictionary, the naming has failed.**

```typescript
// ❌ WRONG: Cryptic abbreviations
const badNaming = {
  table: 'usr_rx_ord_v2',
  columns: ['usr_reg_dt', 'rx_qty_rem', 'ord_sts_cd']
  // What does any of this mean?
};

// ✅ CORRECT: Self-documenting names
const goodNaming = {
  table: 'prescription_orders',
  columns: ['user_registration_date', 'remaining_quantity', 'order_status']
};

// ❌ WRONG: Hungarian notation / type prefixes
const unnecessaryPrefixes = {
  tables: ['tbl_patients', 'tbl_orders'],
  views: ['vw_patient_summary'],
  procedures: ['sp_create_order']
  // Modern SQL editors already show object types
};

// ✅ CORRECT: Clean names
const cleanNames = {
  tables: ['patients', 'orders'],
  views: ['patient_summary'],
  // Let the schema speak for itself
};

// ❌ WRONG: Mixed casing in same schema
const mixedCasing = {
  table1: 'PatientRecords',      // PascalCase
  table2: 'prescription_orders', // snake_case
  table3: 'audit-logs'           // kebab-case (not even valid SQL!)
};
```

#### 3. Ignoring Database Constraints

**The database is your last line of defense. Use it.**

```typescript
// ❌ WRONG: "We'll handle it in the application layer"
const appLayerOnly = {
  foreignKeys: 'Skipped for "performance"',
  result: 'Orphan records everywhere',

  uniqueConstraints: 'Checked in code',
  result2: 'Duplicate emails after race condition',

  notNull: 'Validated in frontend',
  result3: 'NULL explosion when API called directly'
};

// ✅ CORRECT: Defense in depth
const databaseEnforced = {
  foreignKeys: 'Always. The "performance hit" is negligible.',
  uniqueConstraints: 'Always. Database handles race conditions.',
  notNull: 'Always. Frontend validation is for UX, not security.',
  checkConstraints: 'For enums and business rules'
};

// ❌ WRONG: Inappropriate data types
const badTypes = {
  dateOfBirth: 'VARCHAR(10)',  // Can't do date math
  price: 'VARCHAR(20)',        // Can't sum or compare
  isActive: 'VARCHAR(5)',      // "true", "false", "yes", "maybe"?
  zipCode: 'INTEGER'           // Loses leading zeros: 01234 → 1234
};

// ✅ CORRECT: Appropriate types
const goodTypes = {
  dateOfBirth: 'DATE',
  price: 'DECIMAL(10,2)',
  isActive: 'BOOLEAN',
  zipCode: 'VARCHAR(10)'       // ZIP codes are strings, not numbers
};
```

#### 4. Normalization Extremes

**Find the Goldilocks zone: not too flat, not too deep.**

```typescript
// ❌ WRONG: "One Table to Rule Them All"
const megaTable = {
  table: 'everything',
  columns: [
    'user_id', 'user_name', 'user_email',
    'order_id', 'order_total', 'order_status',
    'log_message', 'log_level', 'log_timestamp',
    'billing_amount', 'billing_status'
    // 200 more columns...
  ],
  problems: [
    'Lock contention on every write',
    'Can\'t index efficiently',
    'Single point of failure',
    'Backup takes forever'
  ]
};

// ❌ WRONG: "Six Degrees of Joins"
const overNormalized = {
  tables: [
    'users',
    'user_first_names',
    'user_last_names',
    'user_email_addresses',
    'user_email_domains',
    'user_phone_numbers',
    'user_phone_area_codes',
    'user_phone_country_codes'
    // Every attribute in its own table
  ],
  simpleQuery: `
    SELECT ... FROM users
    JOIN user_first_names ON ...
    JOIN user_last_names ON ...
    JOIN user_email_addresses ON ...
    JOIN user_email_domains ON ...
    -- 10+ joins for basic user data
  `,
  problems: ['Unreadable queries', 'Poor performance', 'Maintenance nightmare']
};

// ✅ CORRECT: Pragmatic normalization
const balanced = {
  approach: '3NF for transactional, denormalize for reporting',

  transactional: {
    patients: ['id', 'first_name', 'last_name', 'email', 'phone'],
    addresses: ['id', 'patient_id', 'street', 'city', 'state', 'zip'],
    prescriptions: ['id', 'patient_id', 'medication_id', 'quantity']
  },

  reporting: {
    // Materialized view or read replica with denormalized data
    patient_dashboard_view: ['patient_id', 'full_name', 'total_orders', 'last_order_date']
  }
};
```

#### 5. Indexing Extremes

**Indexes are not free. But missing indexes are expensive.**

```typescript
// ❌ WRONG: Index everything "just in case"
const overIndexed = {
  table: 'orders',
  indexes: [
    'idx_orders_id',           // Already covered by PK
    'idx_orders_patient_id',
    'idx_orders_created_at',
    'idx_orders_updated_at',   // Rarely queried
    'idx_orders_status',
    'idx_orders_total',        // Never filtered on
    'idx_orders_notes',        // TEXT column, huge index
    'idx_orders_internal_flag' // Boolean, useless alone
  ],
  problem: 'Every INSERT/UPDATE must update 8 indexes'
};

// ❌ WRONG: Arbitrary limits
const arbitraryLimits = {
  rule: 'Maximum 3 indexes per table',
  reality: 'Reporting table needs 15 indexes for different queries',
  result: 'Full table scans on every report'
};

// ✅ CORRECT: Evidence-based indexing
const pragmaticIndexing = {
  strategy: [
    'Index foreign keys (always)',
    'Index columns in WHERE clauses (measure first)',
    'Index columns in ORDER BY (if pagination)',
    'Composite indexes for common query patterns',
    'Partial indexes for filtered queries'
  ],

  process: [
    '1. Identify slow queries (pg_stat_statements)',
    '2. Run EXPLAIN ANALYZE',
    '3. Add index',
    '4. Measure improvement vs write overhead',
    '5. Monitor over time'
  ]
};
```

#### 6. Environment Drift

**"It worked on my machine" is a database problem too.**

```typescript
// ❌ WRONG: Environment mismatch
const environmentDrift = {
  development: {
    postgresql: '14.1',
    sharedBuffers: '128MB',
    data: '1000 rows'
  },
  production: {
    postgresql: '15.4',      // Different version!
    sharedBuffers: '32GB',   // 256x more memory
    data: '50M rows'         // 50,000x more data
  },
  result: 'Query takes 10ms in dev, 10 seconds in prod'
};

// ✅ CORRECT: Environment parity
const environmentParity = {
  versions: 'Same PostgreSQL version everywhere (use Docker)',
  config: 'Prod-like settings in staging',
  data: 'Anonymized prod data subset for realistic testing',

  // Environment-specific overrides only
  perEnvironment: {
    connectionPoolSize: { dev: 5, staging: 20, prod: 100 },
    replicaCount: { dev: 0, staging: 1, prod: 3 }
  }
};

// ❌ WRONG: Security drift
const securityDrift = {
  defaultPasswords: 'postgres/postgres in all environments',
  sharedAccounts: 'One "app_user" for all 12 microservices',
  noAudit: 'No way to trace who changed what'
};

// ✅ CORRECT: Security standards
const securityStandards = {
  credentials: 'Unique, rotated, stored in secrets manager',
  accounts: 'One service account per application',
  leastPrivilege: 'App accounts cannot DROP tables',
  audit: 'All schema changes logged with user attribution'
};
```

---

### AI-Assisted Development Pitfalls

**When using AI to generate database schemas, watch for these patterns.**

AI defaults to the path of least resistance. Without explicit constraints:

```typescript
const aiDatabasePitfalls = {
  // 1. JSON Blob Addiction
  // AI stuffs arrays into JSON instead of proper relations
  problem: '"Store user addresses" → addresses: JSON instead of addresses table',
  consequence: 'Cannot query, filter, or aggregate without slow JSON parsing',
  fix: 'Explicitly ask: "Create a separate addresses table with foreign key"',

  // 2. Naming Flip-Flops
  // AI switches conventions mid-schema without strict rules
  problem: 'users table, then OrderItem, then product_categories',
  consequence: 'Queries become a guessing game',
  fix: 'State upfront: "Use snake_case for all tables and columns, plural table names"',

  // 3. Test Data Blindness
  // Works with 10 rows, dies with 10,000
  problem: 'No indexes on email, slug, foreign keys',
  consequence: 'App becomes sluggish as data grows',
  fix: 'Always ask: "Add indexes for columns used in WHERE and JOIN"',

  // 4. Integer ID Default
  // AI defaults to auto-increment integers
  problem: 'id: 1, 2, 3... exposed in URLs',
  consequence: 'Security risk (enumeration attacks) + merge conflicts',
  fix: 'Specify: "Use prefixed CUIDs (pat_, ord_) for all entity IDs"',

  // 5. App-Layer Trust
  // AI assumes validation happens in code
  problem: 'No NOT NULL, UNIQUE, or FOREIGN KEY constraints',
  consequence: 'Orphan data, duplicates, NULLs everywhere',
  fix: 'Always ask: "Add appropriate constraints at the database level"'
};
```

**Prompting patterns that prevent these issues:**

```typescript
// ❌ VAGUE: Leads to JSON blobs and missing constraints
'Create a users table that stores their addresses and orders'

// ✅ EXPLICIT: Forces proper relational design
`Create a database schema:
- users table (id as prefixed CUID, email UNIQUE NOT NULL, created_at, updated_at)
- addresses table (foreign key to users, ON DELETE CASCADE)
- orders table (foreign key to users, ON DELETE RESTRICT)
- Use snake_case for all names, plural table names
- Add indexes on all foreign keys and email column`

// ❌ VAGUE: AI picks whatever ID type is easiest
'Add a products table'

// ✅ EXPLICIT: Forces proper ID strategy
`Add a products table:
- id: prefixed CUID (prod_xxx), NOT auto-increment integer
- Include created_at, updated_at (TIMESTAMPTZ)
- Add CHECK constraint: price > 0
- Index on category_id foreign key`
```

**Quick Reference: Vibe Coding vs Standards**

| Aspect | ❌ Vibe Coding | ✅ Standard |
|--------|---------------|-------------|
| **Relationships** | JSON strings / blobs | Foreign keys & joins |
| **Identifiers** | Integer (1, 2, 3) | Prefixed CUID / UUID |
| **Schema Changes** | Modify on the fly | Versioned migrations |
| **Data Integrity** | Handled in API | Database constraints |
| **Naming** | Whatever AI picks | Enforced snake_case |
| **Indexes** | Added when slow | Planned upfront |

**Review checklist for AI-generated schemas:**

- [ ] No JSON blobs for data that should be separate tables
- [ ] Consistent naming (snake_case, plural tables)
- [ ] Prefixed CUIDs, not auto-increment integers
- [ ] Foreign keys with appropriate ON DELETE
- [ ] NOT NULL on required columns
- [ ] UNIQUE constraints where needed
- [ ] Indexes on foreign keys and query columns
- [ ] created_at, updated_at on all tables

---

### Healthcare Data Standards

**Interoperability standards for pharmacy and clinical data.**

#### Standards Overview

```typescript
const healthcareStandards = {
  messaging: {
    'HL7 v2': 'Legacy hospital messaging (ADT, ORM, ORU)',
    'FHIR R4': 'Modern REST API-based exchange',
    'NCPDP SCRIPT': 'E-prescribing standard'
  },

  terminology: {
    'RxNorm': 'Medications (NDC → RxNorm CUI)',
    'SNOMED CT': 'Clinical findings and diagnoses',
    'LOINC': 'Laboratory tests and observations',
    'ICD-10': 'Diagnosis codes for billing',
    'CPT': 'Procedure codes'
  },

  imaging: {
    'DICOM': 'Medical imaging format and protocol'
  },

  research: {
    'CDISC': 'Clinical trial data standards'
  },

  units: {
    'UCUM': 'Unified Code for Units of Measure'
  }
};
```

---

#### Common Mistakes to Avoid

##### 1. Version Mismatch (The "Same-Standard" Fallacy)

**Two systems using "HL7" or "FHIR" are not automatically compatible.**

```typescript
// ❌ WRONG: Assuming version compatibility
const versionMismatch = {
  assumption: 'Both systems use FHIR, they\'ll work together',

  reality: {
    systemA: 'FHIR STU3 (2017)',
    systemB: 'FHIR R4 (2019)',
    // Different resource structures, removed/renamed fields
  },

  consequence: 'Silent data truncation or field misinterpretation'
};

// ✅ CORRECT: Explicit version handling
const versionHandling = {
  document: 'Every interface specifies exact version',
  validate: 'Schema validation against specific version',
  translate: 'Version translation layer when bridging systems',

  example: {
    inbound: 'FHIR R4',
    internal: 'FHIR R4',
    outboundLegacy: 'HL7 v2.5.1 via translation layer'
  }
};
```

##### 2. Poor Semantic Mapping

**Structure is correct, but meaning is lost.**

```typescript
// ❌ WRONG: Generic mapping loses clinical meaning
const poorMapping = {
  localCode: 'BG_TEST_001',
  mappedTo: 'LAB_GENERIC',
  // Decision support can't recognize this for glucose alerts
};

// ✅ CORRECT: Map to standard terminology
const properMapping = {
  localCode: 'BG_TEST_001',
  loinc: '2345-7',          // Glucose [Mass/volume] in Serum or Plasma
  display: 'Glucose SerPl-mCnc',

  // Enables automated decision support
  triggers: ['Diabetes management alerts', 'Drug-lab interactions']
};

// Terminology server enforces mappings
const terminologyRequirements = {
  medications: 'RxNorm CUI required (not just NDC)',
  diagnoses: 'SNOMED CT or ICD-10 required',
  labTests: 'LOINC code required',
  procedures: 'CPT or SNOMED required',

  enforcement: 'Terminology server validates all codes on ingest'
};
```

##### 3. Custom Extension Overuse (Z-Segments / FHIR Extensions)

**Standards allow extensions, but overuse creates silos.**

```typescript
// ❌ WRONG: Core data in custom extensions
const extensionAbuse = {
  hl7v2: {
    // Putting patient allergies in custom Z-segment
    segment: 'ZAL|1|PENICILLIN|SEVERE|HIVES',
    problem: 'Third-party systems ignore Z-segments'
  },

  fhir: {
    // Custom extension for standard data
    extension: [{
      url: 'http://ourcompany.com/pharmacy-notes',
      valueString: 'Patient prefers morning pickup'
    }],
    problem: 'Other systems don\'t know this extension exists'
  }
};

// ✅ CORRECT: Use standard fields, extend only when necessary
const properExtensionUse = {
  rule: 'Standard fields first, extensions for truly custom data',

  hl7v2: {
    allergies: 'AL1 segment (standard)',
    zSegments: 'Only for organization-specific metadata'
  },

  fhir: {
    standardFields: 'Use defined resources and elements',
    extensions: 'Only for data with no standard representation',
    documentation: 'Publish extension definitions in Implementation Guide'
  }
};
```

##### 4. Patient Misidentification

**Without universal identifiers, matching is probabilistic and error-prone.**

```typescript
// ❌ WRONG: Weak matching criteria
const weakMatching = {
  criteria: ['firstName', 'lastName', 'dateOfBirth'],
  // John Smith, 1990-01-15 matches 47 patients
  problems: [
    'Duplicate records (one patient, five IDs)',
    'Overlays (two patients merged into one)'
  ]
};

// ✅ CORRECT: Robust Master Patient Index (MPI)
const robustMPI = {
  matchingAlgorithm: {
    required: ['lastName', 'dateOfBirth', 'ssn4 OR address'],
    weighted: ['firstName', 'phone', 'email', 'gender'],
    threshold: 'Configurable confidence score'
  },

  duplicatePrevention: {
    realTimeBlocking: 'Check for potential matches before create',
    periodicAudit: 'Weekly de-duplication scan',
    manualReview: 'Queue ambiguous matches for human review'
  },

  mergeProtocol: {
    golden: 'Maintain authoritative "golden record"',
    sourceTracking: 'Track which system contributed each field',
    auditTrail: 'Full history of merges and unmerges'
  }
};
```

##### 5. Units of Measurement Neglect

**The healthcare "Mars Climate Orbiter" problem.**

```typescript
// ❌ WRONG: Numeric values without unit enforcement
const unitNeglect = {
  stored: { glucose: 126 },
  // Is this mg/dL (normal) or mmol/L (dangerously high)?

  consequence: 'Normal reading interpreted as fatal crisis'
};

// ✅ CORRECT: UCUM-enforced units
const ucumEnforcement = {
  stored: {
    glucose: {
      value: 126,
      unit: 'mg/dL',
      ucumCode: 'mg/dL',
      system: 'http://unitsofmeasure.org'
    }
  },

  validation: {
    onIngest: 'Validate unit is valid UCUM code',
    onDisplay: 'Convert to user-preferred unit if needed',
    onExport: 'Include unit in all external messages'
  },

  commonConversions: {
    glucose: { 'mg/dL': 1, 'mmol/L': 0.0555 },
    weight: { 'kg': 1, 'lb': 2.205 },
    temperature: { 'Cel': 1, '[degF]': 'special' }
  }
};
```

---

#### Standards Comparison

| Standard | Primary Use | Common Mistake |
|----------|-------------|----------------|
| **HL7 v2** | Internal hospital messaging | Overuse of custom Z-segments |
| **FHIR R4** | Modern API-based exchange | Ignoring Implementation Guides (IGs) |
| **NCPDP SCRIPT** | E-prescribing | Version mismatches (10.6 vs 2017071) |
| **DICOM** | Medical imaging | Stripping metadata during compression |
| **RxNorm** | Medication terminology | Using NDC alone without RxNorm mapping |
| **LOINC** | Lab test codes | Generic "LAB" codes instead of specific LOINC |
| **UCUM** | Units of measure | Storing values without unit codes |

---

#### Checklist: Healthcare Data Standards

**Interoperability:**
- [ ] Explicit version documented for every interface (FHIR R4, HL7 v2.5.1, etc.)
- [ ] Schema validation on all inbound messages
- [ ] Version translation layer for legacy system bridges

**Terminology:**
- [ ] Terminology server deployed and enforced
- [ ] Medications mapped to RxNorm (not just NDC)
- [ ] Lab tests mapped to LOINC
- [ ] Diagnoses mapped to SNOMED CT or ICD-10
- [ ] All codes validated on ingest

**Patient Identity:**
- [ ] Master Patient Index (MPI) implemented
- [ ] Probabilistic matching with configurable thresholds
- [ ] Real-time duplicate blocking on patient create
- [ ] Periodic de-duplication audits scheduled
- [ ] Merge/unmerge audit trail maintained

**Units & Values:**
- [ ] All numeric values stored with UCUM unit codes
- [ ] Unit validation on ingest
- [ ] Conversion utilities for display preferences

**Extensions:**
- [ ] Standard fields used before custom extensions
- [ ] Z-segments/FHIR extensions documented
- [ ] Implementation Guide published for custom extensions

---

### Checklist: Database Standards

**Schema Design:**
- [ ] Tables use snake_case, plural names
- [ ] Columns use snake_case
- [ ] All tables have created_at, updated_at
- [ ] Foreign keys enforced at database level
- [ ] Appropriate data types (no dates as strings)
- [ ] No Hungarian notation (tbl_, vw_, sp_)

**IDs & Keys:**
- [ ] Prefixed CUIDs for entity IDs
- [ ] Natural keys considered where appropriate
- [ ] Foreign keys indexed

**Indexing:**
- [ ] Evidence-based (not "just in case")
- [ ] Indexes on foreign keys
- [ ] Composite indexes for common query patterns
- [ ] Partial indexes for filtered queries
- [ ] No indexes on low-cardinality columns alone

**Migrations:**
- [ ] All migrations reversible
- [ ] Safe column rename pattern followed
- [ ] Large table changes use online DDL tools
- [ ] No destructive operations without backup

**Security:**
- [ ] No default credentials
- [ ] One service account per application
- [ ] Least privilege (app can't DROP)
- [ ] Environment parity (same versions)

**Healthcare Specific:**
- [ ] PHI columns identified and documented
- [ ] Encryption at rest enabled
- [ ] Audit logging for PHI access
- [ ] Soft deletes for patient data (HIPAA retention)

---

## Error Handling

### Error Classification

```typescript
// Base error class
class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number,
    public isOperational: boolean = true,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Error categories
class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super('VALIDATION_ERROR', message, 400, true, { field });
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super('NOT_FOUND', `${resource} with ID ${id} not found`, 404, true);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super('UNAUTHORIZED', message, 401, true);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super('FORBIDDEN', message, 403, true);
  }
}

class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409, true);
  }
}

class BusinessRuleError extends AppError {
  constructor(code: string, message: string) {
    super(code, message, 422, true);
  }
}

class ExternalServiceError extends AppError {
  constructor(service: string, message: string) {
    super('EXTERNAL_SERVICE_ERROR', `${service}: ${message}`, 502, true);
  }
}
```

### Error Handling Pattern

```typescript
// Service layer - throw typed errors
const getPatient = async (id: string): Promise<Patient> => {
  const patient = await patientRepository.findById(id);

  if (!patient) {
    throw new NotFoundError('Patient', id);
  }

  return patient;
};

// API route handler - catch and format
const handleGetPatient = async (req: Request, res: Response) => {
  try {
    const patient = await getPatient(req.params.id);
    return res.json({ success: true, data: patient });
  } catch (error) {
    return handleError(error, res);
  }
};

// Central error handler
const handleError = (error: unknown, res: Response) => {
  const requestId = res.locals.requestId;

  if (error instanceof AppError) {
    // Operational error - expected, log at info/warn level
    logger.warn({ error, requestId }, error.message);

    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        requestId
      }
    });
  }

  // Unexpected error - log at error level, return generic message
  logger.error({ error, requestId }, 'Unexpected error');

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      requestId
    }
  });
};
```

### Never Expose Internal Details

```typescript
const errorResponseRules = {
  // Never expose to clients
  neverExpose: [
    'Stack traces',
    'Database error messages',
    'Internal file paths',
    'Environment variables',
    'Third-party API keys or tokens',
    'SQL queries',
    'Internal service names'
  ],

  // Log internally, return generic message
  example: {
    internalLog: 'PostgreSQL error: duplicate key value violates unique constraint "uniq_patients_email"',
    clientResponse: 'A patient with this email already exists'
  }
};
```

---

### Healthcare Error Handling

#### Common Mistakes to Avoid

##### 1. Swallowing Exceptions

**In healthcare, silent failures can harm patients.**

```typescript
// ❌ WRONG: Silent failure - clinician thinks data was saved
const uploadLabResult = async (result: LabResult) => {
  try {
    await labService.save(result);
  } catch (error) {
    console.log(error); // Just logging is NOT handling
    // UI shows success, but data is lost
  }
};

// ✅ CORRECT: Explicit failure handling
const uploadLabResult = async (result: LabResult) => {
  try {
    await labService.save(result);
    return { success: true };
  } catch (error) {
    // Log with full context for investigation
    logger.error({
      error,
      labResultId: result.id,
      patientId: result.patientId,
      testType: result.testType,
      action: 'lab_result.upload_failed'
    }, 'Failed to save lab result');

    // Re-throw or return explicit failure
    throw new ExternalServiceError('Lab Service', 'Failed to save result. Please retry.');
  }
};

// Healthcare rule: NEVER swallow errors for:
const criticalOperations = [
  'Medication orders',
  'Lab results',
  'Allergy updates',
  'Prescription submissions',
  'Patient identity changes',
  'Clinical notes'
];
```

##### 2. Leaking PHI in Logs

**Logging the entire request object creates HIPAA violations.**

```typescript
// ❌ WRONG: PHI in logs
const handlePatientUpdate = async (req: Request) => {
  try {
    await patientService.update(req.body);
  } catch (error) {
    // This logs SSN, DOB, diagnoses, etc.!
    logger.error({ request: req.body, error }, 'Patient update failed');
  }
};

// ✅ CORRECT: Sanitized logging
const handlePatientUpdate = async (req: Request) => {
  try {
    await patientService.update(req.body);
  } catch (error) {
    // Only log IDs, never PHI
    logger.error({
      patientId: req.body.id,
      updatedFields: Object.keys(req.body), // Field names only, not values
      error: sanitizeError(error),
      requestId: req.headers['x-request-id']
    }, 'Patient update failed');
  }
};

// Sanitization utility
const sanitizeError = (error: unknown): object => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      // Never include stack in production logs
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    };
  }
  return { message: 'Unknown error' };
};

// Fields that must NEVER appear in logs
const phiFields = [
  'ssn', 'socialSecurityNumber', 'taxId',
  'dateOfBirth', 'dob', 'birthDate',
  'firstName', 'lastName', 'fullName',
  'address', 'streetAddress', 'city', 'zipCode',
  'phone', 'email',
  'diagnosis', 'condition', 'icd10',
  'medication', 'prescription', 'dosage',
  'insuranceId', 'memberId', 'groupNumber'
];
```

##### 3. Lack of Clinical Validation

**Syntactically valid data can be clinically impossible.**

```typescript
// ❌ WRONG: Only type validation
const patientSchema = z.object({
  weight: z.number(),           // Accepts 500kg
  birthDate: z.string().date(), // Accepts future dates
  heartRate: z.number()         // Accepts 500 bpm
});

// ✅ CORRECT: Clinical guardrails
const patientSchema = z.object({
  weight: z.number()
    .min(0.5, 'Weight must be at least 0.5 kg')
    .max(650, 'Weight exceeds physiological maximum'), // World record is ~635kg

  birthDate: z.string().date()
    .refine(
      (date) => new Date(date) <= new Date(),
      'Birth date cannot be in the future'
    )
    .refine(
      (date) => new Date(date) >= new Date('1900-01-01'),
      'Birth date is implausibly old'
    ),

  heartRate: z.number()
    .min(20, 'Heart rate below physiological minimum')
    .max(300, 'Heart rate exceeds physiological maximum')
});

// Clinical guardrails for common values
const clinicalLimits = {
  weight: { min: 0.5, max: 650, unit: 'kg' },
  height: { min: 30, max: 280, unit: 'cm' },
  temperature: { min: 25, max: 45, unit: 'Cel' },
  heartRate: { min: 20, max: 300, unit: 'bpm' },
  bloodPressureSystolic: { min: 50, max: 300, unit: 'mmHg' },
  bloodPressureDiastolic: { min: 30, max: 200, unit: 'mmHg' },
  oxygenSaturation: { min: 0, max: 100, unit: '%' },

  // Drug-specific limits
  dosages: {
    acetaminophen: { maxDaily: 4000, unit: 'mg' },
    ibuprofen: { maxDaily: 3200, unit: 'mg' }
  }
};

// Validation that warns vs blocks
interface ValidationResult {
  valid: boolean;
  level: 'error' | 'warning' | 'info';
  message: string;
}

const validateHeartRate = (value: number): ValidationResult => {
  if (value < 20 || value > 300) {
    return { valid: false, level: 'error', message: 'Physiologically impossible' };
  }
  if (value < 40 || value > 200) {
    return { valid: true, level: 'warning', message: 'Unusual value - please verify' };
  }
  return { valid: true, level: 'info', message: 'Within normal range' };
};
```

##### 4. Poor Batch/Partial Success Handling

**When processing 100 prescriptions, don't lose 50 because #50 failed.**

```typescript
// ❌ WRONG: All-or-nothing with no details
const processPrescriptions = async (prescriptions: Prescription[]) => {
  try {
    for (const rx of prescriptions) {
      await prescriptionService.submit(rx); // Stops at first failure
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Processing failed' };
    // Which ones succeeded? Which failed? Unknown.
  }
};

// ✅ CORRECT: Response manifest with detailed results
interface BatchResult<T> {
  success: boolean;
  summary: {
    total: number;
    succeeded: number;
    failed: number;
    warnings: number;
  };
  results: Array<{
    id: string;
    status: 'success' | 'failed' | 'warning';
    error?: {
      code: string;
      message: string;
    };
    data?: T;
  }>;
}

const processPrescriptions = async (
  prescriptions: Prescription[]
): Promise<BatchResult<Prescription>> => {
  const results: BatchResult<Prescription>['results'] = [];

  for (const rx of prescriptions) {
    try {
      const saved = await prescriptionService.submit(rx);
      results.push({
        id: rx.id,
        status: 'success',
        data: saved
      });
    } catch (error) {
      results.push({
        id: rx.id,
        status: 'failed',
        error: {
          code: error instanceof AppError ? error.code : 'UNKNOWN',
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      });
      // Continue processing remaining prescriptions
    }
  }

  const succeeded = results.filter(r => r.status === 'success').length;
  const failed = results.filter(r => r.status === 'failed').length;

  return {
    success: failed === 0,
    summary: {
      total: prescriptions.length,
      succeeded,
      failed,
      warnings: results.filter(r => r.status === 'warning').length
    },
    results
  };
};

// Example response:
// {
//   "success": false,
//   "summary": { "total": 100, "succeeded": 98, "failed": 2, "warnings": 0 },
//   "results": [
//     { "id": "rx_001", "status": "success" },
//     { "id": "rx_002", "status": "failed", "error": { "code": "DRUG_INTERACTION", "message": "..." } },
//     ...
//   ]
// }
```

##### 5. Non-Standard Error Codes

**Generic 500 errors prevent automated retry logic.**

```typescript
// ❌ WRONG: Everything is 500
const handleError = (error: unknown, res: Response) => {
  return res.status(500).json({ error: 'Something went wrong' });
  // Caller can't distinguish retryable from non-retryable
};

// ✅ CORRECT: Semantic error codes with retry guidance
interface HealthcareErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    severity: 'fatal' | 'error' | 'warning' | 'information';
    retryable: boolean;
    retryAfter?: number; // seconds
    details?: unknown;
  };
  // FHIR-compatible OperationOutcome
  operationOutcome?: FhirOperationOutcome;
}

// Error code registry
const errorCodes = {
  // Retryable errors
  NETWORK_TIMEOUT: { status: 504, retryable: true, retryAfter: 30 },
  SERVICE_UNAVAILABLE: { status: 503, retryable: true, retryAfter: 60 },
  RATE_LIMITED: { status: 429, retryable: true, retryAfter: 120 },
  DATABASE_BUSY: { status: 503, retryable: true, retryAfter: 5 },

  // Non-retryable errors (fix the data, don't retry)
  VALIDATION_ERROR: { status: 400, retryable: false },
  DRUG_INTERACTION: { status: 422, retryable: false },
  DUPLICATE_PRESCRIPTION: { status: 409, retryable: false },
  PATIENT_NOT_FOUND: { status: 404, retryable: false },
  INVALID_DEA_NUMBER: { status: 422, retryable: false },

  // Authorization errors (re-auth, then retry)
  TOKEN_EXPIRED: { status: 401, retryable: true, retryAfter: 0 },
  INSUFFICIENT_PERMISSIONS: { status: 403, retryable: false }
};

// FHIR OperationOutcome for interoperability
interface FhirOperationOutcome {
  resourceType: 'OperationOutcome';
  issue: Array<{
    severity: 'fatal' | 'error' | 'warning' | 'information';
    code: string; // FHIR issue-type code
    diagnostics?: string;
    location?: string[];
  }>;
}

const toOperationOutcome = (error: AppError): FhirOperationOutcome => ({
  resourceType: 'OperationOutcome',
  issue: [{
    severity: 'error',
    code: mapToFhirIssueType(error.code),
    diagnostics: error.message
  }]
});
```

---

### Checklist: Error Handling

**Core Patterns:**
- [ ] Typed error classes (ValidationError, NotFoundError, etc.)
- [ ] Central error handler distinguishes operational vs unexpected
- [ ] RequestId in all error responses
- [ ] Never expose stack traces, SQL, or internal paths

**Healthcare Specific:**
- [ ] No swallowed exceptions for critical operations
- [ ] PHI stripped from all log entries
- [ ] Clinical guardrails for physiological values
- [ ] Batch operations return detailed result manifests
- [ ] Error codes indicate retryable vs non-retryable
- [ ] FHIR OperationOutcome for interoperability

**Logging:**
- [ ] Structured logging (not string concatenation)
- [ ] Sanitization utility for error objects
- [ ] PHI field blocklist enforced
- [ ] Separate PHI audit log if PHI logging required

---

## User-Facing Communication

### Tone & Voice

Every message a user sees reflects the pharmacy's care and competence. Write like a helpful human, not a system.

```typescript
const communicationPrinciples = {
  tone: 'Conversational, empathetic, clear',
  goal: 'User feels helped, not processed',
  voice: 'Knowledgeable friend, not corporate robot'
};
```

### The Robotic Script Problem

Overly formal language makes users feel like ticket numbers:

```typescript
// ❌ WRONG
const roboticMessages = {
  received: 'Your inquiry has been received and is being processed according to protocol.',
  error: 'An error has occurred. Please try again later.',
  complete: 'Your transaction has been successfully completed.'
};

// ✅ CORRECT
const humanMessages = {
  received: 'Got it! I\'m looking into this for you now.',
  error: 'Something went wrong on our end. Let me try that again.',
  complete: 'All done! Your prescription is on its way.'
};
```

### No Internal Jargon

Users don't live in your technical ecosystem:

```typescript
// ❌ WRONG
const jargonMessages = {
  apiError: 'The API handshake failed due to a 404 on the backend stack.',
  syncError: 'PBM integration timeout during claims adjudication.',
  validationError: 'NPI validation failed against NPPES registry.'
};

// ✅ CORRECT
const clearMessages = {
  apiError: 'There\'s a connection issue on our side. We\'re working on it.',
  syncError: 'We\'re having trouble connecting to your insurance. Try again in a few minutes.',
  validationError: 'We couldn\'t verify the prescriber\'s license number. Please double-check it.'
};
```

### Focus on What You CAN Do

Never lead with "Unfortunately" or "We can't"—it shuts down the conversation:

```typescript
// ❌ WRONG
const negativeFraming = {
  refund: 'Unfortunately, we cannot process refunds after 30 days.',
  outOfStock: 'This medication is not available.',
  hours: 'We are closed on weekends.'
};

// ✅ CORRECT
const positiveFraming = {
  refund: 'The refund window has closed, but I can apply a credit to your next order.',
  outOfStock: 'This medication will be back in stock Tuesday. Want me to notify you?',
  hours: 'We\'re open Monday through Friday, 8am-6pm. I can schedule a callback for Monday morning.'
};
```

### No Ghosting—Proactive Updates

Silence creates anxiety. Update users even when you don't have answers:

```typescript
const updatePatterns = {
  investigating: {
    bad: '[silence for 3 days]',
    good: 'Still working on this with our team. No answer yet, but I\'ll update you tomorrow.'
  },
  delayed: {
    bad: '[silence, then "sorry for the delay"]',
    good: 'Your order is taking longer than expected. New ETA is Thursday. Sorry for the wait.'
  },
  waiting: {
    bad: '[no communication during processing]',
    good: 'Your prescription is being prepared. You\'ll get a text when it\'s ready for pickup.'
  }
};

const proactiveTimeline = {
  orderReceived: 'Immediately',
  preparationStarted: 'Within 1 hour',
  readyForPickup: 'Immediately',
  shipped: 'With tracking number',
  delayed: 'As soon as known',
  issue: 'Within 4 hours of discovery'
};
```

### Under-Promise, Over-Deliver

A broken promise is worse than a longer timeline:

```typescript
// ❌ WRONG
const overPromising = {
  resolution: 'I\'ll have this fixed by end of day.',
  shipping: 'It\'ll arrive tomorrow.',
  callback: 'Someone will call you back in 5 minutes.'
};

// ✅ CORRECT
const realisticExpectations = {
  resolution: 'This usually takes 24-48 hours, but I\'m flagging it as urgent.',
  shipping: 'Standard delivery is 3-5 days. Often arrives sooner.',
  callback: 'A pharmacist will call you within the hour.'
};
```

### Healthcare-Specific Communication

Pharmacy communication carries extra weight—users are often anxious about their health:

```typescript
const healthcareMessaging = {
  empathy: {
    principle: 'Acknowledge the situation before solving',
    example: 'I understand waiting for medication is stressful. Let me see what I can do.'
  },
  clarity: {
    principle: 'Medical situations need extra clarity',
    example: 'Your doctor prescribed 10mg tablets. Take one each morning with food.'
  },
  urgency: {
    principle: 'Match tone to clinical urgency',
    routine: 'Your refill is ready whenever you\'d like to pick it up.',
    urgent: 'Your prescription is ready. Please pick it up today as instructed by your doctor.'
  },
  privacy: {
    principle: 'Be vague in notifications, detailed in app',
    sms: 'Your order is ready for pickup.',
    inApp: 'Your Lisinopril 10mg prescription is ready at Main Street Pharmacy.'
  }
};
```

### Message Templates

```typescript
const messageTemplates = {
  orderConfirmed: 'Got your order! We\'re preparing it now and will text you when it\'s ready.',
  readyForPickup: 'Your prescription is ready at [Location]. We\'re open until [Time].',
  shipped: 'Your order shipped! Track it here: [Link]. Expected delivery: [Date].',
  delayed: 'Your order is taking longer than expected. New ETA: [Date]. Sorry for the wait.',
  actionNeeded: 'We need a bit more info to process your prescription. Tap here to continue.',
  refillReminder: 'Time for a refill? You have [X] days left. Tap to reorder.',
  issueResolved: 'Good news—the issue with your order is resolved. It\'s on its way.'
};
```

### Communication Anti-Patterns

| Anti-Pattern | Example | Fix |
|--------------|---------|-----|
| Robotic tone | "Your request is being processed" | "Working on it now" |
| Jargon | "API timeout on PBM integration" | "Connection issue with insurance" |
| Wall of No | "We can't do that" | "Here's what I can do" |
| Ghosting | Silence during investigation | Proactive updates |
| Over-promising | "Fixed by EOD" | "Usually 24-48 hours" |
| Blame shifting | "Your insurance denied it" | "Insurance needs more info—here's how to fix it" |
| Generic | "An error occurred" | "Couldn't verify your address—please check it" |

---

## Logging Standards

### Log Levels

```typescript
const logLevels = {
  error: 'System errors requiring immediate attention',
  warn: 'Unexpected situations that don\'t break functionality',
  info: 'Significant business events (order placed, prescription filled)',
  debug: 'Detailed diagnostic information (disabled in production)'
};

// Examples
logger.error({ error, orderId }, 'Failed to process payment');
logger.warn({ patientId, attempts: 3 }, 'Multiple failed login attempts');
logger.info({ orderId, status: 'shipped' }, 'Order shipped');
logger.debug({ query, params }, 'Database query executed');
```

### Structured Logging

```typescript
// Always use structured logging - never string concatenation
const loggingRules = {
  // Correct - structured
  correct: `logger.info({ orderId, patientId, total }, 'Order placed')`,

  // Wrong - string concatenation
  wrong: `logger.info('Order ' + orderId + ' placed for patient ' + patientId)`
};

// Standard fields to include
interface LogContext {
  requestId: string;        // Correlation ID
  userId?: string;          // Authenticated user
  patientId?: string;       // Affected patient
  orderId?: string;         // Affected order
  action: string;           // What happened
  duration?: number;        // For performance logging
  error?: Error;            // For error logs
}

// Example log output (JSON format in production)
{
  "level": "info",
  "time": "2024-01-15T10:30:00.000Z",
  "requestId": "req_abc123",
  "userId": "usr_xyz789",
  "patientId": "pat_123",
  "orderId": "ord_456",
  "action": "order.placed",
  "message": "Order placed successfully"
}
```

### PHI in Logs

```typescript
const phiLoggingRules = {
  // NEVER log PHI directly
  neverLog: [
    'Patient names',
    'Dates of birth',
    'SSN/Tax ID',
    'Addresses',
    'Phone numbers',
    'Email addresses',
    'Medical conditions',
    'Prescription details',
    'Insurance information'
  ],

  // Use IDs instead
  correct: `logger.info({ patientId: 'pat_123' }, 'Patient updated')`,
  wrong: `logger.info({ patientName: 'John Doe' }, 'Patient updated')`,

  // If PHI must be logged (rare), use separate PHI audit log
  phiAuditLog: {
    destination: 'Separate, encrypted, access-controlled log store',
    retention: 'Per HIPAA requirements (6 years)',
    access: 'Limited to compliance team'
  }
};
```

### Request Logging

```typescript
// Log all API requests (without PHI)
interface RequestLog {
  requestId: string;
  method: string;
  path: string;           // Sanitize path params
  statusCode: number;
  duration: number;       // milliseconds
  userId?: string;
  userAgent: string;
  ip: string;             // May be considered PII
}

// Sanitize paths to avoid logging PHI
const sanitizePath = (path: string): string => {
  return path
    .replace(/\/patients\/[^/]+/, '/patients/:id')
    .replace(/\/orders\/[^/]+/, '/orders/:id');
};
```

---

### Common Mistakes to Avoid

#### 1. Logging PHI in Plaintext

**"Lazy logging" with entire objects is a HIPAA violation waiting to happen.**

```typescript
// ❌ WRONG: Logging entire objects
const processPatient = async (patient: Patient) => {
  try {
    await service.process(patient);
  } catch (error) {
    // This logs SSN, DOB, diagnoses, addresses...
    logger.error({ patient, error }, 'Processing failed');
  }
};

// ❌ WRONG: String concatenation with objects
logger.info('Processing record: ' + JSON.stringify(patientObject));

// ✅ CORRECT: Allow-list approach - log only safe metadata
const processPatient = async (patient: Patient) => {
  try {
    await service.process(patient);
  } catch (error) {
    logger.error({
      patientId: patient.id,           // ID only, not name
      recordType: patient.type,        // Metadata, not PHI
      correlationId: req.correlationId,
      error: sanitizeError(error)
    }, 'Processing failed');
  }
};

// Allow-list of safe fields to log
const safePatientFields = ['id', 'type', 'status', 'createdAt', 'updatedAt'];

const toLoggablePatient = (patient: Patient): Partial<Patient> => {
  return Object.fromEntries(
    Object.entries(patient).filter(([key]) => safePatientFields.includes(key))
  );
};
```

#### 2. Inadequate Audit Trails

**Logs aren't just for debugging—they're legal records of access.**

```typescript
// ❌ WRONG: Missing context
logger.info('Patient record accessed');
// Who? When? Why? Under what authority?

// ✅ CORRECT: Complete audit trail
interface AuditLogEntry {
  // REQUIRED: The "Five Ws" of healthcare audit
  timestamp: string;          // When
  userId: string;             // Who
  userRole: string;           // As what role
  action: string;             // What action
  resourceType: string;       // On what type of resource
  resourceId: string;         // Which specific resource
  accessReason: AccessReason; // Why (critical for HIPAA)

  // Additional context
  requestId: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
}

type AccessReason =
  | 'treatment'           // Direct patient care
  | 'payment'             // Billing/claims
  | 'operations'          // Healthcare operations
  | 'emergency'           // Break-glass emergency access
  | 'patient_request'     // Patient requested their own data
  | 'legal'               // Subpoena/legal requirement
  | 'research'            // IRB-approved research
  | 'quality_assurance';  // Internal QA

const auditLogger = {
  access: (entry: AuditLogEntry) => {
    // Separate audit log stream with higher retention
    auditLogStream.write({
      ...entry,
      _type: 'phi_access',
      _retention: '7_years'
    });
  }
};

// Example usage
auditLogger.access({
  timestamp: new Date().toISOString(),
  userId: 'usr_abc123',
  userRole: 'pharmacist',
  action: 'read',
  resourceType: 'prescription',
  resourceId: 'rx_xyz789',
  accessReason: 'treatment',
  requestId: req.id,
  ipAddress: req.ip,
  userAgent: req.headers['user-agent'],
  success: true
});
```

#### 3. Generic Error Logs for Interoperability Failures

**"Invalid data" tells integration partners nothing.**

```typescript
// ❌ WRONG: Generic error log
try {
  await fhirClient.createPatient(resource);
} catch (error) {
  logger.error('FHIR operation failed'); // Useless for debugging
}

// ✅ CORRECT: Log structured OperationOutcome
try {
  await fhirClient.createPatient(resource);
} catch (error) {
  if (isFhirOperationOutcome(error)) {
    logger.error({
      operationOutcome: {
        resourceType: 'OperationOutcome',
        issue: error.issue.map(issue => ({
          severity: issue.severity,
          code: issue.code,
          diagnostics: issue.diagnostics,
          location: issue.location
        }))
      },
      resourceType: 'Patient',
      action: 'create',
      correlationId: req.correlationId
    }, 'FHIR validation failed');

    // Return structured error to caller
    throw new ValidationError(
      `FHIR validation failed: ${error.issue[0]?.diagnostics}`,
      { operationOutcome: error }
    );
  }
}

// Example logged OperationOutcome:
// {
//   "operationOutcome": {
//     "resourceType": "OperationOutcome",
//     "issue": [{
//       "severity": "error",
//       "code": "required",
//       "diagnostics": "Patient.gender: minimum required = 1, but only found 0",
//       "location": ["Patient.gender"]
//     }]
//   }
// }
```

#### 4. Excessive Retention Periods

**Keeping logs forever multiplies your breach liability.**

```typescript
// ❌ WRONG: "Keep everything forever"
const logRetention = {
  all: 'infinite' // If breached, you must report on ALL of this
};

// ✅ CORRECT: Tiered retention by log type
const logRetentionPolicy = {
  // Audit logs - HIPAA requires 6 years minimum
  audit: {
    phiAccess: '7 years',      // Who accessed what PHI
    authEvents: '7 years',     // Login/logout, MFA events
    dataChanges: '7 years',    // Create/update/delete of PHI
    exportEvents: '7 years'    // Data exports, downloads
  },

  // Application logs - shorter retention
  application: {
    error: '90 days',          // Error investigation window
    warn: '30 days',
    info: '14 days',
    debug: '3 days'            // Never in production anyway
  },

  // Infrastructure logs
  infrastructure: {
    access: '90 days',         // Load balancer, API gateway
    performance: '30 days',    // Metrics, timing
    security: '1 year'         // WAF, IDS events
  },

  // Automated enforcement
  enforcement: {
    method: 'S3 Lifecycle Policy / Log rotation',
    review: 'Annual review of retention periods',
    legal_hold: 'Suspend deletion during litigation'
  }
};
```

#### 5. Mutable Log Storage

**If attackers can delete logs, they can hide their tracks.**

```typescript
// ❌ WRONG: Logs in same account with standard permissions
const insecureLogging = {
  destination: 's3://app-logs/',
  permissions: 'Developers can delete for "cleanup"',
  risk: 'Insider threat can erase evidence of PHI access'
};

// ✅ CORRECT: WORM (Write Once, Read Many) storage
const secureLogging = {
  // Separate security account
  destination: {
    primary: 's3://security-account-logs/',
    backup: 'CloudWatch Logs with resource policy'
  },

  // Immutability settings
  immutability: {
    s3ObjectLock: 'Governance mode (7 year retention)',
    vaultLock: 'Glacier Vault Lock for long-term',
    deletePermissions: 'Only security-auditor role (requires MFA + approval)'
  },

  // Real-time streaming (can't be retroactively deleted)
  streaming: {
    destination: 'Separate AWS account via Kinesis Firehose',
    encryption: 'KMS key owned by security team',
    access: 'Read-only for developers'
  },

  // Integrity verification
  integrity: {
    hashChain: 'Each log entry includes hash of previous',
    checksums: 'Daily checksum verification',
    alerting: 'Alert on any gap in log sequence'
  }
};

// Log integrity verification
interface ImmutableLogEntry {
  id: string;
  timestamp: string;
  previousHash: string;  // Hash chain
  data: unknown;
  hash: string;          // SHA-256 of this entry
}

const appendLog = (entry: unknown, previousHash: string): ImmutableLogEntry => {
  const logEntry = {
    id: generateId('log_'),
    timestamp: new Date().toISOString(),
    previousHash,
    data: entry,
    hash: '' // Computed below
  };
  logEntry.hash = sha256(JSON.stringify(logEntry));
  return logEntry;
};
```

---

### Log Correlation

**Trace requests across microservices.**

```typescript
// Correlation ID flows through entire request lifecycle
interface CorrelationContext {
  correlationId: string;    // Generated at edge (API gateway)
  requestId: string;        // Unique per service hop
  sessionId?: string;       // User session
  userId?: string;          // Authenticated user
  traceId?: string;         // Distributed tracing (OpenTelemetry)
  spanId?: string;
}

// Middleware to extract/generate correlation context
const correlationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.correlation = {
    correlationId: req.headers['x-correlation-id'] || generateId('corr_'),
    requestId: generateId('req_'),
    sessionId: req.session?.id,
    userId: req.user?.id
  };

  // Pass to downstream services
  res.setHeader('x-correlation-id', req.correlation.correlationId);
  res.setHeader('x-request-id', req.correlation.requestId);

  next();
};

// All logs include correlation context
const createLogger = (correlation: CorrelationContext) => ({
  info: (data: object, message: string) => {
    logger.info({ ...correlation, ...data }, message);
  },
  error: (data: object, message: string) => {
    logger.error({ ...correlation, ...data }, message);
  }
});

// Usage in service
const log = createLogger(req.correlation);
log.info({ orderId: 'ord_123' }, 'Processing order');
// Output includes correlationId for tracing across services
```

---

### Alerting Thresholds

**Not all logs need human attention—define what does.**

```typescript
const alertingRules = {
  // Immediate page (PagerDuty/Opsgenie)
  critical: {
    triggers: [
      'error rate > 5% for 5 minutes',
      'PHI access by unauthorized role',
      'Break-glass access invoked',
      'Multiple failed login attempts (>10 in 1 minute)',
      'Log integrity check failed',
      'Audit log gap detected'
    ],
    response: 'Immediate human review required'
  },

  // Slack/Email alert
  warning: {
    triggers: [
      'error rate > 1% for 15 minutes',
      'Unusual access pattern (off-hours, high volume)',
      'Failed FHIR/HL7 validation rate > 10%',
      'Database connection pool exhaustion'
    ],
    response: 'Review during business hours'
  },

  // Dashboard only (no alert)
  info: {
    examples: [
      'Daily PHI access counts by role',
      'API latency percentiles',
      'User session counts'
    ]
  }
};

// Example: Alert on unusual PHI access patterns
const phiAccessAnomalyDetection = {
  rules: [
    'User accessing >100 patient records in 1 hour',
    'Access from new IP/device',
    'Access to VIP patient records',
    'Bulk export requests',
    'Access outside normal working hours for role'
  ],
  action: 'Flag for security team review'
};
```

---

### AI-Assisted Development Pitfalls

**When using AI to generate logging code, watch for these patterns.**

#### 1. The "Narrative" Log Trap

**LLMs love to be conversational. Logs shouldn't be.**

```typescript
// ❌ WRONG: AI writes prose
logger.info('Successfully retrieved the user data for the person with ID 12345 from the database.');
logger.info('Now processing the order that was just created for the customer.');
logger.info('The payment has been completed and the receipt will be sent shortly.');

// Problems:
// - Hard to parse programmatically
// - Inconsistent structure
// - Verbose, wastes storage
// - Can't filter/aggregate effectively

// ✅ CORRECT: Structured JSON logs
logger.info({ event: 'user.retrieved', userId: 'usr_12345', source: 'database' });
logger.info({ event: 'order.processing', orderId: 'ord_789', customerId: 'cust_456' });
logger.info({ event: 'payment.completed', paymentId: 'pay_abc', receiptPending: true });

// Prompt fix: "Use structured logging with JSON objects, not sentences.
// Each log should have: event, relevant IDs, and status."
```

#### 2. PII/PHI Leakage from Eager Logging

**AI logs everything in scope when you say "add logging."**

```typescript
// ❌ WRONG: AI logs the entire object
const createUser = async (userData: UserData) => {
  logger.info({ userData }, 'Creating user'); // Logs password, SSN, everything!
  await db.users.create(userData);
  logger.info({ userData }, 'User created');  // Logs it AGAIN
};

// ✅ CORRECT: Explicit allow-list
const createUser = async (userData: UserData) => {
  logger.info({
    event: 'user.creating',
    email: maskEmail(userData.email), // masked: j***@example.com
    role: userData.role
  });

  const user = await db.users.create(userData);

  logger.info({
    event: 'user.created',
    userId: user.id,
    role: user.role
  });
};

// Prompt fix: "Add logging but NEVER log passwords, SSN, PHI, or full
// user objects. Only log IDs and non-sensitive metadata."
```

#### 3. The "Logging Loop" Infinity

**AI doesn't think about volume—you do.**

```typescript
// ❌ WRONG: Log inside high-frequency loop
const processRecords = async (records: Record[]) => {
  for (const record of records) {
    logger.info({ recordId: record.id }, 'Processing record'); // 10,000 logs!
    await process(record);
    logger.info({ recordId: record.id }, 'Record processed');  // 10,000 more!
  }
};
// Result: 20,000 log entries for one batch job. $$$

// ✅ CORRECT: Summary logging
const processRecords = async (records: Record[]) => {
  logger.info({
    event: 'batch.starting',
    totalRecords: records.length
  });

  let succeeded = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const record of records) {
    try {
      await process(record);
      succeeded++;
    } catch (error) {
      failed++;
      failures.push(record.id);
      // Only log failures individually (should be rare)
      logger.warn({ recordId: record.id, error: error.message }, 'Record failed');
    }
  }

  logger.info({
    event: 'batch.completed',
    totalRecords: records.length,
    succeeded,
    failed,
    failedIds: failures.slice(0, 10) // First 10 only
  });
};
// Result: 2 logs + individual failure logs (hopefully few)

// For truly high-volume: sampled logging
const shouldLog = (index: number, total: number): boolean => {
  if (total < 100) return true;           // Log all if small
  if (index === 0) return true;           // Always log first
  if (index === total - 1) return true;   // Always log last
  return index % Math.ceil(total / 10) === 0; // ~10 samples
};
```

#### 4. Generic Error "Vibes"

**AI writes the laziest possible error handling.**

```typescript
// ❌ WRONG: Useless error logs
try {
  await processOrder(order);
} catch (error) {
  console.log('An error occurred');           // What error? Where?
  logger.error('Something went wrong');       // No stack trace
  logger.error({ error }, 'Order failed');    // Logs [object Object]
}

// ✅ CORRECT: Contextual error logging
try {
  await processOrder(order);
} catch (error) {
  logger.error({
    event: 'order.processing_failed',
    orderId: order.id,
    customerId: order.customerId,
    orderTotal: order.total,
    error: {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    },
    // Input that caused the failure (sanitized)
    input: {
      itemCount: order.items.length,
      paymentMethod: order.paymentMethod
    }
  }, 'Order processing failed');

  throw error; // Re-throw after logging
}

// Prompt fix: "When adding error handling, always log:
// 1. What operation failed (event name)
// 2. Relevant IDs (order, user, etc.)
// 3. Full error with stack trace
// 4. Sanitized input that caused the failure"
```

#### 5. Inconsistent Log Levels

**AI picks levels randomly without a clear contract.**

```typescript
// ❌ WRONG: Chaotic log levels
logger.debug('CRITICAL: Payment failed!');           // DEBUG for critical?
logger.error('User logged in successfully');         // ERROR for success?
logger.info('Database connection lost');             // INFO for outage?
logger.warn('Starting application');                 // WARN for startup?

// ✅ CORRECT: Consistent logging contract
const loggingContract = {
  debug: {
    purpose: 'Developer debugging (disabled in production)',
    examples: [
      'Variable values during algorithm',
      'SQL queries with parameters',
      'Cache hit/miss details'
    ]
  },

  info: {
    purpose: 'Happy path milestones (always enabled)',
    examples: [
      'Request received/completed',
      'Order placed successfully',
      'User logged in',
      'Batch job started/finished'
    ]
  },

  warn: {
    purpose: 'Expected failures, recoverable issues',
    examples: [
      'Invalid login attempt (wrong password)',
      'Rate limit approaching',
      'Deprecated API endpoint called',
      'Retry attempt for transient failure'
    ]
  },

  error: {
    purpose: 'Unexpected failures requiring attention',
    examples: [
      'Unhandled exception',
      'Database connection failed',
      'External service unavailable',
      'Data integrity violation'
    ]
  }
};

// Prompt fix: "Follow this logging level contract:
// - DEBUG: Noisy developer details (off in prod)
// - INFO: Happy path milestones
// - WARN: Expected/recoverable failures
// - ERROR: Unexpected failures needing alerts"
```

---

### Review Checklist for AI-Generated Logging

- [ ] No narrative sentences (use structured JSON)
- [ ] No full objects logged (use allow-list)
- [ ] No logging inside high-frequency loops
- [ ] Error logs include stack trace and context
- [ ] Log levels follow consistent contract
- [ ] No PHI/PII in any log entries
- [ ] Summary logs for batch operations

---

### Checklist: Logging Standards

**Core Patterns:**
- [ ] Structured JSON logging (not string concatenation)
- [ ] Log levels used appropriately (error, warn, info, debug)
- [ ] Correlation IDs flow through all services
- [ ] Request logging with sanitized paths

**PHI Protection:**
- [ ] Allow-list approach for logged fields
- [ ] No PHI in application logs
- [ ] Separate PHI audit log with restricted access
- [ ] Path sanitization (no IDs in logged URLs)

**Audit Trail:**
- [ ] All PHI access logged with who/when/why
- [ ] Access reason captured (treatment, payment, etc.)
- [ ] Authentication events logged
- [ ] Data changes logged (create/update/delete)

**Retention & Integrity:**
- [ ] Tiered retention policy by log type
- [ ] Audit logs retained 7 years (HIPAA)
- [ ] Debug logs purged within 3-7 days
- [ ] WORM storage for audit logs
- [ ] Logs streamed to separate security account
- [ ] Log integrity verification (hash chain or checksums)

**Interoperability:**
- [ ] FHIR OperationOutcome logged for validation failures
- [ ] HL7 ACK/NAK logged with error details
- [ ] Integration errors include enough context to debug

**Alerting:**
- [ ] Critical alerts defined and routed to on-call
- [ ] PHI access anomaly detection enabled
- [ ] Log gap detection alerting

---

## Security Rules

### Authentication

```typescript
const authenticationRules = {
  // Token handling
  tokens: {
    storage: 'HttpOnly, Secure, SameSite=Strict cookies',
    neverStore: ['localStorage', 'sessionStorage', 'non-HttpOnly cookies'],
    expiration: {
      accessToken: '15 minutes',
      refreshToken: '7 days',
      sessionAbsoluteMax: '24 hours'
    }
  },

  // Password requirements
  passwords: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventCommonPasswords: true,
    preventPasswordReuse: 12  // last 12 passwords
  },

  // MFA
  mfa: {
    requiredFor: ['providers', 'admins', 'pharmacists'],
    recommendedFor: ['patients'],
    methods: ['TOTP', 'SMS (fallback only)', 'WebAuthn (preferred)']
  }
};
```

### Authorization

```typescript
// Check authorization at every layer
const authorizationRules = {
  // API layer - verify user can access resource
  apiLayer: `
    if (patient.id !== req.user.patientId && !req.user.isAdmin) {
      throw new ForbiddenError();
    }
  `,

  // Service layer - verify business rules
  serviceLayer: `
    if (order.status !== 'pending') {
      throw new BusinessRuleError('ORDER_NOT_CANCELLABLE', 'Order cannot be cancelled');
    }
  `,

  // Database layer - row-level security where possible
  databaseLayer: `
    CREATE POLICY patient_isolation ON prescriptions
    FOR ALL TO app_user
    USING (patient_id = current_setting('app.current_patient_id')::uuid)
  `,

  // Never trust client-side authorization
  neverTrust: [
    'User role from JWT without server verification',
    'Resource ownership from request body',
    'Admin flags from client'
  ]
};
```

### Input Validation

```typescript
import { z } from 'zod';

// Validate ALL input at API boundary
const patientCreateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  phone: z.string().regex(/^\+1\d{10}$/).optional()
});

// Validate before processing
const createPatient = async (req: Request) => {
  const validated = patientCreateSchema.parse(req.body);
  // validated is now typed and safe
};

// Sanitize output to prevent XSS
const sanitizeRules = {
  html: 'Escape all HTML entities',
  json: 'Use JSON.stringify, never string building',
  sql: 'Parameterized queries only'
};
```

### Secrets Management

```typescript
const secretsRules = {
  // Never commit secrets
  neverCommit: [
    'API keys',
    'Database passwords',
    'JWT signing keys',
    'Encryption keys',
    '.env files with real values'
  ],

  // Use environment variables or secrets manager
  sources: {
    development: '.env.local (git-ignored)',
    production: 'AWS Secrets Manager / HashiCorp Vault'
  },

  // Rotate secrets regularly
  rotation: {
    apiKeys: '90 days',
    databasePasswords: '90 days',
    jwtSigningKeys: '30 days'
  },

  // Access logging
  accessLogging: 'Log all secrets access with user/service identity'
};
```

---

### Healthcare Security Mistakes

#### 1. Compliance & Legal Errors

**HIPAA isn't a checkbox—it's an ongoing process.**

```typescript
const complianceErrors = {
  // ❌ WRONG: One-and-done audits
  oneAndDone: {
    mistake: 'Annual HIPAA risk assessment, then forget about it',
    reality: 'Any significant software/infrastructure change requires fresh assessment',
    fix: 'Trigger assessment on: new vendor, architecture change, breach, annually'
  },

  // ❌ WRONG: No BAA with vendors
  missingBAA: {
    mistake: 'Using cloud service, email API, or chat widget without signed BAA',
    reality: 'Immediate HIPAA violation—vendor legally cannot touch PHI',
    fix: 'Audit ALL third-party vendors. No BAA = no PHI access. Period.'
  },

  // ❌ WRONG: Shadow IT
  shadowIT: {
    mistake: 'Staff using personal WhatsApp, Gmail, Slack for patient coordination',
    reality: 'Secure systems are "cumbersome," so they route around them',
    fix: 'Provide user-friendly secure alternatives. If secure tool is harder, it won\'t be used.'
  }
};

// BAA requirement check
const vendorRequiresBAA = (vendor: Vendor): boolean => {
  return (
    vendor.accessesPHI ||
    vendor.storesData ||
    vendor.processesPatientData ||
    vendor.providesInfrastructure
  );
};

// Vendors that ALWAYS need BAAs
const baaRequired = [
  'Cloud hosting (AWS, GCP, Azure)',
  'Email services (SendGrid, SES)',
  'Error tracking (Sentry, DataDog)',
  'Analytics (if any PHI possible)',
  'Payment processors (if linked to patient)',
  'Communication tools (Twilio, chat widgets)',
  'Database hosting',
  'Backup services'
];
```

#### 2. Access Control Failures

**Identity and access mistakes destroy audit trails.**

```typescript
// ❌ WRONG: Shared logins
const sharedLoginProblem = {
  scenario: '"Nurse Station" login used by entire floor',
  consequence: 'If data is stolen, no way to prove who did it',
  fix: 'Mandatory unique user IDs + MFA for every individual'
};

// ❌ WRONG: Over-permissioning
const overPermissioning = {
  examples: [
    'Billing clerk with access to full clinical notes',
    'Developer with production database access',
    'Receptionist who can view all patient records'
  ],
  consequence: 'Single compromised account = massive blast radius',
  fix: 'Least privilege: minimum access needed for job function'
};

// ❌ WRONG: Incomplete offboarding
const offboardingFailure = {
  mistake: 'Departing employee retains access for days/weeks',
  consequence: 'Leading cause of insider-threat breaches',
  fix: 'Same-day access revocation, automated via HR system integration'
};

// ✅ CORRECT: Role-based access with least privilege
const accessControlRules = {
  roles: {
    patient: {
      canAccess: ['own records', 'own prescriptions', 'own appointments'],
      cannotAccess: ['other patients', 'provider notes', 'admin functions']
    },
    pharmacist: {
      canAccess: ['prescription queue', 'drug interactions', 'patient allergies'],
      cannotAccess: ['billing details', 'full medical history', 'admin functions']
    },
    billing: {
      canAccess: ['insurance info', 'payment history', 'claim status'],
      cannotAccess: ['clinical notes', 'lab results', 'prescriptions']
    }
  },

  enforcement: {
    database: 'Row-level security policies',
    api: 'Middleware checks on every request',
    ui: 'Hide options (but never rely on this alone)'
  },

  offboarding: {
    trigger: 'HR termination event',
    actions: [
      'Disable SSO immediately',
      'Revoke all API tokens',
      'Remove from all groups',
      'Log the revocation',
      'Notify security team'
    ],
    timeline: 'Within 1 hour of termination'
  }
};
```

#### 3. Technical & Architectural Pitfalls

**Infrastructure security is often neglected.**

```typescript
// ❌ WRONG: Hardcoded secrets
const hardcodedSecrets = {
  mistake: 'API keys in code, passwords in config files',
  reality: 'Code shared across hospital systems, leaked to GitHub',
  fix: 'Environment variables + secrets manager, never in code'
};

// ❌ WRONG: Inadequate encryption
const encryptionGaps = {
  atRest: {
    encrypted: 'Primary database',
    forgotten: ['Backups', 'Exported CSVs', 'Log files', 'Dev databases'],
    fix: 'Encrypt ALL storage, including backups and exports'
  },
  inTransit: {
    mistake: 'HTTPS for external, but HTTP between microservices',
    fix: 'mTLS between all services, no exceptions'
  }
};

// ❌ WRONG: Flat network
const networkSegmentation = {
  mistake: 'Medical devices on same network as guest WiFi',
  scenario: 'Guest laptop malware spreads to infusion pumps',
  fix: 'Strict network segmentation: clinical, corporate, guest, IoT'
};

// ✅ CORRECT: Defense in depth
const securityLayers = {
  perimeter: {
    waf: 'Web Application Firewall',
    ddos: 'DDoS protection',
    geoBlocking: 'Block unexpected countries'
  },

  network: {
    segmentation: 'Separate VLANs for clinical, corporate, guest',
    firewalls: 'East-west traffic filtering',
    zeroTrust: 'Verify every request, even internal'
  },

  application: {
    inputValidation: 'Zod schemas on all inputs',
    outputEncoding: 'Prevent XSS',
    parameterizedQueries: 'Prevent SQL injection'
  },

  data: {
    encryptionAtRest: 'AES-256 for all storage',
    encryptionInTransit: 'TLS 1.3 minimum',
    tokenization: 'Replace PHI with tokens where possible'
  }
};
```

#### 4. Operational Oversight

**Security requires ongoing vigilance, not just initial setup.**

```typescript
// ❌ WRONG: Logging without monitoring
const loggingWithoutMonitoring = {
  mistake: 'Generating logs but no one watching them',
  consequence: 'Breaches undetected for months',
  fix: 'Automated alerting on unusual patterns'
};

// ❌ WRONG: Patching procrastination
const patchingGap = {
  mistake: 'Legacy systems too fragile to update',
  consequence: 'Known ransomware vulnerabilities left open for years',
  fix: 'Scheduled patching windows, test environments, rollback plans'
};

// ✅ CORRECT: Operational security
const operationalSecurity = {
  monitoring: {
    realTime: [
      'Failed login attempts (>5 in 1 minute)',
      'Access from new IP/device',
      'Bulk data exports',
      'After-hours access by role',
      'Privilege escalation attempts'
    ],
    daily: [
      'User access reviews',
      'Failed request patterns',
      'Certificate expiration checks'
    ],
    weekly: [
      'Vulnerability scan results',
      'Patch compliance status',
      'Access audit reports'
    ]
  },

  patching: {
    critical: 'Within 24 hours',
    high: 'Within 7 days',
    medium: 'Within 30 days',
    low: 'Next maintenance window',
    process: 'Test → Stage → Canary → Production'
  },

  incidentResponse: {
    detection: 'Automated alerting',
    containment: 'Runbook with isolation steps',
    eradication: 'Remove threat, patch vulnerability',
    recovery: 'Restore from clean backups',
    lessons: 'Post-mortem, update procedures'
  }
};
```

---

### AI-Assisted Development Pitfalls

**When using AI to generate security rules, watch for these patterns.**

#### 1. The "Auth-Only" Fallacy

**Authenticated ≠ Authorized. AI often forgets the difference.**

```typescript
// ❌ WRONG: AI checks authentication but not authorization
const getPatient = async (req: Request) => {
  if (!req.user) {
    throw new UnauthorizedError(); // Good: check if logged in
  }
  // Missing: check if THIS user can access THIS patient!
  const patient = await db.patients.findById(req.params.id);
  return patient; // Any logged-in user can see any patient!
};

// ✅ CORRECT: Always verify ownership/permission
const getPatient = async (req: Request) => {
  if (!req.user) {
    throw new UnauthorizedError();
  }

  const patient = await db.patients.findById(req.params.id);

  // Check: is this the patient's own record?
  const isOwnRecord = patient.userId === req.user.id;
  // Check: is user a provider with access to this patient?
  const isAssignedProvider = await isProviderForPatient(req.user.id, patient.id);
  // Check: is user an admin?
  const isAdmin = req.user.role === 'admin';

  if (!isOwnRecord && !isAssignedProvider && !isAdmin) {
    throw new ForbiddenError('You do not have access to this patient');
  }

  return patient;
};

// Prompt fix: "For every data access, verify the user has permission
// to access THIS SPECIFIC resource, not just that they're logged in."
```

#### 2. Failure to "Fail Closed"

**AI often leaves the default state permissive.**

```typescript
// ❌ WRONG: AI adds admin check but default is permissive
const canModifyOrder = (user: User, order: Order): boolean => {
  if (user.role === 'admin') {
    return true;
  }
  // Missing else! What happens for non-admins?
  // Some frameworks default to true, some to false
};

// ❌ WRONG: Early return leaves gap
const checkAccess = (user: User, resource: Resource) => {
  if (user.role === 'admin') return; // Admins pass
  if (resource.isPublic) return;      // Public resources pass
  // Non-admin + non-public = ???  (no explicit deny!)
};

// ✅ CORRECT: Deny by default, explicitly allow
const canModifyOrder = (user: User, order: Order): boolean => {
  // Start with deny
  let allowed = false;

  // Explicitly grant access
  if (user.role === 'admin') {
    allowed = true;
  } else if (order.createdBy === user.id && order.status === 'draft') {
    allowed = true;
  }

  return allowed;
};

// ✅ BETTER: Throw by default
const checkAccess = (user: User, resource: Resource) => {
  if (user.role === 'admin') return;
  if (resource.isPublic) return;
  if (resource.ownerId === user.id) return;

  // Explicit deny at the end - never fall through
  throw new ForbiddenError('Access denied');
};

// Prompt fix: "Use deny-by-default. Every function should
// explicitly throw ForbiddenError at the end if no allow condition matched."
```

#### 3. "Shadow" Endpoints and Ghost Tables

**AI creates new features but forgets old ones.**

```typescript
// ❌ WRONG: Old endpoints left unprotected
const apiSecurityAudit = {
  problem: 'AI creates new features, leaves old ones with test rules',

  scenario: {
    v1: 'Original user table with proper auth',
    v2: 'AI pivots to marketplace, creates vendor table',
    forgotten: 'Old user_preferences table still has allow: true'
  },

  consequence: 'Publicly accessible ghost tables are top breach vector'
};

// ✅ CORRECT: Regular security audits
const securityAuditProcess = {
  // Find all endpoints
  discovery: `
    grep -r "app.get\|app.post\|router." src/
    // List all database tables
    SELECT table_name FROM information_schema.tables
  `,

  // Verify each has protection
  verification: {
    endpoints: 'Every route must have auth middleware',
    tables: 'Every table must have RLS policies',
    collections: 'Every Firestore collection must have rules'
  },

  // Remove unused
  cleanup: {
    frequency: 'Monthly',
    process: 'Flag unused for 30 days, then delete',
    exceptions: 'Audit/compliance tables with long retention'
  }
};

// Prompt fix: "After adding new features, list ALL existing
// endpoints/tables and verify each still has appropriate security rules."
```

#### 4. Client-Side "Security" Logic

**AI hallucinates that the frontend is secure.**

```typescript
// ❌ WRONG: AI "secures" via UI
// React component
const AdminPanel = () => {
  const { user } = useAuth();

  if (user.role !== 'admin') {
    return null; // "Hidden" from non-admins
  }

  return <DangerousAdminTools />;
};

// But the API has no protection!
// POST /api/admin/delete-all-users
app.post('/api/admin/delete-all-users', async (req, res) => {
  await db.users.deleteAll(); // Anyone can call this directly!
  res.json({ success: true });
});

// ✅ CORRECT: Security at every layer
// API must enforce its own security
app.post('/api/admin/delete-all-users',
  requireAuth,           // Must be logged in
  requireRole('admin'),  // Must be admin role
  requireMFA,            // Must have completed MFA
  auditLog,              // Log this sensitive action
  async (req, res) => {
    await db.users.deleteAll();
    res.json({ success: true });
  }
);

// UI hiding is UX, not security
const AdminPanel = () => {
  const { user } = useAuth();

  // Still hide in UI for better UX
  if (user.role !== 'admin') {
    return null;
  }

  return <DangerousAdminTools />;
};

// Prompt fix: "Never rely on UI hiding for security.
// The API/database must enforce all security rules as if the UI doesn't exist."
```

#### 5. Magic Strings and Hardcoded Checks

**AI learns from low-quality code and reproduces it.**

```typescript
// ❌ WRONG: Hardcoded email check
const isAdmin = (user: User): boolean => {
  return user.email === 'admin@company.com'; // What if they leave?
};

// ❌ WRONG: Magic string roles
const checkPermission = (user: User) => {
  if (user.role === 'superadmin123') { // Obscurity is not security
    return true;
  }
};

// ❌ WRONG: Hardcoded secret
const verifyWebhook = (req: Request) => {
  return req.headers['x-secret'] === 'my-super-secret-key'; // In code!
};

// ✅ CORRECT: Proper RBAC
const isAdmin = (user: User): boolean => {
  return user.roles.includes('admin'); // From database/token
};

// ✅ CORRECT: Role from claims/database
const checkPermission = async (user: User, permission: string) => {
  const userPermissions = await getPermissionsForRole(user.role);
  return userPermissions.includes(permission);
};

// ✅ CORRECT: Secrets from environment
const verifyWebhook = (req: Request) => {
  const expectedSecret = process.env.WEBHOOK_SECRET;
  return timingSafeEqual(req.headers['x-secret'], expectedSecret);
};

// Prompt fix: "Never hardcode emails, secrets, or magic strings
// for security checks. Use RBAC with roles from database/auth token."
```

---

### Infrastructure Security Mistakes

**Cloud and infrastructure misconfigurations are the #1 cause of breaches.**

#### 1. The "Open Window" (Misconfigured Cloud Storage)

**Public S3 buckets are the leading cause of data breaches.**

```typescript
// ❌ WRONG: Quick dev setup left public
const s3BucketMisconfiguration = {
  scenario: 'Engineer creates bucket for dev, forgets to lock it down',
  access: 'Public - anyone with URL can access',
  contents: 'PHI exports, database backups, uploaded documents',
  consequence: 'Massive data leak, HIPAA breach notification required'
};

// ✅ CORRECT: Deny public by default
const s3SecurityPolicy = {
  // Account-level block
  accountLevel: {
    blockPublicAcls: true,
    ignorePublicAcls: true,
    blockPublicPolicy: true,
    restrictPublicBuckets: true
  },

  // Service Control Policy (SCP) prevents public buckets
  scp: `{
    "Effect": "Deny",
    "Action": [
      "s3:PutBucketPublicAccessBlock",
      "s3:PutAccountPublicAccessBlock"
    ],
    "Resource": "*",
    "Condition": {
      "Bool": {
        "s3:PublicAccessBlockConfiguration": "false"
      }
    }
  }`,

  // Bucket policy requires encryption
  encryption: 'AES-256 or AWS KMS required for all objects',

  // Access logging
  logging: 'All access logged to separate audit bucket'
};

// Automated detection
const storageAudit = {
  frequency: 'Continuous (AWS Config / Azure Policy)',
  alerts: [
    'Public bucket detected',
    'Bucket without encryption',
    'Bucket without logging',
    'Cross-account access granted'
  ],
  autoRemediation: 'Automatically block public access on detection'
};
```

#### 2. Over-Privileged Accounts

**"Admin for everything" is convenient until it's compromised.**

```typescript
// ❌ WRONG: Over-privileged for convenience
const overPrivileged = {
  dev: 'Has AdministratorAccess to production',
  app: 'Lambda function has full S3 and RDS access',
  cicd: 'Pipeline has root account credentials',
  consequence: 'Single compromised credential = total system access'
};

// ✅ CORRECT: Least privilege + JIT access
const leastPrivilege = {
  // Principle: minimum permissions for the task
  principle: 'If it only reads files, it cannot delete the database',

  // Service accounts: task-specific permissions
  serviceAccounts: {
    'prescription-api': {
      s3: ['GetObject on /prescriptions/*'],
      rds: ['SELECT on prescriptions, patients'],
      secrets: ['GetSecretValue on /prod/prescription-api/*']
    },
    'backup-service': {
      s3: ['PutObject on /backups/*'],
      rds: ['pg_dump role'],
      // No delete permissions
    }
  },

  // Developer access: JIT (Just-In-Time)
  developerAccess: {
    default: 'Read-only to production',
    elevated: {
      duration: '1 hour maximum',
      approval: 'Requires manager approval',
      logging: 'All actions logged',
      justification: 'Required in ticket system'
    }
  },

  // No standing admin access
  adminAccess: {
    breakGlass: 'Emergency-only, requires two approvers',
    audit: 'Security team notified immediately',
    rotation: 'Break-glass credentials rotated after each use'
  }
};

// IAM policy example
const restrictedPolicy = {
  Version: '2012-10-17',
  Statement: [{
    Effect: 'Allow',
    Action: ['s3:GetObject'],
    Resource: 'arn:aws:s3:::phi-documents/*',
    Condition: {
      'ForAnyValue:StringEquals': {
        'aws:PrincipalTag/team': 'clinical'
      }
    }
  }]
};
```

#### 3. Default Credentials

**Factory settings are public knowledge.**

```typescript
// ❌ WRONG: Default credentials in production
const defaultCredentials = {
  database: 'postgres / postgres',
  router: 'admin / admin',
  iot: 'root / root',
  monitoring: 'admin / changeme',
  consequence: 'Trivial unauthorized access'
};

// ✅ CORRECT: Automated credential management
const credentialManagement = {
  // No default credentials ever
  policy: 'Devices with default credentials are auto-quarantined',

  // Automated rotation
  rotation: {
    databases: 'Secrets Manager with 30-day rotation',
    serviceAccounts: '90-day rotation',
    apiKeys: '90-day rotation',
    certificates: 'Auto-renewal before expiry'
  },

  // Detection
  scanning: {
    tools: ['Nessus', 'Qualys', 'AWS Inspector'],
    frequency: 'Weekly',
    action: 'Block device on detection, alert security team'
  },

  // Password requirements for human accounts
  humanAccounts: {
    minLength: 16,
    mfa: 'Required',
    rotation: '90 days',
    uniqueness: 'Cannot reuse last 24 passwords',
    breachCheck: 'Checked against HaveIBeenPwned on set'
  }
};
```

#### 4. Secret Sprawl

**Secrets everywhere means secrets nowhere safe.**

```typescript
// ❌ WRONG: Secret sprawl
const secretSprawl = {
  locations: [
    'Hardcoded in source code',
    '.env files committed to Git',
    'Plaintext config files',
    'Slack messages',
    'Shared documents',
    'Developer laptops'
  ],
  consequence: 'Any developer who leaves takes secrets with them'
};

// ✅ CORRECT: Centralized secret management
const secretManagement = {
  // Single source of truth
  store: 'AWS Secrets Manager / HashiCorp Vault',

  // Access control
  access: {
    production: 'Only CI/CD pipeline and production services',
    staging: 'Pipeline + approved developers',
    development: 'Local secrets (never production values)'
  },

  // Never in code
  neverIn: [
    'Source code',
    'Git history',
    'Docker images',
    'Log files',
    'Error messages',
    'Config files (use references instead)'
  ],

  // Detection
  scanning: {
    preCommit: 'git-secrets, trufflehog',
    ci: 'Scan every PR for leaked secrets',
    action: 'Block merge, rotate exposed secret immediately'
  },

  // Reference pattern
  referencePattern: `
    // ❌ Wrong
    const dbPassword = 'super-secret-password';

    // ✅ Correct
    const dbPassword = await secretsManager.getSecretValue({
      SecretId: 'prod/database/password'
    });
  `
};
```

#### 5. Verbose Error Messages

**Helpful to developers, more helpful to attackers.**

```typescript
// ❌ WRONG: Verbose errors in production
const verboseError = {
  response: `
    Error: ECONNREFUSED
    PostgreSQL 14.2 on ip-10-0-1-123.ec2.internal:5432
    Query: SELECT * FROM patients WHERE id = '${userId}'
    Stack trace:
      at Connection.connect (/app/node_modules/pg/lib/client.js:132)
      at /app/src/services/patient.ts:47:23
  `,
  revealed: [
    'Database version',
    'Internal IP addresses',
    'Table structure',
    'File paths',
    'SQL query patterns'
  ]
};

// ✅ CORRECT: Generic user messages, detailed internal logs
const errorHandling = {
  // User sees generic message
  userFacing: {
    message: 'An error occurred. Please try again.',
    errorId: 'err_abc123', // For support reference
    support: 'If this persists, contact support with this error ID.'
  },

  // Internal log has full details
  internalLog: {
    errorId: 'err_abc123',
    timestamp: '2024-01-15T10:30:00Z',
    requestId: 'req_xyz789',
    userId: 'usr_456',
    error: {
      type: 'DatabaseConnectionError',
      message: 'ECONNREFUSED',
      host: 'ip-10-0-1-123.ec2.internal',
      port: 5432,
      stack: '...'
    },
    request: {
      method: 'GET',
      path: '/api/patients/:id',
      // Sanitized - no PHI
    }
  },

  // Environment-specific
  byEnvironment: {
    development: 'Full stack traces OK',
    staging: 'Errors to logs only',
    production: 'Generic messages only, full logs to monitoring'
  }
};
```

---

### Infrastructure Quick Reference

| Mistake | Impact | Fix |
|---------|--------|-----|
| Public cloud buckets | Massive data leaks | Default "deny public" policies |
| Over-privileged accounts | System-wide compromise | Least privilege + JIT access |
| Default passwords | Trivial account takeover | Automated rotation + quarantine |
| Hardcoded secrets | Secrets in Git history | Centralized secret manager |
| Flat networks | Lateral movement | Micro-segmentation |
| Verbose errors | Attack roadmap | Generic messages, detailed logs |

---

### Quick Reference: Mistakes vs Fixes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Shared accounts | No accountability in audits | Mandatory unique user IDs + MFA |
| No BAA signed | Immediate HIPAA violation | Audit all third-party vendors |
| Flat networks | Ransomware spreads to devices | Strict network segmentation |
| Weak input validation | SQL injection / data breaches | Zod schemas, treat all input as untrusted |
| Auth without authz | Any user sees all data | Verify ownership for every request |
| Fail-open logic | Bypass by skipping checks | Deny-by-default, explicit allow |
| Ghost endpoints | Unprotected old features | Monthly security audits |
| UI-only security | Direct API access bypasses | Enforce at API/database level |
| Hardcoded secrets | Leaked to version control | Environment variables + secrets manager |

---

### Digital Hygiene (User Security Practices)

**Individual habits that prevent low-effort attacks.**

This applies to all staff using the platform and should be enforced through training and technical controls.

#### 1. Password Recycling

**Same password everywhere = one breach compromises everything.**

```typescript
const passwordRecycling = {
  attack: 'Credential Stuffing',
  scenario: 'Niche forum breached → credentials used on bank, work email',

  // Technical controls to enforce
  enforcement: {
    breachCheck: 'Check passwords against HaveIBeenPwned on registration/change',
    passwordManager: 'Provide enterprise password manager to all staff',
    uniqueness: 'Cannot reuse any of last 24 passwords',
    complexity: '16+ characters, no common patterns'
  },

  // Training
  training: [
    'Annual security awareness training',
    'Phishing simulation exercises',
    'Password manager onboarding for new hires'
  ]
};

// HaveIBeenPwned check (k-anonymity safe)
const isPasswordBreached = async (password: string): Promise<boolean> => {
  const hash = sha1(password).toUpperCase();
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const hashes = await response.text();

  return hashes.includes(suffix);
};
```

#### 2. Patch Management ("Update Later" Syndrome)

**Delayed updates leave known vulnerabilities open.**

```typescript
const patchManagement = {
  risk: 'Zero-day exploits actively scanned by botnets',

  // Staff device policy
  devicePolicy: {
    os: 'Auto-update enabled, enforced via MDM',
    browsers: 'Auto-update, block outdated versions from accessing PHI',
    applications: 'Centralized patch management (Jamf, Intune)',
    compliance: 'Devices out of compliance cannot access network'
  },

  // Server/infrastructure patching
  infrastructure: {
    critical: 'Within 24 hours',
    high: 'Within 7 days',
    medium: 'Within 30 days',
    process: 'Test → Stage → Canary → Production'
  },

  // Tracking
  tracking: {
    dashboard: 'Patch compliance visibility',
    alerting: 'Alert on devices >7 days behind',
    escalation: 'Manager notified after 14 days'
  }
};
```

#### 3. MFA Fatigue

**Having MFA isn't enough—it must be implemented correctly.**

```typescript
const mfaRisks = {
  // SMS MFA vulnerabilities
  smsMfa: {
    attack: 'SIM Swapping - hacker ports your number to their SIM',
    mitigation: 'Use app-based TOTP or hardware keys instead'
  },

  // MFA fatigue attack
  mfaFatigue: {
    attack: 'Attacker spams login attempts → user approves to stop notifications',
    mitigation: 'Number matching required, rate limiting on prompts'
  }
};

// ✅ CORRECT: MFA implementation
const mfaPolicy = {
  // Preferred methods (in order)
  methods: [
    { type: 'WebAuthn/FIDO2', security: 'Highest', example: 'YubiKey, Touch ID' },
    { type: 'TOTP App', security: 'High', example: 'Google Authenticator, Authy' },
    { type: 'Push with Number Match', security: 'Medium', example: 'Microsoft Authenticator' },
    { type: 'SMS', security: 'Low', example: 'Only as fallback, discouraged' }
  ],

  // Fatigue prevention
  fatiguePrevention: {
    numberMatching: 'User must enter number shown on screen',
    rateLimit: 'Max 3 prompts per 5 minutes',
    locationContext: 'Show login location for user to verify',
    denyOption: 'Easy "This wasn\'t me" button that locks account'
  },

  // Requirements by role
  byRole: {
    admin: 'Hardware key required',
    provider: 'TOTP or hardware key',
    staff: 'TOTP minimum',
    patient: 'TOTP recommended, SMS allowed'
  }
};
```

#### 4. Social Engineering Awareness

**Public information enables targeted attacks.**

```typescript
const socialEngineering = {
  // What attackers gather
  publicInfo: [
    'Pet names (security questions)',
    'High school name (security questions)',
    'Mother\'s maiden name (security questions)',
    'Workplace badge photos (access cloning)',
    'Desk/office photos (internal system info)',
    'Vacation posts (house is empty)'
  ],

  // Healthcare-specific risks
  healthcareRisks: [
    'Impersonating IT support to get login credentials',
    'Fake "urgent patient" calls to bypass verification',
    'Phishing emails mimicking EHR notifications'
  ],

  // Training requirements
  training: {
    frequency: 'Quarterly refresher',
    phishingTests: 'Monthly simulated phishing',
    reportingProcess: 'Easy "Report Phishing" button in email client',
    noShame: 'No punishment for clicking—focus on learning'
  },

  // Technical controls
  controls: {
    emailFiltering: 'Advanced threat protection',
    linkScanning: 'Real-time URL verification',
    senderVerification: 'DMARC, DKIM, SPF enforced',
    bannerWarnings: 'External email warning banner'
  }
};
```

#### 5. Ghost Accounts

**Forgotten accounts are unmonitored attack surfaces.**

```typescript
const ghostAccounts = {
  risk: 'Breached accounts unnoticed for years',

  // Platform-side controls
  platformControls: {
    inactiveAccounts: {
      warningAt: '60 days inactive',
      disableAt: '90 days inactive',
      deleteAt: '180 days inactive (after data export option)'
    },

    sessionManagement: {
      maxConcurrent: 3,
      idleTimeout: '15 minutes for PHI access',
      absoluteTimeout: '8 hours'
    },

    accountRecovery: {
      verifyIdentity: 'Multi-factor verification required',
      cooldown: '24 hour delay on password reset',
      notification: 'Alert to all registered contacts'
    }
  },

  // Staff requirements
  staffRequirements: {
    digitalAudit: 'Annual review of granted access',
    accessRecertification: 'Quarterly by managers',
    offboarding: 'Same-day revocation'
  }
};
```

#### 6. Unsecured Networks

**Public WiFi is an open channel for attackers.**

```typescript
const networkSecurity = {
  // Risks
  publicWifiRisks: [
    'Man-in-the-Middle (MitM) attacks',
    'Packet sniffing',
    'Evil twin networks (fake hotspots)',
    'Session hijacking'
  ],

  // Policy for staff
  staffPolicy: {
    corporateData: 'VPN required on any non-corporate network',
    phiAccess: 'No PHI access on public WiFi, even with VPN',
    preferredConnection: 'Cellular hotspot over public WiFi',
    vpnAlwaysOn: 'Auto-connect VPN when off corporate network'
  },

  // Technical enforcement
  enforcement: {
    conditionalAccess: 'Block PHI access from untrusted networks',
    deviceCertificates: 'Only managed devices on clinical network',
    networkDetection: 'Auto-classify network trust level'
  }
};
```

---

### Hygiene vs Architecture Comparison

| Aspect | Architecture & Configuration | Digital Hygiene |
|--------|------------------------------|-----------------|
| **Responsibility** | Developers & IT Pros | Every individual user |
| **Focus** | How systems are built | How systems are used |
| **Example Failure** | Misconfigured firewall | Weak/shared password |
| **Risk** | Mass system breach | Personal identity theft |
| **Training** | Technical certification | Security awareness program |

---

### Authentication Attack Patterns

**Attacks that trick systems into believing an attacker is a legitimate user.**

#### Credential Stuffing & Password Spraying

```typescript
// Credential Stuffing: Automated attempts with leaked credential pairs
// Password Spraying: Common passwords tried across many accounts

const credentialAttackDefense = {
  // Rate limiting
  rateLimiting: {
    perAccount: 'Max 5 failed attempts, then 15-minute lockout',
    perIP: 'Max 20 failed attempts across all accounts, then block',
    global: 'Alert security team if >100 failed logins/minute'
  },

  // Progressive delays
  progressiveDelay: {
    attempt1: '0 seconds',
    attempt2: '1 second',
    attempt3: '2 seconds',
    attempt4: '4 seconds',
    attempt5: 'Account locked for 15 minutes'
  },

  // Detection
  detection: {
    samePasswordMultipleAccounts: 'Alert on password spraying pattern',
    knownBadCredentials: 'Check against leaked credential databases',
    impossibleTravel: 'Login from NYC then London in 10 minutes'
  },

  // CAPTCHA
  captcha: {
    trigger: 'After 3 failed attempts',
    type: 'Invisible reCAPTCHA, escalate to challenge if suspicious'
  }
};

// Implementation
const handleLogin = async (email: string, password: string, req: Request) => {
  // Check rate limits first
  const attempts = await getFailedAttempts(email);
  if (attempts >= 5) {
    throw new TooManyRequestsError('Account temporarily locked');
  }

  const ipAttempts = await getFailedAttemptsByIP(req.ip);
  if (ipAttempts >= 20) {
    throw new TooManyRequestsError('Too many login attempts');
  }

  // Verify credentials
  const user = await verifyCredentials(email, password);
  if (!user) {
    await incrementFailedAttempts(email);
    await incrementFailedAttemptsByIP(req.ip);
    // Generic message - don't reveal if account exists
    throw new UnauthorizedError('Invalid credentials');
  }

  // Clear failed attempts on success
  await clearFailedAttempts(email);
  return user;
};
```

#### Weak Recovery Logic (Security Questions)

```typescript
// ❌ WRONG: Knowledge-Based Authentication (KBA)
const weakRecovery = {
  questions: [
    'What was the name of your first pet?',      // On Facebook
    'What city were you born in?',                // On LinkedIn
    'What is your mother\'s maiden name?'         // Public records
  ],
  risk: 'All answers findable on social media or public records'
};

// ✅ CORRECT: Secure recovery patterns
const secureRecovery = {
  // Primary: Email/phone verification
  primary: {
    method: 'Send code to verified email/phone',
    expiry: '15 minutes',
    attempts: 'Max 3 verification attempts',
    cooldown: '1 hour between reset requests'
  },

  // High-security accounts: Multi-step
  highSecurity: {
    step1: 'Email verification',
    step2: 'SMS/TOTP verification',
    step3: '24-hour delay before password change takes effect',
    notification: 'Alert sent to all registered contacts'
  },

  // Never use
  neverUse: [
    'Security questions (KBA)',
    'Email-only reset for admin accounts',
    'Immediate password change (allow time for user to notice fraud)'
  ]
};
```

#### Session Fixation

```typescript
// Session fixation: Attacker knows session ID before login,
// then "inherits" authenticated session

// ❌ WRONG: Session ID doesn't change on login
const vulnerableLogin = async (user: User, session: Session) => {
  session.userId = user.id; // Same session ID, now authenticated!
  session.isAuthenticated = true;
};

// ✅ CORRECT: Regenerate session on authentication state change
const secureLogin = async (user: User, req: Request, res: Response) => {
  // Destroy old session completely
  await req.session.destroy();

  // Create new session with new ID
  req.session = await createNewSession();
  req.session.userId = user.id;
  req.session.isAuthenticated = true;
  req.session.createdAt = Date.now();

  // Set new cookie
  res.cookie('sessionId', req.session.id, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });
};

// Also regenerate on:
const sessionRegenerationTriggers = [
  'Login (authentication)',
  'Logout',
  'Privilege escalation (e.g., entering admin mode)',
  'Password change',
  'MFA completion'
];
```

---

### Authorization Attack Patterns

**Attacks where authenticated users access things they shouldn't.**

#### Insecure Direct Object References (IDOR)

```typescript
// IDOR: Changing URL/ID to access someone else's data

// ❌ WRONG: No ownership check
app.get('/api/receipts/:id', async (req, res) => {
  const receipt = await db.receipts.findById(req.params.id);
  return res.json(receipt); // Anyone can view any receipt!
});

// ✅ CORRECT: Always verify ownership
app.get('/api/receipts/:id', requireAuth, async (req, res) => {
  const receipt = await db.receipts.findById(req.params.id);

  if (!receipt) {
    throw new NotFoundError('Receipt not found');
  }

  // Ownership check
  if (receipt.userId !== req.user.id && !req.user.isAdmin) {
    // Don't reveal that receipt exists
    throw new NotFoundError('Receipt not found');
  }

  return res.json(receipt);
});

// Even better: Scoped queries
app.get('/api/receipts/:id', requireAuth, async (req, res) => {
  // Query already scoped to user's data
  const receipt = await db.receipts.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id // Built into query
    }
  });

  if (!receipt) {
    throw new NotFoundError('Receipt not found');
  }

  return res.json(receipt);
});

// Use UUIDs/CUIDs to prevent enumeration
const idorPrevention = {
  ids: 'Use UUIDs or prefixed CUIDs (rx_abc123), not sequential integers',
  reason: 'Harder to guess valid IDs even if authorization is bypassed',
  note: 'Obscurity is NOT security, but it reduces attack surface'
};
```

#### Privilege Creep

```typescript
// Privilege creep: Accumulated permissions from role changes

const privilegeCreep = {
  scenario: {
    year1: 'Employee starts in Marketing (email, CRM access)',
    year2: 'Moves to Sales (keeps Marketing + adds Sales tools)',
    year3: 'Moves to IT (keeps all above + adds admin access)',
    result: '"God Mode" account with unnecessary attack surface'
  }
};

// ✅ CORRECT: Role-based with automatic cleanup
const roleManagement = {
  // When role changes, permissions reset to new role only
  onRoleChange: {
    action: 'Revoke all current permissions, grant new role permissions',
    notify: 'User notified of access changes',
    audit: 'Change logged with approver'
  },

  // Quarterly access reviews
  accessReviews: {
    frequency: 'Quarterly',
    owner: 'Each manager reviews direct reports',
    questions: [
      'Does this person still need this access?',
      'Has their role changed?',
      'Is access scope appropriate for current duties?'
    ],
    action: 'Unrequired access automatically revoked after review'
  },

  // Access certification
  certification: {
    highRisk: 'Monthly recertification for admin/PHI access',
    standard: 'Quarterly recertification',
    unused: 'Revoke access not used in 90 days'
  }
};
```

#### Static/Standing Privileges

```typescript
// Static privileges: 24/7 access when only needed occasionally

// ❌ WRONG: Always-on admin access
const staticPrivileges = {
  account: 'DBA_Admin',
  access: 'Full database admin, 24/7',
  usage: 'Actually used ~2 hours/month',
  risk: 'If compromised, attacker has permanent admin access'
};

// ✅ CORRECT: Just-In-Time (JIT) Access
const jitAccess = {
  // Request workflow
  request: {
    user: 'DBA requests elevated access',
    justification: 'Required: ticket number and reason',
    approval: 'Manager approval via workflow',
    duration: 'Max 4 hours, extendable once'
  },

  // Automatic expiry
  expiry: {
    warning: '15 minutes before expiry',
    action: 'Access automatically revoked at expiry',
    extension: 'Must re-request and re-justify'
  },

  // Logging
  logging: {
    grant: 'Log who approved, when, why',
    actions: 'Log all actions during elevated session',
    revocation: 'Log when access expired/revoked'
  },

  // Implementation options
  tools: [
    'AWS IAM Identity Center with time-limited role assumption',
    'HashiCorp Vault with lease-based secrets',
    'CyberArk/BeyondTrust for privileged access management'
  ]
};
```

---

### Lifecycle Management (The "Ghost in the Machine")

**Process failures that leave accounts active when they shouldn't be.**

```typescript
const lifecycleFailures = {
  // Orphaned accounts
  orphaned: {
    cause: 'Employee leaves, VPN/cloud access not disabled',
    risk: 'Quiet long-term breach via forgotten credentials',
    detection: 'Often undetected for months or years'
  },

  // Inadequate offboarding
  inadequateOffboarding: {
    cause: 'Third-party tools not tied to corporate directory',
    examples: ['Slack', 'GitHub', 'Salesforce', 'AWS IAM'],
    risk: 'Ex-employee retains access to sensitive systems'
  }
};

// ✅ CORRECT: Automated deprovisioning
const automatedDeprovisioning = {
  // Single source of truth
  source: 'HR system (Workday, BambooHR) is authoritative',

  // Trigger: Employment status change
  trigger: {
    event: 'Employee marked as terminated in HR system',
    timing: 'Immediate (same-day, preferably same-hour)'
  },

  // Automated actions
  actions: [
    'Disable SSO/Active Directory account',
    'Revoke all OAuth tokens',
    'Remove from all groups/roles',
    'Disable VPN access',
    'Revoke cloud provider access (AWS, GCP, Azure)',
    'Remove from GitHub organization',
    'Disable Slack/Teams account',
    'Revoke database credentials',
    'Invalidate all active sessions',
    'Disable physical badge access'
  ],

  // Verification
  verification: {
    automated: 'Script verifies all systems show disabled',
    manual: 'Security team spot-checks high-risk departures',
    report: 'Daily report of access changes to security team'
  },

  // Contractor/vendor handling
  contractors: {
    endDate: 'All access automatically expires on contract end date',
    review: 'Monthly review of active contractor access',
    noAutoRenew: 'Access must be explicitly renewed, never auto-extended'
  }
};
```

---

### The Three Pillars of Access

| Aspect | Authentication | Authorization | Lifecycle Management |
|--------|---------------|---------------|---------------------|
| **Question** | "Are you who you say?" | "Can you do this action?" | "Should you still have access?" |
| **Failure Example** | Brute forcing weak password | Changing URL to see private file | Ex-employee still has login |
| **Best Practice** | MFA & Rate Limiting | Least Privilege & RBAC | Automated Deprovisioning |
| **Attack Pattern** | Credential stuffing | IDOR | Orphaned accounts |

---

### Zero Trust: The "Internal Trust" Fallacy

**Never assume internal network = trusted user.**

```typescript
const zeroTrust = {
  // Old model (Castle-and-Moat)
  oldModel: {
    assumption: 'If you\'re inside the network, you\'re trusted',
    failure: 'VPN credentials stolen → full internal access',
    reality: 'Attackers live inside networks for months undetected'
  },

  // Zero Trust model
  zeroTrustModel: {
    principle: 'Never trust, always verify',
    scope: 'Every request, even from CEO\'s laptop, must be verified',
    verification: 'Identity + Device health + Context + Continuous'
  },

  // Implementation
  implementation: {
    identity: {
      mfa: 'Required for every access, not just initial login',
      sso: 'Centralized identity provider',
      risk: 'Risk-based authentication (new device = step-up)'
    },

    device: {
      health: 'Device must be compliant (patched, encrypted)',
      managed: 'Prefer managed devices for sensitive access',
      posture: 'Continuous device health monitoring'
    },

    network: {
      microsegmentation: 'Every workload isolated',
      encryption: 'mTLS between all services',
      noVpn: 'VPN not required for cloud resources'
    },

    access: {
      leastPrivilege: 'Minimum access for the task',
      jit: 'Time-limited access grants',
      continuous: 'Access can be revoked mid-session if risk detected'
    }
  }
};
```

---

### Checklist: Security Rules

**Authentication:**
- [ ] Tokens in HttpOnly, Secure, SameSite=Strict cookies
- [ ] No tokens in localStorage/sessionStorage
- [ ] Short access token expiry (15 min)
- [ ] MFA required for privileged roles (hardware keys for admin)
- [ ] Password complexity enforced (16+ chars)
- [ ] Passwords checked against breach databases
- [ ] Rate limiting on login attempts (5 per account, 20 per IP)
- [ ] Session regeneration on authentication state changes
- [ ] No security questions (KBA) for account recovery

**Authorization:**
- [ ] Every request checks ownership/permission (not just auth)
- [ ] Deny-by-default pattern
- [ ] Row-level security in database
- [ ] No client-side only security checks
- [ ] Least privilege for all roles
- [ ] IDOR prevention (scoped queries, ownership checks)
- [ ] JIT access for admin/elevated privileges
- [ ] Quarterly access reviews with automatic revocation

**Healthcare Compliance:**
- [ ] BAA signed with all PHI-touching vendors
- [ ] Risk assessment after significant changes
- [ ] No shared logins (unique IDs for all users)
- [ ] Same-day offboarding revocation
- [ ] Shadow IT alternatives provided

**Infrastructure:**
- [ ] All storage encrypted (including backups)
- [ ] TLS 1.3 for all traffic (including internal)
- [ ] Network segmentation (clinical, corporate, guest)
- [ ] No hardcoded secrets in code
- [ ] Secrets rotated on schedule

**Operations:**
- [ ] Real-time alerting on security events
- [ ] Critical patches within 24 hours
- [ ] Monthly security audits for ghost endpoints
- [ ] Incident response runbook exists
- [ ] Regular penetration testing

---

## Testing Requirements

### Test Pyramid

```typescript
const testingRequirements = {
  coverage: {
    unit: '80% minimum',
    integration: 'All API endpoints',
    e2e: 'Critical user journeys'
  },
  unit: {
    focus: 'Pure business logic, utilities, validators',
    framework: 'Vitest',
    characteristics: ['Fast', 'Isolated', 'No external dependencies']
  },
  integration: {
    focus: 'API endpoints, database operations',
    framework: 'Vitest + Supertest',
    characteristics: ['Test real database', 'Mock external services']
  },
  e2e: {
    focus: 'Critical user flows',
    framework: 'Playwright',
    characteristics: ['Full browser', 'Real or staging environment']
  }
};
```

### Test Naming

```typescript
describe('OrderService', () => {
  describe('createOrder', () => {
    // ✅ CORRECT
    it('creates order with pending status when payment is authorized', async () => {});
    it('throws BusinessRuleError when patient has outstanding balance', async () => {});
    it('sends confirmation email after successful order creation', async () => {});

    // ❌ WRONG
    it('calls stripe.paymentIntents.create', async () => {});
  });
});
```

### Test Data

```typescript
const testDataRules = {
  factories: `
    const patientFactory = (overrides?: Partial<Patient>): Patient => ({
      id: generateId('pat_'),
      firstName: 'Test',
      lastName: 'Patient',
      email: \`test-\${Date.now()}@example.com\`,
      ...overrides
    });
  `,
  neverUse: [
    'Real patient data',
    'Real provider NPIs',
    'Real addresses',
    'Production database snapshots'
  ],
  cleanup: 'Use transactions that rollback, or truncate tables between tests'
};
```

### Test File Structure

#### Colocated Tests (Modern Standard)

Tests live alongside the component or utility they verify:

```plaintext
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   └── PrescriptionCard/
│       ├── PrescriptionCard.tsx
│       ├── PrescriptionCard.test.tsx
│       └── PrescriptionCard.stories.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useAuth.test.ts
│   ├── usePrescriptions.ts
│   └── usePrescriptions.test.ts
├── utils/
│   ├── formatCurrency.ts
│   ├── formatCurrency.test.ts
│   ├── dosageCalculator.ts
│   └── dosageCalculator.test.ts
```

**Why colocation works:**

```typescript
const colocationBenefits = {
  discoverability: 'No hunting through massive folder trees',
  refactoringSafety: 'Delete folder = delete tests (no orphans)',
  encapsulation: 'Folder is a standalone "package"',
  codeReview: 'Reviewer sees component and tests together'
};
```

#### Global Test Directory (Exceptions)

Certain tests require a dedicated top-level directory:

```plaintext
project-root/
├── src/
├── tests/
│   ├── e2e/
│   │   ├── auth.spec.ts
│   │   ├── prescription-refill.spec.ts
│   │   └── checkout.spec.ts
│   ├── fixtures/
│   │   ├── patient-profile.json
│   │   ├── prescription-list.json
│   │   └── provider-response.json
│   ├── factories/
│   │   ├── patient.factory.ts
│   │   ├── prescription.factory.ts
│   │   └── order.factory.ts
│   └── setup/
│       ├── globalSetup.ts
│       ├── msw-handlers.ts
│       └── test-utils.tsx
```

**When to use global `tests/` directory:**

```typescript
const globalTestsUseCases = {
  e2e: 'Tests deployed app, not individual source files',
  fixtures: 'Mock data shared across test types',
  factories: 'Centralized test data generation',
  setup: 'Global config (MSW, providers, utilities)'
};
```

#### Naming Conventions

```typescript
const testFileNaming = {
  '.test.tsx': 'Standard unit/integration tests (Vitest)',
  '.test.ts': 'Non-component tests (utilities, hooks)',
  '.spec.ts': 'E2E tests (Playwright standard)',
  '.stories.tsx': 'Storybook component stories',
  '.cy.ts': 'Cypress-specific tests (if using Cypress)'
};

const vitestConfig = {
  include: ['src/**/*.test.{ts,tsx}'],
  exclude: ['**/node_modules/**', '**/e2e/**']
};

const playwrightConfig = {
  testMatch: 'tests/e2e/**/*.spec.ts'
};
```

#### Colocation vs Centralized Comparison

| Feature | Colocation (Modern) | Centralized `/tests` (Legacy) |
|---------|---------------------|-------------------------------|
| Maintenance | Easy; tests move with code | Difficult; paths often break |
| Context | Immediate; docs and tests side-by-side | Distant; must switch folders |
| Cleanup | Automatic on folder deletion | Manual; leads to "dead" tests |
| Best For | Components, Hooks, Utils | Global E2E, System Integration |
| Discoverability | Obvious; same folder | Requires mental mapping |
| Code Review | Component + tests in one PR view | Tests in separate folder |

### CI Requirements

```typescript
const ciRequirements = {
  requiredChecks: [
    'Unit tests pass',
    'Integration tests pass',
    'Type check passes (tsc --noEmit)',
    'Lint passes (ESLint)',
    'Format check (Prettier)',
    'Security scan (npm audit, Snyk)',
    'Coverage thresholds met',
    'Accessibility audit passes (axe-core)',
    'Performance budget check',
    'Visual regression (Percy/Applitools)'
  ],
  branchProtection: {
    main: { requiredReviews: 1, requiredChecks: true, noForcePush: true }
  }
};
```

### The Testing Trophy (2026)

The old "Testing Pyramid" suggested 90% unit tests. Modern best practices favor a **Testing Trophy** shape where integration tests are the sweet spot:

```typescript
const testingTrophy = {
  static: {
    tools: ['TypeScript', 'ESLint'],
    catches: ['Typos', 'Null checks', 'Type mismatches', 'Import errors'],
    effort: 'Zero—runs automatically on save'
  },
  unit: {
    focus: 'Complex business logic, algorithms, calculations',
    examples: ['Dosage calculator', 'Price formatter', 'Date validator'],
    antiPattern: 'Don\'t unit-test a button that just renders text'
  },
  integration: {
    focus: 'How components work together from user perspective',
    framework: 'React Testing Library',
    examples: [
      'Does clicking "Add to Cart" update the Cart header?',
      'Does form submission show success message?',
      'Does error state display correctly?'
    ],
    coverage: 'Most of your tests should be here'
  },
  e2e: {
    focus: 'Full user journeys in real browser',
    framework: 'Playwright',
    examples: ['Login flow', 'Checkout', 'Prescription refill'],
    target: 'Under 5-10 minutes (parallelized)'
  },
  visual: {
    tools: ['Chromatic', 'Percy', 'Applitools'],
    catches: 'CSS bugs functional tests never will',
    examples: ['Button turning transparent', 'Layout breaking on mobile']
  }
};
```

### Test User Behavior, Not Implementation

**This is the #1 testing mistake.** If you test internal state, tests break on every refactor—even when users see no change.

```typescript
// ❌ WRONG
it('opens modal when clicked', () => {
  const wrapper = shallow(<PrescriptionDetails />);
  wrapper.find('button').simulate('click');
  expect(wrapper.state('isOpen')).toBe(true);
});

// ✅ CORRECT
it('shows prescription details when View button clicked', async () => {
  render(<PrescriptionDetails prescription={mockPrescription} />);
  await userEvent.click(screen.getByRole('button', { name: /view details/i }));
  expect(screen.getByText('Lisinopril 10mg')).toBeInTheDocument();
  expect(screen.getByText('Take once daily')).toBeInTheDocument();
});

const selectorPriority = {
  best: 'getByRole("button", { name: /submit/i })',
  good: 'getByLabelText("Email address")',
  okay: 'getByPlaceholderText("Search...")',
  lastResort: 'getByTestId("submit-btn")',
  never: 'querySelector(".btn-primary")'
};
```

### The "Big Three" Testing Mistakes

```typescript
const bigThreeMistakes = {
  coverageObsession: {
    problem: '100% coverage is a vanity metric',
    reality: 'You can have 100% coverage and a completely broken app',
    solution: 'Focus on FEATURE coverage, not line coverage',
    question: 'Does the "Forgot Password" flow actually send the email?'
  },
  testingLibraries: {
    problem: 'Testing that framer-motion animates or Radix opens a modal',
    reality: 'They have their own tests—you\'re wasting time',
    solution: 'Test YOUR configuration of those tools',
    example: 'Test that YOUR modal shows the right content, not that it opens'
  },
  flakyTests: {
    problem: 'E2E test fails 1 out of 10 times for no reason',
    reality: 'Flaky tests destroy team trust in CI/CD',
    solution: 'Delete or fix immediately—no exceptions',
    fix: 'Use Playwright auto-waiting, eliminate sleep(3000) calls'
  }
};

// ❌ WRONG
it('submits prescription refill', async () => {
  await page.click('#refill-button');
  await page.waitForTimeout(3000);
  expect(await page.textContent('.status')).toBe('Submitted');
});

// ✅ CORRECT
it('submits prescription refill', async () => {
  await page.getByRole('button', { name: 'Request Refill' }).click();
  await expect(page.getByText('Refill Submitted')).toBeVisible();
});
```

### Mocking Best Practices

```typescript
const mockingRules = {
  principle: 'Don\'t mock fetch—mock the API endpoint',
  msw: {
    advantage: 'Intercepts at network level, components think it\'s real',
    benefit: 'Tests indistinguishable from reality',
    location: 'Works in browser AND Node.js'
  },
  antiPatterns: [
    'jest.mock("axios")',
    'Manual fetch mocks',
    'Hitting real APIs',
    'Production API in tests'
  ]
};

// ❌ WRONG
jest.mock('axios');
(axios.get as jest.Mock).mockResolvedValue({
  data: { prescription: mockPrescription }
});

// ✅ CORRECT
import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('/api/prescriptions/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      drugName: 'Lisinopril',
      dosage: '10mg',
      refillsRemaining: 3
    });
  })
];
```

### Visual Regression Testing

Visual regression catches bugs that functional tests miss entirely:

```typescript
const visualRegressionTesting = {
  process: [
    'Take screenshot of component',
    'Compare pixel-by-pixel to baseline',
    'Flag differences for human review',
    'Approve intentional changes, reject bugs'
  ],
  catches: [
    'Button turning transparent',
    'Layout breaking on mobile',
    'Z-index stacking issues',
    'Font rendering changes',
    'Spacing/margin regressions',
    'Dark mode color issues'
  ],
  tools: {
    chromatic: 'Storybook integration, component-level',
    percy: 'Full-page screenshots, CI integration',
    playwright: 'Built-in screenshot comparison'
  },
  when: 'Every PR that affects UI components'
};

it('prescription card matches visual baseline', async () => {
  await page.goto('/prescriptions/rx_123');
  await expect(page.getByTestId('prescription-card')).toHaveScreenshot(
    'prescription-card.png',
    { maxDiffPixelRatio: 0.01 }
  );
});

export const Default = {
  args: { prescription: mockPrescription }
};

export const LowRefills = {
  args: { prescription: { ...mockPrescription, refillsRemaining: 1 } }
};

export const Expired = {
  args: { prescription: { ...mockPrescription, status: 'expired' } }
};
```

### Shift-Left & Shift-Right Testing

```typescript
const shiftLeftApproach = {
  executableSpec: `
    Feature: Prescription Refill
      Scenario: Patient requests early refill
        Given a prescription with 10 days remaining
        When patient requests refill
        Then system shows "Too early to refill" message
        And no order is created
  `,
  aiScaffoldedTest: `
    it('shows too-early message when refill requested with 10+ days remaining', async () => {
      const prescription = createPrescription({ daysRemaining: 10 });
      render(<RefillButton prescription={prescription} />);
      await userEvent.click(screen.getByRole('button', { name: /refill/i }));
      expect(screen.getByText(/too early to refill/i)).toBeInTheDocument();
    });
  `
};

const shiftRightApproach = {
  rum: {
    tool: 'Datadog RUM or Sentry',
    metrics: ['Core Web Vitals', 'Error rates', 'User flows'],
    alerts: 'P90 latency > 3s triggers investigation'
  },
  syntheticMonitoring: {
    frequency: 'Every 5 minutes',
    criticalPaths: ['Login flow', 'Prescription lookup', 'Order placement']
  }
};
```

### AI-Assisted Testing

```typescript
const aiTestingGuidelines = {
  principles: {
    aiRole: 'Generate test scaffolds, suggest edge cases',
    humanRole: 'Review every AI-generated test for correctness',
    danger: 'AI can "hallucinate" passing tests that test nothing'
  },
  selfHealing: {
    problem: 'Tests break when CSS classes change',
    solution: 'Use semantic selectors based on intent',
    tools: ['Playwright locators', 'Testing Library queries']
  }
};

// ❌ WRONG
const brittleTest = async () => {
  await page.click('.btn-primary.submit-form.mt-4');
};

// ✅ CORRECT
const resilientTest = async () => {
  await page.getByRole('button', { name: 'Submit prescription' }).click();
};

// ❌ WRONG
it('renders component', () => {
  render(<PrescriptionCard prescription={mockPrescription} />);
  expect(document.body).toBeTruthy();
});

// ✅ CORRECT
it('displays prescription drug name and dosage', () => {
  render(<PrescriptionCard prescription={mockPrescription} />);
  expect(screen.getByText('Lisinopril 10mg')).toBeInTheDocument();
  expect(screen.getByText('Take once daily')).toBeInTheDocument();
});
```

### Accessibility Testing (Hard Gate)

In 2026, an inaccessible frontend is a bug, not a "nice-to-have":

```typescript
const a11yRequirements = {
  ciIntegration: {
    tool: 'axe-core',
    integration: '@axe-core/playwright or jest-axe',
    failOn: ['critical', 'serious']
  },
  checks: [
    'All buttons have discernible names',
    'Tab order is logical',
    'Color contrast meets WCAG AA',
    'Form inputs have associated labels',
    'Images have alt text (or alt="" for decorative)'
  ]
};

it('prescription card is accessible', async () => {
  const { container } = render(
    <PrescriptionCard prescription={mockPrescription} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('can complete refill flow using only keyboard', async () => {
  await page.goto('/prescriptions');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('alert')).toContainText('Refill requested');
});
```

### Performance Testing

```typescript
const performanceRequirements = {
  budgets: {
    jsBundle: '250kb max (gzipped)',
    cssBundle: '50kb max',
    largestContentfulPaint: '2.5s',
    interactionToNextPaint: '200ms',
    cumulativeLayoutShift: '0.1'
  },
  failBuild: [
    'JS bundle increases > 10%',
    'LCP regresses > 500ms',
    'INP exceeds 200ms',
    'CLS exceeds 0.1'
  ],
  tools: {
    measurement: 'Lighthouse CI',
    monitoring: 'Web Vitals library + RUM',
    budgetEnforcement: 'bundlesize or size-limit'
  }
};

const performanceCIStep = `
  - name: Performance Budget Check
    run: |
      npx size-limit
      npx lighthouse-ci autorun
`;

const sizeLimitConfig = [
  { path: 'dist/main.js', limit: '250 KB', gzip: true },
  { path: 'dist/main.css', limit: '50 KB' }
];
```

### API Mocking with MSW

```typescript
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('/api/prescriptions/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      drugName: 'Lisinopril',
      dosage: '10mg',
      refillsRemaining: 3
    });
  }),
  http.post('/api/prescriptions/:id/refill', ({ params }) => {
    if (params.id === 'rx_too_early') {
      return HttpResponse.json(
        { error: 'TOO_EARLY_FOR_REFILL', daysRemaining: 10 },
        { status: 422 }
      );
    }
    return HttpResponse.json({ orderId: 'ord_123' });
  })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Flaky Test Management

```typescript
const flakyTestPolicy = {
  retryConfig: { maxRetries: 2, retryDelay: 1000 },
  flakinessThreshold: { maxFailureRate: '2%', action: 'Quarantine and fix within 1 sprint' },
  commonCauses: {
    timing: 'Use waitFor/expect.poll instead of arbitrary delays',
    testIsolation: 'Ensure tests clean up and don\'t share state',
    networkDependency: 'Use MSW, never hit real APIs in tests',
    dateTime: 'Mock Date.now() for time-dependent logic'
  }
};

// ❌ WRONG
await page.click('#submit');
await page.waitForTimeout(2000);
expect(await page.textContent('.result')).toBe('Success');

// ✅ CORRECT
await page.click('#submit');
await expect(page.getByText('Success')).toBeVisible({ timeout: 5000 });
```

### Backend Testing

Backend bugs typically happen in glue code—database queries, API calls, cache invalidation—not pure functions.

#### Integration Over Unit Tests

```typescript
const backendTestingPhilosophy = {
  mistake: 'Testing if a function "would have" called the DB',
  reality: 'You\'re testing your mock, not your SQL',
  solution: {
    tool: 'Testcontainers',
    approach: 'Spin up real PostgreSQL/Redis in Docker for each test',
    benefit: 'SQL syntax and constraints are actually verified'
  }
};

// ❌ WRONG
it('creates prescription order', async () => {
  const mockDb = { insert: jest.fn().mockResolvedValue({ id: 'ord_123' }) };
  const service = new OrderService(mockDb);
  const result = await service.createOrder(orderData);
  expect(mockDb.insert).toHaveBeenCalled();
});

// ✅ CORRECT
import { PostgreSqlContainer } from '@testcontainers/postgresql';

describe('OrderService', () => {
  let container: StartedPostgreSqlContainer;
  let db: Database;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    db = await createConnection(container.getConnectionUri());
    await runMigrations(db);
  });

  afterAll(async () => {
    await db.close();
    await container.stop();
  });

  it('creates prescription order with correct foreign keys', async () => {
    const patient = await db.insert('patients', patientFactory());
    const prescription = await db.insert('prescriptions', prescriptionFactory({
      patientId: patient.id
    }));

    const service = new OrderService(db);
    const order = await service.createOrder({
      prescriptionId: prescription.id,
      quantity: 30
    });

    expect(order.id).toMatch(/^ord_/);
    expect(order.prescriptionId).toBe(prescription.id);

    const saved = await db.query('SELECT * FROM orders WHERE id = $1', [order.id]);
    expect(saved.rows[0].status).toBe('pending');
  });
});
```

#### Contract Testing

Ensure backend changes don't break frontend or other services:

```typescript
const contractTesting = {
  problem: 'API changes break consumers silently',
  tools: ['Pact', 'Zod schemas', 'OpenAPI validation'],
  process: [
    'Define shared schema (Zod or OpenAPI)',
    'Backend tests validate responses match schema',
    'Frontend tests validate against same schema',
    'Schema change = explicit breaking change'
  ]
};

import { z } from 'zod';

export const PrescriptionResponseSchema = z.object({
  id: z.string().regex(/^rx_/),
  drugName: z.string(),
  dosage: z.string(),
  refillsRemaining: z.number().int().min(0),
  expiresAt: z.string().datetime(),
  patient: z.object({
    id: z.string().regex(/^pat_/),
    name: z.string()
  })
});

it('GET /prescriptions/:id returns valid contract', async () => {
  const response = await request(app)
    .get('/prescriptions/rx_123')
    .expect(200);

  const result = PrescriptionResponseSchema.safeParse(response.body);
  if (!result.success) {
    console.error('Contract violation:', result.error.issues);
  }
  expect(result.success).toBe(true);
});
```

#### Service Layer Testing

Separate business logic from HTTP handling:

```typescript
// ❌ WRONG
app.post('/orders', async (req, res) => {
  const { prescriptionId, quantity } = req.body;
  const prescription = await db.prescriptions.findById(prescriptionId);
  if (prescription.refillsRemaining < 1) {
    return res.status(422).json({ error: 'No refills remaining' });
  }
  const price = prescription.pricePerUnit * quantity;
  const tax = price * 0.08;
  const total = price + tax;
  const order = await db.orders.create({ prescriptionId, quantity, total });
  res.json(order);
});

// ✅ CORRECT
export const createOrderService = (db: Database) => ({
  calculateTotal: (pricePerUnit: number, quantity: number) => {
    const price = pricePerUnit * quantity;
    const tax = price * 0.08;
    return { price, tax, total: price + tax };
  },

  createOrder: async (prescriptionId: string, quantity: number) => {
    const prescription = await db.prescriptions.findById(prescriptionId);
    if (prescription.refillsRemaining < 1) {
      throw new BusinessRuleError('NO_REFILLS_REMAINING');
    }
    const { total } = this.calculateTotal(prescription.pricePerUnit, quantity);
    return db.orders.create({ prescriptionId, quantity, total });
  }
});

describe('OrderService.calculateTotal', () => {
  it('calculates 8% tax correctly', () => {
    const service = createOrderService(mockDb);
    const result = service.calculateTotal(10, 30);
    expect(result.price).toBe(300);
    expect(result.tax).toBe(24);
    expect(result.total).toBe(324);
  });
});

describe('OrderService.createOrder', () => {
  it('rejects order when no refills remaining', async () => {
    const prescription = await createPrescription({ refillsRemaining: 0 });
    const service = createOrderService(db);
    await expect(service.createOrder(prescription.id, 30)).rejects.toThrow('NO_REFILLS_REMAINING');
  });
});
```

#### Sad Path & Idempotency Testing

```typescript
const sadPathTesting = {
  problem: 'Backend looks great until production failures',
  scenarios: [
    'Database timeout',
    'External API failure (Stripe, Twilio)',
    'Network latency spikes',
    'Duplicate submissions',
    'Partial failures in batch operations'
  ]
};

describe('Order creation resilience', () => {
  it('retries on transient database failure', async () => {
    let attempts = 0;
    jest.spyOn(db, 'insert').mockImplementation(async () => {
      attempts++;
      if (attempts === 1) throw new Error('Connection timeout');
      return { id: 'ord_123' };
    });

    const result = await orderService.createOrder(orderData);
    expect(attempts).toBe(2);
    expect(result.id).toBe('ord_123');
  });

  it('fails gracefully when Stripe times out', async () => {
    server.use(
      http.post('https://api.stripe.com/v1/payment_intents', async () => {
        await delay(35000);
      })
    );

    await expect(paymentService.processPayment(paymentData)).rejects.toThrow('PAYMENT_PROVIDER_TIMEOUT');
    const order = await db.orders.findById(orderId);
    expect(order.status).toBe('payment_pending');
  });
});

describe('Idempotency', () => {
  it('returns existing order on duplicate submission', async () => {
    const idempotencyKey = 'idem_abc123';

    const first = await request(app)
      .post('/orders')
      .set('Idempotency-Key', idempotencyKey)
      .send(orderData)
      .expect(201);

    const second = await request(app)
      .post('/orders')
      .set('Idempotency-Key', idempotencyKey)
      .send(orderData)
      .expect(200);

    expect(second.body.id).toBe(first.body.id);
    const orders = await db.orders.findByPatient(patientId);
    expect(orders).toHaveLength(1);
  });

  it('handles webhook retries without duplicate processing', async () => {
    const webhookPayload = {
      id: 'evt_stripe_123',
      type: 'payment_intent.succeeded',
      data: { object: { id: 'pi_123' } }
    };

    await request(app).post('/webhooks/stripe').send(webhookPayload).expect(200);
    await request(app).post('/webhooks/stripe').send(webhookPayload).expect(200);

    const order = await db.orders.findByPaymentIntent('pi_123');
    expect(order.fulfillmentCount).toBe(1);
  });
});
```

#### Observability as Post-Deployment Testing

```typescript
const observabilityTesting = {
  reality: 'Production is the ultimate test environment',
  approach: {
    traces: 'Follow a request across services',
    synthetics: 'Automated production health checks',
    alerting: 'Know before users complain'
  }
};

export const prescriptionApiCheck = {
  name: 'Prescription API Health',
  frequency: '60s',
  locations: ['us-east-1', 'eu-west-1'],

  steps: [
    {
      name: 'Login',
      request: { method: 'POST', url: '/auth/login', body: syntheticUserCreds },
      assertions: [{ type: 'status', value: 200 }]
    },
    {
      name: 'Fetch prescriptions',
      request: { method: 'GET', url: '/api/prescriptions' },
      assertions: [
        { type: 'status', value: 200 },
        { type: 'responseTime', max: 2000 },
        { type: 'jsonPath', path: '$.data', notEmpty: true }
      ]
    }
  ],

  alerting: {
    onFailure: ['pagerduty', 'slack-oncall'],
    threshold: '2 consecutive failures'
  }
};
```

#### Security Testing in Pipeline

```typescript
const securityTesting = {
  automated: {
    secretScanning: 'Gitleaks in pre-commit hook',
    dependencyAudit: 'npm audit / Snyk in CI',
    codeScanning: 'CodeQL or Semgrep'
  },
  failBuild: [
    'Secrets detected in code',
    'High/critical vulnerability in dependency',
    'SQL injection pattern detected',
    'Hardcoded credentials'
  ]
};

const securityCIConfig = `
name: Security Checks

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Secret Scanning
        uses: gitleaks/gitleaks-action@v2

      - name: Dependency Audit
        run: npm audit --audit-level=high

      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v3

      - name: OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
`;
```

### 2026 Backend Testing Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Test Runner | Vitest or Node Native Test | Fast, ESM-first, zero config |
| DB Orchestration | Testcontainers | Real DBs in Docker matching production |
| API Testing | Supertest | Test endpoints without starting server |
| External API Mocking | MSW (Node) | Intercept fetch/axios to Stripe, Twilio |
| Contract Testing | Zod + OpenAPI | Shared schemas between services |
| Load Testing | k6 | Find where backend breaks under pressure |
| Chaos Engineering | Toxiproxy | Simulate latency, timeouts, failures |
| Secret Scanning | Gitleaks | Prevent committed secrets |
| Dependency Audit | npm audit, Snyk | Block vulnerable dependencies |
| Observability | OpenTelemetry | Distributed tracing |
| Synthetic Monitoring | Datadog Synthetics, Checkly | Production health checks |

### 2026 Testing Tooling Landscape

| Category | Recommended Tools | Purpose |
|----------|------------------|---------|
| Test Runner | Vitest (unit/integration), Playwright (E2E) | Fast, modern, TypeScript-native |
| Component Testing | React Testing Library, Storybook Interaction Tests | User-perspective testing |
| API Mocking | MSW (Mock Service Worker) | Backend-independent frontend tests |
| Visual Regression | Percy, Applitools, Playwright snapshots | Catch CSS drift |
| Accessibility | axe-core, @axe-core/playwright, jest-axe | Automated a11y audits |
| Performance | Lighthouse CI, size-limit, Web Vitals | Budget enforcement |
| CI Automation | GitHub Actions, GitLab CI | Continuous execution |
| AI Assistants | GitHub Copilot, Cursor | Test generation (human-reviewed) |
| Monitoring | Datadog RUM, Sentry | Shift-right production quality |

### Testing Requirements Checklist

```markdown
## Pre-Merge Checklist

### Coverage & Quality
- [ ] 80%+ coverage on business logic
- [ ] All critical user flows have E2E tests
- [ ] New components have accessibility tests
- [ ] Visual regression captured for UI changes

### Performance
- [ ] Bundle size within budget (no >10% increase)
- [ ] Core Web Vitals meet thresholds
- [ ] No new synchronous blocking operations

### Reliability
- [ ] Tests use MSW, not real API calls
- [ ] No arbitrary waits (waitForTimeout)
- [ ] Tests clean up their data
- [ ] Date/time mocked for time-dependent tests

### Accessibility
- [ ] axe-core audit passes (0 critical/serious)
- [ ] Keyboard navigation works
- [ ] Screen reader tested for complex components
- [ ] Color contrast meets WCAG AA

### AI-Generated Tests
- [ ] Human reviewed all AI-generated tests
- [ ] Assertions are meaningful (not just "renders")
- [ ] Edge cases covered, not just happy path
- [ ] No hallucinated test data or expectations
```

---

## Service Communication

### Internal Services

```typescript
const internalCommunication = {
  synchronous: {
    useCase: 'Request-response, user-facing operations',
    timeout: '30 seconds max',
    retries: '3 with exponential backoff'
  },
  asynchronous: {
    useCase: 'Background processing, eventual consistency OK',
    broker: 'Redis Streams or AWS SQS',
    patterns: ['Pub/Sub', 'Work queues']
  },
  events: {
    useCase: 'Cross-service notifications, audit trail',
    format: 'CloudEvents specification',
    delivery: 'At-least-once (consumers must be idempotent)'
  }
};
```

### Event Format

```typescript
interface DomainEvent {
  id: string;
  type: string;
  source: string;
  time: string;
  dataContentType: 'application/json';
  data: unknown;
  correlationId: string;
  causationId?: string;
}

const orderCreatedEvent: DomainEvent = {
  id: 'evt_abc123',
  type: 'order.created',
  source: 'order-service',
  time: '2024-01-15T10:30:00Z',
  dataContentType: 'application/json',
  data: {
    orderId: 'ord_xyz',
    patientId: 'pat_123',
    total: 150.00
  },
  correlationId: 'req_def456'
};
```

### Retry & Circuit Breaker

```typescript
const resiliencePatterns = {
  retry: {
    maxAttempts: 3,
    backoff: 'exponential',
    initialDelay: 1000,
    maxDelay: 30000,
    retryableErrors: ['ECONNRESET', 'ETIMEDOUT', '503', '429']
  },
  circuitBreaker: {
    failureThreshold: 5,
    resetTimeout: 30000,
    halfOpenRequests: 3
  },
  timeout: {
    default: 30000,
    database: 10000,
    externalApi: 60000
  }
};
```

### Hybrid Protocol Strategy (2026)

Modern architectures use a "tri-bridge" approach—different protocols for different contexts:

```typescript
const protocolStrategy = {
  external: {
    protocol: 'REST',
    why: 'Universal compatibility, superior edge caching',
    format: 'JSON',
    useCase: 'Public APIs, third-party integrations, webhooks'
  },
  internal: {
    protocol: 'gRPC',
    why: 'Binary serialization (Protobuf) is 10x faster than JSON',
    format: 'Protocol Buffers',
    useCase: 'Service-to-service, high-throughput internal calls',
    benefits: ['Strict contract enforcement', 'Streaming support', 'Code generation']
  },
  frontend: {
    protocol: 'GraphQL',
    why: 'Prevents over-fetching, single round trip',
    pattern: 'Backend-for-Frontend (BFF)',
    useCase: 'Mobile/web clients requesting exactly what they need'
  }
};
```

| Layer | Protocol | Format | When to Use |
|-------|----------|--------|-------------|
| Public API | REST | JSON | External clients, webhooks, third parties |
| Service-to-Service | gRPC | Protobuf | Internal microservices, high throughput |
| Client Aggregation | GraphQL | JSON | BFF layer, mobile/web with varied data needs |

### Event-Driven Choreography

Prefer choreography (services react to events) over orchestration (central controller):

```typescript
const eventDrivenPatterns = {
  choreography: {
    pattern: 'Services emit events, others react independently',
    broker: 'Kafka, RabbitMQ, AWS EventBridge',
    benefit: 'Loose coupling, independent scaling, resilience'
  },
  orchestration: {
    pattern: 'Central service controls workflow steps',
    when: 'Complex sagas requiring rollback coordination',
    tool: 'Temporal, AWS Step Functions'
  }
};

const orderWorkflowChoreography = {
  flow: [
    'OrderService emits OrderCreated',
    'PaymentService reacts, emits PaymentProcessed',
    'InventoryService reacts, emits InventoryReserved',
    'FulfillmentService reacts, emits OrderShipped',
    'NotificationService reacts to each, sends updates'
  ],
  benefit: 'Each service owns its domain, no central bottleneck'
};
```

**Idempotency is mandatory** — brokers guarantee at-least-once delivery:

```typescript
const idempotentConsumer = async (event: DomainEvent) => {
  const processed = await db.processedEvents.findById(event.id);
  if (processed) {
    return { status: 'already_processed' };
  }

  await db.transaction(async (tx) => {
    await processEvent(event, tx);
    await tx.processedEvents.create({ id: event.id, processedAt: new Date() });
  });

  return { status: 'processed' };
};
```

### Infrastructure-Level Communication

In 2026, communication logic (retries, timeouts, circuit breaking) moves out of application code:

```typescript
const infrastructurePatterns = {
  serviceMesh: {
    tools: ['Istio', 'Linkerd'],
    provides: [
      'mTLS encryption (automatic)',
      'Observability (traces, metrics)',
      'Traffic splitting (canary releases)',
      'Retries and circuit breaking'
    ],
    pattern: 'Sidecar proxy per service'
  },
  sidecarless: {
    technology: 'eBPF',
    tools: ['Cilium'],
    benefit: 'Logic in Linux kernel, saves 5-10ms per hop',
    tradeoff: 'More complex ops, Linux-only'
  }
};

const meshBenefits = {
  developerExperience: 'Write business logic, not retry loops',
  consistency: 'Same policies across all services',
  observability: 'Distributed tracing without code changes',
  security: 'mTLS everywhere without certificate management'
};
```

### Zero-Trust Service Identity

The "secure perimeter" model is dead. Every service call is authenticated:

```typescript
const zeroTrustCommunication = {
  identity: {
    framework: 'SPIFFE/SPIRE',
    principle: 'Services have unique identities, not IP addresses',
    format: 'spiffe://pharmacy.prod/order-service'
  },
  encryption: {
    standard: 'Mutual TLS (mTLS)',
    enforcement: 'Every internal connection encrypted and authenticated',
    rotation: 'Automatic certificate rotation'
  },
  authorization: {
    tool: 'Open Policy Agent (OPA)',
    pattern: 'Policy-as-Code',
    benefit: 'Centralized, version-controlled access rules'
  }
};

const serviceAuthorizationPolicy = `
  package pharmacy.authz

  default allow = false

  allow {
    input.source.service == "order-service"
    input.destination.service == "payment-service"
    input.method == "POST"
    input.path == "/api/payments"
  }

  allow {
    input.source.service == "fulfillment-service"
    input.destination.service == "inventory-service"
    input.method == "GET"
  }
`;
```

### Contract Testing for Services

Prevent breaking changes in distributed systems:

```typescript
const contractTesting = {
  consumerDriven: {
    tool: 'Pact',
    flow: [
      'Consumer defines expected contract',
      'Provider verifies it can fulfill contract',
      'CI fails if provider breaks consumer expectations'
    ]
  },
  schemaRegistry: {
    tools: ['Confluent Schema Registry', 'AWS Glue'],
    formats: ['Avro', 'Protobuf'],
    benefit: 'Producers and consumers always speak same version'
  }
};

const contractEvolution = {
  backwardCompatible: [
    'Add optional fields',
    'Add new endpoints',
    'Deprecate (not remove) fields'
  ],
  breakingChanges: [
    'Remove fields',
    'Rename fields',
    'Change field types',
    'Change endpoint paths'
  ],
  process: 'Breaking changes require version bump and migration period'
};
```

### Service Communication Checklist

```markdown
## Service Design Checklist

### Protocol Selection
- [ ] Public APIs use REST with proper HTTP semantics
- [ ] Internal high-throughput uses gRPC with Protobuf
- [ ] Client aggregation uses GraphQL BFF pattern

### Event-Driven
- [ ] Events follow CloudEvents specification
- [ ] All consumers are idempotent
- [ ] Dead letter queues configured for failed messages
- [ ] Event schema registered in schema registry

### Resilience
- [ ] Circuit breakers configured for external calls
- [ ] Retries use exponential backoff with jitter
- [ ] Timeouts set for all network calls
- [ ] Graceful degradation when dependencies fail

### Security
- [ ] mTLS enabled for all internal communication
- [ ] Service identities managed (SPIFFE/SPIRE)
- [ ] Authorization policies defined in OPA
- [ ] No secrets in service-to-service calls (use identity)

### Observability
- [ ] Correlation IDs propagated across all calls
- [ ] Distributed tracing enabled
- [ ] Service mesh metrics exported
- [ ] Alerting on error rates and latency
```

---

## Configuration Management

### Environment Variables

```typescript
const configRules = {
  validation: `
    const config = z.object({
      DATABASE_URL: z.string().url(),
      JWT_SECRET: z.string().min(32),
      STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
    }).parse(process.env);
  `,
  naming: {
    format: 'SCREAMING_SNAKE_CASE',
    prefixes: {
      database: 'DATABASE_',
      auth: 'AUTH_',
      stripe: 'STRIPE_',
      aws: 'AWS_'
    }
  },
  environments: {
    development: '.env.local',
    test: '.env.test',
    staging: 'Environment variables from CI/CD',
    production: 'Secrets manager + env vars'
  }
};
```

### Feature Flags

```typescript
const featureFlagRules = {
  useCases: [
    'New feature gradual rollout',
    'A/B testing',
    'Quick disable without deploy',
    'Environment-specific features'
  ],
  naming: 'FEATURE_{FEATURE_NAME}',
  examples: [
    'FEATURE_NEW_CHECKOUT_FLOW',
    'FEATURE_AI_DRUG_INTERACTIONS',
    'FEATURE_EMPLOYER_PORTAL'
  ],
  cleanup: 'Remove flag checks within 30 days of 100% rollout'
};

const isFeatureEnabled = (flag: string, context?: FeatureContext): boolean => {
  return featureFlagService.isEnabled(flag, {
    userId: context?.userId,
    percentage: context?.rolloutPercentage
  });
};
```

### GitOps as Operational Framework

Git is the single source of truth. Pull-based reconciliation replaces manual push updates:

```typescript
const gitOpsModel = {
  principle: 'Desired state in Git, continuous reconciliation to reality',
  tools: ['ArgoCD', 'Flux'],
  workflow: [
    'Developer opens PR with config change',
    'Automated tests validate change',
    'Peer review and approval',
    'Merge to main',
    'ArgoCD detects change, applies to cluster',
    'Drift detection reverts unauthorized changes'
  ]
};

const gitOpsRules = {
  everything: 'All config changes go through Git—no exceptions',
  noManualChanges: 'kubectl apply is forbidden in production',
  drift: 'If live differs from Git, Git wins automatically',
  audit: 'Git history is your audit trail'
};
```

### Immutable Infrastructure

Replace servers entirely instead of patching them:

```typescript
const immutableInfrastructure = {
  principle: 'Bake images, don\'t patch live',
  tools: ['Packer', 'Docker', 'Nix'],
  workflow: {
    change: 'Modify Dockerfile or Packer template',
    build: 'CI builds new image with changes baked in',
    deploy: 'Replace old instances with new ones',
    rollback: 'Deploy previous image version'
  }
};

const noSshPolicy = {
  rule: 'Engineers should rarely SSH into production',
  why: 'Manual changes create drift and aren\'t auditable',
  exception: 'Emergency debugging only, with audit log',
  alternative: 'Change the code, deploy new image'
};
```

### Policy as Code

Automated guardrails prevent bad configurations from deploying:

```typescript
const policyAsCode = {
  tools: ['Open Policy Agent (OPA)', 'Kyverno', 'Sentinel'],
  purpose: 'Reject bad configs before they reach production',
  examples: [
    'Block public S3 buckets',
    'Require resource limits on all pods',
    'Enforce encryption at rest',
    'Deny privileged containers'
  ]
};

const opaExample = `
  package pharmacy.infrastructure

  deny[msg] {
    input.resource.type == "aws_s3_bucket"
    input.resource.acl == "public-read"
    msg = "Public S3 buckets are forbidden"
  }

  deny[msg] {
    input.resource.type == "kubernetes_pod"
    not input.resource.spec.containers[_].resources.limits
    msg = "All containers must have resource limits"
  }
`;

const continuousCompliance = {
  tools: ['Chef InSpec', 'Prisma Cloud', 'Prowler'],
  scans: ['CIS benchmarks', 'SOC2 requirements', 'HIPAA controls'],
  response: 'Flag violations, auto-remediate where safe'
};
```

### Secrets Management

No hardcoded credentials. Dynamic injection at runtime:

```typescript
const secretsManagement = {
  tools: ['HashiCorp Vault', 'AWS Secrets Manager', 'Azure Key Vault'],
  principle: 'Reference paths, not values',
  benefits: [
    'Git repo compromise doesn\'t expose secrets',
    'Automatic rotation',
    'Audit trail of access',
    'Dynamic short-lived credentials'
  ]
};

const secretsInCode = {
  never: [
    'Passwords in config files',
    'API keys in environment variables committed to Git',
    'Secrets in Docker images',
    'Credentials in CI/CD logs'
  ],
  always: [
    'Reference secret paths: vault:secret/data/database',
    'Inject at runtime via sidecar or init container',
    'Use IAM roles instead of static credentials',
    'Rotate credentials automatically'
  ]
};

const vaultIntegration = `
  DATABASE_URL=vault:secret/data/pharmacy/database#connection_string
  STRIPE_KEY=vault:secret/data/pharmacy/stripe#api_key
`;
```

### Modular Configuration Design

DRY principles apply to infrastructure too:

```typescript
const modularConfig = {
  principle: 'Define once, parameterize for environments',
  separation: {
    logic: 'How to create a resource (module/role)',
    data: 'What values to use (variables/tfvars)'
  }
};

// ❌ WRONG
const hardcodedConfigs = {
  dev: { instanceType: 't3.small', dbSize: '20gb', replicas: 1 },
  staging: { instanceType: 't3.medium', dbSize: '50gb', replicas: 2 },
  prod: { instanceType: 't3.large', dbSize: '200gb', replicas: 3 }
};

// ✅ CORRECT
const environmentConfig = {
  module: 'pharmacy-service',
  variables: {
    environment: '${var.environment}',
    instanceType: '${var.instance_types[var.environment]}',
    dbSize: '${var.db_sizes[var.environment]}',
    replicas: '${var.replica_counts[var.environment]}'
  }
};

const terraformStructure = `
  infrastructure/
  ├── modules/
  │   ├── pharmacy-api/
  │   ├── database/
  │   └── networking/
  ├── environments/
  │   ├── dev.tfvars
  │   ├── staging.tfvars
  │   └── prod.tfvars
  └── main.tf
`;
```

### Configuration Hierarchy

```typescript
const configHierarchy = {
  layers: [
    { priority: 1, source: 'Defaults in code', override: 'Lowest' },
    { priority: 2, source: 'Config files (yaml/json)', override: 'Medium' },
    { priority: 3, source: 'Environment variables', override: 'High' },
    { priority: 4, source: 'Secrets manager', override: 'Highest' }
  ],
  principle: 'Higher priority overrides lower'
};

const configValidation = {
  startup: 'Fail fast if required config missing',
  runtime: 'Validate on access, not just load',
  types: 'Use Zod or similar for type-safe config'
};
```

### Common Configuration Mistakes

#### The Snowflake Server

A machine manually tweaked until nobody knows how it works:

```typescript
const snowflakeProblem = {
  cause: 'SSH in to "quickly" hotfix config or install dependency',
  result: 'Configuration drift—redeploy fails because secret sauce is missing',
  detection: 'Server crashes, new instance from code doesn\'t work',
  fix: 'All changes through Git, immutable infrastructure'
};

const snowflakeSymptoms = [
  'Only Bob knows how to restart that server',
  'Works in prod, fails in staging',
  'Deployment succeeds but app crashes',
  'Undocumented packages installed manually'
];
```

#### Secrets in Plain Text

The most dangerous and common error:

```typescript
const secretsInPlainText = {
  mistake: 'API keys in Git repos or .yaml files',
  result: 'Git access = keys to the kingdom',
  persistence: 'Deleting the file doesn\'t remove it from Git history',
  realWorldCost: 'Cryptocurrency miners love exposed AWS keys'
};

// ❌ WRONG
const config = {
  database: 'postgres://admin:SuperSecret123@db.example.com/prod',
  stripeKey: 'sk_live_abc123...'
};

// ✅ CORRECT
const config = {
  database: process.env.DATABASE_URL,
  stripeKey: 'vault:secret/data/stripe#api_key'
};
```

#### Testing in Production

Skipping the dev lifecycle for config:

```typescript
const testingInProd = {
  mistake: 'Push config change, let it roll out to entire fleet',
  result: 'Syntax error or aggressive firewall = global outage in seconds',
  examples: [
    'Typo in YAML causes parse failure',
    'Firewall rule blocks all traffic',
    'Memory limit set too low',
    'Wrong database connection string'
  ]
};

const configTestingStrategy = {
  unit: 'Validate syntax and schema (yamllint, Zod)',
  integration: 'Apply to isolated test environment',
  canary: 'Roll out to 5% of instances first',
  tools: ['Molecule for Ansible', 'Terratest for Terraform', 'Conftest for OPA']
};
```

#### The Megalith

One config to rule them all:

```typescript
const megalithProblem = {
  mistake: 'Single massive config managing network, database, app, and security',
  result: [
    'Impossible to update one component safely',
    'Automation runs take forever',
    'Nobody understands the whole thing',
    'Changes require full regression testing'
  ]
};

// ❌ WRONG
const monolithConfig = `
  infrastructure/
  └── everything.tf  // 5000 lines, manages entire company
`;

// ✅ CORRECT
const modularConfig = `
  infrastructure/
  ├── modules/
  │   ├── networking/
  │   ├── database/
  │   ├── pharmacy-api/
  │   └── monitoring/
  ├── environments/
  │   ├── dev/
  │   ├── staging/
  │   └── prod/
  └── main.tf  // Composes modules
`;
```

#### Push-Only Configuration

Thinking the job is done once code is pushed:

```typescript
const pushOnlyProblem = {
  mistake: 'No monitoring for drift after push',
  result: 'Source of truth no longer reflects reality',
  causes: [
    'Automated process changes a setting',
    'Someone SSHs in and tweaks config',
    'Cloud console change bypasses Git',
    'Third-party integration modifies state'
  ]
};

const continuousReconciliation = {
  tool: 'ArgoCD, Flux, or Terraform Cloud',
  behavior: 'Continuously compare live state to Git',
  onDrift: 'Alert and/or auto-remediate',
  interval: 'Every 3-5 minutes'
};
```

### Configuration Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| Hardcoded secrets | Exposed in Git history | Use secrets manager |
| Manual server changes | Drift, no audit trail | GitOps, immutable infra |
| Environment-specific code | Divergent codebases | Parameterized modules |
| Config sprawl | Settings everywhere | Single source of truth |
| No validation | Runtime crashes | Zod validation at startup |
| SSH into production | Untraceable changes | Deploy new images |

### Configuration Checklist

```markdown
## Configuration Management Checklist

### GitOps
- [ ] All config in Git (no manual changes)
- [ ] PR workflow for config changes
- [ ] ArgoCD/Flux for reconciliation
- [ ] Drift detection enabled

### Secrets
- [ ] No secrets in Git
- [ ] Vault/Secrets Manager for all credentials
- [ ] Dynamic secrets where possible
- [ ] Automatic rotation configured

### Infrastructure
- [ ] Immutable images (no patching live)
- [ ] SSH disabled or heavily audited
- [ ] Policy as Code (OPA/Kyverno)
- [ ] Continuous compliance scanning

### Design
- [ ] Modular, DRY configuration
- [ ] Environment-specific tfvars/values
- [ ] Config validated at startup
- [ ] Hierarchy documented
```

---

## Deployment Standards

### Deployment Process

```typescript
const deploymentRules = {
  pipeline: [
    '1. PR merged to main',
    '2. CI runs all tests',
    '3. Build Docker image',
    '4. Push to registry',
    '5. Deploy to staging',
    '6. Run smoke tests on staging',
    '7. Manual approval (for production)',
    '8. Rolling deploy to production',
    '9. Health check verification',
    '10. Notify team of completion'
  ],
  rolling: {
    maxUnavailable: '25%',
    maxSurge: '25%',
    healthCheckGracePeriod: '60 seconds'
  },
  rollback: {
    automatic: 'If health checks fail for 2 minutes',
    manual: 'Available via CI/CD UI',
    target: 'Previous successful deployment'
  }
};
```

### Health Checks

```typescript
interface HealthCheck {
  '/health/live': {
    checks: 'Process is responsive';
    response: { status: 'ok' };
  };
  '/health/ready': {
    checks: ['Database connected', 'Cache connected', 'Dependencies available'];
    response: {
      status: 'ok' | 'degraded' | 'unhealthy';
      checks: Record<string, 'ok' | 'unhealthy'>;
    };
  };
}

const readinessCheck = async (): Promise<HealthCheckResponse> => {
  const checks = await Promise.all([
    checkDatabase(),
    checkRedis(),
    checkExternalDependencies()
  ]);
  const allHealthy = checks.every(c => c.status === 'ok');
  return {
    status: allHealthy ? 'ok' : 'unhealthy',
    checks: Object.fromEntries(checks.map(c => [c.name, c.status]))
  };
};
```

### Database Migrations

```typescript
const migrationDeployment = {
  order: [
    '1. Run database migrations',
    '2. Verify migrations successful',
    '3. Deploy new application code',
    '4. Verify application healthy'
  ],
  compatibility: {
    rule: 'New schema must work with old AND new code',
    reason: 'During rolling deploy, both versions run simultaneously',
    pattern: 'Expand-Contract migrations'
  },
  expandContract: [
    'Deploy 1: Add new column (expand)',
    'Deploy 2: Write to both columns',
    'Deploy 3: Backfill new column',
    'Deploy 4: Read from new column',
    'Deploy 5: Stop writing old column',
    'Deploy 6: Drop old column (contract)'
  ]
};
```

### GitOps Operating Model

Manual kubectl commands and scripts are obsolete. Git is the single source of truth:

```typescript
const gitOpsDeployment = {
  principle: 'Git repo contains entire desired state',
  tools: ['ArgoCD', 'Flux'],
  workflow: {
    change: 'Update manifests in Git',
    detect: 'ArgoCD detects change within minutes',
    apply: 'Automatic apply to cluster',
    drift: 'Live state != Git state triggers auto-heal'
  }
};

const immutableArtifacts = {
  rule: 'Once built, never modified',
  images: 'Tagged with SHA, never :latest in production',
  config: 'Injected at runtime via env vars or secrets manager',
  benefit: 'Any environment can reproduce exact state'
};

const deploymentTriggers = {
  automatic: ['Merge to main deploys to staging'],
  manual: ['Production requires approval gate'],
  forbidden: ['kubectl apply from laptop', 'helm install manually']
};
```

### Progressive Delivery

Mitigate risk with incremental rollouts:

```typescript
const progressiveDelivery = {
  canary: {
    pattern: 'Route small % of traffic to new version',
    start: '5% of traffic',
    promotion: 'Increase if metrics healthy',
    rollback: 'Automatic if error rate spikes',
    tools: ['Argo Rollouts', 'Flagger', 'Istio']
  },
  blueGreen: {
    pattern: 'Two identical environments, flip traffic',
    blue: 'Current production (serving traffic)',
    green: 'New version (idle, ready)',
    switch: 'Instant cutover via load balancer',
    rollback: 'Flip back to blue immediately'
  },
  featureFlags: {
    pattern: 'Separate deployment from release',
    tools: ['LaunchDarkly', 'Unleash', 'Flagsmith'],
    benefit: 'Code in prod, hidden behind flag',
    control: 'Product team enables for specific users'
  }
};

const canaryConfig = {
  steps: [
    { weight: 5, pause: '5m' },
    { weight: 25, pause: '10m' },
    { weight: 50, pause: '10m' },
    { weight: 100 }
  ],
  analysis: {
    metrics: ['error-rate', 'latency-p99'],
    threshold: 'error-rate < 1%, latency-p99 < 500ms',
    failureLimit: 2
  }
};
```

### DevSecOps Integration

Security as automated gates, not final checks:

```typescript
const devSecOps = {
  sbom: {
    what: 'Software Bill of Materials',
    generates: 'Manifest of all third-party libraries',
    purpose: 'Track CVEs, license compliance',
    tools: ['Syft', 'Trivy', 'Grype'],
    when: 'Every build, stored with artifact'
  },
  secretInjection: {
    rule: 'Never store credentials in code or CI variables',
    pattern: 'Dynamic injection at container start',
    tools: ['HashiCorp Vault', 'AWS Secrets Manager'],
    mechanism: 'Sidecar or init container fetches secrets'
  },
  oidcAuth: {
    pattern: 'Short-lived tokens for CI/CD',
    replaces: 'Long-lived access keys',
    example: 'GitHub Actions OIDC to AWS',
    benefit: 'No secrets to rotate or leak'
  }
};

const pipelineSecurityGates = [
  'SAST scan (Semgrep, CodeQL)',
  'Dependency vulnerability scan (Snyk, Trivy)',
  'Container image scan',
  'SBOM generation',
  'Secret detection (Gitleaks)',
  'License compliance check'
];
```

### Observability-Driven Deployment

Success = real-world telemetry, not green pipeline:

```typescript
const observabilityDeployment = {
  goldenSignals: {
    latency: 'Time to serve requests',
    errors: 'Rate of failed requests',
    traffic: 'Requests per second',
    saturation: 'Resource utilization'
  },
  automatedRollback: {
    trigger: 'Golden signals deviate from baseline',
    threshold: 'Error rate > 1% or P99 latency > 2x baseline',
    action: 'Automatic rollback to previous version',
    notification: 'Alert on-call immediately'
  }
};

const versionedTelemetry = {
  pattern: 'Inject version metadata into traces and logs',
  fields: ['service.version', 'deployment.id', 'git.sha'],
  benefit: 'See exactly which version causes bottleneck',
  query: 'Filter traces by version during rollout'
};

const deploymentMetrics = {
  track: [
    'Deployment frequency',
    'Lead time for changes',
    'Mean time to recovery (MTTR)',
    'Change failure rate'
  ],
  target: {
    frequency: 'Multiple per day',
    leadTime: 'Less than 1 hour',
    mttr: 'Less than 1 hour',
    failureRate: 'Less than 5%'
  }
};
```

### Environment Parity

Eliminate "works on my machine":

```typescript
const environmentParity = {
  ephemeralEnvironments: {
    trigger: 'Every Pull Request',
    creates: 'Temporary isolated copy of entire stack',
    includes: ['App', 'Database', 'Cache', 'Queues'],
    destroys: 'After PR merged or closed',
    tools: ['Argo CD ApplicationSets', 'Neon branching', 'PlanetScale branching']
  },
  standardization: {
    model: 'Open Application Model (OAM) / KubeVela',
    defines: ['CPU', 'Memory', 'Scaling', 'Dependencies'],
    benefit: 'Same behavior in dev, staging, prod'
  }
};

const environmentConfig = {
  identical: [
    'Container images (exact SHA)',
    'Runtime versions',
    'Infrastructure components',
    'Network topology'
  ],
  different: [
    'Scale (fewer replicas in dev)',
    'Data (synthetic in dev, real in prod)',
    'Secrets (different per environment)',
    'Domain names'
  ]
};
```

### Common Deployment Mistakes

#### The "Big Bang" Release

Deploying all components at once to ensure they "match":

```typescript
const bigBangProblem = {
  pattern: 'All services deployed simultaneously',
  blastRadius: 'One minor failure = entire rollback',
  result: 'High downtime, developer frustration',
  pressure: 'Creates all-or-nothing high-stress releases'
};

const progressiveAlternative = {
  pattern: 'Canary to 5%, then expand',
  benefit: 'Failures affect small % of users',
  rollback: 'Automatic, invisible to most users',
  stress: 'Low—small changes, frequent deploys'
};
```

#### Standardizing Tools Instead of Interfaces

Forcing every team to use the exact same toolchain:

```typescript
const toolMandateProblem = {
  mandate: 'Everyone must use Jenkins',
  result: 'Shadow IT—teams secretly use other tools',
  rigidity: 'Can\'t adopt new tech like AI deployment agents'
};

const interfaceStandard = {
  standardize: 'What a deployment-ready artifact looks like',
  artifact: 'Signed OCI container image',
  metrics: 'Success criteria (error rate, latency)',
  freedom: 'Teams choose CI/CD tool for their stack'
};

// ❌ WRONG
const toolMandate = 'All teams must use Jenkins with these 47 plugins';

// ✅ CORRECT
const interfaceContract = {
  artifact: 'OCI image, signed, scanned, with SBOM',
  registry: 'Push to harbor.pharmacy.internal',
  healthCheck: 'Expose /health/ready within 60s',
  metrics: 'Export Prometheus metrics on :9090'
};
```

#### Checklist Compliance (The Compliance Gap)

Treating deployment standards as one-time audits:

```typescript
const checklistProblem = {
  pattern: 'Manual checklist before deploy',
  reality: 'Ignored under pressure',
  drift: 'Secure Monday, vulnerable Tuesday',
  result: 'Day 2 failures—deployed but unstable'
};

const continuousCompliance = {
  pattern: 'Automated gates that block non-compliant deploys',
  tools: ['Open Policy Agent', 'Kyverno', 'Sentinel'],
  enforcement: 'Real-time, every deployment',
  override: 'Requires security team approval'
};
```

#### Environment Inconsistency

Assuming test success means production success:

```typescript
const environmentDrift = {
  assumption: 'Works in Test = works in Production',
  reality: [
    'Different OS versions',
    'Different network latency',
    'Different database schemas',
    'Different resource limits',
    'Different secret values'
  ],
  symptom: 'Works on my machine'
};

const environmentParity = {
  solution: 'Infrastructure as Code',
  identical: 'Test, Staging, Prod from same IaC template',
  tools: ['Terraform', 'Pulumi', 'CDK'],
  validation: 'Drift detection alerts on divergence'
};
```

#### Ignoring Post-Deployment Reality

Defining "deployment" as code hitting the server:

```typescript
const deploymentMyopia = {
  definition: 'Deployment = code on server',
  blind: 'Database slows 40% two hours later',
  pipeline: 'Shows green, users see errors'
};

const fullDeploymentCycle = {
  definition: 'Deployment = code on server + healthy for 10 minutes',
  monitoring: 'Golden signals compared to baseline',
  action: 'Auto-rollback if signals degrade',
  complete: 'Only "done" when metrics stabilize'
};

const goldenSignalsThreshold = {
  latency: 'P99 < 2x baseline',
  errors: 'Rate < 1%',
  traffic: 'Within expected range',
  saturation: 'CPU/Memory < 80%',
  window: '10 minutes post-deploy',
  violation: 'Auto-rollback + alert'
};
```

### Deployment Strategies Comparison

| Strategy | Risk | Rollback Speed | Resource Cost | Best For |
|----------|------|----------------|---------------|----------|
| Rolling | Medium | Minutes | Low | Most deployments |
| Blue-Green | Low | Instant | 2x resources | Critical services |
| Canary | Low | Automatic | Low | High-traffic services |
| Feature Flag | Lowest | Instant | None | Gradual feature release |

### Deployment Checklist

```markdown
## Pre-Deployment
- [ ] All tests pass (unit, integration, e2e)
- [ ] Security scans clean (SAST, dependencies, containers)
- [ ] SBOM generated and stored
- [ ] Database migrations backward compatible
- [ ] Feature flags configured for new features

## During Deployment
- [ ] Canary metrics monitored
- [ ] Error rates within threshold
- [ ] Latency within threshold
- [ ] No increase in 5xx responses

## Post-Deployment
- [ ] Health checks passing
- [ ] Smoke tests passing
- [ ] Metrics baseline updated
- [ ] Deployment logged with version metadata
- [ ] Team notified of completion

## Rollback Triggers
- [ ] Error rate > 1%
- [ ] P99 latency > 2x baseline
- [ ] Health checks failing > 2 minutes
- [ ] Critical alert fired
```

---

## PHI/PII Handling Rules

### Data Classification

```typescript
const dataClassification = {
  phi: {
    definition: 'Protected Health Information - 18 HIPAA identifiers',
    examples: [
      'Patient name',
      'Date of birth',
      'Address',
      'Phone number',
      'Email address',
      'SSN',
      'Medical record number',
      'Health plan beneficiary number',
      'Prescription information',
      'Diagnosis codes',
      'Treatment information'
    ],
    handling: {
      encryption: 'AES-256 at rest, TLS 1.3 in transit',
      access: 'Minimum necessary, logged',
      retention: 'Per HIPAA (6 years) or state law if longer',
      disposal: 'Secure deletion with audit trail'
    }
  },

  pii: {
    definition: 'Personally Identifiable Information (non-health)',
    examples: ['Name', 'Email', 'Phone', 'Address', 'Payment info'],
    handling: {
      encryption: 'AES-256 at rest, TLS 1.3 in transit',
      access: 'Business need only',
      retention: 'Per privacy policy'
    }
  },

  businessData: {
    definition: 'Non-sensitive business information',
    examples: ['Aggregated analytics', 'Product catalog', 'Public content'],
    handling: {
      encryption: 'TLS in transit',
      access: 'Internal use'
    }
  }
};
```

### Access Logging

```typescript
const phiAccessLogging = {
  required: true,
  retention: '6 years minimum',
  logFields: {
    timestamp: 'When access occurred',
    userId: 'Who accessed',
    patientId: 'Whose data was accessed',
    action: 'What action was taken (view, update, export)',
    dataElements: 'Which PHI fields were accessed',
    purpose: 'Business reason for access',
    accessContext: 'Normal access vs break-glass'
  },
  example: {
    timestamp: '2024-01-15T10:30:00Z',
    userId: 'usr_pharmacist123',
    patientId: 'pat_patient456',
    action: 'VIEW',
    dataElements: ['prescriptions', 'allergies'],
    purpose: 'TREATMENT',
    accessContext: 'NORMAL'
  }
};
```

### Minimum Necessary

```typescript
const minimumNecessaryRule = {
  rule: 'Only access/display PHI required for the specific task',
  examples: {
    pharmacist: ['prescriptions', 'allergies', 'current_medications', 'patient_name', 'dob'],
    billingStaff: ['patient_name', 'insurance_info', 'service_dates'],
    customerSupport: ['patient_name', 'order_status', 'shipping_address'],
    developer: []
  }
};

const getPatientForRole = (patient: Patient, role: UserRole): Partial<Patient> => {
  const allowedFields = fieldAccessByRole[role];
  return pick(patient, allowedFields);
};
```

### Mandatory Security (2026)

"Addressable" is dead. All security controls require technical enforcement:

```typescript
const mandatorySecurity = {
  mfa: {
    requirement: 'All systems touching sensitive data',
    includes: ['Admin backends', 'Legacy databases', 'Developer tools'],
    exception: 'None'
  },
  encryptionAtRest: {
    requirement: 'All databases, backups, file systems',
    standard: 'AES-256',
    invalidExcuse: '"It\'s behind a firewall" is not encryption'
  },
  restoration: {
    requirement: 'Prove 72-hour restoration capability',
    testing: 'Regular drills, documented results',
    scenario: 'Full ransomware or data loss event'
  }
};

const securityProof = {
  notAcceptable: ['Policies on paper', 'Checkbox compliance', 'Annual audits'],
  required: ['Technical enforcement', 'Continuous monitoring', 'Tested recovery']
};
```

### Privacy-Enhancing Technologies (PETs)

Process data without exposing identity:

```typescript
const privacyTechnologies = {
  vaultlessTokenization: {
    what: 'Replace SSN/MRN with mathematically generated token',
    benefit: 'No key to steal—token is useless to attackers',
    useCase: 'Unique identifier without exposing real value',
    reversible: 'Only by authorized detokenization service'
  },
  differentialPrivacy: {
    what: 'Inject mathematical noise into datasets',
    benefit: 'Mathematically impossible to re-identify individuals',
    useCase: 'Analytics and AI training on PHI',
    guarantee: 'Provable privacy bounds'
  },
  confidentialComputing: {
    what: 'Hardware secure enclaves (Intel SGX, AMD SEV)',
    benefit: 'Root access cannot see data during computation',
    useCase: 'Process PHI in memory securely',
    protection: 'Even sysadmins cannot access unpacked data'
  }
};

const tokenizationExample = {
  original: { ssn: '123-45-6789', name: 'John Smith' },
  tokenized: { ssn: 'tok_a8f2c9e1b4d7', name: 'tok_7b3e1f9a2c8d' },
  storage: 'Tokens in application DB, mapping in secure vault'
};
```

### Automated Data Discovery

You cannot protect what you don't know exists:

```typescript
const dataDiscovery = {
  continuousScanning: {
    targets: ['S3 buckets', 'Azure Blobs', 'Databases', 'SaaS apps'],
    frequency: 'Every 24 hours',
    finds: 'Dark data—sensitive info someone forgot to delete'
  },
  classificationMetadata: {
    tags: ['Sensitivity: High', 'Type: PHI', 'Retention: 6 years'],
    follows: 'Data wherever it moves',
    triggers: 'Auto-encrypt or block if moved to insecure location'
  }
};

const discoveryActions = {
  phiFound: {
    unencrypted: 'Alert + auto-encrypt',
    wrongLocation: 'Block access + notify owner',
    noOwner: 'Quarantine + escalate',
    expired: 'Flag for secure deletion'
  }
};
```

### Zero-Trust Access

Identity and context, not network perimeter:

```typescript
const zeroTrustPhi = {
  jitAccess: {
    pattern: 'Just-In-Time access requests',
    duration: 'Time-bound window (e.g., 2 hours)',
    revocation: 'Automatic when window expires',
    audit: 'Full logging of access reason and duration'
  },
  abac: {
    pattern: 'Attribute-Based Access Control',
    factors: [
      'User role',
      'Specific patient assignment',
      'Time of day',
      'Device posture',
      'Location'
    ],
    example: 'Pharmacist can only access patients they\'re actively treating'
  }
};

// ❌ WRONG: Role-based only
const rbacAccess = {
  role: 'pharmacist',
  access: 'all_patient_records'
};

// ✅ CORRECT: Attribute-based
const abacAccess = {
  role: 'pharmacist',
  patientAssignment: ['pat_123', 'pat_456'],
  timeWindow: '08:00-18:00',
  location: 'pharmacy_network',
  deviceCompliant: true
};
```

### AI & Machine Learning Guardrails

PHI in training data is a major risk:

```typescript
const aiPhiGuardrails = {
  federatedLearning: {
    pattern: 'AI goes to the data, not data to AI',
    benefit: 'PHI never leaves source system',
    training: 'Model updates shared, not raw data',
    useCase: 'Cross-institution research without data sharing'
  },
  syntheticData: {
    pattern: 'AI-generated fake datasets',
    properties: 'Same statistical distribution as real data',
    useCase: 'Development, testing, demos',
    guarantee: 'Engineers never touch real PHI'
  }
};

const developmentEnvironments = {
  production: { data: 'Real PHI', access: 'Authorized personnel only' },
  staging: { data: 'Anonymized subset', access: 'QA team' },
  development: { data: 'Synthetic only', access: 'All developers' },
  demo: { data: 'Completely fabricated', access: 'Sales, partners' }
};

const syntheticDataRules = {
  generate: 'From statistical model, not by copying',
  validate: 'Ensure no real patient data leaks through',
  label: 'Clearly marked as synthetic',
  useFor: ['Unit tests', 'Integration tests', 'Load tests', 'Training']
};
```

### PHI Breach Response

```typescript
const breachResponse = {
  detection: {
    automated: 'Anomaly detection on access patterns',
    indicators: [
      'Bulk export attempts',
      'Access from unusual location',
      'Off-hours access spikes',
      'Failed auth attempts'
    ]
  },
  response: {
    immediate: 'Isolate affected systems',
    assess: 'Determine scope within 24 hours',
    notify: 'HHS within 60 days (500+ records)',
    document: 'Full incident timeline and remediation'
  },
  timeline: {
    discovery: 'T+0',
    containment: 'T+1 hour',
    assessment: 'T+24 hours',
    notification: 'T+60 days (regulatory)',
    patientNotice: 'T+60 days (if required)'
  }
};
```

### Common PHI/PII Pitfalls

In 2026, regulators enforce "strict accountability"—even unintentional mistakes trigger massive fines.

#### Technical & Architectural Pitfalls

```typescript
const technicalPitfalls = {
  encryptionGap: {
    mistake: 'Encrypt at rest but not in transit or logs',
    example: 'Developer logs raw request object for debugging',
    result: 'PHI sitting unencrypted in log file',
    fix: 'Log sanitization + TLS everywhere'
  },
  shadowData: {
    mistake: 'Production data in non-prod environments',
    examples: [
      'Using prod DB copy for testing',
      'Old backups in unsecured S3 buckets',
      'PHI in developer laptops'
    ],
    fix: 'Synthetic data only in dev/test'
  },
  missingBaa: {
    mistake: 'Third-party tool touches PHI without BAA',
    examples: ['CRM', 'Email service', 'Analytics', 'Logging SaaS'],
    result: 'Automatic HIPAA violation—no breach required',
    fix: 'BAA inventory and verification'
  }
};
```

#### Access Control Pitfalls

```typescript
const accessPitfalls = {
  minimumNecessaryViolation: {
    mistake: 'Employees have more access than job requires',
    example: 'Billing clerk can see full clinical notes',
    frequency: 'Most common HIPAA violation',
    fix: 'ABAC with specific field-level access'
  },
  sharedLogins: {
    mistake: 'Generic accounts like "admin" or "reception_desk"',
    result: 'Impossible to audit who accessed what',
    fix: 'Unique user IDs + MFA for every touchpoint'
  },
  curiositySnooping: {
    mistake: 'Looking up coworker, friend, or celebrity records',
    frequency: 'Leading cause of internal breaches',
    consequence: 'Immediate termination + potential prosecution',
    detection: 'Access pattern anomaly detection'
  }
};
```

#### Communication & Workflow Pitfalls

```typescript
const communicationPitfalls = {
  autoCompleteEmail: {
    mistake: 'Send patient spreadsheet to wrong recipient via auto-fill',
    frequency: '#1 human error breach in 2025-2026',
    fix: 'DLP rules + confirmation for PHI attachments'
  },
  unsecuredMessaging: {
    mistake: 'Discuss patient cases on SMS, WhatsApp, Slack',
    problem: 'Not compliant without enterprise config + BAA',
    fix: 'Approved secure messaging platform only'
  },
  deidentificationFailure: {
    mistake: 'Remove name but leave DOB + ZIP + rare diagnosis',
    problem: 'Technically still PHI—can be re-identified',
    standard: 'HIPAA Safe Harbor: remove all 18 identifiers',
    alternative: 'Expert determination method'
  }
};

const prohibitedChannels = [
  'Personal email',
  'Standard SMS',
  'Consumer WhatsApp',
  'Free Slack tier',
  'Public cloud storage (Dropbox personal)',
  'Unencrypted fax (yes, still happens)'
];
```

#### Physical & Lifecycle Pitfalls

```typescript
const physicalPitfalls = {
  improperDisposal: {
    mistake: 'Paper in regular trash, old computers donated',
    requirement: 'Certified destruction with documentation',
    methods: ['Cross-cut shredding', 'Degaussing', 'Physical destruction'],
    proof: 'Certificate of destruction on file'
  },
  visibleScreens: {
    mistake: 'Unlocked workstation in high-traffic area',
    related: 'Discussing cases in elevator or cafeteria',
    fix: 'Auto-lock + privacy screens + awareness training'
  },
  orphanedMedia: {
    mistake: 'USB drives, backup tapes, old laptops forgotten',
    risk: 'PHI on lost/stolen unencrypted media',
    fix: 'Asset tracking + full disk encryption + secure wipe'
  }
};
```

### PHI Pitfalls Quick Reference

| Category | Pitfall | Consequence | Prevention |
|----------|---------|-------------|------------|
| Technical | PHI in logs | Unencrypted exposure | Log sanitization |
| Technical | No BAA with vendor | Auto-violation | BAA inventory |
| Access | Overbroad access | Minimum necessary violation | ABAC + field-level |
| Access | Shared logins | No audit trail | Unique IDs + MFA |
| Access | Curiosity snooping | Termination + prosecution | Anomaly detection |
| Communication | Wrong email recipient | Reportable breach | DLP + confirmation |
| Communication | Consumer messaging | Non-compliant channel | Approved platform |
| Physical | Improper disposal | Media exposure | Certified destruction |
| Physical | Visible screens | Casual exposure | Auto-lock + screens |

### PHI/PII Handling Comparison

| Aspect | Traditional | 2026 Standard |
|--------|-------------|---------------|
| MFA | Optional for some systems | Mandatory everywhere |
| Encryption at rest | "Addressable" | Required, no exceptions |
| Access model | Role-based (RBAC) | Attribute-based (ABAC) |
| Access duration | Permanent | Just-in-time, time-bound |
| Data discovery | Manual audits | Continuous automated scanning |
| Dev/test data | Anonymized production | Synthetic generation |
| AI training | Centralized data | Federated learning |
| Recovery testing | Annual | Regular drills, 72-hour proof |

### PHI Handling Checklist

```markdown
## Technical Controls
- [ ] MFA enforced on all PHI-touching systems
- [ ] AES-256 encryption at rest for all databases
- [ ] TLS 1.3 for all data in transit
- [ ] Tokenization for SSN, MRN, and identifiers
- [ ] JIT access with automatic revocation

## Discovery & Classification
- [ ] Automated scanning every 24 hours
- [ ] All PHI tagged with classification metadata
- [ ] Dark data discovery and remediation
- [ ] Data lineage tracking

## Access Control
- [ ] ABAC policies enforced
- [ ] Minimum necessary by role
- [ ] All access logged with purpose
- [ ] 6-year audit log retention

## Development
- [ ] Synthetic data for all non-prod environments
- [ ] No real PHI in development or testing
- [ ] Federated learning for AI/ML
- [ ] Regular breach response drills

## Recovery
- [ ] 72-hour restoration tested and documented
- [ ] Backup encryption verified
- [ ] Disaster recovery plan current
- [ ] Breach response runbook ready
```

---

## Performance Standards

### Response Time Targets

```typescript
const performanceTargets = {
  api: {
    p50: 100,    // milliseconds
    p95: 300,
    p99: 1000,
    max: 30000   // Hard timeout
  },

  database: {
    simpleQuery: 10,    // milliseconds
    complexQuery: 100,
    report: 5000
  },

  pageLoad: {
    firstContentfulPaint: 1500,  // milliseconds
    largestContentfulPaint: 2500,
    timeToInteractive: 3500
  }
};
```

### Caching Strategy

```typescript
const cachingRules = {
  // Cache layers
  layers: {
    browser: 'Static assets, 1 year with content hash',
    cdn: 'Public pages, 5 minutes',
    application: 'Database query results, varies',
    database: 'Query plan cache, connection pool'
  },

  // What to cache
  cache: [
    'Drug catalog (1 hour)',
    'Provider availability (5 minutes)',
    'User session (15 minutes)',
    'Static reference data (24 hours)'
  ],

  // What NOT to cache
  neverCache: [
    'PHI (security risk)',
    'Payment transactions',
    'Real-time inventory',
    'Prescription status'
  ],

  // Cache invalidation
  invalidation: {
    pattern: 'Cache-aside with TTL',
    keyFormat: '{entity}:{id}:{version}',
    broadcast: 'Redis pub/sub for distributed invalidation'
  }
};
```

### Database Performance

```typescript
const databasePerformance = {
  // Connection pooling
  connectionPool: {
    min: 5,
    max: 20,
    acquireTimeout: 10000,
    idleTimeout: 30000
  },

  // Query optimization
  queryRules: [
    'Index foreign keys',
    'Use EXPLAIN ANALYZE for slow queries',
    'Avoid N+1 queries (use JOINs or batch loading)',
    'Paginate large result sets',
    'Use read replicas for reports'
  ],

  // Monitoring
  monitoring: {
    slowQueryThreshold: 1000,  // milliseconds
    alerting: 'Alert on queries > 5 seconds',
    logging: 'Log queries > 1 second with EXPLAIN'
  }
};
```

---

## Appendix: Code Review Checklist

```typescript
const codeReviewChecklist = {
  security: [
    'No secrets in code',
    'Input validated at API boundary',
    'SQL parameterized',
    'Authorization checked',
    'PHI access logged'
  ],

  quality: [
    'Tests cover new code',
    'No TODO without ticket reference',
    'Error handling complete',
    'Logging appropriate',
    'Types are specific (no any)'
  ],

  performance: [
    'Database queries efficient',
    'No N+1 queries',
    'Large lists paginated',
    'Appropriate caching'
  ],

  maintainability: [
    'Code is self-documenting',
    'Complex logic has comments explaining WHY',
    'No dead code',
    'Consistent with existing patterns'
  ]
};
```

---

## AI-Assisted Development

This section covers universal pitfalls when working with AI coding assistants. Domain-specific AI pitfalls are in their respective sections (API Design, Database, Security, Testing).

### The Vague Prompt Problem

AI doesn't understand your brand, aesthetic, or context from generic requests:

```typescript
const promptQuality = {
  vague: {
    prompt: 'Make a cool contact form',
    result: 'Generic gray box from 1998'
  },
  specific: {
    prompt: `Create a contact form with:
      - Rounded corners (8px border-radius)
      - Soft shadow (0 4px 6px rgba(0,0,0,0.1))
      - Submit button in #1d4ed8
      - White text on hover
      - 16px padding
      - Max width 400px`,
    result: 'Exactly what you envisioned'
  }
};

const promptingPrinciple = 'Be a specific Junior Dev Manager, not a hopeful wisher';
```

### The "Accept All" Blindness

When the vibe is good, it's tempting to accept a 50-file refactor without review:

```typescript
const acceptAllDanger = {
  temptation: 'Preview looks okay, click Accept All',
  hidden: [
    'SQL injection vulnerabilities',
    'Hallucinated dependencies that don\'t exist',
    'Broken edge case logic',
    'Removed error handling',
    'Hardcoded credentials'
  ],
  fix: 'Use agentic governance—have a second agent review the first'
};

const reviewProcess = {
  step1: 'AI generates code',
  step2: 'Security-focused review (human or agent)',
  step3: 'Run tests before accepting',
  step4: 'Review diff line by line for non-trivial changes',
  never: 'Accept 50+ file changes without review'
};
```

### The Infinite Loop (Prompt Spamming)

Pasting the same error back repeatedly produces spaghetti, not solutions:

```typescript
const infiniteLoop = {
  pattern: [
    'Error occurs',
    'User: "fix this error"',
    'AI adds code',
    'Error persists',
    'User: "fix it again"',
    'AI adds more code',
    'Repeat until 500 lines of unused fixes'
  ],
  result: 'Hallucinated fixes obscure the actual bug'
};

const breakTheLoop = {
  instead: 'Change your communication style',
  prompt: `Don't write any code yet.
    Provide three hypotheses for why this error is happening
    based on the last change we made.`,
  then: 'Validate hypotheses before generating fixes'
};
```

### Data Layer First

Starting with UI and retrofitting the database causes architectural collapse:

```typescript
const developmentOrder = {
  wrong: ['UI', 'Animations', 'Colors', '...then figure out data'],
  right: ['Schema', 'Data relationships', 'API contracts', '...then UI'],
  ratio: 'Fixing data after UI is 10x harder'
};

const firstPrompt = {
  bad: 'Build me a prescription management dashboard',
  good: `Before any UI, define the schema:
    - What entities exist?
    - What are the relationships?
    - What fields does each entity need?
    - What are the constraints?`
};
```

### Context Window Blindness

AI forgets critical decisions from earlier in the session:

```typescript
const contextProblems = {
  symptom: 'AI suggests code incompatible with your established patterns',
  cause: 'Context window filled, earlier decisions forgotten',
  examples: [
    'Forgets you\'re using a specific API version',
    'Ignores custom naming conventions',
    'Contradicts architecture decisions from 3 hours ago'
  ]
};

const contextSolutions = {
  claudeMd: 'Keep a CLAUDE.md with project rules, re-reference it',
  smallerChunks: 'Work in focused sessions, not marathon coding',
  explicitContext: 'Start major prompts with "Remember: we use X pattern"',
  mcp: 'Use Model Context Protocol for persistent project context'
};
```

### Ghost Features (Missing State Management)

AI often generates the "happy path" and forgets loading, empty, and error states:

```typescript
const ghostFeatures = {
  aiGenerated: {
    code: `
      const PatientList = ({ patients }) => (
        <ul>
          {patients.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
      )
    `,
    missing: ['Loading spinner', 'Empty state', 'Error handling', 'Skeleton UI']
  },

  complete: {
    code: `
      const PatientList = ({ patients, isLoading, error }) => {
        if (isLoading) return <PatientListSkeleton />;
        if (error) return <ErrorState message={error.message} retry={refetch} />;
        if (!patients?.length) return <EmptyState message="No patients found" />;

        return (
          <ul>
            {patients.map(p => <li key={p.id}>{p.name}</li>)}
          </ul>
        );
      }
    `,
    includes: ['All UI states', 'Retry capability', 'Accessibility']
  }
};

const stateChecklist = [
  'Loading state with skeleton or spinner',
  'Error state with retry action',
  'Empty state with helpful message',
  'Partial failure state (some items failed)',
  'Timeout state for slow operations'
];
```

### The "localhost" Security Model

AI often writes code assuming a trusted local environment:

```typescript
const localhostSecurityPitfall = {
  aiGenerated: {
    code: `
      // AI puts secrets in frontend "for development"
      const API_KEY = 'sk_live_abc123';
      const stripe = new Stripe(API_KEY);
    `,
    reasoning: 'Works on localhost, ship it!'
  },

  production: {
    exposure: [
      'API keys visible in browser DevTools',
      'Secrets committed to version control',
      'Keys in client bundle accessible to anyone'
    ],
    consequence: 'Healthcare data breach, HIPAA violation, credential theft'
  }
};

const secretsRules = {
  never: [
    'API keys in frontend code',
    'Database credentials in client bundle',
    'Private keys anywhere in React/Vue/Angular'
  ],
  always: [
    'Environment variables on server only',
    'Backend proxy for sensitive API calls',
    'Secrets in vault (not .env in repo)'
  ],
  healthcare: 'HIPAA violation if PHI exposed via leaked credentials'
};
```

### Prompt Drift & Technical Debt

Long conversations cause AI to lose coherence, creating architectural spaghetti:

```typescript
const promptDrift = {
  pattern: {
    hour1: 'Clean, consistent patterns',
    hour3: 'Mixing patterns from different suggestions',
    hour6: 'Contradicting earlier decisions',
    hour10: 'Unmaintainable spaghetti code'
  },

  symptoms: [
    'Multiple state management approaches in one app',
    'Inconsistent naming conventions',
    'Duplicate utility functions',
    'Contradictory architecture patterns'
  ]
};

const preventDrift = {
  sessionHygiene: [
    'Start fresh sessions for new features',
    'Summarize decisions before continuing',
    'Reference CLAUDE.md at session start'
  ],

  checkpoints: [
    'Review code every 30-60 minutes',
    'Check for pattern consistency',
    'Refactor before adding more features',
    'Document decisions as you go'
  ],

  contextRefresh: `
    Before we continue, confirm these project rules:
    - State management: TanStack Query for server, Zustand for client
    - Styling: Tailwind only, no inline styles
    - Components: Arrow functions, feature-based folders
    - Forms: React Hook Form + Zod
  `
};
```

### The "God File" Phenomenon

AI happily dumps everything into one massive file:

```typescript
const godFilePitfall = {
  symptom: 'Single 2000+ line file with everything',

  aiGenerated: {
    prompt: 'Build a prescription management feature',
    result: 'One file with form, validation, API calls, types, utils, hooks'
  },

  problems: [
    'Impossible to test individual pieces',
    'Merge conflicts on every change',
    'Can\'t tree-shake unused code',
    'Mental overhead navigating 2000 lines'
  ]
};

const preventGodFiles = {
  promptTechnique: `
    Before generating code, plan the file structure:
    - Which components go in separate files?
    - Where do hooks live?
    - Where do types live?
    - What utilities are shared?
  `,

  splitThreshold: 200, // lines - if approaching, ask AI to split

  structure: {
    'feature/': {
      'components/': 'UI components',
      'hooks/': 'Custom hooks',
      'types.ts': 'TypeScript interfaces',
      'utils.ts': 'Pure utility functions',
      'api.ts': 'API layer',
      'index.ts': 'Public exports'
    }
  }
};
```

### "Zombie" Dependencies

AI adds overlapping or unused packages without cleanup:

```typescript
const zombieDependencies = {
  symptom: 'package.json grows, bundle bloats',

  examples: [
    'moment.js AND date-fns AND dayjs installed',
    'lodash AND ramda AND underscore',
    'axios still in deps after switching to fetch',
    'Multiple UI libraries (MUI + Chakra + Mantine)'
  ],

  healthcare: 'Larger bundle = slower load = worse patient experience'
};

const preventZombies = {
  beforeAddingDep: [
    'Check if functionality exists in current deps',
    'Prefer native APIs (fetch over axios)',
    'Bundle size analysis before adding'
  ],

  periodicAudit: {
    command: 'npx depcheck',
    frequency: 'Every sprint',
    action: 'Remove unused, consolidate overlapping'
  },

  aiPrompt: `
    Before adding a new dependency:
    1. Can we do this with existing packages?
    2. What's the bundle size impact?
    3. Is there a smaller alternative?
  `
};
```

### The "Try-Catch" Carpet

AI hides errors under a catch-all pattern:

```typescript
const tryCatchCarpet = {
  aiGenerated: {
    code: `
      try {
        const patient = await fetchPatient(id);
        const prescriptions = await fetchPrescriptions(id);
        const allergies = await fetchAllergies(id);
        return { patient, prescriptions, allergies };
      } catch (e) {
        console.log('Error:', e);
        return null;
      }
    `,
    problems: [
      'Which call failed? Unknown',
      'Is it retryable? Unknown',
      'What does UI show? Generic error',
      'Debugging? Good luck'
    ]
  },

  proper: {
    code: `
      const fetchPatientData = async (id: string) => {
        const patient = await fetchPatient(id).catch(e => {
          throw new PatientFetchError(id, e);
        });

        const [prescriptions, allergies] = await Promise.allSettled([
          fetchPrescriptions(id),
          fetchAllergies(id)
        ]);

        return {
          patient,
          prescriptions: prescriptions.status === 'fulfilled'
            ? prescriptions.value
            : { error: 'Failed to load prescriptions', retryable: true },
          allergies: allergies.status === 'fulfilled'
            ? allergies.value
            : { error: 'Failed to load allergies', retryable: true }
        };
      };
    `,
    benefits: [
      'Partial success possible',
      'Clear error attribution',
      'Retryable at granular level',
      'UI can show specific errors'
    ]
  }
};

const errorHandlingRules = {
  never: 'Generic try-catch around multiple operations',
  always: [
    'Catch at appropriate granularity',
    'Type errors specifically',
    'Enable partial success where possible',
    'Log with context for debugging'
  ]
};
```

### Hallucinated CSS & Deep Nesting

AI generates hardcoded values and excessive specificity:

```typescript
const hallucinatedCSS = {
  aiGenerated: {
    css: `
      .prescription-card {
        background: #f3f4f6 !important;
        padding: 17px;
        margin: 13px;
        border-radius: 7px;
      }

      .container > .wrapper > .inner > .card > .content > .title {
        font-size: 18.5px;
        color: #374151;
      }
    `,
    problems: [
      'Magic numbers not from design system',
      '!important wars inevitable',
      'Deep nesting = specificity nightmare',
      'Inconsistent with rest of app'
    ]
  },

  proper: {
    tailwind: `
      <div className="bg-gray-100 p-4 m-3 rounded-lg">
        <h2 className="text-lg text-gray-700">
          {title}
        </h2>
      </div>
    `,
    benefits: [
      'Uses design system tokens',
      'Consistent spacing/colors',
      'No specificity issues',
      'Easy to maintain'
    ]
  }
};

const cssRules = {
  never: [
    'Hardcoded pixel values (use spacing scale)',
    'Hardcoded colors (use color tokens)',
    '!important (fix specificity instead)',
    'Deep selector nesting (max 2-3 levels)'
  ],
  always: [
    'Design tokens for all values',
    'Utility classes (Tailwind) or CSS-in-JS',
    'Flat selectors where possible',
    'Consistent with design system'
  ]
};
```

### The Security "Blind Spot"

AI doesn't inherently understand your security boundaries:

```typescript
const securityBlindSpot = {
  aiAssumptions: [
    'All users are authenticated',
    'Inputs are already validated',
    'Environment is trusted',
    'CORS is someone else\'s problem'
  ],

  healthcareCritical: {
    phi: 'AI might log patient names to console',
    authorization: 'AI might skip role checks',
    audit: 'AI might forget audit trail requirements',
    encryption: 'AI might store sensitive data in plain text'
  }
};

const securityPrompting = {
  contextToProvide: [
    'User authentication status matters',
    'Role-based access control required',
    'PHI logging is prohibited',
    'All inputs must be validated'
  ],

  promptTemplate: `
    Security context for this feature:
    - Authentication: Required, JWT-based
    - Authorization: Pharmacist role required for ${feature}
    - PHI: This handles patient data - no logging names/DOB/SSN
    - Audit: All changes must be audit-logged
    - Validation: Validate all inputs server-side
  `,

  reviewFocus: [
    'Input validation present?',
    'Authorization checks in place?',
    'PHI properly protected?',
    'Audit logging included?'
  ]
};
```

### AI-Assisted Development Rules

```typescript
const aiDevelopmentRules = {
  prompting: [
    'Be specific about aesthetics, dimensions, colors',
    'Include constraints and edge cases upfront',
    'Ask for explanations before code when debugging',
    'Provide security context (auth, roles, PHI handling)',
    'Request file structure before generation'
  ],
  reviewing: [
    'Never Accept All on large changes',
    'Review every file in multi-file changes',
    'Run tests before accepting',
    'Check for hallucinated imports/dependencies',
    'Verify all UI states (loading, error, empty)',
    'Check for hardcoded CSS values'
  ],
  architecture: [
    'Define schema and data layer first',
    'Establish patterns in CLAUDE.md or CONTRIBUTING.md',
    'Reference context docs in major prompts',
    'Split files before they become "god files" (200+ lines)',
    'Audit dependencies regularly for zombies'
  ],
  debugging: [
    'Break infinite loops—ask for hypotheses, not fixes',
    'Validate assumptions before generating code',
    'Use a second agent for code review',
    'Check error handling granularity (not try-catch carpet)'
  ],
  sessionHygiene: [
    'Start fresh sessions for new features',
    'Summarize decisions before continuing long sessions',
    'Review code every 30-60 minutes for drift',
    'Check for pattern consistency across the codebase'
  ],
  security: [
    'Never put API keys in frontend code',
    'Verify authorization checks are present',
    'Ensure PHI is not logged or exposed',
    'Validate all inputs server-side'
  ]
};
```

### AI Code Review Checklist

```markdown
## Before Accepting AI-Generated Code

### Security
- [ ] No hardcoded secrets or credentials
- [ ] No API keys in frontend code
- [ ] No SQL injection vulnerabilities
- [ ] Input validation present
- [ ] No sensitive data (PHI) in logs
- [ ] Authorization checks in place
- [ ] CORS properly configured

### Dependencies
- [ ] All imports exist (no hallucinated packages)
- [ ] Package versions are current and compatible
- [ ] No unnecessary new dependencies added
- [ ] No duplicate/overlapping libraries (zombie deps)

### Logic
- [ ] Edge cases handled
- [ ] Error handling present (not generic try-catch carpet)
- [ ] Matches existing patterns in codebase
- [ ] No removed functionality (check deletions)
- [ ] Partial failure handling where appropriate

### UI States
- [ ] Loading state implemented
- [ ] Error state with retry option
- [ ] Empty state with helpful message
- [ ] Skeleton/placeholder while loading

### Style
- [ ] Follows project conventions (arrow functions, etc.)
- [ ] No excessive comments
- [ ] No emojis in code
- [ ] Consistent with existing code
- [ ] No hardcoded CSS values (uses design tokens)
- [ ] No !important or deep selector nesting

### File Structure
- [ ] Code split across appropriate files (no god files)
- [ ] Components, hooks, types in separate files
- [ ] Feature-based folder structure followed

### Testing
- [ ] Tests still pass
- [ ] New code has test coverage
- [ ] No skipped or disabled tests
```

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Platform Team | Initial version |
