from django.urls import path
from .views import PhotoList, PhotoDetail

urlpatterns = [
    path("", PhotoList.as_view(), name="photo_list"),
    path("<int:pk>/", PhotoDetail.as_view(), name="photo_detail"),
]
