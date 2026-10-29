import unittest
from decimal import Decimal

from app.orders.pricing import InvalidOrder, Line, compute_totals, merge_requested
from app.orders.state import DeliveryMethod as D
from app.orders.state import InvalidTransition, OrderStatus as S, allowed_next, assert_transition, customer_can_cancel
from app.orders.tracking import REFERENCE_RE, new_reference, normalize_phone, phones_match


class StateMachine(unittest.TestCase):
    def test_happy_path_pickup(self):
        path = [S.PENDING_CONFIRMATION, S.CONFIRMED, S.PROCESSING, S.READY, S.COMPLETED]
        for a, b in zip(path, path[1:]):
            assert_transition(a, b, D.PICKUP)

    def test_happy_path_delivery_goes_through_shipped(self):
        path = [S.PENDING_CONFIRMATION, S.CONFIRMED, S.PROCESSING, S.READY, S.SHIPPED, S.COMPLETED]
        for a, b in zip(path, path[1:]):
            assert_transition(a, b, D.HOME_DELIVERY)

    def test_pickup_cannot_ship_and_delivery_cannot_skip_shipping(self):
        with self.assertRaises(InvalidTransition):
            assert_transition(S.READY, S.SHIPPED, D.PICKUP)
        with self.assertRaises(InvalidTransition):
            assert_transition(S.READY, S.COMPLETED, D.HOME_DELIVERY)

    def test_cannot_skip_or_go_backwards(self):
        for a, b in [(S.PENDING_CONFIRMATION, S.COMPLETED), (S.CONFIRMED, S.PENDING_CONFIRMATION), (S.PROCESSING, S.SHIPPED)]:
            with self.assertRaises(InvalidTransition):
                assert_transition(a, b, D.HOME_DELIVERY)

    def test_terminal_states_are_final(self):
        for t in (S.COMPLETED, S.CANCELLED):
            self.assertEqual(allowed_next(t, D.PICKUP), set())

    def test_customer_cancel_window(self):
        self.assertTrue(customer_can_cancel(S.PENDING_CONFIRMATION))
        self.assertTrue(customer_can_cancel(S.CONFIRMED))
        for s in (S.PROCESSING, S.READY, S.SHIPPED, S.COMPLETED, S.CANCELLED):
            self.assertFalse(customer_can_cancel(s))


class Pricing(unittest.TestCase):
    def test_totals_use_decimal_and_skip_unpriced(self):
        t = compute_totals([Line("a", 2, Decimal("19999.50")), Line("b", 1, None), Line("c", 1, Decimal("0.10"))])
        self.assertEqual(t.subtotal, Decimal("39999.10"))
        self.assertEqual(t.unpriced_lines, 1)
        self.assertTrue(t.requires_quote)

    def test_all_priced_needs_no_quote(self):
        self.assertFalse(compute_totals([Line("a", 1, Decimal("100"))]).requires_quote)

    def test_negative_price_rejected(self):
        with self.assertRaises(InvalidOrder):
            compute_totals([Line("a", 1, Decimal("-1"))])

    def test_merge_duplicates(self):
        self.assertEqual(merge_requested([("a", 1), ("b", 2), ("a", 3)]), {"a": 4, "b": 2})

    def test_bad_quantities_rejected(self):
        for bad in (0, -1, True, 1.5):
            with self.assertRaises(InvalidOrder):
                merge_requested([("a", bad)])  # type: ignore[list-item]

    def test_limits(self):
        with self.assertRaises(InvalidOrder):
            merge_requested([])
        with self.assertRaises(InvalidOrder):
            merge_requested([("a", 11)])
        with self.assertRaises(InvalidOrder):
            merge_requested([(f"p{i}", 1) for i in range(21)])


class Tracking(unittest.TestCase):
    def test_reference_format_and_uniqueness(self):
        refs = {new_reference() for _ in range(2000)}
        self.assertEqual(len(refs), 2000)
        self.assertTrue(all(REFERENCE_RE.match(r) for r in refs))

    def test_phone_normalisation_and_match(self):
        self.assertEqual(normalize_phone("+91 98765-43210"), "9876543210")
        self.assertEqual(normalize_phone("09876543210"), "9876543210")
        self.assertTrue(phones_match("9876543210", "+91 9876543210"))
        self.assertFalse(phones_match("9876543210", "9876543211"))
        self.assertFalse(phones_match("9876543210", ""))


if __name__ == "__main__":
    unittest.main()
