def array11(arr, index):
    if len(arr) == index:
        return 0
    if arr[index] == 11:
        return 1 + array11(arr, index + 1)
    return array11(arr, index + 1)


print(array11([1, 2, 11], 0))
