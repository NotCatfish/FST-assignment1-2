import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Code2 } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indraneel Samanta | Full-Stack Architecture Portfolio",
  description:
    "Next.js App Router full-stack architecture demonstrating RSC/Client boundaries, Zustand client caching, Zod Server Actions, and Prisma data seeding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full glass-panel border-b border-zinc-200/80 dark:border-zinc-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-bold tracking-tight text-lg text-zinc-900 dark:text-zinc-100 group"
              >
                <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                  <Code2 className="w-5 h-5" />
                </span>
                <span>Indraneel Samanta</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-medium hidden sm:inline-block">
                  FST Showcase
                </span>
              </Link>
              <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
                <Link
                  href="#architecture"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  Architecture
                </Link>
                <Link
                  href="#projects"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="#inquiry"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  Mutate Form
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            FST Coursework: Assignment 1 &amp; 2 • Next.js App Router • Prisma ORM • Zustand • Resend
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
