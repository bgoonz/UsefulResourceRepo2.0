'''
Title     : Security - Security Key Spaces
Subdomain : Terminology and Concepts
Domain    : Security
Author    : Kalpak Seal
Created   : 24 September 2016
'''

n = raw_input()

k = int(input())
newNum = ""
for i in n:
    a = int(i)
    newNum += str((a + k) % 10)

print (newNum)
