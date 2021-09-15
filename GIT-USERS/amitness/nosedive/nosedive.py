import os
import requests


def send_notification(message):
    pushover_token = os.getenv("PUSHOVER_TOKEN")
    pushover_url = "https://api.pushover.net/1/messages.json"
    params = {
        "token": pushover_token,
        "user": os.getenv("PUSHOVER_USER_KEY"),
        "priority": -1,
        "message": message,
        "title": "Productivity",
    }
    requests.post(pushover_url, params=params)


def get_pulse_change():
    rescuetime_token = os.getenv("RESCUETIME_TOKEN")
    url = "https://www.rescuetime.com/anapi/daily_summary_feed"
    params = {"key": rescuetime_token}
    resp = requests.get(url, params=params)
    json_response = resp.json()
    latest, previous, *_ = json_response
    change = latest["productivity_pulse"] - previous["productivity_pulse"]
    return "{:+}%".format(change)


if __name__ == "__main__":
    change = get_pulse_change()
    send_notification(change)
    print(change)
