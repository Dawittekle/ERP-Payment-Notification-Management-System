---
name: QINDE ERP — Frontend UI/UX Design System
version: "1.0"
status: "FIXED FRONTEND DESIGN CONTRACT"
brand:
  name: "QINDE"
  amharic: "ቅንደ"
  meaning: "Inspired by the Oromo root qindaa-, associated with organizing, arranging, coordinating, and putting things in order."
  tagline: "Business, in order."
design_direction: "Modern Enterprise SaaS + Fintech Dashboard"
theme: "Light-first, card-based, metrics-first, data-rich, calm"
colors:
  brand_navy: "#102A43"
  brand_navy_hover: "#173F5F"
  brand_green: "#198754"
  brand_gold: "#D9A441"
  canvas: "#F7F9FC"
  surface: "#FFFFFF"
  border: "#E4E7EC"
  text_primary: "#172033"
  text_secondary: "#667085"
  success: "#16A34A"
  warning: "#D97706"
  danger: "#DC2626"
  info: "#2563EB"
typography:
  primary: "Inter"
  amharic: "Noto Sans Ethiopic"
  technical: "Geist Mono"
spacing:
  base: "4px"
radius:
  standard: "12px"
---

# QINDE ERP — Frontend UI/UX Design System

**Status: FIXED FRONTEND DESIGN CONTRACT**

This file is the single visual and interaction source of truth for QINDE frontend development.

Every frontend agent must read this file before designing or modifying UI. The system must look and behave like **one product**, even when different agents implement different modules at different times.

## Product identity

**Brand:** QINDE  
**Amharic:** ቅንደ  
**Tagline:** Business, in order.

QINDE is a business/financial operations platform, not a payment-only application. The product covers customers, invoices, payments, refunds, notifications, audit, reporting, reconciliation, identity/access control, and operational workflows.

## Agreed visual direction

The primary visual target is the supplied reference image: a **modern enterprise SaaS / fintech dashboard** with a light gray canvas, white surfaces, compact sidebar, quiet top bar, KPI/stat cards, green financial accents, clean charts, transaction tables, rounded but restrained components, subtle borders, and generous whitespace.

The intended balance is:

```text
70% modern enterprise SaaS
20% fintech / financial-product clarity
10% Ethiopian identity
```

Ethiopian identity should be subtle. Use the QINDE name and restrained navy/green/gold palette rather than turning the application into an Ethiopian-flag-themed interface.

## Product personality

QINDE should feel:

- trustworthy
- organized
- calm
- professional
- modern
- data-rich
- fast to scan
- financially precise
- subtly Ethiopian
- premium without being flashy

Avoid:

- generic admin-template appearance
- neon/cyberpunk styling
- excessive gradients
- excessive glassmorphism
- oversized decorative illustrations
- cartoonish finance graphics
- excessive animation
- excessive use of green or gold
- making every component a floating card
- copying another company's visual identity

## Core interaction principles

Use:

- role-based UX
- object-centric UX
- overview → filter → details
- contextual actions
- recognition over recall
- progressive disclosure
- master-detail
- exception-first dashboards
- clear financial status
- consistent information hierarchy

These patterns are informed by established enterprise and financial products such as SAP Fiori, Stripe, Odoo, and IBM Carbon. Learn from their interaction patterns; do not copy their visual identities.

## QINDE visual signature

QINDE's visual identity comes from the consistent combination of:

1. Light, calm SaaS surfaces.
2. Navy structure and navigation.
3. Green financial/action accent.
4. Small amounts of warm gold.
5. Compact KPI cards.
6. Dense but readable financial tables.
7. Clean analytical charts.
8. Consistent object/detail workspaces.
9. Strong status visualization.
10. Reusable QINDE components.


## Colors

### Official QINDE palette

| Token | Hex | Use |
|---|---|---|
| `brand.navy` | `#102A43` | Main brand structure, sidebar, strong actions |
| `brand.navyHover` | `#173F5F` | Hover/active navy variation |
| `brand.green` | `#198754` | Primary accent, success, positive actions |
| `brand.gold` | `#D9A441` | Small brand highlights only |
| `surface.canvas` | `#F7F9FC` | Application background |
| `surface.card` | `#FFFFFF` | Cards/panels |
| `surface.subtle` | `#F1F4F8` | Secondary surfaces |
| `border.default` | `#E4E7EC` | Default border/divider |
| `text.primary` | `#172033` | Main text |
| `text.secondary` | `#667085` | Secondary text |
| `text.disabled` | `#98A2B3` | Disabled text |
| `status.success` | `#16A34A` | Successful/healthy/confirmed |
| `status.warning` | `#D97706` | Pending/review/attention |
| `status.error` | `#DC2626` | Failed/risk/destructive |
| `status.info` | `#2563EB` | Informational |

### Color hierarchy

Use this relationship throughout the ERP:

```text
Navy + White + Soft Gray
          ↓
        Green
          ↓
      Small Gold
```

**Do not make the whole interface green.**

Navy provides enterprise structure. Green provides financial/action emphasis. Gold is a rare brand highlight.

### Semantic rules

- Green = success / healthy / confirmed.
- Amber = pending / review / attention.
- Red = failure / risk / destructive.
- Blue = information.
- Gold = brand highlight, not a status color.

Never communicate status through color alone. Always combine **icon + label + semantic color**.

### What to avoid

Do not use:

- neon glows
- rainbow palettes
- large neon/gradient gradients
- glowing cards
- decorative colors with no semantic purpose

### Light theme

Light theme is the primary QINDE experience.

```text
Canvas     #F7F9FC
Surface    #FFFFFF
Surface-2  #F1F4F8
Border     #E4E7EC
Text       #172033
Muted      #667085
```

### Dark theme

Dark mode may be added later:

```text
Canvas     #0B1624
Surface    #10202F
Surface-2  #162B3D
Border     #2A3E50
Text       #F7F9FC
Muted      #98A2B3
```

Dark mode must remain professional and operational, not cyberpunk.


## Typography

### Fonts

Primary UI font:

**Inter**

Fallback:

```text
Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Amharic/Ethiopic:

**Noto Sans Ethiopic**

Technical/numeric:

**Geist Mono** or another single consistent monospace font.

Do not introduce different display fonts per module.

### Type scale

| Role | Size | Weight |
|---|---:|---:|
| Page title | 24–28px | 600–700 |
| Section title | 17–20px | 600 |
| Card title | 14–16px | 600 |
| Body | 14–15px | 400 |
| Dense table | 13–14px | 400–500 |
| Label | 11–12px | 600 |
| Small metadata | 12px | 400–500 |
| Large KPI | 24–32px | 600–700 |

Use hierarchy rather than many colors.

### Financial numerals

Financial values must be highly readable and consistently formatted:

```text
ETB 125,000.00
ETB  82,450.50
ETB   7,420.00
```

Use tabular numerals where supported.

All currency formatting must use one shared formatter.

Technical identifiers may use the technical font.

### Copy style

Prefer direct operational language:

```text
Refund awaiting approval
Payment failed
Verify payment
Review discrepancy
```

Avoid vague marketing-style UI labels such as:

```text
Magic
Supercharge
Unlock
AI Zone
Seamless
```


## Layout

### Grid

Desktop uses a disciplined 12-column grid.

```text
Sidebar: 248px expanded / ~72px collapsed
Main content: flexible
Recommended max content width: 1440px
Desktop page padding: 24–40px
```

Use CSS Grid for page-level structure. Avoid percentage-based layout math that makes alignment drift.

### Layout balance

The dashboard should feel like the supplied reference: structured, balanced, and compact.

Preferred structures:

```text
large analytical area + smaller supporting card
2-column content areas
3-card KPI row when appropriate
table + contextual summary
list + detail
```

Do not force every page into identical card grids. Use cards where they improve grouping and scanning.

### Whitespace as hierarchy

Whitespace should indicate grouping and importance. Tight internal spacing is appropriate for tables and form fields; larger section spacing is appropriate between unrelated work areas.

### Shell

```text
┌─────────────────────────────────────────────────────────────┐
│ Global search / workspace / notifications / account          │
├───────────────┬─────────────────────────────────────────────┤
│ Persistent    │ Breadcrumb / section title / actions        │
│ sidebar       │                                             │
│               │ Main workspace                              │
└───────────────┴─────────────────────────────────────────────┘
```

### Sidebar

Primary navigation:

```text
Overview
Customers
Invoices
Payments
Refunds
Reconciliation
Reports
Notifications
Administration
```

Utility:

```text
Saved Views
Help
Settings
```

Use icons + text on desktop. Collapsed icon-only state requires accessible labels/tooltips.

### Top bar

Keep it quiet. It should hold:

- global command/search
- workspace/role context
- notifications
- help/shortcuts
- account menu

---

## Dashboard architecture

The first viewport is an operational cockpit, not a wall of KPI cards.

Recommended hierarchy:

1. Context/greeting.
2. Exception / attention queue.
3. Core financial pulse.
4. Payment health.
5. Work queue.
6. Trends/analytics.
7. Recent activity.
8. System/integration health.

### Exception-first principle

The dashboard must answer:

> **What requires attention right now?**

Show items like:

```text
Refunds awaiting approval
Payment verification failures
Reconciliation mismatches
Failed notifications
Provider issues
```

Every item should lead to the relevant record or action.

### Role-specific dashboards

#### Finance Manager

Prioritize:
- collected money
- outstanding invoices
- refunds awaiting approval
- payment success/failure
- reconciliation exceptions
- period trends

#### Accountant

Prioritize:
- invoice queue
- overdue invoices
- payment verification
- reconciliation work
- recent financial activity

#### Administrator

Prioritize:
- users/roles
- security/audit
- webhook health
- provider health
- notification health
- background jobs

#### Support

Prioritize:
- customer lookup
- invoice status
- payment status
- failed notification delivery
- customer-safe activity timeline

#### Customer

Prioritize:
- invoices
- payment status
- receipts
- refunds
- notifications

---

## Object workspaces

Business objects are first-class UX contexts:

```text
Customer
Invoice
Payment
Refund
Reconciliation case
Notification
User
```

### Object header

```text
Breadcrumb
Title + identifier
Status
Key amount / summary
Primary action
Overflow menu
```

### Invoice example

```text
INV-2026-00182
Acme Trading PLC
● PAID

ETB 125,000.00
Issued Sep 01 · Due Sep 30

[Download] [Send] [More]

Overview | Payments | Activity | Audit
```

### Payment workspace

Primary information:

- status
- amount/currency
- invoice/customer
- provider
- provider reference
- attempts
- verification state

Secondary information:

- timeline
- webhook history
- notification delivery
- audit
- technical details

### Progressive disclosure

Technical/provider details should be collapsed by default:

```text
Payment verified
ETB 125,000.00

Technical details ▾
Provider reference
Webhook ID
Correlation ID
Verification timestamp
```

Do not expose raw JSON as the main experience.

---

## List and table patterns

Tables are primary ERP work surfaces.

Required capabilities where applicable:

- search
- filters
- sort
- saved views
- column visibility
- pagination
- selection
- bulk/contextual actions
- export
- compact/comfortable density
- keyboard navigation

### Table toolbar

```text
Search   Filter   Saved View   Columns   Export
```

When rows are selected:

```text
3 selected

Send   Assign   Export   More
```

Destructive bulk actions must be controlled by business rules and permissions.

### Saved views

A saved view can remember:

- filters
- sort
- visible columns
- density
- selected time range where appropriate

Examples:

```text
Today's Payments
Failed Payments
Overdue Invoices
Refunds Awaiting Approval
High-Value Payments
```

### Density

Support:

```text
Comfortable
Compact
Dense
```

Dense means more useful information per viewport, not smaller unreadable text.

---

## Filtering

Default filter bar:

```text
Search
Status
Date
Customer
+ Filter
```

Advanced filter builder:

```text
Status is Pending
AND
Amount > ETB 10,000
AND
Created after Aug 01
```

Active filters appear as removable chips.

When filters produce no results, explain the conflict and provide `Clear filters`.

---

## Command Center

Global command palette: `⌘K` / `Ctrl+K`.

Sections:

```text
Quick actions
Recent records
Recent searches
Navigation
Create
Search business objects
```

Examples:

```text
Create invoice
Create customer
Find invoice
Find payment
Review refunds
Open reconciliation
View failed notifications
```

Keyboard vocabulary:

```text
/          Search
⌘K/Ctrl K  Command Center
G then I   Invoices
G then P   Payments
G then R   Refunds
C          Create
?          Shortcut help
J/K        Next / previous
Esc        Close
```

Shortcuts must remain discoverable. No core functionality may depend on memorizing shortcuts.

---

## Attention Center

Each attention item contains:

```text
severity
object
reason
age
recommended action
```

Example:

```text
Refund awaiting approval
REF-1021 · ETB 25,000
Submitted 18 minutes ago

[Review]
```

Do not mark every item red. Severity must be meaningful.

---

## Reconciliation workspace

This is a signature screen for the product.

Summary:

```text
842 matched
7 need review
2 missing provider
3 amount mismatch
```

Selected case:

```text
             ERP                 CHAPA

Amount       ETB 125,000         ETB 120,000
Status       SUCCESS             SUCCESS
Reference    PAY-18831           CH-90331
Currency     ETB                 ETB

                  ⚠ MISMATCH

[Investigate] [Resolve]
```

Always show both sources, the difference, and the next controlled action.

---

## Transaction Signal

The Transaction Signal is the visual identity element for lifecycle-heavy financial UI.

Use a restrained vertical rail / pulse / marker for:

```text
Payment status
Webhook event
Verification
Invoice update
Notification delivery
Audit event
```

Example:

```text
● Payment verified
│
● Chapa webhook received
│
● Provider verification
│
● Payment initiated
```

The Signal must remain subtle. It is a visual grammar, not a glow effect.

---

## Status components

Status always uses:

```text
icon + label + semantic color
```

Examples:

```text
✓ Paid
◷ Pending
! Needs review
× Failed
↻ Processing
```

Every ambiguous state should have a concise explanation:

```text
◷ Pending

The provider has not yet confirmed this payment.
Last event: 2 minutes ago
Next automatic check: 30 seconds

[Verify now]
```

---

## Forms

Use clear vertical rhythm and progressive commitment.

Complex creation may use:

```text
Step 1 Customer
Step 2 Invoice items
Step 3 Review
Step 4 Issue
```

Use drawers/inline edit for small contextual changes. Do not turn every edit into a wizard.

Financial actions must show a review summary before a consequential mutation.

---

## Destructive actions

Refund/cancel dialogs must state financial consequence explicitly.

```text
Request refund

Original payment     ETB 100,000
Already refunded     ETB 20,000
Remaining refundable ETB 80,000

Refund amount        ETB 25,000

Reason
___________________

This request will be sent for Finance Manager approval.

[Cancel] [Request refund]
```

Prevent accidental double submit and clearly indicate the current processing state.

---

## Notifications

Keep two conceptual streams separate:

### User notifications

```text
Payment received
Refund completed
Invoice overdue
```

### System/operational notifications

```text
Telegram delivery failed
Webhook retrying
Reconciliation mismatch detected
```

Notification center must support unread/read state, filtering, deep links, and authorized retry.

---

## Error states

Every serious error answers:

1. What happened?
2. What did not happen?
3. What can the user do now?

Example:

```text
Payment could not be initialized

Chapa did not create a checkout session.
No payment was created in the ERP.

Reference: PAY-19281

[Try again]
```

---

## Empty and loading states

### Empty

Use:

```text
specific title
specific explanation
clear action
```

Never only say `No data found.`

### Loading

Prefer skeletons matching the final layout.

Use spinners only for short, inline, indeterminate operations.

---

## Motion

Motion communicates state, hierarchy, and feedback.

Recommended range:

```text
150–250ms ordinary UI
250–400ms larger transitions
```

Use transforms/opacity when possible. Respect `prefers-reduced-motion`.

Good motion:
- drawers
- command palette
- status transitions
- selected-row feedback
- toast entry
- subtle Transaction Signal pulse

Avoid:
- constant dashboard animation
- bounce effects
- decorative parallax
- neon glow motion

---

## Responsive behavior

Desktop is the primary workstation experience.

Tablet:
- collapse sidebar
- reduce secondary columns
- allow contextual drawer

Mobile prioritizes:

```text
notifications
approvals
search
payment status
refund actions
customer lookup
```

Use cards/stacked detail layouts instead of squeezing enterprise tables onto a phone.

Test at:

```text
375px
390px
768px
1024px
1440px
```

No accidental horizontal overflow.

Minimum touch target: 44px.

---

## Elevation & Depth

Hierarchy should primarily come from:

1. spacing
2. typography
3. borders
4. surface tone
5. restrained shadows

Do not make every element look like a floating card.

Dense pages should frequently use:

```text
dividers
subtle surface changes
negative space
sticky table headers
```

Glass effects are allowed only for temporary contextual surfaces such as the command palette. Never use glass as the universal material.

---

## Shapes

Shape language:

```text
6px   micro controls
10px  inputs / compact controls
14px  normal cards/panels
20px  special / major surfaces
```

Avoid huge rounded pills. Pills are for statuses, tags, and compact filters.

Iconography should use one coherent outline family, preferably Lucide or an equivalent set.

---

## Components

Build an application-specific design system on top of the chosen component primitives.

### Foundation components

```text
Button
Input
Select
Textarea
Checkbox
Radio
Switch
Dialog
Drawer
Tooltip
Popover
Tabs
Dropdown
Toast
Breadcrumbs
Pagination
```

### ERP-specific components

```text
ERPShell
ERPCommandCenter
ERPGlobalSearch
ERPMetric
ERPStatus
ERPMoney
ERPTable
ERPFilterBar
ERPSavedView
ERPObjectHeader
ERPTimeline
ERPActivityFeed
ERPAttentionQueue
ERPHealthIndicator
ERPComparison
ERPAuditTimeline
ERPTechnicalDetails
ERPConfirmAction
ERPEmptyState
ERPErrorState
ERPSkeleton
```

### Component consistency

Components must be driven by tokens. Do not hardcode arbitrary colors/radii in individual screens.

---

## Design system implementation

Recommended frontend structure:

```text
src/
  components/
    ui/
    erp/
  styles/
    tokens.css
    themes.css
    globals.css
```

Token groups:

```text
color.*
type.*
space.*
radius.*
shadow.*
motion.*
z.*
```

Semantic names are mandatory.

Prefer:

```text
--color-brand
--color-surface
--color-text-primary
--color-status-success
```

not:

```text
--purple1
--blueCard
--greyThing
```

Light and dark modes must share semantic token names.

---

## Accessibility

Target **WCAG 2.2 AA**.

Required:

- keyboard navigation
- visible focus
- accessible dialogs
- accessible tables
- labels for forms
- status announcements where appropriate
- sufficient contrast
- logical heading structure
- reduced-motion support
- no color-only state communication

The product must remain usable without a mouse.

---

## UX vocabulary for implementation agents

### Information scent

Navigation labels and controls should predict where they lead. Prefer precise nouns and verbs.

### Progressive disclosure

Show important information first; reveal advanced/technical detail only when requested.

### Recognition over recall

Keep context, filters, recent records, available actions, and current state visible.

### Visual hierarchy

Use size, weight, contrast, position, and spacing to establish attention order.

### Visual rhythm

Repeat spacing/alignment patterns so users can scan dense interfaces confidently.

### Information density

Increase useful information per viewport without creating cognitive noise.

### Scan path

Design the first viewport so users can identify state → exception → action quickly.

### Data-ink ratio

Prefer meaningful data and structure to decorative graphics.

### Contextual action

Place actions near the object/state they affect.

### Master-detail

Keep a list or collection visible while opening one selected object in detail.

### Object-centric UX

Treat invoice/payment/refund/customer as durable contexts containing summary, lifecycle, actions, evidence, and history.

### Exception-first UX

Prioritize blocked, failed, pending, mismatched, and approval-required work.

### Role-based UX

Adapt the default workspace to the user's responsibility rather than showing the entire product equally.

### Progressive commitment

Ask only for information needed at the current workflow step.

### Error prevention

Prevent invalid, duplicate, or irreversible actions before they occur.

### Recovery-oriented error

Explain what happened, what did not happen, and how to recover.

### Semantic tokens

Name visual values by purpose rather than appearance.

### Spatial grammar

The recurring layout rules that make the product recognizable.

### Motion language

The recurring behavior of transitions and feedback.

### Shape language

The recurring vocabulary of radius, border, elevation, and controls.

### Signature motif

One repeatable visual idea that creates product identity without reducing usability.

---

## Do's and Don'ts

### Do

- Use a strong, consistent grid.
- Use typography to create hierarchy.
- Make the dashboard role-based.
- Treat tables as serious work surfaces.
- Use saved views.
- Use contextual actions.
- Make financial states explicit.
- Explain ambiguous states.
- Use progressive disclosure.
- Provide keyboard shortcuts.
- Support density modes.
- Make mobile purposeful.
- Build reusable ERP components.
- Use semantic design tokens.
- Test real workflows.
- Keep visual novelty subordinate to usability.

### Don't

- Build a generic 4-card dashboard.
- Use gradients everywhere.
- Use glassmorphism as the default material.
- Use neon glows.
- Make everything a huge pill.
- Hide critical desktop navigation behind a hamburger.
- Use icon-only navigation without accessible labels.
- Use red for every warning.
- Use color as the only state indicator.
- Make dense data unreadably small.
- Put raw technical payloads in the primary view.
- Create endless nested modals.
- Animate every component.
- Add fake AI panels just to look modern.
- Invent metrics or financial data.
- Use lorem ipsum in final screens.
- Copy another product's visual identity.

---

## Required screens

The frontend should eventually implement:

1. Login
2. Role-based dashboard
3. Command Center
4. Global Search
5. Customer list
6. Customer workspace
7. Invoice list
8. Invoice create/edit
9. Invoice workspace
10. Payment list
11. Payment workspace
12. Payment initiation
13. Payment verification
14. Refund queue
15. Refund request
16. Refund approval
17. Refund workspace
18. Reconciliation dashboard
19. Reconciliation detail
20. Notification center
21. Notification delivery detail
22. Audit log
23. Reports
24. User administration
25. Roles and permissions
26. Integration health
27. System jobs/operations
28. Preferences
29. Notification settings
30. Mobile approval flow

---

## Screen-level definition of done

A screen is complete only when it has:

```text
content hierarchy
visual hierarchy
loading state
empty state
error state
success state where relevant
permission-aware actions
responsive behavior
keyboard behavior where applicable
accessibility behavior
consistent design tokens
real backend data or clearly labelled fixtures
```

---

## Agent implementation guardrail

An agent may improve implementation quality without changing the visual contract.

Safe improvements:

- accessibility
- spacing
- responsive behavior
- loading performance
- micro-interactions
- component reuse

A major visual change requires an explicit design decision and an update to this file.

The reference images in `/reference` are visual inspiration. They must not be copied literally. When external examples conflict with this file, this file wins.

---


## Visual reference gallery

These references are for **visual and interaction inspiration only**. The supplied QINDE screenshot remains the closest visual target.

### 1. Modern Banking SaaS

**Design page:**  
https://www.behance.net/gallery/190863747/Online-Banking-SaaS-UX-UI-Design

**Reference image:**  
https://mir-s3-cdn-cf.behance.net/project_modules/1400/72e694190863747.65c20242458c5.png

Useful for:
- sidebar structure
- transaction tables
- financial summary cards
- information density

### 2. Modern Fintech CRM / SaaS

**Design page:**  
https://www.behance.net/gallery/245057705/Modern-Fintech-CRM-SaaS-Dashboard-UX-UI-Case-Study

Useful for:
- white-space balance
- dashboard cards
- financial analytics
- modern SaaS hierarchy

### 3. Fintech / SaaS Dashboard

**Design page:**  
https://dribbble.com/services/166189-Fintech-Sales-Saas-Dashboard-UI-Design

**Reference image:**  
https://cdn.dribbble.com/userupload/46692711/file/487de6783b651912eebc79851e1217a2.png

Useful for:
- KPI cards
- trend charts
- transaction lists
- sidebar navigation

### 4. Modern ERP / Accounting Dashboard

**Design page:**  
https://dribbble.com/shots/26984762-ERP-Account-Management-B2B-Dashboard

**Reference image:**  
https://cdn.dribbble.com/userupload/46391828/file/5bb40d3f2b555e514b7b71e16d7d417d.png

Useful for:
- ERP information density
- accounting tables
- trend analytics
- financial overview

### 5. ERP Dashboard Example

**Reference image:**  
https://www.shivtatva.tech/marketing/product-previews/product-preview-erp.png

Useful for:
- KPI + chart + table composition
- enterprise dashboard structure

### 6. Accounting Dashboard

**Reference image:**  
https://img02.mockplus.com/image/2024-09-06/7f150ae0-6c00-11ef-aec5-e56592e51743.png

Useful for:
- profit/loss presentation
- payables/receivables
- financial KPI hierarchy

### 7. ERP Dashboard Example

**Reference image:**  
https://mysoftheaven.com/product_img/sheba-erp_brochure_1769085912.jpg

Useful for:
- ERP navigation
- finance module grouping
- dashboard composition

### Reference priority

When deciding between references:

```text
1. This DESIGN.md
2. Supplied QINDE screenshot
3. SAP Fiori / Stripe / Odoo / Carbon interaction patterns
4. Inspiration gallery
```

External inspiration never overrides the QINDE design contract.


## Agent continuity protocol

This section is mandatory.

### Before every frontend task

The agent must:

1. Read this `DESIGN.md`.
2. Inspect the existing application shell.
3. Inspect existing theme/design tokens.
4. Inspect existing shared UI components.
5. Inspect at least one completed screen.
6. Reuse existing components before creating new ones.
7. Follow the existing QINDE visual language.

### Never independently redesign

Do not independently change:

- colors
- fonts
- sidebar
- top bar
- card style
- button style
- table style
- form style
- status colors
- spacing scale
- radius
- shadows
- dashboard philosophy

A new module must look like it belongs to the existing QINDE application.

### Component-first rule

Before writing a new component:

```text
Can an existing QINDE component do this?
        |
       YES → reuse
        |
       NO
        ↓
Can an existing shared component be extended?
        |
       YES → extend
        |
       NO
        ↓
Create a new reusable QINDE component
```

Do not create one-off components when the pattern is likely to appear elsewhere.

### Shared source of truth

Recommended:

```text
src/
├── components/
│   ├── ui/
│   └── qinde/
├── layouts/
├── features/
└── styles/
    ├── tokens.css
    ├── globals.css
    └── themes.css
```

The exact framework structure may differ, but there must be one shared visual source of truth.

### Handoff rule

When Agent A finishes and Agent B continues, Agent B must preserve:

```text
same colors
same typography
same spacing
same radii
same shadows
same sidebar
same top bar
same buttons
same status badges
same table patterns
same forms
same dialogs
same loading/empty/error states
same responsive behavior
```

### Design change control

A major visual change requires an explicit decision and an update to `DESIGN.md`.

Major changes include:

- new primary color
- new font
- different sidebar model
- different card language
- different status semantics
- different global radius
- replacing the table system
- replacing the overall dashboard direction

Do not silently introduce visual changes that future agents will copy.

### Screen-level definition of done

A screen is complete only when applicable states exist for:

```text
normal
loading
empty
error
success
permission denied
responsive
keyboard/accessibility
```

Financial screens must additionally check:

```text
currency formatting
amount alignment
status consistency
destructive-action protection
duplicate-submit prevention
```

## Research references

### Enterprise UX and information architecture

- SAP Fiori design principles: https://experience.sap.com/fiori-design-web/design-principles/
- SAP Object Page: https://experience.sap.com/fiori-design-web/object-page/
- SAP current Object Page guidance: https://experience.sap.com/fiori-design-web/v1-136/discover/frameworks/sap-fiori-elements/object-page/object-page-overview-sap-fiori-elements
- NN/g Progressive Disclosure: https://www.nngroup.com/articles/progressive-disclosure/
- Shneiderman / information visualization mantra: https://www.cs.umd.edu/~ben/about.html

### Financial / payment product patterns

- Stripe Dashboard basics: https://docs.stripe.com/dashboard/basics
- Stripe Dashboard search: https://docs.stripe.com/dashboard/search?locale=en-GB
- Cointab reconciliation dashboard: https://www.cointab.net/business/reconciliation/features/reconciliation-insights-with-cointabs-dynamic-dashboard/
- Recko reconciliation case study: https://www.shikhaverma.space/project/recon

### Tables and enterprise interaction

- Carbon filtering: https://carbondesignsystem.com/patterns/filtering/
- Carbon data table usage: https://v10.carbondesignsystem.com/components/data-table/usage/

### Design systems

- Figma variables: https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma
- Figma variable modes: https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables
- Figma design systems: https://help.figma.com/hc/en-us/articles/14552901442839-Overview-Introduction-to-design-systems

### Google Stitch / agent-readable design

- Stitch introduction: https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/
- Stitch AI-native design: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/
- DESIGN.md specification: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
- Google Labs design.md repository: https://github.com/google-labs-code/design.md
- Stitch skills repository: https://github.com/google-labs-code/stitch-skills

### Inspiration / community

- Behance fintech dashboard exploration: https://www.behance.net/gallery/193857967/Fintech-Dashboard-design
- Dribbble ERP dashboard redesign: https://dribbble.com/shots/26774159-ERP-Dashboard-Redesign-Modern-Accounting-Dashboard-UI
- Dribbble command palette exploration: https://dribbble.com/shots/26588122-Quiz-Left-or-Right
- Content Harmony command palette: https://www.contentharmony.com/updates/command-palette/

These references inform patterns and vocabulary. They do not override the QINDE design contract.


### Additional current design references

- Odoo Dashboards: https://www.odoo.com/documentation/19.0/applications/productivity/dashboards.html
- Odoo My Dashboard: https://www.odoo.com/documentation/19.0/applications/productivity/dashboards/my_dashboard.html
- Stripe Dashboard basics: https://docs.stripe.com/dashboard/basics
- SAP Fiori design principles: https://experience.sap.com/fiori-design-web/design-principles/
- SAP Object Page: https://experience.sap.com/fiori-design-web/object-page/
- Carbon filtering: https://carbondesignsystem.com/patterns/filtering/
- Carbon data table usage: https://v10.carbondesignsystem.com/components/data-table/usage/
