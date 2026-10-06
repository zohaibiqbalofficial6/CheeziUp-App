import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DEFAULT_SETTINGS } from "./types-CKlMGHA6.mjs";
import { t as cn } from "./utils-BB1OE8cR.mjs";
import { n as getSettings } from "./orders-B4eiFVZT.mjs";
import { a as Tag, c as ShoppingBag, g as MapPin, n as UtensilsCrossed, v as House, x as Clock } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storefront-CHerRV9L.js
var import_jsx_runtime = require_jsx_runtime();
var useCart = create()(persist((set, get) => ({
	items: [],
	member: false,
	setMember: (member) => set({ member }),
	add: (line) => {
		const qty = line.qty ?? 1;
		if (get().items.find((item) => item.key === line.key)) {
			set({ items: get().items.map((item) => item.key === line.key ? {
				...item,
				qty: item.qty + qty
			} : item) });
			return;
		}
		set({ items: [...get().items, {
			...line,
			qty
		}] });
	},
	setQty: (key, qty) => {
		if (qty <= 0) {
			set({ items: get().items.filter((item) => item.key !== key) });
			return;
		}
		set({ items: get().items.map((item) => item.key === key ? {
			...item,
			qty
		} : item) });
	},
	clear: () => set({ items: [] })
}), { name: "cheeziup-cart" }));
function cartCount(items) {
	return items.reduce((sum, item) => sum + item.qty, 0);
}
function cartTotal(items) {
	return items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/menu",
		label: "Menu",
		icon: UtensilsCrossed
	},
	{
		to: "/deals",
		label: "Deals",
		icon: Tag
	},
	{
		to: "/visit",
		label: "Visit",
		icon: MapPin
	},
	{
		to: "/checkout",
		label: "Bag",
		icon: ShoppingBag
	}
];
function AppShell({ children, settings }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const items = useCart((s) => s.items);
	const member = useCart((s) => s.member);
	const setMember = useCart((s) => s.setMember);
	const count = cartCount(items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper-noise min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo.png",
							alt: "",
							className: "size-11 rounded-full bg-paper object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-lg tracking-wide",
								children: "Cheeziup"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), settings.hours]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMember(!member),
							className: cn("h-10 rounded-full px-3 text-xs font-semibold tracking-wide", member ? "bg-brand text-paper" : "bg-paper text-muted shadow-[inset_0_0_0_1px_var(--color-line)]"),
							children: member ? "Member on" : "Member"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/checkout",
							className: "relative inline-flex size-11 items-center justify-center rounded-[14px] bg-ink text-paper",
							"aria-label": "Open bag",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-paper",
								children: count
							}) : null]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-5xl px-4 pb-[calc(92px+env(safe-area-inset-bottom))] pt-4",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-5xl grid-cols-5 px-2 py-1.5",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-[14px] text-[11px] font-semibold", active ? "text-brand" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.to === "/checkout" && count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-1.5 -right-2 size-2 rounded-full bg-brand" }) : null]
							}), item.label]
						}, item.to);
					})
				})
			})
		]
	});
}
function Storefront({ children }) {
	const settings = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		settings: settings.data ?? DEFAULT_SETTINGS,
		children
	});
}
//#endregion
export { useCart as i, cartCount as n, cartTotal as r, Storefront as t };
