import unittest
from datetime import datetime, timedelta, timezone

from app.auth.otp import OtpPolicy, OtpResult, can_resend, check_code, generate_code, hash_code

SECRET = "unit-test-secret"
T0 = datetime(2026, 10, 29, 12, 0, tzinfo=timezone.utc)


def challenge(code="123456", cid="c1"):
    return dict(stored_hash=hash_code(code, cid, SECRET), challenge_id=cid, secret=SECRET, created_at=T0, consumed=False)


class Otp(unittest.TestCase):
    def test_code_shape(self):
        codes = {generate_code() for _ in range(500)}
        self.assertTrue(all(len(c) == 6 and c.isdigit() for c in codes))
        self.assertGreater(len(codes), 400)

    def test_hash_is_not_the_code_and_is_bound_to_challenge(self):
        h = hash_code("123456", "c1", SECRET)
        self.assertNotIn("123456", h)
        self.assertNotEqual(h, hash_code("123456", "c2", SECRET))
        self.assertNotEqual(h, hash_code("123456", "c1", "other-secret"))

    def test_correct_code_ok(self):
        res, n = check_code(submitted=" 123456 ", attempts=0, now=T0 + timedelta(seconds=30), **challenge())
        self.assertEqual((res, n), (OtpResult.OK, 0))

    def test_wrong_code_counts_attempts_then_locks(self):
        attempts = 0
        for i in range(4):
            res, attempts = check_code(submitted="000000", attempts=attempts, now=T0, **challenge())
            self.assertEqual(res, OtpResult.INVALID)
        res, attempts = check_code(submitted="000000", attempts=attempts, now=T0, **challenge())
        self.assertEqual((res, attempts), (OtpResult.LOCKED, 5))
        # even the right code is refused once locked
        res, _ = check_code(submitted="123456", attempts=attempts, now=T0, **challenge())
        self.assertEqual(res, OtpResult.LOCKED)

    def test_expiry(self):
        res, _ = check_code(submitted="123456", attempts=0, now=T0 + timedelta(minutes=5, seconds=1), **challenge())
        self.assertEqual(res, OtpResult.EXPIRED)

    def test_single_use(self):
        c = challenge(); c["consumed"] = True
        res, _ = check_code(submitted="123456", attempts=0, now=T0, **c)
        self.assertEqual(res, OtpResult.ALREADY_USED)

    def test_resend_cooldown(self):
        self.assertTrue(can_resend(None, T0))
        self.assertFalse(can_resend(T0, T0 + timedelta(seconds=30)))
        self.assertTrue(can_resend(T0, T0 + timedelta(seconds=60)))


if __name__ == "__main__":
    unittest.main()
