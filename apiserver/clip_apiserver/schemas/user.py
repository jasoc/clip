from database.models.user import (
    User,
)
from pydantic import (
    BaseModel,
)
import base64


class UserModel(BaseModel):
    id: str = None
    name: str = None
    surname: str = None
    email: str = None
    username: str = None
    avatar: str | None = None  # base64 encoded

    @staticmethod
    def from_db_model(
        user_model: User,
    ):
        user = UserModel()
        user.name = user_model.name
        user.surname = user_model.surname
        user.email = user_model.email
        user.username = user_model.username
        user.id = str(user_model.id)
        user.avatar = base64.b64encode(user_model.avatar).decode("utf-8") if user_model.avatar is not None else None
        return user


class RegisterModel(BaseModel):
    username: str = None
    password: str = None
    name: str = None
    surname: str = None
    email: str = None


class LoginModel(BaseModel):
    username: str = None
    password: str = None
