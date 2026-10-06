import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-[12px] bg-paper px-3 text-sm text-ink shadow-[inset_0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] placeholder:text-faint focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-brand)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
