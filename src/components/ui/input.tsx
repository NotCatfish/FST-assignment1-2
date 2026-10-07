import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-white/80 dark:bg-zinc-900/80 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 shadow-xs transition-colors",
          "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500",
          error
            ? "border-red-500 focus-visible:ring-red-500/50"
            : "border-zinc-300 dark:border-zinc-700",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
