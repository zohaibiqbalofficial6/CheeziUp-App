import { useEffect, useState } from "react";
import { FoodImage } from "@/components/food-image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-store";
import { productPrice, type Product } from "@/lib/types";
import { cn, formatPkr } from "@/lib/utils";

export function SizeSheet({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const member = useCart((s) => s.member);
  const add = useCart((s) => s.add);
  const [sizeId, setSizeId] = useState(product?.sizes?.[0]?.id ?? "S");
  const sizes = product?.sizes ?? [];
  const selected = sizes.find((size) => size.id === sizeId) ?? sizes[0];

  useEffect(() => {
    setSizeId(product?.sizes?.[0]?.id ?? "S");
  }, [product?.id]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={product?.name ?? "Pizza"}>
        {product ? (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[20px]">
              <div className="aspect-[16/9]">
                <FoodImage imageKey={product.imageKey} alt={product.name} />
              </div>
            </div>
            <p className="text-sm text-muted">{product.description}</p>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((size) => {
                const price = productPrice(product, member, size.id);
                const active = selected?.id === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => setSizeId(size.id)}
                    className={cn(
                      "rounded-[16px] bg-bg px-3 py-3 text-left transition-[box-shadow,background-color] duration-150",
                      active
                        ? "bg-brand-soft shadow-[inset_0_0_0_1.5px_var(--color-brand)]"
                        : "shadow-[inset_0_0_0_1px_var(--color-line)]",
                    )}
                  >
                    <p className="font-display text-lg tracking-wide">{size.label}</p>
                    <p className="text-xs text-muted">{size.inches}" pizza</p>
                    <p className="mt-1 font-semibold tabular-nums text-brand">{formatPkr(price)}</p>
                  </button>
                );
              })}
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                if (!selected) return;
                add({
                  key: `p-${product.id}-${selected.id}`,
                  productId: product.id,
                  name: product.name,
                  sizeLabel: `${selected.label} ${selected.inches}"`,
                  unitPrice: productPrice(product, member, selected.id),
                });
                onOpenChange(false);
              }}
            >
              Add {selected ? formatPkr(productPrice(product, member, selected.id)) : ""}
            </Button>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
