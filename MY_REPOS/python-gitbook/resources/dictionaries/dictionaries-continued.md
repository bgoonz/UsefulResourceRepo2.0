# Dictionaries Continued

## **The Dictionary Data Type** <a id="calibre_link-191"></a>

Like a list, a _dictionary_ is a mutable collection of many values. But unlike indexes for lists, indexes for dictionaries can use many different data types, not just integers. Indexes for dictionaries are called _keys_, and a key with its associated value is called a _key-value pair_.

In code, a dictionary is typed with braces, {}. Enter the following into the interactive shell:

&gt;&gt;&gt; myCat = {'size': 'fat', 'color': 'gray', 'disposition': 'loud'}

This assigns a dictionary to the myCat variable. This dictionary’s keys are 'size', 'color', and 'disposition'. The values for these keys are 'fat', 'gray', and 'loud', respectively. You can access these values through their keys:

&gt;&gt;&gt; myCat\['size'\] 'fat' &gt;&gt;&gt; 'My cat has ' + myCat\['color'\] + ' fur.' 'My cat has gray fur.'

Dictionaries can still use integer values as keys, just like lists use integers for indexes, but they do not have to start at 0 and can be any number.

&gt;&gt;&gt; spam = {12345: 'Luggage Combination', 42: 'The Answer'}

**Dictionaries vs. Lists**

Unlike lists, items in dictionaries are unordered. The first item in a list named spam would be spam\[0\]. But there is no “first” item in a dictionary. While the order of items matters for determining whether two lists are the same, it does not matter in what order the key-value pairs are typed in a dictionary. Enter the following into the interactive shell:

&gt;&gt;&gt; spam = \['cats', 'dogs', 'moose'\] &gt;&gt;&gt; bacon = \['dogs', 'moose', 'cats'\] &gt;&gt;&gt; spam == bacon False &gt;&gt;&gt; eggs = {'name': 'Zophie', 'species': 'cat', 'age': '8'} &gt;&gt;&gt; ham = {'species': 'cat', 'age': '8', 'name': 'Zophie'} &gt;&gt;&gt; eggs == ham True

Because dictionaries are not ordered, they can’t be sliced like lists.

Trying to access a key that does not exist in a dictionary will result in a KeyError error message, much like a list’s “out-of-range” IndexError error message. Enter the following into the interactive shell, and notice the error message that shows up because there is no 'color' key:

&gt;&gt;&gt; spam = {'name': 'Zophie', 'age': 7} &gt;&gt;&gt; spam\['color'\] Traceback \(most recent call last\): File "&lt;pyshell\#1&gt;", line 1, in &lt;module&gt; spam\['color'\] KeyError: 'color'

Though dictionaries are not ordered, the fact that you can have arbitrary values for the keys allows you to organize your data in powerful ways. Say you wanted your program to store data about your friends’ birthdays. You can use a dictionary with the names as keys and the birthdays as values. Open a new file editor window and enter the following code. Save it as _birthdays.py_.

➊ birthdays = {'Alice': 'Apr 1', 'Bob': 'Dec 12', 'Carol': 'Mar 4'}

while True: print\('Enter a name: \(blank to quit\)'\) name = input\(\) if name == '': break

```text
➋ if name in birthdays:
    ➌ print\(birthdays\[name\] + ' is the birthday of ' + name\)
   else:
       print\('I do not have birthday information for ' + name\)
       print\('What is their birthday?'\)
       bday = input\(\)
    ➍ birthdays\[name\] = bday
       print\('Birthday database updated.'\)
```

You can view the execution of this program at [_https://autbor.com/bdaydb_](https://autbor.com/bdaydb). You create an initial dictionary and store it in birthdays ➊. You can see if the entered name exists as a key in the dictionary with the in keyword ➋, just as you did for lists. If the name is in the dictionary, you access the associated value using square brackets ➌; if not, you can add it using the same square bracket syntax combined with the assignment operator ➍.

When you run this program, it will look like this:

Enter a name: \(blank to quit\) Alice Apr 1 is the birthday of Alice Enter a name: \(blank to quit\) Eve I do not have birthday information for Eve What is their birthday? Dec 5 Birthday database updated. Enter a name: \(blank to quit\) Eve Dec 5 is the birthday of Eve Enter a name: \(blank to quit\)

Of course, all the data you enter in this program is forgotten when the program terminates. You’ll learn how to save data to files on the hard drive in [Chapter 9](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-32).

**ORDERED DICTIONARIES IN PYTHON 3.7**

While they’re still not ordered and have no “first” key-value pair, dictionaries in Python 3.7 and later will remember the insertion order of their key-value pairs if you create a sequence value from them. For example, notice the order of items in the lists made from the eggs and ham dictionaries matches the order in which they were entered:

&gt;&gt;&gt; eggs = {'name': 'Zophie', 'species': 'cat', 'age': '8'} &gt;&gt;&gt; list\(eggs\) \['name', 'species', 'age'\] &gt;&gt;&gt; ham = {'species': 'cat', 'age': '8', 'name': 'Zophie'} &gt;&gt;&gt; list\(ham\) \['species', 'age', 'name'\]

The dictionaries are still unordered, as you can’t access items in them using integer indexes like eggs\[0\] or ham\[2\]. You shouldn’t rely on this behavior, as dictionaries in older versions of Python don’t remember the insertion order of key-value pairs. For example, notice how the list doesn’t match the insertion order of the dictionary’s key-value pairs when I run this code in Python 3.5:

&gt;&gt;&gt; spam = {} &gt;&gt;&gt; spam\['first key'\] = 'value' &gt;&gt;&gt; spam\['second key'\] = 'value' &gt;&gt;&gt; spam\['third key'\] = 'value' &gt;&gt;&gt; list\(spam\) \['first key', 'third key', 'second key'\]

**The keys\(\), values\(\), and items\(\) Methods**

There are three dictionary methods that will return list-like values of the dictionary’s keys, values, or both keys and values: keys\(\), values\(\), and items\(\). The values returned by these methods are not true lists: they cannot be modified and do not have an append\(\) method. But these data types \(dict\_keys, dict\_values, and dict\_items, respectively\) _can_ be used in for loops. To see how these methods work, enter the following into the interactive shell:

&gt;&gt;&gt; spam = {'color': 'red', 'age': 42} &gt;&gt;&gt; for v in spam.values\(\): ... print\(v\)

red 42

Here, a for loop iterates over each of the values in the spam dictionary. A for loop can also iterate over the keys or both keys and values:

&gt;&gt;&gt; for k in spam.keys\(\): ... print\(k\)

color age &gt;&gt;&gt; for i in spam.items\(\): ... print\(i\)

\('color', 'red'\) \('age', 42\)

When you use the keys\(\), values\(\), and items\(\) methods, a for loop can iterate over the keys, values, or key-value pairs in a dictionary, respectively. Notice that the values in the dict\_items value returned by the items\(\) method are tuples of the key and value.

If you want a true list from one of these methods, pass its list-like return value to the list\(\) function. Enter the following into the interactive shell:

&gt;&gt;&gt; spam = {'color': 'red', 'age': 42} &gt;&gt;&gt; spam.keys\(\) dict\_keys\(\['color', 'age'\]\) &gt;&gt;&gt; list\(spam.keys\(\)\) \['color', 'age'\]

The list\(spam.keys\(\)\) line takes the dict\_keys value returned from keys\(\) and passes it to list\(\), which then returns a list value of \['color', 'age'\].

You can also use the multiple assignment trick in a for loop to assign the key and value to separate variables. Enter the following into the interactive shell:

&gt;&gt;&gt; spam = {'color': 'red', 'age': 42} &gt;&gt;&gt; for k, v in spam.items\(\): ... print\('Key: ' + k + ' Value: ' + str\(v\)\)

Key: age Value: 42 Key: color Value: red

**Checking Whether a Key or Value Exists in a Dictionary**

Recall from the previous chapter that the in and not in operators can check whether a value exists in a list. You can also use these operators to see whether a certain key or value exists in a dictionary. Enter the following into the interactive shell:

&gt;&gt;&gt; spam = {'name': 'Zophie', 'age': 7} &gt;&gt;&gt; 'name' in spam.keys\(\) True &gt;&gt;&gt; 'Zophie' in spam.values\(\) True &gt;&gt;&gt; 'color' in spam.keys\(\) False &gt;&gt;&gt; 'color' not in spam.keys\(\) True &gt;&gt;&gt; 'color' in spam False

In the previous example, notice that 'color' in spam is essentially a shorter version of writing 'color' in spam.keys\(\). This is always the case: if you ever want to check whether a value is \(or isn’t\) a key in the dictionary, you can simply use the in \(or not in\) keyword with the dictionary value itself.

**The get\(\) Method**

It’s tedious to check whether a key exists in a dictionary before accessing that key’s value. Fortunately, dictionaries have a get\(\) method that takes two arguments: the key of the value to retrieve and a fallback value to return if that key does not exist.

Enter the following into the interactive shell:

&gt;&gt;&gt; picnicItems = {'apples': 5, 'cups': 2} &gt;&gt;&gt; 'I am bringing ' + str\(picnicItems.get\('cups', 0\)\) + ' cups.' 'I am bringing 2 cups.' &gt;&gt;&gt; 'I am bringing ' + str\(picnicItems.get\('eggs', 0\)\) + ' eggs.' 'I am bringing 0 eggs.'

Because there is no 'eggs' key in the picnicItems dictionary, the default value 0 is returned by the get\(\) method. Without using get\(\), the code would have caused an error message, such as in the following example:

&gt;&gt;&gt; picnicItems = {'apples': 5, 'cups': 2} &gt;&gt;&gt; 'I am bringing ' + str\(picnicItems\['eggs'\]\) + ' eggs.' Traceback \(most recent call last\): File "&lt;pyshell\#34&gt;", line 1, in &lt;module&gt; 'I am bringing ' + str\(picnicItems\['eggs'\]\) + ' eggs.' KeyError: 'eggs'

**The setdefault\(\) Method**

You’ll often have to set a value in a dictionary for a certain key only if that key does not already have a value. The code looks something like this:

spam = {'name': 'Pooka', 'age': 5} if 'color' not in spam: spam\['color'\] = 'black'

The setdefault\(\) method offers a way to do this in one line of code. The first argument passed to the method is the key to check for, and the second argument is the value to set at that key if the key does not exist. If the key does exist, the setdefault\(\) method returns the key’s value. Enter the following into the interactive shell:

&gt;&gt;&gt; spam = {'name': 'Pooka', 'age': 5} &gt;&gt;&gt; spam.setdefault\('color', 'black'\) 'black' &gt;&gt;&gt; spam {'color': 'black', 'age': 5, 'name': 'Pooka'} &gt;&gt;&gt; spam.setdefault\('color', 'white'\) 'black' &gt;&gt;&gt; spam {'color': 'black', 'age': 5, 'name': 'Pooka'}

The first time setdefault\(\) is called, the dictionary in spam changes to {'color': 'black', 'age': 5, 'name': 'Pooka'}. The method returns the value 'black' because this is now the value set for the key 'color'. When spam.setdefault\('color', 'white'\) is called next, the value for that key is _not_ changed to 'white', because spam already has a key named 'color'.

The setdefault\(\) method is a nice shortcut to ensure that a key exists. Here is a short program that counts the number of occurrences of each letter in a string. Open the file editor window and enter the following code, saving it as _characterCount.py_:

message = 'It was a bright cold day in April, and the clocks were striking thirteen.' count = {}

for character in message: ➊ count.setdefault\(character, 0\) ➋ count\[character\] = count\[character\] + 1

print\(count\)

You can view the execution of this program at [_https://autbor.com/setdefault_](https://autbor.com/setdefault). The program loops over each character in the message variable’s string, counting how often each character appears. The setdefault\(\) method call ➊ ensures that the key is in the count dictionary \(with a default value of 0\) so the program doesn’t throw a KeyError error when count\[character\] = count\[character\] + 1 is executed ➋. When you run this program, the output will look like this:

{' ': 13, ',': 1, '.': 1, 'A': 1, 'I': 1, 'a': 4, 'c': 3, 'b': 1, 'e': 5, 'd': 3, 'g': 2, 'i': 6, 'h': 3, 'k': 2, 'l': 3, 'o': 2, 'n': 4, 'p': 1, 's': 3, 'r': 5, 't': 6, 'w': 2, 'y': 1}

From the output, you can see that the lowercase letter _c_ appears 3 times, the space character appears 13 times, and the uppercase letter _A_ appears 1 time. This program will work no matter what string is inside the message variable, even if the string is millions of characters long!

## **Pretty Printing** <a id="calibre_link-197"></a>

If you import the pprint module into your programs, you’ll have access to the pprint\(\) and pformat\(\) functions that will “pretty print” a dictionary’s values. This is helpful when you want a cleaner display of the items in a dictionary than what print\(\) provides. Modify the previous _characterCount.py_ program and save it as _prettyCharacterCount.py_.

import pprint message = 'It was a bright cold day in April, and the clocks were striking thirteen.' count = {}

for character in message: count.setdefault\(character, 0\) count\[character\] = count\[character\] + 1

pprint.pprint\(count\)

You can view the execution of this program at [_https://autbor.com/pprint/_](https://autbor.com/pprint/). This time, when the program is run, the output looks much cleaner, with the keys sorted.

{' ': 13, ',': 1, '.': 1, 'A': 1, 'I': 1, --snip-- 't': 6, 'w': 2, 'y': 1}

The pprint.pprint\(\) function is especially helpful when the dictionary itself contains nested lists or dictionaries.

If you want to obtain the prettified text as a string value instead of displaying it on the screen, call pprint.pformat\(\) instead. These two lines are equivalent to each other:

pprint.pprint\(someDictionaryValue\) print\(pprint.pformat\(someDictionaryValue\)\)

## **Using Data Structures to Model Real-World Things** <a id="calibre_link-198"></a>

Even before the internet, it was possible to play a game of chess with someone on the other side of the world. Each player would set up a chessboard at their home and then take turns mailing a postcard to each other describing each move. To do this, the players needed a way to unambiguously describe the state of the board and their moves.

In _algebraic chess notation_, the spaces on the chessboard are identified by a number and letter coordinate, as in [Figure 5-1](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1128).![image](https://automatetheboringstuff.com/2e/images/000006.jpg)

_Figure 5-1: The coordinates of a chessboard in algebraic chess notation_

The chess pieces are identified by letters: _K_ for king, _Q_ for queen, _R_ for rook, _B_ for bishop, and _N_ for knight. Describing a move uses the letter of the piece and the coordinates of its destination. A pair of these moves describes what happens in a single turn \(with white going first\); for instance, the notation _2. Nf3 Nc6_ indicates that white moved a knight to f3 and black moved a knight to c6 on the second turn of the game.

There’s a bit more to algebraic notation than this, but the point is that you can unambiguously describe a game of chess without needing to be in front of a chessboard. Your opponent can even be on the other side of the world! In fact, you don’t even need a physical chess set if you have a good memory: you can just read the mailed chess moves and update boards you have in your imagination.

Computers have good memories. A program on a modern computer can easily store billions of strings like '2. Nf3 Nc6'. This is how computers can play chess without having a physical chessboard. They model data to represent a chessboard, and you can write code to work with this model.

This is where lists and dictionaries can come in. For example, the dictionary {'1h': 'bking', '6c': 'wqueen', '2g': 'bbishop', '5h': 'bqueen', '3e': 'wking'} could represent the chess board in [Figure 5-2](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1129).![image](https://automatetheboringstuff.com/2e/images/000101.jpg)

_Figure 5-2: A chess board modeled by the dictionary_ '1h': 'bking', '6c': 'wqueen', '2g': 'bbishop', '5h': 'bqueen', '3e': 'wking'}

But for another example, you’ll use a game that’s a little simpler than chess: tic-tac-toe.

**A Tic-Tac-Toe Board**

A tic-tac-toe board looks like a large hash symbol \(\#\) with nine slots that can each contain an _X_, an _O_, or a blank. To represent the board with a dictionary, you can assign each slot a string-value key, as shown in [Figure 5-3](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1130).![image](https://automatetheboringstuff.com/2e/images/000048.jpg)

_Figure 5-3: The slots of a tic-tac-toe board with their corresponding keys_

You can use string values to represent what’s in each slot on the board: 'X', 'O', or ' ' \(a space\). Thus, you’ll need to store nine strings. You can use a dictionary of values for this. The string value with the key 'top-R' can represent the top-right corner, the string value with the key 'low-L' can represent the bottom-left corner, the string value with the key 'mid-M' can represent the middle, and so on.

This dictionary is a data structure that represents a tic-tac-toe board. Store this board-as-a-dictionary in a variable named theBoard. Open a new file editor window, and enter the following source code, saving it as _ticTacToe.py_:

theBoard = {'top-L': ' ', 'top-M': ' ', 'top-R': ' ', 'mid-L': ' ', 'mid-M': ' ', 'mid-R': ' ', 'low-L': ' ', 'low-M': ' ', 'low-R': ' '}

The data structure stored in the theBoard variable represents the tic-tac-toe board in [Figure 5-4](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1131).![image](https://automatetheboringstuff.com/2e/images/000141.jpg)

_Figure 5-4: An empty tic-tac-toe board_

Since the value for every key in theBoard is a single-space string, this dictionary represents a completely clear board. If player X went first and chose the middle space, you could represent that board with this dictionary:

theBoard = {'top-L': ' ', 'top-M': ' ', 'top-R': ' ', 'mid-L': ' ', 'mid-M': 'X', 'mid-R': ' ', 'low-L': ' ', 'low-M': ' ', 'low-R': ' '}

The data structure in theBoard now represents the tic-tac-toe board in [Figure 5-5](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1132).![image](https://automatetheboringstuff.com/2e/images/000084.jpg)

_Figure 5-5: The first move_

A board where player O has won by placing \_O\_s across the top might look like this:

theBoard = {'top-L': 'O', 'top-M': 'O', 'top-R': 'O', 'mid-L': 'X', 'mid-M': 'X', 'mid-R': ' ', 'low-L': ' ', 'low-M': ' ', 'low-R': 'X'}

The data structure in theBoard now represents the tic-tac-toe board in [Figure 5-6](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1133).![image](https://automatetheboringstuff.com/2e/images/000020.jpg)

_Figure 5-6: Player O wins._

Of course, the player sees only what is printed to the screen, not the contents of variables. Let’s create a function to print the board dictionary onto the screen. Make the following addition to _ticTacToe.py_ \(new code is in bold\):

theBoard = {'top-L': ' ', 'top-M': ' ', 'top-R': ' ', 'mid-L': ' ', 'mid-M': ' ', 'mid-R': ' ', 'low-L': ' ', 'low-M': ' ', 'low-R': ' '} def printBoard\(board\): print\(board\['top-L'\] + '\|' + board\['top-M'\] + '\|' + board\['top-R'\]\) print\('-+-+-'\) print\(board\['mid-L'\] + '\|' + board\['mid-M'\] + '\|' + board\['mid-R'\]\) print\('-+-+-'\) print\(board\['low-L'\] + '\|' + board\['low-M'\] + '\|' + board\['low-R'\]\) printBoard\(theBoard\)

You can view the execution of this program at [_https://autbor.com/tictactoe1/_](https://autbor.com/tictactoe1/). When you run this program, printBoard\(\) will print out a blank tic-tac-toe board.

\| \| -+-+- \| \| -+-+- \| \|

The printBoard\(\) function can handle any tic-tac-toe data structure you pass it. Try changing the code to the following:

theBoard = {'top-L': 'O', 'top-M': 'O', 'top-R': 'O', 'mid-L': 'X', 'mid-M': 'X', 'mid-R': ' ', 'low-L': ' ', 'low-M': ' ', 'low-R': 'X'}

def printBoard\(board\): print\(board\['top-L'\] + '\|' + board\['top-M'\] + '\|' + board\['top-R'\]\) print\('-+-+-'\) print\(board\['mid-L'\] + '\|' + board\['mid-M'\] + '\|' + board\['mid-R'\]\) print\('-+-+-'\) print\(board\['low-L'\] + '\|' + board\['low-M'\] + '\|' + board\['low-R'\]\) printBoard\(theBoard\)

You can view the execution of this program at [_https://autbor.com/tictactoe2/_](https://autbor.com/tictactoe2/). Now when you run this program, the new board will be printed to the screen.

O\|O\|O -+-+- X\|X\| -+-+- \| \|X

Because you created a data structure to represent a tic-tac-toe board and wrote code in printBoard\(\) to interpret that data structure, you now have a program that “models” the tic-tac-toe board. You could have organized your data structure differently \(for example, using keys like 'TOP-LEFT' instead of 'top-L'\), but as long as the code works with your data structures, you will have a correctly working program.

For example, the printBoard\(\) function expects the tic-tac-toe data structure to be a dictionary with keys for all nine slots. If the dictionary you passed was missing, say, the 'mid-L' key, your program would no longer work.

O\|O\|O -+-+- Traceback \(most recent call last\): File "ticTacToe.py", line 10, in &lt;module&gt; printBoard\(theBoard\) File "ticTacToe.py", line 6, in printBoard print\(board\['mid-L'\] + '\|' + board\['mid-M'\] + '\|' + board\['mid-R'\]\) KeyError: 'mid-L'

Now let’s add code that allows the players to enter their moves. Modify the _ticTacToe.py_ program to look like this:

theBoard = {'top-L': ' ', 'top-M': ' ', 'top-R': ' ', 'mid-L': ' ', 'mid-M': ' ', 'mid-R': ' ', 'low-L': ' ', 'low-M': ' ', 'low-R': ' '}

def printBoard\(board\): print\(board\['top-L'\] + '\|' + board\['top-M'\] + '\|' + board\['top-R'\]\) print\('-+-+-'\) print\(board\['mid-L'\] + '\|' + board\['mid-M'\] + '\|' + board\['mid-R'\]\) print\('-+-+-'\) print\(board\['low-L'\] + '\|' + board\['low-M'\] + '\|' + board\['low-R'\]\) turn = 'X' for i in range\(9\): ➊ printBoard\(theBoard\) print\('Turn for ' + turn + '. Move on which space?'\) ➋ move = input\(\) ➌ theBoard\[move\] = turn ➍ if turn == 'X': turn = 'O' else: turn = 'X' printBoard\(theBoard\)

You can view the execution of this program at [_https://autbor.com/tictactoe3/_](https://autbor.com/tictactoe3/). The new code prints out the board at the start of each new turn ➊, gets the active player’s move ➋, updates the game board accordingly ➌, and then swaps the active player ➍ before moving on to the next turn.

When you run this program, it will look something like this:

\| \| -+-+- \| \| -+-+- \| \| Turn for X. Move on which space? mid-M \| \| -+-+- \|X\| -+-+- \| \|

--snip--

O\|O\|X -+-+- X\|X\|O -+-+- O\| \|X Turn for X. Move on which space? low-M O\|O\|X -+-+- X\|X\|O -+-+- O\|X\|X

This isn’t a complete tic-tac-toe game—for instance, it doesn’t ever check whether a player has won—but it’s enough to see how data structures can be used in programs.

**NOTE**

_If you are curious, the source code for a complete tic-tac-toe program is described in the resources available from_ [https://nostarch.com/automatestuff2/](https://nostarch.com/automatestuff2/).

**Nested Dictionaries and Lists**

Modeling a tic-tac-toe board was fairly simple: the board needed only a single dictionary value with nine key-value pairs. As you model more complicated things, you may find you need dictionaries and lists that contain other dictionaries and lists. Lists are useful to contain an ordered series of values, and dictionaries are useful for associating keys with values. For example, here’s a program that uses a dictionary that contains other dictionaries of what items guests are bringing to a picnic. The totalBrought\(\) function can read this data structure and calculate the total number of an item being brought by all the guests.

allGuests = {'Alice': {'apples': 5, 'pretzels': 12}, 'Bob': {'ham sandwiches': 3, 'apples': 2}, 'Carol': {'cups': 3, 'apple pies': 1}}

def totalBrought\(guests, item\): numBrought = 0 ➊ for k, v in guests.items\(\): ➋ numBrought = numBrought + v.get\(item, 0\) return numBrought

print\('Number of things being brought:'\) print\(' - Apples ' + str\(totalBrought\(allGuests, 'apples'\)\)\) print\(' - Cups ' + str\(totalBrought\(allGuests, 'cups'\)\)\) print\(' - Cakes ' + str\(totalBrought\(allGuests, 'cakes'\)\)\) print\(' - Ham Sandwiches ' + str\(totalBrought\(allGuests, 'ham sandwiches'\)\)\) print\(' - Apple Pies ' + str\(totalBrought\(allGuests, 'apple pies'\)\)\)

You can view the execution of this program at [_https://autbor.com/guestpicnic/_](https://autbor.com/guestpicnic/). Inside the totalBrought\(\) function, the for loop iterates over the key-value pairs in guests ➊. Inside the loop, the string of the guest’s name is assigned to k, and the dictionary of picnic items they’re bringing is assigned to v. If the item parameter exists as a key in this dictionary, its value \(the quantity\) is added to numBrought ➋. If it does not exist as a key, the get\(\) method returns 0 to be added to numBrought.

The output of this program looks like this:

Number of things being brought:

* Apples 7
* Cups 3
* Cakes 0
* Ham Sandwiches 3
* Apple Pies 1

This may seem like such a simple thing to model that you wouldn’t need to bother with writing a program to do it. But realize that this same totalBrought\(\) function could easily handle a dictionary that contains thousands of guests, each bringing _thousands_ of different picnic items. Then having this information in a data structure along with the totalBrought\(\) function would save you a lot of time!

You can model things with data structures in whatever way you like, as long as the rest of the code in your program can work with the data model correctly. When you first begin programming, don’t worry so much about the “right” way to model data. As you gain more experience, you may come up with more efficient models, but the important thing is that the data model works for your program’s needs.

## **Summary** <a id="calibre_link-201"></a>

You learned all about dictionaries in this chapter. Lists and dictionaries are values that can contain multiple values, including other lists and dictionaries. Dictionaries are useful because you can map one item \(the key\) to another \(the value\), as opposed to lists, which simply contain a series of values in order. Values inside a dictionary are accessed using square brackets just as with lists. Instead of an integer index, dictionaries can have keys of a variety of data types: integers, floats, strings, or tuples. By organizing a program’s values into data structures, you can create representations of real-world objects. You saw an example of this with a tic-tac-toe board.

## **Practice Questions** <a id="calibre_link-202"></a>

[1](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1134). What does the code for an empty dictionary look like?

[2](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1135). What does a dictionary value with a key 'foo' and a value 42 look like?

[3](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1136). What is the main difference between a dictionary and a list?

[4](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1137). What happens if you try to access spam\['foo'\] if spam is {'bar': 100}?

[5](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1138). If a dictionary is stored in spam, what is the difference between the expressions 'cat' in spam and 'cat' in spam.keys\(\)?

[6](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1139). If a dictionary is stored in spam, what is the difference between the expressions 'cat' in spam and 'cat' in spam.values\(\)?

[7](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1140). What is a shortcut for the following code?

if 'color' not in spam: spam\['color'\] = 'black'

[8](https://automatetheboringstuff.com/2e/chapter5/#calibre_link-1141). What module and function can be used to “pretty print” dictionary values?

## **Practice Projects** <a id="calibre_link-203"></a>

For practice, write programs to do the following tasks.

**Chess Dictionary Validator**

In this chapter, we used the dictionary value {'1h': 'bking', '6c': 'wqueen', '2g': 'bbishop', '5h': 'bqueen', '3e': 'wking'} to represent a chess board. Write a function named isValidChessBoard\(\) that takes a dictionary argument and returns True or False depending on if the board is valid.

A valid board will have exactly one black king and exactly one white king. Each player can only have at most 16 pieces, at most 8 pawns, and all pieces must be on a valid space from '1a' to '8h'; that is, a piece can’t be on space '9z'. The piece names begin with either a 'w' or 'b' to represent white or black, followed by 'pawn', 'knight', 'bishop', 'rook', 'queen', or 'king'. This function should detect when a bug has resulted in an improper chess board.

**Fantasy Game Inventory**

You are creating a fantasy video game. The data structure to model the player’s inventory will be a dictionary where the keys are string values describing the item in the inventory and the value is an integer value detailing how many of that item the player has. For example, the dictionary value {'rope': 1, 'torch': 6, 'gold coin': 42, 'dagger': 1, 'arrow': 12} means the player has 1 rope, 6 torches, 42 gold coins, and so on.

Write a function named displayInventory\(\) that would take any possible “inventory” and display it like the following:

Inventory: 12 arrow 42 gold coin 1 rope 6 torch 1 dagger Total number of items: 62

Hint: You can use a for loop to loop through all the keys in a dictionary.

\# inventory.py stuff = {'rope': 1, 'torch': 6, 'gold coin': 42, 'dagger': 1, 'arrow': 12}

def displayInventory\(inventory\): print\("Inventory:"\) item\_total = 0 for k, v in inventory.items\(\): \# FILL THIS PART IN print\("Total number of items: " + str\(item\_total\)\)

displayInventory\(stuff\)

**List to Dictionary Function for Fantasy Game Inventory**

Imagine that a vanquished dragon’s loot is represented as a list of strings like this:

dragonLoot = \['gold coin', 'dagger', 'gold coin', 'gold coin', 'ruby'\]

Write a function named addToInventory\(inventory, addedItems\), where the inventory parameter is a dictionary representing the player’s inventory \(like in the previous project\) and the addedItems parameter is a list like dragonLoot. The addToInventory\(\) function should return a dictionary that represents the updated inventory. Note that the addedItems list can contain multiples of the same item. Your code could look something like this:

def addToInventory\(inventory, addedItems\): \# your code goes here

inv = {'gold coin': 42, 'rope': 1} dragonLoot = \['gold coin', 'dagger', 'gold coin', 'gold coin', 'ruby'\] inv = addToInventory\(inv, dragonLoot\) displayInventory\(inv\)

The previous program \(with your displayInventory\(\) function from the previous project\) would output the following:

Inventory: 45 gold coin 1 rope 1 ruby 1 dagger

Total number of items: 48

