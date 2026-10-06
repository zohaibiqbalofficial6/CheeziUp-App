import { createFileRoute } from "@tanstack/react-router";
import { Share, Smartphone } from "lucide-react";
import { Storefront } from "@/components/storefront";

export const Route = createFileRoute("/install")({ component: InstallPage });

function InstallPage() {
  return (
    <Storefront>
      <div className="space-y-5">
        <header>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Home screen</p>
          <h1 className="font-display text-4xl tracking-wide">Install Cheeziup</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            This is a real restaurant app for iPhone and Android. Customers open the link once, save it, and order from the icon like any other app.
          </p>
        </header>
        <section className="rounded-[28px] bg-paper p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-brand">
            <Share className="size-5" />
            <h2 className="font-display text-2xl tracking-wide">iPhone</h2>
          </div>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            <li>1. Open this page in Safari.</li>
            <li>2. Tap the Share button at the bottom.</li>
            <li>3. Choose Add to Home Screen, then Add.</li>
            <li>4. The Cheeziup icon appears with your other apps.</li>
          </ol>
        </section>
        <section className="rounded-[28px] bg-paper p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-brand">
            <Smartphone className="size-5" />
            <h2 className="font-display text-2xl tracking-wide">Android</h2>
          </div>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            <li>1. Open this page in Chrome.</li>
            <li>2. Tap the menu (three dots).</li>
            <li>3. Tap Add to Home screen or Install app.</li>
            <li>4. Confirm. Cheeziup opens full-screen from the icon.</li>
          </ol>
        </section>
        <p className="text-sm text-muted">
          After you publish, send customers the app link on WhatsApp. They save it once and order whenever they like.
        </p>
      </div>
    </Storefront>
  );
}
