def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(
            len(arr) - 1 - i
        ):  # -i because the last element is sorted in each pass
            if arr[j] > arr[j + 1]:
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
    return arr


print(bubble_sort([3, 4, 1, 2, 11, 6, 2, 6, 9, 12, 0, 3]))
