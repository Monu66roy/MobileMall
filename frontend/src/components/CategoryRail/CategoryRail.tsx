import Link from "next/link";
import { Icon } from "@/lib/icons";
import type { CategoryShortcut } from "@/types";

export default function CategoryRail({ items }: { items: CategoryShortcut[] }) {
  return (
    <ul className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-between">
      {items.map((c) => (
        <li key={c.id} className="shrink-0">
          <Link href={c.href} className="group flex w-[92px] flex-col items-center gap-3">
            <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#c9a46b]/70 bg-[#eadbc6] text-brand transition group-hover:border-brand dark:bg-surface-2">
              <Icon name={c.icon} size={22} />
            </span>
            <span className="text-[13px] font-bold text-ink">{c.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
