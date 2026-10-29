"use client";
import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/** Fade/slide-up on scroll. Reduced-motion users get no movement (see globals.css). */
export default function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", seen && "reveal-in", className)}>
      {children}
    </div>
  );
}
