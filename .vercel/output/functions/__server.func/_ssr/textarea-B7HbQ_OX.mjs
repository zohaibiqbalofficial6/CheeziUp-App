import "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-BB1OE8cR.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-[12px] bg-paper px-3 text-sm text-ink shadow-[inset_0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] placeholder:text-faint focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-brand)] disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-semibold uppercase tracking-[0.14em] text-muted", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-[12px] bg-paper px-3 py-2.5 text-sm text-ink shadow-[inset_0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] placeholder:text-faint focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-brand)] disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { Label as n, Textarea as r, Input as t };
