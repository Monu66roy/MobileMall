import { Phone } from "lucide-react";
import type { SiteSettings } from "@/types";

export default function TopBar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="bg-[#140b05] text-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-[13px]">
        <span>{settings.topBarText}</span>
        <a href={`tel:${settings.phoneE164}`} className="inline-flex items-center gap-1.5 font-semibold text-[#d8962a] hover:underline">
          <Phone size={14} aria-hidden /> {settings.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
