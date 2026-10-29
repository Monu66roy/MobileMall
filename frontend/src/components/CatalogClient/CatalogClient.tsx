"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { cn } from "@/lib/utils";
import type { Brand, Product, SiteSettings } from "@/types";

type Props = {
  products: Product[];
  brands: Brand[];
  settings: Pick<SiteSettings, "whatsappNumber" | "phoneE164">;
  initialBrand?: string;
};

export default function CatalogClient({ products, brands, settings, initialBrand }: Props) {
  const valid = initialBrand && brands.some((b) => b.name.toLowerCase() === initialBrand.toLowerCase());
  const [brand, setBrand] = useState<string>(valid ? brands.find((b) => b.name.toLowerCase() === initialBrand!.toLowerCase())!.name : "All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) => (brand === "All" || p.brand === brand) && (!q || `${p.brand} ${p.name}`.toLowerCase().includes(q)),
    );
  }, [products, brand, query]);

  return (
    <>
      <div className="mx-auto mt-8 max-w-[540px]">
        <label className="relative block">
          <span className="sr-only">Search a phone</span>
          <Search size={18} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a phone, e.g. iPhone 16 or Galaxy"
            className="w-full rounded-full border border-line bg-surface-2 py-4 pl-12 pr-6 text-[15px] text-ink placeholder:text-muted/80 focus:border-brand focus:outline-none"
          />
        </label>
      </div>

      <div role="group" aria-label="Filter by brand" className="mx-auto mt-6 flex max-w-[1000px] flex-wrap justify-center gap-2.5">
        {["All", ...brands.map((b) => b.name)].map((b) => (
          <button
            key={b}
            type="button"
            aria-pressed={brand === b}
            onClick={() => setBrand(b)}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] font-bold uppercase tracking-[0.06em] transition",
              brand === b ? "border-brand bg-brand text-brand-ink" : "border-line bg-surface/60 text-ink/80 hover:border-brand",
            )}
          >
            {b}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 rounded-3xl border border-dashed border-line p-10 text-center">
          <p className="font-serif text-2xl text-ink">No phones match that search</p>
          <p className="mt-2 text-muted">Try a different name or brand, or call us — new stock arrives often.</p>
          <button type="button" className="btn-ghost mt-5" onClick={() => { setQuery(""); setBrand("All"); }}>Clear filters</button>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((p, i) => (
            <li key={p.id}><ProductCard product={p} settings={settings} variant="catalog" priority={i < 5} /></li>
          ))}
        </ul>
      )}
    </>
  );
}
