"use client";

import { useState } from "react";
import OrderTimeline, { STATUS_LABEL } from "@/components/OrderTimeline/OrderTimeline";
import { trackOrder } from "@/services/api";
import type { OrderTrack } from "@/types";

const field = "mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/25";

export default function TrackOrder() {
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderTrack | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOrder(null);
    setBusy(true);
    try {
      setOrder(await trackOrder(ref.trim().toUpperCase(), phone.replace(/[\s-]/g, "").replace(/^(\+91|91|0)/, "")));
    } catch {
      // One message for wrong reference, wrong phone and server down: never reveal whether an order exists.
      setError("We couldn’t find an order with those details. Check the reference and the phone number used on the order.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={submit} className="space-y-4 rounded-[26px] border border-line bg-surface p-6">
        <div>
          <label htmlFor="ref" className="text-sm font-bold">Order reference</label>
          <input id="ref" required placeholder="MM-XXXXXXXXXXXX" className={`${field} font-mono uppercase`} value={ref} onChange={(e) => setRef(e.target.value)} />
        </div>
        <div>
          <label htmlFor="tphone" className="text-sm font-bold">Phone number on the order</label>
          <input id="tphone" required inputMode="tel" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit" disabled={busy} className="btn-brand w-full disabled:opacity-60">{busy ? "Checking…" : "Track order"}</button>
        {error && <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>}
      </form>

      {order && (
        <section className="mt-8 animate-fadeIn rounded-[26px] border border-line bg-surface p-6" aria-live="polite">
          <p className="eyebrow">{order.reference}</p>
          <h2 className="font-serif text-3xl font-semibold">{STATUS_LABEL[order.status]}</h2>
          <ul className="mt-3 text-sm text-muted">
            {order.items.map((i) => <li key={i.name}>{i.name} × {i.qty}</li>)}
          </ul>
          <div className="mt-6"><OrderTimeline order={order} /></div>
        </section>
      )}
    </div>
  );
}
