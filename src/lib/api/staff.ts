import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { ensureSeeded } from "@/lib/server/seed";
import { hashPin, hashToken, newSessionToken, pinsMatch } from "@/lib/server/pin";
import { mapStaff } from "@/lib/server/map";
import { requireStaff } from "@/lib/api/staff-auth";

export const staffLogin = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().min(4).max(8) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const staff = await sql<{
      id: number;
      name: string;
      role: string;
      active: boolean;
      pin_hash: string;
    }>`
      select id, name, role, active, pin_hash
      from staff
      where active = true
    `;
    const match = staff.find((row) => pinsMatch(data.pin, row.pin_hash));
    if (!match) throw new Error("Wrong PIN.");
    const token = newSessionToken();
    await sql.query(
      `insert into staff_sessions (token_hash, staff_id, expires_at)
       values ($1, $2, now() + interval '7 days')`,
      [hashToken(token), match.id],
    );
    return {
      token,
      staff: mapStaff(match),
    };
  });

export const staffMe = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const staff = await requireStaff(sql, data.token);
    return { staff };
  });

export const staffLogout = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`delete from staff_sessions where token_hash = ${hashToken(data.token)}`;
    return { ok: true };
  });

export const listStaff = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await requireStaff(sql, data.token, true);
    const rows = await sql<{
      id: number;
      name: string;
      role: string;
      active: boolean;
    }>`select id, name, role, active from staff order by id asc`;
    return rows.map(mapStaff);
  });

export const upsertStaff = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      id: z.number().int().optional(),
      name: z.string().min(2).max(40),
      pin: z.string().min(4).max(8).optional(),
      role: z.enum(["owner", "manager"]),
      active: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const actor = await requireStaff(sql, data.token, true);
    if (data.id) {
      const existing = await sql<{ role: string; name: string }>`
        select role, name from staff where id = ${data.id}
      `;
      const row = existing[0];
      if (!row) throw new Error("Staff member not found.");
      if (row.role === "owner" && data.role !== "owner") {
        throw new Error("The owner role cannot be removed.");
      }
      if (data.pin) {
        await sql`
          update staff
          set name = ${data.name}, pin_hash = ${hashPin(data.pin)}, role = ${data.role}, active = ${data.active}
          where id = ${data.id}
        `;
      } else {
        await sql`
          update staff
          set name = ${data.name}, role = ${data.role}, active = ${data.active}
          where id = ${data.id}
        `;
      }
      return { id: data.id };
    }
    if (!data.pin) throw new Error("A PIN is required for new staff.");
    if (data.role === "owner" && actor.role !== "owner") {
      throw new Error("Only the owner can add another owner.");
    }
    const inserted = await sql<{ id: number }>`
      insert into staff (name, pin_hash, role, active)
      values (${data.name}, ${hashPin(data.pin)}, ${data.role === "owner" ? "manager" : data.role}, ${data.active})
      returning id
    `;
    return { id: inserted[0].id };
  });

export const deleteStaff = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.number().int() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const actor = await requireStaff(sql, data.token, true);
    if (actor.id === data.id) throw new Error("You cannot remove your own login.");
    const existing = await sql<{ role: string }>`select role from staff where id = ${data.id}`;
    if (existing[0]?.role === "owner") throw new Error("The owner login cannot be deleted.");
    await sql`delete from staff where id = ${data.id}`;
    return { ok: true };
  });
