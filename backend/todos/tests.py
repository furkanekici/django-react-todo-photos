from django.test import TestCase
from .models import Todo
from django.contrib.auth import get_user_model


@classmethod
def setUpTestData(cls):
    test_todo = Todo.objects.create(
        title="Test Todo Title",
        description="Test Todo Description",
        user=get_user_model().objects.create(username="Test Todo User"),
    )
    test_todo.save()


def test_title_content(self):
    todo = Todo.objects.get(id=1)
    expected_object_name = f"{todo.title}"
    self.assertEquals(expected_object_name, "Test Todo Title")


def test_description_content(self):
    todo = Todo.objects.get(id=1)
    expected_object_name = f"{todo.description}"
    self.assertEquals(expected_object_name, "Test Todo Description")


def test_user_content(self):
    todo = Todo.objects.get(id=1)
    expected_object_name = f"{todo.user}"
    self.assertEquals(expected_object_name, "Test Todo User")
