from selenium import webdriver
try:
    driver = webdriver.Firefox()
    driver.get("https://www.python.org/shell/")
    body_text = driver.find_element_by_css_selector("body").text
    assert "PyPI" in body_text
    assert "Documentation" in body_text

    search = driver.find_element_by_id("id-search-field")
    search.click()
    search.clear()
    search.send_keys("Hello")
    driver.find_element_by_id("submit").click()


    main_content = driver.find_element_by_class_name("main-content")
    elems = main_content.find_elements_by_tag_name("p")
    elems_with_jobs = [elem for elem in elems if "Location:" in elem.text]
    assert(len(elems_with_jobs) > 0)
    assert(len(elems) == 25)
    driver.back()

    def go_to_third_iframe():
        for i in range(3):
            while True:
                try:
                    driver.find_element_by_tag_name("iframe")
                    break
                except:
                    pass

            driver.switch_to.frame(driver.find_element_by_tag_name("iframe"))

    go_to_third_iframe()
    while (
        "An enhanced interactive Python" in driver.find_element_by_tag_name("div").text
    ): pass

    driver.switch_to.default_content()
    go_to_third_iframe()

    while (
        "invalid syntax" in driver.find_element_by_tag_name("div").text
    ): pass

    # import ipdb
    # ipdb.set_trace()

    import time
    time.sleep(5)
finally:
    driver.close()
