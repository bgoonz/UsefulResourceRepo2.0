# lets talk about classes

# holds data
# methods to act upon that data

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Foo:
    # init
    def __init__(self):
        print("Hello")

<<<<<<< HEAD
# f = Foo()

=======

# f = Foo()


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Vec2:
    # init
    def __init__(self, x, y):
        self.x = x
        self.y = y

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __repr__(self):
        return f"Vec2({self.x}, {self.y})"

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __add__(self, other):
        dave = Vec2(0, 0)
        dave.x = self.x + other.x
        dave.y = self.y + other.y
        return dave


<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
v = Vec2(12, 34)
v2 = Vec2(12, 34)
print(v)
v3 = v + v2
print(v3)
print(v)
<<<<<<< HEAD
        
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
