# ⭐️🎀  JavaScript Visualized: Promises & Async/Await

> Ever had to deal with JS code that just... didn't run the way you expected it to? Maybe it seemed lik...

Ever had to deal with JS code that just... didn't run the way you expected it to? Maybe it seemed like functions got executed at random, unpredictable times, or the execution got delayed. There's a chance you were dealing with a cool new feature that ES6 introduced: **Promises**!

My curiosity from many years ago has paid off and my sleepless nights have once again given me the time to make some animations. Time to talk about Promises: **why** would you use them, **how** do they work "under the hood", and how can we write them in the most **modern** way?

> If you haven't read my previous post on the JavaScript Event Loop yet, it may be useful to read that first! I'll be covering the event loop again assuming some basic knowledge about the call stack, Web API and the queue, but this time we'll also be covering some exciting extra features 🤩

* * *

If you're already somewhat familiar with promises, here are some shortcuts to save you some precious scrolling time.

* * *

* * *

### [](#introduction)Introduction

When writing JavaScript, we often have to deal with tasks that rely on other tasks! Let's say that we want to get an image, compress it, apply a filter, and save it 📸

The very first thing we need to do, is _get_ the image that we want to edit. A `getImage` function can take care of this! Only once that image has been loaded successfully, we can pass that value to a `resizeImage` function. When the image has been resized successfully, we want to apply a filter to the image in the `applyFilter` function. After the image has been compressed and we've added a filter, we want to save the image and let the user know that everything worked correctly! 🥳

In the end, we'll end up with something like this:

[![](https://res.cloudinary.com/practicaldev/image/fetch/s---Kv6sJn7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ixceqsql5hpdq8txx43s.png)](https://res.cloudinary.com/practicaldev/image/fetch/s---Kv6sJn7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ixceqsql5hpdq8txx43s.png)

Hmm... Notice anything here? Although it's... _fine_, it's not great. We end up with many nested callback functions that are dependent on the previous callback function. This is often referred to as a [_callback hell_](http://callbackhell.com/), as we end up with tons of nested callback functions that make the code quite difficult to read!

Luckily, we now got something called **promises** to help us out! Let's take a look at what promises are, and how they can help us in situations like these! 😃

* * *

### [](#promise-syntax)Promise Syntax

ES6 introduced **Promises**. In many tutorials, you'll read something like:

> "A promise is a placeholder for a value that can either resolve or reject at some time in the future"

Yeah... That explanation never made things clearer for me. In fact it only made me feel like a Promise was a weird, vague, unpredictable piece of magic. So let's look at what promises _really_ are.

We can create a promise, using a `Promise` constructor that receives a callback. Okay cool, let's try it out!

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--phTVdCKA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/79zi452hphe7ecylhozy.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--phTVdCKA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/79zi452hphe7ecylhozy.gif)

Wait woah, what just got returned?

A `Promise` is an object that contains a **status**, (`[[PromiseStatus]]`) and a **value** (`[[PromiseValue]]`). In the above example, you can see that the value of `[[PromiseStatus]]` is `"pending"`, and the value of the promise is `undefined`.

Don't worry - you'll never have to interact with this object, you can't even access the `[[PromiseStatus]]` and `[[PromiseValue]]` properties! However, the values of these properties are important when working with promises.

* * *

The value of the `PromiseStatus`, the **state**, can be one of three values:

*   ✅ `fulfilled`: The promise has been `resolved`. Everything went fine, no errors occurred within the promise 🥳
*   ❌ `rejected` : The promise has been `rejected`. Argh, something went wrong..
*   ⏳ `pending`: The promise has neither resolved nor rejected (yet), the promise is still `pending`.

Alright this all sounds great, but _when_ is a promise status `"pending"`, `"fulfilled"` or `"rejected"`? And why does that status even matter?

In the above example, we just passed the simple callback function `() => {}` to the `Promise` constructor. However, this callback function actually receives two arguments. The value of the first argument, often called `resolve` or `res`, is the method to be called when the Promise should **resolve**. The value of the second argument, often called `reject` or `rej`, is the value method to be called when the Promise should **reject**, something went wrong.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--9A_mOYMP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/duen4peq0bdr55cka5ya.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--9A_mOYMP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/duen4peq0bdr55cka5ya.png)

Let's try and see that gets logged when we invoke either the `resolve` or `reject` method! In my example, I called the `resolve` method `res`, and the `reject` method `rej`.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--qKIq-sYt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/z0b9v0h7aiq073l5tl2l.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--qKIq-sYt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/z0b9v0h7aiq073l5tl2l.gif)

Awesome! We finally know how to get rid of the `"pending"` status and the `undefined` value! The **status** of a promise is `"fulfilled"` if we invoked the `resolve` method, and the status of the promise is `"rejected`" if we invoked the `rejected` method.

The **value** of a promise, the value of `[[PromiseValue]]`, is the value that we pass to the either the `resolved` or `rejected` method as their argument.

> Fun fact, I let Jake Archibald proofread this article and he actually pointed out there's a bug in Chrome that currently shows the status as `"resolved"` instead of `"fulfilled"`. Thanks to [Mathias Bynens](https://twitter.com/mathias) it's now fixed in Canary! 🥳🕺🏼
> 
> > ![unknown tweet media content](https://res.cloudinary.com/practicaldev/image/fetch/s--kZ3BKUHA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pbs.twimg.com/media/EVJqgKLUwAEocsG.png)
> > 
> > Chrome and Safari call this a "resolved" promise, which is true, but kinda misleading…
> > 
> > 09:21 AM - 09 Apr 2020
> > 
> >  [![Twitter reply action](https://res.cloudinary.com/practicaldev/image/fetch/s--fFnoeFxk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev.to/assets/twitter-reply-action-238fe0a37991706a6880ed13941c3efd6b371e4aefe288fe8e0db85250708bc4.svg)](https://twitter.com/intent/tweet?in_reply_to=1248179232775319559) [ ![Twitter retweet action](https://res.cloudinary.com/practicaldev/image/fetch/s--k6dcrOn8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev.to/assets/twitter-retweet-action-632c83532a4e7de573c5c08dbb090ee18b348b13e2793175fea914827bc42046.svg) ](https://twitter.com/intent/retweet?tweet_id=1248179232775319559) [![Twitter like action](https://res.cloudinary.com/practicaldev/image/fetch/s--SRQc9lOp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev.to/assets/twitter-like-action-1ea89f4b87c7d37465b0eb78d51fcb7fe6c03a089805d7ea014ba71365be5171.svg)](https://twitter.com/intent/like?tweet_id=1248179232775319559) 
> 
>   

* * *

Okay so, now we know a little bit better how to control that vague `Promise` object. But what is it used for?

In the introductory section, I showed an example in which we get an image, compress it, apply a filer, and save it! Eventually, this ended up being a nested callback mess.

Luckily, Promises can help us fix this! First, let's rewrite the entire code block, so that each function returns a `Promise` instead.

If the image is loaded and everything went fine, let's **resolve** the promise with the loaded image! Else, if there was an error somewhere while loading the file, let's **reject** the promise with the error that occurred.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--r9xngcNz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/iebp0rzfnfqsrmmjplme.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--r9xngcNz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/iebp0rzfnfqsrmmjplme.png)

Let's see what happens when we run this in the terminal!

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--uERkfSWf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/wsu5nn26dp4elcwh764m.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--uERkfSWf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/wsu5nn26dp4elcwh764m.gif)

Cool! A promise got returned with the value of the parsed data, just like we expected.

But... what now? We don't care about that entire promise object, we only care about the value of the data! Luckily, there are built-in methods to get a promise's value. To a promise, we can attach 3 methods:

*   `.then()`: Gets called after a promise _resolved_.
*   `.catch()`: Gets called after a promise _rejected_.
*   `.finally()`: _Always_ gets called, whether the promise resolved or rejected.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--19tIvFJQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/mu1aqqnyfjsfon5hwrtw.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--19tIvFJQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/mu1aqqnyfjsfon5hwrtw.png)

The `.then` method receives the value passed to the `resolve` method.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--DZld0c-0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/11vxhn9cun7stpjbdi80.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--DZld0c-0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/11vxhn9cun7stpjbdi80.gif)

The `.catch` method receives the value passed to the `rejected` method

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--e9SZHcPk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/v5y24jz4u89flazvdyn4.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--e9SZHcPk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/v5y24jz4u89flazvdyn4.gif)

Finally, we have the value that got resolved by the promise without having that entire promise object! We can now do whatever we want with this value.

* * *

FYI, when you know that a promise will always resolve or always reject, you can write `Promise.resolve` or `Promise.reject` , with the value you want to reject or resolve the promise with!

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--61Gva3Ze--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/90hxwjfadzslvdbkr4l8.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--61Gva3Ze--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/90hxwjfadzslvdbkr4l8.png)

You'll often see this syntax in the following examples 😄

* * *

In the `getImage` example, we ended up having to nest multiple callbacks in order to run them. Luckily, the `.then` handlers can help us with that! 🥳

The result of the `.then` itself is a promise value. This means that we can chain as many `.then`s as we want: the result of the previous `then` callback will be passed as an argument to the next `then` callback!

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--X8h-NDc2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/i6busbetmoya9vny2eku.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--X8h-NDc2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/i6busbetmoya9vny2eku.png)

In the case of the `getImage` example, we can chain multiple `then` callbacks in order to pass the processed image onto the next function! Instead of ending up with many nested callbacks, we get a clean `then` chain.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--e1nVrqe1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/u9l3lxwxlxgv2edv79xh.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--e1nVrqe1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/u9l3lxwxlxgv2edv79xh.png)

Perfect! This syntax already looks way better than the nested callbacks.

* * *

[](#microtasks-and-macrotasks)Microtasks and (Macro)tasks
---------------------------------------------------------

Okay so we know a little better how to create a promise and how to extract values out of a promise. Let's add some more code to the script, and run it again:

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--uNG7sXon--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ey4ubnv5yjgi6hbh97xq.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--uNG7sXon--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ey4ubnv5yjgi6hbh97xq.gif)

Wait what?! 🤯

First, `Start!` got logged. Okay we could've seen that one coming: `console.log('Start!')` is on the very first line! However, the second value that got logged was `End!`, and _not_ the value of the resolved promise! Only after `End!` was logged, the value of the promise got logged. What's going on here?

We've finally seen the true power of promises! 🚀 Although JavaScript is single-threaded, we can add asynchronous behavior using a `Promise`!

* * *

But wait, haven't we seen that before? 🤔 In the [JavaScript event loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif), can't we also use methods native to the browser such as `setTimeout` to create some sort of asynchronous behavior?

Yes! However, within the Event Loop, there are actually two types of queues: the **(macro)task queue** (or just called the **task queue**), and the **microtask queue**. The (macro)task queue is for **(macro)tasks** and the microtask queue is for **microtasks**.

So what's a _(macro)task_ and what's a _microtask_? Although there are a few more than I'll cover here, the most common are shown in the table below!

<table><tbody><tr><td>(Macro)task</td><td><code>setTimeout</code> | <code>setInterval</code> | <code>setImmediate</code></td></tr><tr><td>Microtask</td><td><code>process.nextTick</code> | <code>Promise callback</code> | <code>queueMicrotask</code></td></tr></tbody></table>

Ahh, we see `Promise` in the microtask list! 😃 When a `Promise` resolves and calls its `then()`, `catch()` or `finally()`, method, the callback within the method gets added to the **microtask queue**! This means that the callback within the `then()`, `catch()` or `finally()` method isn't executed immediately, essentially adding some async behavior to our JavaScript code!

So when _is_ a `then()`, `catch()` or `finally()` callback executed? The event loop gives a different priority to the tasks:

1.  All functions in that are currently in the **call stack** get executed. When they returned a value, they get popped off the stack.
2.  When the call stack is empty, _all_ queued up **microtasks** are popped onto the callstack one by one, and get executed! (Microtasks themselves can also return new microtasks, effectively creating an infinite microtask loop 😬)
3.  If both the call stack and microtask queue are empty, the event loop checks if there are tasks left on the (macro)task queue. The tasks get popped onto the callstack, executed, and popped off!

* * *

Let's take a look at a quick example, simply using:

*   `Task1`: a function that's added to the call stack immediately, for example by invoking it instantly in our code.
*   `Task2`, `Task3`, `Task4`: microtasks, for example a promise `then` callback, or a task added with `queueMicrotask`.
*   `Task5`, `Task6`: a (macro)task, for example a `setTimeout` or `setImmediate` callback

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--05Fi8vBq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/42eatw03fcha0e1qcrf0.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--05Fi8vBq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/42eatw03fcha0e1qcrf0.gif)

First, `Task1` returned a value and got popped off the call stack. Then, the engine checked for tasks queued in the microtask queue. Once all the tasks were put on the call stack and eventually popped off, the engine checked for tasks on the (macro)task queue, which got popped onto the call stack, and popped off when they returned a value.

Okay okay enough pink boxes. Let's use it with some real code!

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--fnbqqf1d--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/g61wwyi8wchk2hpzeq4u.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--fnbqqf1d--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/g61wwyi8wchk2hpzeq4u.png)

In this code, we have the macro task `setTimeout`, and the microtask promise `then()` callback. Once the engine reaches the line of the `setTimeout` function. Let's run this code step-by-step, and see what gets logged!

* * *

> Quick FYI - in the following examples I'm showing methods like `console.log`, `setTimeout` and `Promise.resolve` being added to the call stack. They're internal methods and actually don't appear in stack traces - so don't worry if you're using the debugger and you don't see them anywhere! It just makes explaining this concept easier without adding a bunch of boilerplate code 🙂

On the first line, the engine encounters the `console.log()` method. It gets added to the call stack, after which it logs the value `Start!` to the console. The method gets popped off the call stack, and the engine continues.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s---Bt6DKsn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/6cbjuexvy6z9ltk0bi18.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s---Bt6DKsn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/6cbjuexvy6z9ltk0bi18.gif)

The engine encounters the `setTimeout` method, which gets popped on to the call stack. The `setTimeout` method is native to the browser: its callback function (`() => console.log('In timeout')`) will get added to the Web API, until the timer is done. Although we provided the value `0` for the timer, the call back still gets pushed to the Web API first, after which it gets added to the **(macro)task queue**: `setTimeout` is a macro task!

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--6NSYq-nO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/yqoemb6f32lvovge8yrp.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--6NSYq-nO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/yqoemb6f32lvovge8yrp.gif)

* * *

The engine encounters the `Promise.resolve()` method. The `Promise.resolve()` method gets added to the call stack, after which is resolves with the value `Promise!`. Its `then` callback function gets added to the **microtask queue**.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--us8FF30N--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/6wxjxduh62fqt531e2rc.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--us8FF30N--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/6wxjxduh62fqt531e2rc.gif)

* * *

The engine encounters the `console.log()` method. It gets added to the call stack immediately, after which it logs the value `End!` to the console, gets popped off the call stack, and the engine continues.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--oOS_-CiG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/a6jk0exl137yka3oq9k4.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--oOS_-CiG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/a6jk0exl137yka3oq9k4.gif)

The engine sees the callstack is empty now. Since the call stack is empty, it's going to check whether there are queued tasks in the **microtask queue**! And yes there are, the promise `then` callback is waiting for its turn! It gets popped onto the call stack, after which it logs the resolved value of the promise: the string `Promise!`in this case.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--5iH5BNWm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/lczn4fca41is4vpicr6w.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--5iH5BNWm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/lczn4fca41is4vpicr6w.gif)

The engine sees the call stack is empty, so it's going to check the microtask queue once again to see if tasks are queued. Nope, the microtask queue is all empty.

It's time to check the **(macro)task queue**: the `setTimeout` callback is still waiting there! The `setTimeout` callback gets popped on to the callstack. The callback function returns the `console.log` method, which logs the string `"In timeout!"`. The `setTimeout` callback get popped off the callstack.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--hPFPTZp2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/p54casaaz9oq0g8ztpi5.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--hPFPTZp2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/p54casaaz9oq0g8ztpi5.gif)

Finally, all done! 🥳 It seems like the output we saw earlier wasn't so unexpected after all.

* * *

[](#asyncawait)Async/Await
--------------------------

ES7 introduced a new way to add async behavior in JavaScript and make working with promises easier! With the introduction of the `async` and `await` keywords, we can create **async** functions which implicitly return a promise. But.. how can we do that? 😮

Previously, we saw that we can explicitly create promises using the `Promise` object, whether it was by typing `new Promise(() => {})`, `Promise.resolve`, or `Promise.reject`.

Instead of explicitly using the `Promise` object, we can now create asynchronous functions that _implicitly_ return an object! This means that we no longer have to write any `Promise` object ourselves.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--5ED_HyNC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/72lqrcvy9lc8ehbpitd0.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--5ED_HyNC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/72lqrcvy9lc8ehbpitd0.png)

Although the fact that **async** functions implicitly return promises is pretty great, the real power of `async` functions can be seen when using the `await` keyword! With the `await` keyword, we can _suspend_ the asynchronous function while we wait for the `await`ed value return a resolved promise. If we want to get the value of this resolved promise, like we previously did with the `then()` callback, we can assign variables to the `await`ed promise value!

So, we can _suspend_ an async function? Okay great but.. what does that even mean?

Let's see what happens when we run the following block of code:

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--aOWmZxnV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/e5duygomitj9o455107a.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--aOWmZxnV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/e5duygomitj9o455107a.gif)

Hmm.. What's happening here?

* * *

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--bfscMU3t--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/d27d7xxiekczftjyic4b.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--bfscMU3t--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/d27d7xxiekczftjyic4b.gif)

First, the engine encounters a `console.log`. It gets popped onto the call stack, after which `Before function!` gets logged.

* * *

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--wN7yFTnt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9wqej2269vmntfcuxs9t.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--wN7yFTnt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9wqej2269vmntfcuxs9t.gif)

Then, we invoke the async function `myFunc()`, after which the function body of `myFunc` runs. On the very first line within the function body, we call another `console.log`, this time with the string `In function!`. The `console.log` gets added to the call stack, logs the value, and gets popped off.

* * *

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--lX9JfreE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/lch6lutxnl88j0durpyh.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--lX9JfreE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/lch6lutxnl88j0durpyh.gif)

The function body keeps on being executed, which gets us to the second line. Finally, we see an `await` keyword! 🎉

The first thing that happens is that the value that gets awaited gets executed: the function `one` in this case. It gets popped onto the call stack, and eventually returns a resolved promise. Once the promise has resolved and `one` returned a value, the engine encounters the `await` keyword.

When encountering an `await` keyword, the `async` function gets _suspended_. ✋🏼 The execution of the function body **gets paused**, and the rest of the async function gets run in a _microtask_ instead of a regular task!

* * *

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--UC78HoCO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/b6l3psgewvtrtmrr60tg.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--UC78HoCO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/b6l3psgewvtrtmrr60tg.gif)

Now that the async function `myFunc` is suspended as it encountered the `await` keyword, the engine jumps out of the async function and continues executing the code in the execution context in which the async function got called: the **global execution context** in this case! 🏃🏽‍♀️

* * *

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--V8u36kEG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/hlhrtuspjyrstifubdhs.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--V8u36kEG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/hlhrtuspjyrstifubdhs.gif)

Finally, there are no more tasks to run in the global execution context! The event loop checks to see if there are any microtasks queued up: and there are! The async `myFunc` function is queued up after resolving the valued of `one`. `myFunc` gets popped back onto the call stack, and continues running where it previously left off.

The variable `res` finally gets its value, namely the value of the resolved promise that `one` returned! We invoke `console.log` with the value of `res`: the string `One!` in this case. `One!` gets logged to the console and gets popped off the call stack! 😊

Finally, all done! Did you notice how `async` functions are different compared to a promise `then`? The `await` keyword _suspends_ the `async` function, whereas the Promise body would've kept on being executed if we would've used `then`!

* * *

Hm that was quite a lot of information! 🤯 No worries at all if you still feel a bit overwhelmed when working with Promises, I personally feel that it just takes experience to notice patterns and feel confident when working with asynchronous JavaScript.

However, I hope that the "unexpected" or "unpredictable" behavior that you might encounter when working with async JavaScript makes a bit more sense now!

And as always, feel free to reach out to me! 😊

If you want to know more about promises **states** (and **fates**!), this Github repo does an excellent job explaining the differences.


[Source](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)