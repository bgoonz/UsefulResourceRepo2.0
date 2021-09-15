def groupSum(index, arr, total):
    if total == 0:
        return True
    if index >= len(arr):
        return False
    return groupSum(index + 1, arr, total - arr[index]) or groupSum(
        index + 1, arr, total
    )


print(groupSum(0, [2, 4, 8], 10))
