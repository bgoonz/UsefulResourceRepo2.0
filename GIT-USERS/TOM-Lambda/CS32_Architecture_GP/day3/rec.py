# lets think recursive function
def rec_func(n):
    if n == 0:
        return
    print(n)
    rec_func(n - 1)
    rec_func(n - 2)
    rec_func(n - 3)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
rec_func(200)
