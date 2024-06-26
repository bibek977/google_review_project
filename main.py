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

# url:str = os.getenv('url')
url = "https://www.google.com/maps/@27.6879306,85.3226581,14z?hl=en&entry=ttu"

class Driver:
    def __init__(self,url):

        ChromeOptions = Options()
        ChromeOptions.add_argument('--headless')
        ChromeOptions.add_argument('--disable-gpu')
        ChromeOptions.add_argument('--no-sandbox')
        ChromeOptions.add_argument('--disable-dev-shm-usage')
        try:
            print("trying.............")
            self.driver = webdriver.Remote(
                command_executor="https://standalone-chrome-production-6657.up.railway.app/wd/hub",
                options=ChromeOptions
            )
            print("success.........")
            self.driver.get(url)
            print(self.driver.current_url)

        except Exception as e:
            print("error")
            print(e)

        self.wait = WebDriverWait(self.driver,30)
        # self.driver.quit()

    def get_search(self,name):
        try:
            self.wait.until(EC.presence_of_element_located((By.XPATH,'//input[@name="q"]')))
            search_input = self.driver.find_element(By.XPATH,'//input[@name="q"]')
            search_input.click()
            # Driver.driver.find_element(By.XPATH,'//input[@name="q"]').send_keys(name)
            search_input.send_keys(name)
            search_input.send_keys(Keys.ENTER)

            self.wait.until(EC.presence_of_all_elements_located((By.XPATH,"//div[@role='feed']/div/div/a")))
            search_result = self.driver.find_elements(By.XPATH,"//div[@role='feed']/div/div/a")

            search_results = []

            for i in search_result:
                # print(i.get_attribute('aria-label'))
                # print(i.get_attribute('href'))
                # name = i.find_element(By.XPATH,"parent::div/div[2]/div[4]/div/div/div/div[2]/div/div[2]")
                # print(name.text)
                try:
                    rating = i.find_element(By.XPATH,'parent::div//span[contains(@aria-label,"stars")]/span[1]').text
                except NoSuchElementException:
                    rating = "Not rated"
                # print(rating)

                try:
                    reviews = i.find_element(By.XPATH,'parent::div//span[contains(@aria-label,"stars")]/span[2]').text
                except NoSuchElementException:
                    rating = "Not reviewed"
                # print(reviews)

                name = i.get_attribute('aria-label')
                link = i.get_attribute('href')

                s = {
                    "name" : name,
                    "href" : link,
                    "rating" : rating,
                    "reviews" : reviews
                }
                search_results.append(s)

            time.sleep(5)
            self.driver.quit()

            return search_results

        except Exception as e:
            print(e)
            self.driver.quit()

d = Driver(url=url)
e = d.get_search("nabil bank")
print(e)
