import math

# Inverse Square Root is 1 over the square root of a number


inv_sqrt = {}


def build_lookup_table():
    # expensive to do the first build
    global inv_sqrt

    for i in range(1, 1000001):
        inv_sqrt[i] = 1 / math.sqrt(i)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
print(inv_sqrt)

build_lookup_table()

print(inv_sqrt)
# Fast to just look up the answer
print(inv_sqrt[3])
print(inv_sqrt[982])
<<<<<<< HEAD
print(inv_sqrt[234])
=======
print(inv_sqrt[234])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
