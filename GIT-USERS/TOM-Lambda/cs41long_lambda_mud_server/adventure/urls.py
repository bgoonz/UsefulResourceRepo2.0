from django.conf.urls import url
from . import api

<<<<<<< HEAD
urlpatterns = [
    url('init', api.initialize),
    url('move', api.move),
    url('say', api.say),
]
=======
urlpatterns = [url("init", api.initialize), url("move", api.move), url("say", api.say)]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
