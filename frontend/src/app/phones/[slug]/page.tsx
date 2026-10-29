import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getProductDetail, getProducts, getSite } from "@/services/api";
import { mediaUrl } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProductDetail(params.slug);
  if (!p) return { title: "Phone not found", robots: { index: false } };
  const title = p.seoTitle || `${p.brand} ${p.name}`;
  const description = p.seoDescription || `${p.brand} ${p.name} at Mobile Mall Darbhanga. Call or WhatsApp for today’s best price.`;
  return {
    title, description,
    alternates: { canonical: `/phones/${p.slug}` },
    openGraph: { title, description, images: [mediaUrl(p.images[0]?.url ?? p.image)] },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const [p, site] = await Promise.all([getProductDetail(params.slug), getSite()]);
  if (!p) return notFound();

  // Structured data only from real data: no rating, no stock claim, and an offer only if a price is actually stored.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.brand} ${p.name}`,
    brand: { "@type": "Brand", name: p.brand },
    image: p.images.map((i) => mediaUrl(i.url)),
    ...(p.price != null && { offers: { "@type": "Offer", priceCurrency: "INR", price: p.price } }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ProductDetail product={p} settings={site.settings} />
    </>
  );
}
