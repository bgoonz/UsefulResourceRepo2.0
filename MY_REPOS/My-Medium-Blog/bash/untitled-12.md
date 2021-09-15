# Bash Proficiency In Under 15 Minutes

## Bash Proficiency In Under 15 Minutes <a id="a0af"></a>

### Cheat sheet and in-depth explanations located below main article contents… The UNIX shell program interprets user commands, which are either directly entered by the user, or which can be read from a file called the shell script or shell program. Shell scripts are interpreted, not compiled. The shell reads commands from the script line per line and searches for those commands on the system while a compiler converts a program into machine readable form, an executable file. <a id="4f0e"></a>

## LIFE SAVING PROTIP: <a id="19ee"></a>

## A nice thing to do is to add on the first line <a id="e7e4"></a>

```text
#!/bin/bash -x
```

### Here’s a REPL with some examples for you to practice…. <a id="3991"></a>

> ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ below motivational monologue ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

_**Remember: learning is an effortful activity… it’s not comfortable… practice might be unpleasant but if you don’t you might as well skip reading too because without application… reading articles just provides a false sense of accomplishment….**_

> [quote by: … **me** 1 minute ago](https://resume.github.io/?bgoonz) \(inspired by veritasium….\)

## Aforementioned Repl: <a id="e1e8"></a>

## [Navigate the file system](https://egghead.io/lessons/bash-navigate-the-filesystem-in-bash) <a id="a8bc"></a>

### Change bash’s current working directory <a id="ec88"></a>

```text
cd <file path here>
# to go up a directory from your current directory
cd ..
```

### List a directory’s contents <a id="104e"></a>

```text
ls
# for more details, add -l (long)
ls -l
# this will output something like this:
# -rw-r--r--  1 cameronnokes  staff  1237 Jun  2 22:46 index.js
# in order, those columns are:
#   permissions for you, your group, all
#   number of links (hardlinks & softlinks)
#   owner user
#   owner group
#   file size
#   last modified time
#   file name
```

```text
# to see hidden files/folders (like .git or .npmignore)
ls -a
# Note, flags can be combined like so
ls -la
```

## [View files and folders in bash](https://egghead.io/lessons/bash-view-files-and-folders-in-bash) <a id="c9da"></a>

### Output a file to the screen \(stdout\) <a id="2a0a"></a>

```text
cat <file name>
# shows it with line numbers
cat -n <file name>
```

### View a file in bash <a id="818a"></a>

```text
# view the file without dumping it all onto your screen
less <file name>
# Some useful shortcuts in less
#   Shift+g   (jump to end)
#   g         (go back to top)
#   /         (search)
#   q         (quit/close)
```

### View file/folder in default application associated with it <a id="408f"></a>

```text
open <file/folder name>
# view current directory in Finder
open .
# specify an application to use
open <file name> -a TextEdit
```

![](https://cdn-images-1.medium.com/max/800/0*LKzjKI9gdjBFE851.png)folder structure

## [Create and delete files and folders](https://egghead.io/lessons/bash-create-and-delete-files-and-folders-in-bash) <a id="e322"></a>

### Create a file <a id="bace"></a>

```text
touch <file name>
```

### Set or append to a file <a id="dfa6"></a>

```text
# set the file's contents
echo 'hi' > file.txt
# append to file's contents
echo 'hi' >> file.txt
# note that if you pass a file name that doesn't exist, it'll get created on the fly
```

### Create a directory <a id="4a13"></a>

```text
mkdir <folder name>
# make intermediary directories as needed
mkdir -p parent/child/grandchild
```

### Remove a file <a id="dbaa"></a>

```text
# Note, this permanently deletes a file
rm <file name>
# Remove a folder and it's contents, recursively
rm -rf <folder name>
```

## [Move and Copy Files and Folders with bash](https://egghead.io/lessons/bash-move-and-copy-files-and-folders-with-bash) <a id="0ad8"></a>

### Move a file <a id="e4d5"></a>

```text
mv <target> <destination>
# for example, to rename a file
mv a.js b.js
# move all files in a folder to another folder
mv lib/* src
```

### Copy a file <a id="358f"></a>

```text
cp <target> <destination>
# copy everything recursively from one folder to another
cp -R src/* lib
```

## [Find Files and Folders with](https://egghead.io/lessons/bash-find-files-and-folders-with-find-in-bash) [`find`](https://egghead.io/lessons/bash-find-files-and-folders-with-find-in-bash) [in bash](https://egghead.io/lessons/bash-find-files-and-folders-with-find-in-bash) <a id="3a3e"></a>

![](https://cdn-images-1.medium.com/max/800/0*3hXVYnYPTLCQHe0f.jpg)find

```text
# find all the PNGs in a folder
find <path> -name "*.png"
# find all the JPGs (case insensitive) in a folder
find <path> -iname "*.jpg"
# find only directories
find <path> -type d
# delete all matching files
find <path> -name "*.built.js" -delete
# execute an arbitrary action on each match
# remember `{}` will be replaced with the file name
find <path> -name "*.png" -exec pngquant {} \;
```

## [Search for text with ](https://egghead.io/lessons/grep-search-for-text-with-grep)[`grep`](https://egghead.io/lessons/grep-search-for-text-with-grep) <a id="9e79"></a>

```text
# Basic usage
grep <pattern> <target file or glob>
# Useful flags
# --color     (colorizes matches)
# -n          (show line numbers)
# -C <number> (show N lines above/below match for context)
# -e          (regex search)
```

## [Make HTTP requests in bash with ](https://egghead.io/lessons/http-make-http-requests-in-bash-with-curl)[`curl`](https://egghead.io/lessons/http-make-http-requests-in-bash-with-curl) <a id="b403"></a>

![](https://cdn-images-1.medium.com/max/800/0*YmLsGKSXYDZ_vzMp.png)http

The test server is available in the `curl-practice-server` directory. Run `npm install && npm start` to run it.

```text
curl <url>
# Useful flags
# -i    (show response headers only)
# -L    (follow redirects)
# -H    (header flag)
# -X    (set HTTP method)
# -d    (request body)
# -o    (output to a file)
```

```text
# to POST JSON
# (technically you don't need -X POST because -d will make it POST automatically, but I like to be explicit)
curl -X POST -H "Content-Type: application/json" -d '{ "title": "Curling" }' http://localhost:3000/api/posts
```

```text
# POST a url encoded form
curl -X POST --data-urlencode title="Curling again" http://localhost:3000/api/posts
```

```text
# multiline curl (applies to any bash command)
curl -i -X PUT \
-d '{ "title": "Changed title" }' \
-H "Content-Type: application/json" \
http://localhost:3000/api/posts
```

```text
# pretty print JSON with jsome
curl https://swapi.co/api/people/1/ | jsome
```

Here’s the [jsome](https://www.npmjs.com/package/jsome) package that pretty prints JSON

## [Create and run bash scripts](https://egghead.io/lessons/bash-create-and-run-bash-scripts) <a id="10bd"></a>

![](https://cdn-images-1.medium.com/max/800/0*AC9okBRPVFBSHpwv.png)bash scripting

```text
echo 'echo Hello World' > script.sh
chmod u+x script.sh
./script.sh
```

The `init-js.sh` script for scaffolding a JS project

```text
echo "Initializing JS project at $(pwd)"
git init
npm init -y # create package.json with all the defaults
mkdir src
touch index.js
code .
```

One way to add that script to your `$PATH`:

```text
cp init-js.sh /usr/local/bin/init-js
```

## [Store and Use Values with bash Variables](https://egghead.io/lessons/bash-store-and-use-values-with-bash-variables) <a id="47ac"></a>

```text
# no spaces between name, =, and value
var=123
echo $var
# to make it accessible to all child processes of current shell, export it
export var
# this deletes the variable
unset var
```

To see all environment variables

```text
env
```

`clone-to-temp.sh` script:

```text
temp=$(mktemp -d)
git clone --branch $1 $PWD $temp
echo "branch $1 cloned to $temp"
# run some tasks, tests, etc here
```

## [Understand and use functions in bash](https://egghead.io/lessons/bash-understand-and-use-functions-in-bash) <a id="7ef2"></a>

```text
greet() {
  echo "$1 world"
}
```

```text
greeting=$(greet "howdy")
```

```text
echo "the greeting is $greeting"
```

```text
global=123
```

```text
test() {
  echo "global = $global"
  local local_var="i'm a local"
  echo "local_var = $local_var"
}
```

```text
test
```

```text
echo "global = $global"
echo "local_var = $local_var" # will be empty because it's out of scope
```

## [Understand exit statuses in bash](https://egghead.io/lessons/bash-understand-exit-statuses-in-bash) <a id="1edc"></a>

Get the last run command’s exit status

```text
ls
# will be 0 if it ran successfully, 1 - 255 for an error
echo $?
```

Exit statuses and functions. `script.sh`

```text
ok() {
  return 0
}
```

```text
fail() {
  return 1
}
```

```text
fail
ok
```

```text
./script.sh
echo $? # exit status is same as the last run function/command
```

## [Use Conditional Statements in bash](https://egghead.io/lessons/bash-use-conditional-statements-in-bash) <a id="dcbd"></a>

Basic form

```text
# Some conditional primaries that can be used in the if expression:
#   =, !=      string (in)equality
#   -eq, -ne   numeric (in)equality
#   -lt, -gt   less/greater than
#   -z         check variable is not set
#   -e         check file/folder exists
```

```text
if [[ $USER = 'cameronnokes' ]]; then
  echo "true"
else
  echo "false"
fi
```

Conditionals can be used inline in a more ternary-like format

```text
[[ $USER = 'cameronnokes' ]] && echo "yes" || echo "no"
```

`check-status.sh` for checking a URL is responding with a 200

```text
check_status() {
  local status=$(curl -ILs $1 | head -n 1 | cut -d ' ' -f 2)
  if [[ $status -lt 200 ]] || [[ $status -gt 299 ]]; then
    echo "$1 failed with a $status"
    return 1
  else
    echo "$1 succeeded with a $status"
  fi
}
```

```text
check_status https://example.org
check_status https://example.org/404
```

## [Chain Commands with Pipes and Redirect Output in bash](https://egghead.io/lessons/bash-chain-commands-with-pipes-and-redirect-output-in-bash) <a id="4260"></a>

Pipes

```text
# ps ax will list all running processes
ps ax | grep Chrome | less
# get the file size after uglify + gzip
uglifyjs -c -m -- index.js | gzip -9 | wc -c
```

Redirection

```text
# redirect stdout to a file
ls > ls.txt
# append stdout to a file
echo "hi" >> ls.txt
```

## Update\(Utility Commands\): <a id="f4ab"></a>

_**Find files that have been modified on your system in the past 60 minutes**_

```text
find / -mmin 60 -type f
```

_**Find all files larger than 20M**_

```text
find / -type f -size +20M
```

_**Find duplicate files \(based on MD5 hash\)**_

```text
find -type f -exec md5sum '{}' ';' | sort | uniq --all-repeated=separate -w 33
```

_**Change permission only for files**_

```text
cd /var/www/site && find . -type f -exec chmod 766 {} \;
cd /var/www/site && find . -type f -exec chmod 664 {} +
```

_**Change permission only for directories**_

```text
cd /var/www/site && find . -type d -exec chmod g+x {} \;
cd /var/www/site && find . -type d -exec chmod g+rwx {} +
```

_**Find files and directories for specific user/group**_

```text
# User:
find . -user <username> -print
find /etc -type f -user <username> -name "*.conf"
```

```text
# Group:
find /opt -group <group>
find /etc -type f -group <group> -iname "*.conf"
```

_**Find files and directories for all without specific user/group**_

```text
# User:
find . \! -user <username> -print
```

```text
# Group:
find . \! -group <group>
```

_**Looking for files/directories that only have certain permission**_

```text
# User
find . -user <username> -perm -u+rw # -rw-r--r--
find /home -user $(whoami) -perm 777 # -rwxrwxrwx
```

```text
# Group:
find /home -type d -group <group> -perm 755 # -rwxr-xr-x
```

_**Delete older files than 60 days**_

```text
find . -type f -mtime +60 -delete
```

_**Recursively remove all empty sub-directories from a directory**_

```text
find . -depth  -type d  -empty -exec rmdir {} \;
```

_**How to find all hard links to a file**_

```text
find </path/to/dir> -xdev -samefile filename
```

_**Recursively find the latest modified files**_

```text
find . -type f -exec stat --format '%Y :%y %n' "{}" \; | sort -nr | cut -d: -f2- | head
```

_**Recursively find/replace of a string with sed**_

```text
find . -not -path '*/\.git*' -type f -print0 | xargs -0 sed -i 's/foo/bar/g'
```

_**Recursively find/replace of a string in directories and file names**_

```text
find . -depth -name '*test*' -execdir bash -c 'mv -v "$1" "${1//foo/bar}"' _ {} \;
```

_**Recursively find suid executables**_

```text
find / \( -perm -4000 -o -perm -2000 \) -type f -exec ls -la {} \;
```

## Here’s My Github & Website … feel free to reach out! <a id="22b2"></a>

## Explanations: <a id="d8ea"></a>

## Pipes <a id="662c"></a>

Pipes let you use the output of a program as the input of another one

## simple pipe with sed <a id="de45"></a>

This is very simple way to use pipes.

```text
ls -l | sed -e "s/[aeio]/u/g"
```

Here, the following happens: first the command ls -l is executed, and it’s output, instead of being printed, is sent \(piped\) to the sed program, which in turn, prints what it has to.

## an alternative to ls -l \*.txt <a id="d95d"></a>

Probably, this is a more difficult way to do ls -l \*.txt, but this is for educational purposes.

```text
ls -l | grep "\.txt$"
```

> Here, the output of the program ls -l is sent to the grep program, which, in turn, will print lines which match the regex “.txt$”.

## Variables <a id="5ce2"></a>

You can use variables as in any programming languages. There are no data types. A variable in bash can contain a number, a character, a string of characters.

You have no need to declare a variable, just assigning a value to its reference will create it.

## Hello World! using variables <a id="6522"></a>

```text
#!/bin/bash
            STR="Hello World!"
            echo $STR
```

Line 2 creates a variable called STR and assigns the string “Hello World!” to it. Then the VALUE of this variable is retrieved by putting the ‘$’ in at the beginning. Please notice \(try it!\) that if you don’t use the ‘$’ sign, the output of the program will be different, and probably not what you want it to be.

## A very simple backup script \(little bit better\) <a id="bd74"></a>

```text
#!/bin/bash
           OF=/var/my-backup-$(date +%Y%m%d).tgz
           tar -cZf $OF /home/me/
```

> This script introduces another thing. First of all, you should be familiarized with the variable creation and assignation on line 2. Notice the expression ‘$\(date +%Y%m%d\)’. If you run the script you’ll notice that it runs the command inside the parenthesis, capturing its output.
>
> Notice that in this script, the output filename will be different every day, due to the format switch to the date command\(+%Y%m%d\). You can change this by specifying a different format.

**examples**:

_echo ls_

_echo $\(ls\)_

## Local variables <a id="016f"></a>

Local variables can be created by using the keyword _local_.

```text
#!/bin/bash
                HELLO=Hello
                function hello {
                        local HELLO=World
                        echo $HELLO
                }
                echo $HELLO
                hello
                echo $HELLO
```

## Basic conditional example if .. then <a id="b0f6"></a>

![](https://cdn-images-1.medium.com/max/800/0*V2XDOXCJO2I8qYBK.jpg)

```text
#!/bin/bash
            if [ "foo" = "foo" ]; then
               echo expression evaluated as true
            fi
```

_The code to be executed if the expression within braces is true can be found after the ‘then’ word and before ‘fi’ which indicates the end of the conditionally executed code._

## Basic conditional example if .. then … else <a id="4d49"></a>

```text
#!/bin/bash
            if [ "foo" = "foo" ]; then
               echo expression evaluated as true
            else
               echo expression evaluated as false
            fi
```

## Conditionals with variables <a id="1bba"></a>

```text
#!/bin/bash
            T1="foo"
            T2="bar"
            if [ "$T1" = "$T2" ]; then
                echo expression evaluated as true
            else
                echo expression evaluated as false
            fi
```

## Loops <a id="a6ef"></a>

* _**for**_
* _**while**_

> \(there’s another loop called until but I don’t use it so you can look it up if you’d like\)
>
> _**The until loop is almost equal to the while loop, except that the code is executed while the**_ [_**control expression**_](https://www.cs.fsu.edu/~myers/c++/notes/control1.html) _**evaluates to false.**_

The **for** loop is a little bit different from other programming languages. Basically, it let’s you iterate over a series of ‘words’ within a string.

The **while** executes a piece of code if the control expression is true, and only stops when it is false …or a explicit break is found within the executed code.

## For <a id="d906"></a>

```text
#!/bin/bash
        for i in $( ls ); do
            echo item: $i
        done
```

> On the second line, we declare i to be the variable that will take the different values contained in $\( ls \).
>
> The third line could be longer if needed, or there could be more lines before the done \(4\).
>
> ‘done’ \(4\) indicates that the code that used the value of $i has finished and $i can take a new value.
>
> A more useful way to use the for loop would be to use it to match only certain files on the previous example

## While <a id="c2ac"></a>

```text
#!/bin/bash
         COUNTER=0
         while [  $COUNTER -lt 10 ]; do
             echo The counter is $COUNTER
             let COUNTER=COUNTER+1
         done
```

## Functions <a id="343a"></a>

As in almost any programming language, you can use functions to group pieces of code in a more logical way or practice the divine art of recursion.

Declaring a function is just a matter of writing function my\_func { my\_code }.

Calling a function is just like calling another program, you just write its name.

## Functions ex.\) <a id="5c07"></a>

```text
#!/bin/bash
           function quit {
               exit
           }
           function hello {
               echo Hello!
           }
           hello
           quit
           echo foo
```

> Lines 2–4 contain the ‘quit’ function. Lines 5–7 contain the ‘hello’ function If you are not absolutely sure about what this script does, please try it!.
>
> Notice that a functions don’t need to be declared in any specific order.
>
> When running the script you’ll notice that first: the function ‘hello’ is called, second the ‘quit’ function, and the program never reaches line 10.

## Functions with parameters <a id="1ec4"></a>

```text
#!/bin/bash
                function quit {
                   exit
                }
                function e {
                    echo $1
                }
                e Hello
                e World
                quit
                echo foo
```

## Backup Directory Script: <a id="4ebb"></a>

```text
#!/bin/bash
            SRCD="/home/"
            TGTD="/var/backups/"
            OF=home-$(date +%Y%m%d).tgz
            tar -cZf $TGTD$OF $SRCD
```

## File Renamer: <a id="11ad"></a>

## Bonus Commands: <a id="295b"></a>

### Included in a gist below \(so you can see them syntax highlighted..\) I am also including them in text so that they might turn up as a result of google searches … I have a hunch that google’s SEO rankings don’t put much emphasis on the content of github gists. <a id="825f"></a>

## Example <a id="28a3"></a>

```text
#!/usr/bin/env bash
```

```text
NAME="John"
echo "Hello $NAME!"
```

## Variables <a id="3f1c"></a>

```text
NAME="John"
echo $NAME
echo "$NAME"
echo "${NAME}!"
```

## String quotes <a id="4bf0"></a>

```text
NAME="John"
echo "Hi $NAME"  #=> Hi John
echo 'Hi $NAME'  #=> Hi $NAME
```

## Shell execution <a id="840e"></a>

```text
echo "I'm in $(pwd)"
echo "I'm in `pwd`"
# Same
```

See [Command substitution](http://wiki.bash-hackers.org/syntax/expansion/cmdsubst)

## Conditional execution <a id="8963"></a>

```text
git commit && git push
git commit || echo "Commit failed"
```

## Functions <a id="6d46"></a>

{: id=’functions-example’}

```text
get_name() {
  echo "John"
}
```

```text
echo "You are $(get_name)"
```

See: [Functions](https://bryanguner.medium.com/media/2ab9392fe0f579fca234dcdc71259b1c#functions)

## Conditionals <a id="548b"></a>

{: id=’conditionals-example’}

```text
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
fi
```

See: [Conditionals](https://bryanguner.medium.com/media/2ab9392fe0f579fca234dcdc71259b1c#conditionals)

## Strict mode <a id="0d85"></a>

```text
set -euo pipefail
IFS=$'\n\t'
```

See: [Unofficial bash strict mode](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

## Brace expansion <a id="c8c0"></a>

```text
echo {A,B}.js
```

ExpressionDescription`{A,B}`Same as `A B{A,B}.js`Same as `A.js B.js{1..5}`Same as `1 2 3 4 5`

See: [Brace expansion](http://wiki.bash-hackers.org/syntax/expansion/brace)

## Parameter expansions <a id="5379"></a>

{: .-three-column}

## Basics <a id="d081"></a>

```text
name="John"
echo ${name}
echo ${name/J/j}    #=> "john" (substitution)
echo ${name:0:2}    #=> "Jo" (slicing)
echo ${name::2}     #=> "Jo" (slicing)
echo ${name::-1}    #=> "Joh" (slicing)
echo ${name:(-1)}   #=> "n" (slicing from right)
echo ${name:(-2):1} #=> "h" (slicing from right)
echo ${food:-Cake}  #=> $food or "Cake"
```

```text
length=2
echo ${name:0:length}  #=> "Jo"
```

See: [Parameter expansion](http://wiki.bash-hackers.org/syntax/pe)

```text
STR="/path/to/foo.cpp"
echo ${STR%.cpp}    # /path/to/foo
echo ${STR%.cpp}.o  # /path/to/foo.o
echo ${STR%/*}      # /path/to
```

```text
echo ${STR##*.}     # cpp (extension)
echo ${STR##*/}     # foo.cpp (basepath)
```

```text
echo ${STR#*/}      # path/to/foo.cpp
echo ${STR##*/}     # foo.cpp
```

```text
echo ${STR/foo/bar} # /path/to/bar.cpp
```

```text
STR="Hello world"
echo ${STR:6:5}   # "world"
echo ${STR: -5:5}  # "world"
```

```text
SRC="/path/to/foo.cpp"
BASE=${SRC##*/}   #=> "foo.cpp" (basepath)
DIR=${SRC%$BASE}  #=> "/path/to/" (dirpath)
```

## Substitution <a id="b0cd"></a>

CodeDescription`${FOO%suffix}`Remove suffix`${FOO#prefix}`Remove prefix------`${FOO%%suffix}`Remove long suffix`${FOO##prefix}`Remove long prefix------`${FOO/from/to}`Replace first match`${FOO//from/to}`Replace all------`${FOO/%from/to}`Replace suffix`${FOO/#from/to}`Replace prefix

## Comments <a id="b0be"></a>

```text
# Single line comment
```

```text
: '
This is a
multi line
comment
'
```

## Substrings <a id="4330"></a>

ExpressionDescription`${FOO:0:3}`Substring _\(position, length\)_`${FOO:(-3):3}`Substring from the right

## Length <a id="53d0"></a>

ExpressionDescription`${#FOO}`Length of `$FOO`

## Manipulation <a id="e319"></a>

```text
STR="HELLO WORLD!"
echo ${STR,}   #=> "hELLO WORLD!" (lowercase 1st letter)
echo ${STR,,}  #=> "hello world!" (all lowercase)
```

```text
STR="hello world!"
echo ${STR^}   #=> "Hello world!" (uppercase 1st letter)
echo ${STR^^}  #=> "HELLO WORLD!" (all uppercase)
```

## Default values <a id="2c10"></a>

ExpressionDescription`${FOO:-val}$FOO`, or `val` if unset \(or null\)`${FOO:=val}`Set `$FOO` to `val` if unset \(or null\)`${FOO:+val}val` if `$FOO` is set \(and not null\)`${FOO:?message}`Show error message and exit if `$FOO` is unset \(or null\)

Omitting the `:` removes the \(non\)nullity checks, e.g. `${FOO-val}` expands to `val` if unset otherwise `$FOO`.

## Loops <a id="ba75"></a>

{: .-three-column}

## Basic for loop <a id="8476"></a>

```text
for i in /etc/rc.*; do
  echo $i
done
```

## C-like for loop <a id="a117"></a>

```text
for ((i = 0 ; i < 100 ; i++)); do
  echo $i
done
```

## Ranges <a id="a25b"></a>

```text
for i in {1..5}; do
    echo "Welcome $i"
done
```

### With step size <a id="914d"></a>

```text
for i in {5..50..5}; do
    echo "Welcome $i"
done
```

## Reading lines <a id="d9fe"></a>

```text
cat file.txt | while read line; do
  echo $line
done
```

## Forever <a id="7df1"></a>

```text
while true; do
  ···
done
```

## Functions <a id="a71e"></a>

{: .-three-column}

## Defining functions <a id="279e"></a>

```text
myfunc() {
    echo "hello $1"
}
```

```text
# Same as above (alternate syntax)
function myfunc() {
    echo "hello $1"
}
```

```text
myfunc "John"
```

## Returning values <a id="7271"></a>

```text
myfunc() {
    local myresult='some value'
    echo $myresult
}
```

```text
result="$(myfunc)"
```

## Raising errors <a id="836c"></a>

```text
myfunc() {
  return 1
}
```

```text
if myfunc; then
  echo "success"
else
  echo "failure"
fi
```

## Arguments <a id="6878"></a>

ExpressionDescription`$#`Number of arguments`$*`All postional arguments \(as a single word\)`$@`All postitional arguments \(as separate strings\)`$1`First argument`$_`Last argument of the previous command

**Note**: `$@` and `$*` must be quoted in order to perform as described. Otherwise, they do exactly the same thing \(arguments as separate strings\).

See [Special parameters](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

## Conditionals <a id="5e16"></a>

{: .-three-column}

## Conditions <a id="cc8f"></a>

Note that `[[` is actually a command/program that returns either `0` \(true\) or `1` \(false\). Any program that obeys the same logic \(like all base utils, such as `grep(1)` or `ping(1)`\) can be used as condition, see examples.

ConditionDescription`[[ -z STRING ]]`Empty string`[[ -n STRING ]]`Not empty string`[[ STRING == STRING ]]`Equal`[[ STRING != STRING ]]`Not Equal------`[[ NUM -eq NUM ]]`Equal`[[ NUM -ne NUM ]]`Not equal`[[ NUM -lt NUM ]]`Less than`[[ NUM -le NUM ]]`Less than or equal`[[ NUM -gt NUM ]]`Greater than`[[ NUM -ge NUM ]]`Greater than or equal------`[[ STRING =~ STRING ]]`Regexp------`(( NUM < NUM ))`Numeric conditions

### More conditions <a id="3c65"></a>

ConditionDescription`[[ -o noclobber ]]`If OPTIONNAME is enabled------`[[ ! EXPR ]]`Not`[[ X && Y ]]`And\`\[\[ X

## File conditions <a id="1b8b"></a>

ConditionDescription`[[ -e FILE ]]`Exists`[[ -r FILE ]]`Readable`[[ -h FILE ]]`Symlink`[[ -d FILE ]]`Directory`[[ -w FILE ]]`Writable`[[ -s FILE ]]`Size is &gt; 0 bytes`[[ -f FILE ]]`File`[[ -x FILE ]]`Executable------`[[ FILE1 -nt FILE2 ]]`1 is more recent than 2`[[ FILE1 -ot FILE2 ]]`2 is more recent than 1`[[ FILE1 -ef FILE2 ]]`Same files

## Example <a id="d2bb"></a>

```text
# String
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
else
  echo "This never happens"
fi
```

```text
# Combinations
if [[ X && Y ]]; then
  ...
fi
```

```text
# Equal
if [[ "$A" == "$B" ]]
```

```text
# Regex
if [[ "A" =~ . ]]
```

```text
if (( $a < $b )); then
   echo "$a is smaller than $b"
fi
```

```text
if [[ -e "file.txt" ]]; then
  echo "file exists"
fi
```

## Arrays <a id="b435"></a>

## Defining arrays <a id="3a51"></a>

```text
Fruits=('Apple' 'Banana' 'Orange')
```

```text
Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

## Working with arrays <a id="22cd"></a>

```text
echo ${Fruits[0]}           # Element #0
echo ${Fruits[-1]}          # Last element
echo ${Fruits[@]}           # All elements, space-separated
echo ${#Fruits[@]}          # Number of elements
echo ${#Fruits}             # String length of the 1st element
echo ${#Fruits[3]}          # String length of the Nth element
echo ${Fruits[@]:3:2}       # Range (from position 3, length 2)
echo ${!Fruits[@]}          # Keys of all elements, space-separated
```

## Operations <a id="5b6b"></a>

```text
Fruits=("${Fruits[@]}" "Watermelon")    # Push
Fruits+=('Watermelon')                  # Also Push
Fruits=( ${Fruits[@]/Ap*/} )            # Remove by regex match
unset Fruits[2]                         # Remove one item
Fruits=("${Fruits[@]}")                 # Duplicate
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Concatenate
lines=(`cat "logfile"`)                 # Read from file
```

## Iteration <a id="497d"></a>

```text
for i in "${arrayName[@]}"; do
  echo $i
done
```

## Dictionaries <a id="4a79"></a>

{: .-three-column}

## Defining <a id="b460"></a>

```text
declare -A sounds
```

```text
sounds[dog]="bark"
sounds[cow]="moo"
sounds[bird]="tweet"
sounds[wolf]="howl"
```

Declares `sound` as a Dictionary object \(aka associative array\).

## Working with dictionaries <a id="727b"></a>

```text
echo ${sounds[dog]} # Dog's sound
echo ${sounds[@]}   # All values
echo ${!sounds[@]}  # All keys
echo ${#sounds[@]}  # Number of elements
unset sounds[dog]   # Delete dog
```

## Iteration <a id="b65a"></a>

### Iterate over values <a id="092f"></a>

```text
for val in "${sounds[@]}"; do
  echo $val
done
```

### Iterate over keys <a id="fb57"></a>

```text
for key in "${!sounds[@]}"; do
  echo $key
done
```

## Options <a id="1722"></a>

## Options <a id="a466"></a>

```text
set -o noclobber  # Avoid overlay files (echo "hi" > foo)
set -o errexit    # Used to exit upon error, avoiding cascading errors
set -o pipefail   # Unveils hidden failures
set -o nounset    # Exposes unset variables
```

## Glob options <a id="66af"></a>

```text
shopt -s nullglob    # Non-matching globs are removed  ('*.foo' => '')
shopt -s failglob    # Non-matching globs throw errors
shopt -s nocaseglob  # Case insensitive globs
shopt -s dotglob     # Wildcards match dotfiles ("*.sh" => ".foo.sh")
shopt -s globstar    # Allow ** for recursive matches ('lib/**/*.rb' => 'lib/a/b/c.rb')
```

Set `GLOBIGNORE` as a colon-separated list of patterns to be removed from glob matches.

## History <a id="4adf"></a>

## Commands <a id="6e80"></a>

CommandDescription`history`Show history`shopt -s histverify`Don't execute expanded result immediately

## Expansions <a id="7b0d"></a>

ExpressionDescription`!$`Expand last parameter of most recent command`!*`Expand all parameters of most recent command`!-n`Expand `n`th most recent command`!n`Expand `n`th command in history`!<command>`Expand most recent invocation of command `<command>`

## Operations <a id="7f56"></a>

CodeDescription`!!`Execute last command again`!!:s/<FROM>/<TO>/`Replace first occurrence of `<FROM>` to `<TO>` in most recent command`!!:gs/<FROM>/<TO>/`Replace all occurrences of `<FROM>` to `<TO>` in most recent command`!$:t`Expand only basename from last parameter of most recent command`!$:h`Expand only directory from last parameter of most recent command

`!!` and `!$` can be replaced with any valid expansion.

## Slices <a id="b4e0"></a>

CodeDescription`!!:n`Expand only `n`th token from most recent command \(command is `0`; first argument is `1`\)`!^`Expand first argument from most recent command`!$`Expand last token from most recent command`!!:n-m`Expand range of tokens from most recent command`!!:n-$`Expand `n`th token to last from most recent command

`!!` can be replaced with any valid expansion i.e. `!cat`, `!-2`, `!42`, etc.

## Miscellaneous <a id="7d21"></a>

## Numeric calculations <a id="e454"></a>

```text
$((a + 200))      # Add 200 to $a
```

```text
$(($RANDOM%200))  # Random number 0..199
```

## Subshells <a id="f830"></a>

```text
(cd somedir; echo "I'm now in $PWD")
pwd # still in first directory
```

## Redirection <a id="a1f6"></a>

```text
python hello.py > output.txt   # stdout to (file)
python hello.py >> output.txt  # stdout to (file), append
python hello.py 2> error.log   # stderr to (file)
python hello.py 2>&1           # stderr to stdout
python hello.py 2>/dev/null    # stderr to (null)
python hello.py &>/dev/null    # stdout and stderr to (null)
```

```text
python hello.py < foo.txt      # feed foo.txt to stdin for python
```

## Inspecting commands <a id="cf23"></a>

```text
command -V cd
#=> "cd is a function/alias/whatever"
```

## Trap errors <a id="5c56"></a>

```text
trap 'echo Error at about $LINENO' ERR
```

or

```text
traperr() {
  echo "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}
```

```text
set -o errtrace
trap traperr ERR
```

## Case/switch <a id="31ca"></a>

```text
case "$1" in
  start | up)
    vagrant up
    ;;
```

```text
  *)
    echo "Usage: $0 {start|stop|ssh}"
    ;;
esac
```

## Source relative <a id="75c7"></a>

```text
source "${0%/*}/../share/foo.sh"
```

## printf <a id="2004"></a>

```text
printf "Hello %s, I'm %s" Sven Olga
#=> "Hello Sven, I'm Olga
```

```text
printf "1 + 1 = %d" 2
#=> "1 + 1 = 2"
```

```text
printf "This is how you print a float: %f" 2
#=> "This is how you print a float: 2.000000"
```

## Directory of script <a id="b9c7"></a>

```text
DIR="${0%/*}"
```

## Getting options <a id="c591"></a>

```text
while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -V | --version )
    echo $version
    exit
    ;;
  -s | --string )
    shift; string=$1
    ;;
  -f | --flag )
    flag=1
    ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi
```

## Heredoc <a id="1653"></a>

```text
cat <<END
hello world
END
```

## Reading input <a id="08bd"></a>

```text
echo -n "Proceed? [y/n]: "
read ans
echo $ans
```

```text
read -n 1 ans    # Just one character
```

## Special variables <a id="2f52"></a>

ExpressionDescription`$?`Exit status of last task`$!`PID of last background task`$$`PID of shell`$0`Filename of the shell script

See [Special parameters](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

## Go to previous directory <a id="edd3"></a>

```text
pwd # /home/user/foo
cd bar/
pwd # /home/user/foo/bar
cd -
pwd # /home/user/foo
```

## Check for command’s result <a id="2fbf"></a>

```text
if ping -c 1 google.com; then
  echo "It appears you have a working internet connection"
fi
```

## Grep check <a id="c90e"></a>

```text
if grep -q 'foo' ~/.bash_history; then
  echo "You appear to have typed 'foo' in the past"
fi
```

## Also see <a id="8be4"></a>

{: .-one-column}

* [Bash-hackers wiki](http://wiki.bash-hackers.org/) _\(bash-hackers.org\)_
* [Shell vars](http://wiki.bash-hackers.org/syntax/shellvars) _\(bash-hackers.org\)_
* [Learn bash in y minutes](https://learnxinyminutes.com/docs/bash/) _\(learnxinyminutes.com\)_
* [Bash Guide](http://mywiki.wooledge.org/BashGuide) _\(mywiki.wooledge.org\)_
* [ShellCheck](https://www.shellcheck.net/) _\(shellcheck.net\)_

