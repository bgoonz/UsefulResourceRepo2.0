# argv and argc take in command line args
import sys

if len(sys.argv) != 2:
    print("usage: 02_fileio2.py filename")

try:
    # print(sys.argv[1])
    with open("somefile.abc") as f:
        for line in f:
            print(line)

except:
<<<<<<< HEAD
    print("can not find it!")
=======
    print("can not find it!")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
