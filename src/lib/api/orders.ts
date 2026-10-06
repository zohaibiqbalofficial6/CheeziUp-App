import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { ensureSeeded } from "@/lib/server/seed";
import { mapOrder, mapSettings } from "@/lib/server/map";
import { requireStaff } from "@/lib/api/staff-auth";
import { waDigits } from "@/lib/utils";
import { DEFAULT_SETTINGS, type CartLine, type RestaurantSettings } from "@/lib/types";

const lineSchema = z.object({
  key: z.string(),
  productId: z.number().int(),
  name: z.string(),
  sizeLabel: z.string().optional(),
  qty: z.number().int().positive(),
  unitPrice: z.number().int().nonnegative(),
  included: z.string().optional(),
});

function buildWhatsAppMessage(input: {
  code: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
  fulfillment: string;
  member: boolean;
  items: CartLine[];
  total: number;
}) {
  const lines = input.items
    .map((item) => {
      const size = item.sizeLabel ? ` (${item.sizeLabel})` : "";
      return `• ${item.qty}× ${item.name}${size} — Rs ${item.unitPrice * item.qty}`;
    })
    .join("\n");
  return [
    `CHEEZIUP PIZZA ORDER ${input.code}`,
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Type: ${input.fulfillment === "pickup" ? "Pickup" : "Delivery"}`,
    input.fulfillment === "delivery" ? `Address: ${input.address}` : null,
    input.member ? "Member card: Yes" : "Member card: No",
    "",
    lines,
    "",
    `Total: Rs ${input.total}`,
    input.notes ? `Notes: ${input.notes}` : null,
    "",
    "Please confirm this order. Thank you.",
  ]
    .filter(Boolean)
    .join("\n");
}

export const placeOrder = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2).max(60),
      phone: z.string().min(10).max(20),
      address: z.string().max(200).default(""),
      notes: z.string().max(300).default(""),
      fulfillment: z.enum(["delivery", "pickup"]),
      member: z.boolean().default(false),
      items: z.array(lineSchema).min(1),
    }),
  )
  .handler(async ({ data }) => {
    if (data.fulfillment === "delivery" && data.address.trim().length < 6) {
      throw new Error("Please add a delivery address.");
    }
    const sql = await getSql();
    await ensureSeeded(sql);
    const total = data.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
    const code = `CU-${Math.floor(1000 + Math.random() * 9000)}`;
    const inserted = await sql.query<{ id: number }>(
      `insert into orders
        (code, customer_name, customer_phone, address, notes, fulfillment, member, items, total_pkr, status)
       values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,'new')
       returning id`,
      [
        code,
        data.name.trim(),
        data.phone.trim(),
        data.address.trim(),
        data.notes.trim(),
        data.fulfillment,
        data.member,
        JSON.stringify(data.items),
        total,
      ],
    );
    const settingsRows = await sql<{ value: unknown }>`
      select value from settings where key = 'restaurant'
    `;
    const settings = settingsRows[0]
      ? mapSettings(settingsRows[0].value)
      : DEFAULT_SETTINGS;
    const message = buildWhatsAppMessage({
      code,
      name: data.name.trim(),
      phone: data.phone.trim(),
      address: data.address.trim(),
      notes: data.notes.trim(),
      fulfillment: data.fulfillment,
      member: data.member,
      items: data.items,
      total,
    });
    const waUrl = `https://wa.me/${waDigits(settings.whatsapp)}?text=${encodeURIComponent(message)}`;
    return { id: inserted[0].id, code, total, waUrl };
  });

export const listOrders = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await requireStaff(sql, data.token);
    const rows = await sql`
      select * from orders
      order by created_at desc
      limit 80
    `;
    return rows.map((row) =>
      mapOrder(
        row as {
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
        },
      ),
    );
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      id: z.number().int(),
      status: z.enum(["new", "preparing", "out", "done", "cancelled"]),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await requireStaff(sql, data.token);
    await sql`update orders set status = ${data.status} where id = ${data.id}`;
    return { ok: true };
  });

export const getSettings = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  await ensureSeeded(sql);
  const rows = await sql<{ value: unknown }>`select value from settings where key = 'restaurant'`;
  return (rows[0] ? mapSettings(rows[0].value) : DEFAULT_SETTINGS) satisfies RestaurantSettings;
});

export const saveSettings = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      settings: z.object({
        name: z.string().min(2).max(80),
        tagline: z.string().max(120),
        address: z.string().min(8).max(240),
        hours: z.string().min(4).max(80),
        phones: z.array(z.string()).min(1).max(6),
        whatsapp: z.string().min(10).max(20),
        announcement: z.string().max(240),
        deliveryNote: z.string().max(240),
        memberPerk: z.string().max(240),
      }),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await requireStaff(sql, data.token);
    await sql.query(
      `insert into settings (key, value) values ('restaurant', $1::jsonb)
       on conflict (key) do update set value = excluded.value`,
      [JSON.stringify(data.settings)],
    );
    return { ok: true };
  });
