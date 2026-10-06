import { t as createServerFn } from "./ssr.mjs";
import { a as hashToken, d as pinsMatch, f as requireStaff, i as hashPin, l as mapStaff, n as ensureSeeded, r as getSql, t as createServerRpc, u as newSessionToken } from "./staff-auth-CA6X_494.mjs";
import { a as number, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-C1tWWAyf.js
var staffLogin_createServerFn_handler = createServerRpc({
	id: "db3f4025477eee80f240eb975ac80f5d51560274ce7cc4cb34440fef09e45578",
	name: "staffLogin",
	filename: "src/lib/api/staff.ts"
}, (opts) => staffLogin.__executeServer(opts));
var staffLogin = createServerFn({ method: "POST" }).validator(object({ pin: string().min(4).max(8) })).handler(staffLogin_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const match = (await sql`
      select id, name, role, active, pin_hash
      from staff
      where active = true
    `).find((row) => pinsMatch(data.pin, row.pin_hash));
	if (!match) throw new Error("Wrong PIN.");
	const token = newSessionToken();
	await sql.query(`insert into staff_sessions (token_hash, staff_id, expires_at)
       values ($1, $2, now() + interval '7 days')`, [hashToken(token), match.id]);
	return {
		token,
		staff: mapStaff(match)
	};
});
var staffMe_createServerFn_handler = createServerRpc({
	id: "d2eb8d9f98675201db38c9382ad537b5f78f1d6dab7a96eb6a3e6e83f4a305b9",
	name: "staffMe",
	filename: "src/lib/api/staff.ts"
}, (opts) => staffMe.__executeServer(opts));
var staffMe = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(staffMe_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	return { staff: await requireStaff(sql, data.token) };
});
var staffLogout_createServerFn_handler = createServerRpc({
	id: "b07e978163deacac8ea750fea6ab3c97ea7ebeac1b805c20c4eb35ef0ac7f4ab",
	name: "staffLogout",
	filename: "src/lib/api/staff.ts"
}, (opts) => staffLogout.__executeServer(opts));
var staffLogout = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(staffLogout_createServerFn_handler, async ({ data }) => {
	await (await getSql())`delete from staff_sessions where token_hash = ${hashToken(data.token)}`;
	return { ok: true };
});
var listStaff_createServerFn_handler = createServerRpc({
	id: "8d4e4b401f7ef25c93d9c50227e2c9ccfaca7af686dbb95d2ba43951ee98b006",
	name: "listStaff",
	filename: "src/lib/api/staff.ts"
}, (opts) => listStaff.__executeServer(opts));
var listStaff = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(listStaff_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await requireStaff(sql, data.token, true);
	return (await sql`select id, name, role, active from staff order by id asc`).map(mapStaff);
});
var upsertStaff_createServerFn_handler = createServerRpc({
	id: "c266f3f16f34bdb10788c662dc4ba97edceb433bb136d30caef0331f0a7d7064",
	name: "upsertStaff",
	filename: "src/lib/api/staff.ts"
}, (opts) => upsertStaff.__executeServer(opts));
var upsertStaff = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	id: number().int().optional(),
	name: string().min(2).max(40),
	pin: string().min(4).max(8).optional(),
	role: _enum(["owner", "manager"]),
	active: boolean().default(true)
})).handler(upsertStaff_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const actor = await requireStaff(sql, data.token, true);
	if (data.id) {
		const row = (await sql`
        select role, name from staff where id = ${data.id}
      `)[0];
		if (!row) throw new Error("Staff member not found.");
		if (row.role === "owner" && data.role !== "owner") throw new Error("The owner role cannot be removed.");
		if (data.pin) await sql`
          update staff
          set name = ${data.name}, pin_hash = ${hashPin(data.pin)}, role = ${data.role}, active = ${data.active}
          where id = ${data.id}
        `;
		else await sql`
          update staff
          set name = ${data.name}, role = ${data.role}, active = ${data.active}
          where id = ${data.id}
        `;
		return { id: data.id };
	}
	if (!data.pin) throw new Error("A PIN is required for new staff.");
	if (data.role === "owner" && actor.role !== "owner") throw new Error("Only the owner can add another owner.");
	return { id: (await sql`
      insert into staff (name, pin_hash, role, active)
      values (${data.name}, ${hashPin(data.pin)}, ${data.role === "owner" ? "manager" : data.role}, ${data.active})
      returning id
    `)[0].id };
});
var deleteStaff_createServerFn_handler = createServerRpc({
	id: "42d84fe500fa3d4af2e65baa11f0e712504f5860a750d85474db9cc651338a27",
	name: "deleteStaff",
	filename: "src/lib/api/staff.ts"
}, (opts) => deleteStaff.__executeServer(opts));
var deleteStaff = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	id: number().int()
})).handler(deleteStaff_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	if ((await requireStaff(sql, data.token, true)).id === data.id) throw new Error("You cannot remove your own login.");
	if ((await sql`select role from staff where id = ${data.id}`)[0]?.role === "owner") throw new Error("The owner login cannot be deleted.");
	await sql`delete from staff where id = ${data.id}`;
	return { ok: true };
});
//#endregion
export { deleteStaff_createServerFn_handler, listStaff_createServerFn_handler, staffLogin_createServerFn_handler, staffLogout_createServerFn_handler, staffMe_createServerFn_handler, upsertStaff_createServerFn_handler };
