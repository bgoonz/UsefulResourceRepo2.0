# lets think about a branch table!!
ADD = 23
SUB = 34
PRINT_SOME_STUFF = 50
SOME_THING = 34


def op_add(op1, op2):
    op1 += op2
    return 2

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def some_function_i_just_made(op1, op2):
    print("Doing something here...")
    return 1

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_sub(op1, op2):
    op1 -= op2
    return 2

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_print_some_stuff(op1, op2):
    print("Some Stuff...")
    return 1

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
bt = {
    ADD: op_add,
    SUB: op_sub,
    PRINT_SOME_STUFF: op_print_some_stuff,
<<<<<<< HEAD
    SOME_THING: some_function_i_just_made
=======
    SOME_THING: some_function_i_just_made,
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
}

"""
ADD
0
1
"""

memory = [0] * 128
pc = 0
running = True

while running:
    ir = memory[pc]
    op1 = memory[pc + 1]
    op2 = memory[pc + 2]

<<<<<<< HEAD
    if ir in bt: # is ADD in the branch table?
        pc += bt[ir](op1, op2) # bt[ADD](op1, op2) => op_add(op1, op2)
    else:
        print("not valid")
=======
    if ir in bt:  # is ADD in the branch table?
        pc += bt[ir](op1, op2)  # bt[ADD](op1, op2) => op_add(op1, op2)
    else:
        print("not valid")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
