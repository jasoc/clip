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
    UploadFile,
    File,
    Form,
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
    get_logger,
)
import base64

users_router = APIRouter()

logger = get_logger("users_router")


@users_router.get(
    "/me",
    response_model=HttpResponseModel[UserModel],
    status_code=status.HTTP_200_OK,
)
@users_router.get(
    "/me/",
    response_model=HttpResponseModel[UserModel],
    status_code=status.HTTP_200_OK,
    include_in_schema=False,
)
def get_me(
    user: Annotated[
        UserModel,
        Depends(get_current_user),
    ],
):
    return http_response(data=user.model_dump())


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
@users_router.put(
    "/{user_id}/",
    response_model=HttpResponseModel[UserModel],
    include_in_schema=False,
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
        db.refresh(db_user)
    return http_response(data=UserModel.from_db_model(db_user).model_dump())


@users_router.put(
    "/{user_id}/avatar",
    response_model=HttpResponseModel[UserModel],
)
@users_router.put(
    "/{user_id}/avatar/",
    response_model=HttpResponseModel[UserModel],
    include_in_schema=False,
)
async def upload_user_avatar(
    _: Annotated[
        UserModel,
        Depends(get_current_user),
    ],
    user_id: str,
    file: UploadFile = File(None),
    avatar_b64: str | None = Form(None),
):
    with context.db_session() as db:
        db_user = db.query(User).filter(User.id == user_id).first()
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        content: bytes | None = None
        if file is not None:
            content = await file.read()
        elif avatar_b64 is not None:
            try:
                # accept data URLs or raw base64
                if avatar_b64.startswith("data:"):
                    avatar_b64 = avatar_b64.split(",", 1)[1]
                content = base64.b64decode(avatar_b64)
            except Exception:
                raise HTTPException(status_code=400, detail="Invalid base64 avatar")
        else:
            raise HTTPException(status_code=400, detail="No avatar provided")
        db_user.avatar = content
        db.commit()
        db.refresh(db_user)
        return http_response(data=UserModel.from_db_model(db_user).model_dump())


@users_router.get(
    "/{user_id}/avatar",
    status_code=status.HTTP_200_OK,
)
@users_router.get(
    "/{user_id}/avatar/",
    status_code=status.HTTP_200_OK,
    include_in_schema=False,
)
async def get_user_avatar(
    _: Annotated[
        UserModel,
        Depends(get_current_user),
    ],
    user_id: str,
):
    with context.db_session() as db:
        db_user = db.query(User).filter(User.id == user_id).first()
        if db_user is None or db_user.avatar is None:
            raise HTTPException(status_code=404, detail="Avatar not found")
        # return base64 content
        return http_response(data={"avatar": base64.b64encode(db_user.avatar).decode("utf-8")})


@users_router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
@users_router.delete("/{user_id}/", status_code=status.HTTP_204_NO_CONTENT, include_in_schema=False)
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
