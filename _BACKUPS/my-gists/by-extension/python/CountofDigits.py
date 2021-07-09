number = int(input())


counter =0
while number > 0:
    number = number//10
    print(number)
    counter +=1
print("number of digits :",counter)