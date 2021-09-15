#### General Teacher Notes

This week starts with some theory around Input/Process/Output and what
an algorithm is. If you'd rather dive straight into the coding then
that's fine.

There is a lot in this first week, don't be afraid to slow it down and
really ensure that students have mastered these concepts. There are lots
of similar tasks available online that you can use to supplement the
ones in these resources. I can particularly recommend:

[[https://www.w3schools.com/python/python\_exercises.asp]{.underline}](https://www.w3schools.com/python/python_exercises.asp)

[[https://www.practicepython.org/]{.underline}](https://www.practicepython.org/)

The input/process/output diagram on the lesson slides will be referred
back to in future sessions.

It's important to ensure that students understand the difference between
algorithm and program.

Once you have explained this we move on to coding output using the
**print** statement. This is one of the simplest commands in Python. It
offers instant feedback (users can see if it works or not straight
away). When students have had a chance to predict & test, start to
explore how to break the statement. This will give you a chance to
highlight the importance of precision and correct syntax in programming.
I find it really helps if students appreciate this very early on.

At first, you start with printing set text (called strings). In later
tasks you use variables to store text and refer back to it. Variables
are used in a very similar way to letters in algebra - they represent
the text. Students can call variables anything they like, but there are
some good practice principles:

-   No two variables can have the same name.

-   Variable names should be meaningful (give you a clue as to the data
    > stored therein

-   Variable names start with a lowercase letter.

-   Variable names cannot contain spaces.

-   If a variable name is more than one word long, capitalise the first
    > letter of the second word onwards, like this this is known as
    > [**[camel
    > case]{.underline}**](https://en.wikipedia.org/wiki/Camel_case#:~:text=Camel%20case%20(stylized%20as%20camelCase,no%20intervening%20spaces%20or%20punctuation.):

    -   ***thisIsAnExampleVariableName***

#### Key Concepts

Algorithms - sequences of instructions for a task.

Output - the information presented to the user by the computer. In our
programs output will be in the form of text on screen.

Variable - a placeholder for information that can change as the program
runs.

String variable assignment - A string is data that the computer treats
as text.

Concatenation - joining the contents of variables to other variables
and/or strings in output.

Input - the data collected by the computer. In our programs input will
be in the form of the user typing in.

Syntax - the format that code is written in. If code is not written in
the correct format it creates a **syntax error** and the program will
not run.

#### Lesson Tasks - Links to repls

##### Task 1 - Output

Task and instructions on repl.it - share this link with your students -
[[https://repl.it/\@MrAColley/11-Output]{.underline}](https://repl.it/@MrAColley/11-Output)

Example solution -
[[https://repl.it/\@MrAColley/11-Output-Example-Solution]{.underline}](https://repl.it/@MrAColley/11-Output-Example-Solution)

Task 1 - Add a comment on line 9 to predict what the code on line 10
will do.

Task 2 - Reuse the code to output your own message. Add comments to show
what it does.

Task 3 - Output a joke that outputs on multiple lines.

##### Task 2 - Variable Assignment

Task and instructions -
[[https://repl.it/\@MrAColley/12-Variable-Assignment]{.underline}](https://repl.it/@MrAColley/12-Variable-Assignment)

Example solution -
[[https://repl.it/\@MrAColley/12-Variable-Assignment-Example-Solution]{.underline}](https://repl.it/@MrAColley/12-Variable-Assignment-Example-Solution)

Task 1 - Add comments to the code below to explain what it does

name = \"Axl\"

print(name)

Extra question - why isn\'t \'name\' in speech marks on line 5?

Task 2 - Concatenation

name1 = \"Axl\"

name2 = \"Slash\"

\#Add 2 more variables to store \'Duff\' and \'Izzy\'

This line uses concatenation to join the variables together with the
string \'and\' to make a sentence.

Complete the line to output all of the variables

print(name1 + \" and \" + name2 + \" and \")

##### Task 3 - Variable Assignment Independent Challenge

Task and instructions -
[[https://repl.it/\@MrAColley/13-Variable-Assignment-Challenge]{.underline}](https://repl.it/@MrAColley/13-Variable-Assignment-Challenge)

Example solution -
[[https://repl.it/\@MrAColley/13-Variable-Assignment-Challenge-Example-Solution]{.underline}](https://repl.it/@MrAColley/13-Variable-Assignment-Challenge-Example-Solution)

Assign your name and your favourite food to 2 separate variables with
suitable names.

\#\#\#\#\#\#\#\#\#\#\#\#\# SIMPLE \#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

Output the contents of the variables on 2 separate lines

\#\#\#\#\#\#\#\#\#\#\#\#\# MEDIUM
\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

Output two sentences (not just the contents of the variables). The first
with your name, the second with your favourite food.

\#\#\#\#\#\#\#\#\#\#\#\# COMPLEX
\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

Output both pieces of information as part of the same sentence.

Make sure that you have spaces and punctuation in the correct places.

##### Task 4 - Input

Task and instructions -
[**[https://repl.it/\@MrAColley/14-Input-With-Variables]{.underline}**](https://repl.it/@MrAColley/14-Input-With-Variables)

Example solution -
[[https://repl.it/\@MrAColley/14-Input-With-Variables-Example-Solution]{.underline}](https://repl.it/@MrAColley/14-Input-With-Variables-Example-Solution)

\# Input With Variables

\#Task 1 - Add comments to the code below to predict what will happen
when it is run.

\#Task 2 - add comments to the code to explain what the variables are
called and where they are used. Make sure to show where the variable.

print(\"Hi! What\'s your name?\")

name = input()

print(\"Hi \" + name + \"! How are you today?\")

\# Task 3 - Adapt the code so that it assigns input into the \'name\'
variable. CHALLENGE - put a prompt in the input command to ask the user
for their name.

\# Task 4 - Combine lines 'Do you like programming' and answer = input()
so that the input has a prompt in it.

\#Task 5 - Adapt the output on the next to last line so that it includes
both the name and the answer variables.

name = \"Billy\"

print(\"We want to know if you like progamming!\")

print()

print(\"Do you like programming \" + name + \"?\")

answer = input()

print(\"Great! You said \" + answer + \"!\")

print(\"Let\'s learn some Python today\")

##### Task 5 - Homework - The Chat Bot Challenge

Lots of websites use chatbots to interact with their customers. These
chatbots are often very sophisticated and use AI to learn and adapt to
the user. Our chat bot is going to be a bit simpler.

The chatbot should work like this:

•Ask the user their name and store it in a variable.

•Greet the user by name.

•Ask the user three questions about themselves and store their responses
in three different suitably named variables.

•Respond to each of the questions one by one, using the user's name in
the response.

•Output a summary of all of the user's answers in a single sentence.
