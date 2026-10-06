import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Storefront } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { SizeSheet } from "@/components/size-sheet";
import { useCatalog, byCategory } from "@/lib/use-catalog";
import { getCatalog } from "@/lib/api/catalog";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/deals")({
  loader: () => getCatalog(),
  component: DealsPage,
});

const GROUPS = [
  { slug: "student", title: "Student takeaway", note: "Built for sharing after class" },
  { slug: "hot", title: "Hot deals", note: "Unlock with member card" },
  { slug: "two-pizza", title: "Two pizza deals", note: "Members, with drinks" },
  { slug: "party", title: "Party & birthday", note: "Pizzas, burgers, cake, drinks" },
];

function DealsPage() {
  const loaded = Route.useLoaderData();
  const { products } = useCatalog(loaded);
  const member = useCart((s) => s.member);
  const [pizza, setPizza] = useState<Product | null>(null);

  return (
    <Storefront>
      <div className="space-y-6">
        <header>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Offers</p>
          <h1 className="font-display text-4xl tracking-wide">Deals</h1>
          <p className="mt-1 text-sm text-muted">
            {member
              ? "Member prices and locked combos are visible."
              : "Turn on Member in the header to see card-only deals."}
          </p>
        </header>
        {GROUPS.map((group) => {
          const items = byCategory(products, group.slug);
          if (items.length === 0) return null;
          return (
            <section key={group.slug} className="space-y-3">
              <div>
                <h2 className="font-display text-2xl tracking-wide">{group.title}</h2>
                <p className="text-sm text-muted">{group.note}</p>
              </div>
              <div className="grid gap-3">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} onConfigure={setPizza} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <SizeSheet product={pizza} open={!!pizza} onOpenChange={(open) => { if (!open) setPizza(null); }} />
    </Storefront>
  );
}
