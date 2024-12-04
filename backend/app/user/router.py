from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError

from app.user.service import UserService
from app.user.dependencies import get_user_service

from app.user.schemas import UserSchema, UserSchemaCreate, UserSchemaWithoutEmail
from app.user.exceptions import EmailAlreadyExistsError

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/get-user", response_model=UserSchema, status_code=200)
async def get_user(id: str, service: UserService = Depends(get_user_service)):
    try:
        user = await service.get_user(id)
        return user
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")


@router.get("/get-users", response_model=list[UserSchemaWithoutEmail], status_code=200)
async def get_users(service: UserService = Depends(get_user_service)):
    try:
        users = await service.get_users()
        return users
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")


@router.post("/create-user", response_model=UserSchema, status_code=201)
async def create_user(
    user: UserSchemaCreate, service: UserService = Depends(get_user_service)
):
    try:
        user_created = await service.create_user(user)
        return user_created
    except EmailAlreadyExistsError as e:
        raise HTTPException(status_code=400, detail=e.message)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")
