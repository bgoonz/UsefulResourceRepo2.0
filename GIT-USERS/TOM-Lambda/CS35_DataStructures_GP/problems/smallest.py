def smallest_missing(arr, left, right):
    """ 
        run a binary search on our sorted list
        because we know that the input should already be sorted
        and this would give us a O(log n) time complexity 
        over doing a linear search that would yield a time complexity of O(n)
    """

    # check if left is greater than right
    if left > right:
        # if so return left
        return left

<<<<<<< HEAD
    
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # work out where we want to split the array (mid_point)
    mid_point = left + (right - left) // 2

    # check if the mid_point value is the same as teh mid_point index
    if arr[mid_point] == mid_point:
        # do a recursive call to the right hand side of the array
        return smallest_missing(arr, mid_point + 1, right)
    # otherwise
    else:
        # do a recursive call to the left hand side of the array
        return smallest_missing(arr, left, mid_point - 1)


"""
# here is a working solution from Vince Williams
def smallest(arr):
    for ind, num in enumerate(arr):
        if num != ind:
            return ind
    return (arr[-1] + 1)
print(smallest([0, 1, 2, 6, 9, 11, 15]))
print(smallest([1, 2, 3, 4, 6, 9, 11, 15]))
print(smallest([0, 1, 2, 3, 4, 5, 6]))
"""

<<<<<<< HEAD
if __name__ == '__main__':
    A = [0, 1, 2, 6, 9, 11, 15]

    print(f"The smallest Missing Element is {smallest_missing(A, 0, len(A) - 1)}")  # => 3
    
    A = [1, 2, 3, 4, 6, 9, 11, 15]

    print(f"The smallest Missing Element is {smallest_missing(A, 0, len(A) - 1)}")  # => 0
    
    A = [0, 1, 2, 3, 4, 5, 6]

    print(f"The smallest Missing Element is {smallest_missing(A, 0, len(A) - 1)}")  # => 7


=======
if __name__ == "__main__":
    A = [0, 1, 2, 6, 9, 11, 15]

    print(
        f"The smallest Missing Element is {smallest_missing(A, 0, len(A) - 1)}"
    )  # => 3

    A = [1, 2, 3, 4, 6, 9, 11, 15]

    print(
        f"The smallest Missing Element is {smallest_missing(A, 0, len(A) - 1)}"
    )  # => 0

    A = [0, 1, 2, 3, 4, 5, 6]

    print(
        f"The smallest Missing Element is {smallest_missing(A, 0, len(A) - 1)}"
    )  # => 7
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
