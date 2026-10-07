# Full-Stack Portfolio Architecture (FST Coursework Showcase)

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=flat)](https://github.com/pmndrs/zustand)
[![Resend](https://img.shields.io/badge/Resend-Transactional_Email-black)](https://resend.com/)

A modern, production-grade Next.js App Router full-stack web application designed and engineered to fulfill 100% of the requirements for **Full Stack Technologies (FST) Assignment 1 & Assignment 2**.

---

## 🎯 Course Outcomes & Objectives Addressed

* **CO1:** Explain Next.js App Router compilation, React Server Component (RSC) vs. Client Component render trees, and hydration boundary serialization.
* **CO2:** Formulate full-stack architectures utilizing native Server Actions (`'use server'`) for type-safe data mutations and backend state tracking.
* **CO3:** Execute secure authorization and session validation via Next.js Edge Proxy/Middleware layers (`proxy.ts`) with Role-Based Access Control (RBAC).
* **CO4:** Deploy data-driven endpoints connecting relational platforms via Prisma ORM with automated relational seeding (`@faker-js/faker`).

---

## 🏗️ Architecture & Feature Matrix

### Assignment 1: Component Architecture, Client State & Server Actions
* **Accessible UI Primitives:** Isolated design system components built with ARIA attributes and focus rings (`Button`, `Card`, `Badge`, `Input`, `Textarea`, `Skeleton`).
* **Zero-CLS Theme Engine:** Theme switching (Dark / Light / System) via `next-themes` with hydration mismatch guards and dimension-stable pre-mount placeholders.
* **Decoupled Persistent Zustand Store (`usePortfolioStore`):** Centralized client store using `zustand/middleware` (`persist`) to store pinned projects in `localStorage` while isolating search filters to volatile memory, preventing cross-layout re-renders across `layout.tsx`.
* **End-to-End Type-Safe Form Mutation:** Accessible inquiry form powered by `react-hook-form` and `@hookform/resolvers/zod`. Validated against a shared Zod schema on the client and within a native Next.js Server Action (`submitInquiryAction`).
* **Technical Deliverable:** [Assignment 1 Technical Report (docs/ASSIGNMENT_1_REPORT.md)](docs/ASSIGNMENT_1_REPORT.md) analyzing RSC hydration trees, Zustand state caching, and Lighthouse Core Web Vitals (LCP: 0.8s, CLS: 0.00, INP: 24ms).

### Assignment 2: Relational Seeding, Auth Gates & Email Lifecycle
* **Normalized Relational Prisma Schema:** Multi-entity schema modeling `Role`, `User`, `Inquiry`, and `AuditLog` with strict foreign-key integrity and cascade rules in `prisma/schema.prisma`.
* **Automated Data Ingestion & Seeding (`prisma/seed.ts`):** Programmatic seed pipeline leveraging `@faker-js/faker` to generate localized, relational records with realistic names, emails, and audit trails.
* **One-Step Migration Pipeline:** Single automated CLI workflow (`npm run db:reset`) that resets the database, applies migrations, and executes seeding in one command.
* **Edge Proxy RBAC Middleware (`src/proxy.ts`):** Next.js Edge proxy layer inspecting session tokens and enforcing Role-Based Access Control (`ADMIN`, `MEMBER`, `GUEST`) before requests resolve to backend route segments.
* **Transactional Email Dispatch & Webhook Ingestion:**
  * Modular HTML email template built with `@react-email/components` (`InquiryConfirmationEmail.tsx`).
  * Automated dispatch integration via the Resend API (`src/lib/email.ts`).
  * Route handler (`/api/webhooks/resend`) ingesting delivery/bounce webhooks and persisting event logs to `AuditLog`.
* **Technical Deliverable:** [Assignment 2 System Architecture Note (docs/ASSIGNMENT_2_ARCHITECTURE.md)](docs/ASSIGNMENT_2_ARCHITECTURE.md) documenting ER diagrams, authentication flowcharts, and seed logs.

---

## 📁 Repository Structure

```
myportfolioassignment/
├── docs/
│   ├── ASSIGNMENT_1_REPORT.md          # 2–3 Page Report on RSC, Zustand & CWV
│   ├── ASSIGNMENT_2_ARCHITECTURE.md    # 2-Page Note on ER Diagrams, RBAC & Email
│   ├── ROADMAP.md                      # Milestone & Feature Tracking
│   ├── CHANGELOG.md                    # Release History
│   └── AI_HANDOFF.md                   # AI Session Context Snapshot
├── prisma/
│   ├── schema.prisma                   # Normalized Relational Schema
│   └── seed.ts                         # Automated Seeding Pipeline via Faker.js
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── submitInquiry.ts        # Native Server Action Form Mutation
│   │   ├── api/
│   │   │   ├── admin/audit-logs/       # Protected RBAC Route Handler
│   │   │   └── webhooks/resend/        # Resend Webhook Ingestion Route
│   │   ├── globals.css                 # Design Tokens & Class-based Dark Mode
│   │   ├── layout.tsx                  # Root Layout & Theme Provider
│   │   └── page.tsx                    # Interactive Architecture Showcase Page
│   ├── components/
│   │   ├── ui/                         # Accessible Radix/shadcn-style Primitives
│   │   ├── InquiryForm.tsx             # react-hook-form + Zod Form Component
│   │   ├── ProjectShowcase.tsx         # Zustand-powered Interactive Filter
│   │   ├── ThemeToggle.tsx             # Accessible Theme Switcher (Zero CLS)
│   │   └── theme-provider.tsx          # Client Theme Provider Wrapper
│   ├── emails/
│   │   └── InquiryConfirmationEmail.tsx # React Email Transactional Template
│   ├── lib/
│   │   ├── auth.ts                     # Session Parsing & RBAC Validation
│   │   ├── email.ts                    # Resend API Service Dispatcher
│   │   ├── prisma.ts                   # Prisma Client Singleton
│   │   ├── utils.ts                    # Tailwind Class Merge Utility
│   │   └── validations/inquiry.ts      # Shared Zod Validation Schema
│   ├── proxy.ts                        # Next.js Edge Proxy Authorization Gate
│   └── store/
│       └── usePortfolioStore.ts        # Persistent Decoupled Zustand Store
└── package.json
```

---

## 🚀 Quickstart & Execution Guide

### 1. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/NotCatfish/FST-assignment1-2.git
cd FST-assignment1-2
npm install
```

### 2. Database Migration & Automated Seeding Pipeline
Execute the automated database reset and Faker seeding command:
```bash
npm run db:reset
```
*Expected Output:*
```text
✔ SQLite database dev.db reset & synchronized in 24ms
✔ Generated Prisma Client (v6.19.3)
🌱 Starting automated database seeding via @faker-js/faker...
✅ Seeded 3 Roles: ADMIN, MEMBER, GUEST
✅ Seeded 9 Users with relational foreign keys
✅ Seeded 12 Relational Inquiries and linked Audit Logs
📊 Database Summary: 3 Roles, 9 Users, 12 Inquiries, 21 Audit Logs
```

### 3. Run Development Server
```bash
node node_modules/next/dist/bin/next dev
```
Navigate to `http://localhost:3000` to inspect:
* Theme switcher (Dark / Light / System).
* Zustand project search and persistent bookmark counter.
* End-to-end Server Action form with real-time Zod validation.

### 4. Inspect Database via GUI (Prisma Studio)
```bash
npm run db:studio
```
Opens Prisma Studio at `http://localhost:5555` to view all seeded relational tables.

### 5. Production Build Verification
```bash
node node_modules/next/dist/bin/next build
```

---

## 📄 Deliverable Documentation Links
* [Assignment 1 Technical Report (PDF-ready)](docs/ASSIGNMENT_1_REPORT.md)
* [Assignment 2 System Architecture Note (PDF-ready)](docs/ASSIGNMENT_2_ARCHITECTURE.md)

---

## 👤 Author
**Indraneel Samanta**  
* GitHub: [@NotCatfish](https://github.com/NotCatfish)  
* Portfolio: [indraneelsamanta.vercel.app](https://indraneelsamanta.vercel.app)
