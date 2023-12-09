import uuid
from sqlalchemy import Column, Integer, String, Uuid
from . import Base

class Dashboard(Base):
    __tablename__ = "dashboard"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    json_grid = Column(String, nullable=False)
    columns = Column(Integer, nullable=False)
    rows = Column(Integer, nullable=False)