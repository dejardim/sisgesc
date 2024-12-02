from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_say_hello():
    response = client.get("/hello/hello")  # A rota será prefixada com "/hello"
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, world!"}
