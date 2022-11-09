from django.test import TestCase

from .models import Photo

from django.contrib.auth import get_user_model


class PhotoTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_photo = Photo.objects.create(
            title="Test Photo Title",
            description="Test Photo Description",
            image="photos/test_photo.jpg",
            user=get_user_model().objects.create(username="Test Photo User"),
        )
        test_photo.save()

    def test_title_content(self):
        photo = Photo.objects.get(id=1)
        expected_object_name = f"{photo.title}"
        self.assertEquals(expected_object_name, "Test Photo Title")

    def test_description_content(self):
        photo = Photo.objects.get(id=1)
        expected_object_name = f"{photo.description}"
        self.assertEquals(expected_object_name, "Test Photo Description")

    def test_image_content(self):
        photo = Photo.objects.get(id=1)
        expected_object_name = f"{photo.image}"
        self.assertEquals(expected_object_name, "photos/test_photo.jpg")

    def test_user_content(self):
        photo = Photo.objects.get(id=1)
        expected_object_name = f"{photo.user}"
        self.assertEquals(expected_object_name, "Test Photo User")
