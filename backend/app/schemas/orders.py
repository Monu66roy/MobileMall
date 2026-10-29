from datetime import datetime
from typing import Literal

from pydantic import EmailStr, Field, field_validator

from app.orders.state import DeliveryMethod
from app.orders.tracking import PHONE_RE, REFERENCE_RE, normalize_phone
from app.schemas.catalog import CamelModel

Status = Literal["pending_confirmation", "confirmed", "processing", "ready", "shipped", "completed", "cancelled"]


class OrderItemIn(CamelModel):
    slug: str = Field(min_length=1, max_length=160)
    qty: int = Field(ge=1, le=10)


class OrderIn(CamelModel):
    """No price, total or discount fields exist on purpose: unknown fields are ignored, never trusted."""

    idempotency_key: str = Field(min_length=8, max_length=64, pattern=r"^[A-Za-z0-9_-]+$")
    name: str = Field(min_length=2, max_length=120)
    phone: str
    email: EmailStr | Literal[""] = ""
    delivery_method: DeliveryMethod
    address: str = Field(default="", max_length=500)
    note: str = Field(default="", max_length=500)
    consent: bool
    items: list[OrderItemIn] = Field(min_length=1, max_length=20)

    @field_validator("phone")
    @classmethod
    def valid_phone(cls, v: str) -> str:
        n = normalize_phone(v)
        if not PHONE_RE.match(n):
            raise ValueError("Enter a valid 10-digit Indian mobile number")
        return n

    @field_validator("consent")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consent is required")
        return v


class OrderCreated(CamelModel):
    reference: str
    status: Status


class TrackIn(CamelModel):
    reference: str = Field(pattern=REFERENCE_RE.pattern)
    phone: str


class TimelineEntry(CamelModel):
    status: Status
    at: datetime
    note: str | None = None


class TrackItem(CamelModel):
    name: str
    qty: int


class TrackOut(CamelModel):
    """Deliberately limited: no address, phone, email or prices."""

    reference: str
    status: Status
    delivery_method: DeliveryMethod
    items: list[TrackItem]
    timeline: list[TimelineEntry]
