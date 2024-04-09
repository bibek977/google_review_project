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

url = "https://www.google.com/maps/place/Pathao+Rider+subash/data=!4m7!3m6!1s0x39eb1bdfc7b5833f:0xd7e7af5373e02428!8m2!3d27.6907775!4d85.4020316!16s%2Fg%2F11y2jg036q!19sChIJP4O1x98b6zkRKCTgc1Ov59c?authuser=0&hl=en&rclk=1"

class Driver:
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.maximize_window()
    driver.get(url)

    wait = WebDriverWait(driver,30)

    def reviewRelevant():

        try:
            
            Driver.wait.until(EC.presence_of_element_located((By.XPATH, '//button[contains(@aria-label,"Reviews for")]')))
            button = Driver.driver.find_element(By.XPATH, '//button[contains(@aria-label,"Reviews for")]')
            button.click()

            Driver.wait.until(EC.presence_of_element_located((By.XPATH, '//span[contains(text(),"Sort")]//ancestor::button')))
            sort = Driver.driver.find_element(By.XPATH, '//span[contains(text(),"Sort")]//ancestor::button')
            sort.click()

            Driver.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@role="menu"]/div[@data-index][1]')))
            relevant = Driver.driver.find_element(By.XPATH, '//div[@role="menu"]/div[@data-index][1]')
            relevant.click()


            element = Driver.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@aria-label and @role="main"]/div[2]')))

            height = Driver.driver.execute_script('return arguments[0].scrollHeight;', element)
            while True:
                Driver.driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight;', element)
                time.sleep(5)

                new_height = Driver.driver.execute_script('return arguments[0].scrollHeight;', element)

                if height == new_height:
                    break
                height = new_height


            reviews = Driver.wait.until(EC.presence_of_all_elements_located((By.XPATH, '//div[@aria-label and @data-review-id]')))
            
            review = {}
            for i in reviews:

                image = i.find_element(By.XPATH,'div/div/div/button/img').get_attribute('src')
                name = i.find_element(By.XPATH,'div/div/div[2]/div[2]/div/button/div[1]').text

                try:
                    desc = i.find_element(By.XPATH,'div/div/div[4]/div[2]/div/span[1]').text
                except NoSuchElementException:
                    desc = "Not rated"

                stars = i.find_element(By.XPATH,'div/div/div[4]/div[1]/span[1]').get_attribute('aria-label')
                date = i.find_element(By.XPATH,'div/div/div[4]/div[1]/span[2]').text

                review[name] = {"Image" :  image, "Rate" : stars, "Time" : date, "Body" :  desc}
            return review

        except Exception as e:
            print(e)
            Driver.driver.quit()

    def getImages():

        try:
            
            Driver.wait.until(EC.presence_of_element_located((By.XPATH,'//div[contains(text(),"photos")]/parent::button')))

            photos = Driver.driver.find_element(By.XPATH,'//div[contains(text(),"photos")]/parent::button')
            photos.click()
            time.sleep(5)

            element = Driver.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@aria-label and @role="main"]/div[3]')))

            height = Driver.driver.execute_script('return arguments[0].scrollHeight;', element)
            while True:
                Driver.driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight;', element)
                time.sleep(5)

                new_height = Driver.driver.execute_script('return arguments[0].scrollHeight;', element)

                if height == new_height:
                    break
                height = new_height

            image_list = []
            images = Driver.driver.find_elements(By.XPATH,'//a[@data-photo-index]/div[@role]')

            for i in images:
                image = i.get_attribute("style")
                img = image.split('url("')[1]
                new_img = img.split('")')[0]
                if new_img == "//:0":
                    new_img = "Not avialible"
                image_list.append(new_img)

            Driver.driver.back()

            # Title = Driver.driver.title


            image_list = [i for i in image_list if i != "Not avialible"]
            return image_list

            time.sleep(5)
            Driver.driver.quit()

        except Exception as e:

            print(e)

    def getTitle():

        try:
            Title = Driver.driver.title

            return Title

        except Exception as e:
            print(e)

    def getName():

        try:

            Driver.wait.until(EC.presence_of_element_located((By.XPATH,"//h1/span/parent::h1")))
            name = Driver.driver.find_element(By.XPATH,"//h1/span/parent::h1").text

            return name

        except Exception as e:
            print(e)
        
    def getRating():

        try:
            Driver.wait.until(EC.presence_of_element_located((By.XPATH,'//span[contains(@aria-label,"stars") and @role="img"][1]')))
            stars = Driver.driver.find_element(By.XPATH,'//span[contains(@aria-label,"stars") and @role="img"][1]').get_attribute('aria-label')

            Driver.wait.until(EC.presence_of_element_located((By.XPATH,'//span[contains(@aria-label,"reviews")]')))
            total = Driver.driver.find_element(By.XPATH,'//span[contains(@aria-label,"reviews")]').get_attribute('aria-label')

            return {
                "stars" : stars,
                "total" : total
            }
        
        except Exception as e:
            print(e)

    def getOfficeData():

        try:
            Driver.wait.until(EC.presence_of_all_elements_located(((By.XPATH,'//div[contains(@aria-label,"Information for")]//button/div/div[2]/div[1]'))))
            data = Driver.driver.find_elements(By.XPATH,'//div[contains(@aria-label,"Information for")]//button/div/div[2]/div[1]')

            info_list = []
            for i in data:
                info = i.text
                info_list.append(info)

            return info_list

        except Exception as e:
            print(e)


    def quit():

        try:
            Driver.driver.quit()

        except Exception as e:
            print(e)

data = {

}
print("********* Program Started *************")
data["Images"] = Driver.getImages()
print("********* Image Data Scraped *************")
data["Title"] = Driver.getTitle()
print("********* Title Scraped *************")
data["Name"] = Driver.getName()
print("********* Name Scraped *************")
data["Rating"] = Driver.getRating()
print("********* Rating Scraped *************")
data["OfficeInfo"] = Driver.getOfficeData()
print("********* Office Data Scraped *************")
data["Relevant Review List"] = Driver.reviewRelevant()


with open("review.json",'w') as f:
    json.dump(data,f)

# Driver.reviewRelevant()