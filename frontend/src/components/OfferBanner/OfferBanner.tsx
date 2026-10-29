import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/utils";
import type { BannerSlide } from "@/types";

export function BannerStack({ banners }: { banners: BannerSlide[] }) {
  return (
    <div className="flex flex-col gap-5">
      {banners.map((b) => (
        <Link key={b.id} href={b.href} className="block overflow-hidden rounded-[28px]">
          <Image src={mediaUrl(b.image)} alt={b.alt} width={1600} height={640} sizes="(min-width:1280px) 1240px, 100vw" priority={b.priority} className="h-auto w-full" />
        </Link>
      ))}
    </div>
  );
}

export function TileRow({ tiles }: { tiles: BannerSlide[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {tiles.map((t) => (
        <li key={t.id}>
          <Link href={t.href} className="relative block aspect-square overflow-hidden rounded-[28px] bg-black">
            <Image src={mediaUrl(t.image)} alt={t.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
