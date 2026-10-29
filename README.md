# Mobile Mall Darbhanga — Phase 1 (Frontend)

Next.js 14 (App Router) + TypeScript + Tailwind. UI recreated from the live site and screenshots; data is read
through a typed service layer so the FastAPI + PostgreSQL backend can be plugged in without touching components.

## Run
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
```
Leave `API_URL` empty to use the bundled seed data (72 phones / 20 brands copied from the current site).

## Status
- Done: Home, Phones (search + brand filter), Brands, Offers (/lucky-draw), About, Contact (+form), chat widget UI,
  dark mode, responsive header/footer, SEO metadata, robots, sitemap.
- Needs backend: contact submission, chatbot replies, admin editing, accounts, orders, offers engine.
- Pending / to verify: product prices (currently "Call for today's price"), the 4 testimonials (carried over from the
  live site, flagged `verified: false`), tile image URLs (hotlinked from the live site until uploaded to your storage).
- Not yet run: `npm install`, `npm run build`, visual comparison — this environment had no network access.

Fonts: Cormorant Garamond (headings) + Manrope (body), which closely match the reference. Confirm against the live CSS.
