import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, LogOut } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  deleteStaff,
  listStaff,
  staffLogin,
  staffLogout,
  staffMe,
  upsertStaff,
} from "@/lib/api/staff";
import { deleteProduct, getAdminCatalog, upsertProduct } from "@/lib/api/catalog";
import { getSettings, listOrders, saveSettings, updateOrderStatus } from "@/lib/api/orders";
import { useStaffSession } from "@/lib/staff-session";
import {
  CATEGORIES,
  DEFAULT_SETTINGS,
  FOOD_IMAGES,
  type Product,
  type ProductKind,
  type ProductSize,
  type RestaurantSettings,
  type StaffRole,
} from "@/lib/types";
import { formatPkr, cn } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/staff")({ component: StaffPage });

function StaffPage() {
  const token = useStaffSession((s) => s.token);
  const staff = useStaffSession((s) => s.staff);
  const setSession = useStaffSession((s) => s.setSession);
  const clear = useStaffSession((s) => s.clear);
  const me = useQuery({
    queryKey: ["staff-me", token],
    queryFn: () => staffMe({ data: { token: token! } }),
    enabled: !!token,
    retry: false,
  });

  if (!token || me.isError) {
    if (me.isError && token) clear();
    return <PinGate onLogin={(next) => setSession(next.token, next.staff)} />;
  }

  const profile = me.data?.staff ?? staff;
  if (!profile) return <PinGate onLogin={(next) => setSession(next.token, next.staff)} />;

  return (
    <div className="paper-noise min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <img src="/logo.png" alt="" className="size-10 rounded-full bg-paper object-cover" />
          <div>
            <p className="font-display text-lg tracking-wide">Admin</p>
            <p className="text-xs text-muted">
              {profile.name} · {profile.role}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link to="/">Shop</Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await staffLogout({ data: { token } });
                clear();
              }}
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-4">
        <Tabs defaultValue="orders">
          <TabsList className="w-full">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="settings">Shop</TabsTrigger>
            {profile.role === "owner" ? <TabsTrigger value="staff">Staff</TabsTrigger> : null}
          </TabsList>
          <TabsContent value="orders" className="pt-4">
            <OrdersPanel token={token} />
          </TabsContent>
          <TabsContent value="menu" className="pt-4">
            <MenuPanel token={token} />
          </TabsContent>
          <TabsContent value="settings" className="pt-4">
            <SettingsPanel token={token} />
          </TabsContent>
          {profile.role === "owner" ? (
            <TabsContent value="staff" className="pt-4">
              <StaffPanel token={token} />
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </div>
  );
}

function PinGate({
  onLogin,
}: {
  onLogin: (session: { token: string; staff: { id: number; name: string; role: StaffRole; active: boolean } }) => void;
}) {
  const [pin, setPin] = useState("");
  const login = useMutation({
    mutationFn: () => staffLogin({ data: { pin } }),
    onSuccess: onLogin,
    onError: (error: Error) => {
      toast.error(error.message);
      setPin("");
    },
  });

  return (
    <div className="hero-wash flex min-h-dvh flex-col items-center justify-center px-5 text-paper">
      <img src="/logo.png" alt="Cheeziup" className="size-24 rounded-full bg-paper object-cover" />
      <h1 className="mt-5 font-display text-4xl tracking-wide">Admin PIN</h1>
      <p className="mt-1 text-sm text-paper/75">Owner and manager only. Customers stay on the shop.</p>
      <div className="mt-6 flex gap-2">
        {Array.from({ length: Math.max(4, pin.length) }).map((_, index) => (
          <span
            key={index}
            className={cn("size-3 rounded-full", index < pin.length ? "bg-paper" : "bg-paper/25")}
          />
        ))}
      </div>
      <div className="mt-8 grid w-full max-w-xs grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0", "go"].map((key) => (
          <button
            key={key}
            className="h-16 rounded-[18px] bg-paper/12 text-xl font-semibold text-paper transition-colors hover:bg-paper/20"
            onClick={() => {
              if (key === "del") setPin((value) => value.slice(0, -1));
              else if (key === "go") {
                if (pin.length < 4) {
                  toast.error("Enter a 4–8 digit PIN.");
                  return;
                }
                login.mutate();
              } else setPin((value) => (value + key).slice(0, 8));
            }}
          >
            {key === "del" ? <Delete className="mx-auto size-5" /> : key === "go" ? "OK" : key}
          </button>
        ))}
      </div>
      <Link to="/" className="mt-8 text-sm text-paper/70">
        Back to shop
      </Link>
    </div>
  );
}

function OrdersPanel({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const orders = useQuery({
    queryKey: ["orders", token],
    queryFn: () => listOrders({ data: { token } }),
    refetchInterval: 8000,
  });
  const update = useMutation({
    mutationFn: (input: { id: number; status: "new" | "preparing" | "out" | "done" | "cancelled" }) =>
      updateOrderStatus({ data: { token, ...input } }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      if (result.customerWaUrl) openWhatsApp(result.customerWaUrl);
      toast.success("Status saved. WhatsApp is opening to message the customer.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (!orders.data?.length) {
    return <Empty text="No orders yet. Customer tickets land here after WhatsApp checkout." />;
  }

  const actions = [
    { status: "preparing" as const, label: "Accept" },
    { status: "out" as const, label: "On the way" },
    { status: "done" as const, label: "Done" },
    { status: "cancelled" as const, label: "Cancel" },
  ];

  return (
    <div className="space-y-3">
      {orders.data.map((order) => (
        <article key={order.id} className="rounded-[24px] bg-paper p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-2xl tracking-wide">{order.code}</p>
              <p className="text-sm text-muted">
                {order.customerName} · {order.customerPhone}
              </p>
            </div>
            <Badge>{order.status === "new" ? "new" : order.status}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted">
            {order.fulfillment}
            {order.address ? ` · ${order.address}` : ""}
            {order.member ? " · member" : ""}
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {order.items.map((item) => (
              <li key={item.key}>
                {item.qty}× {item.name}
                {item.sizeLabel ? ` (${item.sizeLabel})` : ""}
              </li>
            ))}
          </ul>
          {order.notes ? <p className="mt-2 text-sm text-muted">Notes: {order.notes}</p> : null}
          <p className="mt-3 font-display text-xl tabular-nums text-brand">{formatPkr(order.totalPkr)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {actions.map((action) => (
              <Button
                key={action.status}
                size="sm"
                variant={order.status === action.status ? "default" : "outline"}
                disabled={update.isPending}
                onClick={() => update.mutate({ id: order.id, status: action.status })}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function MenuPanel({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const catalog = useQuery({
    queryKey: ["admin-catalog", token],
    queryFn: () => getAdminCatalog({ data: { token } }),
  });
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const save = useMutation({
    mutationFn: () =>
      upsertProduct({
        data: {
          token,
          id: editing?.id,
          name: editing?.name ?? "",
          description: editing?.description ?? "",
          category: editing?.category ?? "student",
          kind: (editing?.kind ?? "deal") as ProductKind,
          imageKey: editing?.imageKey ?? "pizza",
          memberOnly: editing?.memberOnly ?? false,
          featured: editing?.featured ?? false,
          badge: editing?.badge ?? null,
          included: editing?.included ?? editing?.description ?? null,
          price: editing?.kind === "pizza" ? null : (editing?.price ?? 0),
          sizes: editing?.kind === "pizza" ? (editing?.sizes ?? defaultPizzaSizes()) : null,
          active: editing?.active ?? true,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-catalog"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      setEditing(null);
      toast.success("Saved. Customers can see it now.");
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const remove = useMutation({
    mutationFn: (id: number) => deleteProduct({ data: { token, id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-catalog"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Removed");
    },
  });

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Add deals, pizzas, and items here. Turn off “Visible to customers” to hide something without deleting it.
      </p>
      <Button
        onClick={() =>
          setEditing({
            name: "",
            description: "",
            category: "student",
            kind: "deal",
            imageKey: "pizza",
            price: 0,
            badge: "Deal",
            memberOnly: false,
            featured: true,
            active: true,
          })
        }
      >
        Add deal or item
      </Button>
      {(catalog.data ?? []).map((product) => (
        <div key={product.id} className="flex items-start justify-between gap-3 rounded-[20px] bg-paper p-3 shadow-[var(--shadow-card)]">
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-xs text-muted">
              {product.category} · {product.active ? "live" : "hidden"}
              {product.price != null ? ` · ${formatPkr(product.price)}` : ""}
              {product.featured ? " · home" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setEditing(product)}>
              Edit
            </Button>
            <Button size="sm" variant="ghost" onClick={() => remove.mutate(product.id)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent title={editing?.id ? "Edit item" : "New deal or item"}>
          {editing ? (
            <div className="grid gap-3">
              <Field label="Name">
                <Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </Field>
              <Field label="What is included">
                <Textarea
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value, included: e.target.value })}
                />
              </Field>
              <Field label="Type">
                <select
                  className="h-11 rounded-[12px] bg-paper px-3 text-sm shadow-[inset_0_0_0_1px_var(--color-line)]"
                  value={editing.kind ?? "deal"}
                  onChange={(e) => {
                    const kind = e.target.value as ProductKind;
                    setEditing({
                      ...editing,
                      kind,
                      sizes: kind === "pizza" ? (editing.sizes ?? defaultPizzaSizes()) : null,
                    });
                  }}
                >
                  <option value="deal">Deal</option>
                  <option value="item">Item</option>
                  <option value="pizza">Pizza</option>
                </select>
              </Field>
              <Field label="Category">
                <select
                  className="h-11 rounded-[12px] bg-paper px-3 text-sm shadow-[inset_0_0_0_1px_var(--color-line)]"
                  value={editing.category ?? "student"}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Photo">
                <select
                  className="h-11 rounded-[12px] bg-paper px-3 text-sm shadow-[inset_0_0_0_1px_var(--color-line)]"
                  value={editing.imageKey ?? "pizza"}
                  onChange={(e) => setEditing({ ...editing, imageKey: e.target.value })}
                >
                  {Object.keys(FOOD_IMAGES).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Badge (optional)">
                <Input
                  value={editing.badge ?? ""}
                  onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })}
                  placeholder="Deal 21"
                />
              </Field>
              {editing.kind !== "pizza" ? (
                <Field label="Price (Rs)">
                  <Input
                    type="number"
                    value={editing.price ?? 0}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                  />
                </Field>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {(editing.sizes ?? defaultPizzaSizes()).map((size, index) => (
                    <Field key={size.id} label={`${size.label} Rs`}>
                      <Input
                        type="number"
                        value={size.price}
                        onChange={(e) => {
                          const sizes = [...(editing.sizes ?? defaultPizzaSizes())];
                          sizes[index] = { ...sizes[index], price: Number(e.target.value) };
                          setEditing({ ...editing, sizes });
                        }}
                      />
                    </Field>
                  ))}
                </div>
              )}
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.memberOnly}
                  onChange={(e) => setEditing({ ...editing, memberOnly: e.target.checked })}
                />
                Members only
              </label>
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                Show on home deals strip
              </label>
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.active !== false}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                />
                Visible to customers
              </label>
              <Button onClick={() => save.mutate()} disabled={save.isPending || (editing.name ?? "").trim().length < 2}>
                Save
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function defaultPizzaSizes(): ProductSize[] {
  return [
    { id: "S", label: "Small", inches: 8, price: 700 },
    { id: "M", label: "Medium", inches: 11, price: 1250 },
    { id: "L", label: "Large", inches: 14, price: 1650 },
    { id: "F", label: "Family", inches: 16, price: 1850 },
  ];
}

function SettingsPanel({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const loaded = useQuery({ queryKey: ["settings"], queryFn: () => getSettings() });
  const [form, setForm] = useState<RestaurantSettings | null>(null);
  const settings = form ?? loaded.data ?? DEFAULT_SETTINGS;
  const save = useMutation({
    mutationFn: () => saveSettings({ data: { token, settings } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Shop details saved");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function patch(partial: Partial<RestaurantSettings>) {
    setForm({ ...settings, ...partial });
  }

  return (
    <div className="grid gap-3 rounded-[24px] bg-paper p-4 shadow-[var(--shadow-card)]">
      <Field label="Restaurant name">
        <Input value={settings.name} onChange={(e) => patch({ name: e.target.value })} />
      </Field>
      <Field label="Tagline">
        <Input value={settings.tagline} onChange={(e) => patch({ tagline: e.target.value })} />
      </Field>
      <Field label="Address">
        <Textarea value={settings.address} onChange={(e) => patch({ address: e.target.value })} />
      </Field>
      <Field label="Hours">
        <Input value={settings.hours} onChange={(e) => patch({ hours: e.target.value })} />
      </Field>
      <Field label="WhatsApp number">
        <Input value={settings.whatsapp} onChange={(e) => patch({ whatsapp: e.target.value })} />
      </Field>
      <Field label="Phones (comma separated)">
        <Input
          value={settings.phones.join(", ")}
          onChange={(e) =>
            patch({
              phones: e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            })
          }
        />
      </Field>
      <Field label="Homepage announcement">
        <Textarea value={settings.announcement} onChange={(e) => patch({ announcement: e.target.value })} />
      </Field>
      <Field label="Delivery note">
        <Textarea value={settings.deliveryNote} onChange={(e) => patch({ deliveryNote: e.target.value })} />
      </Field>
      <Field label="Member perk">
        <Textarea value={settings.memberPerk} onChange={(e) => patch({ memberPerk: e.target.value })} />
      </Field>
      <Button onClick={() => save.mutate()} disabled={save.isPending}>
        Save shop
      </Button>
    </div>
  );
}

function StaffPanel({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const staff = useQuery({
    queryKey: ["staff-list", token],
    queryFn: () => listStaff({ data: { token } }),
  });
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const add = useMutation({
    mutationFn: () => upsertStaff({ data: { token, name, pin, role: "manager", active: true } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-list"] });
      setName("");
      setPin("");
      toast.success("Staff added");
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const remove = useMutation({
    mutationFn: (id: number) => deleteStaff({ data: { token, id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff-list"] }),
    onError: (error: Error) => toast.error(error.message),
  });
  const rename = useMutation({
    mutationFn: (input: { id: number; name: string; pin?: string; role: StaffRole }) =>
      upsertStaff({
        data: { token, id: input.id, name: input.name, pin: input.pin, role: input.role, active: true },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-list"] });
      toast.success("Saved");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="space-y-3">
      <div className="grid gap-3 rounded-[24px] bg-paper p-4 shadow-[var(--shadow-card)]">
        <p className="font-display text-2xl tracking-wide">Add manager</p>
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Manager name" />
        </Field>
        <Field label="PIN (4-8 digits)">
          <Input value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric" placeholder="e.g. 2580" />
        </Field>
        <Button onClick={() => add.mutate()} disabled={add.isPending}>
          Add login
        </Button>
      </div>
      {(staff.data ?? []).map((person) => (
        <StaffRow
          key={person.id}
          person={person}
          onSave={(next) => rename.mutate(next)}
          onDelete={() => remove.mutate(person.id)}
        />
      ))}
    </div>
  );
}

function StaffRow({
  person,
  onSave,
  onDelete,
}: {
  person: { id: number; name: string; role: StaffRole; active: boolean };
  onSave: (input: { id: number; name: string; pin?: string; role: StaffRole }) => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(person.name);
  const [pin, setPin] = useState("");
  const locked = person.role === "owner";
  return (
    <div className="grid gap-2 rounded-[20px] bg-paper p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <p className="font-semibold">
          {person.name} <span className="text-xs font-medium text-muted">· {person.role}</span>
        </p>
        {locked ? <Badge tone="soft">Owner</Badge> : null}
      </div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="New PIN (optional)" inputMode="numeric" />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onSave({ id: person.id, name, pin: pin || undefined, role: person.role })}>
          Save
        </Button>
        {locked ? null : (
          <Button size="sm" variant="outline" onClick={onDelete}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <p className="rounded-[24px] bg-paper px-4 py-8 text-center text-sm text-muted shadow-[var(--shadow-card)]">
      {text}
    </p>
  );
}
