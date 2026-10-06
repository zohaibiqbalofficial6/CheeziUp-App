import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-[12px] bg-paper px-3 py-2.5 text-sm text-ink shadow-[inset_0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] placeholder:text-faint focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-brand)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
