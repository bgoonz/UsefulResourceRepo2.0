
def sort(list):
    for i in range(len(list)):
        for j in range(i, len(list)):
            if (list[i] > list[j]):
                list[i], list[j] = list[j], list[i]
    print(list)

def main():
    myList = [4,2,1,10,5,3,100, 69]
    sort(myList)

main()