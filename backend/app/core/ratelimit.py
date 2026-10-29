from slowapi import Limiter
from slowapi.util import get_remote_address

# Behind a proxy, configure uvicorn --proxy-headers / forwarded-allow-ips so this sees the real client IP.
limiter = Limiter(key_func=get_remote_address, default_limits=["120/minute"])
