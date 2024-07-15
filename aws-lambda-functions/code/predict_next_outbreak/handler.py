import json
import logging
from datetime import datetime, timedelta

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def handler(event, context):
    """
    AWS Lambda handler function to predict the next disease outbreak date for a given country
    based on historical data from a JSON file.
    """
    try:
        query_params = event['queryStringParameters']
        country_name = query_params.get('Country')

        with open("data-set.json", "r") as f:
            data = json.load(f)

        recent_dates = [
            event["attribute"]['Date Reported'] for event in data['events']
            if country_name in event["attribute"]['Location'] or country_name in event["attribute"]['Description of the Situation']
        ]

        if len(recent_dates) <= 1:
            return return_response(200, {"Next Disease Date": ""})

        date_objects = [datetime.strptime(date, '%d %B %Y') for date in recent_dates]
        time_diffs = [date_objects[i] - date_objects[i+1] for i in range(len(date_objects) - 1)]
        avg_time_diff = sum(time_diffs, timedelta(0)) / len(time_diffs)

        predicted_date = date_objects[0] + avg_time_diff
        while predicted_date < datetime.now():
            predicted_date += avg_time_diff
        disease_date = predicted_date.strftime('%d %B %Y')

        LOGGER.info(f"Returning predictive date: {disease_date}")
        return return_response(200, {"Next Disease Date": disease_date})

    except Exception as e:
        LOGGER.error(f"Error with Prediction: {e}")
        return return_response(500, {'message': "Something went wrong :("})

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