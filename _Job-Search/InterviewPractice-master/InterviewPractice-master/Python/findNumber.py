def findNumber(arr, k):
    if k in arr:
        return True
    else:
        return False

def main():
    arr = [5, 1, 2, 3, 4, 5, 1]
    k = int(input("Enter a number: "))
    print(findNumber(arr, k))

main()
