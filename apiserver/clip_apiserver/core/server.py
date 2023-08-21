import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.engine import URL
from database import DBSession
from api import api_v1_router
from utils import config

import database.models
from tests.insert_sqlalchemy import test_insert_sqlalchemy

def create_app() -> FastAPI:
    app = FastAPI(
        debug=True,
        title="Clip Server"
    )
    register_cors(app)
    register_router(app)
    register_static_file(app)
    register_init(app)

    print(config.CLIP_REMOTE_ADDRESS)

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
    print(f"\nINITTTTTTTTTTTTTTTTT BEFORE {config.POSTGRESQL_USER}\n")

    @app.on_event("startup")
    async def init_connect():
        
        print(f"\nINITTTTTTTTTTTTTTTTT {os.getenv('POSTGRESQL_USER')}\n")

        url = URL.create(
            drivername = "postgresql",
            username = os.getenv("POSTGRESQL_USER"),
            password = "mpaPhSk458Mzjfgi6pwdp4UKiUMojSzZ",
            database = "clip",
            host = "192.168.178.10",
            port = 5432
        )
        DBSession.start(url)
        DBSession.get().init_database()
    
    # @app.on_event('shutdown')
    # async def shutdown_connect():
    #     db.close()

clip_server_app = create_app()