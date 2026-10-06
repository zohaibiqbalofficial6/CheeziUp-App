import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as CATEGORIES } from "./types-CKlMGHA6.mjs";
import { t as cn } from "./utils-BB1OE8cR.mjs";
import { t as Storefront } from "./storefront-CHerRV9L.mjs";
import { n as Route$2 } from "./router-T88XSsFg.mjs";
import { i as useCatalog, n as SizeSheet, r as byCategory, t as ProductCard } from "./use-catalog-BtkWLWcI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-DLGmbEWX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MenuPage() {
	const loaded = Route$2.useLoaderData();
	const { products } = useCatalog(loaded);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [pizza, setPizza] = (0, import_react.useState)(null);
	const groups = (0, import_react.useMemo)(() => {
		return CATEGORIES.filter((category) => filter === "all" ? true : category.slug === filter).map((category) => ({
			...category,
			items: byCategory(products, category.slug)
		})).filter((group) => group.items.length > 0);
	}, [products, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Storefront, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.2em] text-muted uppercase",
				children: "The board"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide",
				children: "Full menu"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-[72px] z-30 -mx-4 bg-bg/95 px-4 py-2 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: filter === "all",
						onClick: () => setFilter("all"),
						children: "All"
					}), CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: filter === category.slug,
						onClick: () => setFilter(category.slug),
						children: category.label
					}, category.slug))]
				})
			}),
			groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: group.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: group.blurb
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: group.items.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product,
						onConfigure: setPizza
					}, product.id))
				})]
			}, group.slug))
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeSheet, {
		product: pizza,
		open: !!pizza,
		onOpenChange: (open) => {
			if (!open) setPizza(null);
		}
	})] });
}
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: cn("h-10 shrink-0 rounded-full px-3.5 text-sm font-semibold", active ? "bg-brand text-paper" : "bg-paper text-muted shadow-[inset_0_0_0_1px_var(--color-line)]"),
		children
	});
}
//#endregion
export { MenuPage as component };
