# lets parse some numbers
# argv and argc take in command line args
import sys

import sys
<<<<<<< HEAD
if len(sys.argv) != 2:
    print("usage: 02-fileio.2.py <filename>")
    sys.exit(1)
try:  
    with open(sys.argv[1]) as f:
        for line in f:
            # split the comment out
            comment_split = line.split('#')

            num = comment_split[0].strip()

            if num == '':
=======

if len(sys.argv) != 2:
    print("usage: 02-fileio.2.py <filename>")
    sys.exit(1)
try:
    with open(sys.argv[1]) as f:
        for line in f:
            # split the comment out
            comment_split = line.split("#")

            num = comment_split[0].strip()

            if num == "":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                continue

            i_num = int(num, 2)

            print(f"{i_num:08b}: {i_num:d}")
except FileNotFoundError:
    print("file not found!!!")
<<<<<<< HEAD
    sys.exit(2)
=======
    sys.exit(2)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
