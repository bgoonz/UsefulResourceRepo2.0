import time
from selenium import webdriver

url = "https://unsplash.com"

driver = webdriver.Firefox(executable_path=r'geckodriver.exe')
driver.get(url)
# Scroll page and wait 5 seconds
driver.execute_script("window.scrollTo(0,1000);")
time.sleep(5)