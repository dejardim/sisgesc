from pydantic import BaseModel


class UserSchemaBase(BaseModel):
    email: str
    full_name: str | None = None


class UserSchemaCreate(UserSchemaBase):
    pass


class UserSchema(UserSchemaBase):
    id: str

    class Config:
        from_attributes = True


class UserSchemaWithoutEmail(BaseModel):
    id: str
    full_name: str | None = None

    class Config:
        from_attributes = True
