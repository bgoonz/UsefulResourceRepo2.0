import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from config import accounts


# Message
message = raw_input("message")


# Phone numbers of club members
group1 = accounts[0]["group"]
group2 = accounts[1]["group"]


def login(username, password, group):
    """Login to NTC Meet."""
    driver = webdriver.Firefox()
    driver.get("http://www.meet.net.np/meet/")
    driver.find_element_by_class_name("elgg-input-text").send_keys(username)
    driver.find_element_by_class_name("elgg-input-password").send_keys(password)
    driver.find_element_by_id("loginImage").click()
    time.sleep(1)

    # Send Message
    driver.get("http://www.meet.net.np/meet/sms/sms")
    driver.find_element_by_name("sendsmsbutton").click()
    time.sleep(1)
    driver.find_element_by_name("recipient").send_keys(group)
    driver.find_element_by_id("message").send_keys(message)
    driver.find_element_by_name("sendbutton").click()

    # Close the browser
    time.sleep(1)
    driver.quit()


login(accounts[0]["username"], accounts[0]["password"], group1)
time.sleep(1)

# Reopen the browser with new username and password
login(accounts[1]["username"], accounts[1]["password"], group2)
