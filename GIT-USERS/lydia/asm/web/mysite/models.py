from django.db import models

class CurrentData(models.Model):
    energy = models.CharField(max_length=100)
    gas = models.CharField(max_length=100)
