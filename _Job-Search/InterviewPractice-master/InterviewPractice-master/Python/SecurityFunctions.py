#!/bin/python3

import sys

def calculate(x):
    # Complete this function
    return (x%11)

if __name__ == "__main__":
    x = int(input().strip())
    result = calculate(x)
    print(result)
