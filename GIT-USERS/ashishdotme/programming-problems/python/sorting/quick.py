def quick_sort(arr):
    if len(arr) == 0 or len(arr) == 1:
        return arr
    lesser = []
    equal = []
    greater = []
    pivot = arr[0]
    for element in arr:
        if element < pivot:
            lesser.append(element)
        if element == pivot:
            equal.append(element)
        if element > pivot:
            greater.append(element)
    return quick_sort(lesser) + equal + quick_sort(greater)


arr = [5, 3, 1, 2, 4]
print(quick_sort(arr))
