from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    Name = Column(String)
    Surname = Column(Integer)
    Email = Column(Boolean, default=False)


Base.metadata.create_all(engine)