def fib(n):
    if n <= 1:
        return n

    return fib(n-1) + fib(n-2)


fib(30) => fib(29) + fib(28)

fib(28) + fib(27)




fib(30) => fib(29) + fib(28)






cache = {}

def fibm(n):
    if n <= 1:
        return n
    
    if n not in cache:
        cache[n] = fib(n-1) + fib(n-2)


    return cache[n]

    

# long operation (O(n))
for i in range(37):
    print(f'{i:3}: {fibm(i)}')


# quick operation (O(1))
for i in range(37):
    print(f'{i:3}: {fibm(i)}')

# quick operation (O(1))
for i in range(37):
    print(f'{i:3}: {fibm(i)}')

# for i in range(37):
#     print(f'{i:3}: {fib(i)}')




