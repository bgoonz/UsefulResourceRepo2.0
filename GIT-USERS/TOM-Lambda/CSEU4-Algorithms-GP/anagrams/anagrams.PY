# Given a text file words.txt, print out the largest set of anagrams

"""
1. Understand:
    What is the structure of the given words.txt?
    - one word per line

    What is an anagram?
    - anagram: a word or phrase created by rearranging the letters of an other.
    - for instance spar formed from rasp

2 plan:
    we need to generate all anagram sets?
    - should have the same number of each letter
    - ANAGRAMS when sorted should be equal
    - how should we deal with CASE? (ignore case)
    once all sets are generated. we need to find the largest set?
    - utilize some sort of max function

3. Implement

"""
import random
import operator

# read in the words from a file
f = open('words.txt', 'r')
words = f.read().split('\n')
f.close()

"""

assign a random numerical value to each word based on the chars it contains, 
group the words based on their value, 
and print out the largest set

"""
def first_pass_anagrams(words): 
    # generate random values for each char [a - z]
    chars = [0] * 26
    for i in range(26):
        chars[i] = random.randint(0, 1000000)

    # create a dictionary of anagrams
    anagrams = {}
    signature = 0

    # use random char values to calculate a value for each word
    for word in words:
        word = word.lower()

        for char in word:
            index = ord(char) - 97

            if index >= 0 and index < 26:
                signature += chars[index]

            if signature not in anagrams:
                anagrams[signature] = []

            anagrams[signature].append(word)

            # reset the signature
            signature = 0

    # get the max entry in the dictionary
    maxAnagrams = max(anagrams.items(), key = operator.itemgetter(1))[0]

    return maxAnagrams

def second_anagrams(words):
    # create a new dict of anagrams
    anagrams = {}
    # set a var for longest anagram
    longest = None

    # create all sets of anagrams
    #iterate over words
    for word in words:
        # convert list to str and lower case it
        signature = "".join(sorted(word.lower()))

        # check if sig not in anagrams
        if signature not in anagrams:
            # create list
            anagrams[signature] = []

        # append word to anagrams at sig
        anagrams[signature].append(word)

        # update the largest set as we create them
        if longest == None or len(anagrams[signature]) > len(anagrams[longest]):
            longest = signature

    # print the longest set
    return anagrams[longest]

def anagrams(words):
    # create a new dict of anagrams
    anagrams = {}

    # create all sets of anagrams
    #iterate over words
    for word in words:
        # convert list to str and lower case it
        signature = "".join(sorted(word.lower()))

        # check if sig not in anagrams
        if signature not in anagrams:
            # create list
            anagrams[signature] = []

        # append word to anagrams at sig
        anagrams[signature].append(word)

        # find longest set
        maxLen = 0
        maxAnagrams = []

    # max function
    for signature in anagrams:
        if len(anagrams[signature]) > maxLen:
            maxLen = len(anagrams[signature])
            maxAnagrams = anagrams[signature]

    # print the longest set
    return maxAnagrams

# test the algorithms
import time
start = time.time()
print(first_pass_anagrams(words))
end = time.time()
print(f'1st pass solution time: {end - start} seconds\n')

start = time.time()
print(second_anagrams(words))
end = time.time()
print(f'2st pass solution time: {end - start} seconds\n')

start = time.time()
print(anagrams(words))
end = time.time()
print(f'3rd pass solution time: {end - start} seconds\n')

# text file
# angor
# argon
# goran
# grano
# groan
# nagor
# Orang
# orang
# organ
# rogan
# Ronga

# l = ['angor', 'argon', 'goran', 'grano', 'groan', 'nagor', 'Orang', 'orang', 'organ', 'rogan', 'Ronga']

# for w in l:
#     sw = sorted(w).lower()
#     print(sw)

