# Write a class to hold player information, e.g. what room they are in
# currently.

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Player:
    def __init__(self, name, current_room):
        self.name = name
        self.current_room = current_room

    def move(self, direction):
<<<<<<< HEAD
        attribute = direction + '_to'
=======
        attribute = direction + "_to"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        if hasattr(self.current_room, attribute):
            self.current_room = getattr(self.current_room, attribute)
        else:
            print("you may not go in that direction!\n")
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
