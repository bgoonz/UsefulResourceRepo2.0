def merge(left, right):
    c = []
    while len(left) is not 0 and len(right) is not 0:
        if (left[0]) < right[0]:
            c.append(left[0])
            left.remove(left[0])
        else:
            c.append(right[0])
            right.remove(right[0])
    if len(left) == 0:
        c += right
    else:
        c += left
    return c


def mergeSort(arr):
    if len(arr) == 0 or len(arr) == 1:
        return arr
    mid = int(len(arr) / 2)
    left = mergeSort(arr[:mid])
    right = mergeSort(arr[mid:])
    return merge(left, right)


arr = [9, 11, 3, 2, 5, 1, 12]
print(mergeSort(arr))
