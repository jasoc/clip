import uuid
from sqlalchemy import (
    Column,
    ForeignKey,
    String,
    Uuid,
)
from . import (
    Base,
)


class Dashboard(Base):
    __tablename__ = "dashboards"

    id = Column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )
    name = Column(
        String,
        nullable=False,
    )
    json_grid = Column(
        String,
        nullable=False,
    )
    user_id = Column(
        Uuid,
        ForeignKey("users.id"),
        nullable=False,
    )
