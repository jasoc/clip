import json

import pydantic
from fastapi.responses import JSONResponse


def http_response(
    data: any = None, message: str = "", success: bool = True, status_code: int = 200
):
    content = {}
    if success is not None:
        content["success"] = success
    if data is not None:
        content["data"] = data
    if message:
        content["message"] = message
    return JSONResponse(content=content, status_code=status_code)
