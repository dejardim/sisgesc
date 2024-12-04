from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.config import config
from app.database import sessionmanager


def init_app(init_db=True):
    lifespan = None

    if init_db:
        sessionmanager.init(config.DB_CONFIG)

        @asynccontextmanager
        async def lifespan(app: FastAPI):
            yield
            if sessionmanager._engine is not None:
                await sessionmanager.close()

    api = FastAPI(title="FastAPI", lifespan=lifespan)

    from app.user.router import router as user_router

    api.include_router(user_router)

    return api
