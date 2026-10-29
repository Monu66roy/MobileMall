import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import BrandChips from "@/components/BrandChips/BrandChips";
import BrandMarquee from "@/components/BrandMarquee/BrandMarquee";
import BannerCarousel from "@/components/BannerCarousel/BannerCarousel";
import CategoryRail from "@/components/CategoryRail/CategoryRail";
import { TileRow } from "@/components/OfferBanner/OfferBanner";
import LuckyDrawBand from "@/components/LuckyDrawBand/LuckyDrawBand";
import Reveal from "@/components/Reveal/Reveal";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import ServiceCards from "@/components/ServiceCards/ServiceCards";
import StatsStrip from "@/components/StatsStrip/StatsStrip";
import VisitCard from "@/components/VisitCard/VisitCard";
import { getBrands, getFeaturedProducts, getProducts, getSite } from "@/services/api";

export default async function HomePage() {
  const [site, brands, featured, all] = await Promise.all([getSite(), getBrands(), getFeaturedProducts(), getProducts()]);
  const { settings } = site;
  const section = "mx-auto max-w-[1240px] px-5 lg:px-8";

  // Every figure is derived from real catalogue data. Nothing here is marketing guesswork.
  const stats = [
    { value: all.length, suffix: "+", label: "Phones listed" },
    { value: brands.length, suffix: "+", label: "Brands" },
    { value: 7, label: "Days a week" },
  ];

  return (
    <div className="pb-24">
      <h1 className="sr-only">Mobile Mall Darbhanga — buy the latest smartphones and accessories from top brands</h1>

      <div className="mx-auto max-w-[1320px] px-5 pt-5 lg:px-8">
        <BannerCarousel banners={site.banners} />
      </div>

      <div className={`${section} mt-8`}>
        <Reveal><StatsStrip stats={stats} /></Reveal>
      </div>

      <div className="mt-8"><BrandMarquee brands={brands} /></div>

      <div className={`${section} mt-12`}><Reveal><CategoryRail items={site.categories} /></Reveal></div>

      <section className={`${section} mt-16`} aria-labelledby="trending">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Best sellers</p>
              <h2 id="trending" className="h-display mt-2 text-[44px] md:text-[56px]">Trending right now</h2>
            </div>
            <Link href="/phones" className="btn-ghost hidden shrink-0 sm:inline-flex">View all products</Link>
          </div>
        </Reveal>
        {featured.length === 0 ? (
          <p className="mt-8 text-muted">New arrivals are being added. Please check back soon.</p>
        ) : (
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {featured.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={(i % 5) * 70}><ProductCard product={p} settings={settings} priority={i < 5} /></Reveal>
              </li>
            ))}
          </ul>
        )}
        <Link href="/phones" className="btn-ghost mt-6 sm:hidden">View all products</Link>
      </section>

      <div className="mx-auto mt-16 max-w-[1320px] px-5 lg:px-8"><Reveal><TileRow tiles={site.tiles} /></Reveal></div>

      <section className={`${section} mt-20`} aria-labelledby="brands">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Authorised range</p>
              <h2 id="brands" className="h-display mt-2 text-[44px] md:text-[56px]">Brands we stock</h2>
            </div>
            <Link href="/brands" className="btn-ghost hidden shrink-0 sm:inline-flex">About the brands</Link>
          </div>
          <div className="mt-8"><BrandChips brands={brands} /></div>
        </Reveal>
      </section>

      <section className={`${section} mt-24`} aria-labelledby="services">
        <Reveal>
          <p className="eyebrow">More than a shop</p>
          <h2 id="services" className="h-display mt-2 text-[44px] md:text-[56px]">What you get with us</h2>
          <div className="mt-8"><ServiceCards items={site.services} /></div>
        </Reveal>
      </section>

      <div className={`${section} mt-24`}><Reveal><LuckyDrawBand data={site.luckyDraw} whatsappNumber={settings.whatsappNumber} /></Reveal></div>

      <section className={`${section} mt-24`} aria-labelledby="reviews">
        <Reveal>
          <p className="eyebrow">Loved locally</p>
          <h2 id="reviews" className="h-display mt-2 text-[44px] md:text-[56px]">What our customers say</h2>
        </Reveal>
        {site.reviews.length === 0 ? (
          <p className="mt-8 text-muted">No reviews yet. Bought from us? <Link href="/contact" className="font-bold text-brand underline">Share your feedback.</Link></p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.reviews.map((r, i) => (<li key={r.id}><Reveal delay={i * 80}><ReviewCard review={r} /></Reveal></li>))}
          </ul>
        )}
      </section>

      <div className={`${section} mt-24`}><Reveal><VisitCard settings={settings} /></Reveal></div>
    </div>
  );
}
