from pydantic import BaseModel
from starlette.responses import JSONResponse

def http_response(data=None, message="", success=True, status_code=200):
    return JSONResponse(
        content={"success": success, "data": data, "message": message},
        status_code=status_code
    )