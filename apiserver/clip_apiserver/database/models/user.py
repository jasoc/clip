from sqlalchemy import Column, Integer, String, UUID
from sqlalchemy.orm import relationship
import uuid

from . import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, nullable=False)

    cards = relationship("Card", back_populates="owner")