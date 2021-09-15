# lets write the basics of a simple data driven machine (CPU simpulation)
# This itteration will just be able to print something
import sys

HALT = 1
PRINT_TOM = 2
# memory
memory = [
<<<<<<< HEAD
    PRINT_TOM, # [0000 0010]
    PRINT_TOM, # [0000 0010]
    PRINT_TOM, # [0000 0010]
    HALT,      # [0000 0001] 
    PRINT_TOM  # [0000 0010]
=======
    PRINT_TOM,  # [0000 0010]
    PRINT_TOM,  # [0000 0010]
    PRINT_TOM,  # [0000 0010]
    HALT,  # [0000 0001]
    PRINT_TOM,  # [0000 0010]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
]

# flags

# program counter
pc = 0
# state (running)
running = True

# REPL (FETCH, DECODE, EXECUTE)

while running:
    # FETCH
    command = memory[pc]
    # DECODE
    if command == PRINT_TOM:
        # EXECUTE
        print("Tom")
    # DECODE
    elif command == HALT:
        # EXECUTE
        running = False
    # DECODE (ERROR)
    else:
        # EXECUTE
        print(f"Unknown Instruction {command}")
        sys.exit(1)

    pc += 1
