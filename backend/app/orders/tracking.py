"""Non-guessable order references and phone verification for guest tracking."""
import hmac
import re
import secrets

# No 0/O/1/I/L: easy to read out over a phone call.
_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"
REFERENCE_RE = re.compile(r"^MM-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{12}$")
PHONE_RE = re.compile(r"^[6-9]\d{9}$")


def new_reference() -> str:
    """12 chars from a 31-symbol alphabet is about 59 bits of randomness from the OS CSPRNG."""
    return "MM-" + "".join(secrets.choice(_ALPHABET) for _ in range(12))


def normalize_phone(raw: str) -> str:
    digits = re.sub(r"[\s\-()]", "", raw or "")
    return re.sub(r"^(\+91|91|0)", "", digits) if len(digits) > 10 else digits


def phones_match(stored: str, supplied: str) -> bool:
    return hmac.compare_digest(normalize_phone(stored).encode(), normalize_phone(supplied).encode())
