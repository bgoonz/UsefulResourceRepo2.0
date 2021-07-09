'''
Title     : Security - Message Space and Ciphertext Space
Subdomain : Terminology and Concepts
Domain    : Security
Author    : Kalpak Seal
Created   : 24 September 2016
'''

n = raw_input()
newNum = ""
for i in n:
    a = int(i)
    if a != 9:
        a += 1
        newNum += str(a)
    else:
        a = 0
        newNum += str(a)

print (newNum)

