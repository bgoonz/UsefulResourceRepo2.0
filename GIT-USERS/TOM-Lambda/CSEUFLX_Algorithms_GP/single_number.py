<<<<<<< HEAD
'''
Input: a List of integers where every int except one shows up twice
Returns: an integer
'''

# naive approach
def single_number(arr): # time O(2n) # space O(n)
=======
"""
Input: a List of integers where every int except one shows up twice
Returns: an integer
"""

# naive approach
def single_number(arr):  # time O(2n) # space O(n)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # set a new dictionary of counts

    # figure out the counts

    # iterate over the array / luist
<<<<<<< HEAD
        # if the number is in counts
            # increment the value at the key of number
        # otherwise
            # set the value at the key number to 1

    # go over the counts dictionar and find the odd one out
    # interate over the items in counts, extract num and item
        # if item is 1
            # return num

    pass

=======
    # if the number is in counts
    # increment the value at the key of number
    # otherwise
    # set the value at the key number to 1

    # go over the counts dictionar and find the odd one out
    # interate over the items in counts, extract num and item
    # if item is 1
    # return num

    pass


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# 2nd pass
# def single_number(arr): # time O(n) space O(1)

#     # set a starting result to zero

#     # iterate over each element in the array / list
#         # bitwise NOT the result against the element
#         # to cancel out any numbers that we have seen before

#     # return the result to the caller
#     pass


<<<<<<< HEAD

if __name__ == '__main__':
    # Use the main function to test your implementation
    arr = [1, 1, 4, 4, 5, 5, 3, 3, 9, 0, 0]

    print(f"The odd-number-out is {single_number(arr)}")
=======
if __name__ == "__main__":
    # Use the main function to test your implementation
    arr = [1, 1, 4, 4, 5, 5, 3, 3, 9, 0, 0]

    print(f"The odd-number-out is {single_number(arr)}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
