import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as number, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-B4eiFVZT.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var lineSchema = object({
	key: string(),
	productId: number().int(),
	name: string(),
	sizeLabel: string().optional(),
	qty: number().int().positive(),
	unitPrice: number().int().nonnegative(),
	included: string().optional()
});
var placeOrder = createServerFn({ method: "POST" }).validator(object({
	name: string().min(2).max(60),
	phone: string().min(10).max(20),
	address: string().max(200).default(""),
	notes: string().max(300).default(""),
	fulfillment: _enum(["delivery", "pickup"]),
	member: boolean().default(false),
	items: array(lineSchema).min(1)
})).handler(createSsrRpc("616ba3bf5d2a7856b818c689f27be868bfbc256dac26a96205219f9dc50f2448"));
var listOrders = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(createSsrRpc("ae3dabcd4738abf04f1a2138df03b06b2484fc2c34757332f736ddea543a74c6"));
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
})).handler(createSsrRpc("71ba35fe1e2894bed0322b01cf9bb0c0002c0bcc1b426a2ace29db6fd7299996"));
var getSettings = createServerFn({ method: "GET" }).handler(createSsrRpc("9feac6f0edae43abbdfcfc0b3a8bf521a208a90d85b999c78d758e44bdfc3b31"));
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
})).handler(createSsrRpc("2f17307060163fdb5778d4830497c3d4042156500b03c9a1b6a47f1c8a626a9f"));
//#endregion
export { saveSettings as a, placeOrder as i, getSettings as n, updateOrderStatus as o, listOrders as r, createSsrRpc as t };
