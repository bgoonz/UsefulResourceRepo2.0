from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4

# Create your models here.
<<<<<<< HEAD
class Note(models.Model): # Table in a database
=======
class Note(models.Model):  # Table in a database
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # each of the variables are columns in the table
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

<<<<<<< HEAD
class PersonalNote(Note):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
=======

class PersonalNote(Note):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
