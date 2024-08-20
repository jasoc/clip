from typing import Generic, Type, TypeVar

from pydantic import BaseModel

from .token import *
from .user import *
from .dashboard import *

T = TypeVar("T")


class HttpResponseModel(BaseModel, Generic[T]):
    sucess: bool = None
    message: str = None
    data: T = None
