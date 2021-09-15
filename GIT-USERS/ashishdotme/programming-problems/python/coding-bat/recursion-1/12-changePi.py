def changePi(str):
    if len(str) < 2:
        return str
    if str[0] == "p" and str[1] == "i":
        return "3.14" + changePi(str[2:])
    return str[0] + changePi(str[1:])


print(changePi("pip"))
