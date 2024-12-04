import os


class Config:
    DB_CONFIG = os.getenv(
        "DB_CONFIG",
        "postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}".format(
            DB_USER=os.getenv("DB_USER", "postgres"),
            DB_PASSWORD=os.getenv("DB_PASSWORD", "docker"),
            DB_HOST=os.getenv("DB_HOST", "localhost:5432"),
            DB_NAME=os.getenv("DB_NAME", "development"),
        ),
    )


config = Config
