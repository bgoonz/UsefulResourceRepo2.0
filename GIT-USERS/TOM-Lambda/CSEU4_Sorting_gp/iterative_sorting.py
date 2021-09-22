<<<<<<< HEAD
# TO-DO: Complete the selection_sort() function below 
=======
# TO-DO: Complete the selection_sort() function below
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# def selection_sort( arr ):
#     # loop through n-1 elements
#     # len(arr) => 5
#     # out of bounds
#     # len(arr) - 1
<<<<<<< HEAD
#     # 4 -> 3 
=======
#     # 4 -> 3
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#     for i in range(0, len(arr) - 1): // OBOB
#         cur_index = i
#         smallest_index = cur_index
#         # TO-DO: find next smallest element
<<<<<<< HEAD
#         # (hint, can do in 3 loc) 
=======
#         # (hint, can do in 3 loc)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#         # iterate over a range
#         for j in range(cur_index, len(arr)):
#             if arr[j] < arr[smallest_index]:
#                 smallest_index = j

<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#         # swap
#         arr[smallest_index], arr[cur_index] = arr[cur_index], arr[smallest_index]

#     return arr

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
# implement the Insertion Sort function below
def insertion_sort( arr ):
  # loop through n-1 elements
  for i in range(1, len(arr)):
    temp = arr[i]
    j = i
    while j > 0 and temp < arr[j - 1]:
      # shift left until correct position found
      arr[j] = arr[j - 1]
      j -= 1
    # insert at correct position
    arr[j] = temp

  return arr



# TO-DO:  implement the Bubble Sort function below
def bubble_sort( arr ):
=======

# implement the Insertion Sort function below
def insertion_sort(arr):
    # loop through n-1 elements
    for i in range(1, len(arr)):
        temp = arr[i]
        j = i
        while j > 0 and temp < arr[j - 1]:
            # shift left until correct position found
            arr[j] = arr[j - 1]
            j -= 1
        # insert at correct position
        arr[j] = temp

    return arr


# TO-DO:  implement the Bubble Sort function below
def bubble_sort(arr):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    return arr


# STRETCH: implement the Count Sort function below
<<<<<<< HEAD
def count_sort( arr, maximum=-1 ):

    return arr
=======
def count_sort(arr, maximum=-1):

    return arr
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
