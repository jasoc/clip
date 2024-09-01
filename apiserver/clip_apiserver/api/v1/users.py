from datetime import (
    timedelta,
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
    HTTPException,
    status,
)
from typing import (
    Annotated,
    List,
)
from database.models import (
    User,
)
from schemas import (
    HttpResponseModel,
    UserModel,
)
from utils import (
    context,
    config,
    get_logger,
)

users_router = APIRouter()

logger = get_logger("users_router")


@users_router.get(
    "",
    response_model=HttpResponseModel[List[UserModel]],
    status_code=status.HTTP_200_OK,
)
@users_router.get(
    "/",
    response_model=HttpResponseModel[List[UserModel]],
    status_code=status.HTTP_200_OK,
    include_in_schema=False,
)
async def read_users(
    _: Annotated[
        UserModel,
        Depends(get_current_user),
    ],
    skip: int = 0,
    limit: int = 100,
):
    users = []
    with context.db_session() as db:
        users = db.query(User).offset(skip).limit(limit).all()
    return http_response(data=[UserModel.from_db_model(user).model_dump() for user in users])


@users_router.get(
    "/{user_id}",
    response_model=HttpResponseModel[UserModel],
)
@users_router.get(
    "/{user_id}/",
    response_model=HttpResponseModel[UserModel],
    include_in_schema=False,
)
async def read_user(
    _: Annotated[
        UserModel,
        Depends(get_current_user),
    ],
    user_id: str,
):
    user = None
    with context.db_session() as db:
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )
    return http_response(data=UserModel.from_db_model(user).model_dump())


@users_router.put(
    "/{user_id}",
    response_model=HttpResponseModel[UserModel],
)
async def update_user(
    _: Annotated[
        UserModel,
        Depends(get_current_user),
    ],
    user_id: str,
    body_user: UserModel,
):
    db_user = None
    with context.db_session() as db:
        db_user = db.query(User).filter(User.id == user_id).first()
        if db_user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )
        db_user.email = body_user.email
        db_user.name = body_user.name
        db_user.surname = body_user.surname
        db.commit()
        db.refresh(db_user)
    return http_response(data=UserModel.from_db_model(db_user).model_dump())


@users_router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_user(
    _: Annotated[
        UserModel,
        Depends(get_current_user),
    ],
    user_id: str,
):
    db_user = None
    with context.db_session() as db:
        db_user = db.query(User).filter(User.id == user_id).first()
        if db_user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )
        db.delete(db_user)
        db.commit()
    return http_response(status_code=200)
