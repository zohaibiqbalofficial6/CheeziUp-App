import { Minus, Plus } from "lucide-react";
import { FoodImage } from "@/components/food-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { productPrice, productPriceLabel, type Product } from "@/lib/types";
import { formatPkr } from "@/lib/utils";

export function ProductCard({
  product,
  onConfigure,
}: {
  product: Product;
  onConfigure?: (product: Product) => void;
}) {
  const member = useCart((s) => s.member);
  const items = useCart((s) => s.items);
  const add = useCart((s) => s.add);
  const setQty = useCart((s) => s.setQty);
  const isPizza = product.kind === "pizza";
  const line = items.find((item) => item.productId === product.id && !item.sizeLabel);
  const from = productPriceLabel(product, member);

  return (
    <article className="flex gap-3 rounded-[24px] bg-paper p-2.5 shadow-[var(--shadow-card)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative size-[92px] shrink-0 overflow-hidden rounded-[16px] bg-bg">
        <FoodImage imageKey={product.imageKey} alt={product.name} />
        {product.badge ? (
          <Badge className="absolute top-1.5 left-1.5">{product.badge}</Badge>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight tracking-wide text-ink">
            {product.name}
          </h3>
          {product.memberOnly ? <Badge tone="soft">Members</Badge> : null}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {product.included || product.description}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <p className="font-display text-lg tabular-nums tracking-wide text-brand">
            {isPizza ? `From ${formatPkr(from)}` : formatPkr(from)}
          </p>
          {isPizza ? (
            <Button size="sm" onClick={() => onConfigure?.(product)}>
              Sizes
            </Button>
          ) : line ? (
            <div className="flex items-center gap-1 rounded-[12px] bg-bg p-0.5">
              <button
                className="inline-flex size-9 items-center justify-center rounded-[10px] text-ink"
                onClick={() => setQty(line.key, line.qty - 1)}
                aria-label="Remove one"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-5 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
              <button
                className="inline-flex size-9 items-center justify-center rounded-[10px] text-ink"
                onClick={() => setQty(line.key, line.qty + 1)}
                aria-label="Add one"
              >
                <Plus className="size-4" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() =>
                add({
                  key: `p-${product.id}`,
                  productId: product.id,
                  name: product.name,
                  unitPrice: productPrice(product, member),
                  included: product.included ?? undefined,
                })
              }
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
