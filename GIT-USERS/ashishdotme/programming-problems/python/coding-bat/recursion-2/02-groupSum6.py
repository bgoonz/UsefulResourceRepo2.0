def groupSum6(index, arr, total):
    if total == 0:
        return True
    if index >= len(arr):
        return False
    if arr[index] == 6:
        return groupSum6(index + 1, arr, total - arr[index])
    else:
        return groupSum6(index + 1, arr, total - arr[index]) or groupSum6(
            index + 1, arr, total
        )


print(groupSum6(0, [1, 6, 1], 8))
