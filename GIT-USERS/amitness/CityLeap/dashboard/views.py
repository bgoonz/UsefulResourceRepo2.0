import requests
from decouple import config
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from dashboard.models import Complain


def dashboard(request):
    return render(request, "index.html")


def complain(request):
    latitude = request.GET["lat"]
    longitude = request.GET["lon"]
    text = request.GET["text"]
    category = request.GET["category"]
    user_id = request.GET["user_id"]
    # TODO: Store in DB model
    Complain.objects.create(
        latitude=latitude,
        longitude=longitude,
        text=text,
        category=category,
        user_id=user_id,
    )
    result = {
        "messages": [
            {
                "text": "{}: {}: {}: {}: {}".format(
                    latitude, longitude, text, category, user_id
                )
            }
        ]
    }
    return JsonResponse(result)


def broadcast(request):
    bot_id = config("BOT_ID")
    chatfuel_token = config("CHATFUEL_TOKEN")
    user_id = "1813643665334588"
    block_name = "broadcast"
    message = "Your complain has been forwarded to the concerned authority."
    endpoint = "https://api.chatfuel.com/bots/{}/users/{}/send?chatfuel_token={}&chatfuel_block_name={}&message={}".format(
        bot_id, user_id, chatfuel_token, block_name, message
    )
    r = requests.post(endpoint)
    return HttpResponse(r.status_code)


def leap(request, complain_id):
    c = Complain.objects.get(pk=complain_id)
    c.upvote_count += 1
    c.save()
    result = {"messages": [{"text": "success"}]}
    return JsonResponse(result)


def listcomplains(request):
    latitude = request.GET["lat"]
    longitude = request.GET["lon"]
    # TODO: Database sync garera top 5 complains return garne
    result = {
        "messages": [
            {"text": "1. Complain"},
            {"text": "2. Complain"},
            {"text": "3. Complain"},
            {"text": "4. Complain"},
            {"text": "5. Complain"},
        ]
    }
    return JsonResponse(result)
