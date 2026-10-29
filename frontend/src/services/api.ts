import { seedBrands, seedProducts, featuredOrder } from "@/data/catalog";
import { seedSite } from "@/data/site";
import type { Brand, ChatReply, OrderCreated, OrderRequest, OrderTrack, Product, ProductDetail, SiteContent } from "@/types";

/**
 * Data access layer. Every page reads through here.
 *  - API_URL set   -> FastAPI + PostgreSQL (source of truth, cached with tag-based revalidation)
 *  - API_URL empty -> bundled seed data so the UI runs before the backend exists
 *
 * API contract (documented in docs/API_CONTRACT.md):
 *   GET  /api/v1/site       -> SiteContent
 *   GET  /api/v1/products   -> Product[]   (published only)
 *   GET  /api/v1/products/{slug} -> ProductDetail (404 when unpublished/unknown)
 *   GET  /api/v1/brands     -> Brand[]
 *   POST /api/v1/contact    -> { reference: string }
 *   POST /api/v1/chat       -> ChatReply
 */
const SERVER_API = process.env.API_URL;
const PUBLIC_API = process.env.NEXT_PUBLIC_API_URL;

async function fromApi<T>(path: string, tag: string, fallback: T): Promise<T> {
  if (!SERVER_API) return fallback;
  try {
    const res = await fetch(`${SERVER_API}${path}`, { next: { revalidate: 60, tags: [tag] } });
    if (!res.ok) throw new Error(`${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[api] ${path} failed, serving fallback`, err);
    return fallback;
  }
}

export const getSite = (): Promise<SiteContent> => fromApi("/api/v1/site", "site", seedSite);

export const getBrands = (): Promise<Brand[]> => fromApi("/api/v1/brands", "brands", seedBrands);

export async function getProducts(): Promise<Product[]> {
  const items = await fromApi<Product[]>("/api/v1/products", "products", seedProducts);
  return items.filter((p) => p.published);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const items = await getProducts();
  const featured = items.filter((p) => p.featured);
  return featured.sort((a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug));
}

export async function submitContact(payload: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}): Promise<{ reference: string }> {
  if (!PUBLIC_API) throw new Error("backend-unavailable");
  const res = await fetch(`${PUBLIC_API}/api/v1/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("submit-failed");
  return res.json();
}

export async function sendChat(message: string, sessionId?: string): Promise<ChatReply> {
  if (!PUBLIC_API) throw new Error("backend-unavailable");
  const res = await fetch(`${PUBLIC_API}/api/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });
  if (!res.ok) throw new Error("chat-failed");
  return res.json();
}

/** Product page data. Without a backend we only know name/brand/image, so specs/variants stay empty (never invented). */
export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  if (SERVER_API) {
    try {
      const res = await fetch(`${SERVER_API}/api/v1/products/${encodeURIComponent(slug)}`, {
        next: { revalidate: 60, tags: ["products", `product:${slug}`] },
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`${res.status}`);
      return (await res.json()) as ProductDetail;
    } catch (err) {
      console.error(`[api] product ${slug} failed, serving fallback`, err);
    }
  }
  const all = await getProducts();
  const p = all.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    ...p,
    modelNumber: null,
    description: null,
    warranty: null,
    images: [{ url: p.image, alt: `${p.brand} ${p.name}` }],
    specs: [],
    variants: [],
    related: all.filter((x) => x.brand === p.brand && x.slug !== p.slug).slice(0, 4),
    seoTitle: null,
    seoDescription: null,
  };
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  if (!PUBLIC_API) throw new Error("backend-unavailable");
  const res = await fetch(`${PUBLIC_API}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(typeof detail?.detail === "string" ? detail.detail : "request-failed");
  }
  return res.json();
}

export const createOrder = (payload: OrderRequest) => postJson<OrderCreated>("/api/v1/orders", payload);

/** Guest tracking needs the order reference AND the phone number used on the order. */
export const trackOrder = (reference: string, phone: string) => postJson<OrderTrack>("/api/v1/orders/track", { reference, phone });
