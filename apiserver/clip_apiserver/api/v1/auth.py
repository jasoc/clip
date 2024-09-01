from datetime import (
    timedelta,
)
from authentication import (
    get_password_hash,
    verify_password,
    create_access_token,
)
from core.responses import (
    http_response,
)
from fastapi import (
    APIRouter,
    HTTPException,
    status,
)
from database.models import (
    User,
)
from schemas import (
    HttpResponseModel,
    UserModel,
    RegisterModel,
    TokenModel,
    LoginModel,
)
from utils import (
    context,
    config,
    get_logger,
)

auth_router = APIRouter()

logger = get_logger("auth_router")


@auth_router.post(
    "",
    response_model=HttpResponseModel[TokenModel],
)
@auth_router.post(
    "/",
    response_model=HttpResponseModel[TokenModel],
    include_in_schema=False,
)
async def post_login(
    body_user: LoginModel,
):
    db_user = None
    with context.db_session() as db:
        db_user = db.query(User).filter(User.username == body_user.username).first()
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail=f"No user found with username {body_user.username}.",
        )
    if not verify_password(
        body_user.password,
        db_user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password",
        )
    access_token_expires = timedelta(minutes=float(config.ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        body_user.username,
        expires_delta=access_token_expires,
    )
    return http_response(
        data=TokenModel(
            access_token=access_token,
            token_type="bearer",
        ).model_dump(),
        status_code=200,
    )


@auth_router.post(
    "/register",
    response_model=HttpResponseModel[UserModel],
    status_code=status.HTTP_201_CREATED,
)
@auth_router.post(
    "/register/",
    response_model=HttpResponseModel[UserModel],
    status_code=status.HTTP_201_CREATED,
    include_in_schema=False,
)
async def create_user(
    body_user: RegisterModel,
):
    with context.db_session() as db:
        if db.query(User).filter(User.username == body_user.username).first():
            raise HTTPException(
                status_code=400,
                detail=f"An user with username {body_user.username} already exists",
            )
        if db.query(User).filter(User.email == body_user.email).first():
            raise HTTPException(
                status_code=400,
                detail=f"An user with email {body_user.email} already exists",
            )
    new_user = User()
    new_user.email = body_user.email
    new_user.name = body_user.name
    new_user.surname = body_user.surname
    new_user.username = body_user.username
    new_user.hashed_password = get_password_hash(body_user.password)
    with context.db_session() as db:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    logger.info(f"Registered user with username {body_user.username} and email {body_user.email}")
    return http_response(
        status_code=201,
        data=UserModel.from_db_model(new_user).model_dump(),
    )
