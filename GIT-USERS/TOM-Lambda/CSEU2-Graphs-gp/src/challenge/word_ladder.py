from util import Queue, Stack

# reading in the file of words
<<<<<<< HEAD
f = open('words.txt', 'r')
=======
f = open("words.txt", "r")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
words = f.read().split("\n")
f.close()

# create a set of the words from the file

word_set = set()
for word in words:
<<<<<<< HEAD
      word_set.add(word.lower())

letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
=======
    word_set.add(word.lower())

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

# Utility function (Helper Function)
"""
    This could be part of your find word ladder function
    but I would decompose the problem in to smaller steps
    using a helper function to get the neighbors 
    and to work on the letters
"""
<<<<<<< HEAD
=======


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def get_neighbors(word):
    # make an empty list for neighbors
    neighbors = []
    # create a list of chars from the word
    string_word = list(word)
    # loop over the index of the string word
    for i in range(len(string_word)):
        # loop over each letter in the alphabet
        for letter in letters:
            # make a temporary word to work on
            temp_word = list(string_word)
            # set temporary word at the index to the letter
            temp_word[i] = letter
            # join the temporary word together
            new_word = "".join(temp_word)
<<<<<<< HEAD
            # check if the new word is not the initial word 
=======
            # check if the new word is not the initial word
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # and the new word is in the word set
            if new_word != word and new_word in word_set:
                # append the new word to the neighbors list
                neighbors.append(new_word)
    # return the neighbors list
    return neighbors

<<<<<<< HEAD
# implement the function 
=======

# implement the function
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# along with any helper functions you need
def find_word_ladder(beginWord, endWord):
    # create a queue
    q = Queue()
    # enqueue a list holding the starting vertex id
    q.enqueue([beginWord])
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
            # add vert to visited set
            visited.add(vert)
            # if vert is equal to endWord
            if vert == endWord:
                # return path
                return path
            # loop over next vert in vertices at the index of vert
            for next_vert in get_neighbors(vert):
                # set a new path equal to a new list of the path (copy)
                new_path = list(path)
                # append next vert to new path
                new_path.append(next_vert)
                # enqueue the new path
                q.enqueue(new_path)


<<<<<<< HEAD

if __name__ == '__main__':
    print(find_word_ladder("sail", "boat"))
    # expected output ['sail', 'bail', 'boil', 'boll', 'bolt', 'boat']
=======
if __name__ == "__main__":
    print(find_word_ladder("sail", "boat"))
    # expected output ['sail', 'bail', 'boil', 'boll', 'bolt', 'boat']
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
