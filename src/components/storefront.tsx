import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { getSettings } from "@/lib/api/orders";
import { DEFAULT_SETTINGS } from "@/lib/types";

export function Storefront({ children }: { children: ReactNode }) {
  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });
  return <AppShell settings={settings.data ?? DEFAULT_SETTINGS}>{children}</AppShell>;
}
