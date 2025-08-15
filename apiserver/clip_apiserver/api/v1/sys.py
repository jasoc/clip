from core.responses import (
    http_response,
)
from fastapi import (
    APIRouter,
)
from utils import (
    get_logger,
)

logger = get_logger(__name__)

sys_router = APIRouter()


@sys_router.get("/health")
def get_healthcheck():
    return http_response(data={"status": "ok"})
