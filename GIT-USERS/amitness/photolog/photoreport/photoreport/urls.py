"""photoreport URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from mainapp.views import (
    LandingInputFileCreateView,
    PhotoPreview,
    ReportGenView,
    TempFileResumeView,
)
from mainapp.api import ProjectImageOrderUpdate


urlpatterns = [
    url(r"^admin/", admin.site.urls),
    url(r"^$", LandingInputFileCreateView.as_view(), name="landing"),
    url(r"^resume/$", TempFileResumeView.as_view(), name="tempfile"),
    url(r"^preview/(?P<input_id>[-\w]+)/$", PhotoPreview.as_view(), name="preview"),
    url(
        regex=r"^api/project/(?P<pk>[-\d]+)/$",
        view=ProjectImageOrderUpdate.as_view(),
        name="api",
    ),
    url(
        regex=r"^success/(?P<pk>[-\d]+)/$", view=ReportGenView.as_view(), name="success"
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
