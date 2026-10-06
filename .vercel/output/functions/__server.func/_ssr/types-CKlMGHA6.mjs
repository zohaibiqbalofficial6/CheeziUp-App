//#region node_modules/.nitro/vite/services/ssr/assets/types-CKlMGHA6.js
var CATEGORIES = [
	{
		slug: "student",
		label: "Student Packages",
		blurb: "Takeaway combos built for sharing"
	},
	{
		slug: "hot",
		label: "Hot Deals",
		blurb: "Member card specials"
	},
	{
		slug: "two-pizza",
		label: "Two Pizza Deals",
		blurb: "Members only, with drinks"
	},
	{
		slug: "party",
		label: "Party & Birthday",
		blurb: "Pizzas, burgers, cake and drinks"
	},
	{
		slug: "pizza-regular",
		label: "Regular Pizzas",
		blurb: "Classic Cheeziup flavours"
	},
	{
		slug: "pizza-special",
		label: "Special Pizzas",
		blurb: "House crusts and loaded toppings"
	},
	{
		slug: "burgers",
		label: "Burgers & Sandwiches",
		blurb: "Zinger, shami, patty and more"
	},
	{
		slug: "rolls",
		label: "Shawarma & Rolls",
		blurb: "Paratha rolls and shawarma"
	},
	{
		slug: "sides",
		label: "Sides & Extras",
		blurb: "Fries, nuggets and fish"
	}
];
var FOOD_IMAGES = {
	pizza: "/food/pizza.jpg",
	burger: "/food/burger.jpg",
	shawarma: "/food/shawarma.jpg",
	fries: "/food/fries.jpg",
	biryani: "/food/biryani.jpg",
	nuggets: "/food/nuggets.jpg",
	fish: "/food/fish.jpg",
	roll: "/food/roll.jpg",
	sandwich: "/food/burger.jpg"
};
var DEFAULT_SETTINGS = {
	name: "Cheeziup Pizza & Fast Food",
	tagline: "Hot oven. Fast street. Lahore nights.",
	address: "First Floor, Shop #3 Takbeer Plaza, Joray Pul Chowk, Al Faisal Town, Zarar Shaheed Road, Lahore",
	hours: "1:00 PM – 3:00 AM",
	phones: [
		"0325-9909922",
		"0325-4090909",
		"0370-4408836",
		"042-36637100"
	],
	whatsapp: "0325-9909922",
	announcement: "Show your member card on regular spice S / M / L / F pizza orders and get a free 8-inch pizza.",
	deliveryNote: "Free home delivery for members. 8-inch within 3 km, 11-inch 7 km, 14-inch 10 km, 16-inch 13 km.",
	memberPerk: "Members unlock Hot Deals, Two Pizza Deals, and free 8-inch pizza on card."
};
function productPrice(product, member, sizeId) {
	if (product.sizes && product.sizes.length > 0) {
		const size = product.sizes.find((item) => item.id === sizeId) ?? product.sizes[0];
		if (member && size.memberPrice != null) return size.memberPrice;
		return size.price;
	}
	return product.price ?? 0;
}
function productPriceLabel(product, member) {
	if (product.sizes && product.sizes.length > 0) {
		const prices = product.sizes.map((size) => member && size.memberPrice != null ? size.memberPrice : size.price);
		const min = Math.min(...prices);
		return min === Math.max(...prices) ? min : min;
	}
	return product.price ?? 0;
}
//#endregion
export { productPriceLabel as a, productPrice as i, DEFAULT_SETTINGS as n, FOOD_IMAGES as r, CATEGORIES as t };
