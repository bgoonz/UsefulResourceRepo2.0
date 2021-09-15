def changeXY(str):
    if len(str) == 0:
        return str
    if str[0] == "x":
        return "y" + changeXY(str[1:])
    return str[0] + changeXY(str[1:])


print(changeXY("xhixhix"))
