from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model

from orders import serializers

User = get_user_model()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    package_details = models.CharField(max_length=255)
    delivery_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", input_formats=[settings.DATETIME_INPUT_FORMATS])
    status = models.CharField(max_length=50, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
