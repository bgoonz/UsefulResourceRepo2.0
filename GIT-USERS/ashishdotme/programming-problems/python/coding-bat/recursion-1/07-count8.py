def count8(num):
    if num == 0:
        return 0
    else:
        if num % 10 == 8 and (num / 10) % 10 == 8:
            return 2 + count8(num / 10)
        elif num % 10 == 8:
            return 1 + count8(num / 10)
        else:
            return count8(num / 10)


print(count8(88818))
