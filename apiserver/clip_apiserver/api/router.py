from api.v1 import dashboards_router, users_router, sys_router
from fastapi import APIRouter

api_v1_router = APIRouter(prefix="/v1")
api_v1_router.include_router(sys_router, prefix="/sys")
api_v1_router.include_router(users_router, prefix="/users")
api_v1_router.include_router(dashboards_router, prefix="/dashboards")