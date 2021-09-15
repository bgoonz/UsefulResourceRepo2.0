def count11(str):
    if len(str) == 0:
        return 0
    if str[:2] == "11":
        return 1 + count11(str[2:])
    return count11(str[1:])


print(count11("111"))
