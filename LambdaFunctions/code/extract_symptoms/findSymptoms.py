import json
import re

'''
Given only 1 outbreak data returns symptoms mentioned as a set
'''
def symptoms(outbreak):

    # Create  a set
    symptoms = set()

    # Open file
    symptomsLib = open('dict.txt', 'r')

    # Create  a set
    symptoms = set()

    attributeData = outbreak[1]['attribute'] # get the  attribute dictionary in each outbreak

    # Check for match in Symptoms dictionary
    for line in symptomsLib.readlines():
        # Iterate over attribute fields
        for outbreakAttribute in attributeData.values():

            # find matches in data and collect unique symptoms
            matches = re.findall(line.strip(),outbreakAttribute)
            #print(outbreakAttribute)
            #print(line)
            #print(matches)
            for word in matches:
                symptoms.add(word)

    # Close file
    symptomsLib.close()

    return symptoms
    '''
    if len(symptoms) != 0:
        #print(outbreak[1]['attribute']['Outbreak name'])
        #print(symptoms)
        return symptoms
    else:
        return "Nothing-Reported"
    '''





'''
Opens the whole data set provided and goes through each outbreak to find Symptoms
'''
def Handler():

    # get the data inputted into variable
    with open("data-set.json", "r") as f:
        data = json.load(f)

    result = [

    ]

    # For each mini-dict in  "events": [...]
    for outbreak in enumerate(data['events']): # each event in the data
        print(outbreak)
        print("\n")
        print("\n")
        print("\n")
        print("\n")
        print("\n")

        result.append({
                    "event_type": "disease outbreak",
                    "attribute": {
                    'Outbreak name': outbreak[1]['attribute']['Outbreak name'], # Extra info for identification
                    'Date Reported': outbreak[1]['attribute']['Date Reported'], # Extra info for identification
                    'Symptoms': list(symptoms(outbreak)) # Convert set to a list
                    }
        })


    # Print result to json file
    with open("result.json", "w") as f:
        json.dump(result, f)




'''
Function Testing : for main funtion symptoms()
'''

import unittest # Python’s built-in unittest module
# all entries within <> are placeholders

class TestClass(unittest.TestCase):
    def test_Symptoms(self):
        # one symptoms
        data1 = (2723, {'event_type': 'disease outbreak', 'attribute': {'Outbreak name': '1996', 'Date Reported': '2 February 1996', 'Location': 'Liberia', 'Sitation at a Glance': '', 'Description of the Situation': '02 February 1996 Disease Outbreak Reported\n\nThe following areas have now confirmed cases of yellow fever (figures not yet available) and\nhave been added to the infected area list: Tubmanburg (Boma County), Salala (Bong\nCounty), and Greenville (Sinoe County). Supect cases have been reported from Margibi,\nMonserado and Grand Gedeh Counties. The immunization campaign is continuing in all\nthese areas as well as in Buchanan, Grand Bassa County.\n\nInformation posted on 19 December 1995: A summary of the yellow fever outbreak by the\ncountry team, UNDP and WHO reports 359 cases of yellow fever, 9 deaths in Buchanan. The\ntrue number of cases is probably higher given the level of under reporting. One case has also\nbeen confirmed in Bong County. A few suspected cases have been reported in the capital,\nMonrovia, in Cape Mount, Grand Gedeh and Maryland. The reports on suspected cases in\nLofa County were not confirmed by the WHO investigation team which went to the area from\n6-11 December. The vaccination campaign in Buchanan which started on 24 November was\ncompleted during the second week of December. A vaccination campaign to cover the\npopulation in Morovia will start shortly. The Government is supported in the campaigns to\nvaccinate and inform the population by Médecins sans Frontièrs (Belgium & France),\nUNICEF, WHO and the Norwegian Government. (19.12.95)\n\nYellow fever vaccination certificate is required from all travellers over one year of age going\nto Liberia. (See also note in Weekly Epidemiological Record No. 50, 15 December 1995).', 'Epidemiology': '', 'Public Health Response': '', 'WHO Risk Assessment': '', 'WHO Advice': '', 'Further Information': ''}})
        self.assertEqual(symptoms(data1), {'fever'})
        # many symptoms
        data2 = (2723, {'event_type': 'disease outbreak', 'attribute': {'Outbreak name': '1996', 'Date Reported': '2 February 1996', 'Location': 'Liberia', 'Sitation at a Glance': '', 'Description of the Situation': '02 February 1996 Disease Outbreak Reported\n\nThe following areas have now confirmed cases of yellow fever (figures not yet available) and\nhave been added to the infected area list: pain, and Greenville (Sinoe County). Supect cases have been reported from Margibi,\nMonserado and Grand Gedeh Counties. The immunization campaign is myalgia in all\nthese areas as well as in Buchanan, Grand Bassa County.\n\nInformation calf problems on 19 December 1995: A summary of the yellow fever outbreak by the\ncountry team, UNDP and WHO reports 359 cases of yellow fever, 9 deaths in Buchanan. The\ntrue number of cases of heart palpitations probably higher given the level of under reporting. One case has also\nbeen confirmed in Bong County. A few suspected cases have been reported in the capital,\nMonrovia, in Cape Mount, Grand Gedeh and Maryland. The reports on suspected cases in\nLofa County were not confirmed by the WHO investigation team which went to the area from\n6-11 December. The vaccination campaign in Buchanan which started on 24 November was\ncompleted during the second week of December. A vaccination campaign to cover the\npopulation in Morovia will start shortly. The Government is supported in the campaigns to\nvaccinate and inform the population by Médecins sans Frontièrs (Belgium & France),\nUNICEF, WHO and the Norwegian Government. (19.12.95)\n\nYellow fever vaccination certificate is required from all travellers over one year of age going\nto Liberia. (See also note in Weekly Epidemiological Record No. 50, 15 December 1995).', 'Epidemiology': '', 'Public Health Response': '', 'WHO Risk Assessment': '', 'WHO Advice': '', 'Further Information': ''}})
        self.assertAlmostEqual(symptoms(data2), {'myalgia', 'calf problems', 'palpitation', 'pain', 'fever'})
        # no symptoms
        data3 = (2723, {'event_type': 'disease outbreak', 'attribute': {'Outbreak name': '1996', 'Date Reported': '2 February 1996', 'Location': 'Liberia', 'Sitation at a Glance': '', 'Description of the Situation': '02 February 1996 Disease Outbreak Reported\n\nThe following areas have now confirmed cases of yellow  (figures not yet available) and\nhave been added to the  area list: , and Greenville (Sinoe County). Supect cases have been reported from Margibi,\nMonserado and Grand Gedeh Counties. The immunization campaign is  in all\nthese areas as well as in Buchanan, Grand Bassa County.\n\nInformation   on 19 December 1995: A summary of the   outbreak by the\ncountry team, UNDP and WHO reports 359 cases of yellow , 9 deaths in Buchanan. The\ntrue number of cases of   probably higher given the level of under reporting. One case has also\nbeen confirmed in Bong County. A few suspected cases have been reported in the capital,\nMonrovia, in Cape Mount, Grand Gedeh and Maryland. The reports on suspected cases in\nLofa County were not confirmed by the WHO investigation team which went to the area from\n6-11 December. The vaccination campaign in Buchanan which started on 24 November was\ncompleted during the second week of December. A vaccination campaign to cover the\npopulation in Morovia will start shortly. The Government is supported in the campaigns to\nvaccinate and inform the population by Médecins sans Frontièrs (Belgium & France),\nUNICEF, WHO and the Norwegian Government. (19.12.95)\n\nYellow  vaccination certificate is required from all travellers over one year of age going\nto Liberia. (See also note in Weekly Epidemiological Record No. 50, 15 December 1995).', 'Epidemiology': '', 'Public Health Response': '', 'WHO Risk Assessment': '', 'WHO Advice': '', 'Further Information': ''}})
        self.assertAlmostEqual(symptoms(data3), set())
        # no data
        data4 = (2723, {'event_type': 'disease outbreak', 'attribute':{}})
        self.assertAlmostEqual(symptoms(data4), set())




unittest.main()
# should say ok if it ran normally
