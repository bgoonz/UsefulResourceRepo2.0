"""
List comprehensions are one cool and unique feature of Python.
They essentially act as a terse and concise way of initializing
and populating a list given some expression that specifies how
the list should be populated. 
Take a look at https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
for more info regarding list comprehensions.
"""

# Write a list comprehension to produce the array [1, 2, 3, 4, 5]
# for i in range(1, 6):
<<<<<<< HEAD
    # i
=======
# i
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


y = [i for i in range(1, 6)]

<<<<<<< HEAD
print (y)
=======
print(y)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# Write a list comprehension to produce the cubes of the numbers 0-9:
# [0, 1, 8, 27, 64, 125, 216, 343, 512, 729]
# for i in range(10):
#     i ** 3
y = [i ** 3 for i in range(10)]

print(y)

# Write a list comprehension to produce the uppercase version of all the
# elements in array a. Hint: "foo".upper() is "FOO".

a = ["foo", "bar", "baz"]
# for word in a:
#     word.upper()

y = [word.upper() for word in a]

print(y)

# Use a list comprehension to create a list containing only the _even_ elements
# the user entered into list x.

<<<<<<< HEAD
x = input("Enter comma-separated numbers: ").split(',')
=======
x = input("Enter comma-separated numbers: ").split(",")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# What do you need between the square brackets to make it work?
y = [num for num in x if int(num) % 2 == 0]

<<<<<<< HEAD
print(y)
=======
print(y)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
