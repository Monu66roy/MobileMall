export const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "https://mobilemalldarbhanga.com";

/** Resolve a stored image path against the media host. Local /images/* stay local. */
export function mediaUrl(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith("/images/")) return path;
  return `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function whatsappLink(number: string, text: string): string {
  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(text)}`;
}

export function mapsDirections(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
