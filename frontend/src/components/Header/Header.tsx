"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, PackageSearch, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/phones", label: "Phones" },
  { href: "/brands", label: "Brands" },
  { href: "/lucky-draw", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function IconLink({ href, label, badge, children }: { href: string; label: string; badge?: number; children: React.ReactNode }) {
  return (
    <Link href={href} aria-label={label} className="relative rounded-full border border-line p-2.5 text-ink transition hover:border-brand hover:text-brand">
      {children}
      {!!badge && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-extrabold text-brand-ink">{badge}</span>
      )}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, wishlist, openDrawer } = useCart();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-line bg-header/95 backdrop-blur transition-shadow duration-300",
        scrolled && "shadow-[0_10px_30px_-18px_rgba(90,50,0,0.45)]",
      )}
    >
      <div className={cn("mx-auto flex max-w-[1240px] items-center justify-between px-5 transition-[height] duration-300 lg:px-8", scrolled ? "h-[68px]" : "h-20")}>
        <Link href="/" className="flex items-center gap-3" aria-label="Mobile Mall Darbhanga home">
          <Image src="/images/mobile-mall-logo.webp" alt="" width={60} height={60} className={cn("object-cover transition-all duration-300", scrolled ? "h-[50px] w-[50px]" : "h-[60px] w-[60px]")} priority />
          <span className="leading-none">
            <span className="block font-serif text-[22px] font-semibold text-ink">Mobile Mall</span>
            <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand">Darbhanga</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cn(
                "group relative py-1 text-[13px] font-bold uppercase tracking-[0.14em] transition-colors",
                isActive(n.href) ? "text-brand" : "text-ink/70 hover:text-brand",
              )}
            >
              {n.label}
              <span className={cn("absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-300", isActive(n.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <IconLink href="/orders/track" label="Track your order"><PackageSearch size={18} /></IconLink>
          <IconLink href="/wishlist" label={`Wishlist (${wishlist.length})`} badge={wishlist.length}><Heart size={18} /></IconLink>
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open order list (${count} items)`}
            className="relative rounded-full border border-line p-2.5 text-ink transition hover:border-brand hover:text-brand"
          >
            <ShoppingBag size={18} />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-extrabold text-brand-ink">{count}</span>}
          </button>
          <button
            type="button"
            className="rounded-full border border-line p-2.5 text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="animate-slideDown border-t border-line bg-header md:hidden">
          <ul className="mx-auto flex max-w-[1240px] flex-col px-5 py-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={cn("block border-b border-line/60 py-3.5 text-sm font-bold uppercase tracking-[0.14em]", isActive(n.href) ? "text-brand" : "text-ink/80")}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
