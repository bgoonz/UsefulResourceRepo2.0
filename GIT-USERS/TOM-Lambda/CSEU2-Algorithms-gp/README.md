# CSEU2-Algorithms-gp
CSEU2 Algorithms Guided Project code

# Challenge solutions
```
Nabeelah Yousuph  11 minutes ago
# 1
def baz(n):  # O(n*sqrt(n) ^ 2)
    s = 0  # O(1)

    for i in range(n):  # O(n)
        for j in range(int(math.sqrt(n))):  # O(sqrt(n))
            s += i * j  # O(1)

    return s


# 2
def frotz(n):  # O(2n ^ 2)
    s = 0  # O(1)

    for i in range(n):  # O(n)
        for j in range(2 * n):  # O(2n)
            s += i * j  # O(1)

    return s


# 3
def bar(x):  # O((1478 + x) ^ 3)
    sum = 0  # O(1)
    for i in range(0, 1463):  # O(1463)
        i += sum  # O(1)
        for _ in range(0, x):  # O(x)
            for _ in range(x, x + 15):  # O(15 + x)
                sum += 1  # O(1)


Jakub Maleta  11 minutes ago
# 1
def baz(n): # O(n*sqrt(n))
    s = 0 # O(1)

    for i in range(n): # O(n)
        for j in range(int(math.sqrt(n))): # O(sqrt(n))
            s += i * j # O(1)
    
    return s # O(1)

# 2
def frotz(n): # O(2n^2) => O(n^2)
    s = 0 # O(1)

    for i in range(n): # O(n)
        for j in range(2 * n): # O(2n)
            s += i * j # O(1)

    return s # O(1)

# 3
def bar(x): # O(x^2)
    sum = 0 # O(1)
    for i in range(0, 1463): # O(1)
        i += sum # O(1)
        for _ in range(0, x): # O(x)
            for _ in range(x, x + 15): # O(x)
                sum += 1 # O(1)

Shola Ayeni  11 minutes ago
def baz(n):
    s = 0

    for i in range(n): # O(n)
        for j in range(int(math.sqrt(n))): # 0(sqrt(n))
            s += i * j # O(1)
    return s # O(1)
    # O(n^(3/2) + 1)

# 2
def frotz(n):
    s = 0

    for i in range(n): # O(n)
        for j in range(2 * n): # O(2n)
            s += i * j # O(1)

    return s # O(1)
    # O(n^2 + 1)

# 3
def bar(x):
    sum = 0 # O(1)
    for i in range(0, 1463): # O(n)
        i += sum #O(1)
        for _ in range(0, x): # O(n)
            for _ in range(x, x + 15): # O(n)
                sum += 1 #O(1)
                #O(n^3)

Aaron Thompson  11 minutes ago
#Total: O(n sqrt(n))
def baz(n):
    s = 0

    for i in range(n): #O(n)
        for j in range(int(math.sqrt(n))): #O(sqrt(n))
            s += i * j #O(1)
    
    return s

# 2
#Total: O(n^2)
def frotz(n):
    s = 0

    for i in range(n): #O(n)
        for j in range(2 * n): #O(2n)
            s += i * j #O(1)

    return s

# 3
#Total: O(n)
def bar(x):
    sum = 0
    for i in range(0, 1463): #O(1)
        i += sum
        for _ in range(0, x): #O(n)
            for _ in range(x, x + 15): #O(1)
                sum += 1 #O(1)

Pascal Ulor:andela:  11 minutes ago
def baz(n):
    s = 0 #O(1)

    for i in range(n): #(n)
        for j in range(int(sqrt(n))): # n * sqrt(n) => O(sqrt(n)*n)
            s += i * j # O(1)
    
    return s #O(1)

    """
    3*O(1) + O(n) + O(sqrt(n)*n) => O(sqrt(n)*n)
    """

# 2
def frotz(n):
    s = 0 #O(1)

    for i in range(n): #O(n)
        for j in range(2 * n): # n * 2n => O(2n^2) => O(n^2)
            s += i * j #O(1)

    return s #O(1)

    """
    3*O(1) + O(n) + O(n^2) => O(n^2)
    """

# 3
def bar(x):
    sum = 0 #O(1)
    for i in range(0, 1463): O(n)
        i += sum # n * 1
        for _ in range(0, x): # n * n
            for _ in range(x, x + 15): # n * n * n
                sum += 1 # n * n * n => O(n^3)

Kelechi ogbonna  9 minutes ago
 def baz(n):
    s = 0  # c

    for i in range(n): # n
        for j in range(int(sqrt(n))): #sqrt(n)
            s += i * j # c
    
    return s # c
    # n * sqrt(n)

# 2
def frotz(n):
    s = 0 # c

    for i in range(n): # n
        for j in range(2 * n): n
            s += i * j #c

        return s # c
        # O(n^2)

# 3
def bar(x):
    sum = 0 # c
    for i in range(0, 1463): # c
        i += sum # c
        for j in range(0, x): # x
            for k in range(x, x + 15): # 2x
                sum += 1 # c
                
                # O(2x^2) => O(x^2)
                  

Matt Hardman:bat:  9 minutes ago
O(n)
:fire:
2


Matt Hardman:bat:  8 minutes ago
^third

Jakub Maleta  7 minutes ago
third updated:
# 3
def bar(x): # O(n)
    sum = 0 # O(1)
    for i in range(0, 1463): # O(1)
        i += sum # O(1)
        for _ in range(0, x): # O(n)
            for _ in range(x, x + 15): # O(1)
                sum += 1 # O(1)
```