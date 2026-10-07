import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Storefront } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { SizeSheet } from "@/components/size-sheet";
import { useCatalog, byHomeFilter } from "@/lib/use-catalog";
import { getCatalog } from "@/lib/api/catalog";
import { getSettings } from "@/lib/api/orders";
import { HOME_FILTERS, DEFAULT_SETTINGS, productPrice, type Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { cn, formatPkr } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, settings] = await Promise.all([getCatalog(), getSettings()]);
    return { products, settings };
  },
  component: Home,
});

function Home() {
  const loaded = Route.useLoaderData();
  const { products } = useCatalog(loaded.products);
  const settingsQuery = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
    initialData: loaded.settings,
  });
  const settings = settingsQuery.data ?? DEFAULT_SETTINGS;
  const featured = products.filter((item) => item.featured).slice(0, 8);
  const [filter, setFilter] = useState("all");
  const [pizza, setPizza] = useState<Product | null>(null);
  const visible = useMemo(() => byHomeFilter(products, filter), [products, filter]);
  const add = useCart((s) => s.add);
  const member = useCart((s) => s.member);

  return (
    <Storefront>
      <div className="stagger-in space-y-5">
        <section>
          <h1 className="font-display text-4xl leading-none tracking-wide text-brand">
            Cheeziup Pizza
          </h1>
          <p className="mt-1 font-display text-3xl leading-none tracking-wide text-ink">Order in Lahore</p>
          <p className="mt-3 max-w-xl text-sm text-muted">{settings.tagline}</p>
        </section>

        {featured.length > 0 ? (
          <section className="flex snap-x gap-3 overflow-x-auto pb-1">
            {featured.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  add({
                    key: `p-${product.id}`,
                    productId: product.id,
                    name: product.name,
                    unitPrice: productPrice(product, member),
                    included: product.included ?? undefined,
                  });
                  toast.success(`${product.badge ?? product.name} added`);
                }}
                className="w-[min(58vw,220px)] shrink-0 snap-start rounded-[20px] bg-paper p-3 text-left shadow-[var(--shadow-card)]"
              >
                <p className="font-display text-lg tracking-wide">{product.badge ?? product.name}</p>
                <p className="mt-1 font-display text-xl tabular-nums tracking-wide text-brand">
                  {formatPkr(productPrice(product, member))}
                </p>
                <p className="mt-1 line-clamp-3 text-xs leading-5 text-muted">{product.included}</p>
              </button>
            ))}
          </section>
        ) : null}

        <div className="sticky top-[72px] z-30 -mx-4 bg-bg/95 px-4 py-2 backdrop-blur-md">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {HOME_FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "h-10 shrink-0 rounded-full px-3.5 text-sm font-semibold",
                  filter === item.id
                    ? "bg-brand text-paper"
                    : "bg-paper text-muted shadow-[inset_0_0_0_1px_var(--color-line)]",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <section className="grid gap-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} onConfigure={setPizza} />
          ))}
        </section>
      </div>
      <SizeSheet product={pizza} open={!!pizza} onOpenChange={(open) => { if (!open) setPizza(null); }} />
    </Storefront>
  );
}
