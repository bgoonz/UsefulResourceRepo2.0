def countX(str):
    if len(str) == 0:
        return 0
    else:
        if str[0] == "x":
            return 1 + countX(str[1:])
        else:
            return countX(str[1:])


print(countX("xxhixx"))
