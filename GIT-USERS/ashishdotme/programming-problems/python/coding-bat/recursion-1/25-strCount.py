def strCount(str, sub):
    if len(str) == 0:
        return 0
    if str[:3] == sub:
        return 1 + strCount(str[3:], sub)
    return strCount(str[1:], sub)


print(strCount("catcowcat", "cow"))
