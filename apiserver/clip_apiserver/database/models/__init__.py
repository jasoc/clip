from sqlalchemy.orm import declarative_base

Base = declarative_base()

from .card import Card
from .user import User
