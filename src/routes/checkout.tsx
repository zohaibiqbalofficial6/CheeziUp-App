import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Storefront } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cartCount, cartTotal, useCart, useCartHydrated } from "@/lib/cart-store";
import { getSettings, placeOrder } from "@/lib/api/orders";
import { DEFAULT_SETTINGS } from "@/lib/types";
import { cn, formatPkr } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const member = useCart((s) => s.member);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);
  const hydrated = useCartHydrated();
  const settingsQuery = useQuery({ queryKey: ["settings"], queryFn: () => getSettings() });
  const settings = settingsQuery.data ?? DEFAULT_SETTINGS;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [done, setDone] = useState<{ code: string; waUrl: string; total: number } | null>(null);

  const order = useMutation({
    mutationFn: () =>
      placeOrder({
        data: { name, phone, address, notes, fulfillment, member, items },
      }),
    onSuccess: (result) => {
      clear();
      setDone(result);
      openWhatsApp(result.waUrl);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function submit() {
    if (name.trim().length < 2) {
      toast.error("Please add your name.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Please add a valid phone number.");
      return;
    }
    if (fulfillment === "delivery" && address.trim().length < 6) {
      toast.error("Please add a delivery address.");
      return;
    }
    order.mutate();
  }

  if (done) {
    return (
      <Storefront>
        <div className="mx-auto max-w-md rounded-[28px] bg-paper px-5 py-8 text-center shadow-[var(--shadow-card)]">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Order ready</p>
          <h1 className="mt-2 font-display text-4xl tracking-wide">{done.code}</h1>
          <p className="mt-2 text-sm text-muted">
            WhatsApp is opening with your ticket for {formatPkr(done.total)}. Tap Send in WhatsApp so the shop receives it.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Button asChild variant="whatsapp" size="lg">
              <a id="cheeziup-wa" href={done.waUrl} target="_blank" rel="noreferrer">
                Send on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/menu">Order again</Link>
            </Button>
          </div>
        </div>
      </Storefront>
    );
  }

  return (
    <Storefront>
      <div className="space-y-5">
        <header>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Bag</p>
          <h1 className="font-display text-4xl tracking-wide">Checkout</h1>
        </header>
        {!hydrated ? (
          <div className="rounded-[28px] bg-paper px-5 py-10 text-center shadow-[var(--shadow-card)]">
            <p className="text-sm text-muted">Loading bag…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[28px] bg-paper px-5 py-10 text-center shadow-[var(--shadow-card)]">
            <p className="font-display text-2xl tracking-wide">Bag is empty</p>
            <p className="mt-1 text-sm text-muted">Add a pizza, deal, or burger first.</p>
            <Button asChild className="mt-4">
              <Link to="/">Browse menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <section className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-3 rounded-[20px] bg-paper p-3 shadow-[var(--shadow-card)]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{item.name}</p>
                    {item.sizeLabel ? <p className="text-xs text-muted">{item.sizeLabel}</p> : null}
                    <p className="mt-1 text-sm font-semibold tabular-nums text-brand">
                      {formatPkr(item.unitPrice * item.qty)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-[12px] bg-bg p-0.5">
                    <button
                      className="inline-flex size-9 items-center justify-center"
                      onClick={() => setQty(item.key, item.qty - 1)}
                      type="button"
                    >
                      {item.qty === 1 ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
                    </button>
                    <span className="w-5 text-center text-sm font-semibold tabular-nums">{item.qty}</span>
                    <button
                      className="inline-flex size-9 items-center justify-center"
                      onClick={() => setQty(item.key, item.qty + 1)}
                      type="button"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </section>
            <section className="grid gap-3 rounded-[24px] bg-paper p-4 shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-2 gap-2">
                {(["delivery", "pickup"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFulfillment(option)}
                    className={cn(
                      "h-11 rounded-[14px] text-sm font-semibold capitalize",
                      fulfillment === option ? "bg-brand text-paper" : "bg-bg text-muted",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03xx xxxxxxx"
                  inputMode="tel"
                />
              </div>
              {fulfillment === "delivery" ? (
                <div className="grid gap-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House, street, area"
                  />
                </div>
              ) : null}
              <div className="grid gap-1.5">
                <Label htmlFor="notes">Kitchen notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Spice, no mayo, extra dip…"
                />
              </div>
              <p className="text-sm text-muted">{settings.deliveryNote}</p>
            </section>
            <div className="h-24" />
            <div className="fixed inset-x-0 bottom-[72px] z-50 px-4 pb-[env(safe-area-inset-bottom)]">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-[20px] bg-ink px-4 py-3 text-paper shadow-[var(--shadow-card)]">
                <div>
                  <p className="text-xs text-paper/60">
                    {cartCount(items)} items{member ? " · member" : ""}
                  </p>
                  <p className="font-display text-2xl tabular-nums tracking-wide">{formatPkr(cartTotal(items))}</p>
                </div>
                <Button variant="whatsapp" disabled={order.isPending} onClick={submit}>
                  {order.isPending ? "Sending…" : "Send on WhatsApp"}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Storefront>
  );
}
