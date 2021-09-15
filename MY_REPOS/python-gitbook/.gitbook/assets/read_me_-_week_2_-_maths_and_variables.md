### General Teacher Notes

This unit looks at how computers do basic maths. This is a process (it
happens 'inside' the computer).

We start off by learning about the operators used for simple maths.
Multiplication & division use different operators to paper based maths.
We also see the + operator used for another purpose here as well.

/ is used for division, but it returns a decimal result (known as a
**float**). Python also lets us use // to perform **floor division** -
where it ignores any decimal and just returns the whole number part of
the answer (known as an integer, or int).

Task 1 uses set numbers to perform maths so that students can
concentrate on learning how to use the operators.

Task 2 reintroduces variables, but this time as placeholders for numbers
(no speech marks because we are treating them as numbers, not text).
Again, the variables are assigned in the code. Be aware that the code
will not work as students expect. Because all input is treated as
strings (text) the number the user inputs will also be treated as text
so will be duplicated 10 times instead of multiplied by 10. Use the
slides to show students how to convert input to an integer (casting).

Task 3 brings in input. We go back to using strings so that students can
see how the contents of a variable can be changed as the program runs.
Up to now we've not done this, the contents of each variable have not
changed so you might need to slow down here and guide students line by
line through the code getting them to write what is stored in each
variable at each stage of the code.

Task 4 is the homework challenge - a program that gets input and
calculates the area of a rectangle. This combines everything we've
learned about input, numbers, maths and variables.

There are some extra credit challenges here if you have students who are
racing ahead. Be careful here though, it's more valuable to make them
comment their code thoroughly before they move on than rush through the
tasks.

### Task 1 - Operators

Task and instructions -
[[https://repl.it/\@MrAColley/21-Maths-part-1]{.underline}](https://repl.it/@MrAColley/21-Maths-part-1)

Example solution -
[[https://repl.it/\@MrAColley/21-Simple-Maths-Example-Solution]{.underline}](https://repl.it/@MrAColley/21-Simple-Maths-Example-Solution)

\# Task 1 - add comments to this code to predict what it will do.

print(8 + 2)

print(8 - 2)

print(8 \* 2)

print(8 / 2)

print(8 // 2)

### Task 2 - Variables And Operators

Task and instructions -
[[https://repl.it/\@MrAColley/22-Maths-with-variables-1]{.underline}](https://repl.it/@MrAColley/22-Maths-with-variables-1)

Example solution -
[[https://repl.it/\@MrAColley/22-Maths-With-Variables-Example-Solution]{.underline}](https://repl.it/@MrAColley/22-Maths-With-Variables-Example-Solution)

\# Task 1 - Add comments to predict what the code below will do.

num1 = 20

num2 = 5

result = num1 \* num2

print(result)

\# Task 2 - Write code that uses numbers stored in 2 variables and a
calculation to output the number 42

### Task 3 - Changing Variables

Task and instructions -
[[https://repl.it/\@MrAColley/23-Changing-variables]{.underline}](https://repl.it/@MrAColley/23-Changing-variables)

Example solution -
[[https://repl.it/\@MrAColley/23-Changing-Variables-Example-Solution]{.underline}](https://repl.it/@MrAColley/23-Changing-Variables-Example-Solution)

\# Task1 - Add comments to the code to predict the output on lines 9, 10
and 14

name1 = \"Ross\"

name2 = \"Monica\"

name3 = \"Joey\"

name4 = \"Rachel\"

name5 = \"Chandler\"

print(name1 + \" and \" + name4)

print(name3)

name3 = \"Phoebe\"

print(name3)

\# Task 2 - Create a variable that stores the number 20. Output the
variable. Multiply the variable by 10. Output the variable.

\# Task 3 - Write a program that uses variables and decrements to output
a countdown from 10 to 0.

### Task 4 - Maths With Input

Task and instructions -
[[https://repl.it/\@MrAColley/24-Maths-With-Input]{.underline}](https://repl.it/@MrAColley/24-Maths-With-Input)

Example solution -
[[https://repl.it/\@MrAColley/24-Maths-With-Input-Example-Solution]{.underline}](https://repl.it/@MrAColley/24-Maths-With-Input-Example-Solution)

\# Task 1 - Add comments to predict what the code will do. Run the code
to see if you were correct.

num1 = int(input(\"Enter a number\"))

num2 = 10

result = num1 \* num2

print(result)

\# Task 2 - edit the code to convert the input to an integer.

### Task 5 - Homework Challenge - Area Calc

Example solution -
[[https://repl.it/\@MrAColley/25ChallengeExampleSolution]{.underline}](https://repl.it/@MrAColley/25ChallengeExampleSolution)

Create a program that allows the user to enter 2 numbers representing
the width and length of a rectangle. The program calculates and displays
the area of the rectangle.

### Extra Credit Challenges

Not compulsory, but great practice.

#### **PerimeterCalc**

Create a program that allows the user to enter 2 numbers representing
the width and length of a rectangle. The program calculates and displays
the perimeter of the rectangle.

#### **Restaurant Tip Calculator **

Create a program that allows the user to enter the price of a meal at a
restaurant. The program calculates the amount of the tip to be paid at
20%. The tip and total price are then displayed separately.

#### **Volume and Surface Calc** 

Create a program that allows the user to enter 3 numbers representing
the height, width and length of a cuboid. The program calculates and
displays the volume and total surface area of the cuboid.
