# composition and inheritance


class Bar:
    def __init__(self, name="bar"):
        self.name = name

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
a = 12
b = 23
c = 19

<<<<<<< HEAD
class Foo:
    def __init__(self):
        self.bars = [Bar()] * 10 # has_a relationship
        self.numbers = [a, b, c] # has_a
=======

class Foo:
    def __init__(self):
        self.bars = [Bar()] * 10  # has_a relationship
        self.numbers = [a, b, c]  # has_a
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    def __str__(self):
        return f"{self.bar}"


<<<<<<< HEAD
class Entity():
=======
class Entity:
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __init__(self, id, x, y):
        self.id = id
        self.x = x
        self.y = y

    def get_id(self):
        return self.id


my_super = Entity()


<<<<<<< HEAD
class Mob(Entity): # is_a relationship
=======
class Mob(Entity):  # is_a relationship
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __init__(self, id, x, y):
        super().__init__(id, x, y)
        # self.bob = super().get_id()

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# foo = Foo()

# print(foo)
class Item:
    def __init__(self, name, description=""):
        self.name = name
        self.description = description

<<<<<<< HEAD
class Weapon(Item):
    def __init__(self, name, power, description=''):
        super().__init__(name, description=description)
        self.power = power

=======

class Weapon(Item):
    def __init__(self, name, power, description=""):
        super().__init__(name, description=description)
        self.power = power


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = [Weapon("Knife", 10), Item("Hammer")]


class Player:
    def __init__(self, starting_room):
        self.current_room = starting_room
<<<<<<< HEAD
        self.inventory = [Item("Shield")] # has_a item
=======
        self.inventory = [Item("Shield")]  # has_a item
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.gold = 0

    def move(self, direction):
        # check if current room has direction_to
<<<<<<< HEAD
            # return current rooms direction_to
        # otherwise
            # tell user they can not go that way
=======
        # return current rooms direction_to
        # otherwise
        # tell user they can not go that way
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    def pick_up(self, item):
        # if item exists in current room
<<<<<<< HEAD
            # create instance of item in inv
            # delete item from room
        # otherwise
            # tell player that they can not do that
=======
        # create instance of item in inv
        # delete item from room
        # otherwise
        # tell player that they can not do that
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    def drop(self, item):
        # if item exists in inv
<<<<<<< HEAD
            # create instance of item in current room
            # delete item from inv
        # otherwise
            # tell player that they can not do that
=======
        # create instance of item in current room
        # delete item from inv
        # otherwise
        # tell player that they can not do that
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass
