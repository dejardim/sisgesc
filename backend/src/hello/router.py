from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from hello.service import get_hello_message
from database import get_db

router = APIRouter()


@router.post("/")
async def create_hello(
    message: str, db: AsyncSession = Depends(get_db)
):
    repository = HelloRepository(db)
    service = HelloService(repository)
    return await service.create_hello(message)


@router.get("/{hello_id}")
async def get_hello(hello_id: int, db: AsyncSession = Depends(get_db)):
    repository = HelloRepository(db)
    service = HelloService(repository)
    return await service.get_hello(hello_id)
