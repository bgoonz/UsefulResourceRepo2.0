​
# # Is an item in our array? return true or false
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return True
​
    return False
​
​
def recursive_search(arr, target):
    if len(arr) == 0:
        return False
​
    if arr[0] == target:
        return True
    
    return recursive_search(arr[1:], target)
​
​
def binary_search(array, target):
    min = 0
    max = len(array) - 1
​
    while min <= max:
        # find middle, and check
        middle = (max + min) // 2
        middle_item = array[middle]
        if middle_item == target:
            return True
        elif middle_item > target:
            max = middle - 1
        else: 
            min = middle + 1
    
    return False
​
def recursive_binary(array, target):
    if len(array) == 0:
        return False
    middle_index = len(array) // 2
    if array[middle_index] == target:
        return True
    
    if array[middle_index] < target:
        return recursive_binary(array[middle_index + 1:], target)
    else:
        return recursive_binary(array[:middle_index], target)
​
#[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
print(list(range(20)))
print(recursive_binary(list(range(20)), 19))
​
​
​
# our_array = list(range(20)) #[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
# print(our_array)
# # print(recursive_search(our_array, 4))
# print(binary_search(our_array, 11))