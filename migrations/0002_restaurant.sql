create table if not exists staff (
  id serial primary key,
  name text not null,
  pin_hash text not null,
  role text not null default 'manager',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists staff_sessions (
  token_hash text primary key,
  staff_id integer not null references staff(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id serial primary key,
  slug text not null unique,
  name text not null,
  description text not null default '',
  category text not null,
  kind text not null default 'item',
  image_key text not null default 'pizza',
  member_only boolean not null default false,
  featured boolean not null default false,
  badge text,
  included text,
  price integer,
  sizes jsonb,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id serial primary key,
  code text not null unique,
  customer_name text not null,
  customer_phone text not null,
  address text not null default '',
  notes text not null default '',
  fulfillment text not null default 'delivery',
  member boolean not null default false,
  items jsonb not null,
  total_pkr integer not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists settings (
  key text primary key,
  value jsonb not null
);

create index if not exists products_category_idx on products (category, sort_order);
create index if not exists orders_created_idx on orders (created_at desc);
create index if not exists staff_sessions_expires_idx on staff_sessions (expires_at);
