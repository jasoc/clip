from fastapi import status
from fastapi.responses import JSONResponse

def http_response(
    success: bool = True, status_code: int = status.HTTP_200_OK, message: str = None, data: any = None
):
    content = {}
    content["success"] = success
    if data is not None:
        content["data"] = data
    if message is not None:
        content["message"] = message
    return JSONResponse(content=content, status_code=status_code)
