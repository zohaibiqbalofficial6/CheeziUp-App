import { t as createServerFn } from "./ssr.mjs";
import { n as DEFAULT_SETTINGS } from "./types-D30gh9XO.mjs";
import { c as mapSettings, f as requireStaff, n as ensureSeeded, o as mapOrder, r as getSql, t as createServerRpc } from "./staff-auth-5nvAu68g.mjs";
import { i as waDigits } from "./utils-BB1OE8cR.mjs";
import { a as number, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-Mjh-SJWr.js
var lineSchema = object({
	key: string(),
	productId: number().int(),
	name: string(),
	sizeLabel: string().optional(),
	qty: number().int().positive(),
	unitPrice: number().int().nonnegative(),
	included: string().optional()
});
function itemLines(items) {
	return items.map((item) => {
		const size = item.sizeLabel ? ` (${item.sizeLabel})` : "";
		return `• ${item.qty}× ${item.name}${size} — Rs ${item.unitPrice * item.qty}`;
	}).join("\n");
}
function buildKitchenTicket(input) {
	return [
		`CHEEZIUP PIZZA ORDER ${input.code}`,
		`Name: ${input.name}`,
		`Phone: ${input.phone}`,
		`Type: ${input.fulfillment === "pickup" ? "Pickup" : "Delivery"}`,
		input.fulfillment === "delivery" ? `Address: ${input.address}` : null,
		input.member ? "Member card: Yes" : "Member card: No",
		"",
		itemLines(input.items),
		"",
		`Total: Rs ${input.total}`,
		input.notes ? `Notes: ${input.notes}` : null,
		"",
		"Please confirm this order. Thank you."
	].filter(Boolean).join("\n");
}
function buildCustomerUpdate(order, status) {
	const intro = `Salaam ${order.customerName}, Cheeziup Pizza order ${order.code}`;
	const body = itemLines(order.items);
	const total = `Total: Rs ${order.totalPkr}`;
	if (status === "preparing") return [
		`${intro} is ACCEPTED.`,
		"We are preparing it now.",
		"",
		body,
		"",
		total,
		order.fulfillment === "delivery" ? `Delivery: ${order.address}` : "Pickup at the shop.",
		"",
		"Thank you for ordering Cheeziup."
	].join("\n");
	if (status === "out") return `${intro} is on the way.\n\n${total}\nSee you soon.`;
	if (status === "done") return `${intro} is ready / completed.\n\n${total}\nThank you. Come again.`;
	if (status === "cancelled") return `${intro} was cancelled. Please call 0325-9909922 if you have a question.`;
	return `${intro} update: ${status}.`;
}
var placeOrder_createServerFn_handler = createServerRpc({
	id: "616ba3bf5d2a7856b818c689f27be868bfbc256dac26a96205219f9dc50f2448",
	name: "placeOrder",
	filename: "src/lib/api/orders.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).validator(object({
	name: string().min(2).max(60),
	phone: string().min(10).max(20),
	address: string().max(200).default(""),
	notes: string().max(300).default(""),
	fulfillment: _enum(["delivery", "pickup"]),
	member: boolean().default(false),
	items: array(lineSchema).min(1)
})).handler(placeOrder_createServerFn_handler, async ({ data }) => {
	if (data.fulfillment === "delivery" && data.address.trim().length < 6) throw new Error("Please add a delivery address.");
	const sql = await getSql();
	await ensureSeeded(sql);
	const total = data.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
	const code = `CU-${Math.floor(1e3 + Math.random() * 9e3)}`;
	const inserted = await sql.query(`insert into orders
        (code, customer_name, customer_phone, address, notes, fulfillment, member, items, total_pkr, status)
       values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,'new')
       returning id`, [
		code,
		data.name.trim(),
		data.phone.trim(),
		data.address.trim(),
		data.notes.trim(),
		data.fulfillment,
		data.member,
		JSON.stringify(data.items),
		total
	]);
	const settingsRows = await sql`
      select value from settings where key = 'restaurant'
    `;
	const settings = settingsRows[0] ? mapSettings(settingsRows[0].value) : DEFAULT_SETTINGS;
	const message = buildKitchenTicket({
		code,
		name: data.name.trim(),
		phone: data.phone.trim(),
		address: data.address.trim(),
		notes: data.notes.trim(),
		fulfillment: data.fulfillment,
		member: data.member,
		items: data.items,
		total
	});
	const waUrl = `https://wa.me/${waDigits(settings.whatsapp)}?text=${encodeURIComponent(message)}`;
	return {
		id: inserted[0].id,
		code,
		total,
		waUrl
	};
});
var listOrders_createServerFn_handler = createServerRpc({
	id: "ae3dabcd4738abf04f1a2138df03b06b2484fc2c34757332f736ddea543a74c6",
	name: "listOrders",
	filename: "src/lib/api/orders.ts"
}, (opts) => listOrders.__executeServer(opts));
var listOrders = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(listOrders_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await requireStaff(sql, data.token);
	return (await sql`
      select * from orders
      order by created_at desc
      limit 80
    `).map((row) => mapOrder(row));
});
var updateOrderStatus_createServerFn_handler = createServerRpc({
	id: "71ba35fe1e2894bed0322b01cf9bb0c0002c0bcc1b426a2ace29db6fd7299996",
	name: "updateOrderStatus",
	filename: "src/lib/api/orders.ts"
}, (opts) => updateOrderStatus.__executeServer(opts));
var updateOrderStatus = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	id: number().int(),
	status: _enum([
		"new",
		"preparing",
		"out",
		"done",
		"cancelled"
	])
})).handler(updateOrderStatus_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await requireStaff(sql, data.token);
	await sql`update orders set status = ${data.status} where id = ${data.id}`;
	const row = (await sql`
      select * from orders where id = ${data.id}
    `)[0];
	if (!row) return {
		ok: true,
		customerWaUrl: null
	};
	const order = mapOrder(row);
	return {
		ok: true,
		customerWaUrl: `https://wa.me/${waDigits(order.customerPhone)}?text=${encodeURIComponent(buildCustomerUpdate(order, data.status))}`,
		status: data.status
	};
});
var getSettings_createServerFn_handler = createServerRpc({
	id: "9feac6f0edae43abbdfcfc0b3a8bf521a208a90d85b999c78d758e44bdfc3b31",
	name: "getSettings",
	filename: "src/lib/api/orders.ts"
}, (opts) => getSettings.__executeServer(opts));
var getSettings = createServerFn({ method: "GET" }).handler(getSettings_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const rows = await sql`select value from settings where key = 'restaurant'`;
	return rows[0] ? mapSettings(rows[0].value) : DEFAULT_SETTINGS;
});
var saveSettings_createServerFn_handler = createServerRpc({
	id: "2f17307060163fdb5778d4830497c3d4042156500b03c9a1b6a47f1c8a626a9f",
	name: "saveSettings",
	filename: "src/lib/api/orders.ts"
}, (opts) => saveSettings.__executeServer(opts));
var saveSettings = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	settings: object({
		name: string().min(2).max(80),
		tagline: string().max(120),
		address: string().min(8).max(240),
		hours: string().min(4).max(80),
		phones: array(string()).min(1).max(6),
		whatsapp: string().min(10).max(20),
		announcement: string().max(240),
		deliveryNote: string().max(240),
		memberPerk: string().max(240)
	})
})).handler(saveSettings_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await requireStaff(sql, data.token);
	await sql.query(`insert into settings (key, value) values ('restaurant', $1::jsonb)
       on conflict (key) do update set value = excluded.value`, [JSON.stringify(data.settings)]);
	return { ok: true };
});
//#endregion
export { getSettings_createServerFn_handler, listOrders_createServerFn_handler, placeOrder_createServerFn_handler, saveSettings_createServerFn_handler, updateOrderStatus_createServerFn_handler };
