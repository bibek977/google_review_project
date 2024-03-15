from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options

import time
import json

from dotenv import load_dotenv
import os 

load_dotenv()

url:str = os.getenv('url')

class Driver:
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.maximize_window()
    driver.get(url)

    wait = WebDriverWait(driver,30)

    def reviewRelevant():
        try:
            Driver.wait.until(EC.presence_of_element_located((By.XPATH,'//button[contains(@aria-label,"Reviews for")]')))
            button = Driver.driver.find_element(By.XPATH,'//button[contains(@aria-label,"Reviews for")]')
            button.click()

            Driver.wait.until(EC.presence_of_element_located((By.XPATH, '//span[contains(text(),"Sort")]//ancestor::button')))
            sort = Driver.driver.find_element(By.XPATH, '//span[contains(text(),"Sort")]//ancestor::button')
            sort.click()

            Driver.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@role="menu"]/div[@data-index][1]')))
            relevant = Driver.driver.find_element(By.XPATH, '//div[@role="menu"]/div[@data-index][1]')
            relevant.click()

            element = Driver.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@aria-label and @role="main"]/div[2]')))

            time.sleep(5)

        except Exception as e:
            print(e)
            Driver.driver.quit()

Driver.reviewRelevant()