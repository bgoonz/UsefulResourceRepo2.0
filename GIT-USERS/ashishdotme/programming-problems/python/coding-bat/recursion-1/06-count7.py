def count7(num):
    if num == 0:
        return 0
    else:
        if num % 10 == 7:
            return 1 + count7(num / 10)
        else:
            return count7(num / 10)


print(count7(717700))
