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

url = "https://www.google.com/maps/place/Samsung+Electronics/data=!4m7!3m6!1s0x39eb185b90af8727:0x10bfc3716afc188e!8m2!3d27.6966905!4d85.2990398!16s%2Fg%2F1ptw0smgr!19sChIJJ4evkFsY6zkRjhj8anHDvxA?authuser=0&hl=en&rclk=1"


class Driver:
    def __init__(self,url):
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        self.driver.maximize_window()
        self.driver.get(url)

        self.wait = WebDriverWait(self.driver,30)

    def reviewRelevant(self):

        try:
            self.wait.until(EC.presence_of_element_located((By.XPATH, '//button[contains(@aria-label,"Reviews for")]')))
            button = self.driver.find_element(By.XPATH, '//button[contains(@aria-label,"Reviews for")]')
            button.click()

            self.wait.until(EC.presence_of_element_located((By.XPATH, '//span[contains(text(),"Sort")]//ancestor::button')))
            sort = self.driver.find_element(By.XPATH, '//span[contains(text(),"Sort")]//ancestor::button')
            sort.click()
            

            self.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@role="menu"]/div[@data-index][1]')))
            relevant = self.driver.find_element(By.XPATH, '//div[@role="menu"]/div[@data-index][1]')
            relevant.click()


            element = self.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@aria-label and @role="main"]/div[2]')))

            height = self.driver.execute_script('return arguments[0].scrollHeight;', element)
            while True:
                self.driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight;', element)
                time.sleep(5)

                new_height = self.driver.execute_script('return arguments[0].scrollHeight;', element)

                if height == new_height:
                    break
                height = new_height


            reviews = self.wait.until(EC.presence_of_all_elements_located((By.XPATH, '//div[@aria-label and @data-review-id]')))

            if reviews is not None:
            
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
                self.driver.back()
                return review
            print("no reviews")
            self.driver.back()
            return None
        

        except Exception as e:
            print(e)
            self.driver.quit()

    def getImages(self):

        try:
            
            self.wait.until(EC.presence_of_element_located((By.XPATH,'//div[contains(text(),"photos")]/parent::button')))

            photos = self.driver.find_element(By.XPATH,'//div[contains(text(),"photos")]/parent::button')
            photos.click()
            time.sleep(5)

            element = self.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@aria-label and @role="main"]/div[3]')))

            height = self.driver.execute_script('return arguments[0].scrollHeight;', element)
            while True:
                self.driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight;', element)
                time.sleep(5)

                new_height = self.driver.execute_script('return arguments[0].scrollHeight;', element)

                if height == new_height:
                    break
                height = new_height

            image_list = []
            images = self.driver.find_elements(By.XPATH,'//a[@data-photo-index]/div[@role]')

            for i in images:
                image = i.get_attribute("style")
                img = image.split('url("')[1]
                new_img = img.split('")')[0]
                if new_img == "//:0":
                    new_img = "Not avialible"
                image_list.append(new_img)

            self.driver.back()

            # Title = Driver.driver.title


            image_list = [i for i in image_list if i != "Not avialible"]
            return image_list

            # time.sleep(5)
            self.driver.quit()

        except Exception as e:

            print(e)

    def getImage(self):
        try:
            self.wait.until(EC.presence_of_element_located((By.XPATH,'//div[contains(text(),"photos")]/parent::button')))

            photos = self.driver.find_element(By.XPATH,'//div[contains(text(),"photos")]/parent::button')
            photos.click()
            time.sleep(5)

            element = self.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@aria-label and @role="main"]/div[3]')))
            images = self.driver.find_elements(By.XPATH,'//a[@data-photo-index]/div[@role]')
            if images is not None:
                image = images[0].get_attribute("style")
                img = image.split('url("')[1]
                new_img = img.split('")')[0]
                if new_img == "//:0":
                    new_img = "Not avialible"

            else:
                new_img = "Not avialible"

            self.driver.back()
            return new_img
            time.sleep(5)
            # self.driver.quit()

        except Exception as e:
            print(e)

    def getPhoto(self):
        try:
            self.wait.until(EC.presence_of_element_located((By.XPATH,"//div[@role='main']/div/div/button[contains(@aria-label,'Photo of')]/img")))
            image = self.driver.find_element(By.XPATH,"//div[@role='main']/div/div/button[contains(@aria-label,'Photo of')]/img")
            
            if image:
                new_img = image.get_attribute("src")
                return new_img
            new_img = "not avialabel"
            return new_img

        except Exception as e:
            new_img = "not avialabel"
            return new_img
            print(e)

    def getTitle(self):

        try:
            Title = self.driver.title

            return Title

        except Exception as e:
            print(e)

    def getName(self):

        try:

            self.wait.until(EC.presence_of_element_located((By.XPATH,"//h1/span/parent::h1")))
            name = self.driver.find_element(By.XPATH,"//h1/span/parent::h1").text

            return name

        except Exception as e:
            print(e)
        
    def getRating(self):
        try:
            self.wait.until(EC.presence_of_element_located((By.XPATH,'//span[contains(@aria-label,"stars") and @role="img"][1]')))
            stars = self.driver.find_element(By.XPATH,'//span[contains(@aria-label,"stars") and @role="img"][1]').get_attribute('aria-label')

            self.wait.until(EC.presence_of_element_located((By.XPATH,'//span[contains(@aria-label,"reviews")]')))
            total = self.driver.find_element(By.XPATH,'//span[contains(@aria-label,"reviews")]').get_attribute('aria-label')

            return {
                "stars" : stars,
                "total" : total
            }
        
        except Exception as e:
            print(e)

    def getOfficeData(self):

        try:
            self.wait.until(EC.presence_of_all_elements_located(((By.XPATH,'//div[contains(@aria-label,"Information for")]//button/div/div[2]/div[1]'))))
            data = self.driver.find_elements(By.XPATH,'//div[contains(@aria-label,"Information for")]//button/div/div[2]/div[1]')

            info_list = []
            for i in data:
                info = i.text
                info_list.append(info)

            return info_list

        except Exception as e:
            print(e)


    def quit(self):

        try:
            self.driver.quit()

        except Exception as e:
            print(e)

d = Driver(url=url)

data = {

}

print("********Program started***********")
data["OfficeInfo"] = d.getOfficeData()
print("********* Office Data Scraped *************")
data["Rating"] = d.getRating()
print("********* Rating Scraped *************")
data["Title"] = d.getTitle()
print("********* Title Scraped *************")
data["Name"] = d.getName()
print("********* Name Scraped *************")
data ['image'] = d.getPhoto()
print("********* Image scrape **************")
data["Relevant Review List"] = d.reviewRelevant()
print("********* Relavant Data Scraped *************")



with open("review.json",'w') as f:
    json.dump(data,f)
