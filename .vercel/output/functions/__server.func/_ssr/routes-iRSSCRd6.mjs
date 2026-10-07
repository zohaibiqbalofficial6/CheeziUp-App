import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as productPrice, i as HOME_FILTERS, n as DEFAULT_SETTINGS } from "./types-D30gh9XO.mjs";
import { n as formatPkr, t as cn } from "./utils-BB1OE8cR.mjs";
import { n as getSettings } from "./orders-B4eiFVZT.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as useCart, t as Storefront } from "./storefront-C4qBVtZO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$6 } from "./router-5ThLe9Ru.mjs";
import { a as useCatalog, i as byHomeFilter, n as SizeSheet, t as ProductCard } from "./use-catalog-BeVNZel5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-iRSSCRd6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const loaded = Route$6.useLoaderData();
	const { products } = useCatalog(loaded.products);
	const settings = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings(),
		initialData: loaded.settings
	}).data ?? DEFAULT_SETTINGS;
	const featured = products.filter((item) => item.featured).slice(0, 8);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [pizza, setPizza] = (0, import_react.useState)(null);
	const visible = (0, import_react.useMemo)(() => byHomeFilter(products, filter), [products, filter]);
	const add = useCart((s) => s.add);
	const member = useCart((s) => s.member);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Storefront, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-none tracking-wide text-brand",
					children: "Cheeziup Pizza"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl leading-none tracking-wide text-ink",
					children: "Order in Lahore"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm text-muted",
					children: settings.tagline
				})
			] }),
			featured.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex snap-x gap-3 overflow-x-auto pb-1",
				children: featured.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						add({
							key: `p-${product.id}`,
							productId: product.id,
							name: product.name,
							unitPrice: productPrice(product, member),
							included: product.included ?? void 0
						});
						toast.success(`${product.badge ?? product.name} added`);
					},
					className: "w-[min(58vw,220px)] shrink-0 snap-start rounded-[20px] bg-paper p-3 text-left shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg tracking-wide",
							children: product.badge ?? product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl tabular-nums tracking-wide text-brand",
							children: formatPkr(productPrice(product, member))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-3 text-xs leading-5 text-muted",
							children: product.included
						})
					]
				}, product.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-[72px] z-30 -mx-4 bg-bg/95 px-4 py-2 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: HOME_FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(item.id),
						className: cn("h-10 shrink-0 rounded-full px-3.5 text-sm font-semibold", filter === item.id ? "bg-brand text-paper" : "bg-paper text-muted shadow-[inset_0_0_0_1px_var(--color-line)]"),
						children: item.label
					}, item.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3",
				children: visible.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product,
					onConfigure: setPizza
				}, product.id))
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeSheet, {
		product: pizza,
		open: !!pizza,
		onOpenChange: (open) => {
			if (!open) setPizza(null);
		}
	})] });
}
//#endregion
export { Home as component };
