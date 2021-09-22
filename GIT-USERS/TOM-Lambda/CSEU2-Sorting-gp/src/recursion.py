# from time import time
# import random
# l = [random.randint(0, 1000) for i in range(0, 100)]

# input_sizes = [i * 100 for i in range(1, 50)]

# times = []

# for input_size in input_sizes:
#     l = [random.randint(0, 1000) for i in range(0, input_size)]
#     # Store start time
#     start_time = time()
#     # Run some code

#     # Store end time
#     end_time = time()
#     # print out end time - start time
#     times.append(end_time - start_time)

# print("LENGTHS")
# for elem in input_sizes:
#     print(elem)

# print("TIMES")
# for t in times:
#     print(t)

# Recursion
<<<<<<< HEAD
    # Code that calls itself
    # Needs a base case to prevent a stack overflow
    # makes for fairly clean and elegant code
=======
# Code that calls itself
# Needs a base case to prevent a stack overflow
# makes for fairly clean and elegant code
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# O(n)
def foo(n):
    if n == 0:
        return
    print(n)
    foo(n - 1)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# O(2^n)
def foo2(n):
    if n == 0:
        return
    print(n)
    foo(n - 1)
    foo(n - 2)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# 1, 2, 4, 8, 16, 32, 64, 128, 258

n = 1000000
while n > 0:
    print(n)
    n -= 1

# foo(1000000)
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
