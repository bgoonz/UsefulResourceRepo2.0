from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
import uuid

<<<<<<< HEAD
class Room(models.Model):
    title = models.CharField(max_length=50, default="DEFAULT TITLE")
    description = models.CharField(max_length=500, default="DEFAULT DESCRIPTION")
    img_url = models.CharField(max_length=500, default="http://https://i.stack.imgur.com/y9DpT.jpg")
=======

class Room(models.Model):
    title = models.CharField(max_length=50, default="DEFAULT TITLE")
    description = models.CharField(max_length=500, default="DEFAULT DESCRIPTION")
    img_url = models.CharField(
        max_length=500, default="http://https://i.stack.imgur.com/y9DpT.jpg"
    )
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    n_to = models.IntegerField(default=0)
    s_to = models.IntegerField(default=0)
    e_to = models.IntegerField(default=0)
    w_to = models.IntegerField(default=0)
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def connectRooms(self, destinationRoom, direction):
        destinationRoomID = destinationRoom.id
        try:
            destinationRoom = Room.objects.get(id=destinationRoomID)
        except Room.DoesNotExist:
            print("That room does not exist")
        else:
            if direction == "n":
                self.n_to = destinationRoomID
            elif direction == "s":
                self.s_to = destinationRoomID
            elif direction == "e":
                self.e_to = destinationRoomID
            elif direction == "w":
                self.w_to = destinationRoomID
            else:
                print("Invalid direction")
                return
            self.save()
<<<<<<< HEAD
    def playerNames(self, currentPlayerID):
        return [p.user.username for p in Player.objects.filter(currentRoom=self.id) if p.id != int(currentPlayerID)]
    def playerUUIDs(self, currentPlayerID):
        return [p.uuid for p in Player.objects.filter(currentRoom=self.id) if p.id != int(currentPlayerID)]
=======

    def playerNames(self, currentPlayerID):
        return [
            p.user.username
            for p in Player.objects.filter(currentRoom=self.id)
            if p.id != int(currentPlayerID)
        ]

    def playerUUIDs(self, currentPlayerID):
        return [
            p.uuid
            for p in Player.objects.filter(currentRoom=self.id)
            if p.id != int(currentPlayerID)
        ]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    currentRoom = models.IntegerField(default=0)
    uuid = models.UUIDField(default=uuid.uuid4, unique=True)
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def initialize(self):
        if self.currentRoom == 0:
            self.currentRoom = Room.objects.first().id
            self.save()
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def room(self):
        try:
            return Room.objects.get(id=self.currentRoom)
        except Room.DoesNotExist:
            self.initialize()
            return self.room()

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
@receiver(post_save, sender=User)
def create_user_player(sender, instance, created, **kwargs):
    if created:
        Player.objects.create(user=instance)
        Token.objects.create(user=instance)

<<<<<<< HEAD
@receiver(post_save, sender=User)
def save_user_player(sender, instance, **kwargs):
    instance.player.save()





=======

@receiver(post_save, sender=User)
def save_user_player(sender, instance, **kwargs):
    instance.player.save()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
