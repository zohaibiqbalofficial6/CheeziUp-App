import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Storefront } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { SizeSheet } from "@/components/size-sheet";
import { useCatalog, byCategory } from "@/lib/use-catalog";
import { getCatalog } from "@/lib/api/catalog";
import { CATEGORIES, type Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  loader: () => getCatalog(),
  component: MenuPage,
});

function MenuPage() {
  const loaded = Route.useLoaderData();
  const { products } = useCatalog(loaded);
  const [filter, setFilter] = useState("all");
  const [pizza, setPizza] = useState<Product | null>(null);
  const groups = useMemo(() => {
    const visible = CATEGORIES.filter((category) =>
      filter === "all" ? true : category.slug === filter,
    );
    return visible
      .map((category) => ({ ...category, items: byCategory(products, category.slug) }))
      .filter((group) => group.items.length > 0);
  }, [products, filter]);

  return (
    <Storefront>
      <div className="space-y-5">
        <header>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">The board</p>
          <h1 className="font-display text-4xl tracking-wide">Full menu</h1>
        </header>
        <div className="sticky top-[72px] z-30 -mx-4 bg-bg/95 px-4 py-2 backdrop-blur-md">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={filter === "all"} onClick={() => setFilter("all")}>
              All
            </Chip>
            {CATEGORIES.map((category) => (
              <Chip
                key={category.slug}
                active={filter === category.slug}
                onClick={() => setFilter(category.slug)}
              >
                {category.label}
              </Chip>
            ))}
          </div>
        </div>
        {groups.map((group) => (
          <section key={group.slug} className="space-y-3">
            <div>
              <h2 className="font-display text-2xl tracking-wide">{group.label}</h2>
              <p className="text-sm text-muted">{group.blurb}</p>
            </div>
            <div className="grid gap-3">
              {group.items.map((product) => (
                <ProductCard key={product.id} product={product} onConfigure={setPizza} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <SizeSheet product={pizza} open={!!pizza} onOpenChange={(open) => { if (!open) setPizza(null); }} />
    </Storefront>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-10 shrink-0 rounded-full px-3.5 text-sm font-semibold",
        active ? "bg-brand text-paper" : "bg-paper text-muted shadow-[inset_0_0_0_1px_var(--color-line)]",
      )}
    >
      {children}
    </button>
  );
}
