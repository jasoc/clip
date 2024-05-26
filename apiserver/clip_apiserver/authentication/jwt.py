from datetime import datetime, timedelta, timezone

from jose import jwt
from utils import config, get_logger

logger = get_logger("clip")


def create_access_token(username: str, expires_delta: timedelta | None = None):
    to_encode = {"sub": username}
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt
