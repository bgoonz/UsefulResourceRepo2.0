"""
# Translate

- "Shortest" makes me think BFS
- "Transformation Sequence" makes me think BFS Path
- "Word" a graph vertex / node
- "One Letter Change" Edge

# Build
- Vertex List -> word list
- thinking about how to get all edges (???)

"""
<<<<<<< HEAD
class Queue():
    def __init__(self):
        self.queue = []
    def enqueue(self, value):
        self.queue.append(value)
=======


class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, value):
        self.queue.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def dequeue(self):
        if self.size() > 0:
            return self.queue.pop(0)
        else:
            return None
<<<<<<< HEAD
    def size(self):
        return len(self.queue)

f = open('words.txt', 'r')
=======

    def size(self):
        return len(self.queue)


f = open("words.txt", "r")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
words = f.read().split("\n")
f.close()

word_set = set()
for word in words:
<<<<<<< HEAD
      word_set.add(word.lower())
=======
    word_set.add(word.lower())

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

def get_neighbors(word):
    neighbors = []
    string_word = list(word)
    for i in range(len(string_word)):
<<<<<<< HEAD
        for letter in ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']:
=======
        for letter in [
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
        ]:
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            temp_word = list(string_word)
            temp_word[i] = letter
            w = "".join(temp_word)
            if w != word and w in word_set:
                neighbors.append(w)
    return neighbors


def find_word_ladder(begin_word, end_word):
    visited = set()
    q = Queue()
<<<<<<< HEAD
    q.enqueue( [begin_word] )
=======
    q.enqueue([begin_word])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    while q.size() > 0:
        path = q.dequeue()
        v = path[-1]
        if v not in visited:
            visited.add(v)
            if v == end_word:
                return path
            for neighbor in get_neighbors(v):
                path_copy = list(path)
                path_copy.append(neighbor)
                q.enqueue(path_copy)


<<<<<<< HEAD
print(find_word_ladder("sail", "boat"))
=======
print(find_word_ladder("sail", "boat"))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
