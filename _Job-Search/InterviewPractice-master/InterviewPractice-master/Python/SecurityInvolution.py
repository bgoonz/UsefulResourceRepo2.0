'''
Title     : Security Involution
Subdomain : Functions
Domain    : Security
Author    : Kalpak Seal
Created   : 24 September 2016
'''

n = int(input())

l = [int(x) for x in raw_input().split()]

for i in range(0, n):
    if (i + 1) == l[l[i] - 1]:
        flag = "YES"
        continue
    else:
        flag = "NO"
        break

print (flag)

