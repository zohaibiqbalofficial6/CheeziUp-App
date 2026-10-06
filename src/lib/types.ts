export type StaffRole = "owner" | "manager";

export type ProductKind = "item" | "pizza" | "deal";

export type ProductSize = {
  id: string;
  label: string;
  inches?: number;
  price: number;
  memberPrice?: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  kind: ProductKind;
  imageKey: string;
  memberOnly: boolean;
  featured: boolean;
  badge: string | null;
  included: string | null;
  price: number | null;
  sizes: ProductSize[] | null;
  active: boolean;
  sortOrder: number;
};

export type RestaurantSettings = {
  name: string;
  tagline: string;
  address: string;
  hours: string;
  phones: string[];
  whatsapp: string;
  announcement: string;
  deliveryNote: string;
  memberPerk: string;
};

export type CartLine = {
  key: string;
  productId: number;
  name: string;
  sizeLabel?: string;
  qty: number;
  unitPrice: number;
  included?: string;
};

export type OrderRecord = {
  id: number;
  code: string;
  customerName: string;
  customerPhone: string;
  address: string;
  notes: string;
  fulfillment: "delivery" | "pickup";
  member: boolean;
  items: CartLine[];
  totalPkr: number;
  status: "new" | "preparing" | "out" | "done" | "cancelled";
  createdAt: string;
};

export type StaffProfile = {
  id: number;
  name: string;
  role: StaffRole;
  active: boolean;
};

export type StaffSession = {
  token: string;
  staff: StaffProfile;
};

export const CATEGORIES: { slug: string; label: string; blurb: string }[] = [
  { slug: "student", label: "Student Packages", blurb: "Takeaway combos built for sharing" },
  { slug: "hot", label: "Hot Deals", blurb: "Member card specials" },
  { slug: "two-pizza", label: "Two Pizza Deals", blurb: "Members only, with drinks" },
  { slug: "party", label: "Party & Birthday", blurb: "Pizzas, burgers, cake and drinks" },
  { slug: "pizza-regular", label: "Regular Pizzas", blurb: "Classic Cheeziup flavours" },
  { slug: "pizza-special", label: "Special Pizzas", blurb: "House crusts and loaded toppings" },
  { slug: "burgers", label: "Burgers & Sandwiches", blurb: "Zinger, shami, patty and more" },
  { slug: "rolls", label: "Shawarma & Rolls", blurb: "Paratha rolls and shawarma" },
  { slug: "sides", label: "Sides & Extras", blurb: "Fries, nuggets and fish" },
];

export const FOOD_IMAGES: Record<string, string> = {
  pizza: "/food/pizza.jpg",
  burger: "/food/burger.jpg",
  shawarma: "/food/shawarma.jpg",
  fries: "/food/fries.jpg",
  biryani: "/food/biryani.jpg",
  nuggets: "/food/nuggets.jpg",
  fish: "/food/fish.jpg",
  roll: "/food/roll.jpg",
  sandwich: "/food/burger.jpg",
};

export const DEFAULT_SETTINGS: RestaurantSettings = {
  name: "Cheeziup Pizza & Fast Food",
  tagline: "Hot oven. Fast street. Lahore nights.",
  address:
    "First Floor, Shop #3 Takbeer Plaza, Joray Pul Chowk, Al Faisal Town, Zarar Shaheed Road, Lahore",
  hours: "1:00 PM – 3:00 AM",
  phones: ["0325-9909922", "0325-4090909", "0370-4408836", "042-36637100"],
  whatsapp: "0325-9909922",
  announcement: "Show your member card on regular spice S / M / L / F pizza orders and get a free 8-inch pizza.",
  deliveryNote:
    "Free home delivery for members. 8-inch within 3 km, 11-inch 7 km, 14-inch 10 km, 16-inch 13 km.",
  memberPerk: "Members unlock Hot Deals, Two Pizza Deals, and free 8-inch pizza on card.",
};

export function productPrice(product: Product, member: boolean, sizeId?: string) {
  if (product.sizes && product.sizes.length > 0) {
    const size =
      product.sizes.find((item) => item.id === sizeId) ?? product.sizes[0];
    if (member && size.memberPrice != null) return size.memberPrice;
    return size.price;
  }
  return product.price ?? 0;
}

export function productPriceLabel(product: Product, member: boolean) {
  if (product.sizes && product.sizes.length > 0) {
    const prices = product.sizes.map((size) =>
      member && size.memberPrice != null ? size.memberPrice : size.price,
    );
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? min : min;
  }
  return product.price ?? 0;
}
