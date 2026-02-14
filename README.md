# QINDE ERP — Financial & Business Operations Platform

<p align="center">
  <strong>QINDE (ቅንደ) — Business, in order.</strong><br>
  <em>Inspired by the Oromo root <b>qindaa-</b>: organizing, arranging, coordinating, and putting business operations in order.</em>
</p>

---

## 📌 Executive Overview

**QINDE ERP** is a modern, high-density enterprise SaaS and financial operations platform designed for managing core organizational workflows:

- **Identity & Access Management:** Granular permission-based RBAC (7 System Roles).
- **Customer Directory:** Organization profiles, contact records, and payment histories.
- **Billing & Invoicing:** Multi-item invoice calculation, line item VAT/discounts, lifecycle state machine.
- **Payment Operations:** Chapa API v2 integration, payment attempt histories, transactional state machine, server verification.
- **Refund Management:** Approval queues, remaining refundable balance constraints, dual-authorization workflows.
- **Reconciliation Engine:** Dual-view matching workspace for ERP vs Provider records.
- **Notifications & Audit:** Telegram Bot & Email notifications, outbox event pattern, full audit logging.

---

## 🎨 Visual & UX Design Direction

QINDE adheres strictly to the **[QINDE UX/UI Design Contract](docs/frontend/QINDE/QINDE_DESIGN.md)**:

* **Visual Balance:** 70% Modern Enterprise SaaS | 20% Fintech Financial Clarity | 10% Subtle Ethiopian Identity.
* **Palette:** Deep Navy Structure (`#102A43`), Emerald Action Accent (`#198754`), Warm Gold Details (`#D9A441`), Calm Canvas (`#F7F9FC`).
* **Key Motifs:** Command Center (`Ctrl+K`), Exception-First Cockpit, Transaction Signal vertical pulse rail.

---

## 🚀 Quick Start & Operations

Use the master launcher script [`run.sh`](run.sh):

```bash
# 1. Start Frontend Development Server
./run.sh dev

# 2. Run Automated Smoke Tests & System Verification
./run.sh test

# 3. Build Production Bundle
./run.sh build

# 4. Spin up Docker Stack (Frontend + Postgres)
./run.sh docker
```

---

## 🏗️ Repository Architecture

```text
ERP-Payment-Notification-Management-System/
├── frontend/                 # React + TypeScript + Vite + QINDE Design Tokens
│   ├── src/
│   │   ├── components/       # ERPShell, ERPSidebar, ERPTopBar, ERPCommandCenter, QindeLogo
│   │   ├── styles/           # tokens.css (QINDE Color Palette, Typography, Spacing)
│   │   └── types/            # Shared TypeScript domain contracts
├── backend/                  # Spring Boot Java 21 Modular Monolith Target
├── docs/                     # Master Documentation & Implementation Guides
│   ├── ERP_Payment_Notification_Management_System_Master_Implementation_Guide.md
│   ├── QINDE_ERP_Brand_Name.md
│   └── frontend/
│       ├── FRONTEND_IMPLEMENTATION_PHASES.md
│       └── QINDE/
│           └── QINDE_DESIGN.md
├── docker/                   # Dockerfiles & Nginx Configurations
├── tests/                    # Automated Smoke Tests & Verification Suite
├── docker-compose.yml        # Multi-container operational orchestrator
└── run.sh                    # Master environment launcher script
```

---

## 📜 Development Roadmap & Execution

Frontend execution follows a 7-phase roadmap detailed in [`docs/frontend/FRONTEND_IMPLEMENTATION_PHASES.md`](docs/frontend/FRONTEND_IMPLEMENTATION_PHASES.md):

- [x] **Phase 0:** Enterprise Repository Setup & Docker Operations
- [ ] **Phase 1:** Foundation & Shell Architecture (`ERPShell`, `ERPSidebar`, `ERPTopBar`, `ERPCommandCenter`)
- [ ] **Phase 2:** Design Tokens & Reusable Component Suite (`ERPMetric`, `ERPStatus`, `ERPMoney`, `ERPTable`)
- [ ] **Phase 3:** Auth & Role-Based Operational Cockpits (Finance Manager, Accountant, Admin)
- [ ] **Phase 4:** Core Financial Workspaces (Customers, Invoices, Payments)
- [ ] **Phase 5:** Signature Workflows (Refund Queue, Reconciliation Workspace)
- [ ] **Phase 6:** System Operations, Audit & Webhook Health
- [ ] **Phase 7:** Responsive Polish, Micro-interactions & DoD Verification

---

## 🔒 License & Copyright

Copyright © 2026 QINDE ERP. All rights reserved.
