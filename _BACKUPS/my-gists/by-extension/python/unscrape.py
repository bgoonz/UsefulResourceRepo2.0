from selenium import webdriver
# The URL we want to browse to
url = "https://unsplash.com"
# Using Selenium's webdriver to open the page
driver = webdriver.Firefox(executable_path=r'geckodriver.exe')
driver.get(url)