import * as React from "react";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { InquiryForm } from "@/components/InquiryForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  ArrowRight,
  GitBranch,
  Terminal,
  Server,
  Code2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
          <Zap className="w-3.5 h-3.5" />
          <span>Next.js App Router • FST Coursework Integration</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          Modern Full-Stack Architecture &amp; Component System
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Engineered to satisfy all criteria for Full Stack Technologies Assignment 1
          (Accessible Primitives, Zustand Persistent State, Zod Server Actions) and
          Assignment 2 (Prisma Relational Modeling, Faker Seeding, RBAC Gates).
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            Explore Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#inquiry"
            className="px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium text-sm transition-all text-zinc-800 dark:text-zinc-200"
          >
            Test Server Action
          </a>
        </div>
      </section>

      {/* Assignment 1 Part A: Hydration & RSC Boundary Audit */}
      <section id="architecture" className="space-y-6 scroll-mt-20">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Badge variant="accent" className="mb-2">Assignment 1 — Part A</Badge>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            React Server Component (RSC) vs. Client Hydration Boundary
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Audit and architectural demonstration of how props serialize across the hydration boundary without Cumulative Layout Shift (CLS).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:border-indigo-500/40">
            <CardHeader>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit mb-2">
                <Server className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">Server Components (RSC)</CardTitle>
              <CardDescription>
                Executed strictly on the server during request time. Zero JavaScript shipped to the client bundle.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-2 text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div>• `src/app/layout.tsx`</div>
              <div>• `src/app/page.tsx`</div>
              <div>• Server Actions (`submitInquiry.ts`)</div>
              <div>• Zero hydration cost</div>
            </CardContent>
          </Card>

          <Card className="hover:border-indigo-500/40">
            <CardHeader>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit mb-2">
                <Cpu className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">Client Hydration Boundary</CardTitle>
              <CardDescription>
                Isolated interactive leaves marked with `'use client'`, mounted with persistent hydration guards.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-2 text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div>• `ThemeToggle.tsx` (next-themes)</div>
              <div>• `ProjectShowcase.tsx` (Zustand)</div>
              <div>• `InquiryForm.tsx` (react-hook-form)</div>
              <div>• Mounted check prevents CLS</div>
            </CardContent>
          </Card>

          <Card className="hover:border-indigo-500/40">
            <CardHeader>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit mb-2">
                <Database className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">Prisma &amp; Data Pipeline</CardTitle>
              <CardDescription>
                Relational multi-entity modeling backed by SQLite/PostgreSQL with programmatic Faker seeding.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-2 text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div>• Entities: User, Role, Inquiry, AuditLog</div>
              <div>• CLI: `npm run db:reset`</div>
              <div>• Faker.js deterministic seeds</div>
              <div>• Foreign-key integrity enforced</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Assignment 1 Part B: Zustand Store Demonstration */}
      <section id="projects" className="space-y-6 scroll-mt-20">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Badge variant="accent" className="mb-2">Assignment 1 — Part B</Badge>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Persistent Client State Management (Zustand)
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Centralized client store isolating filter queries and persistent pinned projects with local storage sync.
          </p>
        </div>

        <ProjectShowcase />
      </section>

      {/* Assignment 1 Part C: Server Action Form */}
      <section id="inquiry" className="space-y-6 scroll-mt-20">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 text-center">
          <Badge variant="accent" className="mb-2">Assignment 1 — Part C</Badge>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            End-to-End Type-Safe Server Action Form Mutation
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl mx-auto">
            Interactive form powered by `react-hook-form` and shared Zod schemas executed seamlessly inside a Next.js Server Action (`'use server'`).
          </p>
        </div>

        <InquiryForm />
      </section>
    </div>
  );
}
