# QINDE ERP — Backend Module (Target Architecture)

This directory will house the **Java 21 + Spring Boot 3 + Spring Modulith** backend for QINDE ERP, following the specification in [`ERP_Payment_Notification_Management_System_Master_Implementation_Guide.md`](../docs/ERP_Payment_Notification_Management_System_Master_Implementation_Guide.md).

## Target Stack & Architecture

- **JDK:** Java 21 LTS
- **Framework:** Spring Boot 3, Spring Modulith
- **Database:** PostgreSQL 16 + Flyway Migration
- **Security:** Spring Security (Stateless JWT + Permission RBAC)
- **Payment Provider:** Chapa API v2 Integration Boundary
- **Notification:** Telegram Bot API + Outbox Event Consumer Pattern

## Top-Level Modules

```text
com.example.erp
├── identity      # Users, Roles, Permissions, JWT authentication
├── customer      # Customer aggregate, account status
├── invoice       # Invoices, invoice items, monetary calculation
├── payment       # Payment initiation, attempts, Chapa gateway, webhooks
├── refund        # Refund requests, approval workflow, limits
├── notification  # Outbox consumer, Telegram & Email dispatch
├── audit         # System audit logs
├── reporting     # Financial aggregations
└── shared        # Core exceptions, domain primitives
```

*Note: Backend implementation will begin after complete visual & interactive delivery of the frontend.*
