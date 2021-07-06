numStudents = int(input("Enter the number of students: "))

i = 0

while i < numStudents:
    name = input("Enter a student name: ")

    test1 = int(input("Score for test 1: "))
    test2 = int(input("Score for test 2: "))
    test3 = int(input("Score for test 3: "))

    average = (test1+test2+test3)/3

    x={}

    x[name] = average

    i += 1


getName = input("Enter a name to get average: ")
print(x[getName])