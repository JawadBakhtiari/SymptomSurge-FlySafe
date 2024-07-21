import json
import logging
import requests

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)


def jai_1():
    print("\nTesting succesfull_frequency_disease:")

    Disease = "Coronavirus"
    minYear = 2023
    maxYear = 2024

    # Run Function through requests
    url = f"https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/FrequencyCalculator?Disease={Disease}&minYear={minYear}&maxYear={maxYear}"
    headers = {
        'Content-Type': 'application/json',
    }
    response = requests.get(url, headers=headers)
    # Test Response Status Code
    assert response.status_code == 200

    # Test Response Body
    data = response.json()
    expected_value = 7
    assert data == expected_value

def test_country_frequency_calculator_1():
    print("\nTesting successful_response:")
    # Select Parameters
    country = "Afghanistan"
    minYear = "1996"
    maxYear = "2000"

    # Run Function through requests
    url = f"https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/CountryOutbreaks?Country={country}&minYear={minYear}&maxYear={maxYear}"
    headers = {
        'Content-Type': 'application/json',
    }
    response = requests.get(url, headers=headers)

    # Test Response Status Code
    assert response.status_code == 200

    # Test Response Body
    data = response.json()
    expected_value = [{"event_type": "disease outbreak", "attribute": {"Outbreak name": "2000", "Date Reported": "12 September 2000", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "2000", "Date Reported": "24 August 2000", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "2000", "Date Reported": "11 July 2000", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "2000", "Date Reported": "19 June 2000", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1999", "Date Reported": "7 September 1999", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1999", "Date Reported": "25 August 1999", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1999", "Date Reported": "20 July 1999", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1999", "Date Reported": "1 March 1999", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1998", "Date Reported": "2 September 1998", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1998", "Date Reported": "21 August 1998", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1998", "Date Reported": "19 August 1998", "Location": "Afghanistan"}}, {"event_type": "disease outbreak", "attribute": {"Outbreak name": "1998", "Date Reported": "8 May 1998", "Location": "Afghanistan"}}]
    assert data == expected_value

def handler(event, context):
    test_country_frequency_calculator_1()
    print("Successfully tested positive case for country_frequency_calculator Function")
    jai_1()
    print("Successfully tested positive case for jai Function")

request = {
  "queryStringParameters": {}
}

handler(request, None)

