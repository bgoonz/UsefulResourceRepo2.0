
[Source](http://www.fprintf.net/vimCheatSheet.html "Permalink to Vim Commands Cheat Sheet")

# Vim Commands Cheat Sheet

* * *

## How to Exit

:q[uit]
Quit Vim. This fails when changes have been made.

:q[uit]!
Quit without writing.

:cq[uit]
Quit always, without writing.

:wq
Write the current file and exit.

:wq!
Write the current file and exit always.

:wq {file}
Write to {file}. Exit if not editing the last

:wq! {file}
Write to {file} and exit always.

:[range]wq[!]
[file] Same as above, but only write the lines in [range].

ZZ
Write current file, if modified, and exit.

ZQ
Quit current file and exit (same as ":q!").

* * *

## Editing a File

:e[dit]
Edit the current file. This is useful to re-edit the current file, when it has been changed outside of Vim.

:e[dit]!
Edit the current file always. Discard any changes to the current buffer. This is useful if you want to start all over again.

:e[dit] {file}
Edit {file}.

:e[dit]! {file}
Edit {file} always. Discard any changes to the current buffer.

gf
Edit the file whose name is under or after the cursor. Mnemonic: "goto file".

* * *

## Inserting Text

a
Append text after the cursor [count] times.

A
Append text at the end of the line [count] times.

i
Insert text before the cursor [count] times.

I
Insert text before the first non-blank in the line [count] times.

gI
Insert text in column 1 [count] times.

o
Begin a new line below the cursor and insert text, repeat [count] times.

O
Begin a new line above the cursor and insert text, repeat [count] times.

* * *

## Inserting a file

:r[ead] [name]
Insert the file [name] below the cursor.

:r[ead] !{cmd}
Execute {cmd} and insert its standard output below the cursor.

* * *

## Deleting Text

 or
x
Delete [count] characters under and after the cursor

X
Delete [count] characters before the cursor

d{motion}
Delete text that {motion} moves over

dd
Delete [count] lines

D
Delete the characters under the cursor until the end of the line

{Visual}x or
{Visual}d
Delete the highlighted text (for {Visual} see [Selecting Text][1]).

{Visual}CTRL-H or
{Visual}
When in Select mode: Delete the highlighted text

{Visual}X or
{Visual}D
Delete the highlighted lines

:[range]d[elete]
Delete [range] lines (default: current line)

:[range]d[elete] {count}
Delete {count} lines, starting with [range]

* * *

## Changing (or Replacing) Text

r{char}
replace the character under the cursor with {char}.

R
Enter Insert mode, replacing characters rather than inserting

~
Switch case of the character under the cursor and move the cursor to the right. If a [count] is given, do that many characters.

~{motion}
switch case of {motion} text.

{Visual}~
Switch case of highlighted text

* * *

## Substituting

:[range]s[ubstitute]/{pattern}/{string}/[c][e][g][p][r][i][I] [count]
For each line in [range] replace a match of {pattern} with {string}.

:[range]s[ubstitute] [c][e][g][r][i][I] [count] :[range]&amp;[c][e][g][r][i][I] [count]
Repeat last :substitute with same search pattern and substitute string, but without the same flags. You may add extra flags


    The arguments that you can use for the substitute commands:
    [c]  Confirm each substitution.  Vim positions the cursor on the matching
      string.  You can type:
          'y'      to substitute this match
          'n'      to skip this match
             to skip this match
          'a'      to substitute this and all remaining matches {not in Vi}
          'q'      to quit substituting {not in Vi}
          CTRL-E  to scroll the screen up {not in Vi}
          CTRL-Y  to scroll the screen down {not in Vi}.
    [e]     When the search pattern fails, do not issue an error message and, in
      particular, continue in maps as if no error occurred.
    [g]  Replace all occurrences in the line.  Without this argument,
      replacement occurs only for the first occurrence in each line.
    [i]  Ignore case for the pattern.
    [I]  Don't ignore case for the pattern.
    [p]  Print the line containing the last substitute.


* * *

## Copying and Moving Text

"{a-zA-Z0-9.%#:-"}
Use register {a-zA-Z0-9.%#:-"} for next delete, yank or put (use uppercase character to append with delete and yank) ({.%#:} only work with put).

:reg[isters]
Display the contents of all numbered and named registers.

:reg[isters] {arg}
Display the contents of the numbered and named registers that are mentioned in {arg}.

:di[splay] [arg]
Same as :registers.

["x]y{motion}
Yank {motion} text [into register x].

["x]yy
Yank [count] lines [into register x]

["x]Y
yank [count] lines [into register x] (synonym for yy).

{Visual}["x]y
Yank the highlighted text [into register x] (for {Visual} see [Selecting Text][1]).

{Visual}["x]Y
Yank the highlighted lines [into register x]

:[range]y[ank] [x]
Yank [range] lines [into register x].

:[range]y[ank] [x] {count}
Yank {count} lines, starting with last line number in [range] (default: current line), [into register x].

["x]p
Put the text [from register x] after the cursor [count] times.

["x]P
Put the text [from register x] before the cursor [count] times.

["x]gp
Just like "p", but leave the cursor just after the new text.

["x]gP
Just like "P", but leave the cursor just after the new text.

:[line]pu[t] [x]
Put the text [from register x] after [line] (default current line).

:[line]pu[t]! [x]
Put the text [from register x] before [line] (default current line).

* * *

## Undo/Redo/Repeat

u
Undo [count] changes.

:u[ndo]
Undo one change.

CTRL-R
Redo [count] changes which were undone.

:red[o]
Redo one change which was undone.

U
Undo all latest changes on one line. {Vi: while not moved off of it}

.
Repeat last change, with count replaced with [count].

* * *

## Moving Around


    Basic motion commands:

            k
          h   l
            j

h or

[count] characters to the left (exclusive).

l or
or

[count] characters to the right (exclusive).

k or
or
CTRL-P
[count] lines upward

j or
or
CTRL-J or
or
CTRL-N
[count] lines downward (linewise).

0
To the first character of the line (exclusive).


To the first character of the line (exclusive).

^
To the first non-blank character of the line

$ or

To the end of the line and [count - 1] lines downward

g0 or
g
When lines wrap ('wrap on): To the first character of the screen line (exclusive). Differs from "0" when a line is wider than the screen. When lines don't wrap ('wrap' off): To the leftmost character of the current line that is on the screen. Differs from "0" when the first character of the line is not on the screen.

g^
When lines wrap ('wrap' on): To the first non-blank character of the screen line (exclusive). Differs from "^" when a line is wider than the screen. When lines don't wrap ('wrap' off): To the leftmost non-blank character of the current line that is on the screen. Differs from "^" when the first non-blank character of the line is not on the screen.

g$ or
g  shift right




v
start Visual mode per character.

V
start Visual mode linewise.


exit Visual mode without making any changes

* * *

## How to Suspend

CTRL-Z
Suspend Vim, like ":stop". Works in Normal and in Visual mode. In Insert and Command-line mode, the CTRL-Z is inserted as a normal character.

:sus[pend][!] or
:st[op][!]
Suspend Vim. If the '!' is not given and 'autowrite' is set, every buffer with changes and a file name is written out. If the '!' is given or 'autowrite' is not set, changed buffers are not written, don't forget to bring Vim back to the foreground later!

* * *