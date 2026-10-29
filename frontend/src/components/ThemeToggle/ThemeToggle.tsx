"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("mm-theme", next ? "dark" : "light"); } catch {}
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      className="inline-flex items-center gap-2 border border-[#3a2c1c] px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#ffd98a] transition hover:border-gold"
    >
      {dark ? <Sun size={15} aria-hidden /> : <Moon size={15} aria-hidden />}
      {dark ? "Light" : "Dark"}
    </button>
  );
}
