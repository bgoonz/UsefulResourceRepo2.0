# Linear Search

"""
Key Points
- Linear search is the simplest type of search we can do
- Sometimes it's the only method available. If the data is unordered, this is the only way to do it
- It also beats a binary search under some special circumstances
- Key words: unsorted, random
"""

import random
import time  # We'll use this later

my_range = 100
my_size = 100

my_random = random.sample(range(my_range), my_size)
print(my_random)

searching_for = 7

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return True

    return False

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# print(linear_search(my_random, searching_for))


# Binary Search

"""
Key Points
- Binary search requires sorted data
- Each pass, we cut the remaining possibilities by half, hence the term binary
- Key words: sorted, ordered
"""

<<<<<<< HEAD
def find_value_binary(arr, value):
    first = 0
    last = (len(arr) - 1)
=======

def find_value_binary(arr, value):
    first = 0
    last = len(arr) - 1
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    found = False

    while first <= last and not found:
        # find middle using integer divsion
        middle = (first + last) // 2

        if arr[middle] == value:
            found = True

        else:
            if value < arr[middle]:
                # search lower half of remainder
                last = middle - 1
            else:
                # search upper half of remainder
                first = middle + 1

    return found

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Sort the array of numbers
my_random.sort()
# print(find_value_binary(my_random, searching_for))


# Comparing Linear vs. Binary

"""
Key Points
- Binary search is only faster if the data is already sorted.
- It's slower for the first search if the data needs to be sorted first
- Subsequent searches will be much faster
"""

# print("Linear")
# start = time.time()
# print(linear_search(my_random, searching_for))
# end = time.time()
# print(f"Runtime: {end - start}")

# print("Binary")
# start = time.time()
# my_random.sort()
# print(find_value_binary(my_random, searching_for))
# end = time.time()
# print(f"Runtime: {end - start}")


# lets see what heppens with multiple runs

print("Linear")
start = time.time()
print(linear_search(my_random, searching_for))
end = time.time()
print(f"Runtime: {end - start}")

print("Linear Again")
start = time.time()
print(linear_search(my_random, searching_for))
end = time.time()
print(f"Runtime: {end - start}")

print("Binary")
start = time.time()
my_random.sort()
print(find_value_binary(my_random, searching_for))
end = time.time()
print(f"Runtime: {end - start}")

print("Binary _after_ sort")
start = time.time()
print(find_value_binary(my_random, searching_for))
end = time.time()
<<<<<<< HEAD
print(f"Runtime: {end - start}")
=======
print(f"Runtime: {end - start}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
