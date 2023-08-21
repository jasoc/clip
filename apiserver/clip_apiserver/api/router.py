from fastapi import APIRouter
from api.v1 import user_router


api_v1_router = APIRouter(prefix="/v1")

api_v1_router.include_router(user_router, prefix="/user")