from typing import (
    Annotated,
)

from authentication import (
    get_current_user,
)
from core.responses import (
    http_response,
)
from fastapi import (
    APIRouter,
    Depends,
    Header,
)
from schemas import (
    UserModel,
)
from utils import (
    get_logger,
)

logger = get_logger(__name__)

sys_router = APIRouter()


@sys_router.get("/whoami")
def get_migratedb(
    user_agent: Annotated[
        str | None,
        Header(),
    ],
    user: Annotated[
        UserModel,
        Depends(get_current_user),
    ],
):
    return http_response(
        data={
            "user_agent": user_agent,
            "user": user.username,
        }
    )
