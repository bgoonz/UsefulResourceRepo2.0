def staircase(n):
    i = n - 2
    for stairs in range(1, n):
        print(' ' * i, '#' * stairs)
        i -=1
    print('#' * n)


def main():
    n = int(input())
    staircase(n)

main()