from .models import Photo
from .serializers import PhotoSerializer
from django.http import Http404, HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class PhotoList(APIView):
    def get(self, request, format=None):
        # filter photos by user
        photos = Photo.objects.filter(user=request.user.id)
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data)

    # create a new photo
    def post(self, request, format=None):
        # append user id to serializer
        data = request.data
        data["user"] = request.user.id
        serializer = PhotoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
