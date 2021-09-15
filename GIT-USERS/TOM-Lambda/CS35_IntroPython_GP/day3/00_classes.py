# lets talk about classes

# holds data
# methods to act upon that data

# class called Vec2
# hold x and y as integers
# constructor that can take in x and y

# class Vec2 {
<<<<<<< HEAD
#     constructor(x, y) { 
#         this.x = x;
#          this.y = y;
#     } 
=======
#     constructor(x, y) {
#         this.x = x;
#          this.y = y;
#     }
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# }

# v = new Vec2(12, 23);

# this keyword === self keyword

# Encapsulation / Data Hiding
# __ method == Private
# _ method == Protected
#   method == Public

<<<<<<< HEAD
class Vec2:
    def __init__(self, x, y): 
=======

class Vec2:
    def __init__(self, x, y):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.x = x
        self.y = y

    def __my_thing__(self, name):
        print(f"My name is {name}: ({self.x}, {self.y})")

    def call_my_thing(self, name):
        self.__my_thing__(name)


# l = []
# l.__add__()

<<<<<<< HEAD
# l + 
=======
# l +
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
v = Vec2(12, 23)

v.call_my_thing("Bob")
v.__my_thing__("Dave")
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
