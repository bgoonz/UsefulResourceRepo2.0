def SumOfIntegers(arr):
    sum = 0
    for i in arr:
        sum = sum + i

    return sum


def main():

    arr = [5, 1, 2, 3, 4, 5]

    print(SumOfIntegers(arr))

main()