# lets parse some numbers
# argv and argc take in command line args
# in this file we will read in a file and print the lines
import sys

if len(sys.argv) != 2:
    print("usage: 02_fileio2.py filename")

try:
    # print(sys.argv[1])
    with open("somefile.abc") as f:
        for line in f:
            comment_split = line.split("#")
            n = comment_split[0].strip()

<<<<<<< HEAD
            if n == '':
=======
            if n == "":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                continue

            x = int(n, 2)
            print(f"{x:08b}: {x:d}")

except:
<<<<<<< HEAD
    print("can not find it!")
=======
    print("can not find it!")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
