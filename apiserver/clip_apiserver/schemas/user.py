from database.models.user import User
from pydantic import BaseModel


class UserModel(BaseModel):
    id: str = None
    name: str = None
    surname: str = None
    email: str = None
    username: str = None

    @staticmethod
    def from_model(user_model: User):
        user = UserModel()
        user.name = user_model.name
        user.surname = user_model.surname
        user.email = user_model.email
        user.username = user_model.username
        user.id = str(user_model.id)
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
