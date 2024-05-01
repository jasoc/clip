from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from .responses import http_response

def http_exception_handler(request: Request, exc: HTTPException):
    return http_response(
        data={exc, request},
        message=str(exc.detail),
        status_code=exc.status_code
    )