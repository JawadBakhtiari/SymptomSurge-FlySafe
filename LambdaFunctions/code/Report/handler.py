import json
import logging
import requests
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

symptom_surge_endpoints = {
    "Data Retrieve": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/DataRetrieve',
        "parameters":{
            "queryStringParameters": {
            "year": "2024"
            }
        },
        "method": "GET"
    },
    "Report": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/Report',
        "parameters":{},
        "method": "GET"
    },
    "Frequency Calculator": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/FrequencyCalculator',
        "parameters":{
            "queryStringParameters": {
            "Disease": "Influenza",
            "minYear": 2024,
            "maxYear": 2024
            }
        },
        "method": "GET"
    },
    "Find Disease Affected Countries": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/findDiseaseaffectedCountries',
        "parameters":{
            "queryStringParameters": {
            "Disease": "Influenza"
            }
        },
        "method": "GET"
    },
    "Country Disease Frequency": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/CountryDiseaseFreq',
        "parameters":{
            "queryStringParameters": {
            "Country": "Australia"
            }
        },
        "method": "GET"
    },
    "Disease Dates": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/DiseaseDates',
        "parameters":{
            "queryStringParameters": {
            "diseaseName": "Influenza",
            "minYear": 2024,
            "maxYear": 2024
            }
        },
        "method": "GET"
    },
    "Country Outbreaks": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/CountryOutbreaks',
        "parameters":{
            "queryStringParameters": {
            "Country": "Australia",
            "minYear": 2024,
            "maxYear": 2024
            }
        },
        "method": "GET"
    },
    "Find Symptom": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/Find Symptom',
        "parameters":{
            "queryStringParameters": {
            "minYear": 2024,
            "maxYear": 2024
            }
        },
        "method": "GET"
    },
    "Find Disease Symptoms": {
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/findDiseaseSymptoms',
        "parameters":{
            "queryStringParameters": {
            "diseaseName": "Influenza",
            "minYear": 2024,
            "maxYear": 2024
            }
        },
        "method": "GET"
    },

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

def test_api(endpoint, url, parameters, method):
    logInfo(json.dumps(f"Currently testing {endpoint} endpoint"))
    method = method.lower()
    time_taken = 0
    for _ in range(0, 5):
        if method == 'get':
            response = requests.get(url, params=parameters)
        elif method == 'post' or method == 'put' or method == 'delete':
            response = requests.post(url, json=parameters)
        time_taken += response.elapsed.total_seconds()

    average_time_taken = time_taken / 5
    logInfo(json.dumps(f"Completed testing {endpoint} endpoint"))
    return {endpoint: average_time_taken}

def return_report(all_endpoints):
    filename = "Performance_Test"
    i = 1
    if os.path.exists("Performance_Test.pdf"):
        while os.path.exists(f"Performance_Test_{i}.pdf"):
            i += 1
        filename = f"Performance_Test_{i}"

    filename += ".pdf"

    # Create a new PDF document
    c = canvas.Canvas(filename, pagesize=letter)

    # Set up the font
    c.setFont("Helvetica", 12)

    # Write the title
    c.drawString(100, 750, "Time Taken Test")
    c.line(100, 740, 500, 740)

    c.drawString(100, 720, f"Endpoint:")
    c.drawString(300, 720, f"Average Time Taken:")

    # Write endpoints and average times
    y = 700
    i = 0
    total_time = 0
    for endpoint, average_time in all_endpoints.items():
        c.drawString(100, y - i, f"{endpoint}")
        c.drawString(300, y - i, f"{average_time} seconds")
        total_time += average_time
        i += 15

    c.drawString(100, y - i, f"Total Average Time: {total_time / len(all_endpoints.items())}")
    c.save()

    return {"filename": filename}

def handler(event, context):
    results = {}
    if (event.get("queryStringParameters") == None):
        endpoints = symptom_surge_endpoints
        logInfo(json.dumps(f"Beginning Performance Testing on Symptom Surge endpoints"))
    else:
        endpoints = event["queryStringParameters"]["endpoints"]
        team_name = event["queryStringParameters"]["teamName"]
        logInfo(json.dumps(f"Beginning Performance Testing on {team_name} endpoints!"))

    try:
        logInfo(json.dumps(f"Beginning Performance Testing on all endpoints!"))
        for endpoint, info in endpoints.items():
            try:
                result_dict = (test_api(endpoint, info["url"], info["parameters"], info["method"]))
                time_taken = result_dict[endpoint]
                results[endpoint] = time_taken
            except Exception as e:
                message = f"Error occured with {endpoint} API: {e}"
                logError(message)
        results_report = return_report(results)


    # Prepare HTTP Response
        logInfo(json.dumps(f"Successfully performed Performance Testing on all endpoints!"))
        return {
            "statusCode": 200,
            "body": json.dumps(results_report),
            "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Credentials" : True
                },
        }
    except Exception as e:
        message = f"Error occurred during testing: {e}"
        logError(message)
        return {
            "statusCode": 500,
            "body": '{"status":"Server error"}',
            "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Credentials" : True
                },
        }

handler({}, None)