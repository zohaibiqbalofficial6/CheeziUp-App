import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DEFAULT_SETTINGS } from "./types-CKlMGHA6.mjs";
import { n as formatPkr, t as cn } from "./utils-BB1OE8cR.mjs";
import { i as placeOrder, n as getSettings } from "./orders-B4eiFVZT.mjs";
import { d as Plus, i as Trash2, m as Minus } from "../_libs/lucide-react.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as useCart, n as cartCount, r as cartTotal, t as Storefront } from "./storefront-CHerRV9L.mjs";
import { t as Button } from "./button-CQufJt6k.mjs";
import { n as Label, r as Textarea, t as Input } from "./textarea-B7HbQ_OX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-CowP_JWZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const items = useCart((s) => s.items);
	const member = useCart((s) => s.member);
	const setQty = useCart((s) => s.setQty);
	const clear = useCart((s) => s.clear);
	const settings = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings()
	}).data ?? DEFAULT_SETTINGS;
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [fulfillment, setFulfillment] = (0, import_react.useState)("delivery");
	const [done, setDone] = (0, import_react.useState)(null);
	const order = useMutation({
		mutationFn: () => placeOrder({ data: {
			name,
			phone,
			address,
			notes,
			fulfillment,
			member,
			items
		} }),
		onSuccess: (result) => {
			clear();
			setDone(result);
			window.open(result.waUrl, "_blank", "noopener,noreferrer");
		},
		onError: (error) => toast.error(error.message)
	});
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Storefront, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md rounded-[28px] bg-paper px-5 py-8 text-center shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.2em] text-muted uppercase",
				children: "Order sent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-wide",
				children: done.code
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"WhatsApp opened with the ticket for ",
					formatPkr(done.total),
					". If it didn’t pop up, send it from the button below."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "whatsapp",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: done.waUrl,
						target: "_blank",
						rel: "noreferrer",
						children: "Open WhatsApp ticket"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						children: "Order again"
					})
				})]
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Storefront, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold tracking-[0.2em] text-muted uppercase",
			children: "Bag"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-wide",
			children: "Checkout"
		})] }), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[28px] bg-paper px-5 py-10 text-center shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-wide",
					children: "Bag is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Add a pizza, deal, or burger first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						children: "Browse menu"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "space-y-2",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3 rounded-[20px] bg-paper p-3 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: item.name
							}),
							item.sizeLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: item.sizeLabel
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-semibold tabular-nums text-brand",
								children: formatPkr(item.unitPrice * item.qty)
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 rounded-[12px] bg-bg p-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "inline-flex size-9 items-center justify-center",
								onClick: () => setQty(item.key, item.qty - 1),
								children: item.qty === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-5 text-center text-sm font-semibold tabular-nums",
								children: item.qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "inline-flex size-9 items-center justify-center",
								onClick: () => setQty(item.key, item.qty + 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							})
						]
					})]
				}, item.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 rounded-[24px] bg-paper p-4 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: ["delivery", "pickup"].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFulfillment(option),
							className: cn("h-11 rounded-[14px] text-sm font-semibold capitalize", fulfillment === option ? "bg-brand text-paper" : "bg-bg text-muted"),
							children: option
						}, option))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Your name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "phone",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							placeholder: "03xx xxxxxxx",
							inputMode: "tel"
						})]
					}),
					fulfillment === "delivery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "address",
							children: "Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "address",
							value: address,
							onChange: (e) => setAddress(e.target.value),
							placeholder: "House, street, area"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Kitchen notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							placeholder: "Spice, no mayo, extra dip…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: settings.deliveryNote
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-[68px] z-30 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-[20px] bg-ink px-4 py-3 text-paper shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-paper/60",
						children: [
							cartCount(items),
							" items",
							member ? " · member" : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tabular-nums tracking-wide",
						children: formatPkr(cartTotal(items))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "whatsapp",
						disabled: order.isPending,
						onClick: () => order.mutate(),
						children: order.isPending ? "Sending…" : "Send to WhatsApp"
					})]
				})
			})
		] })]
	}) });
}
//#endregion
export { CheckoutPage as component };
