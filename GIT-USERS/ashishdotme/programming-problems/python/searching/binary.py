def binary_search(arr, key):
    start = 0
    end = len(arr) - 1
    flag = False
    while start <= end and flag is False:
        mid = int((end - start) / 2)
        if arr[mid] == key:
            flag = True
        else:
            if key < arr[mid]:
                end -= 1
            else:
                start += 1
    return flag


arr = [1, 4, 21, 56, 89]
print(binary_search(arr, 21))
