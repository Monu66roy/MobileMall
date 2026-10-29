import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import ContactStrip from "@/components/ContactStrip/ContactStrip";
import { getSite } from "@/services/api";

export async function generateMetadata(): Promise<Metadata> {
  const p = (await getSite()).pages.about;
  return { title: p.seoTitle, description: p.seoDescription, alternates: { canonical: "/about" } };
}

export default async function AboutPage() {
  const site = await getSite();
  const page = site.pages.about;
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
      <PageHero title={page.title} subtitle={page.subtitle} accent />
      <div className="prose-page mx-auto mt-16 max-w-[680px]">
        {page.sections.map((s, i) => (
          <section key={i}>
            {s.heading && <h2>{s.heading}</h2>}
            {s.body.map((t, j) => (<p key={j}>{t}</p>))}
          </section>
        ))}
        <ContactStrip settings={site.settings} />
      </div>
    </div>
  );
}
