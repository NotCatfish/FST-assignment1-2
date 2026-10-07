# Project Roadmap: MyPortfolioAssignment (FST Coursework)

## Project Overview
A modern, production-grade Next.js App Router full-stack web application integrating all objectives of Full Stack Technologies (FST) Assignment 1 and Assignment 2.

## Milestone 1: Foundation & Assignment 1 Architecture
- [x] Project scaffolding with Next.js 16 App Router, TypeScript, and Tailwind CSS v4.
- [x] Core dependencies installation (`next-themes`, `zustand`, `zod`, `react-hook-form`, `lucide-react`, `prisma`, `resend`, `@react-email/components`).
- [x] Theme system with `next-themes` (Dark/Light/System) preventing hydration mismatch and layout shift.
- [ ] Accessible UI Component Primitives (Button, Card, Badge, Input, Skeleton, Toast).
- [ ] Decoupled persistent Zustand client store for project filtering and inquiry cart.
- [ ] Type-safe Server Action form mutation with shared Zod validation schema.
- [ ] Assignment 1 Technical Report (RSC vs Client boundary audit, Zustand caching, Lighthouse CWV analysis).

## Milestone 2: Backend, Seeding & Lifecycle (Assignment 2)
- [ ] Normalized relational Prisma schema modeling (`User`, `Role`, `Inquiry`, `AuditLog`) with SQLite.
- [ ] Automated seeding pipeline (`prisma/seed.ts`) leveraging `@faker-js/faker` with foreign key integrity.
- [ ] Automated reset & migration CLI workflow (`npm run db:reset`).
- [ ] Next.js Edge/Middleware authorization pipeline with Role-Based Access Control (Admin, Member, Guest).
- [ ] Transactional lifecycle email dispatch via Resend API and React Email templates.
- [ ] Webhook receiver route handler (`/api/webhooks/resend`) logging delivery/bounces to the database.
- [ ] Assignment 2 System Architecture Note (Data relationship diagrams, auth flows, email dispatch logs).
