def countX(str):
    if len(str) < 2:
        return 0
    else:
        if str[:2] == "hi":
            return 1 + countX(str[2:])
        else:
            return countX(str[1:])


print(countX("xhixhix"))
