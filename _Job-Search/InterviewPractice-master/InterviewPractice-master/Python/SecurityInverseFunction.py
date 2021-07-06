'''
Title     : Security Inverse Functions
Subdomain : Functions
Domain    : Security
Author    : Kalpak Seal
Created   : 24 September 2016
'''
n = int(input())
l = list(map(int, raw_input().split()))
pos = []
for i in range(1, n+1):
    pos.append(i)

z = zip(pos, l)

z = sorted(z, key=lambda x:x[1])
for t in z:
    print(t[0])