from api.v1 import auth
from schemas.user import RegisterModel
from sqlalchemy.engine import (
    URL,
)

from utils import (
    config,
    get_logger,
    context,
)

logger = get_logger(__name__)


async def init_clip_database():
    url: str = URL.create(
        drivername="postgresql",
        host=config.POSTGRESQL_HOST,
        port=config.POSTGRESQL_PORT,
        username=config.POSTGRESQL_USER,
        password=config.POSTGRESQL_PASSWORD,
        database=config.POSTGRESQL_DATABASE_NAME,
    )
    try:
        context.initialize_database(url)
        admin_user = RegisterModel()
        admin_user.username = "admin"
        admin_user.password = "admin"
        admin_user.name = "admin"
        admin_user.surname = "admin"
        admin_user.email = "admin@clip.io"
        await auth.create_user(admin_user)
    except Exception as e:
        logger.error(e)
