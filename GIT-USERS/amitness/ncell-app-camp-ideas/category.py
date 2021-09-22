def get_page(url):
    try:
        import urllib

        return urllib.urlopen(url).read()
    except:
        return ""


from bs4 import BeautifulSoup

# import lxml
import requests
import sys

reload(sys)
sys.setdefaultencoding("utf-8")
with open("ideas.csv", "r") as file:
    data = file.read()
lines = data.splitlines()

source = requests.get("http://ncellappcamp.com/ideas")
soup = BeautifulSoup(source.content, "lxml")
category = soup.find_all("div", {"class": "category-icon"})
categorylist = []
for item in category:
    src = item.find("img")
    image = src.get("src")
    if "tourism" in image:
        categorylist.append("Tourism")
    elif "ic_game" in image:
        categorylist.append("Gaming")
    elif "ic_health" in image:
        categorylist.append("Health")
    elif "ic_utilities" in image:
        categorylist.append("Utilities")

with open("new.csv", "w") as newfile:
    for i in range(727):
        newfile.write(lines[i] + "," + categorylist[i] + "\n")
