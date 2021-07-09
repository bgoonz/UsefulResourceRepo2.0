# Complete the pressAForCapsLock function below.
def pressAForCapsLock(message):

    letters = []

    found = False

    for i in message:
        if i is "a" or i is "A":
            found = not found
            continue

        if found is True:
            letters.append(i.upper())
        else:
            letters.append(i)

    result = "".join(letters)

    return result

def main():
    message = input("Enter a word or phrase: ")
    pressAForCapsLock(message)

if __name__ == '__main__':
    main()