def stringClean(str):
    if len(str) == 0:
        return str
    if str[:1] == str[1:2]:
        return stringClean(str[1:])
    return str[:1] + stringClean(str[1:])


print(stringClean("ll"))
