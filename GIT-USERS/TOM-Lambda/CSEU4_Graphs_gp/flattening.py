<<<<<<< HEAD
arr = [
    [1, 2, 3, 4], 23,
    [5, 6, 7, 8], 19,
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]
=======
arr = [[1, 2, 3, 4], 23, [5, 6, 7, 8], 19, [9, 10, 11, 12], [13, 14, 15, 16]]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
arr2 = []
for i in range(1, 17):
    arr2.append(i)

print(arr)
# print(arr2)
# print(arr[0][1])

# # x + y * width
# print(arr2[1 + 0 * 4])


<<<<<<< HEAD

def squash_my_list(l):
    # l is a list, possibly nested
    result_l = [] # empty, result list
=======
def squash_my_list(l):
    # l is a list, possibly nested
    result_l = []  # empty, result list
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    for i in l:
        if type(i) is list:
            # if we have a list, then extend
            result_l.extend(i)
<<<<<<< HEAD
        else: # otherwise append to the result, one item
            result_l.append(i)
    return result_l

arr3 = squash_my_list(arr)
print(arr3)
=======
        else:  # otherwise append to the result, one item
            result_l.append(i)
    return result_l


arr3 = squash_my_list(arr)
print(arr3)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
