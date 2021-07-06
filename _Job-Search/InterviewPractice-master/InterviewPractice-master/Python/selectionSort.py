def selctionSort(list):
    for i in range(len(list)):
        minVal = min(list[i:])
        minIndex = list[i:].index(minVal)

        list[i+minIndex] = list[i]
        list[i] = minVal
    print(list)

def main():
    myList = [4, 2, 1, 10, 5, 3, 100, 69]
    nullList = []
    singleList = [3]
    selctionSort(myList)

main()