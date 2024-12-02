from fastapi import FastAPI

from hello.router import router as hello_router
from world.router import router as world_router

app = FastAPI(title="FastAPI Project")

app.include_router(hello_router, prefix="/hello", tags=["Hello"])
app.include_router(world_router, prefix="/world", tags=["World"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
