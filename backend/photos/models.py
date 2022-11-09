from django.db import models

# import User model
from django.contrib.auth.models import User


class Photo(models.Model):
    image = models.ImageField(upload_to="photos/media/")
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.title
