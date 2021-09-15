# Closure In JavaScript

And why you’ve been stressed about it for no reason.

---

### Closure In JavaScript

And why you’ve been stressed about it for no reason.

### What is a closure? Can you give a useful example of one?

#### Answer

A closure is a function defined inside another function and has access to its lexical scope even when it is executing outside its lexical scope. The closure has access to variables in three scopes:

- <span id="5a64">Variables declared in its own scope</span>
- <span id="f46e">Variables declared in the scope of the parent function</span>
- <span id="97c3">Variables declared in the global scope</span>

In JavaScript, all functions are closures because they have access to the outer scope, but most functions don’t utilise the usefulness of closures: the persistence of state. Closures are also sometimes called stateful functions because of this.

In addition, closures are the only way to store private data that can’t be accessed from the outside in JavaScript. They are the key to the UMD (Universal Module Definition) pattern, which is frequently used in libraries that only expose a public API but keep the implementation details private, preventing name collisions with other libraries or the user’s own code.

#### Good to hear

- <span id="d813">Closures are useful because they let you associate data with a function that operates on that data.</span>
- <span id="ce0c">A closure can substitute an object with only a single method.</span>
- <span id="19d5">Closures can be used to emulate private properties and methods.</span>

Additional links

- <span id="5977"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" class="markup--anchor markup--li-anchor">MDN docs for closures</a></span>
- <span id="f18b"><a href="https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36" class="markup--anchor markup--li-anchor">What is a closure</a></span>
- <span id="62c7"><a href="https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8" class="markup--anchor markup--li-anchor">I never understood JavaScript closures</a></span>

A closure is the combination of a function bundled together (enclosed) with **references to its surrounding state (the lexical environment)**. In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

**A closure is a function** that retains access to variables of the context it was created in even after said function call has returned.

    function init() {
      var name = "Mozilla" // name is a local variable created by init
      function displayName() {
        // displayName() is the inner function, a closure
        alert(name) // use variable declared in the parent function
      }
      displayName()
    }
    init()

init() creates a local variable called name and a function called displayName(). The displayName() function is an inner function that is defined inside init() and is available only within the body of the init() function. Note that the displayName() function has no local variables of its own. However, since inner functions have access to the variables of outer functions, displayName() can access the variable name declared in the parent function, init().

This is an example of lexical scoping, which describes how a parser resolves variable names when functions are nested. The word lexical refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Nested functions have access to variables declared in their outer scope.

    var awFunc = function(first) {
      var someFunc = function(second) {
        return first + second
      }
      return someFunc // note that I did not invoke this function i.e. I did not use someFunc(), but I did returned the function itself
    }

    var someMoreFunc = awFunc("awe") // At this point awFunc has finished running

    console.log(someMoreFunc()) // This will return 'aweundefined'

    console.log(someMoreFunc("some")) // returns awesome

### Using Closures (Examples)

Among other things, closures are commonly used to give objects data privacy. Data privacy is an essential property that helps us program to an interface, not an implementation. This is an important concept that helps us build more robust software because implementation details are more likely to change in breaking ways than interface contracts.

To use a closure, simply define a function inside another function and expose it. To expose a function, return it or pass it to another function.

#### In JavaScript, closures are the primary mechanism used to enable data privacy. When you use closures for data privacy, the enclosed variables are only in scope within the containing (outer) function. You can’t get at the data from an outside scope except through the object’s privileged methods. In JavaScript, any exposed method defined within the closure scope is privileged. For example:

    const getSecret = secret => {
      return {
        getPrivileged: () => secret,
      }
    }

In the example above, the `getPrivileged()` method is defined inside the scope of `getSecret()`, which gives it access to any variables from `getSecret()`, and makes it a privileged method. In this case, the parameter, `secret`.

### Another example of closure

    const outerFunc = () => {
      let name = "Rohan"

      const closureFunc = () => {
        console.log(name)
      }
      return closureFunc()
    }

    var name = "Paul"

    outerFunc() // => Will Print 'Rohan'

### So what's going on above

First, when a function runs, a new function Lexical Environment is created automatically. That’s a general rule for all functions. That Lexical Environment is used to store local variables and parameters of the call.

During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

The inner Lexical Environment corresponds to the current execution of that function.

When code wants to access a variable — it is first searched for in the inner Lexical Environment, then in the outer one, then the more outer one and so on until the end of the chain.

If a variable is not found anywhere, that’s an error in strict mode. Without use strict, an assignment to an undefined variable creates a new global variable, for backwards compatibility.

### Some overall key points

### Closure

- <span id="41d3">A closure is a function that remembers its outer variables and can access them.</span>
- <span id="5536">Combination of a function and the lexical environment within which that function was declared</span>
- <span id="2ba2">The `closure` is the function object itself.</span>
- <span id="4f31">Accessing variables outside of the immediate lexical scope creates a closure.</span>
- <span id="7958">Happens when we have a nested functions.</span>
- <span id="6fe2">JavaScript engines also may optimize, discard variables that are unused to save memory.</span>
- <span id="071c">A `Lexical Environment` object lives in the `heap` as long as there is a function which may use it. And when there are none, it is cleared.</span>
- <span id="e081">All functions in JavaScript are closures.</span>
- <span id="a0ab">The internal property `[[Environment]]` of a function, refers to the outer lexical environment</span>

### Question: Look at the code below, you have a for loop if you have setTimeout inside it. If log the loop counter inside setTimeout, what will be logged?

    for (let i = 0; i < 10; i++) {
      setTimeout(function () {
        console.log(i)
      }, 10)
    }

**Answer**: The above will not output the numbers 0 through 9, but will simply print the number 10 ten times.

**Explanation**: The console log is inside the anonymous function of setTimeout and setTimeout is executed when current call stack is over. So, the loop finishes and before setTimeout get the chance to execute. However, anonymous functions keep a reference to i by creating a closure. Since, the loop is already finished, the value i has been set to 10. When setTimeout use the value of i by reference, it gets the value of i as 10. Hence, you see 10 ten times.

**Solution**: You can fix it by avoiding closure. Just create a IIFE (Immediately Invoked Function Expression), it will create its own scope and you can pass i to the function. In that case i will be a local variable (will not refer to i in the closure) and value of the i in every loop will be preserved.

    for (let i = 0; i < 10; i++) {
      setTimeout(
        (function (i) {
          console.log(i)
        })(i),
        10
      )
    }

**Alternative Solution**: Look at the code below and use your brain (if any).

    for (let i = 0; i < 10; i++) {
      setTimeout(console.log.bind(console, i), 10)
    }

Lets look at this function

    function outer() {
      var b = 10
      function inner() {
        var a = 20
        console.log(a + b)
      }
      return inner
    }/*
    Here we have two functions:

    an outer function outer which has a variable b, and returns the inner function
    an inner function inner which has its variable called a, and accesses an outer variable b, within its function body
    The scope of variable b is limited to the outer function, and the scope of variable a is limited to the inner function.

    Let us now invoke the outer() function, and store the result of the outer() function in a variable X
     */

    var X = outer()

Since the variables X is functions, we can **execute** them. In JavaScript, a function can be executed by adding **()** after the function name, such as **X()**.

When we execute X(), we are essentially executing the `inner` function.

If I run &lt; console.log(X()) &gt; the output will be below

30  
undefined

So the closure function **inner**() is getting the value of **b = 10** from its enclosing **outer()** function ever after **outer()** function has returned.

#### Let’s see step-by-step what happens when the outer() function is first invoked:

- <span id="d0f8">1. Variable b is created, its scope is limited to the outer() function, and its value is set to 10.</span>
- <span id="0887">2. The next line is a function declaration, so nothing to execute.</span>
- <span id="9d15">3. On the last line, return inner looks for a variable called inner, finds that this variable inner is actually a function, and so returns the entire body of the function inner.</span>
- <span id="1344">4. Note that the return statement does not execute the inner function — a function is executed only when followed by () — , but rather the return statement returns the entire body of the function.</span>
- <span id="4e55">5. The contents returned by the return statement are stored in X.</span>

Thus, X will store the following:

    function inner() {
    var a=20;
    console.log(a+b);
    }

This can be easily verified by adding the following to the JavaScript code:

    console.log(typeof X) //X is of type function

- <span id="fc52">6. Function outer() finishes execution, and all variables within the scope of outer() now no longer exist.</span>
- <span id="f9cd">7. This last part is important to understand. Once a function completes its execution, any variables that were defined inside the function scope cease to exist.</span>

> The lifespan of a variable defined inside of a function is the lifespan of the function execution.

What this means is that in **console.log(a+b)**, the variable **b** exists only during the execution of the the **outer()** function. Once the outer function has finished execution, the variable b no longer exists.

This is the most important point to realize. The variables inside the functions only come into existence when the function is running, and cease to exist once the functions completes execution.

Now see the main point of this exercise — that how a closure function retains its enclosing function’s variable values, even after the enclosing function has returned.

- <span id="2c6b">A. When we execute X(), we are essentially executing the `inner` function.</span>
- <span id="2f2e">B. If I run &lt; console.log(X()) &gt; the output will be below</span>

<!-- -->

    30
    undefined

- <span id="1b5c">C. So the closure function **inner**() is getting the value of **b = 10** from its enclosing **outer()** function ever after **outer()** function has returned.</span>

#### Let us examine step-by-step what happens when X() is executed the first time:

- <span id="881a">1. Variable a is created, and its value is set to 20.</span>
- <span id="8b24">2. JavaScript now tries to execute a + b. Here is where things get interesting. JavaScript knows that a exists since it just created it. However, variable b no longer exists. Since b is part of the outer function, b would only exist while the outer() function is in execution. Since the outer() function finished execution long before we invoked X(), any variables within the scope of the outer function cease to exist, and hence variable b no longer exists.</span>

#### Closures

- <span id="bc72">A. The inner function can access the variables of the enclosing function due to closures in JavaScript. In other words, the inner function preserves the scope chain of the enclosing function at the time the enclosing function was executed, and thus can access the enclosing function’s variables.</span>
- <span id="d87c">B. In our example, the inner function had preserved the value of b=10 when the outer() function was executed, and continued to preserve (closure) it.</span>
- <span id="1f8f">C. It now refers to its scope chain and notices that it does have the value of variable b within its scope chain, since it had enclosed the value of b within a closure at the point when the outer function had executed.</span>
- <span id="cbcc">D. Thus, JavaScript knows a=20 and b=10, and can calculate a+b.</span>

So the inner function has three scope chains:

access to its own scope — variable a  
access to the outer function’s variables — variable b, which it enclosed  
access to any global variables that may be defined

### Examples:

    /*A closure is an inner function that has access to the outer (enclosing) function's variables
    The closure has three scopes, all part of the same chain: it has access to its own scope (variables defined between its curly brackets), it has access to the outer function's variables, and it has access to the global variables
    The inner function has access not only to the outer function's variables, but also to the outer function's parameters
    */
    sayHelloTo = name => {
      let text = 'Hello ' + name; // this is the local variable withing this function's block scope

      let say = () => console.log(text);
      return say
    }

    let say2 = sayHelloTo('Paul');

    // say2();   // => Hello Paul

    /*
    The above code has a closure because the anonymous function function() { console.log(text); } is declared inside another function, sayHello2() in this example. In JavaScript, if you use the function keyword inside another function, you are creating a closure.

    Here, say2 has reference to a function.  In JavaScript, you can think of a function reference variable as having both a pointer to a function as well as a hidden pointer to a closure.

    If I declare a function within another function, then the local variables can remain accessible after returning from the function I called

    In above, I call the function say2() after we have returned from sayHello2(). The code that we call is still able to reference the variable 'text', which was a local variable of the function sayHello2()

    */

    showFullName = (first, last) => {

      let introText = "Your name is ";

      constructFullName = () => introText + first + " " + last

      return constructFullName();
    }

    console.log(showFullName("Rohan", "Paul")); // => Your name is Rohan Paul

    //--------------------------------------------------------------

    // implement function add in such a way that:
    // add() => 0
    // add(1)(2)() => 3
    // add(n0)(n1)...(nk)() => n0+n1+...+nk

    function add(val){
        var total = 0;
        var result;
        var step = val => {
            if(val === undefined){
                result = total;
                total = 0;
                return result;
            } else {
                total += val;
            }

            return step;
        }

        result = step(val);

        return result;
    }

---

    // In the following examples we will predict what will
    // be printed to the terminal

    // 1

    function dinerBreakfast(food) {
        let order = "I'd like cheesy scrambled eggs and ";

        function finishOrder() {
            return order + food;
        }

        return finishOrder();
    }

    // console.log(dinerBreakfast('green tea'));

    // 2

    function dinerBreakfast2(food) {
        let order = "I'd like a(n) " + food;

        function withEggs() {
            order = order + ' and cheesy scrambled eggs, please!'
        };

        withEggs();
        return order;
    }

    // console.log(dinerBreakfast2('avocado toast'));

    // 3

    function dinerBreakfast3() {
        let order = "I'd like cheesy scrambled eggs";

        return food => {
            order = order + " and " + food;
            return order;
        };
    }

    let breakfastOrder = dinerBreakfast3();

    console.log(breakfastOrder);
    console.log(breakfastOrder('cappuccino'));
    console.log(breakfastOrder('pancakes'));

---

    /* Problem statement - we would like to display numbers 1 to 5 at once sequentially. But we want to delay the output and have each number display 1 second apart from each other consecutively.

    The below solution may come to mind first. But whats the output of the below code, whats wrong with it and fix it */

    // for (var i = 1; i <= 5; i++) {
    //     setTimeout(function() {
    //         console.log(i);
    //     }, 1000 * i);
    // }

    /* A) The problem with the above code is, numbers are each outputting to console 1 second after another consecutively, but they are all 6s. So we now have 6 6 6 6 6 as the end result.

    The reason for this is because the setTimeout function creates a function (the closure) that has access to its outer scope, which is the for loop that contains the index i. After 1 second go by, the function is executed and it prints out the value of i, which at the end of the loop is at 6 because it cycles through 0, 1, 2, 3, 4, 5, 6 and the loop finally stops at 6 .

    B) The problem resides in the variable i we're passing into setTimeout(). In this case, we're simply passing the reference to the variable i, and not the actual value at the moment inside each loop. Therefore, by the time the setTimeout() function is executed (after 1, 2, 3, 4, and 5 seconds in this case), the for statement has already been executed and incremented i to the final value of 6.

    In other words, we are not passing value of i to the callback function of setTimeout(), instead what we are telling the callback function is too look for the variable i when it is executed at a later time. When the callback functions run, the variable i will be set to 6, since the callbacks will run after the loop completes... and that is why get the value 6.

    C) Explanation why the time interval is taking 1 second for consoling out the last value of 6 i.e. printing "6" five times with 1 second of time interval and NOT 6 seconds - Because, the setTimeout() function is only executed once (while setInterval() is for repeat execution ). And the i outside the curly braces (which is the second argument of the setInterval function ) takes the first value of i which is 1 second and get executed once and then stops.
    */

    /* SOLUTION -
    To print the successive values of i with an interval of 1 second, we need to pass into setTimeout() the actual value of i at the moment of each loop execution in the for statement.  */

    funcToExecute = x => () => {
      console.log(x);
    };

    for (var i = 1; i <= 5; i++) {
      setTimeout(funcToExecute(i), i * 500);
    }

    /* More Explanation on why the delay is happening in the correct solution and not in the original solution -

    In JavaScript you only have 2 ways of passing an argument....pass by value or pass by reference.

    In the incorrect solution above in the loop, i is being passed by reference. So the loop is done by the time first console.log runs and and i is already at 6. To pass by reference in JavaScript, the argument has to be object.property. However in the loop case above, this is a exception where a variable is being passed as a reference to the value instead of the value itself.

    Now, other than the loop exception.... if you pass a variable as a arg into a function(x).... you are passing by value. Thus, passing the variable i in the function(x) passes by value.
    */

    /***********************************************************************
    Let's practice writing closures by creating a method called `dynamicMultiply(num)`.
    The dynamicMultiply function will return a new function that will allow us to
    create new separate custom multiply functions.

    Look below to see how this function is invoked:

    const doubler = dynamicMultiply(2); // returns a functions
    doubler(5); // returns 10

    const tripler = dynamicMultiply(3);
    tripler(5); // returns 15

    const multiplyByFive = dynamicMultiply(5);
    multiplyByFive(5); // returns 25

    ***********************************************************************/

    function dynamicMultiply( num ) {
      let multiplier = num;

      return factor => multiplier * factor;
    }

    /***********************************************************************
    Let's practice writing closures by creating a function named `sandwichMaker()`.
    This function will return another function that will accept a string to add
    to the sandwich order (which will start off with a default "tomato" ingredient),
    separating each incoming ingredient with "and".

    Look below to see how this function is invoked:

    let sandwich = sandwichMaker(); // => returns a function
    sandwich("spinach") // => "One sandwich with tomato and spinach"
    sandwich("jelly") // => "One sandwich with tomato and spinach and jelly"
    sandwich("bread") // => "One sandwich with tomato and spinach and jelly and bread"

    Another Sandwich:
    let sandwich2 = sandwichMaker(); // => returns a function
    sandwich2("pb") // => "One sandwich with tomato and pb"

    ***********************************************************************/

    function sandwichMaker() {
      let order = "One sandwich with tomato";

      return food => {
        order = order.slice(0, order.length) + " and " + food;
        return order;
      };
    }

    /**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
    module.exports = sandwichMaker;

    /*

    Closures
    The inner function can access the variables of the enclosing function due to closures in JavaScript. In other words, the inner function preserves the scope chain of the enclosing function at the time the enclosing function was executed, and thus can access the enclosing function's variables.

    The closure has three scope chains:

    it has access to its own scope — variables defined between its curly brackets
    it has access to the outer function's variables
    it has access to the global variables
     */

    var text = "outside";

    function logText() {
      console.log(text); // ans: 'undefined'
      var text = "inside";
      console.log(text); // ans:'inside'
    }

    logText();

    /* When I run the above code, the first < console.log(text) > will print 'undefined' instead of 'outside' - Here's Why - Because, I have the variable 'text' declared and assigned both inside the function and outside the function -
    https://medium.com/backticks-tildes/understanding-hoisting-and-scoping-in-javascript-39ea7b41e31

    Variable Shadowing -

    In JavaScript, variables with the same name can be specified at multiple layers of nested scope. In such case local variables gain priority over global variables. If you declare a local variable and a global variable with the same name, the local variable will take precedence when you use it inside a function. This type of behavior is called shadowing. Simply put, the inner variable shadows the outer. This is how the Javascript interpreter finds a particular variable; it searches for the variable at the innermost scope being executed at the time, and continues until the first match is found, even if there are other variables with the same name in the outer scope.

    So in above, it takes the 'text' declared inside the function, but then only variable declaration is hoisted and NOT variable-assignment. So here, I am trying to print the 'outside' variable before assigning a value to it. So it prints undefined.

    */

    var c = 15;

    function outer() {
      console.log(c);
      // the above will print 'undefined' instead of '15'
      // because, just like the above example of 'Variable Shadowing', variable declaration is hoisted but not variable assignment,
      // And variable declared inside the function-scope will take precedence over the one declared outside

      var b = 10;
      var c = 25;
      function inner() {
        var a = 20;
        console.log(a + b + c); // => but this will correctly print 55, because at this point I have the correct reference to all the variable values
      }
      return inner();
    }

    outer();

    /*

    Final output from outer()

    undefined
    55

    1 > https://medium.freecodecamp.org/javascript-closures-simplified-d0d23fa06ba4

    Function outer() finishes execution, and all variables within the scope of outer() now no longer exist.
    This last part is important to understand. Once a function completes its execution, any variables that were defined inside the function scope cease to exist.

    The lifespan of a variable defined inside of a function is the lifespan of the function execution.

    What this means is that in console.log(a+b), the variable b exists only during the execution of the the outer() function. Once the outer function has finished execution, the variable b no longer exists.

     */

By <a href="https://medium.com/@bryanguner" class="p-author h-card">Bryan Guner</a> on [August 31, 2021](https://medium.com/p/50a59e79703f).

<a href="https://medium.com/@bryanguner/closure-in-javascript-50a59e79703f" class="p-canonical">Canonical link</a>

Exported from [Medium](https://medium.com) on September 12, 2021.
