def parenBit(str):
    if len(str) == 0:
        return str
    if str[0] != "(":
        return parenBit(str[1:])
    if str[len(str) - 1] != ")":
        return parenBit(str[: len(str) - 1])
    return str


print(parenBit("(xy)1"))
