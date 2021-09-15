def strDist(str, sub):
    if len(str) == 0:
        return 0
    if not str.startswith(sub):
        return strDist(str[1:], sub)
    if not str.endswith(sub):
        return strDist(str[: len(str) - 1], sub)
    return len(str)


print(strDist("catcowcat", "cow"))
