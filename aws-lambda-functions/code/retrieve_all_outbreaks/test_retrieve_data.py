import pytest
import requests
import logging
import json
import hashlib

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def test_handler_function_successful_response():
    print("\nTesting successful_response:")

    year = 2023

    url = 'https://dtxrftpnumhodysjh6f4z2vu4e0seikd.lambda-url.ap-southeast-2.on.aws/DataRetrieve?year=' + str(year)
    headers = {
        'Content-Type': 'application/json',
    }
    response = requests.get(url, headers=headers)
    assert response.status_code == 200

    response = response.json()

    with open("result.json", "w") as f:
       json.dump(response, f)

    with open('result.json') as f:
      expectedResult = json.load(f)

    assert response==expectedResult

def test_handler_function_invalid_year_string_params():
    print("\nTesting invalid_year_string_params:")

    year = 2052

    url = 'https://dtxrftpnumhodysjh6f4z2vu4e0seikd.lambda-url.ap-southeast-2.on.aws/DataRetrieve?year=' + str(year)
    headers = {
        'Content-Type': 'application/json',
    }
    response = requests.get(url, headers=headers)
    data = response.json()

    assert response.status_code == 400
    assert data == "Ensure minYear and maxYear is between 1996 and current year"

# test_handler_function_successful_response()
# test_handler_function_invalid_year_string_params()