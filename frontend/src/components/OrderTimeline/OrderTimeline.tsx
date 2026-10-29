import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus, OrderTrack } from "@/types";

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending_confirmation: "Order received",
  confirmed: "Confirmed by store",
  processing: "Being prepared",
  ready: "Ready for pickup / dispatch",
  shipped: "Out for delivery",
  completed: "Completed",
  cancelled: "Cancelled",
};
const FLOW: OrderStatus[] = ["pending_confirmation", "confirmed", "processing", "ready", "shipped", "completed"];

export default function OrderTimeline({ order }: { order: OrderTrack }) {
  const done = new Map(order.timeline.map((t) => [t.status, t]));
  if (order.status === "cancelled") {
    return <p className="rounded-2xl border border-line bg-surface p-5 font-semibold text-ink">This order was cancelled.</p>;
  }
  // pickup orders skip "shipped"
  const steps = FLOW.filter((s) => !(s === "shipped" && order.deliveryMethod === "pickup"));
  const current = steps.indexOf(order.status);
  return (
    <ol className="space-y-0">
      {steps.map((s, i) => {
        const reached = i <= current;
        const t = done.get(s);
        return (
          <li key={s} className="relative flex gap-4 pb-7 last:pb-0">
            {i < steps.length - 1 && <span className={cn("absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-0.5", i < current ? "bg-brand" : "bg-line")} aria-hidden />}
            <span className={cn("z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition", reached ? "border-brand bg-brand text-brand-ink" : "border-line bg-surface text-muted")}>
              {reached ? <Check size={16} /> : <span className="text-xs font-bold">{i + 1}</span>}
            </span>
            <div>
              <p className={cn("font-bold", reached ? "text-ink" : "text-muted")}>{STATUS_LABEL[s]}</p>
              {t && <p className="text-xs text-muted">{new Date(t.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>}
              {t?.note && <p className="mt-1 text-sm text-muted">{t.note}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
