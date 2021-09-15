# Stop Using console.log() In JavaScript

> There are better options

There are better options
------------------------

[![Harsha Vardhan](https://miro.medium.com/fit/c/96/96/0*EbGjNYkEnp9C0zFg.jpg)](https://harshaktg.medium.com/?source=post_page-----d29d6c24dc26--------------------------------)

![Image for post](https://miro.medium.com/max/60/0*t6SE511h7v_N1ask?q=20)

![Image for post](https://miro.medium.com/max/8064/0*t6SE511h7v_N1ask)

Photo by [Hugo Rocha](https://unsplash.com/@hugorrocha?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

Are you a JavaScript developer who uses `console.log()` often to debug your code? There is nothing wrong in it. But if you are unaware, there are so many other methods of `console` object which are quite amazing. In this article, I would like to explain the effective usage of these methods.

The `console` object in JavaScript provides access to the browser debugging console, where you can print values of the variables which you've used in your code. Oftentimes, this can be used to debug if the right value is being passed in your code.

I'm pretty sure most of us developers have used `console.log()` to print values in our browser console. `log` is just one method of the `console` object. There are several other methods that are very useful.

This method is mainly used to print the value passed to it to the console. Any type can be used inside the log(), be it a string, array, object, boolean etc.

**Example**
-----------

console.log('JavaScript');  
console.log(7);  
console.log(true);  
console.log(null);  
console.log(undefined);  
console.log(\[1, 2, 3\]);  
console.log({a: 1, b: 2, c: 3});

![Image for post](https://miro.medium.com/max/60/1*L0vaz4jpLViLIJ-oXr2o6Q.png?q=20)

![Image for post](https://miro.medium.com/max/702/1*L0vaz4jpLViLIJ-oXr2o6Q.png)

Output

This method is useful while testing code. It is used to log errors to the browser console. By default, the error message will be highlighted with red color.

Example
-------

console.error('Error found');

![Image for post](https://miro.medium.com/max/60/1*bLNgJWF1wGx1NRd53mTYPw.png?q=20)

![Image for post](https://miro.medium.com/max/692/1*bLNgJWF1wGx1NRd53mTYPw.png)

Output

This method is also used to test code. Usually, it helps in throwing warnings to the console. By default, the warning message will be highlighted with yellow color.

Example
-------

console.warn('Warning!');

![Image for post](https://miro.medium.com/max/60/1*z61it_h7bxHF84T_DCATcA.png?q=20)

![Image for post](https://miro.medium.com/max/698/1*z61it_h7bxHF84T_DCATcA.png)

Output

This method is used to clear the console. It is often used if the console is clogged with messages/errors. The console will be cleared and a message _Console was cleared_ will be printed in the console.

Example
-------

console.clear()

![Image for post](https://miro.medium.com/max/60/1*xsLNlkO-m9L0KP3TF81MSQ.png?q=20)

![Image for post](https://miro.medium.com/max/696/1*xsLNlkO-m9L0KP3TF81MSQ.png)

Output

Both these methods are used in conjunction with each other. Whenever we want to know the amount of time spent by a block or a function, we can make use of the `time()` and `timeEnd()` methods. Both these functions take a string as a parameter. Make sure you use the same string for both these functions to measure the time.

Example
-------

console.time('timer'); const hello =  function(){  
  console.log('Hello Console!');  
}const bye = function(){  
  console.log('Bye Console!');  
}hello(); // calling hello();  
bye(); // calling bye();console.timeEnd('timer');

![Image for post](https://miro.medium.com/max/60/1*S63BR8aOlGfYfAhgaR9TJw.png?q=20)

![Image for post](https://miro.medium.com/max/692/1*S63BR8aOlGfYfAhgaR9TJw.png)

Output

This method generates a table inside a console, for better readability. A table will be automatically generated for an array or an object.

Example
-------

console.table({a: 1, b: 2, c: 3}); 

![Image for post](https://miro.medium.com/max/60/1*emG1EeptLSHsLbR2ulPfKg.png?q=20)

![Image for post](https://miro.medium.com/max/940/1*emG1EeptLSHsLbR2ulPfKg.png)

Output

This method is used to count the number that the function hit by this counting method. This can be used inside a loop to check how many times a particular value has been executed.

Example
-------

for(let i=0; i<3; i++){  
  console.count(i);  
}

![Image for post](https://miro.medium.com/max/60/1*hfucVhBEtQBFjgzTv3QoFg.png?q=20)

![Image for post](https://miro.medium.com/max/692/1*hfucVhBEtQBFjgzTv3QoFg.png)

Output

These methods `group()` and `groupEnd()` allows us to group contents in a separate block, which will be indented. Just like the `time()` and the `timeEnd()` they also accept a label, of the same value. You can expand and collapse the group.

Example
-------

console.group('group1');   
  console.warn('warning');   
  console.error('error');   
  console.log('I belong to a group');   
console.groupEnd('group1');   
console.log('I dont belong to any group');

![Image for post](https://miro.medium.com/max/60/1*Q_Ok_EnFSioEiNES7vpq3A.png?q=20)

![Image for post](https://miro.medium.com/max/698/1*Q_Ok_EnFSioEiNES7vpq3A.png)

Output

You can also add Styling to the console logs in order to make logs look fancy. It is very simple. You just need to add CSS styling as a second parameter to the `log()` function, while starting the first parameter with **%c**. The styles will replace the %c in the logs.

Example
-------

const spacing = '10px';   
const styles =  \`padding: ${spacing}; background-color: white; color: red; font-style: italic; border: 1px solid black; font-size: 2em;\`;   
console.log('%cI am a styled log', styles);

![Image for post](https://miro.medium.com/max/60/1*GgIhLJQK-_yV2FdLvV-u6A.png?q=20)

![Image for post](https://miro.medium.com/max/690/1*GgIhLJQK-_yV2FdLvV-u6A.png)

Output

The `console` object is very much useful for the developers to debug the code. We as developers often use only the `log` function. Let's start using the console object to its fullest potential so that it's easier to debug and to view the browser logs vividly. I hope this article was helpful.

Thank you for reading!


[Source](https://medium.com/javascript-in-plain-english/stop-using-console-log-in-javascript-d29d6c24dc26)
