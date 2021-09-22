<<<<<<< HEAD
def quick_sort_A( books, low, high ):
=======
def quick_sort_A(books, low, high):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # base case
    if low >= high:
        return books
    # recursive case
    else:
        # divide
        pivot_index = low
        # for each element in subarray
        for i in range(low, high):
            if books[i].genre < books[pivot_index].genre:
                # double swap to move smaller elements to correct index
                # move current element to the right of pivot
<<<<<<< HEAD
                temp = books[pivot_index+1]
                books[pivot_index+1] = books[i]
=======
                temp = books[pivot_index + 1]
                books[pivot_index + 1] = books[i]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                books[i] = temp

                # swap pivot with element on its right
                temp = books[pivot_index]
<<<<<<< HEAD
                books[pivot_index] = books[pivot_index+1]
                books[pivot_index+1] = temp
=======
                books[pivot_index] = books[pivot_index + 1]
                books[pivot_index + 1] = temp
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                pivot_index += 1

        # conquer
        # Quick Sort everything left of the pivot
        books = quick_sort_A(books, low, pivot_index)
        # Quick Sort everything right of the pivot
<<<<<<< HEAD
        books = quick_sort_A(books, pivot_index+1, high)
  
        return books

    
# NOT done in place because for large inputs, we
# exceed Python's maximum recursion depth with 
# in-place Quick Sort
def quick_sort_b( books ):
=======
        books = quick_sort_A(books, pivot_index + 1, high)

        return books


# NOT done in place because for large inputs, we
# exceed Python's maximum recursion depth with
# in-place Quick Sort
def quick_sort_b(books):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    stack = []
    left = []
    right = []
    # put the original arr of books on the stack at index 0
    stack.insert(0, books)
    books = []
    # while there are still subarrays on the stack to be sorted
    while len(stack) > 0:
        # pop the next subarray off the stack to sort
        current = stack.pop(0)
        # if it's a single element, no further sorting needed, add to final books arr
        if isinstance(current, object):
            books.insert(0, current)
        elif current != None:
            # use FIRST element as pivot
            pivot = current.pop(0)
            # while there are still elements in this subarray
            while len(current) > 0:
                # if next element smaller than pivot, add to left arr
                if current[0].genre < pivot.genre:
<<<<<<< HEAD
                    # move to LHS 
=======
                    # move to LHS
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                    left.append(current.pop(0))
                # else if next element larger than pivot, add to right arr
                elif current[0].genre > pivot.genre:
                    # move to RHS
                    right.append(current.pop(0))

            # Quick Sort LHS, RHS by adding left and right arrs to stack arr to be sorted
            if len(right) > 0:
                stack.insert(0, right)
            stack.insert(0, pivot)
            if len(left) > 0:
                stack.insert(0, left)
<<<<<<< HEAD
            print("*"+str(len(current)))

    return books

=======
            print("*" + str(len(current)))

    return books
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
