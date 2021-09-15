<<<<<<< HEAD
# Return the "centered" average of an array of ints, which we'll say is the mean average of the values, 
# except ignoring the largest and smallest values in the array. 
=======
# Return the "centered" average of an array of ints, which we'll say is the mean average of the values,
# except ignoring the largest and smallest values in the array.
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# what do we do if smallest or largest is duplicated
# - we only consider 1 of smallest and 1 of largest to be valid

# what data type are we expecting to return?
# int / float?
# return an int

# centered_average([1, 2, 3, 4, 100]) → 3 >>> [2, 3, 4, 100] -> [2, 3, 4] -> 2 + 3 + 4 => 9 / 3 => 3
# centered_average([1, 1, 5, 5, 10, 8, 7]) → 5 >>> [1, 5, 5, 10, 8, 7] -> [1, 5, 5, 8, 7] -> 1 + 5 + 5 + 8 + 7 => 26 / 5
# centered_average([-10, -4, -2, -4, -2, 0]) → -3 >>> [-4, -2, -4, -2, 0] -> [-4, -2, -4, -2]  => -4 + -2 + -4 + -2 => -12 / 4 => -3

# centered_average([1, 2, 3, 4, 100]) -> 3 >>> [1, 2, 3, 4, 100] -> 1 + 2 + 3 + 4 + 100 => 110 => 110 - max => 10 - min => 9 / 3 => 3
# max = 100
# min = 1

# Centered Average functions
import time

import statistics

# 1 O(n)
def centered_avg1(ints):
    # max() min()
    # get the smallest value
    smallest = min(ints)
    # get largest value
    largest = max(ints)

    # sum up everything except the smallest and largest values
    sum = 0
    # iterate over the data
<<<<<<< HEAD
    for num in ints: 
=======
    for num in ints:
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # sum up the values
        sum += num

    # set the sum to the sum minus the smallest and largest values
    sum = sum - smallest - largest

    # apply the algorithm of sum / (length of the data set minus 2) and return it
    return sum // (len(ints) - 2)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# 2 O(n)
def centered_avg2(ints):
    # sort the ints
    ints.sort()
    # use builtin mean function on a slice of the ints
<<<<<<< HEAD
    return statistics.mean(ints[1:-1]) # [1, 2, 3, 4, 100] num1 inclusive : num2 exclusive


=======
    return statistics.mean(
        ints[1:-1]
    )  # [1, 2, 3, 4, 100] num1 inclusive : num2 exclusive
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# after testing
# 1 is ~ 30x faster than 2


# tests


numbers = [1, 2, 3, 4, 100]
# print(centered_avg1(numbers))
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

<<<<<<< HEAD
print(end - start)
=======
print(end - start)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
