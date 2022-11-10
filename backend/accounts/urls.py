from django.urls import path
from .views import UserInfo

urlpatterns = [
    path("user/", UserInfo.as_view()),
]
