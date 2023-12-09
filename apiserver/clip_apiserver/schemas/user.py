from pydantic import BaseModel
from sqlalchemy import Uuid


class UserSchema(BaseModel):
    name: str = None
    surname: str = None
    email: str = None
    username: str = None

class RegisterModel(BaseModel):
    username: str = None
    password: str = None
    name: str = None
    surname: str = None
    email: str = None

class LoginModel(BaseModel):
    username: str = None
    password: str = None