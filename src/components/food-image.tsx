import { Fish, Pizza, Sandwich, Soup, UtensilsCrossed } from "lucide-react";
import { FOOD_IMAGES } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS = {
  pizza: Pizza,
  burger: Sandwich,
  shawarma: UtensilsCrossed,
  fries: UtensilsCrossed,
  biryani: Soup,
  nuggets: UtensilsCrossed,
  fish: Fish,
  roll: UtensilsCrossed,
  sandwich: Sandwich,
};

export function FoodImage({
  imageKey,
  alt,
  className,
}: {
  imageKey: string;
  alt: string;
  className?: string;
}) {
  const src = FOOD_IMAGES[imageKey];
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("food-photo h-full w-full object-cover", className)}
      />
    );
  }
  const Icon = ICONS[imageKey as keyof typeof ICONS] ?? Pizza;
  return (
    <div className={cn("flex h-full w-full items-center justify-center bg-brand-soft text-brand", className)}>
      <Icon className="size-8" />
    </div>
  );
}
