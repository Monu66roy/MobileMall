"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/api";
import { formatINR, mediaUrl, whatsappLink } from "@/lib/utils";
import type { DeliveryMethod } from "@/types";

type Errors = Partial<Record<"name" | "phone" | "email" | "address" | "consent" | "form", string>>;
const field = "mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25";

export default function CheckoutForm({ whatsappNumber }: { whatsappNumber: string }) {
  const { items, clear, knownTotal, unpricedCount } = useCart();
  const [v, setV] = useState({ name: "", phone: "", email: "", address: "", note: "", delivery: "pickup" as DeliveryMethod, consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const key = useRef<string>(typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()));

  if (done) {
    return (
      <div className="mx-auto max-w-xl rounded-[26px] border border-line bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto text-brand" size={48} aria-hidden />
        <h2 className="h-display mt-4 text-4xl">Order request received</h2>
        <p className="mt-3 text-muted">Your reference number</p>
        <p className="mt-1 select-all font-mono text-2xl font-bold tracking-wider text-brand">{done}</p>
        <p className="mt-4 text-sm leading-6 text-muted">Save this reference. The store will call or WhatsApp you to confirm price and availability. Track it any time with this reference and your phone number.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/orders/track" className="btn-brand">Track this order</Link>
          <Link href="/phones" className="btn-ghost">Keep browsing</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-[26px] border border-dashed border-line p-10 text-center text-muted">
        <p>Your order list is empty.</p>
        <Link href="/phones" className="btn-brand mt-5">Browse phones</Link>
      </div>
    );
  }

  const validate = (): Errors => {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(v.phone.replace(/[\s-]/g, "").replace(/^(\+91|91|0)/, ""))) e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "That email doesn’t look right.";
    if (v.delivery === "home_delivery" && v.address.trim().length < 10) e.address = "Please add your full delivery address in Darbhanga.";
    if (!v.consent) e.consent = "Please agree so we can contact you about this order.";
    return e;
  };

  const waText = `Hi Mobile Mall, I'd like to order:\n${items.map((i) => `- ${i.brand} ${i.name} x${i.qty}`).join("\n")}`;

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    try {
      const phone = v.phone.replace(/[\s-]/g, "").replace(/^(\+91|91|0)/, "");
      const res = await createOrder({
        idempotencyKey: key.current, name: v.name.trim(), phone, email: v.email.trim(), deliveryMethod: v.delivery,
        address: v.address.trim(), note: v.note.trim(), consent: v.consent, items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
      });
      clear();
      setDone(res.reference);
    } catch (err) {
      const msg = err instanceof Error && err.message !== "request-failed" && err.message !== "backend-unavailable" ? err.message : null;
      setErrors({ form: msg ?? "We couldn’t place the request right now. Please try again, or send your list on WhatsApp." });
    } finally {
      setBusy(false);
    }
  }

  const err = (k: keyof Errors) => errors[k] && <p role="alert" className="mt-1 text-sm font-semibold text-red-600 dark:text-red-400">{errors[k]}</p>;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={submit} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-bold">Full name</label>
          <input id="name" autoComplete="name" className={field} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} aria-invalid={!!errors.name} />
          {err("name")}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="text-sm font-bold">Mobile number</label>
            <input id="phone" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" className={field} value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} aria-invalid={!!errors.phone} />
            {err("phone")}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-bold">Email <span className="font-normal text-muted">(optional)</span></label>
            <input id="email" type="email" autoComplete="email" className={field} value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} aria-invalid={!!errors.email} />
            {err("email")}
          </div>
        </div>
        <fieldset>
          <legend className="text-sm font-bold">How would you like to receive it?</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {([["pickup", "Store pickup", "Collect from Bhagat Singh Chowk Tower"], ["home_delivery", "Home delivery", "Within Darbhanga, subject to store confirmation"]] as const).map(([val, title, sub]) => (
              <label key={val} className={`cursor-pointer rounded-2xl border p-4 transition ${v.delivery === val ? "border-brand bg-brand/5" : "border-line hover:border-brand/60"}`}>
                <input type="radio" name="delivery" className="sr-only" checked={v.delivery === val} onChange={() => setV({ ...v, delivery: val })} />
                <span className="block font-bold">{title}</span>
                <span className="text-sm text-muted">{sub}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {v.delivery === "home_delivery" && (
          <div>
            <label htmlFor="address" className="text-sm font-bold">Delivery address</label>
            <textarea id="address" rows={3} autoComplete="street-address" className={field} value={v.address} onChange={(e) => setV({ ...v, address: e.target.value })} aria-invalid={!!errors.address} />
            {err("address")}
          </div>
        )}
        <div>
          <label htmlFor="note" className="text-sm font-bold">Note <span className="font-normal text-muted">(colour, storage, exchange…)</span></label>
          <textarea id="note" rows={2} maxLength={500} className={field} value={v.note} onChange={(e) => setV({ ...v, note: e.target.value })} />
        </div>
        <div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-[rgb(var(--brand))]" checked={v.consent} onChange={(e) => setV({ ...v, consent: e.target.checked })} />
            <span>I agree that Mobile Mall may call or WhatsApp me about this order.</span>
          </label>
          {err("consent")}
        </div>
        {errors.form && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{errors.form}</p>}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={busy} className="btn-brand flex-1 disabled:opacity-60">{busy ? "Sending…" : "Send order request"}</button>
          <a href={whatsappLink(whatsappNumber, waText)} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1"><MessageCircle size={16} aria-hidden /> Order on WhatsApp instead</a>
        </div>
      </form>

      <aside className="h-fit rounded-[26px] border border-line bg-surface p-6 lg:sticky lg:top-28">
        <h2 className="font-serif text-2xl font-semibold">Order summary</h2>
        <ul className="mt-4 divide-y divide-line">
          {items.map((i) => (
            <li key={i.slug} className="flex items-center gap-3 py-3">
              <div className="relative h-14 w-14 shrink-0 rounded-lg bg-white"><Image src={mediaUrl(i.image)} alt="" fill sizes="56px" className="object-contain p-1" /></div>
              <div className="min-w-0 flex-1 text-sm"><p className="truncate font-bold">{i.brand} {i.name}</p><p className="text-muted">Qty {i.qty}</p></div>
              <p className="text-sm font-semibold">{i.price != null ? formatINR(i.price * i.qty) : "On call"}</p>
            </li>
          ))}
        </ul>
        {knownTotal > 0 && <p className="mt-3 flex justify-between text-sm"><span className="text-muted">Listed prices</span><strong>{formatINR(knownTotal)}</strong></p>}
        <p className="mt-4 text-xs leading-5 text-muted">
          {unpricedCount > 0 && "Some phones are quoted by the store. "}Final price and availability are confirmed by the store before your order is processed. No online payment is taken.
        </p>
      </aside>
    </div>
  );
}
