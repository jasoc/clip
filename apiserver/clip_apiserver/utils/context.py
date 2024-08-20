from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine, Engine
from sqlalchemy.engine import URL
from .logging import get_logger


logger = get_logger(__name__)


class Context:

    database_url: URL = None
    db_session: Session

    def __init__(self) -> None:
        pass

    def initialize_database(self, url: URL) -> Session:
        self.database_url = url
        base_engine = create_engine(url)
        session = sessionmaker(base_engine)
        self.db_session = session()
        return self.db_session


context = Context()
