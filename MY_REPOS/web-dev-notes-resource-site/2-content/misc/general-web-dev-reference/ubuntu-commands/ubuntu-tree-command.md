# Linux tree command help and examples

> Linux tree command information, examples, and help.

Updated: 03/06/2020 by

![tree command](https://www.computerhope.com/cdn/linux/tree.gif)

**tree** lists the contents of [directories](https://www.computerhope.com/jargon/d/director.htm) in a tree-like format. It can be used to the structure of your [file system](https://www.computerhope.com/jargon/f/filesyst.htm).

Description
-----------

**tree** is a [recursive](https://www.computerhope.com/jargon/r/recursive.htm) directory listing program that produces a depth-indented listing of files (which is colorized if the **LS\_COLORS** [environment variable](https://www.computerhope.com/jargon/e/envivari.htm) is set) and output is to [tty](https://www.computerhope.com/jargon/t/tty.htm). With no arguments, **tree** lists the files in the current directory. When directory arguments are given, **tree** lists all the files and/or directories found in the given directories each in turn. **tree** then returns the total number of files and/or directories listed.

By default, when a [symbolic link](https://www.computerhope.com/jargon/s/symblink.htm) is encountered, the path that the symbolic link refers to is printed after the name of the link in the format:

name -> real-path

If the \`**\-l**' option is given and the symbolic link refers to an actual directory, then tree will follow the path of the symbolic link as if it were a real directory.

Syntax
------

tree \[-adfgilnopqrstuxACDFNS\] \[-L _level_ \[-R\]\] \[-H _baseHREF_\] \[-T _title_\] 
     \[-o _file name_\] \[--nolinks\] \[-P _pattern_\] \[-I _pattern_\] \[--inodes\] 
     \[--device\] \[--noreport\] \[--dirsfirst\] \[--version\] \[--help\] 
     \[--filelimit _#_\] \[--si\] \[--prune\] \[--du\] \[--timefmt _format_\] 
     \[_directory_ ...\]

Options
-------

<table><tbody><tr><td><b>--help</b></td><td>Outputs a <a href="https://www.computerhope.com/jargon/v/verbose.htm">verbose</a> usage listing.</td></tr><tr><td><b>--version</b></td><td>Outputs the <a href="https://www.computerhope.com/jargon/v/version.htm">version</a> of tree.</td></tr><tr><td><b>-a</b></td><td>All files are printed. By default, tree does not print hidden files (those beginning with a dot `<b>.</b>'). In no event does tree print the file system constructs `<b>.</b>' (current directory) and `<b>..</b>' (previous directory).</td></tr><tr><td><b>-d</b></td><td>List directories only.</td></tr><tr><td><b>-f</b></td><td>Prints the full path prefix for each file.</td></tr><tr><td><b>-i</b></td><td>Tree will not print the indentation lines. Useful when used in conjunction with the <b>-f</b> option.</td></tr><tr><td><b>-l</b></td><td>Follows symbolic links to directories as if they were directories. Links that would result in a recursive loop are avoided.</td></tr><tr><td><b>-x</b></td><td>Stay on the current file system only, as with <b>find -xdev</b>.</td></tr><tr><td><b>-P</b> <i>pattern</i></td><td>List only those files that match the <a href="https://www.computerhope.com/jargon/w/wildcard.htm">wildcard</a> <i>pattern</i>. Note: you must use the <b>-a</b> option to also consider those files beginning with a dot `<b>.</b>' for matching. Valid wildcard operators are `<b>*</b>' (any zero or more characters), `<b>?</b>' (any single character), `<b>[...]</b>' (any single character listed between brackets (optional <b>-</b> (dash) for character range may be used: ex: <b>[A-Z]</b>), and `<b>[^...]</b>' (any single character not listed in brackets) and `<b>|</b>' separates alternate patterns.</td></tr><tr><td><b>-I</b> <i>pattern</i></td><td>Do not list those files that match the wildcard <i>pattern</i>.</td></tr><tr><td><b>--prune</b></td><td>Makes tree prune empty directories from the output, useful when used in conjunction with <b>-P</b> or <b>-I</b>.</td></tr><tr><td><span><b>--filelimit</b> <i>#</i></span></td><td>Do not descend directories that contain more than <i>#</i> entries.</td></tr><tr><td><span><b>--timefmt</b> <i>format</i></span></td><td>Prints (implies <b>-D</b>) and formats the date according to the format string which uses the <a href="https://www.computerhope.com/unix/strftime.htm">strftime</a> syntax.</td></tr><tr><td><b>--noreport</b></td><td>Omits printing of the file and directory report at the end of the tree listing.</td></tr><tr><td><b>-p</b></td><td>Print the protections for each file (as per ls <b>-l</b>).</td></tr><tr><td><b>-s</b></td><td>Print the size of each file along with the name.</td></tr><tr><td><b>-u</b></td><td>Print the username, or UID # if no username is available, of the file.</td></tr><tr><td><b>-g</b></td><td>Print the group name, or GID # if no group name is available, of the file.</td></tr><tr><td><b>-D</b></td><td>Print the date of the last modification time for the file listed.</td></tr><tr><td><b>--inodes</b></td><td>Prints the inode number of the file or directory</td></tr><tr><td><b>--device</b></td><td>Prints the device number to which the file or directory belongs</td></tr><tr><td><b>-F</b></td><td>Append a `<b>/</b>' for directories, a `<b>=</b>' for socket files, a `<b>*</b>' for executable files and a `<b>|</b>' for FIFO's, as per ls <b>-F</b></td></tr><tr><td><b>-q</b></td><td>Print non-printable characters in file names as question marks instead of the default carrot notation.</td></tr><tr><td><b>-N</b></td><td>Print non-printable characters as is instead of the default carrot notation.</td></tr><tr><td><b>-r</b></td><td>Sort the output in reverse alphabetic order.</td></tr><tr><td><b>-t</b></td><td>Sort the output by last modification time instead of alphabetically.</td></tr><tr><td><b>--dirsfirst</b></td><td>List directories before files.</td></tr><tr><td><b>-n</b></td><td>Turn colorization off always, overridden by the <b>-C</b> option.</td></tr><tr><td><b>-C</b></td><td>Turn colorization on always, using built-in color defaults if the <b>LS_COLORS</b> environment variable is not set. Useful to colorize output to a pipe.</td></tr><tr><td><b>-A</b></td><td>Turn on ANSI line graphics hack when printing the indentation lines.</td></tr><tr><td><b>-S</b></td><td>Turn on ASCII line graphics (useful when using linux console mode fonts). This option is now equivalent to `<b>--charset=IBM437</b>' and will eventually be depreciated.</td></tr><tr><td><b>-L</b> <i>level</i></td><td>Max display depth of the directory tree.</td></tr><tr><td><b>-R</b></td><td>Recursively cross down the tree each level directories (see <b>-L</b> option), and at each of them execute tree again adding `<b>-o 00Tree.html</b>' as a new option.</td></tr><tr><td><b>-H</b> <i>baseHREF</i></td><td>Turn on <a href="https://www.computerhope.com/jargon/h/html.htm">HTML</a> output, including HTTP references. Useful for <a href="https://www.computerhope.com/jargon/f/ftp.htm">ftp</a> sites. baseHREF gives the base ftp location when using HTML output. That is, the local directory may be `<b>/local/ftp/pub'</b>, but it must be referenced as `<b>ftp://host-name.organization.domain/pub'</b> (baseHREF should be `<b>ftp://hostname.organization.domain'</b>). Hint: don't use ANSI lines with this option, and don't give more than one directory in the directory list. If you want to use colors via <a href="https://www.computerhope.com/jargon/c/css.htm">CSS</a> stylesheet, use the <b>-C</b> option in addition to this option to force color output.</td></tr><tr><td><b>-T</b> <i>title</i></td><td>Sets the title and H1 header string in HTML output mode.</td></tr><tr><td><b>--charset</b> <i>charset</i></td><td>Set the character set to use when outputting HTML and for line drawing.</td></tr><tr><td><b>--nolinks</b></td><td>Turns off hyperlinks in HTML output.</td></tr><tr><td><b>-o</b> <i>file name</i></td><td>Send output to file name.</td></tr></tbody></table>

Examples
--------

tree

Displays the contents of the current directory and subdirectories in a tree. The output takes a graphical form which will resemble the following example:

.
├── config.dat
├── data
│   ├── data1.bin
│   ├── data2.sql
│   └── data3.inf
├── images
│   ├── background.jpg
│   ├── icon.gif
│   └── logo.jpg
├── program.exe
└── readme.txt
2 directories, 9 files

tree -I 'example\*|bin|lib'

Displays a tree without anything beginning with example or containing 'bin' or 'lib' as specified in the pattern.

tree -P 't\*'

With a uppercase "P" you can list files with a pattern. This pattern example displays a tree only containing directories beginning with t or directories containing files that begin with t.

tree -p

With a lowercase "p" you can list a tree that also shows the file permissions.

[**ls**](https://www.computerhope.com/unix/uls.htm) — List the contents of a directory or directories.


[Source](https://www.computerhope.com/unix/tree.htm#examples)