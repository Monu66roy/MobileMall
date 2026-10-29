"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useCart } from "@/context/CartContext";
import type { Product, SiteSettings } from "@/types";

export default function WishlistClient({ products, settings }: { products: Product[]; settings: Pick<SiteSettings, "whatsappNumber" | "phoneE164"> }) {
  const { wishlist } = useCart();
  const saved = products.filter((p) => wishlist.includes(p.slug));
  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-[26px] border border-dashed border-line p-10 text-center text-muted">
        <p>You haven’t saved any phones yet. Tap the heart on a phone to keep it here.</p>
        <Link href="/phones" className="btn-brand mt-5">Browse phones</Link>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {saved.map((p) => <li key={p.id}><ProductCard product={p} settings={settings} /></li>)}
    </ul>
  );
}
