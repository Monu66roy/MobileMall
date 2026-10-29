from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models import Product
from app.schemas.catalog import ImageOut, ProductDetailOut, ProductListOut, SpecOut, VariantOut


def stock_status(variant) -> str:
    inv = variant.inventory
    if inv is None:
        return "unknown"
    available = inv.quantity - inv.reserved
    if available <= 0:
        return "out_of_stock"
    return "low_stock" if available <= inv.low_stock_threshold else "in_stock"


def to_list(p: Product) -> ProductListOut:
    return ProductListOut(
        id=p.id, slug=p.slug, name=p.name, brand=p.brand.name,
        image=p.images[0].url if p.images else None,
        price=p.price, original_price=p.original_price, featured=p.featured, best_price=p.best_price,
    )


def list_published(db: Session) -> list[Product]:
    stmt = (
        select(Product).where(Product.status == "published")
        .options(selectinload(Product.images)).order_by(Product.featured.desc(), Product.id)
    )
    return list(db.scalars(stmt).unique())


def get_detail(db: Session, slug: str) -> ProductDetailOut | None:
    stmt = (
        select(Product).where(Product.slug == slug, Product.status == "published")
        .options(selectinload(Product.images), selectinload(Product.specs), selectinload(Product.variants))
    )
    p = db.scalars(stmt).unique().first()
    if p is None:
        return None
    related_stmt = (
        select(Product).where(Product.status == "published", Product.brand_id == p.brand_id, Product.id != p.id)
        .options(selectinload(Product.images)).limit(4)
    )
    related = [to_list(r) for r in db.scalars(related_stmt).unique()]
    base = to_list(p)
    return ProductDetailOut(
        **base.model_dump(),
        model_number=p.model_number, description=p.description, warranty=p.warranty,
        images=[ImageOut.model_validate(i) for i in p.images],
        specs=[SpecOut.model_validate(s) for s in p.specs],
        variants=[
            VariantOut(id=v.id, sku=v.sku, ram=v.ram, storage=v.storage, color=v.color, price=v.price,
                       stock_status=stock_status(v))
            for v in p.variants
        ],
        related=related, seo_title=p.seo_title, seo_description=p.seo_description,
    )
