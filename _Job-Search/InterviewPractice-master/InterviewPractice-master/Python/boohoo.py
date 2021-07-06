def boohoo(n):

    i = 1
    while i <= n:

        if i % 3 == 0 and i % 5 == 0:
            print("BooHoo")


        elif i % 3 == 0:
            print("Boo")

        elif i % 5 == 0:
            print("Hoo")

        else:
            print(i)

        i += 1


def main():
    n = int(input())
    boohoo(n)


main()