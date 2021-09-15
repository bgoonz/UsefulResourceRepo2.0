def strCopies(str, sub, n):
    if n == 0:
        return True
    if len(str) < len(sub):
        return False
    if str[:3] == sub:
        return strCopies(str[1:], sub, n - 1)
    return strCopies(str[1:], sub, n)


print(strCopies("catcowcat", "cow", 1))
