# AI Handoff Protocol & Context Snapshot

## Project Identity
- **Project Name:** `myportfolioassignment`
- **Location:** `C:\Users\lenovo\Desktop\01_Personal_&_Web_Projects\myportfolioassignment`
- **Purpose:** Full-Stack Portfolio Application fulfilling FST Coursework (Assignment 1 & Assignment 2).
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- **ORM / Database:** Prisma ORM 6.19.3 with SQLite (`prisma/dev.db`).

## Completed Architecture & Features
1. **Assignment 1:**
   - Theme Provider (`next-themes`) & Accessible `ThemeToggle.tsx` (Light/Dark/System, zero CLS).
   - Radix/shadcn-style UI primitives (`src/components/ui/`).
   - Centralized persistent Zustand client store (`src/store/usePortfolioStore.ts`).
   - Type-safe Server Action form mutation (`src/app/actions/submitInquiry.ts`) with shared Zod schema (`src/lib/validations/inquiry.ts`).
   - Technical Report deliverable: `docs/ASSIGNMENT_1_REPORT.md`.

2. **Assignment 2:**
   - Relational multi-entity schema: `Role`, `User`, `Inquiry`, `AuditLog` in `prisma/schema.prisma`.
   - Automated seeding pipeline: `prisma/seed.ts` via `@faker-js/faker`.
   - CLI commands configured: `npm run db:reset`, `npm run db:push`, `npm run db:seed`, `npm run db:studio`.
   - Edge RBAC middleware: `src/middleware.ts` gating `/admin/*` and `/api/admin/*`.
   - Transactional email dispatch: `src/emails/InquiryConfirmationEmail.tsx` (@react-email/components) + `src/lib/email.ts` (Resend API).
   - Resend Webhook ingestion endpoint: `src/app/api/webhooks/resend/route.ts`.
   - System Architecture Note deliverable: `docs/ASSIGNMENT_2_ARCHITECTURE.md`.

## Active Commands
- Start dev server: `npm run dev` (or `node node_modules/next/dist/bin/next dev` to avoid Windows CMD path ampersand issue)
- Reset & seed database: `npm run db:reset`
- Inspect database in browser: `npm run db:studio`
