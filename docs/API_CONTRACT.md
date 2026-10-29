# API contract (frontend ⇄ FastAPI)

The frontend reads everything through `frontend/src/services/api.ts`. When `API_URL` is set it calls these
endpoints (cached 60 s, tag-revalidated); when empty it uses the seed data in `frontend/src/data/`.
Types live in `frontend/src/types/index.ts` — the Pydantic schemas should mirror them.

| Method | Path | Returns | Notes |
|---|---|---|---|
| GET | `/api/v1/site` | `SiteContent` | settings, banners, tiles, categories, services, lucky draw, reviews, page copy + SEO |
| GET | `/api/v1/products` | `Product[]` | published only; `price` is `null` when the store quotes by phone |
| GET | `/api/v1/brands` | `Brand[]` | |
| POST | `/api/v1/contact` | `{ reference }` | validate server-side, store in PostgreSQL, email the store, rate-limit, honeypot field `website` must be empty |
| POST | `/api/v1/chat` | `ChatReply` | Gemini via backend only; RAG over products/offers/policies; never expose the key to the browser |

Admin-driven changes should call Next's revalidation (tags: `site`, `products`, `brands`) so edits show without a deploy.

## Still to design in the backend phase
Auth + OTP, customers, cart/orders, inventory, offers/coupons, reviews moderation, notifications (email/WhatsApp), audit logs, SEO/redirects.

## Orders (phase 2)

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/v1/products/{slug}` | Published product with images, specs, variants, related. 404 otherwise. |
| POST | `/api/v1/orders` | Body: `idempotencyKey, name, phone, email?, deliveryMethod, address?, note?, consent, items[{slug, qty}]`. Prices/totals are never accepted from the client. Returns `{reference, status}` (201). Same `idempotencyKey` returns the same order. |
| POST | `/api/v1/orders/track` | Body: `{reference, phone}`. Returns limited info (status, item names, timeline). 404 for any mismatch. |

Status flow: `pending_confirmation -> confirmed -> processing -> ready -> (shipped ->) completed`, `cancelled` allowed until `processing`.
Pickup orders skip `shipped`. Rate limited (10/min per IP on orders and track, 5/min on contact).
