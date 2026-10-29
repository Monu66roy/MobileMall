import { MapPin, MessageCircle, Phone } from "lucide-react";
import { mapsDirections, whatsappLink } from "@/lib/utils";
import type { SiteSettings } from "@/types";

export default function ContactStrip({ settings }: { settings: SiteSettings }) {
  const row = "flex items-center gap-4 border-t border-line py-5 last:border-b";
  return (
    <div className="mt-14">
      <a href={`tel:${settings.phoneE164}`} className={row}>
        <Phone size={26} className="text-brand" aria-hidden />
        <span><span className="block text-[11px] uppercase tracking-wide text-muted">Call us</span><span className="text-[15px] font-semibold text-ink">{settings.phoneDisplay}</span></span>
      </a>
      <a href={whatsappLink(settings.whatsappNumber, "Hi Mobile Mall, I would like to know more about your smartphones.")} target="_blank" rel="noopener noreferrer" className={row}>
        <MessageCircle size={26} className="text-brand" aria-hidden />
        <span><span className="block text-[11px] uppercase tracking-wide text-muted">Chat with us</span><span className="text-[15px] font-semibold text-ink">WhatsApp</span></span>
      </a>
      <a href={mapsDirections(settings.mapQuery)} target="_blank" rel="noopener noreferrer" className={row}>
        <MapPin size={26} className="text-brand" aria-hidden />
        <span><span className="block text-[11px] uppercase tracking-wide text-muted">Visit us</span><span className="text-[15px] font-semibold text-ink">{settings.address[0]}, Darbhanga</span></span>
      </a>
    </div>
  );
}
