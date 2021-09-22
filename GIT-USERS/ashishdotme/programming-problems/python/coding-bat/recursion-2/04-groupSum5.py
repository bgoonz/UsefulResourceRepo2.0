def groupSum5(index, arr, total):
    if total == 0:
        return True
    if index >= len(arr):
        return total == 0
    if arr[index] % 5 == 0:
        if arr[index + 1] is not 1:
            return groupSum5(index + 1, arr, total - arr[index])
        else:
            return groupSum5(index + 1, arr, total)
    else:
        return groupSum5(index + 1, arr, total - arr[index]) or groupSum5(
            index + 1, arr, total
        )


print(groupSum5(0, [2, 5, 10, 1, 4], 19))
