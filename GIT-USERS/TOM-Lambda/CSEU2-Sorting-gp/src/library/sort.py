from book import Book
from time import time
import random
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
l = [random.randint(0, 1000) for i in range(0, 100)]

input_sizes = [i * 100 for i in range(1, 50)]

times = []


<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def insertion_sort(books):
    # loop through len - 1 elements
    for i in range(1, len(books)):
        temp = books[i]
        j = i
        while j > 0 and temp < books[j - 1]:
            # shift left until correct genre is found
            books[j] = books[j - 1]
            j -= 1
        books[j] = temp
    return books

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
b1 = Book("f", "f", "f")
b2 = Book("e", "e", "e")
b3 = Book("d", "d", "d")
b4 = Book("c", "c", "c")
b5 = Book("b", "b", "b")
b6 = Book("a", "a", "a")
books = [b1, b2, b3, b5, b4, b6]
print(books)

for input_size in input_sizes:
    print(f"Running: {input_size}")
    l = [random.randint(0, 1000) for i in range(0, input_size)]
    # Store start time
    start_time = time()
    # Run some code
    sorted_books = insertion_sort(l)
    # Store end time
    end_time = time()
    # print out end time - start time
    times.append(end_time - start_time)

print("LENGTHS")
for elem in input_sizes:
    print(elem)

print("TIMES")
for t in times:
<<<<<<< HEAD
    print(t)
=======
    print(t)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
