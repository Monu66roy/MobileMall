from fastapi import APIRouter

from app.api.v1 import orders, public

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(public.router)
api_router.include_router(orders.router)
