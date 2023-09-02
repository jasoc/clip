from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine, Engine
from sqlalchemy.engine import URL

from .models import Base


class DBSession:

    url: URL = None
    _base_engine: Engine = None
    
    @staticmethod
    def start(url: URL) -> None:
        DBSession.url = url
        DBSession._base_engine = create_engine(url)

    @staticmethod
    def disposable() -> Session:
        session = sessionmaker(DBSession._base_engine)
        return session()

    def init_database():
        Base.metadata.create_all(DBSession._base_engine)
