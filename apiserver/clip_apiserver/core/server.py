import os
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.cors import CORSMiddleware
from database import init_clip_database
from api import api_v1_router
from utils import config

templates = Jinja2Templates(directory="templates")

def create_app() -> FastAPI:

    app = FastAPI(debug=True, title="Clip Server")
    
    app.include_router(api_v1_router)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.on_event("startup")
    async def init_connect():
        init_clip_database()

    return app


clip_server_app = create_app()