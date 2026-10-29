"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { sendChat } from "@/services/api";
import { whatsappLink } from "@/lib/utils";
import type { SiteSettings } from "@/types";

type Msg = { role: "bot" | "user"; text: string; href?: string };

export default function Chatbot({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>();
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: settings.chatWelcome }]);
  const endRef = useRef<HTMLDivElement>(null);
  const wa = whatsappLink(settings.whatsappNumber, "Hi Mobile Mall, I would like to know more about your smartphones.");

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [msgs, open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim().slice(0, 500);
    if (!text || busy) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setBusy(true);
    try {
      const res = await sendChat(text, sessionId);
      setSessionId(res.sessionId ?? sessionId);
      setMsgs((m) => [...m, { role: "bot", text: res.reply, href: res.handoffUrl }]);
    } catch {
      setMsgs((m) => [...m, { role: "bot", text: "The chat assistant is not available right now. Please talk to us on WhatsApp or call the store.", href: wa }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {open && (
        <section aria-label="Chat with Mobile Mall" className="fixed bottom-24 right-4 z-50 flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
          <header className="flex items-center justify-between bg-teal px-5 py-4 text-white">
            <p className="font-bold">Mobile Mall assistant</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X size={20} /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14px] leading-6 ${m.role === "user" ? "bg-brand text-brand-ink" : "bg-surface-2 text-ink"}`}>
                  {m.text}
                  {m.href && <a href={m.href} target="_blank" rel="noopener noreferrer" className="mt-2 block font-bold underline">Open WhatsApp</a>}
                </p>
              </div>
            ))}
            {busy && <p className="text-sm text-muted">Typing…</p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-line p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder="Type your question" aria-label="Your message" className="flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm text-ink focus:border-brand focus:outline-none" />
            <button type="submit" disabled={busy} aria-label="Send" className="rounded-full bg-teal px-4 text-white disabled:opacity-60"><Send size={16} /></button>
          </form>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-teal px-5 py-3 text-[15px] font-bold text-white shadow-xl transition hover:brightness-110 dark:border-black"
      >
        <MessageCircle size={20} aria-hidden /> Chat
      </button>
    </>
  );
}
