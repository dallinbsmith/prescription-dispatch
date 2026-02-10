# Design System

> Compounding Pharmacy Platform - Visual Design Standards

This document defines the visual language, design tokens, and component specifications for the platform. For implementation details, see `implementation-standards.md`.

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Voice and Tone](#voice-and-tone)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Sizing](#spacing--sizing)
6. [Border & Shadow](#border--shadow)
7. [Iconography](#iconography)
8. [Component Specifications](#component-specifications)
9. [Healthcare-Specific Patterns](#healthcare-specific-patterns)
10. [Accessibility Standards](#accessibility-standards)
11. [Responsive Design](#responsive-design)
12. [Motion & Animation](#motion--animation)
13. [Dark Mode](#dark-mode)
14. [Z-Index Scale](#z-index-scale)

---

## Design Principles

### Core Values

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Clarity** | Information must be instantly understandable | No ambiguous icons, clear labels, obvious hierarchy |
| **Safety** | Design prevents errors in critical workflows | Confirmation dialogs, clear destructive action styling |
| **Efficiency** | Minimize clicks for frequent tasks | Keyboard shortcuts, smart defaults, bulk actions |
| **Trust** | Professional, clinical aesthetic | Clean layouts, consistent patterns, no playful elements |
| **Accessibility** | Usable by all pharmacy staff | WCAG 2.1 AA minimum, clear focus states, screen reader support |

### Healthcare Context

```
This is a clinical application. Design decisions prioritize:
1. Patient safety over aesthetics
2. Clarity over cleverness
3. Consistency over novelty
4. Speed over delight
```

---

## Voice and Tone

### Understanding Voice vs. Tone

**Voice** is consistent—it's who we are. **Tone** adapts to context and the reader's emotional state.

| Concept | Definition | Example |
|---------|------------|---------|
| **Voice** | Our personality, consistent across all communication | Professional, competent, supportive |
| **Tone** | How we express that personality in a given moment | Reassuring during errors, celebratory on success |

You have the same voice when helping a confused new user as when confirming a successful verification—but your tone shifts to meet them where they are.

### Our Voice

We've walked in our users' shoes. We know compounding pharmacy is demanding work with high stakes and complex regulations. That's why we speak like the knowledgeable, reliable partner pharmacists wish they'd always had.

We treat every pharmacy professional seriously. We want to support their work without patronizing or overwhelming them.

We're confident but never arrogant. We know our platform inside and out, and we share that expertise with clarity and respect for the user's own professional knowledge.

### Voice Principles

| Principle | What It Means | How We Apply It |
|-----------|---------------|-----------------|
| **Plainspoken** | We value clarity above all else. No jargon, no fluff, no hyperbole. Healthcare professionals deal with enough complexity—we don't add to it. | "Verification complete" not "Your verification has been successfully processed!" |
| **Competent** | We know pharmacy workflows deeply. Our language reflects understanding of the work, not surface-level familiarity. | Use correct terminology: "dispense" not "send out," "compound" not "make" |
| **Supportive** | We're a partner, not a critic. When things go wrong, we help fix them without blame. | "This prescription requires review" not "You entered invalid data" |
| **Efficient** | Time matters. Every word earns its place. We respect users' attention and cognitive load. | "Save" not "Click here to save your changes" |
| **Trustworthy** | In healthcare, trust is everything. We're accurate, consistent, and never misleading. | Never use vague language for critical actions |

### Voice in Practice

#### We Are Plainspoken

The pharmacy world is already filled with complex regulations, Latin abbreviations, and dense clinical terminology. Our interface doesn't add to the noise.

| Instead of | Write |
|------------|-------|
| "Your request has been submitted and is currently being processed by our system" | "Request submitted" |
| "An error has occurred while attempting to save your changes" | "Couldn't save. Try again." |
| "Please be advised that this medication requires special handling" | "Requires cold storage" |
| "You have successfully completed the verification process" | "Verified" |

#### We Are Competent

We speak the language of pharmacy without being pedantic. We use correct terminology naturally.

| Context | Correct Term | Not |
|---------|--------------|-----|
| Pharmacist approval | Verification | Approval, sign-off |
| Creating a compound | Compounding | Making, mixing |
| Giving medication to patient | Dispensing | Sending, giving out |
| Medication ingredients | Active ingredients, excipients | Stuff, components |
| Prescription origin | Prescriber | Doctor (unless specifically MD) |

#### We Are Supportive

Errors happen. We help users recover without making them feel incompetent.

| Instead of | Write |
|------------|-------|
| "Invalid entry" | "Check the quantity format" |
| "Error: Missing required field" | "Add patient date of birth to continue" |
| "You do not have permission" | "Pharmacist verification required" |
| "Failed to load" | "Couldn't load prescriptions. Retry?" |

#### We Are Efficient

Every word costs cognitive effort. Especially in high-volume workflows, brevity matters.

| Instead of | Write |
|------------|-------|
| "Click here to add a new prescription" | "Add prescription" |
| "Are you sure you want to delete this item?" | "Delete this compound?" |
| "No results were found matching your search" | "No results" |
| "Please wait while we load your data" | [Show loading indicator, no text needed] |

### Tone Adaptation

Our voice stays constant. Our tone shifts based on:

1. **The user's emotional state** — Are they stressed, confused, accomplished?
2. **The stakes of the moment** — Is this routine or critical?
3. **The context** — Error message vs. success confirmation vs. educational content

#### Tone by Context

| Context | User State | Tone | Example |
|---------|------------|------|---------|
| **Success** | Accomplished | Confirming, brief | "Prescription verified" |
| **Error** | Frustrated/Anxious | Helpful, calm, solution-focused | "Couldn't save. Check your connection and try again." |
| **Warning** | Needs attention | Clear, direct, not alarming | "Drug interaction detected. Review before continuing." |
| **Critical Alert** | Must act now | Urgent, unambiguous | "ALLERGY: Patient allergic to Penicillin" |
| **Empty State** | Uncertain | Guiding, encouraging | "No prescriptions yet. Add your first one to get started." |
| **Onboarding** | Learning | Patient, welcoming | "Let's set up your pharmacy profile. This takes about 5 minutes." |
| **Confirmation Dialog** | Deciding | Neutral, informative | "Delete this prescription? This can't be undone." |

#### Healthcare-Specific Tone Considerations

| Situation | Tone Requirement | Rationale |
|-----------|------------------|-----------|
| **Patient safety alerts** | Serious, never playful | Lives are at stake |
| **Regulatory compliance** | Formal, precise | Legal implications |
| **Routine workflows** | Efficient, minimal | Don't slow down experienced users |
| **Error recovery** | Supportive, never blaming | Stress is already high |
| **Verification steps** | Clear, authoritative | These are legal signatures |

### What We Don't Do

| Avoid | Why | Instead |
|-------|-----|---------|
| **Humor in critical contexts** | Patient safety is not funny | Save any lightness for empty states or onboarding |
| **Exclamation points** | Feels unprofessional in clinical context | Use period or no punctuation |
| **Emoji in core workflows** | Too casual for healthcare | Reserve for informal communications if ever |
| **Excessive enthusiasm** | "Awesome! Great job!" feels patronizing | Simple confirmation suffices |
| **Robotic formality** | "Your request has been received and will be processed" | Be human: "Got it" |
| **Blame language** | "You entered..." makes users defensive | "This field needs..." focuses on the fix |
| **Vague language** | "Something went wrong" is useless | Be specific about what happened and what to do |

### Writing Guidelines

#### Use Active Voice

Active voice is clearer and more direct.

| Passive (Avoid) | Active (Preferred) |
|-----------------|-------------------|
| "The prescription was verified by Dr. Smith" | "Dr. Smith verified the prescription" |
| "Your changes have been saved" | "Changes saved" |
| "An error was encountered" | "Couldn't complete the action" |

#### Write Positively

Frame messages around what users can do, not what they can't.

| Negative (Avoid) | Positive (Preferred) |
|------------------|---------------------|
| "You can't proceed without verification" | "Get pharmacist verification to continue" |
| "Don't enter more than 999" | "Enter a quantity up to 999" |
| "Invalid date format" | "Use MM/DD/YYYY format" |

#### Avoid Jargon (Except Clinical Terms)

Use plain English for interface language. Use correct clinical terminology for clinical concepts.

| Type | Approach |
|------|----------|
| **UI jargon** | Avoid: "modal," "dropdown," "submit" (use "dialog," "menu," "save") |
| **Tech jargon** | Avoid: "sync," "cache," "server error" (explain what it means to user) |
| **Clinical terms** | Keep: "compound," "dispense," "NDC," "DEA schedule" (users know these) |

#### Be Specific

Vague messages waste time and increase anxiety.

| Vague (Avoid) | Specific (Preferred) |
|---------------|---------------------|
| "Error" | "Couldn't save prescription. Prescriber NPI is missing." |
| "Invalid input" | "Quantity must be a number" |
| "Something went wrong" | "Lost connection to server. Retrying..." |
| "Are you sure?" | "Delete prescription RX-2024-00123? This can't be undone." |

### Content Patterns

#### Button Labels

| Context | Pattern | Examples |
|---------|---------|----------|
| Primary action | Verb or Verb + Noun | "Save," "Add Prescription," "Verify" |
| Destructive action | Specific verb | "Delete Prescription" not just "Delete" |
| Cancel | "Cancel" | Not "Never mind" or "Go back" |
| Confirmation | Repeat the action | "Delete" in dialog confirming delete |

#### Error Messages

Structure: **What happened** + **How to fix it**

```
[Icon] Couldn't save prescription
       Check your connection and try again.
       [Retry]
```

```
[Icon] Invalid NDC format
       NDC should be 11 digits (e.g., 12345-6789-01)
```

#### Success Messages

Keep brief. The action completing is usually confirmation enough.

| Action | Message |
|--------|---------|
| Save | "Saved" or just close the modal |
| Delete | "Deleted" or remove item from list |
| Verify | "Verified" with visual indicator |
| Submit | "Submitted" with status update |

#### Empty States

Structure: **What's empty** + **Why it matters** (optional) + **What to do**

```
No prescriptions yet
Add your first prescription to get started.
[Add Prescription]
```

```
No results match your search
Try adjusting your filters or search terms.
```

#### Confirmation Dialogs

Structure: **Question** + **Consequence** + **Actions**

```
Delete this prescription?

This will permanently remove RX-2024-00123 from the system.
This action can't be undone.

[Cancel]  [Delete Prescription]
```

### Terminology Reference

#### Preferred Terms

| Use | Instead of |
|-----|------------|
| Sign in | Log in, Login |
| Sign out | Log out, Logout |
| Prescriber | Doctor, Physician (unless specific) |
| Patient | Customer, Client |
| Prescription | Rx, Script (in formal UI) |
| Quantity | Amount, Number |
| Verify | Approve, Sign off |
| Compound | Preparation, Formulation |
| Dispense | Give, Send, Distribute |

#### Abbreviations

| Abbreviation | Expanded | When to Use |
|--------------|----------|-------------|
| Rx | Prescription | Labels, tight spaces only |
| NDC | National Drug Code | Always acceptable |
| DEA | Drug Enforcement Administration | Always acceptable |
| NPI | National Provider Identifier | Always acceptable |
| DOB | Date of Birth | Labels only, spell out in sentences |
| Qty | Quantity | Labels only, spell out in sentences |

### Checklist: Voice and Tone Review

```markdown
## Before Publishing Copy

### Voice
- [ ] Is it plainspoken? No jargon, no fluff?
- [ ] Does it sound competent? Correct terminology?
- [ ] Is it supportive? No blame, solution-focused?
- [ ] Is it efficient? Every word earns its place?
- [ ] Is it trustworthy? Accurate, not misleading?

### Tone
- [ ] Does the tone match the user's likely emotional state?
- [ ] Is it appropriate for the stakes (routine vs. critical)?
- [ ] For errors: helpful and calm, not alarming?
- [ ] For success: brief, not excessive?
- [ ] For warnings: clear and direct?

### Technical
- [ ] Active voice used?
- [ ] Positive framing where possible?
- [ ] Specific, not vague?
- [ ] No exclamation points in core UI?
- [ ] Correct clinical terminology?
```

---

## Content Formatting

Consistent formatting of dates, numbers, and identifiers is critical in healthcare. A misread date or dosage can harm patients.

---

### Dates

| Context | Format | Example |
|---------|--------|---------|
| Display (US) | `MMM D, YYYY` | Jan 5, 2026 |
| Display (compact) | `MM/DD/YYYY` | 01/05/2026 |
| Input fields | `MM/DD/YYYY` | 01/05/2026 |
| ISO (storage/API) | `YYYY-MM-DD` | 2026-01-05 |
| Expiration dates | `MM/YYYY` or `MMM YYYY` | 01/2026 or Jan 2026 |
| Relative (recent) | Words | Today, Yesterday, 2 days ago |
| Relative (threshold) | After 7 days, use absolute | Jan 5, 2026 |

**Date of Birth Display**:

| Context | Format | Example |
|---------|--------|---------|
| Patient banner | `MM/DD/YYYY (age)` | 03/15/1985 (40 y/o) |
| Forms/tables | `MM/DD/YYYY` | 03/15/1985 |
| Verification | Spell out month | March 15, 1985 |

**Never**:
- Use ambiguous formats like `01/05/26` (is it 2026 or 1926? Jan 5 or May 1?)
- Omit the year on clinical documents
- Use relative dates for prescriptions or expiration

---

### Times

| Context | Format | Example |
|---------|--------|---------|
| Display | `h:mm a` | 2:30 pm |
| 24-hour (clinical) | `HH:mm` | 14:30 |
| With timezone | `h:mm a z` | 2:30 pm EST |
| Timestamps | `MMM D, YYYY h:mm a` | Jan 5, 2026 2:30 pm |

**Time Formatting Rules**:

| Rule | Example |
|------|---------|
| Lowercase am/pm | 2:30 pm (not PM) |
| No leading zero on hours | 2:30 pm (not 02:30 pm) |
| Space before am/pm | 2:30 pm (not 2:30pm) |
| Midnight | 12:00 am or "Midnight" |
| Noon | 12:00 pm or "Noon" |

**Durations**:

| Context | Format | Example |
|---------|--------|---------|
| Short | `Xh Xm` | 2h 30m |
| Long | Words | 2 hours, 30 minutes |
| Days supply | `X days` | 30 days |

---

### Phone Numbers

| Context | Format | Example |
|---------|--------|---------|
| US display | `(XXX) XXX-XXXX` | (555) 123-4567 |
| US with extension | `(XXX) XXX-XXXX ext. XXXX` | (555) 123-4567 ext. 1234 |
| Input mask | `(___) ___-____` | User types digits only |
| International | `+X XXX XXX XXXX` | +1 555 123 4567 |
| Clickable (mobile) | `tel:` link | Tap to call |

**Storage**: Store as digits only (`5551234567`), format on display.

---

### Addresses

**Display Format** (multi-line):
```
123 Main Street
Suite 400
Austin, TX 78701
```

**Display Format** (single-line):
```
123 Main Street, Suite 400, Austin, TX 78701
```

| Component | Format |
|-----------|--------|
| Street | Title case, abbreviate common suffixes (St, Ave, Blvd) |
| Unit/Suite | "Suite 400" or "Apt 2B" on own line |
| City | Title case |
| State | 2-letter abbreviation, uppercase |
| ZIP | 5-digit or ZIP+4 (78701-1234) |

---

### Currency

| Context | Format | Example |
|---------|--------|---------|
| Prices | `$X.XX` | $29.99 |
| Whole dollars | `$X` or `$X.00` | $30 or $30.00 |
| Large amounts | `$X,XXX.XX` | $1,234.56 |
| Negative | `−$X.XX` (minus sign) | −$50.00 |
| Copay display | `$X.XX copay` | $15.00 copay |

**Rules**:
- Always include dollar sign
- Use commas for thousands
- Two decimal places for transactions (optional for display prices)
- No space between $ and number

---

### Numbers

| Context | Format | Example |
|---------|--------|---------|
| General | Commas for thousands | 1,234 |
| Decimals | Period separator | 3.14 |
| Percentages | `X%` (no space) | 85% |
| Ranges | En-dash, no spaces | 10–20 |
| Counts (small) | Spell out 1-9 | three patients |
| Counts (large) | Numerals | 47 prescriptions |
| Ordinals | Superscript or plain | 1st or 1st |

**Tabular Numbers**: Use `font-variant-numeric: tabular-nums` for columns of numbers to ensure alignment.

```css
.numeric-column {
  font-variant-numeric: tabular-nums;
  text-align: right;
}
```

---

### Medical Units & Dosages

This is the most critical formatting section for patient safety.

#### Strength/Dosage Units

| Unit | Display | Never Use |
|------|---------|-----------|
| milligrams | `mg` | `MG`, `Mg`, `mgm` |
| micrograms | `mcg` | `μg` (can be misread as mg) |
| grams | `g` | `gm`, `Gm`, `GM` |
| milliliters | `mL` | `ml`, `ML`, `cc` |
| liters | `L` | `l` (looks like 1) |
| units (insulin) | `units` | `U` (can be misread as 0) |
| international units | `units` | `IU` (can be misread as IV) |
| milliequivalents | `mEq` | `meq`, `MEQ` |

#### Dosage Display Format

| Context | Format | Example |
|---------|--------|---------|
| Medication + strength | `Name Strength Unit` | Progesterone 100 mg |
| Multiple strengths | Slash separated | 10 mg/5 mL |
| Concentration | Per unit | 250 mg/mL |
| Compound formula | Ingredient: Amount | Progesterone: 10,000 mg |

#### Dangerous Abbreviations to NEVER Use

| Abbreviation | Problem | Use Instead |
|--------------|---------|-------------|
| `U` | Mistaken for 0, 4, or cc | `units` |
| `IU` | Mistaken for IV or 10 | `units` |
| `μg` | Mistaken for mg | `mcg` |
| `Q.D.` | Mistaken for Q.I.D. | `daily` |
| `Q.O.D.` | Mistaken for Q.D. | `every other day` |
| `SC` or `SQ` | Mistaken for SL | `subcut` or `subcutaneous` |
| `D/C` | Discharge vs. discontinue | `discharge` or `discontinue` |
| `HS` | Half-strength vs. bedtime | `at bedtime` |
| `cc` | Mistaken for U | `mL` |
| `AS`, `AD`, `AU` | Mistaken for OS, OD, OU | `left ear`, `right ear`, `both ears` |

#### Trailing Zeros

| Rule | Wrong | Correct |
|------|-------|---------|
| No trailing zero | `1.0 mg` | `1 mg` |
| Leading zero required | `.5 mg` | `0.5 mg` |

**Why**: "1.0 mg" can be misread as "10 mg" (10x overdose). ".5 mg" can be misread as "5 mg".

#### Quantity Display

| Context | Format | Example |
|---------|--------|---------|
| Tablet/capsule count | `# tablets` or `# capsules` | 30 tablets |
| Liquid volume | `# mL` | 120 mL |
| Days supply | `# days` | 30 days |
| Refills | `# refills` or `No refills` | 3 refills |

---

### Patient Identifiers

| Identifier | Format | Example |
|------------|--------|---------|
| MRN (Medical Record #) | Numeric, no formatting | 12345678 |
| Patient name | `Last, First` or `First Last` | Smith, John or John Smith |
| DOB | `MM/DD/YYYY` | 03/15/1985 |
| Age | `XX y/o` or `XX years old` | 40 y/o |
| Pediatric age | Months if <2 years | 18 months |

**Patient Banner Format**:
```
John Smith | DOB: 03/15/1985 (40 y/o) | MRN: 12345678
⚠️ ALLERGIES: Sulfa, Penicillin
```

---

### Prescription & Pharmacy Identifiers

| Identifier | Format | Example |
|------------|--------|---------|
| Rx Number | Numeric, prefix optional | Rx #123456 or 123456 |
| NDC (National Drug Code) | `XXXXX-XXXX-XX` | 12345-6789-01 |
| Lot Number | Alphanumeric, preserve case | LOT-A1B2C3 |
| DEA Number | 2 letters + 7 digits | AB1234567 |
| NPI | 10 digits | 1234567890 |
| State License | State + number | TX-12345 |

**NDC Formatting**:
- Standard format: `5-4-2` (54321-1234-01)
- Store without dashes, format on display
- Leading zeros are significant

---

### Sig Codes (Prescription Instructions)

Expand abbreviations for patient-facing content:

| Sig Code | Expansion | Display |
|----------|-----------|---------|
| `PO` | By mouth | Take by mouth |
| `BID` | Twice daily | Take twice daily |
| `TID` | Three times daily | Take three times daily |
| `QID` | Four times daily | Take four times daily |
| `QD` | Once daily | Take once daily |
| `QHS` | At bedtime | Take at bedtime |
| `PRN` | As needed | Take as needed |
| `AC` | Before meals | Take before meals |
| `PC` | After meals | Take after meals |
| `C` or `with` | With | Take with food |

**Full Sig Example**:
```
Sig code: 1 cap PO BID PRN pain
Display:  Take 1 capsule by mouth twice daily as needed for pain
```

---

### Status Labels

Consistent status terminology across the platform:

| Workflow Stage | Status Label | Color |
|----------------|--------------|-------|
| New/Submitted | `New` | Blue |
| Awaiting review | `Pending` | Yellow |
| Being processed | `In Progress` | Blue |
| Needs attention | `Action Required` | Orange |
| Waiting on external | `On Hold` | Gray |
| Approved/Done | `Complete` | Green |
| Problem | `Failed` or `Error` | Red |
| Stopped | `Cancelled` | Gray |

**Prescription-Specific Statuses**:

| Status | Meaning |
|--------|---------|
| `Received` | Rx received, not yet reviewed |
| `Pending Verification` | Awaiting pharmacist review |
| `Verified` | Pharmacist approved |
| `Compounding` | Being prepared |
| `QC Review` | Quality check in progress |
| `Ready` | Ready for pickup/shipping |
| `Dispensed` | Given to patient |
| `Shipped` | In transit |
| `Delivered` | Received by patient |

---

### Empty & Null States

| State | Display | Example |
|-------|---------|---------|
| No data | Descriptive text | "No allergies on file" |
| Unknown | "Unknown" or "Not provided" | "Phone: Not provided" |
| Not applicable | `—` (em-dash) or "N/A" | See table cells |
| Loading | Skeleton or spinner | — |
| Zero | `0` or `None` | "0 refills remaining" |

**Never display**:
- `null`, `undefined`, `NaN`
- Empty strings (use placeholder text)
- `-1` or other sentinel values

---

### Formatting Helper Reference

```typescript
// Date formatting
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }); // "Jan 5, 2026"
};

// Phone formatting
const formatPhone = (digits: string): string => {
  const cleaned = digits.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : digits;
};

// Currency formatting
const formatCurrency = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100); // "$29.99"
};

// Dosage formatting (safe)
const formatDosage = (value: number, unit: string): string => {
  // No trailing zeros, always leading zero
  const formatted = value % 1 === 0
    ? value.toString()
    : value.toFixed(2).replace(/\.?0+$/, '');
  return `${formatted} ${unit}`;
}; // "0.5 mg", "1 mg", "2.5 mg"
```

---

### Writing for Scannability

Modern users scan before they read. In healthcare, scannable content reduces errors and speeds up workflows.

---

#### The Inverted Pyramid 2.0

Front-load the most important information. Users (and AI systems) want the answer immediately.

```
❌ Traditional Structure               ✓ Inverted Pyramid
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ Background and context...   │        │ TL;DR: Key finding/action   │
│ More background...          │        │ ─────────────────────────── │
│ Historical perspective...   │        │ Important details           │
│ Technical details...        │        │ Supporting context          │
│ ─────────────────────────── │        │ Background if needed        │
│ The actual point (finally)  │        │                             │
└─────────────────────────────┘        └─────────────────────────────┘
```

**Healthcare Application**:

| Context | Lead With |
|---------|-----------|
| Alert messages | The action needed, then the reason |
| Drug information | Critical warnings first |
| Instructions | What to do, then why |
| Status updates | Current state, then history |

**Example**:
```
❌ "Due to a recent change in manufacturer guidelines and
   updated stability data, we need to inform you that..."

✓ "Action Required: Discard Lot #A123 of Progesterone.
   Stability testing showed degradation before expiry date."
```

---

#### Micro-Paragraphing

Walls of text cause users to skip content—dangerous in clinical contexts.

**The Rule**: 1-3 sentences per paragraph maximum.

```
❌ Wall of Text                        ✓ Micro-Paragraphs
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ This medication should be   │        │ Take with food.             │
│ taken with food to prevent  │        │                             │
│ stomach upset. It is        │        │ Avoid grapefruit juice—it   │
│ important to avoid          │        │ affects absorption.         │
│ grapefruit juice while      │        │                             │
│ taking this medication as   │        │ Take at the same time       │
│ it can affect absorption.   │        │ each day for best results.  │
│ For best results, take at   │        │                             │
│ the same time each day...   │        │                             │
└─────────────────────────────┘        └─────────────────────────────┘
(Skimmed and missed key info)         (Each point stands alone)
```

**Line Length**: 50-75 characters per line for optimal readability.

---

#### Semantic & Question-Based Headings

Headings are signposts. Make them work harder.

| Weak Heading | Strong Heading |
|--------------|----------------|
| "Side Effects" | "What are the common side effects?" |
| "Dosage Information" | "How should I take this medication?" |
| "Interactions" | "What drugs should I avoid?" |
| "Storage" | "How do I store this medication?" |

**Benefits**:
- Matches natural language search queries
- Works with voice assistants
- Answers appear in search snippets
- Easier for users to find relevant sections

**Healthcare Note**: For professional/clinical documentation, traditional headings may be more appropriate. Use question-based headings for patient-facing content.

---

#### Hyper-Scannability Tools

If users can't grasp your point in 6 seconds, they'll miss critical information.

**Strategic Bolding**:

| Approach | Example |
|----------|---------|
| Bold the action | "**Take 1 tablet** by mouth daily" |
| Bold the warning | "Do not crush—**swallow whole**" |
| Bold the key data | "Refills remaining: **3**" |

**Rule**: If someone only read the bolded text, they should understand the essential message.

**Bulleted Lists**:
- Use for 3+ related items
- Keep items parallel in structure
- Front-load key words
- Limit to 5-7 items before breaking into groups

**Tables for Comparisons**:

```
❌ Prose                               ✓ Table
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ The morning dose is 10mg,   │        │ Time    │ Dose   │ With    │
│ which should be taken with  │        │ ────────┼────────┼──────── │
│ breakfast. The evening dose │        │ Morning │ 10 mg  │ Food    │
│ is 20mg and should be taken │        │ Evening │ 20 mg  │ Food    │
│ with dinner...              │        │ Bedtime │ 5 mg   │ —       │
└─────────────────────────────┘        └─────────────────────────────┘
```

---

#### Accessibility-First Content

Accessibility is a baseline requirement, not an enhancement.

**Descriptive Links**:

| Bad | Good |
|-----|------|
| "Click here" | "Download the prescription guide" |
| "Read more" | "View full prescribing information" |
| "Link" | "FDA safety alert for [Drug Name]" |

**Why**: Screen readers often navigate by links. "Click here, click here, click here" provides no context.

**Alt Text as Narrative**:

| Weak Alt Text | Descriptive Alt Text |
|---------------|---------------------|
| "Chart" | "Line chart showing blood glucose levels decreasing from 180 to 95 mg/dL over 30 days" |
| "Medication photo" | "White oval tablet imprinted with 'M15' on one side" |
| "Diagram" | "Step-by-step diagram showing proper inhaler technique: 1) Shake, 2) Exhale, 3) Inhale slowly" |

**Type Legibility**:

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Body text | 16px | 18px |
| Line height | 1.4 | 1.5–1.6 |
| Paragraph spacing | 1em | 1.5em |
| Contrast ratio | 4.5:1 | 7:1 for healthcare |

---

### Content Formatting Pitfalls

Common mistakes that reduce comprehension and engagement.

---

#### Pitfall 1: The "Indistinguishable" Link

Links are gateways to information, but poor link text breaks accessibility and scannability.

```
❌ Bad Links                           ✓ Good Links
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ For more information,       │        │ Review the complete         │
│ [click here].               │        │ [prescribing information    │
│                             │        │ for Progesterone].          │
│ See the report [here].      │        │                             │
│                             │        │ Download the [Q3 2026       │
│ [Read more]                 │        │ Compound Quality Report].   │
└─────────────────────────────┘        └─────────────────────────────┘

Screen reader hears:                   Screen reader hears:
"click here, here, read more"          Actual destinations
```

**Link Text Rules**:

| Rule | Example |
|------|---------|
| Describe the destination | "View patient profile" |
| Include document type | "Download PDF of lab results" |
| Be specific | "Contact Dr. Smith's office" not "Contact us" |
| Front-load keywords | "Allergy list for John Smith" not "Click to see allergies" |

---

#### Pitfall 2: Inconsistent Bold Styling

Bolding should guide the eye, not create visual noise.

```
❌ Over-Bolding                        ✓ Strategic Bolding
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ **This medication** should  │        │ This medication should be   │
│ **be taken** with **food**  │        │ taken with **food** to      │
│ to **prevent** stomach      │        │ prevent stomach upset.      │
│ **upset**. It is            │        │                             │
│ **important** to **avoid**  │        │ **Avoid grapefruit juice**  │
│ **grapefruit juice**.       │        │ while taking this—it        │
│                             │        │ affects absorption.         │
│ (Everything bold = nothing  │        │                             │
│  stands out)                │        │ (Key points scannable)      │
└─────────────────────────────┘        └─────────────────────────────┘
```

**Bolding Guidelines**:

| Bold This | Don't Bold This |
|-----------|-----------------|
| Action required | Entire sentences |
| Critical warnings | Random emphasis |
| Key data points | Common words |
| Anchor concepts | Decorative emphasis |

**Test**: Read only the bolded words. Do they tell the story?

---

#### Pitfall 3: The "Listicle" Overload

Bullet points aid scanning, but too many cause list fatigue.

```
❌ Endless List                        ✓ Grouped List
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ Side Effects:               │        │ Common Side Effects:        │
│ • Headache                  │        │ • Headache                  │
│ • Nausea                    │        │ • Nausea                    │
│ • Dizziness                 │        │ • Fatigue                   │
│ • Fatigue                   │        │                             │
│ • Dry mouth                 │        │ Less Common:                │
│ • Insomnia                  │        │ • Dry mouth                 │
│ • Appetite changes          │        │ • Insomnia                  │
│ • Mood swings               │        │ • Appetite changes          │
│ • Blurred vision            │        │                             │
│ • Constipation              │        │ Seek Medical Attention:     │
│ • Chest pain                │        │ • Chest pain                │
│ • Difficulty breathing      │        │ • Difficulty breathing      │
│ • Severe allergic reaction  │        │ • Severe allergic reaction  │
│                             │        │                             │
│ (Brain stops at item 5-6)   │        │ (Grouped by severity)       │
└─────────────────────────────┘        └─────────────────────────────┘
```

**List Guidelines**:

| Guideline | Application |
|-----------|-------------|
| Rule of 5 | Max 5-7 items before grouping |
| Parallel structure | Start each item the same way |
| Logical grouping | By category, severity, or sequence |
| Nested sparingly | Max 2 levels of nesting |

---

#### Pitfall 4: Poor Paragraph Chunking

Long paragraphs are walls that users climb over (or around).

```
❌ Wall of Text (8+ sentences)
┌─────────────────────────────────────────────────────────────────────────────┐
│ This compound medication is a custom formulation prepared specifically for  │
│ your needs based on your prescriber's order. It contains progesterone, an   │
│ important hormone that plays various roles in the body. The medication is   │
│ prepared in our state-licensed facility using USP-grade ingredients and     │
│ follows strict quality control procedures. You should store this medication │
│ at room temperature away from light and moisture. Do not refrigerate unless │
│ specifically instructed. Keep out of reach of children and pets. If you     │
│ experience any unusual symptoms or have concerns, contact your prescriber.  │
└─────────────────────────────────────────────────────────────────────────────┘

✓ Chunked Paragraphs (2-3 sentences each)
┌─────────────────────────────────────────────────────────────────────────────┐
│ This compound medication is prepared specifically for you based on your     │
│ prescriber's order. It contains progesterone, a hormone with various roles  │
│ in the body.                                                                │
│                                                                             │
│ Store at room temperature, away from light and moisture. Do not refrigerate │
│ unless instructed. Keep out of reach of children.                           │
│                                                                             │
│ Contact your prescriber if you experience unusual symptoms.                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Paragraph Guidelines**:

| Context | Max Sentences | Max Characters |
|---------|---------------|----------------|
| Mobile UI | 2 | ~150 |
| Web content | 3-4 | ~300 |
| Documentation | 4-5 | ~400 |
| Legal/compliance | As needed (use headings) | — |

---

#### Pitfall 5: Misaligned Alignment

Center alignment looks "designed" but hurts readability.

```
❌ Center-Aligned Body Text            ✓ Left-Aligned Body Text
┌─────────────────────────────┐        ┌─────────────────────────────┐
│    This medication should   │        │ This medication should be   │
│   be taken with food. The   │        │ taken with food. The most   │
│  most common side effects   │        │ common side effects include │
│ include headache and nausea.│        │ headache and nausea.        │
│  If symptoms persist, call  │        │                             │
│       your prescriber.      │        │ If symptoms persist, call   │
│                             │        │ your prescriber.            │
│ (Eye has to hunt for each   │        │                             │
│  line start)                │        │ (Consistent left edge)      │
└─────────────────────────────┘        └─────────────────────────────┘
```

**Alignment Rules**:

| Content Type | Alignment |
|--------------|-----------|
| Body text | Left (ragged right) |
| Headings | Left (or centered for hero) |
| Short labels | Left or centered |
| Pull quotes | Centered (brief only) |
| Numbers in tables | Right |
| Text in tables | Left |
| CTAs/buttons | Centered within button |

---

### Content Formatting Checklist

```markdown
## Before Displaying Clinical Data

### Dates & Times
- [ ] Using unambiguous date format (MMM D, YYYY)?
- [ ] Year included on all clinical dates?
- [ ] No relative dates for prescriptions/expiration?
- [ ] Timezone shown when relevant?

### Dosages (CRITICAL)
- [ ] No trailing zeros (1 mg, not 1.0 mg)?
- [ ] Leading zeros present (0.5 mg, not .5 mg)?
- [ ] Using approved unit abbreviations?
- [ ] NOT using dangerous abbreviations (U, IU, μg)?
- [ ] Units spelled out for high-risk meds?

### Numbers
- [ ] Tabular nums for data columns?
- [ ] Commas for thousands?
- [ ] Appropriate precision (not 3.14159 mg)?

### Patient Identifiers
- [ ] At least 2 identifiers shown (name + DOB)?
- [ ] Allergies prominently displayed?
- [ ] Age calculated correctly?

### Null Handling
- [ ] No raw null/undefined displayed?
- [ ] Empty states have helpful text?
- [ ] Loading states shown appropriately?
```

---

## Color System

### Brand Assets Status

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚠️  BRAND ASSETS IN DEVELOPMENT                                    │
│                                                                     │
│  The following assets are placeholders pending final brand review:  │
│  • Logo (all variants)                                              │
│  • Platform colorways (Patient, Doctor, Pharmacy, Employer)         │
│                                                                     │
│  Current colors are working values. Update sections marked with     │
│  [BRAND-UPDATE] when final assets are approved.                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Logo Specifications [BRAND-UPDATE]

#### Primary Logo

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                    ┌───────────────────────┐                        │
│                    │                       │                        │
│                    │    [LOGO PENDING]     │                        │
│                    │                       │                        │
│                    │    Example: 160x40    │                        │
│                    │                       │                        │
│                    └───────────────────────┘                        │
│                                                                     │
│  Replace with final logo assets when available                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Logo Variants

| Variant | Use Case | File | Status |
|---------|----------|------|--------|
| **Primary** | App header, light backgrounds | `logo-primary.svg` | Pending |
| **Inverted** | Dark backgrounds, dark mode | `logo-inverted.svg` | Pending |
| **Mark only** | Favicon, compact spaces | `logo-mark.svg` | Pending |
| **Monochrome** | Print, low-color contexts | `logo-mono.svg` | Pending |

#### Logo Sizing

| Context | Height | Min Width | Clear Space |
|---------|--------|-----------|-------------|
| App header | 32-40px | 120px | 8px all sides |
| Login/Auth pages | 48-64px | 180px | 16px all sides |
| Favicon | 32x32px | — | — |
| Email header | 40px | 150px | 12px all sides |
| Print | 0.5-0.75in | 2in | 0.125in |

#### Logo Usage Rules

```
DO:                                     DON'T:
┌─────────────────────────────┐         ┌─────────────────────────────┐
│                             │         │                             │
│  • Use approved variants    │         │  • Stretch or distort       │
│  • Maintain clear space     │         │  • Add effects (shadow,     │
│  • Use on approved colors   │         │    glow, outline)           │
│  • Scale proportionally     │         │  • Rotate or tilt           │
│                             │         │  • Change colors            │
│                             │         │  • Place on busy images     │
│                             │         │                             │
└─────────────────────────────┘         └─────────────────────────────┘
```

#### Logo Color Backgrounds

| Background | Logo Variant | Minimum Contrast |
|------------|--------------|------------------|
| Mercury White (`#F4F5F8`) | Primary | 4.5:1 |
| Nordic Gray (`#222326`) | Inverted | 4.5:1 |
| Platform primary colors | Inverted or Primary (test contrast) | 4.5:1 |

**Logo Asset Checklist** (complete when finalizing):
- [ ] Primary logo SVG uploaded
- [ ] Inverted logo SVG uploaded
- [ ] Logo mark (icon only) SVG uploaded
- [ ] Monochrome variant created
- [ ] All variants tested at required sizes
- [ ] Contrast ratios verified on all backgrounds
- [ ] Favicon generated from mark

---

### Platform Colorways [BRAND-UPDATE]

> **Current Status**: Working colorway values below. Update hex codes when final brand palette is approved.

**Quick Update Guide**:
When brand colors are finalized, update these locations:
1. Platform Primary Colors (Patient, Doctor, Pharmacy, Employer sections below)
2. CSS custom properties in token export section
3. Tailwind config in implementation files
4. Figma design tokens

---

### Multi-Platform Color Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SHARED FOUNDATION                            │
│  Neutral Palette | Secondary Colors | Status Colors | Dark/Light   │
├─────────────────────────────────────────────────────────────────────┤
│    PATIENT        DOCTOR        PHARMACY        EMPLOYER           │
│    (Blues)        (Reds)        (Purples)       (Oranges)          │
│                                                                     │
│  Primary Color   Primary Color  Primary Color   Primary Color      │
│  + Gradient      + Gradient     + Gradient      + Gradient         │
│  + 3 Sub-grads   + 3 Sub-grads  + 3 Sub-grads   + 3 Sub-grads     │
└─────────────────────────────────────────────────────────────────────┘
```

### Platform Overview

| Platform | Primary Hue | Target Users | Use Case |
|----------|-------------|--------------|----------|
| **Patient** | Blue | Patients, caregivers | Prescription management, refills, communication |
| **Doctor** | Red | Prescribers, clinicians | Prescribing, patient lookup, order management |
| **Pharmacy** | Purple | Pharmacists, technicians | Compounding, verification, dispensing |
| **Employer** | Orange | HR, benefits admins | Employee benefits, reporting, administration |

---

### Platform Primary Colors [BRAND-UPDATE]

#### Patient Platform (Blues) [BRAND-UPDATE]

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--patient-primary` | `#29B5E8` | 41/181/232 | Primary brand color |
| `--patient-primary-dark` | `#11567F` | 17/86/127 | Hover states, emphasis |
| `--patient-primary-darker` | `#003545` | 0/53/69 | Active states, headers |
| `--patient-primary-light` | `#71D3DC` | 113/211/220 | Backgrounds, highlights |

**Primary Gradient**
```css
--patient-gradient-primary: linear-gradient(135deg, #29B5E8 0%, #11567F 100%);
```

**Sub-Gradients**
```css
--patient-gradient-light: linear-gradient(135deg, #71D3DC 0%, #29B5E8 100%);
--patient-gradient-vibrant: linear-gradient(135deg, #29B5E8 0%, #003545 100%);
--patient-gradient-subtle: linear-gradient(135deg, #E8F7FB 0%, #C5EBF5 100%);
```

**Patient Palette Scale**
| Token | Value | Usage |
|-------|-------|-------|
| `--patient-50` | `#E8F7FB` | Subtle backgrounds |
| `--patient-100` | `#C5EBF5` | Hover backgrounds |
| `--patient-200` | `#93DBF0` | Light accents |
| `--patient-300` | `#71D3DC` | Secondary elements |
| `--patient-400` | `#4AC4E3` | Icons, borders |
| `--patient-500` | `#29B5E8` | **Primary** |
| `--patient-600` | `#1E8DB8` | Hover states |
| `--patient-700` | `#11567F` | Active, emphasis |
| `--patient-800` | `#0A3D5C` | Headers |
| `--patient-900` | `#003545` | Maximum contrast |

---

#### Doctor Platform (Reds) [BRAND-UPDATE]

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--doctor-primary` | `#DC3545` | 220/53/69 | Primary brand color |
| `--doctor-primary-dark` | `#A71D2A` | 167/29/42 | Hover states, emphasis |
| `--doctor-primary-darker` | `#6B1520` | 107/21/32 | Active states, headers |
| `--doctor-primary-light` | `#F5A3AA` | 245/163/170 | Backgrounds, highlights |

**Primary Gradient**
```css
--doctor-gradient-primary: linear-gradient(135deg, #DC3545 0%, #A71D2A 100%);
```

**Sub-Gradients**
```css
--doctor-gradient-light: linear-gradient(135deg, #F5A3AA 0%, #DC3545 100%);
--doctor-gradient-vibrant: linear-gradient(135deg, #DC3545 0%, #6B1520 100%);
--doctor-gradient-subtle: linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%);
```

**Doctor Palette Scale**
| Token | Value | Usage |
|-------|-------|-------|
| `--doctor-50` | `#FEF2F2` | Subtle backgrounds |
| `--doctor-100` | `#FEE2E2` | Hover backgrounds |
| `--doctor-200` | `#FECACA` | Light accents |
| `--doctor-300` | `#F5A3AA` | Secondary elements |
| `--doctor-400` | `#F87171` | Icons, borders |
| `--doctor-500` | `#DC3545` | **Primary** |
| `--doctor-600` | `#C82333` | Hover states |
| `--doctor-700` | `#A71D2A` | Active, emphasis |
| `--doctor-800` | `#861922` | Headers |
| `--doctor-900` | `#6B1520` | Maximum contrast |

---

#### Pharmacy Platform (Purples) [BRAND-UPDATE]

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--pharmacy-primary` | `#7D44CF` | 125/68/207 | Primary brand color |
| `--pharmacy-primary-dark` | `#5B2D9E` | 91/45/158 | Hover states, emphasis |
| `--pharmacy-primary-darker` | `#3C0045` | 60/0/69 | Active states, headers |
| `--pharmacy-primary-light` | `#C4A8E8` | 196/168/232 | Backgrounds, highlights |

**Primary Gradient**
```css
--pharmacy-gradient-primary: linear-gradient(135deg, #7D44CF 0%, #5B2D9E 100%);
```

**Sub-Gradients**
```css
--pharmacy-gradient-light: linear-gradient(135deg, #C4A8E8 0%, #7D44CF 100%);
--pharmacy-gradient-vibrant: linear-gradient(135deg, #7D44CF 0%, #3C0045 100%);
--pharmacy-gradient-subtle: linear-gradient(135deg, #F5F3FF 0%, #E9D5FF 100%);
```

**Pharmacy Palette Scale**
| Token | Value | Usage |
|-------|-------|-------|
| `--pharmacy-50` | `#F5F3FF` | Subtle backgrounds |
| `--pharmacy-100` | `#EDE9FE` | Hover backgrounds |
| `--pharmacy-200` | `#E9D5FF` | Light accents |
| `--pharmacy-300` | `#C4A8E8` | Secondary elements |
| `--pharmacy-400` | `#A78BFA` | Icons, borders |
| `--pharmacy-500` | `#7D44CF` | **Primary** |
| `--pharmacy-600` | `#6D38B8` | Hover states |
| `--pharmacy-700` | `#5B2D9E` | Active, emphasis |
| `--pharmacy-800` | `#4C1D95` | Headers |
| `--pharmacy-900` | `#3C0045` | Maximum contrast |

---

#### Employer Platform (Oranges) [BRAND-UPDATE]

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--employer-primary` | `#FF9F36` | 255/159/54 | Primary brand color |
| `--employer-primary-dark` | `#E07800` | 224/120/0 | Hover states, emphasis |
| `--employer-primary-darker` | `#9A5200` | 154/82/0 | Active states, headers |
| `--employer-primary-light` | `#FFCF99` | 255/207/153 | Backgrounds, highlights |

**Primary Gradient**
```css
--employer-gradient-primary: linear-gradient(135deg, #FF9F36 0%, #E07800 100%);
```

**Sub-Gradients**
```css
--employer-gradient-light: linear-gradient(135deg, #FFCF99 0%, #FF9F36 100%);
--employer-gradient-vibrant: linear-gradient(135deg, #FF9F36 0%, #9A5200 100%);
--employer-gradient-subtle: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
```

**Employer Palette Scale**
| Token | Value | Usage |
|-------|-------|-------|
| `--employer-50` | `#FFFBEB` | Subtle backgrounds |
| `--employer-100` | `#FEF3C7` | Hover backgrounds |
| `--employer-200` | `#FDE68A` | Light accents |
| `--employer-300` | `#FFCF99` | Secondary elements |
| `--employer-400` | `#FFB75E` | Icons, borders |
| `--employer-500` | `#FF9F36` | **Primary** |
| `--employer-600` | `#F08A1E` | Hover states |
| `--employer-700` | `#E07800` | Active, emphasis |
| `--employer-800` | `#B86000` | Headers |
| `--employer-900` | `#9A5200` | Maximum contrast |

---

### Shared Secondary Colors

These accent colors are available across all platforms for supporting elements.

| Token | Hex | RGB | Name | Usage |
|-------|-----|-----|------|-------|
| `--secondary-teal` | `#71D3DC` | 113/211/220 | Star Blue | Accents, links, info |
| `--secondary-coral` | `#D45B90` | 212/91/144 | First Light | Highlights, badges |
| `--secondary-slate` | `#8A999E` | 138/153/158 | Windy City | Neutral accents |

**Secondary Gradients**
```css
--secondary-gradient-teal: linear-gradient(135deg, #71D3DC 0%, #29B5E8 100%);
--secondary-gradient-coral: linear-gradient(135deg, #D45B90 0%, #A73F6B 100%);
--secondary-gradient-slate: linear-gradient(135deg, #8A999E 0%, #5A6B70 100%);
```

---

### Shared Neutral Palette

Used consistently across all platforms for text, backgrounds, and borders. All neutrals are derived from our two anchor colors.

**Anchor Colors**:

| Name | Token | Value | Role |
|------|-------|-------|------|
| **Mercury White** | `--mercury-white` | `#F4F5F8` | Light mode base background |
| **Nordic Gray** | `--nordic-gray` | `#222326` | Dark mode base background |

**Neutral Scale** (derived from Mercury White → Nordic Gray):

| Token | Value | Usage |
|-------|-------|-------|
| `--neutral-0` | `#FFFFFF` | Pure white (overlays, cards on Mercury) |
| `--neutral-50` | `#F4F5F8` | **Mercury White** - Light mode background |
| `--neutral-100` | `#E8EAEF` | Card backgrounds, hover states |
| `--neutral-200` | `#D5D8E0` | Borders, dividers |
| `--neutral-300` | `#B8BCC8` | Disabled borders, subtle elements |
| `--neutral-400` | `#8E93A3` | Placeholder text, disabled text |
| `--neutral-500` | `#6B7080` | Secondary text, icons |
| `--neutral-600` | `#4E525F` | Body text |
| `--neutral-700` | `#393C46` | Headings, emphasis |
| `--neutral-800` | `#2D2F36` | Primary text, dark surfaces |
| `--neutral-900` | `#222326` | **Nordic Gray** - Dark mode background |
| `--neutral-950` | `#18191C` | Maximum contrast, true dark |

```css
:root {
  /* Anchor colors */
  --mercury-white: #F4F5F8;
  --nordic-gray: #222326;

  /* Neutral scale */
  --neutral-0: #FFFFFF;
  --neutral-50: #F4F5F8;   /* Mercury White */
  --neutral-100: #E8EAEF;
  --neutral-200: #D5D8E0;
  --neutral-300: #B8BCC8;
  --neutral-400: #8E93A3;
  --neutral-500: #6B7080;
  --neutral-600: #4E525F;
  --neutral-700: #393C46;
  --neutral-800: #2D2F36;
  --neutral-900: #222326;  /* Nordic Gray */
  --neutral-950: #18191C;
}
```

### Light Mode Colors

Based on **Mercury White** (`#F4F5F8`) as the foundation.

| Token | Value | Usage |
|-------|-------|-------|
| `--light-bg-primary` | `#F4F5F8` | Page background (Mercury White) |
| `--light-bg-secondary` | `#FFFFFF` | Cards, modals, elevated surfaces |
| `--light-bg-tertiary` | `#E8EAEF` | Nested cards, sidebar |
| `--light-bg-hover` | `#E8EAEF` | Hover states on Mercury |
| `--light-bg-active` | `#D5D8E0` | Active/pressed states |
| `--light-text-primary` | `#222326` | Primary text (Nordic Gray) |
| `--light-text-secondary` | `#4E525F` | Secondary text |
| `--light-text-muted` | `#6B7080` | Muted/placeholder text |
| `--light-border` | `#D5D8E0` | Default borders |
| `--light-border-subtle` | `#E8EAEF` | Subtle dividers |

```
Light Mode Visual:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Mercury White (#F4F5F8) - Page Background                                   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ White (#FFFFFF) - Card/Elevated Surface                             │   │
│   │                                                                     │   │
│   │   Nordic Gray (#222326) - Primary Text                              │   │
│   │   Secondary (#4E525F) - Secondary Text                              │   │
│   │                                                                     │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │ Tertiary (#E8EAEF) - Nested Surface                         │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Dark Mode Colors

Based on **Nordic Gray** (`#222326`) as the foundation.

| Token | Value | Usage |
|-------|-------|-------|
| `--dark-bg-primary` | `#222326` | Page background (Nordic Gray) |
| `--dark-bg-secondary` | `#2D2F36` | Cards, elevated surfaces |
| `--dark-bg-tertiary` | `#393C46` | Nested cards, modals |
| `--dark-bg-hover` | `#2D2F36` | Hover states on Nordic |
| `--dark-bg-active` | `#393C46` | Active/pressed states |
| `--dark-bg-elevated` | `#393C46` | Highest elevation |
| `--dark-text-primary` | `#F4F5F8` | Primary text (Mercury White) |
| `--dark-text-secondary` | `#B8BCC8` | Secondary text |
| `--dark-text-muted` | `#8E93A3` | Muted/placeholder text |
| `--dark-border` | `#393C46` | Default borders |
| `--dark-border-subtle` | `#2D2F36` | Subtle dividers |
| `--dark-midnight` | `#18191C` | Deeper than Nordic for contrast |

```
Dark Mode Visual:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Nordic Gray (#222326) - Page Background                                     │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ Elevated (#2D2F36) - Card/Elevated Surface                          │   │
│   │                                                                     │   │
│   │   Mercury White (#F4F5F8) - Primary Text                            │   │
│   │   Secondary (#B8BCC8) - Secondary Text                              │   │
│   │                                                                     │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │ Tertiary (#393C46) - Nested Surface                         │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Semantic Color Mapping

```css
:root {
  /* Light mode (default) */
  --color-bg-primary: var(--light-bg-primary);
  --color-bg-secondary: var(--light-bg-secondary);
  --color-bg-tertiary: var(--light-bg-tertiary);
  --color-bg-hover: var(--light-bg-hover);
  --color-text-primary: var(--light-text-primary);
  --color-text-secondary: var(--light-text-secondary);
  --color-text-muted: var(--light-text-muted);
  --color-border: var(--light-border);
  --color-border-subtle: var(--light-border-subtle);
}

[data-theme="dark"] {
  --color-bg-primary: var(--dark-bg-primary);
  --color-bg-secondary: var(--dark-bg-secondary);
  --color-bg-tertiary: var(--dark-bg-tertiary);
  --color-bg-hover: var(--dark-bg-hover);
  --color-text-primary: var(--dark-text-primary);
  --color-text-secondary: var(--dark-text-secondary);
  --color-text-muted: var(--dark-text-muted);
  --color-border: var(--dark-border);
  --color-border-subtle: var(--dark-border-subtle);
}
```

### Contrast Ratios

All combinations meet WCAG 2.1 AA requirements.

| Combination | Light Mode | Dark Mode | Ratio |
|-------------|------------|-----------|-------|
| Primary text on background | Nordic on Mercury | Mercury on Nordic | 12.5:1 |
| Secondary text on background | #4E525F on Mercury | #B8BCC8 on Nordic | 5.8:1 |
| Muted text on background | #6B7080 on Mercury | #8E93A3 on Nordic | 4.5:1 |
| Primary text on cards | Nordic on White | Mercury on #2D2F36 | 14.2:1 / 11.8:1 |

---

### Status Colors (Shared)

Status colors remain consistent across all platforms for universal recognition.

| Status | Token | Value | Usage |
|--------|-------|-------|-------|
| **Success** | `--status-success` | `#16A34A` | Completed, verified, approved |
| **Warning** | `--status-warning` | `#CA8A04` | Attention needed, pending |
| **Error** | `--status-error` | `#DC2626` | Errors, failures, critical |
| **Info** | `--status-info` | `#2563EB` | Informational, neutral |

**Status Backgrounds**
| Status | Background | Border | Text |
|--------|------------|--------|------|
| Success | `#F0FDF4` | `#BBF7D0` | `#15803D` |
| Warning | `#FEFCE8` | `#FEF08A` | `#A16207` |
| Error | `#FEF2F2` | `#FECACA` | `#B91C1C` |
| Info | `#EFF6FF` | `#BFDBFE` | `#1D4ED8` |

**Status Gradients**
```css
--status-gradient-success: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
--status-gradient-warning: linear-gradient(135deg, #EAB308 0%, #CA8A04 100%);
--status-gradient-error: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
--status-gradient-info: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
```

---

### Healthcare-Specific Colors

These colors have specific clinical meaning and override platform colors when used.

| Purpose | Token | Value | Usage |
|---------|-------|-------|-------|
| **Allergy Alert** | `--clinical-allergy` | `#DC2626` | Allergy warnings - always visible |
| **Drug Interaction** | `--clinical-interaction` | `#EA580C` | Drug interaction warnings |
| **Controlled Substance** | `--clinical-controlled` | `#7C3AED` | DEA schedule indicators |
| **STAT/Urgent** | `--clinical-urgent` | `#DC2626` | Time-critical orders |
| **Verified** | `--clinical-verified` | `#16A34A` | Pharmacist verification complete |
| **Pending** | `--clinical-pending` | `#CA8A04` | Awaiting action |
| **Expired** | `--clinical-expired` | `#6B7280` | Past expiration dates |
| **Refrigerated** | `--clinical-cold` | `#0EA5E9` | Cold storage required |

---

### Semantic Tokens (Platform-Aware)

These tokens resolve to the current platform's colors at runtime.

```css
/* These resolve based on current platform context */
--color-primary: var(--{platform}-primary);
--color-primary-dark: var(--{platform}-primary-dark);
--color-primary-light: var(--{platform}-primary-light);
--gradient-primary: var(--{platform}-gradient-primary);
```

| Token | Resolves To | Usage |
|-------|-------------|-------|
| `--color-primary` | Platform primary (500) | Primary actions, active states |
| `--color-primary-hover` | Platform primary-dark (700) | Hover states |
| `--color-primary-active` | Platform primary-darker (900) | Active/pressed states |
| `--color-primary-bg` | Platform 50 | Light primary backgrounds |
| `--color-primary-bg-hover` | Platform 100 | Hover backgrounds |

### Implementation Example

```typescript
// theme.config.ts
const platformThemes = {
  patient: {
    primary: '#29B5E8',
    primaryDark: '#11567F',
    primaryLight: '#71D3DC',
    gradientPrimary: 'linear-gradient(135deg, #29B5E8 0%, #11567F 100%)',
  },
  doctor: {
    primary: '#DC3545',
    primaryDark: '#A71D2A',
    primaryLight: '#F5A3AA',
    gradientPrimary: 'linear-gradient(135deg, #DC3545 0%, #A71D2A 100%)',
  },
  pharmacy: {
    primary: '#7D44CF',
    primaryDark: '#5B2D9E',
    primaryLight: '#C4A8E8',
    gradientPrimary: 'linear-gradient(135deg, #7D44CF 0%, #5B2D9E 100%)',
  },
  employer: {
    primary: '#FF9F36',
    primaryDark: '#E07800',
    primaryLight: '#FFCF99',
    gradientPrimary: 'linear-gradient(135deg, #FF9F36 0%, #E07800 100%)',
  },
};

// Shared across all platforms
const sharedColors = {
  neutral: { /* ... */ },
  status: { /* ... */ },
  clinical: { /* ... */ },
  secondary: { /* ... */ },
};
```

### Tailwind Config Example

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Platform-specific (set via CSS custom properties)
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          50: 'var(--platform-50)',
          // ... etc
        },

        // Shared across platforms
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          // ... etc
        },

        // Status colors
        success: '#16A34A',
        warning: '#CA8A04',
        error: '#DC2626',
        info: '#2563EB',

        // Clinical colors
        clinical: {
          allergy: '#DC2626',
          interaction: '#EA580C',
          controlled: '#7C3AED',
          urgent: '#DC2626',
          verified: '#16A34A',
          pending: '#CA8A04',
          expired: '#6B7280',
          cold: '#0EA5E9',
        },
      },
    },
  },
};
```

---

### Color Accessibility

All color combinations must meet WCAG 2.1 AA contrast requirements.

| Combination | Minimum Ratio | Our Target |
|-------------|---------------|------------|
| Normal text on background | 4.5:1 | 4.5:1+ |
| Large text on background | 3:1 | 4.5:1+ |
| UI components | 3:1 | 3:1+ |
| Focus indicators | 3:1 | 3:1+ |

**Platform Primary Contrast Verification**

| Platform | Primary on White | White on Primary | Status |
|----------|-----------------|------------------|--------|
| Patient (#29B5E8) | 2.8:1 ⚠️ | 2.8:1 ⚠️ | Use dark variant for text |
| Doctor (#DC3545) | 4.0:1 ⚠️ | 4.0:1 ⚠️ | Use dark variant for text |
| Pharmacy (#7D44CF) | 4.6:1 ✓ | 4.6:1 ✓ | Passes |
| Employer (#FF9F36) | 2.1:1 ⚠️ | 2.1:1 ⚠️ | Use dark variant for text |

> **Important**: For text using primary colors with insufficient contrast, always use the `-dark` or `-700` variant instead of the base primary.

---

## Typography

### Primary Font: Inter

Inter is our primary typeface across all platforms. Designed by Rasmus Andersson specifically for computer screens, it offers excellent legibility at small sizes—critical for dense pharmacy data.

| Property | Value |
|----------|-------|
| **Font Family** | Inter |
| **Type** | Variable font |
| **Weights** | 100–900 (Thin to Black) |
| **Styles** | Normal, Italic |
| **Features** | Optical sizing, tabular numbers, slashed zero |
| **License** | SIL Open Font License |
| **Source** | [Google Fonts](https://fonts.google.com/specimen/Inter) |

### Why Inter for Healthcare

| Requirement | How Inter Delivers |
|-------------|-------------------|
| **Legibility at small sizes** | Designed for 11px+, tall x-height |
| **Number-heavy interfaces** | Tabular figures align in columns |
| **Distinguishable characters** | Clear distinction: 0/O, 1/l/I |
| **Long reading sessions** | Optimized for screen fatigue reduction |
| **Professional appearance** | Clean, neutral, trustworthy |

---

### Font Loading

#### Google Fonts (Recommended)

```html
<!-- In <head> - Preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load Inter with required weights -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- For variable font (full weight range) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

#### Self-Hosted (Better Performance)

```bash
# Download from Google Fonts or fontsource
npm install @fontsource-variable/inter
```

```typescript
// In your app entry point
import '@fontsource-variable/inter';
```

#### CSS @font-face (Variable Font)

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-feature-settings: 'cv01', 'cv02', 'cv03', 'cv04';
}

@font-face {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/Inter-Variable-Italic.woff2') format('woff2');
}
```

---

### Font Stack

```css
:root {
  /* Primary: Inter with system fallbacks */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               'Helvetica Neue', Arial, sans-serif;

  /* Monospace: For clinical data (NDC, Rx#, quantities) */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas,
               'Liberation Mono', Menlo, monospace;
}
```

### Font Feature Settings

Inter includes OpenType features critical for healthcare data display.

```css
:root {
  /* Enable useful Inter features globally */
  --font-features:
    'cv01',  /* Alternate 1 (distinguishable from l) */
    'cv02',  /* Alternate 4 (open top) */
    'cv03',  /* Alternate 6 (straight stem) */
    'cv04',  /* Alternate 9 (straight stem) */
    'zero',  /* Slashed zero (distinguishable from O) */
    'ss01';  /* Open digits */
}

body {
  font-family: var(--font-sans);
  font-feature-settings: var(--font-features);
}
```

#### Tabular Numbers

**Critical for pharmacy data**: Quantities, prices, and measurements must align in columns.

```css
/* Apply to data tables, numeric inputs, quantities */
.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
}
```

| Without Tabular | With Tabular |
|-----------------|--------------|
| 1,234.56 | 1,234.56 |
| 789.00 | 789.00 |
| 12.99 | 12.99 |
| (Numbers don't align) | (Numbers align perfectly) |

#### Slashed Zero

Distinguishes zero from letter O—essential for NDC codes and lot numbers.

```css
.slashed-zero {
  font-feature-settings: 'zero';
}
```

| Standard | Slashed Zero |
|----------|--------------|
| O0O0 | O0̸O0̸ |
| (Ambiguous) | (Clear distinction) |

---

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | 12px | 16px (1.33) | 400 | Captions, metadata, timestamps |
| `--text-sm` | 14px | 20px (1.43) | 400 | Secondary text, labels, table cells |
| `--text-base` | 16px | 24px (1.5) | 400 | Body text, paragraphs |
| `--text-lg` | 18px | 28px (1.56) | 500 | Emphasized body, lead text |
| `--text-xl` | 20px | 28px (1.4) | 600 | Card headings, section titles |
| `--text-2xl` | 24px | 32px (1.33) | 600 | Section headings |
| `--text-3xl` | 30px | 36px (1.2) | 700 | Page headings |
| `--text-4xl` | 36px | 40px (1.11) | 700 | Display headings |
| `--text-5xl` | 48px | 48px (1.0) | 700 | Hero headings (rare) |

#### CSS Custom Properties

```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

---

### Font Weights

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| `--font-thin` | 100 | `font-weight: 100` | Decorative only (avoid in UI) |
| `--font-light` | 300 | `font-weight: 300` | Large display text |
| `--font-normal` | 400 | `font-weight: 400` | Body text, paragraphs |
| `--font-medium` | 500 | `font-weight: 500` | Labels, emphasized text, buttons |
| `--font-semibold` | 600 | `font-weight: 600` | Subheadings, important labels |
| `--font-bold` | 700 | `font-weight: 700` | Headings, strong emphasis |
| `--font-extrabold` | 800 | `font-weight: 800` | Display headings (rare) |

#### Healthcare Weight Guidelines

| Context | Recommended Weight | Why |
|---------|-------------------|-----|
| Patient name | 600 (semibold) | Easy identification |
| Allergy warnings | 700 (bold) | Maximum attention |
| Drug names | 500 (medium) | Distinguishable from description |
| Quantities | 400 (normal) + tabular | Clear, aligned |
| Labels | 500 (medium) | Hierarchy over body |
| Body text | 400 (normal) | Comfortable reading |

---

### Typography Rules

| Rule | Specification | Rationale |
|------|---------------|-----------|
| Minimum body size | 14px | Accessibility, reduced eye strain |
| Minimum caption size | 12px | Never go smaller |
| Maximum line length | 65-75 characters | Optimal reading comfort |
| Paragraph spacing | 1em (1x font size) | Clear separation |
| Heading margin-top | 1.5em | Visual breathing room |
| Heading margin-bottom | 0.5em | Connect to content |
| Letter spacing (headings) | -0.02em | Tighter at large sizes |
| Letter spacing (small text) | 0.01em | Slightly open at small sizes |

### Line Length Guidelines

```css
/* Optimal reading width */
.prose {
  max-width: 65ch; /* ~65 characters */
}

/* Data-dense layouts can be wider */
.data-table {
  max-width: 100%; /* Full width for tables */
}

/* Forms should be narrower */
.form-container {
  max-width: 480px;
}
```

---

### Monospace Usage

Use monospace font (`--font-mono`) for clinical identifiers and data that must be precisely readable.

| Data Type | Example | Why Monospace |
|-----------|---------|---------------|
| NDC numbers | `12345-6789-01` | Digit alignment, zero distinction |
| Lot numbers | `ABC123456` | Character clarity |
| Prescription IDs | `RX-2024-00001234` | Easy comparison |
| Quantities | `120 capsules` | Numeric alignment |
| DEA numbers | `AB1234567` | Critical accuracy |
| NPI numbers | `1234567890` | Must not be misread |
| Timestamps | `2024-01-15 14:32:45` | Alignment in logs |

```css
.clinical-id {
  font-family: var(--font-mono);
  font-feature-settings: 'zero', 'tnum'; /* Slashed zero, tabular nums */
  letter-spacing: 0.05em; /* Slightly open for clarity */
}
```

**Display Examples:**
```
NDC:     12345-6789-01
Lot:     ABC123456
Rx#:     RX-2024-00001234
Qty:     120 capsules
DEA:     AB1234567
Expires: 2025-06-30
```

---

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
};
```

### Global CSS Setup

```css
/* Base typography setup */
html {
  font-size: 16px; /* 1rem = 16px */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--color-text-primary);
  font-feature-settings: 'cv01', 'cv02', 'cv03', 'cv04';
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-bold);
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

/* Clinical data */
.clinical-id,
.ndc,
.lot-number,
.rx-id,
.dea-number {
  font-family: var(--font-mono);
  font-feature-settings: 'zero', 'tnum';
}

/* Quantities and measurements */
.quantity,
.measurement,
.price {
  font-variant-numeric: tabular-nums;
}
```

---

## Spacing & Sizing

> Inspired by Uber's Base Design System—a logic-driven spacing system that removes guesswork.

### The 4dp Grid System

Every spacing value is a multiple of 4 density-independent pixels (4dp). This creates visual harmony and ensures elements "snap" into a consistent structure across all platforms.

```
┌─────────────────────────────────────────────────────────────────┐
│                        THE 4DP PRINCIPLE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Base Unit = 4px                                               │
│                                                                 │
│   4 → 8 → 12 → 16 → 20 → 24 → 32 → 40 → 48 → 64 → 80 → 96     │
│   ↑                                                             │
│   Every value divisible by 4                                    │
│                                                                 │
│   Why? Human visual perception naturally groups in 4s.          │
│   Elements feel "right" without designers knowing why.          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Why This Works

| Problem | 4dp Solution |
|---------|--------------|
| "How much padding should this have?" | Choose from the scale: 8, 12, 16, 24 |
| "This gap feels too big/small" | Move one step up or down |
| Inconsistent spacing across screens | Same scale everywhere, same visual rhythm |
| Designer-developer handoff friction | Developers know the only valid values |
| "Make it a bit more spacious" | Increase by one scale step (e.g., 16 → 24) |

---

### Spacing Scale

| Token | Value | Tailwind | Multiplier | Category |
|-------|-------|----------|------------|----------|
| `--space-0` | 0px | `0` | 0× | None |
| `--space-1` | 4px | `1` | 1× | Micro |
| `--space-2` | 8px | `2` | 2× | Micro |
| `--space-3` | 12px | `3` | 3× | Component |
| `--space-4` | 16px | `4` | 4× | Component |
| `--space-5` | 20px | `5` | 5× | Component |
| `--space-6` | 24px | `6` | 6× | Component |
| `--space-8` | 32px | `8` | 8× | Layout |
| `--space-10` | 40px | `10` | 10× | Layout |
| `--space-12` | 48px | `12` | 12× | Layout |
| `--space-16` | 64px | `16` | 16× | Section |
| `--space-20` | 80px | `20` | 20× | Section |
| `--space-24` | 96px | `24` | 24× | Page |

### Spacing Categories

```
┌────────────────────────────────────────────────────────────────┐
│ MICRO (4-8px)           │ Tight relationships               │
│ Icon to label, text gap │ Elements that "belong together"   │
├────────────────────────────────────────────────────────────────┤
│ COMPONENT (12-24px)     │ Internal component spacing        │
│ Padding, field gaps     │ Breathing room within elements    │
├────────────────────────────────────────────────────────────────┤
│ LAYOUT (32-48px)        │ Between components                │
│ Card gaps, form groups  │ Visual grouping of related items  │
├────────────────────────────────────────────────────────────────┤
│ SECTION (64-96px)       │ Major content divisions           │
│ Page sections           │ Clear content hierarchy           │
└────────────────────────────────────────────────────────────────┘
```

---

### Spacing by Context

#### Micro Spacing (4-8px)

For tightly related elements that form a single visual unit.

| Use Case | Value | Example |
|----------|-------|---------|
| Icon to text | 4px | `[icon]·Label` |
| Inline elements | 4px | `Status·•·Time` |
| Stacked text | 4px | Line between title and subtitle |
| Badge to text | 4px | `Name·[badge]` |
| Checkbox to label | 8px | `[✓]··Option text` |
| Radio to label | 8px | `(•)··Option text` |
| Button icon gap | 8px | `[+]··Add Item` |

```css
.icon-label {
  display: flex;
  align-items: center;
  gap: var(--space-1); /* 4px */
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: var(--space-2); /* 8px */
}
```

#### Component Spacing (12-24px)

Internal spacing within components—padding and gaps between child elements.

| Use Case | Value | Example |
|----------|-------|---------|
| Input padding (x) | 12px | Text inset from edges |
| Form field vertical gap | 16px | Space between label+input groups |
| Button padding (x) | 16px | Horizontal breathing room |
| Card padding | 16-24px | Content inset from card edges |
| Modal padding | 24px | Dialog content inset |
| List item padding (y) | 12px | Vertical rhythm in lists |
| Table cell padding | 12-16px | Data breathing room |

```css
.card {
  padding: var(--space-5); /* 20px - comfortable */
}

.card-compact {
  padding: var(--space-4); /* 16px - data-dense */
}

.form-field {
  margin-bottom: var(--space-4); /* 16px between fields */
}
```

#### Layout Spacing (32-48px)

Gaps between distinct components or groups of components.

| Use Case | Value | Example |
|----------|-------|---------|
| Between form sections | 32px | Personal Info ↔ Contact Info |
| Card grid gap | 24-32px | Space between cards |
| Sidebar to content | 32px | Navigation ↔ Main content |
| Action bar to content | 24px | Buttons ↔ Form below |
| Related card groups | 24px | Cards that belong together |
| Unrelated components | 32-48px | Distinct UI regions |

```css
.card-grid {
  display: grid;
  gap: var(--space-6); /* 24px */
}

.form-section + .form-section {
  margin-top: var(--space-8); /* 32px */
}

.page-layout {
  display: grid;
  grid-template-columns: 256px 1fr;
  gap: var(--space-8); /* 32px */
}
```

#### Section Spacing (64-96px)

Major page divisions—creates clear hierarchy and visual rest.

| Use Case | Value | Example |
|----------|-------|---------|
| Page sections | 64px | Dashboard sections |
| Above page title | 48px | Top of content area |
| Below page title | 32px | Title to first content |
| Footer separation | 64-96px | Content ↔ Footer |
| Hero to content | 80px | Feature area ↔ Main content |

```css
.page-section + .page-section {
  margin-top: var(--space-16); /* 64px */
}

.page-header {
  padding-top: var(--space-12);    /* 48px */
  padding-bottom: var(--space-8); /* 32px */
}
```

---

### Component Sizing

All component heights snap to the 4dp grid, creating vertical rhythm.

| Component | Small | Medium | Large | Rationale |
|-----------|-------|--------|-------|-----------|
| **Button** | 32px | 40px | 48px | Touch targets, hierarchy |
| **Input** | 32px | 40px | 48px | Match button heights |
| **Select** | 32px | 40px | 48px | Match input heights |
| **Textarea** | 80px+ | 120px+ | 160px+ | Minimum comfortable |
| **Badge** | 20px | 24px | 28px | Inline with text |
| **Chip** | 28px | 32px | 36px | Removable, interactive |
| **Avatar** | 32px | 40px | 64px | Recognition at size |
| **Icon Button** | 32px | 40px | 48px | Square, touch-friendly |

#### Button Anatomy (Medium - 40px)

```
┌─────────────────────────────────────────┐
│         ↑ 8px padding-y                 │
│  ← 16px │ [icon] Label Text │ 16px →   │  Height: 40px
│         ↓ 8px padding-y                 │
└─────────────────────────────────────────┘
         └── 8px gap ──┘
```

#### Input Anatomy (Medium - 40px)

```
┌─────────────────────────────────────────┐
│         ↑ 8px padding-y                 │
│  ← 12px │ Placeholder text    │ 12px → │  Height: 40px
│         ↓ 8px padding-y                 │
└─────────────────────────────────────────┘
```

### Component Padding Matrix

| Component | Padding X | Padding Y | Height | Gap (internal) |
|-----------|-----------|-----------|--------|----------------|
| Button (sm) | 12px | 6px | 32px | 8px |
| Button (md) | 16px | 8px | 40px | 8px |
| Button (lg) | 24px | 12px | 48px | 8px |
| Input (sm) | 12px | 6px | 32px | — |
| Input (md) | 12px | 8px | 40px | — |
| Input (lg) | 16px | 12px | 48px | — |
| Card (compact) | 16px | 16px | auto | 12px |
| Card (default) | 20px | 20px | auto | 16px |
| Card (spacious) | 24px | 24px | auto | 20px |
| Modal | 24px | 24px | auto | 16px |
| Table cell | 16px | 12px | 48px | — |

---

### Touch Targets

Critical for pharmacy staff using tablets and touch screens.

| Context | Minimum Size | Recommended | Rationale |
|---------|--------------|-------------|-----------|
| Primary actions | 44×44px | 48×48px | Easy tap, no mis-taps |
| Secondary actions | 32×32px | 40×40px | Still accessible |
| Dense data UI | 32×32px | 32×32px | Trained users, mouse |
| Mobile/tablet | 48×48px | 48×48px | Thumb-friendly |

```css
/* Ensure minimum touch target */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

### Container Widths

| Token | Value | Columns (12-col) | Usage |
|-------|-------|------------------|-------|
| `--container-xs` | 480px | — | Dialogs, narrow forms |
| `--container-sm` | 640px | — | Forms, focused content |
| `--container-md` | 768px | — | Standard content |
| `--container-lg` | 1024px | 12 | Wide content |
| `--container-xl` | 1280px | 12 | Full-width layouts |
| `--container-2xl` | 1536px | 12 | Maximum width |

### Grid System

```css
:root {
  --grid-columns: 12;
  --grid-gutter: 24px; /* var(--space-6) */
  --grid-margin: 16px; /* var(--space-4) - mobile */
  --grid-margin-lg: 32px; /* var(--space-8) - desktop */
}
```

| Breakpoint | Container | Gutter | Margin |
|------------|-----------|--------|--------|
| < 640px | 100% | 16px | 16px |
| 640-1024px | 100% | 24px | 24px |
| 1024-1280px | 1024px | 24px | auto |
| > 1280px | 1280px | 32px | auto |

---

### Healthcare-Specific Spacing

Pharmacy interfaces are data-dense. Apply spacing strategically.

| Context | Approach | Why |
|---------|----------|-----|
| **Prescription lists** | Compact (12px gaps) | Scan many items quickly |
| **Patient header** | Standard (16-20px) | Clear, always visible |
| **Verification screens** | Spacious (24px gaps) | Reduce errors, careful review |
| **Drug interaction alerts** | Extra padding (24px) | Draw attention, not cramped |
| **Data tables** | Compact cells (12px) | Maximum data visibility |
| **Forms** | Standard (16px field gaps) | Comfortable data entry |
| **Dashboards** | Layout spacing (24-32px) | Clear widget separation |

#### Prescription Card Example

```
┌─────────────────────────────────────────────────────────────┐
│ ← 16px                                              16px → │
│        ┌────────────────────────────────────────┐          │
│   ↑    │ Rx#: RX-2024-00001234                  │    ↑     │
│  16px  │ ← 4px gap                              │   12px   │
│        │ Patient: John Smith                     │          │
│        │ ← 4px gap                              │          │
│        │ Drug: Progesterone 100mg               │          │
│        └────────────────────────────────────────┘          │
│        ← 12px gap ─────────────────────────────→          │
│        ┌────────────────────────────────────────┐          │
│        │ Status: [Pending]  Qty: 120            │          │
│        └────────────────────────────────────────┘          │
│   ↓                                                  ↓     │
│  16px                                              16px    │
└─────────────────────────────────────────────────────────────┘

Card padding: 16px (--space-4)
Internal text gap: 4px (--space-1)
Section gap: 12px (--space-3)
```

---

### CSS Custom Properties

```css
:root {
  /* Spacing Scale */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Semantic Spacing */
  --spacing-micro: var(--space-1);      /* 4px */
  --spacing-tight: var(--space-2);      /* 8px */
  --spacing-component: var(--space-4);  /* 16px */
  --spacing-comfortable: var(--space-6); /* 24px */
  --spacing-layout: var(--space-8);     /* 32px */
  --spacing-section: var(--space-16);   /* 64px */

  /* Component-Specific */
  --card-padding: var(--space-5);       /* 20px */
  --modal-padding: var(--space-6);      /* 24px */
  --form-gap: var(--space-4);           /* 16px */
  --table-cell-padding: var(--space-3); /* 12px */
  --button-gap: var(--space-2);         /* 8px */
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
      10: '40px',
      12: '48px',
      16: '64px',
      20: '80px',
      24: '96px',
    },
    extend: {
      gap: {
        'micro': '4px',
        'tight': '8px',
        'component': '16px',
        'layout': '32px',
        'section': '64px',
      },
    },
  },
};
```

### Spacing Decision Tree

```
Need spacing between elements?
│
├─ Are they part of the SAME component?
│   │
│   ├─ Tightly related (icon + label)? → 4px
│   ├─ Related (form field parts)? → 8px
│   └─ Internal sections? → 12-16px
│
├─ Are they SIBLING components?
│   │
│   ├─ Same type (card grid)? → 24px
│   ├─ Same group (form sections)? → 32px
│   └─ Different concerns? → 32-48px
│
└─ Are they different PAGE SECTIONS?
    │
    └─ Major divisions → 64px+
```

---

## Border & Shadow

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0px | No rounding |
| `--radius-sm` | 4px | Subtle rounding (inputs, badges) |
| `--radius-md` | 6px | Standard rounding (buttons) |
| `--radius-lg` | 8px | Cards, modals |
| `--radius-xl` | 12px | Large cards, panels |
| `--radius-2xl` | 16px | Feature cards |
| `--radius-full` | 9999px | Pills, avatars |

### Border Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--border-0` | 0px | No border |
| `--border-1` | 1px | Default borders |
| `--border-2` | 2px | Emphasized borders, focus rings |
| `--border-4` | 4px | Heavy emphasis |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, popovers |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Dialogs |
| `--shadow-inner` | `inset 0 2px 4px rgba(0,0,0,0.05)` | Inset elements |
| `--shadow-focus` | `0 0 0 3px rgba(59,130,246,0.5)` | Focus rings |

---

## Iconography

Icons are critical in healthcare interfaces—they aid quick recognition, reduce cognitive load, and communicate status at a glance. Our icon system prioritizes clarity, consistency, and clinical accuracy.

### Icon Library

| Specification | Value | Rationale |
|---------------|-------|-----------|
| **Primary Library** | [Lucide Icons](https://lucide.dev) | MIT license, consistent style, active development |
| **Fallback** | [Heroicons](https://heroicons.com) | For any gaps in Lucide |
| **Custom Icons** | Healthcare-specific | When no standard icon exists |
| **Style** | Outlined (stroke) | Professional, clinical feel |
| **Stroke Width** | 1.5px (default) | Balanced visibility |
| **Corner Style** | Rounded | Softer, approachable |

#### Why Lucide?

| Requirement | How Lucide Delivers |
|-------------|---------------------|
| Consistency | Single designer, unified style |
| Healthcare coverage | Medical icons included |
| Accessibility | Clean, recognizable shapes |
| React support | First-class `lucide-react` package |
| Customizable | Stroke width, size, color as props |
| Tree-shakable | Only import what you use |

```bash
npm install lucide-react
```

```typescript
import { Pill, AlertTriangle, CheckCircle } from 'lucide-react';

const PrescriptionStatus = () => (
  <CheckCircle size={20} strokeWidth={1.5} className="text-green-600" />
);
```

---

### Icon Sizing

All icon sizes snap to the 4dp grid for visual harmony.

| Token | Size | Stroke | Usage |
|-------|------|--------|-------|
| `--icon-xs` | 12px | 1.5px | Badges, tight spaces |
| `--icon-sm` | 16px | 1.5px | Inline with small text, table cells |
| `--icon-md` | 20px | 1.5px | **Default** - buttons, inputs, labels |
| `--icon-lg` | 24px | 1.5px | Standalone, navigation, card headers |
| `--icon-xl` | 32px | 2px | Feature icons, section headers |
| `--icon-2xl` | 48px | 2px | Empty states, onboarding |
| `--icon-3xl` | 64px | 2px | Hero illustrations, marketing |

#### Size-to-Text Pairing

| Text Size | Icon Size | Example |
|-----------|-----------|---------|
| 12px (xs) | 12-14px | Metadata, captions |
| 14px (sm) | 16px | Labels, table headers |
| 16px (base) | 20px | Body text, buttons |
| 18px (lg) | 20-24px | Emphasized text |
| 20px+ (xl) | 24px | Headings |

```
Text size × 1.25 ≈ Icon size (rough guide)
```

#### Visual Alignment

```
┌─────────────────────────────────────────┐
│                                         │
│  [icon]  Label Text                     │  Icon vertically centered
│   20px    gap: 8px                      │  with text baseline
│                                         │
└─────────────────────────────────────────┘
```

```css
.icon-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2); /* 8px */
}

.icon-label svg {
  flex-shrink: 0; /* Prevent icon squishing */
}
```

---

### Stroke Width

Stroke width affects visual weight and readability.

| Size Range | Stroke Width | Rationale |
|------------|--------------|-----------|
| 12-24px | 1.5px | Standard - balanced visibility |
| 32-48px | 2px | Thicker for larger sizes |
| 64px+ | 2-2.5px | Maintain visual weight |

```typescript
const getStrokeWidth = (size: number): number => {
  if (size >= 64) return 2.5;
  if (size >= 32) return 2;
  return 1.5;
};
```

---

### Icon States

#### Interactive Icons

| State | Color | Opacity | Cursor |
|-------|-------|---------|--------|
| Default | `gray-500` | 100% | pointer |
| Hover | `gray-700` | 100% | pointer |
| Active | `gray-800` | 100% | pointer |
| Focus | `gray-700` + focus ring | 100% | pointer |
| Disabled | `gray-300` | 50% | not-allowed |

```css
.icon-button {
  color: var(--color-gray-500);
  transition: color 150ms ease;
}

.icon-button:hover {
  color: var(--color-gray-700);
}

.icon-button:disabled {
  color: var(--color-gray-300);
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Decorative vs. Informational

| Type | Purpose | Accessibility |
|------|---------|---------------|
| **Decorative** | Visual enhancement only | `aria-hidden="true"` |
| **Informational** | Conveys meaning | `aria-label` or visible text |
| **Interactive** | Triggers action | Button wrapper + label |

```typescript
// Decorative - hidden from screen readers
<User size={20} aria-hidden="true" />

// Informational - needs label
<AlertTriangle size={20} aria-label="Warning" />

// Interactive - use button
<button aria-label="Close dialog">
  <X size={20} aria-hidden="true" />
</button>
```

---

### Icon Color System

#### By Context

| Context | Default | Hover | Active | Token |
|---------|---------|-------|--------|-------|
| **Primary Action** | `primary-600` | `primary-700` | `primary-800` | `--icon-primary` |
| **Secondary** | `gray-500` | `gray-700` | `gray-800` | `--icon-secondary` |
| **Muted** | `gray-400` | `gray-500` | `gray-600` | `--icon-muted` |
| **Inverse** | `white` | `gray-100` | `gray-200` | `--icon-inverse` |

#### By Status

| Status | Icon Color | Background | Usage |
|--------|------------|------------|-------|
| **Success** | `green-600` | `green-50` | Completed, verified |
| **Warning** | `yellow-600` | `yellow-50` | Attention needed |
| **Error** | `red-600` | `red-50` | Failed, critical |
| **Info** | `blue-600` | `blue-50` | Informational |

#### Healthcare-Critical Colors

| Meaning | Color | Icon Examples | Notes |
|---------|-------|---------------|-------|
| **Allergy** | `red-600` | AlertTriangle, AlertOctagon | NEVER use red decoratively |
| **Interaction** | `orange-600` | AlertTriangle | Drug-drug warnings |
| **Controlled** | `purple-600` | Shield | DEA schedule |
| **Verified** | `green-600` | CheckCircle, BadgeCheck | Pharmacist sign-off |
| **Urgent** | `red-600` | Clock, Zap | STAT orders |
| **Cold Chain** | `blue-500` | Snowflake, Thermometer | Refrigeration |

---

### Healthcare Icon Vocabulary

#### Core Clinical Icons

| Icon | Lucide Name | Usage | Context |
|------|-------------|-------|---------|
| 💊 | `Pill` | Medication, prescription | Primary Rx indicator |
| 🧪 | `Beaker` / `FlaskConical` | Compound, formulation | Compounding workflows |
| ⚖️ | `Scale` | Weighing, measurement | Quantity calculations |
| 💉 | `Syringe` | Injection, vaccine | Injectable medications |
| 🩺 | `Stethoscope` | Prescriber, clinician | Doctor information |
| 🏥 | `Building2` | Pharmacy, facility | Location context |
| 📋 | `ClipboardList` | Prescription list | Order management |
| 📄 | `FileText` | Prescription document | Individual Rx |

#### Status & Workflow Icons

| Icon | Lucide Name | Usage | Color |
|------|-------------|-------|-------|
| ✓ | `Check` | Completed step | Green |
| ✓○ | `CheckCircle` | Verified, approved | Green |
| ✗○ | `XCircle` | Rejected, failed | Red |
| ⚠ | `AlertTriangle` | Warning, caution | Yellow/Orange/Red |
| 🛑 | `AlertOctagon` | Critical stop | Red |
| ⏱ | `Clock` | Pending, timing | Yellow |
| ⏸ | `Pause` | On hold | Orange |
| ↻ | `RefreshCw` | In progress | Blue |
| 📦 | `Package` | Dispensed, shipped | Gray |
| 👁 | `Eye` | Ready for review | Purple |

#### Patient & People Icons

| Icon | Lucide Name | Usage |
|------|-------------|-------|
| 👤 | `User` | Single patient |
| 👥 | `Users` | Multiple patients, family |
| 🆔 | `BadgeCheck` | Verified identity |
| 📇 | `Contact` | Contact information |
| 🏠 | `Home` | Home address, delivery |
| 📱 | `Phone` | Phone number |

#### Safety & Compliance Icons

| Icon | Lucide Name | Usage | Severity |
|------|-------------|-------|----------|
| 🛡 | `Shield` | Controlled substance | DEA schedule |
| 🔒 | `Lock` | Secure, restricted | Access control |
| ⚠ | `AlertTriangle` | Allergy warning | Critical |
| ⛔ | `Ban` | Contraindicated | Critical |
| 🌡 | `Thermometer` | Temperature-sensitive | Storage |
| ❄ | `Snowflake` | Refrigerated | Cold chain |
| ☢ | `Radiation` | Hazardous | Safety |

#### Action Icons

| Icon | Lucide Name | Usage |
|------|-------------|-------|
| ➕ | `Plus` | Add new |
| ✏️ | `Pencil` | Edit |
| 🗑 | `Trash2` | Delete |
| 📋 | `Copy` | Duplicate |
| 🔍 | `Search` | Search |
| 📥 | `Download` | Export |
| 🖨 | `Printer` | Print |
| 📤 | `Send` | Submit, transmit |

---

### Icon Pairing Guidelines

#### Icon + Text

```
Standard pairing:
┌─────────────────────────────────┐
│ [icon] Label Text               │
│  20px   8px gap   14-16px text  │
└─────────────────────────────────┘

Icon BEFORE text for:
- Actions (Add Patient, Save)
- Navigation (← Back, Home)
- Status (✓ Verified, ⚠ Warning)

Icon AFTER text for:
- External links (Documentation ↗)
- Expandable items (Details ▼)
- Sorting (Name ↕)
```

#### Icon-Only Buttons

Icon-only buttons MUST have accessible labels:

```typescript
// Correct - has accessible label
<button aria-label="Delete prescription">
  <Trash2 size={20} aria-hidden="true" />
</button>

// Correct - tooltip provides context
<Tooltip content="Delete prescription">
  <button aria-label="Delete prescription">
    <Trash2 size={20} aria-hidden="true" />
  </button>
</Tooltip>

// WRONG - no accessible label
<button>
  <Trash2 size={20} />
</button>
```

#### Icon in Buttons

```
Text button with icon:
┌─────────────────────────────────┐
│  ← 16px  [+] Add Patient  16px →│
│          └8px┘                  │
└─────────────────────────────────┘

Icon-only button:
┌───────────┐
│    [×]    │  Minimum 44×44px touch target
│   20px    │  Icon centered
└───────────┘
```

---

### Custom Healthcare Icons

When Lucide doesn't have what you need, create custom icons following these rules:

#### Grid & Sizing

```
┌────────────────────────────────┐
│  ┌──────────────────────────┐  │
│  │                          │  │  24×24px canvas
│  │       Icon content       │  │  2px padding (live area: 20×20)
│  │       within 20×20       │  │  Stroke: 1.5px
│  │                          │  │  Corners: 1px radius minimum
│  └──────────────────────────┘  │
│  2px padding                   │
└────────────────────────────────┘
```

#### Style Rules

| Property | Value | Notes |
|----------|-------|-------|
| Canvas | 24×24px | Standard Lucide size |
| Live area | 20×20px | 2px padding |
| Stroke width | 1.5px | Match Lucide |
| Stroke cap | Round | Consistent line endings |
| Stroke join | Round | Smooth corners |
| Corner radius | ≥1px | No sharp corners |
| Fill | None (outlined only) | Match system style |

#### Custom Icon Examples

```typescript
// Custom compound icon (mortar and pestle)
const CompoundIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Mortar bowl */}
    <path d="M5 12c0 4 3 7 7 7s7-3 7-7" />
    {/* Pestle */}
    <path d="M12 5v7M9 5h6" />
    {/* Base */}
    <path d="M8 19h8" />
  </svg>
);
```

---

### Icon Accessibility

#### Requirements

| Requirement | Implementation |
|-------------|----------------|
| Decorative icons | `aria-hidden="true"` |
| Meaningful icons | `aria-label` describing meaning |
| Interactive icons | Wrapped in `<button>` with label |
| Status icons | Paired with visible text |
| Color alone | Never sole indicator—add text or shape |

#### Screen Reader Examples

```typescript
// Status with redundant text (best for healthcare)
<span className="status-badge">
  <CheckCircle aria-hidden="true" className="text-green-600" />
  <span>Verified</span>
</span>

// Allergy warning - critical, needs multiple signals
<div role="alert" className="allergy-warning">
  <AlertTriangle aria-hidden="true" className="text-red-600" />
  <span className="font-bold text-red-700">
    ALLERGY: Penicillin
  </span>
</div>
```

#### Color Independence

Icons must not rely on color alone to convey meaning:

| Bad | Good |
|-----|------|
| Red circle = error | Red ✗ + "Error" text |
| Green dot = success | Green ✓ + "Verified" text |
| Yellow icon = warning | Yellow ⚠ + "Warning" text |

---

### Implementation

#### CSS Custom Properties

```css
:root {
  /* Icon sizes */
  --icon-xs: 12px;
  --icon-sm: 16px;
  --icon-md: 20px;
  --icon-lg: 24px;
  --icon-xl: 32px;
  --icon-2xl: 48px;

  /* Icon colors */
  --icon-primary: var(--color-gray-700);
  --icon-secondary: var(--color-gray-500);
  --icon-muted: var(--color-gray-400);
  --icon-inverse: var(--color-white);

  /* Icon spacing */
  --icon-gap: var(--space-2); /* 8px */
}
```

#### React Component Pattern

```typescript
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error';
  label?: string; // For accessibility
}

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

const colorMap = {
  primary: 'text-gray-700',
  secondary: 'text-gray-500',
  muted: 'text-gray-400',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
};

const Icon = ({
  icon: IconComponent,
  size = 'md',
  color = 'secondary',
  label
}: IconProps) => (
  <IconComponent
    size={sizeMap[size]}
    strokeWidth={size === 'xl' || size === '2xl' ? 2 : 1.5}
    className={colorMap[color]}
    aria-hidden={!label}
    aria-label={label}
  />
);
```

#### Tailwind Utilities

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      width: {
        'icon-xs': '12px',
        'icon-sm': '16px',
        'icon-md': '20px',
        'icon-lg': '24px',
        'icon-xl': '32px',
        'icon-2xl': '48px',
      },
      height: {
        'icon-xs': '12px',
        'icon-sm': '16px',
        'icon-md': '20px',
        'icon-lg': '24px',
        'icon-xl': '32px',
        'icon-2xl': '48px',
      },
    },
  },
};
```

---

### Icon Checklist

```markdown
## Before Using an Icon

### Selection
- [ ] Icon meaning is universally understood (not ambiguous)
- [ ] Matches Lucide style (outlined, 1.5px stroke, rounded)
- [ ] Consistent with existing usage in the app
- [ ] Not overloaded (same icon for different meanings)

### Sizing
- [ ] Size matches adjacent text (see pairing guide)
- [ ] Snaps to 4dp grid (12, 16, 20, 24, 32, 48)
- [ ] Stroke width appropriate for size

### Accessibility
- [ ] Decorative icons have aria-hidden="true"
- [ ] Meaningful icons have aria-label
- [ ] Interactive icons wrapped in button with label
- [ ] Color is not the only indicator
- [ ] Paired with text for critical information

### Healthcare-Specific
- [ ] Clinical icons used correctly (not decoratively)
- [ ] Safety icons (allergy, interaction) are prominent
- [ ] Status icons match established conventions
- [ ] No ambiguity in critical contexts
```

---

## Component Specifications

This section defines the visual and behavioral specifications for all UI components. Each component follows the 4dp grid, uses design tokens, and supports all required states.

---

### Buttons

Buttons are the primary interactive elements for triggering actions.

#### Variants

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| **Primary** | `primary-600` | `white` | none | Main page action (1 per view) |
| **Secondary** | `white` | `gray-700` | `gray-300` | Supporting actions |
| **Tertiary** | `transparent` | `primary-600` | none | Low-emphasis, inline actions |
| **Danger** | `red-600` | `white` | none | Destructive actions |
| **Danger Secondary** | `white` | `red-600` | `red-300` | Less prominent destructive |
| **Ghost** | `transparent` | `gray-600` | none | Toolbar, icon buttons |

#### Sizes

| Size | Height | Padding X | Padding Y | Font Size | Icon Size | Border Radius |
|------|--------|-----------|-----------|-----------|-----------|---------------|
| `xs` | 28px | 10px | 4px | 12px | 14px | 4px |
| `sm` | 32px | 12px | 6px | 14px | 16px | 4px |
| `md` | 40px | 16px | 8px | 14px | 20px | 6px |
| `lg` | 48px | 24px | 12px | 16px | 20px | 6px |
| `xl` | 56px | 32px | 16px | 18px | 24px | 8px |

#### States

| State | Primary | Secondary | Tertiary | Danger |
|-------|---------|-----------|----------|--------|
| **Default** | `primary-600` | `white` | `transparent` | `red-600` |
| **Hover** | `primary-700` | `gray-50` | `primary-50` | `red-700` |
| **Active** | `primary-800` | `gray-100` | `primary-100` | `red-800` |
| **Focus** | + focus ring | + focus ring | + focus ring | + focus ring |
| **Disabled** | 50% opacity | 50% opacity | 50% opacity | 50% opacity |
| **Loading** | spinner + text | spinner + text | spinner | spinner + text |

#### Button Anatomy

```
┌───────────────────────────────────────────────────────┐
│     ↑ padding-y                                       │
│ ←──→ ┌──────┐ ←8px→ Label Text ←8px→ ┌──────┐ ←──→   │
│  px  │ icon │       (centered)       │trail │  px    │
│      └──────┘                        └──────┘        │
│     ↓ padding-y                                       │
└───────────────────────────────────────────────────────┘

Leading icon: optional
Trailing icon: optional (chevron, external link)
Gap between icon and text: 8px
Min-width: 64px (prevents tiny buttons)
```

#### Icon Buttons

```
┌───────────┐
│           │
│   [icon]  │   Square button
│   20px    │   Size matches height (40×40 for md)
│           │   Icon centered
└───────────┘

Minimum touch target: 44×44px
Always requires aria-label
```

| Size | Dimensions | Icon Size |
|------|------------|-----------|
| `sm` | 32×32px | 16px |
| `md` | 40×40px | 20px |
| `lg` | 48×48px | 24px |

#### Button Groups

```
┌──────────┬──────────┬──────────┐
│  Option  │  Option  │  Option  │  Segmented control
└──────────┴──────────┴──────────┘
     No gap between buttons
     First: left radius only
     Middle: no radius
     Last: right radius only
     Selected: primary background
```

#### Healthcare Button Guidelines

| Action Type | Variant | Example |
|-------------|---------|---------|
| Verify prescription | Primary | "Verify & Sign" |
| Save progress | Secondary | "Save Draft" |
| Cancel action | Tertiary | "Cancel" |
| Delete record | Danger | "Delete Prescription" |
| Override warning | Danger Secondary | "Override & Continue" |

---

### Form Inputs

Form inputs are critical in healthcare—they must be clear, accessible, and prevent errors.

#### Text Input

```
Label Text *                           ← Required indicator
┌─────────────────────────────────────┐
│ [icon] Placeholder text        [X]  │ ← Optional icons
└─────────────────────────────────────┘
Helper text explaining format          ← Always show for complex fields
```

#### Input Sizes

| Size | Height | Padding X | Padding Y | Font Size | Label Size |
|------|--------|-----------|-----------|-----------|------------|
| `sm` | 32px | 12px | 6px | 14px | 12px |
| `md` | 40px | 12px | 8px | 14px | 14px |
| `lg` | 48px | 16px | 12px | 16px | 14px |

#### Input States

| State | Border | Background | Label | Ring |
|-------|--------|------------|-------|------|
| **Default** | `gray-300` | `white` | `gray-700` | none |
| **Hover** | `gray-400` | `white` | `gray-700` | none |
| **Focus** | `primary-500` | `white` | `primary-600` | 3px primary-100 |
| **Filled** | `gray-300` | `white` | `gray-700` | none |
| **Error** | `red-500` | `red-50` | `red-600` | 3px red-100 |
| **Success** | `green-500` | `green-50` | `green-600` | none |
| **Disabled** | `gray-200` | `gray-50` | `gray-400` | none |
| **Read-only** | `gray-200` | `gray-50` | `gray-600` | none |

#### Input Variants

**Standard Input**
```typescript
<Input
  label="Patient Name"
  placeholder="Enter full name"
  helperText="First and last name as shown on ID"
  required
/>
```

**Input with Prefix/Suffix**
```
┌─────┬───────────────────────────┐
│ $   │ 0.00                      │  Currency
└─────┴───────────────────────────┘

┌───────────────────────────┬─────┐
│ 100                       │ mg  │  Unit of measure
└───────────────────────────┴─────┘
```

**Input with Actions**
```
┌─────────────────────────────────────┐
│ Search patients...            [🔍] │  Search with button
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ••••••••••••                  [👁] │  Password with toggle
└─────────────────────────────────────┘
```

---

#### Textarea

```
Label Text
┌─────────────────────────────────────┐
│ Multi-line text input               │
│                                     │
│                                     │
│                              ⌟      │  ← Resize handle
└─────────────────────────────────────┘
0/500 characters                        ← Character count
```

| Property | Value |
|----------|-------|
| Min height | 80px (3 lines) |
| Default height | 120px (5 lines) |
| Padding | 12px |
| Resize | vertical only |
| Line height | 1.5 |

---

#### Select / Dropdown

```
Label Text
┌─────────────────────────────────────┐
│ Select an option                 ▼  │
└─────────────────────────────────────┘
     ↓ opens dropdown
┌─────────────────────────────────────┐
│ ✓ Option 1 (selected)               │
│   Option 2                          │
│   Option 3                          │
│   ─────────────── (divider)         │
│   Option 4                          │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Dropdown max-height | 320px (scrollable) |
| Option padding | 8px 12px |
| Option hover | `gray-50` background |
| Selected indicator | Checkmark left, `primary-600` |
| Group headers | `gray-500`, `text-xs`, uppercase |

**Multi-Select**
```
┌─────────────────────────────────────┐
│ [Chip 1 ×] [Chip 2 ×]          ▼   │
└─────────────────────────────────────┘
```

---

#### Checkbox

```
┌────┐
│ ✓  │  Label text
└────┘

States:
┌────┐              ┌────┐              ┌────┐
│    │ Unchecked    │ ✓  │ Checked      │ ─  │ Indeterminate
└────┘              └────┘              └────┘
```

| Property | Value |
|----------|-------|
| Size | 20×20px |
| Border radius | 4px |
| Border | 2px solid gray-300 |
| Checked background | `primary-600` |
| Check icon | white, 2px stroke |
| Gap to label | 8px |

---

#### Radio Button

```
( )  Option 1
(•)  Option 2 (selected)
( )  Option 3
```

| Property | Value |
|----------|-------|
| Size | 20×20px |
| Border | 2px solid gray-300 |
| Selected border | `primary-600` |
| Inner dot | 10px, `primary-600` |
| Gap between options | 12px vertical |
| Gap to label | 8px |

---

#### Switch / Toggle

```
OFF: ┌──────────┐
     │ ○        │  Track: gray-200
     └──────────┘  Thumb: white

ON:  ┌──────────┐
     │        ● │  Track: primary-600
     └──────────┘  Thumb: white
```

| Size | Track W×H | Thumb Size |
|------|-----------|------------|
| `sm` | 36×20px | 16px |
| `md` | 44×24px | 20px |
| `lg` | 52×28px | 24px |

---

#### Date Picker

```
Date of Birth *
┌─────────────────────────────────────┐
│ 📅  MM/DD/YYYY                      │
└─────────────────────────────────────┘
     ↓ opens calendar
┌─────────────────────────────────────┐
│  ◀  January 2024  ▶                 │
├─────────────────────────────────────┤
│ Su  Mo  Tu  We  Th  Fr  Sa          │
│     1   2   3   4   5   6           │
│ 7   8   9  [10] 11  12  13          │
│ 14  15  16  17  18  19  20          │
│ 21  22  23  24  25  26  27          │
│ 28  29  30  31                      │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Calendar width | 280px |
| Day cell | 36×36px |
| Selected day | `primary-600` bg, white text |
| Today | `primary-100` bg, `primary-700` text |
| Disabled dates | `gray-300` text |

**Healthcare Date Considerations:**
- Always show 4-digit year
- Support keyboard entry (not just picker)
- Validate reasonable date ranges (DOB not in future)
- Show age calculation for DOB fields

---

#### Form Field Layout

```
Standard vertical stack:
┌─────────────────────────────────────────────────────┐
│ Label *                                    (0/100)  │  ← Label row
│ ┌─────────────────────────────────────────────────┐ │
│ │ Input                                           │ │  ← Input
│ └─────────────────────────────────────────────────┘ │
│ Helper text or error message                        │  ← Helper row
└─────────────────────────────────────────────────────┘
     Gap between fields: 16px (--space-4)

Horizontal inline (for related fields):
┌───────────────────┐ ← 16px → ┌───────────────────┐
│ First Name *      │          │ Last Name *       │
│ ┌───────────────┐ │          │ ┌───────────────┐ │
│ │               │ │          │ │               │ │
│ └───────────────┘ │          │ └───────────────┘ │
└───────────────────┘          └───────────────────┘
```

---

### Cards

Cards group related content and actions.

#### Card Variants

| Variant | Border | Shadow | Use Case |
|---------|--------|--------|----------|
| **Outlined** | `gray-200` | none | Default, lists |
| **Elevated** | none | `shadow-md` | Featured content |
| **Filled** | none | none | Nested cards, `gray-50` bg |
| **Interactive** | `gray-200` | hover: `shadow-md` | Clickable cards |

#### Card Anatomy

```
┌─────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────┐ │
│ │ [Icon] Title                        [Actions ▼] │ │  ← Header
│ │        Subtitle or metadata                     │ │
│ └─────────────────────────────────────────────────┘ │
│ ─────────────────────────────────────────────────── │  ← Divider (optional)
│                                                     │
│ Content area with any nested content.               │  ← Body
│ Can include text, images, forms, etc.               │
│                                                     │
│ ─────────────────────────────────────────────────── │  ← Divider (optional)
│ ┌─────────────────────────────────────────────────┐ │
│ │ Footer text              [Secondary] [Primary] │ │  ← Footer
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

#### Card Specifications

| Property | Compact | Default | Spacious |
|----------|---------|---------|----------|
| Padding | 12px | 16px | 24px |
| Header padding-bottom | 8px | 12px | 16px |
| Footer padding-top | 8px | 12px | 16px |
| Border radius | 8px | 8px | 12px |
| Gap (internal) | 8px | 12px | 16px |

#### Card States

| State | Treatment |
|-------|-----------|
| Default | Standard styling |
| Hover (interactive) | Subtle shadow increase, cursor pointer |
| Selected | `primary-100` bg, `primary-500` border |
| Disabled | 50% opacity, no interactions |
| Loading | Skeleton overlay |
| Error | `red-100` bg, `red-500` border |

---

### Tables

Tables display structured data for scanning and comparison.

#### Table Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│ [□] │ Name ▲        │ Status    │ Date       │ Actions         │  ← Header
├─────────────────────────────────────────────────────────────────┤
│ [□] │ John Smith    │ [Active]  │ 01/15/2024 │ [Edit] [Delete] │  ← Row
├─────────────────────────────────────────────────────────────────┤
│ [✓] │ Jane Doe      │ [Pending] │ 01/14/2024 │ [Edit] [Delete] │  ← Selected
├─────────────────────────────────────────────────────────────────┤
│ [□] │ Bob Wilson    │ [Error]   │ 01/13/2024 │ [Edit] [Delete] │  ← Error state
└─────────────────────────────────────────────────────────────────┘
     Showing 1-10 of 247              [◀] [1] [2] [3] [...] [25] [▶]  ← Pagination
```

#### Table Specifications

| Element | Specification |
|---------|---------------|
| Header background | `gray-50` |
| Header text | `gray-600`, 12px, font-weight 600, uppercase |
| Header padding | 12px 16px |
| Header height | 44px |
| Row height | 52px (min) |
| Cell padding | 12px 16px |
| Row border | 1px solid `gray-100` bottom |
| Row hover | `gray-50` background |

#### Row States

| State | Background | Left Border | Use Case |
|-------|------------|-------------|----------|
| Default | `white` | none | Normal row |
| Hover | `gray-50` | none | Mouse over |
| Selected | `primary-50` | 3px `primary-500` | Checkbox selected |
| Active | `primary-100` | 3px `primary-600` | Currently viewing |
| Error | `red-50` | 3px `red-500` | Validation error |
| Warning | `yellow-50` | 3px `yellow-500` | Needs attention |
| Success | `green-50` | 3px `green-500` | Recently completed |

#### Column Types

| Type | Alignment | Width | Example |
|------|-----------|-------|---------|
| Text | Left | auto | Patient name |
| Number | Right | fixed | Quantity |
| Currency | Right | fixed | Price |
| Date | Left | 120px | 01/15/2024 |
| Status | Left | 100px | Badge |
| Actions | Right | auto | Icon buttons |
| Checkbox | Center | 48px | Selection |

#### Table Actions

```
Table toolbar:
┌─────────────────────────────────────────────────────────────────┐
│ [🔍 Search...          ]  [Filter ▼]  [Columns ▼]   [Export ▼] │
└─────────────────────────────────────────────────────────────────┘

Bulk actions (when rows selected):
┌─────────────────────────────────────────────────────────────────┐
│ 5 selected    [Mark Verified]  [Export]  [Delete]       [✕]    │
└─────────────────────────────────────────────────────────────────┘
```

---

### Modals & Dialogs

Modals interrupt the user's workflow to focus attention on a specific task.

#### Modal Sizes

| Size | Width | Use Case |
|------|-------|----------|
| `xs` | 320px | Simple alerts |
| `sm` | 400px | Confirmations |
| `md` | 560px | Standard forms |
| `lg` | 720px | Complex forms, detail views |
| `xl` | 900px | Multi-step wizards |
| `full` | 100% - 64px | Full-screen workflows |

#### Modal Anatomy

```
                    OVERLAY (rgba(0,0,0,0.5))
                           │
     ┌─────────────────────▼─────────────────────┐
     │                                           │
     │  ┌─────────────────────────────────────┐  │
     │  │ Title                          [✕]  │  │  ← Header (sticky)
     │  ├─────────────────────────────────────┤  │
     │  │                                     │  │
     │  │  Content area                       │  │  ← Body (scrollable)
     │  │  Can be any height                  │  │
     │  │  Scrolls if overflow               │  │
     │  │                                     │  │
     │  ├─────────────────────────────────────┤  │
     │  │           [Cancel]  [Confirm]       │  │  ← Footer (sticky)
     │  └─────────────────────────────────────┘  │
     │                                           │
     └───────────────────────────────────────────┘
```

#### Modal Specifications

| Property | Value |
|----------|-------|
| Overlay | `rgba(0, 0, 0, 0.5)` or `gray-900/50` |
| Border radius | 12px |
| Shadow | `shadow-xl` |
| Header padding | 20px 24px |
| Body padding | 0 24px 24px |
| Footer padding | 16px 24px |
| Footer background | `gray-50` |
| Max height | `calc(100vh - 64px)` |
| Animation | Fade + scale from 95% to 100% |

#### Modal Types

**Confirmation Dialog**
```
┌─────────────────────────────────────┐
│ Delete Prescription?            [✕] │
├─────────────────────────────────────┤
│                                     │
│ Are you sure you want to delete     │
│ prescription RX-2024-00001234?      │
│                                     │
│ This action cannot be undone.       │
│                                     │
├─────────────────────────────────────┤
│              [Cancel]  [Delete]     │
└─────────────────────────────────────┘

Destructive action: Red "Delete" button
```

**Form Modal**
```
┌─────────────────────────────────────┐
│ Add New Patient                [✕]  │
├─────────────────────────────────────┤
│                                     │
│ First Name *                        │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Last Name *                         │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│              [Cancel]  [Add Patient]│
└─────────────────────────────────────┘
```

**Multi-Step Modal**
```
┌─────────────────────────────────────┐
│ New Prescription                [✕] │
├─────────────────────────────────────┤
│ ①━━━━━●━━━━━②━━━━━○━━━━━③           │  ← Stepper
│ Patient    Drug      Review         │
├─────────────────────────────────────┤
│                                     │
│ Step content here                   │
│                                     │
├─────────────────────────────────────┤
│   [Back]              [Continue →]  │
└─────────────────────────────────────┘
```

---

### Alerts & Notifications

#### Inline Alerts (Banners)

```
┌─────────────────────────────────────────────────────┐
│ [!]  │  Title (optional)                        [✕] │
│      │  Message text that explains the situation    │
│      │  [Action Button]                             │
└─────────────────────────────────────────────────────┘
      ↑
    4px left border accent
```

| Variant | Background | Border | Icon | Text |
|---------|------------|--------|------|------|
| **Info** | `blue-50` | `blue-500` | Info | `blue-800` |
| **Success** | `green-50` | `green-500` | CheckCircle | `green-800` |
| **Warning** | `yellow-50` | `yellow-500` | AlertTriangle | `yellow-800` |
| **Error** | `red-50` | `red-500` | XCircle | `red-800` |

#### Toast Notifications

```
Position: Top-right, 24px from edges

┌─────────────────────────────────────┐
│ [✓]  Prescription saved        [✕]  │
└─────────────────────────────────────┘
      Auto-dismiss: 5 seconds
      Stack: max 3 visible
```

| Property | Value |
|----------|-------|
| Width | 360px max |
| Padding | 16px |
| Border radius | 8px |
| Shadow | `shadow-lg` |
| Auto-dismiss | 5s (info/success), none (error) |
| Animation | Slide in from right |

---

### Badges & Tags

#### Badge Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 18px | 2px 6px | 11px |
| `md` | 22px | 2px 8px | 12px |
| `lg` | 26px | 4px 10px | 13px |

#### Badge Variants

| Variant | Style | Background | Text | Use Case |
|---------|-------|------------|------|----------|
| **Solid** | Filled | `{color}-600` | `white` | High emphasis |
| **Soft** | Light fill | `{color}-100` | `{color}-700` | Standard |
| **Outline** | Border only | `transparent` | `{color}-600` | Subtle |
| **Dot** | With dot | `gray-100` | `gray-700` | Status indicator |

#### Badge Colors

| Color | Token | Healthcare Usage |
|-------|-------|------------------|
| Gray | `neutral` | Default, inactive |
| Blue | `info` | Informational |
| Green | `success` | Verified, active, complete |
| Yellow | `warning` | Pending, attention |
| Orange | `caution` | Expiring, moderate alert |
| Red | `error` | Critical, error, allergy |
| Purple | `special` | Controlled substance |
| Teal | `secondary` | Accents |

---

### Tabs

```
┌──────────┬──────────┬──────────┐
│  Tab 1   │  Tab 2   │  Tab 3   │  ← Tab list
├──────────┴──────────┴──────────┤
│   ═══                          │  ← Active indicator
│                                │
│  Tab panel content             │  ← Panel
│                                │
└────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Tab height | 44px |
| Tab padding | 12px 16px |
| Active indicator | 2px, `primary-600` |
| Gap between tabs | 0 (connected) or 8px (separated) |
| Active tab text | `primary-600`, font-weight 600 |
| Inactive tab text | `gray-600`, font-weight 400 |

---

### Tooltips

```
               ┌───────────────────────┐
               │ Tooltip text content  │
               │ can wrap to two lines │
               └───────────▲───────────┘
                           │
                       [Trigger]
```

| Property | Value |
|----------|-------|
| Background | `gray-900` |
| Text | `white`, 12px |
| Padding | 8px 12px |
| Border radius | 6px |
| Max width | 240px |
| Delay (show) | 300ms |
| Delay (hide) | 150ms |
| Arrow size | 6px |

---

### Dropdowns & Menus

```
[Trigger Button ▼]
        │
        ▼
┌─────────────────────────────┐
│ Menu Item 1             ⌘K │  ← With shortcut
│ Menu Item 2                 │
│ ─────────────────────────── │  ← Divider
│ [!] Dangerous action        │  ← Destructive item (red)
└─────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Min width | Match trigger or 180px |
| Max width | 320px |
| Max height | 320px (scrollable) |
| Item padding | 8px 12px |
| Item height | 36px |
| Border radius | 8px |
| Shadow | `shadow-lg` |
| Animation | Scale from 95% + fade |

---

### Progress & Loading

#### Progress Bar

```
Determinate:
┌────────────────────────────────────────────────────┐
│████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ 35%
└────────────────────────────────────────────────────┘

Indeterminate:
┌────────────────────────────────────────────────────┐
│░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ (animated)
└────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 4px (sm), 8px (md), 12px (lg) |
| Border radius | Full (pill) |
| Track color | `gray-200` |
| Fill color | `primary-600` |

#### Spinner

```
    ◠
   ╱ ╲
  ╱   ╲    Circular spinner
  ╲   ╱    2px stroke
   ╲ ╱     Animated rotation
    ◡
```

| Size | Dimension | Stroke |
|------|-----------|--------|
| `sm` | 16px | 2px |
| `md` | 24px | 2px |
| `lg` | 32px | 3px |
| `xl` | 48px | 4px |

#### Skeleton

```
┌─────────────────────────────────────┐
│ ████████████████████                │ ← Text skeleton
│ ████████████████████████████        │
│ ████████████                        │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `gray-200` |
| Animation | Shimmer (left to right) |
| Border radius | 4px (text), matches component |
| Duration | 1.5s |

---

### Empty States

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                    [  📋  ]                         │ ← Icon (48px, gray-400)
│                                                     │
│              No prescriptions yet                   │ ← Title (18px, gray-700)
│                                                     │
│        Add your first prescription to get           │ ← Description (14px, gray-500)
│        started with patient care.                   │
│                                                     │
│               [+ Add Prescription]                  │ ← Action button
│                                                     │
└─────────────────────────────────────────────────────┘
```

| Element | Specification |
|---------|---------------|
| Icon | 48px, `gray-400` |
| Title | 18px, `gray-700`, font-weight 600 |
| Description | 14px, `gray-500`, max-width 300px, centered |
| Action | Primary button, margin-top 16px |
| Container padding | 48px |

---

### Avatars

```
┌────┐     ┌────┐     ┌────┐
│ JS │     │ 👤 │     │ 🖼 │
└────┘     └────┘     └────┘
Initials   Fallback   Image
```

| Size | Dimension | Font | Use Case |
|------|-----------|------|----------|
| `xs` | 24px | 10px | Dense lists |
| `sm` | 32px | 12px | Compact UI |
| `md` | 40px | 14px | Standard |
| `lg` | 56px | 18px | Profiles |
| `xl` | 80px | 24px | Detail views |

| Property | Value |
|----------|-------|
| Shape | Circle |
| Background (initials) | `primary-100` |
| Text (initials) | `primary-700` |
| Border | 2px white (in groups) |

---

### Pagination

```
Showing 1-10 of 247    [◀] [1] [2] [3] [...] [25] [▶]
                        ↑                        ↑
                      Prev                    Next

Simplified:
[← Previous]                              [Next →]
```

| Element | Specification |
|---------|---------------|
| Page button size | 36×36px |
| Active page | `primary-600` bg, white text |
| Inactive page | transparent bg, `gray-700` text |
| Disabled | 50% opacity |
| Gap between buttons | 4px |

---

### Breadcrumbs

```
Home  /  Patients  /  John Smith  /  Prescriptions
 ↑          ↑              ↑             ↑
Link      Link           Link        Current (no link)
```

| Property | Value |
|----------|-------|
| Separator | `/` or `›`, `gray-400` |
| Link color | `primary-600` |
| Current color | `gray-700`, font-weight 500 |
| Font size | 14px |
| Gap | 8px around separator |

---

## Form Patterns & Validation

Forms are the primary input mechanism in healthcare applications. Proper validation prevents data entry errors that could affect patient safety.

---

### Form Layout Principles

| Principle | Application |
|-----------|-------------|
| Single column preferred | Reduces cognitive load, clear reading path |
| Top-aligned labels | Best for scan-ability and mobile |
| Logical grouping | Related fields together with section headers |
| Progressive disclosure | Show fields only when relevant |
| Consistent field widths | Don't make fields match expected input length |

---

### Field Anatomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Label *                              ← Label with required indicator       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Placeholder text                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Helper text that provides context                   ← Helper text (muted)  │
│                                                                             │
│                        ↓ After validation error ↓                          │
│                                                                             │
│  Label *                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Invalid input                                                  ⚠️   │   │ ← Error border + icon
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ⚠️ Error message describing the problem              ← Error text (red)   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Field States

| State | Border | Background | Label | Helper/Error |
|-------|--------|------------|-------|--------------|
| Default | `neutral-200` | `white` | `neutral-700` | `neutral-500` |
| Hover | `neutral-300` | `white` | `neutral-700` | `neutral-500` |
| Focus | `primary-500` (2px) | `white` | `primary-600` | `neutral-500` |
| Filled | `neutral-200` | `white` | `neutral-700` | `neutral-500` |
| Disabled | `neutral-200` | `neutral-50` | `neutral-400` | `neutral-400` |
| Read-only | `neutral-200` | `neutral-50` | `neutral-600` | `neutral-500` |
| Error | `error-500` (2px) | `error-50` | `error-600` | `error-600` |
| Success | `success-500` | `white` | `neutral-700` | `success-600` |

---

### Required vs Optional Fields

**Convention**: Mark required fields, not optional ones (most fields in healthcare forms are required).

```
Required Approach (Recommended):        Optional Approach (Alternative):
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ Patient Name *              │         │ Patient Name                │
│ ┌─────────────────────────┐ │         │ ┌─────────────────────────┐ │
│ │                         │ │         │ │                         │ │
│ └─────────────────────────┘ │         │ └─────────────────────────┘ │
│                             │         │                             │
│ Date of Birth *             │         │ Date of Birth               │
│ ┌─────────────────────────┐ │         │ ┌─────────────────────────┐ │
│ │                         │ │         │ │                         │ │
│ └─────────────────────────┘ │         │ └─────────────────────────┘ │
│                             │         │                             │
│ Middle Name                 │         │ Middle Name (optional)      │
│ ┌─────────────────────────┐ │         │ ┌─────────────────────────┐ │
│ │                         │ │         │ │                         │ │
│ └─────────────────────────┘ │         │ └─────────────────────────┘ │
│                             │         │                             │
│ * Required                  │         │                             │
└─────────────────────────────┘         └─────────────────────────────┘

Use when most fields are required       Use when most fields are optional
```

**Required Indicator Styling**:

| Element | Style |
|---------|-------|
| Asterisk (*) | `error-500`, positioned after label |
| Screen reader | `aria-required="true"` on input |
| Form footer | "* Required" legend if using asterisks |

---

### Validation Timing

When validation runs significantly impacts user experience.

#### Validation Strategies

| Strategy | When | Best For |
|----------|------|----------|
| **On Submit** | When form is submitted | Simple forms, all-or-nothing validation |
| **On Blur** | When field loses focus | Complex forms, progressive validation |
| **On Change** | As user types | Format validation (phone, SSN) |
| **On Input** | Every keystroke | Character limits, real-time search |
| **Hybrid** | Blur first, then change | Best UX for most forms |

#### Recommended: Hybrid Validation

```
User Experience Flow:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  1. User focuses field                                                      │
│     → No validation yet                                                     │
│                                                                             │
│  2. User types                                                              │
│     → Only format hints (if applicable)                                     │
│     → Character counter updates                                             │
│                                                                             │
│  3. User leaves field (blur)                                               │
│     → Full validation runs                                                  │
│     → Error shown if invalid                                                │
│                                                                             │
│  4. User returns to fix error                                               │
│     → Validate on each change (immediate feedback)                          │
│     → Error clears as soon as valid                                         │
│                                                                             │
│  5. Form submit                                                             │
│     → Validate all fields                                                   │
│     → Focus first error field                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

```typescript
// Hybrid validation logic
const useFieldValidation = (validate: (value: string) => string | null) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  const handleBlur = (value: string) => {
    setTouched(true);
    setError(validate(value));
  };

  const handleChange = (value: string) => {
    setDirty(true);
    // Only validate on change if already touched and has error
    if (touched && error) {
      setError(validate(value));
    }
  };

  return { error, touched, dirty, handleBlur, handleChange };
};
```

---

### Error Message Guidelines

#### Placement

| Placement | When to Use |
|-----------|-------------|
| **Below field** | Default for all inline errors |
| **Above field** | Never (gets hidden by mobile keyboards) |
| **Summary at top** | In addition to inline, for long forms |
| **Toast/alert** | Only for system errors, not validation |

#### Error Message Content

| Bad | Good | Why |
|-----|------|-----|
| "Invalid input" | "Enter a valid email address" | Specific fix |
| "Error" | "Date must be in MM/DD/YYYY format" | Clear expectation |
| "Required" | "Patient name is required" | Context |
| "Invalid date" | "Date of birth cannot be in the future" | Business rule explained |
| "Check your input" | "Phone number must be 10 digits" | Actionable |

#### Error Message Format

```
Pattern: [What's wrong] + [How to fix it]

Examples:
- "Email address is invalid. Enter an address like name@example.com."
- "Password must be at least 8 characters."
- "Date of birth is required to calculate age-based dosing."
- "This NDC is not in our formulary. Check the number or contact support."
```

#### Anatomy

```css
.field-error {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin-top: var(--space-1);
  color: var(--color-error-600);
  font-size: 14px;
  line-height: 1.4;
}

.field-error-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 2px;
}
```

---

### Form Error Summary

For long forms, show an error summary at the top when submission fails.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ Please fix 3 errors before submitting                                   │
│                                                                             │
│    • Patient date of birth is required                    ← Links to field │
│    • Prescriber NPI is invalid                                              │
│    • At least one medication is required                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ New Prescription                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Patient Information                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  ...                                                                        │
```

**Error Summary Specifications**:

| Property | Value |
|----------|-------|
| Background | `error-50` |
| Border | `error-200` left border 4px |
| Icon | Warning icon, `error-500` |
| Title | "Please fix X errors before submitting" |
| List | Clickable links that focus each error field |
| Position | Top of form, sticky on long forms |
| Focus | Summary should receive focus on submit failure |

---

### Inline Validation Patterns

#### Format Validation (As You Type)

For known formats, validate and format in real-time:

```
Phone Number:
┌─────────────────────────────────────────────────────────────────────────────┐
│  Phone Number                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ (555) 123-4567                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ✓ Valid format                                          ← Success hint    │
│                                                                             │
│  User types: 5551234567                                                     │
│  Display shows: (555) 123-4567  ← Auto-formatted                           │
└─────────────────────────────────────────────────────────────────────────────┘

Date Input:
┌─────────────────────────────────────────────────────────────────────────────┐
│  Date of Birth                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 03/15/1985                                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Age: 40 years                                           ← Calculated hint │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Character Limits

```
Notes (max 500 characters):
┌─────────────────────────────────────────────────────────────────────────────┐
│  Notes                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Patient reports taking medication as directed but               │   │
│  │ experiencing mild headaches in the morning.                     │   │
│  │                                                                     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  118 / 500 characters                                    ← Counter (muted) │
└─────────────────────────────────────────────────────────────────────────────┘

Approaching limit (450+):
│  487 / 500 characters                                    ← Counter (warning)

At limit:
│  500 / 500 characters                                    ← Counter (error)
```

#### Async Validation

For server-side checks (e.g., NPI lookup, drug interaction check):

```
NPI Verification:
┌─────────────────────────────────────────────────────────────────────────────┐
│  Prescriber NPI                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 1234567890                                                  [...]   │   │ ← Loading
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Verifying NPI...                                                           │
│                                                                             │
│  ↓ After verification ↓                                                    │
│                                                                             │
│  Prescriber NPI                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 1234567890                                                     ✓    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ✓ Dr. Sarah Williams, MD - Austin, TX                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Async Validation Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Debounce input | Wait 300-500ms after typing stops |
| Show loading state | Spinner in field, "Verifying..." text |
| Cache results | Don't re-verify unchanged values |
| Handle errors | "Could not verify. Try again." with retry |
| Don't block typing | User can continue to other fields |

---

### Field Dependencies

#### Conditional Fields

Show or hide fields based on other field values:

```
Has Allergies?
○ No
● Yes
    │
    ↓ (Revealed when "Yes" selected)
    ┌─────────────────────────────────────────────────────────────────────┐
    │  Allergy Details *                                                  │
    │  ┌─────────────────────────────────────────────────────────────────┐│
    │  │ Enter known allergies...                                        ││
    │  └─────────────────────────────────────────────────────────────────┘│
    │                                                                     │
    │  Reaction Type                                                      │
    │  [ ] Mild   [ ] Moderate   [✓] Severe                              │
    └─────────────────────────────────────────────────────────────────────┘
```

**Conditional Field Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Smooth reveal | Animate height, don't pop |
| Clear hidden values | When hiding, optionally clear entered data |
| Maintain tab order | Dynamically update tabindex |
| Focus management | Focus first revealed field |
| Accessibility | Use `aria-expanded`, `aria-controls` |

#### Dependent Validation

When one field's validity depends on another:

```
Password Confirmation:
┌─────────────────────────────────────────────────────────────────────────────┐
│  Password *                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ●●●●●●●●●●●●                                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ✓ 12 characters  ✓ Uppercase  ✓ Number  ✓ Symbol                          │
│                                                                             │
│  Confirm Password *                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ●●●●●●●●●                                                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ⚠️ Passwords do not match                                                 │
└─────────────────────────────────────────────────────────────────────────────┘

Date Range:
┌─────────────────────────────────────────────────────────────────────────────┐
│  Start Date *                     End Date *                                │
│  ┌───────────────────────┐       ┌───────────────────────┐                 │
│  │ 01/15/2026            │       │ 01/10/2026            │                 │
│  └───────────────────────┘       └───────────────────────┘                 │
│                                  ⚠️ End date must be after start date      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Multi-Step Forms (Wizards)

For complex forms, break into logical steps.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ●─────────●─────────○─────────○─────────○                                │
│   Patient    Medication  Prescriber  Review     Submit                      │
│   ✓ Complete ● Current   ○ Pending   ○ Pending  ○ Pending                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Wizard Validation Strategy

| Strategy | Description |
|----------|-------------|
| **Per-step** | Validate each step before allowing "Next" |
| **Final** | Validate everything on final "Submit" |
| **Hybrid** | Required fields per-step, full validation at end |

**Recommended: Per-step validation**

```
User clicks "Next":
1. Validate all fields in current step
2. If errors → Show inline errors, focus first error, stay on step
3. If valid → Mark step complete, advance to next step, focus first field

User clicks "Back":
1. Always allow (don't trap user)
2. Preserve entered data
3. Don't re-validate
```

#### Step Completion Indicators

| State | Indicator | Color |
|-------|-----------|-------|
| Complete | Filled circle with checkmark | `success-500` |
| Current | Filled circle | `primary-500` |
| Pending | Empty circle | `neutral-300` |
| Error | Filled circle with X | `error-500` |

---

### Form Accessibility

#### Required Accessibility Features

| Feature | Implementation |
|---------|----------------|
| Labels | Every field needs `<label for="">` or `aria-label` |
| Required | `aria-required="true"` on required fields |
| Errors | `aria-invalid="true"` + `aria-describedby` pointing to error |
| Error announcements | `aria-live="polite"` on error container |
| Focus management | Focus first error on submit, focus summary if shown |
| Fieldsets | Group related fields with `<fieldset>` and `<legend>` |

```html
<!-- Accessible form field with error -->
<div class="field">
  <label for="email" id="email-label">
    Email Address <span aria-hidden="true">*</span>
  </label>
  <input
    type="email"
    id="email"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <div id="email-error" class="field-error" role="alert">
    <svg aria-hidden="true"><!-- warning icon --></svg>
    Enter a valid email address
  </div>
</div>
```

#### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move to next field |
| Shift + Tab | Move to previous field |
| Enter | Submit form (when on button) |
| Space | Toggle checkbox/radio |
| Arrow keys | Navigate radio groups, select options |
| Escape | Close dropdowns, cancel modals |

---

### Healthcare-Specific Form Patterns

#### Patient Identification

Always collect and display at least two identifiers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Patient Identification                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  First Name *                      Last Name *                              │
│  ┌─────────────────────────┐      ┌─────────────────────────────────────┐  │
│  │ John                    │      │ Smith                               │  │
│  └─────────────────────────┘      └─────────────────────────────────────┘  │
│                                                                             │
│  Date of Birth *                   MRN (if known)                           │
│  ┌─────────────────────────┐      ┌─────────────────────────────────────┐  │
│  │ 03/15/1985              │      │ 12345678                            │  │
│  └─────────────────────────┘      └─────────────────────────────────────┘  │
│  Age: 40 years                                                              │
│                                                                             │
│  ⚠️ Patient Lookup                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Found: John Smith (DOB: 03/15/1985) MRN: 12345678                   │   │
│  │ [Use This Patient]                        [This is a New Patient]   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Allergy Entry

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Allergies                                                                  │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  ○ No Known Allergies (NKDA)                                               │
│  ● Patient Has Allergies                                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Allergen              │ Reaction          │ Severity    │ Action   │   │
│  ├───────────────────────┼───────────────────┼─────────────┼──────────┤   │
│  │ Penicillin            │ Hives, swelling   │ ● Severe    │ [Remove] │   │
│  │ Sulfa                 │ Rash              │ ○ Moderate  │ [Remove] │   │
│  └───────────────────────┴───────────────────┴─────────────┴──────────┘   │
│                                                                             │
│  [+ Add Allergy]                                                           │
│                                                                             │
│  Add Allergy:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search allergens...                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Common: Penicillin | Sulfa | Codeine | Latex | Aspirin                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Medication/Dosage Entry

**Critical**: Dosage fields require special validation to prevent errors.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Medication                                                                 │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  Drug Name *                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Progesterone                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ✓ Progesterone (Micronized) - Capsule                                     │
│                                                                             │
│  Strength *               Quantity *            Days Supply                 │
│  ┌─────────────────┐     ┌─────────────────┐   ┌─────────────────┐         │
│  │ 100        │ mg │     │ 30              │   │ 30              │         │
│  └─────────────────┘     └─────────────────┘   └─────────────────┘         │
│                                                                             │
│  Sig (Directions) *                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Take 1 capsule by mouth at bedtime                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Quick Sigs: [1 cap PO QHS] [1 cap PO BID] [1 cap PO TID] [Custom]         │
│                                                                             │
│  ⚠️ Dosage Alert                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ⚠️ 100 mg is higher than typical starting dose (25-50 mg).         │   │
│  │    [Confirm Dosage]  [Adjust Dosage]                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Dosage Field Validation**:

| Check | Implementation |
|-------|----------------|
| Numeric only | Prevent non-numeric input |
| Reasonable range | Warn if outside typical range |
| Leading zeros | Auto-add (0.5, not .5) |
| Trailing zeros | Auto-remove (1 mg, not 1.0 mg) |
| Unit validation | Only allow valid units for drug |
| Max dose check | Warn if exceeds max recommended |

#### Prescription Verification Checklist

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Verification Checklist                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  All items must be checked before verification:                            │
│                                                                             │
│  [✓] Patient identity confirmed (Name + DOB match)                         │
│  [✓] Allergies reviewed - no contraindications                             │
│  [ ] Drug interactions checked                          ← Unchecked        │
│  [ ] Dosage appropriate for indication                                      │
│  [ ] Prescriber credentials verified                                        │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  [Cancel]                          [Verify Prescription] ← Disabled         │
│                                                                             │
│  ⚠️ Complete all verification steps to enable submission                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Form Submission States

| State | UI Treatment |
|-------|--------------|
| **Idle** | Submit button enabled |
| **Submitting** | Button shows spinner, disabled, "Submitting..." |
| **Success** | Success message, redirect or reset |
| **Error (validation)** | Inline errors, focus first error |
| **Error (server)** | Toast/alert with retry option |

```
Submitting State:
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Cancel]                          [◌ Submitting...]  ← Disabled, spinner   │
└─────────────────────────────────────────────────────────────────────────────┘

Success State:
┌─────────────────────────────────────────────────────────────────────────────┐
│  ✓ Prescription submitted successfully                                      │
│    Rx #12345 created for John Smith                                         │
│                                                                             │
│  [View Prescription]  [Create Another]                                      │
└─────────────────────────────────────────────────────────────────────────────┘

Server Error State:
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⚠️ Unable to submit prescription                                          │
│     Connection error. Your changes have been saved locally.                │
│                                                                             │
│  [Try Again]  [Save as Draft]                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Form Validation Checklist

```markdown
## Before Shipping a Form

### Structure
- [ ] Single column layout (or clear visual grouping)?
- [ ] Logical field order (most important first)?
- [ ] Related fields grouped with section headers?
- [ ] Required fields marked consistently?

### Validation
- [ ] Validation timing appropriate (blur + change for errors)?
- [ ] Error messages specific and actionable?
- [ ] Errors appear below fields (not above)?
- [ ] Focus moves to first error on submit?
- [ ] Error summary for long forms?

### Accessibility
- [ ] All fields have associated labels?
- [ ] Required fields use aria-required?
- [ ] Invalid fields use aria-invalid?
- [ ] Errors linked via aria-describedby?
- [ ] Error announcements use aria-live?
- [ ] Keyboard navigation works?

### Healthcare-Specific
- [ ] Patient identification requires 2+ identifiers?
- [ ] Allergy field cannot be skipped (NKDA or list)?
- [ ] Dosage fields validate for safety?
- [ ] Critical actions require confirmation?
- [ ] Verification checklists enforce completion?
```

---

## Loading States & Skeletons

Loading states communicate system status and maintain user trust. In healthcare, unclear loading states can cause users to take duplicate actions or miss critical information.

---

### Loading State Principles

| Principle | Application |
|-----------|-------------|
| **Immediate feedback** | Show loading within 100ms of action |
| **Perceived performance** | Skeleton > spinner for predictable content |
| **Context preservation** | Keep surrounding UI stable |
| **Progress indication** | Show determinate progress when possible |
| **Interruptibility** | Allow cancel for long operations |

---

### When to Use Each Pattern

| Pattern | Response Time | Use Case |
|---------|---------------|----------|
| **None** | <100ms | Instant actions, no indicator needed |
| **Button spinner** | 100ms–1s | Form submissions, quick API calls |
| **Inline skeleton** | 1–3s | Loading content within existing page |
| **Full skeleton** | 1–5s | Initial page load, major navigation |
| **Progress bar** | >5s | File uploads, batch operations |
| **Background task** | >10s | Reports, exports, show toast on complete |

---

### Loading Indicators

#### Spinner

For actions with unpredictable duration.

```
Sizes:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ◌        ◌          ◌              ◌                                    │
│   16px     20px       24px           32px                                   │
│   xs       sm         md             lg                                     │
│                                                                             │
│   Inline   Buttons    Cards          Page                                   │
│   text     Inputs     Sections       Full-screen                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Spinner Specifications**:

| Property | Value |
|----------|-------|
| Animation | Rotate 360° linear infinite |
| Duration | 1000ms |
| Stroke width | 2px (scales with size) |
| Color | `primary-500` or `neutral-400` (on dark) |
| Track | `neutral-200` (10% opacity on dark) |

```css
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--neutral-200);
  border-top-color: var(--primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Progress Bar

For operations with known duration or progress.

```
Determinate (known progress):
┌─────────────────────────────────────────────────────────────────────────────┐
│  Uploading compound worksheet...                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  45% complete · 2.3 MB of 5.1 MB                           [Cancel]        │
└─────────────────────────────────────────────────────────────────────────────┘

Indeterminate (unknown duration):
┌─────────────────────────────────────────────────────────────────────────────┐
│  Processing prescriptions...                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  This may take a moment...                                 [Cancel]        │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Progress Bar Specifications**:

| Property | Value |
|----------|-------|
| Height | 4px (compact) or 8px (standard) |
| Border radius | 2px or 4px |
| Track color | `neutral-200` |
| Fill color | `primary-500` |
| Animation (indeterminate) | Sliding gradient, 2s duration |

---

### Button Loading States

```
Default:                    Loading:                    Success:
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Save Changes   │   →     │  ◌ Saving...    │   →     │  ✓ Saved        │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                            ↑ Disabled, spinner          ↑ Brief (1.5s)
                              replaces or precedes
                              text
```

**Button Loading Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Disable on loading | Prevent double-submission |
| Maintain width | Don't let button resize |
| Spinner position | Left of text, or replace icon |
| Loading text | "Saving...", "Submitting...", "Loading..." |
| Success flash | Optional 1.5s success state before reset |

```typescript
// Button states
type ButtonState = 'idle' | 'loading' | 'success' | 'error';

// Usage
<Button state={isSubmitting ? 'loading' : 'idle'}>
  {isSubmitting ? 'Saving...' : 'Save Changes'}
</Button>
```

---

### Skeleton Screens

Skeletons show the shape of content before it loads, reducing perceived wait time.

#### Skeleton Anatomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Text skeleton (single line):                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Height: 16-20px, matches text line-height                                  │
│                                                                             │
│  Text skeleton (paragraph):                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │   │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Vary widths: 100%, 90%, 60% for natural look                              │
│                                                                             │
│  Avatar skeleton:                                                           │
│  ┌────┐                                                                    │
│  │░░░░│  Circle: 32-48px                                                   │
│  └────┘                                                                    │
│                                                                             │
│  Image skeleton:                                                            │
│  ┌─────────────────────┐                                                   │
│  │░░░░░░░░░░░░░░░░░░░░░│  Maintains aspect ratio                           │
│  │░░░░░░░░░░░░░░░░░░░░░│                                                   │
│  └─────────────────────┘                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Skeleton Specifications

| Property | Value |
|----------|-------|
| Background | `neutral-200` (light) / `neutral-700` (dark) |
| Animation | Shimmer gradient, 2s duration, infinite |
| Border radius | Match target element |
| Spacing | Match actual content layout exactly |

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-200) 0%,
    var(--neutral-100) 50%,
    var(--neutral-200) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Dark mode */
[data-theme="dark"] .skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-700) 0%,
    var(--neutral-600) 50%,
    var(--neutral-700) 100%
  );
}
```

---

### Component-Specific Loading States

#### Card Skeleton

```
Actual Card:                           Skeleton:
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ Rx #12345                   │        │ ░░░░░░░░░░                  │
│ ─────────────────────────── │        │ ─────────────────────────── │
│ John Smith                  │        │ ░░░░░░░░░░░░░░              │
│ DOB: 03/15/1985             │        │ ░░░░░░░░░░░░░░░░            │
│                             │        │                             │
│ Progesterone 100mg          │        │ ░░░░░░░░░░░░░░░░░░░░        │
│ Qty: 30 | Days: 30          │        │ ░░░░░░░░░░░░░░░░            │
│                             │        │                             │
│ ● Pending Verification      │        │ ░░░░░░░░░░░░░░░░░░░░░░      │
└─────────────────────────────┘        └─────────────────────────────┘
```

#### Table Skeleton

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Patient        │ Medication      │ Status         │ Date          │ Action │
├────────────────┼─────────────────┼────────────────┼───────────────┼────────┤
│ ░░░░░░░░░░░░░  │ ░░░░░░░░░░░░░░  │ ░░░░░░░░       │ ░░░░░░░░░░    │ ░░░░   │
│ ░░░░░░░░░░░░░  │ ░░░░░░░░░░░░░░  │ ░░░░░░░░       │ ░░░░░░░░░░    │ ░░░░   │
│ ░░░░░░░░░░░░░  │ ░░░░░░░░░░░░░░  │ ░░░░░░░░       │ ░░░░░░░░░░    │ ░░░░   │
│ ░░░░░░░░░░░░░  │ ░░░░░░░░░░░░░░  │ ░░░░░░░░       │ ░░░░░░░░░░    │ ░░░░   │
│ ░░░░░░░░░░░░░  │ ░░░░░░░░░░░░░░  │ ░░░░░░░░       │ ░░░░░░░░░░    │ ░░░░   │
└────────────────┴─────────────────┴────────────────┴───────────────┴────────┘

Keep headers visible - only skeleton the data rows
```

#### List Skeleton

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌────┐  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                              │
│  │░░░░│  ░░░░░░░░░░░░░░░░░░░░░░░░░░                                        │
│  └────┘                                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  ┌────┐  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                          │
│  │░░░░│  ░░░░░░░░░░░░░░░░░░░░░░                                            │
│  └────┘                                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  ┌────┐  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                                │
│  │░░░░│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                                    │
│  └────┘                                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Form Skeleton

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░                                    ← Label skeleton           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ░░░░░░░░░░░░░░░░                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ░░░░░░░░░░            ░░░░░░░░░░░░░░░░                                     │
│  ┌───────────────────┐ ┌───────────────────────────────────────────────┐   │
│  │░░░░░░░░░░░░░░░░░░░│ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │
│  └───────────────────┘ └───────────────────────────────────────────────┘   │
│                                                                             │
│                                                       ┌─────────────────┐   │
│                                                       │░░░░░░░░░░░░░░░░░│   │
│                                                       └─────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Dashboard Skeleton

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ ░░░░░░░░     │  │ ░░░░░░░░     │  │ ░░░░░░░░     │  │ ░░░░░░░░     │    │
│  │              │  │              │  │              │  │              │    │
│  │ ░░░░░░       │  │ ░░░░░░       │  │ ░░░░░░       │  │ ░░░░░░       │    │
│  │ ░░░░░░░░░    │  │ ░░░░░░░░░    │  │ ░░░░░░░░░    │  │ ░░░░░░░░░    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                             │
│  ┌───────────────────────────────────────────────┐  ┌──────────────────┐   │
│  │ ░░░░░░░░░░░░░░                                │  │ ░░░░░░░░░░░░     │   │
│  │                                               │  │ ────────────     │   │
│  │ ┌───────────────────────────────────────────┐ │  │ ░░░░░░░░  ░░░░   │   │
│  │ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │  │ ░░░░░░░░  ░░░░   │   │
│  │ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │  │ ░░░░░░░░  ░░░░   │   │
│  │ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │  │ ░░░░░░░░  ░░░░   │   │
│  │ └───────────────────────────────────────────┘ │  │ ░░░░░░░░  ░░░░   │   │
│  └───────────────────────────────────────────────┘  └──────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Full Page Loading

For initial page loads or major navigation.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo]                                                   [User Menu ▼]     │
├────────────────┬────────────────────────────────────────────────────────────┤
│                │                                                            │
│  ░░░░░░░░░░░   │                                                            │
│  ░░░░░░░░░░░   │                                                            │
│  ░░░░░░░░░░░   │                    ◌                                       │
│  ░░░░░░░░░░░   │                                                            │
│  ░░░░░░░░░░░   │             Loading prescriptions...                       │
│                │                                                            │
│                │                                                            │
│                │                                                            │
│                │                                                            │
└────────────────┴────────────────────────────────────────────────────────────┘

Option A: Centered spinner     Option B: Full skeleton (preferred)
with message                   Skeleton the entire content area
```

**Full Page Loading Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Keep shell visible | Header, sidebar skeleton or actual |
| Center loading indicator | If using spinner instead of skeleton |
| Show loading message | Brief, descriptive text |
| Timeout handling | After 10s, show error with retry |

---

### Progressive Loading

Load and display content in stages for better perceived performance.

```
Stage 1: Shell                 Stage 2: Critical            Stage 3: Complete
┌────────────────────┐         ┌────────────────────┐       ┌────────────────────┐
│ [Header loaded]    │         │ [Header loaded]    │       │ [Header loaded]    │
├────────────────────┤         ├────────────────────┤       ├────────────────────┤
│                    │         │ John Smith         │       │ John Smith         │
│      ◌             │   →     │ DOB: 03/15/1985    │   →   │ DOB: 03/15/1985    │
│   Loading...       │         │                    │       │ ⚠️ Allergies: Sulfa │
│                    │         │ ░░░░░░░░░░░░░░░░░░ │       │                    │
│                    │         │ ░░░░░░░░░░░░░░░░░░ │       │ [Full prescription │
│                    │         │ ░░░░░░░░░░░░░░░░░░ │       │  details loaded]   │
└────────────────────┘         └────────────────────┘       └────────────────────┘
                               ↑ Patient info first         ↑ Then prescriptions
                                 (most critical)              and history
```

**Progressive Loading Priority for Healthcare**:

| Priority | Content | Why |
|----------|---------|-----|
| 1 (Immediate) | Patient name, DOB | Identity confirmation |
| 2 (Critical) | Allergies, alerts | Safety-critical |
| 3 (High) | Current prescription | Primary task |
| 4 (Medium) | History, related data | Context |
| 5 (Low) | Analytics, recommendations | Nice-to-have |

---

### Optimistic UI

Show success immediately, then sync with server. Use for low-risk actions.

```
Optimistic Toggle:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  1. User clicks toggle                                                      │
│     [ OFF ] → [🔘 ON]  ← Instantly shows ON                                │
│                                                                             │
│  2. API call in background                                                  │
│     [🔘 ON]  ← Still shows ON while saving                                 │
│                                                                             │
│  3a. Success: No change needed                                              │
│      [🔘 ON]  ← Stays ON                                                   │
│                                                                             │
│  3b. Failure: Revert + show error                                          │
│      [ OFF ] + "Failed to update. Try again."                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**When to Use Optimistic UI**:

| Use Optimistic | Don't Use Optimistic |
|----------------|----------------------|
| Toggle settings | Financial transactions |
| Favoriting/starring | Prescription submissions |
| UI preferences | Patient data changes |
| Read/unread status | Verification actions |
| Filter selections | Anything requiring confirmation |

**Healthcare Caution**: Never use optimistic UI for clinical actions. A "verified" badge that isn't actually saved is dangerous.

---

### Loading State Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Announce loading | `aria-busy="true"` on loading region |
| Announce completion | `aria-live="polite"` for loaded content |
| Describe skeletons | `aria-label="Loading..."` on skeleton container |
| Hide decorative | `aria-hidden="true"` on shimmer animation |
| Focus management | Focus loaded content or maintain position |

```html
<!-- Loading state -->
<div aria-busy="true" aria-label="Loading prescriptions">
  <div class="skeleton" aria-hidden="true">...</div>
</div>

<!-- Loaded state -->
<div aria-busy="false" aria-live="polite">
  <table><!-- Actual content --></table>
</div>
```

---

### Error States After Loading

When loading fails, show actionable error states.

```
Retry Pattern:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         ⚠️                                                  │
│                                                                             │
│              Unable to load prescriptions                                   │
│                                                                             │
│     We couldn't connect to the server. Check your                          │
│     connection and try again.                                               │
│                                                                             │
│                    [Try Again]                                              │
│                                                                             │
│     If this problem persists, contact support.                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Partial Failure:
┌─────────────────────────────────────────────────────────────────────────────┐
│  Prescription Details                                                       │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  Rx #12345 · John Smith                                    ← Loaded        │
│  Progesterone 100mg                                                         │
│                                                                             │
│  Drug Interactions                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ⚠️ Unable to check interactions. [Retry]                           │   │ ← Partial fail
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Pricing Information                                        ← Loaded        │
│  Copay: $15.00                                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Healthcare-Specific Loading Considerations

| Consideration | Implementation |
|---------------|----------------|
| **Never hide alerts** | Allergies/warnings load first, never skeleton |
| **Patient ID always visible** | Name/DOB in header loads before content |
| **No optimistic clinical actions** | Verify, dispense, etc. must confirm from server |
| **Timeout warnings** | After 5s, warn user; offer refresh at 15s |
| **Offline handling** | Clear indicator when working offline |
| **Stale data warnings** | Show last-updated timestamp if data may be stale |

```
Stale Data Warning:
┌─────────────────────────────────────────────────────────────────────────────┐
│  Patient Allergies                                    ⚠️ Updated 2 hours ago│
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Penicillin (Severe)                                                      │
│  • Sulfa (Moderate)                                            [Refresh]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Loading State Pitfalls

Common mistakes that break user trust and perceived performance.

---

#### Pitfall 1: The "Jank" (Layout Shift)

Loading states must reserve the exact space that final content will occupy.

```
❌ Layout Shift (CLS Problem)            ✓ Reserved Space
┌─────────────────────────────┐          ┌─────────────────────────────┐
│ Header                      │          │ Header                      │
│ ───────────────────────────│          │ ───────────────────────────│
│                             │          │                             │
│      ◌ Loading...           │          │ ┌─────────────────────────┐ │
│                             │          │ │░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│                             │          │ │░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│                             │          │ │░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│                             │          │ └─────────────────────────┘ │
│ [Button A]  [Button B]      │          │ [Button A]  [Button B]      │
└─────────────────────────────┘          └─────────────────────────────┘
          ↓                                        ↓
┌─────────────────────────────┐          ┌─────────────────────────────┐
│ Header                      │          │ Header                      │
│ ───────────────────────────│          │ ───────────────────────────│
│ ┌─────────────────────────┐ │          │ ┌─────────────────────────┐ │
│ │                         │ │          │ │                         │ │
│ │   Loaded Content        │ │          │ │   Loaded Content        │ │
│ │   That is tall          │ │          │ │   That is tall          │ │
│ │                         │ │          │ │                         │ │
│ └─────────────────────────┘ │          │ └─────────────────────────┘ │
│ [Button A]  [Button B]      │ ← MOVED! │ [Button A]  [Button B]      │ ← Same
└─────────────────────────────┘          └─────────────────────────────┘

User clicks wrong button!                Buttons stay in place
```

**The Problem**: Content "pops" in, pushing other elements down. Users accidentally click wrong buttons.

**Impact**: Poor Core Web Vitals (CLS score), frustrated users, potential errors in healthcare forms.

**The Fix**:

| Approach | Implementation |
|----------|----------------|
| Fixed height containers | Reserve known content height |
| Skeleton screens | Match exact layout of final content |
| Aspect ratio boxes | For images/media with known ratios |
| Min-height | Prevent collapse during loading |

```css
/* Reserve space for dynamic content */
.content-container {
  min-height: 400px; /* Based on typical content */
}

/* Aspect ratio for images */
.image-container {
  aspect-ratio: 16 / 9;
  background: var(--neutral-100);
}
```

---

#### Pitfall 2: Skeleton Screen "Uncanny Valley"

Skeletons must accurately represent the actual content structure.

```
❌ Mismatched Skeleton                   ✓ Accurate Skeleton
┌─────────────────────────────┐          ┌─────────────────────────────┐
│  ┌────┐                     │          │  ┌────────────────────────┐ │
│  │░░░░│  ← Circle avatar    │          │  │░░░░░░░░░░░░░░░░░░░░░░░░│ │
│  └────┘                     │          │  └────────────────────────┘ │
│                             │          │     ↑ Rectangle image      │
│  ░░░░░░░░░░░░░░░░░░░░░░░░  │          │                             │
│  ░░░░░░░░░░░░░░░░░░░░░░░░  │          │  ░░░░░░░░░░░░░░░░░░░░       │
│  ░░░░░░░░░░░░░░░░░░░░░░░░  │          │  ░░░░░░░░░░░░░░░░           │
└─────────────────────────────┘          └─────────────────────────────┘
          ↓                                        ↓
┌─────────────────────────────┐          ┌─────────────────────────────┐
│  ┌────────────────────────┐ │          │  ┌────────────────────────┐ │
│  │      Actual            │ │          │  │      Actual            │ │
│  │      Rectangle         │ │ ← Jarring│  │      Rectangle         │ │ ← Smooth
│  └────────────────────────┘ │          │  └────────────────────────┘ │
│                             │          │                             │
│  John Smith                 │          │  John Smith                 │
│  Pharmacist                 │          │  Pharmacist                 │
└─────────────────────────────┘          └─────────────────────────────┘

Skeleton doesn't match reality          Skeleton mirrors final layout
```

**The Problem**: Generic skeletons that don't match actual content create jarring transitions.

**Skeleton Accuracy Guidelines**:

| Element | Skeleton Must Match |
|---------|---------------------|
| Images | Exact aspect ratio, rounded corners |
| Avatars | Same shape (circle vs. square) |
| Text lines | Approximate line count and widths |
| Layout | Same grid/flex structure |
| Spacing | Identical gaps and padding |

**Contrast Rule**: Keep skeletons low-contrast. High-contrast skeletons create more noticeable "flicker" on transition.

```css
/* Good: subtle skeleton */
.skeleton { background: var(--neutral-100); }

/* Bad: high-contrast skeleton */
.skeleton { background: var(--neutral-400); } /* Too dark */
```

---

#### Pitfall 3: The "Infinite Spinner" of Doom

A lone spinner on a blank screen with no context is an invitation to leave.

```
❌ Context-Free Spinner                  ✓ Informative Loading
┌─────────────────────────────┐          ┌─────────────────────────────┐
│                             │          │ [Logo]     Loading Report   │
│                             │          │ ─────────────────────────── │
│                             │          │                             │
│            ◌                │          │  Generating Q3 2026 Report  │
│                             │          │                             │
│                             │          │  ┌───────────────────────┐  │
│                             │          │  │████████████░░░░░░░░░░░│  │
│                             │          │  └───────────────────────┘  │
│                             │          │  Processing 1,247 of 3,500  │
│                             │          │  prescriptions...           │
│                             │          │                             │
│                             │          │  [Cancel]                   │
└─────────────────────────────┘          └─────────────────────────────┘

"Is it broken? How long?"                "I know what's happening"
```

**Loading Feedback Requirements by Duration**:

| Duration | Required Feedback |
|----------|-------------------|
| <1 second | Spinner only (or nothing) |
| 1–3 seconds | Spinner + brief label ("Loading...") |
| 3–10 seconds | Progress bar or stage indicator |
| >10 seconds | Detailed progress, cancel option, background option |

**Label Examples**:
- "Loading prescriptions..."
- "Checking drug interactions..."
- "Generating compound worksheet..."
- "Uploading document (2 of 5)..."

---

#### Pitfall 4: "Blink-and-You-Miss-It" (The Flash)

When loading is too fast, a brief flash of loading state looks like a bug.

```
Fast API Response Problem:

Frame 1 (0ms):     Frame 2 (50ms):    Frame 3 (100ms):
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ [Click Me]    │  │ [◌ Loading...]│  │ [Click Me]    │
└───────────────┘  └───────────────┘  └───────────────┘
     ↓ Click            ↓ Flash!           ↓ Done

User sees a 50ms flicker = feels broken
```

**The Fix: Minimum Display Time or Delayed Show**

```typescript
// Option A: Minimum display time
const MIN_LOADING_TIME = 400; // ms

const loadData = async () => {
  const start = Date.now();
  setLoading(true);

  const data = await fetchData();

  const elapsed = Date.now() - start;
  if (elapsed < MIN_LOADING_TIME) {
    await delay(MIN_LOADING_TIME - elapsed);
  }

  setLoading(false);
  return data;
};

// Option B: Delayed show (don't show loader for fast responses)
const LOADING_DELAY = 200; // ms

const loadData = async () => {
  let showLoader = false;
  const timeout = setTimeout(() => {
    showLoader = true;
    setLoading(true);
  }, LOADING_DELAY);

  const data = await fetchData();

  clearTimeout(timeout);
  if (showLoader) {
    setLoading(false);
  }

  return data;
};
```

**Guidelines**:

| API Response | Loading Behavior |
|--------------|------------------|
| <200ms | Never show loader |
| 200ms–1s | Show after 200ms delay |
| >1s | Show immediately, min 400ms display |

---

#### Pitfall 5: Over-Loading (The Spinner Storm)

Multiple simultaneous loading indicators create visual chaos.

```
❌ Spinner Storm                         ✓ Staged Loading
┌─────────────────────────────┐          ┌─────────────────────────────┐
│ ◌ Loading nav...            │          │ [Navigation - loaded]       │
├─────────────────────────────┤          ├─────────────────────────────┤
│                             │          │ Patient: John Smith         │
│  ◌        ◌        ◌       │          │ ─────────────────────────── │
│  KPI      KPI      KPI      │          │                             │
│                             │          │  ┌─────┐  ┌─────┐  ┌─────┐ │
│ ─────────────────────────── │          │  │░░░░░│  │░░░░░│  │░░░░░│ │
│                             │          │  │░░░░░│  │░░░░░│  │░░░░░│ │
│  ◌                    ◌    │          │  └─────┘  └─────┘  └─────┘ │
│  Chart                List  │          │                             │
│                             │          │  ░░░░░░░░░░░░░░░░░░░░░░░░  │
│                             │          │  ░░░░░░░░░░░░░░░░░░░░░░░░  │
└─────────────────────────────┘          └─────────────────────────────┘

5 spinners = "Is this thing broken?"     Shell + skeleton = cohesive
```

**Staged Loading Strategy**:

| Stage | What Loads | Timing |
|-------|------------|--------|
| 1. Shell | Navigation, header, layout | Immediate (cached/SSR) |
| 2. Critical | Patient ID, allergies | First API priority |
| 3. Primary | Main content area | Single skeleton |
| 4. Secondary | Sidebar, widgets | Load after primary |
| 5. Tertiary | Analytics, recommendations | Load last, no skeleton |

**Grouping Rules**:

| Guideline | Implementation |
|-----------|----------------|
| One skeleton per section | Don't skeleton individual items in a list |
| Group related loaders | KPIs load together, not 4 separate spinners |
| Sequential, not parallel | Primary content first, then secondary |
| Prioritize above-fold | Load visible content before scrolled content |

---

### Loading States Checklist

```markdown
## Before Shipping Loading States

### Feedback
- [ ] Loading indicator appears within 100ms?
- [ ] Skeleton matches actual content layout?
- [ ] Button shows loading state during submission?
- [ ] Progress shown for long operations?

### User Experience
- [ ] Cancel option for long operations?
- [ ] Timeout handling after 10-15 seconds?
- [ ] Error state with retry option?
- [ ] Partial content shown progressively?

### Accessibility
- [ ] aria-busy on loading regions?
- [ ] Skeleton has aria-label?
- [ ] Focus managed after load completes?
- [ ] Screen readers announce completion?

### Healthcare-Specific
- [ ] Patient identity loads first?
- [ ] Allergies/alerts never skeletoned?
- [ ] Clinical actions confirm from server (no optimistic)?
- [ ] Stale data warnings shown?
- [ ] Offline indicator if applicable?
```

---

## Error Handling Patterns

Errors are inevitable. How you communicate them determines whether users can recover or abandon the task. In healthcare, clear error handling prevents dangerous workarounds.

---

### Error Handling Principles

| Principle | Application |
|-----------|-------------|
| **Be specific** | Tell users exactly what went wrong |
| **Be helpful** | Provide a clear path to resolution |
| **Be calm** | Don't alarm users unnecessarily |
| **Be honest** | Acknowledge system failures without blame |
| **Preserve work** | Never lose user input due to errors |
| **Log everything** | Capture details for debugging |

---

### Error Categories

| Category | Source | User Can Fix? | Example |
|----------|--------|---------------|---------|
| **Validation** | User input | Yes | "Email format is invalid" |
| **Authorization** | Permissions | Sometimes | "Session expired, please log in" |
| **Not Found** | Missing resource | Sometimes | "Prescription not found" |
| **Network** | Connectivity | Yes (retry) | "Unable to connect to server" |
| **Server** | Backend failure | No | "Something went wrong on our end" |
| **Timeout** | Slow response | Yes (retry) | "Request timed out, try again" |
| **Conflict** | Data collision | Sometimes | "This record was modified by another user" |
| **Rate Limit** | Too many requests | Yes (wait) | "Too many attempts, wait 60 seconds" |

---

### Error Display Patterns

#### When to Use Each Pattern

| Pattern | Use For | Duration |
|---------|---------|----------|
| **Inline** | Form validation errors | Persistent until fixed |
| **Toast** | Non-blocking feedback | Auto-dismiss (5-8s) |
| **Banner** | Page-level issues | Persistent with dismiss |
| **Modal** | Blocking errors requiring action | Until resolved |
| **Full Page** | Unrecoverable errors | Permanent |

---

### Inline Errors

For validation and field-level errors. Detailed in Form Patterns section.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Email Address *                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ john.smith@                                                    ⚠️   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ⚠️ Enter a complete email address (e.g., name@example.com)                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Toast Notifications

For transient, non-blocking errors that don't require immediate action.

```
Toast Anatomy:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                           ┌───────────────────────────────┐ │
│                                           │ ⚠️ Unable to save changes    │ │
│                                           │    Connection interrupted.    │ │
│                                           │    [Retry]              [×]  │ │
│                                           └───────────────────────────────┘ │
│                                              ↑ Top-right, stacks downward   │
│  Page Content                                                               │
│  ...                                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Toast Specifications**:

| Property | Value |
|----------|-------|
| Position | Top-right (desktop), top-center (mobile) |
| Width | 320-400px |
| Padding | 16px |
| Border radius | 8px |
| Shadow | `shadow-lg` |
| Animation | Slide in from right, fade out |
| Auto-dismiss | 5-8 seconds for info/success, persistent for errors |
| Stacking | Max 3 visible, newest on top |

**Toast Types**:

| Type | Icon | Color | Auto-dismiss |
|------|------|-------|--------------|
| Success | Checkmark | `success-500` | 5 seconds |
| Info | Info circle | `info-500` | 5 seconds |
| Warning | Warning triangle | `warning-500` | 8 seconds |
| Error | X circle | `error-500` | No (manual dismiss) |

```css
.toast {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  max-width: 400px;
  padding: var(--space-4);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid var(--toast-color);
}

.toast-error {
  --toast-color: var(--status-error);
  background: var(--error-50);
}
```

---

### Banner Errors

For page-level issues that affect the entire view but don't block interaction.

```
Dismissible Banner:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ Your session will expire in 5 minutes. Save your work.      [Extend] [×]│
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Header]                                                                    │
│ ...                                                                         │

Persistent Banner (Critical):
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ Drug interaction database is 3 days outdated. Verify interactions       │
│    manually until updated.                            [Learn More]          │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Header]                                                                    │
│ ...                                                                         │
```

**Banner Specifications**:

| Property | Value |
|----------|-------|
| Position | Top of page, below header |
| Width | Full width |
| Padding | 12-16px |
| Background | Status color at 10% opacity |
| Border | Left border 4px solid status color |
| Icon | Status icon, aligned left |
| Actions | Right-aligned buttons/links |
| Dismiss | X button (unless critical) |

**Banner Types**:

| Type | Can Dismiss | Use Case |
|------|-------------|----------|
| Info | Yes | Feature announcements, tips |
| Warning | Yes | Session expiration, stale data |
| Error | Sometimes | API degradation, sync issues |
| Critical | No | Safety-critical system issues |

---

### Modal Errors

For blocking errors that require user acknowledgment or decision.

```
Confirmation Required:
┌─────────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓┌─────────────────────────────────────────────────────────┐▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  ⚠️ Unsaved Changes                                    │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  ─────────────────────────────────────────────────────  │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  You have unsaved changes to this prescription.         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  Do you want to save before leaving?                    │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  ─────────────────────────────────────────────────────  │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  [Discard Changes]        [Cancel]    [Save & Continue] │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓└─────────────────────────────────────────────────────────┘▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└─────────────────────────────────────────────────────────────────────────────┘

System Error:
┌─────────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓┌─────────────────────────────────────────────────────────┐▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  ❌ Unable to Submit Prescription                       │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  ─────────────────────────────────────────────────────  │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  We couldn't submit this prescription due to a          │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  server error. Your changes have been saved locally.    │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  Error ID: ERR-2026-0215-A7B3                          │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  ─────────────────────────────────────────────────────  │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  [Copy Error ID]              [Cancel]    [Try Again]   │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓└─────────────────────────────────────────────────────────┘▓▓▓▓▓▓▓▓▓│
└─────────────────────────────────────────────────────────────────────────────┘
```

**When to Use Modal Errors**:

| Use Modal | Don't Use Modal |
|-----------|-----------------|
| Unsaved changes confirmation | Form validation errors |
| Destructive action confirmation | Network timeouts |
| Blocking system errors | Recoverable API errors |
| Required user decision | Informational warnings |

---

### Full Page Errors

For unrecoverable errors or when the entire page cannot load.

```
404 Not Found:
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo]                                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                                                                             │
│                              ┌─────────┐                                    │
│                              │   404   │                                    │
│                              └─────────┘                                    │
│                                                                             │
│                        Page not found                                       │
│                                                                             │
│           The prescription you're looking for doesn't exist                 │
│           or may have been archived.                                        │
│                                                                             │
│                      [← Back to Prescriptions]                              │
│                                                                             │
│           Or try: Patients • Inventory • Help Center                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

500 Server Error:
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo]                                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              ┌─────────┐                                    │
│                              │   ⚠️    │                                    │
│                              └─────────┘                                    │
│                                                                             │
│                     Something went wrong                                    │
│                                                                             │
│           We're having trouble loading this page.                           │
│           Our team has been notified.                                       │
│                                                                             │
│                 [Try Again]    [Go to Dashboard]                            │
│                                                                             │
│           Error ID: ERR-2026-0215-A7B3   [Report Issue]                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Error Message Guidelines

#### Content Structure

```
Pattern: [What happened] + [Why it matters] + [What to do]

Examples:

"Unable to verify prescriber credentials. This prescription cannot be
processed until verification completes. Contact the prescriber's office
to confirm their DEA number."

"Your session has expired for security reasons. Please log in again.
Any unsaved changes have been preserved."

"The drug interaction database failed to load. You can continue, but
please verify interactions manually before dispensing."
```

#### Tone by Severity

| Severity | Tone | Example |
|----------|------|---------|
| Info | Neutral, helpful | "Your session will expire in 5 minutes." |
| Warning | Cautionary | "This action cannot be undone." |
| Error | Calm, solution-focused | "Unable to save. Check your connection and try again." |
| Critical | Direct, urgent | "Stop. This patient has a severe allergy to this medication." |

#### What to Avoid

| Don't | Do |
|-------|-----|
| "Error" | "Unable to save prescription" |
| "Invalid input" | "Enter a valid 10-digit NPI number" |
| "Something went wrong" (alone) | "Something went wrong. Try refreshing the page." |
| "Oops!" or "Whoops!" | Keep it professional |
| Technical jargon | Plain language |
| Blaming the user | Neutral, solution-focused |
| ALL CAPS | Sentence case |

---

### Recovery Patterns

#### Retry

For transient failures (network, timeout, server overload).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ⚠️ Unable to load prescriptions                                           │
│                                                                             │
│  We couldn't connect to the server. This might be                          │
│  a temporary issue.                                                         │
│                                                                             │
│  [Try Again]                                                               │
│                                                                             │
│  Tried 2 of 3 times. If this continues, contact support.                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Retry Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Exponential backoff | Wait 1s, 2s, 4s between retries |
| Max attempts | 3 retries, then offer manual retry |
| Show attempt count | "Tried 2 of 3 times" |
| Background retry | For non-critical, auto-retry silently |
| Preserve context | Don't lose user's scroll position |

```typescript
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000
): Promise<T> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await delay(baseDelay * Math.pow(2, attempt - 1));
    }
  }
  throw new Error('Max retries exceeded');
};
```

#### Refresh

When local state may be stale.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⚠️ This prescription was modified by another user                         │
│                                                                             │
│  Sarah K. updated this record 2 minutes ago.                               │
│  Refresh to see the latest version.                                        │
│                                                                             │
│  [Refresh Now]    [View My Changes]                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Contact Support

When user cannot self-resolve.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ❌ Unable to process this prescription                                    │
│                                                                             │
│  This prescription requires manual review by our                           │
│  pharmacy team.                                                             │
│                                                                             │
│  Error ID: ERR-2026-0215-A7B3   [Copy]                                     │
│                                                                             │
│  [Contact Support]    [Save for Later]                                     │
│                                                                             │
│  Support: (800) 555-0123 • support@pharmarx.com                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Always Include**:
- Error ID (for support lookup)
- Copy button (for error ID)
- Contact information
- Alternative action (save draft, continue later)

---

### Offline Handling

#### Offline Detection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ You're offline. Changes will sync when you reconnect.             [×]   │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Header - slightly dimmed]                                    📡 Offline   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Normal content - can view cached data]                                    │
│                                                                             │
│  [Actions that require network are disabled with tooltip]                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Offline Behavior**:

| Feature | Offline Behavior |
|---------|------------------|
| Viewing cached data | Fully functional |
| Editing drafts | Allowed, queued for sync |
| Submitting prescriptions | Disabled with explanation |
| Verification actions | Disabled (requires server) |
| Search | Limited to cached results |

#### Reconnection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✓ You're back online. Syncing 3 pending changes...                   [×]   │
└─────────────────────────────────────────────────────────────────────────────┘

     ↓ After sync ↓

┌─────────────────────────────────────────────────────────────────────────────┐
│ ✓ All changes synced successfully.                                   [×]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Graceful Degradation

When a feature fails, the rest of the app should continue working.

```
Full Functionality:                     Degraded (interactions API down):
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ Rx #12345 · John Smith              │ │ Rx #12345 · John Smith              │
│ ─────────────────────────────────── │ │ ─────────────────────────────────── │
│ Progesterone 100mg                  │ │ Progesterone 100mg                  │
│                                     │ │                                     │
│ Drug Interactions                   │ │ Drug Interactions                   │
│ ┌─────────────────────────────────┐ │ │ ┌─────────────────────────────────┐ │
│ │ ✓ No interactions found        │ │ │ │ ⚠️ Unable to check interactions│ │
│ └─────────────────────────────────┘ │ │ │    Verify manually. [Retry]    │ │
│                                     │ │ └─────────────────────────────────┘ │
│ Pricing                             │ │                                     │
│ Copay: $15.00                       │ │ Pricing                             │
│                                     │ │ Copay: $15.00   ← Still works!     │
│ [Verify & Continue]                 │ │                                     │
│                                     │ │ [Verify & Continue]  ← User can    │
└─────────────────────────────────────┘ │                         proceed     │
                                        └─────────────────────────────────────┘
```

**Degradation Strategy**:

| Component Failure | Graceful Response |
|-------------------|-------------------|
| Drug interactions API | Show warning, allow manual override |
| Pricing API | Show "Price unavailable", allow processing |
| Patient photo | Show initials avatar |
| Search suggestions | Allow freeform search |
| Analytics | Fail silently, log error |

---

### Error Logging

Every error should be logged with context for debugging.

```typescript
interface ErrorLog {
  timestamp: string;
  errorId: string;          // Unique ID shown to user
  type: 'validation' | 'network' | 'server' | 'auth' | 'unknown';
  message: string;
  stack?: string;
  context: {
    userId?: string;
    route: string;
    action: string;         // What user was trying to do
    inputData?: object;     // Sanitized input (no PHI)
    apiEndpoint?: string;
    responseCode?: number;
  };
  userAgent: string;
  appVersion: string;
}

const logError = (error: Error, context: Partial<ErrorLog['context']>) => {
  const errorLog: ErrorLog = {
    timestamp: new Date().toISOString(),
    errorId: generateErrorId(),
    type: classifyError(error),
    message: error.message,
    stack: error.stack,
    context: {
      route: window.location.pathname,
      ...context,
    },
    userAgent: navigator.userAgent,
    appVersion: APP_VERSION,
  };

  // Send to logging service
  sendToLoggingService(errorLog);

  // Return error ID for user display
  return errorLog.errorId;
};
```

**Privacy Note**: Never log PHI (patient names, DOB, medical info). Log only error context, user actions, and sanitized identifiers.

---

### Healthcare-Specific Error Handling

| Scenario | Handling |
|----------|----------|
| **Drug interaction check fails** | Warn user, allow manual override with acknowledgment |
| **Allergy data unavailable** | Block verification until resolved |
| **Prescriber verification fails** | Allow save as draft, block dispensing |
| **Patient not found** | Offer to create new patient or search again |
| **Controlled substance limits** | Show clear limits, offer split fill |
| **Insurance rejection** | Show rejection reason, offer alternatives |
| **Duplicate prescription** | Show existing Rx, confirm if intentional |

```
Critical Safety Error (Cannot Override):
┌─────────────────────────────────────────────────────────────────────────────┐
│  🛑 STOP - Critical Allergy Alert                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  This patient has a SEVERE documented allergy to:                          │
│                                                                             │
│  • Penicillin (Anaphylaxis - 2019)                                         │
│                                                                             │
│  Amoxicillin is in the penicillin class and may cause                      │
│  a life-threatening reaction.                                               │
│                                                                             │
│  This prescription cannot be processed.                                     │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  [Contact Prescriber]                            [Cancel Prescription]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Error UX Best Practices

Modern patterns that reduce friction and treat users like experts.

---

#### Practice 1: Inline Validation (The "Don't Wait" Pattern)

Waiting until submit to show errors is frustrating. Validate as users complete fields.

```
❌ Premature Validation                  ✓ On-Blur Validation
┌─────────────────────────────┐          ┌─────────────────────────────┐
│  Email Address              │          │  Email Address              │
│  ┌───────────────────────┐  │          │  ┌───────────────────────┐  │
│  │ john.sm               │  │          │  │ john.sm               │  │
│  └───────────────────────┘  │          │  └───────────────────────┘  │
│  ⚠️ Invalid email!          │          │  (No error while typing)    │
│                             │          │                             │
│  User is still typing!      │          │  User tabs to next field... │
│  Feels like being yelled at │          │                             │
│                             │          │  ┌───────────────────────┐  │
│                             │          │  │ john.sm               │  │
│                             │          │  └───────────────────────┘  │
│                             │          │  ⚠️ Enter a valid email     │
│                             │          │                             │
│                             │          │  Now error appears (onBlur) │
└─────────────────────────────┘          └─────────────────────────────┘
```

**Validation Timing Rules**:

| Event | Show Error? | Reason |
|-------|-------------|--------|
| On focus | No | User hasn't entered anything |
| On keypress | No | User is still typing |
| On blur (first time) | Yes | User finished this field |
| On change (after error) | Yes | Clear error as soon as valid |
| On submit | Yes | Final validation pass |

**Exception**: Format hints (like password strength meters) can update while typing because they're helpful, not critical.

---

#### Practice 2: Error Boundaries (Graceful Degradation)

One component failure shouldn't crash the entire application.

```
❌ White Screen of Death               ✓ Contained Failure
┌─────────────────────────────┐        ┌─────────────────────────────┐
│                             │        │ Rx #12345 · John Smith      │
│                             │        │ ─────────────────────────── │
│                             │        │ Progesterone 100mg          │
│     Something went wrong.   │        │                             │
│                             │        │ Drug Interactions           │
│     [Refresh Page]          │        │ ┌─────────────────────────┐ │
│                             │        │ │ ⚠️ Unable to load.     │ │
│                             │        │ │    [Retry]              │ │
│                             │        │ └─────────────────────────┘ │
│                             │        │                             │
│                             │        │ Pricing                     │
│                             │        │ Copay: $15.00  ← Still works│
│                             │        │                             │
│ Entire app crashed          │        │ [Verify & Continue]         │
└─────────────────────────────┘        └─────────────────────────────┘
                                       Only broken widget fails
```

**Implementation (React)**:

```tsx
const WidgetErrorBoundary = ({ children, widgetName }) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="widget-error">
          <span>Unable to load {widgetName}</span>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      }
      onError={(error) => logError(error, { widget: widgetName })}
    >
      {children}
    </ErrorBoundary>
  );
};

// Usage
<WidgetErrorBoundary widgetName="Drug Interactions">
  <DrugInteractionsWidget rxId={rxId} />
</WidgetErrorBoundary>
```

**Boundary Hierarchy**:

| Level | Catches | Fallback |
|-------|---------|----------|
| App root | Catastrophic failures | Full error page |
| Route/Page | Page-level crashes | Page error with nav |
| Section | Section failures | Section error box |
| Widget | Widget crashes | Inline error/retry |

---

#### Practice 3: Actionable Empty States

An empty state is often an error in disguise. Never leave users at a dead end.

```
❌ Dead End                             ✓ Actionable
┌─────────────────────────────┐         ┌─────────────────────────────┐
│                             │         │                             │
│  🔍 Search: "xyzabc123"     │         │  🔍 Search: "xyzabc123"     │
│                             │         │                             │
│                             │         │         ┌─────────┐         │
│      No results found.      │         │         │   🔍    │         │
│                             │         │         └─────────┘         │
│                             │         │                             │
│                             │         │    No results for           │
│                             │         │    "xyzabc123"              │
│                             │         │                             │
│                             │         │    Try:                     │
│                             │         │    • Check spelling         │
│  (Now what?)                │         │    • Use patient MRN        │
│                             │         │    • Search by DOB          │
│                             │         │                             │
│                             │         │    [Clear Search]           │
│                             │         │    [Add New Patient]        │
└─────────────────────────────┘         └─────────────────────────────┘
```

**Empty State Requirements**:

| Scenario | Required Actions |
|----------|------------------|
| Search no results | Clear search, alternative suggestions, try different terms |
| Empty list (first use) | Primary action to add first item |
| Filtered to empty | Clear filters, modify filters |
| No permissions | Request access, contact admin |
| Error fetching | Retry, contact support |

**Empty State Anatomy**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                              [Icon/Illustration]                            │
│                                                                             │
│                        Primary message (what happened)                      │
│                    Secondary message (why / what to do)                     │
│                                                                             │
│                          [Primary Action Button]                            │
│                          [Secondary text link]                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

#### Practice 4: Undo vs. Confirm

Modern UX minimizes "Are you sure?" modals. Let users act, then offer undo.

```
❌ Modal Fatigue                        ✓ Undo Pattern
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ User clicks "Archive"       │         │ User clicks "Archive"       │
│           ↓                 │         │           ↓                 │
│ ┌───────────────────────┐   │         │ (Prescription archived      │
│ │ Are you sure you want │   │         │  immediately)               │
│ │ to archive this       │   │         │           ↓                 │
│ │ prescription?         │   │         │ ┌───────────────────────┐   │
│ │                       │   │         │ │ ✓ Prescription archived│  │
│ │ [Cancel]  [Archive]   │   │         │ │              [Undo]   │   │
│ └───────────────────────┘   │         │ └───────────────────────┘   │
│           ↓                 │         │           ↓                 │
│ User clicks again           │         │ Toast auto-dismisses (8s)   │
│           ↓                 │         │           ↓                 │
│ Action finally completes    │         │ Action is permanent         │
│                             │         │                             │
│ 2 clicks, interrupted flow  │         │ 1 click, user is trusted    │
└─────────────────────────────┘         └─────────────────────────────┘
```

**When to Use Each**:

| Use Undo | Use Confirm Modal |
|----------|-------------------|
| Archiving/soft delete | Permanent deletion |
| Removing from list | Deleting patient record |
| Dismissing notifications | Canceling verified prescription |
| Changing settings | Dispensing controlled substances |
| Moving items | Any action with patient safety impact |

**Undo Toast Specifications**:

| Property | Value |
|----------|-------|
| Duration | 8-10 seconds (longer than info toasts) |
| Undo button | Prominent, right-aligned |
| Progress indicator | Optional countdown bar |
| Keyboard | Ctrl+Z triggers undo |
| After dismiss | Action becomes permanent |

```typescript
const archivePrescription = async (rxId: string) => {
  // Optimistically archive
  updateUI({ status: 'archived' });

  // Show undo toast
  const { undone } = await showUndoToast({
    message: 'Prescription archived',
    duration: 8000,
  });

  if (undone) {
    // Revert
    updateUI({ status: 'active' });
  } else {
    // Commit to server
    await api.archivePrescription(rxId);
  }
};
```

**Healthcare Exception**: Always use confirm modals for:
- Dispensing medications
- Verifying prescriptions
- Deleting patient records
- Any action that affects patient care

---

#### Practice 5: Standardized Error Anatomy

Every error message should follow a strict three-part structure.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ⚠️ [1. WHAT] Unable to verify prescriber                           │   │
│  │                                                                     │   │
│  │ [2. WHY] The NPI number provided (1234567890) is not registered    │   │
│  │ in the national database, or the prescriber's license may have     │   │
│  │ expired.                                                            │   │
│  │                                                                     │   │
│  │ [3. HOW TO FIX]                                                    │   │
│  │ • Verify the NPI number with the prescriber's office               │   │
│  │ • Check NPPES database: nppes.cms.hhs.gov                          │   │
│  │ • Contact support if the number is correct                         │   │
│  │                                                                     │   │
│  │ [Contact Prescriber]  [Check NPPES]  [Save as Draft]               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**The Three-Part Formula**:

| Part | Purpose | Example |
|------|---------|---------|
| **1. What** | Plain English, no jargon | "Unable to verify prescriber" |
| **2. Why** | Contextualize the failure | "The NPI is not in the national database" |
| **3. How** | Clear call-to-action | "Verify with prescriber's office" |

**Error Message Templates**:

```markdown
## Network Error
**What**: Unable to save your changes
**Why**: We lost connection to the server
**How**: Check your internet connection and try again

## Validation Error
**What**: This prescription can't be processed
**Why**: The dosage (500mg) exceeds the maximum recommended dose (100mg)
**How**: Contact the prescriber to confirm or adjust the dosage

## Authorization Error
**What**: You don't have permission to verify prescriptions
**Why**: Your account is set up for data entry only
**How**: Contact your pharmacy manager to request verification privileges

## Conflict Error
**What**: This record was modified by another user
**Why**: Sarah K. updated this prescription 2 minutes ago
**How**: Refresh to see their changes, or save your version as a new draft
```

**Brevity Scale**:

| Severity | Detail Level |
|----------|--------------|
| Minor (toast) | What + How (1 line) |
| Moderate (inline) | What + Why + How (2-3 lines) |
| Major (modal) | Full detail + multiple actions |
| Critical (page) | Full detail + support contact + error ID |

---

### Error Handling Checklist

```markdown
## Before Shipping Error Handling

### Error Display
- [ ] Errors are specific and actionable?
- [ ] Correct pattern used (inline, toast, banner, modal)?
- [ ] Error messages follow content guidelines?
- [ ] Error ID shown for server errors?

### Recovery
- [ ] Retry available for transient failures?
- [ ] User data preserved after errors?
- [ ] Clear path to resolution provided?
- [ ] Contact support option for unresolvable?

### Graceful Degradation
- [ ] App continues working when non-critical features fail?
- [ ] Failed sections show inline error, not page crash?
- [ ] Offline mode handled gracefully?

### Accessibility
- [ ] Errors announced to screen readers?
- [ ] Focus moved to error message?
- [ ] Error text has sufficient contrast?
- [ ] Errors not conveyed by color alone?

### Healthcare-Specific
- [ ] Safety-critical errors block dangerous actions?
- [ ] Allergy/interaction check failures are prominent?
- [ ] Override requires explicit acknowledgment?
- [ ] Audit trail captures error + resolution?
```

---

## Notification System

Notifications keep users informed about system events, completed actions, and items requiring attention. In healthcare, notifications must balance urgency with avoiding alert fatigue.

---

### Notification Principles

| Principle | Application |
|-----------|-------------|
| **Relevant** | Only notify for things users care about |
| **Timely** | Deliver at the right moment, not too early or late |
| **Actionable** | Include clear next steps when applicable |
| **Dismissible** | Let users clear non-critical notifications |
| **Prioritized** | Critical alerts interrupt; minor ones don't |
| **Persistent** | Important notifications survive page navigation |

---

### Notification Types

| Type | Urgency | Delivery | Example |
|------|---------|----------|---------|
| **Toast** | Low-Medium | Transient overlay | "Changes saved" |
| **Banner** | Medium | Persistent, page-level | "Session expires in 5 min" |
| **Badge** | Low | Passive indicator | Unread count on bell icon |
| **Inline Alert** | Medium-High | In-context | Drug interaction warning |
| **Modal** | Critical | Blocking | Severe allergy alert |
| **Push** | Varies | System-level | "Prescription ready for pickup" |

---

### Toast Notifications

Transient messages for feedback on user actions and system events.

#### Toast Anatomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                     ┌─────────────────────────────────────┐ │
│                                     │ [Icon]  Title text here             │ │
│                                     │         Description or details      │ │
│                                     │         on second line              │ │
│                                     │                                     │ │
│                                     │ [Action Button]          [×]        │ │
│                                     │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │ │
│                                     │ ← Progress bar (auto-dismiss)       │ │
│                                     └─────────────────────────────────────┘ │
│                                                                             │
│  [Page Content]                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Toast Types

| Type | Icon | Border Color | Auto-dismiss | Use Case |
|------|------|--------------|--------------|----------|
| **Success** | Checkmark | `success-500` | 5s | Action completed |
| **Info** | Info circle | `info-500` | 5s | Neutral information |
| **Warning** | Warning triangle | `warning-500` | 8s | Caution needed |
| **Error** | X circle | `error-500` | No | Action failed |
| **Loading** | Spinner | `neutral-400` | Until complete | Async action in progress |

```
Success:                    Info:                       Warning:
┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────┐
│ ✓ Prescription saved  │   │ ℹ️ 3 new prescriptions │   │ ⚠️ Session expires │
│   Rx #12345 created   │   │   in queue            │   │   in 5 minutes    │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │   │   [Extend]    [×] │
└───────────────────────┘   └───────────────────────┘   └───────────────────┘

Error:                      Loading:
┌───────────────────────┐   ┌───────────────────────┐
│ ✕ Unable to save      │   │ ◌ Verifying NPI...    │
│   Check connection    │   │   This may take a     │
│   [Retry]         [×] │   │   moment              │
└───────────────────────┘   └───────────────────────┘
```

#### Toast Specifications

| Property | Value |
|----------|-------|
| Position | Top-right (desktop), top-center (mobile) |
| Width | 320px min, 420px max |
| Padding | 16px |
| Border radius | 8px |
| Border | Left 4px solid (type color) |
| Shadow | `shadow-lg` |
| Background | White (light) / `neutral-800` (dark) |
| Z-index | `z-toast` (see Z-Index Scale) |
| Animation in | Slide from right + fade (300ms) |
| Animation out | Fade + slide right (200ms) |

#### Toast Stacking

```
Max 3 Visible:                          Queue Behavior:
┌───────────────────────────────────┐   ┌───────────────────────────────────┐
│                                   │   │                                   │
│      ┌───────────────────────┐    │   │      ┌───────────────────────┐    │
│      │ Toast 1 (newest)      │    │   │      │ Toast 1               │    │
│      └───────────────────────┘    │   │      └───────────────────────┘    │
│      ┌───────────────────────┐    │   │      ┌───────────────────────┐    │
│      │ Toast 2               │    │   │      │ Toast 2               │    │
│      └───────────────────────┘    │   │      └───────────────────────┘    │
│      ┌───────────────────────┐    │   │      ┌───────────────────────┐    │
│      │ Toast 3 (oldest)      │    │   │      │ Toast 3               │    │
│      └───────────────────────┘    │   │      └───────────────────────┘    │
│                                   │   │      ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐    │
│      Newest on top, oldest bottom │   │        Toast 4 (queued)          │
│                                   │   │      └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘    │
│                                   │   │      Waits for slot               │
└───────────────────────────────────┘   └───────────────────────────────────┘
```

**Stacking Rules**:

| Rule | Implementation |
|------|----------------|
| Max visible | 3 toasts (prevents overwhelm) |
| Order | Newest on top |
| Gap | 8px between toasts |
| Queue | Additional toasts wait for slot |
| Priority | Errors jump queue, never auto-dismiss |
| Pause on hover | Stop countdown when mouse over |

#### Toast with Actions

```
Simple Action:                          Undo Action:
┌───────────────────────────────────┐   ┌───────────────────────────────────┐
│ ✓ Prescription archived           │   │ ✓ Prescription archived           │
│                                   │   │                                   │
│ [View Archived]               [×] │   │ [Undo]                        [×] │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │   │ ████████████░░░░░░░░░░░░░░░░░░░░ │
└───────────────────────────────────┘   └───────────────────────────────────┘
                                        ↑ Countdown progress bar

Multi-Action:
┌───────────────────────────────────┐
│ ℹ️ New prescription received       │
│   Rx #12345 for John Smith        │
│                                   │
│ [View Rx]  [Start Verification]   │
└───────────────────────────────────┘
```

---

### Banner Notifications

Persistent, page-level alerts that require acknowledgment or contain ongoing information.

```
Dismissible Info Banner:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ℹ️ Scheduled maintenance tonight 10pm-2am. Save your work.            [×]  │
└─────────────────────────────────────────────────────────────────────────────┘

Warning Banner (Dismissible):
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ Your session will expire in 5 minutes.         [Extend Session]    [×]  │
└─────────────────────────────────────────────────────────────────────────────┘

Critical Banner (Not Dismissible):
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🛑 Drug interaction database offline. Verify interactions manually.        │
└─────────────────────────────────────────────────────────────────────────────┘

Success Banner (Auto-dismiss):
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✓ All prescriptions synced successfully.                              [×]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Banner Specifications

| Property | Value |
|----------|-------|
| Position | Top of page, below header |
| Width | Full width (edge to edge) |
| Padding | 12px horizontal, 8px vertical |
| Background | Type color at 10% opacity |
| Border | Bottom 1px solid (type color at 20%) |
| Icon | Left-aligned, type color |
| Text | `neutral-900` (dark enough on light bg) |
| Actions | Right-aligned, ghost or link buttons |
| Close | X button, right edge (if dismissible) |

#### Banner Types

| Type | Dismissible | Auto-dismiss | Use Case |
|------|-------------|--------------|----------|
| Info | Yes | Optional (30s) | Announcements, tips |
| Success | Yes | Yes (10s) | Batch operations complete |
| Warning | Yes | No | Session timeout, stale data |
| Error | Sometimes | No | Degraded functionality |
| Critical | No | No | Safety-critical system issues |

---

### Badge Notifications

Passive indicators showing counts or status without interrupting the user.

```
Navigation Badge:                       Icon Badge:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  [Logo]                                              🔔     [User ▼]       │
│                                                      (3)                    │
│                                                       ↑                     │
│  ├─ Dashboard                                   Notification count          │
│  ├─ Prescriptions (12)  ← Count badge                                       │
│  ├─ Patients                                                                │
│  └─ Inventory ●  ← Dot badge (unspecified count/alert)                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Badge Specifications

| Badge Type | Size | Content | Color |
|------------|------|---------|-------|
| Count (small) | 16px height | 1-9 | `error-500` or `primary-500` |
| Count (medium) | 20px height | 10-99 | `error-500` or `primary-500` |
| Count (large) | 20px height | 99+ | `error-500` or `primary-500` |
| Dot | 8px diameter | None | `error-500` (alert) or `primary-500` (info) |

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: var(--color-error-500);
  border-radius: 10px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  padding: 0;
  min-width: auto;
  border-radius: 50%;
}
```

#### Badge Placement

```
Icon with Badge:                        Avatar with Status:
┌─────────────────┐                     ┌─────────────────┐
│                 │                     │                 │
│    🔔           │                     │   ┌────┐        │
│      ●──┐       │                     │   │    │        │
│         │ Badge │                     │   │ JD │        │
│         └──(3)  │                     │   │    │ ●      │
│                 │                     │   └────┘ │      │
│  Badge overlaps │                     │     Online dot  │
│  top-right      │                     │     (bottom-    │
│                 │                     │      right)     │
└─────────────────┘                     └─────────────────┘
```

---

### Notification Center

Centralized hub for all notifications with history.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                              🔔     [JD ▼] │
│                                                             (3)             │
│                                                               │             │
│                                    ┌──────────────────────────┴────────────┐│
│                                    │ Notifications                         ││
│                                    │ ─────────────────────────────────────│││
│                                    │ [All]  [Unread (3)]  [Mentions]       ││
│                                    │                                       ││
│                                    │ Today                                 ││
│                                    │ ┌───────────────────────────────────┐ ││
│                                    │ │ ● Rx #12345 ready for verification│ ││
│                                    │ │   John Smith · Progesterone       │ ││
│                                    │ │   2 minutes ago                   │ ││
│                                    │ └───────────────────────────────────┘ ││
│                                    │ ┌───────────────────────────────────┐ ││
│                                    │ │ ● Insurance rejected for Rx #12344│ ││
│                                    │ │   Prior auth required             │ ││
│                                    │ │   15 minutes ago           [View] │ ││
│                                    │ └───────────────────────────────────┘ ││
│                                    │ ┌───────────────────────────────────┐ ││
│                                    │ │ ● Dr. Williams requested callback │ ││
│                                    │ │   Re: Testosterone dosage         │ ││
│                                    │ │   1 hour ago                      │ ││
│                                    │ └───────────────────────────────────┘ ││
│                                    │                                       ││
│                                    │ Yesterday                             ││
│                                    │ ┌───────────────────────────────────┐ ││
│                                    │ │ ○ Rx #12340 dispensed successfully│ ││
│                                    │ │   Mary Johnson                    │ ││
│                                    │ │   Yesterday at 4:32 PM            │ ││
│                                    │ └───────────────────────────────────┘ ││
│                                    │                                       ││
│                                    │ ─────────────────────────────────────│││
│                                    │ [Mark All Read]      [View All →]    ││
│                                    └───────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Notification Center Specifications

| Property | Value |
|----------|-------|
| Trigger | Click on bell icon |
| Position | Dropdown from bell, right-aligned |
| Width | 380px |
| Max height | 480px (scrollable) |
| Animation | Fade + scale from top-right |

#### Notification Item Anatomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ● │ Icon │ Title of notification                           │ Timestamp │ × │
│   │      │ Secondary text with more details                │           │   │
│   │      │ [Action Button]                                 │           │   │
└─────────────────────────────────────────────────────────────────────────────┘
  ↑     ↑              ↑                                            ↑       ↑
Unread Type      Content                                         Time   Dismiss
 dot   icon
```

| Element | Specification |
|---------|---------------|
| Unread indicator | 8px dot, `primary-500` |
| Type icon | 16px, category-specific |
| Title | 14px, font-weight 500, truncate at 1 line |
| Description | 14px, `neutral-600`, truncate at 2 lines |
| Timestamp | 12px, `neutral-400`, relative time |
| Action | Ghost button, inline |
| Dismiss | X button, visible on hover |

#### Notification Categories

| Category | Icon | Color | Examples |
|----------|------|-------|----------|
| Prescription | Rx icon | `primary-500` | New Rx, status change |
| Alert | Warning | `warning-500` | Drug interaction, allergy |
| Message | Chat bubble | `info-500` | Prescriber message |
| System | Gear | `neutral-500` | Maintenance, updates |
| Success | Checkmark | `success-500` | Verification complete |
| Urgent | Exclamation | `error-500` | STAT order, critical alert |

---

### Inline Alerts

Contextual notifications that appear within the content, not as overlays.

```
Info Alert:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ℹ️ This medication requires refrigeration. Include ice pack for shipping.   │
└─────────────────────────────────────────────────────────────────────────────┘

Warning Alert:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ Drug Interaction Detected                                               │
│                                                                             │
│ Progesterone may interact with Ketoconazole (current medication).          │
│ Severity: Moderate                                                          │
│                                                                             │
│ [View Details]  [Acknowledge & Continue]                                   │
└─────────────────────────────────────────────────────────────────────────────┘

Error Alert:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✕ Insurance Claim Rejected                                                 │
│                                                                             │
│ Reason: Prior authorization required for this medication.                  │
│ Payer: BlueCross BlueShield                                                │
│                                                                             │
│ [Start Prior Auth]  [Bill to Patient]  [Contact Insurance]                │
└─────────────────────────────────────────────────────────────────────────────┘

Success Alert:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✓ Prescription verified successfully                                       │
│   Verified by: Sarah K. at 2:34 PM                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Inline Alert Specifications

| Property | Value |
|----------|-------|
| Border radius | 8px |
| Padding | 16px |
| Border | 1px solid (type color at 30%) |
| Background | Type color at 5-10% |
| Icon | Type color, 20px, left-aligned |
| Title | 14px, font-weight 600, type color (darker shade) |
| Content | 14px, `neutral-700` |
| Actions | Bottom-aligned, separated by 8px |

---

### Push Notifications

System-level notifications when app is not active.

#### Push Notification Guidelines

| Guideline | Implementation |
|-----------|----------------|
| Request permission | Only after user understands value |
| Be selective | Only critical/time-sensitive events |
| Deep link | Tap should go to relevant screen |
| Respect DND | Honor system Do Not Disturb |
| Provide controls | Let users configure in settings |

#### What to Push

| Push | Don't Push |
|------|------------|
| STAT prescription received | Routine prescription received |
| Prescription ready for pickup | Marketing messages |
| Critical drug alert | System maintenance notices |
| Prescriber callback requested | Feature announcements |
| Verification required (time-sensitive) | General reminders |

#### Push Content

```
Critical Alert:
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔔 PharmaRx                                                      Just now  │
│ ─────────────────────────────────────────────────────────────────────────── │
│ STAT Order Received                                                         │
│ Rx #12345 for John Smith requires immediate attention.                     │
│ Tap to view prescription.                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

Structure:
- Title: Short, action-oriented (max 50 chars)
- Body: Context + next step (max 100 chars)
- Deep link: Specific screen (e.g., /prescriptions/12345)
```

---

### Notification Preferences

Let users control their notification experience.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Notification Settings                                                       │
│ ─────────────────────────────────────────────────────────────────────────── │
│                                                                             │
│ Prescription Updates                                                        │
│ ┌─────────────────────────────────────────────────────────────────────────┐│
│ │ New prescriptions received                   In-App  Email  Push       ││
│ │                                               [✓]     [✓]    [✓]       ││
│ │                                                                         ││
│ │ Prescription status changes                   [✓]     [✓]    [ ]       ││
│ │                                                                         ││
│ │ Verification required                         [✓]     [✓]    [✓]       ││
│ │                                                                         ││
│ │ STAT orders                                   [✓]     [✓]    [✓]       ││
│ │ (Cannot be disabled for safety)               ───     ───    ───       ││
│ └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│ Clinical Alerts                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐│
│ │ Drug interactions                            [✓]     [✓]    [✓]        ││
│ │ (Cannot be disabled for safety)              ───     ───    ───        ││
│ │                                                                         ││
│ │ Allergy alerts                               [✓]     [✓]    [✓]        ││
│ │ (Cannot be disabled for safety)              ───     ───    ───        ││
│ └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│ Quiet Hours                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────┐│
│ │ Enable quiet hours                                             [🔘 ON] ││
│ │                                                                         ││
│ │ From: [10:00 PM ▼]  To: [7:00 AM ▼]                                    ││
│ │                                                                         ││
│ │ ⚠️ Critical alerts (STAT, safety) will still come through.            ││
│ └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Healthcare-Specific Notifications

| Notification Type | Priority | Delivery | Can Disable? |
|-------------------|----------|----------|--------------|
| **STAT order** | Critical | All channels | No |
| **Severe allergy alert** | Critical | In-app modal | No |
| **Drug interaction** | High | In-app + email | No |
| **Verification required** | High | In-app + badge | Configurable |
| **Prescription ready** | Medium | All channels | Yes |
| **Insurance rejected** | Medium | In-app + email | Configurable |
| **Prescriber message** | Medium | In-app + push | Yes |
| **Inventory low** | Low | In-app + email | Yes |
| **System maintenance** | Low | Banner | Yes |

#### Critical Alert Patterns

```
STAT Order (Interruptive):
┌─────────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓┌─────────────────────────────────────────────────────────┐▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  🚨 STAT ORDER                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  ─────────────────────────────────────────────────────  │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  Rx #12345 requires immediate processing                │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  Patient: John Smith                                    │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  Medication: Ondansetron 4mg                            │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  Prescriber: Dr. Williams                               │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  Received: 2 minutes ago                                │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│                                                         │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  ─────────────────────────────────────────────────────  │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│  [Assign to Me]              [View Queue]  [View Rx →]  │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓└─────────────────────────────────────────────────────────┘▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Alert Fatigue Prevention

Too many notifications cause users to ignore all of them—dangerous in healthcare.

| Strategy | Implementation |
|----------|----------------|
| **Aggregate similar** | "5 prescriptions ready" not 5 separate toasts |
| **Prioritize ruthlessly** | Only interrupt for truly critical |
| **Smart timing** | Batch non-urgent for end of session |
| **Progressive disclosure** | Summary first, details on expand |
| **Respect quiet hours** | Honor user preferences (except critical) |
| **Review regularly** | Audit which notifications are dismissed unread |

```
❌ Alert Storm                          ✓ Aggregated
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ Toast: Rx #12341 ready              │ │                                     │
│ Toast: Rx #12342 ready              │ │ Toast: 5 prescriptions ready        │
│ Toast: Rx #12343 ready              │ │        for verification             │
│ Toast: Rx #12344 ready              │ │        [View All]                   │
│ Toast: Rx #12345 ready              │ │                                     │
│                                     │ │                                     │
│ User ignores everything             │ │ User sees consolidated info         │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

---

### Notification Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Screen reader announce | `role="alert"` for urgent, `role="status"` for info |
| Focus management | Don't steal focus unless critical |
| Keyboard dismiss | Escape to close toasts |
| Sufficient time | Pause countdown on focus/hover |
| Color independence | Icon + text, not color alone |
| Motion | Respect `prefers-reduced-motion` |

```html
<!-- Toast with accessibility -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="toast toast-success"
>
  <svg aria-hidden="true"><!-- checkmark --></svg>
  <div class="toast-content">
    <p class="toast-title">Prescription saved</p>
    <p class="toast-description">Rx #12345 created successfully</p>
  </div>
  <button aria-label="Dismiss notification">×</button>
</div>

<!-- Critical alert -->
<div
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="alert-title"
  aria-describedby="alert-desc"
>
  <h2 id="alert-title">STAT Order</h2>
  <p id="alert-desc">Rx #12345 requires immediate processing</p>
</div>
```

---

### Notification System Checklist

```markdown
## Before Shipping Notifications

### Toast Notifications
- [ ] Correct type used (success, info, warning, error)?
- [ ] Auto-dismiss timing appropriate?
- [ ] Max 3 visible, others queued?
- [ ] Pause on hover?
- [ ] Actions included where relevant?

### Notification Center
- [ ] Unread indicator visible?
- [ ] Items grouped by time/category?
- [ ] Mark all read available?
- [ ] Deep links work correctly?
- [ ] Empty state handled?

### Push Notifications
- [ ] Permission requested at appropriate time?
- [ ] Only critical/time-sensitive content?
- [ ] Deep links to correct screen?
- [ ] Respects system DND?

### Healthcare-Specific
- [ ] Critical alerts (STAT, safety) cannot be disabled?
- [ ] Alert fatigue considered (aggregation, smart timing)?
- [ ] Audit trail for critical notifications?
- [ ] Quiet hours exclude safety-critical?

### Accessibility
- [ ] Appropriate ARIA roles used?
- [ ] Focus not stolen unnecessarily?
- [ ] Keyboard dismissible?
- [ ] Sufficient display time?
- [ ] Not color-dependent?
```

---

## Search Patterns

Search is a primary navigation method in healthcare applications. Users need to quickly find patients, prescriptions, medications, and providers among large datasets.

---

### Search Principles

| Principle | Application |
|-----------|-------------|
| **Fast** | Results appear as user types (debounced) |
| **Forgiving** | Handle typos, partial matches, synonyms |
| **Focused** | Scope search to relevant context |
| **Filterable** | Refine results without new search |
| **Findable** | Search is always accessible |
| **Feedback** | Clear indication of what's being searched |

---

### Search Input Anatomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 │ Search patients, prescriptions, medications...          │ ⌘K │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│    ↑       ↑                                                       ↑       │
│  Icon   Placeholder (describes scope)                         Shortcut     │
│                                                                             │
│  Focused State:                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 │ john smith                                              │ ✕ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│    ↑       ↑                                                     ↑         │
│  Icon   User input                                           Clear button  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Search Input Specifications

| Property | Value |
|----------|-------|
| Height | 40px (compact) or 48px (prominent) |
| Border radius | 8px or full-rounded (pill) |
| Background | `neutral-50` or white with border |
| Border | 1px `neutral-200`, 2px `primary-500` on focus |
| Icon | Search (magnifying glass), 20px, `neutral-400` |
| Placeholder | Describes searchable content |
| Clear button | Appears when input has value |
| Shortcut hint | Optional keyboard shortcut badge |

```css
.search-input {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: 48px;
  padding: 0 var(--space-4);
  background: var(--neutral-50);
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-lg);
}

.search-input:focus-within {
  background: white;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

---

### Search Scopes

#### Global Search

Searches across all content types from a single input.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  ┌──────────────────────────────────────────────────┐   🔔  [JD ▼]  │
│         │ 🔍 Search everything...                     ⌘K  │                │
│         └──────────────────────────────────────────────────┘                │
├─────────────────────────────────────────────────────────────────────────────┤
│                            ↓ Dropdown results ↓                            │
│         ┌──────────────────────────────────────────────────┐                │
│         │ 🔍 john                                          │                │
│         ├──────────────────────────────────────────────────┤                │
│         │ Patients                                         │                │
│         │ ┌────────────────────────────────────────────┐   │                │
│         │ │ 👤 John Smith · DOB: 03/15/1985           │   │                │
│         │ │ 👤 John Doe · DOB: 07/22/1990             │   │                │
│         │ │ 👤 Johnny Williams · DOB: 11/03/1978      │   │                │
│         │ └────────────────────────────────────────────┘   │                │
│         │ Prescriptions                                    │                │
│         │ ┌────────────────────────────────────────────┐   │                │
│         │ │ 📋 Rx #12345 · John Smith · Progesterone  │   │                │
│         │ │ 📋 Rx #12290 · John Doe · Testosterone    │   │                │
│         │ └────────────────────────────────────────────┘   │                │
│         │ ──────────────────────────────────────────────   │                │
│         │ [↵ to select]  [↑↓ to navigate]  [esc to close] │                │
│         └──────────────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Contextual Search

Searches within a specific section or data type.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Prescriptions                                                    [+ New Rx]│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search prescriptions...                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  [All ▼]  [Status ▼]  [Date Range ▼]  [Prescriber ▼]    ← Filters          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Rx #12345 · John Smith · Progesterone 100mg · Pending              │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ Rx #12344 · Mary Johnson · Testosterone 50mg · Verified            │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ...                                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Scoped Search (Hybrid)

User can choose scope before or during search.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────┬──────────────────────────────────────────────────────┐   │
│  │ Patients ▼  │ 🔍 Search patients...                                │   │
│  └──────────────┴──────────────────────────────────────────────────────┘   │
│        ↑                                                                    │
│    Scope selector                                                           │
│                                                                             │
│  Scope Options:                                                             │
│  ┌──────────────┐                                                          │
│  │ ○ All        │                                                          │
│  │ ● Patients   │                                                          │
│  │ ○ Rxs        │                                                          │
│  │ ○ Medications│                                                          │
│  │ ○ Prescribers│                                                          │
│  └──────────────┘                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Autocomplete / Typeahead

Show results as the user types.

#### Autocomplete Specifications

| Property | Value |
|----------|-------|
| Debounce | 150-300ms after typing stops |
| Min characters | 2-3 before searching |
| Max results | 5-10 per category |
| Highlight | Bold matching text in results |
| Loading | Spinner in input while fetching |

```
Typing "progest":
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 progest                                                     ◌    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Medications                                                         │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ 💊 **Progest**erone (Micronized) - Capsule                     │ │   │
│  │ │ 💊 **Progest**erone (Micronized) - Cream                       │ │   │
│  │ │ 💊 **Progest**erone (Micronized) - Troche                      │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                     │   │
│  │ Recent Searches                                                     │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ 🕐 progesterone 100mg                                          │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
       ↑
  Matching text is bold
```

#### Result Item Anatomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Icon] │ Primary text (with match highlighting)          │ [Meta/Badge]    │
│        │ Secondary text (additional context)             │                 │
└─────────────────────────────────────────────────────────────────────────────┘

Examples:
┌─────────────────────────────────────────────────────────────────────────────┐
│ 👤 │ **John** Smith                                      │ DOB: 03/15/1985│
│    │ MRN: 12345678                                       │                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📋 │ Rx #12345 · **John** Smith                          │ ● Pending      │
│    │ Progesterone 100mg                                  │                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ 💊 │ **Progest**erone (Micronized)                       │ Capsule        │
│    │ Available strengths: 25mg, 50mg, 100mg, 200mg       │                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Recent Searches

Show previously searched terms for quick access.

```
Empty State (no input, on focus):
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search...                                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Recent Searches                                      [Clear All]   │   │
│  │ ─────────────────────────────────────────────────────────────────── │   │
│  │ 🕐 john smith                                                  [×] │   │
│  │ 🕐 progesterone 100mg                                          [×] │   │
│  │ 🕐 rx 12345                                                    [×] │   │
│  │ 🕐 dr williams                                                 [×] │   │
│  │                                                                     │   │
│  │ ─────────────────────────────────────────────────────────────────── │   │
│  │ Suggested                                                           │   │
│  │ ─────────────────────────────────────────────────────────────────── │   │
│  │ 📋 Pending verifications (12)                                      │   │
│  │ ⚠️ Prescriptions needing attention (3)                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Recent Search Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Max items | 5-10 recent searches |
| Storage | LocalStorage or server-synced |
| Privacy | Don't include in shared sessions |
| Clearable | Individual and "clear all" options |
| Persistence | Survive page refresh |

---

### Filters

Refine search results without new queries.

#### Filter Bar

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search prescriptions...                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────┐ ┌───────────────┐ ┌────────────────┐ ┌─────────────┐          │
│  │ All  ▼  │ │ Status: Any ▼ │ │ Date: All Time▼│ │ + Add Filter│          │
│  └─────────┘ └───────────────┘ └────────────────┘ └─────────────┘          │
│                                                                             │
│  Active Filters:                                                            │
│  ┌───────────────────┐ ┌─────────────────────┐                             │
│  │ Status: Pending ✕ │ │ Prescriber: Dr. W ✕ │     [Clear All Filters]     │
│  └───────────────────┘ └─────────────────────┘                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Filter Dropdown

```
┌───────────────┐
│ Status: Any ▼ │
└───────────────┘
       │
       ↓
┌─────────────────────────┐
│ Status                  │
├─────────────────────────┤
│ [ ] All                 │
│ ─────────────────────── │
│ [✓] Pending        (12) │
│ [ ] Verified        (8) │
│ [ ] Compounding     (3) │
│ [ ] Ready           (5) │
│ [ ] Dispensed      (47) │
│ ─────────────────────── │
│ [Apply]    [Clear]      │
└─────────────────────────┘
```

#### Filter Specifications

| Property | Value |
|----------|-------|
| Dropdown width | Min 200px, max 320px |
| Multi-select | Checkboxes for multiple values |
| Single-select | Radio buttons or direct selection |
| Counts | Show result count per option |
| Apply button | For multi-select, confirm before filtering |
| Active indicator | Pill/chip shows active filters |
| Clear | Individual (×) and "Clear All" |

---

### Search Results

#### Results List

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Showing 24 results for "john smith"                    Sort: Relevance ▼  │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 👤 **John Smith**                                   DOB: 03/15/1985 │   │
│  │    MRN: 12345678 · Last visit: Jan 15, 2026                         │   │
│  │    ⚠️ Allergies: Sulfa, Penicillin                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📋 Rx #12345 · **John Smith**                        ● Pending      │   │
│  │    Progesterone 100mg · Dr. Williams · Jan 20, 2026                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📋 Rx #12290 · **John Smith**                        ✓ Dispensed    │   │
│  │    Testosterone 50mg · Dr. Williams · Jan 10, 2026                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Showing 1-10 of 24                              [← Prev]  [1] 2 3  [Next →]│
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Result Highlighting

Highlight matching terms in results:

```css
.search-highlight {
  background: var(--warning-100);
  font-weight: 600;
  border-radius: 2px;
  padding: 0 2px;
}
```

```
Query: "john"
Result: <span class="search-highlight">John</span> Smith
```

---

### No Results State

When search returns nothing, provide helpful alternatives.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 xyzabc123                                                   [×]  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                         ┌─────────────┐                                    │
│                         │     🔍      │                                    │
│                         └─────────────┘                                    │
│                                                                             │
│                   No results for "xyzabc123"                               │
│                                                                             │
│                   Suggestions:                                              │
│                   • Check your spelling                                     │
│                   • Try fewer keywords                                      │
│                   • Search by MRN or DOB                                   │
│                   • Use partial name match                                  │
│                                                                             │
│                        [Clear Search]                                       │
│                                                                             │
│                   ─────────────────────────                                │
│                                                                             │
│                   Or try:                                                   │
│                   [+ Add New Patient]  [View All Patients]                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**No Results Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Echo the query | "No results for 'xyz'" |
| Offer suggestions | Spelling, fewer keywords, alternate identifiers |
| Provide actions | Clear search, add new, view all |
| Check filters | Remind if filters may be limiting results |

---

### Keyboard Navigation

Search must be fully keyboard accessible.

#### Global Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open global search |
| `/` | Focus search input (when not in text field) |
| `Escape` | Close search dropdown, clear input |

#### Within Search

| Shortcut | Action |
|----------|--------|
| `↑` / `↓` | Navigate results |
| `Enter` | Select highlighted result |
| `Tab` | Move to next section/category |
| `Escape` | Close dropdown |
| `⌘Enter` | Open in new tab (if applicable) |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 john                                                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Patients                                                            │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │▶ John Smith · DOB: 03/15/1985                       ← Selected │ │   │
│  │ │  John Doe · DOB: 07/22/1990                                    │ │   │
│  │ │  Johnny Williams · DOB: 11/03/1978                             │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                     │   │
│  │ ─────────────────────────────────────────────────────────────────── │   │
│  │ ↑↓ Navigate   ↵ Select   esc Close   tab Next Section             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Command Palette (Power User Search)

For advanced users, a command palette combines search with actions.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓┌─────────────────────────────────────────────────────────┐▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ 🔍 >                                                    │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓├─────────────────────────────────────────────────────────┤▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ Actions                                                 │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ ┌─────────────────────────────────────────────────────┐ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ │ ▶ New Prescription                           ⌘N    │ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ │   New Patient                                ⌘⇧N   │ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ │   Verification Queue                         ⌘V    │ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ │   Check Drug Interactions                    ⌘I    │ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ └─────────────────────────────────────────────────────┘ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ Navigation                                              │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ ┌─────────────────────────────────────────────────────┐ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ │   Go to Dashboard                            ⌘1    │ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ │   Go to Prescriptions                        ⌘2    │ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ │   Go to Patients                             ⌘3    │ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ │   Go to Inventory                            ⌘4    │ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ └─────────────────────────────────────────────────────┘ │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ ─────────────────────────────────────────────────────── │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│ Type > for commands, or search patients, rxs, meds...  │▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓└─────────────────────────────────────────────────────────┘▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└─────────────────────────────────────────────────────────────────────────────┘
```

**Command Palette Features**:

| Feature | Implementation |
|---------|----------------|
| Prefix | `>` triggers command mode |
| Mixed results | Commands + search results |
| Shortcuts shown | Display keyboard shortcuts |
| Fuzzy matching | Match partial command names |
| Recent commands | Show recently used first |

---

### Healthcare-Specific Search

#### Patient Search

Multiple identifiers for accurate matching.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Find Patient                                                               │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search by name, MRN, DOB, or phone...                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Or search by specific identifier:                                          │
│                                                                             │
│  Name                              DOB                                      │
│  ┌─────────────────────────────┐   ┌─────────────────────────────┐         │
│  │ John Smith                  │   │ 03/15/1985                  │         │
│  └─────────────────────────────┘   └─────────────────────────────┘         │
│                                                                             │
│  MRN                               Phone                                    │
│  ┌─────────────────────────────┐   ┌─────────────────────────────┐         │
│  │                             │   │                             │         │
│  └─────────────────────────────┘   └─────────────────────────────┘         │
│                                                                             │
│                                                          [Search]          │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Patient Search Requirements**:

| Requirement | Implementation |
|-------------|----------------|
| Multiple matches | Show disambiguation with DOB, MRN |
| Exact MRN match | If MRN entered, match exactly |
| DOB format | Accept various formats, parse consistently |
| Phonetic matching | Handle name spelling variations |
| Two identifiers | Require confirmation with second identifier |

#### Drug Search

Include clinical information in results.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 metform                                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Medications                                                         │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ 💊 **Metform**in HCl                                            │ │   │
│  │ │    Tablet · 500mg, 850mg, 1000mg                                │ │   │
│  │ │    Generic available                                            │ │   │
│  │ ├─────────────────────────────────────────────────────────────────┤ │   │
│  │ │ 💊 **Metform**in HCl ER                                         │ │   │
│  │ │    Extended Release Tablet · 500mg, 750mg, 1000mg               │ │   │
│  │ │    Generic available                                            │ │   │
│  │ ├─────────────────────────────────────────────────────────────────┤ │   │
│  │ │ 💊 **Metform**in/Glipizide                                      │ │   │
│  │ │    Combination Tablet · 250mg/2.5mg, 500mg/5mg                  │ │   │
│  │ │    ⚠️ Contains sulfonylurea                                     │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                     │   │
│  │ Also search: Brand names, NDC, therapeutic class                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Drug Search Features**:

| Feature | Purpose |
|---------|---------|
| Generic + brand names | Match "metformin" and "Glucophage" |
| NDC lookup | Exact match on National Drug Code |
| Strength variants | Show all available strengths |
| Therapeutic class | "diabetes medications" finds metformin |
| Warnings inline | Show key alerts in results |

#### Prescription Search

Find by Rx number, patient, drug, or status.

```
Search examples:
- "12345" → Finds Rx #12345
- "john smith" → All Rxs for patient
- "progesterone" → All Rxs with drug
- "pending" → All pending Rxs
- "dr williams" → All Rxs by prescriber
```

---

### Search Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Label | `aria-label="Search"` on input |
| Results | `role="listbox"` with `role="option"` items |
| Selection | `aria-selected` on highlighted item |
| Live region | Announce result count changes |
| Focus | Trap focus in dropdown when open |
| Escape | Close and restore focus to trigger |

```html
<div role="combobox" aria-expanded="true" aria-haspopup="listbox">
  <input
    type="search"
    aria-label="Search patients, prescriptions, medications"
    aria-autocomplete="list"
    aria-controls="search-results"
  />
</div>
<ul id="search-results" role="listbox" aria-label="Search results">
  <li role="option" aria-selected="true">John Smith</li>
  <li role="option" aria-selected="false">John Doe</li>
</ul>
<div aria-live="polite" class="sr-only">
  3 results found
</div>
```

---

### Modern Search Best Practices

Advanced patterns for powerful, intuitive search experiences.

---

#### Practice 1: Predictive & Proactive Suggestions

Search should work before the user finishes typing.

```
On Focus (before typing):
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search...                                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Recent Searches                                                     │   │
│  │ 🕐 john smith                                                       │   │
│  │ 🕐 progesterone 100mg                                               │   │
│  │ ─────────────────────────────────────────────────────────────────── │   │
│  │ Quick Access                                                        │   │
│  │ 📋 Pending Verifications (12)                    ← Proactive       │   │
│  │ ⚠️ Rxs Needing Attention (3)                                        │   │
│  │ 🕐 Recently Viewed Patients                                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Predictive Features**:

| Feature | Implementation |
|---------|----------------|
| Recent searches | Show last 5-10 searches on focus |
| Quick access | Shortcuts to common tasks/filtered views |
| Entity suggestions | "John Smith" suggests Patient + recent Rxs |
| Live preview | Show key details in dropdown without click |

---

#### Practice 2: Semantic Autocomplete

Suggest complete entities, not just word completions.

```
Typing "john":
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 john                                                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Patients                                                            │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ 👤 John Smith                                                   │ │   │
│  │ │    DOB: 03/15/1985 · Last Rx: 3 days ago                       │ │   │
│  │ │    ┌─────────────────────────────────────────────────────────┐ │ │   │
│  │ │    │ Recent: Progesterone 100mg (pending)                    │ │ │   │
│  │ │    │         Testosterone 50mg (dispensed Jan 10)            │ │ │   │
│  │ │    └─────────────────────────────────────────────────────────┘ │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ 👤 John Doe · DOB: 07/22/1990 · No recent Rxs                  │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
         ↑
    Live preview shows related entities inline
```

---

#### Practice 3: Federated (Unified) Results

Search across all content types from one input.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 testosterone                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  [All]  [Medications (5)]  [Prescriptions (23)]  [Patients (8)]  [Help (3)]│
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  Medications                                              [View All (5) →] │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 💊 Testosterone Cypionate · Injectable · 100mg/mL, 200mg/mL        │   │
│  │ 💊 Testosterone Topical Gel · 1%, 1.62%                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Prescriptions                                           [View All (23) →] │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📋 Rx #12345 · John Smith · Testosterone 50mg · Pending            │   │
│  │ 📋 Rx #12290 · Robert Lee · Testosterone 100mg · Dispensed         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Help Articles                                            [View All (3) →] │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📄 Testosterone Compounding Guidelines                             │   │
│  │ 📄 DEA Requirements for Testosterone                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Federated Search Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Unified ranking | Best results first regardless of type |
| Category tabs | Allow filtering to specific types |
| Counts | Show result count per category |
| View all links | Drill into full category results |
| Cross-linking | Patient result links to their Rxs |

---

#### Practice 4: Dynamic Facets (Smart Filtering)

Only show relevant filters; prevent zero-result dead ends.

```
❌ Static Facets (Zero-Result Trap)     ✓ Dynamic Facets
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ Status                      │         │ Status                      │
│ ☑ Pending                   │         │ ☑ Pending           (12)    │
│ ☐ Verified                  │         │ ☐ Verified           (8)    │
│ ☐ Compounding               │         │ ☐ Compounding        (0)    │ ← Greyed
│ ☐ Ready                     │         │ ☐ Ready              (0)    │ ← Greyed
│                             │         │                             │
│ Prescriber                  │         │ Prescriber                  │
│ ☐ Dr. Williams              │         │ ☑ Dr. Williams       (7)    │
│ ☐ Dr. Chen                  │         │ ☐ Dr. Chen           (5)    │
│ ☐ Dr. Patel                 │         │ ☐ Dr. Patel          (0)    │ ← Greyed
│                             │         │                             │
│ User selects Compounding... │         │ Can't select zero options   │
│         ↓                   │         │                             │
│ "No results found" 😢       │         │ Always has results ✓        │
└─────────────────────────────┘         └─────────────────────────────┘
```

**Dynamic Facet Rules**:

| Rule | Implementation |
|------|----------------|
| Show counts | `(12)` next to each option |
| Update on filter | Recalculate counts when filters change |
| Disable zero | Grey out or hide options with 0 results |
| Interdependent | If selecting A makes B invalid, show it |

---

#### Practice 5: Intelligent "No Results" Handling

Never leave users at a dead end.

```
Full No Results Recovery:
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 progetsreone                                                [×]  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                         ┌─────────────┐                                    │
│                         │     🔍      │                                    │
│                         └─────────────┘                                    │
│                                                                             │
│                   No results for "progetsreone"                            │
│                                                                             │
│                   Did you mean: **progesterone**?      ← Auto-correct      │
│                   [Search for "progesterone" instead]                      │
│                                                                             │
│                   ─────────────────────────                                │
│                                                                             │
│                   Popular in Medications:              ← Recommendations   │
│                   • Progesterone (Micronized)                              │
│                   • Estradiol                                               │
│                   • Testosterone                                            │
│                                                                             │
│                   ─────────────────────────                                │
│                                                                             │
│                   [Clear Search]  [Browse All Medications]                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Partial Match Recovery:
┌─────────────────────────────────────────────────────────────────────────────┐
│  Showing results for "testosterone" and "injection"                        │
│  ⚠️ No results for "waterproof"                        [Include anyway?]   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  💊 Testosterone Cypionate Injectable...                                   │
│  💊 Testosterone Enanthate Injectable...                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Search Pitfalls

Common mistakes that break search usability.

---

#### Pitfall 1: Semantic Drift (Over-Smart Search)

Modern semantic/vector search can be too smart, prioritizing "related concepts" over exact matches.

```
❌ Semantic Drift                       ✓ Hybrid Search
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ Query: "NDC 12345-6789-01"  │         │ Query: "NDC 12345-6789-01"  │
│                             │         │                             │
│ Results:                    │         │ Results:                    │
│ 1. Various medications      │         │ 1. Exact NDC match          │
│    (semantic: "medications")│         │    NDC: 12345-6789-01 ✓     │
│ 2. "Similar" NDC codes      │         │ 2. Similar NDCs (if helpful)│
│ 3. Pharmacy supplies        │         │                             │
│                             │         │                             │
│ Exact match buried or       │         │ Exact match always first    │
│ missing entirely            │         │                             │
└─────────────────────────────┘         └─────────────────────────────┘
```

**The Fix: Hybrid Search**

| Component | Purpose |
|-----------|---------|
| Keyword (BM25) | Exact matches, technical terms, codes |
| Semantic (Vector) | Meaning, synonyms, natural language |
| Weighted blend | Prioritize exact for codes, semantic for names |

**Healthcare Critical**: NDC, NPI, DEA, MRN, Rx numbers MUST exact-match first.

---

#### Pitfall 2: The "Black Box" (Unexplained Results)

AI-ranked results without context cause confusion and distrust.

```
❌ Unexplained Ranking                  ✓ Explained Results
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ Query: "medication"         │         │ Query: "medication"         │
│                             │         │                             │
│ 1. Testosterone Gel         │         │ 1. Testosterone Gel         │
│ 2. Vitamin D                │         │    "Recently viewed"        │
│ 3. Aspirin                  │         │ 2. Progesterone             │
│                             │         │    "Frequently prescribed"  │
│ Why these? Why this order?  │         │ 3. Metformin                │
│ 🤷                          │         │    "Matching 'medication'"  │
└─────────────────────────────┘         └─────────────────────────────┘
```

**Explanation Patterns**:

| Pattern | Example |
|---------|---------|
| Recency | "Recently viewed" |
| Frequency | "Frequently prescribed" |
| Match type | "Exact match on NDC" |
| Relationship | "Patient's current medications" |
| Personalization | "Based on your specialty" |

---

#### Pitfall 3: Filter Fatigue (Mobile)

Desktop filter sidebars don't work on mobile.

```
❌ Full-Screen Filter Modal             ✓ Horizontal Filter Chips
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ [×]              Filters    │         │ 🔍 Search...                │
│ ─────────────────────────── │         │ ─────────────────────────── │
│                             │         │ [All ▼] [Pending ▼] [Today ▼]
│ Status                      │         │ ─────────────────────────── │
│ ○ All                       │         │ Rx #12345 · John Smith      │
│ ○ Pending                   │         │ Rx #12344 · Mary Johnson    │
│ ○ Verified                  │         │ ...                         │
│ ○ Ready                     │         │                             │
│                             │         │ One-tap filtering without   │
│ Date Range                  │         │ leaving results             │
│ ○ Today                     │         │                             │
│ ○ This Week                 │         │                             │
│ ○ Custom...                 │         │                             │
│                             │         │                             │
│ [Apply Filters]             │         │                             │
│                             │         │                             │
│ User must scroll, apply,    │         │                             │
│ then see if results changed │         │                             │
└─────────────────────────────┘         └─────────────────────────────┘
```

**Mobile Filter Guidelines**:

| Guideline | Implementation |
|-----------|----------------|
| Chips for top 3-4 | Most-used filters as horizontal chips |
| Instant apply | Filter on tap, no "Apply" button |
| More filters | "More ▼" expands additional options |
| Results visible | Always show some results while filtering |

---

#### Pitfall 4: Ignoring "No-Click" Intent

Sometimes users just want an answer, not a results page.

```
❌ Forces Click-Through                 ✓ Instant Answers
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ 🔍 return policy            │         │ 🔍 return policy            │
│ ─────────────────────────── │         │ ─────────────────────────── │
│ Results:                    │         │ ┌─────────────────────────┐ │
│ 1. Return Policy (Help)     │         │ │ 📋 Return Policy        │ │
│ 2. Returns FAQ              │         │ │ Compounds can be        │ │
│ 3. Shipping & Returns       │         │ │ returned within 14 days │ │
│                             │         │ │ if unopened and in...   │ │
│ User must click + read      │         │ │ [Read Full Policy →]    │ │
│                             │         │ └─────────────────────────┘ │
│                             │         │                             │
│                             │         │ Answer shown instantly      │
└─────────────────────────────┘         └─────────────────────────────┘
```

**Instant Answer Candidates**:

| Query Type | Instant Answer |
|------------|----------------|
| Policy questions | Summary + link to full doc |
| Hours/contact | "Open until 6pm · (555) 123-4567" |
| Simple lookups | Drug strength, NDC, price |
| Definitions | Expand abbreviation or term |

---

#### Pitfall 5: No Search Continuity

Losing context when refining search.

```
❌ Context Lost                         ✓ Continuous Refinement
┌─────────────────────────────┐         ┌─────────────────────────────┐
│ Search 1: "testosterone"    │         │ Search 1: "testosterone"    │
│ → 50 results                │         │ → 50 results                │
│                             │         │                             │
│ User adds "50mg"            │         │ User adds "50mg"            │
│                             │         │                             │
│ Search 2: "50mg"            │         │ Search 2: "testosterone 50mg"│
│ → Shows all 50mg meds       │         │ → Refines to Testosterone   │
│    (testosterone lost!)     │         │    50mg only                │
│                             │         │                             │
│ User must retype full query │         │ Builds on previous context  │
└─────────────────────────────┘         └─────────────────────────────┘
```

**Continuous Search Features**:

| Feature | Implementation |
|---------|----------------|
| Additive refinement | New terms add to existing query |
| Filter persistence | Filters remain when query changes |
| Search history | Easy access to previous queries |
| Undo refinement | One click to revert last change |

---

### Search Patterns Checklist

```markdown
## Before Shipping Search

### Input
- [ ] Clear placeholder describing scope?
- [ ] Keyboard shortcut indicated?
- [ ] Clear button when has value?
- [ ] Loading indicator during fetch?

### Results
- [ ] Debounced (150-300ms)?
- [ ] Matching text highlighted?
- [ ] Grouped by category?
- [ ] Limited results per category?
- [ ] Recent searches shown?

### Navigation
- [ ] Full keyboard navigation?
- [ ] Arrow keys move selection?
- [ ] Enter selects item?
- [ ] Escape closes dropdown?

### Empty/Error States
- [ ] No results has suggestions?
- [ ] Error state with retry?
- [ ] Filtered-to-empty shows filter info?

### Healthcare-Specific
- [ ] Patient search requires verification?
- [ ] Drug search shows warnings?
- [ ] Rx search supports multiple identifiers?
- [ ] Search audit logged (for compliance)?

### Accessibility
- [ ] Proper ARIA roles?
- [ ] Results announced to screen reader?
- [ ] Focus management correct?
```

---

## Data Visualization

Data visualization in healthcare requires precision, clarity, and accessibility. Charts must communicate clinical data accurately—misinterpretation can affect patient care.

### Principles

| Principle | Description | Healthcare Application |
|-----------|-------------|------------------------|
| **Accuracy** | Data representation must be truthful | No truncated axes that exaggerate trends |
| **Clarity** | Meaning should be immediately apparent | Clear labels, obvious clinical thresholds |
| **Accessibility** | Usable by all, including colorblind users | Patterns + colors, not color alone |
| **Context** | Data needs reference points | Show normal ranges, historical comparisons |
| **Actionability** | Visualizations should prompt decisions | Highlight anomalies, not just display data |

---

### Chart Types

#### When to Use Each Chart

| Chart Type | Use For | Don't Use For |
|------------|---------|---------------|
| **Line Chart** | Trends over time, continuous data | Categorical comparisons |
| **Bar Chart** | Comparing categories, discrete values | Continuous trends |
| **Horizontal Bar** | Long category labels, rankings | Time-based data |
| **Stacked Bar** | Part-to-whole within categories | Precise value comparison |
| **Area Chart** | Volume over time, cumulative totals | Comparing multiple series |
| **Pie/Donut** | Part-of-whole (2-5 segments max) | Comparing values, many segments |
| **Scatter Plot** | Correlation between variables | Time series, categories |
| **Heatmap** | Patterns in matrix data | Precise values |
| **Gauge** | Single KPI vs target | Multiple values |
| **Sparkline** | Inline trend indication | Detailed analysis |

#### Healthcare-Specific Charts

| Chart Type | Use Case |
|------------|----------|
| **Reference Range Chart** | Lab values with normal/abnormal zones |
| **Timeline** | Patient medication history, events |
| **Funnel** | Prescription workflow stages |
| **Calendar Heatmap** | Adherence tracking, activity patterns |
| **Bullet Chart** | KPIs against targets |

---

### Chart Anatomy

```
┌─────────────────────────────────────────────────────────────────────┐
│  Prescriptions Filled by Month                            [⋮] [↓]  │ ← Title + Actions
│  January - December 2024                                            │ ← Subtitle
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  600 ┤                                         ╭─────╮              │ ← Y-axis label
│      │                              ╭──────────╯     │              │
│  400 ┤                    ╭─────────╯                ╰──────        │ ← Grid lines
│      │          ╭─────────╯                                         │
│  200 ┤──────────╯                                                   │
│      │                                                              │
│    0 ┼────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────  │
│      Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec    │ ← X-axis labels
│                                                                     │
│  ● Filled  ○ Target  ─ ─ Projected                                 │ ← Legend
└─────────────────────────────────────────────────────────────────────┘
```

#### Chart Components

| Component | Specification |
|-----------|---------------|
| **Title** | 16px, font-weight 600, `gray-900` |
| **Subtitle** | 14px, font-weight 400, `gray-500` |
| **Axis labels** | 12px, `gray-600` |
| **Axis titles** | 12px, font-weight 500, `gray-700` |
| **Grid lines** | 1px, `gray-100` |
| **Data labels** | 11px, `gray-700` |
| **Legend** | 12px, `gray-600`, icon 12px |
| **Tooltip** | 12px, `gray-900` on white, shadow-lg |

---

### Color in Charts

#### Sequential Palette (Single Metric)

For data that progresses from low to high:

```
Low ─────────────────────────────────────────────► High

primary-100 → primary-200 → primary-400 → primary-600 → primary-800
```

| Token | Hex | Usage |
|-------|-----|-------|
| `--chart-seq-1` | `primary-100` | Lowest values |
| `--chart-seq-2` | `primary-200` | Low values |
| `--chart-seq-3` | `primary-400` | Medium values |
| `--chart-seq-4` | `primary-600` | High values |
| `--chart-seq-5` | `primary-800` | Highest values |

#### Diverging Palette (Positive/Negative)

For data with a meaningful midpoint:

```
Negative ◄──────────────── Neutral ────────────────► Positive

red-500 → red-200 → gray-100 → green-200 → green-500
```

| Token | Hex | Usage |
|-------|-----|-------|
| `--chart-div-neg-2` | `red-500` | Strong negative |
| `--chart-div-neg-1` | `red-200` | Slight negative |
| `--chart-div-neutral` | `gray-100` | Neutral/zero |
| `--chart-div-pos-1` | `green-200` | Slight positive |
| `--chart-div-pos-2` | `green-500` | Strong positive |

#### Categorical Palette

For comparing distinct categories (colorblind-safe):

```
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  1  │ │  2  │ │  3  │ │  4  │ │  5  │ │  6  │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
 Blue   Orange  Teal    Purple  Yellow   Gray
```

| Order | Token | Hex | Colorblind Safe |
|-------|-------|-----|-----------------|
| 1 | `--chart-cat-1` | `#2563EB` (blue) | ✓ |
| 2 | `--chart-cat-2` | `#EA580C` (orange) | ✓ |
| 3 | `--chart-cat-3` | `#0D9488` (teal) | ✓ |
| 4 | `--chart-cat-4` | `#7C3AED` (purple) | ✓ |
| 5 | `--chart-cat-5` | `#CA8A04` (yellow) | ✓ |
| 6 | `--chart-cat-6` | `#6B7280` (gray) | ✓ |

**Rule**: Maximum 6 categories. Beyond 6, use grouping or different visualization.

#### Semantic Colors in Charts

| Meaning | Color | Token | Usage |
|---------|-------|-------|-------|
| **Success/Good** | Green | `--chart-success` | Targets met, healthy ranges |
| **Warning/Caution** | Yellow/Orange | `--chart-warning` | Approaching limits |
| **Error/Critical** | Red | `--chart-error` | Out of range, failures |
| **Neutral/Baseline** | Gray | `--chart-neutral` | Comparison baselines |
| **Target/Goal** | Dashed line | `--chart-target` | Performance targets |

---

### Accessibility in Charts

#### Color Independence

Never use color alone to convey meaning:

```
BAD: Only color differentiates series
────────────────────────  (blue line - what does it mean?)
────────────────────────  (red line - is this bad?)

GOOD: Color + pattern + label
●───●───●───●───●───●───  Filled (blue, solid, circles)
○╌╌╌○╌╌╌○╌╌╌○╌╌╌○╌╌╌○╌╌╌  Target (orange, dashed, hollow)
■━━━■━━━■━━━■━━━■━━━■━━━  Projected (teal, thick, squares)
```

#### Pattern Library

| Pattern | Use With | Example |
|---------|----------|---------|
| Solid line | Primary data series | ─────── |
| Dashed line | Targets, projections | ─ ─ ─ ─ |
| Dotted line | Thresholds, limits | ······· |
| Solid fill | Primary bars/areas | ████ |
| Hatched fill | Secondary comparison | ╱╱╱╱ |
| Dotted fill | Projected/estimated | ░░░░ |

#### Screen Reader Support

```typescript
// Chart accessibility requirements
const chartA11y = {
  // Always provide text alternative
  ariaLabel: "Bar chart showing prescription volume by month",

  // Describe the data
  ariaDescription: "Prescriptions increased from 150 in January to 450 in December, with peak of 520 in October",

  // Data table alternative
  dataTable: true, // Provide accessible data table view

  // Keyboard navigation
  keyboardNav: true, // Arrow keys navigate data points
};
```

**Accessibility Checklist:**
- [ ] Text alternative describes chart purpose and key insights
- [ ] Data available in table format
- [ ] Colors have 3:1 contrast with background
- [ ] Patterns distinguish series, not just color
- [ ] Interactive elements keyboard accessible
- [ ] Tooltips announced to screen readers

---

### Clinical Reference Ranges

For lab values and clinical metrics, always show reference ranges:

```
                           Patient Value
                                ↓
  ├─────────────┬─────────────────────────┬─────────────┤
  │    LOW      │         NORMAL          │    HIGH     │
  │   <70       │        70 - 100         │    >100     │
  │   (red)     │        (green)          │   (red)     │
  ├─────────────┼────────────●────────────┼─────────────┤
                             85
                        "Within normal range"
```

#### Reference Range Chart Specifications

| Element | Specification |
|---------|---------------|
| Low zone | `red-100` background, `red-500` border |
| Normal zone | `green-100` background, `green-500` border |
| High zone | `red-100` background, `red-500` border |
| Patient marker | `gray-900`, 12px circle |
| Zone labels | 11px, inside zone, `{color}-700` |
| Value label | 14px, font-weight 600, below marker |

#### Multi-Value Reference Display

```
┌─────────────────────────────────────────────────────────────────┐
│ Lab Results - January 15, 2024                                  │
├─────────────────────────────────────────────────────────────────┤
│ Glucose         │████████████●──────│  85 mg/dL    [Normal]    │
│                 │    70      ↑  100 │                          │
│                              85                                 │
├─────────────────────────────────────────────────────────────────┤
│ Cholesterol     │──────────────────●│  220 mg/dL   [HIGH]      │
│                 │   0        200  ↑ │              ⚠           │
│                                  220                            │
├─────────────────────────────────────────────────────────────────┤
│ Blood Pressure  │────────●─────────│  125/82 mmHg [Normal]     │
│                 │   90   ↑    140  │                           │
│                         125                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

### Dashboard Layouts

#### Single KPI Card

```
┌─────────────────────────────────────┐
│ Prescriptions Today                 │
│                                     │
│         247                         │  ← Primary metric (32px, bold)
│       ▲ 12% vs yesterday            │  ← Comparison (14px, green/red)
│                                     │
│  ───────────────────────            │  ← Sparkline (optional)
└─────────────────────────────────────┘
```

| Element | Specification |
|---------|---------------|
| Card padding | 20px |
| Title | 14px, `gray-600` |
| Metric | 32px, font-weight 700, `gray-900` |
| Comparison | 14px, `green-600` (up) / `red-600` (down) |
| Sparkline height | 32px |

#### KPI with Gauge

```
┌─────────────────────────────────────┐
│ Verification Rate                   │
│                                     │
│           ╭─────────╮               │
│         ╱     95%    ╲              │  ← Gauge
│        │      ●       │             │
│         ╲   Target:  ╱              │
│           ╰──90%───╯                │
│                                     │
│  ✓ Above target                     │
└─────────────────────────────────────┘
```

#### Trend Card

```
┌─────────────────────────────────────┐
│ Weekly Volume            [▾ Week]   │
│                                     │
│  450│        ╭──╮                   │
│     │    ╭───╯  ╰──╮                │
│  300│────╯         ╰────            │
│     │                               │
│  150│                               │
│     └─────────────────────────      │
│      Mon Tue Wed Thu Fri Sat Sun    │
│                                     │
│  Total: 2,847    Avg: 407/day       │
└─────────────────────────────────────┘
```

---

### Healthcare Dashboard Patterns

#### Queue Status Board

```
┌─────────────────────────────────────────────────────────────────┐
│ Verification Queue                                    Live ●    │
├───────────────┬───────────────┬───────────────┬─────────────────┤
│   Pending     │  In Progress  │   Completed   │    On Hold      │
│               │               │               │                 │
│     12        │       3       │      45       │       2         │
│   ▲ 4         │               │   ▲ 8 today   │                 │
│               │               │               │                 │
│  [████████]   │    [███]      │   [██████]    │     [██]        │
│   Oldest: 2h  │  Avg: 15min   │  Avg: 12min   │  Review needed  │
└───────────────┴───────────────┴───────────────┴─────────────────┘
```

#### Inventory Status

```
┌─────────────────────────────────────────────────────────────────┐
│ Inventory Alerts                                    [View All]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░  Progesterone USP    65%      │
│  ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░  Testosterone Cyp    28% ⚠    │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  DHEA               95%       │
│  ▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░  Estradiol           12% ⛔    │
│                                                                 │
│  ─────────────────────────────                                  │
│  Threshold  ↑                                                   │
│            25%                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Expiration Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│ Upcoming Expirations                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Today    │    This Week    │    This Month    │    Later       │
│           │                 │                  │                │
│    ⛔ 2   │      ⚠ 8        │       12         │      45        │
│           │                 │                  │                │
│  ──●──────┼────●────────────┼──────●───────────┼───────●──────  │
│    ↑      │    ↑            │      ↑           │       ↑        │
│  URGENT   │  ACTION         │   MONITOR        │    NORMAL      │
│           │  NEEDED         │                  │                │
└─────────────────────────────────────────────────────────────────┘
```

---

### Interaction Patterns

#### Tooltips

```
                    ┌─────────────────────────┐
                    │ October 2024            │
                    │ ────────────────────    │
                    │ Filled:     523         │
                    │ Target:     500  ✓      │
                    │ vs Last Year: +12%      │
                    └────────────┬────────────┘
                                 │
                         ────────●────────
                              (hover point)
```

| Property | Value |
|----------|-------|
| Background | `white` |
| Border | `1px solid gray-200` |
| Shadow | `shadow-lg` |
| Padding | 12px 16px |
| Border radius | 8px |
| Title | 14px, font-weight 600 |
| Values | 13px, tabular-nums |
| Max width | 240px |

#### Legend Interactions

```
Active legend (all visible):
● Filled   ● Target   ● Projected
                 ↓
            (click Target)
                 ↓
Filtered legend (Target hidden):
● Filled   ○ Target   ● Projected
           (dimmed)
```

#### Zoom & Pan

```
Full dataset:
├──────────────────────────────────────────────────────────────┤
Jan                                                          Dec

Zoomed selection:
                    ┌──────────────────┐
                    │   Selected Area  │
├──────────────────┼──────────────────┼───────────────────────┤
                  Jul               Sep

Controls: [−] [Reset] [+]   or   Click + Drag to zoom
```

#### Drill-Down

```
Level 1: Monthly overview
┌─────────────────────────────────────────────────────────────┐
│  ████  ████  ████  ████  ████  ████                        │
│  Jan   Feb   Mar   Apr   May   Jun                         │
└─────────────────────────────────────────────────────────────┘
                    ↓ Click March

Level 2: Daily breakdown for March
┌─────────────────────────────────────────────────────────────┐
│  ▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌ │
│  1  2  3  4  5  6  7  8  9 ... 28 29 30 31                 │
│                                                             │
│  [← Back to Monthly]                                        │
└─────────────────────────────────────────────────────────────┘
```

---

### Empty & Error States

#### No Data

```
┌─────────────────────────────────────────────────────────────┐
│ Prescription Volume                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                       📊                                    │
│                                                             │
│              No data for this period                        │
│                                                             │
│         Try adjusting the date range or filters             │
│                                                             │
│                   [Adjust Filters]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Loading State

```
┌─────────────────────────────────────────────────────────────┐
│ Prescription Volume                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│                      Loading...                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Error State

```
┌─────────────────────────────────────────────────────────────┐
│ Prescription Volume                                    [↻]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                       ⚠️                                    │
│                                                             │
│              Unable to load chart data                      │
│                                                             │
│         Check your connection and try again                 │
│                                                             │
│                      [Retry]                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Responsive Behavior

| Breakpoint | Adaptation |
|------------|------------|
| Desktop (1024px+) | Full chart with all features |
| Tablet (768-1024px) | Reduce data points, simplify legend |
| Mobile (<768px) | Simplified view or data table fallback |

#### Mobile Adaptations

```
Desktop:                              Mobile:
┌─────────────────────────────────┐   ┌─────────────────┐
│ Full chart with hover tooltips  │   │ KPI Card only   │
│ Legend below                    │   │                 │
│ All data points                 │   │     247         │
│ Zoom controls                   │   │   ▲ 12%         │
└─────────────────────────────────┘   │                 │
                                      │ [View Details]  │
                                      └─────────────────┘
```

---

### Recommended Libraries

| Library | Use Case | Notes |
|---------|----------|-------|
| **Recharts** | General charting | React-native, composable |
| **Visx** | Custom visualizations | Low-level, flexible |
| **Nivo** | Dashboard charts | Beautiful defaults |
| **React-chartjs-2** | Familiar API | Chart.js wrapper |
| **Tremor** | Dashboard components | Tailwind-based, opinionated |

#### Integration Example

```typescript
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PrescriptionChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis
        dataKey="month"
        tick={{ fontSize: 12, fill: 'var(--color-gray-600)' }}
        axisLine={{ stroke: 'var(--color-gray-200)' }}
      />
      <YAxis
        tick={{ fontSize: 12, fill: 'var(--color-gray-600)' }}
        axisLine={{ stroke: 'var(--color-gray-200)' }}
      />
      <Tooltip
        contentStyle={{
          borderRadius: 8,
          border: '1px solid var(--color-gray-200)',
          boxShadow: 'var(--shadow-lg)'
        }}
      />
      <Line
        type="monotone"
        dataKey="filled"
        stroke="var(--chart-cat-1)"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
      <Line
        type="monotone"
        dataKey="target"
        stroke="var(--chart-cat-2)"
        strokeWidth={2}
        strokeDasharray="5 5"
      />
    </LineChart>
  </ResponsiveContainer>
);
```

---

### Data Visualization Pitfalls

These are the "cardinal sins" of data visualization. In healthcare, misleading charts can lead to incorrect clinical decisions.

#### Pitfall 1: Misleading Scales and Axes

**Truncated Y-Axes**

```
MISLEADING:                           ACCURATE:
Revenue ($K)                          Revenue ($K)

98 ┤      ████                        100 ┤      ████
   │      ████                            │      ████
96 ┤████  ████                         75 ┤      ████
   │████  ████                            │      ████
94 ┤████  ████                         50 ┤████  ████
   └──────────                            │████  ████
    Q1    Q2                           25 ┤████  ████
                                          │████  ████
"Q2 doubled Q1!"                        0 ┤████  ████
(Actually: 2% increase)                   └──────────
                                           Q1    Q2
                                      "Q2 slightly higher"
                                      (Accurate: 2% increase)
```

| Violation | Why It's Wrong | Healthcare Impact |
|-----------|----------------|-------------------|
| Y-axis not starting at 0 | Exaggerates small differences | Minor improvement looks like breakthrough |
| Inconsistent intervals | Hides gaps or compresses data | Missing data periods hidden |
| Dual Y-axes | Suggests false correlations | Unrelated metrics appear connected |

**Rule**: Bar charts MUST start at 0. Line charts MAY start elsewhere if clearly labeled.

**Inconsistent Time Intervals**

```
MISLEADING:                           ACCURATE:
│                    ●                │               ?  ?  ?  ●
│              ●                      │         ●
│        ●                            │   ●     ║  MISSING
│  ●                                  │         ║   DATA
└────────────────────                 └─────────╨──────────────
 2020  2021  2022  2025               2020 2021 2022 2023 2024 2025

 (Gap from 2022-2025 hidden)          (Gap clearly shown)
```

**Dual Axis Deception**

```
MISLEADING:
│ Prescriptions              Errors │
│        ●───────●──────●           │
│       ╱         ╲                 │
│  ●───●           ●───●            │
│                       ╲           │
│                        ●          │
└───────────────────────────────────
  "Errors correlate with prescriptions!"

  (Left axis: 100-500, Right axis: 0-10)
  (Completely different scales make unrelated data look correlated)
```

---

#### Pitfall 2: Chart Junk

Visual clutter that obscures rather than clarifies.

**3D Effects**

```
BAD (3D Pie):                        GOOD (Flat Bar):

      ╭────────╮                      Product A  ████████████ 40%
    ╱    40%    ╲                     Product B  █████████ 35%
   │             │                    Product C  ████ 15%
    ╲    35%    ╱                     Product D  ██ 10%
      ╰────────╯
     ╱╱ 15% ╲╲                        (Easy to compare)
    ╱╱  10%  ╲╲

(Which slice is bigger? Impossible to tell)
```

| Chart Junk | Problem | Fix |
|------------|---------|-----|
| 3D effects | Distorts proportions | Use flat 2D charts |
| Excessive gridlines | Visual noise | Use subtle or no gridlines |
| Rainbow colors | Distracting, no hierarchy | Use sequential or limited palette |
| Decorative icons | Clutters data area | Keep data area clean |
| Shadows/gradients | Obscures values | Use solid colors |
| Busy backgrounds | Reduces contrast | White or light gray only |

**Gridline Overload**

```
BAD:                                  GOOD:
┼──┼──┼──┼──┼──┼──┼──┼               │
├──┼──┼──┼──●─┼──┼──┼               │           ●
├──┼──●─┼──┼──┼──┼──┼               │     ●
├──┼──┼──┼──┼──┼──┼──┼       vs     ├─────────────── 50
├──●─┼──┼──┼──┼──┼──┼               │  ●
├──┼──┼──┼──┼──┼──┼──┼               │
└──┴──┴──┴──┴──┴──┴──┴               └────────────────
(Where's the data?)                   (Data is clear)
```

---

#### Pitfall 3: Wrong Chart Type

| Mistake | Why It Fails | Better Alternative |
|---------|--------------|-------------------|
| Pie chart with 8+ slices | Can't compare thin slivers | Horizontal bar chart |
| Pie chart comparing values | Angles are hard to judge | Bar chart |
| Line chart for categories | Implies connection/trend | Bar chart |
| Bar chart for 50+ time points | Too cluttered | Line chart |
| Area chart for comparison | Overlapping obscures data | Multiple line charts |
| Donut chart for precision | Center hole wastes space | Bar chart |

**Pie Chart Failure**

```
BAD (Too many slices):               GOOD (Bar chart):

    ╭─────╮                          Category A  ████████████████ 32%
   ╱ 32%   ╲                         Category B  ████████████ 24%
  │    24%  │                        Category C  ██████████ 18%
   ╲ 18%   ╱                         Category D  ████████ 14%
    │8%│5%│                          Category E  ████ 8%
    │3%│                             Other       ██ 4%

(Impossible to read small slices)    (All values clear)
```

**Line Chart Misuse**

```
BAD (Categories on line):            GOOD (Bar chart):

Sales │        ●                     Sales
      │      ╱   ╲
      │    ╱       ╲                 Laptop  ████████████
      │  ●           ●               Phone   ████████████████
      │                              Tablet  ████████
      └────────────────              Watch   ██████
       Laptop Phone Tablet Watch

(Implies Laptop→Phone is a trend)   (Categories are independent)
```

---

#### Pitfall 4: Lack of Context

Data without context is meaningless—or worse, misleading.

**Missing Baseline**

```
BAD:                                 GOOD:
"Our error rate dropped 10%!"        "Our error rate dropped to 5%"

│  ████                              │  ████  ████████████████
│  ████                              │  ████  ████████████████
│  ████                              │  ████  Industry avg: 15%
│  ████  ████                        │  ████  ████
│  ████  ████                        │  ████  ████  Target: 3%
└────────────                        └────────────
  Before After                         Us    Industry  Target

(10% of what? Is 5% good or bad?)    (Clear context: we're better than avg)
```

**Correlation ≠ Causation**

```
DANGEROUS:
│ Ice Cream Sales    Shark Attacks │
│        ●───────●──────●          │
│       ╱         ╲                │
│  ●───●           ●───●           │
└──────────────────────────────────
  Jan  Mar  May  Jul  Sep  Nov

"Ice cream causes shark attacks!" ← WRONG
(Both correlate with summer/warm weather)
```

**Healthcare Example**

```
MISLEADING:                          ACCURATE:
"Prescription errors up 50%!"        "Errors increased from 2 to 3 per 1000"

│      ████                          │  ████████████████ Industry: 8/1000
│      ████                          │  ███ Our rate: 3/1000
│  ████████                          │  ██  Previous: 2/1000
│  ████████                          │  █   Target: 1/1000
└──────────                          └────────────────────
  2023  2024                           Context shows we're still excellent
```

**Required Context Elements**

| Element | Purpose | Example |
|---------|---------|---------|
| Baseline/benchmark | Shows relative performance | "Industry avg: 15%" |
| Time period | Defines scope | "Q4 2024" |
| Sample size | Indicates reliability | "n=1,247 prescriptions" |
| Units | Prevents misinterpretation | "per 1,000 patients" |
| Source | Establishes credibility | "Data: Internal QA system" |

---

#### Pitfall 5: Over-Aggregating Data

Averages hide important patterns. In healthcare, outliers can be the most critical data points.

**Hidden Bimodal Distribution**

```
MISLEADING (Average only):           REVEALING (Distribution):

"Average patient satisfaction: 3/5"  │  ████                    ████
                                     │  ████                    ████
      ████                           │  ████                    ████
      ████                           │  ████  ██          ██    ████
      ████                           │  ████  ██    ██    ██    ████
──────████──────                     └────────────────────────────────
  Average = 3                           1    2    3    4    5

(Looks fine!)                        (Half love us, half hate us!)
```

**Hidden Outliers**

```
MISLEADING:                          REVEALING:
"Avg prescription fill time: 15min"
                                     │                              ●
      ████                           │                              ●
      ████                           │  ●  ●  ●  ●  ●              outliers
──────████──────                     │  ●  ●  ●  ●  ●  ●  ●  ●
  Average = 15min                    └────────────────────────────────
                                       10 12 14 16 18 20   ...   45min

(Looks consistent)                   (Some patients wait 45+ min!)
```

**What to Show Instead**

| Instead of | Show | Why |
|------------|------|-----|
| Just the mean | Mean + median + range | Reveals skew |
| Single number | Distribution/histogram | Shows spread |
| Average only | Percentiles (P50, P90, P99) | Highlights outliers |
| Aggregated total | Breakdown by segment | Reveals patterns |

---

#### Pitfall 6: Healthcare-Specific Dangers

| Pitfall | Healthcare Risk | Prevention |
|---------|-----------------|------------|
| Truncated axes on lab values | Normal range looks abnormal | Always show full reference range |
| Averaged patient outcomes | Masks subgroup disparities | Break down by demographics |
| Trend lines on small samples | False confidence in patterns | Show confidence intervals |
| Cumulative charts for rates | Hides recent changes | Use period-over-period |
| Color-only status | Colorblind staff miss alerts | Add text/icons |

---

#### Pitfall 7: "Vibe-Coded" Style Over Substance

Modern design trends can sabotage data clarity. These pitfalls prioritize aesthetics over accuracy.

**The Low-Contrast Aesthetic**

```
BAD (Zen but unreadable):            GOOD (Clear hierarchy):

│  ░░░░░░░░░░░░░░                    │  ████████████████  Revenue
│  ░░░░░░░░░░                        │  ████████████      Expenses
│  ░░░░░░░                           │  ████████
│  ░░░░                              │  ████
└──────────────────                  └──────────────────
  (Light gray on white)                (High contrast data,
   Can't distinguish lines)             muted gridlines)

WCAG requires 3:1 contrast minimum for graphical elements
```

| Problem | "Vibe" Justification | Reality |
|---------|---------------------|---------|
| Gray text on white | "Sophisticated" | Unreadable for many users |
| Pastels on beige | "Warm, organic" | Data points blend together |
| Thin hairline bars | "Elegant" | Can't see values |
| Muted everything | "Non-aggressive" | No visual hierarchy |

**The Fix**: High contrast for data, muted tones for background elements only.

---

**The Minimalist Missing Label**

```
BAD:                                 GOOD:

│           ╭──╮                     Sales peaked in Q3 at $4.2M
│      ╭────╯  ╰──╮                  │           ╭──╮ $4.2M
│  ────╯          ╰────              │      ╭────╯  ╰──╮
│                                    │  ────╯          ╰────
└──────────────────────              └──────────────────────
                                       Q1   Q2   Q3   Q4
(What is this? A squiggle?)          (Context via "active title")
```

| What's Missing | Why It Matters |
|----------------|----------------|
| Y-axis label | "Is this dollars? Percentages? Units?" |
| X-axis label | "Is this days? Months? Years?" |
| Legend | "Which line is which?" |
| Data labels | "What's the actual value?" |

**The Fix**: Use "active titles" that explain the takeaway. Replace "Q3 Sales" with "Sales peaked in Q3 at $4.2M."

---

**The Curvy Line (Spline Interpolation)**

```
MISLEADING (Smooth):                 ACCURATE (Straight):

│           ╭──╮                     │           ●
│      ╭────╯  ╰──╮                  │      ●───╱╲───●
│  ────╯          ╰────              │  ●──╱       ╲──●
│                                    │
└──────────────────────              └──────────────────────

Smooth curve suggests dip at         Straight lines show
end of Q2 that never happened.       actual data points only.
Fake data points are interpolated.
```

| "Vibe" Choice | Problem | Healthcare Risk |
|---------------|---------|-----------------|
| Smooth bezier curves | Creates phantom data points | Suggests trends that don't exist |
| "Organic" flowing lines | Implies precision between samples | Lab values appear continuous |
| Spline interpolation | Exaggerates or hides peaks/valleys | Missed critical changes |

**The Fix**: Straight lines between data points. Jagged data means jagged reality.

---

**The Over-Rounded Bar Chart**

```
MISLEADING:                          ACCURATE:

│    ╭───╮                           │    ████
│    │   │    ╭───╮                  │    ████      ████
│    │   │    │   │    ╭───╮         │    ████      ████      ████
│    │   │    │   │    │   │         │    ████      ████      ████
└────╰───╯────╰───╯────╰───╯         └────────────────────────────

Capsule bars: Where does            Flat-top bars: Value is
the value actually end?             unambiguous at 100, 75, 50
```

| Rounding | Problem |
|----------|---------|
| Fully rounded (capsule) | Adds ~10-15% visual height |
| Large radius | Ambiguous endpoint |
| Inconsistent rounding | Different visual exaggeration per bar |

**The Fix**: Maximum 4px border-radius on bars. Keep tops flat.

```css
/* Bar chart styling */
.bar {
  border-radius: 4px 4px 0 0; /* Slight rounding, flat top */
}

/* NOT this */
.bar-vibed {
  border-radius: 9999px; /* Capsule = misleading */
}
```

---

**The Bubble Trap**

```
BAD (Area comparison):               GOOD (Length comparison):

    ◯           ○                    Product A  ████████████████ 100
         ●                           Product B  ████████████ 75
              ◉                      Product C  ████████ 50
                                     Product D  ████ 25

Is the big circle 2x or 4x          Bar length is instantly
the small one? (It's 4x, but        comparable and accurate.
looks like 2x due to area)
```

| Why Bubbles Fail | Explanation |
|------------------|-------------|
| Area vs. radius confusion | 2× radius = 4× area |
| Human perception | We underestimate area differences |
| No baseline | Circles float, bars anchor to axis |
| Overlap issues | Dense data becomes unreadable |

**When Bubbles ARE Okay:**
- Scatter plots with a third variable (x, y, size)
- Geographic maps (city population)
- When relative size matters more than precision

**The Fix**: Default to bar charts. Bubbles are a last resort.

---

**Vibe vs. Clarity Summary**

| "Vibed" Choice | Looks Like | Actually Is |
|----------------|------------|-------------|
| Low contrast | Sophisticated | Inaccessible |
| No labels | Minimalist | Meaningless |
| Smooth curves | Modern | Fake data |
| Rounded bars | Friendly | Inaccurate |
| Bubble clouds | Creative | Unreadable |
| Thin lines | Elegant | Invisible |
| Pastel palette | Calming | Indistinguishable |

**The Rule**: In healthcare, clarity beats aesthetics every time. A "boring" chart that's instantly understood is infinitely better than a beautiful chart that misleads.

---

#### Data Visualization Pitfall Checklist

```markdown
## Avoiding Chart Crimes

### Axes & Scales
- [ ] Bar chart Y-axis starts at 0
- [ ] Time intervals are consistent (or gaps clearly marked)
- [ ] No dual Y-axes (or clearly explained if necessary)
- [ ] Scale appropriate for data range

### Chart Type
- [ ] Pie charts have ≤5 slices
- [ ] Line charts show continuous/time data only
- [ ] Bar charts for categorical comparisons
- [ ] Chart type matches data relationship
- [ ] No bubble charts for simple comparisons

### Visual Clarity
- [ ] No 3D effects
- [ ] Minimal gridlines
- [ ] Limited color palette (≤6 colors)
- [ ] No decorative elements in data area
- [ ] Data labels readable without clutter

### Context
- [ ] Baseline/benchmark provided
- [ ] Time period clearly stated
- [ ] Sample size disclosed
- [ ] Units labeled on all axes
- [ ] Source credited
- [ ] "Active title" explains the takeaway

### Aggregation
- [ ] Distributions shown, not just averages
- [ ] Outliers visible (or explicitly noted as excluded)
- [ ] Subgroups analyzed where relevant
- [ ] Confidence intervals for small samples

### Anti-Vibe Checks
- [ ] Data colors have 3:1+ contrast with background
- [ ] All axes have labels (not removed for "minimalism")
- [ ] Line charts use straight segments (no spline smoothing)
- [ ] Bar chart tops are flat (≤4px border-radius)
- [ ] No "capsule" fully-rounded bars
- [ ] Legend is present and readable
- [ ] No thin hairline elements for critical data
```

---

### Data Visualization Checklist

```markdown
## Before Shipping a Chart

### Data Integrity
- [ ] Axes start at appropriate values (0 for bar charts)
- [ ] Scale is consistent and not misleading
- [ ] Data is accurate and up-to-date
- [ ] Units are clearly labeled

### Accessibility
- [ ] Color is not the only differentiator
- [ ] Patterns or shapes distinguish series
- [ ] Text alternative describes key insights
- [ ] Data table available as alternative view
- [ ] Sufficient color contrast (3:1 minimum)

### Clinical Context
- [ ] Reference ranges shown where applicable
- [ ] Thresholds and targets clearly marked
- [ ] Anomalies highlighted appropriately
- [ ] Time ranges contextually appropriate

### Usability
- [ ] Chart type matches data type
- [ ] Legend is clear and positioned well
- [ ] Tooltips provide useful detail
- [ ] Responsive behavior defined
- [ ] Empty/loading/error states handled

### Performance
- [ ] Large datasets are sampled or aggregated
- [ ] Charts don't block page rendering
- [ ] Animations are subtle and purposeful
```

---

## Healthcare-Specific Patterns

### Patient Identification Banner

Always visible when viewing patient data:

```
┌─────────────────────────────────────────────────────────────────┐
│ [Avatar] John Smith          DOB: 01/15/1980 (44y)    MRN: 12345│
│          Allergies: Penicillin, Sulfa                           │
└─────────────────────────────────────────────────────────────────┘
     Background: white
     Border-bottom: 2px solid gray-200
     Allergy text: red-600, font-weight: 600
     Sticky: top of viewport when scrolling
```

### Allergy Display

| Severity | Visual Treatment |
|----------|------------------|
| Severe/Life-threatening | Red background, bold text, prominent icon |
| Moderate | Orange background, standard weight |
| Mild | Yellow background, standard weight |
| Unknown severity | Red background (assume worst) |

```
┌─────────────────────────────────────┐
│ ⚠ ALLERGY: Penicillin              │
│   Reaction: Anaphylaxis            │
│   Severity: Life-threatening       │
└─────────────────────────────────────┘
     Background: red-100
     Border: 2px solid red-300
     Icon: AlertTriangle, red-600
     Text: red-800
```

### Prescription Status Indicators

| Status | Color | Icon | Badge Style |
|--------|-------|------|-------------|
| New | Blue | `Plus` | Solid blue |
| Pending Review | Yellow | `Clock` | Solid yellow |
| In Progress | Blue | `RefreshCw` | Outlined blue |
| Ready for Verification | Purple | `Eye` | Solid purple |
| Verified | Green | `CheckCircle` | Solid green |
| Dispensed | Gray | `Package` | Solid gray |
| On Hold | Orange | `Pause` | Solid orange |
| Cancelled | Red | `XCircle` | Outlined red |
| Expired | Gray | `Calendar` | Outlined gray |

### Controlled Substance Indicators

```
┌─────────────────────────────────────┐
│ 🛡 Schedule II                       │
│    DEA Required                      │
└─────────────────────────────────────┘
     Background: purple-100
     Border: 1px solid purple-300
     Icon: Shield, purple-600
     Text: purple-800
```

| Schedule | Color Intensity | Additional Requirements |
|----------|-----------------|------------------------|
| C-II | Purple 600 | Hard-stop verification |
| C-III | Purple 500 | Verification required |
| C-IV | Purple 400 | Verification required |
| C-V | Purple 300 | Standard workflow |

### Drug Interaction Warnings

| Severity | Treatment | Workflow Impact |
|----------|-----------|-----------------|
| Contraindicated | Red modal, requires override reason | Hard stop |
| Severe | Orange banner, prominent display | Soft stop with acknowledgment |
| Moderate | Yellow inline warning | Informational |
| Minor | Gray inline note | Informational |

### Quantity/Measurement Display

Always use monospace for measurements:

```
Quantity: 120 capsules
Strength: 500 mg
Volume: 240 mL
Days Supply: 30 days
```

Use visual hierarchy for compound formulas:

```
┌─────────────────────────────────────────────────┐
│ Progesterone 100mg/mL Suspension                │
├─────────────────────────────────────────────────┤
│ Ingredient          Quantity      Per mL        │
│ ─────────────────────────────────────────────── │
│ Progesterone USP    10,000 mg     100 mg        │
│ OraPlus             50 mL         0.5 mL        │
│ OraSweet            50 mL         0.5 mL        │
├─────────────────────────────────────────────────┤
│ Final Volume: 100 mL                            │
└─────────────────────────────────────────────────┘
```

### Verification Signatures

```
┌─────────────────────────────────────┐
│ ✓ Verified by: Dr. Jane Smith, RPh  │
│   2024-01-15 14:32:45 EST           │
│   License: RPH-123456               │
└─────────────────────────────────────┘
     Background: green-50
     Border-left: 4px solid green-500
     Checkmark: green-600
```

---

## Print Styles

Pharmacy operations require printed materials: prescription labels, patient reports, shipping documents, and audit records. Print styles must be precise, legible, and compliant with regulatory requirements.

### Print Principles

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Legibility** | Must be readable at small sizes | Minimum 8pt for labels, 10pt for documents |
| **Precision** | Critical data must be exact | No truncation of NDCs, quantities, patient names |
| **Compliance** | Meet regulatory requirements | DEA, state board, HIPAA requirements |
| **Durability** | Survive handling and storage | High contrast for thermal/laser printing |
| **Scannability** | Barcodes must scan reliably | Proper quiet zones, minimum sizes |

---

### Page Setup

#### Standard Document Sizes

| Size | Dimensions | Use Case |
|------|------------|----------|
| Letter | 8.5" × 11" | Reports, patient summaries |
| Half Letter | 5.5" × 8.5" | Compound worksheets |
| Label (4×6) | 4" × 6" | Shipping labels |
| Label (4×2) | 4" × 2" | Prescription labels |
| Label (2×1) | 2" × 1" | Auxiliary labels |

#### Page Margins

```css
@page {
  size: letter;
  margin: 0.75in 0.75in 1in 0.75in; /* top right bottom left */
}

@page :first {
  margin-top: 1in; /* Extra space for letterhead */
}

@page :left {
  margin-left: 1in; /* Binding margin for left pages */
}

@page :right {
  margin-right: 1in; /* Binding margin for right pages */
}
```

| Document Type | Top | Right | Bottom | Left |
|---------------|-----|-------|--------|------|
| Standard report | 0.75" | 0.75" | 1" | 0.75" |
| Bound document | 0.75" | 0.5" | 1" | 1" |
| Label | 0.125" | 0.125" | 0.125" | 0.125" |

---

### Print Typography

#### Font Adjustments

```css
@media print {
  body {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.4;
    color: #000;
    background: #fff;
  }

  h1 { font-size: 18pt; }
  h2 { font-size: 14pt; }
  h3 { font-size: 12pt; }
  p, td, li { font-size: 10pt; }
  .small, .caption { font-size: 8pt; }
}
```

#### Print Type Scale

| Element | Size | Weight | Use |
|---------|------|--------|-----|
| Document title | 18pt | 700 | Report headers |
| Section heading | 14pt | 600 | Major sections |
| Subsection | 12pt | 600 | Minor sections |
| Body text | 10pt | 400 | Paragraphs, data |
| Small text | 8pt | 400 | Footnotes, legal |
| Label text | 9pt | 500 | Prescription labels |
| Minimum | 6pt | 500 | Auxiliary labels only |

#### Monospace for Clinical Data

```css
@media print {
  .ndc,
  .lot-number,
  .rx-number,
  .dea-number,
  .quantity {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 9pt;
    letter-spacing: 0.5pt;
  }
}
```

---

### Color Handling

#### Grayscale Conversion

Printers vary—design for grayscale even when color is available:

```css
@media print {
  /* Force black text */
  body {
    color: #000 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Status indicators need patterns, not just color */
  .status-success {
    border-left: 4pt solid #000;
    background: none;
  }

  .status-warning {
    border-left: 4pt dashed #000;
    background: none;
  }

  .status-error {
    border-left: 4pt solid #000;
    background: repeating-linear-gradient(
      45deg,
      #f0f0f0,
      #f0f0f0 2pt,
      #fff 2pt,
      #fff 4pt
    );
  }
}
```

#### When Color Matters

| Element | Color Required? | Fallback |
|---------|-----------------|----------|
| Allergy warnings | Yes (red) | Bold + border + "ALLERGY" text |
| Controlled substance | Yes (purple preferred) | "C-II" text badge |
| Status badges | No | Text label sufficient |
| Charts/graphs | No | Patterns + labels |
| Barcodes | No | Black on white only |

---

### Print-Specific Elements

#### Headers and Footers

```css
@media print {
  @page {
    @top-center {
      content: "CONFIDENTIAL - HIPAA Protected";
      font-size: 8pt;
      color: #666;
    }

    @bottom-left {
      content: "Printed: " attr(data-print-date);
      font-size: 8pt;
    }

    @bottom-center {
      content: "Page " counter(page) " of " counter(pages);
      font-size: 8pt;
    }

    @bottom-right {
      content: attr(data-document-id);
      font-size: 8pt;
    }
  }
}
```

#### Page Header Block

```
┌─────────────────────────────────────────────────────────────────┐
│  PHARMACY NAME                                    CONFIDENTIAL  │
│  123 Main Street, City, ST 12345                               │
│  Phone: (555) 123-4567  |  DEA: AB1234567                      │
├─────────────────────────────────────────────────────────────────┤
│  PATIENT MEDICATION REPORT                                      │
│  Generated: January 15, 2024 2:30 PM                           │
└─────────────────────────────────────────────────────────────────┘
```

#### Page Footer Block

```
┌─────────────────────────────────────────────────────────────────┐
│  CONFIDENTIAL - Protected Health Information                    │
│  Doc ID: RPT-2024-00001234          Page 1 of 3                │
└─────────────────────────────────────────────────────────────────┘
```

---

### Page Breaks

```css
@media print {
  /* Always start on new page */
  .page-break-before {
    page-break-before: always;
  }

  /* Prevent breaking inside */
  .keep-together,
  table,
  .prescription-card,
  .signature-block {
    page-break-inside: avoid;
  }

  /* Keep with next element */
  h1, h2, h3 {
    page-break-after: avoid;
  }

  /* Orphan/widow control */
  p {
    orphans: 3;
    widows: 3;
  }
}
```

#### Page Break Rules

| Element | Rule | Reason |
|---------|------|--------|
| Section headers | Avoid break after | Keep with content |
| Tables | Avoid break inside | Data integrity |
| Signature blocks | Avoid break inside | Legal validity |
| Patient header | Keep with first content | Context |
| Images/barcodes | Avoid break inside | Scannability |

---

### Hidden Elements

```css
@media print {
  /* Hide interactive elements */
  .no-print,
  button,
  .button,
  nav,
  .navigation,
  .sidebar,
  .toolbar,
  .modal,
  .tooltip,
  .dropdown-menu,
  [role="dialog"],
  .print-hide {
    display: none !important;
  }

  /* Hide but keep space */
  .print-invisible {
    visibility: hidden;
  }

  /* Show only in print */
  .print-only {
    display: block !important;
  }
}
```

#### What to Hide vs. Show

| Hide | Show |
|------|------|
| Navigation | Document header |
| Buttons (except print) | Footer with page numbers |
| Tooltips | Expanded abbreviations |
| Modals | Full URLs for links |
| Interactive charts | Static chart images |
| "Click here" links | Actual URLs |

---

### Prescription Labels

#### Standard Prescription Label (4" × 2")

```
┌─────────────────────────────────────────────────────────────────┐
│  ▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐                               │ ← Barcode
│  RX-2024-00001234                                               │
├─────────────────────────────────────────────────────────────────┤
│  SMITH, JOHN                          DOB: 01/15/1980          │ ← Patient
│  123 Main Street, Apt 4B                                        │
│  Anytown, ST 12345                                              │
├─────────────────────────────────────────────────────────────────┤
│  PROGESTERONE 100MG CAPSULES                                    │ ← Drug (BOLD)
│  Take 1 capsule by mouth at bedtime                            │ ← Sig
│                                                                 │
│  Qty: 30    Refills: 2                   NDC: 12345-6789-01    │ ← Details
├─────────────────────────────────────────────────────────────────┤
│  Dr. Jane Doe, MD                        Date: 01/15/2024      │ ← Prescriber
│  ABC Pharmacy  |  (555) 123-4567  |  RPh: Smith               │ ← Pharmacy
│  ⚠ AVOID ALCOHOL                                               │ ← Warnings
└─────────────────────────────────────────────────────────────────┘

Dimensions: 4" × 2"
Font: 9pt body, 11pt drug name
Barcode: Code 128, 0.375" height
Margins: 0.125" all sides
```

#### Label Typography

| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| Patient name | 10pt | 700 | ALL CAPS |
| Drug name | 11pt | 700 | ALL CAPS, largest element |
| Sig/directions | 9pt | 400 | Sentence case |
| Quantity/refills | 8pt | 500 | |
| Pharmacy info | 7pt | 400 | |
| Warnings | 8pt | 700 | With icon |
| Barcode text | 8pt | 400 | Monospace |

#### Controlled Substance Label Additions

```
┌─────────────────────────────────────────────────────────────────┐
│  ████████████████████████████████████████████████████████████  │
│  ██  SCHEDULE II CONTROLLED SUBSTANCE - C-II                ██  │
│  ████████████████████████████████████████████████████████████  │
│                                                                 │
│  ... standard label content ...                                 │
│                                                                 │
│  DEA: AB1234567                    Rx Written: 01/10/2024      │
│  ⚠ CAUTION: Federal law prohibits transfer of this drug       │
└─────────────────────────────────────────────────────────────────┘
```

---

### Shipping Labels

#### Shipping Label (4" × 6")

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────┐                                       │
│  │                     │  FROM:                                │
│  │    LOGO             │  ABC Compounding Pharmacy             │
│  │                     │  123 Pharmacy Lane                    │
│  └─────────────────────┘  Anytown, ST 12345                    │
│                           (555) 123-4567                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SHIP TO:                                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  JOHN SMITH                                                 ││
│  │  456 PATIENT STREET APT 7                                   ││
│  │  SOMEWHERE, ST 67890                                        ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐││
│  │                    TRACKING BARCODE                        ││
│  │              1Z999AA10123456784                            ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  ❄ REFRIGERATE UPON ARRIVAL    PRIORITY OVERNIGHT              │
│  Order: ORD-2024-00005678      Ship Date: 01/15/2024           │
└─────────────────────────────────────────────────────────────────┘
```

#### Special Handling Indicators

| Indicator | Symbol | Placement | Size |
|-----------|--------|-----------|------|
| Refrigerate | ❄ or snowflake | Top of handling section | 24pt |
| Fragile | ⚠ or broken glass | Top of handling section | 24pt |
| This Side Up | ↑ arrows | Corners | 18pt |
| Signature Required | ✍ or pen | Near tracking | 12pt |

---

### Reports

#### Patient Medication Report

```
┌─────────────────────────────────────────────────────────────────┐
│  ABC COMPOUNDING PHARMACY              PATIENT MEDICATION REPORT│
│  123 Pharmacy Lane, Anytown, ST 12345         CONFIDENTIAL     │
│  DEA: AB1234567  |  NPI: 1234567890                            │
├─────────────────────────────────────────────────────────────────┤
│  PATIENT INFORMATION                                            │
│  ─────────────────────────────────────────────────────────────  │
│  Name: SMITH, JOHN                      DOB: 01/15/1980        │
│  MRN: 12345                             Phone: (555) 987-6543  │
│  Address: 456 Patient Street, Somewhere, ST 67890              │
│                                                                 │
│  ⚠ ALLERGIES: Penicillin, Sulfa                                │
├─────────────────────────────────────────────────────────────────┤
│  CURRENT MEDICATIONS                                            │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ PROGESTERONE 100MG CAPSULES                                ││
│  │ Take 1 capsule by mouth at bedtime                         ││
│  │ Qty: 30  |  Refills: 2  |  Last Fill: 01/15/2024          ││
│  │ Prescriber: Dr. Jane Doe, MD  |  DEA: CD9876543            ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ TESTOSTERONE CYPIONATE 200MG/ML INJ                 C-III  ││
│  │ Inject 0.5mL intramuscularly every 2 weeks                 ││
│  │ Qty: 10mL  |  Refills: 0  |  Last Fill: 12/20/2023        ││
│  │ Prescriber: Dr. Jane Doe, MD  |  DEA: CD9876543            ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Report Generated: 01/15/2024 2:30 PM by JSmith, RPh           │
│  Document ID: RPT-2024-00001234                    Page 1 of 1 │
│  ─────────────────────────────────────────────────────────────  │
│  CONFIDENTIAL - Protected Health Information (PHI)             │
└─────────────────────────────────────────────────────────────────┘
```

---

### Compound Worksheet

```
┌─────────────────────────────────────────────────────────────────┐
│  COMPOUND PREPARATION WORKSHEET                                 │
│  Rx#: RX-2024-00001234           Date: 01/15/2024              │
├─────────────────────────────────────────────────────────────────┤
│  FORMULATION: Progesterone 100mg/mL Suspension                 │
│  Final Volume: 100 mL            Beyond Use Date: 02/14/2024   │
├───────────────────────┬──────────┬──────────┬──────────────────┤
│  INGREDIENT           │ QTY CALC │ QTY USED │ LOT / EXP        │
├───────────────────────┼──────────┼──────────┼──────────────────┤
│  Progesterone USP     │ 10,000mg │ ________ │ ________________ │
│  OraPlus              │    50 mL │ ________ │ ________________ │
│  OraSweet             │    50 mL │ ________ │ ________________ │
├───────────────────────┴──────────┴──────────┴──────────────────┤
│  PREPARATION STEPS:                                             │
│  □ 1. Verify patient identity and prescription                 │
│  □ 2. Calculate quantities and gather ingredients              │
│  □ 3. Weigh Progesterone USP: __________ g                     │
│  □ 4. Triturate with small amount of OraPlus                   │
│  □ 5. Add remaining OraPlus, mix thoroughly                    │
│  □ 6. Add OraSweet to final volume                             │
│  □ 7. Transfer to dispensing container                         │
│  □ 8. Apply label and auxiliary labels                         │
├─────────────────────────────────────────────────────────────────┤
│  QUALITY CHECK:                                                 │
│  □ Appearance: _____________  □ pH: _______  □ Weight: _______ │
├─────────────────────────────────────────────────────────────────┤
│  Prepared by: _________________ Date: _______ Time: _______    │
│  Verified by: _________________ Date: _______ Time: _______    │
│  RPh Initials: _______                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

### Barcodes

#### Barcode Specifications

| Type | Use Case | Min Width | Min Height | Quiet Zone |
|------|----------|-----------|------------|------------|
| Code 128 | Rx numbers, tracking | 1.5" | 0.375" | 0.25" |
| Code 39 | Lot numbers | 1" | 0.25" | 0.25" |
| NDC (UPC) | Drug identification | 1.25" | 0.75" | 0.125" |
| QR Code | Digital references | 0.75" × 0.75" | N/A | 0.125" |
| DataMatrix | Small labels | 0.375" × 0.375" | N/A | 0.0625" |

#### Barcode Placement

```
┌─────────────────────────────────────────────────────────────────┐
│  ←───── Quiet Zone ─────→                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐││
│  │                      BARCODE                               ││
│  │               RX-2024-00001234                             ││ ← Human readable
│  └─────────────────────────────────────────────────────────────┘│
│  ←───── Quiet Zone ─────→                                       │
└─────────────────────────────────────────────────────────────────┘

Quiet zone: minimum 10× narrow bar width (typically 0.25")
Human readable: 8pt, monospace, below barcode
```

---

### Print Preview

```typescript
// Print preview component pattern
const PrintPreview = ({ document, type }) => {
  return (
    <div className="print-preview">
      {/* Screen-only header */}
      <header className="no-print">
        <h1>Print Preview: {type}</h1>
        <div className="actions">
          <Button onClick={() => window.print()}>Print</Button>
          <Button variant="secondary">Download PDF</Button>
        </div>
      </header>

      {/* Printable content */}
      <article className="print-content">
        {document}
      </article>

      {/* Screen-only footer */}
      <footer className="no-print">
        <p>Preview may differ from actual printed output</p>
      </footer>
    </div>
  );
};
```

---

### CSS Print Stylesheet

```css
/* print.css - Include with media="print" or in @media print block */

@media print {
  /* Reset and base */
  *,
  *::before,
  *::after {
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  html, body {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.4;
  }

  /* Page setup */
  @page {
    size: letter;
    margin: 0.75in;
  }

  @page :first {
    margin-top: 1in;
  }

  /* Typography */
  h1 { font-size: 18pt; margin-bottom: 12pt; }
  h2 { font-size: 14pt; margin-bottom: 8pt; }
  h3 { font-size: 12pt; margin-bottom: 6pt; }
  p { margin-bottom: 8pt; }

  /* Links - show URL */
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 8pt;
    color: #666;
  }

  a[href^="#"]::after,
  a[href^="javascript:"]::after {
    content: "";
  }

  /* Tables */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1pt solid #ccc;
    padding: 4pt 6pt;
    text-align: left;
  }

  th {
    background: #f0f0f0 !important;
    font-weight: 600;
  }

  /* Page breaks */
  h1, h2, h3 {
    page-break-after: avoid;
  }

  table, figure, .keep-together {
    page-break-inside: avoid;
  }

  /* Hidden elements */
  nav,
  .no-print,
  .navigation,
  button:not(.print-button),
  .modal,
  .tooltip {
    display: none !important;
  }

  /* Show print-only elements */
  .print-only {
    display: block !important;
  }

  /* Clinical data */
  .ndc, .lot-number, .rx-number {
    font-family: 'Courier New', monospace;
    font-size: 9pt;
  }

  /* Allergy warnings */
  .allergy-warning {
    border: 2pt solid #000;
    padding: 4pt;
    font-weight: 700;
  }

  /* Signatures */
  .signature-line {
    border-bottom: 1pt solid #000;
    min-width: 2in;
    display: inline-block;
    margin-top: 24pt;
  }
}
```

---

### Print Checklist

```markdown
## Before Printing Documents

### Layout
- [ ] Correct page size selected
- [ ] Margins appropriate for binding/filing
- [ ] Headers and footers present
- [ ] Page numbers included
- [ ] Page breaks in logical places

### Content
- [ ] Patient identifiers correct and complete
- [ ] All clinical data accurate
- [ ] No truncated text (especially names, addresses)
- [ ] Dates in correct format
- [ ] All required fields populated

### Legibility
- [ ] Font size meets minimums (8pt+)
- [ ] Adequate contrast (black on white)
- [ ] Critical info not in color-only format
- [ ] Barcodes have proper quiet zones
- [ ] Monospace used for NDC/Lot/Rx numbers

### Compliance
- [ ] HIPAA notice present
- [ ] Document ID for audit trail
- [ ] Timestamp included
- [ ] Appropriate signatures/initials spaces
- [ ] Controlled substance warnings (if applicable)

### Quality
- [ ] Print preview checked
- [ ] Test print reviewed
- [ ] Barcode scans successfully
- [ ] All pages present
```

---

## Accessibility Standards

### WCAG 2.1 Compliance

| Criterion | Requirement | Our Standard |
|-----------|-------------|--------------|
| Color Contrast (AA) | 4.5:1 text, 3:1 UI | 4.5:1 minimum all text |
| Color Contrast (AAA) | 7:1 text | Target for critical info |
| Focus Visible | Visible focus indicator | 3px ring, never remove |
| Target Size | 24x24px minimum | 44x44px for touch targets |
| Text Spacing | Adjustable | Support 1.5x line height |

### Focus States

All interactive elements must have visible focus:

```css
/* Standard focus ring */
--focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.5);

/* High contrast focus (for accessibility mode) */
--focus-ring-high-contrast: 0 0 0 3px #1d4ed8;
```

Focus order must be logical and follow visual layout.

### Color Independence

Never convey information through color alone:

| Bad | Good |
|-----|------|
| Red dot for error | Red dot + "Error" label + icon |
| Green row for success | Green row + checkmark + "Verified" text |
| Yellow highlight for warning | Yellow highlight + warning icon + text |

### Screen Reader Considerations

| Element | Requirement |
|---------|-------------|
| Images | Meaningful alt text or aria-hidden |
| Icons | aria-label or accompanying text |
| Status changes | aria-live regions |
| Modals | Focus trap, aria-modal |
| Forms | Proper label associations |
| Tables | Caption and header scope |
| Dynamic content | aria-live="polite" or "assertive" |

### Healthcare-Specific Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Allergy alerts | aria-live="assertive", role="alert" |
| Drug warnings | Must be announced to screen readers |
| Status changes | Announce verification, status updates |
| Time-sensitive info | Include in accessible name |

---

## Responsive Design

### Breakpoints

| Token | Width | Target |
|-------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets portrait |
| `lg` | 1024px | Tablets landscape, small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Responsive Patterns

| Pattern | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | Bottom bar or hamburger | Side rail | Full sidebar |
| Tables | Card stack | Horizontal scroll | Full table |
| Forms | Single column | Single column | Two column |
| Modals | Full screen | Centered, 90% width | Centered, fixed width |
| Filters | Bottom sheet | Side panel | Inline |

### Touch Targets

| Context | Minimum Size |
|---------|--------------|
| Primary actions | 48x48px |
| Secondary actions | 44x44px |
| Tertiary/dense UI | 32x32px (with 8px gap) |

### Mobile-First Considerations

```css
/* Design mobile-first, enhance for larger screens */
.component {
  /* Mobile styles */
  padding: var(--space-4);

  @media (min-width: 768px) {
    /* Tablet enhancements */
    padding: var(--space-6);
  }

  @media (min-width: 1024px) {
    /* Desktop enhancements */
    padding: var(--space-8);
  }
}
```

---

## Motion & Animation

### Duration Scale

| Token | Duration | Usage |
|-------|----------|-------|
| `--duration-fast` | 100ms | Micro-interactions (hover, focus) |
| `--duration-normal` | 200ms | Standard transitions |
| `--duration-slow` | 300ms | Enter/exit animations |
| `--duration-slower` | 500ms | Complex animations |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Enter animations |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |

### Animation Principles

| Principle | Application |
|-----------|-------------|
| Purposeful | Animation serves UX, not decoration |
| Subtle | Healthcare = professional, minimal motion |
| Accessible | Respect prefers-reduced-motion |
| Fast | Never delay user actions |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Common Animations

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Fade in | 200ms | ease-out | Modals, tooltips |
| Slide up | 300ms | ease-out | Bottom sheets, modals |
| Scale in | 200ms | ease-out | Popovers, dropdowns |
| Skeleton pulse | 2000ms | ease-in-out | Loading states |
| Spinner | 1000ms | linear | Loading indicators |

---

## Dark Mode

Built on our anchor colors: **Mercury White** (`#F4F5F8`) for light mode and **Nordic Gray** (`#222326`) for dark mode.

### Color Mapping

| Semantic Token | Light (Mercury-based) | Dark (Nordic-based) |
|----------------|----------------------|---------------------|
| Background primary | Mercury White `#F4F5F8` | Nordic Gray `#222326` |
| Background secondary | White `#FFFFFF` | `#2D2F36` |
| Background tertiary | `#E8EAEF` | `#393C46` |
| Text primary | Nordic Gray `#222326` | Mercury White `#F4F5F8` |
| Text secondary | `#4E525F` | `#B8BCC8` |
| Text muted | `#6B7080` | `#8E93A3` |
| Border default | `#D5D8E0` | `#393C46` |
| Border subtle | `#E8EAEF` | `#2D2F36` |

### Dark Mode Principles

| Principle | Application |
|-----------|-------------|
| Anchor-based | Nordic Gray as base, not arbitrary dark colors |
| Not inverted | Colors are remapped through the neutral scale |
| Reduced contrast | Mercury on Nordic = 12.5:1 (not pure white) |
| Desaturated colors | Status colors slightly muted for eye comfort |
| Elevated surfaces | Lighter grays for elevation, not shadows |

### Elevation in Dark Mode

In dark mode, elevated surfaces get lighter (not darker with shadows).

| Elevation | Light Mode | Dark Mode |
|-----------|------------|-----------|
| Base (page) | Mercury `#F4F5F8` | Nordic `#222326` |
| Level 1 (cards) | White `#FFFFFF` | `#2D2F36` |
| Level 2 (modals) | White `#FFFFFF` | `#393C46` |
| Level 3 (popovers) | White `#FFFFFF` | `#393C46` |

### Status Colors in Dark Mode

| Status | Light Background | Dark Background |
|--------|------------------|-----------------|
| Success | `#F0FDF4` | `rgba(22, 163, 74, 0.15)` |
| Warning | `#FEFCE8` | `rgba(202, 138, 4, 0.15)` |
| Error | `#FEF2F2` | `rgba(220, 38, 38, 0.15)` |
| Info | `#EFF6FF` | `rgba(37, 99, 235, 0.15)` |

### Implementation

```css
/* Light mode (default) - Mercury White base */
:root {
  --color-bg-primary: #F4F5F8;    /* Mercury White */
  --color-bg-secondary: #FFFFFF;
  --color-text-primary: #222326;  /* Nordic Gray */
  color-scheme: light;
}

/* Dark mode - Nordic Gray base */
[data-theme="dark"] {
  --color-bg-primary: #222326;    /* Nordic Gray */
  --color-bg-secondary: #2D2F36;
  --color-text-primary: #F4F5F8;  /* Mercury White */
  color-scheme: dark;
}

/* System preference detection */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg-primary: #222326;
    --color-bg-secondary: #2D2F36;
    --color-text-primary: #F4F5F8;
    color-scheme: dark;
  }
}
```

---

## Design Token Export

### CSS Custom Properties

```css
:root {
  /* Anchor Colors */
  --mercury-white: #F4F5F8;
  --nordic-gray: #222326;

  /* Neutral Scale (Mercury → Nordic) */
  --neutral-0: #FFFFFF;
  --neutral-50: #F4F5F8;
  --neutral-100: #E8EAEF;
  --neutral-200: #D5D8E0;
  --neutral-300: #B8BCC8;
  --neutral-400: #8E93A3;
  --neutral-500: #6B7080;
  --neutral-600: #4E525F;
  --neutral-700: #393C46;
  --neutral-800: #2D2F36;
  --neutral-900: #222326;
  --neutral-950: #18191C;

  /* Semantic Background (light mode default) */
  --color-bg-primary: var(--neutral-50);
  --color-bg-secondary: var(--neutral-0);
  --color-bg-tertiary: var(--neutral-100);

  /* Semantic Text (light mode default) */
  --color-text-primary: var(--neutral-900);
  --color-text-secondary: var(--neutral-600);
  --color-text-muted: var(--neutral-500);

  /* Primary Brand */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;

  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --text-base: 16px;

  /* Spacing */
  --space-4: 16px;

  /* Borders */
  --radius-md: 6px;

  /* Shadows */
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
}
```

### Tailwind Config Mapping

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Anchor colors
        mercury: '#F4F5F8',
        nordic: '#222326',

        // Neutral scale
        neutral: {
          0: '#FFFFFF',
          50: '#F4F5F8',   // Mercury White
          100: '#E8EAEF',
          200: '#D5D8E0',
          300: '#B8BCC8',
          400: '#8E93A3',
          500: '#6B7080',
          600: '#4E525F',
          700: '#393C46',
          800: '#2D2F36',
          900: '#222326',  // Nordic Gray
          950: '#18191C',
        },

        // Brand
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
        },

        // Healthcare
        allergy: '#dc2626',
        interaction: '#ea580c',
        controlled: '#9333ea',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundColor: {
        page: 'var(--color-bg-primary)',
        card: 'var(--color-bg-secondary)',
      },
    },
  },
};
```

---

## Layout Templates

Layout templates define the structural patterns for common page types. Consistency in layout helps users navigate efficiently and reduces cognitive load in high-stakes healthcare workflows.

### Core Layout Regions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                              h: 64px │
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │ SUBHEADER / BREADCRUMBS / PAGE TITLE              h: 48-64px │
│   SIDEBAR    ├──────────────────────────────────────────────────────────────┤
│              │                                                              │
│   w: 240px   │                                                              │
│   (desktop)  │                      MAIN CONTENT                            │
│              │                                                              │
│   w: 64px    │                      Scrollable region                       │
│   (collapsed)│                                                              │
│              │                                                              │
│              │                                                              │
│              ├──────────────────────────────────────────────────────────────┤
│              │ FOOTER (optional)                                   h: 48px  │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

### Layout Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--header-height` | 64px | Fixed header |
| `--sidebar-width` | 240px | Expanded sidebar |
| `--sidebar-collapsed` | 64px | Icon-only sidebar |
| `--content-max-width` | 1200px | Content containment |
| `--subheader-height` | 48-64px | Breadcrumbs/page title |

---

### Template 1: Dashboard Layout

Dashboards display aggregated data, KPIs, and quick actions. Used for pharmacy overview, doctor dashboard, employer analytics.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Logo  │  Global Search...                    │ ⚡ │ 🔔 │ [Dr. Smith ▼]     │
├───────┴───────────────────────────────────────────┴────┴────┴───────────────┤
│        │                                                                    │
│ 📊 Dash│  Dashboard                                      [Today ▼] [Export]│
│ 📋 Rxs │  ─────────────────────────────────────────────────────────────────│
│ 👥 Pat │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│ ⚙ Set │  │ Pending     │ │ In Progress │ │ Ready       │ │ Dispensed   │  │
│        │  │    47       │ │    23       │ │    12       │ │    156      │  │
│        │  │ ↑ 12%       │ │ → 0%        │ │ ↓ 8%        │ │ ↑ 23%       │  │
│        │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘  │
│        │                                                                    │
│        │  ┌────────────────────────────────────┐ ┌─────────────────────────┐│
│        │  │ Prescriptions Over Time            │ │ Top Compounds          ││
│        │  │ ┌───────────────────────────────┐  │ │ ───────────────────────││
│        │  │ │     📈                        │  │ │ 1. Progesterone   34%  ││
│        │  │ │   ╱  ╲     ╱╲                 │  │ │ 2. Testosterone   28%  ││
│        │  │ │──╱────╲───╱──╲────────────────│  │ │ 3. DHEA          19%   ││
│        │  │ │ ╱      ╲_╱    ╲               │  │ │ 4. Estradiol     12%   ││
│        │  │ └───────────────────────────────┘  │ │ 5. Thyroid        7%   ││
│        │  └────────────────────────────────────┘ └─────────────────────────┘│
│        │                                                                    │
│        │  Recent Activity                                     [View All →] │
│        │  ───────────────────────────────────────────────────────────────  │
│        │  │ ● │ Rx #4521 verified                    │ 2 min ago │ J.K.  │ │
│        │  │ ● │ Rx #4520 compounding started         │ 5 min ago │ S.R.  │ │
│        │  │ ○ │ Rx #4519 ready for pickup            │ 12 min ago│ M.L.  │ │
│        │  ───────────────────────────────────────────────────────────────  │
└────────┴────────────────────────────────────────────────────────────────────┘
```

#### Dashboard Grid Structure

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto 1fr;
  gap: var(--space-6);
  padding: var(--space-6);
}

/* KPI cards span 1 column each */
.kpi-card {
  grid-column: span 1;
}

/* Charts span 2+ columns */
.chart-main {
  grid-column: span 3;
}
.chart-side {
  grid-column: span 1;
}

/* Activity list spans full width */
.activity-list {
  grid-column: 1 / -1;
}
```

#### Responsive Behavior

| Breakpoint | KPI Cards | Chart Layout | Activity |
|------------|-----------|--------------|----------|
| Desktop (1280px+) | 4 across | 3:1 split | Full table |
| Tablet (768px) | 2 across, 2 rows | Stacked | Truncated table |
| Mobile (<768px) | 1 column | Stacked, swipeable | Card list |

---

### Template 2: List/Detail (Master-Detail)

The most common pattern in the pharmacy platform. A list panel shows items; selecting one reveals details.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Logo  │  Global Search...                    │ ⚡ │ 🔔 │ [Dr. Smith ▼]     │
├───────┴─────────────────────────────────────────────────────────────────────┤
│        │ Prescriptions                                    [+ New Rx] [⚙]   │
├────────┼────────────────────────────────────────────────────────────────────┤
│        │ ┌──────────────────────────────┬───────────────────────────────────┤
│ 📊 Dash│ │ 🔍 Search prescriptions...   │  Rx #4521                   [×]  │
│ 📋 Rxs │ │ ──────────────────────────── │  ─────────────────────────────── │
│ 👥 Pat │ │ [All ▼] [Status ▼] [Date ▼]  │  Patient: John Smith             │
│ ⚙ Set │ │                              │  DOB: 1985-03-15 | MRN: 12345    │
│        │ │ ┌──────────────────────────┐ │  ⚠️ ALLERGY: Sulfa               │
│        │ │ │ ▶ Rx #4521 · SELECTED    │ │  ─────────────────────────────── │
│        │ │ │   John Smith             │ │                                  │
│        │ │ │   Progesterone 100mg     │ │  Medication                      │
│        │ │ │   ● Pending Verification │ │  ┌─────────────────────────────┐ │
│        │ │ └──────────────────────────┘ │  │ Progesterone               │ │
│        │ │ ┌──────────────────────────┐ │  │ 100mg Capsules             │ │
│        │ │ │   Rx #4520               │ │  │ Qty: 30 | Days: 30          │ │
│        │ │ │   Mary Johnson           │ │  │ Sig: Take 1 cap PO QHS     │ │
│        │ │ │   Testosterone 50mg      │ │  └─────────────────────────────┘ │
│        │ │ │   ○ In Progress          │ │                                  │
│        │ │ └──────────────────────────┘ │  Prescriber                      │
│        │ │ ┌──────────────────────────┐ │  Dr. Sarah Williams, MD          │
│        │ │ │   Rx #4519               │ │  NPI: 1234567890                 │
│        │ │ │   Robert Lee             │ │                                  │
│        │ │ │   DHEA 25mg              │ │  ─────────────────────────────── │
│        │ │ │   ● Ready for Pickup     │ │                                  │
│        │ │ └──────────────────────────┘ │  [Begin Verification] [Print]    │
│        │ │                              │  [Message Prescriber] [Cancel Rx]│
│        │ └──────────────────────────────┴───────────────────────────────────┤
└────────┴────────────────────────────────────────────────────────────────────┘
```

#### List/Detail Specifications

| Element | Specification |
|---------|---------------|
| List panel width | 320-400px (fixed or flex) |
| Detail panel | Remaining width (flex: 1) |
| Divider | 1px border-gray-200 |
| Selected item | Primary color background (light) |
| Empty state (detail) | Centered illustration + text |

#### List Item Pattern

```css
.list-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
}

.list-item:hover {
  background: var(--color-bg-hover);
}

.list-item--selected {
  background: var(--color-primary-50);
  border-left: 3px solid var(--color-primary);
}
```

#### Responsive: Drawer Pattern for Mobile

```
Mobile: List only                    Mobile: Detail (drawer slides in)
┌─────────────────────────┐          ┌─────────────────────────┐
│ ← Prescriptions   [+][⚙]│          │ ← Back       Rx #4521   │
├─────────────────────────┤          ├─────────────────────────┤
│ 🔍 Search...            │          │ Patient: John Smith     │
│ [All ▼] [Status ▼]      │          │ DOB: 1985-03-15         │
├─────────────────────────┤          │ ⚠️ ALLERGY: Sulfa       │
│ ┌─────────────────────┐ │          ├─────────────────────────┤
│ │ Rx #4521            │ │   →      │ Medication              │
│ │ John Smith          │ │  tap     │ Progesterone 100mg      │
│ │ ● Pending           │ │          │ Qty: 30 | Days: 30      │
│ └─────────────────────┘ │          │                         │
│ ┌─────────────────────┐ │          │ Prescriber              │
│ │ Rx #4520            │ │          │ Dr. Sarah Williams      │
│ │ Mary Johnson        │ │          ├─────────────────────────┤
│ │ ○ In Progress       │ │          │ [Begin Verification]    │
│ └─────────────────────┘ │          │ [Message] [Print]       │
└─────────────────────────┘          └─────────────────────────┘
```

---

### Template 3: Form Layouts

#### Single-Column Form (Preferred for Mobile-First)

Best for: Patient intake, simple settings, authentication

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Logo  │  Global Search...                    │ ⚡ │ 🔔 │ [Dr. Smith ▼]     │
├───────┴─────────────────────────────────────────────────────────────────────┤
│        │ Add New Patient                                          [Cancel] │
├────────┼────────────────────────────────────────────────────────────────────┤
│ 📊 Dash│                                                                    │
│ 📋 Rxs │            ┌─────────────────────────────────────────────────┐     │
│ 👥 Pat │            │ Basic Information                               │     │
│ ⚙ Set │            │ ───────────────────────────────────────────────│     │
│        │            │ First Name *              Last Name *           │     │
│        │            │ ┌─────────────────────┐   ┌─────────────────────┐│    │
│        │            │ │ John                │   │ Smith               ││    │
│        │            │ └─────────────────────┘   └─────────────────────┘│    │
│        │            │                                                 │     │
│        │            │ Date of Birth *           Gender                │     │
│        │            │ ┌─────────────────────┐   ┌─────────────────────┐│    │
│        │            │ │ 03/15/1985          │   │ Male            ▼  ││    │
│        │            │ └─────────────────────┘   └─────────────────────┘│    │
│        │            │                                                 │     │
│        │            │ Contact Information                             │     │
│        │            │ ───────────────────────────────────────────────│     │
│        │            │ Email *                                         │     │
│        │            │ ┌─────────────────────────────────────────────┐ │     │
│        │            │ │ john.smith@email.com                        │ │     │
│        │            │ └─────────────────────────────────────────────┘ │     │
│        │            │                                                 │     │
│        │            │ Phone                                           │     │
│        │            │ ┌─────────────────────────────────────────────┐ │     │
│        │            │ │ (555) 123-4567                              │ │     │
│        │            │ └─────────────────────────────────────────────┘ │     │
│        │            │                                                 │     │
│        │            │ ───────────────────────────────────────────────│     │
│        │            │                        [Cancel]  [Save Patient] │     │
│        │            └─────────────────────────────────────────────────┘     │
└────────┴────────────────────────────────────────────────────────────────────┘
```

#### Form Section Specifications

| Element | Specification |
|---------|---------------|
| Form max-width | 600px (centered) |
| Section gap | 32px (var(--space-8)) |
| Field gap | 16px (var(--space-4)) |
| Label-to-input gap | 4px (var(--space-1)) |
| Two-column threshold | 480px+ for inline fields |

#### Multi-Column Form

Best for: Complex data entry (compound worksheets), settings with many options

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Compound Worksheet - Rx #4521                                     [× Close]│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────┬───────────────────────────────────┐│
│  │ Formula                             │ Calculations                      ││
│  │ ─────────────────────────────────── │ ─────────────────────────────────││
│  │ Base:                               │ Quantity Needed:                 ││
│  │ ┌─────────────────────────────────┐ │ ┌─────────────────────────────┐  ││
│  │ │ Progesterone USP             ▼ │ │ │ 100                         │  ││
│  │ └─────────────────────────────────┘ │ └─────────────────────────────┘  ││
│  │                                     │                                  ││
│  │ Strength:        Units:             │ Overage (%):                     ││
│  │ ┌───────────┐   ┌───────────────┐  │ ┌─────────────────────────────┐  ││
│  │ │ 100       │   │ mg         ▼ │  │ │ 5                           │  ││
│  │ └───────────┘   └───────────────┘  │ └─────────────────────────────┘  ││
│  │                                     │                                  ││
│  │ Dosage Form:                        │ Total to Compound:               ││
│  │ ┌─────────────────────────────────┐ │ ┌─────────────────────────────┐  ││
│  │ │ Capsule                      ▼ │ │ │ 105 (calculated)            │  ││
│  │ └─────────────────────────────────┘ │ └─────────────────────────────┘  ││
│  └─────────────────────────────────────┴───────────────────────────────────┘│
│                                                                             │
│  Ingredients                                                    [+ Add Row]│
│  ─────────────────────────────────────────────────────────────────────────  │
│  │ Ingredient          │ Lot #      │ Expiry     │ Qty (mg)   │ Actions  │ │
│  ├─────────────────────┼────────────┼────────────┼────────────┼──────────┤ │
│  │ Progesterone USP    │ LOT-12345  │ 2026-06    │ 10,500     │ [🗑]     │ │
│  │ Avicel PH-102       │ LOT-67890  │ 2027-01    │ 8,400      │ [🗑]     │ │
│  │ Magnesium Stearate  │ LOT-11111  │ 2026-12    │ 210        │ [🗑]     │ │
│  └─────────────────────┴────────────┴────────────┴────────────┴──────────┘ │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  [Save Draft]                                     [Cancel]  [Complete QC →] │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Multi-Step Wizard Form

Best for: Complex onboarding, multi-stage workflows

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ New Prescription                                                   [Cancel]│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│    ┌───────────────────────────────────────────────────────────────────┐   │
│    │  ●─────────────●─────────────○─────────────○─────────────○       │   │
│    │  Patient      Medication    Prescriber    Review        Done      │   │
│    └───────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│    ┌───────────────────────────────────────────────────────────────────┐   │
│    │                                                                   │   │
│    │  Step 2 of 5: Medication Details                                  │   │
│    │  ───────────────────────────────────────────────────────────────  │   │
│    │                                                                   │   │
│    │  Medication Name *                                                │   │
│    │  ┌─────────────────────────────────────────────────────────────┐ │   │
│    │  │ 🔍 Search medications...                                    │ │   │
│    │  └─────────────────────────────────────────────────────────────┘ │   │
│    │                                                                   │   │
│    │  Strength *              Quantity *           Days Supply        │   │
│    │  ┌─────────────────┐    ┌─────────────────┐  ┌─────────────────┐│   │
│    │  │ 100 mg       ▼ │    │ 30              │  │ 30              ││   │
│    │  └─────────────────┘    └─────────────────┘  └─────────────────┘│   │
│    │                                                                   │   │
│    │  Sig (Instructions) *                                            │   │
│    │  ┌─────────────────────────────────────────────────────────────┐ │   │
│    │  │ Take 1 capsule by mouth at bedtime                          │ │   │
│    │  └─────────────────────────────────────────────────────────────┘ │   │
│    │                                                                   │   │
│    │  ───────────────────────────────────────────────────────────────  │   │
│    │  [← Back]                                           [Continue →]  │   │
│    │                                                                   │   │
│    └───────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Wizard Specifications

| Element | Specification |
|---------|---------------|
| Progress indicator | Horizontal stepper, sticky on mobile |
| Step content max-width | 640px centered |
| Step count | Show "Step X of Y" for orientation |
| Navigation buttons | [Back] left, [Continue/Submit] right |
| Validation | Validate on step transition, not just submit |
| Draft saving | Auto-save on step completion |

---

### Template 4: Settings Page

Hierarchical settings with section navigation.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Logo  │  Global Search...                    │ ⚡ │ 🔔 │ [Dr. Smith ▼]     │
├───────┴─────────────────────────────────────────────────────────────────────┤
│        │ Settings                                                          │
├────────┼────────────────────────────────────────────────────────────────────┤
│ 📊 Dash│ ┌────────────────┬─────────────────────────────────────────────────┤
│ 📋 Rxs │ │ Settings Nav   │ Notifications                                  │
│ 👥 Pat │ │ ────────────── │ ─────────────────────────────────────────────  │
│ ⚙ Set │ │                │                                                │
│        │ │ 👤 Profile     │ Email Notifications                            │
│        │ │ 🔔 Notifications│ ─────────────────────────────────────────────  │
│        │ │ 🔒 Security    │                                                │
│        │ │ 💳 Billing     │ ┌─ Prescription Updates ─────────────────────┐ │
│        │ │ 🏢 Organization│ │                                             │ │
│        │ │ 🔌 Integrations│ │ New prescriptions received         [🔘 ON] │ │
│        │ │                │ │ Prescription status changes         [🔘 ON] │ │
│        │ │                │ │ Verification required               [🔘 ON] │ │
│        │ │                │ │                                             │ │
│        │ │                │ └─────────────────────────────────────────────┘ │
│        │ │                │                                                │
│        │ │                │ ┌─ Marketing ────────────────────────────────┐ │
│        │ │                │ │                                             │ │
│        │ │                │ │ Product updates                     [○ OFF]│ │
│        │ │                │ │ Educational content                 [○ OFF]│ │
│        │ │                │ │                                             │ │
│        │ │                │ └─────────────────────────────────────────────┘ │
│        │ │                │                                                │
│        │ │                │ SMS Notifications                              │
│        │ │                │ ─────────────────────────────────────────────  │
│        │ │                │                                                │
│        │ │                │ Phone: (555) 123-4567                  [Edit] │
│        │ │                │                                                │
│        │ │                │ ┌─ Urgent Alerts ────────────────────────────┐ │
│        │ │                │ │ Critical drug interactions          [🔘 ON] │ │
│        │ │                │ │ Prescription holds                  [🔘 ON] │ │
│        │ │                │ └─────────────────────────────────────────────┘ │
│        │ └────────────────┴─────────────────────────────────────────────────┤
└────────┴────────────────────────────────────────────────────────────────────┘
```

#### Settings Specifications

| Element | Specification |
|---------|---------------|
| Settings nav width | 200-240px |
| Content max-width | 720px |
| Section card | border + border-radius-md |
| Section gap | 24px (var(--space-6)) |
| Setting row height | 48px minimum |
| Toggle alignment | Right-aligned |

#### Settings Patterns

| Pattern | When to Use |
|---------|-------------|
| Toggle groups | On/off settings within a category |
| Radio groups | Mutually exclusive options |
| Inline edit | Quick edits (phone, email) |
| Modal edit | Complex configuration (integrations) |
| Danger zone | Destructive actions at bottom, separated |

---

### Template 5: Authentication Pages

Clean, focused layouts for login, signup, and recovery.

```
Login Page                              Signup Page (Multi-Step)
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│                                     │ │                                     │
│                                     │ │                                     │
│         ┌───────────────────┐       │ │         ┌───────────────────┐       │
│         │      [LOGO]       │       │ │         │      [LOGO]       │       │
│         │                   │       │ │         │                   │       │
│         │ Sign in to your   │       │ │         │ Create your       │       │
│         │ pharmacy account  │       │ │         │ account           │       │
│         │                   │       │ │         │                   │       │
│         │ Email             │       │ │         │ ●────○────○       │       │
│         │ ┌───────────────┐ │       │ │         │ Account  Pharmacy │       │
│         │ │               │ │       │ │         │          Details  │       │
│         │ └───────────────┘ │       │ │         │                   │       │
│         │                   │       │ │         │ Full Name *       │       │
│         │ Password          │       │ │         │ ┌───────────────┐ │       │
│         │ ┌───────────────┐ │       │ │         │ │               │ │       │
│         │ │ ●●●●●●●●  👁  │ │       │ │         │ └───────────────┘ │       │
│         │ └───────────────┘ │       │ │         │                   │       │
│         │                   │       │ │         │ Email *           │       │
│         │ [Forgot password?]│       │ │         │ ┌───────────────┐ │       │
│         │                   │       │ │         │ │               │ │       │
│         │ [    Sign In    ] │       │ │         │ └───────────────┘ │       │
│         │                   │       │ │         │                   │       │
│         │ ─────────────────│       │ │         │ [  Continue →   ] │       │
│         │                   │       │ │         │                   │       │
│         │ New to PharmaRx?  │       │ │         │ Already have an   │       │
│         │ [Create account]  │       │ │         │ account? [Sign in]│       │
│         │                   │       │ │         │                   │       │
│         └───────────────────┘       │ │         └───────────────────┘       │
│                                     │ │                                     │
│  © 2026 PharmaRx                    │ │  © 2026 PharmaRx                    │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

#### Auth Page Specifications

| Element | Specification |
|---------|---------------|
| Card width | 400px max, centered |
| Card padding | 32px (var(--space-8)) |
| Background | Subtle gradient or illustration |
| Logo size | 40-48px height |
| Field gap | 16px (var(--space-4)) |
| Primary CTA | Full-width button |
| Footer | Minimal, copyright + terms |

---

### Template 6: Error Pages

```
404 Not Found                           500 Server Error
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ [LOGO]                              │ │ [LOGO]                              │
├─────────────────────────────────────┤ ├─────────────────────────────────────┤
│                                     │ │                                     │
│                                     │ │                                     │
│         ┌───────────────────┐       │ │         ┌───────────────────┐       │
│         │                   │       │ │         │                   │       │
│         │    ┌─────────┐    │       │ │         │    ┌─────────┐    │       │
│         │    │   404   │    │       │ │         │    │   ⚠️    │    │       │
│         │    └─────────┘    │       │ │         │    └─────────┘    │       │
│         │                   │       │ │         │                   │       │
│         │  Page not found   │       │ │         │ Something went    │       │
│         │                   │       │ │         │ wrong             │       │
│         │  The page you're  │       │ │         │                   │       │
│         │  looking for      │       │ │         │ We're working to  │       │
│         │  doesn't exist.   │       │ │         │ fix this issue.   │       │
│         │                   │       │ │         │ Please try again. │       │
│         │  [← Go to Dashboard]│     │ │         │                   │       │
│         │                   │       │ │         │ [Try Again]       │       │
│         │  Or try:          │       │ │         │ [← Go to Dashboard]│      │
│         │  • Prescriptions  │       │ │         │                   │       │
│         │  • Patients       │       │ │         │ Error ID: abc123  │       │
│         │  • Help Center    │       │ │         │ [Report Issue]    │       │
│         │                   │       │ │         │                   │       │
│         └───────────────────┘       │ │         └───────────────────┘       │
│                                     │ │                                     │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

#### Error Page Specifications

| Element | Specification |
|---------|---------------|
| Container | Centered, max 480px |
| Error code | Large, muted text (64px) |
| Message | Clear, brief explanation |
| Primary action | Return to safe location |
| Secondary actions | 2-3 helpful links |
| Error ID | For 500s, show tracking ID |

---

### Template 7: Empty States

Integrated within other templates when content is absent.

```
Empty List State                        Empty Search Results
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ Prescriptions                 [+New]│ │ 🔍 "zxyqwv"                    [×]  │
├─────────────────────────────────────┤ ├─────────────────────────────────────┤
│                                     │ │                                     │
│                                     │ │                                     │
│         ┌───────────────────┐       │ │         ┌───────────────────┐       │
│         │                   │       │ │         │                   │       │
│         │    ┌─────────┐    │       │ │         │    ┌─────────┐    │       │
│         │    │   📋    │    │       │ │         │    │   🔍    │    │       │
│         │    └─────────┘    │       │ │         │    └─────────┘    │       │
│         │                   │       │ │         │                   │       │
│         │ No prescriptions  │       │ │         │ No results for    │       │
│         │ yet               │       │ │         │ "zxyqwv"          │       │
│         │                   │       │ │         │                   │       │
│         │ Create your first │       │ │         │ Try:              │       │
│         │ prescription to   │       │ │         │ • Check spelling  │       │
│         │ get started.      │       │ │         │ • Use fewer words │       │
│         │                   │       │ │         │ • Try patient ID  │       │
│         │ [+ New Prescription]│     │ │         │                   │       │
│         │                   │       │ │         │ [Clear Search]    │       │
│         └───────────────────┘       │ │         └───────────────────┘       │
│                                     │ │                                     │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

#### Empty State Specifications

| Type | Icon | Message Pattern | CTA |
|------|------|-----------------|-----|
| First-use | Feature icon | "No X yet" + value prop | Primary action |
| No results | Search icon | "No results for 'query'" | Clear/suggestions |
| Filtered empty | Filter icon | "No X match filters" | Clear filters |
| Error loading | Warning icon | "Couldn't load X" | Retry |
| Permission | Lock icon | "You don't have access" | Request access |

---

### Template 8: Full-Page Modal / Dialog

For complex tasks that require focus but maintain context.

```
Background Page (dimmed)                 Full-Page Modal (overlay)
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │ [×]  Verify Prescription - Rx #4521 │
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ ├─────────────────────────────────────┤
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │                                     │
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  Patient: John Smith                │
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  DOB: 03/15/1985                    │
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  ⚠️ ALLERGY: Sulfa, PCN             │
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │                                     │
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  ┌─────────────────────────────────┐│
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  │ ☑ Patient identity confirmed    ││
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  │ ☑ Allergies reviewed            ││
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  │ ☐ Drug interactions checked     ││
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  │ ☐ Dosage appropriate            ││
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  │ ☐ Prescriber verified           ││
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  └─────────────────────────────────┘│
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ ├─────────────────────────────────────┤
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │ [Cancel]      [Reject]  [✓ Verify] │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

#### Full-Page Modal Specifications

| Element | Specification |
|---------|---------------|
| Overlay | rgba(0, 0, 0, 0.5) backdrop |
| Modal width | 90vw max, 900px typical |
| Modal height | 90vh max, scrollable content |
| Close button | Top-right, always visible |
| Escape key | Should close (unless critical task) |
| Focus trap | Required for accessibility |
| Sticky footer | Action buttons always visible |

---

### Layout Implementation Patterns

#### CSS Grid for Page Layouts

```css
.app-layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; overflow-y: auto; }

@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main";
  }
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
    transition: transform var(--duration-normal);
  }
  .sidebar--open {
    transform: translateX(0);
  }
}
```

#### Responsive Container

```css
.container {
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1280px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

---

### Healthcare-Specific Layout Considerations

| Consideration | Implementation |
|---------------|----------------|
| Patient banner | Always visible in patient-context pages |
| Allergy alerts | Sticky/fixed position, never scrolled away |
| Action buttons | In consistent locations (bottom-right) |
| Verification checklists | Full-width, impossible to miss |
| Time-sensitive info | Top of viewport with timer |
| Print-friendly | Content regions should map to print layouts |
| Dual-monitor support | List/detail should work at 1920px+ widths |

---

### Layout Template Pitfalls

Common mistakes when implementing page layouts, especially in AI-assisted or template-driven development.

---

#### Pitfall 1: Ignoring Visual Hierarchy ("Wall of Text")

Treating every element with the same level of importance.

```
❌ Wall of Text                         ✓ Clear Hierarchy
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ Patient Information                 │ │ Patient Information                 │
│ ─────────────────────────────────── │ │ ═══════════════════════════════════ │
│ Name: John Smith                    │ │                                     │
│ DOB: 03/15/1985                     │ │ John Smith                          │
│ MRN: 12345                          │ │ DOB: 03/15/1985 · MRN: 12345        │
│ Phone: 555-1234                     │ │                                     │
│ Email: john@email.com               │ │ ───────────────────────────────────│
│ Address: 123 Main St                │ │                                     │
│ Allergies: Sulfa                    │ │ ⚠️ ALLERGIES: Sulfa, Penicillin    │
│ Insurance: BlueCross                │ │                                     │
│ Group: 12345                        │ │ Contact         Insurance           │
│ Member ID: ABC123                   │ │ 555-1234        BlueCross           │
│                                     │ │ john@email.com  Member: ABC123      │
│ (Everything same size, same weight) │ │                                     │
└─────────────────────────────────────┘ └─────────────────────────────────────┘

All fields equal = nothing stands out    Name prominent, allergies highlighted
```

**The F-Pattern/Z-Pattern**: In Western reading cultures, eyes scan top-left to bottom-right. Place critical information (patient name, allergies) top-left; place actions (buttons) bottom-right.

| Element | Visual Weight |
|---------|---------------|
| Patient name | Largest, boldest |
| Safety alerts (allergies) | High contrast, icon |
| Identifiers (DOB, MRN) | Secondary, grouped |
| Contact/Insurance | Tertiary, scannable |

**Healthcare Impact**: A pharmacist scanning 50 prescriptions needs allergies to "pop" without reading every field.

---

#### Pitfall 2: The "Frankenstein" Template

Pulling components from different templates or design systems because you liked specific elements from each.

```
❌ Frankenstein Layout                  ✓ Unified System
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ ┌───────────────────────────────┐   │ │ ┌───────────────────────────────┐   │
│ │ Card A (radius: 24px)         │   │ │ │ Card A (radius: 8px)          │   │
│ │ shadow: 0 25px 50px           │   │ │ │ shadow: 0 4px 6px             │   │
│ │ font: Playfair Display        │   │ │ │ font: Inter                   │   │
│ └───────────────────────────────┘   │ │ └───────────────────────────────┘   │
│                                     │ │                                     │
│ ╭───────────────────────────────╮   │ │ ┌───────────────────────────────┐   │
│ │ Card B (radius: 0px)          │   │ │ │ Card B (radius: 8px)          │   │
│ │ border: 3px solid black       │   │ │ │ shadow: 0 4px 6px             │   │
│ │ font: Roboto Mono             │   │ │ │ font: Inter                   │   │
│ ╰───────────────────────────────╯   │ │ └───────────────────────────────┘   │
│                                     │ │                                     │
│ (╭╮ = pill, ┌┐ = sharp, mixed!)     │ │ (All cards follow same system)      │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

**Symptoms of Frankenstein**:

| Symptom | Example |
|---------|---------|
| Inconsistent margins | 16px here, 24px there, 20px elsewhere |
| Mixed font pairings | Sans-serif headers with serif body |
| Radius chaos | Rounded cards, sharp buttons, pill inputs |
| Shadow variance | Subtle shadow on cards, heavy on modals |

**The Fix**: Pick one design system (this one!) and reskin any imported elements to match.

---

#### Pitfall 3: Neglecting White Space ("Fill Every Pixel")

The urge to cram content into every available space to look "valuable."

```
❌ Cramped Layout                       ✓ Breathing Room
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐│ │                                     │
││KPI││KPI││KPI││KPI││KPI││KPI││KPI││ │  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐ │
│└───┘└───┘└───┘└───┘└───┘└───┘└───┘│ │  │ KPI │  │ KPI │  │ KPI │  │ KPI │ │
│┌─────────────────┐┌───────────────┐│ │  └─────┘  └─────┘  └─────┘  └─────┘ │
││Chart Chart Chart││Table Table    ││ │                                     │
││Chart Chart Chart││Table Table    ││ │  ┌───────────────────────────────┐ │
││Chart Chart Chart││Table Table    ││ │  │                               │ │
│└─────────────────┘└───────────────┘│ │  │         Chart                 │ │
│┌─────────────────┐┌───────────────┐│ │  │                               │ │
││More stuff       ││Even more      ││ │  └───────────────────────────────┘ │
│└─────────────────┘└───────────────┘│ │                                     │
│ Where do I look? Everywhere = nowhere│ │  Focus is clear                    │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

**White Space Guidelines**:

| Context | Minimum Spacing |
|---------|-----------------|
| Between sections | 32-48px (var(--space-8) to --space-12) |
| Between cards | 16-24px (var(--space-4) to --space-6) |
| Card internal padding | 16-24px |
| Content max-width | Don't exceed 1200px for readability |

**Healthcare Impact**: A dashboard showing 12 metrics teaches the user nothing. A dashboard showing 4 key metrics with context enables decisions.

---

#### Pitfall 4: Fixed-Width Failures ("The Squish")

Designing for one viewport and watching it break everywhere else.

```
Desktop (designed for)                  Mobile (squished disaster)
┌─────────────────────────────────────┐ ┌─────────────────┐
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │ │┌──┐┌──┐┌──┐┌──┐│
│ │  Card   │ │  Card   │ │  Card   │ │ ││Ca││Ca││Ca││Ca││
│ │ 300px   │ │ 300px   │ │ 300px   │ │ ││rd││rd││rd││rd││
│ └─────────┘ └─────────┘ └─────────┘ │ │└──┘└──┘└──┘└──┘│
│                                     │ │ Unreadable!    │
│ Looks great at 1200px               │ │ Text truncated │
└─────────────────────────────────────┘ └─────────────────┘

✓ Responsive Solution
Desktop                    Tablet                Mobile
┌─────────────────────┐    ┌───────────────┐     ┌─────────┐
│ ┌───┐ ┌───┐ ┌───┐   │    │ ┌───┐ ┌───┐   │     │ ┌─────┐ │
│ │   │ │   │ │   │   │    │ │   │ │   │   │     │ │     │ │
│ └───┘ └───┘ └───┘   │    │ └───┘ └───┘   │     │ └─────┘ │
│                     │    │ ┌───┐ ┌───┐   │     │ ┌─────┐ │
│ 4 columns           │    │ │   │ │   │   │     │ │     │ │
│                     │    │ └───┘ └───┘   │     │ └─────┘ │
└─────────────────────┘    │ 2 columns     │     │ 1 column│
                           └───────────────┘     └─────────┘
```

**Responsive Testing Checklist**:

| Viewport | Test For |
|----------|----------|
| 320px (small mobile) | No horizontal scroll, readable text |
| 768px (tablet) | Touch targets 44px+, logical reflow |
| 1024px (laptop) | Sidebar behavior, form layouts |
| 1920px+ (workstation) | No wasted space, dual-panel support |

---

#### Pitfall 5: Placeholder Logic Mismatch

Choosing templates based on how the placeholder content looks, not how your real content fits.

```
Template Preview (3 items)              Your Reality (12 items)
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ Categories                          │ │ Categories                          │
│                                     │ │                                     │
│  ┌───────────┐                      │ │  ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐│
│  │ Category  │                      │ │  │A││B││C││D││E││F││G││H││I││J││K││
│  │ One       │                      │ │  └─┘└─┘└─┘└─┘└─┘└─┘└─┘└─┘└─┘└─┘└─┘│
│  └───────────┘                      │ │                                     │
│  ┌───────────┐                      │ │  (Doesn't fit, becomes unusable)    │
│  │ Category  │   Looks elegant!     │ │                                     │
│  │ Two       │                      │ │                                     │
│  └───────────┘                      │ │  Template Title Was                 │
│  ┌───────────┐                      │ │  "Short & Sweet"                    │
│  │ Category  │                      │ │                                     │
│  │ Three     │                      │ │  Your Title Is "Comprehensive       │
│  └───────────┘                      │ │  Analysis of Patient Medication     │
└─────────────────────────────────────┘ │  History and Interaction Review"    │
                                        └─────────────────────────────────────┘
```

**Before Choosing a Template**:

| Question | If Yes... |
|----------|-----------|
| Will you have >5 items in lists? | Choose templates with scroll/pagination |
| Are your titles >5 words? | Avoid single-line header templates |
| Do you have dense tabular data? | Avoid "minimalist" card layouts |
| Is content user-generated? | Plan for edge cases (empty, overflow) |

---

### Vibe-Coded Layout Anti-Patterns

Layout-specific problems that emerge from AI-generated or trend-driven design.

---

#### Pitfall 1: The "Bento Box" Overload

The grid-based card layout (inspired by Apple's feature pages) has become the default for vibe-coded UIs.

```
❌ Everything is a Bento Box            ✓ Right Tool for the Job
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ Settings                            │ │ Settings                            │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │ │                                     │
│ │ Profile │ │ Notifs  │ │ Privacy │ │ │ Profile                             │
│ │  ┌──┐   │ │  🔔     │ │  🔒     │ │ │ ───────────────────────────────────│
│ │  └──┘   │ │         │ │         │ │ │ Name              [John Smith    ] │
│ └─────────┘ └─────────┘ └─────────┘ │ │ Email             [john@email.com] │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │ │                                     │
│ │ Theme   │ │ Sound   │ │ Display │ │ │ Notifications                       │
│ │  🎨     │ │  🔊     │ │  📱     │ │ │ ───────────────────────────────────│
│ └─────────┘ └─────────┘ └─────────┘ │ │ Email alerts              [ON ]    │
│                                     │ │ Push notifications        [OFF]    │
│ Why are settings in a grid?!        │ │                                     │
└─────────────────────────────────────┘ │ Settings are linear, use a list     │
                                        └─────────────────────────────────────┘
```

**When to Use Bento**:

| Use Bento For | Don't Use Bento For |
|---------------|---------------------|
| Dashboard KPI overview | Sequential settings |
| Feature showcase | Form inputs |
| Category navigation | Data tables |
| Media galleries | Text-heavy content |

---

#### Pitfall 2: "Default" Radius Clashing

AI pulls components from different libraries, each with different corner radius defaults.

```
❌ Radius Chaos                         ✓ Radius Hierarchy
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ ╭───────────────────────────────╮   │ │ ┌───────────────────────────────┐   │
│ │ Container (radius: 24px)      │   │ │ │ Container (radius: 12px)      │   │
│ │                               │   │ │ │                               │   │
│ │  ┌───────────────────────┐    │   │ │ │  ┌───────────────────────┐    │   │
│ │  │ Input (radius: 0px)   │    │   │ │ │  │ Input (radius: 6px)   │    │   │
│ │  └───────────────────────┘    │   │ │ │  └───────────────────────┘    │   │
│ │                               │   │ │ │                               │   │
│ │  ╭───────────────────────╮    │   │ │ │  ┌───────────────────────┐    │   │
│ │  │ Button (pill: 9999px) │    │   │ │ │  │ Button (radius: 6px)  │    │   │
│ │  ╰───────────────────────╯    │   │ │ │  └───────────────────────┘    │   │
│ ╰───────────────────────────────╯   │ │ └───────────────────────────────┘   │
│                                     │ │                                     │
│ Three different systems = collage   │ │ Consistent nesting ratio            │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

**Radius Hierarchy System**:

| Level | Radius | Use For |
|-------|--------|---------|
| Container (outer) | 12px | Cards, modals, panels |
| Component (inner) | 6px | Inputs, buttons, badges |
| Micro elements | 4px | Checkboxes, small tags |
| Pill (exception) | 9999px | Status badges, chips only |

**Rule**: Inner radius should be outer radius minus the padding, or at most half the outer radius.

---

#### Pitfall 3: The "Linear" Dark Mode Trap

Vibe-coded apps often copy Linear's aesthetic: charcoal backgrounds with glowing accent borders.

```
❌ Low-Contrast "Aesthetic"             ✓ Accessible Dark Mode
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ ████████████████████████████████████│ │ ████████████████████████████████████│
│ █                                  █│ │ █                                  █│
│ █  ┌─────────────────────────────┐ █│ │ █  ┌─────────────────────────────┐ █│
│ █  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ █│ │ █  │                             │ █│
│ █  │ ▓ Card Title (gray on gray)▓ │ █│ │ █  │ Card Title (white on dark) │ █│
│ █  │ ▓                          ▓ │ █│ │ █  │                             │ █│
│ █  │ ▓ Body text barely visible ▓ │ █│ │ █  │ Body text clearly readable │ █│
│ █  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ █│ │ █  │                             │ █│
│ █  └─────────────────────────────┘ █│ │ █  └─────────────────────────────┘ █│
│ █                                  █│ │ █                                  █│
│ ████████████████████████████████████│ │ ████████████████████████████████████│
│                                     │ │                                     │
│ Looks cool on OLED, fails in        │ │ Works on all screens, in sunlight   │
│ sunlight and cheap monitors         │ │                                     │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

**Dark Mode Contrast Requirements**:

| Element | Minimum Ratio | Recommended |
|---------|---------------|-------------|
| Body text | 4.5:1 | 7:1 for healthcare |
| Large text (18px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |
| Borders/dividers | 3:1 | Visible but subtle |

**Healthcare Impact**: Pharmacists may work in bright pharmacy lighting—"aesthetic" dark modes become unusable.

---

#### Pitfall 4: Over-Animation ("The Bouncy Problem")

AI generates complex animations easily, leading to apps that move too much.

```
❌ Everything Animates                  ✓ Purposeful Motion
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│                                     │ │                                     │
│  Button hover: scale(1.1) + glow    │ │  Button hover: background shift     │
│  Card enter: fade + slide + bounce  │ │  Card enter: fade only (200ms)      │
│  List items: stagger 100ms each     │ │  List items: no animation           │
│  Scroll: parallax everything        │ │  Scroll: native behavior            │
│  Success: confetti explosion 🎉     │ │  Success: checkmark + green flash   │
│                                     │ │                                     │
│  User feels: "This is slow/laggy"   │ │  User feels: "This is responsive"   │
│  (Even though animations are fast)  │ │                                     │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

**Animation Budget**:

| Animation Type | Duration | Easing | When to Use |
|----------------|----------|--------|-------------|
| Hover/focus | <100ms | ease-out | Always allowed |
| Button feedback | <150ms | ease-out | Click response |
| Panel transitions | 200ms | ease-in-out | Open/close |
| Page enter | 300ms | ease-out | Initial load only |
| Stagger effects | — | — | Never in data-heavy UIs |

**Banned in Healthcare**:
- Spring/bounce physics (feels toy-like)
- Staggered list animations (delays critical data)
- Parallax scroll (disorienting)
- Confetti/celebration (inappropriate for clinical context)

---

#### Pitfall 5: Lack of "Information Scent"

Minimalist aesthetics often sacrifice usability signals.

```
❌ Mystery Meat Navigation              ✓ Clear Affordances
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│                                     │ │                                     │
│  ⚪  ⚪  ⚪  ⚪  ⚪                   │ │  📊 Dashboard                       │
│                                     │ │  📋 Prescriptions                   │
│  (What do these circles mean?)      │ │  👥 Patients                        │
│                                     │ │  ⚙️ Settings                        │
│  ┌─────────────────────────────┐    │ │                                     │
│  │                        •••  │    │ │  ┌─────────────────────────────┐    │
│  │  Patient: John Smith        │    │ │  │  Patient: John Smith        │    │
│  │                             │    │ │  │  [Edit] [Print] [Archive]   │    │
│  └─────────────────────────────┘    │ │  └─────────────────────────────┘    │
│                                     │ │                                     │
│  (Actions hidden in ••• menu)       │ │  (Frequent actions visible)         │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

**Information Scent Rules**:

| Frequency | Visibility |
|-----------|------------|
| Used >3x per session | Always visible with label |
| Used 1-3x per session | Visible icon, tooltip label |
| Used <1x per session | Can be in overflow menu |
| Critical/destructive | Always labeled, never icon-only |

**Healthcare Icons That Need Labels**:

| Icon | Ambiguous Meaning | Required Label |
|------|-------------------|----------------|
| ✓ | Complete? Verify? Approve? | "Verify" or "Approve" |
| ✕ | Close? Cancel? Reject? | "Cancel Rx" or "Reject" |
| ⚠️ | Warning? Info? Interaction? | Specific warning type |
| 📋 | Prescriptions? Forms? Notes? | "Prescriptions" |

---

### Layout Quality Checklist

| Red Flag | The Problem | The Solution |
|----------|-------------|--------------|
| Glowing borders everywhere | Visual noise, "aesthetic over function" | Use glow only for active/focus state |
| Empty space with no purpose | Not "white space"—just wasted space | Ensure spacing groups related content |
| Thin font weights (100-200) | Unreadable, especially at small sizes | Use 400+ for body, 500+ for labels |
| Custom scroll behavior | Fights user expectations | Use native scroll, remove "smooth scroll" |
| Everything in a card | Card fatigue, no hierarchy | Cards for grouping only, not every element |
| Icons without labels | "Mystery meat" navigation | Label all primary navigation |
| Inconsistent touch targets | Frustrating on mobile | 44x44px minimum for all tappable elements |
| Animation on data refresh | Distracting, feels slow | Instant update, subtle highlight only |

---

## AI-Assisted Design Pitfalls

> **"Vibe Coding"** refers to building UIs by prompting AI rather than following design specifications. While fast, it produces patterns that are dangerous in healthcare contexts.

### Why This Matters for Healthcare

| Consumer App | Healthcare Platform |
|--------------|---------------------|
| Inconsistency feels "indie" | Inconsistency erodes trust |
| One-screen is "focused" | Complex workflows require navigation |
| "Snappy" animations delight | Unexpected motion distracts from critical data |
| Search-first is modern | Pharmacists need structured workflows |

**In healthcare, "vibe" can kill.** A slightly different button radius is annoying in a todo app—but a verification button that looks different than expected could cause a pharmacist to miss a critical step.

---

### Pitfall 1: "Vibe Over Spec" (Aesthetic Drift)

AI-generated UIs often drift from design system specifications, creating subtle inconsistencies.

```
What AI generates:                    What the spec says:
┌─────────────────────┐               ┌─────────────────────┐
│ Button A            │               │ Button A            │
│ radius: 8px         │               │ radius: 6px         │
│ shadow: 0 4px 8px   │               │ shadow: 0 4px 6px   │
└─────────────────────┘               └─────────────────────┘
┌─────────────────────┐               ┌─────────────────────┐
│ Button B            │               │ Button B            │
│ radius: 6px         │               │ radius: 6px         │
│ shadow: 0 2px 4px   │               │ shadow: 0 4px 6px   │
└─────────────────────┘               └─────────────────────┘

"Close enough" = inconsistent user experience
```

#### The Problem

| Symptom | Healthcare Impact |
|---------|-------------------|
| Buttons with varying radii | Users can't build muscle memory |
| Inconsistent spacing | Scanning data tables becomes harder |
| Shadow variations | Visual hierarchy breaks down |
| Color approximations | Status indicators lose meaning |

#### The Fix

```typescript
// BAD: Vibed values
<button className="rounded-lg shadow-md px-4 py-2">

// GOOD: Design token references
<button className="rounded-md shadow-sm px-4 py-2">
// Where rounded-md = 6px (from system), not "whatever feels right"
```

**Rule**: Never accept AI-generated styling without verifying against design tokens. If the value isn't in your token system, it's wrong.

---

### Pitfall 2: High-Density, One-Screen Philosophy

AI tends to generate single-screen apps because that's how prompts are structured: "Build me a [thing]."

```
AI-generated "Prescription Manager":
┌─────────────────────────────────────────────────────────┐
│ [Search...]                                      [+]   │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ │ Rx 001  │ │ Rx 002  │ │ Rx 003  │ │ Rx 004  │       │
│ │ Patient │ │ Patient │ │ Patient │ │ Patient │       │
│ │ Status  │ │ Status  │ │ Status  │ │ Status  │       │
│ │ [Edit]  │ │ [Edit]  │ │ [Edit]  │ │ [Edit]  │       │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│                                                        │
│ Everything on one screen = "modern"                    │
└─────────────────────────────────────────────────────────┘

What pharmacists actually need:
┌─────────────────────────────────────────────────────────┐
│ [Queue] [Verification] [Dispensing] [Inventory] [Pts]  │  ← Navigation
├─────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────┐  │
│ │ Patient: John Smith    DOB: 01/15/1980    MRN: 123│  │  ← Context
│ │ Allergies: PENICILLIN (Severe)                    │  │
│ └───────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│ Detailed workflow content with proper navigation       │  ← Workflow
│ Not everything crammed into one view                   │
└─────────────────────────────────────────────────────────┘
```

#### The Problem

| AI Assumption | Healthcare Reality |
|---------------|-------------------|
| Single utility tool | Multi-step regulated workflows |
| No navigation needed | Complex state machines |
| Everything visible | HIPAA requires appropriate data scoping |
| Dense is efficient | Cognitive overload causes errors |

#### The Fix

- Always specify navigation structure in prompts
- Request workflow diagrams before UI
- Reject "dashboard-only" designs for workflow apps
- Insist on proper information architecture

---

### Pitfall 3: Component "Stitching" (Quality Mismatch)

AI assembles components from different sources, creating jarring quality differences.

```
┌─────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────┐ │
│ │  ██████████████                                     │ │
│ │  ████  Sophisticated Interactive Chart  ████████   │ │  ← Fancy
│ │  ██████████████████████████████████████████████    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Patient Name: [_______________]                         │  ← Basic
│ Date: [_______________]                                 │  ← Basic
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │  Beautiful animated card component                  │ │  ← Fancy
│ │  with glassmorphism effects                         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Notes: <textarea plain and unstyled>                    │  ← Basic
│                                                         │
└─────────────────────────────────────────────────────────┘

The "Frankenstein" UI
```

#### The Problem

| Symptom | Impact |
|---------|--------|
| Mixed component libraries | Inconsistent interaction patterns |
| Varying levels of polish | Unprofessional appearance |
| Different animation systems | Disorienting transitions |
| Accessibility gaps | Some components screen-reader friendly, others not |

#### The Fix

```typescript
// BAD: Mixed sources
import { FancyChart } from 'some-chart-lib';
import { BasicInput } from 'another-form-lib';
import { Card } from 'yet-another-ui-lib';

// GOOD: Single source of truth
import { Chart, Input, Card } from '@/components/ui';
// All components follow same design system
```

**Rule**: All components must come from the same design system. If AI suggests a third-party component, wrap it in your system's styling or reject it.

---

### Pitfall 4: Reactive Interaction Over Planned Motion

AI generates "vibed" animations based on prompts like "make it feel snappy" rather than purposeful motion design.

```
Prompt: "Make the button feel satisfying to click"

AI output:
button:hover {
  transform: scale(1.05);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

button:active {
  transform: scale(0.95);
}

Problem: "Bouncy" is fun for a game, distracting for a pharmacist
verifying a controlled substance prescription.
```

#### The Problem

| AI Tendency | Healthcare Need |
|-------------|-----------------|
| "Bouncy" hover effects | Subtle, professional feedback |
| Playful animations | Purposeful transitions |
| Attention-grabbing motion | Non-distracting confirmation |
| "Delightful" microinteractions | Efficient workflows |

#### The Fix

Define your motion system explicitly and reject AI suggestions that don't match:

```css
/* Healthcare-appropriate motion tokens */
:root {
  /* Timing */
  --duration-instant: 100ms;   /* Hover, focus */
  --duration-quick: 200ms;     /* Transitions */
  --duration-moderate: 300ms;  /* Modal open/close */

  /* Easing - no bounce, no overshoot */
  --ease-default: ease-out;
  --ease-in: ease-in;
  --ease-out: ease-out;

  /* NOT these */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* ❌ */
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);   /* ❌ */
}

/* Button: subtle, professional */
.button {
  transition: background-color var(--duration-instant) var(--ease-default);
}

.button:hover {
  /* NO scale, NO bounce, just color change */
  background-color: var(--color-primary-hover);
}
```

---

### Pitfall 5: Intent-Based Navigation (Search as Home)

AI loves chat interfaces and search bars because they're "AI-native."

```
AI-generated pattern:
┌─────────────────────────────────────────────────────────┐
│                                                         │
│          🔍 What would you like to do today?            │
│          ┌───────────────────────────────────────────┐  │
│          │ Type a command or search...               │  │
│          └───────────────────────────────────────────┘  │
│                                                         │
│          Recent: "Find patient John Smith"              │
│          Recent: "Check drug interactions"              │
│          Recent: "Verify prescription RX-001"           │
│                                                         │
└─────────────────────────────────────────────────────────┘

"Just ask the app what you want!" = The Linear/Notion aesthetic
```

#### The Problem

| AI Assumption | Pharmacy Reality |
|---------------|------------------|
| User will describe intent | Pharmacist follows regulated workflow |
| Search is faster | Standard tasks need 1-click access |
| Natural language is intuitive | Precise navigation is reliable |
| Discovery through search | Training assumes consistent UI |

#### When Search-First Fails

```
Pharmacist: "I need to verify this prescription"

Search-first UI: "Type what you want to do"
- Extra cognitive load
- Typing while wearing gloves
- Inconsistent query results
- Audit trail shows searches, not actions

Traditional UI: Click [Verification Queue] → Select Rx → Click [Verify]
- Muscle memory
- Consistent path
- Clear audit trail
- Works with gloves/touch
```

#### The Fix

Search is a supplement, not a replacement for navigation:

```
┌─────────────────────────────────────────────────────────┐
│ [Queue] [Verification] [Dispensing] [Inventory]  🔍     │  ← Primary nav
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Verification Queue (12)                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ RX-001 | John Smith | Progesterone | ⏱ Waiting      │ │
│ │ RX-002 | Jane Doe   | Testosterone | ⏱ Waiting      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘

Search available, but not the primary interface
```

---

### The "LLM Look" Checklist

Before accepting AI-generated designs, check for these telltale signs:

```markdown
## Detecting "Vibed" Design

### Visual Consistency
- [ ] Are all border radii from the token system?
- [ ] Are all shadows from the token system?
- [ ] Are all colors from the palette (no hex guessing)?
- [ ] Are all spacing values multiples of 4px?

### Component Quality
- [ ] Do all components come from the same library?
- [ ] Is the polish level consistent across all elements?
- [ ] Are accessibility features consistent throughout?

### Navigation & Structure
- [ ] Is there proper navigation (not just search)?
- [ ] Are workflows properly structured (not one-screen)?
- [ ] Is information architecture appropriate for healthcare?

### Motion & Interaction
- [ ] Are animations subtle and professional?
- [ ] No "bouncy" or "playful" effects?
- [ ] Motion serves purpose (feedback, not delight)?

### Healthcare-Specific
- [ ] Patient identification is always visible?
- [ ] Allergy warnings are prominent?
- [ ] Critical actions require confirmation?
- [ ] Audit-trail-friendly interactions?
```

---

### Prompt Engineering for Healthcare UI

When using AI to generate UI, include healthcare context explicitly:

```
BAD PROMPT:
"Create a prescription verification screen"

GOOD PROMPT:
"Create a prescription verification screen for a compounding pharmacy.

Requirements:
- Must follow our design system (attached)
- Patient identification banner always visible at top
- Allergy warnings prominent and red
- Use Inter font, 4dp spacing grid
- No playful animations - professional, clinical aesthetic
- Navigation tabs for workflow steps
- All components from shadcn/ui styled to our tokens
- WCAG 2.1 AA accessibility
- Buttons: 6px radius, our shadow-sm token
- Must support keyboard navigation for pharmacists

NOT acceptable:
- Search-as-navigation patterns
- Bouncy/playful animations
- One-screen-does-everything approach
- Mixed component libraries
- Approximate colors (must be from our palette)
"
```

---

### Summary: Vibe vs. Spec

| Vibe Coding | Healthcare Standard |
|-------------|---------------------|
| "Feels right" | Matches design tokens exactly |
| One-screen apps | Proper information architecture |
| Mixed component quality | Consistent design system |
| "Snappy" animations | Purposeful, subtle motion |
| Search-first navigation | Structured workflows |
| Fast to demo | Safe to use |

**The goal is not to avoid AI—it's to ensure AI-generated designs conform to your design system, not the other way around.**

---

## Design System Governance

A design system is a tool, not a rulebook. These pitfalls emerge when systems become too rigid, too neglected, or misunderstood.

---

### Pitfall 1: The "Bootstrap" Effect (Homogenization)

When a design system is too opinionated or lacks brand flexibility, every product starts to look like a generic SaaS template.

```
Every SaaS in 2024:
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo]              Search...                      [Avatar]                 │
├────────────┬────────────────────────────────────────────────────────────────┤
│            │                                                                │
│ Dashboard  │   Welcome back, User!                                         │
│ Analytics  │   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ Settings   │   │ Metric   │ │ Metric   │ │ Metric   │ │ Metric   │         │
│            │   │  1,234   │ │  5,678   │ │  91%     │ │  $999    │         │
│            │   └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│            │                                                                │
│            │   ┌────────────────────────────────────────────────────┐      │
│            │   │                    Chart                           │      │
│            │   └────────────────────────────────────────────────────┘      │
└────────────┴────────────────────────────────────────────────────────────────┘

Is this: A) Your pharmacy platform  B) A CRM  C) A project manager  D) All of the above
```

**The Trap**: Designers stop thinking about the best solution for a specific user problem and instead just "assemble" components.

**The Result**: A sea of sameness where your brand loses its visual identity and emotional connection with users.

**Healthcare-Specific Risk**: If your pharmacy platform looks identical to every other SaaS, pharmacists may not trust it as a specialized clinical tool.

**The Fix**:

| Approach | Implementation |
|----------|----------------|
| Platform-specific color | Patient (blue), Doctor (red), Pharmacy (purple), Employer (orange) |
| Domain-specific patterns | Prescription cards, verification checklists, compound worksheets |
| Contextual components | Allergy banners, drug interaction alerts, patient ID headers |
| Workflow-driven layouts | Designed for pharmacy tasks, not generic dashboards |

---

### Pitfall 2: Governance Rigidity

Some design systems are treated like sacred texts rather than living tools.

```
Bureaucratic Process:                    Healthy Process:
┌─────────────────────────────┐          ┌─────────────────────────────┐
│ 1. Submit RFC              │          │ 1. Propose in team channel  │
│ 2. Wait for committee (2wk)│          │ 2. Quick discussion         │
│ 3. Present at review       │          │ 3. Prototype + test         │
│ 4. Revise based on feedback│          │ 4. Document + ship          │
│ 5. Re-submit               │          │                             │
│ 6. Wait again (2wk)        │          │ Time: Days                  │
│ 7. Final approval          │          │                             │
│ 8. Implementation queue    │          │                             │
│                            │          │                             │
│ Time: 2-3 months           │          │                             │
└─────────────────────────────┘          └─────────────────────────────┘
```

**The Pitfall**: If the process to propose a new component or pattern is too bureaucratic, designers will either:
- Give up (leading to stale UX)
- "Detach" components and create one-offs (technical debt)
- Work around the system entirely

**The Reality**: A design system should be a **floor, not a ceiling**.

**Contribution Guidelines**:

| Change Type | Process |
|-------------|---------|
| Token adjustment | PR with rationale, quick review |
| Component variant | Prototype, test with users, document |
| New component | Identify pattern (3+ uses), propose, build |
| Breaking change | Deprecation period, migration guide |

---

### Pitfall 3: Accessibility as a "Checklist"

Modern systems often treat accessibility as a solved problem because the components are technically compliant.

```
Component Compliance:                    Actual User Flow:
┌─────────────────────────────┐          ┌─────────────────────────────┐
│ [Button]                    │          │ Step 1: Find the button     │
│  - Contrast: 4.5:1         │          │         (buried in UI)      │
│  - Focus visible           │          │                             │
│  - aria-label present      │          │ Step 2: Understand context  │
│  - Keyboard accessible     │          │         (no instructions)   │
│                             │          │                             │
│ "We're accessible!"         │          │ Step 3: Complete the task   │
│                             │          │         (error with no help)│
│                             │          │                             │
│                             │          │ "I gave up."                │
└─────────────────────────────┘          └─────────────────────────────┘
```

**The Danger**: Just because a button has the right contrast ratio doesn't mean the user flow is accessible.

**The Pitfall**: Teams over-rely on the system's defaults and stop performing actual usability testing with people with disabilities.

**Beyond Component Compliance**:

| Level | What It Means |
|-------|---------------|
| Component a11y | Individual elements are compliant (baseline) |
| Flow a11y | The task sequence works for assistive tech |
| Cognitive a11y | Instructions are clear, errors are helpful |
| Tested a11y | Real users with disabilities have validated it |

**Healthcare Requirement**: Pharmacists and patients may have visual impairments, motor difficulties, or cognitive load from medication effects. Component compliance is the minimum, not the goal.

---

### Pitfall 4: Maintenance Debt vs. Feature Value

Design system teams can become "component factories," obsessing over perfection while the product stagnates.

```
Design System Team:                      Product Reality:
┌─────────────────────────────┐          ┌─────────────────────────────┐
│ Q1: Perfect the DatePicker  │          │ Users: "The checkout flow   │
│     - 47 edge cases handled │          │         is confusing"       │
│     - RTL support           │          │                             │
│     - 12 calendar systems   │          │ Users: "I can't find my     │
│                             │          │         prescriptions"      │
│ Q2: Token naming convention │          │                             │
│     - 6 stakeholder reviews │          │ Users: "Why does this take  │
│     - Migration strategy    │          │         so many clicks?"    │
│                             │          │                             │
│ "Our system is world-class!"│          │ "We're losing users."       │
└─────────────────────────────┘          └─────────────────────────────┘
```

**The Pitfall**: Spending months perfecting a DatePicker that works in every edge case, while the core product's user experience remains clunky.

**Balance Framework**:

| Priority | Design System Work | Product Work |
|----------|-------------------|--------------|
| High | Components blocking product features | Core user flows |
| Medium | Consistency improvements | Feature enhancements |
| Low | Edge case perfection | Nice-to-have polish |

**Rule of Thumb**: If a design system improvement doesn't unblock a product need within 30 days, deprioritize it.

---

### Pitfall 5: The "Inventory" Mindset

There is a massive difference between a **Component Library** and a **Design System**.

```
Component Library:                       Design System:
┌─────────────────────────────┐          ┌─────────────────────────────┐
│ Button                      │          │ Button                      │
│ |-- Primary                 │          │ |-- Primary                 │
│ |-- Secondary               │          │ |-- Secondary               │
│ '-- Destructive             │          │ '-- Destructive             │
│                             │          │                             │
│ "Here's how to use it."     │          │ WHEN to use each:           │
│                             │          │ - Primary: 1 per screen max │
│                             │          │ - Secondary: Supporting acts│
│                             │          │ - Destructive: Irreversible │
│                             │          │                             │
│                             │          │ WHY these exist:            │
│                             │          │ - Visual hierarchy          │
│                             │          │ - Reduce decision fatigue   │
│                             │          │ - Prevent accidental actions│
└─────────────────────────────┘          └─────────────────────────────┘
```

**The Mistake**: Having a UI kit in Figma and a library in React without documenting the *why*.

**The Result**: "Boring" systems tell you how to use a checkbox, but they don't tell you when it's better to use a toggle or a radio button.

**Documentation Requirements**:

| Component Doc | Must Include |
|---------------|--------------|
| What | Props, variants, examples |
| When | Use cases, decision criteria |
| Why | Design rationale, user research |
| When Not | Anti-patterns, wrong contexts |
| Healthcare Context | Clinical considerations |

---

### Rigidity vs. Flexibility Comparison

| Feature | Rigid System | Adaptive System |
|---------|--------------|-----------------|
| Philosophy | "Follow the rules." | "Use these tools to solve problems." |
| Components | Locked, no overrides | Composition-based, slot-friendly |
| Brand Expression | Static and monochrome | Design tokens enable theming |
| Update Loop | Centralized, slow, bureaucratic | Federated, community-driven |
| Edge Cases | "Not supported" | Escape hatches documented |
| Innovation | Discouraged | Encouraged with guardrails |

---

### The Goal

Design systems should **automate the boring stuff** (buttons, inputs, spacing) so that designers have the mental space to **solve the interesting stuff** (innovation, delight, and complex workflows).

```
What the System Handles:               What Humans Focus On:
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ - Button styling            │        │ * Prescription verification │
│ - Form input patterns       │        │   workflow optimization     │
│ - Spacing consistency       │        │                             │
│ - Color accessibility       │        │ * Drug interaction alerts   │
│ - Typography scale          │        │   that actually get noticed │
│ - Responsive breakpoints    │        │                             │
│ - Focus states              │        │ * Patient experience during │
│ - Loading patterns          │        │   medication pickup         │
│                             │        │                             │
│ (Solved once, used forever) │        │ (Requires human judgment)   │
└─────────────────────────────┘        └─────────────────────────────┘
```

**For this pharmacy platform**: The design system ensures every button, form, and layout is consistent and accessible. This frees the team to focus on what matters: safe, efficient prescription workflows that protect patients and support pharmacists.

---

## Z-Index Scale

A consistent z-index scale prevents layering conflicts and ensures predictable stacking behavior across the application.

### Design Philosophy

Z-index values follow a tiered system with intentional gaps, allowing room for edge cases without restructuring the entire scale.

```
┌─────────────────────────────────────────────────────────────────┐
│  z-9999  │ System Critical    │ Drug interaction alerts         │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-9000  │ Emergency          │ Session timeout, system errors  │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-100   │ Toast/Notification │ Success/error messages          │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-90    │ Tooltip            │ Help text, info hovers          │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-80    │ Modal/Dialog       │ Confirmation dialogs, forms     │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-70    │ Modal Backdrop     │ Overlay behind modals           │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-60    │ Drawer/Sidebar     │ Slide-out panels                │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-50    │ Dropdown/Popover   │ Select menus, date pickers      │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-40    │ Sticky Header      │ App header, navigation          │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-30    │ Sticky Elements    │ Table headers, section headers  │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-20    │ Floating Actions   │ FAB buttons, quick actions      │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-10    │ Elevated Content   │ Cards with hover, selected rows │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-0     │ Base               │ Default content layer           │
├──────────┼────────────────────┼─────────────────────────────────┤
│  z-neg   │ Background         │ Decorative elements, backdrops  │
└──────────┴────────────────────┴─────────────────────────────────┘
```

---

### Token Definitions

```css
:root {
  /* Base layers */
  --z-background: -1;
  --z-base: 0;
  --z-elevated: 10;

  /* Interactive layers */
  --z-floating: 20;
  --z-sticky: 30;
  --z-header: 40;
  --z-dropdown: 50;
  --z-drawer: 60;

  /* Overlay layers */
  --z-modal-backdrop: 70;
  --z-modal: 80;
  --z-tooltip: 90;
  --z-toast: 100;

  /* System layers - reserved for critical UI */
  --z-emergency: 9000;
  --z-system-critical: 9999;
}
```

```typescript
// z-index.ts
export const zIndex = {
  background: -1,
  base: 0,
  elevated: 10,
  floating: 20,
  sticky: 30,
  header: 40,
  dropdown: 50,
  drawer: 60,
  modalBackdrop: 70,
  modal: 80,
  tooltip: 90,
  toast: 100,
  emergency: 9000,
  systemCritical: 9999,
} as const;

export type ZIndexLayer = keyof typeof zIndex;
```

---

### Layer Definitions

| Layer | Value | Purpose | Examples |
|-------|-------|---------|----------|
| `background` | -1 | Behind all content | Background patterns, watermarks |
| `base` | 0 | Default document flow | Regular content, text, images |
| `elevated` | 10 | Raised content | Hovered cards, selected items |
| `floating` | 20 | Floating actions | FAB, quick action buttons |
| `sticky` | 30 | Sticky within scroll | Table headers, section anchors |
| `header` | 40 | Global navigation | App header, main nav bar |
| `dropdown` | 50 | Dropdown menus | Select, autocomplete, date picker |
| `drawer` | 60 | Slide-out panels | Filters, detail panels |
| `modalBackdrop` | 70 | Modal overlay | Dark backdrop behind modals |
| `modal` | 80 | Modal dialogs | Confirmations, forms, alerts |
| `tooltip` | 90 | Contextual help | Hover tips, info popovers |
| `toast` | 100 | Notifications | Success, error, info messages |
| `emergency` | 9000 | System alerts | Session timeout, connection lost |
| `systemCritical` | 9999 | Clinical alerts | Drug interactions, allergy warnings |

---

### Stacking Contexts

Understanding stacking contexts prevents unexpected layering behavior.

```
┌─────────────────────────────────────────────────────────────────┐
│ COMMON STACKING CONTEXT TRIGGERS                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Creates new stacking context:                                  │
│  • position: fixed | sticky | absolute | relative (with z)     │
│  • transform: any value                                         │
│  • opacity: < 1                                                 │
│  • filter: any value                                            │
│  • isolation: isolate                                           │
│  • will-change: transform | opacity                             │
│  • contain: layout | paint                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Rule**: A child element can never escape its parent's stacking context. A `z-index: 9999` inside a parent with `z-index: 10` will still appear below elements with `z-index: 11` outside that parent.

```
BAD: Tooltip trapped in card                GOOD: Tooltip in portal
┌─────────────────────────────┐             ┌─────────────────────────────┐
│ Card (z-index: 10)          │             │ Card (z-index: 10)          │
│ ┌─────────────────────────┐ │             │                             │
│ │ Tooltip (z-index: 9999) │ │             └─────────────────────────────┘
│ │ Still trapped!          │ │             ┌─────────────────────────────┐
│ └─────────────────────────┘ │             │ Portal (z-index: 90)        │
└─────────────────────────────┘             │ Tooltip renders here        │
┌─────────────────────────────┐             └─────────────────────────────┘
│ Header (z-index: 40)        │             ┌─────────────────────────────┐
│ Covers the tooltip!         │             │ Header (z-index: 40)        │
└─────────────────────────────┘             │ Tooltip floats above        │
                                            └─────────────────────────────┘
```

---

### Portal Strategy

Overlays should render in portals at the document root to escape stacking context traps.

```typescript
// Portal mounting points (in index.html or root layout)
// <div id="dropdown-root"></div>
// <div id="modal-root"></div>
// <div id="toast-root"></div>
// <div id="tooltip-root"></div>

const PORTAL_IDS = {
  dropdown: 'dropdown-root',
  modal: 'modal-root',
  toast: 'toast-root',
  tooltip: 'tooltip-root',
} as const;

interface PortalProps {
  children: React.ReactNode;
  target: keyof typeof PORTAL_IDS;
}

const Portal = ({ children, target }: PortalProps) => {
  const container = document.getElementById(PORTAL_IDS[target]);
  if (!container) return null;
  return createPortal(children, container);
};
```

**Portal Order in DOM**:
```html
<body>
  <div id="app-root"><!-- Main app --></div>
  <div id="dropdown-root"></div>  <!-- z-50 -->
  <div id="drawer-root"></div>    <!-- z-60 -->
  <div id="modal-root"></div>     <!-- z-80 -->
  <div id="tooltip-root"></div>   <!-- z-90 -->
  <div id="toast-root"></div>     <!-- z-100 -->
</body>
```

---

### Component Usage

#### Dropdown Menus

```tsx
const SelectMenu = ({ options, value, onChange }: SelectMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        {value}
      </button>

      {isOpen && (
        <Portal target="dropdown">
          <div
            className="absolute"
            style={{ zIndex: zIndex.dropdown }}
          >
            {options.map(option => (
              <button key={option.value} onClick={() => onChange(option)}>
                {option.label}
              </button>
            ))}
          </div>
        </Portal>
      )}
    </div>
  );
};
```

#### Modal with Backdrop

```tsx
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal target="modal">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: zIndex.modalBackdrop }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: zIndex.modal }}
      >
        <div role="dialog" aria-modal="true">
          {children}
        </div>
      </div>
    </Portal>
  );
};
```

#### Sticky Header

```tsx
const AppHeader = () => (
  <header
    className="fixed top-0 left-0 right-0"
    style={{ zIndex: zIndex.header }}
  >
    <nav>{/* Navigation content */}</nav>
  </header>
);
```

---

### Healthcare-Specific Layers

Clinical applications require special z-index considerations for patient safety.

| Alert Type | Z-Index | Behavior |
|------------|---------|----------|
| Drug interaction | `systemCritical` (9999) | Cannot be dismissed without acknowledgment |
| Allergy alert | `systemCritical` (9999) | Blocks all interaction until confirmed |
| Session timeout | `emergency` (9000) | Appears above modals, below critical alerts |
| Unsaved changes | `modal` (80) | Standard modal behavior |
| Info tooltip | `tooltip` (90) | Dismisses on blur |

```tsx
const DrugInteractionAlert = ({ interaction, onAcknowledge }: AlertProps) => (
  <Portal target="modal">
    {/* Impenetrable backdrop - no onClick dismiss */}
    <div
      className="fixed inset-0 bg-red-900/80"
      style={{ zIndex: zIndex.systemCritical - 1 }}
      aria-hidden="true"
    />

    {/* Critical alert */}
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: zIndex.systemCritical }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alert-title"
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-lg border-4 border-red-600">
        <div className="bg-red-600 text-white p-4">
          <h2 id="alert-title" className="text-xl font-bold">
            Drug Interaction Warning
          </h2>
        </div>
        <div className="p-6">
          <p className="text-lg">{interaction.description}</p>
          <p className="mt-4 text-red-700 font-semibold">
            {interaction.severity}: {interaction.recommendation}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 flex justify-end gap-4">
          <button
            className="btn-secondary"
            onClick={() => onAcknowledge('cancel')}
          >
            Cancel Prescription
          </button>
          <button
            className="btn-destructive"
            onClick={() => onAcknowledge('override')}
          >
            Acknowledge and Continue
          </button>
        </div>
      </div>
    </div>
  </Portal>
);
```

---

### Layer Priority Rules

When multiple elements compete for attention:

```
Priority Order (highest to lowest):
┌────────────────────────────────────────────────────────────────┐
│ 1. Drug interactions / Allergy alerts    (ALWAYS on top)       │
│ 2. Session expiry / Connection errors    (System health)       │
│ 3. Toast notifications                   (User feedback)       │
│ 4. Tooltips                              (Contextual help)     │
│ 5. Active modal                          (Current task)        │
│ 6. Drawers/Sidebars                      (Secondary content)   │
│ 7. Dropdowns                             (Form controls)       │
│ 8. Sticky headers                        (Navigation)          │
│ 9. Elevated content                      (Interaction hints)   │
│ 10. Base content                         (Document flow)       │
└────────────────────────────────────────────────────────────────┘
```

**Healthcare Rule**: Clinical safety alerts (drug interactions, allergies) must ALWAYS be the topmost layer. No toast, tooltip, or other UI element should ever obscure these alerts.

---

### Debugging Z-Index Issues

Common problems and solutions:

| Problem | Cause | Solution |
|---------|-------|----------|
| Dropdown hidden behind header | Stacking context trap | Use portal |
| Tooltip cut off by overflow | `overflow: hidden` on parent | Use portal |
| Modal backdrop not covering page | Missing `position: fixed` | Add fixed positioning |
| Nested modal behind parent modal | Same z-index | Increment z-index or use modal stack |
| Sticky header flickers | Transform animation | Use `will-change: transform` |

**Debug CSS**:
```css
/* Temporarily visualize stacking contexts */
* {
  outline: 1px solid rgba(255, 0, 0, 0.1);
}

/* Highlight specific z-index values */
[style*="z-index: 50"] { outline: 2px solid blue; }
[style*="z-index: 80"] { outline: 2px solid green; }
[style*="z-index: 100"] { outline: 2px solid orange; }
```

---

### Tailwind Configuration

If using Tailwind CSS, extend the default z-index scale:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      zIndex: {
        'background': '-1',
        'base': '0',
        'elevated': '10',
        'floating': '20',
        'sticky': '30',
        'header': '40',
        'dropdown': '50',
        'drawer': '60',
        'modal-backdrop': '70',
        'modal': '80',
        'tooltip': '90',
        'toast': '100',
        'emergency': '9000',
        'critical': '9999',
      },
    },
  },
};
```

Usage:
```html
<header class="fixed top-0 z-header">...</header>
<div class="z-modal-backdrop fixed inset-0 bg-black/50">...</div>
<div class="z-modal fixed">...</div>
<div class="z-toast fixed bottom-4 right-4">...</div>
```

---

### Z-Index Checklist

Before adding a new z-index value:

- [ ] Does an existing tier handle this use case?
- [ ] Is this element using a portal to escape stacking contexts?
- [ ] Will this conflict with any existing layer?
- [ ] For healthcare: Can this ever obscure a clinical alert? (Must not)
- [ ] Is the value documented in the token definitions?
- [ ] Is there a gap for future edge cases?

**Anti-patterns to avoid**:
- `z-index: 99999` - Use the defined scale
- Incrementing z-index to "fix" issues - Find the root cause
- Different z-index for same component type - Be consistent
- Hardcoded values scattered through codebase - Use tokens

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Platform Team | Initial version |
