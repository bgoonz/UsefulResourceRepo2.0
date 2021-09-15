# Arfat Salman – Medium

> Read writing from Arfat Salman on Medium. Software Engineer. Works at pesto.tech. Every day, Arfat Salman and thousands of other voices read, write, and share important stories on Medium.

[

![Image for post](https://miro.medium.com/max/60/1*3kAwfTZXxNynBOB5O6VQtg.jpeg?q=20)

![Image for post](https://miro.medium.com/max/2000/1*3kAwfTZXxNynBOB5O6VQtg.jpeg)







](https://blog.bitsrc.io/understanding-javascript-async-and-await-with-examples-a010b03926ea)

In the beginning, there were callbacks. **A callback is nothing special but a function that is executed at some later time.** Due to JavScript’s asynchronous nature, a callback is required in many places, where the results are not available immediately.

Here’s an example of reading a file in Node.js (asynchronously) —

fs.readFile(\_\_filename, 'utf-8', **(err, data) => {  
  if (err) {  
    throw err;  
  }  
  console.log(data);  
}**);

Problems arise when we want to do multiple async operations. Imagine this hypothetical scenario (where all operations are async) —

*   We query our database for the user `Arfat`. …

* * *

[

![Image for post](https://miro.medium.com/max/60/1*vZGZsLvPF4dPZtp1xu7CNg.jpeg?q=20)

![Image for post](https://miro.medium.com/max/2000/1*vZGZsLvPF4dPZtp1xu7CNg.jpeg)







](https://blog.bitsrc.io/diving-deeper-in-javascripts-objects-318b1e13dc12)

A Closer Look at JavaScript Object Descriptors
----------------------------------------------

JavaScript objects pack more things than their terse and concise syntax would naturally exhibit. **Creating and using objects in JavaScript is so easy, effortless, and so flexible that a lot of developers never realize that there is more to it.**

* * *

[

![Image for post](https://miro.medium.com/max/60/1*-H2i1vBcjmvHnUWv8D583A.jpeg?q=20)

![Image for post](https://miro.medium.com/max/2000/1*-H2i1vBcjmvHnUWv8D583A.jpeg)







](https://blog.bitsrc.io/the-chronicles-of-javascript-objects-2d6b9205cd66)

Objects are the foundation of JavaScript and permeate its every aspect. **_Almost_** everything in JavaScript is an object. In fact, only **six** things are **not** objects. They are — `**_null_**`,`**_undefined_**`, **_strings_**, **_numbers_**, **_boolean_**, and **_symbols_**. These are called primitive values or primitive types.

Anything that is not a primitive value is an **Object**. That includes **arrays**, **functions**, constructors, and objects themselves. Yes! Functions and arrays are objects too as we shall see later in the article.

* * *

A tale of two functions… with examples.
---------------------------------------

[

![Image for post](https://miro.medium.com/max/2000/1*nP3F4PpwWwkqEnEGy3Lnwg.jpeg)





](https://blog.bitsrc.io/a-practical-guide-to-es6-arrow-functions-c16975100cf5)

ECMAScript, in ES6, introduced a new way of making functions. They are popularly known as Arrow Functions (also known as Fat Arrow Functions) inspired by [CoffeeScript’s Arrow](https://coffeescript.org/#fat-arrow) functions.

In this article, we are going to see the motivation for such a decision, and also compare and contrast some differences between normal, traditional functions and arrow functions.

The primary goal of Arrow Functions is to address and resolve several common pain points of traditional `Function Expression`.

*   Shorter syntactical form (`() => {}` vs. `function () {}`)
*   **Lexical** `this` binding

In JavaScript, functions are the workhorse of the language. They are used…

* * *

[

![Image for post](https://miro.medium.com/max/2000/1*nEHGVTF6h49u2-LR6cfCAw.jpeg)





](https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5)

ES6 introduced a new way of working with functions and iterators in the form of **Generators (or generator functions)**. A generator is a function that **can stop midway** and then continue _from where it stopped._ **In short, a generator _appears_ to be a function but it _behaves_ like an iterator.**

**Fun Fact**: `async/await` **can be** based on generators. Read more [here](https://tc39.github.io/ecmascript-asyncawait/).

Generators are intricately linked with iterators. If you don’t know about iterators, [here](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e) is an article to better your understanding of them.

Here’s a simple analogy to have an intuition for generators before we proceed with the technical details.

…

* * *

[

![Image for post](https://miro.medium.com/max/3840/1*CeZlbYvpCxYJ9prikN7UBQ.jpeg)





](https://codeburst.io/understanding-javascript-proxies-by-examining-on-change-library-f252eddf76c2)

Photo by [Pankaj Patel](https://unsplash.com/photos/Fi-GJaLRGKc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/javascript?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Javascript Proxies are a new addition in ES6. It’s a powerful feature that can be used for solving various problems elegantly. We are going to examine and re-create a small utility library by

called [on-change](https://github.com/sindresorhus/on-change). The aim is to conceptually understand JavaScript Proxies, and in the process, build something so that the concepts are reinforced.

I have tried to keep things as simple as possible.However, a little familiarity with JavaScript language is expected.

So what does on-change do? It’s a small utility that watches an object or array for changes. …

* * *

[

![Image for post](https://miro.medium.com/max/4800/1*NaL3SxOBXbrwXrAciJyM3Q.jpeg)





](https://codeburst.io/top-javascript-vscode-extensions-for-faster-development-c687c39596f5)

Photo by [John Carlisle](https://unsplash.com/photos/l090uFWoPaI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/tools-?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

[VSCode](https://code.visualstudio.com/) is an open-source, cross-platform editor that has become a favourite of programmers, particularly in the Web Development community. It’s fast, extensible, customisable, and has tons of features. You should check it out if you haven’t already done it.

Thousands of extensions have been made for VSCode. I am going to list a few extensions that I use on a day-to-day basis. **Let’s begin**!

[Quokka.js](https://quokkajs.com/) is a rapid prototyping playground for JavaScript and TypeScript. What that **means is that it runs your code immediately as you type** and displays various execution results in your code editor. Try it yourself.

After…[](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)

* * *

[

![Image for post](https://miro.medium.com/max/4800/1*00F8QCjUhHAXqhnorGZSOg.jpeg)





](https://codeburst.io/how-to-not-react-common-anti-patterns-and-gotchas-in-react-40141fe0dcd)

We go so that we can tell others about it! Photo by [NeONBRAND](https://unsplash.com/photos/-Cmz06-0btw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/caution?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

What is an anti-pattern? Anti-patterns are certain patterns in software development that are considered bad programming practices. The same pattern may have been considered correct at one point in the past, but now developers have realised that they cause more pain and hard-to-track bugs in long term.

React has matured as an UI library and with that a lot of best development practices have evolved over the years. We are going to learn from the collective wisdom of thousands of programmers and developers who learnt those things the hard way.

* * *

[

![Image for post](https://miro.medium.com/max/4800/1*mOfFxGkE0FP-eQ30xoYxlQ.jpeg)





](https://codeburst.io/top-react-and-redux-packages-for-faster-development-5fa0ace42fe7)

Photo by [Fleur Treurniet](https://unsplash.com/photos/dQf7RZhMOJU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/tools?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

React has grown in popularity over the last few years. With that, a lot of tools have emerged that make developer’s life easy and development fun. They are going to help us in achieving the extra productivity that we want. After all, we always want our development tools to

* * *

[

![Image for post](https://miro.medium.com/max/4096/1*M8OiLAXoENK7Yi1-2yeQig.png)





](https://codeburst.io/why-should-you-care-about-progressive-web-apps-pwas-3c3f73cb8c92)

The unofficially official logo by [the community.](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/samsung-internet-dev/we-now-have-a-community-approved-progressive-web-apps-logo-823f212f57c9)

This article summarises the things that I have learnt in Udacity’s **Mobile Web Specialist** Course. It is offered by Udacity in collaboration with Google. It’s an awesome course. You should definitely check out Udacity ([here](https://goo.gl/nvzoPG)).

The world has become a global village. The average internet speed has gone up significantly. The average number of internet users in the world have steadily risen, and the number of cat videos have increased in proportion. The world is becoming increasingly reliant on the internet. The web has grown to a point where it has 5 billion devices connected to it. **…**


[Source](https://medium.com/@arfatsalman)