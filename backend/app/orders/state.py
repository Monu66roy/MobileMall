"""Order status state machine. Pure Python: no database imports, so it is unit-testable anywhere."""
from enum import StrEnum


class OrderStatus(StrEnum):
    PENDING_CONFIRMATION = "pending_confirmation"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    READY = "ready"
    SHIPPED = "shipped"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class DeliveryMethod(StrEnum):
    PICKUP = "pickup"
    HOME_DELIVERY = "home_delivery"


S = OrderStatus
_TRANSITIONS: dict[OrderStatus, set[OrderStatus]] = {
    S.PENDING_CONFIRMATION: {S.CONFIRMED, S.CANCELLED},
    S.CONFIRMED: {S.PROCESSING, S.CANCELLED},
    S.PROCESSING: {S.READY, S.CANCELLED},
    S.READY: {S.SHIPPED, S.COMPLETED, S.CANCELLED},
    S.SHIPPED: {S.COMPLETED},
    S.COMPLETED: set(),
    S.CANCELLED: set(),
}
# A customer may cancel only before the store starts preparing the order.
CUSTOMER_CANCELLABLE = frozenset({S.PENDING_CONFIRMATION, S.CONFIRMED})


class InvalidTransition(ValueError):
    pass


def allowed_next(current: OrderStatus, delivery: DeliveryMethod) -> set[OrderStatus]:
    nxt = set(_TRANSITIONS[current])
    if current == S.READY:
        # Pickup orders are handed over in store; only delivery orders go through "shipped".
        nxt.discard(S.SHIPPED if delivery == DeliveryMethod.PICKUP else S.COMPLETED)
    return nxt


def assert_transition(current: OrderStatus, target: OrderStatus, delivery: DeliveryMethod) -> None:
    if target not in allowed_next(current, delivery):
        raise InvalidTransition(f"Cannot move an order from {current} to {target}")


def customer_can_cancel(current: OrderStatus) -> bool:
    return current in CUSTOMER_CANCELLABLE
