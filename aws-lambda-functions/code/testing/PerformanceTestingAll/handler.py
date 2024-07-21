import json
import logging
import requests
import boto3
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

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
        "url": 'https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/retrieve_disease_outbreaks',
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

def return_report(all_endpoints, team_name):
    filename = f"{team_name}_Performance_Test.pdf"
    i = 1
    s3 = boto3.client('s3')
    bucket = 'se3011-symptom-surge-bucket'
    filename = f"{team_name}_Performance_Test.pdf"
    try:
        while s3.get_object(Bucket=bucket, Key=f"{team_name}_Performance_Test_{i}.pdf").load():
            i += 1
        filename = f"{team_name}_Performance_Test_{i}.pdf"
    except s3.exceptions.NoSuchKey:
        filename = filename
    # Create a new PDF document
    logInfo(json.dumps(f"Creating pdf file: {filename}"))
    packet = BytesIO()
    logInfo(json.dumps(f"Writing to packet"))
    c = canvas.Canvas(packet)

    logInfo(json.dumps(f"Configuring pdf file"))
    # Set up the font
    c.setFont("Helvetica", 12)

    # Write the title
    c.drawString(100, 750, "Time Taken Test")
    c.line(100, 740, 500, 740)

    c.drawString(100, 720, f"Endpoint:")
    c.drawString(300, 720, f"Average Time Taken:")

    logInfo(json.dumps(f"Writing to pdf file"))
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

    logInfo(json.dumps(f"Saving PDF to packet!"))
    c.save()

    logInfo(json.dumps(f"Successfully created pdf file: {filename}"))
    # Upload to bucket
    s3.put_object(Bucket=bucket, Key=filename, Body=packet.getvalue())
    # s3.Bucket(bucket).upload_file(filename, filename)
    logInfo(json.dumps(f"Successfully uploaded pdf file: {filename} to s3 bucket: {bucket}"))
    url = s3.generate_presigned_url(
        ClientMethod='get_object',
        Params={
            'Bucket': bucket,
            'Key': filename
        }
    )
    logInfo(json.dumps(f"Successfully got s3 bucket url link for {filename}: {url}"))
    return url

def handler(event, context):
    results = {}
    params = event["queryStringParameters"]
    if (params.get("teamName") == None):
        endpoints = symptom_surge_endpoints
        team_name = "Symptom_Surge"
    else:
        endpoints = event["queryStringParameters"]["endpoints"]
        team_name = event["queryStringParameters"]["teamName"]
    try:
        logInfo(json.dumps(f"Beginning Performance Testing on {team_name} endpoints!"))
        try:
            for endpoint, info in endpoints.items():
                result_dict = (test_api(endpoint, info["url"], info["parameters"], info["method"]))
                time_taken = result_dict[endpoint]
                results[endpoint] = time_taken
        except Exception as e:
            message = f"Error occured with {endpoint} API: {e}"
            logError(message)
        pdf_link = return_report(results, team_name)

        logInfo(json.dumps(f"Successfully performed Performance Testing on endpoints!"))
        return {
            "statusCode": 200,
            "body": {"pdf_link": pdf_link},
            "headers": {
                "Content-Type": "application/json",
            },
            "isBase64Encoded": True
        },
    except Exception as e:
        message = f"Error occurred during testing: {e}"
        logError(message)
        return {
            "statusCode": 500,
            "body": '{"status":"Server error"}',
            "headers": {
                "Content-Type": "application/json",
            },
        }

handler({"queryStringParameters": {}}, None)