def noX(str):
    if len(str) == 0:
        return str
    else:
        if str[0] == "x":
            return noX(str[1:])
        else:
            return str[0] + noX(str[1:])


print(noX("xx"))
