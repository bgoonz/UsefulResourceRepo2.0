def numberOfRoutes (a):
    L = [1] * a

    for i in range(a):
        for j in range(i):
            L[j] = L[j]+L[j-1]
        L[i] = 2 * L[i - 1]

    return(L[a - 1])

a = int(input())
print(numberOfRoutes(a))