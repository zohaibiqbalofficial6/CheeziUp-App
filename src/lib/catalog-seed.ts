import type { ProductKind, ProductSize } from "./types";

export type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  category: string;
  kind: ProductKind;
  imageKey: string;
  memberOnly?: boolean;
  featured?: boolean;
  badge?: string;
  included?: string;
  price?: number;
  sizes?: ProductSize[];
  sortOrder: number;
};

const REGULAR_SIZES: ProductSize[] = [
  { id: "S", label: "Small", inches: 8, price: 650 },
  { id: "M", label: "Medium", inches: 11, price: 1200 },
  { id: "L", label: "Large", inches: 14, price: 1600 },
  { id: "F", label: "Family", inches: 16, price: 1800 },
];

const SPECIAL_SIZES: ProductSize[] = [
  { id: "S", label: "Small", inches: 8, price: 800 },
  { id: "M", label: "Medium", inches: 11, price: 1400 },
  { id: "L", label: "Large", inches: 14, price: 1800 },
  { id: "F", label: "Family", inches: 16, price: 2200 },
];

function deal(
  order: number,
  slug: string,
  name: string,
  included: string,
  price: number,
  extra: Partial<SeedProduct> = {},
): SeedProduct {
  return {
    slug,
    name,
    description: included,
    category: extra.category ?? "student",
    kind: "deal",
    imageKey: extra.imageKey ?? "pizza",
    included,
    price,
    sortOrder: order,
    memberOnly: extra.memberOnly,
    featured: extra.featured,
    badge: extra.badge,
  };
}

export const SEED_PRODUCTS: SeedProduct[] = [
  deal(1, "deal-1", "Student Deal 1", "2 Chicken Shawarma, 2 Small Pizza, Regular Fries, 500ml Drink", 1700, { featured: true, imageKey: "shawarma", badge: "Deal 1" }),
  deal(2, "deal-2", "Student Deal 2", "2 Zinger Burger, 2 Small Pizza, 1 Ltr Drink", 1700, { featured: true, imageKey: "burger", badge: "Deal 2" }),
  deal(3, "deal-3", "Student Deal 3", "1 Large Pizza, 2 Small Pizza, 1.5 Ltr Drink", 2000, { featured: true, imageKey: "pizza", badge: "Deal 3" }),
  deal(4, "deal-4", "Student Deal 4", "2 Shami Burger, 2 Small Pizza, Regular Fries, 500ml Drink", 1300, { featured: true, imageKey: "burger", badge: "Deal 4" }),
  deal(5, "deal-5", "Student Deal 5", "1 Medium Pizza, 2 Zinger Burger, 1 Ltr Drink", 1700, { featured: true, imageKey: "pizza", badge: "Deal 5" }),
  deal(6, "deal-6", "Student Deal 6", "6 Zinger Burger, 1 Regular Fries, 1 Ltr Drink", 2400, { featured: true, imageKey: "burger", badge: "Deal 6" }),
  deal(7, "deal-7", "Student Deal 7", "6 Shami Burger, 1 Regular Fries, 1.5 Ltr Drink", 1250, { imageKey: "burger", badge: "Deal 7" }),
  deal(8, "deal-8", "Student Deal 8", "2 Patty Burger, 2 Small Pizza, 1 Chicken Shawarma, 1 Ltr Drink", 1800, { imageKey: "shawarma", badge: "Deal 8" }),
  deal(9, "deal-9", "Student Deal 9", "1 Beef Pulao (Full), Raita + Salad, 1 Zinger Burger, 1 Small Pizza, 1 Ltr Drink", 1500, { imageKey: "biryani", badge: "Deal 9" }),
  deal(10, "deal-10", "Student Deal 10", "1 Beef Pulao (Half), Raita + Salad, 2 Shami Burger, Regular Fries, 500ml Drink", 1250, { imageKey: "biryani", badge: "Deal 10" }),
  deal(11, "deal-11", "Student Deal 11", "Chicken Biryani (Full), 2 Small Pizza, 1 Ltr Drink", 1500, { imageKey: "biryani", badge: "Deal 11" }),
  deal(12, "deal-12", "Student Deal 12", "Chicken Biryani (Half), Raita + Salad, 2 Zinger Burger, 500ml Drink", 1250, { imageKey: "biryani", badge: "Deal 12" }),
  deal(13, "deal-13", "Student Deal 13", "1 Small Pizza, 2 Zinger Burger, 2 Chicken Burger, 1 Regular Fries", 1800, { imageKey: "burger", badge: "Deal 13" }),
  deal(14, "deal-14", "Student Deal 14", "1 Family Pizza, 2 Zinger Burger, 1.5 Ltr Drink", 2200, { imageKey: "pizza", badge: "Deal 14" }),
  deal(15, "deal-15", "Student Deal 15", "5 Zinger, 5 Nuggets, 1 Ltr Drink", 1300, { imageKey: "nuggets", badge: "Deal 15" }),
  deal(16, "deal-16", "Student Deal 16", "1 KG Oil Free Fish, 4 Naan, Raita + Salad, 1 Ltr Drink", 1900, { imageKey: "fish", badge: "Deal 16" }),
  deal(17, "deal-17", "Student Deal 17", "10 Nuggets, 2 Zinger Burger, 1 Regular Fries, 1 Ltr Drink", 1400, { imageKey: "nuggets", badge: "Deal 17" }),
  deal(18, "deal-18", "Student Deal 18", "4 Chicken Burger, 2 Regular Fries, 1 Ltr Drink", 1400, { imageKey: "burger", badge: "Deal 18" }),
  deal(19, "deal-19", "Student Deal 19", "1 Large Pizza, 2 Zinger Burger, 2 Paratha Roll, Full Load Fries, 1.5 Ltr Drink", 2400, { imageKey: "roll", badge: "Deal 19" }),
  deal(20, "deal-20", "Student Deal 20", "1 Medium Crown Crust Pizza, 2 Zinger Burger, 1 Regular Fries, 1 Ltr Drink", 1950, { imageKey: "pizza", badge: "Deal 20" }),

  deal(30, "hot-3-small", "3 Small Pizzas", "3 Small pizzas with 1 Ltr drink. Show member card.", 1600, { category: "hot", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(31, "hot-3-medium", "3 Medium Pizzas", "3 Medium pizzas with 1.5 Ltr drink. Show member card.", 2600, { category: "hot", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(32, "hot-3-large", "3 Large Pizzas", "3 Large pizzas with 1.5 Ltr drink. Show member card.", 3200, { category: "hot", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(33, "hot-3-family", "3 Family Pizzas", "3 Family pizzas with 1.5 Ltr drink. Show member card.", 4200, { category: "hot", memberOnly: true, badge: "Members", imageKey: "pizza" }),

  deal(40, "two-small", "Small Two Pizza Deal", "Two small pizzas with 500ml drink. Members only.", 1200, { category: "two-pizza", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(41, "two-medium", "Medium Two Pizza Deal", "Two medium pizzas with 1.5 Ltr drink. Members only.", 1850, { category: "two-pizza", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(42, "two-large", "Large Two Pizza Deal", "Two large pizzas with 1.5 Ltr drink. Members only.", 2250, { category: "two-pizza", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(43, "two-family", "Family Two Pizza Deal", "Two family pizzas with 1.5 Ltr drink. Members only.", 3200, { category: "two-pizza", memberOnly: true, badge: "Members", imageKey: "pizza" }),

  deal(50, "party-small", "Small Party Package", "6 Small pizzas, 6 Zinger burgers, 2 × 1.5 Ltr drinks, 1 pound cake", 6500, { category: "party", badge: "Party", imageKey: "pizza" }),
  deal(51, "party-medium", "Medium Party Package", "3 Medium pizzas, 3 Zinger burgers, 2 × 1.5 Ltr drinks, 1 pound cake", 5500, { category: "party", badge: "Party", imageKey: "pizza" }),
  deal(52, "party-large", "Large Party Package", "3 Large pizzas, 3 Zinger burgers, 2 × 1.5 Ltr drinks, 1 pound cake", 7000, { category: "party", badge: "Party", imageKey: "pizza" }),
  deal(53, "party-family", "Family Party Package", "3 Family pizzas, 3 Zinger burgers, 2 × 1.5 Ltr drinks, 1 pound cake", 8000, { category: "party", badge: "Party", imageKey: "pizza" }),

  deal(60, "special-deal-s", "Special Flavour Small Deal", "Small Cheeziup special flavour pizza deal for members", 1400, { category: "pizza-special", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(61, "special-deal-m", "Special Flavour Medium Deal", "Medium Cheeziup special flavour pizza deal for members", 2400, { category: "pizza-special", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(62, "special-deal-l", "Special Flavour Large Deal", "Large Cheeziup special flavour pizza deal for members", 3200, { category: "pizza-special", memberOnly: true, badge: "Members", imageKey: "pizza" }),
  deal(63, "special-deal-f", "Special Flavour Family Deal", "Family Cheeziup special flavour pizza deal for members", 3800, { category: "pizza-special", memberOnly: true, badge: "Members", imageKey: "pizza" }),

  ...[
    ["chicken-supreme", "Chicken Supreme", "Cheese, Italian chicken, spicy chicken, onion, green pepper, olive, mushroom"],
    ["chicken-tikka", "Chicken Tikka", "Tikka boti, onion, hot chilli cheese"],
    ["chicken-fajita", "Chicken Fajita", "Cheese, special fajita chicken, mushroom, olive, capsicum"],
    ["vegetarian", "Vegetarian", "Cheese, onion, green pepper, bell pepper, olives, mushroom, tomato"],
    ["cheeser", "Cheeser", "Cheese and tasty tomato sauce"],
    ["hot-chilly", "Hot & Chilly", "Spicy chicken, cheese, hot chilli, onion, mushroom, olive"],
    ["american-hot", "American Hot", "Cheese, Italian, sausages, hot chilli, onion, minced beef, egg"],
    ["jalpeno", "Jalpeno", "Cheese, chicken, jalapeno, tomato, sweet corn, onion"],
    ["milano", "Milano", "Cheese, minced chicken, roast, beef, sausages, onion, capsicum"],
    ["romano", "Romano", "Cheese, roast chicken, mushroom, olive, onion, capsicum"],
    ["chilly-mexican", "Chilly Mexican", "Cheese, green chilli, onion rings, capsicum, chicken"],
    ["chicken-cheese", "Chicken Cheese", "Chicken, cheese, onion"],
  ].map(([slug, name, description], index) => ({
    slug,
    name,
    description,
    category: "pizza-regular",
    kind: "pizza" as const,
    imageKey: "pizza",
    sizes: REGULAR_SIZES,
    sortOrder: 70 + index,
  })),

  ...[
    ["cheeziup-special", "Cheeziup Special", "Super chicken meat, crunch sauce, hot chilli, olive, mushroom, cheese"],
    ["malai-boti", "Malai Boti", "Malai, mayo, sausage, hot chilli, olive, mushroom, tomato, cheese"],
    ["crown-crust", "Crown Crust", "Kabab, mayo, sausage, olive, mushroom, special chicken, capsicum, chilli"],
    ["kabab-crust", "Kabab Crust", "Kabab, mayo, sausage, olive, mushroom, special chicken, capsicum, chilli"],
    ["beef-pepperoni", "Beef Pepperoni Italian", "Pepperoni, cheese, Italian herbs"],
    ["punjabi-special", "Punjabi Special", "Boti, cheese, chicken, hot chilli, onion, tomato rings"],
  ].map(([slug, name, description], index) => ({
    slug,
    name,
    description,
    category: "pizza-special",
    kind: "pizza" as const,
    imageKey: "pizza",
    badge: "Special",
    sizes: SPECIAL_SIZES,
    sortOrder: 90 + index,
  })),

  { slug: "zinger-nuggets-fries", name: "Zinger with Nuggets & Fries", description: "Zinger burger served with nuggets and fries", category: "burgers", kind: "item", imageKey: "burger", price: 550, sortOrder: 110 },
  { slug: "zinger-cheesy", name: "Zinger Cheesy Burger", description: "Crispy zinger with extra cheese", category: "burgers", kind: "item", imageKey: "burger", price: 500, sortOrder: 111 },
  { slug: "zinger-burger", name: "Zinger Burger", description: "Classic crispy chicken zinger", category: "burgers", kind: "item", imageKey: "burger", price: 450, sortOrder: 112 },
  { slug: "chicken-burger", name: "Chicken Burger", description: "Soft bun, chicken patty, house sauce", category: "burgers", kind: "item", imageKey: "burger", price: 400, sortOrder: 113 },
  { slug: "patty-burger", name: "Patty Burger", description: "Simple, filling, fast", category: "burgers", kind: "item", imageKey: "burger", price: 350, sortOrder: 114 },
  { slug: "shami-burger", name: "Shami Burger", description: "Desi shami patty burger", category: "burgers", kind: "item", imageKey: "burger", price: 200, sortOrder: 115 },
  { slug: "shami-anda", name: "Shami Burger Anda Laga", description: "Shami burger with egg", category: "burgers", kind: "item", imageKey: "burger", price: 250, sortOrder: 116 },
  { slug: "chicken-sandwich", name: "Chicken Sandwich", description: "Chicken sandwich with nuggets and fries", category: "burgers", kind: "item", imageKey: "sandwich", price: 550, sortOrder: 117 },
  { slug: "malai-sandwich", name: "Malai Sandwich", description: "Malai sandwich with nuggets and fries", category: "burgers", kind: "item", imageKey: "sandwich", price: 600, sortOrder: 118 },

  { slug: "chicken-shawarma", name: "Chicken Shawarma", description: "Loaded chicken shawarma wrap", category: "rolls", kind: "item", imageKey: "shawarma", price: 350, sortOrder: 130 },
  { slug: "malai-shawarma", name: "Malai Chicken Shawarma", description: "Creamy malai chicken shawarma", category: "rolls", kind: "item", imageKey: "shawarma", price: 400, sortOrder: 131 },
  { slug: "tikka-paratha-roll", name: "Chicken Tikka Paratha Roll", description: "Flaky paratha with tikka filling", category: "rolls", kind: "item", imageKey: "roll", price: 430, sortOrder: 132 },
  { slug: "malai-paratha-roll", name: "Malai Paratha Roll", description: "Malai chicken in layered paratha", category: "rolls", kind: "item", imageKey: "roll", price: 500, sortOrder: 133 },
  { slug: "kabab-paratha-roll", name: "Chicken Kabab Paratha Roll", description: "Kabab filling, paratha wrap", category: "rolls", kind: "item", imageKey: "roll", price: 400, sortOrder: 134 },

  { slug: "nuggets-12", name: "Nuggets 12 Pcs", description: "Crispy chicken nuggets", category: "sides", kind: "item", imageKey: "nuggets", price: 500, sortOrder: 140 },
  { slug: "nuggets-6", name: "Nuggets 6 Pcs", description: "Crispy chicken nuggets", category: "sides", kind: "item", imageKey: "nuggets", price: 300, sortOrder: 141 },
  { slug: "reg-fries", name: "Regular Fries", description: "Salted golden fries", category: "sides", kind: "item", imageKey: "fries", price: 250, sortOrder: 142 },
  { slug: "large-fries", name: "Large Fries", description: "Bigger portion of fries", category: "sides", kind: "item", imageKey: "fries", price: 350, sortOrder: 143 },
  { slug: "reg-loader", name: "Regular Loader Fries", description: "Loaded fries, regular", category: "sides", kind: "item", imageKey: "fries", price: 400, sortOrder: 144 },
  { slug: "large-loader", name: "Large Loader Fries", description: "Loaded fries, large", category: "sides", kind: "item", imageKey: "fries", price: 700, sortOrder: 145 },
  { slug: "fish-oil-free", name: "1KG Oil Free Fish", description: "One kilo oil-free fish", category: "sides", kind: "item", imageKey: "fish", price: 1600, sortOrder: 146 },
  { slug: "fri-fish", name: "1KG Fri-Fish", description: "One kilo fried fish", category: "sides", kind: "item", imageKey: "fish", price: 1600, sortOrder: 147 },
];
