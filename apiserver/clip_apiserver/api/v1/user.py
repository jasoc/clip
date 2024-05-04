from datetime import timedelta
from typing import Annotated

from authentication import (
    create_access_token,
    get_current_user,
    get_password_hash,
    get_user,
    verify_password,
)
from core.responses import http_response
from database import DBSession
from database.models import User
from fastapi import APIRouter, Body, Depends, HTTPException
from schemas import HttpResponseModel, LoginModel, RegisterModel, UserModel
from schemas.token import TokenModel
from utils import config, get_logger

logger = get_logger("user_router")

user_router = APIRouter()


@user_router.post("/register", response_model=HttpResponseModel)
def post_register(body: Annotated[RegisterModel, Body()]):
    user = get_user(body.username)
    if user:
        raise HTTPException(
            status_code=401, detail=f"Username '{body.username}' is already in use."
        )
    with DBSession.disposable() as session:
        obj = User()
        obj.email = body.email
        obj.name = body.name
        obj.surname = body.surname
        obj.username = body.username
        obj.hashed_password = get_password_hash(body.password)
        session.add(obj)
        session.commit()

    logger.info(f"Registered user with username {body.username} and email {body.email}")
    return http_response(status_code=201)


@user_router.post("/login", response_model=HttpResponseModel[TokenModel])
async def post_login(body: Annotated[LoginModel, Body()]):
    user: User = get_user(body.username)
    if not user:
        raise HTTPException(status_code=401, detail=f"No user found with username {body.username}.")

    if not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    access_token_expires = timedelta(minutes=float(config.ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(user.username, expires_delta=access_token_expires)
    return http_response(
        data=TokenModel(access_token=access_token, token_type="bearer").model_dump(),
        status_code=200,
    )


@user_router.get("/info", response_model=HttpResponseModel[UserModel])
async def get_info(current_user: Annotated[UserModel, Depends(get_current_user)]):
    return http_response(data=current_user.model_dump())
