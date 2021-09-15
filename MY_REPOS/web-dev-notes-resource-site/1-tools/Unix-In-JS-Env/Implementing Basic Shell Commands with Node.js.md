# Implementing Basic Shell Commands with Node.js

> Let’s implement basic shell commands using Node.js. I will go over how to implement echo, cat, head and tail commands.

While learning back-end development with Node.js through Bloc’s web developer apprenticeship program, I learned how to implement the basic shell command using Node.js `fs` module. In this blog post, I would like to go over how to implement `echo` `cat` `head` `tail` shell commands.

1) Node.js and NPM
------------------

If you haven’t installed Node and NPM, please refer to this [link](https://blog.teamtreehouse.com/install-node-js-npm-mac).

After creating a directory for this project, initialize npm on the terminal.

npm init

2) 2 files named bash.js and commands.js
----------------------------------------

`bash.js` file is for accepting user’s input and executing the typed commands. `commands.js` file is for storing all the commands and logics.

touch bash.js   
touch commands.js 

*   fs (file system)

const fs = require('fs');

> What is fs library?
> 
> fs library is a part of Node core library which allows you to handle a file system in your machine. It comes with a number of methods to provide access to your file system such as reading a content of the file, and adding contents to the file. If you want to learn more, please refer to [the official documentation](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) and [this tutorial](https://www.w3schools.com/nodejs/nodejs_filesystem.asp).

First, you need to create a file for storing command lines. Open `commands.js` file. Inside the file, define a command handler function to parse appropriate command keywords from the user’s input and assign corresponding function for each command keywords.

For example, a user might input `cat test.js` . The function we are going to define will parse the command keyword (`cat` in this case) and assign the value to a [switch statement](https://www.w3schools.com/js/js_switch.asp). Code blocks corresponding to the keyword will then get executed.

1.  userInput.split(“ ”) will store each command name and its argument into an array and save as userInputArray. For example, `cat test.js`is stored as \[“cat”, ”test.js”\].
2.  Retrieve the command name as \`userInputArray\[0\]\` and store the value as `command`. Because JavaScript’s array is zero-based, passing 0 index allows you to select the first element in the array.
3.  Define switch statement and pass in the corresponding function for each command. `slice(1)`will retrieve elements in index of 1 and the rest in the array.
4.  Define a default statement. When a user types an irrelevant command keyword which is not defined below, the default statement is triggered showing an error message.

function evaluateCmd(userInput){ const userInputArray = userInput.split(" ");   const command = userInputArray\[0\]; //select command name switch (command) { case "echo": commandLibrary.echo(userInputArray.slice(1).join(" ")); break; case "cat": commandLibrary.cat(userInputArray.slice(1)); break; case "head": commandLibrary.head(userInputArray.slice(1)); break; case "tail": commandLibrary.tail(userInputArray.slice(1)); default: process.stdout.write('Typed command is not accurate');}}

Next, we will define a command library which collects all the function bodies called from the command handler. Before defining each function, we need to define a done method which prints out the output of each function to the terminal.

[process.stdout.write](https://nodejs.org/api/process.html) outputs the stream data on terminal, same as console.log(). A stream is a sequence of data elements made available over time. Because you need to force the user to the default setting, let’s add `process.stdout.write('\nprompt > ').`

function done(output) { process.stdout.write(output); process.stdout.write('\\nprompt > ');}

For the command library, command names and their functions are stored as [object’s key and method](https://www.w3schools.com/js/js_objects.asp).

const commandLibrary = {"command\_name" : function(input){ }  
}

Echo command
------------

The command keyword `[echo](https://www.tutorialspoint.com/unix_commands/echo.htm)` allows you to display a line of text on the terminal screen. By passing in the typed input into the done function, the text gets displayed on the terminal.

"echo": function (userInput){ done(userInput);}

Cat command
-----------

The command keyword `[cat](https://www.tutorialspoint.com/unix_commands/cat.htm)` allows you to print the content of the file. Inside the method, fullPath\[0\] select the file name and store it into a variable `fileName` . Using Node’s fs module, let’s output the contents of the file. Because [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) is asynchronous method, you need to define the callback function just in case the execution gets failed. Finally, pass in the data into done function.

"cat": function (fullPath){ const fileName = fullPath\[0\]; fs.readFile(fileName, (err, data) => { if (err) throw err; console.log(data); done(data);});

Head Command
------------

The command keyword `head` allows you to print the first nth lines of the file. Same as the `cat` command, get the file name first and use fs.readFile method to retrieve the contents of the file.

In order to select the only first several lines of the contents, you need to slice those lines. Before doing that, be aware that fs.readFile represents the data as Unicode and need to encode the string into UTF-8 characters first. Use `toString('utf8')` method to convert the string into UTF-8 characters and store the text into a variable `text` . And then, split the whole texts based on new line, slice the desired lines and join all the sliced contents.The result is stored in `slicedText`.

After you slice the text, convert the UTF-8 characters back into the Unicode characters. Using `Buffer.from()` method, pass in the sliced text and the data type `utf8` and save the data as `bufferText` .

"head": function (fullPath){ const fileName = fullPath\[0\]; fs.readFile(fileName, (err, data) => { if (err) throw err; var text = data.toString('utf8'); var slicedText = text.split('\\n').slice(0,10).join('\\n'); var bufferText = Buffer.from(slicedText, 'utf8'); done(bufferText); })}

Tail Command
------------

Unlike `head` command, `tail` command allows you return the last several lines of the contents. Follow the same path as the head command described above, but this time you slice the last 10th lines `slice(10)` .

"tail": function (fullPath){ const fileName = fullPath\[0\]; fs.readFile(fileName, (err, data) => { if (err) throw err; var text = data.toString('utf8'); var slicedText = text.split('\\n').slice(-10).join('\\n'); var bufferText = Buffer.from(slicedText, 'utf8'); done(bufferText); }) }


[Source](https://medium.com/@aratakagan/implementing-basic-shell-commands-with-node-js-eac5dba33174)