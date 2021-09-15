from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include

urlpatterns = [
<<<<<<< HEAD
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/adv/', include('adventure.urls')),
=======
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("api/adv/", include("adventure.urls")),
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
]
