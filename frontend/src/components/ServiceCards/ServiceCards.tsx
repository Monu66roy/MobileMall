import { Icon } from "@/lib/icons";
import type { ServiceItem } from "@/types";

export default function ServiceCards({ items }: { items: ServiceItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <li key={s.id} className="rounded-[22px] border border-line bg-surface p-7">
          <Icon name={s.icon} size={26} className="text-brand" />
          <h3 className="mt-5 font-serif text-[23px] font-semibold text-ink">{s.title}</h3>
          <p className="mt-3 text-[15px] leading-7 text-muted">{s.text}</p>
        </li>
      ))}
    </ul>
  );
}
