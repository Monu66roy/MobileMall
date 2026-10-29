import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { AddToCartButton, WishlistButton } from "@/components/CardActions/CardActions";
import { cn, formatINR, mediaUrl, whatsappLink } from "@/lib/utils";
import type { Product, SiteSettings } from "@/types";

type Props = {
  product: Product;
  settings: Pick<SiteSettings, "whatsappNumber" | "phoneE164">;
  /** "trending" = white home-page card, "catalog" = tinted /phones card */
  variant?: "trending" | "catalog";
  priority?: boolean;
};

export default function ProductCard({ product, settings, variant = "trending", priority = false }: Props) {
  const catalog = variant === "catalog";
  const wa = whatsappLink(
    settings.whatsappNumber,
    catalog
      ? `Hi Mobile Mall, please share the price of ${product.brand} ${product.name}.`
      : "Hi Mobile Mall, I would like to know more about your smartphones.",
  );

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-[22px] border p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_18px_40px_-18px_rgba(90,50,0,0.35)]",
        catalog ? "border-line bg-surface-2" : "border-line bg-surface",
      )}
    >
      <div className={cn("relative aspect-square overflow-hidden rounded-2xl", catalog ? "bg-white" : "bg-transparent")}>
        {product.bestPrice && !catalog && (
          <span className="absolute left-0 top-0 z-10 rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-ink">
            Best Price
          </span>
        )}
        <WishlistButton slug={product.slug} className="absolute right-1 top-1 z-20" />
        <Image
          src={mediaUrl(product.image)}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
      </div>

      <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand">{product.brand}</p>
      <h3 className="mt-1 text-[17px] font-bold leading-snug text-ink">
        <Link href={`/phones/${product.slug}`} className="after:absolute after:inset-0 hover:text-brand">{product.name}</Link>
      </h3>
      {!catalog && (
        <p className="mt-1.5 text-sm text-muted">
          {product.price != null ? formatINR(product.price) : "Call for today’s price"}
        </p>
      )}

      <div className="relative z-10 mt-4 flex flex-col gap-2.5">
        <a href={`tel:${settings.phoneE164}`} className="btn-brand w-full py-2.5">
          <Phone size={15} aria-hidden /> Get {catalog ? "Price" : "price"}
        </a>
        <AddToCartButton product={product} />
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink/80 hover:text-brand",
            catalog && "rounded-full border border-line py-2.5",
          )}
        >
          <MessageCircle size={15} aria-hidden /> WhatsApp
        </a>
      </div>
    </article>
  );
}
