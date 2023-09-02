from fastapi import APIRouter, Body

from datetime import timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from schemas import Token, UserSchema
from utils import get_logger, config
from authentication import get_current_active_user, verify_password, get_user, create_access_token
from database import DBSession
from database.models import User
from pydantic import BaseModel

logger = get_logger("clip")

user_router = APIRouter()


@user_router.get("/ping")
def user_test():
    return { "ping": "pong" }


class RegisterModel(BaseModel):
    username: str = None
    password: str = None
    name: str = None
    surname: str = None
    email: str = None


@user_router.post("/register/simple")
def register_dummy(form_data: Annotated[RegisterModel, Body()]):
    logger.debug(form_data.username)
    logger.debug(form_data.email)
    logger.debug(form_data.password)
    user = get_user(form_data.username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"An user with username {form_data.username} already exists.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    with DBSession.disposable() as session:
        obj = User()
        obj.email = form_data.email
        obj.name = form_data.name
        obj.surname = form_data.surname
        obj.username = form_data.username
        session.add(obj)
        session.commit()
    logger.info(f"Registered user with username {form_data.username} and email {form_data.email}")
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=None)


@user_router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user: User = get_user(form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"No user found with username {form_data.username}.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user.username, expires_delta=access_token_expires)
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@user_router.get("/users/me/", response_model=UserSchema)
async def read_users_me(current_user: Annotated[UserSchema, Depends(get_current_active_user)]):
    return current_user


@user_router.get("/users/me/items/")
async def read_own_items(current_user: Annotated[UserSchema, Depends(get_current_active_user)]):
    return [{"item_id": "Foo", "owner": current_user.username}]
