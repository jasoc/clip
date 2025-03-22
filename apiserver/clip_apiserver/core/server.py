from api import (
    api_v1_router,
)
from database import (
    init_clip_database,
)
from fastapi import (
    FastAPI,
)
from starlette.middleware.cors import (
    CORSMiddleware,
)

from .errors_handler import (
    add_exception_handlers,
)


def create_app() -> FastAPI:

    app = FastAPI(
        debug=False,
        title="Clip Server",
    )

    app.include_router(api_v1_router)
    add_exception_handlers(app)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.on_event("startup")
    async def init_connect():
        await init_clip_database()

    return app


clip_server_app = create_app()
