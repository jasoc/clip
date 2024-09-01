from .session import (
    DBSession,
)
from sqlalchemy.engine import (
    URL,
)

from utils import (
    config,
    get_logger,
    context,
)

logger = get_logger(__name__)


def init_clip_database():
    url: str = URL.create(
        drivername="postgresql",
        host=config.POSTGRESQL_HOST,
        port=config.POSTGRESQL_PORT,
        username=config.POSTGRESQL_USER,
        password=config.POSTGRESQL_PASSWORD,
        database=config.POSTGRESQL_DATABASE_NAME,
    )
    context.initialize_database(url)
