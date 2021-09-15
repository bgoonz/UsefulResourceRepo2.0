def countAbc(str):
    if len(str) < 3:
        return 0
    if str[:3] == "abc" or str[:3] == "aba":
        return 1 + countAbc(str[1:])
    return countAbc(str[1:])


print(countAbc("abc"))
