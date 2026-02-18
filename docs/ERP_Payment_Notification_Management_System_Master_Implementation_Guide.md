# ERP Payment & Notification Management System
## Production-Grade Implementation Master Guide

**Document status:** Implementation Baseline / Fixed Project Guide  
**Purpose:** Single source of truth for all implementation agents  
**Primary stack:** Java 21, Spring Boot, Spring Modulith, PostgreSQL  
**Payment provider:** Chapa API v2  
**Notification provider:** Telegram Bot API + Email  
**Testing:** JUnit 5, Mockito, Spring Boot Test, Testcontainers  
**Operations:** Docker, Docker Compose, GitHub Actions, Actuator, Micrometer, OpenTelemetry  
**API:** REST + OpenAPI  
**Database migrations:** Flyway  
**Architecture:** Modular Monolith with domain-driven modules and event-driven internal communication

---

# 0. How to Use This Document

This document is the **fixed implementation contract** for the project.

Every coding agent must treat this file as the primary architectural authority. Agents may improve implementation details, but they must not casually change:

- module boundaries
- payment state semantics
- security model
- database ownership
- webhook idempotency rules
- refund rules
- event contracts
- API versioning
- migration strategy
- testing standards
- observability requirements

If an agent believes a design change is necessary, it must:

1. Explain why the current rule is insufficient.
2. Identify affected modules.
3. Identify affected database tables/API contracts/tests.
4. Propose an Architecture Decision Record (ADR).
5. Get human approval before changing the baseline.

Do **not** let one agent silently redesign a previous agent's work.

---

# 1. Project Vision

Build a realistic ERP-style financial operations platform that demonstrates production-level backend engineering rather than basic CRUD.

The platform manages:

- users
- roles
- permissions
- customers
- invoices
- invoice items
- payment initiation
- payment verification
- payment webhooks
- payment reconciliation
- payment attempts
- refunds
- notifications
- audit logs
- operational reporting
- system health and observability

The central business workflow is:

```text
Customer
   |
   v
Invoice
   |
   v
Payment Initiation
   |
   v
Chapa Checkout
   |
   v
Payment Pending
   |
   +-----------------------+
   |                       |
   v                       v
Webhook                 Verification
   |                       |
   +-----------+-----------+
               |
               v
       Payment Confirmed
               |
        +------+------+
        |             |
        v             v
     Invoice       Domain Event
       Paid             |
                         +--> Notification
                         +--> Audit
                         +--> Reporting
```

The project should demonstrate:

- domain modeling
- clean architecture
- modular monolith design
- secure authorization
- transactional integrity
- idempotency
- asynchronous processing
- failure recovery
- payment reconciliation
- webhook security
- database design
- integration testing
- observability
- CI/CD
- production deployment discipline

---

# 2. Non-Goals

Do NOT build the following unless explicitly approved later:

- microservices
- Kubernetes
- Kafka
- RabbitMQ
- GraphQL
- gRPC
- Elasticsearch
- complex accounting/general ledger
- payroll
- inventory
- procurement
- manufacturing
- multi-country taxation
- mobile application
- multi-region deployment

These may sound impressive but would increase complexity without improving the core engineering demonstration.

The project should instead demonstrate depth.

---

# 3. Architecture Decision

## 3.1 Modular Monolith

The system will be one deployable Spring Boot application with strict internal business modules.

Spring Modulith is used to make module boundaries explicit, validate the architecture, test modules, and document module relationships.

Required top-level modules:

```text
identity
customer
invoice
payment
refund
notification
audit
reporting
shared
```

Optional supporting infrastructure packages:

```text
infrastructure
config
```

The `shared` package must remain small.

Do not create a giant shared package containing business logic.

---

# 4. Module Dependency Rules

The dependency direction is:

```text
identity
   |
customer
   |
invoice
   |
payment
   |
refund
   |
notification
   |
reporting
   |
audit
```

This diagram is conceptual, not a requirement that every module directly depends on the previous module.

The preferred communication mechanism between modules is:

1. public module APIs for synchronous queries/commands
2. application/domain events for asynchronous side effects

Avoid direct access to another module's repositories/entities.

### Forbidden

```java
@Autowired
private PaymentRepository paymentRepository;
```

inside the invoice module.

### Preferred

```text
Payment module
     |
     +--> PaymentSucceededEvent
                    |
                    +--> Invoice module
```

The payment module owns payment data.

The invoice module owns invoice data.

The notification module owns notification data.

---

# 5. Package Structure

Use:

```text
com.example.erp
│
├── ErpApplication.java
│
├── identity
│   ├── api
│   ├── application
│   ├── domain
│   └── infrastructure
│
├── customer
│   ├── api
│   ├── application
│   ├── domain
│   └── infrastructure
│
├── invoice
│   ├── api
│   ├── application
│   ├── domain
│   └── infrastructure
│
├── payment
│   ├── api
│   ├── application
│   ├── domain
│   └── infrastructure
│
├── refund
│   ├── api
│   ├── application
│   ├── domain
│   └── infrastructure
│
├── notification
│   ├── api
│   ├── application
│   ├── domain
│   └── infrastructure
│
├── audit
│   ├── api
│   ├── application
│   ├── domain
│   └── infrastructure
│
├── reporting
│   ├── api
│   ├── application
│   └── infrastructure
│
├── shared
│   ├── domain
│   ├── exception
│   ├── security
│   └── web
│
└── infrastructure
    ├── config
    ├── observability
    └── scheduling
```

Each module must hide its implementation.

---

# 6. Technology Baseline

## Backend

- Java 21 LTS
- Spring Boot
- Spring MVC
- Spring Security
- Spring Data JPA
- Hibernate
- Spring Modulith
- Bean Validation
- Jackson
- MapStruct

## Database

- PostgreSQL
- Flyway
- HikariCP

## Reliability

- transactional boundaries
- idempotency
- optimistic locking where appropriate
- database constraints
- retry policies
- outbox pattern
- persisted webhook events
- persisted notification attempts

## Testing

- JUnit 5
- Mockito
- AssertJ
- Spring Boot Test
- Testcontainers
- REST integration tests
- security tests

## Documentation

- OpenAPI / Swagger UI
- Markdown
- Mermaid diagrams where useful
- Architecture Decision Records

## Operations

- Docker
- Docker Compose
- GitHub Actions
- Spring Boot Actuator
- Micrometer
- OpenTelemetry

---

# 7. Versioning Rules

Use:

```text
/api/v1/
```

from the first API implementation.

Never create unversioned production endpoints such as:

```text
/api/invoices
```

Use:

```text
/api/v1/invoices
```

Webhook endpoints are provider-facing and may use:

```text
/api/v1/webhooks/chapa
```

---

# 8. Coding Standards

## 8.1 General

Use:

- meaningful names
- small services
- immutable request/response DTOs where practical
- constructor injection
- explicit validation
- explicit transaction boundaries
- domain-specific exceptions

Avoid:

- field injection
- magic strings
- giant services
- giant controllers
- generic `Utils` classes
- generic `Service` classes containing unrelated functionality
- direct entity exposure through APIs

---

# 9. Domain Model

The primary aggregates/entities are:

```text
User
Role
Permission

Customer

Invoice
InvoiceItem

Payment
PaymentAttempt

Refund

WebhookEvent

Notification
NotificationAttempt

AuditLog

OutboxEvent
```

---

# 10. Identity Module

## Responsibilities

The identity module owns:

- users
- authentication
- password hashing
- account status
- roles
- permissions
- authorization decisions
- JWT/session infrastructure

## User states

```text
ACTIVE
DISABLED
LOCKED
PENDING
```

Do not delete users physically for normal administrative deactivation.

Use status changes.

---

# 11. RBAC Model

Roles:

```text
SUPER_ADMIN
ADMIN
FINANCE_MANAGER
ACCOUNTANT
SALES
SUPPORT
CUSTOMER
```

Permissions:

```text
USER_READ
USER_CREATE
USER_UPDATE
USER_DISABLE

ROLE_READ
ROLE_ASSIGN

CUSTOMER_READ
CUSTOMER_CREATE
CUSTOMER_UPDATE

INVOICE_READ
INVOICE_CREATE
INVOICE_UPDATE
INVOICE_CANCEL

PAYMENT_READ
PAYMENT_INITIATE
PAYMENT_VERIFY

REFUND_READ
REFUND_CREATE
REFUND_APPROVE

REPORT_READ

AUDIT_READ

NOTIFICATION_READ
NOTIFICATION_RETRY
```

Authorization must be permission-based.

Avoid business logic such as:

```java
if (role.equals("ADMIN"))
```

Prefer:

```java
@PreAuthorize("hasAuthority('REFUND_APPROVE')")
```

Use both request-level and method-level security where appropriate.

---

# 12. Authentication

Recommended baseline:

```text
Login
  |
  v
Verify credentials
  |
  v
Load user + authorities
  |
  v
Generate access token
  |
  v
API requests
  |
  v
JWT authentication filter
```

Passwords must be hashed using Spring Security's supported password hashing strategy.

Never store:

- plaintext passwords
- reversible passwords
- API keys in the database without protection

JWT claims should contain only information required by the API.

Do not put sensitive financial data into JWTs.

---

# 13. Customer Module

Customer fields:

```text
id
customerNumber
firstName
lastName
email
phone
address
status
createdAt
updatedAt
version
```

Customer status:

```text
ACTIVE
SUSPENDED
INACTIVE
```

Customer number must be unique.

Do not use email as the database primary key.

---

# 14. Invoice Module

Invoice is a major business aggregate.

Fields:

```text
id
invoiceNumber
customerId
issueDate
dueDate
currency
subtotal
taxAmount
discountAmount
totalAmount
status
notes
createdBy
createdAt
updatedAt
version
```

Invoice statuses:

```text
DRAFT
ISSUED
PARTIALLY_PAID
PAID
OVERDUE
CANCELLED
```

Invoice items:

```text
id
invoiceId
description
quantity
unitPrice
taxRate
discountAmount
lineSubtotal
lineTotal
```

Money must never use floating point.

Use:

```java
BigDecimal
```

and PostgreSQL:

```sql
NUMERIC(19, 4)
```

or an equivalent precision approved during schema design.

---

# 15. Invoice Rules

1. Draft invoices can be edited.
2. Issued invoices should be financially immutable except for explicitly allowed administrative operations.
3. Cancelled invoices cannot receive normal payments.
4. Paid invoices cannot be cancelled through the ordinary cancellation endpoint.
5. Total must be calculated server-side.
6. Client-provided totals are never trusted.
7. Invoice totals must reconcile with invoice items.
8. Due date cannot precede issue date.
9. Currency must be explicitly stored.
10. Every invoice must have a unique invoice number.

---

# 16. Invoice Calculation

For every item:

```text
lineSubtotal = quantity × unitPrice
```

Then:

```text
subtotal = Σ lineSubtotal

taxAmount = calculated tax

discountAmount = applicable discount

totalAmount =
    subtotal
    + taxAmount
    - discountAmount
```

All monetary calculations must use deterministic rounding rules.

The rounding policy must be centralized.

Never scatter:

```java
setScale(...)
```

randomly throughout the code.

---

# 17. Payment Module

The payment module owns:

- payment lifecycle
- payment initiation
- provider references
- payment attempts
- verification
- payment status transitions
- payment reconciliation state
- payment events

Payment fields:

```text
id
paymentReference
invoiceId
merchantReference
providerReference
provider
amount
currency
paymentMethod
status
initiatedAt
verifiedAt
failedAt
createdAt
updatedAt
version
```

Payment statuses:

```text
INITIATED
PENDING
SUCCESS
FAILED
CANCELLED
INCOMPLETE
AUTH_NEEDED
```

Do not use generic statuses such as:

```text
DONE
ERROR
PAID
```

because they do not represent the provider lifecycle sufficiently.

---

# 18. Payment Attempts

Each payment may have multiple attempts.

Fields:

```text
id
paymentId
attemptNumber
provider
requestReference
providerReference
status
requestPayload
responsePayload
failureReason
startedAt
completedAt
```

Example:

```text
Payment PAY-100
|
+-- Attempt 1 -> FAILED
|
+-- Attempt 2 -> FAILED
|
+-- Attempt 3 -> SUCCESS
```

Do not overwrite historical attempts.

---

# 19. Payment State Machine

Allowed transitions:

```text
INITIATED -> PENDING
INITIATED -> FAILED
INITIATED -> CANCELLED

PENDING -> SUCCESS
PENDING -> FAILED
PENDING -> CANCELLED
PENDING -> INCOMPLETE
PENDING -> AUTH_NEEDED

AUTH_NEEDED -> PENDING
AUTH_NEEDED -> SUCCESS
AUTH_NEEDED -> FAILED

INCOMPLETE -> PENDING
INCOMPLETE -> FAILED

SUCCESS -> REFUNDABLE
```

Refund state is managed separately from the payment lifecycle.

Forbidden examples:

```text
FAILED -> SUCCESS
FAILED -> REFUNDED
CANCELLED -> SUCCESS
FULLY_REFUNDED -> SUCCESS
```

State transitions must be enforced in domain code.

---

# 20. Payment Initiation

Flow:

```text
POST /api/v1/invoices/{invoiceId}/payments
        |
        v
Validate invoice
        |
        v
Validate invoice state
        |
        v
Calculate outstanding balance
        |
        v
Create Payment
        |
        v
Create PaymentAttempt
        |
        v
Call Chapa
        |
        v
Persist provider reference
        |
        v
Return checkout URL
```

The client must never decide:

- payment amount
- invoice ownership
- payment status
- provider reference

The server determines these.

---

# 21. Chapa Integration Boundary

Do not spread Chapa API calls throughout the application.

Create:

```text
ChapaPaymentGateway
```

as an abstraction.

Example:

```java
public interface PaymentGateway {

    PaymentInitializationResult initialize(
        PaymentInitializationCommand command
    );

    PaymentVerificationResult verify(
        String providerReference
    );

    RefundInitializationResult refund(
        RefundCommand command
    );

    RefundVerificationResult verifyRefund(
        String refundReference
    );
}
```

Then:

```text
payment domain
      |
      v
PaymentGateway
      |
      v
ChapaPaymentGateway
      |
      v
Chapa API
```

This allows tests to use:

```text
FakePaymentGateway
```

without calling the real provider.

---

# 22. Chapa Configuration

All provider secrets must come from environment configuration.

Example:

```text
CHAPA_BASE_URL
CHAPA_SECRET_KEY
CHAPA_WEBHOOK_SECRET
CHAPA_CALLBACK_URL
CHAPA_RETURN_URL
```

Never commit real keys.

Never put keys into:

- Git
- Dockerfile
- source code
- test fixtures
- screenshots
- README

Use Chapa test mode during development.

---

# 23. Payment Verification

Never trust:

- frontend success screens
- redirect query parameters
- client-side status
- browser callbacks

The server must verify payment status through Chapa.

Verification flow:

```text
Client returns from checkout
        |
        v
Backend receives reference
        |
        v
Backend calls Chapa verification endpoint
        |
        v
Validate:
- provider reference
- merchant reference
- amount
- currency
- status
- environment/mode
        |
        v
Apply legal state transition
        |
        v
Publish PaymentVerified/PaymentSucceeded
```

A payment must not make an invoice `PAID` until the server has sufficient confirmation.

---

# 24. Webhook Security

Webhook endpoint:

```text
POST /api/v1/webhooks/chapa
```

Requirements:

1. HTTPS in deployed environments.
2. Validate Chapa signature according to current provider documentation.
3. Validate required payload fields.
4. Validate provider reference.
5. Validate merchant reference.
6. Validate amount and currency where applicable.
7. Verify critical transactions server-side.
8. Persist the raw event before processing.
9. Make processing idempotent.
10. Return HTTP 200 only after the event has been safely accepted/persisted.

Do not trust a webhook merely because it says:

```text
status = success
```

---

# 25. Webhook Event Table

Create:

```text
webhook_events
```

Fields:

```text
id
provider
eventType
deduplicationKey
providerReference
merchantReference
payload
signature
receivedAt
processedAt
status
failureReason
retryCount
createdAt
updatedAt
```

Statuses:

```text
RECEIVED
PROCESSING
PROCESSED
FAILED
IGNORED
```

Add a unique constraint on the chosen deduplication key.

---

# 26. Webhook Idempotency

Chapa may retry webhook delivery.

Processing must be safe if the same webhook arrives:

```text
1 time
2 times
10 times
```

The result must be equivalent to processing it once.

Recommended flow:

```text
Webhook received
      |
      v
Verify signature
      |
      v
Build deduplication key
      |
      v
Insert webhook event
      |
      +--> duplicate? --> return accepted
      |
      v
Process event
      |
      v
Update payment state
      |
      v
Publish domain event
      |
      v
Mark webhook processed
```

Never:

```text
webhook -> blindly increment paid amount
```

---

# 27. Webhook Ordering

Webhook events can arrive out of order.

The system must never allow an older event to overwrite a newer valid state.

Use one or both:

- provider event timestamps
- explicit state transition rules
- optimistic locking
- processed event tracking

Example:

```text
SUCCESS
arrives

then

PENDING
arrives
```

The second event must not downgrade the payment.

---

# 28. Refund Module

Refund is its own domain.

Refund fields:

```text
id
refundReference
paymentId
invoiceId
amount
currency
reason
status
providerReference
requestedBy
approvedBy
requestedAt
approvedAt
completedAt
failureReason
createdAt
updatedAt
version
```

Statuses:

```text
REQUESTED
APPROVED
PROCESSING
COMPLETED
FAILED
CANCELLED
```

---

# 29. Refund Rules

Refund is allowed only when:

```text
payment.status == SUCCESS
```

and:

```text
alreadyRefunded + requestedAmount <= originalPaymentAmount
```

Examples:

```text
Payment = 1,000 ETB

Refund 200 -> allowed
Refund 300 -> allowed
Refund 500 -> allowed
Refund 100 -> rejected
```

After 1,000 ETB total refunded:

```text
payment refundable balance = 0
```

No further refunds allowed.

---

# 30. Refund Approval

For production-style access control:

```text
ACCOUNTANT
    |
    v
Request refund
    |
    v
REQUESTED
    |
    v
FINANCE_MANAGER
    |
    v
Approve
    |
    v
PROCESSING
```

A future configuration can allow low-value refunds to skip approval, but the first implementation should demonstrate separation of duties.

---

# 31. Refund Processing

Flow:

```text
Refund requested
      |
      v
Validate permissions
      |
      v
Validate payment
      |
      v
Validate refundable balance
      |
      v
Create Refund REQUESTED
      |
      v
Approval
      |
      v
Call Chapa
      |
      v
PROCESSING
      |
      v
Webhook / verification
      |
      +--> COMPLETED
      |
      +--> FAILED
```

Never mark a refund completed solely because the API request was accepted.

Final status should be confirmed through provider verification/webhook behavior.

---

# 32. Domain Events

Important events:

```text
InvoiceCreatedEvent
InvoiceIssuedEvent
InvoiceCancelledEvent
InvoiceOverdueEvent

PaymentInitiatedEvent
PaymentSucceededEvent
PaymentFailedEvent
PaymentCancelledEvent
PaymentVerifiedEvent

RefundRequestedEvent
RefundApprovedEvent
RefundCompletedEvent
RefundFailedEvent

UserCreatedEvent
UserDisabledEvent
```

Events should contain stable identifiers and business facts.

Example:

```java
public record PaymentSucceededEvent(
    UUID paymentId,
    UUID invoiceId,
    BigDecimal amount,
    String currency,
    String providerReference,
    Instant occurredAt
) {}
```

Do not put JPA entities inside events.

---

# 33. Event Consumers

Payment success:

```text
PaymentSucceededEvent
       |
       +--> Invoice module
       |       |
       |       +--> mark invoice paid
       |
       +--> Notification module
       |       |
       |       +--> create Telegram notification
       |
       +--> Audit module
       |
       +--> Reporting module
```

A notification failure must not roll back the successful payment transaction.

---

# 34. Outbox Pattern

Implement a persistent outbox for critical asynchronous work.

Table:

```text
outbox_events
```

Fields:

```text
id
aggregateType
aggregateId
eventType
payload
status
attemptCount
availableAt
publishedAt
lastError
createdAt
updatedAt
```

Statuses:

```text
PENDING
PROCESSING
PUBLISHED
FAILED
```

Core guarantee:

```text
Business state update
        +
Outbox event insertion
```

must occur in the same database transaction.

Example:

```text
BEGIN

UPDATE payment SET status = SUCCESS

INSERT outbox_event(
  event_type = PAYMENT_SUCCEEDED
)

COMMIT
```

If the application crashes after commit, the outbox worker can continue processing the event.

---

# 35. Outbox Worker

Worker responsibilities:

1. fetch pending events
2. lock safely
3. process event
4. retry failures
5. increment attempt count
6. record last error
7. mark successful processing
8. avoid duplicate processing

Use controlled concurrency.

Do not create an unbounded executor.

---

# 36. Notification Module

Notification channels:

```text
TELEGRAM
EMAIL
```

Notification fields:

```text
id
type
channel
recipient
subject
message
status
attemptCount
nextRetryAt
lastError
createdAt
sentAt
```

Statuses:

```text
PENDING
PROCESSING
SENT
FAILED
CANCELLED
```

Notification attempts should be retained.

---

# 37. Notification Types

Examples:

```text
INVOICE_CREATED
INVOICE_ISSUED
PAYMENT_SUCCESS
PAYMENT_FAILED
REFUND_REQUESTED
REFUND_COMPLETED
REFUND_FAILED
INVOICE_OVERDUE
```

---

# 38. Notification Architecture

Use:

```text
NotificationProvider
        |
        +-- TelegramNotificationProvider
        |
        +-- EmailNotificationProvider
```

Never make the payment service directly depend on Telegram.

Correct:

```text
PaymentSucceededEvent
       |
       v
NotificationService
       |
       v
Telegram provider
```

---

# 39. Notification Retry

Use exponential backoff.

Example:

```text
Attempt 1 -> immediately
Attempt 2 -> 30 seconds
Attempt 3 -> 2 minutes
Attempt 4 -> 10 minutes
Attempt 5 -> 30 minutes
```

After maximum attempts:

```text
FAILED
```

Store the last error.

Never retry permanently without limits.

---

# 40. Audit Module

Audit every security-sensitive and financial operation.

Examples:

```text
USER_CREATED
USER_DISABLED

INVOICE_CREATED
INVOICE_ISSUED
INVOICE_CANCELLED

PAYMENT_INITIATED
PAYMENT_VERIFIED
PAYMENT_FAILED

REFUND_REQUESTED
REFUND_APPROVED
REFUND_COMPLETED

ROLE_ASSIGNED
PERMISSION_CHANGED
```

Audit log fields:

```text
id
actorId
action
entityType
entityId
oldValues
newValues
ipAddress
userAgent
correlationId
createdAt
```

Audit records must be append-only.

Normal users must never edit or delete audit records.

---

# 41. Reporting Module

Reports should be read-oriented and optimized for queries.

Initial reports:

```text
Revenue summary
Payment summary
Refund summary
Outstanding invoices
Overdue invoices
Payment success rate
Payment failure rate
Notification failure rate
```

Filters:

```text
from
to
status
currency
customer
paymentMethod
```

Do not load millions of records into Java memory to calculate simple reports.

Prefer database aggregation.

---

# 42. API Design

## Authentication

```http
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

## Users

```http
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/{id}
PATCH  /api/v1/users/{id}
POST   /api/v1/users/{id}/disable
```

## Customers

```http
GET    /api/v1/customers
POST   /api/v1/customers
GET    /api/v1/customers/{id}
PATCH  /api/v1/customers/{id}
```

## Invoices

```http
GET    /api/v1/invoices
POST   /api/v1/invoices
GET    /api/v1/invoices/{id}
PATCH  /api/v1/invoices/{id}
POST   /api/v1/invoices/{id}/issue
POST   /api/v1/invoices/{id}/cancel
```

## Payments

```http
GET  /api/v1/payments
GET  /api/v1/payments/{id}
POST /api/v1/invoices/{invoiceId}/payments
POST /api/v1/payments/{id}/verify
```

## Refunds

```http
GET  /api/v1/refunds
GET  /api/v1/refunds/{id}
POST /api/v1/payments/{paymentId}/refunds
POST /api/v1/refunds/{id}/approve
POST /api/v1/refunds/{id}/cancel
```

## Webhooks

```http
POST /api/v1/webhooks/chapa
```

## Notifications

```http
GET  /api/v1/notifications
POST /api/v1/notifications/{id}/retry
```

## Reports

```http
GET /api/v1/reports/revenue
GET /api/v1/reports/payments
GET /api/v1/reports/refunds
GET /api/v1/reports/outstanding-invoices
```

## Audit

```http
GET /api/v1/audit-logs
```

---

# 43. API Response Standard

Successful response:

```json
{
  "data": {},
  "meta": {}
}
```

For list responses:

```json
{
  "data": [],
  "meta": {
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5
  }
}
```

Errors:

```json
{
  "timestamp": "2026-09-01T18:20:00Z",
  "status": 409,
  "code": "PAYMENT_ALREADY_REFUNDED",
  "message": "The payment has already been fully refunded.",
  "path": "/api/v1/payments/123/refunds",
  "correlationId": "..."
}
```

---

# 44. Validation

Use Bean Validation.

Examples:

```text
@NotBlank
@NotNull
@Email
@Positive
@PositiveOrZero
@Size
@PastOrPresent
```

Financial business rules must be validated in the domain/application layer, not only through annotations.

Example:

```text
@Positive
```

does not replace:

```text
requestedRefund <= refundableAmount
```

---

# 45. Exception Handling

Use:

```java
@RestControllerAdvice
```

Map exceptions to stable error codes.

Example:

```text
RESOURCE_NOT_FOUND
VALIDATION_FAILED
INVALID_STATE_TRANSITION
DUPLICATE_RESOURCE
PAYMENT_NOT_FOUND
PAYMENT_VERIFICATION_FAILED
PAYMENT_PROVIDER_ERROR
REFUND_NOT_ALLOWED
REFUND_AMOUNT_EXCEEDED
DUPLICATE_WEBHOOK
FORBIDDEN_OPERATION
AUTHENTICATION_REQUIRED
```

Never expose stack traces in production API responses.

---

# 46. Database Rules

Use PostgreSQL.

Every table must have:

```text
id
created_at
updated_at
```

where appropriate.

Use UUIDs or another deliberate identifier strategy consistently.

Do not mix random ID strategies.

Use foreign keys.

Use unique constraints for business identifiers.

Examples:

```text
users.email UNIQUE

customers.customer_number UNIQUE

invoices.invoice_number UNIQUE

payments.payment_reference UNIQUE

payments.merchant_reference UNIQUE

webhook_events.deduplication_key UNIQUE
```

---

# 47. Optimistic Locking

Financial entities should consider optimistic locking.

For example:

```java
@Version
private Long version;
```

This protects against concurrent updates such as:

```text
Refund request A
Refund request B
```

both attempting to consume the same refundable balance.

The application must also use database constraints and transactional checks.

Optimistic locking alone is not a replacement for correct transaction design.

---

# 48. Transaction Boundaries

Transactions must exist around business operations.

Examples:

```text
createInvoice()
issueInvoice()
initiatePayment()
processWebhook()
requestRefund()
approveRefund()
completeRefund()
```

Do not make external HTTP calls unnecessarily while holding long database transactions.

Preferred pattern:

```text
short transaction
   |
   +--> persist state
   +--> persist attempt/outbox
   |
   +--> commit
   |
external call / worker
```

Where an external call must happen before committing provider state, design the operation carefully and persist enough state to recover.

---

# 49. External API Client Rules

Chapa HTTP calls must have:

- connection timeout
- read timeout
- reasonable response timeout
- controlled retries
- structured error handling
- correlation ID where supported
- safe logging

Never retry a payment initialization blindly if doing so could create duplicate provider transactions.

For each operation, explicitly classify it as:

```text
safe to retry
not safe to retry
retry only with idempotency key
```

---

# 50. Logging Rules

Use structured logs where practical.

Every important financial operation should log:

```text
correlationId
paymentId
invoiceId
providerReference
operation
result
duration
```

Never log:

```text
password
JWT
Chapa secret key
full card data
sensitive personal data
```

Raw webhook payloads may contain sensitive information. Store them according to a deliberate retention and redaction policy.

---

# 51. Correlation ID

Every HTTP request should have:

```text
X-Correlation-ID
```

If the client doesn't provide one:

```text
server generates one
```

Propagate it through:

```text
controller
 -> application service
 -> provider client
 -> event metadata
 -> notification worker
```

This allows an operator to trace:

```text
payment initiation
        ↓
Chapa
        ↓
webhook
        ↓
invoice update
        ↓
notification
```

---

# 52. Observability

Implement:

- Spring Boot Actuator
- health checks
- readiness/liveness concepts
- Micrometer metrics
- distributed tracing where practical
- structured logging

Important metrics:

```text
erp.payment.initiated
erp.payment.success
erp.payment.failed
erp.payment.verification.failure

erp.webhook.received
erp.webhook.duplicate
erp.webhook.failed

erp.refund.requested
erp.refund.completed
erp.refund.failed

erp.notification.sent
erp.notification.failed
erp.notification.retry

erp.invoice.created
erp.invoice.paid
erp.invoice.overdue
```

---

# 53. Health Checks

At minimum:

```text
/actuator/health
```

The application should distinguish application availability from dependency availability where appropriate.

Dependencies:

```text
PostgreSQL
Chapa
notification providers
```

Do not make a temporary Telegram outage make the entire ERP appear dead if the core API is healthy.

---

# 54. Security Baseline

Implement:

- secure password hashing
- JWT authentication
- permission-based authorization
- method security
- CORS policy
- CSRF strategy appropriate to authentication architecture
- request validation
- rate limiting for sensitive endpoints
- secure headers
- secret management
- audit logging

Sensitive endpoints:

```text
login
payment initiation
payment verification
refund request
refund approval
webhook
```

must receive extra attention.

---

# 55. Idempotency for Financial Commands

Implement an idempotency mechanism for client-initiated operations where duplicate requests could create financial consequences.

Example:

```http
Idempotency-Key: 6c0b...
```

For:

```text
payment initialization
refund creation
```

Store:

```text
idempotency_key
operation
request_hash
response
status
created_at
expires_at
```

Rules:

- same key + same request -> return original result
- same key + different request -> reject
- expired keys -> follow documented retention policy

---

# 56. Concurrency Scenarios That Must Be Tested

Test:

```text
Two refund requests at the same time

Two duplicate webhooks

Webhook + manual verification simultaneously

Two payment verification requests

Two invoice payment attempts

Two admins modifying same invoice

Notification retry while original attempt is completing
```

The expected result must be deterministic.

---

# 57. Test Strategy

Testing is a first-class deliverable.

Test pyramid:

```text
              E2E
             /   \
        Integration
          /       \
      Component   API
        /           \
          Unit Tests
```

---

# 58. Unit Tests

Test domain logic independently.

Examples:

```text
InvoiceCalculatorTest
InvoiceStateTest
PaymentStateMachineTest
RefundPolicyTest
RefundAmountValidatorTest
NotificationRetryPolicyTest
```

Test every illegal transition.

---

# 59. Integration Tests

Use real PostgreSQL through Testcontainers.

Test:

```text
repository queries
transactions
Flyway migrations
unique constraints
optimistic locking
JPA mappings
```

Do not replace PostgreSQL with H2 just to make tests easier.

---

# 60. Module Tests

Use Spring Modulith module tests where appropriate.

Every module should have tests validating:

- public API
- internal behavior
- event interactions
- module boundaries

The architecture verification test should fail if a module illegally accesses another module's internals.

---

# 61. API Tests

Test:

```text
HTTP status
request validation
response body
authorization
pagination
error responses
```

Examples:

```text
GET /api/v1/invoices
POST /api/v1/invoices
POST /api/v1/invoices/{id}/payments
POST /api/v1/webhooks/chapa
POST /api/v1/payments/{id}/refunds
```

---

# 62. Payment End-to-End Tests

At minimum:

### Scenario A: successful payment

```text
Create customer
Create invoice
Issue invoice
Initialize payment
Simulate Chapa success
Receive webhook
Verify transaction
Mark invoice paid
Create notification
Create audit event
```

### Scenario B: duplicate webhook

```text
Receive success webhook
Receive same webhook again

Expected:
one financial state transition
one effective payment
no duplicate invoice payment
no duplicate financial fulfillment
```

### Scenario C: failed payment

```text
Initialize
Receive failure
Payment = FAILED
Invoice remains unpaid
Failure notification generated
Audit generated
```

### Scenario D: partial refund

```text
Payment = 1000 ETB SUCCESS
Request refund = 200
Approve
Provider confirms
Refund = COMPLETED
Refunded = 200
Remaining refundable = 800
```

### Scenario E: over-refund

```text
Payment = 1000
Existing refunds = 800
Request = 300

Expected:
409 / business error
no provider request
no state change
```

---

# 63. Webhook Test Matrix

Test:

```text
valid success webhook
invalid signature
missing signature
duplicate webhook
unknown payment reference
unknown merchant reference
wrong amount
wrong currency
old event
out-of-order event
malformed JSON
provider timeout simulation
internal processing failure
retry after failure
```

---

# 64. Security Test Matrix

Test:

```text
unauthenticated user
invalid token
expired token
disabled user
customer accessing admin endpoint
accountant attempting refund approval
sales attempting refund approval
support accessing financial reports
missing permission
```

---

# 65. Test Data

Create deterministic fixtures.

Examples:

```text
ADMIN_USER
FINANCE_MANAGER_USER
ACCOUNTANT_USER
SALES_USER
CUSTOMER_USER

CUSTOMER_A
CUSTOMER_B

INVOICE_OPEN
INVOICE_PAID
INVOICE_OVERDUE

PAYMENT_PENDING
PAYMENT_SUCCESS
PAYMENT_FAILED

REFUND_REQUESTED
REFUND_COMPLETED
```

Never rely on random test data for core workflow tests unless randomness is the subject being tested.

---

# 66. Database Migrations

Never use:

```properties
spring.jpa.hibernate.ddl-auto=update
```

for production schema management.

Use Flyway.

Migration naming:

```text
V1__create_identity_tables.sql
V2__create_customer_tables.sql
V3__create_invoice_tables.sql
V4__create_payment_tables.sql
V5__create_refund_tables.sql
V6__create_webhook_tables.sql
V7__create_notification_tables.sql
V8__create_audit_tables.sql
V9__create_outbox_tables.sql
```

Do not edit already-applied migrations.

Create a new migration for changes.

---

# 67. Pagination

All list endpoints must support pagination.

Example:

```text
?page=0&size=20&sort=createdAt,desc
```

Never return unlimited database rows.

---

# 68. Filtering

Invoices:

```text
status
customerId
from
to
overdue
```

Payments:

```text
status
provider
customerId
invoiceId
from
to
```

Refunds:

```text
status
paymentId
from
to
```

---

# 69. API Documentation

Generate OpenAPI documentation.

Every endpoint should document:

- purpose
- authentication
- required permissions
- request schema
- response schema
- validation errors
- business errors
- example request
- example response

Swagger UI should be available in development.

Production exposure must be explicitly controlled.

---

# 70. Docker

Provide:

```text
Dockerfile
docker-compose.yml
docker-compose.dev.yml
```

Development stack:

```text
erp-api
postgres
optional observability services
```

The application must be buildable with:

```bash
./mvnw clean verify
```

and containerized.

---

# 71. Environment Configuration

Use:

```text
application.yml
application-dev.yml
application-test.yml
application-prod.yml
```

Environment variables:

```text
DB_HOST
DB_PORT
DB_NAME
DB_USERNAME
DB_PASSWORD

JWT_SECRET

CHAPA_BASE_URL
CHAPA_SECRET_KEY
CHAPA_WEBHOOK_SECRET

TELEGRAM_BOT_TOKEN
TELEGRAM_DEFAULT_CHAT_ID

MAIL_HOST
MAIL_PORT
MAIL_USERNAME
MAIL_PASSWORD
```

Never commit secrets.

Provide:

```text
.env.example
```

with placeholder values only.

---

# 72. CI Pipeline

GitHub Actions should run:

```text
checkout
   ↓
setup Java
   ↓
cache Maven
   ↓
compile
   ↓
unit tests
   ↓
architecture tests
   ↓
integration tests
   ↓
security tests
   ↓
package
   ↓
Docker build
```

Optional later:

```text
container vulnerability scan
dependency vulnerability scan
coverage report
```

A pull request must not merge if required tests fail.

---

# 73. Quality Gates

Target:

```text
all tests passing
architecture verification passing
no critical security vulnerabilities
database migrations valid
Docker image builds
OpenAPI generation succeeds
```

Code coverage target:

```text
domain/application logic: high coverage
controllers: meaningful integration coverage
critical payment/refund paths: near-complete coverage
```

Do not chase a fake 100% number.

---

# 74. Dependency Management

Before adding a dependency, ask:

1. Is it necessary?
2. Is it maintained?
3. Does Spring already provide the feature?
4. Does it increase operational complexity?
5. Does it introduce security risk?
6. Is it appropriate for the project's scale?

Avoid unnecessary libraries.

---

# 75. Documentation Requirements

The repository must contain:

```text
README.md

docs/
├── architecture.md
├── domain-model.md
├── database-design.md
├── payment-lifecycle.md
├── webhook-design.md
├── refund-design.md
├── notification-design.md
├── security.md
├── testing.md
├── deployment.md
├── troubleshooting.md
└── adr/
```

ADRs:

```text
001-modular-monolith
002-postgresql
003-payment-provider
004-webhook-idempotency
005-outbox-pattern
006-async-notifications
007-testcontainers
008-authentication
009-observability
```

---

# 76. Architecture Diagrams

The project should contain diagrams for:

1. system context
2. container architecture
3. module architecture
4. database ERD
5. payment sequence
6. webhook sequence
7. refund sequence
8. notification retry sequence
9. authentication flow
10. deployment architecture

Use Mermaid or PlantUML.

---

# 77. Payment Sequence Diagram

Required conceptual flow:

```text
Client
  |
  | create payment
  v
ERP API
  |
  | initialize
  v
Payment Module
  |
  | request
  v
Chapa
  |
  | checkout URL
  v
Client
  |
  | complete payment
  v
Chapa
  |
  | webhook
  v
Webhook Controller
  |
  | validate signature
  v
Webhook Service
  |
  | persist event
  v
Payment Module
  |
  | verify
  v
Chapa Verification API
  |
  | verified success
  v
Payment Module
  |
  +--> Invoice Module
  |
  +--> Notification Module
  |
  +--> Audit Module
  |
  +--> Reporting Module
```

---

# 78. Invoice Lifecycle

```text
DRAFT
  |
  v
ISSUED
  |
  +-------> CANCELLED
  |
  v
PARTIALLY_PAID
  |
  v
PAID
```

Separately:

```text
ISSUED
   |
   | due date passed and balance > 0
   v
OVERDUE
```

---

# 79. Reconciliation

Add a reconciliation concept.

The purpose:

```text
Internal payment state
        vs
Provider payment state
```

Potential statuses:

```text
MATCHED
MISMATCHED
MISSING_PROVIDER_RECORD
MISSING_INTERNAL_RECORD
PENDING_REVIEW
RESOLVED
```

Example mismatch:

```text
ERP:
payment = 1000 ETB SUCCESS

Provider:
payment = 800 ETB SUCCESS
```

This must become:

```text
MISMATCHED
```

not silently paid.

---

# 80. Reconciliation Job

Scheduled job:

```text
daily reconciliation
        |
        v
find recent payment records
        |
        v
verify provider state
        |
        v
compare:
- amount
- currency
- reference
- status
        |
        v
MATCHED / MISMATCHED
```

For a portfolio project, this feature demonstrates financial operations thinking.

---

# 81. Scheduled Jobs

Potential scheduled jobs:

```text
mark overdue invoices
process outbox events
retry notifications
retry failed webhook processing
reconcile payments
clean expired idempotency keys
```

Each job must be:

- observable
- safe to retry
- bounded
- logged
- tested

---

# 82. Job Locking

If multiple application instances eventually run the same scheduled job, prevent duplicate execution.

Use a database-backed locking strategy if necessary.

Do not assume:

```text
@Scheduled
```

automatically provides distributed locking.

---

# 83. Rate Limiting

Sensitive endpoints should have protection.

Examples:

```text
POST /auth/login
POST /payments
POST /refunds
POST /webhooks
```

Be careful with webhook rate limiting because provider retries must not be accidentally blocked.

---

# 84. Data Retention

Define retention policies for:

```text
audit logs
webhook payloads
notification attempts
provider responses
idempotency records
```

Do not keep sensitive payloads forever without a reason.

---

# 85. Financial Data Integrity

Never trust client values for:

```text
amount
currency
invoice total
payment status
refund status
provider reference
```

The server owns the financial truth.

The provider is the external source of payment status.

The ERP is the source of internal accounting/operational state.

The reconciliation layer resolves differences.

---

# 86. API Security Rules

Every endpoint must have an explicit security classification:

```text
PUBLIC
AUTHENTICATED
PERMISSION_REQUIRED
PROVIDER_WEBHOOK
INTERNAL_JOB
```

Create a security matrix:

| Endpoint | Access |
|---|---|
| Login | PUBLIC |
| Invoice list | AUTHENTICATED |
| Create invoice | INVOICE_CREATE |
| Payment initiation | PAYMENT_INITIATE |
| Payment verification | PAYMENT_VERIFY |
| Refund request | REFUND_CREATE |
| Refund approval | REFUND_APPROVE |
| Audit logs | AUDIT_READ |
| Chapa webhook | PROVIDER_WEBHOOK |

---

# 87. Agent Workflow

Every implementation agent must follow:

```text
1. Read this document.
2. Inspect existing repository.
3. Inspect previous migrations.
4. Inspect existing tests.
5. Identify current phase.
6. Do not modify unrelated modules.
7. Implement the smallest complete increment.
8. Add tests.
9. Run required checks.
10. Update documentation.
11. Report files changed.
12. Report tests executed.
13. Report unresolved issues.
```

---

# 88. Agent Handoff Contract

Every agent must finish with:

```text
## Completed
- ...

## Files Added
- ...

## Files Modified
- ...

## Database Changes
- ...

## APIs Added
- ...

## Events Added
- ...

## Tests Added
- ...

## Tests Executed
- ...

## Known Limitations
- ...

## Next Agent
Recommended next task:
- ...

## Architectural Decisions
- ...

## Migration Notes
- ...
```

This prevents context loss between agents.

---

# 89. Never Assume Previous Work

Before modifying existing code, an agent must inspect:

```text
pom.xml
application.yml
database migrations
module structure
security configuration
existing tests
```

Do not recreate files that already exist.

Do not overwrite migrations.

Do not replace architecture without an ADR.

---

# 90. Definition of Done

A task is not complete merely because code compiles.

A feature is complete when:

```text
Implementation
    +
Validation
    +
Tests
    +
Security
    +
Database migration
    +
Documentation
    +
Observability
```

are addressed.

---

# 91. Phase 0 — Project Charter

## Goal

Establish the repository and project rules before business code.

## Tasks

1. Create Git repository.
2. Create README.
3. Create `/docs`.
4. Create architecture document.
5. Create ADR directory.
6. Create `.gitignore`.
7. Create `.env.example`.
8. Create license if desired.
9. Create issue/branch strategy.
10. Establish Java/Spring versions.

## Acceptance Criteria

```text
repository builds
documentation exists
application starts
CI runs
no secrets committed
```

---

# 92. Phase 1 — Spring Boot Foundation

Implement:

```text
Java 21
Spring Boot
Maven
Spring Modulith
PostgreSQL
Flyway
Actuator
OpenAPI
```

Create:

```text
GET /actuator/health
```

Acceptance:

```text
./mvnw clean verify
```

passes.

Application starts against PostgreSQL.

---

# 93. Phase 2 — Database Foundation

Implement:

```text
users
roles
permissions
user_roles
role_permissions
```

Then:

```text
customers
```

Use Flyway migrations.

Add repository tests using Testcontainers.

Acceptance:

- migration succeeds on empty DB
- migration succeeds in test container
- unique constraints work
- rollback strategy/documentation exists
- repositories tested

---

# 94. Phase 3 — Identity and Security

Implement:

```text
authentication
JWT
users
roles
permissions
method security
```

Acceptance:

```text
login succeeds
invalid password fails
disabled user fails
permission checks work
JWT validation works
security integration tests pass
```

---

# 95. Phase 4 — Customer Module

Implement:

```text
create
read
update
search
pagination
status
```

Acceptance:

```text
validation works
authorization works
database constraints work
integration tests pass
OpenAPI documentation exists
```

---

# 96. Phase 5 — Invoice Module

Implement:

```text
Invoice
InvoiceItem
calculation
issue
cancel
overdue detection
pagination
filtering
```

Acceptance:

```text
totals calculated server-side
money uses BigDecimal
state transitions enforced
concurrent updates handled
tests pass
```

---

# 97. Phase 6 — Payment Domain Without Chapa

Before integrating the real provider, implement the internal payment model.

Implement:

```text
Payment
PaymentAttempt
PaymentStateMachine
PaymentService
Payment events
```

Create:

```text
FakePaymentGateway
```

Acceptance:

All payment scenarios pass without any external network.

This isolates domain correctness from provider problems.

---

# 98. Phase 7 — Chapa Adapter

Implement:

```text
ChapaPaymentGateway
```

Implement:

```text
initialize payment
verify payment
```

Add:

```text
timeouts
structured errors
provider response mapping
test configuration
```

Acceptance:

- test environment works
- no secret committed
- integration can be disabled locally
- fake gateway tests remain available

---

# 99. Phase 8 — Webhooks

Implement:

```text
POST /api/v1/webhooks/chapa
```

Then:

```text
signature validation
event persistence
deduplication
state transition
verification
event publication
```

Acceptance:

```text
duplicate webhook is harmless
invalid signature rejected
out-of-order state handled
provider mismatch detected
integration tests pass
```

---

# 100. Phase 9 — Invoice/Payment Integration

Implement:

```text
PaymentSucceededEvent
```

Consumer:

```text
Invoice module
```

Rules:

```text
successful full payment
    -> PAID

successful partial payment
    -> PARTIALLY_PAID

remaining balance = 0
    -> PAID
```

Acceptance:

Invoice state is derived from successful payment facts, not client input.

---

# 101. Phase 10 — Refunds

Implement:

```text
refund request
approval
provider call
verification
webhook
partial refunds
full refunds
```

Acceptance:

```text
cannot refund failed payment
cannot over-refund
duplicate refund requests controlled
refund approval permission enforced
refund completion confirmed
```

---

# 102. Phase 11 — Outbox

Implement:

```text
outbox_events
```

Publish:

```text
PaymentSucceeded
RefundCompleted
InvoiceOverdue
```

Acceptance:

```text
business transaction + outbox insert atomic
worker retries failures
duplicate delivery is safe
outbox metrics available
```

---

# 103. Phase 12 — Notifications

Implement:

```text
Notification
NotificationAttempt
Telegram provider
Email provider
retry policy
```

Connect events:

```text
PaymentSucceeded
PaymentFailed
RefundCompleted
InvoiceOverdue
```

Acceptance:

```text
payment succeeds even if Telegram is down
notification retry works
failed notification is observable
duplicate event does not create duplicate effective notification
```

---

# 104. Phase 13 — Audit

Implement append-only audit events.

Acceptance:

```text
financial actions audited
security actions audited
actor recorded
correlation ID recorded
audit API permission protected
```

---

# 105. Phase 14 — Reconciliation

Implement:

```text
reconciliation service
reconciliation records
scheduled reconciliation
mismatch reporting
```

Acceptance:

```text
matching payment -> MATCHED
amount mismatch -> MISMATCHED
unknown provider state -> REVIEW
```

---

# 106. Phase 15 — Reporting

Implement database-backed reports.

Acceptance:

```text
revenue report
payment report
refund report
outstanding invoice report
overdue report
```

Use pagination/filtering where appropriate.

---

# 107. Phase 16 — Observability

Implement:

```text
Actuator
metrics
structured logs
correlation ID
tracing
business metrics
```

Acceptance:

An operator can answer:

```text
How many payments failed?
Why did they fail?
Which invoice was affected?
Which provider reference was involved?
Did notification fail?
Can I trace the request?
```

---

# 108. Phase 17 — Production Hardening

Perform:

```text
security review
dependency review
SQL query review
transaction review
concurrency testing
webhook review
secret review
logging review
Docker review
CI review
```

Add:

```text
rate limiting
timeouts
safe retries
health checks
graceful shutdown
```

---

# 109. Phase 18 — User Acceptance Testing

Create a UAT matrix with at least:

```text
25+ business scenarios
```

Suggested scenarios:

1. Create customer.
2. Create invoice.
3. Issue invoice.
4. Initiate payment.
5. Successful payment.
6. Failed payment.
7. Cancelled payment.
8. Duplicate webhook.
9. Invalid webhook.
10. Payment verification.
11. Partial payment.
12. Full payment.
13. Invoice becomes overdue.
14. Request refund.
15. Approve refund.
16. Partial refund.
17. Full refund.
18. Over-refund attempt.
19. Refund failure.
20. Telegram notification success.
21. Telegram notification failure.
22. Notification retry.
23. Unauthorized refund.
24. Audit log review.
25. Reconciliation mismatch.

Record:

```text
scenario
expected result
actual result
status
issue ID
resolution
```

If the resume says “25+ users,” keep user testing evidence separate from automated testing evidence. Do not present automated tests as human users.

---

# 110. Release Readiness Checklist

Before release:

## Architecture

- [ ] module boundaries verified
- [ ] no illegal module dependencies
- [ ] ADRs complete
- [ ] diagrams updated

## Security

- [ ] authentication tested
- [ ] authorization tested
- [ ] secrets externalized
- [ ] sensitive logging reviewed
- [ ] webhook authentication verified

## Payments

- [ ] payment state machine tested
- [ ] provider verification implemented
- [ ] webhook idempotency implemented
- [ ] duplicate events tested
- [ ] refund rules tested
- [ ] reconciliation implemented

## Database

- [ ] migrations tested
- [ ] constraints tested
- [ ] indexes reviewed
- [ ] transaction boundaries reviewed
- [ ] optimistic locking reviewed

## Reliability

- [ ] outbox implemented
- [ ] retries bounded
- [ ] notification failures recoverable
- [ ] external API timeouts configured
- [ ] idempotency implemented

## Testing

- [ ] unit tests
- [ ] integration tests
- [ ] Testcontainers
- [ ] API tests
- [ ] security tests
- [ ] end-to-end payment workflows
- [ ] concurrency tests

## Operations

- [ ] Docker build
- [ ] health checks
- [ ] metrics
- [ ] logs
- [ ] tracing
- [ ] CI pipeline

## Documentation

- [ ] README
- [ ] architecture
- [ ] database ERD
- [ ] API docs
- [ ] payment lifecycle
- [ ] webhook design
- [ ] refund design
- [ ] testing strategy
- [ ] deployment guide
- [ ] troubleshooting guide

---

# 111. Resume Evidence Requirements

The final project should be able to substantiate resume claims.

If claiming:

> implemented payment verification

repository evidence should include:

```text
ChapaPaymentGateway
verification service
verification tests
payment sequence diagram
```

If claiming:

> implemented webhook processing

repository evidence should include:

```text
WebhookController
WebhookService
WebhookEvent entity
deduplication constraint
signature validation
tests
```

If claiming:

> implemented refund workflows

repository evidence should include:

```text
Refund domain
approval flow
partial refund logic
provider adapter
webhook/verification
tests
```

If claiming:

> production-style reliability

repository evidence should include:

```text
idempotency
outbox
retry
timeouts
audit
observability
concurrency tests
```

---

# 112. Git Commit Strategy

Use meaningful commits.

Examples:

```text
feat(identity): implement permission-based authorization
feat(invoice): add invoice lifecycle
feat(payment): add payment state machine
feat(payment): integrate Chapa initialization
feat(webhook): add idempotent Chapa webhook processing
feat(refund): add partial refund workflow
feat(notification): add Telegram provider
feat(outbox): add transactional event outbox
test(payment): add concurrent webhook tests
docs(architecture): document modular boundaries
```

Avoid:

```text
update
fix stuff
changes
final
final2
```

---

# 113. Branch Strategy

Suggested:

```text
main
develop
feature/identity
feature/invoice
feature/payment
feature/webhook
feature/refund
feature/notification
feature/reconciliation
```

Each feature should be independently reviewable.

---

# 114. Pull Request Checklist

Every PR:

```text
What changed?

Why?

Affected modules?

Database changes?

API changes?

Events changed?

Security impact?

Tests added?

Tests run?

Breaking changes?

Documentation updated?
```

---

# 115. Agent Prompt Template

Use this template whenever assigning a task to an implementation agent:

```text
You are working on the ERP Payment & Notification Management System.

The repository contains a master implementation guide:
docs/IMPLEMENTATION_MASTER_GUIDE.md

You MUST read and follow it before changing code.

Current phase:
[PHASE]

Task:
[TASK]

Constraints:
- Do not change architecture without an ADR.
- Do not modify unrelated modules.
- Do not bypass existing tests.
- Do not change payment/refund state semantics.
- Do not expose JPA entities directly from APIs.
- Do not introduce new dependencies without justification.
- Do not commit secrets.

Required:
1. Inspect existing implementation.
2. Implement the task according to the master guide.
3. Add/modify database migrations if required.
4. Add unit/integration/API tests.
5. Update documentation.
6. Run the relevant test suite.
7. Run ./mvnw clean verify before completion if practical.

At the end provide:
- completed work
- files changed
- database changes
- API changes
- events changed
- tests added
- tests executed
- known limitations
- recommended next task
```

---

# 116. Agent Handoff Example

Agent A completes invoice module.

It reports:

```text
Completed:
- invoice aggregate
- invoice item calculation
- issue/cancel lifecycle
- PostgreSQL migration
- REST API
- unit tests
- integration tests

Files:
...

Database:
V3__create_invoice_tables.sql

API:
POST /api/v1/invoices
GET /api/v1/invoices
...

Events:
InvoiceCreatedEvent
InvoiceIssuedEvent

Tests:
42 passing

Known limitations:
Payment integration not implemented.

Next agent:
Implement payment domain without Chapa.
```

Agent B must start by reading this report and inspecting the actual code.

---

# 117. Final Architecture

At release, the project should look conceptually like:

```text
                         ┌────────────────────┐
                         │      Clients       │
                         └─────────┬──────────┘
                                   │
                              REST / JSON
                                   │
                         ┌─────────▼──────────┐
                         │    Spring Boot     │
                         │   API Boundary     │
                         └─────────┬──────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
   Identity                    Customer                    Invoice
        │                                                     │
        │                                                     ▼
        │                                                  Payment
        │                                                     │
        │                          ┌──────────────────────────┤
        │                          │                          │
        │                          ▼                          ▼
        │                       Chapa                      Refund
        │                          │                          │
        │                          ▼                          │
        │                       Webhook                      │
        │                          │                          │
        └──────────────────────────┼──────────────────────────┘
                                   │
                              Domain Events
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
              Notification       Audit        Reporting
                    │
             ┌──────┴──────┐
             ▼             ▼
          Telegram       Email

                     PostgreSQL
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
          Business                Outbox
           Data                   Events
```

---

# 118. The Standard of Excellence

The project is considered successful when an experienced backend engineer can inspect the repository and clearly see:

```text
The developer understands:
    |
    +-- domain modeling
    +-- REST API design
    +-- PostgreSQL
    +-- transactions
    +-- concurrency
    +-- Spring Security
    +-- modular architecture
    +-- event-driven architecture
    +-- payment integrations
    +-- webhook security
    +-- idempotency
    +-- retries
    +-- refunds
    +-- observability
    +-- automated testing
    +-- CI/CD
    +-- production operations
```

The goal is not to make the repository large.

The goal is to make every important engineering decision defensible.

---

# 119. Final Project Definition

The final portfolio project should be described as:

> A production-style modular ERP financial operations platform built with Java and Spring Boot, providing secure invoice management, payment processing, Chapa integration, server-side verification, idempotent webhooks, partial/full refunds, reconciliation, role-based access control, audit logging, reliable asynchronous notifications, transactional outbox processing, observability, and comprehensive PostgreSQL/Testcontainers-based testing.

That is the target.

Do not lower the architecture merely because an implementation step is difficult.

When complexity is encountered, simplify the implementation—not the business correctness.

---

# 120. Primary References Used

The implementation guide is based on current official documentation and open-source reference material, especially:

1. Spring Modulith reference documentation:
   https://docs.spring.io/spring-modulith/reference/

2. Spring Modulith GitHub:
   https://github.com/spring-projects/spring-modulith

3. Spring Security authorization documentation:
   https://docs.spring.io/spring-security/reference/servlet/authorization/

4. Chapa API v2 Quick Start:
   https://docs.chapa.global/docs/v2/getting-started

5. Chapa payment verification:
   https://docs.chapa.global/docs/v2/integrations/verify-payment

6. Chapa webhooks:
   https://docs.chapa.global/docs/v2/integrations/webhooks

7. Chapa security guidance:
   https://docs.chapa.global/docs/v2/security/security-guide

8. Chapa refunds:
   https://docs.chapa.global/docs/v2/refunds/refunds

9. Testcontainers:
   https://testcontainers.com/

10. Spring Boot reference documentation:
    https://docs.spring.io/spring-boot/reference/

---

# 121. Master Rule

**This document is the project's architectural constitution.**

Agents implement it.

Agents do not redefine it.

If a future requirement conflicts with this document:

```text
Requirement
    ↓
Impact analysis
    ↓
ADR
    ↓
Human approval
    ↓
Update master guide
    ↓
Implementation
    ↓
Tests
```

Never silently change the architecture.

**End of Master Implementation Guide**
