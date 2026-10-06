import * as React from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
      {children}
    </Drawer.Root>
  );
}

export const SheetTrigger = Drawer.Trigger;

export function SheetContent({
  className,
  children,
  title,
}: {
  className?: string;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/40" />
      <Drawer.Content
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[92vh] flex-col rounded-t-[28px] bg-paper outline-none",
          className,
        )}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-line" />
        {title ? (
          <Drawer.Title className="px-5 pt-4 font-display text-2xl tracking-wide text-ink">
            {title}
          </Drawer.Title>
        ) : (
          <Drawer.Title className="sr-only">Sheet</Drawer.Title>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-3">
          {children}
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
}
