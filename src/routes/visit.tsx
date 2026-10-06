import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, MapPin, MessageCircle, Phone, Smartphone } from "lucide-react";
import { Storefront } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/lib/api/orders";
import { DEFAULT_SETTINGS } from "@/lib/types";
import { waDigits } from "@/lib/utils";

export const Route = createFileRoute("/visit")({ component: VisitPage });

function VisitPage() {
  const settingsQuery = useQuery({ queryKey: ["settings"], queryFn: () => getSettings() });
  const settings = settingsQuery.data ?? DEFAULT_SETTINGS;
  const maps = `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`;
  const wa = `https://wa.me/${waDigits(settings.whatsapp)}?text=${encodeURIComponent("Salaam Cheeziup, I want to place an order.")}`;

  return (
    <Storefront>
      <div className="space-y-5">
        <header>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Find us</p>
          <h1 className="font-display text-4xl tracking-wide">Visit Cheeziup</h1>
        </header>
        <section className="overflow-hidden rounded-[28px] bg-paper shadow-[var(--shadow-card)]">
          <div className="hero-wash px-5 py-8 text-paper">
            <p className="font-display text-3xl tracking-wide">Al Faisal Town</p>
            <p className="mt-2 max-w-md text-sm text-paper/80">{settings.address}</p>
          </div>
          <div className="space-y-4 px-5 py-5">
            <p className="flex items-start gap-2 text-sm text-muted">
              <MapPin className="mt-0.5 size-4 text-brand" />
              {settings.address}
            </p>
            <p className="flex items-center gap-2 text-sm text-muted">
              <Clock className="size-4 text-brand" />
              {settings.hours}
            </p>
            <p className="text-sm text-muted">{settings.deliveryNote}</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <a href={maps} target="_blank" rel="noreferrer">
                  Open maps
                </a>
              </Button>
              <Button asChild variant="whatsapp">
                <a href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
        <section className="space-y-2">
          <h2 className="font-display text-2xl tracking-wide">Call the shop</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {settings.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex min-h-14 items-center justify-between rounded-[18px] bg-paper px-4 shadow-[var(--shadow-card)]"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Phone className="size-4 text-brand" />
                  {phone}
                </span>
                <span className="text-xs font-semibold tracking-wide text-muted uppercase">Call</span>
              </a>
            ))}
          </div>
        </section>
        <section className="rounded-[24px] bg-paper px-5 py-5 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-2xl tracking-wide">Put us on your phone</h2>
          <p className="mt-1 text-sm text-muted">
            iPhone and Android both support this as an app on the home screen. No App Store wait.
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link to="/install">
              <Smartphone className="size-4" /> Install steps
            </Link>
          </Button>
        </section>
        <p className="text-center text-xs text-faint">
          Staff kitchen ·{" "}
          <Link to="/staff" className="font-semibold text-muted">
            PIN login
          </Link>
        </p>
      </div>
    </Storefront>
  );
}
