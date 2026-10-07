import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "./types";

type CartState = {
  items: CartLine[];
  member: boolean;
  setMember: (member: boolean) => void;
  add: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      member: false,
      setMember: (member) => set({ member }),
      add: (line) => {
        const qty = line.qty ?? 1;
        const existing = get().items.find((item) => item.key === line.key);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.key === line.key ? { ...item, qty: item.qty + qty } : item,
            ),
          });
          return;
        }
        set({ items: [...get().items, { ...line, qty }] });
      },
      setQty: (key, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((item) => item.key !== key) });
          return;
        }
        set({
          items: get().items.map((item) => (item.key === key ? { ...item, qty } : item)),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "cheeziup-cart" },
  ),
);

export function useCartHydrated() {
  const [hydrated, setHydrated] = useState(() => useCart.persist.hasHydrated());
  useEffect(() => {
    if (useCart.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return useCart.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}

export function cartCount(items: CartLine[]) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function cartTotal(items: CartLine[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}
