def solution():
    n = int(input())
    binary = "{0:b}".format(n)

    inverse = ""

    for bit in binary:
        if bit == "1":
            inverse += "0"
        else:
            inverse += "1"

    answer = int(inverse, 2)
    print(answer)

solution()