class Room:
<<<<<<< HEAD
    def __init__(self, id, name, description, n_to = None, s_to = None, e_to = None, w_to = None):
=======
    def __init__(
        self, id, name, description, n_to=None, s_to=None, e_to=None, w_to=None
    ):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.id = id
        self.name = name
        self.description = description
        self.n_to = n_to
        self.s_to = s_to
        self.e_to = e_to
        self.w_to = w_to

    # def __repr__(self):
    #     pass

    # def __str__(self):
    #     pass

<<<<<<< HEAD
class World:
    def __init__(self, rooms = None):
=======

class World:
    def __init__(self, rooms=None):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.rooms = rooms
        pass

    def move(self, direction):
        pass

<<<<<<< HEAD
entrance = Room(0, "The Entrance", "You are presented with the front door to an old rickety house to the north which looks like it could fall down at any time. A low lit street beacons you to the east, and a deafening sound is comming from the west!")
w_rooms = [entrance]
w = World(w_rooms)

print(entrance)
=======

entrance = Room(
    0,
    "The Entrance",
    "You are presented with the front door to an old rickety house to the north which looks like it could fall down at any time. A low lit street beacons you to the east, and a deafening sound is comming from the west!",
)
w_rooms = [entrance]
w = World(w_rooms)

print(entrance)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
