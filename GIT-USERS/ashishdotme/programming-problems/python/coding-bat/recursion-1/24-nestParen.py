def nestParen(str):
    if len(str) == 0:
        return True
    elif str[0] == "(" and str[len(str) - 1] == ")":
        return nestParen(str[1 : len(str) - 1])
    else:
        return False


print(nestParen("(((x)))"))
