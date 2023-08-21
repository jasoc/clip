import os
from dotenv import load_dotenv
from utils import config

def main():
    print(f"Debug: {__debug__}")
    
    load_dotenv()
    config.read()

    print(f"POST")
    
    from core.server import clip_server_app
    
    for route in clip_server_app.routes:
        if hasattr(route, "methods"):
            print({ 'path': route.path, 'name': route.name, 'methods': route.methods })

    import uvicorn
    uvicorn.run(
        reload=__debug__,
        app='core.server:clip_server_app',
        host=os.getenv('CLIP_APISERVER_HOST'),
        port=int(os.getenv('CLIP_APISERVER_PORT'))
    )