import type { Metadata } from "next";
import WishlistClient from "@/components/WishlistClient/WishlistClient";
import { getProducts, getSite } from "@/services/api";

export const metadata: Metadata = { title: "Your wishlist", robots: { index: false, follow: false } };

export default async function WishlistPage() {
  const [products, { settings }] = await Promise.all([getProducts(), getSite()]);
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-14 lg:px-8">
      <p className="eyebrow">Saved on this device</p>
      <h1 className="h-display mb-10 mt-2 text-[48px] md:text-[60px]">Your wishlist</h1>
      <WishlistClient products={products} settings={settings} />
    </div>
  );
}
