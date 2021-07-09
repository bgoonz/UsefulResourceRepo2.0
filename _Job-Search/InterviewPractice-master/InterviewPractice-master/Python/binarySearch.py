"""
Author: Ahad Sheriff
Binary search works like such:
There will be an ordered list of numbers stored in a text file.
The program will read the text file and perform a binary search.
"""

text = []

def readFile(filename):

    for line in open(filename):
        numbers = int(line)
        text.append(numbers)

    return text

"""
Get the middle value of list.
If target is > middle value, get middle value from middle value to end of list
If target is < middle value, get middle value from beggining of list to middle value
If the middle value happens to be the number you are searching for stop program
and return index of that value.
"""

def bin_search(data, target, start, end):

    if start > end:
        return None

    print("searching...")

    mid_index = (start + end)//2

    mid_value = data[mid_index]

    if mid_value == target:
        return mid_index
    elif target > mid_value:
        return bin_search(data, target, mid_index + 1, end)
    else:
        return bin_search(data, target, start, mid_index-1)


def getSearch(target, list):
    bin_search(target, list, 0, len(text) - 1)

def main():
    file = input("Enter file name: ")
    print(readFile(file))

    target = int(input("Enter a value of which index you're trying to find: "))

    print(getSearch(target, readFile(file)))

main()