from sqlalchemy.ext.asyncio import AsyncSession, AsyncEngine, create_async_engine
from sqlalchemy.orm import sessionmaker
from src.config import settings

class Database:
    _engine: AsyncEngine | None = None
    _session_factory: sessionmaker | None = None

    @classmethod
    def get_engine(cls) -> AsyncEngine:
        if cls._engine is None:
            cls._engine = create_async_engine(settings.database_url, future=True, echo=True)
        return cls._engine

    @classmethod
    def get_session_factory(cls) -> sessionmaker:
        if cls._session_factory is None:
            cls._session_factory = sessionmaker(
                autocommit=False, autoflush=False, bind=cls.get_engine(), class_=AsyncSession
            )
        return cls._session_factory

async def get_db():
    session_factory = Database.get_session_factory()
    async with session_factory() as session:
        yield session
