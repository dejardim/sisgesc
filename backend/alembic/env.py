from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool, MetaData
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from src.config import settings
from src.hello.models import Base as HelloBase
from src.another.models import Base as AnotherBase

# Alembic Configurations
config = context.config

# Set the database URL dynamically using settings
config.set_main_option("sqlalchemy.url", settings.database_url)

# Logging configuration
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Combine metadata from all models
target_metadata = MetaData()
for base in [HelloBase, AnotherBase]:
    target_metadata = base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    context.configure(
        url=settings.database_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
