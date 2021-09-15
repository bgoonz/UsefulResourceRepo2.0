#!/bin/bash

#Shell takes commands in plaintxt and calls Operating System
#shell scripting is a full-fledged program, not just CLI commands

#Define variables, conditional logic, loops,...

#touch - create a file ex. "touch file.txt"
	#touch is binary file located in /bin of system
#ls - list files in a directory (also binary file in /bin)
	#-a flag show all
#BOTH of these files are executed from PATH


###################################################

#DECLARING VARIABLES
#Everything is a string. assign variables like 
NAME='Harrison Jansma'    #single quotes means string literal
#No spaces in between equals sign and value/varname
#BASH breaks string variables into seperate arguments for each space
args $NAME

#SAVING STDOUT OF COMMAND CALL
#If a command outputs to STDOUT you can save it to a variable
echo 'saving stdout to variable'
WORKING_DIR=$(pwd)    #$(command) executes the command and returns output
BASH_VERSION=`bash --version`  #`command` backticks do the same as above
echo $WORKING_DIR
echo $BASH_VERSION

#MULTILINE COMMAND
echo 'command 1';echo 'command 2';echo 'command 3'

#'STRING INTERPOLATION'
NAME='harrison'
echo 'single quotes: my name is $NAME'  #single quotes is string literal
echo "double quotes: mu name is $NAME"  #double quotes expands variables

#WILDCARD *
#* is a wildcard. When passed as an argument, * contains all files in current
#directory
touch 'example.txt'
echo *
echo bash*

#EXIT THE PROGRAM w exit
echo 'exit now? (y/n)'
read EXIT
if [ "$EXIT" -eq 'y' ];then
	exit
fi
echo 'continuing'



#LET COMMAND
#let evaluates the given statement string
let echo="1+1"

#expr COMMAND
#executes a commad which takes multiple arguments
RESULT=$(expr 30 \* 3) #each space creates an argument, expr concatenates and evaluates


# $((expression)) syntac can be used to perform arithmetic operations.
# can put spaces within expression
RESULT=$((1 + 1))
echo $RESULT
echo $((4 + 4))


########################################################

#IF-THEN STATEMENTS IN BASH
# test command is used to evaluate an expression, accepts a series of args
# 	that combine to make an expression, evaluates to 1=false or 0=true
# test has alias [, the final argument must be ]
[ 5 -eq 9 ]
echo $?

# For multi condition statements use && or ||
# (command) syntax runs the command in a subshell, slow


if [ 5 == 5 ];then
	echo "wow such math!"
fi

#UNKNOWN OPERATORS
# -z is string empty/null
# negate a condition with ! operator [ ! condition ]


#SEQUENCE GENERATION
echo $(seq 1 10)

############################################

#LOOPS IN BASH

#FOR LOOP
# for do done are required keywords for a for-looP1
for VAR_NAME in Hello world - Nice to meet you
do
	echo $VAR_NAME
done

touch example2.txt
# can loop around an commad output that returns a string
for FILE in `ls *.txt`   #or $(ls *.txt)
do
	echo "do something with $FILE"
done

#C++ BASH FOR SYNTAX
for (( i = 0; i < 4; i++ ))
do
	echo i
done

#WHILE LOOPUMBER=6
while [ $NUMBER < 9 ]
do
	echo "$((NUMBER++))"
done


#######################################################

#PATTERN MATCHING
ls *.txt    #glob pattern

# * -match any 0 or more characters
# ? -match any single character
# [...] -match one character inside brackets
# [start-end] -match any character in set a-zA-Z0-9
# [!...] -match one character not in brackets

########################################################

#POSITIONAL ARGUMENTS
# call a program with 
# bash program.sh
# or if shebang is added (#!/bin/bash)
# ./program

# $0 -position of program path
# $N - nth argument in function call

####################################################

#FUNCTIONS IN BASH
function name() {
	echo 'function call!'
}

#paramaters are passed with positional arguments
# functions have their own local scope for positional args

function name(){
	echo "argument1: $1"
	echo "argumnet2: $2"
}
name taco burrito

# variables declared within a function are written to the global scope

function name(){
	TACO=$1   		#Global scope
	local BURRITO=$2	#Local Scope
}

# functions can return values
get_random(){
	return $(( $RANDOM % 1 ))
}
get_random
echo get_random
echo `get_random`

#THE return of a function is meant to be a status code
# 0-255

###########################################################

#ARRAYS IN BASH
#arrays are list of strings that can be indexed

ARRAY=(taco burrito chelsea)
echo "${ARRAY[1]}"
echo $(ARRAY[2])

#capture array values with ${ARRAY[*]} syntax

######################################################
#w
#IMPORTING AN EXTERNAL SCRIPT
# source ./bashprogram.sh

#import a bash script wih source

#######################################################

# | is the pipe operator connects two streams
#connects STDOUT of first stream to STDIN of second



#to write output stream to a file use >
echo "hello" > example.txt
cat example.txt
#this will overwrite a file content if the file already exists or create a file otherwise

#to append the output to a file use >>
echo 'hello' >> example.txt
cat example.txt

# to redirect the content of a file to a command use <
# command < file.txt

###########################################################

# ENVIRONMENT VARIABLE
# environment variables  defined with the export command. saved in the namespace of the current terminal session
export taco=tacooo
printenv

#environment is to set global variables for sub-processes subsessions





