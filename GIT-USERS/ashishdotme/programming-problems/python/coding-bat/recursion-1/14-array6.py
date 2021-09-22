def array6(arr, index):
    if len(arr) == index:
        return False
    if arr[index] == 6:
        return True
    return array6(arr, index + 1)


print(array6([2, 5, 4, 5, 6, 2, 1], 0))
