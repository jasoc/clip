from fastapi import (
    FastAPI,
    HTTPException,
    Request,
)

from .responses import (
    http_response,
)


def add_exception_handlers(
    app: FastAPI,
) -> None:

    @app.exception_handler(HTTPException)
    def http_exception_handler(
        _: Request,
        exc: HTTPException,
    ):
        return http_response(
            success=False,
            message=exc.detail,
            status_code=exc.status_code,
        )

    @app.exception_handler(Exception)
    def http_generic_exception_handler(
        _: Request,
        exc: Exception,
    ):
        return http_response(
            success=False,
            message=str(exc),
            status_code=500,
        )
