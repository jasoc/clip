from pydantic import BaseModel


class UserSchema(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(UserSchema):
    hashed_password: str
