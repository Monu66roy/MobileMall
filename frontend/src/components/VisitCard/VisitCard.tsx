import { MapPin, MessageCircle, Phone } from "lucide-react";
import { mapsDirections, whatsappLink } from "@/lib/utils";
import type { SiteSettings } from "@/types";

export default function VisitCard({ settings }: { settings: SiteSettings }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(settings.mapQuery)}&output=embed`;
  const rowCls = "flex items-center gap-4 border-t border-line py-4";
  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      <div className="min-h-[340px] overflow-hidden rounded-[26px] border border-line bg-surface-2">
        <iframe title="Mobile Mall Darbhanga on Google Maps" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[340px] w-full border-0" />
      </div>
      <div className="rounded-[26px] border border-line bg-surface p-8">
        <p className="eyebrow">Come say hello</p>
        <h2 className="mt-3 font-serif text-4xl font-medium text-ink">Visit Mobile Mall</h2>
        <p className="mt-6 flex gap-3 text-[16px] leading-7 text-ink">
          <MapPin size={20} className="mt-1 shrink-0 text-brand" aria-hidden />
          <span>{settings.address[0]},<br />{settings.address[1]}</span>
        </p>
        <p className="mt-3 text-sm text-muted">{settings.hours}</p>
        <div className="mt-5">
          <a href={`tel:${settings.phoneE164}`} className={rowCls}>
            <Phone size={24} className="text-brand" aria-hidden />
            <span><span className="block text-[11px] uppercase tracking-wide text-muted">Call us</span><span className="text-[15px] font-semibold text-ink">{settings.phoneDisplay}</span></span>
          </a>
          <a href={whatsappLink(settings.whatsappNumber, "Hi Mobile Mall, I would like to know more about your smartphones.")} target="_blank" rel="noopener noreferrer" className={rowCls}>
            <MessageCircle size={24} className="text-brand" aria-hidden />
            <span><span className="block text-[11px] uppercase tracking-wide text-muted">Chat with us</span><span className="text-[15px] font-semibold text-ink">WhatsApp</span></span>
          </a>
        </div>
        <a href={mapsDirections(settings.mapQuery)} target="_blank" rel="noopener noreferrer" className="btn-brand mt-3 w-full py-3.5">
          <MapPin size={16} aria-hidden /> Get directions
        </a>
      </div>
    </div>
  );
}
