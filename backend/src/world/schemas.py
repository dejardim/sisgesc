from pydantic import BaseModel

class WorldResponse(BaseModel):
    message: str
