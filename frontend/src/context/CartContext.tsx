"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { slug: string; name: string; brand: string; image: string; price: number | null; qty: number };
type NewItem = Omit<CartItem, "qty">;

type CartCtx = {
  items: CartItem[];
  wishlist: string[];
  count: number;
  /** Sum of items with a known price only. Items quoted by phone are not guessed. */
  knownTotal: number;
  unpricedCount: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (item: NewItem, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  toggleWishlist: (slug: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "mm-cart-v1";
const MAX_QTY = 10;

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(load<CartItem[]>(KEY, []));
    setWishlist(load<string[]>("mm-wishlist-v1", []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
      localStorage.setItem("mm-wishlist-v1", JSON.stringify(wishlist));
    } catch {
      /* storage blocked: cart still works for this session */
    }
  }, [items, wishlist, ready]);

  const add = useCallback((item: NewItem, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === item.slug);
      if (found) return prev.map((i) => (i.slug === item.slug ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i));
      return [...prev, { ...item, qty: Math.min(MAX_QTY, qty) }];
    });
    setDrawerOpen(true);
  }, []);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      wishlist,
      count: items.reduce((n, i) => n + i.qty, 0),
      knownTotal: items.reduce((n, i) => n + (i.price != null ? i.price * i.qty : 0), 0),
      unpricedCount: items.filter((i) => i.price == null).length,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      add,
      setQty: (slug, qty) =>
        setItems((p) => (qty <= 0 ? p.filter((i) => i.slug !== slug) : p.map((i) => (i.slug === slug ? { ...i, qty: Math.min(MAX_QTY, qty) } : i)))),
      remove: (slug) => setItems((p) => p.filter((i) => i.slug !== slug)),
      clear: () => setItems([]),
      toggleWishlist: (slug) => setWishlist((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug])),
    }),
    [items, wishlist, drawerOpen, add],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}
