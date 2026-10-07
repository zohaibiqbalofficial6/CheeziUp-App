import { DEFAULT_SETTINGS } from "@/lib/types";
import { SEED_PRODUCTS } from "@/lib/catalog-seed";
import type { Sql } from "@/lib/db";
import { hashPin } from "./pin";

const SEED_VERSION = 2;

export async function ensureSeeded(sql: Sql) {
  const staffCount = await sql<{ c: number }>`select count(*)::int as c from staff`;
  if ((staffCount[0]?.c ?? 0) === 0) {
    await sql`
      insert into staff (name, pin_hash, role)
      values ('Zohaib', ${hashPin("1000")}, 'owner')
    `;
  }

  const versionRows = await sql<{ value: unknown }>`
    select value from settings where key = 'seed_version'
  `;
  const currentVersion = Number(versionRows[0]?.value ?? 0);
  const productCount = await sql<{ c: number }>`select count(*)::int as c from products`;
  const needsCatalog = (productCount[0]?.c ?? 0) === 0 || currentVersion < SEED_VERSION;

  if (needsCatalog) {
    for (const product of SEED_PRODUCTS) {
      await sql.query(
        `insert into products
          (slug, name, description, category, kind, image_key, member_only, featured, badge, included, price, sizes, sort_order)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13)
         on conflict (slug) do update set
           name = excluded.name,
           description = excluded.description,
           category = excluded.category,
           kind = excluded.kind,
           image_key = excluded.image_key,
           member_only = excluded.member_only,
           featured = excluded.featured,
           badge = excluded.badge,
           included = excluded.included,
           price = excluded.price,
           sizes = excluded.sizes,
           sort_order = excluded.sort_order`,
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
    await sql.query(
      `insert into settings (key, value) values ('seed_version', $1::jsonb)
       on conflict (key) do update set value = excluded.value`,
      [JSON.stringify(SEED_VERSION)],
    );
  }

  const settingsCount = await sql<{ c: number }>`select count(*)::int as c from settings where key = 'restaurant'`;
  if ((settingsCount[0]?.c ?? 0) === 0 || currentVersion < SEED_VERSION) {
    await sql.query(
      `insert into settings (key, value) values ('restaurant', $1::jsonb)
       on conflict (key) do update set value = excluded.value`,
      [JSON.stringify(DEFAULT_SETTINGS)],
    );
  }
}
