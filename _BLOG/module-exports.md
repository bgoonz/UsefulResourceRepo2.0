# Node.js Module Exports - Demystified

> Understand Node.js Module Exports and get comfortable using the syntax. Get best practices for using module exporting to give your app a better structure.

When I [started out in Node.js,](https://stackify.com/learn-nodejs-tutorials/) I remember being struck by the weird-looking module.exports code.

I wondered what it was, and where it came from, and why it wasn’t declared in the file. What _was_ this magic?

Today we’re going to find out. We’ll demystify this somewhat odd-looking feature of Node.js. By the end of this article, you should be comfortable not only using the syntax, but also understanding what it actually does under the hood. To round it all off, we’ll go through some best practices for using module exporting to break down and give your application some great structure.

Sound good to you? Let’s dive in!

### What’s a module, anyway?

The first question to answer when we’re discussing module exports is the first part, the module. What is it? And why should we care about it?

In simple terms, a module is code that we group together for the purposes of sharing and reuse. Modules, therefore, allow us to break down complexity in our applications into small chunks. This can help with understanding the code right down to [finding and fixing bugs](https://stackify.com/node-js-debugging-tips/).

Fairly straightforward, right?

Now that you know what modules are, let’s see how they’re used—specifically—in Node.js.

### Modules in JavaScript explained

Before we get to how modules are handled in Node.js, I want to take a moment to clarify the different conflicting and confusing alternate module systems in the JavaScript ecosystem.

You might’ve heard of some of them: CommonJS, AMD, RequireJS, UMD… Ugh, it’s all very confusing. Which one should you use and when?

The best way to understand the module system is to see how it’s evolved over time, and why. So let’s do that first.

#### Javascript modules started in your web browser

Originally JavaScript started in the browser—there was no module system at all.

Why? Because JavaScript was a small language intended to perform only small tasks, not build full-blown applications. A module system would have been overkill, so JavaScript simply didn’t have one!

But, as JavaScript apps grew in complexity, developers started to feel the absence of an ability to break down applications, especially developers using [other languages with existing module systems](https://stackify.com/exploring-java-9-module-system-and-reactive-streams/). We started to experiment with all kinds of weird hacks with [anonymous functions,](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript) and built big global objects that contained all our code in one huge spaghetti mess.

At this point, [RequireJS](https://requirejs.org/) and [AMD](https://requirejs.org/docs/whyamd.html) (asynchronous module loading) entered the scene. They attempted to unify how modules can be achieved in JS. Specifically, they tried to incorporate just-in-time module loading, which led to drastic increases in complexity for these pseudo-modules.

Try Stackify’s free code profiler, [Prefix](https://stackify.com/prefix), to write better code on your workstation. Prefix works with .NET, Java, PHP, Node.js, Ruby, and Python.

#### Javascript modules with Node.js

When Node.js was invented, modules and code encapsulation were high on the priority list. The creators of Node.js were keen for it to not suffer the same fate as the browser by having a big, dangerous global scope. So they implemented Node.js with a module specification called [CommonJS](https://en.wikipedia.org/wiki/CommonJS) (which is where you get the [module exports](https://nodejs.org/api/modules.html) and [require](https://nodejs.org/api/modules.html#modules_require) syntax from).

To make matters more complicated, though, you can also use the soon-to-be-implemented [JavaScript module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). At the time of writing, this is [still not yet supported in Node.js](https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71) but can be implemented with a [transpiler](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them), like [Babel](https://babeljs.io/), that converts it back to CommonJS format. (We’ll save this native syntax for another article.)

#### So which module system is best?

We’ve discussed a few existing module syntaxes: AMD, CommonJS, and even native JavaScript modules. But which one is best? And why would we need to use CommonJS?

The answer is: It depends.

AMD is useful in the browser for performance optimizations. In Node.js, CommonJS often makes simplistic sense while JavaScript modules still require a pre-compiler. For both, though, native JavaScript modules are a good choice. That’s because, even if you’re pre-compiling now, it’s likely that sometime in the very near future you’ll be able to whip all your pre-compilation steps out.

This doesn’t seem like the greatest of answers, I know.

But there is somewhat of a solution for software authors, and it’s called UMD (a Universal Module Definition). UMD allows a JavaScript module to be compatible across all the different module formats. If you’re curious how UMD works its magic, [check out this article.](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) You’ll see it’s done with some pretty ugly-looking if-statements but the outcome is still the same, universal module usage.

Okay, by now you’re probably thinking, Why does all this talk of different modules matter? And how does it all relate back to module.exports? Let’s get to that now!

### What are module exports?

As we said, module.exports are part of the CommonJS specification. But what exactly is it?

Module exports are the instruction that tells Node.js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code. (Don’t worry, we’ll cover importing code in the next section.)

To understand modules in Node.js, I like to imagine all my modules written together in one file (not as modules), and then imagine what code I’d need to make that happen. The code would look like each module wrapped in a function and given an argument, which is the current module.

Spoiler alert: [Modules wrapped in functions is pretty much what happens under the hood.](https://nodejs.org/api/modules.html#modules_the_module_wrapper)

But why does our module wrapped in a function even matter?

Because the module’s object is simply an argument—an object, in this case—to our module that we can manipulate as we please. Below is an example of how that module object looks:

    {
        id: '.',
        exports: {},
        parent: null,
        filename: '/test.js',
        loaded: false,
        children: [],
        paths:
        [
            '/Users/lbichard/Desktop/node_modules',
            '/Users/lbichard/node_modules',
            '/Users/node_modules',
            '/node_modules'
        ]
    }

As you can see, the mystic modules value is just an object passed into our module. We can then push to the exports object any values we wish to export from our current module.

You can also see above how exports is a subproperty on our module object. Whatever code we now apply to the exports property will become the export of our module. When we require our module in another file, it will get the value of that exports property.

    module.exports.stringProperty = "I love NodeJS";
    console.log(module);
    // outputs ->
    {
        id: '.',
        exports: { stringProperty: 'I love NodeJS' }
        ...
    }

Note: By default, exports is an object, but it can also be a function, number, string, etc.

### But what about require?

To understand modules, we have to understand require, too.

There’s no real sense in exporting functionality if we’re not consuming it elsewhere.

Require is a function we can use to import other modules, and it looks like this:

    let model = require('./model.js');

Require will search for modules using the following rules:

- Is there a core module with the required path? Yes, return it.
- Is there a node_modules package with the name of the path? Yes, return it.
- Is there a file (or directory!) with the name of the given path? Yes, return it.
- Otherwise, [throw an error.](https://stackify.com/node-js-error-handling/)

As you can see, require is used to pull in different packages by their names or file paths.

But what if we require a module multiple times?

### Requiring a module multiple times

A question I get a lot is this: “If we import the same module in two files, will we get the same object reference?” In short, yes. But the longer answer is “It depends.” Node.js will cache requests for a given module to save time later. But, you can’t rely on this functionality, as sometimes the caching system doesn’t work as expected (for reasons we won’t go into in this article).

### How to structure your module exports

So now you know that you can apply different bits of code to your module exports object. But we never said specifically _how_ you should structure your files. It can be a little confusing, as you’ve got a lot of flexibility. Do you define your properties as you go? All at the end of the file? What’s the standard?

We’ll answer these questions now.

#### Exporting as you go vs. at the end of a file

Knowing we can apply properties to our exports object begs the question: When should we do this?

The answer is: It’s totally feasible to apply properties throughout your module, as follows:

    module.exports.getUser = () => {
        // Code here
    }

    module.exports.getUsers = () => {
        // Code here
    }

If you console-logged this as an import, it would return the following:

    { getUser: [Function], getUsers: [Function] }

An important point to note here is because we used the [fat arrow function,](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) our functions are anonymous (which can be problematic when trying to decipher stack traces).

For this reason, many Node.js developers favor the following pattern:

    function getUser() {
        // Code here
    }

    function getUsers() {
        // Code here
    }

    module.exports = {
        getUser,
        getUsers
    }

This would output:

    { getUser: [Function: getUser], getUsers: [Function: getUsers] }

This gives us function names and documents the API clearly at the end of the file.

All told, this is a common pattern for JavaScript developers and is called the [revealing module pattern](https://gist.github.com/zcaceres/bb0eec99c02dda6aac0e041d0d4d7bf2).

### Mastering modularized Node.js

This post hopefully gave you an introduction to modules and exporting in Node.js. I also hope it cleared up some of the mysticism around module exports—it’s not really all that magical. Simply keeping your files separate and cleanly documenting your code through good structure will help you and your team be more productive when writing Node.js code.

Remember: Module.exports is simply an object that you assign properties to, and that object gets passed to your requiring file. Be sure to define your exports synchronously, and as always… keep it simple!

If you need help improving and monitoring the [performance of your Node.js applications](https://stackify.com/retrace-apm-nodejs/), be sure to check out [Retrace](https://stackify.com/retrace/), Stackify’s industry-leading APM tool.

[Source](https://stackify.com/node-js-module-exports/)
