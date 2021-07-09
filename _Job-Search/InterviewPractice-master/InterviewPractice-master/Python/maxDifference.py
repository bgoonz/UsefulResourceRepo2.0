def maxDifference(a):

    """

    # For some reason this implementation passes test 1, while the other does not.

    max = a[1] - a[0]
    size = len(a)
    i = 0
    j = 0

    while i < size:
        while j < size:
            if((a[j] - a[i]) > max):
                max = a[j] - a[i]
            j += 1
        i += 1

    return max

    """


def MaxDifference2(a):

    max = a[1] - a[0]
    min = a[0]

    size = len(a)

    i = 0

    while i < size:

        if(a[0] - min > max):
            max = a[i] - min

        if(a[0] < min):
            min = a[i]

        i += 1

    return max




def main():

    a = [7, 9, 5, 6, 3, 2]
    a2 = [7, 2, 3, 10, 2, 4, 8, 1]

    print(maxDifference(a))
    print(MaxDifference2(a))

main()