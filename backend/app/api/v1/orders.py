from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, selectinload

from app.core.db import get_db
from app.core.ratelimit import limiter
from app.models import Order, OrderItem, OrderStatusHistory, Product
from app.orders.pricing import InvalidOrder, Line, compute_totals, merge_requested
from app.orders.state import OrderStatus
from app.orders.tracking import new_reference, phones_match
from app.schemas.orders import OrderCreated, OrderIn, TimelineEntry, TrackIn, TrackItem, TrackOut

router = APIRouter(prefix="/orders", tags=["orders"])

_NOT_FOUND = HTTPException(status_code=404, detail="Order not found")  # same answer for wrong ref and wrong phone


@router.post("", response_model=OrderCreated, status_code=201)
@limiter.limit("10/minute")
def create_order(request: Request, payload: OrderIn, db: Session = Depends(get_db)):
    # Same key => same order. A double-click or a retry after a timeout never creates a second order.
    existing = db.scalar(select(Order).where(Order.idempotency_key == payload.idempotency_key))
    if existing:
        return OrderCreated(reference=existing.reference, status=existing.status)

    if payload.delivery_method == "home_delivery" and len(payload.address.strip()) < 10:
        raise HTTPException(status_code=422, detail="A delivery address is required for home delivery")

    try:
        wanted = merge_requested([(i.slug, i.qty) for i in payload.items])
    except InvalidOrder as e:
        raise HTTPException(status_code=422, detail=str(e)) from e

    # Prices come from the database only. Only published products can be ordered.
    products = {
        p.slug: p
        for p in db.scalars(select(Product).where(Product.slug.in_(wanted), Product.status == "published"))
    }
    if len(products) != len(wanted):
        raise HTTPException(status_code=409, detail="One or more phones are no longer available. Please review your list.")

    totals = compute_totals([Line(slug, qty, products[slug].price) for slug, qty in wanted.items()])
    order = Order(
        reference=new_reference(), idempotency_key=payload.idempotency_key, customer_name=payload.name.strip(),
        phone=payload.phone, email=payload.email or None, delivery_method=payload.delivery_method.value,
        address=payload.address.strip() or None, note=payload.note.strip() or None, consent=payload.consent,
        status=OrderStatus.PENDING_CONFIRMATION.value, subtotal=totals.subtotal, requires_quote=totals.requires_quote,
    )
    for slug, qty in wanted.items():
        p = products[slug]
        order.items.append(OrderItem(product_id=p.id, name=f"{p.brand.name} {p.name}", unit_price=p.price, qty=qty))
    order.history.append(
        OrderStatusHistory(status=order.status, note="We have received your order request.", actor="customer")
    )
    db.add(order)
    try:
        db.commit()
    except IntegrityError:
        # lost a race with an identical concurrent submit: return the winner
        db.rollback()
        winner = db.scalar(select(Order).where(Order.idempotency_key == payload.idempotency_key))
        if winner is None:
            raise
        return OrderCreated(reference=winner.reference, status=winner.status)
    # TODO(next phase): enqueue store notification + customer acknowledgement (email/WhatsApp) as background jobs.
    return OrderCreated(reference=order.reference, status=order.status)


@router.post("/track", response_model=TrackOut)
@limiter.limit("10/minute")
def track_order(request: Request, payload: TrackIn, db: Session = Depends(get_db)):
    order = db.scalar(
        select(Order).where(Order.reference == payload.reference)
        .options(selectinload(Order.items), selectinload(Order.history))
    )
    if order is None or not phones_match(order.phone, payload.phone):
        raise _NOT_FOUND
    return TrackOut(
        reference=order.reference, status=order.status, delivery_method=order.delivery_method,
        items=[TrackItem(name=i.name, qty=i.qty) for i in order.items],
        timeline=[TimelineEntry(status=h.status, at=h.created_at, note=h.note) for h in order.history if h.customer_visible],
    )
