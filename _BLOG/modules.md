# **Javascript Modules:**

A module is a reusable piece of code that encapsulates implementation details and exposes a public API so it can be easily loaded and used by other code.

## Why are they useful?

Technically we can write code without modules.

Modules are a pattern that developers have been using in many different forms and programming languages since the 60’s and 70’s.

In JavaScript, modules should ideally allow us to:

- _abstract code_: to delegate functionality to specialised libraries so that we don’t have to understand the complexity of their actual implementation
- _encapsulate code_: to hide code inside the module if we don’t want the code to be changed
- _reuse code_: to avoid writing the same code over and over again
- _manage dependencies_: to easily change dependencies without rewriting our code

## Module patterns in ES5

EcmaScript 5 and earlier editions were not designed with modules in mind. Over time, developers came up with different patterns to simulate modular design in JavaScript.

To give you an idea of what some of these patterns look like, let’s quickly look at 2 easy ones: *Immediately Invoked Function Expressions* and *Revealing Module*.

### Immediately Invoked Function Expression (IIFE)

    (function () {
      // ...
    })();

An Immediately Invoked Function Expression (IIFE) is an anonymous function that is invoked when it is declared.

Notice how the function is surrounded by parentheses. In JavaScript, a line starting with the word `function` is considered as a function declaration:

    // Function declaration
    function(){
      console.log('test');
    }

Immediately invoking a function declaration throws an error:

    // Immediately Invoked Function Declaration
    function(){
      console.log('test');
    }()

    // => Uncaught SyntaxError: Unexpected token )

Putting parentheses around the function makes it a function expression:

    // Function expression
    (function () {
      console.log("test");
    });

    // => returns function(){ console.log('test') }

The function expression returns the function, so we can immediately call it:

    // Immediately Invoked Function Expression
    (function () {
      console.log("test");
    })();

    // => writes 'test' to the console and returns undefined

Immediately Invoked Function Expressions allow us to:

- encapsulate code complexity inside IIFE so we don’t have to understand what the IIFE code does
- define variables inside the IIFE so they don’t pollute the global scope (`var` statements inside the IIFE remain within the IIFE’s closure)

but they don’t provide a mechanism for dependency management.

### Revealing Module pattern

The Revealing Module pattern is similar to an IIFE, but we assign the return value to a variable:

    // Expose module as global variable
    var singleton = (function () {
      // Inner logic
      function sayHello() {
        console.log("Hello");
      }

      // Expose API
      return {
        sayHello: sayHello,
      };
    })();

Notice that we don’t need the surrounding parentheses here because the word `function` is not at the beginning of the line.

We can now access the module’s API through the variable:

    // Access module functionality
    singleton.sayHello();
    // => Hello

Instead of a singleton, a module can also expose a constructor function:

    // Expose module as global variable
    var Module = function () {
      // Inner logic
      function sayHello() {
        console.log("Hello");
      }

      // Expose API
      return {
        sayHello: sayHello,
      };
    };

Notice how we don’t execute the function at declaration time.

Instead, we instantiate a module using the `Module` constructor function:

    var module = new Module();

to access its public API:

    module.sayHello();
    // => Hello

> This Module pattern offers similar benefits as an IIFE, but again does not offer a mechanism for dependency management.

As JavaScript evolved, many more different syntaxes were invented for defining modules, each with their own benefits and downsides.

We call them module formats.

## Module formats

A module format is the syntax we can use to define a module.

Before EcmaScript 6 or ES2015, JavaScript did not have an official syntax to define modules. Therefore, smart developers came up with various formats to define modules in JavaScript.

Some of the most widely adapted and well known formats are:

- CommonJS
- ES6 module format

### CommonJS format

The [CommonJS](http://www.commonjs.org/) format is used in Node.js and uses `require` and `module.exports` to define dependencies and modules:

    var dep1 = require("./dep1");
    var dep2 = require("./dep2");

    module.exports = function () {
      // ...
    };

### ES6 module format

As of ES6, JavaScript also supports a native module format.

It uses an `export` token to export a module’s public API:

    // lib.js

    // Export the function
    export function sayHello() {
      console.log("Hello");
    }

    // Do not export the function
    function somePrivateFunction() {
      // ...
    }

and an `import` token to import parts that a module exports:

    import { sayHello } from "./lib";

    sayHello();
    // => Hello

We can even give imports an alias using `as`:

    import { sayHello as say } from "./lib";

    say();
    // => Hello

or load an entire module at once:

    import * as lib from "./lib";

    lib.sayHello();
    // => Hello

The format also supports default exports:

    // lib.js

    // Export default function
    export default function sayHello() {
      console.log("Hello");
    }

    // Export non-default function
    export function sayGoodbye() {
      console.log("Goodbye");
    }

which you can import like this:

    import sayHello, { sayGoodbye } from "./lib";

    sayHello();
    // => Hello

    sayGoodbye();
    // => Goodbye

You can export not only functions, but anything you like:

    // lib.js

    // Export default function
    export default function sayHello() {
      console.log("Hello");
    }

    // Export non-default function
    export function sayGoodbye() {
      console.log("Goodbye");
    }

    // Export simple value
    export const apiUrl = "...";

    // Export object
    export const settings = {
      debug: true,
    };

Unfortunately, the native module format is not yet supported by all browsers.

We can already use the ES6 module format today, but we need a transpiler like Babel to transpile our code to an ES5 module format such as AMD or CommonJS before we can actually run our code in the browser.

## Module loaders

A module loader interprets and loads a module written in a certain module format.

A module loader runs at runtime:

- you load the module loader in the browser
- you tell the module loader which main app file to load
- the module loader downloads and interprets the main app file
- the module loader downloads files as needed

If you open the network tab in your browser’s developer console, you will see that many files are loaded on demand by the module loader.

A few examples of popular module loaders are:

- _[RequireJS](http://requirejs.org/)_: loader for modules in AMD format
- _[SystemJS](https://github.com/systemjs/systemjs)_: loader for modules in AMD, CommonJS, UMD or System.register format

## Module bundlers

A module bundler replaces a module loader.

But, in contrast to a module loader, a module bundler runs at build time:

- you run the module bundler to generate a bundle file at build time (e.g. bundle.js)
- you load the bundle in the browser

If you open the network tab in your browser’s developer console, you will see that only 1 file is loaded. No module loader is needed in the browser. All code is included in the bundle.

Examples of popular module bundlers are:

- _[Browserify](http://browserify.org/)_: bundler for CommonJS modules
- _[Webpack](https://webpack.github.io/)_: bundler for AMD, CommonJS, ES6 modules

## Summary

To better understand tooling in modern JavaScript development environments, it is important to understand the differences between modules, module formats, module loaders and module bundlers.

A *module* is a reusable piece of code that encapsulates implementation details and exposes a public API so it can be easily loaded and used by other code.

A *module format* is the syntax we use to define a module. Different module formats such [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), [CommonJS](http://www.commonjs.org/), [UMD](https://github.com/umdjs/umd) and [System.register](https://github.com/ModuleLoader/es-module-loader/blob/master/docs/system-register.md) have emerged in the past and a native module format is now available since ES6.

A *module loader* interprets and loads a module written in a certain module format at runtime. Popular examples are [RequireJS](http://requirejs.org/) and [SystemJS](https://github.com/systemjs/systemjs).

A *module bundler* replaces a module loader and generates a bundle of all code at build time. Popular examples are [Browserify](http://browserify.org/) and [Webpack](https://webpack.github.io/).
