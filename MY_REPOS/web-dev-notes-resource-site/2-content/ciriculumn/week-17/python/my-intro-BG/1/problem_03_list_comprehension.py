# LIST COMPREHENSION
#
# In this problem, write a function named "my_comprehension" that accepts an
# iterable of strings as a parameter and returns a new list with strings from
# the original list that are longer than five characters. The function must use
# a list comprehension in its implementation. Your function body must contain
# only one line.
#
# There are two sample data calls for you to use.

# WRITE YOUR FUNCTION HERE
def my_comprehension(lst):
    return [item for item in lst if len(item) > 5]


# TEST DATA
test = ["nope", "yes this one", "not", "uhuh", "here's one", "narp"]
print(my_comprehension(test))  # > ["yes this one", "here's one"]

test = ["plop", "", "drop", "zop", "stop"]
print(my_comprehension(test))  # > []

test = []
print(my_comprehension(test))  # > []
