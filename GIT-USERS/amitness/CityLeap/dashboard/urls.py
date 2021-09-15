from django.urls import path
from dashboard import views

urlpatterns = [
    path("dashboard", views.dashboard, name="dashboard"),
    path("complain", views.complain, name="complain"),
    path("broadcast", views.broadcast, name="broadcast"),
    path("leap/<int:complain_id>", views.leap, name="leap"),
    path("listcomplains", views.listcomplains, name="listcomplains"),
]
