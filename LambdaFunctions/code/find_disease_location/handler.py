import logging
import json
import requests

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def find_disease_origin_countries(event, context):
    """
    AWS Lambda handler function to find the countries where a given disease originates from,
    based on data retrieved from an external API.
    """
    try:
        disease = event['queryStringParameters']['Disease'].lower()
        max_year = int(event['queryStringParameters']['maxYear'])
        min_year = int(event['queryStringParameters']['minYear'])
    except Exception as e:
        LOGGER.error("Missing arguments. Please include disease, maxYear, and minYear.")
        return return_response(401, {"Error": "Missing arguments"})

    if min_year > max_year:
        LOGGER.error("minYear is larger than maxYear")
        return return_response(400, {"Error": "minYear is larger than maxYear"})

    try:
        result = []
        year = max_year

        while year >= min_year:
            url = f'https://dtxrftpnumhodysjh6f4z2vu4e0seikd.lambda-url.ap-southeast-2.on.aws/DataRetrieve?year={year}'
            headers = {'Content-Type': 'application/json'}
            response = requests.get(url, headers=headers)
            
            if response.status_code != 200:
                return return_response(response.status_code, {'error': 'Failed to get data from retrieve data route'})

            data = response.json()
            year -= 1

            for outbreak in data['events']:
                if disease in outbreak['attribute']['Outbreak name'].lower() or \
                   disease in outbreak['attribute']['Sitation at a Glance'].lower() or \
                   disease in outbreak['attribute']['Description of the Situation'].lower():
                    if outbreak['attribute']['Location'] not in result:
                        result.append(outbreak['attribute']['Location'])

        LOGGER.info(f"Processed event: {event}")
        return return_response(200, result)

    except Exception as e:
        LOGGER.error(f"Error find_disease_origin_countries: {e}")
        return return_response(500, {"status": "Server error"})

def return_response(status_code, body):
    """
    Returns a formatted HTTP response.
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