from django.db import models


class Agency(models.Model):
    name = models.CharField(max_length=255)

class Taseron(models.Model):
    name = models.CharField(max_length=255)

