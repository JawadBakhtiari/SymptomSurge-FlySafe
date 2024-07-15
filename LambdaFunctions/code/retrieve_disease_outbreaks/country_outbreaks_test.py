import pytest
import requests
import coverage
import json
from handler import handler

def test_handler_function_successful_response():
    print("\nTesting successful_response:")
    event = {
      "queryStringParameters": {
          "Country" : "Afghanistan",
          "minYear" : "1996",
          "maxYear" : "2000"
      }
    }
    response = handler(event, None)
    expected_value = [{"event_type": "disease outbreak", "attribute": {"Outbreak name": "2000", "Date Reported": "12 September 2000", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "2000", "Date Reported": "24 August 2000", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "2000", "Date Reported": "11 July 2000", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "2000", "Date Reported": "19 June 2000", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1999", "Date Reported": "7 September 1999", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1999", "Date Reported": "25 August 1999", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1999", "Date Reported": "20 July 1999", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1999", "Date Reported": "1 March 1999", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1998", "Date Reported": "2 September 1998", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1998", "Date Reported": "21 August 1998", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1998", "Date Reported": "19 August 1998", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1998", "Date Reported": "8 May 1998", "Location": "Afghanistan"}}]
    
    assert response['statusCode'] == 200
    assert json.loads(response['body']) == expected_value


def test_handler_function_invalid_country_query_string_params():
    print("\nTesting invalid_country_query_string_params:")
    event = {
      "queryStringParameters": {
          "Country" : "Aussieaussieaussieoioioi",
          "minYear" : "2000",
          "maxYear" : "2001"
      }
    }
    response = handler(event, None)
    expected_value = {"statusCode": 400, "body": "\"Invalid Country Given: Aussieaussieaussieoioioi\"", "headers": {"Content-Type": "application/json"}}

    assert response['statusCode'] == 400
    assert response['body'] == expected_value['body']


def test_handler_function_minYear_Larger_then_maxYear_query_string_params():
    print("\nminYear_Larger_then_maxYear_query_string_params")

    event = {
      "queryStringParameters": {
          "Country" : "China",
          "minYear" : "2010",
          "maxYear" : "2000"
      }
    }
    response = handler(event, None)
    expected_value = {"statusCode": 400, "body": "\"minYear: 2010 is larger then maxYear: 2000\"", "headers": {"Content-Type": "application/json"}}

    assert response['statusCode'] == 400
    assert response['body'] == expected_value['body']


def test_handler_function_invalid_year_query_string_params():
    print("\nTesting invalid_year_query_string_params:")

    event = {
      "queryStringParameters": {
          "Country" : "China",
          "minYear" : "1995",
          "maxYear" : "2000"
      }
    }
    response = handler(event, None)
    expected_value = {"statusCode": 400, "body": "\"Ensure minYear and maxYear is between 1996 and current year\"", "headers": {"Content-Type": "application/json"}}

    assert response['statusCode'] == 400
    assert response['body'] == expected_value['body']
    
