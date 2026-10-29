import Image from "next/image";
import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { mapsDirections, whatsappLink } from "@/lib/utils";
import type { SiteSettings } from "@/types";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/phones", label: "Phones" },
  { href: "/brands", label: "Brands" },
  { href: "/lucky-draw", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  const wa = whatsappLink(settings.whatsappNumber, "Hi Mobile Mall, I would like to know more about your smartphones.");
  const linkCls = "inline-flex items-center gap-2 text-[15px] font-medium text-[#ffd98a] hover:text-white";
  return (
    <footer className="bg-black text-[#d9c7a8]">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Image src="/images/mobile-mall-logo.webp" alt="Mobile Mall Darbhanga" width={92} height={92} className="h-[92px] w-[92px] object-cover" />
          <p className="mt-6 font-serif text-2xl font-medium text-[#f3d28c]">{settings.tagline}</p>
          <p className="mt-3 max-w-sm text-[15px] leading-7">{settings.description}</p>
          <a href={`https://www.instagram.com/${settings.instagramHandle}`} className={`${linkCls} mt-4`} target="_blank" rel="noopener noreferrer">
            <Instagram size={16} aria-hidden /> @{settings.instagramHandle}
          </a>
        </div>

        <div>
          <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-gold">Explore</h3>
          <ul className="mt-5 space-y-3.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[15px] font-medium text-[#ffe3a8] hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-gold">Visit the store</h3>
          <address className="mt-5 text-[15px] not-italic leading-7">
            {settings.address.map((l) => (<span key={l} className="block">{l}</span>))}
          </address>
          <ul className="mt-4 space-y-2.5">
            <li><a href={`tel:${settings.phoneE164}`} className={linkCls}><Phone size={16} aria-hidden /> {settings.phoneDisplay}</a></li>
            <li><a href={wa} className={linkCls} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden /> WhatsApp us</a></li>
            <li><a href={mapsDirections(settings.mapQuery)} className={linkCls} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden /> Get directions</a></li>
          </ul>
          <div className="mt-5"><ThemeToggle /></div>
        </div>
      </div>
      <div className="mx-auto max-w-[1240px] px-5 pb-10 lg:px-8">
        <p className="border-t border-[#2a1d0d] pt-6 text-[12px] font-medium uppercase tracking-[0.1em] text-[#bfa97e]">
          © {new Date().getFullYear()} Mobile Mall Darbhanga. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
