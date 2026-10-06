import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { ensureSeeded } from "@/lib/server/seed";
import { mapProduct, type ProductRow } from "@/lib/server/map";
import { requireStaff } from "@/lib/api/staff-auth";

const sizeSchema = z.object({
  id: z.string(),
  label: z.string(),
  inches: z.number().optional(),
  price: z.number().int().nonnegative(),
  memberPrice: z.number().int().nonnegative().optional(),
});

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  await ensureSeeded(sql);
  const rows = await sql<ProductRow>`
    select * from products
    where active = true
    order by sort_order asc, id asc
  `;
  return rows.map(mapProduct);
});

export const getAdminCatalog = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await requireStaff(sql, data.token);
    const rows = await sql<ProductRow>`
      select * from products
      order by sort_order asc, id asc
    `;
    return rows.map(mapProduct);
  });

const upsertSchema = z.object({
  token: z.string(),
  id: z.number().int().optional(),
  name: z.string().min(2).max(80),
  description: z.string().max(400).default(""),
  category: z.string().min(2).max(40),
  kind: z.enum(["item", "pizza", "deal"]),
  imageKey: z.string().min(2).max(30),
  memberOnly: z.boolean().default(false),
  featured: z.boolean().default(false),
  badge: z.string().max(24).nullable().optional(),
  included: z.string().max(400).nullable().optional(),
  price: z.number().int().nonnegative().nullable().optional(),
  sizes: z.array(sizeSchema).nullable().optional(),
  active: z.boolean().default(true),
});

export const upsertProduct = createServerFn({ method: "POST" })
  .validator(upsertSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await requireStaff(sql, data.token);
    const sizes = data.sizes ? JSON.stringify(data.sizes) : null;
    if (data.id) {
      await sql.query(
        `update products set
          name=$1, description=$2, category=$3, kind=$4, image_key=$5,
          member_only=$6, featured=$7, badge=$8, included=$9, price=$10,
          sizes=$11::jsonb, active=$12
         where id=$13`,
        [
          data.name,
          data.description,
          data.category,
          data.kind,
          data.imageKey,
          data.memberOnly,
          data.featured,
          data.badge ?? null,
          data.included ?? null,
          data.price ?? null,
          sizes,
          data.active,
          data.id,
        ],
      );
      return { id: data.id };
    }
    const slug = `${slugify(data.name)}-${Math.floor(Math.random() * 900 + 100)}`;
    const maxSort = await sql<{ m: number }>`select coalesce(max(sort_order), 0)::int as m from products`;
    const rows = await sql.query<{ id: number }>(
      `insert into products
        (slug, name, description, category, kind, image_key, member_only, featured, badge, included, price, sizes, active, sort_order)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13,$14)
       returning id`,
      [
        slug,
        data.name,
        data.description,
        data.category,
        data.kind,
        data.imageKey,
        data.memberOnly,
        data.featured,
        data.badge ?? null,
        data.included ?? null,
        data.price ?? null,
        sizes,
        data.active,
        (maxSort[0]?.m ?? 0) + 1,
      ],
    );
    return { id: rows[0].id };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.number().int() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await requireStaff(sql, data.token);
    await sql`delete from products where id = ${data.id}`;
    return { ok: true };
  });
