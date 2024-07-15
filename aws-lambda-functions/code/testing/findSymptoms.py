# This function retrieves the dates that a disease was posted
import json
import logging
import re
import requests

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

'''
Given only 1 outbreak data returns symptoms mentioned as a set
'''
def symptoms(outbreak):
    symptomsLib = open('dict.txt', 'r')

    # print("After opening dict")

    # Create  a set
    symptoms = set()

    attributeData = outbreak['attribute'] # get the  attribute dictionary in each outbreak

    # Check for match in Symptoms dictionary
    for line in symptomsLib.readlines():
        # Iterate over attribute fields
        for outbreakAttribute in attributeData.values():

            # find matches in data and collect unique symptoms
            matches = re.findall(line.strip(),outbreakAttribute, re.IGNORECASE)
            #print(outbreakAttribute)
            #print(line)
            # print(matches)
            for word in matches:
                symptoms.add(word.lower())

    # Close file
    symptomsLib.close()
    # print(symptoms)
    return symptoms
    '''
    if len(symptoms) != 0:
        #print(outbreak[1]['attribute']['Outbreak name'])
        #print(symptoms)
        return symptoms
    else:
        return "Nothing-Reported"
    '''


def handler(event, context):

    # logging that the information is reiceved
    message=f"Received Parameters: {event}"
    logInfo(message)


    # Get Query String Parameter
    # Disease = event['queryStringParameters']['Disease']
    maxYear = int(event['queryStringParameters']['maxYear'])
    minYear = int(event['queryStringParameters']['minYear'])
    year = maxYear


    #### ERROR CHECKING ADDED HERE
    # Ensure given year range/ order is correct
    if maxYear - minYear < 0 :
        message = " ERROR : Ensure maxYear is greater than minYear "
        logError(message)
        return returnResponse(400, message)
    # Ensure given year input should not be  in future
    if maxYear > 2014 or  minYear > 2014 :
        message = " ERROR : Ensure maxYear and minYear are not in the future "
        logError(message)
        return returnResponse(400, message)
    if maxYear < 1996 or minYear < 1996  :
        message = " ERROR : Data only from 1996, enter dates greater than 1996 "
        logError(message)
        return returnResponse(400, message)



    try:
        result = []
        while(year>=minYear):
            url = 'https://dtxrftpnumhodysjh6f4z2vu4e0seikd.lambda-url.ap-southeast-2.on.aws/DataRetrieve?year=' + str(year)
            headers = {
                'Content-Type': 'application/json',
            }
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                return {
                    'statusCode': response.status_code,
                    'body': json.dumps({'error': 'failed to get data from retrieve data route'}),
                    'headers': {'Content-Type': 'application/json'}
                }
            year-=1
            data = response.json()

            # For each mini-dict in  "events": [...]
            for outbreak in data['events']: # each event in the data
                # count +=1
                result.append({
                            "event_type": "disease outbreak",
                            "attribute": {
                            'Outbreak name': outbreak['attribute']['Outbreak name'], # Extra info for identification
                            'Location': outbreak['attribute']['Location'],
                            'Date Reported': outbreak['attribute']['Date Reported'], # Extra info for identification
                            'Symptoms': list(symptoms(outbreak)) # Convert set to a list
                            }
                }
            )
        # Print result to json file
        # with open("result.json", "w") as f:
        #     json.dump(result, f)

        # LOGGER.info(f"Received event: {event}")
        # return {
        #     "statusCode": 200,
        #     "body": json.dumps(result),
        #     "headers": {
        #         "Content-Type": "application/json",
        #     },
        # }

        # Prepare HTTP Response
        logInfo(json.dumps(result))
        return returnResponse(200, result)

    except Exception as e:
        # LOGGER.error(f"Error hello world: {e}")
        # return {
        #     "statusCode": 500,
        #     "body": '{"status":"Server error"}',
        #     "headers": {
        #         "Content-Type": "application/json",
        #     },
        # }
        logError("server error 500")
        return returnResponse(500, "server error")



################# HELPER FUNCTIONS #################################################
def returnResponse(statusCode, body):
    return {
    "statusCode": statusCode,
    "body": json.dumps(body),
    "headers": {
        "Content-Type": "application/json",
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



# Test

# request = {
#   "queryStringParameters": {
#       "Disease" : "Influenza",
#       "minYear" : "2012",
#       "maxYear" : "2010"
#   }
# }


#handler(request, None)
# print(handler(request, None))
