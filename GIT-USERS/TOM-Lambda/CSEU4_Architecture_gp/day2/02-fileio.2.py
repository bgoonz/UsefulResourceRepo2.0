# argv and argc take in command line args
import sys
<<<<<<< HEAD
if len(sys.argv) != 2:
    print("usage: 02-fileio.2.py <filename>")
    sys.exit(1)
try:  
=======

if len(sys.argv) != 2:
    print("usage: 02-fileio.2.py <filename>")
    sys.exit(1)
try:
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    with open(sys.argv[1]) as f:
        for line in f:
            print(line)
except FileNotFoundError:
    print("file not found!!!")
<<<<<<< HEAD
    sys.exit(2)
=======
    sys.exit(2)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
