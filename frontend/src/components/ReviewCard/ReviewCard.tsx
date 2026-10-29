import { Star } from "lucide-react";
import type { Review } from "@/types";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-[22px] border border-line bg-surface p-6">
      <div className="flex gap-1 text-brand" role="img" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (<Star key={i} size={16} fill="currentColor" aria-hidden />))}
      </div>
      <blockquote className="mt-5 text-[15px] leading-7 text-muted">{review.text}</blockquote>
      <figcaption className="mt-auto flex flex-col items-center gap-1 border-t border-line pt-6 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8d5b5] text-xs font-extrabold text-brand dark:bg-surface-2">
          {review.name.charAt(0)}
        </span>
        <span className="mt-2 text-sm font-extrabold text-ink">{review.name}</span>
        <span className="text-[13px] text-muted">{review.place}</span>
        {review.verified && <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-teal">Verified purchase</span>}
      </figcaption>
    </figure>
  );
}
