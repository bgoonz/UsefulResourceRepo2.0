def groupNoAdj(index, arr, total):
    if total == 0:
        return True
    if index >= len(arr):
        return total == 0
    return groupNoAdj(index + 1, arr, total) or groupNoAdj(
        index + 2, arr, total - arr[index]
    )


print(groupNoAdj(0, [2, 1, 10, 4], 12))
