"""
Python makes performing file I/O simple. Take a look
at how to read and write to files here: 

https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files
"""

# Open up the "foo.txt" file (which already exists) for reading
# Print all the contents of the file, then close the file

with open("foo.txt") as fp:
<<<<<<< HEAD
  for line in fp:
    print(line)


=======
    for line in fp:
        print(line)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# Open up a file called "bar.txt" (which doesn't exist yet) for
# writing. Write three lines of arbitrary content to that file,
<<<<<<< HEAD
# then close the file. Open up "bar.txt" and inspect it to make 
=======
# then close the file. Open up "bar.txt" and inspect it to make
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# sure that it contains what you expect it to contain

fp = open("bar.txt", "w")

<<<<<<< HEAD
fp.write("""Line 1
            Line 2
            Line 3""")


=======
fp.write(
    """Line 1
            Line 2
            Line 3"""
)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
