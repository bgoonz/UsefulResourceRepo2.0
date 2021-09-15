# Introduction to NPM Scripts

> by Mohammed Ajmal Siddiqui Introduction to NPM ScriptsNPM scripts are among my favorite features of NPM. They are simple. They reduce the need for tools. Hence they reduce the number of configuration files and other things you need to keep track of. And they are very versatile. They also let

by Mohammed Ajmal Siddiqui

![](https://cdn-media-1.freecodecamp.org/images/jZE7PuhdZb0p5zamPpgLazm8LqdoQ9pJ51al)

NPM scripts are among my favorite features of NPM. They are simple. They reduce the need for tools. Hence they reduce the number of configuration files and other things you need to keep track of. And they are very versatile. They also let you automate a lot of common tasks. some of which are listed towards the end of the article.

Without further ado, let’s dive into NPM scripts!

### What are NPM Scripts?

NPM scripts are, well, scripts. We use scripts to automate repetitive tasks. For example, building your project, minifying Cascading Style Sheets (CSS) and JavaScript (JS) files. Scripts are also used in deleting temporary files and folders, etc,. There are many ways to pull this off — you could write bash/batch scripts, or use a task runner like Gulp or Grunt. However, a lot of people are moving over to NPM scripts for their simplicity and versatility. They also offer possibility of having fewer tools to learn, use, and keep track of.

Now that we have (some) idea of what NPM scripts are and what they can do for us, let’s go ahead and write some!

### The Scripts Object in package.json

Most of our work will happen in the package.json file that NPM uses as a manifest of sorts. This is the file that is created when you run `npm init.`

Here’s a sample package.json file:

    {       "name": "super-cool-package",       "version": "1.0.0",       "scripts": {            ...       },     "dependencies": {         ...    }        "devDependencies": {             ...       } }

If you’ve been working with NodeJS and NPM, you will be familiar with the package.json file. Notice the `scripts` object in the file. This is where our NPM scripts will go. NPM scripts are written as usual JSON key-value pairs where the key is the name of the script and the value contains the script you want to execute.

Here’s perhaps the most popular NPM script (and it’s also a special kind of script):

    "scripts": {    "start": "node index.js",    ...}

You’ve probably seen this tons of times in your package.json files. And you probably know that you can type `npm start` to execute the script. But this example illustrates the first important aspect of NPM scripts — they are simply terminal commands. They run in the shell of the OS on which they’re executed. So it might be bash for Linux and cmd.exe for Windows.

At this point, you might be rather unimpressed. But keep reading to see how powerful NPM scripts really are.

### Custom Scripts

The script we just saw is one of the “special" NPM scripts. You can execute it by simply typing `npm start`. These are scripts with names that NPM recognizes and attaches special meaning to. For example, you can write a script called `prepublish`. NPM will execute the script before your package is packed and published, and also when you run `npm install` locally without any arguments. More on such scripts [here](https://docs.npmjs.com/misc/scripts).

But NPM also let’s you define your own custom scripts. This is where the power of NPM scripts starts to show itself.

Let’s look at a super basic custom NPM script that outputs “hello world" to the console. Add this to the scripts object of your package.json file:

    "say-hello": "echo 'Hello World'"

The scripts object in your package.json file should look like this:

    ..."scripts": {    "start": "node index.js",    "say-hello": "echo 'Hello World!'"}

Now try running `npm say-hello`. Doesn’t work? This is because custom NPM scripts must be preceded by either `run-script` or `run` for them to be executed correctly. Try running `npm run-script say-hello` or `npm run say-hello`. The console says, “Hello World!"! We’ve written our first NPM script!

Here’s a quick tip — in order to prevent the default NPM logs from outputting to the console when you execute a script, add the `--silent` flag. This is what your command would look like:

    npm run --silent say-hello

### Calling NPM Scripts Within Other NPM Scripts

One downside of using NPM scripts shows up when your script is fairly complex (and long). This problem is compounded by the fact that the JSON spec does not support comments. There are a few ways around this problem. One way is to divide your script into small single-purpose scripts and then call them within other NPM scripts. The way to call an NPM script within another is straightforward. Modify your `scripts` object so that it looks like this:

    "scripts": {    "say-hello": "echo 'Hello World'",    "awesome-npm": "npm run say-hello && echo 'echo NPM is awesome!'"}

Since NPM scripts execute in the shell, calling `npm run say-hello` within another NPM script is almost intuitive.

> For those of you who are not very comfortable with terminal commands, the `_&&_`in the script is used to delimit two commands. Thus, the second command executes after the successful execution of the first command.

Now when you run `npm run awesome-npm`, the say-hello script executes first, outputting “Hello World" to the console, followed by the part of the script after the `&&`, which outputs “NPM is awesome!"

Here’s a use case where this might be useful. Suppose you’re automating the build process of your application. Let’s say you’re using Webpack as a bundler and your distribution code goes into a directory called “dist".

You might start with cleaning the directory. This can be done by either deleting its contents or deleting the directory itself and then making it again. Let’s go with the latter approach. Your command might look something like this:

    rm -r dist && mkdir dist

> Note that this uses bash commands. You will learn how to write cross-platform NPM scripts later in this article.

After this, you might invoke the bundler by executing the `webpack` command.

You can execute these commands in succession by using the `&&`operator. However, for the sake of demonstration and modularity, let’s split this into two NPM scripts that call each other.

Here’s what the scripts object would look like in this use case:

    "scripts": {    ...    "clean": "rm -r dist && mkdir dist",    "build": "npm run clean && webpack"}

There you have it! How to split a more complex task into smaller NPM scripts.

### Calling Shell and Node Scripts

At times, you may have to write scripts far more complex than ones that can be achieved in 2–3 commands. When this situation arises, one solution is to write bash or JS scripts (or scripts in any scripting language you like) and call them from NPM scripts.

Let’s quickly write a bash script that says hello to you. Create a file called `hello.sh` in your root directory and paste this code in it:

    #!/usr/bin/env bash

    # filename: hello.shecho "What's your name?"read nameecho "Hello there, $name!"

It’s a simple script that echoes your name back to you. Now modify the `package.json` file so that the `scripts` object has this line of code:

    "bash-hello": "bash hello.sh"

Now, when you run `npm run bash-hello`, it asks you for your name and then says hello to you! Brilliant.

You can do the same thing with JS scripts run using node. An advantage of this approach is that this script will be platform independent since it uses node to run. Here’s a slightly more complex JS script to add two integers received as command line arguments (put this in a file named add.js):

    // add.js// adds two integers received as command line arguments

    function add(a, b) {    return parseInt(a)+parseInt(b);}

    if(!process.argv[2] || !process.argv[3]) {    console.log('Insufficient number of arguments! Give two numbers please!');}

    else {    console.log('The sum of', process.argv[2], 'and', process.argv[3], 'is', add(process.argv[2], process.argv[3]));}

> The process.argv object contains the command line arguments given to the script. The first two elements, `_process.argv[0]_` and `_process.argv[1]_`, are reserved by node. Thus `_process.argv[2]_` and `_process.argv[3]_` let you access the command line arguments.

Now add this line to the `scripts` object of the `package.json` file:

    "js-add": "node add.js"

Finally, run the script as an npm script by giving it two numbers as command line arguments:

    npm run js-add 2 3

And viola! The output is

    The sum of 2 and 3 is 5

Brilliant! Now we’re capable of writing much more powerful scripts and leveraging the power of other scripting languages.

### Pre and Post Hooks

Remember how we talked about a special npm script called `prepublish` that runs before you publish your package? Such a functionality can be achieved with custom scripts too. We’ve discussed one way to do this in the previous section. We can chain commands using the `&&`operator, so if you wanted to run script-1 before script-2, you would write:

    "script-2": "npm run script-1 && echo 'I am script-2'"

However, this makes our scripts a little dirty. This is because the core functionality of the script is reflected only in the second part of the command (after the `&&` ). One way to write clean scripts is to use pre and post hooks.

Pre and post hooks are exactly what they sound like — they let you execute scripts before and after you call a particular script. All you have to do is define new scripts with the same name as your main script. Yet these are prefixed with “pre" or “post" depending on whether the script is executed before the main script or after it.

Let’s look at our `say-hello` script again. Say we want to execute the command `echo 'I run before say-hello'` before `say-hello` and `echo 'I run after say-hello'` after say-hello. This is what your scripts object would look like:

    "scripts": {    "say-hello": "echo 'Hello World'",     "presay-hello": "echo 'I run before say-hello'",    "postsay-hello": "echo 'I run after say-hello'" }

The “pre" and “post" before the script names tell npm to execute these before and after the script called `say-hello` respectively.

Now, when you run `npm run say-hello`, the output of all three scripts shows up in order! How cool is that?

Since all three scripts output to the console and the NPM logs clutter the output, I prefer using the `-silent` flag while running these. So your command would look like this:

    npm run --silent say-hello

And here’s the output:

    I run before say-helloHello WorldI run after say-hello

There you have it!

Let’s apply this knowledge to our build script example. Modify your `package.json` file so that it looks like this:

    "scripts": {    ...    "clean": "rm -r dist && mkdir dist",     "prebuild": "npm run clean"    "build": "webpack"}

Now our scripts look much cleaner. When you run `npm run build`, `prebuild`is called because of the “pre" hook, which calls `clean`, which cleans up our dist directory for us. Sweet!

### Making Our Scripts Cross-Platform

There is one drawback of writing terminal/shell commands in our scripts. This is the fact that shell commands make our scripts platform dependently. This is perhaps what draws our attention to tools like Gulp and Grunt. If your script is written for Unix systems, chances are, it won’t work on Windows, and vice versa.

The first time I used NPM scripts, which called other bash/batch scripts, I thought of writing two scripts per task. One for Unix and one for the Windows command line. This approach may work in use cases where the scripts aren’t that complex and there aren’t many scripts. However, it quickly becomes clear that they are not a good solution to the problem. Some of the reasons behind this are:

*   You have another thing to keep track of that distracts you from your primary task of working on the application. Instead, you end up working in the development environment.
*   You’re writing redundant code — the scripts you write are very similar and accomplish the same task. You’re essentially rewriting code. This violates one of the fundamental principles of coding — DRY: Don’t Repeat Yourself.

So how do we get around this? There are three approaches that you may use:

1.  **Use commands that run cross-platform:** Many useful commands are common to Unix and Windows. If your scripts are simple, consider using those.
2.  **Use node packages:** You can use node packages like [rimraf](https://www.npmjs.com/package/rimraf) or [cross-env](https://www.npmjs.com/package/cross-env) instead of shell commands. And obviously, you can use these packages in JS files if your script is large and complex.
3.  **Use ShellJS:** [ShellJS](https://www.npmjs.com/package/shelljs) is an npm package that runs Unix commands via Node. So this gives you the power to run Unix commands on all platforms, including Windows.

> The above approaches were taken from [this brilliant article](https://medium.freecodecamp.org/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8) by [Cory House](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/undefined) about why he left Grunt and Gulp for NPM scripts. The article details many things not covered in this series and concludes with a list of excellent resources. I would definitely recommend that you read it to further your understanding of NPM scripts.

### A Few Use Cases for NPM Scripts

Finally, there is a lot that you can do with NPM scripts. Some use cases are:

*   Minification/Uglification of CSS/JavaScript
*   Automating the build process
*   Linting your code
*   Compressing images
*   Automatically injecting changes with BrowserSync

And a lot more. To learn about how to automate the above-mentioned tasks using NPM scripts, check out [this brilliant article](https://css-tricks.com/why-npm-scripts/) on the topic.

### Bonus: Commander for Creating CLI Applications Using NodeJS

While we’re discussing NPM scripts and the CLI, I’d like to quickly tell you about a really cool package called commander. Commander allows you to create your own CLI applications. This isn’t really related to NPM scripts, but it’s a cool piece of technology to know. Check out the [commander docs here](https://www.npmjs.com/package/commander) or try one of these tutorials:

*   [Build An Interactive Command-Line Application with Node.js — Scotch.io](https://scotch.io/tutorials/build-an-interactive-command-line-application-with-nodejs)
*   [Writing Command Line Applications in NodeJS — freeCodeCamp](https://medium.freecodecamp.org/writing-command-line-applications-in-nodejs-2cf8327eee2)

### Concluding Words

That is all for this article on using NPM scripts. I hope you’ve gained some insight on how you can integrate these into your own projects. This article is by no means an in-depth tutorial on NPM scripts. Hence I’d recommend you learn further both from other resources and from actually using NPM scripts in your own projects.

Also, do connect with me on [GitHub](https://github.com/ajmalsiddiqui/) and [LinkedIn](https://www.linkedin.com/in/ajmal-siddiqui/).

_Happy Coding! :)_

Learn to code for free. freeCodeCamp's open source curriculum has helped more than 40,000 people get jobs as developers. [Get started](https://www.freecodecamp.org/learn)


[Source](https://www.freecodecamp.org/news/introduction-to-npm-scripts-1dbb2ae01633/)
