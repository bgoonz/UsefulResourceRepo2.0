# lets parse some numbers
# argv and argc take in command line args
import sys

if len(sys.argv) != 2:
    print("usage: 03-fileio02.py filename")
    sys.exit(1)
try:
    with open(sys.argv[1]) as f:
        for line in f:
            # split line before and after comment symbol
            comment_split = line.split("#")

            # extract our number
<<<<<<< HEAD
            num = comment_split[0].strip() # trim whitespace

            if num == '':
                continue # ignore blank lines
=======
            num = comment_split[0].strip()  # trim whitespace

            if num == "":
                continue  # ignore blank lines
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

            # convert our binary string to a number
            x = int(num, 2)

            # print the x in bin and dec
            print(f"{x:08b}: {x:d}")

except FileNotFoundError:
    print(f"{sys.argv[0]}: {sys.argv[1]} not found")
<<<<<<< HEAD
    sys.exit(2)
=======
    sys.exit(2)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
