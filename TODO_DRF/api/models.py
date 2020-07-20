from django.db import models

# Create your models here.
class TODO(models.Model):
    title=models.CharField(max_length=20)
    completed = models.BooleanField(default=False,blank=True)

    def __str__(self):
        return(self.title)