import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BB1OE8cR.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatPkr(amount) {
	return `Rs ${amount.toLocaleString("en-PK")}`;
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48);
}
function waDigits(phone) {
	const digits = phone.replace(/\D/g, "");
	if (digits.startsWith("92")) return digits;
	if (digits.startsWith("0")) return `92${digits.slice(1)}`;
	return digits;
}
//#endregion
export { waDigits as i, formatPkr as n, slugify as r, cn as t };
