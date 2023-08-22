import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from database import init_clip_database
from api import api_v1_router
from utils import config


def create_app() -> FastAPI:
    app = FastAPI(
        debug=True,
        title="Clip Server"
    )
    register_cors(app)
    register_router(app)
    register_static_file(app)
    register_init(app)

    return app


def register_static_file(app: FastAPI) -> None:
    if not os.path.exists("./static"):
        os.mkdir("./static")
    app.mount("/static", StaticFiles(directory="static"), name="static")


def register_cors(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[config.CLIP_REMOTE_ADDRESS or "*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def register_router(app: FastAPI) -> None:
    app.include_router(
        api_v1_router,
    )


def register_init(app: FastAPI) -> None:

    @app.on_event("startup")
    async def init_connect():
        init_clip_database()


clip_server_app = create_app()