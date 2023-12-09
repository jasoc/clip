from fastapi import APIRouter, Request
from api.v1 import user_router, dashboards_router
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates


api_v1_router = APIRouter(prefix="/v1")
api_v1_router.include_router(user_router, prefix="/user")
api_v1_router.include_router(dashboards_router, prefix="/dashboards")