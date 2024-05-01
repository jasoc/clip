from fastapi import APIRouter, Body

from datetime import timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from schemas import Token, UserSchema
from schemas.user import LoginModel, RegisterModel
from utils import get_logger, config
from authentication import (
    get_current_user,
    get_password_hash,
    verify_password,
    get_user,
    create_access_token,
)
from database import DBSession
from database.models import User
from pydantic import BaseModel

logger = get_logger("user_router")

user_router = APIRouter()


@user_router.get("/ping")
def user_test():
    return {"ping": "pong"}


@user_router.post("/register")
def register_dummy(body: Annotated[RegisterModel, Body()]):
    try:
        user = get_user(body.username)
        if user:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"error": f"Username '{body.username}' is already in use."},
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
        logger.info(
            f"Registered user with username {body.username} and email {body.email}"
        )
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=None)
    except Exception as err:
        logger.error(err)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": str(err)},
        )


@user_router.post("/login", response_model=Token)
async def login_for_access_token(body: Annotated[LoginModel, Body()]):
    try:
        user: User = get_user(body.username)
        if not user:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"error": f"No user found with username {body.username}."},
            )
        if not verify_password(body.password, user.hashed_password):
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"error": "Incorrect password."},
            )
        access_token_expires = timedelta(
            minutes=float(config.ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        access_token = create_access_token(
            user.username, expires_delta=access_token_expires
        )
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"access_token": access_token, "token_type": "bearer"},
        )
    except Exception as err:
        logger.error(err)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": str(err)},
        )


@user_router.get("/info", response_model=UserSchema)
async def read_users_me(current_user: Annotated[UserSchema, Depends(get_current_user)]):
    return current_user
