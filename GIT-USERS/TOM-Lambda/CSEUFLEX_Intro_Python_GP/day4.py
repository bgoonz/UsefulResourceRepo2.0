class Entity:
    def __init__(self, id, x, y):
        self.id = id
        self.x = x
        self.y = y

    def __str__(self):
<<<<<<< HEAD
         return f"{self.id}: x: {self.x}, y: {self.y}"
=======
        return f"{self.id}: x: {self.x}, y: {self.y}"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


class Mob(Entity):
    def __init__(self, id, x, y, speed):
        super().__init__(id, x, y)
        self.speed = speed

    def move(self, dir):
        if dir == "n":
            self.y -= self.speed
        elif dir == "s":
            self.y += self.speed
        elif dir == "w":
            self.x -= self.speed
        elif dir == "e":
            self.x += self.speed

    def __str__(self):
        return super().__str__() + f", spd: {self.speed}"


e = Entity(0, 10, 10)

m = Mob(1, 10, 20, 2)


<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# print(e)
# print(m)

# Room
class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.contents = [Treasure("Gold Chest", 10, "A Small Shiny Chest")]

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Items
class Item:
    def __init__(self, name, description=""):
        self.name = name
        self.description = description


## Weapon is_a Item
class Weapon(Item):
    def __init__(self, name, power, description=""):
        super.__init__(name, description)
        self.power = power

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Treasure
class Treasure(Item):
    def __init__(self, name, value, description=""):
        super.__init__(name, description)
        self.value = value
<<<<<<< HEAD
 
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# Player
class Player:
    def __init__(self, starting_room):
        self.current_room = starting_room
        self.inventory = [Weapon("Knife", 20, "A Rusty old knife")]
        self.gold = 0

    def move(self, direction):
        # check if the current room has direction_to
<<<<<<< HEAD
            # return current_rooms direction_to
        # otherwise
            # tell the player they can not go that way
=======
        # return current_rooms direction_to
        # otherwise
        # tell the player they can not go that way
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    def pick_up(self, item):
        # if item exists in the current room
<<<<<<< HEAD
            # create instance of the item inside inventory
            # delete the item from the room
        # otherwise
            # tell player that they can not do that
=======
        # create instance of the item inside inventory
        # delete the item from the room
        # otherwise
        # tell player that they can not do that
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    def drop(self, item):
        # if item exists in current room
<<<<<<< HEAD
            # create an instance of the item in the rooms contents
            # delete the item from the players inventory
        # otherwise
            # tell the player that they can not do that
        pass
=======
        # create an instance of the item in the rooms contents
        # delete the item from the players inventory
        # otherwise
        # tell the player that they can not do that
        pass
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
