# Complete the function below.
import sys

def function( x):
    return (x*x)

if __name__ == "__main__":
    try:
        x = int(input().strip())
        result = function(x)
        print(result)
    except EOFError:
        pass
