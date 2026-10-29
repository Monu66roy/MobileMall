import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import ContactStrip from "@/components/ContactStrip/ContactStrip";
import { getSite } from "@/services/api";
import { whatsappLink } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const p = (await getSite())["pages"]["lucky-draw"];
  return { title: p.seoTitle, description: p.seoDescription, alternates: { canonical: "/lucky-draw" } };
}

export default async function LuckyDrawPage() {
  const site = await getSite();
  const page = site.pages["lucky-draw"];
  const { luckyDraw: ld, settings } = site;
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
      <PageHero title={page.title} subtitle={page.subtitle} accent />
      <div className="prose-page mx-auto mt-16 max-w-[680px]">
        <p>{ld.intro}</p>
        <h2>How to take part</h2>
        <ol className="mb-4 list-decimal space-y-3 pl-6 text-[17px] leading-8 text-muted">
          {ld.steps.map((s) => (<li key={s}>{s}</li>))}
        </ol>
        <h2>Offer period</h2>
        <p>{ld.period}</p>
        <h2>For accurate information, call us</h2>
        <p>
          Offers, prices, and lucky draw terms can change during the festive season. For accurate information and to check the latest offers, call{" "}
          <a href={`tel:${settings.phoneE164}`} className="text-brand">{settings.phoneDisplay}</a> or visit the store at {settings.address[0]}, {settings.address[1]}.
        </p>
        <p>
          <a className="text-brand" target="_blank" rel="noopener noreferrer" href={whatsappLink(settings.whatsappNumber, "Hi Mobile Mall, please share the latest lucky draw offers.")}>
            Ask for the latest offers on WhatsApp
          </a>
        </p>
        <ContactStrip settings={settings} />
      </div>
    </div>
  );
}
