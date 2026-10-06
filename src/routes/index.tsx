import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bike, Phone, Smartphone } from "lucide-react";
import { useState } from "react";
import { Storefront } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { SizeSheet } from "@/components/size-sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCatalog } from "@/lib/use-catalog";
import { getCatalog } from "@/lib/api/catalog";
import { getSettings } from "@/lib/api/orders";
import { DEFAULT_SETTINGS, type Product } from "@/lib/types";
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
  const [pizza, setPizza] = useState<Product | null>(null);

  return (
    <Storefront>
      <div className="stagger-in space-y-6">
        <section className="hero-wash overflow-hidden rounded-[32px] px-5 py-7 text-paper shadow-[var(--shadow-card)]">
          <div className="flex items-start gap-4">
            <img
              src="/logo.png"
              alt="Cheeziup Pizza"
              className="size-24 shrink-0 rounded-full bg-paper object-cover shadow-[0_12px_30px_-12px_rgb(0,0,0,0.45)]"
            />
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-paper/70">LAHORE FAST FOOD</p>
              <h1 className="mt-1 font-display text-4xl leading-none tracking-wide">
                Cheeziup
                <span className="block text-2xl text-paper/85">Pizza & Fast Food</span>
              </h1>
              <p className="mt-3 max-w-md text-sm text-paper/80">{settings.tagline}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link to="/menu">
                Order now <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-0 bg-paper/12 text-paper hover:bg-paper/20">
              <a href={`tel:${settings.phones[0]}`}>
                <Phone className="size-4" /> Call
              </a>
            </Button>
          </div>
        </section>

        <section className="rounded-[24px] bg-paper px-4 py-4 shadow-[var(--shadow-card)]">
          <p className="text-sm text-muted">{settings.announcement}</p>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Oven hours", value: settings.hours },
            { label: "Delivery", value: "Members free" },
            { label: "Range", value: "Up to 13 km" },
            { label: "Checkout", value: "WhatsApp" },
          ].map((item) => (
            <div key={item.label} className="rounded-[20px] bg-paper px-3 py-3 shadow-[var(--shadow-card)]">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{item.label}</p>
              <p className="mt-1 font-display text-lg leading-tight tracking-wide">{item.value}</p>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl tracking-wide">Tonight’s combos</h2>
              <p className="text-sm text-muted">Student takeaway packages from the board</p>
            </div>
            <Link to="/deals" className="text-sm font-semibold text-brand">
              All deals
            </Link>
          </div>
          <div className="flex snap-x gap-3 overflow-x-auto pb-2">
            {featured.map((product) => (
              <div key={product.id} className="w-[min(86vw,340px)] shrink-0 snap-start">
                <ProductCard product={product} onConfigure={setPizza} />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <Link to="/menu" className="overflow-hidden rounded-[28px] bg-paper shadow-[var(--shadow-card)]">
            <div className="aspect-[5/3]">
              <img src="/food/pizza.jpg" alt="" className="food-photo h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <h3 className="font-display text-2xl tracking-wide">Build a pizza</h3>
                <p className="text-sm text-muted">Small to family · 18 flavours</p>
              </div>
              <Badge>Menu</Badge>
            </div>
          </Link>
          <Link to="/deals" className="overflow-hidden rounded-[28px] bg-paper shadow-[var(--shadow-card)]">
            <div className="aspect-[5/3]">
              <img src="/food/burger.jpg" alt="" className="food-photo h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <h3 className="font-display text-2xl tracking-wide">Burgers & rolls</h3>
                <p className="text-sm text-muted">Zinger, shawarma, paratha</p>
              </div>
              <Badge tone="ink">Fast</Badge>
            </div>
          </Link>
        </section>

        <section className="rounded-[28px] bg-ink px-5 py-5 text-paper">
          <div className="flex items-start gap-3">
            <Bike className="mt-1 size-5 text-brand-soft" />
            <div>
              <h2 className="font-display text-2xl tracking-wide">How to get the app</h2>
              <p className="mt-1 text-sm text-paper/75">
                Add Cheeziup to your iPhone or Android home screen. Same menu, one tap ordering, no store download needed.
              </p>
              <Button asChild className="mt-4" variant="soft">
                <Link to="/install">
                  <Smartphone className="size-4" /> Save to phone
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <SizeSheet product={pizza} open={!!pizza} onOpenChange={(open) => { if (!open) setPizza(null); }} />
    </Storefront>
  );
}
