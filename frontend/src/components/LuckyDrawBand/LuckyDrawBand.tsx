import Link from "next/link";
import { Gift } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
import type { LuckyDraw } from "@/types";

export default function LuckyDrawBand({ data, whatsappNumber }: { data: LuckyDraw; whatsappNumber: string }) {
  return (
    <section className="rounded-[28px] bg-gradient-to-br from-[#4f0008] via-[#350003] to-[#1f0000] px-7 py-10 text-[#fbeedd] md:px-12 md:py-12">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#d8962a]">
            <Gift size={15} aria-hidden /> {data.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-white md:text-5xl">{data.title}</h2>
          <p className="mt-5 max-w-lg text-[16px] leading-7 text-[#f1dcc6]">{data.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/lucky-draw" className="btn-brand !bg-[#d8962a] px-6">{data.ctaLabel}</Link>
          <a
            href={whatsappLink(whatsappNumber, "Hi Mobile Mall, please share the latest lucky draw offers.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-[#d8962a]/60 px-6 py-3 text-sm font-bold text-[#f3d28c] hover:bg-white/5"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
