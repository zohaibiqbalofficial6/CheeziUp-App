import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Share, o as Smartphone } from "../_libs/lucide-react.mjs";
import { t as Storefront } from "./storefront-C4qBVtZO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/install-DfSzVSgs.js
var import_jsx_runtime = require_jsx_runtime();
function InstallPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Storefront, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.2em] text-muted uppercase",
					children: "Home screen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-wide",
					children: "Install Cheeziup"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "This is a real restaurant app for iPhone and Android. Customers open the link once, save it, and order from the icon like any other app."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[28px] bg-paper p-5 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "iPhone"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-3 space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. Open this page in Safari." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. Tap the Share button at the bottom." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Choose Add to Home Screen, then Add." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. The Cheeziup icon appears with your other apps." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[28px] bg-paper p-5 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Android"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-3 space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. Open this page in Chrome." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. Tap the menu (three dots)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Tap Add to Home screen or Install app." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. Confirm. Cheeziup opens full-screen from the icon." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "After you publish, send customers the app link on WhatsApp. They save it once and order whenever they like."
			})
		]
	}) });
}
//#endregion
export { InstallPage as component };
