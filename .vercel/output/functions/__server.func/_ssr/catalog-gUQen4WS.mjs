import { t as createServerFn } from "./ssr.mjs";
import { f as requireStaff, n as ensureSeeded, r as getSql, s as mapProduct, t as createServerRpc } from "./staff-auth-CA6X_494.mjs";
import { r as slugify } from "./utils-BB1OE8cR.mjs";
import { a as number, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-gUQen4WS.js
var sizeSchema = object({
	id: string(),
	label: string(),
	inches: number().optional(),
	price: number().int().nonnegative(),
	memberPrice: number().int().nonnegative().optional()
});
var getCatalog_createServerFn_handler = createServerRpc({
	id: "ae614d38815bcd25a393d3146b9081b90f11cf7e6c1d021d71f848a692b1a989",
	name: "getCatalog",
	filename: "src/lib/api/catalog.ts"
}, (opts) => getCatalog.__executeServer(opts));
var getCatalog = createServerFn({ method: "GET" }).handler(getCatalog_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	return (await sql`
    select * from products
    where active = true
    order by sort_order asc, id asc
  `).map(mapProduct);
});
var getAdminCatalog_createServerFn_handler = createServerRpc({
	id: "f96d50ffe3d16bcb885b7752ffb812af5dea879c1faadc96768468f3d6427481",
	name: "getAdminCatalog",
	filename: "src/lib/api/catalog.ts"
}, (opts) => getAdminCatalog.__executeServer(opts));
var getAdminCatalog = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(getAdminCatalog_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await requireStaff(sql, data.token);
	return (await sql`
      select * from products
      order by sort_order asc, id asc
    `).map(mapProduct);
});
var upsertSchema = object({
	token: string(),
	id: number().int().optional(),
	name: string().min(2).max(80),
	description: string().max(400).default(""),
	category: string().min(2).max(40),
	kind: _enum([
		"item",
		"pizza",
		"deal"
	]),
	imageKey: string().min(2).max(30),
	memberOnly: boolean().default(false),
	featured: boolean().default(false),
	badge: string().max(24).nullable().optional(),
	included: string().max(400).nullable().optional(),
	price: number().int().nonnegative().nullable().optional(),
	sizes: array(sizeSchema).nullable().optional(),
	active: boolean().default(true)
});
var upsertProduct_createServerFn_handler = createServerRpc({
	id: "4abebcb55661d3d92cfa967260c2d84e55185b4a80e5fd5bdc99ab6f0ef4e312",
	name: "upsertProduct",
	filename: "src/lib/api/catalog.ts"
}, (opts) => upsertProduct.__executeServer(opts));
var upsertProduct = createServerFn({ method: "POST" }).validator(upsertSchema).handler(upsertProduct_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await requireStaff(sql, data.token);
	const sizes = data.sizes ? JSON.stringify(data.sizes) : null;
	if (data.id) {
		await sql.query(`update products set
          name=$1, description=$2, category=$3, kind=$4, image_key=$5,
          member_only=$6, featured=$7, badge=$8, included=$9, price=$10,
          sizes=$11::jsonb, active=$12
         where id=$13`, [
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
			data.id
		]);
		return { id: data.id };
	}
	const slug = `${slugify(data.name)}-${Math.floor(Math.random() * 900 + 100)}`;
	const maxSort = await sql`select coalesce(max(sort_order), 0)::int as m from products`;
	return { id: (await sql.query(`insert into products
        (slug, name, description, category, kind, image_key, member_only, featured, badge, included, price, sizes, active, sort_order)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13,$14)
       returning id`, [
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
		(maxSort[0]?.m ?? 0) + 1
	]))[0].id };
});
var deleteProduct_createServerFn_handler = createServerRpc({
	id: "93ea4f802ca22ea6878f8f0564d75b9c1de26ff213df272672ae1a7abc213b95",
	name: "deleteProduct",
	filename: "src/lib/api/catalog.ts"
}, (opts) => deleteProduct.__executeServer(opts));
var deleteProduct = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	id: number().int()
})).handler(deleteProduct_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await requireStaff(sql, data.token);
	await sql`delete from products where id = ${data.id}`;
	return { ok: true };
});
//#endregion
export { deleteProduct_createServerFn_handler, getAdminCatalog_createServerFn_handler, getCatalog_createServerFn_handler, upsertProduct_createServerFn_handler };
