def reverse(x):
    """
    :type x: int
    :rtype: int
    """

    MIN = -(2 ** 31)
    MAX = 2 ** 31

    numList = []
    reversed = []
    num = str(x)

    if (x < MAX) or (x > MIN):

        for i in num:
            numList.append(i)
            reversed = numList[::-1]

        if reversed[-1] is "-":
            del reversed[-1]
            reversed.insert(0, "-")
        else:
            pass

        reversed = "".join(reversed)

        return int(reversed)

    else:
        return 0

def main():
    x = 1534236469
    print(reverse(x))

main()