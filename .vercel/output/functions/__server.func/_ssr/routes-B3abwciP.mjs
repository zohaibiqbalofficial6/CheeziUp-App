import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DEFAULT_SETTINGS } from "./types-CKlMGHA6.mjs";
import { n as getSettings } from "./orders-B4eiFVZT.mjs";
import { C as ArrowRight, S as Bike, p as Phone, s as Smartphone } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Storefront } from "./storefront-CHerRV9L.mjs";
import { t as Button } from "./button-CQufJt6k.mjs";
import { i as Route$6 } from "./router-T88XSsFg.mjs";
import { t as Badge } from "./badge-tpcojKSO.mjs";
import { i as useCatalog, n as SizeSheet, t as ProductCard } from "./use-catalog-BtkWLWcI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B3abwciP.js
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
	const [pizza, setPizza] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Storefront, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hero-wash overflow-hidden rounded-[32px] px-5 py-7 text-paper shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "Cheeziup Pizza",
						className: "size-24 shrink-0 rounded-full bg-paper object-cover shadow-[0_12px_30px_-12px_rgb(0,0,0,0.45)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-[0.22em] text-paper/70",
							children: "LAHORE FAST FOOD"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-1 font-display text-4xl leading-none tracking-wide",
							children: ["Cheeziup", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-2xl text-paper/85",
								children: "Pizza & Fast Food"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-sm text-paper/80",
							children: settings.tagline
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/menu",
							children: ["Order now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "border-0 bg-paper/12 text-paper hover:bg-paper/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${settings.phones[0]}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Call"]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-[24px] bg-paper px-4 py-4 shadow-[var(--shadow-card)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: settings.announcement
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					{
						label: "Oven hours",
						value: settings.hours
					},
					{
						label: "Delivery",
						value: "Members free"
					},
					{
						label: "Range",
						value: "Up to 13 km"
					},
					{
						label: "Checkout",
						value: "WhatsApp"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[20px] bg-paper px-3 py-3 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-lg leading-tight tracking-wide",
						children: item.value
					})]
				}, item.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-wide",
					children: "Tonight’s combos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Student takeaway packages from the board"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/deals",
					className: "text-sm font-semibold text-brand",
					children: "All deals"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex snap-x gap-3 overflow-x-auto pb-2",
				children: featured.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-[min(86vw,340px)] shrink-0 snap-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product,
						onConfigure: setPizza
					})
				}, product.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					className: "overflow-hidden rounded-[28px] bg-paper shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[5/3]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/food/pizza.jpg",
							alt: "",
							className: "food-photo h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl tracking-wide",
							children: "Build a pizza"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Small to family · 18 flavours"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Menu" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/deals",
					className: "overflow-hidden rounded-[28px] bg-paper shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[5/3]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/food/burger.jpg",
							alt: "",
							className: "food-photo h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl tracking-wide",
							children: "Burgers & rolls"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Zinger, shawarma, paratha"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "ink",
							children: "Fast"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-[28px] bg-ink px-5 py-5 text-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { className: "mt-1 size-5 text-brand-soft" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-wide",
							children: "How to get the app"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-paper/75",
							children: "Add Cheeziup to your iPhone or Android home screen. Same menu, one tap ordering, no store download needed."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-4",
							variant: "soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/install",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }), " Save to phone"]
							})
						})
					] })]
				})
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
