# Experiment with scopes in Python.
# Good reading: https://www.programiz.com/python-programming/global-local-nonlocal-variables

# When you use a variable in a function, it's local in scope to the function.
x = 12

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def changeX():
    # tell Python to use x in the global scope
    global x
    x = 99

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
changeX()

# This prints 12. What do we have to modify in changeX() to get it to print 99?
print(x)


# This nested function has a similar problem.

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def outer():
    y = 120

    def inner():
        # tell Python to use y from the containing scope
        nonlocal y
        y = 999

    inner()

    # This prints 120. What do we have to change in inner() to get it to print
    # 999? Google "python nested function scope".
    print(y)

<<<<<<< HEAD
outer()
=======

outer()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
