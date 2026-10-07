# Changelog

All notable changes to `myportfolioassignment` are documented in this file.

## [1.0.0] - 2026-10-07
### Completed Milestones (FST Assignment 1 & 2)
- **App Router Scaffolding:** Initialized Next.js 16 App Router workspace with TypeScript, Tailwind CSS v4, and ESLint.
- **Accessible Primitives & Theme Engine:** Integrated `next-themes` (Dark/Light/System) with zero CLS hydration guards and Radix-style UI primitives (`Button`, `Card`, `Badge`, `Input`, `Textarea`, `Skeleton`).
- **Persistent Zustand Client Store:** Implemented `usePortfolioStore` with persistent bookmark slices (`localStorage`) and volatile filter search slices isolating render trees from `layout.tsx`.
- **End-to-End Type-Safe Server Actions:** Created shared Zod validation schema (`inquirySchema`), native Next.js Server Action (`submitInquiryAction`), and accessible form with `react-hook-form`.
- **Prisma Relational Database Pipeline:** Modeled normalized entities (`Role`, `User`, `Inquiry`, `AuditLog`) in `prisma/schema.prisma` backed by SQLite.
- **Automated Faker Seeding CLI:** Created `prisma/seed.ts` populating foreign-key relational records via `@faker-js/faker`, wired to `npm run db:reset`.
- **Edge Middleware RBAC Security:** Created Next.js edge `middleware.ts` gating `/admin/*` and `/api/admin/*` endpoints by role (ADMIN, MEMBER, GUEST).
- **Transactional Email Dispatch & Webhooks:** Developed `InquiryConfirmationEmail.tsx` via `@react-email/components`, Resend API service, and `/api/webhooks/resend` logging delivery events to Prisma `AuditLog`.
- **Documentation Deliverables:**
  - `docs/ASSIGNMENT_1_REPORT.md` (RSC vs Client, Zustand caching, Lighthouse CWV metrics).
  - `docs/ASSIGNMENT_2_ARCHITECTURE.md` (Relational modeling ER diagrams, RBAC auth flows, seed logs).
