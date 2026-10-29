"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR, mediaUrl } from "@/lib/utils";

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, setQty, remove, knownTotal, unpricedCount, count } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your order list">
      <button type="button" aria-label="Close" onClick={closeDrawer} className="absolute inset-0 animate-fadeIn bg-black/50" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slideIn flex-col bg-bg shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-2xl font-semibold">Your order list {count > 0 && <span className="text-muted">({count})</span>}</h2>
          <button type="button" onClick={closeDrawer} aria-label="Close order list" className="rounded-full border border-line p-2 hover:border-brand"><X size={18} /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center text-muted">
            <ShoppingBag size={40} className="text-brand" aria-hidden />
            <p>Your list is empty. Add phones and we’ll confirm price and availability.</p>
            <Link href="/phones" onClick={closeDrawer} className="btn-brand">Browse phones</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((i) => (
                <li key={i.slug} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                    <Image src={mediaUrl(i.image)} alt="" fill sizes="80px" className="object-contain p-1.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">{i.brand}</p>
                    <Link href={`/phones/${i.slug}`} onClick={closeDrawer} className="block truncate font-bold hover:text-brand">{i.name}</Link>
                    <p className="text-sm text-muted">{i.price != null ? formatINR(i.price) : "Price on call"}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button type="button" aria-label="Decrease quantity" onClick={() => setQty(i.slug, i.qty - 1)} className="rounded-full border border-line p-1.5 hover:border-brand"><Minus size={14} /></button>
                      <span className="w-6 text-center text-sm font-bold" aria-live="polite">{i.qty}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => setQty(i.slug, i.qty + 1)} className="rounded-full border border-line p-1.5 hover:border-brand"><Plus size={14} /></button>
                      <button type="button" aria-label={`Remove ${i.name}`} onClick={() => remove(i.slug)} className="ml-auto text-muted hover:text-brand"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-line px-5 py-4">
              {knownTotal > 0 && <p className="flex justify-between text-sm"><span className="text-muted">Listed prices</span><strong>{formatINR(knownTotal)}</strong></p>}
              <p className="text-xs leading-5 text-muted">
                {unpricedCount > 0 ? `${unpricedCount} item(s) are quoted by the store. ` : ""}
                This is an order request. The store confirms final price and availability by call or WhatsApp. No online payment is taken.
              </p>
              <Link href="/checkout" onClick={closeDrawer} className="btn-brand w-full">Continue to order request</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
