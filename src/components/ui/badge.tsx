import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "brand",
  ...props
}: React.ComponentProps<"span"> & { tone?: "brand" | "ink" | "soft" | "wa" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        tone === "brand" && "bg-brand text-paper",
        tone === "ink" && "bg-ink text-paper",
        tone === "soft" && "bg-brand-soft text-brand-dark",
        tone === "wa" && "bg-wa/15 text-wa",
        className,
      )}
      {...props}
    />
  );
}
