import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border bg-white/80 dark:bg-zinc-900/80 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 shadow-xs transition-colors",
          "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500",
          error
            ? "border-red-500 focus-visible:ring-red-500/50"
            : "border-zinc-300 dark:border-zinc-700",
          "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
