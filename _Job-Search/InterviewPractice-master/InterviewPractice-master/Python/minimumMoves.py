#
# Complete the 'countMoves' function below.
#
# The function is expected to return a LONG_INTEGER.
# The function accepts INTEGER_ARRAY numbers as parameter.
#

def countMoves(numbers):
    # Write your code here
    minimum = min(numbers)

    res = 0
    for n in numbers:
        res += n - minimum

    print(res)

def main():
    numbers = [5,6,8,8,5]
    countMoves(numbers)

main()
