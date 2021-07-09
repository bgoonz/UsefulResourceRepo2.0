

def findNthElement(list, n):
    answer = list[n::]
    return answer


def main():

    MyList = [2, 1, 3, 5, 3, 2, 5, 6, 3, 2, 7, 5, 5, 5, 5, 5, 7, 8, 4]

    n = int(input("Enter a value for n: "))

    print(findNthElement(MyList, n))

main()