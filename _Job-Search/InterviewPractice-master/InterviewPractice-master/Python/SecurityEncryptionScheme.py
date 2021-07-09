'''
Title     : Security Encryption Scheme
Subdomain : Terminology and Concepts
Domain    : Security
Author    : Kalpak Seal
Created   : 24 September 2016
'''
def get_fact(n):
    if n == 1:
        return 1
    return n * get_fact(n-1)

n = int(input())
print(get_fact(n))