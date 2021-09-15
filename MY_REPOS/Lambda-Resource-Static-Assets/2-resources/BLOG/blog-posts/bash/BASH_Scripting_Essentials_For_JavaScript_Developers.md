# BASH Scripting Essentials For JavaScript Developers

> Originally posted on Linkedin.

![Image for post](https://miro.medium.com/max/60/1*ddpUq2hjAULKCgvfK3ChXA.png?q=20)

![Image for post](https://miro.medium.com/max/1600/1*ddpUq2hjAULKCgvfK3ChXA.png)

[![Florian GOTO](https://miro.medium.com/fit/c/96/96/1*dmbNkD5D-u45r44go_cf0g.png)](https://gotoflorian-pro.medium.com/?source=post_page-----ffef92afba2c--------------------------------)

Originally posted on [Linkedin](https://www.linkedin.com/pulse/bash-scripting-essentials-javascript-developers-florian-goto/).

These are skills every, I repeat every, JavaScript developer must take some time to get familiar with. These will help you make your life easier by creating automation scripts for your work on the back-end or source code management.

Underneath, when you write system code with Node.js, you execute these commands.

BASH is the scripting language of choice for Linux systems. It is available out of the box on most Linux distributions and MAC OS which runs on a Linux core. Other system-oriented scripting languages exist, in fact a lot but you can do fine without knowing them.

_\# set vim (tap the escape key)_ ":set number" = show line numbers  
       ":syntax on" = Syntax Highlighting  
       ":set tabstop=2" = spaces in tab  
       ":set autoindent" = Indent new lines_\# set the vimrc to avoid setting up vim everytime_ > echo $MYVIMRC = to find location of your vimrc file_\# vim cheatsheet =_ [_https://vim.rtorr.com/_](https://vim.rtorr.com/) 0 = go to beginning of line  
       $ = go to end of line  
       b = go to beginning of word  
       w = go to end of word  
       o = append new line and insert   
       i = insert where the cursor is located

Take a little time to memorize (by practicing) the most useful VIM shortcuts. VIM is available out of the box on most Linux distributions. It’s always great to have a code editor in the terminal. Also, VIM (as most things Linux) is completely customizable, via plugins to add features for JavaScript development (syntax highlighting and so on). Think of it as the tool of choice to edit code on servers where there’s no GUI. Here are some interesting links to configure VIM for JavaScript

We will write our bash commands in a file to make it more convenient but every command can run directly at your terminal command prompt.

To run a BASH script file you have to make it executable by the BASH interpreter. In your terminal, enter the following commands (the $ is the command prompt indicator, don’t type it):

_\# create an empty file, the .sh extension is not mandatory_  
$ touch mybashscript.sh  
_\# make the file executable by the owner (you)_  
$ sudo chmod 755 mybashscript.sh

The chmod command allows you to modify the permissions on files. Here is the meaning of the number

7 : Read, Write & Execute  
       6 : Read & Write  
       5 : Read & Execute  
       4 : Read Only  
       3 : Write & Execute  
       2 : Write Only  
       1 : Execute Only  
       0 : None

The position of the number refers to the owner (7), the group (5), everyone (5).

Now open the file with VIM

$ vim mybashscript.sh

type the letter ‘i’ to enter in insert mode, and enter the following code

echo "It's working my friend!"\# using Node in the terminal:  
\# node -e "console.log(\\"It's working my friend\\")"

save the file by taping the escape key and entering the following shortcut

_\# ':' to enter a shortcut,_   
_\# 'w' to save the file and_   
_\# 'q' to auit VIM_  
:wq

To execute your file, you can use the following command

_\# use the BASH interpreter, in case other shells are installed_  
_\# no need to make the file executable here_  
$ bash mybashscript.sh_\# or, will run the script through the default shell, usually BASH_  
_\# requires to make the file executable_  
$ ./mybashscript.sh

**Aside:** you can run Node scripts globally (like Shell scripts)without the ‘node’ command. For that you will add a ‘bin’ property inside package.json.

Inside the ‘bin’ object, add a property name that will identify the command to execute. As a value to that property, you will have the path to the JS file to execute.

_// package.json__...  
"bin": {  
  "printIt": "PATH\_TO\_JS\_FILE"  
}  
..._

That JS file will need to declare a shebang statement (“#!/usr/bin/env node”) pointing to the Node executable binary.

_// printit.js_#!/usr/bin/env nodeconsole.log("It’s working my friend!");

Then run :

npm i -g

This will install the printit module globally and you will be able to run ‘_printIt_’ directly in the terminal.

You’ll see the text “It’s working my friend!” printed in your terminal.

Basically, the standard output is what is printed in your terminal aka what you see. It’s a little more complex than that but you don’t need to know about that right now (some hardware interaction stuff).

So to print text in your terminal, you use the echo command, the “equivalent” of console.log() in your browser console (Node give you access to the stdout object through ‘process.stdout’).

_\# single quotes or double quotes in pairs_  
$ echo "I see you, you see me."

Back in your script file, enter the following code, save, quit VIM and execute

#!/bin/bash_\# no space before or after the = operator_  
_\# define a constant_  
declare -r NUM1=5_\# define a global variable_  
num2=6_\# use $ in front of the identifier_  
_\# arithmetic expansion = $((ARITHMETIC EXP))__\# prints: 5 + 6 = 11_  
echo "$NUM1 + $num2 = $((NUM1 + num2))"  
echo "$NUM1 - $num2 = $((NUM1 - num2))"  
echo "$NUM1 \* $num2 = $((NUM1 \* num2))"  
echo "$NUM1 / $num2 = $((NUM1 / num2))"

#!/bin/bashnum3=$((NUM1 + num2))  
num4=$((NUM1 - num2))  
num5=$((NUM1 \* num2))  
num6=$((NUM1 / num2))echo ""echo "5 + 4 = $num3"  
echo "5 - 4 = $num4"  
echo "5 \* 4 = $num5"  
echo "5 / 4 = $num6"  
echo "5 \*\* 2 = $(( 5\*\*2 ))"  
echo "5 % 4 = $(( 5%4 ))"\# In node:  
\# console.log("5 + 4 = %d", num3)   
\# OR console.log(\`5 + 4 = ${num3}\`);

They are +=, -=, \*=, /=, \*\*= and so on.

In order for the shorthand arithmetic operator to be interpreted as math, you need to use the let keyword. Otherwise, it will do string concatenation and assign it to the variable.

#!/bin/bashrand=15_\# use let for arithmetic shorthand operations_  
_\# equivalent to ((rand+=8))_  
let rand+=8  
echo "$rand"_\# Shorthand increment and decrement_  
echo "rand++ = $(( rand++ ))"  
echo "++rand = $(( ++rand ))"  
echo "rand-- = $(( rand-- ))"  
echo "--rand = $(( --rand ))"\# In node:  
\# console.log("rand = %s", rand) OR console.log(\`rand = ${rand}\`);

Using BASH for arithmetic operations with floating point numbers is not precise at all. It will return nonsensical data. So to add more precision, we can use Python which comes out of the box with most Linux distros.

#!/bin/bash

 _\# Using Python to add floats_  
 num7=13.2  
 num8=7.9  
 num9=$(python -c "print $num7+$num8")  
\# of course you can use Node for that  
\# num9=$(node -e "console.log($num7+$num8)")

 echo $num9_\# Using Python to multiply floats_  
num7=13.2  
num8=7.9  
num9=$(python -c "print $num7\*$num8")  
\# with Node:  
\# num9=$(node -e "console.log($num7\*$num8)")  
echo $num9

$ cat <<End-of-message  
\-------------------------------------  
This is line 1 of the message.  
This is line 2 of the message.  
This is line 3 of the message.  
This is line 4 of the message.  
\`this line will be evaluated\`  
This is the last line of the message.  
\-------------------------------------  
End-of-message

<< is an I/O redirection operator, it will print all the line until the limit string, here “End-of-message”. You run commands in the lines by surrounding them with \`\` and the evaluation of the command will be printed. To avoid executing commands surrounded by back ticks (\`\`), you must surround the limit string with single quotes.

$ cat <<'End-of-message'  
\`cmd will not be evaluated and printed as is\`  
End-of-message

This may be useful to create a new file by printing the lines to a file via another I/O redirection

$ cat > file.js <<End-of-message  
console.log("I'm in", \_\_dirname);  
End-of-message

  $ node file.js

A bit of a contrived example but it is essential to know about I/O redirection.

#!/bin/bash_\# Define function_  
 getDate() {             
   _\# Get current date and time_  
   date 

     _\# Return exit status between 0 - 255return_  
 }

 _\# no parentheses to execute the functions_  
 getDate

You can define local variables inside of a function

#!/bin/bash  
_\# global variable_  
my\_var="this is global"print\_scope(){  
  _\# local variablelocal my\_var="this is local"_ echo $my\_var return  
}_\# prints "is local"_  
print\_scope

If you declare a variable inside a function without the local keyword, it will be a globally accessible variable.

#!/bin/bashaddnumbers(){  
  _\# storing input args in local variables_ local num1=$1 local num2=$2 echo "$1 + $2 = $(($num1 + $num2))"

   return  
}

$1 represents the first argument entered after the command and so on.

_\# input arguments are separated by spaces_$ ./addnumbers.sh 8 17  
_\# prints "8 + 17 = 25"_

You can also pass input argument as variables

#!/bin/bashnum1=5  
num2=6...

        _\# You pass atributes by separating them with a space_  
_\# Surround function call with $() to get the return value_  
sum=$(addnumbers num1 num2)  
echo "The sum of $num1 and $num2 is $sum"

#!/bin/bashnodecmd='JSON.parse(process.argv\[1\]).length'  
postUrl='https://jsonplaceholder.typicode.com/posts'_\# you need to have node.js and curl installed of course_  
fetcheddata=$(node -pe $nodecmd  "$(curl -s $postUrl)")  
_\# You place your condition with in \[\]_  
_\# Include a space after \[ and before \]_  
_\# Integer Comparisons:_   
_\# eq (equal), ne (not equal),_   
_\# le  (less than or equal), ge (greater than or equal)_  
_\# lt (less than), gt (greater than)_  
if \[ $fetcheddata -ge 99 \]  
thenecho "Enough data"

        _\# Check another condition_  
elif \[ $fetcheddata -eq 98 \]  
thenecho "Not enough data"

                _\# Executed by default_  
elseecho "No data provided"

          _\# Closes the if statement_  
fi

Above a practical example how to use Node.js and BASH in combination. Of course, you could do all this within Node.js, but the point is to open your mind to programming with different language constructs together. It could be Python and BASH, etc. I hope you get the point.

#!/bin/bash_\# to ask the user for input_  
_\# the user input stored in num global variable_  
read -p "Enter a number : " num if ((num == 66)); then  
     echo "Your number equals 66"  
fi

        if ((num > 30)); then  
     echo "It is greater then 30"  
else  
     echo "It is less then 30"  
fi

#!/bin/bashread -p "Enter a numbeer" numif (( ((num % 2)) == 0 )); then  
    echo " It is even"  
fi_\# logical operators like &&, || and !_  
if (( ((num > 0)) && ((num < 11)) )); then  
    echo "$num is between 1 and 10"  
fi_\# && and || can be used as control structures__\# Create a file_   
_\# and then if that worked open it with Vim_  
touch my\_file && vim my\_file_\# If my\_dir doesn't exist create it_  
\[ -d my\_dir \] || mkdir my\_dir_\# Delete file_   
rm my\_file_\# Delete directory_  
rmdir my\_dir

#!/bin/bashstr1=""  
str2="JavaScript"  
str3="Python"  
_\# Test if a string is empty_  
if \[ "$str1" \]; then  
    echo "$str1 is not empty"  
fiif \[ -z "$str1" \]; then  
    echo "str1 has no value"  
fi_\# Check for equality_  
if \[ "$str2" == "$str3" \]; then  
    echo "$str2 equals $str3"  
elif \[ "$str2" != "$str3" \]; then  
    echo "$str2 is not equal to $str3"  
fiif \[ "$str2" > "$str3" \]; then  
    echo "$str2 is greater then $str3"  
elif \[ "$str2" < "$str3" \]; then  
    echo "$str2 is less then $str3"  
fi

file1="./my\_script1"  
file2="./my\_script2"if \[ -e"$file1" \]; then  
echo "$file1 exists"if \[ -f "$file1" \]; then  
    echo "$file1 is a normal file"  
fiif \[ -r "$file1" \]; then  
    echo "$file1 is readable"  
fiif \[ -w "$file1" \]; then  
    echo "$file1 is writable"  
fiif \[ -x "$file1" \]; then  
    echo "$file1 is executable"  
fiif \[ -d "$file1" \]; then  
    echo "$file1 is a directory"  
fiif \[ -L "$file1" \]; then  
    echo "$file1 is a symbolic link"  
fiif \[ -p "$file1" \]; then  
    echo "$file1 is a named pipe"  
fiif \[ -S "$file1" \]; then  
    echo "$file1 is a network socket"  
fiif \[ -G "$file1" \]; then  
    echo "$file1 is owned by the group"  
fiif \[ -O "$file1" \]; then  
    echo "$file1 is owned by the userid"  
fi

#!/bin/bashread -p "Validate Date : " datepattern="^\[0-9\]{8}$"if \[\[ $date =~ $pattern \]\]; then  
    echo "$date is valid"  
else  
    echo "$date is not valid"  
fiHiding the user input#!/bin/bashread -sp "Enter the Secret Code" secretif \[ "$secret" == "password" \]; then  
    echo "Open Sesame"  
else  
    echo "Wrong Password"  
fi

#!/bin/bash_\# Store the original value of IFS_  
OIFS="$IFS"_\# Set what separates the input values_  
IFS=","read -p "Enter 2 numbers separated by a comma" num1 num2_\# Use the parameter expansion ${} to substitute any whitespace_  
_\# with nothing_  
num1=${num1//\[\[:blank:\]\]/}  
num2=${num2//\[\[:blank:\]\]/}sum=$((num1+num2))echo "$num1 + $num2 = $sum"_\# Reset IFS to the original value_  
IFS="$OIFS"

#!/bin/bashname="Florian"  
echo "${name}'s Article"_\# The search and replace_  
a\_string="I'm writing an article about BASH for JavaScript developers"  
echo "${a\_string//BASH/Python}"_\# You can assign a default value_  
echo "I am ${name:-Florian}"_\# This uses the default if it doesn't exist_   
_\# and assigns the value_  
_\# to the variable_  
echo "I am ${name:=Florian}"  
echo $name

case $age in_\# Match numbers 0 - 4_  
\[0-4\])   
    echo "To young for school"  
    ;; _\# break case checking_

    _\# Match only 5_  
5)  
    echo "Go to kindergarten"  
    ;;

    _\# Check 6 - 18_  
\[6-9\]|1\[0-8\])  
    grade=$((age-5))  
    echo "Go to grade $grade"  
    ;;

    _\# Default action_  
\*)  
    echo "You are to old for school"  
    ;;

_\# End case statement_  
esac

#!/bin/bashcan\_code=0  
age=18((age>=10?(can\_code=1):(can\_code=0)))  
echo "Can Code : $can\_code"

#!/bin/bashrand\_str="A random string"_\# Get string length_  
echo "String Length : ${#rand\_str}"_\# Get string slice starting at index 2_  
echo "${rand\_str:2}"_\# Get string with starting and ending index_  
echo "${rand\_str:2:7}"_\# Return whats left after A_  
echo "${rand\_str#\*A }"

#!/bin/bash  
_\# ------------- While loop ----------_num=1  
while \[ $num -le 10 \]; do  
    echo $num  
    num=$((num + 1))  
done  
_\# ------------- Continue and Break ----------_  
num=1while \[ $num -le 20 \]; do _\# Don't print evens_  
    if (( ((num % 2)) == 0 )); then  
        num=$((num + 1))  
        continue  
    fi

        _\# Jump out of the loop with break_  
    if ((num >= 15)); then  
        break  
    fi

        echo $num  
    num=$((num + 1))  
done_\# ------------- Until loop ----------_  
num=1until \[ $num -gt 10 \]; do  
    echo $num  
    num=$((num + 1))  
done

#!/bin/bashwhile read num x2 x3; do _\# printf allows you to use \\n_  
    printf "${num}\\t${x2}\\t${x3}\\n"_\# Redirect data to STDin into the while loop_  
_\# imagine that this is the response of an REST API or printing a file_  
done <<EOF  
NUMBER  DOUBLE  TRIPLE  
22      44      66  
33      66      99  
44      88      132  
55      110     165  
66      132     198  
77      154     231  
88      176     264  
99      198     297  
110     220     330  
121     242     363  
132     264     396  
143     286     429  
EOF

#!/bin/bashfor (( i=0; i <= 10; i=i+1 )); do_\# echo will add a newline at the end# printf does not_  
    printf "$i "  
done_\# act as a newline between loops_  
echo ""_\# looping over ranges_  
for letter in {A..Z}; do  
    printf "$letter "  
doneecho ""

Bash arrays can only be one dimensional and zero-indexed.

#!/bin/bash_\# Create an array_  
fav\_nums=(3.14 2.718 .57721 4.6692)echo "Pi : ${fav\_nums\[0\]}"_\# Add value to array_  
fav\_nums\[4\]=1.618echo "GR : ${fav\_nums\[4\]}"_\# Add group of values to array_  
fav\_nums+=(1 7)printf "\\n---- Array Values ----\\n\\n"_\# Output all array values_  
for i in ${fav\_nums\[\*\]}; do  
        echo $i;  
doneprintf "\\n---- Indexes -----\\n\\n"  
_\# Output indexes_  
for i in ${!fav\_nums\[@\]}; do  
        echo $i;  
done_\# Get length (number of items) in array_  
echo "Array Length : ${#fav\_nums\[@\]}"_\# Get length of array element_  
echo "Index 3 length : ${#fav\_nums\[3\]}"printf "\\n---- Sorted Array ----\\n\\n"_\# Sort an array_  
sorted\_nums=($(for i in "${fav\_nums\[@\]}"; do  
        echo $i;  
done | sort))for i in ${sorted\_nums\[\*\]}; do  
        echo $i;  
done_\# Delete array element_  
unset 'sorted\_nums\[1\]'_\# Delete Array_  
unset sorted\_nums

Positional parameters are variables that can store data from the command line in variable names 0 to 9.

$0 always contains the relative path to the executed script.

You can access argument names after 9 by using parameter expansion like this ${10}

#!/bin/bash_\# print the relative path of this script_  
echo $0_\# Print argumen_  
echo "1st Argument : $1"  
echo "2nd Argument : $2"  
sum=0_\# $# tells you the number of arguments_  
while \[\[ $# -gt 0 \]\]; do _\# Get the first argument_  
    num=$1  
    sum=$((sum + num))

        _\# shift moves the value of $2 into $1 until none are left_  
    _\# The value of $# decrements as well_  
    shift  
doneecho "Sum : $sum"

To delete all the lines in your file. enter the following sequence

_\# gg to go to the first line of the file_  
_\# dG to erase all lines_  
gg dG

That was a long article and now you know enough to be dangerous at the command line and have an understanding of what Node.js does in the background when interacting with the system.

My Packt courses:


[Source](https://itnext.io/bash-scripting-essentials-for-javascript-developers-ffef92afba2c)