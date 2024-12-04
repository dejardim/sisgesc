import pytest
from fastapi.testclient import TestClient

from app import init_app


@pytest.fixture(scope="function")
def client():
    app = init_app()
    with TestClient(app) as client:
        yield client
