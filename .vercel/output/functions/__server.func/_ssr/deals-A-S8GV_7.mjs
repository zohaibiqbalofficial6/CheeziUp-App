import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useCart, t as Storefront } from "./storefront-C4qBVtZO.mjs";
import { r as Route$4 } from "./router-5ThLe9Ru.mjs";
import { a as useCatalog, n as SizeSheet, r as byCategory, t as ProductCard } from "./use-catalog-BeVNZel5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deals-A-S8GV_7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GROUPS = [
	{
		slug: "student",
		title: "Student takeaway",
		note: "Built for sharing after class"
	},
	{
		slug: "hot",
		title: "Hot deals",
		note: "Unlock with member card"
	},
	{
		slug: "two-pizza",
		title: "Two pizza deals",
		note: "Members, with drinks"
	},
	{
		slug: "party",
		title: "Party & birthday",
		note: "Pizzas, burgers, cake, drinks"
	}
];
function DealsPage() {
	const loaded = Route$4.useLoaderData();
	const { products } = useCatalog(loaded);
	const member = useCart((s) => s.member);
	const [pizza, setPizza] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Storefront, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.2em] text-muted uppercase",
				children: "Offers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide",
				children: "Deals"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: member ? "Member prices and locked combos are visible." : "Turn on Member in the header to see card-only deals."
			})
		] }), GROUPS.map((group) => {
			const items = byCategory(products, group.slug);
			if (items.length === 0) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: group.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: group.note
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: items.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product,
						onConfigure: setPizza
					}, product.id))
				})]
			}, group.slug);
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeSheet, {
		product: pizza,
		open: !!pizza,
		onOpenChange: (open) => {
			if (!open) setPizza(null);
		}
	})] });
}
//#endregion
export { DealsPage as component };
