import pytest
import requests
from src.config import url
import src.other as other

@pytest.fixture
def clear_store():
    requests.delete(other.CLEAR_URL, json={})

TEST_USER_EMAIL = "seng2021sox@gmail.com"

@pytest.fixture
def create_user():
    user_input = {'email': TEST_USER_EMAIL, 'password': "badpassword123", 'name_first': "Ji", 'name_last': "Sun"}
    request_data = requests.post(other.REGISTER_URL, json=user_input)
    user_info = request_data.json()
    return user_info

def test_password_too_short(clear_store, create_user):
    requests.post(other.AUTH_PASSWORDRESET_REQUEST_URL, json={"email": TEST_USER_EMAIL})
    reset_request = requests.post(other.AUTH_PASSWORDRESET_RESET_URL, json={"reset_code": "1234", "new_password": "bad"})
    assert reset_request.status_code == 400

def test_code_is_invalid(clear_store, create_user):
    # No request has been made so there is no valid code
    reset_request = requests.post(other.AUTH_PASSWORDRESET_RESET_URL, json={"reset_code": "1234", "new_password": "goodpassword4785"})
    assert reset_request.status_code == 400