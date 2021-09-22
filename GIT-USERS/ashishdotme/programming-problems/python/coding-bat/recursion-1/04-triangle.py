def triangle(num):
    if num == 0 or num == 1:
        return num
    else:
        return num + triangle(num - 1)


print(triangle(2))
