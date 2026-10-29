from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean, CheckConstraint, DateTime, ForeignKey, Index, Integer, Numeric, String, Text, UniqueConstraint, func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class Brand(Base, TimestampMixin):
    __tablename__ = "brands"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80), unique=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    description: Mapped[str | None] = mapped_column(Text)
    logo_url: Mapped[str | None] = mapped_column(String(500))
    seo_title: Mapped[str | None] = mapped_column(String(160))
    seo_description: Mapped[str | None] = mapped_column(String(320))


class Category(Base, TimestampMixin):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80), unique=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    parent_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id", ondelete="SET NULL"))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    seo_title: Mapped[str | None] = mapped_column(String(160))
    seo_description: Mapped[str | None] = mapped_column(String(320))


class Product(Base, TimestampMixin):
    """Status workflow: draft -> published -> archived. Only `published` rows reach the public API."""

    __tablename__ = "products"
    __table_args__ = (
        CheckConstraint("price IS NULL OR price >= 0", name="ck_product_price_nonneg"),
        CheckConstraint(
            "original_price IS NULL OR price IS NULL OR original_price >= price", name="ck_product_discount_valid"
        ),
        Index("ix_products_status_featured", "status", "featured"),
    )
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(160))
    brand_id: Mapped[int] = mapped_column(ForeignKey("brands.id"), index=True)
    category_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id"), index=True)
    model_number: Mapped[str | None] = mapped_column(String(80))
    description: Mapped[str | None] = mapped_column(Text)
    warranty: Mapped[str | None] = mapped_column(String(200))
    # null price => "Call for today's price" (store quotes by phone). Never invent a price.
    price: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    original_price: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    best_price: Mapped[bool] = mapped_column(Boolean, default=False)
    status: Mapped[str] = mapped_column(String(12), default="draft", index=True)
    seo_title: Mapped[str | None] = mapped_column(String(160))
    seo_description: Mapped[str | None] = mapped_column(String(320))
    seo_image: Mapped[str | None] = mapped_column(String(500))

    brand: Mapped[Brand] = relationship(lazy="joined")
    images: Mapped[list["ProductImage"]] = relationship(
        back_populates="product", order_by="ProductImage.sort_order", cascade="all, delete-orphan"
    )
    specs: Mapped[list["ProductSpec"]] = relationship(
        back_populates="product", order_by="ProductSpec.sort_order", cascade="all, delete-orphan"
    )
    variants: Mapped[list["ProductVariant"]] = relationship(back_populates="product", cascade="all, delete-orphan")


class ProductImage(Base):
    __tablename__ = "product_images"
    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), index=True)
    url: Mapped[str] = mapped_column(String(500))
    alt: Mapped[str | None] = mapped_column(String(200))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    product: Mapped[Product] = relationship(back_populates="images")


class ProductSpec(Base):
    """Key specification rows, e.g. group='Display', label='Size', value='6.7 inch'. Entered by admin, never invented."""

    __tablename__ = "product_specs"
    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), index=True)
    group: Mapped[str] = mapped_column(String(60), default="General")
    label: Mapped[str] = mapped_column(String(80))
    value: Mapped[str] = mapped_column(String(300))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    product: Mapped[Product] = relationship(back_populates="specs")


class ProductVariant(Base, TimestampMixin):
    """A sellable combination (RAM/storage/colour). Stock lives in Inventory, keyed by variant."""

    __tablename__ = "product_variants"
    __table_args__ = (
        UniqueConstraint("product_id", "sku", name="uq_variant_sku"),
        CheckConstraint("price IS NULL OR price >= 0", name="ck_variant_price_nonneg"),
    )
    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), index=True)
    sku: Mapped[str] = mapped_column(String(80))
    ram: Mapped[str | None] = mapped_column(String(20))
    storage: Mapped[str | None] = mapped_column(String(20))
    color: Mapped[str | None] = mapped_column(String(40))
    price: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    attributes: Mapped[dict | None] = mapped_column(JSONB)
    product: Mapped[Product] = relationship(back_populates="variants")
    inventory: Mapped["Inventory | None"] = relationship(back_populates="variant", uselist=False)


class Inventory(Base):
    """Quantity on hand and reserved. Public stock status is derived from this, never typed in by hand."""

    __tablename__ = "inventory"
    __table_args__ = (
        CheckConstraint("quantity >= 0", name="ck_inventory_qty_nonneg"),
        CheckConstraint("reserved >= 0 AND reserved <= quantity", name="ck_inventory_reserved_valid"),
    )
    variant_id: Mapped[int] = mapped_column(ForeignKey("product_variants.id", ondelete="CASCADE"), primary_key=True)
    quantity: Mapped[int] = mapped_column(Integer, default=0)
    reserved: Mapped[int] = mapped_column(Integer, default=0)
    low_stock_threshold: Mapped[int] = mapped_column(Integer, default=3)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    variant: Mapped[ProductVariant] = relationship(back_populates="inventory")
