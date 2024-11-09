from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class AbstractToken(models.Model):
    # No model fields here, only methods or other logic
    def some_method(self):
        # Some logic here
        pass

class TokenProxy(AbstractToken):
    class Meta:
        proxy = True
        # No model fields here
