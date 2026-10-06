import { DEFAULT_SETTINGS } from "@/lib/types";
import { SEED_PRODUCTS } from "@/lib/catalog-seed";
import type { Sql } from "@/lib/db";
import { hashPin } from "./pin";

export async function ensureSeeded(sql: Sql) {
  const staffCount = await sql<{ c: number }>`select count(*)::int as c from staff`;
  if ((staffCount[0]?.c ?? 0) === 0) {
    await sql`
      insert into staff (name, pin_hash, role)
      values ('Zohaib', ${hashPin("1000")}, 'owner')
    `;
  }

  const productCount = await sql<{ c: number }>`select count(*)::int as c from products`;
  if ((productCount[0]?.c ?? 0) === 0) {
    for (const product of SEED_PRODUCTS) {
      await sql.query(
        `insert into products
          (slug, name, description, category, kind, image_key, member_only, featured, badge, included, price, sizes, sort_order)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13)`,
        [
          product.slug,
          product.name,
          product.description,
          product.category,
          product.kind,
          product.imageKey,
          product.memberOnly ?? false,
          product.featured ?? false,
          product.badge ?? null,
          product.included ?? null,
          product.price ?? null,
          product.sizes ? JSON.stringify(product.sizes) : null,
          product.sortOrder,
        ],
      );
    }
  }

  const settingsCount = await sql<{ c: number }>`select count(*)::int as c from settings`;
  if ((settingsCount[0]?.c ?? 0) === 0) {
    await sql.query(`insert into settings (key, value) values ($1, $2::jsonb)`, [
      "restaurant",
      JSON.stringify(DEFAULT_SETTINGS),
    ]);
  }
}
