# Understanding Async Await In The Context Of The Event Loop

There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand…

---

### Understanding Async Await In The Context Of The Event Loop

#### There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and use.

The <a href="https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke" class="markup--anchor markup--p-anchor">following excerpt</a> comes from the phenomenally written article on the subject of the <a href="https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke" class="markup--anchor markup--p-anchor">callstack</a> and <a href="https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif" class="markup--anchor markup--p-anchor">event-queue</a> by <a href="https://dev.to/lydiahallie" class="markup--anchor markup--p-anchor">Lidia Hallie</a>!

JavaScript is **single-threaded**: only one task can run at a time.

<figure><img src="https://cdn-images-1.medium.com/max/800/0*SLsSFiq0R6OSo89a.jpg" class="graf-image" /></figure>To compensate, browsers like Google Chrome give us some features that Javascript does not provide in isolation, namely… <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction" class="markup--anchor markup--p-anchor">a Web API.</a>

> When we invoke a function, it gets added to something called the call stack.

<figure><img src="https://cdn-images-1.medium.com/max/800/0*MvjUSu6XfEuJWm6x.gif" class="graf-image" /></figure>**It’s a stack, meaning that it’s first in, last out (think of a pile of pancakes).**

> When a function returns a value, it gets popped off the stack

<figure><img src="https://cdn-images-1.medium.com/max/800/1*b31hiO4ynbDLRrXWEFF4aQ.png" class="graf-image" /></figure>-   <span id="590c">The `respond` function returns a `setTimeout` function.</span>
-   <span id="f2f9">The `setTimeout` is provided to us by the Web API:</span>
-   <span id="5493">it lets us delay tasks without blocking the main thread.</span>
-   <span id="2cbc">The callback function that we passed to the `setTimeout` function,</span>

> the arrow function `() => { return` `'Hey'` }

- <span id="8b76">gets added to the Web API.</span>
- <span id="1691">**In the meantime, the** `setTimeout` **function and the respond function get popped off the stack, they both returned their values!**</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/1*b31hiO4ynbDLRrXWEFF4aQ.png" class="graf-image" /></figure>*In the Web API, a timer runs for as long as the second argument we passed to it, 1000ms.*

The callback doesn’t immediately get added to the call stack, instead it’s passed to something called the **queue.**

<figure><img src="https://cdn-images-1.medium.com/max/800/1*b31hiO4ynbDLRrXWEFF4aQ.png" class="graf-image" /></figure>This does not mean that the callback function gets added to the callstack (***returns***) after 1000ms!

This means that the function has been added to the _queue_ after 1000ms where it will wait for it’s proper FIFO designated turn to excite.

<span class="graf-dropCap">T</span>he event loop is simply a mechanism for **connecting the queue with the call stack**!

> An analogy to this relationship exists in facebook market place… the marketplace doesn’t actually buy or sell anything… it just provides a framework for which buyers and sellers can interface productively. It’s not a perfect analogy… the point is that the event loop is not some third tangible entity… it’s just the relationship between the stack and queue.

---

#### If the call stack is empty:

**meaning all previously invoked functions have returned their values and have been popped off the stack…**

#### The first item in the queue gets added to the call stack:

**In this case, no other functions were invoked, meaning that the call stack was empty by the time the callback function was the first item in the queue.**

---

**The callback is added to the call stack**

- <span id="045e">Gets invoked… returns a value…( gets popped off the stack).</span>

---

<figure><img src="https://cdn-images-1.medium.com/max/800/0*bpGHoLFACDcK3LxP.gif" class="graf-image" /></figure>1.  <span id="b16f">We invoke `bar`. `bar` returns a `setTimeout` function.</span>
2.  <span id="f4d5">The callback we passed to `setTimeout` gets added to the Web API, the `setTimeout` function and `bar` get popped off the callstack.</span>
3.  <span id="38c9">The timer runs, in the meantime `foo` gets invoked and logs `First`. `foo` returns (undefined),`baz` gets invoked, and the callback gets added to the queue.</span>
4.  <span id="526b">`baz` logs `Third`. The event loop sees the callstack is empty after `baz` returned, after which the callback gets added to the call stack.</span>
5.  <span id="40fe">The callback logs `Second`.</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*YArelm5gHw4BwFZZ.gif" class="graf-image" /></figure>

---

### Practice:

### Async/await

> There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and use.

### <a href="#async-functions" class="markup--anchor markup--h3-anchor">Async functions</a>

Let’s start with the `async` keyword. It can be placed before a function, like this:

    //Let's start with the async keyword. It can be placed before a function, like this:
    async function f() {
      return 1;
    }

…We could explicitly return a promise, which would be the same:

> So, \`async\` ensures that the function returns a promise, and wraps non-promises in it.

> There’s another keyword, \`await\`, that works only inside \`async\` functions.

    The syntax:

    //await only works inside the lexical scope of an asynchronous function.

    let value = await promise;

#### The keyword `await` makes JavaScript wait until that promise settles and returns its result.

Here’s an example with a promise that resolves in 1 second:

The function execution “pauses” at line 5 and resumes when the promise resolves, taking the promise’s eventual resolution as it’s value.

> The code above shows “done!” in one second.

### `Await` suspends the function execution until the promise settles, and then resumes it with the promise result.

### <a href="#summary" class="markup--anchor markup--h3-anchor">Summary</a>

The `async` keyword before a function has two effects:

1.  <span id="b418">Makes it always return a promise.</span>
2.  <span id="f2f7">Allows `await` to be used in it.</span>

The `await` keyword before a promise makes JavaScript wait until that promise settles, and then:

### TBC…

[View original.](https://medium.com/p/9d241e72fc2d)

Exported from [Medium](https://medium.com) on July 13, 2021.
