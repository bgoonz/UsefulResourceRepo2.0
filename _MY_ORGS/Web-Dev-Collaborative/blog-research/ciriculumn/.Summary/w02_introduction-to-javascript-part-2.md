# WEEK 2<br>*Introduction to JavaScript (Part 2)* {ignore=true}
________________________________________________________________________________

<!-- code_chunk_output -->

[**Running JS Locally Learning Objectives**](#running-js-locally-learning-objectives)
  - [Terminal Basics](#terminal-basics)
  - [File tree](#file-tree)
- [Basic terminal navigation](#basic-terminal-navigation)
  - [Navigation of the Unix file system](#navigation-of-the-unix-file-system)
- [Setup & Installations on Windows 10](#setup-installations-on-windows-10)
  - [Windows Subsytem for Linux (WSL) and Ubuntu](#windows-subsytem-for-linux-wsl-and-ubuntu)
  - [Git](#git)
  - [Google Chrome](#google-chrome)
  - [Node.js](#nodejs)
  - [Unzip](#unzip)
  - [Mocha.js](#mochajs)
  - [Python 3](#python-3)
  - [*Note about WSL*](#note-about-wsl)
  - [Now, you have everything installed!](#now-you-have-everything-installed)
- [Setup & Installations on macOS Catalina or Mojave](#setup-installations-on-macos-catalina-or-mojave)
  - [Preparing your machine](#preparing-your-machine)
  - [Running JavaScript Code](#running-javascript-code)
  - [Node REPL vs. JavaScript File](#node-repl-vs-javascript-file)
- [Running JavaScript Locally](#running-javascript-locally)
  - [Phase 1: Creating files and folders](#phase-1-creating-files-and-folders)
  - [Phase 2: Using Node to run JavaScript files](#phase-2-using-node-to-run-javascript-files)
  - [Phase 3: Running tests using Mocha](#phase-3-running-tests-using-mocha)

[**Plain Old JS Object Learning Objectives**](#plain-old-js-object-learning-objectives)
[**Pair Programming Learning Objectives**](#pair-programming-learning-objectives)
- [The Object Type](#the-object-type)
  - [The object of my affections](#the-object-of-my-affections)
  - [Setting keys and values](#setting-keys-and-values)
  - [Using different notations](#using-different-notations)
- [Iterating Through Objects](#iterating-through-objects)
  - [A new Kind of `for` Loop](#a-new-kind-of-for-loop)
  - [Methods vs Functions](#methods-vs-functions)
  - [Useful Object Methods](#useful-object-methods)
- [Reference vs. Primitive Types](#reference-vs-primitive-types)
  - [Primitives vs. Objects](#primitives-vs-objects)
  - [Immutability](#immutability)
- [Using the Spread Operator and Rest Parameter Syntax](#using-the-spread-operator-and-rest-parameter-syntax)
  - [Accepting arguments](#accepting-arguments)
  - [Utilizing Rest Parameters](#utilizing-rest-parameters)
  - [Utilizing Spread Syntax](#utilizing-spread-syntax)
- [Destructuring](#destructuring)
  - [Destructuring data into variables](#destructuring-data-into-variables)
  - [Destructuring parameters](#destructuring-parameters)
- [We're Better Together: Pair Programming](#were-better-together-pair-programming)
  - [Team mentality](#team-mentality)
  - [Pair Programming Roles](#pair-programming-roles)
  - [Why pair up?](#why-pair-up)
- [The  Pair Programming Approach](#the-app-academy-pair-programming-approach)
  - [Why this way?](#why-this-way)
  - [The rules](#the-rules)
  - [Modifying the routine](#modifying-the-routine)
- [You Are Not Your Code: Empathetic Communication In Engineering](#you-are-not-your-code-empathetic-communication-in-engineering)
  - [Understanding code-centric vs. human-centric language](#understanding-code-centric-vs-human-centric-language)
  - [Why communication matters](#why-communication-matters)
- [Object Problems](#object-problems)

[**Callbacks Learning Objectives**](#callbacks-learning-objectives)
- [Callbacks: Using a Function as an Argument](#callbacks-using-a-function-as-an-argument)
  - [What is a callback?](#what-is-a-callback)
  - [A more interesting example](#a-more-interesting-example)
  - [Refactoring for an optional callback](#refactoring-for-an-optional-callback)
- [Callback Problems](#callback-problems)

[**Scope Learning Objectives**](#scope-learning-objectives)
- [All About Scope](#all-about-scope)
  - [Advantages of utilizing scope](#advantages-of-utilizing-scope)
  - [Different kinds of scope](#different-kinds-of-scope)
- [Different Kinds of Variables](#different-kinds-of-variables)
  - [Declaring variables](#declaring-variables)
  - [Hoisting and scoping with variables](#hoisting-and-scoping-with-variables)
  - [Global variables](#global-variables)
- [Calculating Closures](#calculating-closures)
  - [Closures and scope](#closures-and-scope)
  - [Applications of closures](#applications-of-closures)
- [Context in JavaScript](#context-in-javascript)
  - [What about `this`?](#what-about-this)
  - [Issues with scope and context](#issues-with-scope-and-context)
  - [Changing context using `bind`](#changing-context-using-bind)
- [Arrow Functions](#arrow-functions)
  - [Arrow functions solving problems](#arrow-functions-solving-problems)
  - [Arrow functions with context](#arrow-functions-with-context)
  - [Scope Problems](#scope-problems)
- [WhiteBoarding Problem](#whiteboarding-problem)
  - [The Question](#the-question)

<!-- /code_chunk_output -->
________________________________________________________________________________
# WEEK-02 DAY-1<br>*Nodejs* {ignore=true}
________________________________________________________________________________
# Running JS Locally Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Match the commands ls, cd, pwd to their descriptions
2. Given a folder structure diagram, a list of 'cd (path)' commands and target
   files, match the paths to the target files.
3. Use VSCode to create a folder. Within the folder create a .js file containing
   `console.log('hello new world');` and save it.
4. Use node to execute a JavaScript file in the termina terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Match the commands ls, cd, pwd to their descriptions
2. Given a folder structure diagram, a list of 'cd (path)' commands and target
   files, match the paths to the target files.
3. Use VSCode to create a folder. Within the folder create a .js file containing
   `console.log('hello new world');` and save it.
4. Use node to execute a JavaScript file in the terminal
________________________________________________________________________________
## Terminal Basics

Part of the journey of growing into a skilled programmer is about becoming
proficient with the tools we have at our disposal. The terminal is a text-based
system that allows you, as a user, to control your computer and do everything
from creating new files and folders to starting up entire applications.

Interacting with the terminal is something you will most likely do everyday in
your coding career. You may find the terminal initially intimidating to use -
all commands must be entered as text and the terminal has its own language.
However, once we get over this initial learning curve, you'll discover the
terminal is your most powerful tool!

Let's start with the basics. There are a few differences between this tool on
Mac and Windows environments; we'll be sure to highlight these differences as we
go. On Mac and Linux we use the **Terminal**, while on Windows we use the
**Command Prompt**. Both applications are analogous and you can launch them
normally by searching your apps.

When you finish this reading, you should be able to:

- Start a terminal session on your local computer
- Utilize the commands `ls`, `cd`, and `pwd` to navigate a computer's file
  systems.
- Navigate through a file tree to access specific directories

## File tree

As you start writing code on your local computer you'll find it soon becomes
essential to have the ability to navigate around your file system. Before we
start exploring the syntax of how to navigate your file system - we'll introduce
you to the basics of how your files are structured.

Below is a basic visualization of what a file tree might look like
<sub>[1][1]</sub> :

![file-directory](images/directory_structure.png)

[1]: https://info474-s17.github.io/book/introduction-to-the-command-line.html

### Essential terminology

To explain the above picture properly we first need to go over some important
terminology that we'll be using for the rest of the course.

- **directory** - same as a folder on your computer; a directory can contain
  many files or subdirectories (folders within themselves)
- **root** - the outer most main directory of our computer represented by `/`
- **path** - location on your computer specified by directories.
  `/Desktop/photos/cats.pdf` is an example of a path.

Now take a look again at the visualization above and things will make a little
more sense. The **root** directory sits at the top of the chart as the outer
main directory. All other **directories** can be accessed from root by following
a **path** (the dotted lines in the chart above). All directories can contain
both files and subdirectories.

Two more important words to know are:

- **CLI** - (short for Command Line Interface) is the text-based user interface
  used to view and manage computer files. (_Terminal_ for Mac & Linux vs.
  _Command Prompt_ for Windows).
- **GUI** - (Graphic User Interface) is the visual alternative of the CLI. The
  GUI is probably what you've been using to navigate your computer so far (with
  icons representing folders and files).

The CLI, Command Line Interface, predates the graphic interface you are familiar
with. Many coding specific programs can _only_ be run from the command line
(like `Node`!). Working with your own computer will really help these ideas sink
in, and once your have fluency with commands in the CLI you'll find it much
faster to do essential tasks. Plus, matrix ninja w00t.

# Basic terminal navigation

**NOTE:** `Unix` is a term we will be using a lot in the future. It refers to
the parent operating system upon which Mac is built upon and Linux is inspired
by. They have (nearly) identical commands and features and both use the
Terminal. Windows is not Unix based and the commands are slightly different. For
the rest of the course we will only support Unix/Linux and we will not give any
additional Windows specific commands.

## Navigation of the Unix file system

Let's get started! Search your computer for an Application named "Terminal".
Upon opening the application a new Terminal window will greet you with:

```sh
~ $
```

### Navigation commands

We'll start by covering some basic commands that you will find yourself using
all the time:

- `ls` - lists all the files and subdirectories in the current directory
- `cd [path]` - changes the current directory to the directory specified by the
  `path` argument. (i.e. `cd /cats` would enter a directory named "cats").
- `pwd` - short for "Print Working Directory". The `pwd` command lists the path
  to your current location in your file system starting from the _root_.

> When opening a fresh terminal window the default directory opened will be the
> _home_ directory. Your home directory will be represented by a `~`. So for
> example, if your computer user's name was `janedoe` then a fresh terminal
> would open to `~` and using the `pwd` command would print out your current
> location as `/Users/janedoe/`.

To navigate through directories in the command line, we need to specify which
directories to go through. Let's say we are in the home directory for our user,
(`~`), and want to navigate into a directory we have on our Desktop (for example
`photos`). We need to first go into the `Desktop` directory, and then go into
`photos`.

```sh
~ $ ls
Applications    Desktop
Documents       Downloads
Library         Movies
Music           Pictures

~ $ cd Desktop

~ Desktop $ ls
photos          lectures
memes           projects

~ Desktop $ cd photos

~ photos $ ls
cats.jpeg       hey_programmers.gif
```

Notice, after we navigate to a new folder using `cd`, the current path before
the `$` changed to reflect where we currently are in our _file system_. Test
changing directories in your Terminal.

You can also navigate into and through multiple directories at once by
specifying a path of a directory and its subdirectory:

```sh
~ $ ls
Applications    Desktop
Documents       Downloads
Library         Movies
Music           Pictures

~ $ cd Desktop/photos

~ photos $ ls
cats.jpeg       hey_programmers.gif
```

If you ever need a reminder on where you are in your file system you can use the
`pwd` command. Let's take a look at at how to use `pwd` continuing from our
above example:

```sh
~ photos $ ls
cats.jpeg       hey_programmers.gif

~ photos $ pwd
/Users/rose/Desktop/photos
```

### Directory Shortcuts

Use the command `cd ..` to go back to the previous directory. If we are in the
`photos` directory on our `Desktop`, and want to go back to the `Desktop`:

```sh
~ photos $ cd ..
~ Desktop $
```

Use the command `cd` (by itself) to go back to your home directory instantly:

```sh
~ photos $ cd
~ $
```

Those are the basics of navigating around the terminal! We'll trickle in more
commands as we move forward, but you'll use `ls`, `pwd` and `cd` the most.

## What you learned

- How to start a new terminal session
- How to navigate your file system using `cd`, `ls`, and `pwd`
- How to navigate through a file tree to access specific directories

________________________________________________________________________________
# Setup & Installations on Windows 10

This reading is only applicable to Windows users. If you're on macOS, please use
the instructions in **Setup & Installations (macOS)**.

## Windows Subsytem for Linux (WSL) and Ubuntu

Test if you have Ubuntu installed by typing "Ubuntu" in the search box in the
bottom app bar that reads "Type here to search". If you see a search result that
reads "Ubuntu" with "App" under it, then you have it installed. Otherwise,
follow these instructions to install the WSL and Ubuntu.

1. In the application search box in the bottom bar, type "PowerShell" to find
   the application named "Windows PowerShell"
1. Right-click on "Windows PowerShell" and choose "Run as administrator" from
   the popup menu
1. In the blue PowerShell window, type the following:
   `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
1. Restart your computer
1. In the application search box in the bottom bar, type "Store" to find the
   application named "Microsoft Store"
1. Click "Microsoft Store"
1. Click the "Search" button in the upper-right corner of the window
1. Type in "Ubuntu"
1. Click "Run Linux on Windows (Get the apps)"
1. Click the orange tile labeled "Ubuntu"
1. Click "Install"
1. After it downloads, click "Launch"
1. If you get the option, pin the application to the task bar. Otherwise,
   right-click on the orange Ubuntu icon in the task bar and choose "Pin to
   taskbar"
1. Wait for it to install the local files
1. When prompted to "Enter new UNIX username", type your first name with no
   spaces
1. When prompted, enter and retype a password for this UNIX user (it can be the
   same as your Windows password)
1. Confirm your installation by typing the command `whoami` followed by Enter at
   the prompt (it should print your first name)
1. You need to update your packages, so type `sudo apt update` (if prompted for
   your password, enter it)
1. You need to upgrade your packages, so type `sudo apt upgrade`  (if prompted
   for your password, enter it)

## Git

Git comes with Ubuntu, so there's nothing to install. However, you should
configure it using the following instructions.

1. Open an Ubuntu terminal if you don't have one open already.
1. You need to configure Git, so type `git config --global user.name "Your
   Name"` with replacing "Your Name" with your real name.
1. You need to configure Git, so type `git config --global user.email
   your@email.com` with replacing "your@email.com" with your real email.

## Google Chrome

Test if you have Chrome installed by typing "Chrome" in the search box in the
bottom app bar that reads "Type here to search". If you see a search result that
reads "Chrome" with "App" under it, then you have it installed. Otherwise,
follow these instructions to install Google Chrome.

1. Open Microsoft Edge, the blue "e" in the task bar, and type in
   http://chrome.google.com. Click the "Download Chrome" button. Click the
   "Accept and Install" button after reading the terms of service. Click "Save"
   in the "What do you want to do with ChromeSetup.exe" dialog at the bottom of
   the window. When you have the option to "Run" it, do so. Answer the questions
   as you'd like. Set it as the default browser.
1. Right-click on the Chrome icon in the task bar and choose "Pin to taskbar"

## Node.js

Test if you have Node.js installed by opening an Ubuntu terminal and typing
`node --version`. If it reports "Command 'node' not found", then you need to
follow these directions.

1. In the Ubuntu terminal, type `sudo apt update` and press Enter
2. In the Ubuntu terminal, type `sudo apt install build-essential` and
   press Enter
3. In the Ubuntu terminal, type `curl -o-
   https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash` and
   press Enter
4. In the Ubuntu terminal, type `. ./.bashrc` and press Enter
5. In the Ubuntu terminal, type `nvm install --lts` and press Enter
6. Confirm that **node** is installed by typing `node --version` and seeing it
   print something that is not "Command not found"!

## Unzip

For your projects you will often have to download a zip file and unzip it. It is easier to do this from the command line. So we need to install a linux unzip utility.

In the Ubuntu terminal type: `sudo apt install unzip` and press Enter

## Mocha.js

Test if you have Mocha.js installed by opening an Ubuntu terminal and typing
`which mocha`. If it prints a path, then you're good. Otherwise, if it prints
nothing, install Mocha.js by typing `npm install -g mocha`.

## Python 3

Ubuntu does not come with Python 3. Install it using the command `sudo apt
install python3`. Test it by typing `python3 --version` and seeing it print a
number.

## *Note about WSL*

As of the time of writing of this document, WSL has an issue renaming or deleting files if Visual Studio Code is open.  So before doing any linux commands which manipulate files, make sure you **close** Visual Studio Code before running those commands in the Ubuntu terminal.

## Now, you have everything installed!

________________________________________________________________________________
# Setup & Installations on macOS Catalina or Mojave

Being a developer isn't just about hacking away into the wee hours of the
morning or debugging a new feature. All craftspeople must have mastery of their
tools to be successful in their trade, and programmers are no different. For a
developer the most important tools are our CLI, text editor, web browser,
compiler, package manager, and Node environment for running JavaScript. Mastery
of these tools will be invaluable for the entire duration of our careers.

This reading will cover the installation of the basic tools you'll need to run
code on your computer.

When you finish this reading, you should have:

- Installed Visual Studio Code (VS Code)
- Installed Node & NPM (Node Package Manager)
- Installed Google Chrome
- Installed Xcode & Homebrew (Mac)
- Installed Python 3

## Preparing your machine

The commands you need to enter are listed below. Here we will install basic
developer tools, such as [homebrew][homebrew] (a 3rd party package manager for
MacOS), [Xcode][xcode] (a library of developer tools provided by Apple), VS Code
(a full-featured text-editor), and Node (a JavaScript runtime environment).

### Chrome

Here at , our browser of choice is Google Chrome. This isn't super
important at the beginning of the course, but once we get into frontend
development (writing code that runs in a web browser) the Chrome Devtools will
be crucial for debugging every manner of issue.

To install Google Chrome, download the necessary files and follow the
instructions on the [Google Chrome website][chrome-dl].

[chrome-dl]: https://www.google.com/chrome/browser/desktop/index.html

### Xcode

Let's start with Xcode. The Xcode command line tools are a requirement for
installing the homebrew package manager in the next step.

**NOTE: If you are using a Linux machine you will not be able to install Xcode
or homebrew.**

Install the Xcode command line tools by running the following from the console.

```sh
$ xcode-select --install
```

To conclude the installation you will need to agree to the Xcode license. Start
the Xcode app, click "Agree", and allow the installation to finish. Then you can
go ahead and quit the Xcode app.

### Homebrew

Homebrew is kind of like a low-tech App Store. It allows us access to and the
ability to install a wide variety of software and command line tools from the
console. These are distinct from those hosted on the App Store and will need to
be managed by Homebrew.

Enter the following in your terminal to download and install Homebrew:

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

You will be given a list of dependencies that will be installed and prompted to
continue or abort. Press `RETURN` to continue.

Let's break this command down a bit. `curl`, a command-line tool commonly used
for downloading files from the internet, is used to download the Homebrew
installation file. The `"$(...)"` transforms the file content into a string.
Finally, the string is passed to a Ruby language executable (`/usr/bin/ruby` is
where the system Ruby executable file is stored on our machine) with the `-e`
flag to tell Ruby to run the argument as code.

Check out the [Homebrew website][homebrew] to learn the basic commands.

[xcode]: https://itunes.apple.com/us/app/xcode/id497799835
[homebrew]: https://brew.sh/

### Node.js & NPM

[Node.js][node] is a very powerful runtime environment built on Google Chrome's
JavaScript V8 Engine. It is used to develop I/O intensive applications like
video streaming sites, robots, and other general purpose applications. For our
purposes Node provides a way for us to run JavaScript outside of the browser.

We want to use a version manager with Node to help us manage potential conflicts
between versions and dependencies. In this case we will be using [NVM][nvm]
(Node Version Manager) to install/manage Node.js.

Open up your console (the Terminal application on Mac) and run the following:

```sh
# download and run the official install script
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# update your terminal config (you will now have access to the nvm command)
source ~/.bashrc

# install a stable version of node
nvm install 10.16

# set version 10.16.0 as default version
nvm use 10.16

# verify install/config
which node # => /Users/username/.nvm/versions/node/v10.16.0/bin/node
```

Node comes with a package manager called [NPM][npm], which provides access to a
whole ecosystem of libraries and tools we can use. NPM comes pre-bundled with
Node, so there is no additional work for us to do. By default we don't need any
additional libraries, and any additional packages we do need to use will be
installed on a project-by-project basis.

### VS Code

This one is pretty easy. Go to website for [Visual Studio Code][vs-code], then
download and install VS Code.

To verify that the shell commands were installed correctly, run `which code` in
your terminal. If `code` is not a recognized command, open the VS Code editor,
open the Command Palette (`Cmd+Shift+P` on macOS ,`Ctrl+Shift+P` on Linux) and
type `shell command` to find the `Shell Command: Install 'code' command in PATH`
command. Then restart the terminal. This will now allow you to easily open files
in VS Code from the terminal using the `code` command followed by a file or
directory.

Next, we'll want to install a few useful VS Code extensions and configure VS
Code to play nice with these extensions. Download [this zip
file][vscode-script], which contains a script that will do the work for you.
Unzip the file and open the `setup_vscode` directory. Navigate into that
directory in the terminal (drag and drop the folder over to the terminal icon on
macOS or right click in the directory and select `Open in Terminal` on most
Linux distributions).

To run the script, run the command:

```sh
~ ./setup-vs-code.sh
```

The script will do the rest. Now restart VS Code and you'll be good to go.

[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
[npm]: https://docs.npmjs.com/
[vs-code]: https://code.visualstudio.com/
[vscode-script]:
  https://-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/js-local/setup-vs-code.zip

### Mocha testing framework

The last thing we'll be installing will be Mocha. Mocha is a JavaScript testing
framework that we will be using to test our work in the future. Here are the
instructions of how to install `mocha`!

#### Installing Mocha

1. Open Terminal
2. Enter this command: `npm install -g mocha`
3. To test your installation, run the command: `mocha --version`. If it returns
   a version number, you've successfully installed mocha! Otherwise, let your
   instructor know and they'll help you fix things.

### Installing Python3

You can just use _homebrew_ for this install, too.

```
brew install python
```

## What you learned

How to install the various tools you'll need to create a development
environment.

After you finished this reading you should have the following installed:

- Virtual Studio Code (VS Code)
- Node & NPM (Node Package Manager)
- Mocha the JavaScript testing framework
- Google Chrome
- Xcode & Homebrew (Mac)
- Python 3

________________________________________________________________________________
## Running JavaScript Code

JavaScript is **the** language of the _Internet_! Whenever you browse your
favorite website (google, facebook, twitter, .io), your web browser is
executing JavaScript code. There are two main environments we use to run
JavaScript: the first is the browser (Chrome, Firefox, etc.) and the second is
Node. Writing code for the browser, (aka front end engineering), requires a lot
more than just understanding JavaScript, so we'll come back to that topic later
in the course. For now, we will concentrate on running JavaScript on our
computers using Node.

So what is [Node][node] exactly? [Node.js][node] is a very powerful runtime
environment built on Google Chrome's JavaScript V8 Engine. It is used to develop
I/O intensive applications like video streaming sites, robots, and other general
purpose applications. For our purposes the most advantageous feature of Node is
that it provides a way for us to run JavaScript outside of the browser.

Now that you have Node installed on your local computer it's time to run some
JavaScript! Running your own code on your own computer is a rite of passage for all
developers. We know you are up to the challenge!

By the end of this reading you should be able to:

- Use the Node REPL to test out simple expressions and functions
- Use VSCode to create a folder and a `.js` file within that folder
- Use Node to run a `.js` file

[node]: https://nodejs.org/en/

## Node REPL vs. JavaScript File

Before we begin running code we wanted to make a clear distinction. Using Node
there are two ways that we can run JavaScript code:

1. using the **Node REPL**
2. using Node to run a **.js file**

Both the Node REPL and using a JavaScript file are common ways to execute
JavaScript code, but they are useful in different scenarios:

**Node REPL** (Read, Evaluate, Print, Loop) is used for testing quick ideas. The
Node REPL is useful when playing around with any curiosities you have because
you can see how an expression is evaluated quickly. Any code that you type into
the Node REPL will be lost when you exit the REPL. If you've ever used a program
that let you write a line of code and execute it immediately, without a separate
command, then you've used a REPL.

**JS Files** are used for saving code for the long term. If you create a `.js`
file and save it then all the code within can be referenced and used later. When
you work on problem sets, projects, and anything else you want to save, you
should always save your code to a `.js` file!

### Using the Node REPL

To use the **Node REPL**, simply open up your command line (Terminal) and enter
the command `node`. In the examples below we use the `$` to show that we are in
the command line (in our case Terminal).

```js
~ $ node
Welcome to Node.js
Type ".help" for more information.
>
```

Notice that as soon as we enter the `node` command, we get a welcome message and
we see our Terminal icon change to look like this: `>`. This `>` icon means that
we are inside the Node REPL, so we can type any valid JavaScript lines and see
what they evaluate to:

```js
~ $ node
Welcome to Node.js
Type ".help" for more information.
> 1 + 1
2
> let message = "Hello" + "world"
undefined
> message
'Helloworld'
```

We can also define functions in the Node REPL though you'll find writing them in
that environment is not super fun due to the Node REPL not being optimized for
that kind of coding.

Here is an example of defining and invoking a function using `node`:

```js
~ $ node
Welcome to Node.js
Type ".help" for more information.

> function sayHello () {
... console.log("hello!");
... }
undefined
> sayHello();
hello!
```

If you want to exit the Node REPL, and head back to our plain old command line
enter the command `.exit` in the REPL. Doing this will get rid of the `>` icon,
which means we are no longer in the REPL. When we are back inside our command
line we can enter the normal commands (i.e `cd`, `ls`, `pwd`):

```js
$ node
> 1 + 1
2
> "How do I get out of here" + "!?!?"
'How do I get out of here!?!?'
> .exit
~ $
```

### Using JavaScript Files

The first thing you'll need in order to run a JavaScript file is to create a
file that will contain the code you will be running. A new file is like a blank
canvas - just awaiting the chance to be made into art.

If you don't currently have a dedicated coding folder start off by creating a
new folder somewhere accessible, like your `Desktop` folder. Then you can open
that folder using VS Code. From there you can simply create a "New File". In
order to create a JavaScript file, make sure that you change the file name to
one that ends in `.js`, for example `myFile.js`.

Now take a moment to enter some code into your new `.js` file like the
following:

```js
// Work/myFile.js
console.log("hello world!");
```

Don't forget to save the file with your new code!

Now to run a JS file you need to first go into the folder that contains that
file by using `cd` in your command line. Feel free to use `ls` to list your
folders and see where you have to go. Once you are inside of the correct folder,
run `node <fileName>`, for example `node myFile.js`. When you enter these
commands, be aware of the capitalization. **File names are case sensitive**!

```sh
~ $ ls
Downloads
Desktop
Music
Videos

~ $ cd Desktop
~ Desktop $ ls
Work

~ Desktop $ cd Work

~ Work $ ls
myFile.js

~ Work $ node myFile.js
Hello world

```

That is how you run JavaScript on your local computer! You create and save a
file, navigate to that file in your terminal, then run the file using the `node`
command followed by the filename (`node <fileName>`).

## What you learned

- How to use the Node REPL to test out simple expressions and functions
- How to use VSCode to create a folder and a `.js` file within that folder
- How to use Node to run a `.js` file

________________________________________________________________________________
# Running JavaScript Locally

Now it's time to become a leet Hacker and put your new found Terminal skills to
the test! In the past you have been writing JavaScript within the confines of
the  Online platform but it's time to break free and start writing
code on your local computer.

In this project we'll be working VS Code to create new folders and files, Node
to run JavaScript, and `mocha` to help us run tests.

## Phase 1: Creating files and folders

We'll kick off this project by creating a folder for to contain the code you
write. This would be a good time to create a folder for your work here at App
Academy. Feel free to name the folder whatever you like - just make sure you
remember where you put it (the Desktop is the ideal place)! Once you've created
a folder for your work create a new folder within that folder. This folder will
be representative of some of the work you do for this project, so name it
`firstProject`.

The first thing you'll want to do with this `firstProject` folder is open it up
in VS Code. Once you've entered VS Code you can go to "File" then "New File" to
create a new file. Name this file `phaseOne.js`.

Now we'll teach you a fun trick - in the Sidebar of VS Code you should see the
folder named `firstProject` and if you click the arrow beside it you should see
the file named `phaseOne.js`. Let's create a second file in the `firstProject`
directory but this time we'll use a nifty VS code shortcut. If you click within
the `firstProject` folder and type `a` then a new file will be automatically
created and you will be able to quickly name this file. Here is a gif of us
doing the same thing:

![gif](images/file-name-gif.gif)

So you can use both the "New File" option or the above shortcut to create new
files. Additionally, you create subdirectories within a directory by typing
`Shift + a`. For now create new files and folders using whatever method is most
comfortable.

Name the second file you created above `phaseTwo.js` and let's go run some
JavaScript.

## Phase 2: Using Node to run JavaScript files

### Phase 2A: Using the Node REPL

The first way we'll run JavaScript today is by using the Node REPL. Open a
window of the Terminal application and type in the command:

```sh
~ $ node
>
```

You should see your icon change to look like this: `>`. Now do the following to
get comfortable with using the Node REPL:

1. Write a `console.log` statement that will print "Hello Node!"
2. Write four mathematical expressions:
   - each using one of the following symbols: `+`, `-`, `*` and `%`
3. Write a function named `addTwo` that will accept a number as an argument and
   then will `return` the number with `2` added to it. Next, invoke `addTwo`
   passing in a number as an argument.

The Node REPL is an interactive code environment which allows you to test how
JavaScript will react to simple expressions.  Learning to use a REPL to test
ideas and to ask your coding environment questions (as shown in the above
simple and quick problems) is a great way to teach yourself, and become more
self-sufficient as a programmer.

### Phase 2B: Using Node to run JavaScript files

In the `phaseOne.js` file we previously created write a simple `console.log`
statement that will print "Look at me go!" to the console. Next, open a window
of the Terminal application on your computer and navigate to the `firstProject`
directory. Once inside the directory run the code within the `phaseOne.js` file
by using the following command:

```sh
~ firstProject $ node phaseOne.js
```

You should see "Look at me go!" printed to the console.

Congratulations, you've just run JavaScript on your computer using both the Node
REPL and by running a `.js` file!

Celebrate your victory by writing a new function in the `phaseTwo.js` file.
Write a function named `helloNode` that when invoked will `return` the string
"Hello Node". Try invoking your function below where you defined it and use
`node` to run the file:

```sh
~ firstProject $ node phaseTwo.js
~ firstProject $
```

Notice how you don't see anything printed to the console! That is because we
`return`ed the value but didn't print it to the console. Now try wrapping your
function call for `helloNode` in a `console.log` statement. Then run the
`phaseTwo.js` file again using `node`. You should see "Hello Node" printed to
the console.

Nice! You've now written and run a function using a `.js` file. For the rest of
this course you will be utilizing VS Code and Node to write and run code.

## Phase 3: Running tests using Mocha

At work, you will often be writing tests for your own code to ensure it works.
Here at  you will primarily be running tests we have written for you
to guide your development. Now that you know how to write and run code in this
environment let's practice using `mocha` to _test_ the output of functions.
We'll do a deep dive into testing practices soon - but for now know that
**testing** is how we can ensure that functions work the way we expect them to.
While you had previously used `console.log` to see if your functions gave the
expected output when given a certain input, Mocha automates this process for
you.

We will now go over an important testing workflow you'll be using a lot in the
future of this course. The workflow we are talking about breaks down into
several steps:

1. Download problems & tests
2. Start working on an individual problem
3. Run tests (also known as `specs`) to see if you have solved the problem
   successfully
4. Move onto to the next problem and repeat steps 2 & 3

We'll now walk through what each of these steps entails.

#### Step One: Download problems & tests

- Click [here][skeleton] to download a `.zip` file containing the problems
  you'll be working on.
> *Note:* If you use Windows you might find it easier to use `curl` to download the zip file into your WSL. Here's how to do that:
> 1) right click on the link to the zip file and copy the link to your clipboard
> 2) In the Ubuntu Terminal type the following:
> `curl -o skeleton.zip ` and then paste in the link you copied and press Enter. This will download the zip file into your current directory. It should look something like this: `curl -o skeleton.zip https://-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/js-local/skeleton.zip`
> 3) Use `unzip` to unzip the file like this: `unzip skeleton.zip`
>
> You can use this method anytime you need to download zip files for your projects.

- Unzip/Uncompress the file somewhere you can access easily, like your `Desktop`
  folder. Unzipping the file will leave you with a folder named `skeleton`.
- Within the `skeleton` folder there will be folder named `problems`. You'll now
  be working on completing each of these problem in order.

#### Step Two: Start working on an individual problem

- Open up the `problems` folder in VS Code, you'll see the problems are numbered
  in sequential order.

**Only write your code to the `.js` files in the `problems` folder. Do not move
or edit any of the files in the `test` folder. Also, do not change the names of
the files in the `problems` folder.** The reason for this is because the tests
are expecting to find the files in a certain place and with the names we
provided for each function. Moving or editing files could cause the tests to
break.

#### Step Three: Run tests to see if you have solved the problem successfully

- In your Terminal, use the `cd` command to navigate into the `skeleton` folder.
  - _Note_: If you unzipped the `skeleton` onto your `Desktop`, you need to `cd`
    into your `Desktop` first, then `cd` into `skeleton`.
- From here you can now use the `mocha` command to run the problem set against
  the mocha test cases we provided:

```sh
~ skeleton $ mocha
```

- If you scroll up toward the top of the `mocha` output, you will see a quick
  breakdown of what specs were passed. You can test with `mocha` as many times
  as you want to!

Here is an example of setting up a problem set in the command line:

```sh
~ $ cd Desktop/
~ Desktop $ ls
 skeleton

~ Desktop $ cd skeleton/

~ skeleton $ ls
 problems test

~ skeleton $ mocha
  diffArrayLen()
    1) should return a boolean indicating the lengths of the arrays are the same

  avgValue()
    2) should return the average of an array of numbers

  ... etc.

  0 passing
  9 failing
```

If you have any trouble with this don't hesitate to ask a TA for help!

You can feel free at any point to move your `skeleton` folder into the
`firstProject` folder you created in the previous phase. Just make you you
navigate to it correctly!

#### A note about testing manually

- If you'd like to test a problem manually (without Mocha), you can still do
  that. You can wrap function invocations in `console.log` statements below
  where each function is defined in the file.
  - Then you can `cd` into the `skeleton` folder and run the individual `.js`
    files using `node`. (for example: `node 01-diff-array-lens.js`)
- Before moving on from a problem, be sure to verify your function works as
  expected using `mocha`.

Now go forth and solve the problems you've been given! Once you've passed all
the tests give yourself a pat on the back for passing your first series of
specs. May you have many more passed specs in your future! 🙌

[skeleton]:
  https://-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/js-local/skeleton.zip

________________________________________________________________________________
# WEEK-02 DAY-2<br>*Pojo* {ignore=true}
________________________________________________________________________________
# Plain Old JS Object Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Label variables as either Primitive vs. Reference
2. Identify when to use . vs [] when accessing values of an object
3. Use the `obj[key] !== undefined` pattern to check if a given variable that
   contains a key exists in an object
4. Utilize Object.keys and Object.values in a function
5. Iterate through an object using a `for in` loop
6. Define a function that utilizes ...rest syntax to accept an arbitrary number
   of arguments
7. Use ...spread syntax for Object literals and Array literals
8. Destructure an array to reference specific elements
9. Destructure an object to reference specific values
10. Write a function that accepts a array as an argument and returns an object
    representing the count of each character in the arraye terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Label variables as either Primitive vs. Reference
2. Identify when to use . vs [] when accessing values of an object
3. Use the `obj[key] !== undefined` pattern to check if a given variable that
   contains a key exists in an object
4. Utilize Object.keys and Object.values in a function
5. Iterate through an object using a `for in` loop
6. Define a function that utilizes ...rest syntax to accept an arbitrary number
   of arguments
7. Use ...spread syntax for Object literals and Array literals
8. Destructure an array to reference specific elements
9. Destructure an object to reference specific values
10. Write a function that accepts a array as an argument and returns an object
    representing the count of each character in the array

________________________________________________________________________________
# Pair Programming Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Differentiate between the "Driver" and "Navigator" roles in a pair programming session.
2. Describe at least three benefits of effective pair programming.
3. Demonstrate empathetic communication and be able to explain the meaning of "You are not your code".
4. Identify negative interactions during a pair programming session.
5. Identify the exact steps of a/A's pair programming process.
6. Describe the importance of pair programming competency while interviewing for jobs.erminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Differentiate between the "Driver" and "Navigator" roles in a pair programming session.
2. Describe at least three benefits of effective pair programming.
3. Demonstrate empathetic communication and be able to explain the meaning of "You are not your code".
4. Identify negative interactions during a pair programming session.
5. Identify the exact steps of a/A's pair programming process.
6. Describe the importance of pair programming competency while interviewing for jobs.

________________________________________________________________________________
# The Object Type

Up to this point you've interacted with a lot of different data types in
JavaScript. Now it's time to introduce one of the most diverse and widely used
data types of all: **`Objects`**.

An object is a data structure that stores other data, similar to how an array
stores elements. An object differs in that each `value` stored in an object is
associated with a `key`. `Keys` are almost always strings while `values` can be
any data type: numbers, strings, functions, arrays, other objects, anything at
all!

When you finish this reading, you should be able to:

1. Create objects using correct syntax with a variety of values.
2. Identify that an object is an unordered collection of values.
3. Key into an object to receive a single value using both Bracket and Dot
   notation
4. Use Bracket notation to set a variable as a key in a Object.
5. Implement a check to see if a key already exists within an Object.
6. Understand how object precedence fits in with dot notation for objects.

## The object of my affections

To reiterate, an object is a data structure that stores other data. In other
programming languages similar data structures to the Object type are referred to
as 'dictionaries', 'maps', or 'associative arrays'. Objects are different from
the previous data structures we've talked about (i.e. arrays) in two important
ways:

1.  Instead of accessing values within an object through an index with numbers,
    objects are indexed using `keys`.

    - This allows us to access values quickly and efficiently. We'll be talking
      a more more about this point later on in the course.

2.  Order is **not** guaranteed within an Object. When you iterate through the
    values in an object, they may not be in the same order as when they were
    entered.

Objects are defined by using curly braces: `{}`. See below for an example:

```js
> let car = {};
undefined

// here is our new empty object!
> car
{}
```

**Fun Fact**: Objects are known by the affectionate industry jargon: Plain Old
JavaScript Objects (or POJO for short). Expect to see that short-hand often!

## Setting keys and values

When learning about objects it can be helpful to think about real life objects.
For instance think about a car. A real life car can have a color, a number of
wheels, a number of seats, a weight, etc. So a real life car has a number of
different properties that you wouldn't list in any particular order, though all
those properties define the characteristics of that car.

Thinking of a car - let's create a `car` object to represent that collection of
properties. We can create new `key`-`value` pairs using bracket notation `[]`
and assignment `=`. Notice that the key inside the brackets is represented with
a string:

```js
// here "color" is the key!
> car["color"] = "Blue";
"Blue"

> car["seats"] = 2;
2

// accessing our object at the key of color
> car["color"]
"Blue"

> car["seats"]
2

> car
{color: "Blue", seats: 2}
```

When we enter `car["color"]`, we are using `"color"` as our `key`. You can think
of `keys` and `values` in an object just like a lock and key in real life. The
`"color"` key "unlocks" the corresponding value to give us our `car`'s color,
`"Blue"`!

### Keys without values

What happens if we try to access a key that we have not yet assigned within an
object?

```js
> car
{color: "Blue", seats: 2}

> car["weight"]
undefined
```

**If we try to access a key that is not inside an object we get `undefined`**.
This falls right into place with our understanding of where `undefined` shows up
in JavaScript. It's the common default value of a lot of things. The `undefined`
type is the default for unassigned variables, functions without a `return`,
out-of-array elements, and non-existent object values.

Using this knowledge, we can check if a key exists in an object:

```js
> car
{color: "Blue", seats: 2}

> car["color"]
"Blue"

> car["color"] === undefined;
false

> car["weight"] === undefined;
true
```

While this is a common pattern, in modern JS the preferred method to check if an
object exists in a key is to use the `in` operator:

```js
> car
{color: "Blue", seats: 2}

> "color" in car;
true

> "model" in car;
false
```


### Using variables as keys

So we've talked about assigning string keys within Objects. Additionally, we
know how to create variables that have strings as values. Sooo... you might be
thinking: what happens if we assign a variable with a string value as a `key`
within an `Object`? Glad you asked! Let's look at an example below for setting
keys within `Objects` using `variables`.

Let's keep playing with the `car` we made previously:

```js
> car
{color: "Blue", seats: 2}

> let newVariable = "color";
undefined

> newVariable
"color"

> car[newVariable]
"Blue"

> car["color"]
"Blue"
```

Aha! Of course we can use a variable as our key! A variable _always_ evaluates
to the value we assigned it. So `car[newVariable]` and `car["color"]` are
equivalent! Why is this useful? We know that variables can change; so now the
keys we use for objects can change!

Let's take a look at what happens when we change the variable above:

```js
> car
{color: "Blue", seats: 2}

> newVariable
"color"

> newVariable = "weight";
undefined

> car[newVariable]
undefined

// car doesn't change because we didn't *assign* the new variable key in our object
> car
{color: "Blue", seats: 2}
```

We can now use our newly assigned variable to set a _new key_ in our object:

```js

> car
{color: "Blue", seats: 2}

> newVariable
"weight"

// assigning a key value pair using a variable!
> car[newVariable] = 1000;
1000

> car
{color: "Blue", seats: 2, weight: 1000}
```

## Using different notations

So far we've shown how to access and set values in objects using `object[key]` -
also known as _Bracket Notation_. However, this is only one of two ways to
access values within an object. The second way we can access values within an
object is called _Dot Notation_. We can use `.` to assign and access our
key-value pairs. The easiest to notice difference is when we use _dot notation_,
we don't need to use string quotes as the key:

```js
> let dog = {};
undefined

> dog.bark = "Bowowowo";
"Bowowowowo"

> dog.bark
"Bowowowo"

> dog
{ bark: "Bowowowowo" }
```

### Bracket notation vs Dot notation

Now that we know two ways to access values of an object, you are probably asking
yourself: which one should you use? Here is a quick list of pros for each.

**Dot notation:**

- easier to read
- easier to write because we don't have to deal with using quotation marks
- **cannot** use variables as keys
- keys can't contain numbers as their first character (`object.1key` doesn't
  work!)

**Bracket notation Pros:**

- you can use variables (assigned to string values) as keys!
- It is okay to use variables and Strings that start with numbers as keys
  (use `object['1key']` does work, while `object.1key` does not)

There are tradeoffs and advantages for either notation, so practice using both!
You will learn quickly that there are **a ton** of different ways to write the
same thing in JavaScript. Having both of these options available to you will
allow you to use different tools to solve different problems.

One of the most fun parts of being a programmer is the ability to come up with
different solutions to the same problem. So you should have both types of
notation in your tool-belt to be a versatile programmer!

Let's look at the difference:

```js
let myDog = {};
myDog.name = "Fido";

// let's use a variable as our key and some bracket notation:
let myKey = "name";
console.log(myDog); // prints `{name: "Fido"}`
console.log(myDog[myKey]); // prints `Fido`

// what if we try to use the variable in dot notation:
// the below is interpreted as myDog['myKey']
console.log(myDog.myKey); // prints: undefined
```

When we use dot notation to write `myDog.myKey`, `myKey` will **not be
interpreted by JavaScript as a variable**. The text we write after the `.` will
be used as the **literal** key. Remember that if we try to use a key that does
not exist in an object, we get back the default value of `undefined`.

```js
// continued from above

console.log(myDog.myKey); // prints `undefined`
myDog.myKey = "???";
console.log(myDog); // prints `{name: "Fido", myKey: "???"}`
console.log(myDog.myKey); // prints `???`
// mind === "blown"
```

### Putting it all together

We can also create an entire object in a single statement:

```js
let myDog = {
  name: "Fido",
  type: "Doge",
  age: 2,
  favoriteToys: ["bone", "ball"]
};

console.log(myDog.age); // prints 2
console.log(myDog["favoriteToys"]); // prints ["bone", "ball"]
```

### Operator precedence revisited

Just like with math and logical operators, the concepts of [operator precedence]
also pertain to objects. Associativity determines the order of operation, along
with precedence. There are two types of associativity: right-associativity and
left-associativity.

**Right-associativity** is when code is evaluated right-to-left. Let's take a
closer look at what is happening in the line of code below:

```js
a = b = 1;
```

1. Variable `b` is assigned as `1`.
2. Variable `a` is assigned as `b = 1`.
3. `b = 1` returns the value `1`, so variable `a` is now assigned as `1`.

The assignment of variables takes lowest precedence, which is why we evaluate
the return value of `b = 1` before completing the assignment of variable `a`.

The example below is **left-associativity** is when code is evaluated
left-to-right. It evaluates the `document.getElementById` method before
accessing `value`.

```js
let id = "header";
let element = document.getElementById(id).value;
```

1. We resolve the `document` variable to be the _document object_.
2. We use dot notation to retrieve the `getElementById` function. (The function
   is a property of the _document object_).
3. We attempt to call it, but before the call can proceed we must first evaluate
   the function's arguments.
4. We resolve the `id` variable to be the string `"header"`.
5. The `getELementById` function returns an _HTMLElement object_ and then uses
   dot notation to access `value`.
6. Finally we do assignment which is the LOWEST precedence (that's why
   assignment happens last). Its associativity is right to left, so we take the
   value on the right and assign it to the left.

Now let's dive into the example below. Resolving the variables to their values
happens before the operators.

```js
add(number1, number2) + number3;
```

1. `number3` is resolved to its value.
2. The function is invoked, but its variables need to be resolved.
3. `number1` and `number2` are resolved to their values.
4. The function is invoked so `number1`, `number2`, and `number3` are finally
   added together!

## What you learned

In this reading we covered:

- Objects are un-ordered data structures consisting of key and value pairs.
- Object `keys` are strings, but their `values` can be anything (arrays,
  numbers, strings, functions, etc.)
- Setting key and value pairs using both Bracket and Dot notation
  - Using Bracket notation to set variables as `keys` in Objects
- The default value when accessing a key **not** in an object is `undefined`
  - How to check if a key is already within an object using the `object[key] ===
    undefined` pattern

[operator precedence]:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

________________________________________________________________________________
# Iterating Through Objects

In the previous reading we mentioned that Objects store _unordered_
`key`-`value` pairs. With Objects we can not rely on indices to access values.
Meaning - we'll have to iterate through objects in new ways to access the keys
and values within.

When you finish this reading, you should be able to:

1. Iterate through Object `keys` and `values` using a `for...in` loop
2. Use the `Object.keys` and the `Object.values` methods to iterate through an
   Object

## A new Kind of `for` Loop

We can use special syntax to iterate through each `key` of an object (in
arbitrary order). This is super useful for looping through **both** the keys and
values of an object.

The general syntax looks like this:

```js
// The current key is assigned to *variable* on each iteration.
for (let variable in object) {
  statement;
}
```

This syntax is best shown by example:

```js
let obj = { name: "Rose", cats: 2 };

// The key we are accessing is assigned to the `currentKey`
// *variable* on each iteration.
for (let currentKey in obj) {
  console.log(currentKey);
}

// prints out:
// name
// cats
```

The example above prints all the keys found in `obj` to the screen. On each
iteration of the loop, the `key` we are currently accessing is assigned to the
`currentKey` variable. Now, keys are nice but what about _values_?

If we want to access values in an object, we would throw some bracket notation
into the mix:

```js
let obj = { name: "Rose", cats: 2 };

for (let key in obj) {
  let value = obj[key];
  console.log(value);
}

// prints out:
// Rose
// 2
```

Here's some food for thought: Why can't we use dot notation to iterate through
an object's values? For example, what if we replaced `obj[key]` with `obj.key` in
the above code snippet? Try it for yourself. As we previously covered - you can
only use variable keys when using bracket notation (`obj[key]`)!

Like all variables, you can name the current key variable whatever you like -
just be descriptive! Here is an example of using a descriptive name for a key
variable:

```js
let employees = {
  manager: "Angela",
  sales: "Gracie",
  service: "Paul"
};

for (let title in employees) {
  let person = employees[title];
  console.log(person);
}

// prints out:
// Angela
// Gracie
// Paul
```

## Methods vs Functions

Before we dive further into iterating with Objects we'll take a moment to talk
about _methods_. A **method** is essentially a function that _belongs to_ an
object. That means that every _method is a function_, but **not** every function
is a method.

- `myFunc` is a function
- `myObject.myFunc` is a _method_ of the object `myObject`
- `myObject["myFunc"]` is a _method_ of the object `myObject`

A method is just a key-value pair where the **key is the function name and the
value is the function definition**! Let's use what we learned earlier to teach
our dog some new tricks:

```js
let dog = {
  name: "Fido"
};

// defining a new key-value pair where the *function name* is the key
// the function itself is the value!
dog.bark = function() {
  console.log("bark bark!");
};

// this is the same thing as above just using Bracket Notation
dog["speak"] = function(string) {
  console.log("WOOF " + string + " WOOF!!!");
};

dog.bark(); // prints `bark bark!`
dog.speak("pizza"); // prints `WOOF pizza WOOF!!!`
```

Additionally, we can give objects methods when we initialize them:

```js
let dog2 = {
  name: "Rover",

  bark: function() {
    console.log("bork bork!");
  },

  speak: function(string) {
    console.log("BORK " + string + " BORK!!!");
  }
};
// Notice that in the object above, we still separate the key-value pairs with commas.
// `bark` and `speak` are just keys with functions as values.

dog2.bark(); // prints `bork bork!`
dog2.speak("burrito"); // prints `BORK burrito BORK!!!`
```

Methods are just plain old functions at heart. They act like the functions we
know and love - define parameters, accept arguments, return data, etc. A method
is just a function that belongs to an object. To invoke, or call, a method we
need to specify **which** object is calling that method. In the code snippet
above the `dog2` object had the `bark` method so to invoke `bark` we had to
specify it was `dog2`'s method: `dog2.bark()`. More generally the pattern goes:
`myObject.methodName()`.

## Useful Object Methods

### Iterating through keys using **`Object.keys`**

The `Object.keys` method accepts an object as the argument and returns an array
of the _keys_ within that Object.

```js
> let dog = {name: "Fido", age: "2"}
undefined

> Object.keys(dog)
['name', 'age']

> let cup = {color: "Red", contents: "coffee", weight: 5}
undefined

> Object.keys(cup)
['color', 'contents', 'weight']

```

The return value of `Object.keys` method is an array of keys - which is useful
for iterating!

### Iterating through keys using **`Object.values`**

The `Object.values` method accepts an object as the argument and returns an
array of the _values_ within that Object.

```js
> let dog = {name: "Fido", age: "2"}
undefined

> Object.values(dog)
['Fido', '2']

> let cup = {color: "Red", contents: "coffee", weight: 5}
undefined

> Object.keys(cup)
['Red', 'coffee', 5]

```

The return value of `Object.values` method is an array of values - which is
useful for iterating!

#### Iterating through an Object's keys & values

So we have gone over how `Object.keys` gives you the keys on an object and
`Object.values` gives you the values, but what if you want both the _keys_ and
the _values_ corresponding to each other in an array?

The `Object.entries` method accepts an object as the argument and returns an
array of the `[key, value]` pairs within that Object.

Let's look at a quick demo:

```js
> let cat = {name: "Freyja", color: "orange"}
undefined

> Object.entries(cat)
[ [ 'name', 'Freyja' ], [ 'color', 'orange' ] ]
```

## What you learned

Objects may be an unordered collection of `key`-`value` pairs but that doesn't
mean you can't iterate through them!

In his reading we covered:

- How to define and invoke methods on Objects
- The `Object.keys` and `Object.values` functions
- How to iterate through a Object using a `for...in` loop

________________________________________________________________________________
# Reference vs. Primitive Types

At this point you've worked with many different data types - booleans, numbers,
strings, arrays, objects, etc. It's now time to to go a little more in depth
into the differences between these data types.

When you finish this reading, you should be able to:

- Identify whether a data type is a Primitive type or a Reference type.

## Primitives vs. Objects

JavaScript has many data types, six of which you've encountered so far:

**Five Primitive Types**:

1. `Boolean` - `true` and `false`
2. `Null` - represents the intentional absence of value.
3. `Undefined` - default return value for many things in JavaScript.
4. `Number` - like the numbers we usually use (`15`, `4`, `42`)
5. `String` - ordered collection of characters ('apple')

**One Reference Type**:

1.  `Object` - (an array is also a kind of object)!

You might be wondering about why we separated these data types into two
categories - Reference & Primitive. Let's talk about the one of the main ways
_Reference Types_ and _Primitive Types_ differ:

- _Primitive types_ are **immutable**. Meaning they cannot change.

## Immutability

When we talk about primitive types the first thing we mentioned was
_mutability_. Primitives are **immutable** meaning they can not be directly
changed. Let's look at an example:

```js
let num1 = 5;
// here we assign num2 to point at the value of the number variable
let num2 = num1;

// here we *reassign* the num1 variable
num1 = num1 + 3;

console.log(num1); // 8
console.log(num2); // 5
```

Whoa wait whaaaat? Let's break this down was just happened with some visuals. We
start by assigning `num1`. JavaScript already knows that the number `5` is a
primitive number value. So when we are assigning `num1` to the value of 5 we are
actually telling the `num1` variable to point to the place the number 5 takes up
in our computer's memory:

![num-one](images/assignment-num1.png)

Next we assign `num2` to the **value** of `num1`. What effectively happens when
we do this is we are _copying_ the value of `num1` and then pointing `num2` at
that copy:

![num-two](images/assignment-num2.png)

Now here is where it gets really _interesting_. We cannot change the 5 our
computer has in memory - because it is a **primitive** data type. Meaning if we
want `num1` to equal 8 we need to **reassign** the value of the `num1` variable.
When we are talking about _primitives_ reassignment breaks down into simply
having your variable point somewhere else in memory:

![num-three](images/assignment-num3.png)

All this comes together in `num1` now pointing at a new value in our computer's
memory. Where does this leave `num2`? Well because we never reassigned `num2` it
is still pointing at the value it originally copied from `num1` and pointing to
5 in memory.

So that in essence is **immutability**, you can not change the values in memory
only reassign where your variables are pointing.

Let's do another quick example using booleans:

```js
let first = true;
let second = first;

first = false;

// first and second point to different places in memory
console.log(first); // false
console.log(second); // true
```

### Mutability

Let's now talk about the inverse of immutability: mutability.

Let's take a look at what we call **reference** values which **are** mutable.
When you assign a reference value from one variable to a second variable, the
value stored in the first variable is also copied into the location of the
second variable.

Let's look at an example using objects:

```js
let cat1 = { name: "apples", breed: "tabby" };
let cat2 = cat1;

cat1.name = "Lucy";

console.log(cat1); // => {name: "Lucy", breed: "tabby"}
console.log(cat2); // => {name: "Lucy", breed: "tabby"}
```

Here is a visualization of what happened above. First we create `cat1` then
assign `cat2` to the value of `cat1`. This means that both `cat1` and `cat2` are
pointing to the **same object** in our computer's memory:

![num-five](images/assignment-num5.png)

Now looking at the code above we can see what when we change **either** `cat1`
or `cat2`, since they are both pointing to the same place in memory, **both**
will change:

![num-four](images/assignment-num4.png)

This holds true of arrays as well. Arrays are a kind of object - though
obviously different. We'll go a lot deeper into this when we start talking about
classes - but for now concentrate on the fact that arrays are also a _Reference
Type_.

See below for an example:

```js
let array1 = [14, "potato"];
let array2 = array1;

array1[0] = "banana";

console.log(array1); // => ["banana", "potato"]
console.log(array2); // => ["banana", "potato"]
```

If we change `array1` we also change `array2` because both are pointing to the
same _reference_ in the computer's memory.

## What you learned

- How to work with variables that are both Primitive types and Reference types.

________________________________________________________________________________
# Using the Spread Operator and Rest Parameter Syntax

When writing functions in JavaScript you gain a certain flexibility that other
programming languages don't allow. As we have previously covered, JavaScript
functions will happily take fewer arguments than specified, or more arguments
than specified. This flexibility can be taken advantage of by using the _spread
operator_ and _rest parameter_ syntax.

When you finish this reading, you should be able to:

1. Use rest parameter syntax to accept an arbitrary number of arguments inside a
   function.
2. Use spread operator syntax with both Objects and Arrays.

## Accepting arguments

Before we jump into talking about using new syntax let's quickly recap on what
we already know about functions.

### Functions with fewer arguments than specified

As we've previously covered, JavaScript functions can take fewer arguments than
expected. If a parameter has been declared when the function itself was defined,
then the default value of that parameter is `undefined`.

Below is an example of a function with a defined parameter both with and without
an argument being passed in:

```javascript
function tester(arg) {
  return arg;
}

console.log(tester(5)); // => prints: 5
console.log(tester()); // => prints: undefined
```

Always keep in mind that a function will still run even if it has been passed no
arguments at all.

### More arguments than specified

JavaScript functions will also accept more arguments than were previously
defined by parameters.

Below is an example of a function with extra arguments being passed in:

```javascript
function adder(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

// adder will assign the first two parameters to the passed in arguments
// and ignore the rest
console.log(adder(2, 3, 4)); // => 5
console.log(adder(1, 5, 19, 100, 13)); // => 6
```

## Utilizing Rest Parameters

We know that JavaScript functions can take in extra arguments - but how do we
access those extra arguments? For the above example of the `adder` function: how
could we add all incoming arguments - even the ones we didn't define as
parameters?

**Rest parameter** syntax allows us to capture all of a function's incoming
arguments into an array. Let's take a look at the syntax:

```js
// to use the rest parameter you use ... then the name of the array
// the arguments will be contained within
function tester(...restOfArgs) {
  // ...
}
```

In order to use _rest parameter_ syntax a function's last parameter can be
prefixed with `...` which will then cause all remaining arguments to be placed
within an array. Only the **last parameter** can be a _rest parameter_.

Here is a simple example using _rest parameter_ syntax to capture all incoming
arguments into an array:

```js
function logArguments(...allArguments) {
  console.log(allArguments);
}

logArguments("apple", 15, 3); // prints: ["apple", 15, 3]
```

For a more practical example let's expand on our `adder` function from before
using _rest parameter syntax_:

```javascript
function adder(num1, ...otherNums) {
  console.log("The first number is: " + num1);
  let sum = num1;

  // captures all other arguments into an array and adds them to our sum
  otherNums.forEach(function(num) {
    sum += num;
  });

  console.log("The sum is: " + sum);
}

adder(2, 3, 4);
// prints out:
// The first number is: 2
// The sum is: 9
```

To recap - we can use the _rest parameter_ to capture a function's incoming
arguments into an array.

## Utilizing Spread Syntax

Let's now talk about a very interesting and useful operator in JavaScript. In
essence, the _spread operator_ allows you to break down a data type into the
elements that make it up.

The _spread operator_ has two basic behaviors:

1. Take a data type (i.e. an array, an object) and _spread_ the values of that
   type where **elements** are expected
2. Take an iterable data type (an array or a string) and _spread_ the elements
   of that type where **arguments** are expected.

### Spreading elements

The spread operator is very useful for _spreading_ the values of an array or
object where comma-separated elements are expected.

**Spread operator** syntax is very similar to rest parameter syntax but they do
very different things:

```js
let numArray = [1, 2, 3];

// here we are taking `numArray` and *spreading* it into a new array where
// comma separated elements are expected to be
let moreNums = [...numArray, 4, 5, 6];

> moreNums
// => [1, 2, 3, 4, 5, 6]
```

In the above example you can see we used the spread operator to _spread_ the
values of `numArray` into a new array. Previously we used the `concat` method
for this purpose, but we can now accomplish the same behavior using the _spread
operator_.

We can also _spread_ Objects! Using the spread operator you can _spread_ the
`key`-`value` pairs from one object and into another new object.

Here is an example:

```js
let colors = { red: "scarlet", blue: "aquamarine" };
let newColors = { ...colors };

> newColors
// { red: "scarlet", blue: "aquamarine" };
```

Just like we previously showed with arrays, we can use this spread behavior to
_merge_ objects together:

```js
let colors = { red: "scarlet", blue: "aquamarine" };
let colors2 = { green: "forest", yellow: "sunflower" };

let moreColors = { ...colors, ...colors2 };

> moreColors
// {red: "scarlet", blue: "aquamarine", green: "forest", yellow: "sunflower"}
```

### Spreading arguments

The other scenario in which _spread_ proves useful is _spreading_ an iterable
data type into the passed in arguments of a function. To clarify, when we say
_iterable_ data types we mean arrays and string, **not Objects**.

Here is a common example of spreading an array into a function's arguments:

```javascript
function speak(verb, noun) {
  return "I like to go " + verb + " with " + noun + ".";
}

const words = ["running", "Jet"];

console.log(speak("running", "Jet")); // => I like to go running with Jet.
console.log(speak(...words)); // => I like to go running with Jet.
```

Using _spread_ allowed us to pass in the `words` array, which was then broken
down into the separate parameters of the `speak` function. The spread operator
allows you to pass an array as an argument to a function and the values of that
array be will be _spread_ to fill in the separate parameters.

## What you learned

_Rest parameter_ syntax may look like _spread operator_ syntax but they are
pretty much opposites<sup>[1]</sup>:

1. Spread 'expands' a data type into its elements
2. Rest collects multiple elements and 'condenses' them into a single data type.

[1]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Rest_syntax_(parameters)

What this reading covered:

- JavaScript functions can accept any number of arguments
- Using rest parameter syntax we can capture the arguments of a JavaScript
  function in an array
- Using _spread operator_ syntax to spread iterable data types where arguments
  or values are expected
  - Using the spread operator to spread an array and object into their separate
    elements

________________________________________________________________________________
# Destructuring

Up to this point we've learned how to collect related values and elements and
store them in lovely data structures. Now it's time to tear those data
structures down to the ground! Just kidding. In this reading we will be talking
about the concept of **destructuring** an array or object in order to more
easily access their individual elements.

When you finish this reading, you should be able to:

1. Destructure an array to reference specific elements
2. Destructure an object to reference specific values
3. Destructure incoming parameters into a function

## Destructuring data into variables

The _destructuring assignment_ syntax allows you to extract parts of an array or
object into distinct variables.

Let's see an example:

```javascript
let numArray = [10, 20];

// here we are "unpacking" the array values into two separate variables
let [firstEl, secondEl] = numArray;

console.log(firstEl); //=> 10
console.log(secondEl); //=> 20
```

As with normal variable assignment you put the name of the variable you are
assigning on the left, and the values you are assigning on the right. The above
code assigns `firstEl` to the value in the first position in `numArray`, and
`secondEl` to the second position in `numArray`.

We can alternatively declare our variables before destructuring as well:

```js
let animalArray = ["tiger", "hippo"];

let animal1, animal2;

// here we are "unpacking" the array values into two separate variables
[animal1, animal2] = animalArray;

console.log(animal1); //=> "tiger"
console.log(animal2); //=> "hippo"
```

### Swapping variables using destructuring

One of the really cool things you can do with destructuring is swapping the
values of two variables:

```js
let num1 = 17;
let num2 = 3;

// this syntax will swap the values of the two variables
[num1, num2] = [num2, num1];

console.log(num1); // 3
console.log(num2); // 17
```

Neat, right? This little syntactic trick can save you a few lines of code.

### Destructuring objects into variables

As you've previously read - objects can contain a lot of varied information
including arrays, functions, and other objects. One of the most useful
applications for destructuring is the ability to take apart and assign little
slices of large objects to variables.

Let's take a look at the basic syntax for destructuring objects when the
extracted variables have the same name as their associated keys:

```js
let obj = { name: "Apples", breed: ["tabby", "short hair"] };
let { name, breed } = obj;

console.log(name); // "Apples"
console.log(breed); // ["tabby", "short hair"]
```

Now this syntax works by matching object `properties`, so we can choose exactly
which keys we want. If we only wanted to save certain properties, we could do
something like this:

```javascript
let { a, c } = { a: 1, b: 2, c: 3 };
a; //=> 1
c; //=> 3
```

Now in all the previous examples we previously examined our variable names
shared the same name as our object's keys. Let's take a quick look at the syntax
we would need to use if the variable we are creating _does not_ have the same
name as our object's keys. This is referred to as _aliased_ object
destructuring:

```js
let obj = { apple: "red", banana: "yellow" };
let { apple: newApple, banana: newBanana } = obj;

console.log(newApple); // "red"
console.log(newBanana); // "yellow"
```

Object deconstructing really becomes useful as you start working with larger and
nested objects. Let's take a look at destructuring with nested objects. In the
below example our goal is to capture the value of the `species` key into a
variable named `species`:

```js
let object = { animal: { name: "Fiona", species: "Hippo" } };

// here we are specifying that within the animal object we want to assign the
// *species* variable to the value held by the *species* key
let {
  animal: { species }
} = object;

console.log(species); // => 'Hippo'
```

Take a look at the example below to see how object destructuring can make your
code more readable in more complex situations. For this example we are trying to
get the `fname` value into a variable:

```javascript
let user = {
  userId: 1,
  favoriteAnimal: "hippo",
  fullName: {
    fname: "Rose",
    lname: "K"
  }
};

// accessing values *with* destructuring
let {
  userId,
  fullName: { fname, lname }
} = user;

console.log(userId, fname, lname); // prints out:
// 1 "Rose" "K"
```

Destructuring allowed us to assign multiple variables to multiple values in our
`user` object all in one line of code!

The whole point of destructuring is to make writing code easier to write and
read. However, destructuring can become harder to read with super nested
objects. A good rule of thumb to keep clarity in your code is to only
destructure values from objects that are two levels deep.

Let's look at a quick example:

```js
// the fname key is nested more than two levels deep
// (within bootcamp.instructor.fullName)
let bootcamp = {
  name: "",
  color: "red",
  instructor: {
    fullName: {
      fname: "Rose",
      lname: "K"
    }
  }
};

// this is hard to follow:
let {
  instructor: {
    fullName: { fname, lname }
  }
} = bootcamp;
console.log(fname, lname);

// this is much easier to read:
let { fname, lname } = bootcamp.instructor.fullName;
console.log(fname, lname);
```

### Destructuring and the rest pattern

Earlier you saw how the rest parameter syntax allows us to prefix a function's
last parameter with `...` to capture all remaining arguments into an array:

```js
function logArguments(firstArgument, ...restOfArguments) {
  console.log(firstArgument);
  console.log(restOfArguments);
}

logArguments("apple", 15, 3);
// prints out:
// "apple"
// [15, 3]
```

This coding pattern of saying "give me the _rest_ of" can also be used when
destructuring an array by prefixing the last variable with `...`. In this
example, the `otherFoods` variable is prefixed with `...` to initialize the
variable to an array containing the remaining array elements that weren't
explicitly destructured:

```js
let foods = ["pizza", "ramen", "sushi", "kale", "tacos"];

let [firstFood, secondFood, ...otherFoods] = foods;
console.log(firstFood); // => "pizza"
console.log(secondFood); // => "ramen"
console.log(otherFoods); // => ["sushi", "kale", "tacos"]
```

At the time of this writing, the rest pattern is only officially supported by
JavaScript when destructuring arrays, though an [ECMAScript proposal][1] adds
support when destructuring objects. Recent versions of Chrome and Firefox
support this proposed addition to the JavaScript language.

Similar to when using the rest pattern with array destructuring, the last
variable `obj` is prefixed with `...` to initialize it to an object containing
the remaining own enumerable property keys (and their values) that weren't
explicitly destructured:

```js
let { a, c, ...obj } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a); // => 1
console.log(c); // => 3
console.log(obj); // => { b: 2, d: 4 }
```

## Destructuring parameters

So far we've talked about destructuring things into variables - but the other
main use for destructuring is destructuring **incoming parameters** into a
function. This gets to be really useful when we're passing objects around to
different functions. Each function can the be responsible for pulling the
parameters it needs from an incoming object - making it that much easier to work
with.

Let's look at a simple example of destructuring an object in a function's
parameters:

```javascript
let cat = { name: "Rupert", owner: "Curtis", weight: 10 };

// This unpacks the *owner* key out of any incoming object argument and
// assigns it to a owner parameter(variable)
function ownerName({ owner }) {
  console.log("This cat is owned by " + owner);
}

ownerName(cat);
```

In the above example we destructured any incoming arguments to the `ownerName`
function to assign the value at the key `owner` to the parameter name of
`owner`. This syntax might seem a little much just for getting one parameter but
this syntax can become _invaluable_ with nested objects.

Let's look at one more slightly more complex example to see the power of
destructuring parameters. In the below example we want to find and return an
array of the toys that belong to all cats:

```javascript
let bigCat = {
  name: "Jet",
  owner: { name: "Rose" },
  toys: ["ribbon"],
  siblings: { name: "Freyja", color: "orange", toys: ["mouse", "string"] }
};

// here we use *aliased* object destructuring to create a siblingToys variable
function toyFinder({ toys, siblings: { toys: siblingToys } }) {
  let allToys = toys.concat(siblingToys);
  return allToys;
}

console.log(toyFinder(bigCat)); // => ["ribbon", "mouse", "string"]
```

One thing we'd like to draw your attention to is the parameters of the
`toyFinder` function. As you are all aware, we can't declare the same variable
twice - so in the above `toyFinder` we ran into a situation where two objects
had the same key name: `toy`. We solved this using _aliased_ object
destructuring - we alias the `toys` key within the `siblings` object as
`siblingToys`.

Thanks to object destructuring in parameters, all we had to do when we invoked
`toyFinder` was pass in the whole object! Making our code easier to write and
our object easier to work with.

## What you learned

What this reading covered:

- How to destructure an array to reference specific elements
- How to destructure an object to reference specific elements
- How to destructure incoming parameters into a function

[1]: https://github.com/tc39/proposal-object-rest-spread

________________________________________________________________________________
# We're Better Together: Pair Programming

So far, you've been solving problems and writing code on your own. You'll
certainly spend a lot of time doing this in your future, but why not try a
better way? Let's discuss _pair programming_: an alternative approach that can
boost your output, reduce errors, and improve your mood all at the same time!

We'll cover:

- a brief history of team/pair programming,
- typical roles when pairing up, 
- and benefits of learning this useful skill!

## Team mentality

Despite what "hacker" personalities in movies might have you think, software
development has never been a single-player game. Tracing back to the earliest
days of computing, computer scientists have worked in pairs or teams to solve
the biggest problems. Fred Brooks, in his popular software/project management
guide "The Mythical Man Month" (published in 1975) even advocated for small
["surgical teams"][1] to approach software development! 

Even so, it's easy to get focused on a problem and stop communicating with your
teammates. To prevent this behavior, many teams practice _pair programming_, an
approach in which two developers work together on a single computer. Pairing up
ensures that both developers are engaged with each other and with the problem at
hand, and it helps us share knowledge faster!

Pair programming is by far the most popular approach, but there are other ways
for small groups to collaborate! You may also hear about _mob programming_,
where a group of 3+ individuals gather around a single screen to work through an
issue, or _extreme programming (XP)_, a highly-structured approach to pair
programming where the whole team rotates through projects. We'll refer to all of
these multi-developer approaches as _collaborative programming_.

There are a few common concepts in all these approaches:

- **One shared device for coding:** Keeping your code in sync with someone else
  is a bigger challenge than it's worth, so collaborative programmers have found
  that coding only on one device keeps it simple. You can always share your code
  with each other once you're done working on it.

- **Everyone has a job:** Regardless of how many people you're collaborating
  with, it's important that each person has a role to play. This increases
  engagement and ensures that no one gets bored! If you find yourself in a group
  but without a clearly-defined role, there may be a better use of your time.

- **Everyone gets a turn:** The best way to learn is by doing, so everyone
  should be able to work in all the roles on a collaborative programming team.
  This means developers may rotate into different roles on a timer, or change
  roles with each new session.

- **No one is "too good to pair":** It's important to note that pairing should
  be a **whole team** process. One of the benefits of pair programming is that a
  more senior engineer can share knowledge with a junior engineer, skilling them
  up faster. No truly collaborative programming session excludes certain people
  because they're outliers. It's never too early (or too late!) to start pairing
  up.

## Pair Programming Roles

When we talk about pair programming specifically, there are two well-known
roles: that of the _Driver_ and that of the _Navigator_. Let's break down their
individual responsibilities.

### The Driver

The _Driver_ takes ownership of the keyboard. They'll be in charge of typing
code and asking questions. The driver should focus on the current task and can
let go of the bigger picture for a little while. The Driver might also suggest
ways to improve/refactor the code, as the project continues.

### The Navigator

The _Navigator_ is in charge of what's being typed and maintaining the project's
momentum. They should lead the discussion and direct the driver about what to
type. The navigator won't do any typing themselves. Instead, their goal is to
make it as easy as possible for the driver to create code. While the driver
types, the navigator should be double-checking the code for errors.

### Both roles

If these roles sound limiting to you, good; that's the point! Having a clearly
defined role means you never have to wonder what you should be doing at any
given time. If you're driving, you should be writing code. If you're navigating,
you should be designing what comes next and sharing that with the driver.

These roles provide some structure, but they're not excuses for poor
communication. It's up to **both** programmers to discuss the plan early and
often. As the navigator leads the way, the driver should be constantly
second-guessing the plan. If there's a potential problem, it's okay for the
driver to bring this up! This is one of the strengths of pair programming: both
developers have a voice in service of the final product.

Both the driver and navigator should help keep each other on task as well. If
you find yourself getting quiet or distracted, switch roles! The change of
context should help you get your head back in the game.

## Why pair up?

This all sounds like a lot of work! If you're already capable of coding alone,
why might you want to pair up at all? Let's look at some of the benefits.

First, some statistics. A [study from 2000][2] found that pair programming
results in 15% slower development time. Yikes! That sounds a lot less scary when
you recognize that we would theoretically expect it to result in 50% slower
time, though. After all, we're taking two people who could be working at "full
speed" and assigning them to one task. Somehow, this process only causes them to
move 15% slower - wow!

The same study notes the payback for that loss of velocity: the resulting code
contains 15% fewer errors. If this sounds like an even trade, consider this:
debugging, correcting, and redeploying that erroneous code could take from 15 to
60 times as long as the paltry 15% slowdown caused by pairing up! Spending a
little extra time up front can make a world of difference later on.

Pair programming is also a great way to fulfill your social needs. Coding alone
can be a lonely endeavor, especially when you face new challenges and aren't
sure how to proceed. Instead of getting lost in a search engine, pairing
partners can help each other navigate these challenges and celebrate each
others' successes. 

Lastly, a big motivator for being a practiced pair programmer is the job search.
Many companies include pair programming in their interview process. You may be
asked to code while some of the company's engineers observe, or you might get to
work directly with another engineer on a collaborative project! Practicing this
skill now means you'll be comfortable when the stakes are higher, and more
likely to make a good impression on the interviewing team.

## What we've learned

When it comes to writing code, we are truly better together! Pair programming is
an effective process for writing more code, writing better code, and improving
your development skills at a dramatically increased rate. Starting now, we'll be
encouraging you to pair with other students on  projects.

After reading this lesson, you should feel comfortable:
- defining collaborative programming,
- describing the roles of the Driver and Navigator, 
- and naming a few benefits of pair programming.

[1]: https://en.wikipedia.org/wiki/The_Mythical_Man-Month#The_surgical_team
[2]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.26.9064

________________________________________________________________________________
# The  Pair Programming Approach

When it comes to pair programming, every team has their own process. Let's
explore 's specific approach to pairing up!

We'll cover:

- the  path to pair programming success,
- a quick routine for improving your pairing outcomes,
- and modifications you can make for specific situations.

## Why this way?

It might feel unnecessary to have strict rules about working together. After
all, you've been working with other people your whole life, right? Get ready -
software engineering will be different!

Working as a programmer means being faced with frequent distractions. Strict
rules help prevent those distractions so you can focus on what matters most.
Additionally: when problems arise (as they inevitably will), people tend to fall
back on old habits to cope with the stress. A rigid approach should provide us
with at-the-ready coping strategies we can fall back on. When your team shares
the same strategies, it makes it even easier to support each other through
challenges!

Ultimately, we're creating a shared language between teammates. When you move
into your new career, you'll have to adjust to the collaborative process of your
new team. Think of this as an opportunity to build a foundation for that
transition.

## The rules

Let's lay out the steps to a successful pair programming session. This process
will be the same whether you're working together in-person or remotely. 

### Partner up

You can't pair program without a pair of programmers! Your first step should be
partnering up with another student. While it might be more comfortable to have
the same partner each time, try challenging yourself to select a new partner for
every session. This will broaden your perspective and let you share your unique
approaches to software with each other.

### Check-in

Before beginning, it's a good idea to check in with each other. Take a quick
"lay of the land": what will you be pairing on? How long do you expect this
session to last? Do you need to plan breaks for lunch or does one of you have
obligations that will cut the session short? Get these details scheduled with
each other ahead of time to reduce surprises & distractions later on.

This is a great time to assign roles as well. We encourage you to stick with the
_Driver_ and _Navigator_ roles discussed previously. Over time, we've found that
students who are more comfortable with the project being worked on prefer to act
as Navigator first. This lets them establish the direction for the session and
helps support the Driver. Of course, discuss this together before making a
decision: your partner may have a different opinion!

### Get coding!

Once you've chosen initial roles, it's time to dive in! Remember that you & your
partner should be working in a single editor, not two different ones. If you're
together in-person, this means one keyboard, one monitor, and two chairs. If
you're working remotely, this means one person is sharing their editor and the
other is watching & talking only.

To start, let the initial driver set up the development environment and set a
timer for 15 minutes. The navigator should start mapping out the course of the
project, letting the driver type out code and watching out for errors. Both
driver & navigator should be in _constant_ communication: ask each other lots of
questions and double-check each other's ideas as you go! It's okay to use your
time together to search for documentation or help online as well.

If a question comes up that requires a lot of discussion or further research,
pause your timer and talk it out. As you pair program more, you'll find that
these extended discussions become less frequent. It's not that you're talking
less, but that you're comfortable enough with the process to continue coding
while working through bigger problems. 

### Hand off

We follow a 15 minute rule at . This means you should change roles
after every 15 minutes of progress - no exceptions! Frequent role reversal
ensures you're both getting equal exposure to the whole workflow, and it forces
you to stay engaged and communicate through the transition.

When the timer is up, the driver should pass control to the navigator and begin
navigating themselves. This will feel awkward at first, but remember that you're
building a new skill here: context switching while maintaining communication is
**crucial** for being an effective developer.

Stick to the timer as closely as possible. It can be tempting to finish your
current line of code/task before handing off, but that "last piece" might drag
on for another 15 minutes by itself! If you're communicating effectively, you
should be able to the hand off mid-sentence and have your pair pick up right
where you left off.

### Follow-up

It has been a long, productive day. How should you wrap up your programming
session? Take a little time to reflect! Before officially ending your session,
take a couple minutes to recap. Discuss what you accomplished. Did you meet your
goals? Take a moment to celebrate! Are there tasks left incomplete? Make a few
notes so you can pick these up with someone else next time.

The follow-up, like the check-in, helps commit your progress to memory. It's
also the perfect time to answer any lingering questions and provide/receive
feedback on how the session went. Don't skip this step because it feels
superfluous; it's just as important as the code you've written together!

## Modifying the routine

As you pair up more often, you'll encounter days where the routine just isn't
working. Maybe your partner's having a bad day - or maybe you're having a bad
day yourself! Maybe the day's material hasn't "clicked" for you yet, and you
feel like your partner is speaking a totally different language. Yikes!

The most important thing to remember is that this is **totally normal**. We
provide a strict pair programming routine to keep you on track, but we can't
plan for everything! Here are some things you can do to keep the routine fresh.

- **Step back & discuss:** If you're feeling stuck, or having trouble keeping up
  with your partner, pause your timer and step away from the keyboard. This is a
  good signal that you need to discuss progress so far and make a plan for
  moving forward. You should always feel comfortable doing this if you're unsure
  of something. Don't worry about slowing your partner down; the goal of pair
  programming is that you both progress **together**.

- **Focus on the process during your follow-up:** Understanding and mastering
  the pair programming process is as much a part of our program as JavaScript
  and data structures. If you're struggling with this process, discuss it!
  During your follow-up, take a moment to ask each other how you felt your
  communication went. You should discuss how you're working to improve your own
  performance as both a driver & navigator. By focusing on the process, you're
  taking some of the awkwardness out of the relationship, and helping each other
  feel more comfortable.

- **Remember to reflect regularly:** You may not do it daily, but it is
  important to reflect on your pair programming experiences at regular intervals
  throughout your course. At least once every few weeks, schedule some time to
  chat with a partner about how pair programming is working for you. Share your
  personal experiences and suggest a few things you'd like to do for yourself to
  improve the process. If you've paired with your partner before, this may also
  be an appropriate time to offer compliments and kind criticism.

## What we've learned

We know what pair programming _is_, and now we know _how_ to do it! Practice
following the  process in your own pairing, and don't forget to
discuss your experiences as often as you can. You can't be **too** good at pair
programming; you'll be pairing up for the rest of your new career.

You should now be able to:

- describe each step of 's pair programming process,
- explain why the process is important,
- and suggest some ways to modify/improve the process as necessary.

________________________________________________________________________________
# You Are Not Your Code: Empathetic Communication In Engineering

We've presented a rigid process for pair programming, but we left out a big
part: **communication**! While we've mentioned that communication is important,
we haven't really dug into the value of this skill. Let's discuss some
communication approaches that help you maximize your time when pair programming
- and collaborating in general!  

We'll discuss:
- empathetic communication when working on code,
- how to appropriately critique the work of others,
- and how to receive & respond to criticism of your own work.

## Understanding code-centric vs. human-centric language

The code you write can feel deeply personal. You've put time into it, refactor
after refactor, honing it to be both highly efficient and easily understood.
It's no wonder, then, that criticism of that code can feel personal as well! A
common problem on software teams is the struggle between improving code quality
without offending the programmers who wrote it.

When communicating about software, it can be helpful to use _code-centric_
language. Here's an example:

```js
// Human-centric
"You wrote an infinite loop. 
If you do that again, you will crash the server."

// Code-centric
"The code submitted for issue #3 resulted in an infinite loop. 
This behavior could crash the server. 
What can we do to prevent that in the future?"
```

Notice how the code-centric example focuses on outcomes and looks towards
improvement, instead of focusing on assigning blame and enumerating negative
consequences. It can feel like a nitpick, but depersonalizing discussions of
code quality in this way helps you focus on the bigger picture: your team and
the product you're working on together.

It's important to remember that what we're **not** doing with code-centric
communication is removing responsibility. As a developer, you may write code for
use in critical industries like healthcare, finance, or defense. It's your
responsibility to be constantly learning and growing to ensure that what you
create is safe and correct.

However, unless you are a solo freelance developer working on a solo project,
your team will share your goals and should be focused on uplifting each other.
Having a positive outlook, even in the face of human error, can be the
difference between a successful team and a team destined for failure.

A great practical example of code-centric language in action is [this report by
GitLab][1] after an accidental deletion of data. The company used this as a
learning opportunity, improved their release tooling to prevent accidents in the
future, and shared everything they learned with the community.

### Applying empathy to pair programming

When working directly with a partner, the relationship is close so the stakes
are high. It's important to maintain that relationship, but it's also important
to hold each other to a high standard! We can do both these things with
_empathetic communication_.

Being _empathetic_ means being considerate of the feelings of others. It's not
just about recognizing challenges - it's important to relate those challenges to
your own experiences and respond in a way that acknowledges them appropriately.

A common phrase you'll hear when discussing communication in software
development is **"You are not your code"**. This is a simplification of the
human- vs. code-centric communication styles we discussed. Keeping this
separation between your partner (or yourself!) and the code you're producing
together can help you communicate in a way that improves outcomes for everyone.

Let's look at another example. Imagine you're acting as navigator during a
pairing session and reviewing the code your partner has typed.

```js
// Human-centric
"Why did you you write the function the wrong way?"

// Code-centric
"Is this an alternative syntax for a function?"
```

We're not ignoring what might be a problem, but we are remaining open to a
potential learning opportunity and drawing attention to it if needed. This
difference in approach embodies the spirit of the "You are not your code" motto.

The context of "You are not your code" is helpful when receiving criticism as
well. Remember during pair programming or code review that we're all on the same
team: making better software! It can be tough to have your work critiqued, but
it's the best way to improve. If you find a particular note affects you
personally, try rewriting it for yourself using code-centric language.

### When empathy goes awry

You may sometimes encounter other engineers who use "you are not your code" as a
license to insult. The goal of this phrase is to encourage programmers to act
with empathy. It's **never** an excuse to belittle someone with the caveat of
"You can't be offended - I'm just talking about your code!". Notice that even
that defense uses human-centric, personally challenging language.

Practice using "you are not your code" in a positive context whenever you can,
and encourage others to do the same. Strive to treat the people around you in
the same way you'd like to be treated. Remember that you're working with humans
from many different backgrounds and with unique experiences, and that you should
place respect for those human experiences over code quality, words-per-minute,
or browser preference. That's true empathy.

### Applying empathy to your code

Finally, remember that the code you're writing will likely be read and used by
other developers in the future. Just like practicing empathetic communication
in-person helps build relationships, practicing empathetic coding helps build
good software.

Empathetic coding means thinking of those who will read or improve your code
once you've moved on to other projects. Leaving clear comments and taking time
to keep your code organized is one way to code with empathy. Another is working
to use inclusive language in your test cases, or avoiding hard-to-understand
single letter variable names. 

Anything you can do to make the next developer's life easier is worth the time.
Who knows - it might be **you** coming back to this project many months from
now!

## Why communication matters

So why does this all matter?  is a software development program, not
a public speaking course! Look a little deeper, though, and you'll see a wealth
of benefits from improving your communication.

Selfishly, good communication helps you succeed. Lots of programmers with strong
technical skills will apply, but those who can communicate clearly and
efficiently [will get the job][2]. The relationships you build by being
empathetic with your coworkers will also help you with positive references and
opportunities for promotion!

Thinking more globally, it's important to remember that the tech industry is
growing at a rapid pace. Accusatory communication is just one of many ways of
_gate-keeping_, or making our industry harder to get involved with. This isn't
always intentional, so improving your own communication skills is a great way to
become more aware and ensure you're part of the solution, not part of the
problem.

## What we've learned

When programming, you're not just communicating with your computer! Practicing
empathy in **all** your communication will result in a great return for you,
your co-workers, and the tech community at large.

We hope you're now able to:

- differentiate between human-centric and code-centric language,
- articulate the meaning of "You are not your code", 
- and list the benefits of practicing empathetic communication.

[1]: https://about.gitlab.com/blog/2017/02/10/postmortem-of-database-outage-of-january-31/
[2]: http://blogs.edweek.org/edweek/high_school_and_beyond/2018/08/good_speaking_tops_list_of_skills_employers_want_most.html

________________________________________________________________________________
# Object Problems

It's time to get some practice using Objects! Below we've included a link to
download a `zip` file for a number of problems.

Complete the problems in the order specified. You should have `mocha` installed
and will need to pass all the tests in order to move on.

To run the tests for the above problems you will need to unzip the file you
downloaded and then navigate into the directory for that file. Once there you
can run the command:

```sh
~ mocha
```

The `mocha` command will run all the tests. If you have any trouble with this
don't hesitate to ask a TA for help!

________________________________________________________________________________
# WEEK-02 DAY-3<br>*Callbacks* {ignore=true}
________________________________________________________________________________
# Callbacks Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given multiple plausible reasons, identify why functions are called “First
   Class Objects” in JavaScript.
2. Given a code snippet containing an anonymous callback, a named callback, and
   multiple `console.log`s, predict what will be printed
3. Write a function that takes in a value and two callbacks. The function should
   return the result of the callback that is greater.
4. Write a function, myMap, that takes in an array and a callback as arguments.
   The function should mimic the behavior of `Array#map`.
5. Write a function, myFilter, that takes in an array and a callback as
   arguments. The function should mimic the behavior of `Array#filter`.
6. Write a function, myEvery, that takes in an array and a callback as
   arguments. The function should mimic the behavior of `Array#every` learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given multiple plausible reasons, identify why functions are called “First
   Class Objects” in JavaScript.
2. Given a code snippet containing an anonymous callback, a named callback, and
   multiple `console.log`s, predict what will be printed
3. Write a function that takes in a value and two callbacks. The function should
   return the result of the callback that is greater.
4. Write a function, myMap, that takes in an array and a callback as arguments.
   The function should mimic the behavior of `Array#map`.
5. Write a function, myFilter, that takes in an array and a callback as
   arguments. The function should mimic the behavior of `Array#filter`.
6. Write a function, myEvery, that takes in an array and a callback as
   arguments. The function should mimic the behavior of `Array#every`.
________________________________________________________________________________
# Callbacks: Using a Function as an Argument

Previously we explored how functions are first class objects, meaning they can
be stored in variables just like any other value. In particular, we've been
using built-in methods like `Array#forEach` and `Array#map` which accept
(anonymous) functions as arguments. Now it's time to take a look under the hood
and define our _own_ functions that accept other functions as arguments.

When you finish reading this article, you should be able to define functions
that accept callbacks.

## What is a callback?

Defining a function that accepts another function as an argument is as simple as
specifying a regular parameter. We'll name our parameter `callback` but you could
very well name it whatever you please:

```javascript
let foobar = function(callback) {
  console.log("foo");
  callback();
  console.log("bar");
};

let sayHello = function() {
  console.log("hello");
};

foobar(sayHello); // prints
// foo
// hello
// bar
```

A callback is always a function. In general, the callback is the function that
is being _passed into_ the other function. In the example above, `sayHello` is a
callback, but `foobar` is not a callback. Notice that when we call
`foobar(sayHello)`, we are not yet calling the `sayHello` function, instead we
are passing the `sayHello` function itself into `foobar`. When execution enters
the `foobar` function, the `callback` arg will refer to `sayHello`. This means
that `callback()` will really evaluate to `sayHello()`.

n the example above we used a named callback, but we can also use a function
expression directly. This is called an _anonymous_ callback:

```javascript
let foobar = function(callback) {
  console.log("foo");
  callback();
  console.log("bar");
};

foobar(function() {
  console.log("hello");
}); // prints
// foo
// hello
// bar
```

The advantage of using a named callback is that you can reuse the function many
times, by referring to its name. Opt for an anonymous callback if you need a
single-use.

## A more interesting example

A callback behaves just like any other function, meaning it can accept it's own
arguments and return a value. Let's define an `add` function that also accepts a
callback:

```javascript
let add = function(num1, num2, cb) {
  let sum = num1 + num2;
  let result = cb(sum);
  return result;
};

let double = function(num) {
  return num * 2;
};

let negate = function(num) {
  return num * -1;
};

console.log(add(2, 3, double)); // 10
console.log(add(4, 5, negate)); // -9
```

In the `add` function above, we pass the sum of `num1` and `num2` into the
callback (`cb`) and return the result of the callback. Depending on the callback
function we pass in, we can accomplish a wide range of behavior! This will come
in handy when reusing code. A callback is just like a helper function, except
now we can dynamically pass in _any_ helper function.

To wrap things up, let's pass in some built-in functions and use them as
callbacks. `Math.sqrt` is a function that takes in a number and returns its
square root:

```javascript
console.log(Math.sqrt(9)); // 3
console.log(Math.sqrt(25)); // 5
console.log(Math.sqrt(64)); // 8

let add = function(num1, num2, cb) {
  let sum = num1 + num2;
  let result = cb(sum);
  return result;
};

console.log(add(60, 4, Math.sqrt)); // 8
```

## Refactoring for an optional callback

We have been claiming that we can leverage callbacks to write more versatile
functions. However, a skeptic may argue that our previous `add` function is
_not_ so versatile because it can't return the normal sum without a trivial
callback:

```javascript
let add = function(num1, num2, cb) {
  let sum = num1 + num2;
  let result = cb(sum);
  return result;
};

// we just want the normal sum of 2 and 3
add(2, 3, function(n) {
  return n;
});
// this correctly returns the normal sum of 5, but the code is pretty gross
```

Have no fear! We can remedy this to have the best of both worlds, we just need a
quick detour. JavaScript is not strict when it comes to passing too few
arguments to a function. Here is an isolated example of this behavior:

```javascript
let greet = function(firstName, lastName) {
  console.log("Hey " + firstName + "! Your last name is " + lastName + ".");
};

greet("Ada", "Lovelace"); // prints 'Hey Ada! Your last name is Lovelace.'
greet("Grace"); // prints 'Hey Grace! Your last name is undefined.'
```

If we pass too few arguments when calling a function, the parameters that do not
have arguments will contain the value `undefined`. With that in mind, let's
refactor our `add` function to _optionally_ accept a callback:

```javascript
let add = function(num1, num2, cb) {
  if (cb === undefined) {
    return num1 + num2;
  } else {
    return cb(num1 + num2);
  }
};

console.log(add(9, 40)); // 49
console.log(add(9, 40, Math.sqrt)); // 7
```

Amazing! As its name implies, our `add` function will return the plain old sum
of the two numbers it is given. However, if it also passed a callback function,
then it will utilize the callback too. A function that optionally accepts a
callback is a fairly common pattern in JavaScript, so we'll be seeing this crop
up on occasion.

## What you've learned

- a callback is a function that is passed as an arg into another function
- we can pass named functions, anonymous functions, and even built-in functions
  as callbacks

________________________________________________________________________________
# Callback Problems

It's time to get some practice using callbacks! Below we've included a link to
download a `zip` file for a number of problems.

Complete the problems in the order specified. You should have `mocha` installed
and will need to pass all the tests in order to move on.

To run the tests for the above problems you will need to unzip the file you
downloaded.

To get started, use the following commands:

1. `cd` into the project directory
2. `npm install` to install any dependencies
3. `mocha` to run the test cases

The `mocha` command will run all the tests. If you have any trouble with this
don't hesitate to ask a TA for help!

P.S. You may notice the `package.json`/`package-lock.json` files and
`node_modules` directory. You do not need to edit any of those contents. Those
files are what we use the package the project and create the test cases.

________________________________________________________________________________
# WEEK-02 DAY-4<br>*Scope* {ignore=true}
________________________________________________________________________________
# Scope Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Identify the difference between const, let, and var declarations
2. Explain the difference between const, let, and var declarations
3. Predict the evaluation of code that utilizes function scope, block scope,
   lexical scope, and scope chaining
4. Define an arrow function
5. Given an arrow function, deduce the value of `this` without executing the
   code
6. Implement a closure and explain how the closure effects scope
7. Define a method that references `this` on an object literal
8. Utilize the built in `Function#bind` on a callback to maintain the context of
   `this`
9. Given a code snippet, identify what `this` refers trning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Identify the difference between const, let, and var declarations
2. Explain the difference between const, let, and var declarations
3. Predict the evaluation of code that utilizes function scope, block scope,
   lexical scope, and scope chaining
4. Define an arrow function
5. Given an arrow function, deduce the value of `this` without executing the
   code
6. Implement a closure and explain how the closure effects scope
7. Define a method that references `this` on an object literal
8. Utilize the built in `Function#bind` on a callback to maintain the context of
   `this`
9. Given a code snippet, identify what `this` refers to
________________________________________________________________________________
# All About Scope

The **scope** of a program in JavaScript is the set of variables that are
available for use within the program. If a variable or other expression is not
in the current scope, then it is unavailable for use. If we declare a variable,
this variable will only be valid in the scope where we declared it. We can have
nested scopes, but we'll see that in a little bit.

When we declare a variable in a certain scope, it will evaluate to a specific
value **in that scope**. We have been using the concept of scope in our code all
along! Now we are just giving this concept a name.

By the end of this reading you should be able to predict the evaluation of code
that utilizes local scope, block scope, lexical scope, and scope chaining

## Advantages of utilizing scope

Before we start talking about different types of scope we'll be talking about
the two main advantages that scope gives us:

1. **Security** - Scope adds security to our code by ensuring that variables can
   only be accessed by pre-defined parts of our programs.
2. **Reduced Variable Name Collisions** - Scope reduces variable name
   collisions, also known as namespace collisions, by ensuring you can use the
   same variable name multiple times in different scopes without accidentally
   overwriting those variable's values.

## Different kinds of scope

There are three types of scope in JavaScript: `global scope`, `local scope`, and
`block scope`.

### Global scope

Let's start by talking about the widest scope there is: _global scope_. The
_global scope_ is represented by the `window` object in the browser and the
`global` object in Node.js. Adding attributes to these objects makes them
available throughout the entire program. We can show this with a quick example:

```js
let myName = "Apples";

console.log(myName);
// this myName references the myName variable from this scope,
// so myName will evaluate to "Apples"
```

The variable `myName` above is not inside a function, it is just lying out in
the open in our code. The `myName` variable is part of _global scope_. The
Global scope is the largest scope that exists, it is the outermost scope that
exists.

While useful on occasion, global variables are best avoided. Every time a
variable is declared on the global scope, the chance of a name collision
increases. If we are unaware of the global variables in our code, we may
accidentally overwrite variables.

### Local scope

The **scope** of a function is the set of variables that are available for use
within that function. We call the scope within a function: _local scope_. The
_local scope_ of a function includes:

1. the function's arguments
2. any local variables declared inside the function
3. **any variables that were already declared when the function was defined**

In JavaScript when we enter a new function we enter a **new scope**:

```js
// global scope
let myName = "global";

function function1() {
  // function1's scope
  let myName = "func1";
  console.log("function1 myName: " + myName);
}

function function2() {
  // function2's scope
  let myName = "func2";
  console.log("function2 myName: " + myName);
}

function1(); // function1 myName: func1
function2(); // function2 myName: func2
console.log("global myName: " + myName); // global myName: global
```

In the code above we are dealing with three different scopes: the global scope,
`function1`, and `function2`. Since each of the `myName` variables were declared
in separate scopes, we _are_ allowed to reuse variable names without any issues.
This is because each of the `myName` variables is bound to their respective
functions.

### Block scope

A block in JavaScript is denoted by a pair of curly braces (`{}`). Examples of
block statements in JavaScript are `if` conditionals or `for` and `while` loops.

When using the keywords `let` or `const` the variables defined within the curly
braces will be _block scoped_. Let's look at an example:

```js
// global scope
let dog = "woof";

// block scope
if (true) {
  let dog = "bowwow";
  console.log(dog); // will print "bowwow"
}

console.log(dog); // will print "woof"
```

### Scope chaining: variables and scope

A key scoping rule in JavaScript is the fact that **an _inner_ scope does have
access to variables in the _outer_ scope**.

Let's look at a simple example:

```js
let name = "Fiona";

// we aren't passing in or defining and variables
function hungryHippo() {
  console.log(name + " is hungry!");
}

hungryHippo(); // => "Fiona is hungry"
```

So when the `hungryHippo` function is declared a new local scope will be created
for that function. Continuing on that line of thought what happens when we refer
to `name` inside of `hungryHippo`? If the `name` variable is not found in the
immediate scope, JavaScript will search all of the accessible outer scopes until
it finds a variable name that matches the one we are referencing. Once it finds
the first matching variable, it will stop searching. In JavaScript this is
called _scope chaining_.

Now let's look at an example of scope chaining with nested scope. Just like
functions in JavaScript, a scope can be nested within another scope. Take a look
at the example below:

```javascript
// global scope
let person = "Rae";

// sayHello function's local scope
function sayHello() {
  let person = "Jeff";

  // greet function's local scope
  function greet() {
    console.log("Hi, " + person + "!");
  }
  greet();
}

sayHello(); // logs 'Hi, Jeff!'
```

In the example above, the variable `person` is referenced by `greet`, even
though it was never declared within `greet`! When this code is executed
JavaScript will attempt to run the `greet` function - notice there is no
`person` variable within the scope of the `greet` function and move on to seeing
if that variable is defined in an outer scope.

Notice that the `greet` function prints out `Hi, Jeff!` instead of `Hi, Rae!`.
This is because JavaScript will start at the inner most scope looking for a
variable named `person`. Then JavaScript will work it's way outward looking for
a variable with a matching name of `person`. Since the `person` variable within
`sayHello` is in the next level of scope above `greet` JavaScript then stops
it's scope chaining search and assigns the value of the `person` variable.

Functions such as `greet` that use (ie. **capture**) variables like the person
variable are called **closures**. We'll be talking a lot more about closures
very soon!

**Important** An inner scope can reference outer variables, but an outer scope
cannot reference inner variables:

```js
function potatoMaker() {
  let name = "potato";
  console.log(name);
}

potatoMaker(); // => "potato"

console.log(name); // => ReferenceError: name is not defined
```

### Lexical scope

There is one last important concept to talk about when we refer to scope - and
that is _lexical scope_. Whenever you run a piece of JavaScript that code is
first parsed before it is actually run. This is known as the _lexing time_. In
the _lexing time_ your parser resolves variable names to their values when
functions are nested.

The main take away is that _lexical scope_ is determined at _lexing time_ so we
can determine the values of variables without having to run any code. JavaScript
is a language **without dynamic** scoping. This means that by looking at a piece
of code we can determine the values of variables just by looking at the
different scopes involved.

Let's look at a quick example:

```js
function outer() {
  let x = 5;

  function inner() {
    // here we know the value of x because scope chaining will
    // go into the scope above this one looking for variable named x.
    // We do not need to run this code in order to determine the value of x!
    console.log(x);
  }
  inner();
}
```

In the `inner` function above we don't need to run the `outer` function to know
what the value of `x` will be because of _lexical scoping_.

## What you learned

The **scope** of a program in JavaScript is the set of variables that are
available for use within the program. Due to _lexical scoping_ we can determine
the value of a variable by looking at various scopes without having to run our
code. _Scope Chaining_ allows code within an _inner_ scope to access variables
declared in an _outer_ scope.

There are three different scopes:

- _global scope_ - the global space is JavaScript
- _local scope_ - created when a function is defined
- _block scope_ - created by entering a pair of curly braces

________________________________________________________________________________
# Different Kinds of Variables

**Variables** are used to store information to be referenced and manipulated in
a computer program. A variable's sole purpose is to label and store data in
computer memory. Up to this point we've been using the `let` keyword as our only
way of declaring a JavaScript variable. It's now time to expand your tool set to
learn about the different kinds of JavaScript variables you can use!

When you finish this reading, you should be able to:

- Identify the three keywords used to declare a variable in JavaScript
- Explain the differences between `const`, `let` and `var`
- Identify the difference between function and block-scoped variables
- Paraphrase the concept of hoisting in regards to function and block-scoped
  variables

## Declaring variables

All the code you write in JavaScript is _evaluated_. **A variable always
evaluates to the value it contains no matter how you declare it.**

### The different ways to declare variables

In the beginning there was `var`. The `var` keyword used to be the only way to
declare a JavaScript variable. However, in ECMAScript 2015 JavaScript introduced
two new ways of declaring JavaScript variables: `let` and `const`. Meaning, in
JavaScript there are **three different ways to declare a variable**. Each of
these keywords has advantages and disadvantages and we will now talk about each
keyword at length.

1. `let`: any variables declared with the keyword `let` _allows you to reassign_
   that variable. Variable declared using `let` is scoped within a **block**.
2. `const`: any variables declared with the keyword `const` _will not allow you
   to reassign_ that variable. Variable declared using `const` is scoped within
   a **block**.
3. `var`: A `var` declared variable may or may not be reassigned, and the
   variable is **scoped to a function**.

For this course and for your programming career moving forward we recommend you
**always** use `let` & `const`. These two words allow us to be the most clear
with our intentions for the variable we are creating.

## Hoisting and scoping with variables

A wonderful definition of hoisting by Mabishi Wakio, "Hoisting is a JavaScript
mechanism where variables and function declarations are moved to the top of
their scope before code execution."

What this means is that when you run JavaScript code the variables and function
declarations will be _hoisted_ to the top of their particular scope. This is
important because `const` and `let` are **block-scoped** while `var` is
**function-scoped**.

Let's start by talking more about all `const`, `let`, and `var` before we dive
into why the difference of scopes and hoisting is important.

### Function-scoped variables

When JavaScript was young the only available variable was `var`. The `var`
keyword creates _function-scoped_ variables. That means when you use the `var`
keyword to declare a variable that variable will be confined to the scope of the
current function.

Here is a simple example of declaring a `var` variable within a function:

```js
function test() {
  var a = 10;

  console.log(a); // => 10
}
```

One of the drawbacks of using `var` is that it is a less indicative way of
defining a variable.

#### Hoisting with function-scoped variables

Let's take a look at what hoisting does to a function-scoped variable:

```js
function test() {
  console.log(hoistedVar); // => undefined

  var hoistedVar = 10;
}

test();
```

Huh - that's weird. You'd expect an error from referring to a variable like
`hoistedVar` before it's defined, something like:
`ReferenceError: hoistedVar is not defined`. However this is not the case
because of _hoisting_ in JavaScript!

So essentially hoisting will isolate and, in the computer's memory, will declare
a variable as the top of it's scope. With a function-scoped variable, `var`, the
name of the variable will be hoisted to the top of the function. In the above
snippet, since `hoistedVar` is declared using the `var` keyword the
`hoistedVar`'s scope is the `test` function. To be clear what is being hoisted
is the _declaration_, not the _assignment_ itself.

In JavaScript, all variables defined with the `var` keyword have an initial
value of `undefined`. Here is a translation of how JavaScript would deal with
hoisting in the above `test` function:

```js
function test() {
  // JavaScript will declare the variable *in computer memory* at the top of it's scope
  var hoistedVar;

  // since hoisting declared the variable above we now get
  // the value of 'undefined'
  console.log(hoistedVar); // =>  undefined

  var hoistedVar = 10;
}
```

### Block-scoped variables

When you are declaring a variable with the keyword `let` or `const` you are
declaring a variable that exists within _block scope_. Blocks in JavaScript are
denoted by curly braces(`{}`). The following examples create a block scope: `if`
statements, `while` loops, `switch` statements, and `for` loops.

#### Using the keyword `let`

We can use `let` to declare **re-assignable block-scoped variables**. You are,
of course, very familiar with `let` so let's take a look at how `let` works
within a block scope:

```javascript
function blockScope() {
  let test = "upper scope";
  if (true) {
    let test = "lower scope";
    console.log(test); // "lower scope"
  }
  console.log(test); // "upper scope"
}
```

In the example above we can see that the `test` variable was declared twice
using the keyword `let` but since they were declared within different scopes
they have different values.

JavaScript will raise a `SyntaxError` if you try to declare the same `let`
variable twice in one block.

```js
if (true) {
  let test = "this works!";
  let test = "nope!"; // Identifier 'test' has already been declared
}
```

Whereas if you try the same example with `var`:

```js
var test = "this works!";
var test = "nope!";
console.log(test); // prints "nope!"
```

We can see above that `var` will allow you to redeclare a variable twice which
can lead to some very confusing and frustrating debugging.

Feel free to peruse the [documentation][mdn-let] for the keyword `let` for more
examples.

[mdn-let]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

#### Using the keyword `const`

We use `const` to declare **block-scoped variables** that can **not** be
reassigned. In JavaScript variables that cannot be reassigned are called
**constants**. Constants should be used for values that will not be re-declared
or re-assigned.

Properties of constants:

- They are block-scoped like `let`.
- JavaScript enforces constants by raising an error if you try to reassign them.
- Trying to redeclare a constant with a `var` or `let` by the same name will
  also raise an error.

Let's look at a quick example of what happens when trying to reassign a
constant:

```javascript
> const favFood = "cheeseboard pizza"; // Initializes a constant
undefined

> const favFood = "inferior food"; // Re-initialization raises an error
TypeError: Identifier 'favFood' has already been declared

> let favFood = "other inferior food"; // Re-initialization raises an error
TypeError: Identifier 'favFood' has already been declared

> favFood = "deep-dish pizza"; // Re-assignment raises an error
TypeError: Assignment to constant variable.
```

We cannot reassign a constant, but constants that are assigned to Reference types
are **mutable**. The name binding of a constant is immutable. For example, if we
set a constant equal to an Reference type like an object, we can still modify
that object:

```js
const animals = {};
animals.big = "beluga whale"; // This works!
animals.small = "capybara"; // This works!

animals = { big: "beluga whale" }; // Will error because of the reassignment
```

Constants cannot be reassigned but, just like with `let`, new constants of the
same names can be declared within nested scopes.

Take a look at the following for an example:

```js
const favFood = "cheeseboard pizza";
console.log(favFood);

if (true) {
  // This works! Declaration is scoped to the `if` block
  const favFood = "noodles";
  console.log(favFood); // Prints "noodles"
}

console.log(favFood); // Prints 'cheeseboard pizza'
```

Just like with `let` when you use `const` twice in the same block JavaScript
will raise a `SyntaxError`.

```js
if (true) {
  const test = "this works!";
  const test = "nope!"; // SyntaxError: Identifier 'test' has already been declared
}
```

#### Hoisting with block-scoped variables

When JavaScript ES6 introduced new ways of declaring a variable using `let` and
`const` the idea of block-level hoisting was also introduced. Block scope
hoisting allows developers to avoid previous debugging debacles that naturally
happened from using `var`.

Let's take a look at what hoisting does to a _block-scoped_ variable:

```js
if (true) {
  console.log(str); // => Uncaught ReferenceError: Cannot access 'str' before initialization
  const str = "apple";
}
```

Looking at the above we can see that an explicit error is thrown if you attempt
to use a block-scoped variable before it was declared. This is the typical
behavior in a lot of programming languages - that a variable cannot be referred
to until initialized to a value.

However, JavaScript is still performing hoisting with block-scoped declared
variables. The difference lies is how it _initializes_ them. Meaning that `let`
and `const` variables are **not** initialized to the value of `undefined`.

The time before a `let` or `const` variable is declared, but not used is called
the _Temporal Dead Zone_. A very cool name for a simple idea. Variables declared
using `let` and `const` are not initialized until their definitions are
evaluated. Meaning, you will get an error if you try to reference a `let` or
`const` declared variable before it is evaluated.

Let's look at one more example that should illuminate the presence of the
_Temporal Dead Zone_:

```js
var str = "not apple";

if (true) {
  console.log(str); //Uncaught ReferenceError: Cannot access 'str' before initialization
  let str = "apple";
}
```

In the above example we can see that inside the `if` block the `let` declared
variable, `str`, throws an error. Showing that the error thrown by a `let`
variable in the temporal dead zone takes precedence over any scope chaining that
would attempt to go to the outer scope to find a value for the `str` variable.

### Function scope vs. block scope

Let's now take a deeper look at the comparison of using function vs. block
scoped variables.

Let's start with a simple example:

```js
function partyMachine() {
  var string = "party";
  console.log("this is a " + string);
}
```

Looks good so far but let's take that example a step farther and see some of the
less fun parts of the `var` keyword in terms of scope:

```js
function partyMachine() {
  var string = "party";

  if (true) {
    // since var is not block-scoped and not constant
    // this assignment sticks!
    var string = "bummer";
  }

  console.log("this is a " + string);
}

partyMachine(); // => "this is a bummer"
```

We can see in the above example how the flexibility of `var` can ultimately be a
bad thing. Since `var` is function-scoped _and_ can be reassigned and
re-declared without error it is very easy to overwrite variable values by
accident.

This is the problem that ES6 introduced `let` and `const` to solve. Since `let`
and `const` are block-scoped it's a lot easier to avoid accidentally overwriting
variable values.

Let's take a look at the example function above rewritten using `let` and
`const`:

```js
function partyMachine() {
  const string = "party";

  if (true) {
    // this variable is restricted to the scope of this block
    const string = "bummer";
  }

  console.log("this is a " + string);
}
partyMachine(); // => "this is a party"
```

## Global variables

If you leave off a declaration when initializing a variable, it will become a
global. **Do not do this.** We declare variables using the keywords `var`,
`let`, and `const` to ensure that our variables are declared within a proper
scope. Any variables declared without these keywords will be declared on the
_global scope_.

JavaScript has a single global scope, which means all of the files from your
projects and any libraries you use will **all be sharing the same scope**. Every
time a variable is declared on the global scope, the chance of a name collision
increases. If we are unaware of the global variables in our code, we may
accidentally overwrite variables.

Let's look at a quick example showing why this is a bad idea:

```js
function good() {
  let x = 5;
  let y = "yay";
}

function bad() {
  y = "Expect the unexpected (eg. globals)";
}

function why() {
  console.log(y); // "Expect the unexpected (eg. globals)""
  console.log(x); // Raises an error
}

why();
```

Limiting global variables will help you create code that is much more easily
maintainable. Strive to write your functions so that they are self-contained and
not reliant on outside variables. This will also be a huge help in allowing us
test each function by itself.

One of our jobs as programmers is to write code that can be integrated easily
within a team. In order to do that, we need to limit the number of globally
declared variables in our code as much as possible, to avoid accidental name
collisions.

Sloppy programmers use global variables, and you are not working so hard in
order to be a sloppy programmer!

### What you learned

- Identify the different ways to declare a variable in JavaScript
- Explain the differences between `const`, `let` and `var`
- Identify the difference between function and block-scoped variables
- Paraphrase the concept of hoisting in regards to variables

________________________________________________________________________________
# Calculating Closures

What is a _closure_? This question is one of the _most frequent interview
questions_ where JavaScript is involved. If you answer this question quickly and
knowledgeably you'll look like a great candidate. We know you want to know it
all so let's dive right in!

The official definition of a closure from MDN is, "A closure is the combination
of a function and the lexical environment within which that function was
declared." The practicality of how a _closure_ is used it simple: a _closure_ is
when an inner function uses, or changes, variables in an outer function.
Closures in JavaScript are incredibly important in terms of the creativity,
flexibility and security of your code.

When you finish this reading you should be able to implement a closure and
explain how that closure effects scope.

## Closures and scope

Let's look at an example of a simple closure below:

```javascript
function climbTree(treeType) {
  let treeString = "You climbed a ";

  function sayClimbTree() {
    // this inner function has access to the variables in the outer scope
    // in which is was defined - including any defined parameters
    return treeString + treeType;
  }

  return sayClimbTree();
}

// We assign the result to a variable
const sayFunction = climbTree("Pine");

// So we can call it, and indeed the variables have been saved in the closure
// and the sayFunction prints out their values.
console.log(sayFunction); // You climbed a Pine
```

In the above snippet the `sayClimbTree` function captures and uses the
`treeString` and `treeType` variables within its own inner scope.

Let's go over some basic closure rules:

1. Closures have access to any variables within its own, as well as any outer
   function's, scope when they are declared. This is where the _lexical
   environment_ comes in - the _lexical environment_ consists of any variables
   available within the scope in which the closure was declared (which are the
   local inner scope, outer function's scope, and global scope).
2. A closure will keep reference to all the variables when it was defined **even
   if the outer function has returned**.

Notice above that even though the above `climbTree` had run its `return`
statement the inner function of `sayClimbTree` **still has access** to the
variables(`treeString` and `treeType`) from the outer scope where it was
declared. So, even after an outer function has returned, an inner function will
still have access to the outer function’s variables.

Let's look at another example of a closure:

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);

console.log(add5(2)); // prints 7
```

In the above example the function the anonymous function within the `makeAdder`
function **closes over** the `x` variable and utilizes it within the inner
anonymous function. This allows us to do some pretty cool stuff like creating
the `add5` function above. Closures are your friend ❤️.

## Applications of closures

Let's take a look at some of the common and practical applications of closures
in JavaScript.

### Private State

Information hiding is incredibly important in the world of software engineering.
JavaScript as a language does not have a way of declaring a function as
exclusively private, as can be done in other programming languages. We can
however, use _closures_ to create private state within a function.

The following code illustrates how to use _closures_ to define functions that
can emulate private functions and variables:

```javascript
function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

let counter = createCounter();
console.log(counter()); // => 1
console.log(counter()); // => 2

//we cannot reach the count variable!
counter.count; // undefined
let counter2 = createCounter();
console.log(counter2()); // => 1
```

In the above code we are storing the anonymous inner function inside the
`createCounter` function onto the variable `counter`. The `counter` variable is
now a _closure_. The `counter` variable **closes over** the inner `count` value
inside `createCounter` even after `createCounter` has returned.

By **closing over** (or **capturing**) the `count` variable, each function that
is return from `createCounter` has a **private**, mutable state that cannot be
accessed externally. There is no way any outside function beside the closure
itself can access the `count` state.

[pre-crement]:
  https://stackoverflow.com/questions/3469885/somevariable-vs-somevariable-in-javascript

### Passing Arguments Implicitly

We can use closures to pass down arguments to helper functions without
explicitly passing them into that helper function.

```javascript
function isPalindrome(string) {
  function reverse() {
    return string
      .split("")
      .reverse()
      .join("");
  }

  return string === reverse();
}
```

## What you learned

How to implement a closure and explain how that closure effects scope.

________________________________________________________________________________
# Context in JavaScript

It's now time to dive into one of the most interesting concepts in JavaScript:
the idea of **context**.

Programmers from the junior to senior level often confuse _scope_ and _context_
as the same thing - but that is not the case! Every function that is invoked has
**both** a scope and a context associated with that function. _Scope_ refers to
the visibility and availability of variables, whereas _context_ refers to the
value of the `this` keyword when code is executed.

When you finish this reading you should be able to:

- Define a method that references `this` on an object
- Identify what `this` refers to in a code snippet
- Utilize the built in `Function#bind` to maintain the context of `this`

## What about `this`?

When learning about objects we previously came across the idea of a _method_. A
_method_ is a function that is a value within an object and belongs to an
object.

There will be times when you will have to know which object a method belongs to.
The keyword `this` exists in every function and it evaluates to the object that
is currently invoking that function. So the value of `this` relies entirely on
**where** a function is invoked.

That may sound pretty abstract, so let's jump into an example:

```js
let dog = {
  name: "Bowser",

  isSitting: true,

  stand: function () {
    this.isSitting = false;
    return this.isSitting;
  },
};

// Bowser starts out sitting
console.log(dog.isSitting); // prints `true`

// Let's make him stand
console.log(dog.stand()); // prints `false`

// He's actually standing now!
console.log(dog.isSitting); // prints `false`
```

Inside of a method, we can use the keyword `this` to refer to the object that is
calling that method! So when calling `dog.stand()` and we invoke the code of the
`stand` method, `this` will refer to the `dog` object.

Still skeptical? Don't take our word for it, check `this` (heh) out:

```js
let dog = {
  name: "Bowser",

  test: function () {
    return this === dog;
  },
};

console.log(dog.test()); // prints `true`
```

In short, by using the `this` keyword inside a method, we can refer to values
within that object.

Let's look at another example of this:

```javascript
let cat = {
  purr: function () {
    console.log("meow");
  },
  purrMore: function () {
    this.purr();
  },
};

cat.purrMore();
```

Through the `this` variable, the `purrMore` method can access the object it was
called on. In `purrMore`, we use `this` to access the `cat` object that has a
`purr` method. In other words, inside of the `purrMore` function if we had tried
to use `purr()` instead of `this.purr()` it would not work.

When we invoked the `purrMore` function using `cat.purrMore` we used a
**method-style** invocation.

Method style invocations follow the format: `object.method(args)`. You've
already been doing this using built in data type methods! (i.e. `Array#push`,
`String#toUpperCase`, etc.)

Using _method-style invocation_ (note the _dot notation_) ensures the method
will be invoked and that the `this` within the method will be the object that
method was called upon.

Now that we have gone over what `this` refers to - you can have a full
understanding of the definition of context. **Context refers to the value of
`this` within a function and `this` refers to where a function is invoked**.

## Issues with scope and context

In the case of context the value of `this` is determined by _how_ a function is
invoked. In the above section we talked briefly about _method-style invocation_,
where `this` is set to the object the method was called upon.

Let's now talk about what `this` is when using normal _function style
invocation_.

If you run the following in Node:

```js
function testMe() {
  console.log(this); //
}

testMe(); // Object [global] {global: [Circular], etc.}
```

When you run the above `testMe` function in Node you'll see that `this` is set
to the `global` object. To reiterate: each function you invoke will have _both_
a context and a scope. So even running functions in Node that are not defined
explicitly on declared objects are run using the global object as their `this`
and therefore their context.

### When methods have an unexpected context

So let's now look at what happens when we try to invoke a method using an
unintended context.

Say we have a function that will change the name of a dog object:

```js
let dog = {
  name: "Bowser",
  changeName: function () {
    this.name = "Layla";
  },
};
```

Now say we wanted to take the `changeName` function above and call it somewhere
else. Maybe we have a callback we'd like to pass it to or another object or
something like that.

Let's take a look at what happens when we try to isolate and invoke just the
`changeName` function:

```js
let dog = {
  name: "Bowser",
  changeName: function () {
    this.name = "Layla";
  },
};

// note this is **not invoked** - we are assigning the function itself
let change = dog.changeName;
console.log(change()); // undefined

// our dog still has the same name
console.log(dog); // { name: 'Bowser', changeName: [Function: changeName] }

// instead of changing the dog we changed the global name!!!
console.log(this); // Object [global] {etc, etc, etc,  name: 'Layla'}
```

So in the above code notice how we stored the `dog.changeName` function _without
invoking it_ to the variable `change`. On the next line when we did invoke the
`change` function we can see that we did not actually change the `dog` object
like we intended to. We created a new key value pair for `name` on the
global object! This is because we invoked change without the context of a
specific object (like `dog`), so JavaScript used the only object available to
it, the **global object**!

The above example might seem like an annoying inconvenience but let's take a
look at what happens when calling something in the wrong context can be a big
problem.

Using our `cat` object from before:

```js
let cat = {
  purr: function () {
    console.log("meow");
  },
  purrMore: function () {
    this.purr();
  },
};

let notACat = cat.purrMore;
console.log(notACat()); // TypeError: this.purr is not a function
```

So in the above code snippet we attempted to call the `purrMore` function
_without the correct Object for context_. Meaning we attempted to call the
`purrMore` function on the global object! Since the global object does not have
a `purr` method upon its `this` it raised an error. This is a common problem
when invoking methods: invoking methods without their proper context.

Let's look at one more example of confusing `this` when using a callback.
Incorrectly passing context is an inherent problem with callbacks. The
`global.setTimeout()` method on the global object is a popular way of setting a
function to run on a timer. The `global.setTimeout()` method accepts a callback
and a number of milliseconds to wait before invoking the callback.

Let's look at a simple example:

```js
let hello = function () {
  console.log("hello!");
};

// global. is a method of the global object!
global.setTimeout(hello, 5000); // waits 5 seconds then prints "hello!"
```

Expanding on the `global.setTimeout` method now using our `cat` from before
let's say we wanted our `cat` to "meow" in 5 seconds instead of right now:

```js
let cat = {
  purr: function () {
    console.log("meow");
  },
  purrMore: function () {
    this.purr();
  },
};

global.setTimeout(cat.purrMore, 5000); // 5 seconds later: TypeError: this.purr is not a function
```

So what happened there? We called `cat.purrMore` so it should have the right
context right? Noooooope. This is because `cat.purrMore` is a callback in the
above code! Meaning that when the `global.setTimeout` function attempts to call
the `purrMore` function all it has reference to is the function itself. Since
`setTimeout` is on the global object that means that the global object will be
the context for attempting to invoke the `cat.purrMore` function.

#### Strictly protecting the global object

The accidental mutation of the global object when invoking functions in
unintended contexts is one of the reasons JavaScript released "strict" mode in
ECMAScript version 5. We won't dive too much into JavaScript's strict mode here,
but it's important to know how strict mode can be used to protect the global
object.

Writing and running code in strict mode is easy and much like writing code in
"sloppy mode" (jargon for the normal JavaScript environment). We can run
JavaScript in strict mode simply by adding the string "use strict" at the top of
our file:

```js
"use strict";

function hello() {
  return "Hello!";
}

console.log(hello); // prints "Hello!"
```

One of the differences of strict mode becomes apparent when trying to access the
global object. As we mentioned previously, the global object is the context of
invoked functions in Node that are not defined explicitly on declared objects.

So referencing `this` within a function using the global object as its context
will give us access to the global object:

```js
function hello() {
  console.log(this);
}

hello(); // Object [global] {etc, etc, etc }
```

However, strict mode will no longer allow you access to the global object in
functions via the `this` keyword and will instead return `undefined`:

```js
"use strict";

function hello() {
  console.log(this);
}

hello(); // undefined
```

Using strict mode can help us avoid scenarios where we accidentally would have
mutated the global object. Let's take our example from earlier and try it in
strict mode:

```js
"use strict";

let dog = {
  name: "Bowser",
  changeName: function () {
    this.name = "Layla";
  },
};

// // note this is **not invoked** - we are assigning the function itself
let changeNameFunc = dog.changeName;

console.log(changeNameFunc()); // TypeError: Cannot set property 'name' of undefined
```

As you can see above, when we attempt to invoke the `changeNameFunc` an error is
thrown because referencing `this` in strict mode will give us `undefined`
instead of the global object. The above behavior is helpful for catching
otherwise tricky bugs.

If you'd like to learn more about strict mode we recommend checking out the
[documentation][strict-mode].

[strict-mode]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

## Changing context using `bind`

Good thing JavaScript has something that can solve this problem for us: what is
known as the **binding** of a context to a function.

From the [`Function.prototype.bind()`][bind-docs], "The simplest use of `bind()`
is to make a function that, no matter how it is called, is called with a
particular `this` value".

Here is a preview of the syntax we use to `bind`:

```js
let aboundFunc = func.bind(context);
```

So when we call `bind` we are returned what is called an exotic function. Which
essentially means a function with it's `this` bound no matter where that
function is invoked.

Let's take a look at example at `bind` in action:

```js
let cat = {
  purr: function () {
    console.log("meow");
  },
  purrMore: function () {
    this.purr();
  },
};

let sayMeow = cat.purrMore;
console.log(sayMeow()); // TypeError: this.purr is not a function

// we can now use the built in Function.bind to ensure our context, our `this`,
// is the cat object
let boundCat = sayMeow.bind(cat);

// we still *need* to invoke the function
boundCat(); // prints "meow"
```

That is the magic of `Function#bind`! It allows you choose the context for your
function. You don't need to restrict the context you'd like to bind to either -
you can `bind` functions to any context.

Let's look at another example:

```js
let cat = {
  name: "Meowser",
  sayName: function () {
    console.log(this.name);
  },
};

let dog = {
  name: "Fido",
};

let sayNameFunc = cat.sayName;

let sayHelloCat = sayNameFunc.bind(cat);
sayHelloCat(); // prints Meowser

let sayHelloDog = sayNameFunc.bind(dog);
sayHelloDog(); // prints Fido
```

Let's now revisit our above example of losing context in a callback and fix our
context! Using the `global.setTimeout` function we want to call the
`cat.purrMore` function with the context bound to the cat object.

Here we go:

```js
let cat = {
  purr: function () {
    console.log("meow");
  },
  purrMore: function () {
    this.purr();
  },
};

// here we will bind the cat.purrMore function to the context of the cat object
const boundPurr = cat.purrMore.bind(cat);

global.setTimeout(boundPurr, 5000); // prints 5 seconds later: meow
```

#### Binding with arguments

So far we've talking of one of the the common uses of the `bind` function -
binding a context to a function. However, bind will not only allow you to bind
the context of a function but also to bind **arguments** to a function.

Here is the syntax for binding arguments to a function:

```js
let aboundFunc = func.bind(context, arg1, arg2, etc...);
```

Following that train of logic let's look at example of binding arguments to a
function, regardless of the context:

```js
const sum = function (a, b) {
  return a + b;
};

// here we are creating a new function named add3
// this function will bind the value 3 for the first argument
const add3 = sum.bind(null, 3);

// now when we invoke our new add3 function it will add 3 to
// one incoming argument
console.log(add3(10));
```

Note that in the above snippet where we `bind` with `null` we don’t actually use
`this` in the `sum` function. However, since `bind` requires a first argument we
can put in `null` as a place holder.

Above when we created the `add3` function we were creating a new bound function
where the context was `null`, since the context won't matter, and the first
argument will _always_ be `3` for that function. Whenever we invoke the `add3`
function all other arguments will be passed in normally.

Using `bind` like this gives you a lot of flexibility with your code. Allowing
you to create independent functions that essentially do the same thing while
keeping your code very DRY.

Here is another example:

```js
const multiply = function (a, b) {
  return a * b;
};

const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log(double(3)); // 6
console.log(triple(3)); // 9
```

[bind-docs]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

## What you learned

- How to define a method that references `this` on an object
- Identify what `this` refers to in a code snippet
- How to utilize the built in `Function#bind` to maintain the context of `this`

________________________________________________________________________________
# Arrow Functions

Arrow functions, a.k.a. Fat Arrows (`=>`), are a more concise way of declaring
functions. Arrow functions were introduced in ES2015 as a way of solving many of
the inconveniences of the normal callback function syntax.

Two major factors influenced the reason behind the desire for arrow functions:
the need for shorter functions and behavior of `this` and context.

When you finish this reading you should be able to:

- Define an arrow function
- Given an arrow function, deduce the value of `this` without executing the code

## Arrow functions solving problems

Let's start by looking at the arrow function in action!

```javascript
// function declaration
let average = function(num1, num2) {
  let avg = (num1 + num2) / 2;
  return avg;
};

// fat arrow function style!
let averageArrow = (num1, num2) => {
  let avg = (num1 + num2) / 2;
  return avg;
};
```

Both functions in the example above accomplish the same thing. However, the
arrow syntax is a little shorter and easier to follow.

### Anatomy of an arrow function

The syntax for a multiple statement arrow function is as follows:

```
(parameters, go, here) => {
  statement1;
  statement2;
  return <a value>;
}
```

So let's look at a quick translation between a function declared with a function
expression syntax and a fat arrow function. Take notice of the removal of the
`function` keyword, and the addition of the fat arrow (`=>`).

```js
function fullName(fname, lname) {
  let str = "Hello " + fname + " " + lname;
  return str;
}

// vs.

let fullNameArrow = (fname, lname) => {
  let str = "Hello " + fname + " " + lname;
  return str;
};
```

If there is only a single parameter you may omit the `( )` around the parameter
declaration:

```js
param1 => {
  statement1;
  return value;
};
```

If you have no parameters with an arrow function you must still use the `( )`:

```js
// no parameters will use parenthesis
() => {
  statements;
  return value;
};
```

Let's see an example of an arrow function with a single parameter with no
parenthesis:

```js
const sayName = name => {
  return "Hello " + name;
};

sayName("Jared"); // => "Hello Jared"
```

#### Single expression arrow functions

**Reminder:** In JavaScript, an _expression_ is a line of code that returns a
value. _Statements_ are, more generally, any line of code.

One of the most fun things about single expression arrow functions is they allow
for something previously unavailable in JavaScript: **implicit returns**.
Meaning, in an arrow function with a single-expression block, the curly braces
(`{ }`) and the `return` are keyword are **implied**.

```javascript
argument => expression; // equal to (argument) => { return expression };
```

Look at the below example you can see how we use this snazzy _implicit returns_
syntax:

```js
const multiply = function(num1, num2) {
  return num1 * num2;
};

// do not need to explicitly state return!
const arrowMultiply = (num1, num2) => num1 * num2;
```

However this doesn't work if the fat arrow uses multiple statements:

```javascript
const halfMyAge = myAge => {
  const age = myAge;
  age / 2;
};

console.log(halfMyAge(30)); // "undefined"
```

To return a value from a fat arrow with multiple statements, you _must_
explicitly return:

```javascript
const halfMyAge = myAge => {
  const age = myAge;
  return age / 2;
};

console.log(halfMyAge(30)); // 15
```

#### Syntactic ambiguity with arrow functions

In Javascript, `{}` can signify either an empty object or an empty block.

```javascript
const ambiguousFunction = () => {};
```

Is `ambiguousFunction` supposed to return an empty object or an empty code
block? Confusing right? JavaScript standards state that the curly braces after a
fat arrow evaluate to an empty block (which has the default value of
`undefined`):

```javascript
ambiguousFunction(); // undefined
```

To make a single-expression fat arrow return an empty object, wrap that object
within parentheses:

```javascript
// this will implicitly return an empty object
const clearFunction = () => ({});
clearFunction(); // returns an object: {}
```

#### Arrow functions are anonymous

Fat arrows are _anonymous_, like their [`lambda`][lambda] counterparts in other
languages.

```javascript
sayHello(name) => console.log("Hi, " + name); // SyntaxError
(name) => console.log("Hi, " + name); // this works!
```

If you want to name your function you must assign it to a variable:

```js
const sayHello = name => console.log("Hi, " + name);

sayHello("Curtis"); // => Hi, Curtis
```

[lambda]: https://en.wikipedia.org/wiki/Anonymous_function

That's about all you need to know for arrow functions syntax-wise. Arrow
functions aren't just a different way of writing functions, though. They
_behave_ differently too - especially when it comes to context!

## Arrow functions with context

Arrow functions, unlike normal functions, **carry over context, binding `this`
lexically**. In other words, `this` means the same thing inside an arrow
function that it does outside of it. Unlike all other functions, the value of
`this` inside an arrow function is not dependent on how it is invoked.

Let's do a little compare and contrast to illustrate this point:

```javascript
const testObj = {
  name: "The original object!",
  createFunc: function() {
    return function() {
      return this.name;
    };
  },

  createArrowFunc: function() {
    // the context within this function is the testObj
    return () => {
      return this.name;
    };
  }
};

const noName = testObj.createFunc();
const arrowName = testObj.createArrowFunc();

noName(); // undefined
arrowName(); // The original object!
```

Let's walk through what just happened - we created a `testObj` with two methods
that each returned an anonymous function. The difference between these two
methods is that the `createArrowFunc` function contained an arrow function
inside it. When we invoked both methods we created two function - the `noName`
function creating it's own scope and context while the `arrowName` **kept** the
context of the function that created it (`createArrowFunc`'s context of
`testObj`).

An arrow function will always have the same context as the function that created
it - giving it access to variables available in that context (like `this.name`
in this case!)

### No binding in arrow functions

One thing to know about arrow functions is since they already have a _bound
context_, unlike normal functions, you can't reassign `this`. The `this` in
arrow functions is always what it was at the time that the arrow function was
declared.

```javascript
const returnName = () => this.name;

returnName(); // undefined

// arrow functions can't be bound
let tryToBind = returnName.bind({ name: "Party Wolf" }); // undefined
tryToBind(); //  will still be undefined
```

## What you learned

- How to define an arrow function
- how to deduce the value of `this` in an arrow function

________________________________________________________________________________
## Scope Problems

It's time to get some practice using scope in the wild! This task includes a
link to download a `zip` file with a number of problems.

Complete the problems in the order specified. In addition to the prompts
available at the top of each file, Mocha specs are provided to test your work.

To get started, use the following commands:

1. `cd` into the project directory
2. `npm install` to install any dependencies
3. `mocha` to run the test cases

________________________________________________________________________________
# WhiteBoarding Problem

## The Question

Write a function named `hiddenCounter()`. The `hiddenCounter` function will
start by declaring a variable that will keep track of a count and will be
initially set to 0. Upon first invocation `hiddenCounter` will return a
function. Every subsequent invocation will increment the previously described
count variable.

Explain how the closure you have created affects the scope of both functions.

Examples:

```js
let hidden1 = hiddenCounter(); //returns a function
hidden1(); // returns 1
hidden1(); // returns 2

let hidden2 = hiddenCounter(); // returns a function
hidden2(); // returns 1
```
<!--
## The Answer

```js
function hiddenCounter() {
  let count = 0;
  // here we are returning an inner function that will create a closure by
  // closing over the above count variable and changing it each time the
  // the inner function is invoked
  return () => (count += 1);
}
```
-->
