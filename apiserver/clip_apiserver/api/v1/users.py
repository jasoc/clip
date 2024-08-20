from datetime import timedelta
from authentication import get_current_user, get_password_hash, verify_password, create_access_token
from core.responses import http_response
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated, List
from database.models import User
from schemas import HttpResponseModel, UserModel, RegisterModel, TokenModel, LoginModel
from utils import context, config, get_logger

users_router = APIRouter()

logger = get_logger("users_router")


@users_router.post("/new", response_model=HttpResponseModel[UserModel], status_code=status.HTTP_201_CREATED)
async def create_user(body_user: RegisterModel):
    if context.db_session.query(User).filter(User.username == body_user.username).first():
        raise HTTPException(status_code=400, detail=f"An user with username {body_user.username} already exists")
    if context.db_session.query(User).filter(User.email == body_user.email).first():
        raise HTTPException(status_code=400, detail=f"An user with email {body_user.email} already exists")
    new_user = User()
    new_user.email = body_user.email
    new_user.name = body_user.name
    new_user.surname = body_user.surname
    new_user.username = body_user.username
    new_user.hashed_password = get_password_hash(body_user.password)
    context.db_session.add(new_user)
    context.db_session.commit()
    context.db_session.refresh(new_user)
    logger.info(f"Registered user with username {body_user.username} and email {body_user.email}")
    return http_response(status_code=201)

@users_router.post("/token", response_model=HttpResponseModel[TokenModel])
async def post_login(body_user: LoginModel):
    db_user = context.db_session.query(User).filter(User.username == body_user.username).first()
    if not db_user:
        raise HTTPException(status_code=401, detail=f"No user found with username {body_user.username}.")

    if not verify_password(body_user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    access_token_expires = timedelta(minutes=float(config.ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(body_user.username, expires_delta=access_token_expires)
    return http_response(
        data=TokenModel(access_token=access_token, token_type="bearer").model_dump(),
        status_code=200,
    )

@users_router.get("/", response_model=HttpResponseModel[List[UserModel]], status_code=status.HTTP_200_OK)
async def read_users(current_user: Annotated[UserModel, Depends(get_current_user)], skip: int = 0, limit: int = 100):
    print(context.db_session)
    users = context.db_session.query(User).offset(skip).limit(limit).all()
    return http_response(data=[UserModel.from_model(user).model_dump() for user in users])

@users_router.get("/{user_id}", response_model=HttpResponseModel[UserModel])
async def read_user(current_user: Annotated[UserModel, Depends(get_current_user)], user_id: str):
    user = context.db_session.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return http_response(data=UserModel.from_model(user).model_dump())

@users_router.put("/{user_id}", response_model=HttpResponseModel[UserModel])
async def update_user(current_user: Annotated[UserModel, Depends(get_current_user)], user_id: str, body_user: UserModel):
    db_user = context.db_session.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.email = body_user.email
    db_user.name = body_user.name
    db_user.surname = body_user.surname
    db_user.username = body_user.username
    context.db_session.commit()
    context.db_session.refresh(db_user)
    return http_response(data=db_user)

@users_router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(current_user: Annotated[UserModel, Depends(get_current_user)], user_id: str):
    db_user = context.db_session.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    context.db_session.delete(db_user)
    context.db_session.commit()
    return http_response(status_code=204)
