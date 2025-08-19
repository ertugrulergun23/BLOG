from django.db import models

class Blog(models.Model):
    tittle = models.CharField(max_length=100)
    content = models.TextField()
