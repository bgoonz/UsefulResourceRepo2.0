def countHi2(str):
    if len(str) == 0:
        return 0
    if str[1:3] == "hi" and str[:1] is not "x":
        return 1 + countHi2(str[1:])
    return countHi2(str[1:])


print(countHi2("xhixhi"))
