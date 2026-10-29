"""Server-side order totals. The browser sends slugs and quantities only; prices always come from the database."""
from dataclasses import dataclass
from decimal import Decimal

MAX_LINES = 20
MAX_QTY_PER_LINE = 10


class InvalidOrder(ValueError):
    pass


@dataclass(frozen=True)
class Line:
    slug: str
    qty: int
    unit_price: Decimal | None  # None => store quotes by phone; we never guess


@dataclass(frozen=True)
class Totals:
    subtotal: Decimal  # sum of lines whose price is known
    unpriced_lines: int
    requires_quote: bool


def merge_requested(items: list[tuple[str, int]]) -> dict[str, int]:
    """Validate and merge duplicate slugs. Raises InvalidOrder on bad quantities or too many lines."""
    if not items:
        raise InvalidOrder("Order has no items")
    merged: dict[str, int] = {}
    for slug, qty in items:
        if not isinstance(qty, int) or isinstance(qty, bool) or qty < 1:
            raise InvalidOrder("Quantity must be a whole number of at least 1")
        merged[slug] = merged.get(slug, 0) + qty
    if len(merged) > MAX_LINES:
        raise InvalidOrder("Too many different items in one order")
    if any(q > MAX_QTY_PER_LINE for q in merged.values()):
        raise InvalidOrder(f"At most {MAX_QTY_PER_LINE} of one item per order")
    return merged


def compute_totals(lines: list[Line]) -> Totals:
    subtotal = Decimal("0")
    unpriced = 0
    for ln in lines:
        if ln.unit_price is None:
            unpriced += 1
            continue
        if ln.unit_price < 0:
            raise InvalidOrder("Negative price")
        subtotal += ln.unit_price * ln.qty
    return Totals(subtotal=subtotal.quantize(Decimal("0.01")), unpriced_lines=unpriced, requires_quote=unpriced > 0)
