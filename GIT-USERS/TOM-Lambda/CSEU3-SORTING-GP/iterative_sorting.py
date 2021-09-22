"""
Algorithm
Start with current index = 0

For all indices EXCEPT the last index:

a. Loop through elements on right-hand-side of current index and find the smallest element

b. Swap the element at current index with the smallest element found in above loop
"""

<<<<<<< HEAD
# TO-DO: Complete the selection_sort() function below 
def selection_sort( arr ):
=======
# TO-DO: Complete the selection_sort() function below
def selection_sort(arr):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # loop through n-1 elements
    for i in range(0, len(arr) - 1):
        # set sorted item index to i
        cur_index = i

        # give smallest a sentinal value
        smallest_index = cur_index
        # TO-DO: find next smallest element
        # loop over elements at right hand side of current index (current index + 1)
        # our ranege is the current index to the len of array - 1
        # loop here
        for j in range(cur_index + 1, len(arr)):
<<<<<<< HEAD
            # check if the number current iteration index is smaller than 
=======
            # check if the number current iteration index is smaller than
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # the number at the smallest index
            # if condition here
            if arr[j] < arr[smallest_index]:
                # if true then set smallest index to iteration index
                smallest_index = j
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # swap number at current index for number at smallest index
        arr[smallest_index], arr[cur_index] = arr[cur_index], arr[smallest_index]
        # arr[smallest_index], arr[cur_index] = 5, 3

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # arr[smallest_index] = 5
        # arr[cur_index] = 3

        # a, b = 5, 3

    # return the array
    return arr

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
"""
Loop through your array
Compare each element to its neighbor
If elements in wrong position (relative to each other, swap them)
If no swaps performed, stop. Else, 
go back to the element at index 0 and repeat step 1.
"""

# TO-DO:  implement the Bubble Sort function below
<<<<<<< HEAD
def bubble_sort( arr ):
=======
def bubble_sort(arr):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # set a variable to hosd swaps occured
    swaps_have_occured = True
    # loop while swaps have occured
    while swaps_have_occured:
        # set the swaps occured to false
        swaps_have_occured = False
        # inner loop to iterate over the list (loop through you array)
        for i in range(0, len(arr) - 1):
            # check if element is in wrong position
            if arr[i] > arr[i + 1]:
                # swap elements
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                # set swaps occured to true
                swaps_have_occured = True
    return arr

<<<<<<< HEAD
print('Bubble Sort')

lst = [8, 4, 6, 3, 2, 1, 5, 7, 9]
print(lst)
print('--------------------------')
=======

print("Bubble Sort")

lst = [8, 4, 6, 3, 2, 1, 5, 7, 9]
print(lst)
print("--------------------------")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
bubble_sort(lst)
print(lst)

# STRETCH: implement the Count Sort function below
<<<<<<< HEAD
def count_sort( arr, maximum=-1 ):

    return arr
=======
def count_sort(arr, maximum=-1):

    return arr
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
