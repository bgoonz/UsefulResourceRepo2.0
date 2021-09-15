# remember to import our queue and stack from util.py
from util import Queue

# read in the words.txt file (think about file io)
<<<<<<< HEAD
f = open('words.txt', 'r')
words = f.read().split('\n')
=======
f = open("words.txt", "r")
words = f.read().split("\n")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
f.close()

# remember to plan it out before you code

# think about decomposing the solution in to a helper function as it would help breakdown the problem set *HINT*

# make a set to hold the words
word_set = set()
# set all words to lower case
for word in words:
    word_set.add(word.lower())

# hold a list of lower case letters
<<<<<<< HEAD
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
=======
letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# helper function get neighbors
def get_neighbors(word):
    # create an empty list to hold neighbors
    neighbors = []
    # turn our word in to a letter list
    string_word = list(word)
    # loop over each index of the string word
    for i in range(len(string_word)):
        # for each letter...
        # swap letter with each letter in alphabet (for loop)
        for letter in letters:
            # make a temp word to work on
            temp_word = list(string_word)
            # set temp word at index to letter
            temp_word[i] = letter
            # join the temp word together to make a new word
            new_word = "".join(temp_word)
            # check if new word is not starting word
            # and new word is in word set
            if new_word != word and new_word in word_set:
                # append new word to the neighbors list
                neighbors.append(new_word)
    # return neighbors list
    return neighbors

<<<<<<< HEAD
# traversal bfs path
def find_ladders(begin_word, end_word):
            # create a queue
        q = Queue()
        # enqueue a list holding the starting vertex id
        q.enqueue([begin_word])
        # created an empty visited set
        visited = set()
        
        # while the queue is not empty
        while q.size() > 0:
            # dequeue to the path
            path = q.dequeue()
            
            # set a vert to the last item in the path
            vert = path[-1]
           
            # if vert is not in visited
            if vert not in visited:
                # if vert is equal to target value
                if vert == end_word:
                    # return path
                    return path
                # add vert to visited set
                visited.add(vert)
                # loop over next vert in vertices at the index of vert
                for next_vert in get_neighbors(vert):
                    # set a new path equal to a new list of the path (copy)
                    new_path = list(path)
                    # append next vert to new path
                    new_path.append(next_vert)
                    # enqueue the new path
                    q.enqueue(new_path)
        # return None
        return None

if __name__ == '__main__':
    print(find_ladders("hit", "cog"))
    print(find_ladders("sail", "boat"))
    print(find_ladders("hungry", "happy"))
=======

# traversal bfs path
def find_ladders(begin_word, end_word):
    # create a queue
    q = Queue()
    # enqueue a list holding the starting vertex id
    q.enqueue([begin_word])
    # created an empty visited set
    visited = set()

    # while the queue is not empty
    while q.size() > 0:
        # dequeue to the path
        path = q.dequeue()

        # set a vert to the last item in the path
        vert = path[-1]

        # if vert is not in visited
        if vert not in visited:
            # if vert is equal to target value
            if vert == end_word:
                # return path
                return path
            # add vert to visited set
            visited.add(vert)
            # loop over next vert in vertices at the index of vert
            for next_vert in get_neighbors(vert):
                # set a new path equal to a new list of the path (copy)
                new_path = list(path)
                # append next vert to new path
                new_path.append(next_vert)
                # enqueue the new path
                q.enqueue(new_path)
    # return None
    return None


if __name__ == "__main__":
    print(find_ladders("hit", "cog"))
    print(find_ladders("sail", "boat"))
    print(find_ladders("hungry", "happy"))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
