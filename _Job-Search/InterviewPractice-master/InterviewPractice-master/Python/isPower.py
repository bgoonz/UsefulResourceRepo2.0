def isPower(a, b):

    if b%a == 0:
        return True
    else:
        return False


def main():

    a = int(input("Enter a number to check: "))
    b = int(input("Enter a number to compare: "))

    print(isPower(a, b))


main()