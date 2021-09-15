import json
import os
from typing import Dict, List

import requests
from pathlib import Path

from todoist.api import TodoistAPI

TODOIST_APIKEY = os.environ["TODOIST_APIKEY"]
current_dir = Path(__file__).parent.resolve()
SAVED_DATA_PATH = current_dir / "ipo.json"
INVESTMENT_SECTION_ID = 25482920


def add_task(task_content: str, date: str, priority: int = 4):
    """
    Add a new task to todoist.

    :param priority: Priority of the task
    :param task_content: Task description
    :param date: Due date for task
    """
    api = TodoistAPI(TODOIST_APIKEY)
    api.sync()
    api.items.add(
        task_content,
        date_string=date,
        priority=priority,
        section_id=INVESTMENT_SECTION_ID,
    )
    api.commit()


def fetch_latest_ipo() -> List[Dict]:
    data = '{"offset":1,"limit":"20","categoryID":2,"portalID":"1","cultureCode":"en-US","StockSymbol":""}'
    headers = {
        "Pragma": "no-cache",
        "Origin": "http://www.nepalipaisa.com",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest",
        "Connection": "keep-alive",
        "Referer": "http://www.nepalipaisa.com/Investment-Opportunities.aspx",
        "DNT": "1",
    }
    url = "https://www.nepalipaisa.com/Modules/Investment/webservices/InvestmentService.asmx/GetAllInvestmentInfobyCategoryID"
    response = requests.post(url, headers=headers, data=data)
    raw_ipo_details = response.json()["d"]
    last_20_ipo = []
    for ipo in raw_ipo_details:
        data = {
            "company_name": ipo["CompanyName"],
            "start_date": ipo["StartDateString"],
            "end_date": ipo["EndDateString"],
            "share_type": ipo["ShareType"].strip(),
        }
        last_20_ipo.append(data)
    return last_20_ipo


def main():
    try:
        last_20_ipo = fetch_latest_ipo()
    except Exception as err:
        raise Exception("API changed.")

    # Read the list of IPO already seen in the last run
    with open(SAVED_DATA_PATH, "r") as ipo_file:
        seen_ipos = json.load(ipo_file)

    for ipo in last_20_ipo:
        if ipo not in seen_ipos:
            # New IPO added
            print(ipo)

            # Add task to todolist on the deadline of the IPO
            task = "{}: {}".format(ipo["company_name"], ipo["share_type"])
            add_task(task, ipo["end_date"])

    # Overwrite with latest 20 IPO
    with open(SAVED_DATA_PATH, "w") as outfile:
        json.dump(last_20_ipo, outfile, indent=2)


if __name__ == "__main__":
    main()
