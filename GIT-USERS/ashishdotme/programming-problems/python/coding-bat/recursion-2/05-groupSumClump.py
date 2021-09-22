""" Given an array of ints, is it possible to choose a group of some of the ints,
such that the group sums to the given target, with this additional constraint:
if there are numbers in the array that are adjacent and the identical value,
they must either all be chosen, or none of them chosen. For example, with the
array {1, 2, 2, 2, 5, 2}, either all three 2's in the middle must be chosen or
not, all as a group. (one loop can be used to find the extent of the identical
values) """


def groupSumClump(index, arr, total):
    if total == 0:
        return True
    if index >= len(arr):
        return total == 0
    sum = arr[index]
    start = index + 1
    while start < len(arr) and arr[start] == arr[index]:
        sum += arr[start]
        start += 1
    return groupSumClump(start, arr, total - sum) or groupSumClump(start, arr, total)


print(groupSumClump(0, [8, 2, 2, 1], 11))
