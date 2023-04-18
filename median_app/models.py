from django.db import models

# Create your models here.
from django.db import models

class Median(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    value = models.FloatField()

