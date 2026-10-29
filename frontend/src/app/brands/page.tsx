import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import ContactStrip from "@/components/ContactStrip/ContactStrip";
import { getSite } from "@/services/api";

export async function generateMetadata(): Promise<Metadata> {
  const p = (await getSite()).pages.brands;
  return { title: p.seoTitle, description: p.seoDescription, alternates: { canonical: "/brands" } };
}

export default async function BrandsPage() {
  const site = await getSite();
  const page = site.pages.brands;
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
      <PageHero title={page.title} subtitle={page.subtitle} accent />
      <div className="prose-page mx-auto mt-16 max-w-[680px]">
        {site.brandBlurbs.map((b) => (
          <section key={b.name}>
            <h2>{b.name}</h2>
            <p>{b.text}</p>
          </section>
        ))}
        <ContactStrip settings={site.settings} />
      </div>
    </div>
  );
}
