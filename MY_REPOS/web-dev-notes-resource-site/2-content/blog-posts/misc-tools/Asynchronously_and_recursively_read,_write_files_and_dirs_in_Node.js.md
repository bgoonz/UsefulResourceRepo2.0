# Asynchronously and recursively read, write files and dirs in Node.js

> In this tutorial, we'll learn how to read, write, and append to files in an asynchronous manner. We're going to write a simple program that grab text from a file, and saves it in a new file. We'll also learn how to read a dir in an asynchronous manner recursively.

In this tutorial, we'll learn how to read, write, and append to files in an asynchronous manner. We're going to write a simple program that grab text from a file, and saves it in a new file. We'll also learn how to read a dir in an asynchronous manner recursively.

1.  Read file
2.  Write file
3.  Append file
4.  Read dir / folder
5.  Read dir tree

First we'll require our dependencies:

const fs \= require('fs')

The `fs` is the core modules so there's no need to install this dependency. See documentation: [https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html).

Asynchronous read file
----------------------

The `readFile` returns raw buffer if character encoding is not specified.

**/\*Simple async example\*/** const fs \= require('fs') const filePath \= 'path/file.txt' fs.readFile(filePath, (err, data) \=> { if (err) throw err
 console.log(data) //<Buffer 61 62 63 0d 0a 64 65 66 0d... })

If the encoding option is specified then `readFile` returns a string:

const fs \= require('fs') const filePath \= 'path/file.txt' fs.readFile(filePath, **'utf-8',** (err, data) \=> { if (err) throw err
 console.log(data) //abc def... })

Asynchronous write file
-----------------------

Next, we'll write the content to a new file and save:

const fs \= require('fs') const filePath \= 'path/file.txt' const newFile \= 'path/newfile.txt' fs.readFile(filePath, (err, data) \=> { if (err) throw err **fs.writeFile(newFile, data, (err) \=> {**  **if (err) throw err**  **console.log(newFile + ' saved')**  **})** })

The `writeFile` writes data to a file, replacing the file if it already exists without giving any warning. `data` can be a string or a buffer.

Asynchronous append file
------------------------

Finally, let's append some text to previous file so we can keep a record:

const fs \= require('fs') const filePath \= 'path/file.txt' const newFile \= 'path/newfile.txt' fs.readFile(filePath, (err, data) \=> { if (err) throw err
 fs.writeFile(newFile, data, (err) \=> { if (err) throw err **let appendTxt \= (new Date) + " Text copied to " + newFile
  fs.appendFile(filePath, appendTxt, (err) \=> {**  **if (err) throw err;**  **console.log(filePath + ' some data appended');**  **})** }) })

`appendFile` append data to a file. It creates new file if it if it does not yet exist.

Asynchronously read dir / folder
--------------------------------

The Node.js implementation of `readdir` is a simple command to read a directory.  It is the asynchronous implementation of the file-system directory read:

fs.readdir('./', (err, files) \=> { if(err) throw err
Asynchronous append file
 files.forEach(entry \=> { console.log (entry) }) })

This will print all files and folder from the given path on command terminal.

Asynchronously read dir tree (recursive operation)
--------------------------------------------------

const fs \= require('fs') const path \= require('path') function readTree (entry) { fs.lstat(entry, (err,stat) \=> { if (err) throw err if (stat.isDirectory()){ fs.readdir(entry, (err,files) \=> { if (err) throw err
    files.forEach( file \=> { readTree(path.join(entry,file)) }) }) } else { console.log (entry) } }) } readTree (path/of/dir)

The `path.join` method is a useful utility that normalizes paths across platforms, since Windows uses back slashes `\` whilst others use forward slashes `/` to denote path segments.

A `lstat` provides information about the path which store in `stat` variable.

`stat.isDirectory()` return true if the given path is a directory.

Next, we'll explore the `fs.Stats` class and also discuss the difference between the synchronous and asynchronous operations in Node.js.

by updated May 08, 2018


[Source](https://www.brainbell.com/javascript/async-files-dirs.html)
