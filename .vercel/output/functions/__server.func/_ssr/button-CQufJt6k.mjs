import "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-BB1OE8cR.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-sm font-semibold transition-[transform,background-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-brand text-paper shadow-[0_8px_18px_-10px_rgb(180,35,24,0.8)] hover:bg-brand-dark",
			secondary: "bg-ink text-paper hover:bg-ink/90",
			outline: "bg-paper text-ink shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface",
			ghost: "text-ink hover:bg-brand-soft/60",
			whatsapp: "bg-wa text-wa-fg hover:bg-wa/90",
			soft: "bg-brand-soft text-brand-dark hover:bg-brand-soft/80"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-[10px] px-3 text-xs",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
export { Button as t };
