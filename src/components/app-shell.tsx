import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, MapPin, ShoppingBag, Tag, UtensilsCrossed } from "lucide-react";
import { cartCount, useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import type { RestaurantSettings } from "@/lib/types";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/deals", label: "Deals", icon: Tag },
  { to: "/visit", label: "Visit", icon: MapPin },
  { to: "/checkout", label: "Bag", icon: ShoppingBag },
] as const;

export function AppShell({
  children,
  settings,
}: {
  children: ReactNode;
  settings: RestaurantSettings;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = useCart((s) => s.items);
  const member = useCart((s) => s.member);
  const setMember = useCart((s) => s.setMember);
  const count = cartCount(items);

  return (
    <div className="paper-noise min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label={settings.name}>
            <img src="/logo.png" alt="" className="size-11 rounded-full bg-paper object-cover" />
            <div className="min-w-0">
              <p className="truncate font-display text-lg tracking-wide text-brand">CHEEZIUP PIZZA</p>
              <p className="truncate text-xs font-semibold tracking-[0.14em] text-muted">
                FAST FOOD • LAHORE
              </p>
            </div>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setMember(!member)}
              className={cn(
                "h-10 rounded-full px-3 text-xs font-semibold tracking-wide",
                member ? "bg-brand text-paper" : "bg-paper text-muted shadow-[inset_0_0_0_1px_var(--color-line)]",
              )}
            >
              {member ? "Member on" : "Member"}
            </button>
            <Link
              to="/checkout"
              className="relative inline-flex size-11 items-center justify-center rounded-[14px] bg-ink text-paper"
              aria-label="Open bag"
            >
              <ShoppingBag className="size-4" />
              <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-paper">
                {count}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 pb-[calc(92px+env(safe-area-inset-bottom))] pt-4">
        {children}
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <div className="mx-auto grid max-w-5xl grid-cols-5 px-2 py-1.5">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-[14px] text-[11px] font-semibold",
                  active ? "text-brand" : "text-muted",
                )}
              >
                <span className="relative">
                  <Icon className="size-5" />
                  {item.to === "/checkout" && count > 0 ? (
                    <span className="absolute -top-1.5 -right-2 size-2 rounded-full bg-brand" />
                  ) : null}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
