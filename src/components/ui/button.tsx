import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-sm font-semibold transition-[transform,background-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand text-paper shadow-[0_8px_18px_-10px_rgb(180,35,24,0.8)] hover:bg-brand-dark",
        secondary: "bg-ink text-paper hover:bg-ink/90",
        outline: "bg-paper text-ink shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface",
        ghost: "text-ink hover:bg-brand-soft/60",
        whatsapp: "bg-wa text-wa-fg hover:bg-wa/90",
        soft: "bg-brand-soft text-brand-dark hover:bg-brand-soft/80",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 rounded-[10px] px-3 text-xs",
        lg: "h-12 px-5 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
