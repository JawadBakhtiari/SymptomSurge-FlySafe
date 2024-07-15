import json
import logging
import requests
import sys
import datetime
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

def handler(event, context):
    """
    AWS Lambda handler function to scrape the latest disease outbreaks from the WHO website,
    parse the data, and update the back-end database.

    Returns:
    dict: Updated List of Disease Outbreaks.
    """
    try:
        driver = webdriver.Chrome()
        driver.get("https://www.who.int/emergencies/disease-outbreak-news")
        driver.implicitly_wait(20)

        today = datetime.date.today()
        year = today.year

        result = {
            "events": []
        }

        page_number = 1
        while True:
            item_number = 1
            while item_number < 20:
                try:
                    date_element = driver.find_element(By.XPATH, f"/html/body/div[3]/section/div[3]/div/div/div/div/div[2]/div/div[3]/div/div/a[{item_number}]/h4/span[2]")
                    date_text = date_element.text.split("|")[0].strip()
                    virus_element = driver.find_element(By.XPATH, f"/html/body/div[3]/section/div[3]/div/div/div/div/div[2]/div/div[3]/div/div/a[{item_number}]/h4/span[3]")
                    virus_text = virus_element.text.replace("–", "-").strip().split("-")
                    
                    if len(virus_text) != 2:
                        item_number += 1
                        continue
                    
                    link_element = driver.find_element(By.XPATH, f"/html/body/div[3]/section/div[3]/div/div/div/div/div[2]/div/div[3]/div/div/a[{item_number}]")
                    link_url = link_element.get_attribute('href')
                    
                    if int(date_text.split()[-1]) != year:
                        with open(f"data-set-{year}.json", "w") as f:
                            json.dump(result, f)
                        sys.exit(1)
                    
                    page_content = requests.get(link_url)
                    soup = BeautifulSoup(page_content.text, 'html.parser')
                    body = soup.find("article", class_="sf-detail-body-wrapper don-revamp")
                    titles = body.find_all("h3", class_="don-section")
                    paragraphs = body.find_all("div", class_="don-content")
                    
                    sections = {
                        "Situation": "",
                        "Description": "",
                        "Epidemiology": "",
                        "Public_Health_Response": "",
                        "WHO_Risk_Assessment": "",
                        "WHO_Advice": "",
                        "Further_Information": ""
                    }

                    for title, paragraph in zip(titles, paragraphs):
                        title_text = title.text
                        paragraph_text = paragraph.text.strip()
                        
                        if "Glance" in title_text:
                            sections["Situation"] = paragraph_text
                        elif "Description" in title_text:
                            sections["Description"] = paragraph_text
                        elif "Epidemiology" in title_text:
                            sections["Epidemiology"] = paragraph_text
                        elif "Public" in title_text:
                            sections["Public_Health_Response"] = paragraph_text
                        elif "Risk" in title_text:
                            sections["WHO_Risk_Assessment"] = paragraph_text
                        elif "Advice" in title_text:
                            sections["WHO_Advice"] = paragraph_text
                        elif "Further" in title_text:
                            sections["Further_Information"] = paragraph_text

                    disease_event = {
                        "time_object": {
                            "timestamp": str(datetime.datetime.now()),
                            "duration": 0,
                            "duration_unit": "day",
                            "timezone": "GMT+11"
                        },
                        "event_type": "disease outbreak",
                        "attribute": {
                            'Outbreak name': virus_text[0].strip(),
                            'Date Reported': date_text,
                            'Location': virus_text[1].strip(),
                            'Situation at a Glance': sections["Situation"],
                            'Description of the Situation': sections["Description"],
                            'Epidemiology': sections["Epidemiology"],
                            'Public Health Response': sections["Public_Health_Response"],
                            'WHO Risk Assessment': sections["WHO_Risk_Assessment"],
                            'WHO Advice': sections["WHO_Advice"],
                            'Further Information': sections["Further_Information"]
                        }
                    }
                    result["events"].append(disease_event)
                except Exception as e:
                    item_number += 1
                    continue
                
                item_number += 1

            page_number += 1
            try:
                next_button = driver.find_element(By.XPATH, f"/html/body/div[3]/section/div[3]/div/div/div/div/div[2]/div/div[3]/div[2]/a[3]")
                next_button.click()
            except Exception as e:
                break

            time.sleep(5)

        LOGGER.info(f"Processed event: {event}")
        return {
            "statusCode": 200,
            "body": json.dumps(result),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Credentials": True
            }
        }
    except Exception as e:
        LOGGER.error(f"Error: {e}")
        return {
            "statusCode": 500,
            "body": '{"status":"Server error"}',
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Credentials": True
            }
        }