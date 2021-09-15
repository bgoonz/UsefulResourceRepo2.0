def bunnyEars2(num):
    if num == 0:
        return 0
    elif num % 2 == 0:
        return 3 + bunnyEars2(num - 1)
    else:
        return 2 + bunnyEars2(num - 1)


print(bunnyEars2(2))
