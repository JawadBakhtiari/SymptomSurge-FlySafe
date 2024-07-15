from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import json
import time
import requests
import sys
import datetime


driver = webdriver.Chrome()
driver.get("https://www.who.int/emergencies/disease-outbreak-news")
driver.implicitly_wait(20)


year = 2013


time.sleep(20)

# myoption = driver.find_element(By.XPATH, "/html[1]/body[1]/div[3]/section[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/span[1]/select[1]/option[4]")
# print(myoption)
# time.sleep(30)

j=1
while(True):
    i=1
    while (i<20):
        my_date = driver.find_element(By.XPATH, "/html[1]/body[1]/div[3]/section[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/a[" + str(i) + "]/h4[1]/span[2]")
        my_date = my_date.text.split("|")
        my_virus = driver.find_element(By.XPATH, "/html[1]/body[1]/div[3]/section[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/a[" + str(i) + "]/h4[1]/span[3]")
        my_virus = my_virus.text
        my_virus = my_virus.replace("–", "-")
        my_virus = my_virus.split("-")
        if(len(my_virus)!=2):
            i+=1
            continue
        further_information = driver.find_element(By.XPATH, "/html[1]/body[1]/div[3]/section[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/a[" + str(i) + "]")
        
        print(my_date)
        print(my_virus)
        print(further_information.get_attribute('href'))

        date = my_date[0].strip()
        dateReported = date.split()
        year = dateReported[2]


        try:
            time.sleep(1)
            my_page = requests.get(further_information.get_attribute('href'))
            soup = BeautifulSoup(my_page.text, 'html.parser')
            body = soup.find("article", attrs={"class":"sf-detail-body-wrapper don-revamp"})
            titles = body.findAll("h3", attrs={"class" : "don-section"})
            paragraphs = body.findAll("div", attrs={"class" : "don-content"})

            Situation = ""
            Description = ""
            Epidemiology = ""
            Public_Health_Response = ""
            Who_Risk_Assessment = ""
            Who_Advice = ""
            further_information = ""

            for title, paragraph in zip(titles, paragraphs):
                if "Glance" in title.text:
                    Situation = paragraph.text
                elif "Description" in title.text:
                    Description = paragraph.text
                elif "Epidemiology" in title.text:
                    Epidemiology = paragraph.text
                elif "Public" in title.text:
                    Public_Health_Response = paragraph.text
                elif "Risk" in title.text:
                    Who_Risk_Assessment = paragraph.text
                elif "Advice" in title.text:
                    Who_Advice = paragraph.text
                elif "Further" in title.text:
                    further_information = paragraph.text

            disease_event = {
                    "time_object": {
                        "timestamp" : str(datetime.datetime.now()),
                        "duration" : 0,
                        "duration_unit" : "day",
                        "timezone" : "GMT+11"
                    },
                    "event_type": "disease outbreak",
                    "attribute": {
                    'Outbreak name': my_virus[0].strip(),
                    'Date Reported': my_date[0].strip(),
                    'Location': my_virus[1].strip(),
                    'Sitation at a Glance': Situation.strip(),
                    'Description of the Situation': Description.strip(),
                    'Epidemiology': Epidemiology.strip(),
                    'Public Health Response': Public_Health_Response.strip(),
                    'WHO Risk Assessment': Who_Risk_Assessment.strip(),
                    'WHO Advice': Who_Advice.strip(),
                    'Further Information': further_information.strip()
                    # 'Additional information': further_information.get_attribute('href'), # Link to further information on WHO website
                    }
                }
            with open("data-set-"+ str(year) +".json", "a") as f:
                json.dump(disease_event, f)
                f.write(',')
        except:
            i+=1
            continue
        i+=1
    j+=1
    driver.find_element(By.XPATH, "/html[1]/body[1]/div[3]/section[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/a[3]").click()
    # driver.find_element(By.XPATH, "//input[contains(@aria-label, " + str(j) + ")]")
    time.sleep(5)
        

