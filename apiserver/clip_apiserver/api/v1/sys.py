
from fastapi import APIRouter
from fastapi import Depends, status
from fastapi.responses import JSONResponse

from schemas import UserSchema
from typing import Annotated
from utils import get_logger
from authentication import get_current_user
from database import DBSession

logger = get_logger(__name__)

sys_router = APIRouter()

@sys_router.get("/whoami")
def get_migratedb(user: Annotated[UserSchema, Depends(get_current_user)]):
    return
