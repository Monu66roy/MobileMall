import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { getSite } from "@/services/api";

export const metadata: Metadata = { title: "Order request", robots: { index: false, follow: false } };

export default async function CheckoutPage() {
  const { settings } = await getSite();
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-14 lg:px-8">
      <p className="eyebrow">Mobile Mall Darbhanga</p>
      <h1 className="h-display mt-2 text-[48px] md:text-[60px]">Order request</h1>
      <p className="mt-3 max-w-2xl text-muted">Tell us where to reach you. The store confirms the price and availability before anything is processed.</p>
      <div className="mt-10"><CheckoutForm whatsappNumber={settings.whatsappNumber} /></div>
    </div>
  );
}
