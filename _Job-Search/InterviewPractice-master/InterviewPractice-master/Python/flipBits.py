# Enter your code here. Read input from STDIN. Print output to STDOUT
def maxOnes(arr):

    one = 0
    net = 0
    max = 0
    for bit in arr:
        if bit:
            one += 1
            net -= 1
        else:
            net += 1
        max = max(max, net)
        if net < 0:
            net = 0
    return(one + max)

arr = []
n =int(input())
count = 0
while count < n:
    a = int(input())
    arr.append(a)
    count += 1

print(maxOnes(arr))
