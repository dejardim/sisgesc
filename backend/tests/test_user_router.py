import pytest
import uuid


@pytest.mark.asyncio
async def test_user_router(client):
    seed = uuid.uuid4()
    random_email = f"test-{seed}@example.com"
    random_full_name = f"Full Name Test {seed}"

    # Create user
    response = client.post(
        "/user/create-user",
        json={"email": random_email, "full_name": random_full_name},
    )
    assert response.status_code == 201

    # Get user by ID
    user_id = response.json().get("id")
    response = client.get(f"/user/get-user?id={user_id}")
    assert response.status_code == 200
    assert response.json() == {
        "id": user_id,
        "email": random_email,
        "full_name": random_full_name,
    }

    # Get all users
    response = client.get("/user/get-users")
    assert response.status_code == 200
    assert len(response.json()) >= 1

    # Check that email is not returned
    users = response.json()
    for user in users:
        assert "id" in user
        assert "full_name" in user
        assert "email" not in user
