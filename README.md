# QINDE ERP (ቅንደ) — Enterprise Payment & Notification Management System

<p align="center">
  <img src="docs/frontend/reference%20images/hero.png" alt="QINDE ERP Platform" width="100%" style="border-radius: 8px;" />
</p>

<p align="center">
  <strong>QINDE (ቅንደ) — Business, in order.</strong><br>
  <em>Derived from the Oromo root <b>qindaa-</b>: organizing, arranging, coordinating, and putting financial business operations in order.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-198754?style=for-the-badge&logo=vite" alt="Build Status" />
  <img src="https://img.shields.io/badge/Tests-61%2F61%20Passed-102A43?style=for-the-badge&logo=node.js" alt="Smoke Tests" />
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/Chapa-v2%20Integration-D9A441?style=for-the-badge" alt="Chapa Gateway" />
</p>

---

## 🏛️ System Overview

**QINDE ERP** is a high-density, multi-tenant enterprise financial operations platform engineered for payment processing, automated invoicing, signature reconciliation, dual-authorization refunds, and transactional notification logging.

Designed specifically for enterprise billing workflows and regional fintech rails in East Africa, QINDE combines strict Role-Based Access Control (RBAC), automated Ethiopian 15% VAT tax engines, and side-by-side reconciliation logic.

---

## ⚡ Core Business Modules

* **Identity & Access Management (RBAC):** 7 system roles (`SUPER_ADMIN`, `ADMIN`, `FINANCE_MANAGER`, `ACCOUNTANT`, `SALES`, `SUPPORT`, `CUSTOMER`) with permission-scoped views and active session tracking.
* **Customer Account Directory:** Master organization profiles, tax identification numbers (TIN), credit limits, and historical ledger signals.
* **Billing & Automated Invoicing:** Multi-line invoice calculation wizard enforcing automated **15% Ethiopian VAT**, itemized discounts, and sequential invoice lifecycle tracking (`DRAFT` → `SENT` → `PAID` → `OVERDUE`).
* **Payment Operations Ledger:** Real-time Chapa API v2 payment processing simulation, transaction attempt histories, gateway reference tracking (`CHAPA-XXXXX`), and server verification verification rails.
* **Dual-Authorization Refund Queue:** Payout queue enforcing max refundable balance constraints, dual-manager approval requirements, and immutable audit logs.
* **Reconciliation Dual-View Workspace:** **Signature Screen** providing side-by-side diff comparison between ERP internal ledgers and gateway settlement files with manual match, force resolve, and investigation triggers.
* **Transactional Outbox & Notifications:** Telegram Bot API and email outbox logs monitoring dispatch statuses (`QUEUED`, `DELIVERED`, `FAILED`) with one-click retry triggers.
* **System Operations & Audit Trail:** Immutable security event stream, HMAC SHA256 webhook signature verification logs, API latency metrics, and system configuration controls.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
|---|---|---|
| **Frontend Core** | React 18, TypeScript 5, Vite | High-performance SPA with strict type safety |
| **Styling & Tokens** | Vanilla CSS Modules | Custom design token system (`--color-brand-navy`, `--color-brand-green`, `--color-brand-gold`) |
| **Iconography** | Lucide React | High-density SVG icon library |
| **Testing** | Node.js Test Runner | Custom automated smoke test engine (61 validation checks) |
| **Containerization** | Docker, Docker Compose | Multi-stage build containers with Nginx production server |
| **Database Scoping** | PostgreSQL 16 (Prepared) | Enterprise relational schema target |
| **Integrations** | Chapa Gateway v2 & Telegram Bot API | Transaction checkout & outbox notifications |

---

## 🚀 Execution & Operating Modes

QINDE ERP provides multiple flexible operational methods for local development, automated testing, production builds, and containerized deployment.

### Method 1: Master Shell Launcher (`run.sh`)

The recommended entry point for developers is the root [`run.sh`](run.sh) script:

```bash
# 1. Launch Vite Local Development Server
./run.sh dev

# 2. Run Automated System & Smoke Test Suite (61/61 Passing)
./run.sh test

# 3. Compile Production Bundle (0 Errors, 0 Warnings)
./run.sh build

# 4. Spin up Docker Multi-Container Infrastructure
./run.sh docker-up

# 5. Stop Docker Infrastructure
./run.sh docker-down
```

---

### Method 2: Local Node.js / NPM Workflow

If executing directly via Node.js and `npm`:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite hot-reloading dev server (http://localhost:5173)
npm run dev

# Perform TypeScript validation & compile production bundle
npm run build

# Preview built production dist bundle locally
npm run preview
```

---

### Method 3: Containerized Docker Stack

To run the complete platform inside isolated Docker containers:

```bash
# Build and launch all containers in detached mode
docker-compose up --build -d

# Verify running container status
docker-compose ps

# View real-time container logs
docker-compose logs -f frontend

# Shutdown containers and cleanup volumes
docker-compose down -v
```

The application will be accessible at `http://localhost:8080` (or `http://localhost:5173` in dev mode).

---

### Method 4: Automated Test & Verification Suite

Execute the standalone smoke test engine to validate 61 component, architectural, and token assertions:

```bash
# Run test suite from repository root
node tests/runner.js
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to create your local `.env` file:

```bash
cp .env.example .env
```

### Environment Variables Schema

```env
# Application Scoping
VITE_APP_NAME="QINDE ERP"
VITE_APP_ENV="development"
VITE_API_BASE_URL="http://localhost:8080/api/v1"

# Chapa Gateway Integration Keys
VITE_CHAPA_PUBLIC_KEY="CHAPUBK_TEST-9843201948203948"
VITE_CHAPA_SECRET_KEY="CHASECK_TEST-••••••••••••••••"
VITE_CHAPA_WEBHOOK_SECRET="whsec_9843201948203948"

# Telegram Bot Outbox Configuration
VITE_TELEGRAM_BOT_TOKEN="bot78439201:AAH••••••••••••••••"
VITE_TELEGRAM_FINANCE_CHAT_ID="-100198432019"

# Tax & Currency Controls
VITE_DEFAULT_VAT_RATE="15.0"
VITE_DEFAULT_CURRENCY="ETB"
```

---

## 📁 Repository Directory Structure

```text
ERP-Payment-Notification-Management-System/
├── docker/                           # Container definitions
│   ├── Dockerfile.frontend           # Multi-stage Vite + Nginx build
│   └── Dockerfile.backend            # Target Spring Boot container
├── docs/                             # Architecture & implementation contracts
│   ├── QINDE_ERP_Brand_Name.md       # QINDE brand identity document
│   ├── ERP_Payment_Notification_Management_System_Master_Implementation_Guide.md
│   └── frontend/
│       ├── FRONTEND_IMPLEMENTATION_PHASES.md
│       └── QINDE/
│           └── QINDE_DESIGN.md       # Visual & UI design contract
├── frontend/                         # Frontend application root
│   ├── public/                       # Static public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/                # Audit, Analytics, User Matrix, Health, Settings
│   │   │   ├── auth/                 # LoginPage & Session Guard
│   │   │   ├── brand/                # QindeLogo SVG component
│   │   │   ├── customers/            # CustomerList, CustomerDetail, CustomerDrawer
│   │   │   ├── dashboards/           # FinanceManager, Accountant, Admin, Customer Cockpits
│   │   │   ├── erp/                  # ERPMetric, ERPStatus, ERPMoney, ERPTable, ERPTimeline
│   │   │   ├── invoices/             # InvoiceList, InvoiceDetail, InvoiceCreateWizard
│   │   │   ├── layout/               # ERPShell, ERPSidebar, ERPTopBar
│   │   │   ├── notifications/        # NotificationLogList, NotificationDrawer
│   │   │   ├── overlay/              # ERPCommandCenter, KeyboardShortcutsModal
│   │   │   ├── payments/             # PaymentList, PaymentDetail, PaymentInitiationModal
│   │   │   ├── reconciliation/       # ReconciliationWorkspace, DualView, ResolutionModal
│   │   │   ├── refunds/              # RefundList, RefundDetail, RefundRequestModal
│   │   │   └── ui/                   # Button, Input, Badge primitives
│   │   ├── styles/
│   │   │   ├── tokens.css            # Color palette, typography scale, shadows
│   │   │   └── responsive.css        # Breakpoints (375px, 768px, 1024px, 1440px)
│   │   ├── types/                    # Domain data contracts & interfaces
│   │   ├── App.tsx                   # Top-level workspace router & shell container
│   │   └── main.tsx                  # React entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── tests/
│   └── runner.js                     # 61-point automated smoke test suite
├── docker-compose.yml                # Multi-container operational orchestrator
├── run.sh                            # Master executable shell launcher
└── README.md                         # Master system documentation
```

---

## 📄 License & Copyright

Copyright © 2026 **QINDE ERP Technologies PLC**. All rights reserved.
Licensed under Enterprise Commercial License.
