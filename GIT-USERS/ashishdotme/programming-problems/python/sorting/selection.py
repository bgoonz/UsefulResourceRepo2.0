def selection_sort(arr):
    for i in range(len(arr)):
        value = arr[i]
        min = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min]:
                min = j
        arr[i] = arr[min]
        arr[min] = value
    return arr


print(selection_sort([9, 11, 3, 2, 5, 1, 12]))
