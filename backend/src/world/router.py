from fastapi import APIRouter

from world import service
from hello import service as hello_service

router = APIRouter()

@router.get("/")
async def read_hello():
    """
    Endpoint básico para testar.
    """
    return {"message": service.get_world_message()}

@router.get("/2")
async def read_hello():
    """
    Endpoint básico para testar.
    """
    return {"message": hello_service.get_hello_message()}
