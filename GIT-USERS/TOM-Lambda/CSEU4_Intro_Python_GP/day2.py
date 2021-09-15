# Passing by value Vs passing by Ref
import time
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# define a doubling function that passes args by value
def mult2(x):
    return x * 2

<<<<<<< HEAD
=======

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

#===========================================================

# Return the "centered" average of an array of ints, which we'll say is the mean average of the values, 
# except ignoring the largest and smallest values in the array. 
=======
# ===========================================================

# Return the "centered" average of an array of ints, which we'll say is the mean average of the values,
# except ignoring the largest and smallest values in the array.
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# centered_average([1, 2, 3, 4, 100]) → 3 (1 100)... (2 + 3 + 4) => 9 ==> 9 / 3 => 3
# centered_average([1, 1, 5, 5, 10, 8, 7]) → 5 (1 + 5 + 5 + 8 + 7) // 5
# centered_average([-10, -4, -2, -4, -2, 0]) → -3

# UNDERSTAND

# how many integers to work with? (min 3 ints)
# if there are more than 1 largest or smallest value what do we do? we remove only 1
# do we need to account for floating points in our answers? no we only want to use int answers //

# PLAN & EXECUTE
# maybe use min / max?
# maybe use builtins?

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def centered_avg1(ints):
    # gather smallest and largest values for later
    # grab smallest in to a var using the min function
    smallest = min(ints)
    # grab largest in to a var using the max function
    largest = max(ints)

    # sum up the totals of the values in the list
    # set a sum var to zero
    sum = 0
    # iterate over the numbers
    for i in ints:
        # increment the sum by the current number
        sum += i

    # subtract the smallest and largest values that we stored earlier
    # set our sum to our sum minus smallest and largest
    sum = sum - smallest - largest

<<<<<<< HEAD
    # get the mean of the remaining items by way of this algorithm 
=======
    # get the mean of the remaining items by way of this algorithm
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # end_result = sum of all numbers excluding the smallest and largest floor divided by the length of the list minus 2
    end_result = sum // (len(ints) - 2)
    # and return our end_result
    return end_result

<<<<<<< HEAD
import statistics
=======

import statistics

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# def centered_avg2(ints):
#     # sort our ints
#     ints.sort()
#     # extract the midle values via a slice
#     middle_values = ints[1:-1]
#     # give the mean of the middle values
#     our_mean = statistics.mean(middle_values)
#     # return our mean
#     return our_mean

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def centered_avg2(ints):
    ints.sort()
    return statistics.mean(ints[1:-1])


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

# print(b)
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
