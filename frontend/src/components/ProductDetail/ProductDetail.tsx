import { MessageCircle, Phone, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import ProductCard from "@/components/ProductCard/ProductCard";
import Reveal from "@/components/Reveal/Reveal";
import { AddToCartButton, WishlistButton } from "@/components/CardActions/CardActions";
import { formatINR, whatsappLink } from "@/lib/utils";
import type { ProductDetail as Detail, SiteSettings, StockStatus } from "@/types";

const STOCK_LABEL: Record<StockStatus, string | null> = {
  in_stock: "In stock",
  low_stock: "Only a few left",
  out_of_stock: "Out of stock",
  unknown: null, // no inventory record => make no availability claim
};

type Props = { product: Detail; settings: Pick<SiteSettings, "whatsappNumber" | "phoneE164"> };

export default function ProductDetail({ product: p, settings }: Props) {
  const wa = whatsappLink(settings.whatsappNumber, `Hi Mobile Mall, please share the price of ${p.brand} ${p.name}.`);
  const groups = p.specs.reduce<Record<string, Detail["specs"]>>((acc, s) => ((acc[s.group] ||= []).push(s), acc), {});
  const discount = p.price != null && p.originalPrice && p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : null;

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal><ProductGallery images={p.images} name={`${p.brand} ${p.name}`} /></Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">{p.brand}</p>
          <h1 className="h-display mt-2 text-[40px] md:text-[52px]">{p.name}</h1>
          {p.modelNumber && <p className="mt-2 text-sm text-muted">Model: {p.modelNumber}</p>}

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-ink">{p.price != null ? formatINR(p.price) : "Call for today’s price"}</span>
            {p.price != null && p.originalPrice && p.originalPrice > p.price && (
              <>
                <s className="text-muted">{formatINR(p.originalPrice)}</s>
                {discount ? <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-brand-ink">{discount}% off</span> : null}
              </>
            )}
          </div>
          {p.bestPrice && <p className="mt-2 text-sm font-semibold text-brand">Best price promise at Mobile Mall</p>}

          {p.variants.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Available variants</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {p.variants.map((v) => (
                  <li key={v.id} className="rounded-2xl border border-line bg-surface p-3 text-sm">
                    <span className="font-semibold">{[v.ram, v.storage, v.color].filter(Boolean).join(" · ") || v.sku}</span>
                    {v.price != null && <span className="ml-2 text-muted">{formatINR(v.price)}</span>}
                    {STOCK_LABEL[v.stockStatus] && <span className="mt-1 block text-xs text-muted">{STOCK_LABEL[v.stockStatus]}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 flex items-center gap-3">
            <AddToCartButton product={p} label="Add to order list" className="btn-brand flex-1 border-0 py-3 text-brand-ink hover:text-brand-ink" />
            <WishlistButton slug={p.slug} className="h-12 w-12" />
          </div>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${settings.phoneE164}`} className="btn-brand sm:flex-1"><Phone size={16} aria-hidden /> Call for price</a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost sm:flex-1"><MessageCircle size={16} aria-hidden /> WhatsApp</a>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-muted sm:grid-cols-3">
            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand" aria-hidden /> {p.warranty ?? "Warranty: ask in store"}</li>
            <li className="flex items-center gap-2"><RefreshCw size={16} className="text-brand" aria-hidden /> Exchange available</li>
            <li className="flex items-center gap-2"><Truck size={16} className="text-brand" aria-hidden /> Home delivery in Darbhanga</li>
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <h2 className="h-display text-3xl">Specifications</h2>
        {p.specs.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-line p-6 text-muted">
            Detailed specifications for this phone haven’t been published yet. Call or WhatsApp the store for exact details.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {Object.entries(groups).map(([group, rows]) => (
              <section key={group} className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="eyebrow">{group}</h3>
                <dl className="mt-3 divide-y divide-line">
                  {rows.map((r) => (
                    <div key={r.label} className="flex justify-between gap-4 py-2 text-sm">
                      <dt className="text-muted">{r.label}</dt>
                      <dd className="text-right font-semibold text-ink">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}
      </Reveal>

      {p.description && (
        <Reveal className="mt-12"><h2 className="h-display text-3xl">About this phone</h2><p className="prose-page mt-4 max-w-3xl">{p.description}</p></Reveal>
      )}

      {p.related.length > 0 && (
        <Reveal className="mt-16">
          <h2 className="h-display text-3xl">More from {p.brand}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {p.related.map((r) => <ProductCard key={r.slug} product={r} settings={settings} />)}
          </div>
        </Reveal>
      )}
    </div>
  );
}
