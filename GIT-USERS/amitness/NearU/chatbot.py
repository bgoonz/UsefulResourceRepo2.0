from wit import Wit
from app import db
from models import Company, Events
import os
import json

WIT_ACCESS_TOKEN = os.getenv("WIT_ACCESS_TOKEN")


def process_user_text(text):
    client = Wit(access_token=WIT_ACCESS_TOKEN)
    resp = client.message(text)
    if len(resp["entities"]) == 0:
        return "error"
    return resp["entities"]["filter"][0]["value"]


def prepare_reply(hasResult, all_result, message):
    reply = {}
    reply["hasResults"] = hasResult
    reply["results"] = all_result
    reply["botReply"] = message
    return json.dumps(reply)


def get_restaurants():
    restaurants = db.session.query(Company).filter_by(org_type="Restaurant").all()
    hasResults = len(restaurants) > 0
    all_results = []
    for restaurant in restaurants:
        location, lat, lng = restaurant.location.split(",")
        dict_data = restaurant.__dict__
        dict_data.pop("_sa_instance_state")
        dict_data.pop("location")
        dict_data["location"] = location
        dict_data["lat"] = lat
        dict_data["resultType"] = "place"
        dict_data["long"] = lng
        dict_data["image"] = dict_data.pop("logo")
        dict_data["desc"] = dict_data.pop("description")
        all_results.append(dict_data)
    return hasResults, all_results


def get_events():
    events = db.session.query(Events).all()
    hasResults = len(events) > 0
    all_events = []
    for event in events:
        location, lat, lng = event.location.split(",")
        eventDict = event.__dict__
        eventDict.pop("location")
        eventDict["location"] = location
        eventDict["lat"] = lat
        eventDict["long"] = lng
        eventDict["resultType"] = "event"
        eventDict.pop("_sa_instance_state")
        eventDict["image"] = eventDict.pop("banner")
        all_events.append(eventDict)
    return hasResults, all_events


def send_reply(userText):
    keyword = process_user_text(userText)
    if keyword == "error":
        has_result = False
        result = []
        message = "Sorry, I didn't understand you"
    elif keyword == "restaurants and bar":
        has_result, result = get_restaurants()
        message = "Finding restaurants near you."
    elif keyword == "event" or keyword == "events":
        has_result, result = get_events()
        message = "Finding events near you."
    # elif keyword == 'none':
    else:
        has_result1, result1 = get_events()
        has_result2, result2 = get_restaurants()
        has_result = has_result1 or has_result2
        result = result1 + result2
        message = "Showing all results"

    reply = prepare_reply(has_result, result, message)
    return reply


def get_event_by_id(event_id):
    events = db.session.query(Events).filter_by(id=event_id).all()
    hasResults = len(events) > 0
    all_events = []
    for event in events:
        location, lat, lng = event.location.split(",")
        eventDict = event.__dict__
        eventDict.pop("location")
        eventDict["location"] = location
        eventDict["lat"] = lat
        eventDict["long"] = lng
        eventDict["resultType"] = "event"
        eventDict.pop("_sa_instance_state")
        eventDict["image"] = eventDict.pop("banner")
        all_events.append(eventDict)
    return prepare_reply(hasResults, all_events, "event")


def get_restaurants_by_id(r_id):
    restaurants = db.session.query(Company).filter_by(id=r_id).all()
    hasResults = len(restaurants) > 0
    all_results = []
    for restaurant in restaurants:
        location, lat, lng = restaurant.location.split(",")
        dict_data = restaurant.__dict__
        dict_data.pop("_sa_instance_state")
        dict_data.pop("location")
        dict_data["location"] = location
        dict_data["resultType"] = "place"
        dict_data["lat"] = lat
        dict_data["long"] = lng
        dict_data["image"] = dict_data.pop("logo")
        dict_data["desc"] = dict_data.pop("description")
        all_results.append(dict_data)
    return prepare_reply(hasResults, all_results, "restaurant")


if __name__ == "__main__":
    send_reply("find restaurants nearby")
