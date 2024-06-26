from api.v1 import sys_router, user_router
from fastapi import APIRouter

api_v1_router = APIRouter(prefix="/v1")
api_v1_router.include_router(sys_router, prefix="/sys")
api_v1_router.include_router(user_router, prefix="/user")
