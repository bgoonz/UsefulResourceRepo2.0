def sumDigits(num):
    if num == 0:
        return 0
    else:
        return (num % 10) + sumDigits(int(num / 10))


print(sumDigits(126))
