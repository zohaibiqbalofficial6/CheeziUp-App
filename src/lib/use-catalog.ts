import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "@/lib/api/catalog";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/types";

export function useCatalog(initialData?: Product[]) {
  const member = useCart((s) => s.member);
  const query = useQuery({
    queryKey: ["catalog"],
    queryFn: () => getCatalog(),
    initialData,
  });
  const products = (query.data ?? []).filter((product) => (member ? true : !product.memberOnly));
  return { ...query, products, all: query.data ?? [] };
}

export function byCategory(products: Product[], slug: string) {
  return products.filter((product) => product.category === slug);
}

export function byHomeFilter(products: Product[], filter: string) {
  if (filter === "all") return products.filter((product) => product.kind !== "deal");
  if (filter === "pizza") return products.filter((product) => product.kind === "pizza");
  if (filter === "deals") return products.filter((product) => product.kind === "deal");
  return products.filter((product) => product.category === filter);
}
