def isBijective(n, l):
    for i in range(0, n):
        for j in range(0, i):
            if (j + 1) in l:
                continue
            else:
                return ("NO")
    return ("YES")

n = int(input())
l = list(map(int, input().split()))

print(isBijective(n, l))