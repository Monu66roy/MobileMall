"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function WishlistButton({ slug, className }: { slug: string; className?: string }) {
  const { wishlist, toggleWishlist } = useCart();
  const on = wishlist.includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggleWishlist(slug)}
      aria-pressed={on}
      aria-label={on ? "Remove from wishlist" : "Save to wishlist"}
      className={cn("flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/90 backdrop-blur transition hover:border-brand hover:text-brand", className)}
    >
      <Heart size={16} className={cn("transition", on && "scale-110 fill-brand text-brand")} />
    </button>
  );
}

export function AddToCartButton({ product, className, label = "Add to order" }: { product: Product; className?: string; label?: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={() => add({ slug: product.slug, name: product.name, brand: product.brand, image: product.image, price: product.price })}
      className={cn("btn-ghost w-full py-2.5", className)}
    >
      <ShoppingBag size={15} aria-hidden /> {label}
    </button>
  );
}
