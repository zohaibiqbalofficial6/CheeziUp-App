import { Pizza } from "lucide-react";
import { FOOD_IMAGES } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FoodImage({
  imageKey,
  alt,
  className,
}: {
  imageKey: string;
  alt: string;
  className?: string;
}) {
  const src = FOOD_IMAGES[imageKey] ?? FOOD_IMAGES.pizza;
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("food-photo h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div className={cn("flex h-full w-full items-center justify-center bg-brand-soft text-brand", className)}>
      <Pizza className="size-8" />
    </div>
  );
}
