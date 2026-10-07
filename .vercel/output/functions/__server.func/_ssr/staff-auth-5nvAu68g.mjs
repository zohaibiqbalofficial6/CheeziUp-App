import { n as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { n as DEFAULT_SETTINGS } from "./types-D30gh9XO.mjs";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-auth-5nvAu68g.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_restaurant_default = "create table if not exists staff (\n  id serial primary key,\n  name text not null,\n  pin_hash text not null,\n  role text not null default 'manager',\n  active boolean not null default true,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists staff_sessions (\n  token_hash text primary key,\n  staff_id integer not null references staff(id) on delete cascade,\n  expires_at timestamptz not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists products (\n  id serial primary key,\n  slug text not null unique,\n  name text not null,\n  description text not null default '',\n  category text not null,\n  kind text not null default 'item',\n  image_key text not null default 'pizza',\n  member_only boolean not null default false,\n  featured boolean not null default false,\n  badge text,\n  included text,\n  price integer,\n  sizes jsonb,\n  active boolean not null default true,\n  sort_order integer not null default 0,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists orders (\n  id serial primary key,\n  code text not null unique,\n  customer_name text not null,\n  customer_phone text not null,\n  address text not null default '',\n  notes text not null default '',\n  fulfillment text not null default 'delivery',\n  member boolean not null default false,\n  items jsonb not null,\n  total_pkr integer not null,\n  status text not null default 'new',\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists settings (\n  key text primary key,\n  value jsonb not null\n);\n\ncreate index if not exists products_category_idx on products (category, sort_order);\ncreate index if not exists orders_created_idx on orders (created_at desc);\ncreate index if not exists staff_sessions_expires_idx on staff_sessions (expires_at);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_restaurant.sql": _0002_restaurant_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var REGULAR_SIZES = [
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
var SPECIAL_SIZES = [
	{
		id: "S",
		label: "Small",
		inches: 8,
		price: 850
	},
	{
		id: "M",
		label: "Medium",
		inches: 11,
		price: 1450
	},
	{
		id: "L",
		label: "Large",
		inches: 14,
		price: 1850
	},
	{
		id: "F",
		label: "Family",
		inches: 16,
		price: 2250
	}
];
function deal(order, slug, name, included, price, extra = {}) {
	return {
		slug,
		name,
		description: included,
		category: extra.category ?? "student",
		kind: "deal",
		imageKey: extra.imageKey ?? "pizza",
		included,
		price,
		sortOrder: order,
		memberOnly: extra.memberOnly,
		featured: extra.featured,
		badge: extra.badge
	};
}
var SEED_PRODUCTS = [
	deal(1, "deal-1", "Student Deal 1", "2 Chicken Shawarma, 2 Small Pizza, Regular Fries, 500ml Drink", 1700, {
		featured: true,
		imageKey: "shawarma",
		badge: "Deal 1"
	}),
	deal(2, "deal-2", "Student Deal 2", "2 Zinger Burger, 2 Small Pizza, 1 Ltr Drink", 1700, {
		featured: true,
		imageKey: "burger",
		badge: "Deal 2"
	}),
	deal(3, "deal-3", "Student Deal 3", "1 Large Pizza, 2 Small Pizza, 1.5 Ltr Drink", 2e3, {
		featured: true,
		imageKey: "pizza",
		badge: "Deal 3"
	}),
	deal(4, "deal-4", "Student Deal 4", "2 Shami Burger, 2 Small Pizza, Regular Fries, 500ml Drink", 1300, {
		featured: true,
		imageKey: "burger",
		badge: "Deal 4"
	}),
	deal(5, "deal-5", "Student Deal 5", "1 Medium Pizza, 2 Zinger Burger, 1 Ltr Drink", 1700, {
		featured: true,
		imageKey: "pizza",
		badge: "Deal 5"
	}),
	deal(6, "deal-6", "Student Deal 6", "6 Zinger Burger, 1 Regular Fries, 1 Ltr Drink", 2400, {
		featured: true,
		imageKey: "burger",
		badge: "Deal 6"
	}),
	deal(7, "deal-7", "Student Deal 7", "6 Shami Burger, 1 Regular Fries, 1.5 Ltr Drink", 1250, {
		imageKey: "burger",
		badge: "Deal 7"
	}),
	deal(8, "deal-8", "Student Deal 8", "2 Patty Burger, 2 Small Pizza, 1 Chicken Shawarma, 1 Ltr Drink", 1800, {
		imageKey: "shawarma",
		badge: "Deal 8"
	}),
	deal(9, "deal-9", "Student Deal 9", "1 Beef Pulao (Full), Raita + Salad, 1 Zinger Burger, 1 Small Pizza, 1 Ltr Drink", 1500, {
		imageKey: "biryani",
		badge: "Deal 9"
	}),
	deal(10, "deal-10", "Student Deal 10", "1 Beef Pulao (Half), Raita + Salad, 2 Shami Burger, Regular Fries, 500ml Drink", 1250, {
		imageKey: "biryani",
		badge: "Deal 10"
	}),
	deal(11, "deal-11", "Student Deal 11", "Chicken Biryani (Full), 2 Small Pizza, 1 Ltr Drink", 1500, {
		imageKey: "biryani",
		badge: "Deal 11"
	}),
	deal(12, "deal-12", "Student Deal 12", "Chicken Biryani (Half), Raita + Salad, 2 Zinger Burger, 500ml Drink", 1250, {
		imageKey: "biryani",
		badge: "Deal 12"
	}),
	deal(13, "deal-13", "Student Deal 13", "1 Small Pizza, 2 Zinger Burger, 2 Chicken Burger, 1 Regular Fries", 1800, {
		imageKey: "burger",
		badge: "Deal 13"
	}),
	deal(14, "deal-14", "Student Deal 14", "1 Family Pizza, 2 Zinger Burger, 1.5 Ltr Drink", 2200, {
		imageKey: "pizza",
		badge: "Deal 14"
	}),
	deal(15, "deal-15", "Student Deal 15", "5 Zinger, 5 Nuggets, 1 Ltr Drink", 1300, {
		imageKey: "nuggets",
		badge: "Deal 15"
	}),
	deal(16, "deal-16", "Student Deal 16", "1 KG Oil Free Fish, 4 Naan, Raita + Salad, 1 Ltr Drink", 1900, {
		imageKey: "fish",
		badge: "Deal 16"
	}),
	deal(17, "deal-17", "Student Deal 17", "10 Nuggets, 2 Zinger Burger, 1 Regular Fries, 1 Ltr Drink", 1400, {
		imageKey: "nuggets",
		badge: "Deal 17"
	}),
	deal(18, "deal-18", "Student Deal 18", "4 Chicken Burger, 2 Regular Fries, 1 Ltr Drink", 1400, {
		imageKey: "burger",
		badge: "Deal 18"
	}),
	deal(19, "deal-19", "Student Deal 19", "1 Large Pizza, 2 Zinger Burger, 2 Paratha Roll, Full Load Fries, 1.5 Ltr Drink", 2400, {
		imageKey: "roll",
		badge: "Deal 19"
	}),
	deal(20, "deal-20", "Student Deal 20", "1 Medium Crown Crust Pizza, 2 Zinger Burger, 1 Regular Fries, 1 Ltr Drink", 1950, {
		imageKey: "pizza-crown",
		badge: "Deal 20"
	}),
	deal(30, "hot-3-small", "3 Small Pizzas", "3 Small pizza with 1 Ltr drink. Members only.", 1650, {
		category: "hot",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza"
	}),
	deal(31, "hot-3-medium", "3 Medium Pizzas", "3 Medium pizza with 1.5 Ltr drink. Members only.", 2650, {
		category: "hot",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza"
	}),
	deal(32, "hot-3-large", "3 Large Pizzas", "3 Large pizza with 1.5 Ltr drink. Members only.", 3250, {
		category: "hot",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza"
	}),
	deal(33, "hot-3-family", "3 Family Pizzas", "3 Family pizza with 1.5 Ltr drink. Members only.", 4250, {
		category: "hot",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza"
	}),
	deal(40, "two-small", "Small Two Pizza Deal", "Two small pizza with 500ml drink. Members only.", 1250, {
		category: "two-pizza",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza"
	}),
	deal(41, "two-medium", "Medium Two Pizza Deal", "Two medium pizza with 1.5 Ltr drink. Members only.", 1900, {
		category: "two-pizza",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza"
	}),
	deal(42, "two-large", "Large Two Pizza Deal", "Two large pizza with 1.5 Ltr drink. Members only.", 2300, {
		category: "two-pizza",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza"
	}),
	deal(43, "two-family", "Family Two Pizza Deal", "Two family pizza with 1.5 Ltr drink. Members only.", 3250, {
		category: "two-pizza",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza"
	}),
	deal(50, "party-small", "Small Party Package", "6 Small pizza, 6 Zinger burger, 2 × 1.5 Ltr drink, 1 pound cake", 6500, {
		category: "party",
		badge: "Party",
		imageKey: "pizza"
	}),
	deal(51, "party-medium", "Medium Party Package", "3 Medium pizza, 3 Zinger burger, 2 × 1.5 Ltr drink, 1 pound cake", 5500, {
		category: "party",
		badge: "Party",
		imageKey: "pizza"
	}),
	deal(52, "party-large", "Large Party Package", "3 Large pizza, 3 Zinger burger, 2 × 1.5 Ltr drink, 1 pound cake", 7e3, {
		category: "party",
		badge: "Party",
		imageKey: "pizza"
	}),
	deal(53, "party-family", "Family Party Package", "3 Family pizza, 3 Zinger burger, 2 × 1.5 Ltr drink, 1 pound cake", 8e3, {
		category: "party",
		badge: "Party",
		imageKey: "pizza"
	}),
	deal(60, "special-deal-s", "Special Flavour Small Deal", "Small Cheeziup special flavour pizza. Members only.", 1450, {
		category: "hot",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza-special"
	}),
	deal(61, "special-deal-m", "Special Flavour Medium Deal", "Medium Cheeziup special flavour pizza. Members only.", 2450, {
		category: "hot",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza-special"
	}),
	deal(62, "special-deal-l", "Special Flavour Large Deal", "Large Cheeziup special flavour pizza. Members only.", 3250, {
		category: "hot",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza-special"
	}),
	deal(63, "special-deal-f", "Special Flavour Family Deal", "Family Cheeziup special flavour pizza. Members only.", 3850, {
		category: "hot",
		memberOnly: true,
		badge: "Members",
		imageKey: "pizza-special"
	}),
	...[
		[
			"chicken-supreme",
			"Chicken Supreme",
			"Cheese, Italian chicken, spicy chicken, onion, green pepper, olive, mushroom",
			"pizza"
		],
		[
			"chicken-tikka",
			"Chicken Tikka",
			"Tikka boti, onion, hot chilli cheese",
			"pizza-tikka"
		],
		[
			"chicken-fajita",
			"Chicken Fajita",
			"Cheese, special fajita chicken, mushroom, olive, capsicum",
			"pizza-fajita"
		],
		[
			"vegetarian",
			"Vegetarian",
			"Cheese, onion, green pepper, bell pepper, olives, mushroom, tomato",
			"pizza-veg"
		],
		[
			"cheeser",
			"Cheeser",
			"Cheese and tasty tomato sauce",
			"pizza-veg"
		],
		[
			"hot-chilly",
			"Hot & Chilly",
			"Spicy chicken, cheese, hot chilli, onion, mushroom, olive",
			"pizza-tikka"
		],
		[
			"american-hot",
			"American Hot",
			"Cheese, Italian, sausages, hot chilli, onion, minced beef, egg",
			"pizza-pepperoni"
		],
		[
			"jalpeno",
			"Jalapeno",
			"Cheese, chicken, jalapeno, tomato, sweet corn, onion",
			"pizza-fajita"
		],
		[
			"milano",
			"Milano",
			"Cheese, minced chicken, roast, beef, sausages, onion, capsicum",
			"pizza-pepperoni"
		],
		[
			"romano",
			"Romano",
			"Cheese, roast chicken, mushroom, olive, onion, capsicum",
			"pizza"
		],
		[
			"chilly-mexican",
			"Chilly Mexican",
			"Cheese, green chilli, onion rings, capsicum, chicken",
			"pizza-fajita"
		],
		[
			"chicken-cheese",
			"Chicken Cheese",
			"Chicken, cheese, onion",
			"pizza"
		],
		[
			"malai-boti",
			"Malai Boti",
			"Malai, mayo, sausage, hot chilli, olive, mushroom, tomato, cheese",
			"pizza-malai"
		],
		[
			"crown-crust",
			"Crown Crust",
			"Kabab, mayo, sausage, olive, mushroom, special chicken, capsicum, chilli",
			"pizza-crown"
		]
	].map(([slug, name, description, imageKey], index) => ({
		slug,
		name,
		description,
		category: "pizza-regular",
		kind: "pizza",
		imageKey,
		sizes: REGULAR_SIZES,
		sortOrder: 80 + index
	})),
	...[
		[
			"cheeziup-special",
			"Cheeziup Special",
			"Super chicken meat, crunch sauce, hot chilli, olive, mushroom, cheese",
			"pizza-special"
		],
		[
			"afghani-tikka",
			"Afghani Tikka",
			"Afghani chicken, cheese, onion, tomato, olive, mushroom, crunch",
			"pizza-tikka"
		],
		[
			"behari-kabab",
			"Behari Kabab",
			"Cheese, special behari flavour, olive, mushroom, onion, hot chilli",
			"pizza-crown"
		],
		[
			"kabab-crust",
			"Kabab Crust",
			"Kabab, mayo, sausage, olive, mushroom, special chicken, capsicum, chilli",
			"pizza-crown"
		],
		[
			"beef-pepperoni",
			"Beef Pepperoni Italian",
			"Pepperoni, cheese, Italian herbs",
			"pizza-pepperoni"
		],
		[
			"punjabi-special",
			"Punjabi Special",
			"Boti, cheese, chicken, hot chilli, onion, tomato rings",
			"pizza-special"
		],
		[
			"cheeziup-platter",
			"Cheeziup Platter",
			"Mix flavour of 4 pizza in 1. Small: 2 flavours. Medium, Large, Family: 4 flavours.",
			"pizza-platter"
		]
	].map(([slug, name, description, imageKey], index) => ({
		slug,
		name,
		description,
		category: "pizza-special",
		kind: "pizza",
		imageKey,
		badge: "Special",
		sizes: SPECIAL_SIZES,
		sortOrder: 64 + index
	})),
	{
		slug: "zinger-nuggets-fries",
		name: "Zinger with Nuggets & Fries",
		description: "Zinger burger served with nuggets and fries",
		category: "burgers",
		kind: "item",
		imageKey: "burger",
		price: 550,
		sortOrder: 110
	},
	{
		slug: "zinger-cheesy",
		name: "Zinger Cheesy Burger",
		description: "Crispy zinger with extra cheese",
		category: "burgers",
		kind: "item",
		imageKey: "burger",
		price: 500,
		sortOrder: 111
	},
	{
		slug: "zinger-burger",
		name: "Zinger Burger",
		description: "Classic crispy chicken zinger",
		category: "burgers",
		kind: "item",
		imageKey: "burger",
		price: 450,
		sortOrder: 112
	},
	{
		slug: "chicken-burger",
		name: "Chicken Burger",
		description: "Soft bun, chicken patty, house sauce",
		category: "burgers",
		kind: "item",
		imageKey: "burger",
		price: 400,
		sortOrder: 113
	},
	{
		slug: "patty-burger",
		name: "Patty Burger",
		description: "Simple, filling, fast",
		category: "burgers",
		kind: "item",
		imageKey: "burger",
		price: 350,
		sortOrder: 114
	},
	{
		slug: "shami-burger",
		name: "Shami Burger",
		description: "Desi shami patty burger",
		category: "burgers",
		kind: "item",
		imageKey: "burger",
		price: 200,
		sortOrder: 115
	},
	{
		slug: "shami-anda",
		name: "Shami Burger Anda Laga",
		description: "Shami burger with egg",
		category: "burgers",
		kind: "item",
		imageKey: "burger",
		price: 250,
		sortOrder: 116
	},
	{
		slug: "chicken-sandwich",
		name: "Chicken Sandwich",
		description: "Chicken sandwich with nuggets and fries",
		category: "burgers",
		kind: "item",
		imageKey: "sandwich",
		price: 550,
		sortOrder: 117
	},
	{
		slug: "malai-sandwich",
		name: "Malai Sandwich",
		description: "Malai sandwich with nuggets and fries",
		category: "burgers",
		kind: "item",
		imageKey: "sandwich",
		price: 600,
		sortOrder: 118
	},
	{
		slug: "chicken-shawarma",
		name: "Chicken Shawarma",
		description: "Loaded chicken shawarma wrap",
		category: "shawarma",
		kind: "item",
		imageKey: "shawarma",
		price: 350,
		sortOrder: 130
	},
	{
		slug: "malai-shawarma",
		name: "Malai Chicken Shawarma",
		description: "Creamy malai chicken shawarma",
		category: "shawarma",
		kind: "item",
		imageKey: "shawarma",
		price: 400,
		sortOrder: 131
	},
	{
		slug: "tikka-paratha-roll",
		name: "Chicken Tikka Paratha Roll",
		description: "Flaky paratha with tikka filling",
		category: "rolls",
		kind: "item",
		imageKey: "roll",
		price: 430,
		sortOrder: 132
	},
	{
		slug: "malai-paratha-roll",
		name: "Malai Paratha Roll",
		description: "Malai chicken in layered paratha",
		category: "rolls",
		kind: "item",
		imageKey: "roll",
		price: 500,
		sortOrder: 133
	},
	{
		slug: "kabab-paratha-roll",
		name: "Chicken Kabab Paratha Roll",
		description: "Kabab filling, paratha wrap",
		category: "rolls",
		kind: "item",
		imageKey: "roll",
		price: 400,
		sortOrder: 134
	},
	{
		slug: "nuggets-12",
		name: "Nuggets 12 Pcs",
		description: "Crispy chicken nuggets",
		category: "sides",
		kind: "item",
		imageKey: "nuggets",
		price: 500,
		sortOrder: 140
	},
	{
		slug: "nuggets-6",
		name: "Nuggets 6 Pcs",
		description: "Crispy chicken nuggets",
		category: "sides",
		kind: "item",
		imageKey: "nuggets",
		price: 300,
		sortOrder: 141
	},
	{
		slug: "reg-fries",
		name: "Regular Fries",
		description: "Salted golden fries",
		category: "sides",
		kind: "item",
		imageKey: "fries",
		price: 250,
		sortOrder: 142
	},
	{
		slug: "large-fries",
		name: "Large Fries",
		description: "Bigger portion of fries",
		category: "sides",
		kind: "item",
		imageKey: "fries",
		price: 350,
		sortOrder: 143
	},
	{
		slug: "reg-loader",
		name: "Regular Loader Fries",
		description: "Loaded fries, regular",
		category: "sides",
		kind: "item",
		imageKey: "fries",
		price: 400,
		sortOrder: 144
	},
	{
		slug: "large-loader",
		name: "Large Loader Fries",
		description: "Loaded fries, large",
		category: "sides",
		kind: "item",
		imageKey: "fries",
		price: 700,
		sortOrder: 145
	},
	{
		slug: "fish-oil-free",
		name: "1KG Oil Free Fish",
		description: "One kilo oil-free fish",
		category: "sides",
		kind: "item",
		imageKey: "fish",
		price: 1600,
		sortOrder: 146
	},
	{
		slug: "fri-fish",
		name: "1KG Fri-Fish",
		description: "One kilo fried fish",
		category: "sides",
		kind: "item",
		imageKey: "fish",
		price: 1600,
		sortOrder: 147
	}
];
var PEPPER = "cheeziup-staff-pin-v1";
function hashPin(pin) {
	return createHash("sha256").update(`${PEPPER}:${pin.trim()}`).digest("hex");
}
function pinsMatch(pin, pinHash) {
	const hashed = hashPin(pin);
	const a = Buffer.from(hashed);
	const b = Buffer.from(pinHash);
	return a.length === b.length && timingSafeEqual(a, b);
}
function newSessionToken() {
	return randomBytes(32).toString("hex");
}
function hashToken(token) {
	return createHash("sha256").update(`cheeziup-session:${token}`).digest("hex");
}
var SEED_VERSION = 2;
async function ensureSeeded(sql) {
	if (((await sql`select count(*)::int as c from staff`)[0]?.c ?? 0) === 0) await sql`
      insert into staff (name, pin_hash, role)
      values ('Zohaib', ${hashPin("1000")}, 'owner')
    `;
	const versionRows = await sql`
    select value from settings where key = 'seed_version'
  `;
	const currentVersion = Number(versionRows[0]?.value ?? 0);
	if (((await sql`select count(*)::int as c from products`)[0]?.c ?? 0) === 0 || currentVersion < SEED_VERSION) {
		for (const product of SEED_PRODUCTS) await sql.query(`insert into products
          (slug, name, description, category, kind, image_key, member_only, featured, badge, included, price, sizes, sort_order)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13)
         on conflict (slug) do update set
           name = excluded.name,
           description = excluded.description,
           category = excluded.category,
           kind = excluded.kind,
           image_key = excluded.image_key,
           member_only = excluded.member_only,
           featured = excluded.featured,
           badge = excluded.badge,
           included = excluded.included,
           price = excluded.price,
           sizes = excluded.sizes,
           sort_order = excluded.sort_order`, [
			product.slug,
			product.name,
			product.description,
			product.category,
			product.kind,
			product.imageKey,
			product.memberOnly ?? false,
			product.featured ?? false,
			product.badge ?? null,
			product.included ?? null,
			product.price ?? null,
			product.sizes ? JSON.stringify(product.sizes) : null,
			product.sortOrder
		]);
		await sql.query(`insert into settings (key, value) values ('seed_version', $1::jsonb)
       on conflict (key) do update set value = excluded.value`, [JSON.stringify(SEED_VERSION)]);
	}
	if (((await sql`select count(*)::int as c from settings where key = 'restaurant'`)[0]?.c ?? 0) === 0 || currentVersion < SEED_VERSION) await sql.query(`insert into settings (key, value) values ('restaurant', $1::jsonb)
       on conflict (key) do update set value = excluded.value`, [JSON.stringify(DEFAULT_SETTINGS)]);
}
function parseSizes(value) {
	if (!value) return null;
	if (typeof value === "string") try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
	return Array.isArray(value) ? value : null;
}
function mapProduct(row) {
	return {
		id: row.id,
		slug: row.slug,
		name: row.name,
		description: row.description,
		category: row.category,
		kind: row.kind,
		imageKey: row.image_key,
		memberOnly: Boolean(row.member_only),
		featured: Boolean(row.featured),
		badge: row.badge,
		included: row.included,
		price: row.price,
		sizes: parseSizes(row.sizes),
		active: Boolean(row.active),
		sortOrder: row.sort_order
	};
}
function mapSettings(value) {
	if (!value || typeof value !== "object") throw new Error("Missing restaurant settings");
	return value;
}
function mapStaff(row) {
	return {
		id: row.id,
		name: row.name,
		role: row.role,
		active: Boolean(row.active)
	};
}
function mapOrder(row) {
	const items = typeof row.items === "string" ? JSON.parse(row.items) : row.items;
	return {
		id: row.id,
		code: row.code,
		customerName: row.customer_name,
		customerPhone: row.customer_phone,
		address: row.address,
		notes: row.notes,
		fulfillment: row.fulfillment,
		member: Boolean(row.member),
		items: Array.isArray(items) ? items : [],
		totalPkr: row.total_pkr,
		status: row.status,
		createdAt: typeof row.created_at === "string" ? row.created_at : row.created_at.toISOString()
	};
}
async function requireStaff(sql, token, ownerOnly = false) {
	const row = (await sql`
    select s.id, s.name, s.role, s.active
    from staff_sessions sess
    join staff s on s.id = sess.staff_id
    where sess.token_hash = ${hashToken(token)}
      and sess.expires_at > now()
      and s.active = true
    limit 1
  `)[0];
	if (!row) throw new Error("Staff session expired. Sign in again.");
	if (ownerOnly && row.role !== "owner") throw new Error("Only the owner can manage staff.");
	return mapStaff(row);
}
//#endregion
export { hashToken as a, mapSettings as c, pinsMatch as d, requireStaff as f, hashPin as i, mapStaff as l, ensureSeeded as n, mapOrder as o, getSql as r, mapProduct as s, createServerRpc as t, newSessionToken as u };
