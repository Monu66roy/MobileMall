"""Load the 20 brands / 72 phones from the frontend seed file into PostgreSQL.

Run once after migrations:  python -m app.seed
Prices stay NULL (store quotes by phone) and no specs/stock are invented: those come from the admin panel.
"""
import json
import re
from pathlib import Path

from sqlalchemy import select

from app.core.db import SessionLocal
from app.models import Brand, Product, ProductImage

CATALOG = Path(__file__).resolve().parents[2] / "frontend" / "src" / "data" / "catalog.ts"


def _extract(name: str, text: str) -> list[dict]:
    m = re.search(rf"export const {name}[^=]*=\s*(\[.*?\n\]);", text, re.S)
    if not m:
        raise SystemExit(f"{name} not found in {CATALOG}")
    return json.loads(m.group(1))


def main() -> None:
    text = CATALOG.read_text(encoding="utf-8")
    brands, products = _extract("seedBrands", text), _extract("seedProducts", text)
    with SessionLocal() as db:
        by_name: dict[str, Brand] = {b.name: b for b in db.scalars(select(Brand))}
        for b in brands:
            if b["name"] not in by_name:
                by_name[b["name"]] = Brand(name=b["name"], slug=b["slug"])
                db.add(by_name[b["name"]])
        db.flush()
        existing = set(db.scalars(select(Product.slug)))
        added = 0
        for p in products:
            if p["slug"] in existing:
                continue
            prod = Product(
                slug=p["slug"], name=p["name"], brand_id=by_name[p["brand"]].id, price=p.get("price"),
                featured=p["featured"], best_price=p["bestPrice"],
                status="published" if p["published"] else "draft",
            )
            prod.images.append(ProductImage(url=p["image"], alt=p["name"]))
            db.add(prod)
            added += 1
        db.commit()
    print(f"brands={len(by_name)} products added={added}")


if __name__ == "__main__":
    main()
