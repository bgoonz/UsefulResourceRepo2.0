def allStar(str):
    if len(str) == 1:
        return str
    return str[0] + "*" + allStar(str[1:])


print(allStar("abc"))
