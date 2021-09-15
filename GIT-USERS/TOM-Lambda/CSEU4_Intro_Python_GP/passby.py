# pass by value
<<<<<<< HEAD
n = 7 # @4567 => 7

def mult(n):
    n = 12 # @7956
    return n * 2 # @7956
=======
n = 7  # @4567 => 7


def mult(n):
    n = 12  # @7956
    return n * 2  # @7956

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

print(n)
print(mult(n))
print(n)

## by ref
## list is mutable
<<<<<<< HEAD
l = [1, 2, 3, 4] # @9923 => @9923
# t = (1, 2, 3, 4) # @9960 => @9960

def mult_lst(l):
    for i in range(len(l)):
        l[i] += 2 # @9923 + (1 * size of data type) => @9927 = 2 * 2
=======
l = [1, 2, 3, 4]  # @9923 => @9923
# t = (1, 2, 3, 4) # @9960 => @9960


def mult_lst(l):
    for i in range(len(l)):
        l[i] += 2  # @9923 + (1 * size of data type) => @9927 = 2 * 2

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

print(l)
print(mult_lst(l))
print(l)

# print(t)
# print(mult_lst(t))
# print(t)
<<<<<<< HEAD




=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
