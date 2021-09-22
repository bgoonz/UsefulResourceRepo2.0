class matrix:
    """
    A Class variable for basic mtrix operations. Currently limited to 3x3 matrices"""

    def __init__(self, listform=[[1, 0, 0], [0, 1, 0], [0, 0, 1]]):
        self.data = listform

    def __add__(self, other):
        result = matrix()
        result.data = [
            [
                self.data[row][col] + other.data[row][col]
                for row in range(len(self.data))
            ]
            for col in range(len(self.data[0]))
        ]
        return result

    def __mul__(self, other):
        result = matrix()
        selfCopy = self.data.copy()
        otherCopy = other.data.copy()

        for row in range(len(self.data)):
            for col in range(len(self.data[0])):
                Sum = 0
                for ind in range(len(self.data[0])):
                    Sum += selfCopy[row][ind] * otherCopy[ind][col]
                result.data[row][col] = Sum
        return result

    def show(self):
        for col in self.data:
            print("|", col, "|")


def menu():
    print("Matrix Manipulation")
    print("---------------------")
    print("1. Create First Matrix")
    print("2. Create Second Matrix")
    print("3. Multiply Matrices")
    print("4. Add Matrices")
    print("5. Show All Three Matrices")
    print("6. Quit")
    cont = True
    while cont:
        # This loop will continue until 6 is inputted

        choice = input("::>")
        choice = int(choice)

        if choice == 1:
            # asks for the input to the matrix. Unfortunately, input() returns a string so we
            # have to do some work to get it into a list of lists
            thing = input("Matrix Val? (in form [[a,b,c],[d,e,f],[g,h,j]])     ")
            print("Creating First Matrix...")

            if len(thing) == 0:
                # If the user just pressed enter, the default identity matrix will be created
                first = matrix()
                first.show()
            else:
                # if the user inputted something above, that value will be used to initialize the matrix
                # pulls the integers out of the input string
                thing = thing.replace("]", "")
                thing = thing.replace("[", "")
                thing = thing.split(",")
                # combines them into a list
                setVal1 = [[int(thing[3 * i + x]) for x in range(3)] for i in range(3)]

                first = matrix(listform=setVal1)
                first.show()

        elif choice == 2:
            # Same logic as 1
            thing = input("Matrix Val2?  (in form [[a,b,c],[d,e,f],[g,h,j]])    ")
            print("Creating Second Matrix...")

            if len(thing) == 0:
                second = matrix()
                second.show()
            else:
                thing = thing.replace("]", "")
                thing = thing.replace("[", "")
                thing = thing.split(",")
                # combines them into a list
                SetVal2 = [[int(thing[3 * i + x]) for x in range(3)] for i in range(3)]

                second = matrix(listform=SetVal2)
                second.show()

        elif choice == 3:
            print("Multiplying Matrices...")
            third = first * second
            third.show()

        elif choice == 4:
            print("Adding Matrices...")
            third = first + second
            third.show()

        elif choice == 5:
            print("Showing Matrices")
            print("First")
            first.show()
            print()

            print("Second")
            second.show()
            print()

            print("Third")
            third.show()
            print()

        elif choice == 6:
            print("Exiting")
            cont = False

        else:
            print("Invalid choice. Choose a number 1-6")


if __name__ == "__main__":
    menu()
