# in this file we will read in a file and print the lines
import sys

if len(sys.argv) != 2:
    print("usage: 01_fileio1.py <filename>")
    sys.exit(1)

l = []
try:
    with open(sys.argv[1]) as f:
        for line in f:
            l.append(line)
    print(l)

except FileNotFoundError:
    print(f"{sys.argv[0]}: {sys.argv[1]} not found!")
<<<<<<< HEAD
    sys.exit(2)
=======
    sys.exit(2)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
