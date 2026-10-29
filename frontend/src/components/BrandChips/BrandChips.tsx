import Link from "next/link";
import type { Brand } from "@/types";

export default function BrandChips({ brands }: { brands: Brand[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {brands.map((b) => (
        <li key={b.id}>
          <Link href={`/phones?brand=${encodeURIComponent(b.name)}`} className="pill">{b.name}</Link>
        </li>
      ))}
    </ul>
  );
}
