import math

# Inverse Square Root is 1 over the square root of a number (1 / sqrt(n))

inv_sqrt = {}

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def build_table(n):
    for i in range(1, n):
        global inv_sqrt

        inv_sqrt[i] = 1 / math.sqrt(i)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
print("Building Table")
build_table(1000000)


print("Done Building")

print(inv_sqrt[30000])
print(inv_sqrt[30010])
print(inv_sqrt[32000])
print(inv_sqrt[30030])
print(inv_sqrt[30300])
print(inv_sqrt[30060])
<<<<<<< HEAD



=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
