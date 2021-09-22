# Stack grows downward.
#
# 700: 0
#
# 699: 2  (a)   main's stack frame
# 698: 14 (b)
<<<<<<< HEAD
# 
=======
#
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# 697: 2  (x)   mult2's stack frame
# 696: 7  (y)
# 695: 14 (z)  <-- SP

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def mult2(x, y):
    z = x * y
    return z

<<<<<<< HEAD
def main():
    a = 2
    
    b = mult2(a, 7)

    print(b) # 14
=======

def main():
    a = 2

    b = mult2(a, 7)

    print(b)  # 14
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
