from uuid import uuid4

from sqlalchemy import Column, String, select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)

    @classmethod
    async def create(cls, db: AsyncSession, id=None, **kwargs):
        if not id:
            id = uuid4().hex

        user_record = cls(id=id, **kwargs)

        db.add(user_record)
        await db.commit()
        await db.refresh(user_record)

        return user_record

    @classmethod
    async def get(cls, db: AsyncSession, id: str):
        user_record = await db.get(cls, id)
        return user_record

    @classmethod
    async def get_all(cls, db: AsyncSession):
        query = select(cls)

        try:
            result = await db.execute(query)
            return result.scalars().all()
        except NoResultFound:
            return []

    @classmethod
    async def get_by_email(cls, db: AsyncSession, email: str):
        query = select(cls).filter(cls.email == email)

        try:
            result = await db.execute(query)
            return result.scalars().first()
        except NoResultFound:
            return None
