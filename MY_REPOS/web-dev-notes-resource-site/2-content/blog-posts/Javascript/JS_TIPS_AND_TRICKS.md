# Ultimate Guide to Tips, Tricks, and JavaScript Features You Should Know!

> My main coding language is JavaScript and I want to talk about some of the really cool features that JavaScript supports.

[![Daniel Movsesyan](https://miro.medium.com/fit/c/96/96/1*LgjXK7pVLat5FdQmLZRwYg@2x.jpeg)](https://medium.com/@danielmovsesyan?source=post_page-----27e0a4a6ffdf--------------------------------)

![Image for post](https://miro.medium.com/max/60/1*F4cJeBulfT9-Q1Eap-rO0Q.png?q=20)

![Image for post](https://miro.medium.com/max/2268/1*F4cJeBulfT9-Q1Eap-rO0Q.png)

My main coding language is JavaScript, and I want to talk about some of the really cool features that JavaScript supports.

**JavaScript** often abbreviated as **JS**, is a [programming language](https://en.wikipedia.org/wiki/Programming_language) that conforms to the [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) (latest stable release ES2019, preview release ES2020) specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.

Along with HTML and CSS, JavaScript is one of the core technologies of the [World Wide Web](https://en.wikipedia.org/wiki/World_Wide_Web). JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of [websites](https://en.wikipedia.org/wiki/Website) use it for [client-side](https://en.wikipedia.org/wiki/Client-side) page behavior, and all major web browsers have a dedicated [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine) to execute it.

As a multi-paradigm language, JavaScript supports [event-driven](https://en.wikipedia.org/wiki/Event-driven_programming), [functional](https://en.wikipedia.org/wiki/Functional_programming), and imperative programming styles. It has [application programming interfaces](https://en.wikipedia.org/wiki/Application_programming_interface) (APIs) for working with text, dates, regular expressions, standard [data structures](https://en.wikipedia.org/wiki/Data_structure), and the [Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model) (DOM). However, the language itself does not include any input/output (I/O), such as networking, storage, or graphics facilities. The host environment (usually a web browser or Node) provides those APIs.

Originally used only in web browsers, JavaScript engines are also now embedded in server-side website deployments and non-browser applications.

Although there are similarities between JavaScript and [Java](https://en.wikipedia.org/wiki/Java_(programming_language)), including language name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.

You can read more on the Wikipedia page about [JavaScript](https://en.wikipedia.org/wiki/JavaScript).

Every year JavaScript shows us new features and tools to solve different problems more easily. So let me introduce some of them which can help you to write less code in a clearer way.

Before the ES6 standard, JavaScript had two types of scope: **Function** scope and **Global** scope and one type of variable initializer called `var`. Variables declared outside of the function (Globally) have **Global** scope and variables declared in a function have a **Function** scope.

We can access global scope variables from everywhere in the code, but we can access function scope variables inside the function in which that variable declared.

Seems logical, yeah? So let’s see some examples.

![Image for post](https://miro.medium.com/max/60/1*UDnpf2qjLhdygnDoeM91Gw.png?q=20)

![Image for post](https://miro.medium.com/max/2840/1*UDnpf2qjLhdygnDoeM91Gw.png)

I numbered the lines so it’s easier to navigate through

We can see that in the example above there are two scopes we are talking about starting from (line 1 **global** scope and line 5 **function** scope). The **number** variable on line 2 is initialized in the global scope, so we can access it from function **twoAdder** (line 7) and also from outside of it (line 10).

But on line 6, we have one more variable called **increasedNumber** which adds 2 to a **number** value and saves it in it without modifying **number**. So, we can easily access it from **twoAdder** function online 7, but not from outside of it on line 11. That’s because variables declared in function (function scope) can be accessed only from inside that function.

That’s the simple representation of global and function scopes.

Continuing the main theme, after ES6 there is another scope called **Block** scope.

![Image for post](https://miro.medium.com/max/60/1*tRW3JcH1gLZlqeBWP4SUAg.png?q=20)

![Image for post](https://miro.medium.com/max/1964/1*tRW3JcH1gLZlqeBWP4SUAg.png)

Block scope is the scope which is in {curly} brackets and the variables initialized in that scope can be accessed only from that scope. That scope can be created by functions, for loops, if statements, or just by curly braces.

![Image for post](https://miro.medium.com/max/60/1*0lsT8D574RiqkU9q-C2HRw.png?q=20)

![Image for post](https://miro.medium.com/max/1916/1*0lsT8D574RiqkU9q-C2HRw.png)

> Hmmm, what is that `let` keyword?

The answer is that after ES6, there are another two new variable initializers: `let` and `const` (from constant), and only using them you can create variables which support block scope.

![Image for post](https://miro.medium.com/max/60/1*1FW7idJwLAwzEhvhDjBEEA.png?q=20)

![Image for post](https://miro.medium.com/max/1780/1*1FW7idJwLAwzEhvhDjBEEA.png)

![Image for post](https://miro.medium.com/max/60/1*thq0nVMOaXq60djdDF4osQ.png?q=20)

![Image for post](https://miro.medium.com/max/2320/1*thq0nVMOaXq60djdDF4osQ.png)

With let the newSalary is block scoped in if statement

The difference between `let` and `const` is that variables initialized with `const` can’t be mutated. That’s why the `const` keyword comes from constant (means fixed).

![Image for post](https://miro.medium.com/max/60/1*rwSA8SleHr7vpUEqWyMEvQ.png?q=20)

![Image for post](https://miro.medium.com/max/2824/1*rwSA8SleHr7vpUEqWyMEvQ.png)

You can’t assign other value to variable

But you can mutate the arrays or objects assigned to variable:

`let` and `const` also prevent hoisting (JavaScript’s default behavior of moving declarations to the top).

![Image for post](https://miro.medium.com/max/60/1*ZgBFeyrCHHycPnkLFC6Yag.png?q=20)

![Image for post](https://miro.medium.com/max/1612/1*ZgBFeyrCHHycPnkLFC6Yag.png)

![Image for post](https://miro.medium.com/max/60/1*IjDFv5xDHoGRUOJy7qY7pw.png?q=20)

![Image for post](https://miro.medium.com/max/3872/1*IjDFv5xDHoGRUOJy7qY7pw.png)

Yep, that’s long error message

For more details about hoisting you can read [here](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).

Okay why “let"?

> Let is a mathematical statement that was adopted by early programming languages like Scheme and Basic. Variables are considered low-level entities not suitable for higher levels of abstraction, thus the desire of many language designers to introduce similar but more powerful concepts like in Clojure, F#, Scala, where “let" might mean a value or a variable that can be assigned, but not changed, which in turn lets the compiler catch more programming errors and optimize code better. The full answer is in this [link](https://stackoverflow.com/questions/37916940/why-was-the-name-let-chosen-for-block-scoped-variable-declarations-in-javascri).

I highly recommend you use mentioned initializers with this priority:

**const > let > var**

![Image for post](https://miro.medium.com/max/60/1*FiJvR1GNoL3XZolxJfLy5g.png?q=20)

![Image for post](https://miro.medium.com/max/2420/1*FiJvR1GNoL3XZolxJfLy5g.png)

The function `overallShoePrice` calculates the overall shoe price after discount (if there is any) and returns it to us.

In the old way (before ES6) you would have to check if there is a discount passed through function parameter or not (undefined) and after that continue calculation and returning a final price. But with the new way, you can assign a default value to function’s parameter (On our example: discount = 0).

After running this function without passing the discount parameter, it will be assigned to zero by default. It’s easier, cleaner, and less chance to get an error. 🙃

![Image for post](https://miro.medium.com/max/60/1*kmeJi53_r91GwrS5KDHZug.png?q=20)

![Image for post](https://miro.medium.com/max/2116/1*kmeJi53_r91GwrS5KDHZug.png)

Template literals for embedded expressions

Template literals are string literals allowing embedded expressions. You can use your `**${variables}**` in your string much easier or even call `**${functions()}**`. You can use multi-line strings and string interpolation features with them. They were called “template strings" in prior editions of the ES2015 specification.

![Image for post](https://miro.medium.com/max/60/1*-F93TKbnR0YrClRbyk8s9w.png?q=20)

![Image for post](https://miro.medium.com/max/2252/1*-F93TKbnR0YrClRbyk8s9w.png)

Template literals for multi-line strings

With template literals, we can just start to write long text from the new line and there would be no errors. The text between **\`backticks\`** would be compiled as one string.

Destructuring has been added to JavaScript for writing cleaner code and make it easier to unpack values from objects and arrays. So we can use this feature with {objects} and \[arrays\].

Traditionally, we can access particular object keys like this:

![Image for post](https://miro.medium.com/max/60/1*cfZTHjqG7ChY4FVFnlchvQ.png?q=20)

![Image for post](https://miro.medium.com/max/2624/1*cfZTHjqG7ChY4FVFnlchvQ.png)

With the new method, it’s like this:

![Image for post](https://miro.medium.com/max/60/1*EmvRUsN37n2-OOwYKtSWVg.png?q=20)

![Image for post](https://miro.medium.com/max/2624/1*EmvRUsN37n2-OOwYKtSWVg.png)

We can see that with the new method, we initialize all needed variables in one line and then pass them into the function `printMessage` as an argument.

It may look longer, but it will be cleaner and easier to navigate through the needed keys.

A closer look at destructuring, that’s what is going in there. This:

![Image for post](https://miro.medium.com/max/60/1*Ib5DFtOzThh12xnBAlWduA.png?q=20)

![Image for post](https://miro.medium.com/max/2352/1*Ib5DFtOzThh12xnBAlWduA.png)

Equals to this:

![Image for post](https://miro.medium.com/max/60/1*-GC1U-Db3FfoTW1xjwDbsA.png?q=20)

![Image for post](https://miro.medium.com/max/1408/1*-GC1U-Db3FfoTW1xjwDbsA.png)

It’s also possible to go deeper to nested objects:

![Image for post](https://miro.medium.com/max/60/1*H9xkoR14aE_km5kndiUtIg.png?q=20)

![Image for post](https://miro.medium.com/max/4072/1*H9xkoR14aE_km5kndiUtIg.png)

we have access to nicknames too

Aaaaand we can destructure in a function’s argument field too, like this:

![Image for post](https://miro.medium.com/max/60/1*QBUGG0DCUSS9NSsmgQquIQ.png?q=20)

![Image for post](https://miro.medium.com/max/2960/1*QBUGG0DCUSS9NSsmgQquIQ.png)

This feature is amazing if you like to write clean and readable code

If we have some invalid JavaScript [identifiers](https://developer.mozilla.org/en-US/docs/Glossary/Identifier), then we can give them valid names and use them as normal.

![Image for post](https://miro.medium.com/max/60/1*8qT9UJwG2NpaAxjBylAUXA.png?q=20)

![Image for post](https://miro.medium.com/max/2388/1*8qT9UJwG2NpaAxjBylAUXA.png)

In this example, **big-boss-nickname** is an invalid identifier, but you can use for example **badassNickname** and have access to **NoobMaster69** value through it.

Now let’s talk a bit about destructuring in arrays.

![Image for post](https://miro.medium.com/max/60/1*VvVUDaNb7CDFRMfi4bwdPA.png?q=20)

![Image for post](https://miro.medium.com/max/1476/1*VvVUDaNb7CDFRMfi4bwdPA.png)

We can see that almost like objects, we can destructure arrays in the same way too.

**_y_** is the first element in the array and **_z_** is the second. We can add 3 more elements and they will correspond to 3, 4, and 5, or we can use the rest parameter and assign the rest elements in the array to one variable as an array.

![Image for post](https://miro.medium.com/max/60/1*e3KENDoMo5lk7svtUjPkkg.png?q=20)

![Image for post](https://miro.medium.com/max/1644/1*e3KENDoMo5lk7svtUjPkkg.png)

the name ‘rest’ can be whatever valid identifier as you want

That’s simple, yeah? 🙃

You can learn more about the destructuring feature [there](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

There are many helper functions for arrays out there, and they make working with arrays incredibly easy. We will talk about 7 of them.

For example, the task is to **reverse** the array so **\[1, 2, 3, 4, 5\]** to be **\[5, 4, 3, 2, 1\]**. There are many ways to do that. Like with a [stack](https://www.javascripttutorial.net/javascript-stack/), with decrementing loop, [recursion](https://stackoverflow.com/questions/28006064/recursively-reverse-the-elements-in-an-array), etc.

Let’s do that with a decrementing loop.

![Image for post](https://miro.medium.com/max/60/1*oXtXHsGPVGDs0hcrfE5Gsw.png?q=20)

![Image for post](https://miro.medium.com/max/2688/1*oXtXHsGPVGDs0hcrfE5Gsw.png)

In this method, we are looping through all elements of **arr** from backward and pushing them to the **reversedArray** which will be our new reversed array.

That took from us about 3-5 mins and 7 lines of code. So JavaScript offers the same solution with just 1 line of code and with the speed of light. 🚀

![Image for post](https://miro.medium.com/max/60/1*GkZ8-7BBex2BxuUAudYgOg.png?q=20)

![Image for post](https://miro.medium.com/max/2792/1*GkZ8-7BBex2BxuUAudYgOg.png)

Just think of it so JavaScript is running that “7 lines" of code under the **reverse** method with some modifications.

The methods listed above are loop methods.

**forEach** method executes a provided (callback) function once for each array element. The callback function is the function that we pass to the method as an argument.

![Image for post](https://miro.medium.com/max/60/1*1rd_lgJjF5q1dpTVd3CBrg.png?q=20)

![Image for post](https://miro.medium.com/max/2016/1*1rd_lgJjF5q1dpTVd3CBrg.png)

DON’T return anything because it’ll be simply discarded

In this example, we have workers’ salaries array and we log every workers’ salary to our console. We have **worker**, **index** and **array** arguments in our callback function. **Worker** argument is representing array’s every element ( {name: ‘Sam’, salary: 700}, {name: ‘Ani’, salary: 700}, … ). The index argument is the position of a particular element ( 0, 1, … ) and **array** argument is your array on which you are calling this method. Index and array exist in map, filter, reduce callback functions too.

One more example:

![Image for post](https://miro.medium.com/max/60/1*uLq37nUeUUQrDdF4sDvQhg.png?q=20)

![Image for post](https://miro.medium.com/max/2588/1*uLq37nUeUUQrDdF4sDvQhg.png)

for more than one line of code inside the provided arrow function add paranteces

In this example instead of logging salaries of our workers, we are multiplying them by 2 and pushing to the **newSalaries** array.

With the map method, you can create a new array without modifying the array on which your method is running. We can demonstrate the map method on our previous example:

![Image for post](https://miro.medium.com/max/2388/1*n0GveJQ9s2-EW_zXslRpLg.png)

Instead of pushing every new element to our **newSalaries** array, with the map method we just assign to it and return new elements. New elements get automatically pushed to the **newSalary** array after returning.

I think it’s simpler and easier to use this method for creating new arrays on old arrays or donor array compared with the forEach method.

The filter method receives callback function with a filter condition and creates a new array with elements that meet the condition.

![Image for post](https://miro.medium.com/max/2892/1*BmjU7WIp_C3csDp1YoLyyA.png)

So we have more workers with different salaries, but we need the workers with salaries more than 2000 points. We pass the condition and get the **newSalaries** array with workers with salaries more than 2000 points.

We can create multiple conditions too.

![Image for post](https://miro.medium.com/max/3568/1*TjaVL_dvc11bQ_D8rOkp-Q.png)

And that was the filter method.

Now let’s look to **reduce** method. This was the hardest one I learned from these 4 methods. But it’s easy with some practice, don’t panic 🤫

This method’s callback function accepts 4 arguments (accumulator, currentValue, index, array). The last two methods you already know, so let’s look at the **accumulator** (let’s call it **currentSum**) and **currentValue**.

![Image for post](https://miro.medium.com/max/2960/1*mWt_AJt0beWUi5HHLUiSTQ.png)

currentWorker fits better instead of currentValue

We have the same list of our workers and at this time we wanna calculate the sum of all worker salaries. You can notice the second argument of our reduce method (0). It’s the **initial value** of our calculation.

The **currentSum** argument gives us a summary of our calculation value at the moment of **the** current loop phase. For example, if we are on Arthur’s salary phase, we already have the sum of Sam’s and Susan’s salaries (0 (**initial value**)+ 700 + 700 = 1400), so the currentSum will be 1400.

The **currentWorker** argument is the same as **worker** argument in previous method examples.

After all phases of the loop, we will get the sum of all workers’ salaries under the **sumOfSalaries** variable. We can do any calculation we want with this method.

The **includes** method determines whether an array includes a certain value among its elements, returning `true` or `false` as appropriate.

![Image for post](https://miro.medium.com/max/3568/1*DBUjWNKUyUqr25uHRs7iNg.png)

The `!goalsOf2020.includes(newGoal)`checks wheather **goalsOf2020** has **newGoal** and if not adds the **newGoal**.

The **flat** method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

![Image for post](https://miro.medium.com/max/2792/1*SMSZju-DPS46O8uiXV6Gaw.png)

The depth argument is optional, by default it’s 1

The depth argument is for telling the method how deep it can go and concat sub-arrays into one array.

![Image for post](https://miro.medium.com/max/2756/1*QmbFO2Gt5q18XY-MKFZXSw.png)

The depth is 1 which is initialized by default, so the array has sub-array

If we want to have no sub-arrays guaranteed for all level depth arrays, we can use this trick bellow by passing _Infinity_ as depth argument.

![Image for post](https://miro.medium.com/max/2792/1*OEiXv-R4gfPSEBaUDJyc7w.png)

So using this, you will always have 0 depth array 😌


[Source](https://levelup.gitconnected.com/ultimate-guide-to-tips-tricks-and-javascript-features-you-should-know-27e0a4a6ffdf)
