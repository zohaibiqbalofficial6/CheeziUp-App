import type { OrderRecord, Product, ProductSize, RestaurantSettings, StaffProfile, StaffRole } from "@/lib/types";

export type ProductRow = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  kind: string;
  image_key: string;
  member_only: boolean;
  featured: boolean;
  badge: string | null;
  included: string | null;
  price: number | null;
  sizes: unknown;
  active: boolean;
  sort_order: number;
};

export function parseSizes(value: unknown): ProductSize[] | null {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as ProductSize[];
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return Array.isArray(value) ? (value as ProductSize[]) : null;
}

export function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    kind: row.kind as Product["kind"],
    imageKey: row.image_key,
    memberOnly: Boolean(row.member_only),
    featured: Boolean(row.featured),
    badge: row.badge,
    included: row.included,
    price: row.price,
    sizes: parseSizes(row.sizes),
    active: Boolean(row.active),
    sortOrder: row.sort_order,
  };
}

export function mapSettings(value: unknown): RestaurantSettings {
  if (!value || typeof value !== "object") {
    throw new Error("Missing restaurant settings");
  }
  return value as RestaurantSettings;
}

export function mapStaff(row: {
  id: number;
  name: string;
  role: string;
  active: boolean;
}): StaffProfile {
  return {
    id: row.id,
    name: row.name,
    role: row.role as StaffRole,
    active: Boolean(row.active),
  };
}

export function mapOrder(row: {
  id: number;
  code: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  notes: string;
  fulfillment: string;
  member: boolean;
  items: unknown;
  total_pkr: number;
  status: string;
  created_at: string | Date;
}): OrderRecord {
  const items = typeof row.items === "string" ? JSON.parse(row.items) : row.items;
  return {
    id: row.id,
    code: row.code,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    address: row.address,
    notes: row.notes,
    fulfillment: row.fulfillment as OrderRecord["fulfillment"],
    member: Boolean(row.member),
    items: Array.isArray(items) ? items : [],
    totalPkr: row.total_pkr,
    status: row.status as OrderRecord["status"],
    createdAt: typeof row.created_at === "string" ? row.created_at : row.created_at.toISOString(),
  };
}
