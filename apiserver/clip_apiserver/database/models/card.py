from sqlalchemy import Column, Integer, String, UUID, ForeignKey
from sqlalchemy.orm import relationship
from . import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(UUID, primary_key=True)
    title = Column(String, nullable=False)
    subtitle = Column(String, nullable=False)
    url = Column(String, nullable=False)
    icon = Column(String, nullable=True)
    
    owner_id = Column(UUID, ForeignKey("users.id"))
    owner = relationship("User", back_populates="cards")