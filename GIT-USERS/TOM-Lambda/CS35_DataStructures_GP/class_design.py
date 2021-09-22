# 1.
# lets design a 2d vector class set

# Think about what data the class will hold
# x, y

# Think about what methods it needs
# init
# str

# Think about what methods could be optional
# add?
# sub?

# Draw out diagrams of the class model

# visualize how it will be formed

# write out a basic structure

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Vec2:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vec2: ({self.x}, {self.y})"

    # def __str__(self):
    #     return self.__repr__()

    def add(self, fred):
        self.x += fred.x
        self.y += fred.y
        return Vec2(self.x, self.y)
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # try not to make nonsensical argument / field names
    def __add__(self, mouse_spartan_fresco_jinx):
        ret = Vec2(0, 0)
        ret.x = self.x + mouse_spartan_fresco_jinx.x
        ret.y = self.y + mouse_spartan_fresco_jinx.y
        return ret

    # def __sub__(self, other):
    #     print("I am a fish")

    def sub(self, other):
        self.x -= other.x
        self.y -= other.y

    def mul(self, other):
        self.x *= other.x
        self.y *= other.y

    def div(self, other):
        self.x /= other.x
        self.y /= other.y

    def idiv(self, other):
        self.x //= other.x
        self.y //= other.y


# reflect on the design & think of improvements

v1 = Vec2(20, 10)
v2 = Vec2(10, 10)


print(v1)
print(v2)

v1.add(v2)

print(v1)
print(v2)

v1.sub(v2)
print(v1)
print(v2)

v3 = v1 + v2


<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
3 - 5
print(v3)
print(v1)
print(v2)


<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# 2.
# Linked Lists to trees

# SLL
# (value)->(value)->()

# DLL
# <-(value)-><-(value)-><-(value)-><-(value)-><-(value)->

"""
DLL
      (value)        (prev)-(value)-(next)
      /     \
(left)     (right)



SLL
    (value)-(next)-(next)

    (value)
          \
        (right)
           \
           (right)

"""

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class BTNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

    def __add_left__(self, value):
        self.left = BTNode(value)

    def __add_right__(self, value):
        self.right = BTNode(value)

    def insert(self, value):
        # problematic solution?
        if value >= self.value:
            self.__add_right__(value)
        elif value < self.value:
            self.__add_left__(value)


<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
bt1 = BTNode(10)
# bt2 = BTNode(20)
# bt34 = BTNode(8)
# bt7 = BTNode(5)

# bt1.right = bt2
# bt1.left = bt34
# bt34.left = bt7

bt1.add_left(8)
<<<<<<< HEAD
bt1.add_right(20)
=======
bt1.add_right(20)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
