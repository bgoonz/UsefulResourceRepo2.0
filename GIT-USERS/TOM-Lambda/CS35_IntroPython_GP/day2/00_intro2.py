# Passing by value Vs passing by Ref
import time
import statistics

# printf
# % is an unamed variable
# imagine we gave them names
# the first one was A and the second was B
# A = 3.45
# B = 4.675
<<<<<<< HEAD
print("%.2f   A   %.3f" %(3.45454545, 4.67564))
=======
print("%.2f   A   %.3f" % (3.45454545, 4.67564))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

x = 5
y = 7

a = "5"
b = "7"
"57"
print(str(x).__add__(y))


<<<<<<< HEAD


# define a doubling function that passes args by value
# 2352352 # 
=======
# define a doubling function that passes args by value
# 2352352 #
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# a = 3
# b =>>>>  @23423542 # [1, 2, 3]
# b = 23423542

<<<<<<< HEAD
def mult2(x):
    return x * 2

=======

def mult2(x):
    return x * 2


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# define a doubling function that passes args by reference
def mult2_list(l):
    for i in range(len(l)):
        l[i] *= 2


# # try out the functions
# a = 12

# new_number = mult2(a)
# print(new_number)

# lst = [2, 4, 6, 8] # mutable
# mult2_list(lst)

# for num in lst:
#     print(num)


<<<<<<< HEAD










# Centered Average functions

def centered_avg1(ints):
    pass

def centered_avg2(ints):
    pass

=======
# Centered Average functions


def centered_avg1(ints):
    pass


def centered_avg2(ints):
    pass


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# tests


numbers = [1, 41, 34, 29, 50, 50]

import time

start = time.time()
for i in range(1000):
    centered_avg1(numbers)
end = time.time()

print(end - start)

print("-----------------------")

start = time.time()
for i in range(1000):
    centered_avg2(numbers)
end = time.time()

print(end - start)
# a = 41 + 34 + 29 + 50
# print(a)

# b = a // 4

<<<<<<< HEAD
# print(b)
=======
# print(b)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
