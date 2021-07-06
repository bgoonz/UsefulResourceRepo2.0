import sys
import os

# Complete the function below.

arr = []

def inputer():
    length = (int(input("Number of elements: ")))

    i = 0
    while i < length:
        arr.append(int(input("Enter number: ")))
        i += 1


def findNumber(arr, k):
    hold = []
    for i in arr:
        if i == k:
            hold.append(i)
        else:
            pass

    if len(hold) >= 1:
        print(len(hold))
        print("Yes")
    else:
        print(len(hold))
        print("No")

inputer()
k = int(input("Enter number to search for: "))
findNumber(arr, k)