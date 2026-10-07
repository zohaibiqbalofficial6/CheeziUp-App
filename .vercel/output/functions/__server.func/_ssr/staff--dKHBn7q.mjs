import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { n as DEFAULT_SETTINGS, r as FOOD_IMAGES, t as CATEGORIES } from "./types-D30gh9XO.mjs";
import { n as formatPkr, t as cn } from "./utils-BB1OE8cR.mjs";
import { a as number, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
import { a as saveSettings, n as getSettings, o as updateOrderStatus, r as listOrders, t as createSsrRpc } from "./orders-B4eiFVZT.mjs";
import { _ as Delete, h as LogOut, t as X } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Button } from "./button-CQufJt6k.mjs";
import { i as openWhatsApp, n as Label, r as Textarea, t as Input } from "./whatsapp-IqurCOT-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as deleteProduct, c as upsertProduct, o as getAdminCatalog } from "./router-5ThLe9Ru.mjs";
import { t as Badge } from "./badge-tpcojKSO.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff--dKHBn7q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
function DialogContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/45 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 max-h-[88vh] w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[28px] bg-paper p-5 shadow-[var(--shadow-card)] outline-none", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-2xl tracking-wide",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				className: "inline-flex size-10 items-center justify-center rounded-[12px] text-muted hover:bg-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), children]
	})] });
}
var Tabs = Root2;
var TabsList = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	className: cn("flex gap-1 overflow-x-auto rounded-[16px] bg-bg p-1 shadow-[inset_0_0_0_1px_var(--color-line)]", className),
	...props
});
var TabsTrigger = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	className: cn("inline-flex h-10 shrink-0 items-center justify-center rounded-[12px] px-3 text-sm font-semibold text-muted transition-colors data-[state=active]:bg-paper data-[state=active]:text-ink data-[state=active]:shadow-[var(--shadow-card)]", className),
	...props
});
var TabsContent = Content;
var staffLogin = createServerFn({ method: "POST" }).validator(object({ pin: string().min(4).max(8) })).handler(createSsrRpc("db3f4025477eee80f240eb975ac80f5d51560274ce7cc4cb34440fef09e45578"));
var staffMe = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(createSsrRpc("d2eb8d9f98675201db38c9382ad537b5f78f1d6dab7a96eb6a3e6e83f4a305b9"));
var staffLogout = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(createSsrRpc("b07e978163deacac8ea750fea6ab3c97ea7ebeac1b805c20c4eb35ef0ac7f4ab"));
var listStaff = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(createSsrRpc("8d4e4b401f7ef25c93d9c50227e2c9ccfaca7af686dbb95d2ba43951ee98b006"));
var upsertStaff = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	id: number().int().optional(),
	name: string().min(2).max(40),
	pin: string().min(4).max(8).optional(),
	role: _enum(["owner", "manager"]),
	active: boolean().default(true)
})).handler(createSsrRpc("c266f3f16f34bdb10788c662dc4ba97edceb433bb136d30caef0331f0a7d7064"));
var deleteStaff = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	id: number().int()
})).handler(createSsrRpc("42d84fe500fa3d4af2e65baa11f0e712504f5860a750d85474db9cc651338a27"));
var useStaffSession = create()(persist((set) => ({
	token: null,
	staff: null,
	setSession: (token, staff) => set({
		token,
		staff
	}),
	clear: () => set({
		token: null,
		staff: null
	})
}), { name: "cheeziup-staff" }));
function StaffPage() {
	const token = useStaffSession((s) => s.token);
	const staff = useStaffSession((s) => s.staff);
	const setSession = useStaffSession((s) => s.setSession);
	const clear = useStaffSession((s) => s.clear);
	const me = useQuery({
		queryKey: ["staff-me", token],
		queryFn: () => staffMe({ data: { token } }),
		enabled: !!token,
		retry: false
	});
	if (!token || me.isError) {
		if (me.isError && token) clear();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinGate, { onLogin: (next) => setSession(next.token, next.staff) });
	}
	const profile = me.data?.staff ?? staff;
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinGate, { onLogin: (next) => setSession(next.token, next.staff) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper-noise min-h-dvh bg-bg text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-line/70 bg-bg/90 px-4 py-3 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "",
						className: "size-10 rounded-full bg-paper object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg tracking-wide",
						children: "Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							profile.name,
							" · ",
							profile.role
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Shop"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: async () => {
								await staffLogout({ data: { token } });
								clear();
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-5xl px-4 py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "orders",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "orders",
								children: "Orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "menu",
								children: "Menu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "settings",
								children: "Shop"
							}),
							profile.role === "owner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "staff",
								children: "Staff"
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "orders",
						className: "pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersPanel, { token })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "menu",
						className: "pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPanel, { token })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "settings",
						className: "pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, { token })
					}),
					profile.role === "owner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "staff",
						className: "pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffPanel, { token })
					}) : null
				]
			})
		})]
	});
}
function PinGate({ onLogin }) {
	const [pin, setPin] = (0, import_react.useState)("");
	const login = useMutation({
		mutationFn: () => staffLogin({ data: { pin } }),
		onSuccess: onLogin,
		onError: (error) => {
			toast.error(error.message);
			setPin("");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-wash flex min-h-dvh flex-col items-center justify-center px-5 text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/logo.png",
				alt: "Cheeziup",
				className: "size-24 rounded-full bg-paper object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 font-display text-4xl tracking-wide",
				children: "Admin PIN"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-paper/75",
				children: "Owner and manager only. Customers stay on the shop."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex gap-2",
				children: Array.from({ length: Math.max(4, pin.length) }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-3 rounded-full", index < pin.length ? "bg-paper" : "bg-paper/25") }, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid w-full max-w-xs grid-cols-3 gap-2",
				children: [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
					"del",
					"0",
					"go"
				].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-16 rounded-[18px] bg-paper/12 text-xl font-semibold text-paper transition-colors hover:bg-paper/20",
					onClick: () => {
						if (key === "del") setPin((value) => value.slice(0, -1));
						else if (key === "go") {
							if (pin.length < 4) {
								toast.error("Enter a 4–8 digit PIN.");
								return;
							}
							login.mutate();
						} else setPin((value) => (value + key).slice(0, 8));
					},
					children: key === "del" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete, { className: "mx-auto size-5" }) : key === "go" ? "OK" : key
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-8 text-sm text-paper/70",
				children: "Back to shop"
			})
		]
	});
}
function OrdersPanel({ token }) {
	const queryClient = useQueryClient();
	const orders = useQuery({
		queryKey: ["orders", token],
		queryFn: () => listOrders({ data: { token } }),
		refetchInterval: 8e3
	});
	const update = useMutation({
		mutationFn: (input) => updateOrderStatus({ data: {
			token,
			...input
		} }),
		onSuccess: (result) => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			if (result.customerWaUrl) openWhatsApp(result.customerWaUrl);
			toast.success("Status saved. WhatsApp is opening to message the customer.");
		},
		onError: (error) => toast.error(error.message)
	});
	if (!orders.data?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "No orders yet. Customer tickets land here after WhatsApp checkout." });
	const actions = [
		{
			status: "preparing",
			label: "Accept"
		},
		{
			status: "out",
			label: "On the way"
		},
		{
			status: "done",
			label: "Done"
		},
		{
			status: "cancelled",
			label: "Cancel"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: orders.data.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-[24px] bg-paper p-4 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tracking-wide",
						children: order.code
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							order.customerName,
							" · ",
							order.customerPhone
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: order.status === "new" ? "new" : order.status })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						order.fulfillment,
						order.address ? ` · ${order.address}` : "",
						order.member ? " · member" : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						item.qty,
						"× ",
						item.name,
						item.sizeLabel ? ` (${item.sizeLabel})` : ""
					] }, item.key))
				}),
				order.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: ["Notes: ", order.notes]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-xl tabular-nums text-brand",
					children: formatPkr(order.totalPkr)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: order.status === action.status ? "default" : "outline",
						disabled: update.isPending,
						onClick: () => update.mutate({
							id: order.id,
							status: action.status
						}),
						children: action.label
					}, action.status))
				})
			]
		}, order.id))
	});
}
function MenuPanel({ token }) {
	const queryClient = useQueryClient();
	const catalog = useQuery({
		queryKey: ["admin-catalog", token],
		queryFn: () => getAdminCatalog({ data: { token } })
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const save = useMutation({
		mutationFn: () => upsertProduct({ data: {
			token,
			id: editing?.id,
			name: editing?.name ?? "",
			description: editing?.description ?? "",
			category: editing?.category ?? "student",
			kind: editing?.kind ?? "deal",
			imageKey: editing?.imageKey ?? "pizza",
			memberOnly: editing?.memberOnly ?? false,
			featured: editing?.featured ?? false,
			badge: editing?.badge ?? null,
			included: editing?.included ?? editing?.description ?? null,
			price: editing?.kind === "pizza" ? null : editing?.price ?? 0,
			sizes: editing?.kind === "pizza" ? editing?.sizes ?? defaultPizzaSizes() : null,
			active: editing?.active ?? true
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-catalog"] });
			queryClient.invalidateQueries({ queryKey: ["catalog"] });
			setEditing(null);
			toast.success("Saved. Customers can see it now.");
		},
		onError: (error) => toast.error(error.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteProduct({ data: {
			token,
			id
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-catalog"] });
			queryClient.invalidateQueries({ queryKey: ["catalog"] });
			toast.success("Removed");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Add deals, pizzas, and items here. Turn off “Visible to customers” to hide something without deleting it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setEditing({
					name: "",
					description: "",
					category: "student",
					kind: "deal",
					imageKey: "pizza",
					price: 0,
					badge: "Deal",
					memberOnly: false,
					featured: true,
					active: true
				}),
				children: "Add deal or item"
			}),
			(catalog.data ?? []).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 rounded-[20px] bg-paper p-3 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: product.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						product.category,
						" · ",
						product.active ? "live" : "hidden",
						product.price != null ? ` · ${formatPkr(product.price)}` : "",
						product.featured ? " · home" : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setEditing(product),
						children: "Edit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => remove.mutate(product.id),
						children: "Remove"
					})]
				})]
			}, product.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editing,
				onOpenChange: () => setEditing(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: editing?.id ? "Edit item" : "New deal or item",
					children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.name ?? "",
									onChange: (e) => setEditing({
										...editing,
										name: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "What is included",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: editing.description ?? "",
									onChange: (e) => setEditing({
										...editing,
										description: e.target.value,
										included: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Type",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "h-11 rounded-[12px] bg-paper px-3 text-sm shadow-[inset_0_0_0_1px_var(--color-line)]",
									value: editing.kind ?? "deal",
									onChange: (e) => {
										const kind = e.target.value;
										setEditing({
											...editing,
											kind,
											sizes: kind === "pizza" ? editing.sizes ?? defaultPizzaSizes() : null
										});
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "deal",
											children: "Deal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "item",
											children: "Item"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "pizza",
											children: "Pizza"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "h-11 rounded-[12px] bg-paper px-3 text-sm shadow-[inset_0_0_0_1px_var(--color-line)]",
									value: editing.category ?? "student",
									onChange: (e) => setEditing({
										...editing,
										category: e.target.value
									}),
									children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: category.slug,
										children: category.label
									}, category.slug))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Photo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "h-11 rounded-[12px] bg-paper px-3 text-sm shadow-[inset_0_0_0_1px_var(--color-line)]",
									value: editing.imageKey ?? "pizza",
									onChange: (e) => setEditing({
										...editing,
										imageKey: e.target.value
									}),
									children: Object.keys(FOOD_IMAGES).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: key,
										children: key
									}, key))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Badge (optional)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.badge ?? "",
									onChange: (e) => setEditing({
										...editing,
										badge: e.target.value || null
									}),
									placeholder: "Deal 21"
								})
							}),
							editing.kind !== "pizza" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Price (Rs)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: editing.price ?? 0,
									onChange: (e) => setEditing({
										...editing,
										price: Number(e.target.value)
									})
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: (editing.sizes ?? defaultPizzaSizes()).map((size, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${size.label} Rs`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: size.price,
										onChange: (e) => {
											const sizes = [...editing.sizes ?? defaultPizzaSizes()];
											sizes[index] = {
												...sizes[index],
												price: Number(e.target.value)
											};
											setEditing({
												...editing,
												sizes
											});
										}
									})
								}, size.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!editing.memberOnly,
									onChange: (e) => setEditing({
										...editing,
										memberOnly: e.target.checked
									})
								}), "Members only"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!editing.featured,
									onChange: (e) => setEditing({
										...editing,
										featured: e.target.checked
									})
								}), "Show on home deals strip"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: editing.active !== false,
									onChange: (e) => setEditing({
										...editing,
										active: e.target.checked
									})
								}), "Visible to customers"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => save.mutate(),
								disabled: save.isPending || (editing.name ?? "").trim().length < 2,
								children: "Save"
							})
						]
					}) : null
				})
			})
		]
	});
}
function defaultPizzaSizes() {
	return [
		{
			id: "S",
			label: "Small",
			inches: 8,
			price: 700
		},
		{
			id: "M",
			label: "Medium",
			inches: 11,
			price: 1250
		},
		{
			id: "L",
			label: "Large",
			inches: 14,
			price: 1650
		},
		{
			id: "F",
			label: "Family",
			inches: 16,
			price: 1850
		}
	];
}
function SettingsPanel({ token }) {
	const queryClient = useQueryClient();
	const loaded = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings()
	});
	const [form, setForm] = (0, import_react.useState)(null);
	const settings = form ?? loaded.data ?? DEFAULT_SETTINGS;
	const save = useMutation({
		mutationFn: () => saveSettings({ data: {
			token,
			settings
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] });
			toast.success("Shop details saved");
		},
		onError: (error) => toast.error(error.message)
	});
	function patch(partial) {
		setForm({
			...settings,
			...partial
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 rounded-[24px] bg-paper p-4 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Restaurant name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.name,
					onChange: (e) => patch({ name: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tagline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.tagline,
					onChange: (e) => patch({ tagline: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Address",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: settings.address,
					onChange: (e) => patch({ address: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hours",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.hours,
					onChange: (e) => patch({ hours: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "WhatsApp number",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.whatsapp,
					onChange: (e) => patch({ whatsapp: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Phones (comma separated)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.phones.join(", "),
					onChange: (e) => patch({ phones: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Homepage announcement",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: settings.announcement,
					onChange: (e) => patch({ announcement: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Delivery note",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: settings.deliveryNote,
					onChange: (e) => patch({ deliveryNote: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Member perk",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: settings.memberPerk,
					onChange: (e) => patch({ memberPerk: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => save.mutate(),
				disabled: save.isPending,
				children: "Save shop"
			})
		]
	});
}
function StaffPanel({ token }) {
	const queryClient = useQueryClient();
	const staff = useQuery({
		queryKey: ["staff-list", token],
		queryFn: () => listStaff({ data: { token } })
	});
	const [name, setName] = (0, import_react.useState)("");
	const [pin, setPin] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: () => upsertStaff({ data: {
			token,
			name,
			pin,
			role: "manager",
			active: true
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["staff-list"] });
			setName("");
			setPin("");
			toast.success("Staff added");
		},
		onError: (error) => toast.error(error.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteStaff({ data: {
			token,
			id
		} }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff-list"] }),
		onError: (error) => toast.error(error.message)
	});
	const rename = useMutation({
		mutationFn: (input) => upsertStaff({ data: {
			token,
			id: input.id,
			name: input.name,
			pin: input.pin,
			role: input.role,
			active: true
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["staff-list"] });
			toast.success("Saved");
		},
		onError: (error) => toast.error(error.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 rounded-[24px] bg-paper p-4 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-wide",
					children: "Add manager"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Manager name"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "PIN (4-8 digits)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: pin,
						onChange: (e) => setPin(e.target.value),
						inputMode: "numeric",
						placeholder: "e.g. 2580"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => add.mutate(),
					disabled: add.isPending,
					children: "Add login"
				})
			]
		}), (staff.data ?? []).map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffRow, {
			person,
			onSave: (next) => rename.mutate(next),
			onDelete: () => remove.mutate(person.id)
		}, person.id))]
	});
}
function StaffRow({ person, onSave, onDelete }) {
	const [name, setName] = (0, import_react.useState)(person.name);
	const [pin, setPin] = (0, import_react.useState)("");
	const locked = person.role === "owner";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 rounded-[20px] bg-paper p-4 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [
						person.name,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-muted",
							children: ["· ", person.role]
						})
					]
				}), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "soft",
					children: "Owner"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: name,
				onChange: (e) => setName(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: pin,
				onChange: (e) => setPin(e.target.value),
				placeholder: "New PIN (optional)",
				inputMode: "numeric"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => onSave({
						id: person.id,
						name,
						pin: pin || void 0,
						role: person.role
					}),
					children: "Save"
				}), locked ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onDelete,
					children: "Remove"
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Empty({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-[24px] bg-paper px-4 py-8 text-center text-sm text-muted shadow-[var(--shadow-card)]",
		children: text
	});
}
//#endregion
export { StaffPage as component };
