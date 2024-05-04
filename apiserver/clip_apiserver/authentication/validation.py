from typing import Annotated

from database import DBSession
from database.models.user import User
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from schemas import TokenDataModel
from schemas.user import UserModel
from sqlalchemy import select
from utils import config, get_logger

logger = get_logger("clip")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user(username: str) -> User:
    with DBSession.disposable() as session:
        statement = select(User).filter_by(username=username)
        return session.scalars(statement).one_or_none()


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> UserModel:
    payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
    # TODO: check for expiration
    username: str = payload.get("sub")
    if username is None:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    token_data = TokenDataModel(username=username)
    user = get_user(username=token_data.username)
    if user is None:
        raise HTTPException(status_code=401, detail=f"Could not validate credentials")
    return UserModel.from_model(user)
