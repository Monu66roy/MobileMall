import type { Metadata } from "next";
import TrackOrder from "@/components/TrackOrder/TrackOrder";

export const metadata: Metadata = { title: "Track your order", robots: { index: false, follow: false } };

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-14 lg:px-8">
      <header className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Mobile Mall Darbhanga</p>
        <h1 className="h-display mt-2 text-[48px] md:text-[60px]">Track your order</h1>
        <p className="mb-10 mt-3 text-muted">Enter the reference you received and the phone number used on the order.</p>
      </header>
      <TrackOrder />
    </div>
  );
}
