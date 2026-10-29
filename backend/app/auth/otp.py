"""One-time-code logic. Pure Python (stdlib only). Raw codes are never stored: only an HMAC of the code."""
import hashlib
import hmac
import secrets
from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import StrEnum


@dataclass(frozen=True)
class OtpPolicy:
    ttl: timedelta = timedelta(minutes=5)
    max_attempts: int = 5
    resend_cooldown: timedelta = timedelta(seconds=60)
    digits: int = 6


class OtpResult(StrEnum):
    OK = "ok"
    INVALID = "invalid"
    EXPIRED = "expired"
    LOCKED = "locked"        # too many wrong attempts: challenge is dead, request a new one
    ALREADY_USED = "used"


def generate_code(digits: int = 6) -> str:
    return f"{secrets.randbelow(10**digits):0{digits}d}"


def hash_code(code: str, challenge_id: str, secret: str) -> str:
    """Bound to the challenge id so a hash cannot be replayed against another challenge."""
    return hmac.new(secret.encode(), f"{challenge_id}:{code}".encode(), hashlib.sha256).hexdigest()


def can_resend(last_sent: datetime | None, now: datetime, policy: OtpPolicy = OtpPolicy()) -> bool:
    return last_sent is None or now - last_sent >= policy.resend_cooldown


def check_code(
    *, submitted: str, stored_hash: str, challenge_id: str, secret: str,
    created_at: datetime, attempts: int, consumed: bool, now: datetime, policy: OtpPolicy = OtpPolicy(),
) -> tuple[OtpResult, int]:
    """Returns (result, new_attempt_count). The caller persists the new count and sets consumed on OK."""
    if consumed:
        return OtpResult.ALREADY_USED, attempts
    if attempts >= policy.max_attempts:
        return OtpResult.LOCKED, attempts
    if now > created_at + policy.ttl:
        return OtpResult.EXPIRED, attempts
    candidate = hash_code(submitted.strip(), challenge_id, secret)
    if hmac.compare_digest(candidate, stored_hash):
        return OtpResult.OK, attempts
    attempts += 1
    return (OtpResult.LOCKED if attempts >= policy.max_attempts else OtpResult.INVALID), attempts
