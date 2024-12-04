from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from app.user.models import User as UserModel
from app.user.schemas import UserSchemaCreate, UserSchemaWithoutEmail
from app.user.exceptions import EmailAlreadyExistsError


class UserService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user(self, user_id: str) -> UserModel:
        try:
            user = await UserModel.get(self.db, user_id)
        except SQLAlchemyError:
            raise SQLAlchemyError("An error occurred while trying to get the user")

        if not user:
            raise ValueError(f"User with id {user_id} not found")

        return user

    async def get_users(self) -> list[UserSchemaWithoutEmail]:
        try:
            users = await UserModel.get_all(self.db)
        except SQLAlchemyError:
            raise SQLAlchemyError("An error occurred while trying to get the users")

        return users

    async def create_user(self, user_create: UserSchemaCreate) -> UserModel:
        try:
            existing_user = await UserModel.get_by_email(self.db, user_create.email)
        except SQLAlchemyError:
            raise SQLAlchemyError("An error occurred while trying to create the user")

        if existing_user:
            raise EmailAlreadyExistsError(user_create.email)

        try:
            user = await UserModel.create(self.db, **user_create.model_dump())
        except SQLAlchemyError:
            raise SQLAlchemyError("An error occurred while trying to create the user")

        return user
