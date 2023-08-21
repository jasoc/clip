from sqlalchemy import create_engine, Engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, Session
from .models import Base


class DBSession:

    _instance = None

    _url: URL = None
    _base_engine: Engine = None
    _session: Session = None
    
    def __init__(self, url: URL) -> None:
        self._base_engine = create_engine(url)
        self._session = sessionmaker(self._base_engine)

    @staticmethod
    def start(url: URL) -> None:
        DBSession._instance = DBSession(url)

    @staticmethod
    def get():
        return DBSession._instance

    @staticmethod
    def disposable() -> Session:
        return DBSession.get().get_session()
    
    def init_database(self):
        Base.metadata.create_all(self._base_engine)

    def get_session(self) -> sessionmaker:
        return self._session

    def get_url(self) -> URL:
        return self._url
    
    def get_engine(self) -> Engine:
        return self._url