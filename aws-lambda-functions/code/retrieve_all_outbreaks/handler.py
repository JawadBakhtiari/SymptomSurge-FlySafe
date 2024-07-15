import json, os
import boto3
import logging
import datetime

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def handler(event, context):
    message=f"Received Parameters: {event}"
    logInfo(message)

    if os.getenv("ENV"):
        print("ENV =", os.getenv)
    s3 = boto3.client('s3')
    try:
        query_params = event['queryStringParameters']
        year = query_params.get('year')
        bucket = 'seng3011-student'
        folder = 'SE3011-24-H11A-05/WHO-Outbreak-dataset'
        file = f'{folder}/data-set-{year}.json'

        # Make sure min and max year are within data range
        if validate_year(int(year))==0:
            message = f"Ensure minYear and maxYear is between 1996 and current year"
            logError(message)
            return returnResponse(400, message)

        # Retrieving Data
        message=f"Retrieving data from s3 bucket for {year}"
        logInfo(message)


        contents = s3.get_object(Bucket=bucket, Key=file)
        content = contents['Body'].read().decode('utf-8')


        data = json.loads(content)

        result = {
            "data_source": "WHO",
            "dataset_type": "Disease Outbreak",
            "dataset_id": f'https://seng3011-student.s3.ap-southeast-2.amazonaws.com/SE3011-24-H11A-05/WHO-Outbreak-dataset/data-set-{year}.json',
            "time_object": {
            "timestamp": str(datetime.datetime.now()),
            "timezone": "GMT+11"
            },
            "events": data['events']
        }

        # Prepare HTTP Response
        logInfo(json.dumps(result))
        return returnResponse(200, result)

    except Exception as e:
        message = f"Error hello world: {e}"
        logError(message)
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


def validate_year(year):
    if year < 1996:
        return 0
    if year > 2024:
        return 0
    return 1

# parameter = {
#   "queryStringParameters": {
#     "year": "2014",
#     "key2": "value2",
#     "key3": "value3"
#   }
# }

# print(handler(parameter, None))