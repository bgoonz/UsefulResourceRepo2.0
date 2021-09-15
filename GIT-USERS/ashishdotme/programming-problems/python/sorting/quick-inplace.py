def partition(sample, start, end):
    pivot = sample[end]
    pivotLoc = start
    index = start
    while index < len(sample) - 1:
        if sample[index] <= pivot:
            temp = arr[pivotLoc]
            arr[pivotLoc] = arr[index]
            arr[index] = temp
            pivotLoc += 1
        index += 1
    temp = sample[pivotLoc]
    sample[pivotLoc] = sample[end]
    sample[end] = temp
    return pivotLoc


def quicksort(sample, start, end):
    if start >= end:
        return sample
    index = partition(sample, start, end)
    quicksort(sample, start, index - 1)
    quicksort(sample, index + 1, end)
    return sample


arr = [4, 2, 7, 5, 1]
print(quicksort(arr, 0, len(arr) - 1))
