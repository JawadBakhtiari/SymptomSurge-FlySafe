import json
import logging
import requests

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def handler(event, context):
    """
    AWS Lambda handler function which returns diseases when given a
    country name and years to collect from.
    
    Parameters:
    event (dict): CountryName, min_year, max_year.
    
    Returns:
    dict: returns the list of disease outbreaks.
    """
    log_info(f"Received Parameters: {event}")

    # Get Query String Parameters
    country = event['queryStringParameters']['Country'].capitalize()
    min_year = int(event['queryStringParameters']['minYear'])
    max_year = int(event['queryStringParameters']['maxYear'])

    year = max_year

    # Validate Country
    if not validate_country(country):
        log_error(f"Invalid Country Given: {country}")
        return return_response(400, f"Invalid Country Given: {country}")

    # Validate Year Range
    if min_year > max_year:
        log_error(f"minYear: {min_year} is larger than maxYear: {max_year}")
        return return_response(400, f"minYear: {min_year} is larger than maxYear: {max_year}")

    # Ensure minYear and maxYear are within the valid data range
    if not validate_year(min_year) or not validate_year(max_year):
        log_error("Ensure minYear and maxYear are between 1996 and the current year")
        return return_response(400, "Ensure minYear and maxYear are between 1996 and the current year")

    try:
        result = []

        while year >= min_year:
            url = f'https://dtxrftpnumhodysjh6f4z2vu4e0seikd.lambda-url.ap-southeast-2.on.aws/DataRetrieve?year={year}'
            headers = {'Content-Type': 'application/json'}
            response = requests.get(url, headers=headers)
            
            if response.status_code != 200:
                log_error("Failed to retrieve data")
                return return_response(response.status_code, "Failed to retrieve data")

            year -= 1
            data = response.json()

            for outbreak in data['events']:
                if outbreak['attribute']['Location'] == country:
                    result.append({
                        "event_type": "disease outbreak",
                        "attribute": {
                            'Outbreak name': outbreak['attribute']['Outbreak name'],
                            'Date Reported': outbreak['attribute']['Date Reported'],
                            'Location': outbreak['attribute']['Location']
                        }
                    })

        log_info(json.dumps(result))
        return return_response(200, result)

    except Exception as e:
        log_error(f"Server error: {str(e)}")
        return return_response(500, "Server error")

def return_response(status_code, body):
    """
    Returns a formatted HTTP response.
    
    Parameters:
    status_code (int): The HTTP status code of the response.
    body (dict): The body of the response.
    
    Returns:
    dict: The formatted HTTP response.
    """
    return {
        "statusCode": status_code,
        "body": json.dumps(body),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Credentials": True
        }
    }

def log_info(message):
    """
    Logs an informational message.
    
    Parameters:
    message (str): The message to log.
    """
    LOGGER.info(json.dumps({"type": "info", "message": message}))

def log_error(message):
    """
    Logs an error message.
    
    Parameters:
    message (str): The message to log.
    """
    LOGGER.error(json.dumps({"type": "error", "message": message}))

def validate_country(country):
    """
    Validates if the given country is in the list of valid countries.
    
    Parameters:
    country (str): The country to validate.
    
    Returns:
    bool: True if the country is valid, False otherwise.
    """
    with open("countries.json", "r") as f:
        valid_countries = json.load(f)

    return any(current_country["name"].lower() == country.lower() for current_country in valid_countries)

def validate_year(year):
    """
    Validates if the given year is within the acceptable range (1996 to 2024).
    
    Parameters:
    year (int): The year to validate.
    
    Returns:
    bool: True if the year is valid, False otherwise.
    """
    return 1996 <= year <= 2024

# Uncomment the following lines for testing the handler function locally

# event = {
#     "queryStringParameters": {
#         "Country": "Afghanistan",
#         "minYear": "1996",
#         "maxYear": "2000"
#     }
# }
# print(handler(event, None))