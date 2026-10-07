# System Architecture Note: Automated Relational Seeding, Secure Middleware Gates & Transactional Lifecycle

**Course:** Full Stack Technologies (FST) — Assignment 2  
**Author:** Indraneel Samanta  
**Project:** `myportfolioassignment`  
**Target Course Outcomes:** CO3 (Secure Authorization & Session Validation via Next.js Proxy/Middleware), CO4 (Deploy Data-Driven Endpoints via Prisma ORM)  
**Associated Units:** Unit IV (Database Integration: Prisma ORM), Unit V (Modern Authentication & Session Control), Unit VI (Optimization & Edge Layers)

---

## 1. Relational Data Modeling & Entity Relationship Blueprint

The persistence layer is modeled in `prisma/schema.prisma` with relational integrity, normalized foreign keys, and cascading deletion semantics.

### 1.1 Entity Relationship Diagram

```
┌───────────────────────────┐
│           Role            │
├───────────────────────────┤
│ id (PK, String, cuid)     │◄───────────────────┐
│ name (String, unique)     │                    │
│ description (String?)     │                    │
│ createdAt (DateTime)      │                    │
└─────────────┬─────────────┘                    │
              │ 1                                │ 1:N
              │                                  │
              │ N                                │
┌─────────────▼─────────────┐                    │
│           User            │                    │
├───────────────────────────┤                    │
│ id (PK, String, cuid)     │                    │
│ email (String, unique)    │                    │
│ name (String)             │                    │
│ roleId (FK -> Role.id)    ├────────────────────┘
│ createdAt (DateTime)      │
│ updatedAt (DateTime)      │
└──────┬──────────────┬─────┘
       │ 1            │ 1
       │              │
       │ 0..N         │ 0..N
┌──────▼──────┐ ┌─────▼───────┐
│   Inquiry   │ │  AuditLog   │
├─────────────┤ ├─────────────┤
│ id (PK)     │ │ id (PK)     │
│ name        │ │ action      │
│ email       │ │ actor       │
│ projectType │ │ details     │
│ budget      │ │ userId (FK) │
│ message     │ │ timestamp   │
│ status      │ └─────────────┘
│ userId (FK) │
│ createdAt   │
│ updatedAt   │
└─────────────┘
```

### 1.2 Automated Faker.js Seeding Pipeline (`prisma/seed.ts`)
* **Reset & Migration CLI:** Executed via `npm run db:reset` (`node node_modules/prisma/build/index.js db push --force-reset && node --import tsx prisma/seed.ts`).
* **Deterministic Relational Seeding:**
  * Generates core system roles: `ADMIN`, `MEMBER`, `GUEST`.
  * Bootstraps primary administrator (`Indraneel Samanta` <indraneel@portfolio.dev>).
  * Synthesizes randomized user profiles via `@faker-js/faker` with localized names and valid emails.
  * Connects foreign key relationships: Users mapped to Roles, and Inquiries mapped to Users.
  * Writes corresponding immutable events into `AuditLog` for verification.

---

## 2. Authentication & Edge Middleware Proxy Gates

### 2.1 Role-Based Access Control (RBAC) Flow

```
                      Incoming Client Request
                                 │
                                 ▼
                   ┌───────────────────────────┐
                   │  Next.js Edge Middleware  │
                   │    (src/middleware.ts)    │
                   └─────────────┬─────────────┘
                                 │
                 Matches /admin/* or /api/admin/*?
                                 │
                     ┌───────────┴───────────┐
                  No │                   Yes │
                     ▼                       ▼
            ┌─────────────────┐    Extract Session Token
            │ Allow Request   │    (Cookie or Bearer Header)
            │ (NextResponse)  │              │
            └─────────────────┘      ┌───────┴───────┐
                                     │ Valid Token?  │
                                     └───────┬───────┘
                                       No ┌──┴──┐ Yes
                                          ▼     ▼
                        ┌───────────────────┐  Check User Role
                        │ 401 Unauthorized  │        │
                        │ / Redirect Login  │  ┌─────┴─────┐
                        └───────────────────┘  │ Role ==   │
                                               │ 'ADMIN'?  │
                                               └─────┬─────┘
                                                 No ┌┴┐ Yes
                                                    ▼ ▼
               ┌──────────────────────┐ ┌──────────────────────┐
               │ 403 Forbidden        │ │ Append x-user-role   │
               │ (Clearance Denied)   │ │ Allow Route Handler  │
               └──────────────────────┘ └──────────────────────┘
```

### 2.2 Security Matrix
* **Guest:** Read access to public portfolio showcases and client forms.
* **Member:** Access to submitted inquiries and client dashboard.
* **Admin:** Full clearance to `/api/admin/audit-logs`, schema migrations, and webhook event trails.

---

## 3. Transactional Email Lifecycle (Resend & React Email)

### 3.1 Event Notification Sequence
1. **User Action:** Client submits inquiry form via `InquiryForm.tsx`.
2. **Server Action Mutation:** `submitInquiryAction` validates input with Zod and commits an `Inquiry` row and `AuditLog` row into Prisma.
3. **Template Compilation:** React Email component `InquiryConfirmationEmail.tsx` compiles to HTML.
4. **Resend API Dispatch:** Dispatches transactional email through Resend API.
5. **Webhook Feedback Ingestion:** Resend webhook callbacks (`email.delivered`, `email.bounced`, `email.opened`) hit `/api/webhooks/resend` and write audit records into the database.

### 3.2 Terminal Seeding & Migration Verification Log

```bash
$ npm run db:reset

Prisma schema loaded from prisma\schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

SQLite database dev.db created at file:./dev.db
The SQLite database "dev.db" at "file:./dev.db" was successfully reset.
Your database is now in sync with your Prisma schema. Done in 60ms

✔ Generated Prisma Client (v6.19.3) in 83ms

🌱 Starting automated database seeding via @faker-js/faker...
🧹 Flushed existing records.
✅ Seeded 3 Roles: ADMIN, MEMBER, GUEST
✅ Seeded 9 Users with relational foreign keys
✅ Seeded 12 Relational Inquiries and linked Audit Logs

================ SEEDING COMPLETE ================
📊 Database Summary:
- Roles:       3
- Users:       9
- Inquiries:   12
- Audit Logs:  21
==================================================
```
