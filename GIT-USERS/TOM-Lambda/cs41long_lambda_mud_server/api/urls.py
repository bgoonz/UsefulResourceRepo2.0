from django.urls import include, path
from django.conf.urls import url

urlpatterns = [
<<<<<<< HEAD
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
=======
    path("", include("rest_auth.urls")),
    path("registration/", include("rest_auth.registration.urls")),
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
]
