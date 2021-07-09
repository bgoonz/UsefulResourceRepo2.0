import sys


n = int(input().strip())
arr = [int(arr_temp) for arr_temp in input().strip().split(' ')]
reverse = []

while n != 0:
    reverse.append(arr[n-1])
    n -= 1

for i in reverse:
    print(i, end=" ")

