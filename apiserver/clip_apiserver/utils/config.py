import os

class Config:

    CLIP_REMOTE_ADDRESS: str | None = None
    CLIP_APISERVER_HOST: str = None
    CLIP_APISERVER_PORT: int = None
    POSTGRESQL_USER: str | None = None
    POSTGRESQL_PASSWORD: str | None = None
    POSTGRESQL_HOST: str | None = None
    POSTGRESQL_PORT: str | None = None
    POSTGRESQL_DATABASE_NAME: str | None = None
    ACCESS_TOKEN_EXPIRE_MINUTES: str | None = None
    SECRET_KEY: str
    
    ALGORITHM: str = "HS256"

    def __init__(self):
        self.CLIP_REMOTE_ADDRESS = os.getenv("CLIP_REMOTE_ADDRESS")
        self.CLIP_APISERVER_HOST = os.getenv("CLIP_APISERVER_HOST") or "0.0.0.0"
        self.CLIP_APISERVER_PORT = int(os.getenv("CLIP_APISERVER_PORT") or 8008)
        self.POSTGRESQL_USER = os.getenv("POSTGRESQL_USER")
        self.POSTGRESQL_PASSWORD = os.getenv("POSTGRESQL_PASSWORD")
        self.POSTGRESQL_HOST = os.getenv("POSTGRESQL_HOST")
        self.POSTGRESQL_PORT = os.getenv("POSTGRESQL_PORT")
        self.POSTGRESQL_DATABASE_NAME = os.getenv("POSTGRESQL_DATABASE_NAME")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES") or 1440
        self.SECRET_KEY = os.getenv("SECRET_KEY")

config = Config()