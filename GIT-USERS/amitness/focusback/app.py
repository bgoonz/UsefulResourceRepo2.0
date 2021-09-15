import os
import pickle
import requests
from flask import Flask
from datetime import datetime

app = Flask(__name__)


def send_notification(message):
    """Send push notification."""
    pushover_token = os.getenv("PUSHOVER_TOKEN")
    pushover_url = "https://api.pushover.net/1/messages.json"
    params = {
        "token": pushover_token,
        "user": "uga9w2s6wJsnGUwTjpmJnyMQnV6E5q",
        "priority": -1,
        "message": message,
        "title": message,
    }
    requests.post(pushover_url, params=params)


def get_social_time():
    rescuetime_token = os.getenv("RESCUETIME_TOKEN")
    url = "https://www.rescuetime.com/anapi/data"
    params = {
        "format": "json",
        "resolution_time": "minute",
        "restrict_kind": "overview",
        "key": rescuetime_token,
    }
    time = 0
    r = requests.get(url, params=params)
    j = r.json()
    social_media = [row for row in j["rows"] if "Social Networking" in row]
    if social_media:
        time = social_media[0][1] / 60
    return int(time)


@app.route("/")
def index():
    fp = open("data.pkl", "rb")
    details = pickle.load(fp)
    fp.close()
    last_distracted = details["last_distracted"]
    last_mins = details["minutes"]
    today = datetime.today().strftime("%D")
    sent = last_distracted == today
    used_time = get_social_time()
    if not sent:
        if used_time > 20:
            send_notification("Focus: {}".format(used_time))
            last_mins = used_time
            last_distracted = today
    else:
        if (used_time - last_mins) > 15:
            send_notification("Focus: {}".format(used_time))
            last_mins = used_time
    details = {"minutes": last_mins, "last_distracted": last_distracted}

    fp = open("data.pkl", "wb")
    pickle.dump(details, fp)
    fp.close()
    return str(details)


@app.route("/reset")
def reset():
    details = {"minutes": 30, "last_distracted": "10/02/17"}
    pickle.dump(details, open("data.pkl", "wb"))
    return "Done."


if __name__ == "__main__":
    app.run()
