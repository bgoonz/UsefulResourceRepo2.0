# Given a text file words.txt, print out the largest set of anagrams

"""
1. Understand:
    What is an anagram?
    - anagram: a word, phrase, or name formed by rearanging the letters 
    of an other, such as spar, formed from rasp

2. > we need to generate all anagram sets
    - should have the same number of each letter
    - ANAGRAMS should be equal to the original word when both are sorted
    - How do we want to handle case? (ignore case)
   > once all sets are generated, we need to find the largest set
    - utilize some sort of MAX function

3. Implement
"""
<<<<<<< HEAD
wordz = ['dave', 'steve', 'apple', 'bob', 'joe', 'azzzzzzz']
=======
wordz = ["dave", "steve", "apple", "bob", "joe", "azzzzzzz"]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

import random
import operator

<<<<<<< HEAD
def first_pass_anagrams(words): 
=======

def first_pass_anagrams(words):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    import random
    import operator

    # generate random values for each char a-z
    chars = [0] * 26
    for i in range(26):
<<<<<<< HEAD
        chars[i] = random.randint(0,1000000)
    
=======
        chars[i] = random.randint(0, 1000000)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # create new dictionary
    anagrams = {}
    signature = 0

    # use random char values to calculate a "value" of each word
    for word in words:
        word = word.lower()
        for char in word:
<<<<<<< HEAD
            index = ord(char)-97
=======
            index = ord(char) - 97
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            if index >= 0 and index < 26:
                signature += chars[index]
        # groups words with same value
        if signature not in anagrams:
            anagrams[signature] = []
        anagrams[signature].append(word)
        signature = 0

    # get max entry in dictionary
    maxAnagrams = max(anagrams.items(), key=operator.itemgetter(1))[0]
    return maxAnagrams

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# def anagrams(words):
#     # generate random values for each character a-z
#     # set a list of char values initialized to zero (26 list slots)
#     chars = [0] * 26
#     # iterate over the len of the char list
#     for i in range(26):
#         # set the chars at index to a random number
#         chars[i] = random.randint(0, 1000000)

#     # create a new dictionary and a signature
#     # create an empty dictionary
#     anagrams = {}
#     # create a integer signature and set it to zero
#     signature = 0

#     # use random char values to calculate a value for each word
#     # iterate over each word in the words list
#     for word in words:
#         # set each word to lower case
#         word = word.lower()

#         # iterate over each character in the word
#         for char in word:
#             # find the ordinal value of the char and decrement it by 97
#             # and set it to the label of index
#             index = ord(char) - 97

#             # check if the index is greater than or equal to zero and less than 26
#             if index >= 0 and index < 26:
#                 # add the value of the char at index to the signature
#                 signature += chars[index]

<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#             # group words with the same value
#             # check if the signature is not in anagrams:
#             if signature not in anagrams:
#                 # set anagrams at index of signature to a new list
#                 anagrams[signature] = []

#             # append the word to the anagrams at signature
#             anagrams[signature].append(word)
#             # reset the signature to zero
#             signature = 0
#     # get max entry in the dictionary
#     # set max anagrams to the max of the anagram item at the zeroth index

#     max_anagrams = max(anagrams.items(), key=operator.itemgetter(1))[1]

<<<<<<< HEAD
    
#     return max_anagrams

=======

#     return max_anagrams


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def second_anagrams(words):
    # create a dictionary
    anagrams = {}

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # generate all sets of anagrams
    # iterate over word in words
    for word in words:
        # convert list to a string
        # and set that to the signature
        signature = "".join(sorted(word.lower()))
<<<<<<< HEAD
        #check if the signature is not in anagrams
=======
        # check if the signature is not in anagrams
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        if signature not in anagrams:
            # create an empty list to hold anagrams at the signature
            anagrams[signature] = []

        # append the word to the anagrams at signature
        anagrams[signature].append(word)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # find the largest set of anagrams
    # set a max length to zero
    max_length = 0
    # create an empty list to hold the max anagrams
    max_anagrams = []
    # iterate over each signature in anagrams
    for signature in anagrams:
        # check if the length of the anagrams at signature are greater than max lenght
        if len(anagrams[signature]) > max_length:
            # set the max length to the length of the anagrams at the signature
            max_length = len(anagrams[signature])
            # set max anagrams to the anagrams at the signature
            max_anagrams = anagrams[signature]
<<<<<<< HEAD
    
    # return maxAnagrams
    return max_anagrams
 
=======

    # return maxAnagrams
    return max_anagrams


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# allWords = []
# with open('./words.txt') as wordsFile:
#   allWords = wordsFile.read().split(',')

# read in the words from a file
<<<<<<< HEAD
f = open('words.txt', 'r')
words = f.read().split('\n')
=======
f = open("words.txt", "r")
words = f.read().split("\n")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
f.close()

# test the algorithms
import time
<<<<<<< HEAD
start = time.time()
print(first_pass_anagrams(words))
end = time. time()
print(f'1st pass solution time: {end - start} seconds\n')

start = time.time()
print(second_anagrams(words))
end = time. time()
print(f'2st pass solution time: {end - start} seconds\n')
=======

start = time.time()
print(first_pass_anagrams(words))
end = time.time()
print(f"1st pass solution time: {end - start} seconds\n")

start = time.time()
print(second_anagrams(words))
end = time.time()
print(f"2st pass solution time: {end - start} seconds\n")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
