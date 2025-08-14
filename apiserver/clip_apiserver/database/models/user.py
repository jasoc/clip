import uuid

from sqlalchemy import (
    Column,
    String,
    Uuid,
    LargeBinary,
)
from sqlalchemy.orm import (
    relationship,
)

from . import (
    Base,
)


class User(Base):
    __tablename__ = "users"

    id = Column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )
    name = Column(
        String,
        nullable=False,
    )
    surname = Column(
        String,
        nullable=False,
    )
    email = Column(
        String,
        nullable=True,
    )
    username = Column(
        String,
        nullable=False,
    )
    hashed_password = Column(
        String,
        nullable=False,
    )
    avatar = Column(
        LargeBinary,
        nullable=True,
    )
