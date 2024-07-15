import json
import logging
import requests

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def handler(event, context):
    # Get Query String Parameter
    message=f"Received Parameters: {event}"
    logInfo(message)

    try:
        Disease = event['queryStringParameters']['Disease']
        maxYear = int(event['queryStringParameters']['maxYear'])
        minYear = int(event['queryStringParameters']['minYear'])
    except Exception as e:
        message = f"Missing parameters. Ensure to include: disease, minYear and maxYear."
        logError(message)
        return returnResponse(401, message)

    if minYear > maxYear:
        message = f"Error: minYear is larger than maxYear"
        logError(message)
        return returnResponse(400, message)
    year = maxYear

    try:
        result = 0
        while(year>=minYear):
            url = 'https://dtxrftpnumhodysjh6f4z2vu4e0seikd.lambda-url.ap-southeast-2.on.aws/DataRetrieve?year=' + str(year)
            headers = {
                'Content-Type': 'application/json',
            }
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                message = "failed to get data from retrieve data route"
                logError(message)
                return returnResponse(response.status_code, message)

            year-=1
            data = response.json()

            for outbreak in data['events']:
                if Disease.lower() in outbreak['attribute']['Outbreak name'].lower():
                    result = result + 1
                elif Disease.lower() in outbreak['attribute']['Sitation at a Glance'].lower():
                    result = result + 1
                # if the outbreak name is a year, and the disease isnt mentioned in the situation at a glance
                # we check the description for the disease name
                elif isValid(outbreak['attribute']['Outbreak name']):
                    if Disease.lower() in outbreak['attribute']['Description of the Situation'].lower():
                        result = result + 1


        # Prepare Response
        # with open("result.json", "w") as f:
        #     json.dump(result, f)
        # Prepare HTTP Response
        logInfo(json.dumps(result))
        return returnResponse(200, result)

    except Exception as e:
        logError("server error 500")
        return returnResponse(500, "server error")

def returnResponse(statusCode, body):
    return {
    "statusCode": statusCode,
    "body": json.dumps(body),
    "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Credentials" : True
        }
    }

def logInfo(message):
    info = {
        "type": "info",
        "message": message
    }
    LOGGER.info(json.dumps(info))

def logError(message):
    error = {
        "type": "error",
        "message": message
    }
    LOGGER.error(json.dumps(error))

def isValid(Num):
    try:
          intValue = int(Num)
          return True
    except ValueError:
          return False


# Test

# request = {
#   "queryStringParameters": {
#       "Disease" : "Influenza",
#       "maxYear" : "2024",
#       "minYear" : "1996"
#   }
# }

# print(handler(request, None))