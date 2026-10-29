"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

export type Stat = { value: number; suffix?: string; label: string };

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{run ? n : to}</>;
}

/** Only pass numbers that come from real data (catalogue size, brand count, opening days). */
export default function StatsStrip({ stats }: { stats: Stat[] }) {
  const { ref, seen } = useInView<HTMLUListElement>(0.3);
  return (
    <ul ref={ref} className="grid grid-cols-3 divide-x divide-line rounded-[22px] border border-line bg-surface py-5 text-center">
      {stats.map((s) => (
        <li key={s.label} className="px-3">
          <p className="font-serif text-4xl font-semibold text-brand md:text-5xl">
            <CountUp to={s.value} run={seen} />
            {s.suffix}
          </p>
          <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
