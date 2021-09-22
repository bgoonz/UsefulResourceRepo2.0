# Put the en library in the same folder as your script so NodeBox can find
# the library. It takes some time to load all the data the first time.
try:
    # This is the statement you normally use.
    en = ximport("en")
except:
    # But since these examples are "inside" the library
    # we may need to try something different when
    # the library is not located in /Application Support
    en = ximport("__init__")

# LEXICAL CATEGORIZATION ############################################################

# Returns True when the given value is a number.
print((1, nodebox_linguistics_extended.is_number(12)))
print((2, nodebox_linguistics_extended.is_number("twelve")))

# Returns True when the given string is a noun.
# You can also check for is_verb(), is_adjective() and is_adverb().
print((3, nodebox_linguistics_extended.is_noun("banana")))

# Returns True when the given string is a tag,
# for example HTML or XML.
print((4, nodebox_linguistics_extended.is_tag("</a>")))

# Return True when the string is a HTML tag,
# for example <a> or <body>.
print((5, nodebox_linguistics_extended.is_html_tag("</person>")))

# COMMONSENSE #######################################################################

# Returns True if the given word expresses a basic emotion:
# anger, disgust, fear, joy, sadness, surprise.
print((6, nodebox_linguistics_extended.is_basic_emotion("cheerful")))

# Returns True if the given word is a magic word:
# you, money, save, new, results, health, easy, ...
print((7, nodebox_linguistics_extended.is_persuasive("money")))

# Returns True if the word is a connective:
# nevertheless, whatever, secondly, ...
# and words like I, the, own, him which have little semantical value.
print((8, nodebox_linguistics_extended.is_connective("but")))

# NUMBERS ###########################################################################

# Returns the ordinal of the given number,
# 100 -> 100th, 3 -> 3rd
# twenty-one -> twenty-first
print((9, nodebox_linguistics_extended.number.ordinal(100)))
print((10, nodebox_linguistics_extended.number.ordinal("twenty-one")))

# Writes out the given number:
# 25 -> twenty-five
print((11, nodebox_linguistics_extended.number.spoken(25)))

# QUANTIFICATION ####################################################################

# Quantifies the given word:
# 10 and chickens -> a number of chickens
# 300 and chickens -> hundreds of chickens
print((12, nodebox_linguistics_extended.number.quantify(800, "chicken")))

# Quantifies a list of words:
# several chickens, a pair of geese and a duck
# Notice how goose is correctly pluralized and duck has the right article.
print(
    (
        13,
        nodebox_linguistics_extended.list.conjunction(
            ["goose", "goose", "duck", "chicken", "chicken", "chicken"]
        ),
    )
)

# Quantifies the types of things in the given list:
# several integers
print(
    (
        14,
        nodebox_linguistics_extended.list.conjunction((1, 2, 3, 4, 5), generalize=True),
    )
)
# You can also quantify a library:
# nodebox_linguistics_extended.list.conjunction(en, generalize=True) ->
# a number of modules, a number of functions, a number of strings,
# a pair of lists, a pair of dictionaries, an en verb, an en sentence,
# an en number, an en noun, an en list, an en content, an en adverb,
# an en adjective, a None type and a DrawingPrimitives Context

# INDEFINITE ARTICLE ################################################################

# Returns the noun with its indefinite article
# university -> a university
# owl -> an owl
# hour -> an hour
print((15, nodebox_linguistics_extended.noun.article("university")))

# PLURALIZATION #####################################################################

# Pluralizes the given noun:
# kitchen knife -> kitchen knives
# part-of-speech -> parts-of-speech
# wolf -> wolves
# child -> children
# You can also do nodebox_linguistics_extended.adjective.plural().
print((16, nodebox_linguistics_extended.noun.plural("dog")))

# EMOTIONAL VALUE ###################################################################

# Guesses whether the given noun expresses an emotion,
# by checking if there are synonyms of the word that
# are basic emotions.
# Return True or False by default.
print((17, nodebox_linguistics_extended.noun.is_emotion("anger")))

# Or you can return a string which provides some information
# anxious -> fear
# An additional optional parameter shallow=True
# speeds up the lookup process but doesn't check as many synonyms.
# You can also use verb.is_emotion(), adjective.is_emotion() and adverb.is_emotion()
print((18, nodebox_linguistics_extended.adjective.is_emotion("anxious", boolean=False)))

# WORDNET ###########################################################################

# WordNet describes semantic relations between synonym sets.
# Returns the dictionary description:
print((19, nodebox_linguistics_extended.noun.gloss("book")))

# A word can have multiple senses,
# for example "tree" can mean a tree in a forest but also a tree diagram,
# or a person named Sir Herbert Beerbohm Tree:
print((20, nodebox_linguistics_extended.noun.senses("tree")))

# Return the dictionary entry for tree as in tree diagram:
print((21, nodebox_linguistics_extended.noun.gloss("tree", sense=1)))

# Return a categorization for the given word:
# book -> communication
print((22, nodebox_linguistics_extended.noun.lexname("book")))

# Return examples of the given word:
# vehicle -> bumper car, craft, rocket, skibob, sled, steamroller, ...
print((23, nodebox_linguistics_extended.noun.hyponym("vehicle")))
print((24, nodebox_linguistics_extended.noun.hyponym("tree", sense=1)))

# Return abstractions of the given word:
# earth -> terrestrial planet
# earth as in dirt -> material
print((25, nodebox_linguistics_extended.noun.hypernym("earth")))
print((26, nodebox_linguistics_extended.noun.hypernym("earth", sense=1)))

# You can also execute a deep query on hypernyms and hyponyms.
# Notice how returned values become more and more abstract:
# vehicle -> transport -> intrumentation -> artifact -> unit -> physical object -> entity
print((27, nodebox_linguistics_extended.noun.hypernyms("vehicle", sense=0)))

# Return components of the given word:
# computer -> chip, diskette, keyboard, monitor, ...
print((28, nodebox_linguistics_extended.noun.holonym("computer")))

# Return the collection in which the given word can be found:
# tree -> forest
print((29, nodebox_linguistics_extended.noun.meronym("tree")))

# Return the semantic opposite of the word:
# black -> white
print((30, nodebox_linguistics_extended.noun.antonym("black")))

# Find out what two words have in common:
# cat and dog -> carnivore
print((31, nodebox_linguistics_extended.noun.meet("cat", "dog", sense1=0, sense2=0)))

# Return an absurd description for the word:
# typography -> a business deal on a trivial scale
print((32, nodebox_linguistics_extended.noun.absurd_gloss("typography")))

# The return value of a WordNet command is usually a list
# containing other lists of related words, for example:
# [['tree'], ['tree', 'tree diagram'], ['Tree', 'Sir Herbert Beerbohm Tree']]
# You can use the nodebox_linguistics_extended.list.flatten() command to flatten the list:
print(
    (
        33,
        nodebox_linguistics_extended.list.flatten(
            nodebox_linguistics_extended.noun.senses("tree")
        ),
    )
)
# -> ['tree', 'tree', 'tree diagram', 'Tree', 'Sir Herbert Beerbohm Tree']

# If you want a list of all nouns/verbs/adjectives/adverbs there's the
# nodebox_linguistics_extended.wordnet.all_nouns(), nodebox_linguistics_extended.wordnet.all_verbs() ... commands:
print((34, len(nodebox_linguistics_extended.wordnet.all_nouns())))

# All of the commands shown here for nouns are also available for verbs, adjectives and adverbs,
# nodebox_linguistics_extended.verbs.hypernyms("run"), nodebox_linguistics_extended.adjective.gloss("beautiful") etc. are valid commands.

# VERB CONJUGATION ##################################################################

# NodeBox English Linguistics knows the verb tenses for about 10000 English verbs.
# Return the infinitive:
# swimming -> swim
print((35, nodebox_linguistics_extended.verb.infinitive("swimming")))

# Return the present tense, for the given person:
# gave -> give
# gave -> he gives
print((36, nodebox_linguistics_extended.verb.present("gave")))
print((37, nodebox_linguistics_extended.verb.present("gave", person=3, negate=False)))
# Known values for person are 1, 2, 3, "1st", "2nd", "3rd", "plural", "*".
# Just use the one you like most.

# Return the present participle tense
# be -> being
print((38, nodebox_linguistics_extended.verb.present_participle("be")))

# Return the past tense:
# give -> gave
# be -> I wasn't
print((39, nodebox_linguistics_extended.verb.past("give")))
print((40, nodebox_linguistics_extended.verb.past("be", person=1, negate=True)))

# Return the past participle tense:
# be -> been
print((41, nodebox_linguistics_extended.verb.past_participle("be")))

# a list of all possible tenses:
print((42, nodebox_linguistics_extended.verb.tenses()))

# Returns the tense of the given verb:
# was -> 1st singular past
print((43, nodebox_linguistics_extended.verb.tense("was")))

# Returns True if the given verb is in the given tense:
print(
    (
        44,
        nodebox_linguistics_extended.verb.is_tense(
            "wasn't", "1st singular past", negated=True
        ),
    )
)
print((45, nodebox_linguistics_extended.verb.is_present("does", person=1)))
print((46, nodebox_linguistics_extended.verb.is_present_participle("doing")))
print((47, nodebox_linguistics_extended.verb.is_past_participle("done")))

# SHALLOW PARSING ###################################################################

# NodeBox English Linguistics is able to do sentence structure analysis using a
# combination of Jason Wiener's tagger and NLTK's chunker.
# The tagger assigns a part-of-speech tag to each word in the sentence using Brill's
# lexicon. A "postag" is something like NN or VBP marking words as nouns, verbs,
# determiners, pronouns, etc. The chunker is then able to group syntactic units
# in the sentence. A syntactic unit is a determiner followed by adjectives followed
# by a noun, for example, "the tasty little chicken" is a syntactic unit.

# Tag the given sentence.
# The return value is a list of (word, tag) tuples.
print((48, nodebox_linguistics_extended.sentence.tag("this is so cool")))
# -> this/DT is/VBZ so/RB cool/JJ

# There are lots of part-of-speech tags and it takes some time getting to know them.
# This function returns a (description, examples) tuple for a given tag:
# NN -> ('noun, singular or mass', 'tiger, chair, laughter')
print((49, nodebox_linguistics_extended.sentence.tag_description("NN")))

# Returns the chunked sentence:
# For example:
# we are going to school ->
# [['SP',
#  ['NP', ('we', 'PRP')],
#  ['AP',
#   ['VP', ('are', 'VBP'), ('going', 'VBG'), ('to', 'TO')],
#   ['NP', ('school', 'NN')]]]]
# Now what does all this mean?
# NP are noun phrases, syntactic units describing a noun, for example: a big fish.
# VP are verb phrases, units of verbs and auxillaries, for example: are going to.
# AP is a verb/argument structure, a verb phrase and a noun phrase being influenced.
# SP is a subject structure: a noun phrase which is the executor of a verb phrase
# or verb/argument structure.
from pprint import pprint

print((50))
pprint(
    nodebox_linguistics_extended.sentence.chunk(
        "he is always trying to feed her with lies"
    )
)

# A handy traverse(sentence, cmd) command lets you feed a chunked sentence
# to your own command chunk by chunk:
print((51))
s = "we are going to school"


def callback(chunk, token, tag):
    if chunk != None:
        print((nodebox_linguistics_extended.sentence.tag_description(chunk)[0].upper()))
    if chunk == None:
        print(
            (
                token,
                "("
                + nodebox_linguistics_extended.sentence.tag_description(tag)[0]
                + ")",
            )
        )


print("")
nodebox_linguistics_extended.sentence.traverse(s, callback)
print("")

# Find tag patterns in sentences.
print(
    (
        52,
        nodebox_linguistics_extended.sentence.find(
            "The quick brown fox jumped over the lazy dog?", "(JJ) JJ NN"
        ),
    )
)
print(
    (
        53,
        nodebox_linguistics_extended.sentence.find(
            "The hairy hamsters visited the cruel dentist.", "JJ NN", chunked=False
        ),
    )
)
print(
    (
        54,
        nodebox_linguistics_extended.sentence.find(
            "All sorts of strange and weird and mysterious things happened.",
            "JJ and JJ NN",
        ),
    )
)
print(
    (
        55,
        nodebox_linguistics_extended.sentence.find(
            "All sorts of strange and weird and mysterious things happened.",
            "JJ and JJ (NN)",
        ),
    )
)
print(
    (
        56,
        nodebox_linguistics_extended.sentence.find(
            "Hairy hamsters are animals, mammals, funny creatures, or just very cool things.",
            "(very) (JJ) NN",
            chunked=False,
        ),
    )
)
print(
    (
        57,
        nodebox_linguistics_extended.sentence.find(
            "Wildcards are pretty wild.", "wild*", chunked=False
        ),
    )
)
print(
    (
        58,
        nodebox_linguistics_extended.sentence.find(
            "Hamsters, hairy hamsters, funny hairy hamsters!",
            "(JJ) (JJ) NN",
            chunked=False,
        ),
    )
)

# If you want you could feed this command with a list of your own
# regular expression units to chunk, mine are pretty basic as I'm not a linguist.
print((59, nodebox_linguistics_extended.sentence.chunk_rules()))

# SUMMARISATION #####################################################################

# NodeBox English Linguistics is able to strip keywords from a given text.

txt = """

Art can describe several kinds of things: a study of creative skill, a process of 
using the creative skill, a product of the creative skill, or the audience’s 
experiencing of the creative skill. The creative arts (“art”’ as discipline) are 
a collection of disciplines (“arts”) which produce artworks (“art” as objects) that 
is compelled by a personal drive (“art” as activity) and echoes or reflects a message, 
mood, or symbolism for the viewer to interpret (“art” as experience). Artworks can 
be defined by purposeful, creative interpretations of limitless concepts or ideas in 
order to communicate something to another person. Artworks can be explicitly made for 
this purpose or interpreted based on images or objects.

Art is something that visually stimulates an individual's thoughts, emotions, beliefs 
or ideas. Art is a realized expression of an idea-it can take many different forms 
and serve many different purposes.

"""
print(
    (
        60,
        nodebox_linguistics_extended.content.keywords(
            txt, top=10, nouns=True, singularize=True, filters=[]
        ),
    )
)
# Guesses a list of words that frequently occur in the given text.
# The return value is a list (length defined by top) of (count, word) tuples.
# When nouns is True, returns only nouns. The command also ignores connectives,
# numbers and tags.
# When singularize is True, attempts to singularize nouns in the text.
# The optional filters parameter is a list of words which the command should ignore.

# Assuming you would want to summarise web content you can use nodebox_linguistics_extended.content.strip_tags()
# to strip out HTML and keep only textual content:
print(
    (
        61,
        nodebox_linguistics_extended.content.strip_tags(
            "<a href='http://nodebox.net'>NodeBox</a>"
        ),
    )
)

# For example:
# from urllib import urlopen
# html = urlopen("http://news.bbc.co.uk/").read()
# meta = ["news", "health", "uk", "version", "weather", "video", "sport", "return", "read", "help"]
# print sentence_keywords(html, filters=meta)
# -> [(6, 'funeral'), (5, 'beirut'), (3, 'war'), (3, 'service'), (3, 'radio'), (3, 'mull'),
#     (3, 'lebanon'), (3, 'islamist'), (3, 'function'), (3, 'female')]

# SPELLING CORRECTION ###############################################################

print((62, nodebox_linguistics_extended.spelling.suggest("elehpant")))
print((63, nodebox_linguistics_extended.spelling.correct("kebyoard")))
