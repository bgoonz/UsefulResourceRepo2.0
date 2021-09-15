# Why are recursive sorting algorithms useful?


<<<<<<< HEAD

# Divide a problem in to subproblems (of the same type)
# Solve the subproblems
# Combine the results of the subproblems 
=======
# Divide a problem in to subproblems (of the same type)
# Solve the subproblems
# Combine the results of the subproblems
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# to get the solution to the original problem

# Quicksort

# Divide and conquer sorting algorithm

<<<<<<< HEAD
    # start with a pivot point
     # (first or last element)
     # (middle, mean, median, or even a 
     # random element can get better performance)
    # move all elements smaller than the pivot point to the left hand side of the pivot. 
     # move all larger elements to the right of the pivot
    # (recursive case) recursively Quick Sort LHS and RHS until (base case) a side only contains a single element
=======
# start with a pivot point
# (first or last element)
# (middle, mean, median, or even a
# random element can get better performance)
# move all elements smaller than the pivot point to the left hand side of the pivot.
# move all larger elements to the right of the pivot
# (recursive case) recursively Quick Sort LHS and RHS until (base case) a side only contains a single element
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# partition data
def partition(data):
    left = []
    pivot = data[0]
    right = []

    for v in data[1:]:
        if v <= pivot:
            left.append(v)
        else:
            right.append(v)
<<<<<<< HEAD
    
    return left, pivot, right

=======

    return left, pivot, right


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def quick_sort(data):
    # base case
    if data == []:
        return data
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    left, pivot, right = partition(data)

    return quick_sort(left) + [pivot] + quick_sort(right)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def quick_sort_A(data, low, high):
    if low >= high:
        return data
    else:
        # divide
        pivot_index = low

        # for each element in sublist
        for i in range(low, high):
            if data[i] < data[pivot_index]:
                # double swap to move smaller elements to correct index
                # move current element to the right of the pivot
                temp = data[pivot_index + 1]
                data[pivot_index + 1] = data[i]
                data[i] = temp
                # swap pivot with element to its right
                temp = data[pivot_index]
                data[pivot_index] = data[pivot_index + 1]
                data[pivot_index + 1] = data[i]
                data[i] = temp

        # conqure
        # quick sort left
        data = quick_sort_A(data, low, pivot_index)

        # quick sort right
        data = quick_sort_A(data, pivot_index + 1, high)

        return data

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def quick_sort_B(data):
    stack = []
    left = []
    right = []
    # put the original data on the stack at index 0
    stack.insert(0, data)
    data = []
    # while there are still sublists on the stack to be sorted
    while len(stack) > 0:
        # pop the next sublist off the stack to sort
        current = stack.pop(0)
        # if it is a single element, no further sorting, add to final data list
        if isinstance(current, object):
            data.insert(0, current)
        elif current != None:
            # use first element as pivot
            pivot = current.pop(0)
            # while there are still elements in the sublist
            while len(current) > 0:
                # if next element smaller than pivot, add to left list
                if current[0] < pivot:
                    # move left
                    left.append(current.pop(0))
                # otherwise if next element larger than pivot, add to the right
                elif current[0] > pivot:
                    # move to right
                    right.append(current.pop(0))
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # quick sort LHS, RHS
            if len(right) > 0:
                stack.insert(0, right)
            stack.insert(0, pivot)
            if len(left) > 0:
                stack.insert(0, left)
            print("*" + str(len(current)))
<<<<<<< HEAD
            
    return data

                
=======

    return data

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# l = [20, 30, 10, 5, 70, 100, 8, 1, 12, 4, 6, 2]

# sl = quick_sort(l)

# print(l)
# print("------")
# print(sl)

from time import time
import random
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
l = [random.randint(0, 1000) for i in range(0, 100)]

input_sizes = [i * 100 for i in range(1, 50)]

times = []

for input_size in input_sizes:
    l = [random.randint(0, 1000) for i in range(0, input_size)]
    # Store start time
    start_time = time()
    # Run some code
    # quick_sort_A(l, 0, input_size)
    # Store end time
    end_time = time()
    # print out end time - start time
    times.append(end_time - start_time)

print("LENGTHS")
for elem in input_sizes:
    print(elem)

print("TIMES")
for t in times:
<<<<<<< HEAD
    print(t)
=======
    print(t)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
