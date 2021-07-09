def count(MyList, element):

    occurences = 0
    for i in MyList:
        if i == element:
            occurences += 1

    print(occurences)



def main():

    MyList = [2, 1, 3, 5, 3, 2, 5, 6, 7, 3, 2, 7, 5, 5, 5, 5, 5, 7, 8, 4]

    element = int(input("Enter an element to search for: "))

    count(MyList, element)


main()