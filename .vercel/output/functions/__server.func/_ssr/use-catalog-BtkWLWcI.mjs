import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as productPriceLabel, i as productPrice, r as FOOD_IMAGES } from "./types-CKlMGHA6.mjs";
import { n as formatPkr, t as cn } from "./utils-BB1OE8cR.mjs";
import { d as Plus, f as Pizza, m as Minus, n as UtensilsCrossed, o as Soup, u as Sandwich, y as Fish } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as useCart } from "./storefront-CHerRV9L.mjs";
import { t as Button } from "./button-CQufJt6k.mjs";
import { s as getCatalog } from "./router-T88XSsFg.mjs";
import { t as Badge } from "./badge-tpcojKSO.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-catalog-BtkWLWcI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ICONS = {
	pizza: Pizza,
	burger: Sandwich,
	shawarma: UtensilsCrossed,
	fries: UtensilsCrossed,
	biryani: Soup,
	nuggets: UtensilsCrossed,
	fish: Fish,
	roll: UtensilsCrossed,
	sandwich: Sandwich
};
function FoodImage({ imageKey, alt, className }) {
	const src = FOOD_IMAGES[imageKey];
	if (src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: cn("food-photo h-full w-full object-cover", className)
	});
	const Icon = ICONS[imageKey] ?? Pizza;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-full w-full items-center justify-center bg-brand-soft text-brand", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-8" })
	});
}
function ProductCard({ product, onConfigure }) {
	const member = useCart((s) => s.member);
	const items = useCart((s) => s.items);
	const add = useCart((s) => s.add);
	const setQty = useCart((s) => s.setQty);
	const isPizza = product.kind === "pizza";
	const line = items.find((item) => item.productId === product.id && !item.sizeLabel);
	const from = productPriceLabel(product, member);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex gap-3 rounded-[24px] bg-paper p-2.5 shadow-[var(--shadow-card)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-card-hover)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative size-[92px] shrink-0 overflow-hidden rounded-[16px] bg-bg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
				imageKey: product.imageKey,
				alt: product.name
			}), product.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "absolute top-1.5 left-1.5",
				children: product.badge
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg leading-tight tracking-wide text-ink",
						children: product.name
					}), product.memberOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "soft",
						children: "Members"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted",
					children: product.included || product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg tabular-nums tracking-wide text-brand",
						children: isPizza ? `From ${formatPkr(from)}` : formatPkr(from)
					}), isPizza ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => onConfigure?.(product),
						children: "Sizes"
					}) : line ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 rounded-[12px] bg-bg p-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "inline-flex size-9 items-center justify-center rounded-[10px] text-ink",
								onClick: () => setQty(line.key, line.qty - 1),
								"aria-label": "Remove one",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-5 text-center text-sm font-semibold tabular-nums",
								children: line.qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "inline-flex size-9 items-center justify-center rounded-[10px] text-ink",
								onClick: () => setQty(line.key, line.qty + 1),
								"aria-label": "Add one",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => add({
							key: `p-${product.id}`,
							productId: product.id,
							name: product.name,
							unitPrice: productPrice(product, member),
							included: product.included ?? void 0
						}),
						children: "Add"
					})]
				})
			]
		})]
	});
}
function Sheet({ open, onOpenChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		shouldScaleBackground: false,
		children
	});
}
Drawer.Trigger;
function SheetContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[92vh] flex-col rounded-t-[28px] bg-paper outline-none", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1.5 w-12 rounded-full bg-line" }),
			title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
				className: "px-5 pt-4 font-display text-2xl tracking-wide text-ink",
				children: title
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
				className: "sr-only",
				children: "Sheet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-3",
				children
			})
		]
	})] });
}
function SizeSheet({ product, open, onOpenChange }) {
	const member = useCart((s) => s.member);
	const add = useCart((s) => s.add);
	const [sizeId, setSizeId] = (0, import_react.useState)(product?.sizes?.[0]?.id ?? "S");
	const sizes = product?.sizes ?? [];
	const selected = sizes.find((size) => size.id === sizeId) ?? sizes[0];
	(0, import_react.useEffect)(() => {
		setSizeId(product?.sizes?.[0]?.id ?? "S");
	}, [product?.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			title: product?.name ?? "Pizza",
			children: product ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-[20px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[16/9]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
								imageKey: product.imageKey,
								alt: product.name
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: sizes.map((size) => {
							const price = productPrice(product, member, size.id);
							const active = selected?.id === size.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSizeId(size.id),
								className: cn("rounded-[16px] bg-bg px-3 py-3 text-left transition-[box-shadow,background-color] duration-150", active ? "bg-brand-soft shadow-[inset_0_0_0_1.5px_var(--color-brand)]" : "shadow-[inset_0_0_0_1px_var(--color-line)]"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg tracking-wide",
										children: size.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [size.inches, "\" pizza"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-semibold tabular-nums text-brand",
										children: formatPkr(price)
									})
								]
							}, size.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full",
						size: "lg",
						onClick: () => {
							if (!selected) return;
							add({
								key: `p-${product.id}-${selected.id}`,
								productId: product.id,
								name: product.name,
								sizeLabel: `${selected.label} ${selected.inches}"`,
								unitPrice: productPrice(product, member, selected.id)
							});
							onOpenChange(false);
						},
						children: ["Add ", selected ? formatPkr(productPrice(product, member, selected.id)) : ""]
					})
				]
			}) : null
		})
	});
}
function useCatalog(initialData) {
	const member = useCart((s) => s.member);
	const query = useQuery({
		queryKey: ["catalog"],
		queryFn: () => getCatalog(),
		initialData
	});
	const products = (query.data ?? []).filter((product) => member ? true : !product.memberOnly);
	return {
		...query,
		products,
		all: query.data ?? []
	};
}
function byCategory(products, slug) {
	return products.filter((product) => product.category === slug);
}
//#endregion
export { useCatalog as i, SizeSheet as n, byCategory as r, ProductCard as t };
