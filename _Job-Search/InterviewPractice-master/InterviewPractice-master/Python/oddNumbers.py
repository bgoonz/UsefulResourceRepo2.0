# Print all odd numbers in between l and r

# Complete the function below.

import sys
import os

l = (int(input("Enter l value: ")))
r = (int(input("Enter r value: ")))
oddList = []

def  oddNumbers(l, r):
    count = l
    if l < r:
        while count != r:
            count += 1
            if count % 2 != 0:
                oddList.append(count)
        else:
            pass
    else:
        print("l value is not less than r value, please try again. ")
        exit()

    for i in oddList:
        print(i)

    print("There are", len(oddList), "odd numbers between", l, "and", r)

oddNumbers(l, r)