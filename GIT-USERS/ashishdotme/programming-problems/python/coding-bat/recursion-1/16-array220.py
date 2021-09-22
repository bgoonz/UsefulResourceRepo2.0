def array220(arr, index):
    if len(arr) - 1 == index:
        return False
    if arr[index] * 10 == arr[index + 1]:
        return True
    return array220(arr, index + 1)


print(array220([1, 2, 20], 0))
