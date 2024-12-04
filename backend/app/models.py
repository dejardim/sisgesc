from sqlalchemy import MetaData
from app.user.models import User as UserModel


bases = [UserModel]

metadata = MetaData()
for base in bases:
    metadata = base.metadata
