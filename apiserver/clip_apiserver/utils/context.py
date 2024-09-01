from sqlalchemy.orm import (
    sessionmaker,
    Session,
    scoped_session,
)
from sqlalchemy import (
    create_engine,
    Engine,
)
from sqlalchemy.engine import (
    URL,
)
from .logging import (
    get_logger,
)
from contextlib import (
    contextmanager,
)


logger = get_logger(__name__)


class Context:

    _database_url: URL = None
    _session_factory: sessionmaker[Session]
    _base_engine: Engine

    def __init__(
        self,
    ) -> None:
        pass

    def initialize_database(
        self,
        url: URL,
    ) -> Session:
        self._database_url = url
        self._base_engine = create_engine(url)
        self._session_factory = sessionmaker(
            autocommit=False,
            autoflush=True,
            bind=self._base_engine,
        )

    @contextmanager
    def db_session(
        self,
    ):
        connection = self._base_engine.connect()
        db_session = scoped_session(self._session_factory)
        yield db_session
        db_session.close()
        connection.close()


context = Context()
