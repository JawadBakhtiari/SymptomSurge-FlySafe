import json
import logging
import re
import requests

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def extract_symptoms(outbreak):
    """
    Given an outbreak data, returns symptoms mentioned as a set.
    
    Parameters:
    outbreak (dict): The outbreak data containing attributes.
    
    Returns:
    set: A set of symptoms mentioned in the outbreak data.
    """
    with open('dict.txt', 'r') as symptoms_lib:
        symptoms = set()
        attribute_data = outbreak['attribute']
        
        for line in symptoms_lib:
            line = line.strip()
            for outbreak_attribute in attribute_data.values():
                matches = re.findall(line, outbreak_attribute, re.IGNORECASE)
                for word in matches:
                    symptoms.add(word.lower())

    return symptoms

def handler(event, context):
    """
    AWS Lambda handler function to retrieve disease outbreak data, filter it by date,
    and return the relevant information along with symptoms.
    """
    log_info(f"Received Parameters: {event}")

    max_year = int(event['queryStringParameters']['maxYear'])
    min_year = int(event['queryStringParameters']['minYear'])

    if max_year < min_year:
        message = "ERROR: Ensure maxYear is greater than minYear"
        log_error(message)
        return return_response(400, message)
    if max_year > 2014 or min_year > 2014:
        message = "ERROR: Ensure maxYear and minYear are not in the future"
        log_error(message)
        return return_response(400, message)
    if max_year < 1996 or min_year < 1996:
        message = "ERROR: Data only from 1996, enter dates greater than 1996"
        log_error(message)
        return return_response(400, message)

    try:
        result = []
        year = max_year

        while year >= min_year:
            url = f'https://dtxrftpnumhodysjh6f4z2vu4e0seikd.lambda-url.ap-southeast-2.on.aws/DataRetrieve?year={year}'
            headers = {'Content-Type': 'application/json'}
            response = requests.get(url, headers=headers)
            
            if response.status_code != 200:
                return {
                    'statusCode': response.status_code,
                    'body': json.dumps({'error': 'Failed to get data from retrieve data route'}),
                    'headers': {'Content-Type': 'application/json'}
                }

            year -= 1
            data = response.json()

            for outbreak in data['events']:
                result.append({
                    "event_type": "disease outbreak",
                    "attribute": {
                        'Outbreak name': outbreak['attribute']['Outbreak name'],
                        'Location': outbreak['attribute']['Location'],
                        'Date Reported': outbreak['attribute']['Date Reported'],
                        'Symptoms': list(extract_symptoms(outbreak))
                    }
                })

        log_info(json.dumps(result))
        return return_response(200, result)

    except Exception as e:
        log_error(f"Server error: {e}")
        return return_response(500, "Server error")

def return_response(status_code, body):
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
    LOGGER.info(json.dumps({"type": "info", "message": message}))

def log_error(message):
    LOGGER.error(json.dumps({"type": "error", "message": message}))