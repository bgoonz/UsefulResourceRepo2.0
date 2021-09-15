# Insertion sort


def insertion_sort(arr):
    for i in range(1, len(arr)):
        value = arr[i]
        hole = i
        while hole > 0 and arr[hole - 1] > value:
            arr[hole] = arr[hole - 1]
            hole = hole - 1
        arr[hole] = value
    return arr


arr = [9, 11, 3, 2, 5, 1, 12]
print(insertion_sort(arr))
