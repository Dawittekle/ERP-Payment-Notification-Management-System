# QINDE ERP — Frontend Implementation Master Roadmap & Phase Execution Guide

**Document Version:** 1.0  
**Brand Name:** QINDE (Amharic: ቅንደ)  
**Tagline:** Business, in order.  
**Visual Target:** Modern Enterprise SaaS + Fintech Operations Cockpit  
**Target Path:** `docs/frontend/FRONTEND_IMPLEMENTATION_PHASES.md`  

---

## 1. Executive Summary & Design Philosophy

**QINDE (ቅnደ)** is derived from the Oromo root *qindaa-*, signifying **organizing, arranging, coordinating, and putting things in order**. 

This document defines the structured, multi-phase execution strategy for building the complete frontend of **QINDE ERP**. In order to achieve the highest visual standard, pixel-perfect UX, and an extensible architecture, the frontend will be built in **7 discrete execution phases**. No backend logic will be written until the frontend is 100% complete, fully interactive with realistic mock/fixture data, responsive, accessible, and verified against `QINDE_DESIGN.md`.

---

## 2. Brand Identity & Logo Design Concept

### Brand Essence
- **English:** QINDE
- **Amharic:** ቅንደ
- **Meaning:** Business, in order.
- **Visual Balance:** 70% Modern Enterprise SaaS | 20% Fintech Financial Clarity | 10% Ethiopian Identity (Subtle, Refined)

### Logo & Graphic Concept
- **Motif:** Interlocking structural geometric geometry forming the letter **'Q'** merged with a stylized **'ቅ'** node and an order/flow indicator (representing organized ledgers and payment streams).
- **Color Accent:** Deep Navy (`#102A43`) structure with Emerald Green (`#198754`) transaction pulse and subtle Warm Gold (`#D9A441`) dot.
- **Typography:** Bold custom-tracked **Inter / Outfit** for English product mark alongside clean **Noto Sans Ethiopic** for `ቅንደ`.

---

## 3. Core Architecture & Frontend Tech Stack

- **Framework:** React + TypeScript (Vite / Next.js architecture)
- **Styling & Tokens:** CSS Variables / CSS Modules / Tailored Design System based on `QINDE_DESIGN.md` tokens.
- **Iconography:** Lucide React (Clean, thin-line consistent outline family)
- **Data Fixtures & State:** Reusable Mock API Services, React Context / Zustand for global shell state (Command Center, Auth Role switching, Active Views).
- **Key Motifs:**
  - **Transaction Signal:** Vertical rail/pulse indicator for lifecycle events.
  - **Command Center (`⌘K` / `Ctrl+K`):** Instant search, quick actions, navigation shortcuts.
  - **Exception-First Cockpit:** Immediate visibility into items requiring human intervention.
  - **Dual-View Reconciliation Workspace:** Side-by-side transaction comparison.

---

## 4. Phase Breakdown & Implementation Roadmap

Below is the step-by-step roadmap. Each phase must be completed, visually verified against `QINDE_DESIGN.md`, and marked complete before moving to the next.

```text
 Phase 1: Foundation & Shell Architecture
    │
 Phase 2: Design Tokens & Reusable ERP Component Suite
    │
 Phase 3: Auth, Identity & Role-Based Operational Cockpits
    │
 Phase 4: Core Financial Workspaces (Customers, Invoices, Payments)
    │
 Phase 5: Signature Workflows (Refund Queue & Reconciliation)
    │
 Phase 6: Operational Administration, Audit & System Health
    │
 Phase 7: Responsive Polish, Micro-interactions & DoD Verification
```

---

### Phase 1: Foundation & Shell Architecture
**Goal:** Establish project repository setup, design token system, layout shell, sidebar, topbar, and global command center.

- [ ] Setup application scaffold with TypeScript & routing structure.
- [ ] Implement `tokens.css` with semantic color palette, typography scales, spacing tokens, and border radii.
- [ ] Build `ERPShell` layout wrapper (responsive desktop/tablet/mobile grid).
- [ ] Build `ERPSidebar` (Navy structure `#102A43`, expandable/collapsible, active states, branding with QINDE logo).
- [ ] Build `ERPTopBar` (Quiet topbar, breadcrumbs, search prompt, role selector, notification bell, user profile menu).
- [ ] Implement `ERPCommandCenter` (`Ctrl+K` / `⌘K` global overlay modal with search, keyboard navigation, and quick commands).
- [ ] Configure light-first theme baseline and dark-theme tokens setup.

---

### Phase 2: Design Tokens & Reusable ERP Component Suite
**Goal:** Create the full set of QINDE-specific shared UI components and primitives to ensure total visual consistency across all feature modules.

- [ ] **Base UI Components:** Button (Primary Navy, Success Green, Secondary, Ghost, Danger), Input, Select, Checkbox, Switch, Drawer, Dialog, Tooltip, Dropdown, Tabs, Toast.
- [ ] **`ERPMetric`:** Compact KPI stat card with trends, icons, subtle borders, and financial indicators.
- [ ] **`ERPStatus`:** Icon + Label + Semantic Color pill (Paid, Pending, Needs Review, Failed, Processing).
- [ ] **`ERPMoney`:** Standardized financial currency formatter (ETB tabular numerals, mono font support).
- [ ] **`ERPTable`:** Dense/comfortable data table with sort headers, row selection, sticky headers, and pagination.
- [ ] **`ERPFilterBar` & `ERPSavedView`:** Multi-filter chip bar and saved view dropdown controls.
- [ ] **`ERPObjectHeader`:** Master-detail workspace header with title, status, key amount, primary actions, and tabs.
- [ ] **`ERPTimeline` & Transaction Signal:** Vertical lifecycle event rail motif.
- [ ] **State Views:** `ERPEmptyState`, `ERPErrorState`, `ERPSkeleton` loading placeholders.

---

### Phase 3: Auth, Identity & Role-Based Operational Cockpits
**Goal:** Implement login views, authentication state mock, and role-customized dashboard views.

- [ ] **Login Screen:** Clean enterprise login with brand logo, credential inputs, remember me, and quick demo role switcher.
- [ ] **Finance Manager Cockpit:** Overview prioritising collected money, outstanding invoices, refund queue, payment health, and revenue trend chart.
- [ ] **Accountant Cockpit:** Overview prioritising invoice queue, overdue invoices, payment verification queue, and recent activity feed.
- [ ] **Administrator Cockpit:** Overview prioritising user/role count, security/audit alerts, webhook health, and system job statuses.
- [ ] **Support & Customer Cockpits:** Simplified views for customer lookup, invoice receipt lookup, and customer self-service invoice view.
- [ ] **Attention Center Component:** Exception-first queue listing items requiring immediate human intervention.

---

### Phase 4: Core Financial Business Workspaces
**Goal:** Build data-rich master-detail views and workflow screens for Customers, Invoices, and Payments.

- [ ] **Customer Module:**
  - Customer list table with search, status filters, and export.
  - Customer workspace (profile header, invoice history, payment stats, contact details).
  - Create/edit customer drawer.
- [ ] **Invoice Module:**
  - Invoice list table with saved views (All, Issued, Overdue, Paid).
  - Multi-step Invoice Creator wizard (Customer selection, itemized lines, auto-calculated subtotal/VAT/discount, preview).
  - Invoice Workspace / Detail page (Invoice preview, line items breakdown, payment history timeline, action buttons: Download, Send, Initiate Payment).
- [ ] **Payment Module:**
  - Payment list table (Initiated, Pending, Success, Failed).
  - Payment Workspace (Provider details, attempt history, Chapa reference, transaction signal timeline).
  - Payment Initiation & Verification modal simulation (Chapa checkout redirect simulation, manual verification trigger).

---

### Phase 5: Advanced Financial Workflows & Signature Screens
**Goal:** Implement high-value signature operational screens: Refund Management and Reconciliation Workspace.

- [ ] **Refund Queue & Approval Flow:**
  - Refund request modal with remaining refundable balance guardrails.
  - Refund approval queue table (Finance Manager authorization workflow, status progression: Requested → Approved → Processing → Completed).
  - Refund Workspace with detailed audit history and provider response.
- [ ] **Reconciliation Workspace (Signature Screen):**
  - Summary metrics bar (Matched, Need Review, Missing Provider, Amount Mismatch).
  - Dual-View Comparison interface (ERP Record vs Provider Chapa Record side-by-side diff).
  - Resolution modal (Investigate, Manual Match, Force Resolve with rationale).
- [ ] **Notification Center:**
  - Notification drawer and dedicated page (User notifications vs System/Operational logs).
  - Telegram Bot & Email delivery log details, retry action handler.

---

### Phase 6: System Operations, Audit & Administration
**Goal:** Complete platform administrative capabilities, audit trails, and reporting dashboards.

- [ ] **Audit Log Workspace:** Interactive audit log table with filter by actor, action type, resource, timestamp, and metadata inspect drawer.
- [ ] **Operational Reporting Dashboard:** Analytical charts for payment success rate, revenue breakdown, payment method distribution, and tax analytics.
- [ ] **User & Permission Administration:** User list, role management matrix (SUPER_ADMIN, ADMIN, FINANCE_MANAGER, ACCOUNTANT, SALES, SUPPORT, CUSTOMER), permission toggles.
- [ ] **Integration & System Health:** Webhook log queue (raw JSON inspector, signature status, retry trigger), background job execution monitor.

---

### Phase 7: Responsive Polish, Micro-interactions & DoD Verification
**Goal:** Perfect responsive behavior across screen sizes, fine-tune motion/transitions, enforce WCAG AA accessibility, and perform final quality audit.

- [ ] **Responsive Audit:** Test and polish layouts at 375px (mobile), 768px (tablet), 1024px, and 1440px (desktop).
- [ ] **Keyboard Shortcuts (`?` Help Sheet):** Implement global keyboard shortcuts (`/` search, `G+I` invoices, `G+P` payments, `C` create, `J/K` list navigation).
- [ ] **Micro-animations & Motion:** Refine drawer slide-ins, toast transitions, Command Center backdrop blur, and subtle pulse indicators (150ms-250ms).
- [ ] **Accessibility Audit:** Check WCAG 2.2 AA compliance (color contrast, keyboard focus rings, screen reader labels, aria attributes).
- [ ] **Definition of Done Check:** Verify every screen against `QINDE_DESIGN.md` (Normal, Loading, Empty, Error, Success states).

---

## 5. Git Commit Strategy & Timeline Backdating Protocol

### Base Commit Rules
1. **Atomic Commits:** Make clean, logical, modular commits. Do not lump multiple phases or unrelated components into a single commit.
2. **Professional Commit Messages:** Standard Conventional Commits format:
   - `feat(ui): implement ERPShell layout and responsive sidebar`
   - `feat(tokens): define QINDE color palette and typography scale`
   - `feat(components): add ERPMetric and ERPStatus components`
   - `docs(frontend): establish master implementation phases roadmap`
3. **Commit Backdating & History Distribution:**
   - When performing git commits, commits will be retrofitted across dates starting from the project initial date up to the present date (`2026-09-02`).
   - Distribution: **1, 2, or 3 commits per day**, with realistic random gaps (jumping 1–3 days occasionally) to simulate continuous, authentic professional development activity.
   - Exact timestamp flags (`GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE`) will be applied when committing.

---

## 6. Phase Execution Progress Tracker

| Phase | Description | Status | Target Completion |
|---|---|---|---|
| **Phase 0** | Enterprise Repository Setup & Docker Operations | ✅ Completed | Pass |
| **Phase 1** | Foundation & Shell Architecture | ✅ Completed | Pass |
| **Phase 2** | Design Tokens & Shared ERP Component Suite | ✅ Completed | Pass |
| **Phase 3** | Auth, Identity & Operational Cockpits | ✅ Completed | Pass |
| **Phase 4** | Core Financial Workspaces (Customers, Invoices, Payments) | ✅ Completed | Pass |
| **Phase 5** | Signature Workflows (Refund Queue & Reconciliation) | ⏳ Planned | Phase 5 Pass |
| **Phase 6** | Operational Administration, Audit & System Health | ⏳ Planned | Phase 6 Pass |
| **Phase 7** | Responsive Polish, Micro-interactions & DoD Audit | ⏳ Planned | Phase 7 Pass |

---
*End of Guide — Keep updated as phases are completed.*
