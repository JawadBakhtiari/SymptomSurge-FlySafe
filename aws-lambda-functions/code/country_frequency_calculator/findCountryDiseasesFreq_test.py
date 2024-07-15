import pytest
import coverage
import requests
import json
from handler import handler

def test_handler_function_successful_response():
    print("\nTesting successful_response:")
    event = {
      "queryStringParameters": {
          "Country" : "Afghanistan",
          "minYear" : "2022",
          "maxYear" : "2024"
      }
    }
    response = handler(event, None)
    expected_value = 1
    assert response['statusCode'] == 200
    assert json.loads(response['body']) == expected_value


def test_handler_function_successful_response_large():
    print("\nTesting successful_response:")
    event = {
      "queryStringParameters": {
          "Country" : "Afghanistan",
          "minYear" : "1998",
          "maxYear" : "2024"
      }
    }
    response = handler(event, None)
    expected_value = 21
    assert response['statusCode'] == 200
    assert json.loads(response['body']) == expected_value


def test_handler_function_invalid_params():
    event = {
        "queryStringParameters": {
            "Country": "Afghanistan",
            "minYear": "2022",
            "maxYear": "2018"
        }}

    response = handler(event, None)

    assert response['statusCode'] == 400
    expected_value =  {"Error":"minYear is larger than maxYear"}
    assert json.loads(response['body']) == expected_value

def test_handler_function_missing_params():
    event = {
        "queryStringParameters": {
            "Country": "Afghanistan",
            "maxYear": "2018"
        }}

    response = handler(event, None)

    assert response['statusCode'] == 401
    expected_value =  {"Error":"Missing arguments"}
    assert json.loads(response['body']) == expected_value

