import secrets

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.ratelimit import limiter
from app.models import Brand, ContactEnquiry
from app.schemas.catalog import BrandOut, ProductDetailOut, ProductListOut
from app.schemas.contact import ContactIn, ContactOut
from app.services import catalog

router = APIRouter()


@router.get("/products", response_model=list[ProductListOut])
def products(db: Session = Depends(get_db)):
    return [catalog.to_list(p) for p in catalog.list_published(db)]


@router.get("/products/{slug}", response_model=ProductDetailOut)
def product_detail(slug: str, db: Session = Depends(get_db)):
    detail = catalog.get_detail(db, slug)
    if detail is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return detail


@router.get("/brands", response_model=list[BrandOut])
def brands(db: Session = Depends(get_db)):
    return list(db.scalars(select(Brand).order_by(Brand.name)))


@router.post("/contact", response_model=ContactOut, status_code=201)
@limiter.limit("5/minute")
def contact(request: Request, payload: ContactIn, db: Session = Depends(get_db)):
    # Honeypot: pretend success so bots learn nothing, but store nothing.
    if payload.website:
        return ContactOut(reference="MM-ENQ-00000000")
    ref = f"MM-ENQ-{secrets.token_hex(4).upper()}"
    db.add(ContactEnquiry(
        reference=ref, name=payload.name, email=payload.email, phone=payload.phone or None,
        subject=payload.subject, message=payload.message, consent=payload.consent,
    ))
    db.commit()
    # TODO(next phase): enqueue store notification + acknowledgement email as a background job.
    return ContactOut(reference=ref)
