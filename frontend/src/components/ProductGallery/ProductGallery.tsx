"use client";
import Image from "next/image";
import { useState } from "react";
import { cn, mediaUrl } from "@/lib/utils";
import type { ProductImage } from "@/types";

export default function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[26px] border border-line bg-white">
        <Image
          key={current.url}
          src={mediaUrl(current.url)}
          alt={current.alt || name}
          fill
          priority
          sizes="(min-width:1024px) 50vw, 100vw"
          className="animate-[fadeIn_0.4s_ease] object-contain p-6 transition-transform duration-500 hover:scale-105"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-3 overflow-x-auto" aria-label="Product images">
          {images.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={cn("relative h-20 w-20 overflow-hidden rounded-xl border bg-white", i === active ? "border-brand" : "border-line")}
              >
                <Image src={mediaUrl(img.url)} alt="" fill sizes="80px" className="object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
