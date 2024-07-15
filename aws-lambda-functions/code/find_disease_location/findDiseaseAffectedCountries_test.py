import pytest
import requests
import json
import coverage
from handler import handler

def test_handler_function_successful_response():
    print("\nTesting successful_response:")
    event = {
      "queryStringParameters": {
          "Disease" : "Influenza",
          "minYear" : "2023",
          "maxYear" : "2024"
      }
    }
    response = handler(event, None)
    expected_value = ["European region", "China", "Spain", "Cambodia", "Brazil", "United Kingdom of Great Britain and Northern Ireland", "Northern China", "the Netherlands", "United States of America", "Poland", "Nigeria", "Chile", "Niger", "Ecuador"]
    assert response['statusCode'] == 200
    assert json.loads(response['body']) == expected_value


def test_handler_function_successful_response_large():
    print("\nTesting successful_response:")
    event = {
      "queryStringParameters": {
          "Disease" : "Influenza",
          "minYear" : "1998",
          "maxYear" : "2024"
      }
    }
    response = handler(event, None)
    expected_value = ["European region", "China", "Spain", "Cambodia", "Brazil", "United Kingdom of Great Britain and Northern Ireland", "Northern China", "the Netherlands", "United States of America", "Poland", "Nigeria", "Chile", "Niger", "Ecuador", "Germany", "Russian Federation", "Lao People’s Democratic Republic", "Japan", "Netherlands", "United Arab Emirates", "Republic of Korea", "Canada", "Guinea", "Saudi Arabia", "Greece", "Malaysia", "Italy", "Indonesia", "Bangladesh", "Egypt", "Viet Nam", "India", "Singapore", "South Africa", "Ghana", "Thailand", "Estonia", "Ireland", "Ukraine", "Mongolia", "Mozambique", "Peru", "Mexico", "Pakistan", "Myanmar", "Iraq", "Djibouti", "Azerbaijan", "Türkiye", "Kazakhstan", "Chad", "Panama", "Burkina Faso", "Belgium", "Madagascar", "Afghanistan"]
    assert response['statusCode'] == 200
    assert json.loads(response['body']) == expected_value


def test_handler_function_invalid_params():
    event = {
        "queryStringParameters": {
            "Disease": "Influenza",
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
            "Disease": "Influenza",
            "maxYear": "2018"
        }}

    response = handler(event, None)

    assert response['statusCode'] == 401
    expected_value =  {"Error":"Missing arguments"}
    assert json.loads(response['body']) == expected_value

