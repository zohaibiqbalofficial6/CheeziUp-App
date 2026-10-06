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
