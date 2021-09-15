# This is a comment

# lets print a string
print("Hello CSEU4")

# variables
# label = value
first_name = "Tom"
last_name = "Tarpey"

my_num = 34 * 5

# print("Hello CSEU4 and " + first_name)
print("Hello CSEU4 and", first_name, "some more text", my_num)

# f strings
print(f"Hello {first_name} how are you today? so a number is {my_num}")

# collections

# create an empty list? Array
lst1 = []
lst1 = list()

# create a list with numbers 1, 2, 3, 4, 5
lst2 = [1, 2, 3, 4, 5]
lst2 = list([1, 2, 3, 4, 5])

# add an element 24 to lst1
lst1.append(24)
lst1.append("Tom")
lst1.append(24)
print(lst1)
# print all values in lst2
print(lst2)
for e in lst2:
    print(e)

<<<<<<< HEAD
for i in range(len(lst2)): # range(9, 10)
=======
for i in range(len(lst2)):  # range(9, 10)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    print(lst2[i])

print("i am not in the loop")
# while loop
i = 0
while i < len(lst2):
    print(lst2[i])
    i += 1

# List Comprehensions

# Create a new list containing the squares of all values in 'numbers'
numbers = [1, 2, 3, 4, 5]
print(numbers)

# squares = []
# for num in numbers:
#     squares.append(num * num)
squares = [num * num for num in numbers]
print(squares)

# Filtering with a list comprehension
# evens = []
# for num in numbers:
#     if num % 2 == 0:
#         evens.append(num)

# create a new list of even numbers using the values of the numbers list as inputs
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [num for num in numbers if num % 2 == 0]
print(evens)

# create a new list containing only the names that start with 's' make sure they are capitalized (regardless of their original case)
<<<<<<< HEAD
names = ['Patrick', 'Melquisedeque', 'Bob', 'steve', 'Sam', 'frank', 'shawn', "slido"]
new_names = [name.capitalize() for name in names if name[0].lower() == 's']
=======
names = ["Patrick", "Melquisedeque", "Bob", "steve", "Sam", "frank", "shawn", "slido"]
new_names = [name.capitalize() for name in names if name[0].lower() == "s"]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

print(new_names)

# Dictionaries

# Create a new dictionary
<<<<<<< HEAD
d = {} # empty
d2 = {"name": "Tom", "age": 40} # key value pairs
=======
d = {}  # empty
d2 = {"name": "Tom", "age": 40}  # key value pairs
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# access an element via its key
print(f'Name: {d2["name"]} \nAge: {d2["age"]}')

# iterate over dict
for k in d2:
    print(f"{k.capitalize()}: {d2[k]}")
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
