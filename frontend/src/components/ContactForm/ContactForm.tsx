"use client";

import { useState } from "react";
import { submitContact } from "@/services/api";

type Status = "idle" | "sending" | "done" | "unavailable" | "error";
type Errors = Partial<Record<"name" | "email" | "phone" | "message" | "consent", string>>;

export default function ContactForm({ whatsappHref }: { whatsappHref: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      subject: String(fd.get("subject") ?? "General enquiry"),
      message: String(fd.get("message") ?? "").trim(),
      consent: fd.get("consent") === "on",
    };
    // Client-side checks are only a convenience — the backend re-validates everything.
    const next: Errors = {};
    if (data.name.length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Enter a valid email address.";
    if (data.phone && !/^[+\d][\d\s-]{7,14}$/.test(data.phone)) next.phone = "Enter a valid phone number.";
    if (data.message.length < 10) next.message = "Tell us a little more (at least 10 characters).";
    if (!data.consent) next.consent = "Please agree so we can reply to you.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await submitContact(data);
      setReference(res.reference);
      setStatus("done");
    } catch (err) {
      setStatus(err instanceof Error && err.message === "backend-unavailable" ? "unavailable" : "error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-3xl border border-line bg-surface p-8 text-center">
        <p className="font-serif text-3xl text-ink">Thank you — message received</p>
        <p className="mt-3 text-muted">Your enquiry reference is <strong className="text-ink">{reference}</strong>. We will get back to you shortly.</p>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-[15px] text-ink focus:border-brand focus:outline-none";
  const label = "block text-sm font-bold text-ink";
  const err = (m?: string) => (m ? <p className="mt-1.5 text-sm font-medium text-red-700 dark:text-red-400" role="alert">{m}</p> : null);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl border border-line bg-surface p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className={label}>Your name<input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />{err(errors.name)}</label>
        <label className={label}>Email<input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />{err(errors.email)}</label>
        <label className={label}>Phone (optional)<input name="phone" type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} />{err(errors.phone)}</label>
        <label className={label}>Enquiry type
          <select name="subject" className={field} defaultValue="Phone price & availability">
            <option>Phone price &amp; availability</option>
            <option>Exchange &amp; EMI</option>
            <option>Lucky draw</option>
            <option>Feedback</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <label className={label}>Message<textarea name="message" rows={5} className={field} aria-invalid={!!errors.message} />{err(errors.message)}</label>
      {/* Honeypot for basic bot protection; real CAPTCHA/rate limiting lives on the backend */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-[#9a5a00]" />
          I agree that Mobile Mall may contact me about this enquiry.
        </label>
        {err(errors.consent)}
      </div>

      {status === "unavailable" && (
        <p role="status" className="rounded-2xl bg-surface-2 p-4 text-sm text-ink">
          Online enquiries are not switched on yet. Please <a className="font-bold text-brand underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a> or call the store.
        </p>
      )}
      {status === "error" && <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">Something went wrong sending your message. Please try again or call us.</p>}

      <button type="submit" disabled={status === "sending"} className="btn-brand w-fit px-8 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
