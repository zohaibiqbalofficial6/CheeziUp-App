import type { Sql } from "@/lib/db";
import { hashToken } from "@/lib/server/pin";
import { mapStaff } from "@/lib/server/map";
import type { StaffProfile } from "@/lib/types";

export async function requireStaff(sql: Sql, token: string, ownerOnly = false) {
  const tokenHash = hashToken(token);
  const rows = await sql<{
    id: number;
    name: string;
    role: string;
    active: boolean;
  }>`
    select s.id, s.name, s.role, s.active
    from staff_sessions sess
    join staff s on s.id = sess.staff_id
    where sess.token_hash = ${tokenHash}
      and sess.expires_at > now()
      and s.active = true
    limit 1
  `;
  const row = rows[0];
  if (!row) throw new Error("Staff session expired. Sign in again.");
  if (ownerOnly && row.role !== "owner") {
    throw new Error("Only the owner can manage staff.");
  }
  return mapStaff(row) satisfies StaffProfile;
}
