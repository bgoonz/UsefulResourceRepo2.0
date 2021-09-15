def reverse(num):
    reverse = 0
    while num > 0:
        single = num % 10
        reverse = reverse * 10 + single
        num = num / 10
    return reverse


print(reverse(126))
