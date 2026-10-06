import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-BB1OE8cR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-tpcojKSO.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "brand", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide", tone === "brand" && "bg-brand text-paper", tone === "ink" && "bg-ink text-paper", tone === "soft" && "bg-brand-soft text-brand-dark", tone === "wa" && "bg-wa/15 text-wa", className),
		...props
	});
}
//#endregion
export { Badge as t };
