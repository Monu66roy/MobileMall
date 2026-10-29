"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn, mediaUrl } from "@/lib/utils";
import type { BannerSlide } from "@/types";

const INTERVAL_MS = 5500;

/**
 * Auto-scrolling banner. Native scroll-snap (swipe works on touch), arrows, dots, progress bar.
 * Autoplay stops on hover/focus/touch, when the tab is hidden, when the user presses pause,
 * and entirely for prefers-reduced-motion users.
 */
export default function BannerCarousel({ banners }: { banners: BannerSlide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false); // hover / focus / touch
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = banners.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el || count === 0) return;
      const next = (i + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
      setIndex(next);
    },
    [count, reduced],
  );

  // keep the dots in sync when the user swipes
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const playing = count > 1 && !reduced && !userPaused && !hold;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      if (!document.hidden) goTo(index + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, index, goTo]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className="group relative"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      onTouchStart={() => setHold(true)}
      onTouchEnd={() => setHold(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      <div
        ref={track}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-[28px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-live={playing ? "off" : "polite"}
      >
        {banners.map((b, i) => (
          <div
            key={b.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="w-full shrink-0 snap-center"
          >
            <Link href={b.href} className="block" tabIndex={i === index ? 0 : -1}>
              <Image
                src={mediaUrl(b.image)}
                alt={b.alt}
                width={1600}
                height={640}
                sizes="(min-width:1320px) 1280px, 100vw"
                priority={i === 0}
                className="h-auto w-full"
              />
            </Link>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir === "prev" ? "Previous banner" : "Next banner"}
              onClick={() => goTo(index + (dir === "prev" ? -1 : 1))}
              className={cn(
                "absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition hover:bg-brand hover:text-brand-ink focus-visible:opacity-100 group-hover:opacity-100 md:flex",
                dir === "prev" ? "left-4" : "right-4",
              )}
            >
              {dir === "prev" ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
            </button>
          ))}

          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 backdrop-blur">
              {banners.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  aria-label={`Go to banner ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className="relative h-1.5 overflow-hidden rounded-full bg-white/40 transition-all"
                  style={{ width: i === index ? 36 : 10 }}
                >
                  {i === index && (
                    <span
                      key={`${index}-${playing}`}
                      className={cn("absolute inset-0 origin-left rounded-full bg-gold", playing ? "animate-progress" : "scale-x-100")}
                    />
                  )}
                </button>
              ))}
              {!reduced && (
                <button
                  type="button"
                  aria-label={userPaused ? "Play banner rotation" : "Pause banner rotation"}
                  onClick={() => setUserPaused((v) => !v)}
                  className="ml-1 text-white/90 hover:text-gold"
                >
                  {userPaused ? <Play size={14} /> : <Pause size={14} />}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
