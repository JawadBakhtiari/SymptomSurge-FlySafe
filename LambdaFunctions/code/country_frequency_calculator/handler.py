import requests

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def find_country_disease_frequency(event, context):
    """
    AWS Lambda handler function to find the frequency of diseases in a given country.
    """
    try:
        country = event['queryStringParameters']['Country']
        max_year = int(event['queryStringParameters']['maxYear'])
        min_year = int(event['queryStringParameters']['minYear'])
    except Exception as e:
        LOGGER.error("Missing arguments. Please include country, maxYear, and minYear.")
        return return_response(401, {"Error": "Missing arguments"})

    if min_year > max_year:
        LOGGER.error("minYear is larger than maxYear")
        return return_response(400, {"Error": "minYear is larger than maxYear"})

    try:
        result = 0
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
                if outbreak['attribute']['Location'] == country:
                    result += 1

        LOGGER.info(f"Processed event: {event}")
        return return_response(200, result)

    except Exception as e:
        LOGGER.error(f"Error find_country_disease_frequency: {e}")
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