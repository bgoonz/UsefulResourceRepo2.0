def bunny_ears(num):
    if num == 0:
        return 0
    else:
        return 2 + bunny_ears(num - 1)


print(bunny_ears(3))
