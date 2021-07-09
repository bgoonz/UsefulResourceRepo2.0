"""
Print all primes between 1 and a number
"""

def primes():
    n = 100

    for i in range(1, n):
        for j in range(2, (i + 1)):
            if i % j == 0:
                if i == j:
                    print(i)
                break

primes()
