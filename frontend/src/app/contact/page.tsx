import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import ContactForm from "@/components/ContactForm/ContactForm";
import VisitCard from "@/components/VisitCard/VisitCard";
import { getSite } from "@/services/api";
import { whatsappLink } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const p = (await getSite()).pages.contact;
  return { title: p.seoTitle, description: p.seoDescription, alternates: { canonical: "/contact" } };
}

export default async function ContactPage() {
  const site = await getSite();
  const page = site.pages.contact;
  const wa = whatsappLink(site.settings.whatsappNumber, "Hi Mobile Mall, I would like to know more about your smartphones.");
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
      <PageHero title={page.title} subtitle={page.subtitle} accent />
      <div className="mx-auto mt-14 max-w-[760px]"><ContactForm whatsappHref={wa} /></div>
      <div className="mt-16"><VisitCard settings={site.settings} /></div>
    </div>
  );
}
