# AGENTS.md — System & Architectural Guidelines

This file provides architectural guidelines and operational instructions for AI coding agents inspecting, testing, or maintaining the `myportfolioassignment` codebase.

---

## 1. Project Technology Stack & Boundaries
* **Framework:** Next.js 16.4.0 (App Router) + React 19.3.0 + TypeScript 5.
* **Styling:** Tailwind CSS v4 with `@custom-variant dark (&:where(.dark, .dark *))` in `src/app/globals.css`.
* **State Management:** Zustand 5 (`src/store/usePortfolioStore.ts`) with `persist` middleware for pinned items.
* **Form Validation:** `react-hook-form` coupled with `@hookform/resolvers/zod` and shared Zod schemas in `src/lib/validations/inquiry.ts`.
* **Server Mutations:** Native Next.js Server Actions (`'use server'`) in `src/app/actions/submitInquiry.ts`.
* **ORM & Database:** Prisma ORM 6.19.3 configured with SQLite (`prisma/schema.prisma`).
* **Edge Proxy:** Next.js Proxy in `src/proxy.ts` enforcing session RBAC on `/admin/*` and `/api/admin/*`.

---

## 2. Critical Operational Directives for Agents

### 2.1 Execution & Build Rules
* **Bypass Windows Batch Path Escaping:** Because the parent directory path may contain special characters like `&`, always invoke the local Next.js CLI directly via Node when running scripts:
  ```bash
  node node_modules/next/dist/bin/next build
  node node_modules/next/dist/bin/next dev
  ```
* **Database Reset & Seeding:** Never manually delete the SQLite database file without running the automated seeding pipeline:
  ```bash
  npm run db:reset
  ```
  This command resets `prisma/dev.db` and triggers `prisma/seed.ts` via `@faker-js/faker` to maintain foreign-key relational integrity across `Role`, `User`, `Inquiry`, and `AuditLog`.

### 2.2 Hydration & Styling Guardrails
* **Zero CLS Requirement:** Never read browser-only APIs (`localStorage`, `window`) during initial server render. Components utilizing client-side persistent storage must implement the mounted guard pattern (`const [mounted, setMounted] = useState(false)`) with dimension-stable skeletons.
* **Theme Enforcement:** Dark mode classes must strictly obey the `.dark` class attribute managed by `next-themes`.

---

## 3. Deliverable Verification Checklist
Agents performing validation or grading must verify the following artifacts:
1. `docs/ASSIGNMENT_1_REPORT.md` — 2–3 page technical analysis of RSC vs Client boundaries, Zustand caching, and Lighthouse Core Web Vitals.
2. `docs/ASSIGNMENT_2_ARCHITECTURE.md` — 2-page system architecture note documenting data relationships, authorization flows, and seed execution logs.
3. `prisma/schema.prisma` & `prisma/seed.ts` — Verified multi-entity relational schema with automated faker data ingestion.
4. `src/proxy.ts` & `src/app/api/admin/audit-logs/route.ts` — Edge middleware RBAC security.
