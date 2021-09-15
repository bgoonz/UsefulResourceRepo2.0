# This is a comment

# lets print a string
# print("Hello, CSEUFLEX!", "Some other text", "and theres more...")
# variables
# label = value
# let const var (js)
# int bool short (c)
# first_name = "Tom"
# # print("Hello CSEUFLEX and" , first_name)
# num = 23.87

# # f strings
# my_string = "    this is a string tom"
# print(my_string)

# print(my_string.strip())
# print(len(my_string))
# print(len(my_string.strip()))

# print(f"Hello CSEUFLEX and                {first_name}.......")
# print("something on a new line")


<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# collections

# create an empty list? Array
lst1 = []
lst_empty = list()

# print(my_list)

# create a list with numbers 1, 2, 3, 4, 5
lst2 = [1, 2, 3, 4, 5]


# add an element 24 to lst1
lst1.append(24)
# lst1.append(240)
# lst1.append(32)
# lst1.append(120)
# print(lst1)

# # print all values in lst2
# print(lst2)


<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# range(9, 10)
# for i in range(0, 5):
#     print(lst2[i])

# while loop
# i = 0
# while i < 5:
#     print(lst2[i])
#     i += 1

# List Comprehensions

# Create a new list containing the squares of all values in 'numbers'
numbers = [1, 2, 3, 4]

# squares = []
# for num in numbers:
#     squares.append(num * num)

# squares = [num * num for num in numbers]
# print(numbers)
# print(squares)
# Filtering with a list comprehension
# evens = []
# for num in numbers:
#     if num % 2 == 0:
#         evens.append(num)


# create a new list of even numbers using the values of the numbers list as inputs
# evens = [num for num in numbers if num % 2 == 0]

# print(evens)
# create a new list containing only the names that start with 's' make sure they are capitalized (regardless of their original case)
names = ["Sarah", "jorge", "sam", "frank", "bob", "sandy"]
<<<<<<< HEAD
s_names = [name.capitalize() for name in names if name[0].lower() == 's']
=======
s_names = [name.capitalize() for name in names if name[0].lower() == "s"]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# print(s_names)


<<<<<<< HEAD





=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Dictionaries

# Create a new dictionary

# empty
d = {}
d2 = dict()
# key value pairs
<<<<<<< HEAD
student = {
    "name": "Amin",
    "cohort": "cseuflex",
    "current_sprint": "Intro to Python"
} 
# access an element via its key
student["friends"] = ["bob", "dave", "steve"]
print(student["friends"])

=======
student = {"name": "Amin", "cohort": "cseuflex", "current_sprint": "Intro to Python"}
# access an element via its key
student["friends"] = ["bob", "dave", "steve"]
print(student["friends"])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
