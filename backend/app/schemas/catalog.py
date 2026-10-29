from decimal import Decimal
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, PlainSerializer
from pydantic.alias_generators import to_camel

# Money is stored as Decimal but sent to the browser as a plain JSON number (rupees), matching the frontend types.
Money = Annotated[Decimal, PlainSerializer(lambda v: float(v), return_type=float, when_used="json")]


class CamelModel(BaseModel):
    """camelCase on the wire (frontend contract), snake_case in Python."""

    model_config = ConfigDict(from_attributes=True, alias_generator=to_camel, populate_by_name=True)


class BrandOut(CamelModel):
    id: int
    name: str
    slug: str
    description: str | None = None


class SpecOut(CamelModel):
    group: str
    label: str
    value: str


class ImageOut(CamelModel):
    url: str
    alt: str | None = None


class VariantOut(CamelModel):
    id: int
    sku: str
    ram: str | None
    storage: str | None
    color: str | None
    price: Money | None
    # Derived from real inventory. "unknown" = no inventory row, so we make no availability claim.
    stock_status: Literal["in_stock", "low_stock", "out_of_stock", "unknown"]


class ProductListOut(CamelModel):
    id: int
    slug: str
    name: str
    brand: str
    image: str | None
    price: Money | None
    original_price: Money | None
    featured: bool
    best_price: bool
    published: bool = True


class ProductDetailOut(ProductListOut):
    model_number: str | None
    description: str | None
    warranty: str | None
    images: list[ImageOut]
    specs: list[SpecOut]
    variants: list[VariantOut]
    related: list[ProductListOut]
    seo_title: str | None
    seo_description: str | None
