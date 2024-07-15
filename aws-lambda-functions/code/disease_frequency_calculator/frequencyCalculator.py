import json

'''
Python Function that takes in a disease name, and returns its frequency in outbreaks.
'''
def frequencyCalculator(Disease):
  with open("data-set.json", "r") as f:
    data = json.load(f)

  result = 0

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

  print(result)

  # Print result to json file
  with open("result.json", "w") as f:
    json.dump(result, f)
  # Return result Json object
  return result

def isValid(Num):
  try:
        intValue = int(Num)
        return True
  except ValueError:
        return False
  
frequencyCalculator("corona")