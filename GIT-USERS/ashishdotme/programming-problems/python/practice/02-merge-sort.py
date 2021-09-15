def merge(left, right):
    return left + right


def mergesort(L):
    if len(L) < 2:
        return L
    middle = int(len(L) / 2)
    left = mergesort(L[:middle])
    right = mergesort(L[middle:])
    out = merge(left, right)
    return out


print(mergesort([6, 11, 5, 3]))
