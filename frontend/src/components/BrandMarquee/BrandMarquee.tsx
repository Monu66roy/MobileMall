import Link from "next/link";
import type { Brand } from "@/types";

/** Endless brand ticker (pure CSS). Second copy is aria-hidden so screen readers hear each brand once. */
export default function BrandMarquee({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {brands.map((b) => (
        <li key={`${hidden}-${b.id}`}>
          <Link
            href={`/phones?brand=${encodeURIComponent(b.name)}`}
            tabIndex={hidden ? -1 : undefined}
            className="pill whitespace-nowrap text-[13px] uppercase tracking-[0.12em]"
          >
            {b.name}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      aria-label="Brands we stock"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
