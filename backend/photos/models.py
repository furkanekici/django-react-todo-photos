from django.db import models
from django.conf import settings


class Photo(models.Model):
    image = models.ImageField(upload_to="photos/media/")
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.title
