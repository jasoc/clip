from typing import Annotated
from database.models.user import User
from sqlalchemy import select
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from schemas import TokenData

from utils import config, get_logger
from database import DBSession

logger = get_logger("clip")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user(username: str) -> User:
    with DBSession.disposable() as session:
        statement = select(User).filter_by(username=username)
        return session.scalars(statement).one_or_none()

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        logger.info(payload)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user