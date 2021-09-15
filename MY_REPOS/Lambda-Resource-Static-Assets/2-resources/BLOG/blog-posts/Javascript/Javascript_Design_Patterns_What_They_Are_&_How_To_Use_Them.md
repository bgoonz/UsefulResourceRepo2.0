# Javascript Design Patterns: What They Are & How To Use Them

> Want to write cleaner, more organized JavaScript? Learn about commonly used design patterns in JavaScript and see practical examples of JS design patterns in use.

Developers often encounter coding problems in JavaScript that can be solved by using [well-established design patterns](https://en.wikipedia.org/wiki/Software_design_pattern). Because JavaScript is not a traditional [Object Oriented programming language](https://en.wikipedia.org/wiki/Object-oriented_programming), design patterns are harder to discern, but not impossible to accomplish.

Design patterns are not code snippets that can be used directly in your code (like a [data structure](https://en.wikipedia.org/wiki/Data_structure)). Rather, they’re a recipe for how to solve a problem in software engineering. Design patterns are structured best practices that the programmer can use to solve common problems when developing (or designing) an application or system.

It is important for developers to be able to recognize and apply these patterns correctly to avoid reinventing the wheel. I will detail some commonly used design patterns in JavaScript to show it is possible to use design patterns in the JavaScript world.

Creational Patterns
-------------------

### Prototype

This is a design pattern used specifically to clone attributes of an object into new objects, hence the word _[prototype](https://www.merriam-webster.com/dictionary/prototype)_. JavaScript does this by creating new objects, so setting up your own prototype is an important design pattern to know, especially in JavaScript.

Example:

    function Hello (greeting) {
      this.greeting = greeting || 'Hello World!'; 
    }
    
    Hello.prototype.speak = function(somethingElse) { 
      var message = somethingElse || this.greeting;
      console.log(message); 
    }
    
    var hi = new Hello('Just saying hi!');
    
    hi.speak();
    hi.speak('Something different');
    
    var hello = new Hello();
    hello.speak();
    hello.speak('Yep');
    

[See the example on gist.github.com](https://gist.github.com/patricksimpson/178f977fcefa0dc4c5fc1061e76d554e#file-prototype-js)

Why use a prototype? In JavaScript, if you want a class, this is how it gets done. [ES6 has introduced classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), but it’s important to know this is syntactic sugar over the existing [prototype pattern](http://www.dofactory.com/javascript/prototype-design-pattern).

### Module

The module pattern is probably the most commonly used pattern after prototype. Modules should be [Immediately-Invoked-Function-Expressions](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (IIFE). All of the module code exists within a [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). Import variables by passing in values through the function execution. Export variables (expose variables) by returning an object.

Why use a module? A module should be used in any system beyond a single function JavaScript. It’s helpful not to pollute the global namespace and keep your functions importable and exportable.

Example:

    var options = {
      username: 'blah',
      server: '127.0.0.1'
    };
    var ConfigObject = (function(params) {
      var username = params.username || '',
          server = params.server || '',
          password = params.password || '';
          function _checkPassword() {
            if (this.password === '') {
              console.log('no password!');
              return false;
            }
            return true;
          }
          function _checkUsername() {
            if (this.username === '') {
              console.log('no username!');
              return false;
            }
            return true;
          }
          function login() {
            if (_checkPassword() && _checkUsername()) {
              
            }
          }
      return {
        login: login
      }
    })(options);
    

[See the example on gist.github.com](https://gist.github.com/patricksimpson/178f977fcefa0dc4c5fc1061e76d554e#file-module-js)

### Singleton

The creation of the singleton object, should be self-invoked, meaning it will execute and store the instance at the time of definition.

When to use a singleton? The singleton pattern is used when you only ever want exactly ONE instance of an object. The singleton interface will return that instance any time it’s requested.

Example:

    var GlobalConfigurationObject = (function() {
      var instance; 
      function createInstance() {
        return new ConfigObject();
      };
    
      var getInstance = function() {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      }
    
      return {
        getInstance: getInstance
      }
    })();
    

[See example on gist.github.com](https://gist.github.com/patricksimpson/178f977fcefa0dc4c5fc1061e76d554e#file-singleton-js)

Behavioral Patterns
-------------------

### Observer

If you are writing JavaScript to do anything fancy, you are probably already using the observer pattern. When you create an event handler, such that functions are executed when the event has been fired, that’s the observer pattern. An observer pattern, is a subscription model, where you assign your object to listen to events.

When to use it? This helps prevent tightly coupled code.

Example: [http://www.dofactory.com/javascript/observer-design-pattern](http://www.dofactory.com/javascript/observer-design-pattern)

Structural Patterns
-------------------

### Adapter

The adapter pattern is an abstraction or intermediate from one interface to another. Typically this is adapting the API response object, raw API data (JSON, XML, etc.) into usable JavaScript objects.

When to use it? In JavaScript it’s helpful to have a clear data model in place before writing an adapter.

Example: [http://www.dofactory.com/javascript/adapter-design-pattern](http://www.dofactory.com/javascript/adapter-design-pattern)

Cleaner, Clearer Code
---------------------

Developers can apply design pattern thinking to write cleaner, more organized JavaScript. The growing use and popularity of frameworks that use design patterns—[Ember](https://emberjs.com/), [React](https://facebook.github.io/react/), [KnockoutJS](http://knockoutjs.com/)—make it a necessity be able to identify and utilize software design patterns more than ever. I encourage developers to use as many design patterns in JavaScript as possible. This [comprehensive list](http://www.dofactory.com/javascript/design-patterns) of exceptionally well thought out design patterns examples in JavaScript is a great resource to continue the path of discovery.


[Source](https://sparkbox.com/foundry/javascript_design_patterns)