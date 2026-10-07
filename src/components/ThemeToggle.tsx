"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by waiting until component is mounted on client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render static placeholder with identical dimensions to prevent layout shift (CLS: 0)
    return (
      <div
        className="w-28 h-9 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse border border-zinc-200 dark:border-zinc-800"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme selector"
      className="flex items-center gap-1 p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        aria-pressed={theme === "light"}
        className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          theme === "light"
            ? "bg-white text-amber-500 shadow-xs"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
        title="Switch to Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        aria-pressed={theme === "dark"}
        className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          theme === "dark"
            ? "bg-zinc-800 text-indigo-400 shadow-xs"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
        title="Switch to Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="System theme"
        aria-pressed={theme === "system"}
        className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          theme === "system"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
        title="Use System preference"
      >
        <Laptop className="w-4 h-4" />
      </button>
    </div>
  );
}
