from dotenv import (
    load_dotenv,
)
from utils import (
    get_logger,
)

logger = get_logger(__name__)


def main():
    logger.info("Starting Clip API Server...")
    load_dotenv()

    from core.server import (
        clip_server_app,
    )
    from utils import (
        config,
    )

    if __debug__:
        for route in clip_server_app.routes:
            if hasattr(
                route,
                "methods",
            ):
                logger.debug(
                    {
                        "path": route.path,
                        "name": route.name,
                        "methods": route.methods,
                    }
                )

    import uvicorn

    uvicorn.run(
        reload=__debug__,
        app="core.server:clip_server_app",
        host=config.CLIP_APISERVER_HOST,
        port=config.CLIP_APISERVER_PORT,
    )
