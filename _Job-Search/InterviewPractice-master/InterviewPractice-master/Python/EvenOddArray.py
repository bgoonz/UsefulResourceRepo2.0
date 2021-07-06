def EvenOdd(lst):
    #
    # Rearrange so that even numbers are at an even index and odd numbers are at an odd index
    #

    length = len(lst)

    even = 0
    odd = 1

    while even <= length-2 and odd <= length-1:
        if lst[odd] % 2 == 1:
            odd += 1

        else:
            if lst[even] % 2 == 1:
                temp = lst[odd]
                lst[odd] = lst[even]
                lst[even] = temp
            else:
                even += 2

    return lst


def main():

    lst = [2, 1, 3, 4, 7, 9, 24, 98]
    lst2 = [2, 4, 3, 45, 21, 6, 22, 5, 9, 111]

    print(EvenOdd(lst2))

main()