import type { ComponentProps } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "flex gap-1 overflow-x-auto rounded-[16px] bg-bg p-1 shadow-[inset_0_0_0_1px_var(--color-line)]",
      className,
    )}
    {...props}
  />
);
export const TabsTrigger = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex h-10 shrink-0 items-center justify-center rounded-[12px] px-3 text-sm font-semibold text-muted transition-colors data-[state=active]:bg-paper data-[state=active]:text-ink data-[state=active]:shadow-[var(--shadow-card)]",
      className,
    )}
    {...props}
  />
);
export const TabsContent = TabsPrimitive.Content;
