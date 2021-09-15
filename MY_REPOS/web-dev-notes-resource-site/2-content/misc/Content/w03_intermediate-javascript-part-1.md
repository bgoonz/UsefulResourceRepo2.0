# WEEK 3<br>*Intermediate JavaScript (Part 1)* {ignore=true}
________________________________________________________________________________

<!-- code_chunk_output -->

[**Asynchronous JS Learning Objectives**](#asynchronous-js-learning-objectives)
- [Better Late Than Never: An Intro to Asynchronous JavaScript](#better-late-than-never-an-intro-to-asynchronous-javascript)
  - [Synchronous vs asynchronous code](#synchronous-vs-asynchronous-code)
  - [Why do we need asynchronous code?](#why-do-we-need-asynchronous-code)
- [All in Good Time: Setting Timeouts and Intervals](#all-in-good-time-setting-timeouts-and-intervals)
  - [Time-out! What are the arguments?](#time-out-what-are-the-arguments)
  - [Cancelling timeouts](#cancelling-timeouts)
  - [Running Intervals](#running-intervals)
- [Hanging by a Single Thread: A Yarn on JavaScript's Execution](#hanging-by-a-single-thread-a-yarn-on-javascripts-execution)
  - [Single-threaded vs multi-threaded execution](#single-threaded-vs-multi-threaded-execution)
  - [Keeping the thread from unraveling](#keeping-the-thread-from-unraveling)
- [Stacking the Odds in our Favor: the Call Stack](#stacking-the-odds-in-our-favor-the-call-stack)
  - [The call stack](#the-call-stack)
  - [The practical consequences of the call stack](#the-practical-consequences-of-the-call-stack)
- [An Unexpected Turn of Events: the event loop and Message Queue](#an-unexpected-turn-of-events-the-event-loop-and-message-queue)
  - [The event loop](#the-event-loop)
- [Reading Between the Lines: Getting User Input and Callback Chaining](#reading-between-the-lines-getting-user-input-and-callback-chaining)
  - [Node's readline module](#nodes-readline-module)
  - [Callback chaining](#callback-chaining)
- [Timeout Project](#timeout-project)
- [Guessing Game Project](#guessing-game-project)
  - [The Objective](#the-objective)
  - [Phase I: Too High? Too Low? Who knows.](#phase-i-too-high-too-low-who-knows)
  - [Phase II: Making it Random](#phase-ii-making-it-random)
  - [Bonus: Limiting the number of turns](#bonus-limiting-the-number-of-turns)

[**Node.js Learning Objectives**](#nodejs-learning-objectives)
[**Git Learning Objectives**](#git-learning-objectives)
- [A Tale of Two Runtimes: Node.js vs Browser](#a-tale-of-two-runtimes-nodejs-vs-browser)
  - [Same specification, different implementation](#same-specification-different-implementation)
  - [Differences between Node.js and browsers](#differences-between-nodejs-and-browsers)
- [The Ins and Outs of File I/O in Node](#the-ins-and-outs-of-file-io-in-node)
  - [The fs module](#the-fs-module)
  - [Fancy File I/O](#fancy-file-io)
- ["Gitting" Started With Git!](#gitting-started-with-git)
  - [A little history](#a-little-history)
  - [Git basics](#git-basics)
  - [Connecting with the world via GitHub](#connecting-with-the-world-via-github)
- [Browsing Your Git Repository](#browsing-your-git-repository)
  - [Seeing changes in real time](#seeing-changes-in-real-time)
  - [Time travel](#time-travel)
- [Git Do-Overs: Reset & Rebase](#git-do-overs-reset-rebase)
  - [Resetting the past](#resetting-the-past)
  - [Starting small: Soft resets](#starting-small-soft-resets)
  - [Getting riskier: Mixed resets](#getting-riskier-mixed-resets)
  - [Red alert! Hard resets](#red-alert-hard-resets)
  - [Rebase: An alternative form of time travel](#rebase-an-alternative-form-of-time-travel)
  - [Okay, rebasing is risky! Show me anyway.](#okay-rebasing-is-risky-show-me-anyway)
  - [One last warning & the "Golden Rule of Git"](#one-last-warning-the-golden-rule-of-git)
- [Git Merge Conflicts & You](#git-merge-conflicts-you)
  - [What is a "merge conflict"?](#what-is-a-merge-conflict)
  - [Resolving a merge conflict](#resolving-a-merge-conflict)
  - [Conflict Resolution](#conflict-resolution)
  - [Back on solid ground](#back-on-solid-ground)
- ["Scrum" Stands For ... Nothing!](#scrum-stands-for-nothing)
  - [The standard Scrum process](#the-standard-scrum-process)
  - [The Scrum practices](#the-scrum-practices)
  - [Scrum roles](#scrum-roles)
  - [Scrum activities. Scrum artifacts.](#scrum-activities-scrum-artifacts)
  - [Running the sprint](#running-the-sprint)
- [Let's Talk About Sprints](#lets-talk-about-sprints)
  - [Put your sprint in a pretty timebox](#put-your-sprint-in-a-pretty-timebox)
  - [Take advantage of this short-term deal!](#take-advantage-of-this-short-term-deal)
  - [The duration remains the same](#the-duration-remains-the-same)
  - [Keeping your eye on the goal](#keeping-your-eye-on-the-goal)
  - [What is "done"?](#what-is-done)
- [Requirements and User Stories](#requirements-and-user-stories)
  - [A PBI is a conversation waiting to happen](#a-pbi-is-a-conversation-waiting-to-happen)
  - [Refining the refinements](#refining-the-refinements)
  - [User stories](#user-stories)
  - [How much detail is enough?](#how-much-detail-is-enough)
  - [Good stories are INVESTments](#good-stories-are-investments)
- [Censor Project](#censor-project)
  - [The Objective](#the-objective-1)
  - [Phase 1: Setting Up and Censoring Sentences](#phase-1-setting-up-and-censoring-sentences)
  - [Phase 2: Interacting with the user](#phase-2-interacting-with-the-user)
  - [Phase 3: Parsing the dictionary](#phase-3-parsing-the-dictionary)
  - [Bonus: Pick a file, any file](#bonus-pick-a-file-any-file)
- [Global Replace Project](#global-replace-project)
  - [The Objective](#the-objective-2)
  - [Phase 1: Setup and Command Line Arguments](#phase-1-setup-and-command-line-arguments)
  - [Phase 2: Simple string replacement and file reading](#phase-2-simple-string-replacement-and-file-reading)
  - [Phase 3:](#phase-3)
  - [Bonus: Replacing the first 'n' occurrences](#bonus-replacing-the-first-n-occurrences)
- [Repo Madness Project: Managing Your Code With Git](#repo-madness-project-managing-your-code-with-git)
  - [Phase 1: Laying the foundation](#phase-1-laying-the-foundation)
  - [Phase 2: Exploring our timeline](#phase-2-exploring-our-timeline)
  - [Phase 2a: Looking around without moving](#phase-2a-looking-around-without-moving)
  - [Phase 2b: Our first steps through time](#phase-2b-our-first-steps-through-time)
  - [Phase 3: Changing history](#phase-3-changing-history)
  - [Phase 4: Choose your fate](#phase-4-choose-your-fate)

[**Command Line Interface Basics Learning Objectives**](#command-line-interface-basics-learning-objectives)
- [Navigating Your Filesystem](#navigating-your-filesystem)
  - [Getting the lay of the land](#getting-the-lay-of-the-land)
  - [Getting around](#getting-around)
  - [Making changes](#making-changes)
- [Common Tasks On The Command Line](#common-tasks-on-the-command-line)
  - [`grep` marks the spot](#grep-marks-the-spot)
  - [Teach yourself anything](#teach-yourself-anything)
  - [Command redirection](#command-redirection)
  - [Editing files directly from the CLI](#editing-files-directly-from-the-cli)
  - [Bringing the internet into your terminal](#bringing-the-internet-into-your-terminal)
- [Understanding The Shell](#understanding-the-shell)
  - [No turtles here!](#no-turtles-here)
  - [Customizing your environment](#customizing-your-environment)
  - [To Login or Not to Login](#to-login-or-not-to-login)
  - [No turtles here!](#no-turtles-here-1)
  - [Customizing your environment](#customizing-your-environment-1)
  - [To Login or Not to Login](#to-login-or-not-to-login-1)
- [Bash Permissions & Scripting](#bash-permissions-scripting)
  - [Understanding `sudo` and file permissions](#understanding-sudo-and-file-permissions)
  - [Bash scripting](#bash-scripting)
  - [Understanding `sudo` and file permissions](#understanding-sudo-and-file-permissions-1)
  - [Bash scripting](#bash-scripting-1)

[**Recursion Learning Objectives**](#recursion-learning-objectives)
- [Re-learning Functions With Recursion](#re-learning-functions-with-recursion)
  - [Re-what now?](#re-what-now)
  - [Two cases](#two-cases)
  - [A recursive example](#a-recursive-example)
- [When To Hold & When To Fold(Fold(Fold())): Recursion vs. Iteration](#when-to-hold-when-to-foldfoldfold-recursion-vs-iteration)
  - [A deeper dive into recursion](#a-deeper-dive-into-recursion)
  - [When to iterate, when to recur](#when-to-iterate-when-to-recur)
  - [Compare these approaches](#compare-these-approaches)
- [Recursion Problems](#recursion-problems)
- [Debugging A Stack Overflow](#debugging-a-stack-overflow)

[**JS Trivia Learning Objectives**](#js-trivia-learning-objectives)
- [Stop Feeling Iffy about IIFEs!](#stop-feeling-iffy-about-iifes)
  - [Quick review of function expressions](#quick-review-of-function-expressions)
  - [IIFE syntax](#iife-syntax)
  - [IIFEs keep functions and variables private](#iifes-keep-functions-and-variables-private)
- [Interpolation in JavaScript](#interpolation-in-javascript)
  - [Let's talk syntax](#lets-talk-syntax)
- [Object Keys in JavaScript](#object-keys-in-javascript)
  - [A symbol of unique freedom](#a-symbol-of-unique-freedom)
  - [Symbols vs. Strings as keys in Objects](#symbols-vs-strings-as-keys-in-objects)
  - [Primitive Data Types in Depth](#primitive-data-types-in-depth)
  - [Data types in JavaScript](#data-types-in-javascript)
  - [Methods and the object type](#methods-and-the-object-type)
  - [Primitives with object wrappers](#primitives-with-object-wrappers)
- [Unassigned Variables in JavaScript](#unassigned-variables-in-javascript)
  - [The default value of variables](#the-default-value-of-variables)
  - [The difference between default values and hoisting](#the-difference-between-default-values-and-hoisting)
- [WhiteBoarding Problem](#whiteboarding-problem)
  - [The Question](#the-question)
  - [The Answer](#the-answer)

<!-- /code_chunk_output -->
________________________________________________________________________________
# WEEK-03 DAY-1<br>*Asynchronous Functions* {ignore=true}
________________________________________________________________________________
# Asynchronous JS Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Identify JavaScript as a language that utilizes an event loop model
2. Identify JavaScript as a single threaded language
3. Describe the difference between asynchronous and synchronous code
4. Execute the asynchronous function setTimeout with a callback.
5. Given the function "function asyncy(cb) { setTimeout(cb, 1000);
   console.log("async") }" and the function "function callback() {
   console.log("callback"); }", predict the output of "asyncy(callback);"
6. Use setInterval to have a function execute 10 times with a 1 second period.
   After the 10th cycle, clear the interval.
7. Write a program that accepts user input using Node’s readline modulrminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Identify JavaScript as a language that utilizes an event loop model
2. Identify JavaScript as a single threaded language
3. Describe the difference between asynchronous and synchronous code
4. Execute the asynchronous function setTimeout with a callback.
5. Given the function "function asyncy(cb) { setTimeout(cb, 1000);
   console.log("async") }" and the function "function callback() {
   console.log("callback"); }", predict the output of "asyncy(callback);"
6. Use setInterval to have a function execute 10 times with a 1 second period.
   After the 10th cycle, clear the interval.
7. Write a program that accepts user input using Node’s readline module
________________________________________________________________________________
# Better Late Than Never: An Intro to Asynchronous JavaScript

Every programming language has features that distinguish it from the rest of the
pack. The heavy usage of callbacks is one such pattern that characterizes
JavaScript. We pass callbacks as arguments as a way to execute a series of
commands at a later time. However, what happens if there is no guarantee exactly
_when_ that callback is executed? We've explored callbacks extensively thus far
in the course, but it's time to add another wrinkle - how can we utilize
callbacks _asynchronously_?

When you finish this article, you should be able to:

- Describe the difference between synchronous and asynchronous code
- Give one example illustrating why we would need to deal with asynchronous code

## Synchronous vs asynchronous code

Let's begin by exploring the difference between **synchronous** and
**asynchronous** code. Luckily, you are already familiar with the former. In
fact, all of the code you have written thus far in the course has been
synchronous.

### Synchronous

If code is **synchronous**, that means that there is an inherent order among the
commands and this order of execution is _guaranteed_.

Here is a simple example of synchronous code:

```javascript
console.log("one");
console.log("two");
console.log("three");
```

This seems trivial, but it is important to recognize. It is guaranteed that
'one' will be printed before 'two' and 'two' will be printed before 'three'.
Taking this a step further, you also know that the order of execution may not
always simply be the positional order of the lines in the code:

```javascript
let foo = function() {
  console.log("two");
};

console.log("one");
foo();
console.log("three");
```

Although the command `console.log("two")` appears before `console.log("one")` in
terms of the line numbers of the script, we know that this code will still print
'one', 'two', 'three' because we understand the rules of JavaScript evaluation.
Although the execution may jump around to different line numbers as we call and
return from functions, the above code is still synchronous. The above code is
synchronous because we can predict with total certainty the relative order of
the print statements.

### Asynchronous

If code is **asynchronous**, that means that there is no guarantee in the total
order that commands are executed. Asynchronous is the opposite of synchronous.

Since this is our first encounter with asynchronicity, we'll need to introduce a
new function to illustrate this behavior. The [setTimeout][set-timeout] method
will execute a callback after a given amount of time. We can pass a callback and
an amount of time in milliseconds as arguments to the method:

```javascript
setTimeout(function() {
  console.log("time is up!");
}, 1500);
```

If we execute the above code, 'time is up!' will be print after about one and a
half seconds. Paste the above code to a `.js` file and execute it to see this
behavior for yourself!

Let's add some other print statements into the mix:

```javascript
console.log("start");

setTimeout(function() {
  console.log("time is up!");
}, 1500);

console.log("end");
```

If we execute the above snippet, we will see the output in this order inside of
our terminal:

```plaintext
start
end
time is up!
```

Surprised? Although we call the function `setTimeout`, it does not block
execution of the lines after it (like `console.log("end")`). That is, while the
timer ticks down for the `setTimeout` we will continue to execute other code.
This is because `setTimeout` is **asynchronous**!

#### Can't believe it's async?

The healthy skeptic may notice that we defined the term _asynchronous_ code as
code where there is no guaranteed order among its commands - but, couldn't we
just specify timeout periods such that we _could_ orchestrate some order to the
code? The skeptic may write the following code arguing that we can predict a
print order of 'first' then 'last':

```javascript
setTimeout(function() {
  console.log("last");
}, 3000);

setTimeout(function() {
  console.log("first");
}, 1000);
```

Surely if we wait 3 seconds for 'last' and only 1 second for 'first', then we'll
see 'first' then 'last', right? By providing sufficiently large timeout periods,
hasn't the skeptic proven `setTimeout` to be synchronous?

The answer is a resounding **no; we cannot treat `setTimeout` as synchronous
under any circumstance**. The reason is that the time period specified to
`setTimeout` is not exact, rather it is the _minimum_ amount of time that will
elapse before executing the callback (cue the title of this article). If we set
a timeout with 3 seconds, then we could wait 3 seconds, or 3.5 seconds, or even
10 seconds before the callback is invoked. If there is no guaranteed timing,
then it is asynchronous. The following snippet illustrates this concept
succinctly:

```javascript
console.log("first");

setTimeout(function() {
  console.log("second");
}, 0);

console.log("third");
```

This would print the following order:

```plaintext
first
third
second
```

Although we specify a delay of 0 milliseconds, the callback is not invoked
immediately, because the actual delay may be more than 0. This unintuitive
behavior is well known, in fact there is a [full section in the docs for
setTimeout][longer-timeouts-than-specified] devoted to this nuance. The reasons
for this discrepancy are not important for now. However, do take away the fact
that `setTimeout` is indeed asynchronous, no matter how hard we try to fight it.

> [setTimeout][set-timeout] is just one example of asynchronous behavior.
> Another asynchronous function is [setInterval][set-interval], which will
> continually execute a callback after a number of milliseconds, repeatedly.

## Why do we need asynchronous code?

We know how you are feeling. Asynchronous code seems intimidating. Before this
article, you've written exclusively synchronous code and have gotten quite far
using just that - so why do we need asynchronous code? The truth of the matter
is that the environment in which we run our applications is full of uncertainty;
there is seldom a guarantee of when actions occur, how long they will take, or
even if they will happen at all. A software engineer can write the code, but
they can't write the circumstances in which their code will run (we can dream).
Here are a few practical scenarios where asynchronous code is a necessity:

- When we request data from an external server over a network, we cannot predict
  when we will get receive a response back. The timing is susceptible to latency
  due to the amount of traffic on the network, the server being busy handling
  other requests, and much more.
- When we expect a user to interact with our programs by hitting a key, clicking
  a button, or scrolling down the page, we can never be certain when they will
  perform those actions.

These are a few problems that we will encounter in upcoming lessons and we'll
turn to asynchronous JavaScript for the solution!

## What you've learned

In this reading, we've introduced asynchronous code. In particular we have:

- explored the difference between synchronous and asynchronous with `setTimeout`
  as our asynchronous candidate
- identified asynchronous code as a solution to handle timing circumstances
  during our programs' runtime that we cannot predict with total certainty

[set-timeout]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
[set-interval]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
[longer-timeouts-than-specified]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified

________________________________________________________________________________
# All in Good Time: Setting Timeouts and Intervals

During our introduction to asynchronicity, we used `setTimeout` as a prime
example of a function that exhibits asynchronous behavior. We'll turn time and
time again to `setTimeout` in order to illustrate asynchronous concepts. Because
of this, let's familiarize ourselves with all the ways we can use the function!

When you finish this article, you should be able to:

- name the arguments that can be passed to `setTimeout` and `setInterval`
- predict the asynchronous nature of code snippets that utilize `setTimeout` and
  `setInterval`

## Time-out! What are the arguments?

In it's most basic usage, the [setTimeout][set-timeout-mdn] function accepts a
callback and an amount of time in milliseconds. Open a new `.js` file and
execute the following code:

```javascript
function foo() {
  console.log("food");
}

setTimeout(foo, 2000);
```

The code above will print out 'food' after waiting about two seconds. We
previously explored this behavior, but it's worth reemphasizing. `setTimeout` is
asynchronous, so any commands that come after the `setTimeout` may be executed
before the callback is called:

```javascript
function foo() {
  console.log("food");
}

setTimeout(foo, 2000);
console.log("drink");
```

The code above will print out 'drink' first and then 'food'. You may hear
asynchronous functions like `setTimeout` referred to as "non-blocking" because
they don't prevent the code that follows their invocation from running. It's
also worth mentioning that the time amount argument for `setTimeout` is
optional. If no amount is specified, then the amount will default to zero
(`setTimeout(foo)` is equivalent to `setTimeout(foo, 0`). Embellishing on this
thought for a moment, a common JavaScript developer interview question asks
candidates to predict the print order of the following code:

```javascript
function foo() {
  console.log("food");
}

setTimeout(foo, 0);
console.log("drink");
```

The code above will will print out 'drink' first and then 'food'. This is
because `setTimeout` is asynchronous so it will not block execution of further
lines. We have also previously mentioned that the amount specified is the
minimum amount of time that will be waited, [sometimes the delay will be
longer][mdn-delays-longer].

In addition to the callback and delay amount, an unlimited number of additional
arguments may be provided. After the delay, the callback will be called with
those provided arguments:

```javascript
function foo(food1, food2) {
  console.log(food1 + " for breakfast");
  console.log(food2 + " for lunch");
}

setTimeout(foo, 2000, "pancakes", "couscous");
```

The code above will print the following after about two seconds:

```plaintext
pancakes for breakfast
couscous for lunch
```

## Cancelling timeouts

You now have complete knowledge of all possible arguments we can use for
`setTimeout`, but what does it return? If we executing the following snippet in
node:

```javascript
function foo() {
  console.log("food");
}

const val = setTimeout(foo, 2000);
console.log(val);
```

We'll see that the return value of `setTimeout` is some special `Timeout`
object:

```javascript
Timeout {
  _called: false,
  _idleTimeout: 2000,
  _idlePrev: [TimersList],
  _idleNext: [TimersList],
  _idleStart: 75,
  _onTimeout: [Function: foo],
  _timerArgs: undefined,
  _repeat: null,
  _destroyed: false,
  [Symbol(unrefed)]: false,
  [Symbol(asyncId)]: 5,
  [Symbol(triggerId)]: 1
}
```

You won't be finding this object too useful except for one thing, cancelling an
timeout that has yet to expire! We can pass this object into the
[clearTimeout][clear-timeout-mdn] function:

```javascript
function foo() {
  console.log("food");
}

const val = setTimeout(foo, 2000);
clearTimeout(val);
```

The code above will not print out anything because the `setTimeout` is cleared
before the timer expires.

> You may notice that the MDN documentation for `setTimeout` and `clearTimeout`
> show that `setTimeout` returns a simple id number that can be used to cancel a
> pending timeout and not a fancy Timeout object as we have described. This
> variation is due to the fact that we are executing our code with NodeJS and
> not in the browser (MDN is specific to the browser environment). Rest assured,
> in either environment, if you pass the data that is returned from `setTimeout`
> to `clearTimeout`, the timeout will be cancelled!

## Running Intervals

Similar to `setTimeout`, there also exists a [setInterval][set-interval-mdn]
that function that executes a callback repeatedly at the specified delay.
`setInterval` accepts the same arguments as `setTimeout`:

```javascript
function foo(food1, food2) {
  console.log(food1 + " and " + food2 + "!");
}

setInterval(foo, 1000, "pancakes", "couscous");
```

The code above will print out 'pancakes and couscous!' every second. Someone's
hungry! Like you would expect, there is also a [clearInterval][clear-interval-mdn] that
we can use to cancel an interval!

## What you've learned

In this reading we covered:

- what arguments `setTimeout` and `setInterval` can accept: callback, delay in
  ms, and any number of arguments to be passed to the callback
- how to cancel a timeout or interval with `clearTimeout` and `clearInterval`

[set-timeout-mdn]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
[set-interval-mdn]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
[clear-timeout-mdn]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout
[clear-interval-mdn]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
[mdn-delays-longer]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified

________________________________________________________________________________
# Hanging by a Single Thread: A Yarn on JavaScript's Execution

The primary job of the programmer is to write code and to that end you have
written hundreds, possibly thousands of lines so far. However, it is important
for a programmer to understand the bigger picture. After we finish writing the
code, what should we do with it? Publish it in a book? Print it to frame on
wall? None of these. After we write the code, we run it! If writing code is the
birth of a program, then its execution is the lifetime that takes place after. A
lifetime full of highs and lows; some expected events and some unexpected.
Instead of "lifetime", programmers use the word "runtime" to refer to the
execution of a program.

Let's take a peek under the hood of the JavaScript runtime environment to get a
glimpse at how the code we write is processed.

When you finish reading this article, you should be able to:

- explain the difference between _single-threaded_ and _multi-threaded_
  execution
- identify JavaScript as a _single-threaded_ language

## Single-threaded vs multi-threaded execution

In programming, we use the term _thread of execution_ (_thread_ for short) to
describe a sequence of commands. A thread consists of well-ordered commands in
the same way that a task may consist of multiple steps. For example, the task
(thread) of doing laundry may consist of the following steps (commands):

1. open the washing machine door
2. load the washing machine with clothes
3. add some detergent
4. close the washing machine door
5. turn the washing machine on

For the most part, the relative order of these steps is critical to the task.
For example, we can only load the clothes after opening the door and _should_
only turn the machine on after closing the door.

Now that we have an understanding of what a _thread_ is, let's use a similar
analogy to explore two different models of threading. Enter _Appetite Academy_,
the restaurant where patrons only have to pay the bill once they are full.

We'll be exploring these two models:

![single-vs-multi-threading][threading-image]

### Single-threaded

In **single-threaded** execution, only one command can be processed at a time.

Say that a patron at Appetite Academy ordered a three course meal including a
salad (appetizer), a burger (main entree), and a pie (dessert). Each dish has
its own steps to be made. If the restaurant had a single-threaded kitchen, we
might see one chef in the kitchen preparing each dish one after the other. To
ensure that the customer receives the dishes in order, the lone chef would
likely plate a dish fully before beginning preparation of the next dish. A
shortcoming of this single chef kitchen is that the customer may have to wait
some time between dishes. On the flip side, only employing one chef is cheap for
the restaurant. Having one chef also keeps the kitchen relatively simple;
multiple chefs may complicate things. With one chef the restaurant avoids any
confusion that can result from "too many cooks in the kitchen."

Similar to having a single chef in the kitchen, **JavaScript is a
single-threaded language.** This means at any instance in time during a program,
only one command is being executed.

### Multi-threaded

In **multi-threaded** execution, multiple commands can be processed at the same
time.

If Appetite Academy had a multi-threaded kitchen, it would be quite a different
scene. We might find three different chefs, each working on a different dish.
This would likely cut down on the amount of time the customer spends waiting for
dishes. This seems like a big enough reason to prefer multi-threading, but it's
not without tradeoffs. Employing more chefs would increase costs. Furthermore,
the amount of time that is saved may not be as large as we think. If the chefs
have to share resources like a single sink or single stove, then they would have
to wait for those resources to be freed up before continuing preparation of
their respective dishes. Finally, having multiple chefs can increase the
complexity inside of the kitchen; the chefs will have to painstakingly
communicate and coordinate their actions. If we don't orchestrate our chefs,then
they might fight over the stove or mistakenly serve the dishes in the wrong
order!

A thread (chef) can still only perform one command at a time, but with many
threads we could save some time by performing some steps in parallel across many
threads.

## Keeping the thread from unraveling

Now that we've identified JavaScript as a single-threaded language, let's
introduce a problem that all single-threaded runtimes must face. If we can only
execute a single command at a time, what happens if we are in the process of
carrying out a command and an "important" event occurs that we want to handle
immediately? For example, if the user of our program presses a key, we would
want to handle their input as quickly as possible in order to provide a smooth,
snappy experience. The JavaScript runtime's solution to this is quite simple:
the user will have to wait. If a command is in progress and some event occurs,
the current command will run to full completion before the event is handled. If
the current command takes a long time, too bad; you'll have to wait longer. Cue
the very frustrating "We're sorry, the page has become unresponsive" message you
may be familiar with.

Execute the following snippet to illustrate this behavior:

```javascript
setTimeout(function() {
  console.log("times up!");
}, 1000);

let i = 0;
while (true) {
  i++;
}
```

The above program will hang indefinitely, never printing 'times up!' (press
`ctrl/cmd + c` in your terminal to kill the program). Let's break this down.
When the program begins, we set a timeout for one second, then enter an infinite
loop. While the loop is running, the timer expires, triggering a timeout event.
However, JavaScript's policy for handling new events is to only handle the next
event _after_ the current command is complete. Since the current command is an
infinite loop, the current command will _never_ complete, so the timeout event
will _never_ be handled.

Although this example seems contrived, it highlights one of the primary causes
of slow, unresponsive pages. Up next, we'll take a closer look at this issue and
how we can mitigate it.

## What you've learned

In this reading we were able to:

- compare and contrast _single-threaded_ and _multi-threaded_ execution through
  the analogy of a single-chef and multi-chef kitchen
- identify JavaScript as a _single-threaded_ language and;
- bring awareness to how its _single-threaded_ nature can cause unresponsive
  programs if left unchecked

[threading-image]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/threading.png

________________________________________________________________________________
# Stacking the Odds in our Favor: the Call Stack

We've written a lot of programs so far in this course and sometimes they are
quite complex. They may be complex in their execution since function calls and
returns cause control flow to jump around to different lines, instead of just
sequentially by increasing line number. Ever wonder how the JavaScript runtime
is able to track all of those function calls? You're in luck! It's time to
explore an important component of the JavaScript runtime: the **call stack**.

When you finish reading this article, you should be able to:

- identify the two operations that characterize a **stack** data structure
- sketch how the **call stack** is manipulated during the runtime of a simple
  program like the one provided in this reading

## The call stack

The **call stack** is a structure that JavaScript uses to keep track of the
evaluation of function calls. It uses the **stack** data structure. In Computer
Science, a "stack" is a general pattern of organizing a collection of items. For
our current use of a stack, the items being organized are the function calls
that occur during the execution of our program. We'll be exploring stacks in
great detail further in the course. For now, we can imagine a stack as a
vertical pile that obeys the following pattern:

- new items must be placed on top of the pile - we refer to this as **pushing**
  a new item to the stack
- at any point, the only item that can be removed is the top of the pile - we
  refer to this as **popping** the top item from the stack

In JavaScript's call stack, we use the term "stack frames" to describe the items
that are being pushed and popped. With this new understanding, we can now
identify two ways that JavaScript leverages these stack mechanics during
runtime:

- when a function is called, a new frame is pushed onto the stack.
- when a function returns, the frame on the top of the stack is popped off the
  stack.

To illustrate how frames are pushed and popped to the call stack, we'll explore
the following program:

```javascript
function foo() {
  console.log("a");
  bar();
  console.log("e");
}

function bar() {
  console.log("b");
  baz();
  console.log("d");
}

function baz() {
  console.log("c");
}

foo();
```

Create a file for yourself and execute this code. It will print out the letters
in order. This code is a great example of how a program's execution may not
simply be top down. Instead of executing sequentially, line by line, we know
that function calls and returns will cause execution to hop back and forth to
different line numbers. Let's trace through this program, visualizing the stack.
We'll use a commented arrow to denote where we pause execution to visualize the
stack at that moment.

We begin by executing a function call, `foo()`. This will add a frame to the
stack:

![stack-trace-image-1][stack-trace-01]

Now that `foo()` is the topmost (and only) frame on the stack, we must execute
the code inside of that function definition. This means that we print 'a' and
call `bar()`. This causes a new frame to be pushed to the stack:

![stack-trace-image-2][stack-trace-02]

Note that the stack frame for `foo()` is still on the stack, but not on top
anymore. The only time a frame may entirely leave that stack is when it is
popped due to a function return. Bear in mind that a function can return due to
a explicit return with a literal line like `return someValue;` or it can
implicitly return after the last line of the function's definition is executed.
Since `bar()` is now on top of the stack, execution jumps into the definition of
`bar`. You may notice the trick now: the frame that is at the top of the stack
represents the function being executed currently. Back to the execution, we
print 'b' and call `baz()`:

![stack-trace-image-3][stack-trace-03]

Again, notice that `bar()` remains on the stack because that function has not
yet returned. Executing `baz`, we print out 'c' and return because there is no
other code in the definition of `baz`. This return means that `baz()` is popped
from the stack:

![stack-trace-image-4][stack-trace-04]

Now `bar()` is back on top of the stack; this makes sense because we must
continue to execute the remaining code within `bar` on line 10:

![stack-trace-image-5][stack-trace-05]

'd' is printed out and `bar` returns because there is no further code within its
definition. The top of stack is popped. `foo()` is now on top, which means
execution resumes inside of `foo`, line 4:

![stack-trace-image-6][stack-trace-06]

Finally, 'e' is printed and `foo` returns. This means the top frame is popped,
leaving the stack empty. Once the stack is empty, our program can exit:

![stack-trace-image-7][stack-trace-07]

That completes our stack trace! Here are three key points to take away from
these illustrations:

1. the frame on the top of the stack corresponds to the function currently being
   executed
2. calling a function will push a new frame to the top of the stack
3. returning from a function will pop the top frame from the stack

> This was a high level overview of the call stack. There is some detail that
> we've omitted to bring attention to the most important mechanics. In
> particular, we've glazed over what information is actually stored inside of a
> single stack frame. For example, a stack frame will contain data about a
> specific function call such as local variables, arguments, and which line to
> return to after the frame is popped!

## The practical consequences of the call stack

Now that we have an understanding of the call stack, let's discuss its practical
implications. We've previously identified JavaScript as a single-threaded
language and now you know why that's the case. The use of a single call stack
leads to a single thread of execution! The JavaScript runtime can only perform
one "command" at a time and the one "command" currently being executed is
whatever is at the top of the stack.

In the example program we just traced through, we mentioned that the program
will exit once the call stack is empty. This is not true of all programs. If a
program is asynchronously listening for an event to occur, such as waiting for a
`setTimeout` to expire, then the program will not exit. In this scenario, once
the `setTimeout` timer expires, a stack frame corresponding to the `setTimeout`
callback will be added to the stack. From here, the call stack would be
processed in the way we previously explored. Imagine that we had the same
functions as before, but we called `foo` asynchronously:

```javascript
function foo() {
  console.log("a");
  bar();
  console.log("e");
}

function bar() {
  console.log("b");
  baz();
  console.log("d");
}

function baz() {
  console.log("c");
}

setTimeout(foo, 2500);
```

The critical behavior to be aware of in the JavaScript runtime is this: **an
event can only be handled once the call stack is empty**. Recall that events can
be things other than timeouts, such as the user clicking a button or hitting a
key. Because we don't want to delay the handling of such important events, we
want minimize the amount of time that the call stack is non-empty. Take this
extreme scenario:

```javascript
function somethingTerrible() {
  let i = 0;
  while (true) {
    i++;
  }
}

setTimeout(function() {
  console.log("time to do something really important!");
}, 1000);

somethingTerrible();
```

`somethingTerrible()` will be pushed to the call stack and loop infinitely,
causing the function to never return. We expect the `setTimeout` timer to expire
while `somethingTerrible()` is still on the stack. Since `somethingTerrible()`
never returns, it will never be popped from the stack, so our `setTimeout`
callback will never have its own turn to be executed on the stack.

## What you've learned

In this reading, we have:

- explored how the _call stack_ is manipulated over the runtime of a program
- identified that events can only be handled once the _call stack_ is empty

[stack-trace-01]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/stack-trace/01.png
[stack-trace-02]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/stack-trace/02.png
[stack-trace-03]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/stack-trace/03.png
[stack-trace-04]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/stack-trace/04.png
[stack-trace-05]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/stack-trace/05.png
[stack-trace-06]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/stack-trace/06.png
[stack-trace-07]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/stack-trace/07.png

________________________________________________________________________________
# An Unexpected Turn of Events: the event loop and Message Queue

As of late, we've begun to uncover the asynchronous potential of JavaScript and
how we can harness that potential to handle unpredictable events that occur
during our application's runtime. JavaScript is the tool that enables web pages
to be interactive and dynamic. For example, if we head to a site like
[appacademy.io][aa-homepage] and click a button in the header, the page changes
due to that click event. We can click on that button _whenever_ we want and
somehow JavaScript is able to handle it _asynchronously_. How exactly does
JavaScript handle these events?

When you finish reading this article, you should be able to:

- explain how the JavaScript runtime uses the _call stack_ and **message queue**
  in its **event loop**
- identify the two operations that characterize a **queue** data structure

## The event loop

JavaScript uses an **event loop** model of execution. We've previously been
introduced to one component of the event loop, the _call stack_. We identified
the call stack as the structure used to keep track of the execution of function
calls. Think of the call stack as keeping track of the current "task" in
progress. To clarify, a single task may consist of multiple function calls. For
example if a function `foo` calls function `bar` and `bar` calls function `baz`,
then we consider all three functions as making progress toward the same task.

Along with the call stack, the event loop also consists of a **message queue**.
While the call stack tracks the task that is currently in progress, the message
queue keeps track of tasks that cannot be executed at this moment, but will be
executed once the current task is finished (recall that tasks can only be
performed one at a time because JavaScript is single-threaded). Because of this,
you may hear JavaScript's execution pattern referred to as "run to completion".
That is, the execution of an ongoing task will never be interrupted by another
task.

> In some other programming languages, it is possible for an ongoing task to be
> preempted or interrupted by another task, but this is not the case in
> JavaScript

### The message queue

The message queue is a structure used to track the handling of events. It uses
the **queue** data structure. A "queue" is a general pattern of organizing a
collection of things. A real world example of a queue is the line that you wait
on for checkout at a grocery store. A queue has a front and back, and obeys the
following pattern:

- new items are added to the back of queue - we refer to this as **enqueueing**
  an item
- items can only leave through the front of the queue - we refer to this as
  **dequeueing** an item

Events in JavaScript are handled asynchronously with callbacks. Like always, the
events can be things such as a `setTimeout` expiring or the user clicking a
button. The items stored on the message queue correspond to events that have
occurred but have not yet been processed. The items stored on the queue are
referred to as "messages".

To illustrate how the message queue and call stack interact, we'll trace the
runtime of the following program:

```javascript
function somethingSlow() {
  // some terribly slow implementation
  // assume that this function takes 4000 milliseconds to return
}

function foo() {
  console.log("food");
}

function bar() {
  console.log("bark");
  baz();
}

function baz() {
  console.log("bazaar");
}

setTimeout(foo, 1500);
setTimeout(bar, 1000);
somethingSlow();
```

The message queue only grows substantially when the current task takes a
nontrivial amount of time to complete. If the runtime isn't already busy tending
to a task, then new messages can be processed immediately because they wait
little to no time on the queue. For our illustration, we'll take creative
liberty and assume that some messages _do_ have to wait on the queue because the
`somethingSlow` function takes 4000 milliseconds to complete! We'll use absolute
time in milliseconds to tell our story in the following diagrams, but the
reality is that we can't be certain of the actual timing. The absolute time in
milliseconds is not important, instead focus your attention to the relative
order of the stack and queue manipulations that take place.

We begin by setting a timeout for both `foo` and `bar` with 1500 and 1000 ms
respectively. Apart from the stack frames for the calls to the `setTimeout`
function itself (which we'll ignore for simplicity), no items are added to the
stack or queue. We don't manipulate the queue because a new message is only
enqueued when an event occurs and our timeout events have not yet triggered. We
don't add `foo()` or `bar()` to the stack because they are only called after
their timeout events have triggered. However, we do add `somethingSlow()` to the
stack because it is called synchronously. Imagine we are at about the 500 ms
mark, `somethingSlow()` is being processed on the stack, while our two timeout
events have not yet triggered:

![event-loop-image-01][event-loop-01]

At the 1000 ms mark, `somethingSlow()` is still being processed on the stack
because it needs a total of 4000 ms to return. However, at this moment, the
timeout event for `bar` will trigger. Because there is something still on the
stack, `bar` cannot be executed yet. Instead, it must wait on the queue:

![event-loop-image-02][event-loop-02]

At the 1500 ms mark, a similar timeout event will occur for `foo`. Since new
messages are enqueued at the back of the queue, the message for the `foo` event
will wait behind our existing `bar` message. This is great because once the call
stack becomes available to execute the next message, we ought to execute the
message for the event that happened first! It's first come, first serve:

![event-loop-image-03][event-loop-03]

Jumping to the 4000 ms mark, `somethingSlow()` finally returns and is popped
from the call stack. The stack is now available to process the next message. The
message at the front of the queue, `bar`, is placed on the stack for evaluation:

![event-loop-image-04][event-loop-04]

At the 4100 ms mark, `bar()` execution is in full swing. We have just printed
"bark" to the console and `baz()` is called. This new call for `baz()` is pushed
to the stack.

![event-loop-image-05][event-loop-05]

You may have noticed that `baz` never had to wait on the queue; it went directly
to the stack. This is because `baz` is called synchronously during the execution
of `bar`.

At the 4200 ms mark, `baz()` has printed "bazaar" to the console and returns.
This means that the `baz()` stack frame is popped:

![event-loop-image-06][event-loop-06]

At the 4250 ms mark, execution resumes inside of `bar()` but there is no other
code to evaluate inside. The function returns and `bar()` is popped. Now that
the stack is free, the next message is taken from the queue to evaluate:

![event-loop-image-07][event-loop-07]

Finally, "food" is printed and the stack is popped. Leaving us with an empty
call stack and message queue:

![event-loop-image-08][event-loop-08]

That's all there is to it! Tracing the call stack and message queue for more
complex programs is very tedious, but the underlying mechanics are the same. To
summarize, synchronous tasks are performed on the stack. While the current task
is being processed on the stack, incoming asynchronous events wait on the queue.
The queue ensures that events which occurred first will be handled before those
that occurred later. Once the stack is empty, that means the current task is
complete, so the next task can be moved from the queue to the stack for
execution. This cycle repeats again and again, hence the _loop_!

> If you are interested in reading more about the event loop check out the MDN
> [documentation][mdn-event-loop]

## What you've learned

In this article we:

- introduced the queue data structure
- explored how the call stack and message queue interact to form JavaScript's
  event loop

[aa-homepage]: https://www.appacademy.io/
[mdn-event-loop]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
[event-loop-01]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/event-loop/01.png
[event-loop-02]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/event-loop/02.png
[event-loop-03]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/event-loop/03.png
[event-loop-04]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/event-loop/04.png
[event-loop-05]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/event-loop/05.png
[event-loop-06]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/event-loop/06.png
[event-loop-07]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/event-loop/07.png
[event-loop-08]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/event-loop/08.png

________________________________________________________________________________
# Reading Between the Lines: Getting User Input and Callback Chaining

Up until this point, our programs have been deterministic in that they exhibit
the same behavior whenever we execute them. In order to change the behavior, we
have had to change the code. The human element has been missing! It would be
great if a user of our program could interact with it during _runtime_, possibly
influencing the _thread of execution_. Gathering input from the user during
runtime is an operation that is typically handled _asynchronously_ with
_events_. Why asynchronously? Well, we can't be certain _when_ the user will
decide to interact and we don't want our program to wait around idly for their
input. Don't forget that JavaScript is single-threaded; waiting for user input
synchronously would block the thread!

When you finish reading this article, you should be able to:

- write a program that accepts user input using Node's `readline` module
- utilize callback chaining to guarantee relative order of execution among
  multiple asynchronous functions

## Node's readline module

To take user input, we'll need to get acquainted with the
[readline][readline-doc] module. Recall that a module is just a package of
JavaScript code that provides some useful functionality (for example, `mocha` is
a module that we have been using frequently to test our code). Luckily, the
`readline` module already comes bundled with Node. No additional installations
are needed, we just need to "import" the module into our program. Let's begin
with a fresh `.js` file:

```javascript
// import the readline module into our file
const readline = require("readline");
```

The `readline` variable is an object that contains all of the methods we can use
from the module. Following the quick-start instructions in the
[docs][readline-doc], we'll also need to do some initial setup:

```javascript
const readline = require("readline");

// create an interface where we can talk to the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```

The details of what `createInterface` does aren't super-duper important, but
here is the short story: it allows us to read and print information from the
terminal.

> A large part of using modules like `readline` is sifting through the
> documentation for what you need. You'll have to become comfortable with
> utilizing methods without understanding exactly _how_ they work. Abstraction
> is the name of the game here! We don't know exactly how the `createInterface`
> method works under the hood, but we can still use it effectively because the
> docs offer examples and guidance!

Now that we have the setup out of the way, let's ask the user something!
Referencing the docs, we can use the `question` method on our interface:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ask the user a question
rl.question("What's up, doc? ", answer => {
  // print their response
  console.log("you responded: " + answer);
  // close the interface
  rl.close();
});
```

Execute the code above and enter something when prompted! If we respond 'nothing
much', the total output would be:

```plaintext
What's up, doc? nothing much
you responded: nothing much
```

Pretty cool, huh? Notice that the `question` method accepts two arguments: a
question message to display and a callback. When the user types a response and
hits `enter`, the callback will be executed with their response as the argument.

> rl.close() is invoked after the question is answered to close the interface.
> If we don't close the interface, then the program will hang and not exit. In
> general, you'll want to close the interface after you are done asking all of
> your questions. Like usual, all of this info is provided in the
> [docs][readline-close-doc].

Let's emphasize a critical point: the `question` method is asynchronous! Similar
to how we illustrated the asynchronous nature of `setTimeout`, let's add a print
statement after we call `rl.question`:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What's up, doc? ", answer => {
  console.log("you responded: " + answer);
  rl.close();
});

// try to print 'DONE!' after the question
console.log("DONE!");
```

If we respond 'nothing much', the total output would be:

```plaintext
What's up, doc? DONE!
nothing much
you responded: nothing much
```

Oops. It looks like the 'DONE!' message was printed out before the user finished
entering their response because the `question` method is asynchronous. We'll
introduce a pattern for overcoming this issue next.

## Callback chaining

In our last example, we saw how the asynchronous behavior of the `question`
method can lead to issues if we want to perform a command directly after the
user enters their response. The fix for this is trivial (some would even say
"low-tech"). Simply put the command you want to follow at the end of the
callback. In other words, the following code guarantees that we print 'DONE!'
**after** the user enters their response:

```javascript
// this code is a partial snippet from previous examples

rl.question("What's up, doc? ", answer => {
  console.log("you responded: " + answer);
  rl.close();
  console.log("DONE!");
});
```

The change above would yield a total output of:

```plaintext
What's up, doc? nothing much
you responded: nothing much
DONE!
```

In general, when we want to a command to occur directly "after" a callback is
invoked asynchronously, we'll really have to place that command inside of the
callback. This is a simple pattern, but one that we'll turn to often.

Imagine that we want to ask the user two questions in succession. That is, we
want to ask question one, get their response to question one, then ask question
two, and finally get their response to question two. The following code will
**not** meet this requirement:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ask question one
rl.question("What's up, doc? ", firstAnswer => {
  console.log(firstAnswer + " is up.");
});

// ask question two
rl.question("What's down, clown? ", secondAnswer => {
  console.log(secondAnswer + " is down.");
  rl.close();
});
```

The code above is broken and will never ask the second question. Like you can
probably guess, this is because the `question` method is asynchronous.
Specifically, the first call to `question` will occur and before the user can
enter their response, the second call to `question` also occurs. This is bad
because our program is still trying to finish the first question. Since we want to
ask question two only after the user responds to question one, we'll have to use
the pattern from before. That is, we should ask question two within the response
callback for question one:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ask question one
rl.question("What's up, doc? ", firstAnswer => {
  console.log(firstAnswer + " is up.");

  // only after the user responds to question one, then ask question two
  rl.question("What's down, clown? ", secondAnswer => {
    console.log(secondAnswer + " is down.");
    rl.close();
  });
});
```

If we respond to the questions with 'the sky' and 'the ground', the total output
is:

```plaintext
What's up, doc? the sky
the sky is up.
What's down, clown? the ground
the ground is down.
```

Nice! The program works as intended. The pattern we utilized is known as
_callback chaining_. While callback chaining allows us to perform a series of
asynchronous functions one after the other, if we don't manage our code neatly,
we can end up with a mess. Extending this pattern to three questions, we can
begin to see the awkward, nested structure:

```javascript
// this code is a partial snippet from previous examples

rl.question("What's up, doc? ", firstAnswer => {
  console.log(firstAnswer + " is up.");

  rl.question("What's down, clown? ", secondAnswer => {
    console.log(secondAnswer + " is down.");

    rl.question("What's left, Jeff? ", thirdAnswer => {
      console.log(thirdAnswer + " is left.");
      rl.close();
    });
  });
});
```

This overly nested structure is known colloquially in the JavaScript community
as ["callback hell"][callback-hell]. Don't worry! A way to refactor this type of
code for more readability is to use named functions instead of passing anonymous
functions. Here is an example of such a refactor:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What's up, doc? ", handleResponseOne);

function handleResponseOne(firstAnswer) {
  console.log(firstAnswer + " is up.");
  rl.question("What's down, clown? ", handleResponseTwo);
}

function handleResponseTwo(secondAnswer) {
  console.log(secondAnswer + " is down.");
  rl.question("What's left, Jeff? ", handleResponseThree);
}

function handleResponseThree(thirdAnswer) {
  console.log(thirdAnswer + " is left.");
  rl.close();
}
```

Run the code above to check out our final product! Ah, much better. By using
named functions to handle the responses, our code structure appears flatter and
easier to read.

Callback chaining is a very common pattern in JavaScript, so get used to it! As
a rule of thumb, prefer to use named functions when creating a callback chain
longer than two. Later in the course, we'll learn about recent additions to
JavaScript that help reduce "callback hell" even further, so stay tuned!

## What you've learned

In this reading, we:

- learned how to use the `readline` module to gather user input asynchronously
- utilized callback chaining to serialize multiple asynchronous functions
- refactored a callback chain to keep our code readable and avoid "callback
  hell"

[readline-doc]: https://nodejs.org/api/readline.html#readline_readline
[readline-close-doc]: https://nodejs.org/api/readline.html#readline_rl_close
[callback-hell]: http://callbackhell.com/

________________________________________________________________________________
# Timeout Project

Time to practice dealing with asynchronous functions like `setTimeout` and 
`setInterval`. Your objective is to implement the functions in each file
of the `/problems` directory. In addition to the prompts available at the 
top of each file, Mocha specs are provided to test your work.

To get started, use the following commands:

1. `cd` into the project directory
2. `npm install` to install any dependencies
3. `mocha` to run the test cases

________________________________________________________________________________
# Guessing Game Project

It's time for our first non-spec guided project! There are many projects in the
course, some of which will not have test cases for you to run. These types of
projects will hold your hand less and force you to make design decisions.
Instead of specs, you will be provided with text instructions and example
snippets to guide you. In order to end up with a working project, you should
analyze these instructions closely. If you are stuck or don't understand an
instruction, ask a TA for clarification!

The solution for this project is available at the end of these instructions. Be
sure to give it an honest shot before you take a peek!

## The Objective

Our objective for this project is to build a simple game where the user has to
guess a secret number that is chosen at random. Upon making a guess, the user
will receive a hint indicating if their guess is too small or too large. Below
is an example of how the final product will play. We've denoted the user's input
with \*asterisks\*. All other text is produced by the computer:

```plaintext
Enter a max number: *20*
Enter a min number: *11*
I'm thinking of a number between 11 and 20...
Enter a guess: *15*
Too high.
Enter a guess: *11*
Too low.
Enter a guess: *13*
Too high.
Enter a guess: *12*
Correct!
YOU WON.
```

We'll be building this project in phases, with each phase bringing us closer to
the final product shown above. It's important that you follow the phases closely
and don't jump the gun by ignoring the instructions and attempting to create
your own game quickly. For these guided projects, the journey is more important
than the final destination. Without further ado, let's jump in!

## Phase I: Too High? Too Low? Who knows.

Begin by creating a folder called `guessing-game-project`. Open the folder in
VSCode. Inside of that folder create a `guessing-game.js` file. This is the file
where we will do all of the coding.

Begin by initializing a variable in the global scope named `secretNumber` to any
positive integer. Later we will program this variable to be assigned at random,
but for now we'll hard-code a value that we can test for quickly.

### checkGuess

Define a function named `checkGuess` that accepts a number as an argument. It
should compare that argument against the global `secretNumber`. It should have
the following behavior:

- when the argument is larger than `secretNumber`, it should print 'Too high.'
  and return `false`
- when the argument is smaller than `secretNumber`, it should print 'Too low.'
  and return `false`
- when the argument is equal to `secretNumber`, it should print 'Correct!' and
  return `true`

Let's take a moment to verify that our code is working as intended. Make a few
test calls to `checkGuess` in the global scope. Be sure to use a range of
numbers so we can verify that it behaves properly in all three scenarios. You'll
want to `console.log` the return values of `checkGuess` since it should return
booleans. Run your code with `node guessing-game.js`. When you are positive that
your function is working, remove the test calls from your file.

### askGuess

Since we will be taking user input during gameplay, we'll need to do some
standard setup for Node's `readline` module. Reference the [readline
docs][readline-doc] to create an interface for input and output that we will
use. To stay organized, we recommend that you import the module and create the
interface at the tippy top of your file.

Define a function named `askGuess`. The method should use the `readline`
module's `question` method to ask the user to 'Enter a guess: '. If you need a
refresher on how to use this method, check out the [question
docs][question-doc]. Once the user enters their number, the `checkGuess`
function should be called with their number as an argument and the interface
should be [closed][close-doc].

When accepting user input, there is a very important nuance to take into
account. When the user enters their guess it will be interpreted as a string of
numeric characters and not an actual number type! Depending on how you wrote
your `checkGuess` function, this could be disastrous because:

```javascript
console.log(42 === "42"); // false
```

To overcome this issue, we should explicitly turn their guess into a number
_before_ we pass it into `checkGuess`. You can do this by calling the `Number`
function. Here's an example of `Number` in action:

```javascript
let str = "42";
console.log(42 === Number(str)); // true
```

Test your `askGuess` by calling it once in the global scope. Then run your
program a few times, entering different numbers. After trying a single guess,
you will have to run the program again. Be sure to include an attempt with a
correct guess by entering the `secretNumber` value that you hard-coded.

Once you have verified that the user's guess is being properly checked, let's
work on having the function ask the user for another guess if they are
incorrect. Refactor the `askGuess` method with some conditional logic. Recall
that the `checkGuess` function returns a boolean - very convenient! Here is how
the `askGuess` function should flow:

- check the user's guess
  - if it is correct, print out 'You win!' and close the interface
  - if it is incorrect, call `askGuess` again

> You may find it a bit startling that you can reference the `askGuess` function
> from within the `askGuess` function. That is, you can a reference a function
> from within itself! This self-referential mechanism is leveraged quite
> frequently in programming. We will return to this concept in later lessons.

Run your program and test it out, being sure that you have a single call to
`askGuess` in the global scope so the game can begin. Woohoo! We now have our
minimal viable product (MVP) version of the game.

**Before moving onto the next phase, ask a TA for a code review.**

## Phase II: Making it Random

Now that we have the core gameplay down, we'll want to implement logic to allow
the `secretNumber` to be chosen at random. To do this, we'll utilize the
`Math#random` method. Take a look at the [docs][random-doc]. The method returns
a decimal number between 0 and 1 (excluding 1). For example:

```javascript
console.log(Math.random()); // 0.5719957072947224
console.log(Math.random()); // 0.08590173924968769
console.log(Math.random()); // 0.0965770175443883
```

By itself, this method won't be too useful because our game should only use
whole numbers. Luckily, the docs provide some insight into how we can design a
function that returns a random whole number that lies within a certain range.
Scroll through the docs and locate examples about "Getting a random integer
between two values." You'll use these examples to inspire your code. You may
notice that the examples provided rely on other methods like `Math.floor`.
Research those methods so that you understand how the code works. Googling
around and researching the docs is an important aspect of being a developer, so
take your time!

### randomInRange

Define a function called `randomInRange` that accepts a minimum and maximum
number as arguments. The function should return a random whole number between
the provided minimum and maximum (inclusive). Be sure to test your function,
here is an example of how it might behave:

```javascript
console.log(randomInRange(15, 20)); // 16
console.log(randomInRange(15, 20)); // 17
console.log(randomInRange(15, 20)); // 20
```

Once you have confirmed that your `randomInRange` function is returning numbers
properly, edit your initialization of `secretNumber`. Instead of setting it to a
hard-coded value, use your function's return value to set it to a random number
between 0 and 100. Play a few games! Remember that you'll have to call
`askGuess()` once in the global scope to begin the game. Next up, we'll allow
the user to choose the min and max for the game.

### askRange

Delete or comment out your global call to `askGuess` for now. Define a function
called `askRange`. This method should ask the user to enter a minimum number and
then ask them to enter a maximum number. We want to ask them for the maximum
only after they have responded to the first question. This means you will have
to use the `question` method twice! Recall what you learned from the readings.
The `question` method is asynchronous, so how can we ask two questions one after
the other? We'll leave the implementation to you. After the user enters their
min and max, you should print a message confirming the range. Here is an example
of how our `askRange` method behaves. We've put _asterisks_ around the user's
input:

```plaintext
Enter a max number: *20*
Enter a min number: *11*
I'm thinking of a number between 11 and 20...
```

As always, test your function thoroughly by adding a call to `askRange` in
global scope. Your program may hang because the interface is not closed after
the user enters their max. That's okay, since we are debugging; press `ctrl + c`
in your terminal to kill the program.

Once your function is able to properly take the min and max from your user, it's
time to put it all together! When the user enters both the min and the max, call
your `randomInRange` function with that min and max as arguments. Recall that
the user's input is automatically interpreted as strings and not numbers. You
should explicitly turn the min and max to actual numbers before passing them in.
Take the random number returned from your function and set that as the
`secretNumber`. Then call your old `askGuess` method so that gameplay can begin.
All of this should happen within the `askRange` function. We design it this way
because we only want to ask for a guess after the random number has been chosen.

The `askRange` function is the "main" function that will begin our game, so
you'll need call it once in the global scope. Run your program and play a few
games!

**Before moving onto the bonus ask a TA for a code review.**

## Bonus: Limiting the number of turns

With our main features complete, let's work on increasing the difficulty of the
game by limiting the number of guesses a user can make. If the player uses all
of their attempts without guessing the correct number, they will lose the game.

### Limiting turns to 5

Start by limiting the player to 5 attempts. You can accomplish this by
initializing a `numAttempts` variable in the global scope. Refactor your
`askGuess` method to decrement the number of remaining attempts whenever it is
called. If the `numAttempts` reaches 0 before the correct guess is made, end the
game by printing 'You Lose'. We'll leave the details of the implementation up to
you.

### Limiting turns dynamically

Make the limit dynamic by allowing the user to specify the number of attempts.
We recommend creating an `askLimit` function that behaves similarly to
`askRange`. Be sure to chain the callbacks in the right order to ensure the game
is configured properly. For example, one valid callback chain order would be
`askLimit` -> `askRange` -> `askGuess`. If you follow this order, you'll need to
call `askLimit` in the global scope to begin the game.

[readline-doc]: https://nodejs.org/api/readline.html#readline_readline
[question-doc]:
  https://nodejs.org/api/readline.html#readline_rl_question_query_callback
[close-doc]: https://nodejs.org/api/readline.html#readline_rl_close
[random-doc]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

________________________________________________________________________________
# WEEK-03 DAY-2<br>*Git* {ignore=true}
________________________________________________________________________________
# Node.js Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Define NodeJS as distinct from browser based JavaScript runtimes.
2. Write a program that reads in a dictionary file using node's FS API and reads
   a line of text from the terminal input. The program should 'spell check' by
   putting asterisks around every word that is NOT found in the dictionaryearning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Define NodeJS as distinct from browser based JavaScript runtimes.
2. Write a program that reads in a dictionary file using node's FS API and reads
   a line of text from the terminal input. The program should 'spell check' by
   putting asterisks around every word that is NOT found in the dictionary.
________________________________________________________________________________
# Git Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Use Git to initialize a repo
2. Explain the difference between Git and GitHub
3. Given 'adding to staging', 'committing', and 'pushing to remote', match attributes that apply to each.
4. Use Git to clone an existing repo from GitHub
6. Use Git to push a local commit to a remote branch
7. Use git to make a branch, push it to github, and make a pull request on GitHub to merge it to master
8. Given a git merge conflict, resolve it
9. Match the three types of git reset with appropriate descriptions of the operation.
10. Use Git reset to rollback local-only commits.
11. Identify what the git rebase command does
12. Use git diff to compare a local 'staging' branch and 'master' branch.
13. Use git checkout to check out a specific commit by commit iing objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Use Git to initialize a repo
2. Explain the difference between Git and GitHub
3. Given 'adding to staging', 'committing', and 'pushing to remote', match attributes that apply to each.
4. Use Git to clone an existing repo from GitHub
6. Use Git to push a local commit to a remote branch
7. Use git to make a branch, push it to github, and make a pull request on GitHub to merge it to master
8. Given a git merge conflict, resolve it
9. Match the three types of git reset with appropriate descriptions of the operation.
10. Use Git reset to rollback local-only commits.
11. Identify what the git rebase command does
12. Use git diff to compare a local 'staging' branch and 'master' branch.
13. Use git checkout to check out a specific commit by commit id
________________________________________________________________________________
# A Tale of Two Runtimes: Node.js vs Browser

Lately, we've been alluding to JavaScript running in the web browser. While we
are not quite ready to make that transition yet, the authors of JavaScript
really only intended their creation to be used in a browser environment when
they originally conceived of the language at Netscape in 1995. To prepare for
the coming transition to the browser, let's explore some of the differences
between Node.js and browser environments.

When you finish this article, you should be able to:

- identify Node.js as an environment that is _distinct_ from web browsers
- list several differences between the Node.JS and browser runtimes

## Same specification, different implementation

Since JavaScript is a single programming language, you may be wondering why
there are _any_ differences between Node.js and browsers in the first place. If
they are in fact different, why wouldn't we classify them as different
programming languages? The answer is complicated, but the key idea is this: even
if we just consider browser environments, different browsers themselves can
differ wildly because JavaScript is a _specification_. During the rise of the
World Wide Web in the 90s, companies competed for dominance (see [The First
Browser War][browser-wars]). As Netscape's "original" JavaScript language rose
to prominence along with their browser, other browser companies needed to also
support JavaScript to keep their users happy. Imagine if you could only visit
pages as they were intended if you used a certain browser. What a horrible
experience it would be (we're looking at you Internet Explorer)! As companies
"copied" Netscape's original implementation of JavaScript, they sometimes took
creative liberty in adding their own features.

In order to ensure a certain level of compatibility across browsers, the
European Computer Manufacturers Association (ECMA) defined specifications to
standardize the JavaScript language. This specification is known as _ECMAScript_
or _ES_ for short. This allows competing browsers like Google Chrome, Mozilla
Firefox, and Apple Safari to have a healthy level of competition that doesn't
compromise the customer experience. So now you know that when people use the
term "JavaScript" they are really referring to the core standards set by
ECMAScript, although exact implementation details may differ from browser to
browser.

The Node.js runtime was released in 2009 when there was a growing need to
execute JavaScript in a portable environment, without any browser.

> **Did you know?** Node.js is built on top of the same JavaScript engine as
> Google Chrome (V8). Neat.

## Differences between Node.js and browsers

There are many differences between Node.js and browser environments, but many of
them are small and inconsequential in practice. For example, in our
_Asynchronous_ lesson, we noted how [Node's setTimeout][node-set-timeout] has a
slightly different return value from [a browser's setTimeout][mdn-set-timeout].
Let's go over a few notable differences between the two environments.

### Global vs Window

In the Node.js runtime, the [global object][global-object] is the object where
global variables are stored. In browsers, the [window object][window] is where
global variables are stored. The window also includes properties and methods
that deal with drawing things on the screen like images, links, and buttons.
Node doesn't need to draw anything, and so it does not come with such
properties. This means that you can't reference `window` in Node.

> Most browsers allow you to reference `global` but it is really the same object
> as `window`.

### Document

Browsers have access to a `document` object that contains the HTML of a page
that will be rendered to the browser window. There is no `document` in Node.

### Location

Browsers have access to a `location` that contains information about the web
address being visited in the browser. There is no `location` in Node, since it
is not on the web.

### Require and module.exports

Node has a predefined `require` function that we can use to import installed
modules like `readline`. We can also import and export across our own files
using `require` and `module.exports`. For example, say we had two different
files, `animals.js` and `cat.js`, that existed in the same directory:

```javascript
// cat.js

const someCat = {
  name: "Sennacy",
  color: "orange",
  age: 3
};

module.exports = someCat;
```

```javascript
// animals.js

const myCat = require("./cat.js");

console.log(myCat.name + " is a great pet!");
```

If we execute `animals.js` in Node, the program would print
`'Sennacy is a great pet!'`.

Browsers don't have a notion of a file system so we cannot use `require` or `module.exports` in the same way.

## What you've learned

In this reading, we covered a few differences between Node and browser environments, including:
+ Node's `global` and browser's `window`
+ the browser specific `document` and `location` objects
+ the Node specific `require` and `module.exports`




[node-set-timeout]:
  https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args
[mdn-set-timeout]:
  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
[global-object]: https://developer.mozilla.org/en-US/docs/Glossary/Global_object
[window]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[browser-wars]: https://en.wikipedia.org/wiki/Browser_wars

________________________________________________________________________________
# The Ins and Outs of File I/O in Node

We have previously identified some differences between Node.js and browser
environments. One difference was the use of `require` to import different node
modules. It is often the case that these modules provide functionality that is
totally absent in the browser environment. While browsers support deliberate
file download or upload to the web, they typically don't support arbitrary file
access due to security concerns. Let's explore a node module that allows us to
read, write, and otherwise manipulate files on our computer.

When you finish this article, you should be able to use the `fs` module to
perform basic read and write operations on local files.

## The fs module

Node ships with an [fs module][fs-doc] that contains methods that allow us to
interact with our computer's **F**ile **S**ystem through JavaScript. No
additional installations are required; to access this module we can simply
`require` it. We recommend that you code along with this reading. Let's begin
with a `change-some-files.js` script that imports the module:

```javascript
// change-some-files.js

const fs = require("fs");
```

Similar to what we saw in the `readline` lesson, `require` will return to us a
object with many properties that will enable us to do file I/O.

> **Did you know?** I/O is short for input/output. It's usage is widespread and all
> the hip tech companies are using it, like appacademy.io.

The `fs` module contains tons of functionality! Chances are that if there is
some operation you need to perform regarding files, the `fs` module supports it. The
module also offers both synchronous and asynchronous implementations of these
methods. We prefer to not block the thread and so we'll opt for the
asynchronous flavors of these methods.

### Creating a new file

To create a file, we can use the [`writeFile`][fs-write-file] method. According
to the documentation, there are a few ways to use it. The most straight forward
way is:

```javascript
// change-some-file.js

const fs = require("fs");

fs.writeFile("foo.txt", "Hello world!", "utf8", err => {
  if (err) {
    console.log(err);
  }
  console.log("write is complete");
});
```

The code above will create a new file called `foo.txt` in the same directory as
our `change-some-file.js` script. It will write the string `'Hello world!'` into
that newly created file. The third argument specifies the encoding of the
characters. There are different ways to encode characters; [UTF-8][utf-8] is the
most common and you'll use this in most scenarios. The fourth argument to
`writeFile` is a callback that will be invoked when the write operation is
complete. The docs indicate that if there is an error during the operation (such
as an invalid encoding argument), an error object will be passed into the
callback. This type of error handling is quite common for asynchronous
functions. Like we are used to, since `writeFile` is asynchronous, we need to
utilize _callback chaining_ if we want to guarantee that commands occur _after_
the write is complete or fails.

> Beware! If the file name specified to `writeFile` already exists, it will
> completely overwrite the contents of that file.

We won't be using the `foo.txt` file in the rest of this reading.

### Reading existing files

To explore how to read a file, we'll use VSCode to manually create a
`poetry.txt` file within the same directory as our `change-some-file.js` script.
Be sure to create this if you are following along.

Our `poetry.txt` file will contain the following lines:

```plaintext
My code fails
I do not know why
My code works
I do not know why
```

We can use the [`readFile`][fs-read-file] method to read the contents of this
file. The method accepts very similar arguments to `writeFile`, except that the
callback may be passed an error object and string containing the file contents.
In the snippet below, we have replaced our previous `writeFile` code with
`readFile`:

```javascript
// change-some-file.js
const fs = require("fs");

fs.readFile("poetry.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log("THE CONTENTS ARE:");
  console.log(data);
});
```

Running the code above would print the following in the terminal:

```plaintext
THE CONTENTS ARE:
My code fails
I do not know why
My code works
I do not know why
```

Success! From here, you can do anything you please with the data read from the
file. For example, since `data` is a string, we could split the string on the
newline character `\n` to obtain an array of the file's lines:

```javascript
// change-some-file.js
const fs = require("fs");

fs.readFile("poetry.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }

  let lines = data.split("\n");
  console.log("THE CONTENTS ARE:");
  console.log(lines);
  console.log("The third line is " + lines[2]);
});
```

Running this latest version would yield:

```plaintext
THE CONTENTS ARE:
[ 'My code fails',
  'I do not know why',
  'My code works',
  'I do not know why' ]
The third line is My code works
```

## Fancy File I/O

Now that we have an understanding of both `readFile` and `writeFile`, let's use
both to accomplish a task. Using the same `poetry.txt` file from before:

```plaintext
My code fails
I do not know why
My code works
I do not know why
```

Our goal is to design a program to replace occurrences of the phrase 'do not'
with the word 'should'. This is straightforward enough. We can read the contents
of the file as a string, manipulate this string, then write this new string back
into the file. We'll need to utilize callback chaining in order for this to work
since our file I/O is asynchronous:

```javascript
const fs = require("fs");

fs.readFile("poetry.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }

  let newData = data.split("do not").join("should");

  fs.writeFile("poetry.txt", newData, "utf8", err => {
    if (err) {
      console.log(err);
    }

    console.log("done!");
  });
});
```

Executing the script above will edit the `poetry.txt` file to contain:

```plaintext
My code fails
I should know why
My code works
I should know why
```

As a bonus, we might also refactor this code to use named functions for better
readability and generality:

```javascript
const fs = require("fs");

function replaceContents(file, oldStr, newStr) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let newData = data.split(oldStr).join(newStr);
    writeContents(file, newData);
  });
}

function writeContents(file, data) {
  fs.writeFile(file, data, "utf8", err => {
    if (err) {
      console.log(err);
    }
    console.log("done!");
  });
}

replaceContents("poetry.txt", "do not", "should");
```

## What you've learned

In this reading we explored the `fs` module. In particular, we:

- learned about basic file I/O via `readFile` and `writeFile`
- utilized callback chaining to edit a file based on its existing content

[fs-doc]: https://nodejs.org/api/fs.html
[fs-write-file]:
  https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
[fs-read-file]:
  https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
[utf-8]: https://en.wikipedia.org/wiki/UTF-8

________________________________________________________________________________
# "Gitting" Started With Git!

Good software is never limited to "right now"! Your code grows and changes over
time, and the people who work with it may come and go. How can you be certain
you're preserving your code's legacy? _Version control_ lets us keep track of
your changes over time. You'll discuss version control with _Git_, the tool of
choice for modern development teams.

After reading, you'll be able to:

- Explain the role of version control in the programmer's toolkit
- Create and manage a Git repository
- Share and collaborate on Git repositories via Github

## A little history

Think back to the dark ages of web development: a world of beeping modems and
marquee text. If you were going to build a web application in 1995, how might
you have done it? You'd start with an empty directory and add some JavaScript
and HTML files. As you made changes, you'd save them directly to your directory.
There's no history of the changes you've made, so you'd have to keep excellent
notes or have an incredible memory to revert your application to a previous
state.

What if you have teammates working with you on this project, or a client who
wants to review your work? Now each teammate needs a copy of the project
directory, and you need a way to share your work with clients. This results in
numerous copies of the same files and a lot of extra work keeping those files in
sync. If one file gets out of line, it could spell disaster for the whole
project. Yikes!

Instead of suffering from these problems, programmers designed a solution:
_Version Control Systems (VCS)_. VCS tools abstract the work of keeping projects
and programmers in sync with one another. They provide a shared language with
which you can discuss changes to source code. They also allow you to step back
in time and review your work. VCS tools save you hours of work each day, so
learning to use them is a great investment in your productivity.

### Git?

You'll be using Git (pronounced similarly to 'get' in English) as your VCS. Git
is the most popular VCS today and provides a good balance of power and ease of
use. It was created in 2005 by Linus Torvalds (who you may also recognize as the
creator of Linux) to address a number of shortcomings VCS tools of that time
had, including speed of code management and the ability to maintain workflow
when cut off from a remote server. Git is well-known for being reliable and
fast, and it brings with it an important online community you can leverage for
sharing your code with a wider audience.

## Git basics

Like many disciplines, learning Git is just a matter of learning a new language.
You'll cover a lot of new vocabulary in this lesson! Remember that the
vocabulary you'll learn will allow you to communicate clearly with other
developers worldwide, so it's important to understand the meaning of each term.

It's also important to note that Git is a complex and powerful tool. As such,
its documentation and advanced examples may be tough to understand. As your
knowledge grows, you may choose to dive deeper into Git. Today, you'll focus on
the commands you'll use every day - possibly for the rest of your programming
career! Get comfortable with these commands and resist the urge to copy/paste or
create keyboard shortcuts as you're getting started.

### See the world through Git's eyes

Before you look at any practical examples, let's talk about how Git works behind
the scenes.

Here is your first new word in Git-speak: _repository_, often shortened to
_repo_. A Git repo comprises all the source code for a particular project. In
the "dark ages" example above, the repo is the first directory you created,
where work is saved to, and which acts as the source for code shared to others.
Without a repo, Git has nothing to act on.

Git manages your project as a series of _commits_. A commit is a collection of
changes grouped towards a shared purpose. By tracking these commits, you can see
your project on a timeline instead of only as a finished project:

![image-git-timeline][image-git-timeline]

Notice the notes and seemingly random numbers by each commit? These are referred
to as _commit messages_ and _commit hashes_, respectively. Git identifies your
commits by their hash, a specially-generated series of letters and numbers. You
add commit messages to convey meaning and to help humans track your commits, as
those hashes aren't very friendly to read!

A Git hash is 40 characters long, but you only need the first few characters to
identify which hash you're referring to. By default, Git abbreviates hashes to 7
characters. You'll follow this convention, too.

Git provides a helpful way for us to "alias" a commit in plain English as well.
These aliases are called _refs_, short for "references". A special one that Git
creates for all repositories is `HEAD`, which references the most recent commit.
You'll learn more about creating your own refs when you learn about "branching".

Git maintains three separate lists of changes: the _working directory_, the
_staging area_, and the _commit history_. The working directory includes all of
your in-progress changes, the staging area is reserved for changes you're ready
to commit, and the commit history is made up of changes you've already
committed. You'll look more at these three lists soon.

Git only cares about changes that are "tracked". To track a file, you must add
it to the commit history. The working directory will always show the changes,
even if they aren't tracked. In the commit history, you'll only have a history
of files that have been formally tracked by your repository.

### Tracking changes in a repository

Now, let's get practical!

You can create a repository with `git init`. Running this command will
initialize a new Git repo in your current directory. It's important to remember
that you only want a repository for your project and not your whole hard drive,
so always run this command inside a project folder and not your home folder or
desktop. You can create a new repo in an empty folder or within a project
directory you've already created.

What good is an empty repo? Not much! To add content to your repository, use
`git add`. You can pass this command a specific filename, a directory, a
"wildcard" to select a series of similarly-named files, or a `.` to add every
untracked file in the current directory:

```sh
# This will add only my_app.js to the repo:
> git add my_app.js

# This will add all the files within ./objects:
> git add objects/

# This will add all the files in the current directory ending in `.js`:
> git add *.js

# This will add everything in your current directory:
> git add .
```

Adding a file (or files) moves them from Git's working directory to the staging
area. You can see what's been "staged" and what hasn't by using `git status`:

![image-git-status-output][image-git-status-output]

In this example, "Changes to be committed" is your staging area and "Changes not
staged for commit" is your working directory. Notice that you also have
"Untracked files", Git's way of reminding us that you may have forgotten to `git
add` a file to your repo. Most Git commands will include a bit of help text in
the output, so always read the messages carefully before moving forward. Thanks,
Git!

Once you're happy with your files and have staged them, you'll use `git commit`
to push them into the commit history. It's significantly more work to make
changes after a commit, so be sure your files are staged and exactly as you'd
like them before running this command. Your default text editor will pop up, and
you'll be asked to enter a commit message for this group of changes.

**Heads Up:** You may find yourself in an unfamiliar place! The default text
editor for MacOS (and many variants of Linux) is called _Vim_. Vim is a
terminal-based text editor you'll discuss in the near future. It's visually bare
and may just look like terminal text to you! If this happens, don't worry - just
type `:q` and press your "return" key to exit.

You'll want to ensure that future commit messages open in a more familiar
editor. You can run the following commands in your terminal to ensure that
Visual Studio Code is your `git commit` editor from now on:

```sh
> git config --global core.editor "code --wait"
> git config --global -e
```

If you experience any issues, you may be missing Visual Studio Code's command
line tools. You can find more details and some troubleshooting tips on
Microsoft's official [VS Code and macOS documentation].

Once you close your editor, the commit will be added to your repository's commit
history. Use `git log` to see this history at any time. This command will show
all the commits in your repository's history, beginning with the most recent:

![image-git-log-output][image-git-log-output]

Like many Git commands, `git commit` includes some helpful shorthand. If you
need a rather short commit message, you can use the `-m` flag to include the
message inline. Here's an example:

```sh
> git commit -m "Fix typo"
```

This will commit your changes with the message "Fix typo" and avoid opening your
default text editor. Remember the commit messages are how you make your
project's history friendly to humans, so don't use the `-m` flag as an excuse to
write lame commit messages! A commit message should always explain why changes
were made in clear, concise language. It is also best practice to use imperative
voice in commit messages (i.e. use "Fix typo" instead of "Fixing the typo" or
"Typo was fixed").

### Branches and workflow

You've seen what a project looks like with a linear commit history, but that's
just scratching the surface of Git's utility. Let's explore a new realm with
_branches_. A branch is a separate timeline in Git, reserved for its own
changes. You'll use branches to make your own changes independently of others.
These branches can then be _merged_ back into the main branch at a later time.

Let's consider a common scenario: a school project. It's a lot of extra hassle
to schedule time together and argue over exactly what should be done next!
Instead, group members will often assign tasks amongst themselves, work
independently on their tasks, and reunite to bring it all together as a final
report. Git branches let us emulate this workflow for code: you can make a copy
of what's been done so far, complete a task on your new branch, and merge that
branch back into the shared repository for others to use.

By default, Git repos begin on the `master` branch. To create a new branch, use
`git branch <name-of-your-branch>`. This will create a named reference to your
current commit and let you add commits without affecting the `master` branch.
Here's what a branch looks like:

![image-git-branch][image-git-branch]

Notice how your refs help to identify branches here: `master` stays to itself
and can have changes added to it independently of your new branch (`footer`).
`HEAD`, Git's special ref, follows us around, so you know that in the above
diagram you're working on the `footer` branch.

You can create a new branch or visit an existing branch in your repository. This
is especially helpful for returning the `master` branch or for projects you've
received from teammates. To open an existing branch, use `git checkout
<name-of-branch>`.

### Bringing it back together

Once you're happy with the code in the branch you've been working on, you'll
likely want to integrate the code into the `master` branch. You can do this via
`git merge`. Merging will bring the changes in from another branch and integrate
them into yours. Here's an example workflow:

```sh
> git branch my-changes
> git add new-file.js
> git commit -m "Add new file"
> git checkout master
> git merge my-changes
```

Following these steps will integrate the commit from `my-changes` over to
`master`. Boom! Now you have your `new-file.js` on your default branch.

As you can imagine, branching can get _very_ complicated. Your repository's
history may look more like a shrub than a beautiful tree! You'll discuss
advanced merging and other options in an upcoming lesson.

## Connecting with the world via GitHub

Git can act as a great history tool and source code backup for your local
projects, but it can also help you work with a team! Git is classified as a
"DVCS", or "Distributed Version Control System". This means it has built-in
support for managing code both locally and from a distant source.

You can refer to a repository source that's not local as a _remote_. Your Git
repository can have any number of remotes, but you'll usually only have one. By
default you'll refer to the primary remote of a repo as the `origin`.

You can add a remote to an existing repository on your computer, or you can
retrieve a repository from a remote source. You can refer to this as _cloning_
the repo. Once you have a repository with a remote, you can update your local
code from the remote by _pulling_ code down, and you can _push_ up your own code
so others have access to it.

### Collaboration via Git and GitHub

While a remote Git server can be run anywhere, there are a few places online
that have become industry standards for hosting remote Git repositories. The
best-known and most widely-used Git source is a website called [GitHub]. As the
name suggests, GitHub is a global hub for Git repositories. It's free to make a
Github account, and you'll find literally millions of public repositories you
can browse.

GitHub takes a lot of work out of managing remote Git repositories. Instead of
having to manage your own server, GitHub provides managed hosting and even
includes some helpful graphical tools for complicated tasks like deployment,
branch merging, and code review.

Let's look at a typical workflow using Git and GitHub. Imagine it's your first
day on the job. How do you get access to your team's codebase? By cloning the
repository!

```sh
> git clone https://github.com/your-team/your-codebase.git
```

Using the `git clone` command will create a new folder in your current directory
named after the repo you're cloning (in this case, `your-codebase`). Inside that
folder will be a git repository of your very own, containing the repo's entire
commit history. Now you're ready to get started.

You'll likely start on the `master` branch, but remember that this is the
default branch and it's unlikely you want to make changes to it. Since you're
working on a team now, it's important to think of how your changes to the
repository might affect others. The safest way to make changes is to create a
new branch, make your changes there, and then push your branch up to the remote
repository for review. You'll use the `git push` command to do this. Let's look
at an example:

```sh
> git branch add-my-new-file
> git add my-new-file.js
> git commit -m "Add new file"
> git push -u origin add-my-new-file
```

Notice how you used the `-u` flag with `git push`. This flag, shorthand for
`--set-upstream`, lets Git know that you want your local branch to follow a
remote branch. You've passed the same name in, so you'll now have two branches
in your local repository: `add-my-new-file`, which is where your changes live
after being committed, and `origin/add-my-new-file`, which keeps up with your
remote branch and updates it after you use `git push`. You only need to use the
`-u` flag the first time you push each new branch - Git will know what to do
with a simple `git push` from then on.

You now know how to push your changes up, but what about getting the changes
your teammates have made? For this, you'll use `git pull`. Pulling from the
remote repo will update all of your local branches with the code from each
branch's remote counterpart. Behind the scenes, Git is running two separate
commands: `git fetch` and `git merge`. Fetching retrieves the repository code
and updates any remote tracking branches in your local repo, and merge does just
you've already explored: integrates changes into the local branches. Here's a
graphic to explain this a little better:

![image-git-pull-parts][image-git-pull-parts]

It's important to remember to use `git pull` often. A dynamic team may commit
and push code many times during the day, and it's easy to fall behind. The more
often you `pull`, the more certain you can be that your own code is based on the
"latest and greatest".

### Merging your code on GitHub

If you're paying close attention, you may have noticed that there's a missing
step in your workflows so far: how do you get your code merged into your default
branch? This is done by a process called a _Pull Request_.

A pull request (or "PR") is a feature specific to GitHub, not a feature of Git.
It's a safety net to prevent bugs, and it's a critical part of the collaboration
workflow. Here's a high-level of overview of how it works:

- You push your code up to GitHub in its own branch.
- You open a pull request against a _base branch_.
- GitHub creates a comparison page just for your code, detailing the changes
  you've made.
- Other members of the team can review your code for errors.
- You make changes to your branch based on feedback and push the new commits up.
- The PR automatically updates with your changes.
- Once everyone is satisfied, a repo maintainer on GitHub can merge your branch.
- Huzzah! Your code is in the main branch and ready for everyone else to
  `git pull`.

You'll create and manage your pull requests via GitHub's web portal, instead of
the command line. You'll walk through the process of creating, reviewing, and
merging a pull request in an upcoming project.

## What you've learned

This lesson included lots of new lingo and two new tools you can take advantage
of immediately: Git and GitHub.

- You should feel comfortable exploring both of these more on your own.
- You should understand that a VCS is a critical part of your development
  workflow.
- You able to get started tracking your own projects and sharing code across a
  team.

If it's still a little hazy, never fear! Git will be a core part of your
projects going forward. You'll get lots of practice `pull`ing, `push`ing, and
`clone`-ing in the coming months.

[GitHub]: https://github.com
[VS Code and macOS documentation]:
  https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line
[image-git-timeline]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-timeline.svg
[image-git-status-output]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-status-output.svg
[image-git-log-output]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-log-output.svg
[image-git-branch]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-branch.svg
[image-git-pull-parts]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-pull-parts.svg

________________________________________________________________________________
# Browsing Your Git Repository

Repositories can feel intimidating at first, but it won't take you long to
navigate code like you own the place - because you do! Let's discuss a few tools
native to Git that help us browse our changes over time.

We'll be covering:

- Comparing changes with `git diff`
- Browsing through our code "checkpoints" with `git checkout`

## Seeing changes in real time

Git is all about change tracking, so it makes sense that it would include a
utility for visualizing a set of changes. We refer to a list of differences
between two files (or the same file over time) as a _diff_, and we can use
`git diff` to visualize diffs in our repo!

When run with no extra options, `git diff` will return any tracked changes in
our working directory since the last commit. **Tracked** is a key word here;
`git diff` won't show us changes to files that haven't been included in our repo
via `git add`. This is helpful for seeing what you've changed before committing!
Here's an example of a small change:

![git-diff][git-diff]

Let's break down some of the new syntax in this output.

- The diff opens with some Git-specific data, including the branch/files we're
  checking, and some unique hashes that Git uses to track each diff. You can
  skip past this to get to the important bits.

- `---` & `+++` let us know that there are both additions and subtractions in
  the file "App.js". A diff doesn't have a concept of inline changes - it treats
  a single change as removing something old and replacing it with something new.

- `@@` lets us know that we're starting a single "chunk" of the diff. A diff
  could have multiple chunks for a single file (for example: if you made changes
  far apart, like the header & footer). The numbers in between tell us how many
  lines we're seeing and where they start. For example: `@@ +1,3 -1,3 @@` means
  we'll see three lines of significant content, including both addition &
  removal, beginning at line one.

- In the code itself, lines that were removed are prefixed with a `-` and lines
  that were added are prefixed with a `+`. Remember that you won't see these on
  the same lines. Even if you only changed a few words, Git will still treat it
  like the whole line was replaced.

[git-diff]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-diff-output.svg

### Diff options

Remember that, by default, `git diff` compares the current working directory to
the last commit. You can compare the staging area instead of the working
directory with `git diff --staged`. This is another great way to double-check
your work before pushing up to a remote branch.

You're also not limited to your current branch - or even your current commit!
You can pass a base & target branch to compare, and you can use some special
characters to help you browse faster! Here are a few examples:

```sh
# See differences between the 'feature'
# branch and the 'master' branch.
> git diff master feature

# Compare two different commits
> git diff 1fc345a 2e3dff

# Compare a specific file across separate commits
> git diff 1fc345a 2e3dff my-file.js
```

## Time travel

`git diff` gives us the opportunity to explore our code's current state, but
what if we wanted to see its state at a different point in time? We can use
_checkout_! `git checkout` lets us take control of our `HEAD` to bounce around
our timeline as we please.

Remember that `HEAD` is a special Git reference that usually follows the latest
commit on our current branch. We can use `git checkout` to point our `HEAD`
reference at a different commit, letting us travel to any commit in our
repository's history. By reading the commit message and exploring the code at
the time of the commit, we can see not only what changed but also why it
changed! This can be great for debugging a problem or understanding how an app
evolved.

Let's look at a diagram to understand what `checkout` does a little better:

![checkout][img-checkout]

Notice that we haven't lost any commits, commit messages, or code changes. Using
`git checkout` is entirely non-destructive.

To browse to a different commit, simply pass in a reference or hash for the
commit you'd like to explore. `git checkout` also supports a few special
characters & reserved references:

```sh
# You can checkout a branch name.
# You'll be using this particular branch a lot!
> git checkout master

# You can also use commit hashes directly
> git checkout 7d3e2f1

# Using a hyphen instead of a hash will take
# you to the last branch you checked out
> git checkout -

# You can use "HEAD~N" to move N commits prior
# to the current HEAD
> git checkout HEAD~3
```

Once you're done browsing the repo's history, you can use
`git checkout <your-branch-name>` to move `HEAD` back to the front of the line
(your most recent commit). For example, in our diagram above, we could use
`git checkout master` to take our `HEAD` reference back to commit `42ffa1`.

[img-checkout]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-checkout.svg

### Why checkout?

Most of Git's power comes from a simple ability: viewing commits in the past and
understanding how they connect. This is why mastering the `git checkout` command
is so important: it lets you think more like Git and gives you full freedom of
navigation without risking damage to the repo's contents.

That said, you'll likely use shortcuts like `git checkout -` far more often than
specifically checking out commit hashes. Especially with the advent of
user-friendly tools like GitHub, it's much easier to visualize changes outside
the command line. We'll demonstrate browsing commit histories on GitHub in a
future lesson.

## What we've learned

We're building our skill set for navigating code efficiently, and we're starting
to got more accustomed to seeing our projects as a series of checkpoints we can
review instead of a single point in time.

- You should be able to compare code changes between commits or files.
- You should have confidence when switching between branches or commits.
- You should understand the role of `git checkout` as fundamental to how Git
  organizes our projects.

________________________________________________________________________________
# Git Do-Overs: Reset & Rebase

Git is designed to protect you - not only from others, but also from yourself!
Of course, there are times where you'd like to exercise your own judgement, even
if it may not be the best thing to do. For this, Git provides some helpful tools
to change commits and "time travel".

Before we talk about these, a warning: **The commands in this lesson are
destructive!** If used improperly, you could lose work, damage a teammate's
branch, or even rewrite the history of your entire project. You should exercise
caution when using these on production code, and don't hesitate to ask for help
if you're unsure what a command might do.

After this lesson, you should:

- Be able to roll back changes to particular commit.
- Have an understanding of how rebasing affects your commit history.
- Know when to rebase/reset and when **not** to.

## Resetting the past

Remember how our commits form a timeline? We can see the state of our project at
any point using `git checkout`. What if we want to travel back in time to a
point before we caused a new bug or chose a terrible font? `git reset` is the
answer!

_Resetting_ involves moving our `HEAD` ref back to a different commit. No matter
how we reset, `HEAD` will move with us. Unlike `git checkout`, this will also
destroy intermediate commits. We can use some additional flags to determine how
our code changes are handled.

## Starting small: Soft resets

The least-dangerous reset of all is `git reset --soft`. A soft reset will move
our `HEAD` ref to the commit we've specified, and will leave any intermediate
changes in the staging area. This means you won't lose any code, though you will
lose commit messages.

A practical example of when a soft reset would be handy is joining some small
commits into a larger one. We'll pretend we've been struggling with "their",
"there", and "they're" in our app. Here's our commit history:

![reset-soft-history-before][reset-soft-history-before]

Those commit messages aren't great: they're not very explanatory, and they don't
provide a lot of value in our commit history. We'll fix them with a soft reset:

```sh
git reset --soft 9c5e2fc
```

This moves our `HEAD` ref back to our first commit. Looking at our commit log
now, we might be worried we've lost our changes:

![image-git-reset-soft-history-during][image-git-reset-soft-history-during]

However, check out `git status`:

![image-git-reset-status-after-soft][image-git-reset-status-after-soft]

You'll see that our changes are still present in the staging area, ready to be
re-committed when we're ready! We can use `git commit` to re-apply those changes
to our commit history with a new, more helpful message instead:

![image-git-reset-soft-history-after][image-git-reset-soft-history-after]

Notice that the new commit has a totally new hash. The old commit messages (and
their associated hashes) have been lost, but our code changes are safe and
sound!

[reset-soft-history-before]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-soft-history-before.svg
[image-git-reset-soft-history-during]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-soft-history-during.svg
[image-git-reset-status-after-soft]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-status-after-soft.svg
[image-git-reset-soft-history-after]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-soft-history-after.svg

## Getting riskier: Mixed resets

If soft resets are the safest form of `git reset`, mixed resets are the most
average! This is exactly why they're the default: running `git reset` without
adding a flag is the same as running `git reset --mixed`.

In a mixed reset, your changes are preserved, but they're moved from the commit
history directly to the working directory. This means you'll have to use
`git add` to choose everything you want in future commits.

Mixed resets are a good option when you want to alter a change in a previous
commit. Let's use a mixed reset with our "their", "there", "they're" example
again.

We'll start with "they're":

![image-git-reset-mixed-history-before][image-git-reset-mixed-history-before]

Instead of pushing ahead, we'd like to revoke that change and try it again.
Let's use a mixed reset:

```sh
git reset 9c5e2fc
```

Now you'll see that your changes are in the working directory instead of the
staging area:

![image-git-reset-status-after-mixed][image-git-reset-status-after-mixed]

You can edit your files, make the changes you'd like, and use `git add` and
`git commit` to add a new commit to your repo:

![image-git-reset-mixed-history-after][image-git-reset-mixed-history-after]

Notice again that you don't lose your code with a mixed reset, but you do lose
your commit messages & hashes. The difference between `--soft` and `--mixed`
comes down to whether you'll be keeping the code exactly the same before
re-committing it or making changes.

[image-git-reset-mixed-history-before]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-mixed-history-before.svg
[image-git-reset-status-after-mixed]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-status-after-mixed.svg
[image-git-reset-mixed-history-after]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-mixed-history-after.svg

## Red alert! Hard resets

Hard resets are the most dangerous type of reset in Git. Hard resets adjust your
`HEAD` ref and _totally destroy any interim code changes_. Poof. Gone forever.

There are very few good uses for a hard reset, but one is to get yourself out of
a tight spot. Let's say you've made a few changes to your repository but you now
realize those changes were unnecessary. You'd like to move back in time so that
your code looks exactly as it did before any changes were made.
`git reset --hard` can take you there.

It's our last round with "their", "there", and "they're". We've tried it all
three ways and decided we don't need to use that word at all! Let's walk through
a hard reset to get rid of our changes.

We'll start in the same place we began for our soft reset:

![image-git-reset-soft-history-before][image-git-reset-soft-history-before]

It turns out that we'll be using a video on our homepage and don't need text at
all! Let's step back in time:

```sh
git reset --hard 9c5e2fc
```

Our Git log output is much simpler now:

![image-git-reset-soft-history-during][image-git-reset-soft-history-during]

Take a look at `git status`:

![image-git-reset-status-before-after][image-git-reset-status-before-after]

It's empty - no changes in your working directory and no changes in your staging
area. This is major difference between a hard reset and a soft/mixed reset: you
will lose _all your changes_ back to the commit you've reset to.

If your teammate came rushing in to tell you that the boss has changed their
mind and wants that homepage text after all, you're going to be re-doing all
that work! Be very confident that the changes you're losing are unimportant
before embarking on a hard reset.

[image-git-reset-soft-history-before]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-soft-history-before.svg
[image-git-reset-soft-history-during]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-soft-history-during.svg
[image-git-reset-status-before-after]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-reset-status-before-after.svg

## Rebase: An alternative form of time travel

Sometimes we want to change more than a few commits on a linear timeline. What
if we want to move multiple commits across branches? `git rebase` is the tool
for us!

_Rebasing_ involves changing your current branch's base branch. We might do this
if we accidentally started our branch from the wrong commit or if we'd like to
incorporate changes from another branch into our own.

You're probably thinking "Gee, this sounds familiar! Can't we accomplish those
tasks with `git merge`?" In almost all cases, you'd be right. Rebasing is a
dangerous process that effectively rewrites history. There's a whole slew of
movies, books, and TV shows that explain why rewriting history is a bad idea!

## Okay, rebasing is risky! Show me anyway.

Let's look at a situation where we might be tempted to rebase. We've added a
couple commits to a feature branch while other team members have been merging
their code into the `master` branch. Once we're ready to merge our own branch,
we probably want to follow a tried-and-true procedure:

```sh
> git pull origin master
```

This will fetch our remote `master` branch and merge its changes into our own
feature branch, so it's safe to pull request or `git push`. However, every time
we do that, a merge commit will be created! This can make a big mess of our Git
commit history, especially if lots of people are making small changes.

We can use `git rebase` to move our changes silently onto the latest version of
`master`. Here's what the `git log` history of our two example branches looks
like:

### `master`

![image-git-rebase-master-before][image-git-rebase-master-before]

[image-git-rebase-master-before]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-rebase-master-before.svg

### `working-on-the-header` (our feature branch)

![image-git-rebase-feature-before][image-git-rebase-feature-before]

Notice that both branches start at `9c5e2fc`. That's our common ancestor commit,
and is where `git merge` would start stitching these branches together! We're
going to avoid that entirely with a rebase. We'll run this command while we have
`working-on-the-header` checked out:

```sh
git rebase master
```

Here's our new commit history:

![image-git-rebase-after][image-git-rebase-after]

And a diagram of what just happened:

![image-git-rebase-before-and-after][image-git-rebase-before-and-after]

See how we changed the color of our commits after the rebase? Take a close look
at the commit history changes as well. Even though our commits have the same
content, they have a new hash assigned, meaning they're entirely new commits!
This is what we mean by "rewriting history": we've actually changed how Git
refers to these changes now.

[image-git-rebase-feature-before]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-rebase-feature-before.svg
[image-git-rebase-after]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-rebase-after.svg
[image-git-rebase-before-and-after]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-rebase-before-and-after.svg

## One last warning & the "Golden Rule of Git"

These tools can all feel pretty nifty, but be very wary of using them too much!
While they can augment your Git skills from good to great, they can also have
catastrophic side effects.

There's a "Golden Rule of Git" you should know that directly relates to both
`git reset` and `git rebase`:

> Never change the history of a branch that's shared with others.

That's it! It's simple and to the point. If you're resetting or rebasing your
own code and you make a mistake, your worst case scenario is losing your own
changes. However, if you start changing the history of code that others have
contributed or are relying on, your accidental loss could affect many others!

## What we've learned

What a wild trip we've been on! Watching commits come and go as we `git reset`
and `get rebase` can get a little confusing. Remember that while these tools are
unlikely to be part of your everyday workflow, they're great topics for
technical interviews. You should:

- Understand how `git reset` differs from `git checkout`.
- Be able to list the 3 types of `git reset` and differentiate them.
- Be comfortable comparing and contrasting `git rebase` and `git merge`.
- Remember the "Golden Rule of Git": never rewrite history after a `git push`!

________________________________________________________________________________
# Git Merge Conflicts & You

Welcome to the arena! Let's discuss what you'll need to do when attempting to
merge two conflicting Git branches. You'll get to make the final say in which
code enters...and which code leaves!

In this lesson, we'll discuss:

- The `git merge` process in-depth
- Managing conflicting code across branches
- Common workflows to help know how & when to merge

## What is a "merge conflict"?

Whoa there - maybe we dove in a little too fast. Let's discuss what a merge
conflict is and how we can resolve it.

First off, what is a _merge conflict_? It's a special state Git presents us with
when two branches have code changes that are incompatible with each other.
Here's a very simple example:

- You're working on a team trying to design a new app. You're working on the Git
  branch `my-red-app`, because you've decided that the app's primary color
  should be red! You add the following code to line 3 of your app's main file,
  `App.js`:

```javascript
this.primaryColor = red;
```

- At the same time, one of your teammates has opened the `my-blue-app` branch
  with an alternative decision on your app's aesthetics. They add the following
  code to line of 3 of their `App.js` file:

```javascript
this.primaryColor = blue;
```

- Your friend types a little faster than you and has already merged their code
  into the `master` branch. You get ready to merge your own code and...**Merge
  Conflict!**

Git identifies changes to `master` since your branch began and flags similar
changes in the same place on your branch. Instead of trying to make a decision
on your behalf, it hands you control. A merge conflict is Git's way of saying
"I'm not sure what to do - help!".

Here's what a merge conflict looks like between branches:

![mrg-conflict][mrg-conflict]

Yikes! Remember that this looks awfully complicated, but the theory is pretty
simple. In the workplace you'll need to resolve much more complicated conflicts
than this so now's the time to get your practice in.

[mrg-conflict]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-merge-conflict.svg

## Resolving a merge conflict

Git is a complex tool, but it's built to help guide us as much as it can. Merge
conflicts are no different. You will find that resolving them is easy once you
know what you're looking at.

We'll stick with our "Red vs. Blue" example from above. When you attempt to
`git merge`, you'll get a message like the following:

![mrg-conflict-msg][mrg-conflict-msg]

Git is so helpful - it's telling us where to look _and_ what to do! Following
the instructions here, we'll look at `App.js`, resolve the conflict, and
`git commit` with our resolved file(s).

For even more info, check out `git status` during a merge conflict:

![mrg-conflict-status][mrg-conflict-status]

Notice the `both modified` prefix, reminding us that we have a conflict. "Both"
refers to our two branches, `my-red-app` and `master`, which each include
changes to the conflicting file. It's up to us to decide what code the file
should contain when we complete the merge.

[mrg-conflict-msg]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-merge-conflict-message.svg
[mrg-conflict-status]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-merge-conflict-status-output.svg

## Conflict Resolution

If we open the conflicting file, we'll see some new syntax:
![conflict-operators][conflict-operators]

Notice the `<<<<<<` (line 3), `======` (line 5), and `>>>>>>` (line 7). These
are special delimiters that Git uses to separate two pieces of conflicting code.

The first piece of code (between `<<<<<<` and `======`) comes from our _base
branch_ - the branch we're merging in to, which we're currently on. We can see
it's labelled "HEAD", and VS Code is helping us out by noting that this is the
"Current Change".

The second piece of code (between `======` and `>>>>>>`) comes from our
_incoming branch_. VS Code is again helping us out by labelling this as the
"Incoming Change".

To resolve this conflict, we need to decide which code to keep and which to get
rid of. This is where your communication skills become important! During a merge
conflict, you'll need to check in with teammates to decide what's best. Once
you've come to a decision, you can edit the file, leaving only the code you want
in the base branch when the conflict is over. If we decided to keep "red" in our
example, we would delete lines 3, 4, 5, and 7.

You can do this manually in other editors, but VS Code helps us by providing the
"Accept" buttons above our conflict. You can click "Accept Incoming Changes" to
automatically update the code for us. It will remove the "Current Changes" and
any delimiters related to this conflict, leaving only the "Incoming Changes" we
chose to keep.

[conflict-operators]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-merge-conflict-inline-operators.svg

## Back on solid ground

Once you've saved your resolved file, the process is more familiar. You'll save
your file, use `git add` to add it to the staging area, and `git commit` to
complete the merge. Git will help you out with the commit message: it should say
something like "Merge branch 'my-red-branch'", though you can change this during
the commit process if you'd like.

There are a few important things to note:

- Not every merge results in a conflict, and not every change between two
  branches requires resolution! Git is smart about bringing code together when
  it's in separate files or on different lines, so it won't need your help to
  resolve every single change. It's only when two pieces of code actually
  conflict that Git will ask you to get involved.

- `git merge` is the safest way to ensure your code is up to date. We've looked
  at merging a "finished" branch back into `master` here, but you can also merge
  `master` into your feature branch while you're working on it! While this may
  cause conflicts, you're well-equipped to handle them now.

- Merge conflicts will always result in a _merge commit_: an extra commit in
  your history documenting where code was merged in from other sources. We'll
  discuss more dangerous ways of merging in code without these commits in an
  upcoming lesson.

## What we've learned

Whew! We've emerged victorious from our merge conflict and can start work on a
new branch or feature. Merge conflicts are a nearly daily part of life as a
developer.

- You should now be able to identify the difference between a base branch and
  incoming branch.
- You should understand how `git merge` works and what it does when it's unable
  to proceed automatically.
- You're now familiar with resolving merge conflicts, both with VS Code's
  helpers and when in another editor by manually editing code.

________________________________________________________________________________
# "Scrum" Stands For ... Nothing!

The word "scrum" is not an acronym. Rather, it is a term borrowed from the sport
of rugby where it refers to the method of restarting a game after an accidental
infringement, or when the ball has gone out of play. The players of the two
teams group together around the rugby ball, arms locked, heads down, struggling
to gain possession of the ball. An article in the _Harvard Business Review_ used
this sports-based phenomenon as a metaphor for product development in the 1986
article "The New New Product Development Game".

> The ... "relay race" approach to product development ... may conflict with the
> goals of maximum speed and flexibility. Instead a holistic or “rugby”
> approach—where a team tries to go the distance as a unit, passing the ball
> back and forth—may better serve today’s competitive requirements.

This article inspired Jeff Sutherland to invent the "Scrum process" in 1993 for
use on a software development team. at Easel Corporation. Two years later, Ken
Schwaber published the first paper on Scrum at OOPSLA. From that conference,
others tried the methodology as Sutherland and Schwaber wrote books, articles,
and presented at conferences about their novel approach to creating software.

In this reading, you will learn about all of the different practices and
artifacts in the standard Scrum framework.

## The standard Scrum process

Surprise! There is _no_ standardized process! There is no series of sequential
steps for you and your team to methodically follow to produce high-quality
products. Instead, Scrum is a **framework** for organizing and managing work. It
is a framework based on a set of values, practices, and principles that provide
a foundation to which your team can add its unique practices and specific
approaches for realizing "Scrum". This results in a version of Scrum that
uniquely fits your team.

This is the reason that Scrum has become the leading contender in the pantheon
of certified Agile software development methodologies. Most of the other
methodologies have sets of strict rules about what must be done and actions that
people must take. These restrictions made those other Agile software development
methodologies unpalatable to many companies.

Of course, the flip side is that an organization's "unique practices and special
approaches" can pollute the Scrum process, turing it into an aberration and
rendering it a useless and frustrating morass of bureaucracy and bookkeeping.
So, best to keep it as pure and simple as the Scrum framework describes.

## The Scrum practices

Scrum has been described as a "refreshingly simple, people-centric framework
based on the values of honesty, openness, courage, respect, focus, trust,
empowerment, and collaboration."  These value manifest themselves in four
dimensions in Scrum:

* the roles of the people that participate in Scrum;
* the activities in which a team using Scrum will participate;
* the artifacts created to manage the process; and,
* the rules that bind the interactions of the roles, activiites, and artifacts.

## Scrum roles

When you work on a team using Scrum, the people on that team take on a role in
the Scrum process. The three roles are **product owner**, **Scrum master**, and
a member of the **development team**. It is best when no one person fills more
than one role. (Of course, many companies say, "We can customize Scrum to meet
our own special way of doing things, and our special way of doing things is to
be cheap and not spend money on humans to actually help out with product
development!") The product owner shoulders the responsibility for what will be
developed and the order in which the features of the software will be
implemented. The Scrum master gets to guide the team in creating and following
its own Scrum-based process. The members of the development team determine how
to deliver the features asked for by the product owner.

So, where is "manager" or "team lead"? Where is "Vice President" and "CEO? You
should note that **product owner**, **Scrum master**, and being a member of the
**development team** are _roles_ and not titles. Anyone can fit into those roles
as long as they live up to the expectations set by that role.

### The product owner

The product owner provides the leadership needed to define the product. That
person has the singlular authority to decide which features and functionality to
build and in which order to build them. The product owner must have a clear
vision of what the product the Scrum team is trying to build. Because this
person must define and communicate that vision, the product owner is responsible
for the overall success of the software (or other product) in development or
maintenance.

It doesn't matter if the focus for the software being built is something to be
sold to consumers (B2C software), sold to other businesses (B2B software), or
used solely within the company (internal software). The product owner has the
obligation to make sure the team performs the most valuable work possible. To
ensure that the team rapidly builds what the product owner wants, the product
owner actively collaborates with the Scrum master and development team. The
product owner must avail themselves for questions from the development team that
could arise at any time.

### The Scrum master

The Scrum master helps everyone understand and embrace the Scrum values and
principles, the practices and procedures. The Scrum master provides process
leadership. The Scrum master helps the Scrum team and the rest of the company
develop their own organization-specific, high-performance adaptation of Scrum.

As a facilitator of Scrum, the Scrum master helps the team continuously improve
it use of Scrum, allowing the team to focus on its product development
priorities. Preventing the team from getting distracted by outside interference
and by removing roadblocks that inhibit the team's productivity, the Scrum
master plays the pivotal role of the facilitator of team focus.

It is extremely important to note that the Scrum master is _not_ a project
manager or development manager. The Scrum master has no formal authority to
control what a team does. Instead, the Scrum master acts as a _leader_, not a
manager.

### The development team

You may have heard of different types of people that fit into the software
development process: QA tester, database administrator, user interface designer,
user experience engineer, programmer, architect, and more. Scrum eschews any of
those and provides only the single term of "development team" to encapsulate and
acknowledge the diverse group of people that it takes to make any non-trivial
software product.

The development team organizes itself around the principles of Scrum to
determine the best way to practice Scrum. A development team typically ranges in
size from five to ten people. Together, the members of the team have the
necessary skills to produce well-designed and well-tested software. Some very
large companies practice Scrum; instead of having their hundreds of software
developers all on a single huge Scrum team, they will normally create groups of
five to ten people to make up small Scrum teams all working on parts of a larger
product.

## Scrum activities. Scrum artifacts.

The activities that make up the performances of the different roles of a Scrum
team are simple to list. They are a cycle that gets performed over and over
again.

1. The product owner has a vision of what needs to be created.
2. The product owner takes that vision and breaks it down into a list of
   features yet to be implemented called the **backlog**.
3. The product owner manages the backlog through a process called **grooming**
   which leaves the list in a prioritized order.
4. The development process begins with an activity named **sprint planning**
   which culminates in the team forecasting how many features they will be able
   to complete within a predetermined amount of time.
5. Once planning ends, the Scrum team attempts to complete the features that
   that they forecasted they could complete. Each day during sprint execution,
   the team members help coordinate their work through am inspection,
   synchronization, and adaptive planning activity known as the **daily scrum**.
   (Notice the lowercase "s" in "daily scrum".)
6. The team completes the Sprint by performing two more inspection and
   adaptation activities: the **show and tell** and the **sprint
   retrospective**. The outcome of these activities can alter the way the team
   decides to complete their work in the future.

The time that it takes to perform steps 4, 5, and 6 is the predetermined amount
of time called a **sprint**. A sprint normally lasts from one week to one month
depending on how the team has implemented Scrum.

### The product backlog

All Agile software development methodologies try to do the most valuable or the
most complex work first. The product owner, with input from the rest of the
Scrum team (and bosses), determines and manages this sequnce of work by
communicating it to the Scrum master and development team through the
prioritized list known as the _product backlog_. When creating new products,
usually the product owner fills the backlog with features that are required to
meet the vision of the product for it to go to market. For on-going product
development (maintenance mode), the product backlog will usually contain new
features combined with changes to existing features, bugs that need repairing,
fixes to technical debt, and more,

The product owner gathers the priorities of external and internal stakeholders
to define the items in the product backlog. Based on those priorities, the
product owner orders the items in the product backlog so that the high-value
items appear at the top of the product backlog. The product owner grooms the
backlog in that manner as often as necessary to make sure that the highest
priority items are always at the top of the list.

### Sprints

In Scrum, work is performed in iterations or cycles of up to a month called
sprints. The work completed in each sprint should create something of tangible
value for the people that use the software.

Sprints are **timeboxed** so they always have a fixed start and end date. They
are usually all the same duration. A new sprint immediately follows the
completion of an old sprint. As a rule, the team does do not change the team
members or what they work on during a sprint; however, business needs sometimes
make it impossible to follow that rule.

### Sprint planning

A product backlog may represent many weeks or months of work, which is much more
than can be completed in a single, short sprint. To determine the most important
subset of product backlog items to build in the next sprint, the product owner,
development team, and Scrum master perform **sprint planning**.

During sprint planning, the product owner and development team agree on a sprint
goal that defines what the upcoming sprint is supposed to achieve. Using this
goal, the development team reviews the product backlog and determines the
high-priority items that the team can realistically accomplish in the upcoming
sprint while working at a sustainable pace. It is important to note that the
team agrees on what it believes to be its own sustainable pace. Some teams can
work longer than others. Some teams have maintenance commitments. Each team has
different demands on it.

To acquire confidence in what it can get done, many development teams break down
each targeted feature into a set of tasks. The collection of these tasks, along
with their associated product backlog items, forms a second backlog called the
**sprint backlog**.

The development team then provides an estimate (typically in hours) of the
effort required to complete each _task_. Breaking product backlog items into
tasks is a form of design and just-in-time planning for how to get the features
done.

## Running the sprint

Once the Scrum team finishes sprint planning and determines the features that it
will complete in the next sprint, the development team, guided by the Scrum
master’s coaching, performs all of the task-level work necessary to get the
features done. “Done” means that the software developers have performed tasks to
ensure the highest quality of software, and that the product owner has approved
each feature's completion.

Nobody tells the development team in what order or how to do the task-level work
in the sprint backlog. Instead, team members define their own task-level work
and then self-organize in any manner they feel is best for achieving the sprint
goal.

### Daily scrum

Each day of the sprint, ideally at the same time, the development team members
hold a short (15 minutes or less) **daily scrum**. This activity is often
referred to as the **daily stand-up** because of the common practice of everyone
standing up during the meeting to help promote brevity.

A common approach to performing the daily scrum has each team member taking
turns answering three questions for the benefit of the other team members:

* What did I accomplish yesterday?
* What do I hope to accomplish today?
* What obstacles or impediments prevent me from making progress?

By answering these questions, everyone understands the big picture of what is
occurring, how they are progressing toward the sprint goal, any modifications
they want to make to their plans for the upcoming day’s work, and what issues
need to be addressed. The daily scrum is essential for helping the development
team manage the fast, flexible flow of work within a sprint.

The daily scrum is _not_ a problem-solving activity. Rather, many teams decide
to talk about problems _after_ the daily scrum. They will form small groups of
interested people. The daily scrum also is not a traditional status meeting. A
daily scrum, however, can be useful to communicate the status of sprint backlog
items among the development team members. Mainly, the daily scrum is an
inspection, synchronization, and adaptive daily planning activity that helps a
self-organizing team do its job better.

### Done

In Scrum, the sprint results should be "shippable" software, meaning that
whatever the Scrum team agreed to do is really done according to its agreed-upon
definition of done. This definition specifies the degree of confidence that the
work completed is of good quality and is potentially shippable. For example,
when developing software, a bare-minimum definition of done should yield a
complete slice of product functionality that is designed, built, integrated,
tested, and documented.

A holistic definition of done enables the business to decide each sprint if
it wants to make the software available to its customers, internal or external.

As a practical matter, over time some teams may vary the definition of done. For
example, in the early stages of game development, having features that are
potentially shippable might not be economically feasible or desirable (given
the exploratory nature of early game development). In these situations, an
appropriate definition of done might be a slice of product functionality that is
sufficiently functional and usable to generate feedback that enables the team to
decide what work should be done next or how to do it.

### Show and tell

Show and tell gives the opportunity for everyone on the team to see what has
been created. In the case of many Scrum teams working in concert, this provides
a way for teams to see the work performed by other team. Critical to this
activity is the conversation that takes place among its participants, which
include the Scrum team, stakeholders, sponsors, customers, and interested
members of other teams. The conversation is focused on reviewing the just-com-
pleted features in the context of the overall development effort. Everyone in
attendance gets clear visibility into what is occurring and has an opportunity
to help guide the forthcoming development to ensure that the most
business-appropriate solution is created.

A successful review results in information flowing in both directions. The
people who aren’t on the Scrum team get to sync up on the development effort and
help guide its direction. At the same time, the Scrum team members gain a deeper
appreciation for the business and marketing side of their product by getting
frequent feedback on the growth of the product. The show and tell therefore
represents a scheduled opportunity to inspect and adapt the product.

### Sprint retrospective

The other activity at the end of the sprint is the **sprint retrospective**. It
frequently occurs after the show and tell and before the next sprint planning.

Whereas the show and tell is a time to inspect and adapt the product, the sprint
retrospective is an opportunity to inspect and adapt the process. During the
sprint retrospective the development team, Scrum master, and product owner come
together to discuss what is and is not working with all of the development
practices. The focus is on the continuous process improvement necessary to help
a good Scrum team become great. At the end of a sprint retrospective the Scrum
team should have identified and committed to a practical number of process
improvement actions, actions that they will enact during the next sprint.

After the sprint retrospective is completed, the whole cycle is repeated again—
starting with the next sprint-planning session, held to determine the current
highest- value set of work for the team to focus on.

## What you learned

You learned that Scrum is a framework that teams can use to build a sustainable
product-development process. The framework defines

* The product owner as the person that directs the highest priority development
  of the product
* The Scrum master that helps the team follow its process and be most efficient
* The development team that completes the work that the product owner specifies
* The sprint, some amount of time during which the Scrum process is run
* Sprint planning which provides the road map for what to accomplish during a
  sprint
* The daily scrum, a meeting that the Scrum team attends to communicate its
  activities and blockers
* The show and tell which allows a larger group visibility into the products of
  the sprint
* The retrospective, which allows the team to determine process improvements
* Backlog grooming performed by the product owner to ensure that the backlog of
  stories is well ordered and defined

That's the framework of Scrum, the most popular Agile software development
methodology in use today.

________________________________________________________________________________
# Let's Talk About Sprints

Scrum organizes work in iterations or cycles of up to a calendar month called
sprints. This reading provides a more detailed description of a sprint.
It then discusses several key characteristics of sprints

* That they are timeboxed;
* That they have a short and consistent duration
* That they have an unalterable goal; and,
* That they can only conclude using the team’s definition of done.

Although each team or company will have its own unique implementation of Scrum,
these sprint characteristics, with few exceptions, are meant to apply to every
sprint and every team.

## Put your sprint in a pretty timebox

Sprints are rooted in the concept of **timeboxing**, a time-management technique
that helps organize the performance of work and manage scope. Each sprint takes
place in a time frame with specific start and end dates, called a **timebox**.
Inside this timebox, the team is expected to work at a sustainable pace to
complete a chosen set of work that aligns with a sprint goal. Timeboxing is
important for several reasons.

A reason to timebox is to _establish work-in-progress (WIP) limits_. WIP
represents an inventory of work that is started but not yet finished. Failing to
properly manage it can have serious economic consequences. Because the team will
plan to work on only those items that it believes it can start and finish within
the sprint, timeboxing establishes a WIP limit each sprint.

Timeboxing forces the team to _prioritize_ and perform the small amount of work
that matters most. This sharpens the team's focus on getting something valuable
done quickly.

Timeboxing also helps us _demonstrate relevant progress_ by completing and
validating important pieces of work by a known date (the end of the sprint).
This type of progress reduces  risk by shifting the focus away from unreliable
forms of progress reporting, such as conformance to a project plan. Timeboxing
also helps to demonstrate progress against big features that require more than
one timebox to complete. Completing some work toward those features ensures that
valuable, measurable progress is being made each sprint. It also helps the
stakeholders and team learn exactly what remains to be done to deliver the
entire feature.

Timeboxing helps _avoid unnecessary perfectionism_. At one time or another
people spend too much time trying to get something “perfect” when “good enough”
would suffice. Timeboxing forces an end to potentially unbounded work by
establishing a fixed end date for the sprint by which a good solution must be
done.

Timeboxing also _motivates closure_. Teams can focus on getting things done when
they have a known end date. The fact that the end of the sprint brings with it a
hard deadline encourages team members to diligently apply themselves to complete
the work on time. Without a known end date, there is less of a sense of urgency
to complete the job.

Timeboxing _improves predictability_. Although we can’t predict with great
certainty exactly the work we will complete a year from now, it is completely
reasonable to expect that we can predict the work we can complete in the next
short sprint.

## Take advantage of this short-term deal!

Short-duration sprints make it _easier to plan_. It is easier to plan a few
weeks’ worth of work than six months’ worth of work. Also, planning on such
short time spans requires far less effort and is far more accurate than
longer-term planning.

Short-duration sprints _generate fast feedback_. During each sprint, the team
creates working software. Then, they have the opportunity to inspect and adapt
what was built and how they built it. This fast feedback enables the team to
quickly prune unfavorable product paths or development approaches before those
choices can compound a bad decision with many follow-on decisions that are
coupled to the bad decision. Fast feedback also allows us to more quickly
uncover and exploit time-sensitive emergent opportunities.

Short-duration sprints not only improve the economics via fast feedback; they
also allow for _early and more frequent deliverables_. As a result, the company
can have the opportunity to generate revenue sooner, improving the overall
return on investment.

Short-duration sprints also _bound error_. How wrong can a team get in a
two-week sprint? Even if the team does everything wrong, the group has lost only
two weeks. Scrum insists on short-duration sprints because they provide frequent
coordination and feedback. That way, if the team gets something wrong, then
they get something wrong in only a small way.

Short-duration sprints also provide _multiple, meaningful checkpoints_. One
valued aspect of sequential projects is a well-defined set of "milestones".
These milestones provide managers with expectations about what should be
delivered by a certain date. If things don't happen by that date, it allows the
team to decide if the project should continue. Although potentially useful from
a governance perspective, these milestones give an unreliable indication of the
true status of a project.

Scrum provides managers, stakeholders, product owners, and others with many more
checkpoints than they would have with sequential projects. At the end of each
short sprint, there is a meaningful checkpoint (the show and tell) that allows
everyone to base decisions on demonstrable, working features. People are better
able to deal with a complex environment when they have more actionable
checkpoint opportunities to inspect and adapt.

## The duration remains the same

As a rule, on a given development effort, a team should pick a consistent
duration for its sprints and not change it unless there is a compelling reason.
Compelling reasons might include the following:

* Your team may move from one-month sprints to two-week sprints in order to
  obtain more frequent feedback
* The annual holidays or end of the fiscal year make it more practical to run
  a longer sprint
* The product release occurs in one week, so a two-week sprint would be
  incongruous

The fact that the team cannot get all the work done within the current sprint
length is not a compelling reason to extend the sprint length. Neither is it
permissible to get to the last day of the sprint, realize you are not going to
be done, and lobby for an extra day or week. These are symptoms of dysfunction
and opportunities for improvement; they are not good reasons to change the
sprint length.

As a rule, therefore, if a team agrees to perform two-week sprints, all sprints
should be two weeks in duration. As a practical matter, most (but not all) teams
will define two weeks to mean ten calendar weekdays. If there is a one-day
holiday or training event during the sprint, it reduces the team’s capacity for
that sprint but doesn’t necessitate a sprint length change.

### The metronome effect

Sprints of the same duration provide the team with **cadence**, a regular,
predictable rhythm or heartbeat to a Scrum development effort. A steady, healthy
heartbeat allows the Scrum team and the organization to acquire an important
rhythmic familiarity with when things need to happen to achieve the fast,
flexible flow of business value. Having a regular cadence to sprints enables
people to “get into the zone,” “be on a roll,” or “get into a groove.”

Having a short sprint cadence also tends to level out the intensity of work.
Unlike a traditional sequential project where we see a steep increase in
intensity in the latter phases, each sprint has a similar intensity to that of
the other sprints.

Sprinting on a regular cadence also significantly reduces coordination overhead.
With fixed-length sprints everyone can predictably schedule the sprint-planning,
sprint review, and sprint retrospective activities for many sprints at the same
time. Because everyone knows when the activities will occur, the overhead
required to schedule them for a large batch of sprints is substantially reduced.

As an example, if you work on two-week sprints on a yearlong development effort,
you can send out the recurring event on everyone’s calendar for the next 26
sprint reviews. If you allowed sprint durations to vary from sprint to sprint,
imagine the extra effort you would need to coordinate the schedules of the
stakeholders on what might be just one or two weeks’ notice for an upcoming
sprint review! That assumes that you could even find a time that worked for the
core set of stakeholders, whose schedules are likely filled up many weeks ahead.

## Keeping your eye on the goal

An important Scrum rule states that once the sprint goal has been established
and sprint execution has begun, no change is permitted that can materially
affect the sprint goal.

Each sprint can be summarized by a sprint goal that describes the business
purpose and value of the sprint. Typically the sprint goal has a clear, single
focus, such as:

* Support customer service with new tooling
* Load and curate new geophysical data
* Integrate a new billing process into the application

There are times when a sprint goal might be multifaceted, for example, “Get
large-screen support working and support search by customer name.”

During sprint planning, the development team should help refine and agree to the
sprint goal and use it to determine the product backlog items that it can
complete by the end of the sprint. These product backlog items serve to further
elaborate the sprint goal.

### We commit to one another

The sprint goal is the foundation of a mutual commitment made by the team and
the product owner. The team commits to meeting the goal by the end of the
sprint, and the product owner commits to not altering the goal during the
sprint.

This mutual commitment demonstrates the importance of sprints in balancing the
needs of the business to be adaptive to change, while allowing the team to
concentrate and efficiently apply its talent to create value during a short,
fixed duration. By defining and adhering to a sprint goal, the Scrum team is
able to stay focused on a well-defined, valuable target.

### Clarifying the goal should not change the goal

Although the sprint goal should not be materially changed, it is permissible to
clarify the goal.

What constitutes a change? A change is any alteration in work or resources that
has the potential to generate meaningful wasted effort, egregiously disrupt the
flow of work, or substantially increase the scope of work within a sprint.
Adding or removing a product backlog item from a sprint or significantly
altering the scope of a product backlog item that is already in the sprint
typically constitutes change. The following example illustrates a change:

> Product owner: "Hey! When I said that we need to be able to search the
> inventory database by product name or description, I also meant that we should
> be able to search for it by a picture of the product!"

Adding the ability to search based on a picture likely represents substantially
more effort and almost certainly would affect the team’s ability to meet a
commitment to deliver search based on a name and description. In this case, the
product owner should consider creating a new product backlog item that captures
the search-by-picture feature. Then, they can add it to the product backlog to
be worked on in a later sprint.

What constitutes a clarification? Clarifications are additional details provided
during the sprint that assist the team in achieving its sprint goal. All of the
details associated with product backlog items might not be fully known or
specified at the start of the sprint. Therefore, it is completely reasonable for
the team to ask clarifying questions during a sprint and for the product owner
to answer those questions. The following example illustrates a clarification:

> Development team: "When you said that the matches for a product search should
>be displayed ina list, did you have a preference for how the list should be
>sorted?
>
>Product owner: "Yeah, by product name."
>
>Development team: "Great! We can do that!"

### The weight of change

It may appear that the no-goal-altering-change rule is in direct conflict with
the core Scrum principle that teams should embrace change. Though teams do
embrace change, they want to embrace it in a balanced, economically sensible
way.

The team invests in product backlog items to get them ready to be worked on in a
sprint. However, once a sprint starts, that investment in those product backlog
items has increased (because everyone spent time during sprint planning to
discuss and plan them at a task level). If someone wants to make a change after
sprint planning has occurred, they not only jeopardize the planning investment,
but the team also incur additional costs for having to replan any changes during
the sprint.

In addition, once we begin sprint execution, our investment in work increases
even more as product backlog items transition through the states of to do (work
not yet started), doing (work in process), and done (work completed).

Let’s say the product owner want to swap out feature X, currently part of the
sprint commitment, and substitute feature Y, which isn’t part of the existing
commitment. Even if no one has started working on feature X, the team still
incurs planning waste. In addition, feature X might also have dependencies with
other features in the sprint, so a change that affects feature X could affect
one or more other features, thus amplifying the negative effect on the sprint
goal.

Continuing that analysis, if work on feature X has already begun, in addition to
the wasted work completed, there can be other potential wastes. For example, all
of the work already performed on feature X might have to be thrown away. And the
team might have the additional waste of removing the partially completed work on
feature X, which may never get used in the future.

In addition to the direct economic consequences of waste, the economics can be
indirectly affected by the potential deterioration of team motivation and trust
that can accompany a change to a sprint. When the product owner makes a
commitment to not alter the goal and then violates the commitment, the team
naturally will be demotivated, which will almost certainly affect its desire to
work diligently to complete other prod- uct backlog items. In addition,
violating the commitment can harm the trust within the Scrum team, because the
development team will not trust that the product owner is willing to stick to
his commitments.

### Pragmatism in the face of perfection

The rule to not change a sprint goal is just that: a rule, not a law. The Scrum
team has to be pragmatic.

What if business conditions change in such a way that making a change to the
sprint goal seems warranted? Say a competitor launches its new product during a
sprint. After reviewing the new product, the product owner concludes that the
team needs to alter the goal it established for the current sprint because the
current tasks the team is doing is now far less valuable given what the
competitor has done. Should the team blindly follow the rule of no goal-altering
changes and not alter the sprint? Probably not.

What if a critical production system has failed miserably and some or all of the
people on the development team are the only ones who can fix it? Should the team
not interrupt the current sprint to fix it? Does the team tell the business that
they will fix the production failure first thing next sprint? Probably not.

In the end, being pragmatic trumps the "do not mess with the sprint" rule. The
team must act in a sensible way. Everyone on the Scrum team can appreciate that.
If the team changes the current sprint, they will experience the negative
economic consequences previously discussed. However, if the economic
consequences of the change are far less than the economic consequences of
deferring the change, making the change is the smart business decision. If the
economics of changing versus not changing are immaterial, no change to the
sprint goal should be made.

As for team motivation and trust, when a product owner has a frank, economically
focused discussion with the team about the necessity of the change, most teams
understand and appreciate the need, so the integrity of motivation and trust
is upheld.

### Stopping the sprint before the box is full

Should the sprint goal become completely invalid, the Scrum team may decide that
continuing with the current sprint makes no sense and advise the product owner
to abnormally terminate the sprint. When a sprint is abnormally terminated, the
current sprint comes to an abrupt end and the Scrum team gathers to perform a
sprint retrospective. The team then meets with the product owner to plan the
next sprint, with a different goal and a different set of product backlog items.

Sprint termination is used when an economically significant event has occurred,
such as a competitor’s actions that completely invalidate the sprint or product
funding being materially changed.

Although the product owner reserves the option to cancel each and every sprint,
it is rare that product owners invoke this option. Often there are less drastic
measures that a Scrum team can take to adjust to the situation at hand.
Remember, sprints are short, and, on average, the team will be about halfway
through a sprint when a change-causing situation arises. Because there may be
only a week or so of time left in the sprint when the change occurs, the
economics of terminating may be less favorable than just staying the course. And
many times it is possible to make a less dramatic change, such as dropping a
feature to allow time to fix a critical production failure instead of ending the
sprint.

It is important to realize that ending the sprint early, in addition to having a
negative effect on morale, is a serious disruption of the fast, flexible flow of
features and negates many of the benefits of consistent-duration sprints.
Terminating a sprint should be the last resort.

If a sprint is ended early, the Scrum team needs to decide the length of the
next sprint. Normally, there are three options. In a multi-team development
effort, choosing option 1 or option 2 is the preferred method.

1. Make the next sprint bigger than a normal sprint to cover the remaining time
   in the terminated sprint plus the time for the next full sprint.
1. Make the next sprint just long enough to get to the end date of the
   terminated sprint.
1. Stay with the original sprint length. This has the advantage of keeping a
   uniform sprint length throughout development (except for the terminated
   sprint, of course).

## What is "done"?

Conceptually the **definition of done** is a checklist of the types of work that
the team is expected to successfully complete before it can declare its work to
be ready for deployment for use.

Most of the time, a bare-minimum definition of done should yield a complete
slice of product functionality, one that has been designed, built, integrated,
tested, and documented and would deliver validated customer value. To have a
useful checklist, however, these larger-level work items need to be further
refined. For example, what does "tested" mean? Unit tested? Integration tested?
System tested? Platform tested? Internationalization tested? Are all of those
types of testing included in the definition of done?

Keep in mind that if you don’t do an important type of testing every sprint
(say, performance testing), you’ll have to do it sometime. Are you going to have
some specialized sprint in the future where the only thing you do is performance
testing? If so, and performance testing is essential to being“done,” you really
don’t have a usable product each sprint. And even worse, when you actually do
the performance testing at a later time and it doesn’t go quite as planned, not
only will you discover a critical problem very late in the process, but you will
also have to spend much more time and money to fix it at that time than if you
had done the performance testing earlier.

Sometimes the testing might take longer than the duration of a sprint. If this
occurs because the development team has accrued a huge manual testing debt, the
team needs to start automating its tests so that the testing can be completed
within a sprint like with the `mocha` library used in this course to write unit
tests for JavaScript applications.

Scrum teams need to have a robust definition of done, one that provides a high
level of confidence that what they build is of high quality and can be shipped.
Anything less robs the organization of the business opportunity of shipping at
its discretion and can lead to the accrual of **technical debt**.

### The evolution of done

You can think of the definition of done as defining the state of the work at the
end of the sprint. For many high-performance teams, the target end state of the
work enables it to be potentially shippable and that end state remains
relatively constant over the product's development.

Many teams, start out with a definition of done that doesn’t end in a state
where all features are completed to the extent that they could go live or be
shipped. For some, real impediments might prevent them from reaching this state
at the start of development, even though it is the ultimate goal. As a result,
they might start with a lesser end state and let their definition of done evolve
over time as organizational impediments are removed.

### Done and "done done"

Some teams have adopted the concept of “done” versus “done done.” Somehow done-
done is supposed to be more done than done! Teams that are unaccustomed to
really getting things done early and often are more likely to use "done done" as
a crutch. For them, using "done done" makes the point that being done (doing as
much work as they are prepared to do) is a different state from "done done"
(doing the work required for customers to believe it is done). Teams that have
internalized that you can be done only if you did all the work necessary to
satisfy customers don’t need to have two states; to them, done means "done
done"!

## What you've learned

In this reading, you learned a lot more about sprints. You now know that sprints

* are timeboxed;
* have a short and consistent duration
* have an unalterable goal; and,
* can only conclude using the team’s definition of done.

________________________________________________________________________________
# Requirements and User Stories

Scrum treats requirements very differently than traditional project planning.
With traditional product development, requirements are nonnegotiable, detailed
up front, and meant to stand alone. In Scrum, the details of a requirement are
negotiated through conversations that happen continuously during development and
are fleshed out just in time and just enough for the teams to start building
functionality to support that requirement.

With traditional product development, requirements are treated much as they are
in manufacturing: they are required, nonnegotiable specifications to which the
product must conform. These requirements are created up front and given to the
development group in the form of a highly detailed document. It is the job of
the development group, then, to produce a product that conforms to the detailed
requirements.

When a change from the original plan is deemed necessary, it is managed through
a formal change control process. Because conformance to specifications is the
goal, these deviations are undesirable and expensive. After all, much of the
work in process (WIP), in the form of highly detailed requirements (and all work
based on them), might need to be changed or discarded.

In contrast, Scrum views requirements as an important degree of freedom that we
can manipulate to meet our business goals. For example, if the product team is
running out of time or money, they can drop low-value requirements. If, during
development, new information indicates that the cost/benefit ratio of a
requirement has become significantly less favorable, that requirement can be
chosen to be dropped from the product. And if a new high-value requirement
emerges, the team has the ability to add it to the product, perhaps discarding a
lower-value requirement to make room.

The fact is, when developing innovative products, no one can create complete
requirements or designs up front by simply working longer and harder. Some
requirements and design will always emerge once product development is under
way; no amount of comprehensive up-front work will prevent that.

Thus, when using Scrum, the team doesn’t invest a great deal of time and money
in fleshing out the details of a requirement up front. Because the team expects
the specifics to change as time passes and as it learns more about what is being
built, the team avoids overinvesting in requirements that might later be
discarded. Instead of compiling a large inventory of detailed requirements up
front, the Scrum team create placeholders for the requirements, called product
backlog items (PBIs). Each product backlog item represents desirable business
value usually in the form of some desired functionality.

Initially the product backlog items are large (representing large swaths of
business value), and there is very little detail associated with them. Over
time, the team flows these product backlog items through a series of
conversations among the stakeholders, product owner, and development team,
refining them into a collection of smaller, more detailed PBIs. Eventually a
product backlog item is small and detailed enough to move into a sprint, where
it will be designed, built, and tested. Even during the sprint, however, more
details will be exposed in conversations between the product owner and the
development team.

While Scrum doesn’t specify any standard format for these product backlog items,
many teams represent PBIs as **user stories**. You don’t have to. Some teams
prefer "use case" format, and others choose to represent their PBIs in their own
custom formats.

## A PBI is a conversation waiting to happen

As a communication vehicle, requirements facilitate a shared understanding of
what needs to be built. They allow the people who understand what should be
created to clearly communicate their desires to the people who have to create
it.

Traditional product development relies heavily on written requirements, which
look impressive but can easily be misunderstood. A way to better ensure that the
desired features are being built is for the people who know what they want to
have timely conversations with the people who are designing, building, and
testing those features.

Scrum leverages conversation as a key tool for ensuring that requirements are
properly discussed and communicated. Verbal communication has the benefit of
being high-bandwidth and providing fast feedback, making it easier and cheaper
to gain a shared understanding. In addition, conversations enable bidirectional
communication that can spark ideas about problems and opportunities. Those are
discussions that would not likely arise from reading a document.

Conversation, however, is just a tool. It doesn’t replace all documents. In
Scrum, the product backlog is a “living document,” available at all times during
product development. Those who still want or must have a requirements
specification document can create one at any time, simply by collecting the
product backlog items and all of their associated details into a document
formatted however they like.

## Refining the refinements

With traditional product development all requirements must be at the same level
of detail at the same time. In particular, the approved requirements document
must specify each and every requirement so that the teams doing the design,
build, and test work can understand how to conform to the specifications. There
are no details left to be added.

Forcing all requirements to the same level of detail at the same time has many
disadvantages:

* They must predict all of the details early during product development when
  they have the least knowledge that they'll ever have about the prodcut and
  market.
* They treat all requirements the same regardless of their priority.
* They create a huge inventory of requirements that will likely be very
  expensive to rework or discard.
* They reduce the likelihood of using conversations to elaborate and clarify
  requirements because the requirements are "complete".

when using Scrum, not all requirements have to be at the same level of detail at
the same time. Requirements that the team will work on sooner will be smaller
and more detailed than ones that won’t be worked on for some time. Employing
this strategy of progressive refinement allows the entire team to work in a
just-in-time fashion.

## User stories

User stories are a convenient format for expressing the desired business value
for many types of product backlog items, especially features. User stories are
crafted in a way that makes them understandable to both business people and
technical people. They are structurally simple and provide a great placeholder
for a conversation. Additionally, they can be written at various levels of
granularity and are easy to progressively refine.

As well adapted to the needs of a development team as user stories might be,
don’t consider them to be the only way to represent product backlog items. They
are simply a lightweight approach that dovetails nicely with core agile
principles and our need for an efficient and effective placeholder.

So what exactly are user stories? Ron Jeffries offers a simple yet effective way
to think about user stories. He describes them as the three Cs: card,
conversation, and confirmation.

### The card

The card idea is pretty simple. People originally wrote (and many still do) user
stories directly on 3 × 5-inch index cards or sticky notes.

A common template format for writing user stories uses the "Conextra format"
known as the "as a-I want-so that" format. That format specifies a class of
users (the user role), what that class of users wants to achieve (the goal), and
why the users want to achieve the goal (the benefit). The “so that” part of a
user story is optional, but unless the purpose of the story is completely
obvious to everyone, it should be included with every user story.

> **As a** typical member, **I want** to see unbiased reviews of a restaurant
> near an address **so that** I can decide where to go for dinner.

The card isn’t intended to capture all of the information that makes up the
requirement. In fact, most agile methodologies deliberately use small cards with
limited space to promote brevity. A card should hold a few sentences that
capture the essence or intent of a requirement. It serves as the placeholder for
more detailed discussions that will take place among the stakeholders, product
owner, and development team.

### The conversation

The details of a requirement are exposed and communicated in a conversation
among the development team, product owner, and stakeholders. The user story is
simply a promise to have that conversation.

The conversation is typically not a one-time event, but rather an ongoing
dialogue. There can be an initial conversation when the user story is written,
another conversation when it’s refined, yet another when it’s estimated, another
during sprint planning (when the team is diving into the task-level details),
and finally, ongoing conversations while the user story is being designed,
built, and tested during the sprint.

One of the benefits of user stories is that they shift some of the focus away
from writing and onto conversations. These conversations enable a richer form of
exchanging information and collaborating to ensure that the correct requirements
are expressed and understood by everyone.

Although conversations are largely verbal, they can be and frequently are
supplemented with documents. Conversations may lead to a UI sketch, or an
elaboration of business rules that gets written down. Scrum does not do away
with all other documentation in favor of user stories. User stories are simply
a good starting point for eliciting the essence of the requirement.

### The confirmation

A user story also contains confirmation information in the form of conditions of
satisfaction. These are acceptance criteria that clarify the desired behavior.
They are used by the development team to better understand what to build and
test and by the product owner to confirm that the user story has been
implemented to his satisfaction.

If the team uses physical index cards, the front of the card has a few-line
description of the story, the back of the card could specify the conditions of
satisfaction.

These conditions of satisfaction can be expressed as high-level acceptance
tests. However, these tests would not be the only tests that are run when the
story is being developed. In fact, for the handful of acceptance tests that are
associated with a user story, the team will have many more tests (perhaps 10 to
100 times more) at a detailed technical level that the product owner doesn’t
even know about.

The acceptance tests associated with the story exist for several reasons. First,
they are an important way to capture and communicate, from the product owner’s
perspective, how to determine if the story has been implemented correctly.

These tests can also be a helpful way to create initial stories and refine them
as more details become known.

## How much detail is enough?

User stories are an excellent vehicle for carrying items of customer or user
value through the Scrum value-creation flow. However, if your team has only one
story size (the size that would comfortably fit within a short-duration sprint),
it will be difficult to do higher-level planning and to reap the benefits of
progressive refinement.

Small stories used at the sprint level are too small and too numerous to support
higher-level product and release planning. At these levels you need fewer, less
detailed, more abstract items. Otherwise, you’ll be mired in a swamp of mostly
irrelevant detail. Imagine having 500 very small stories and being asked to
provide an executive-level description of the proposed product to secure your
funding. Or try to prioritize among those 500 really small items to define the
next release.

Also, if there is only one (small) size of story, we will be obligated to define
all requirements at a very fine-grained level of detail long before we should.
Having only small stories precludes the benefit of progressively refining
requirements on a just- enough, just-in-time basis.

Fortunately, user stories can be written to capture customer and user needs at
various levels of abstraction. The largest would be stories that are a few to
many months in size and might span an entire release or multiple releases. Many
people refer to these as **epics**, alluding to the idea that they are Lord of
the Rings or War and Peace size stories. Epics are helpful because they give a
very big-picture, high-level overview of what is desired.

> **Epic**: As someone that regularly uses the restaurant review product, I want
> to train the system on what types of cuisine I prefer so that it will know
> what restaurants to use when filtering reviews on my behalf.

You would never move an epic into a sprint for development because it is way too
big and not very detailed. Instead, epics are excellent placeholders for a large
collection of more detailed stories to be created at an appropriate future time.

The next-size stories are those that are often on the order of weeks in size and
therefore too big for a single sprint. Some teams might call these **features**.

The smallest forms of user stories are those typically refered to as
**stories**.

## Good stories are INVESTments

Good user stories exhibit six aspects. They are

* Independent of one another
* Negotiable
* Valuable to the people using the product
* Estimable by the development team
* Small enough to fit in a sprint
* Testable to know when its done

### Celebrate your independence

As much as is practical, user stories should be independent or at least only
loosely coupled with one another. Stories that exhibit a high degree of
interdependence com- plicate estimating, prioritizing, and planning. When
applying the independent criteria, the goal is not to eliminate all
dependencies, but instead to write stories in a way that minimizes dependencies.

### Negotiate for profit


The details of stories should also be negotiable. Stories are not a written
contract in the form of an up-front requirements document. Instead, stories are
placeholders for the conversations where the details will be negotiated.

Good stories clearly capture the essence of what business functionality is
desired and why it is desired. However, they leave room for the product owner,
the stakeholders, and the team to negotiate the details.

This negotiability helps everyone involved avoid the us-versus-them, finger-
pointing mentality that is commonplace with detailed up-front requirements docu-
ments. When stories are negotiable, developers can’t really say, “Hey, if you
wanted it, you should have put it in the document,” because the details are
going to be negoti- ated with the developers. And the business people can’t
really say, “Hey, you obviously didn’t understand the requirements document
because you built the wrong thing,” because the business people will be in
frequent dialogue with the developers to make sure there is shared clarity.
Writing negotiable stories avoids the problems associated with up-front detailed
requirements by making it clear that a dialogue is necessary.

A common example of where negotiability is violated is when the product owner
tells the team how to implement a story. Stories should be about what and why,
not how. When the how becomes nonnegotiable, opportunities for the team to be
innovative are diminished.

There are times, however, when how something is built is actually important to
the product owner. For example, there might be a regulatory obligation to
develop a feature in a particular way, or there might be a business constraint
directing the use of a specific technology. In such cases the stories will be a
bit less negotiable because some aspect of the “how” is required. That’s OK; not
all stories are fully negotiable, but most stories should be.

### Valuable for everyone

Stories need to be valuable to a customer, user, or both. Customers (or
choosers) select and pay for the product. Users actually use the product. If a
story isn’t valuable to either, it doesn’t belong in the product backlog.

How about stories that are valuable to the developers but aren’t of obvious
value to the customers or users? Is it OK to have **technical stories**.

> **Technical story**: As a developer, I want to migrate the system to work on
> the latest version of ReactJS so that we are not operating on a stale version
> of the UI library and get stuck in an expensive upgrade later.

In the case of the “Migrate to New Version of ReactJS" story, the product owner
might not initially understand why it is valuable to change databases. However,
once the team explains the risks of continuing to develop on an unsupported
version of a database, the product owner might decide that migrating databases
is valuable enough to defer building some new features until the migration is
done. By understanding the value, the product owner can treat the technical
story like any other business-valuable story and make informed trade-offs. As a
result, this technical story might be included in the product backlog.

In practice, though, most technical stories should not be included in the
product backlog. Instead, these types of stories should be tasks associated with
getting normal stories done. If the development team has a strong definition of
done, there should be no need to write stories like these, because the work is
implied by the definition of being done.

### Estimations are the lifeblood of prediction

Stories should be estimable by the team that will design, build, and test them.
Estimates provide an indication of the size and therefore the effort and cost of
the stories (bigger stories require more effort and therefore cost more money to
develop than smaller stories).

Knowing a story’s size provides actionable information to the Scrum team. The
product owner, for example, needs to know the cost of a story to determine its
final priority in the product backlog. The Scrum team, on the other hand, can
determine from the size of the story whether additional refinement or
disaggregation is required. A large story that we plan to work on soon will need
to be broken into a set of smaller stories.

If the team isn’t able to size a story, the story is either just too big or
ambiguous to be sized, or the team doesn’t have enough knowledge to estimate a
size. If it’s too big, the team will need to work with the product owner to
break it into more manageable stories. If the team lacks knowledge, some form of
exploratory activity will be needed to acquire the information.

### Small enough to accomplish

Stories should be sized appropriately for when you plan to work on them. Stories
worked on in sprints should be small. If you’re doing a several-week sprint, you
will want to work on several stories that are each a few days in size. If you
have a two-week sprint, you don’t want a two-week-size story, because the risk
of not finishing the story is just too great.

So ultimately you need small stories, but just because a story is large, that
doesn’t mean it’s bad. Let’s say you have an epic-size story that you aren’t
planning to work on for another year. Arguably that story is sized appropriately
for when you plan to work on it. In fact, if you spent time today breaking that
epic down into a collection of smaller stories, it could easily be a complete
waste of your time. Of course, if you have an epic that you want to work on in
the next sprint, it’s not sized appropriately and you have more work to do to
bring it down to size. You must consider when the story will be worked on when
applying this criterion.

### Test makes the world go 'round

Stories should be testable in a binary way: they either pass or fail their
associated tests. Being testable means having good acceptance criteria (related
to the conditions of satisfaction) associated with the story, which is the
“confirmation” aspect of a user story.

It may not always be necessary or possible to test a story. For example,
epic-size stories probably don’t have tests associated with them, nor do they
need them because you don’t directly build the epics.

Also, on occasion there might be a story that the product owner deems valuable,
yet there might not be a practical way to test it. These are more likely to be
so-called **nonfunctional requirements**, such as “As a user, I want the system
to have 99.999% uptime.” Although the acceptance criteria might be clear, there
may be no set of tests that can be run when the system is put into production
that can prove that this level of uptime has been met, but the requirement is
still valuable as it will drive the design.

## What you've learned

A hard thing is having proper requirements as a team to guide your work. In
this reading, you learned about user stories and how they should be INVESTable.
Some of this may not make sense, just now, and that's ok. It will make sense as
you run into more real-world requirements in this course, as well as when you
move into real-world development scenarios.

________________________________________________________________________________
# Censor Project

Time to practice some Node Input/Output! In this project, you'll utilize both
user I/O and file I/O to create a program that censors forbidden words that are
specified in a dictionary file.

The solution for this project is available at the end of these instructions. Be
sure to give it an honest shot before you take a peek!

## The Objective

Let's begin by taking a bird's-eye view of how the final product should behave.
Let's say that we had a `forbidden-dictionary.txt` containing the following
words:

```plaintext
potato
tomato
cat
strange
real
park
```

When we execute the program, `censor.js`, the user will be prompted to enter a
sentence. The program will respond with the same sentence, but with the
forbidden words censored. A censored word will have its vowels replaced with
stars (\*). Below is an example of the program at runtime. For clarity, we have
wrapped the user's input in -dashes-:

```plaintext
$ node censor.js
Enter a sentence to be censored: -what a really strange place to park a car-
what a really str*ng* place to p*rk a car
```

## Phase 1: Setting Up and Censoring Sentences

We'll be designing this project from scratch, so begin by creating directory
named `censor-project` and `cd` into it. This will be our working directory for
the duration of the project. Inside of your working directory, create two files:
`censor.js` and `forbidden-dictionary.txt`. Your directory should have the
following structure:

```plaintext
/censor-project
├── censor.js
└── forbidden-dictionary.txt
```

### Creating a dictionary

Inside of your `forbidden-dictionary.txt` use VSCode to write some words that
we'll eventually censor. For the rest of these instructions, you can assume that
our `forbidden-dictionary.txt` contains exactly:

```plaintext
potato
tomato
cat
strange
real
park
```

Note that we have typed each forbidden word on it's own line, be sure to do the
same! Until phase 2, we'll put this dictionary file to the side.

### Censoring Sentences

Before we perform any I/O, let's knock out the censoring behavior of our
program. Our program should censor a word by replacing its vowels with stars
(\*). To keep things nice and tidy, create a function `starVowels` that accepts
a word as an argument and returns that word with all of its vowels replaced with
stars. We leave the implementation detail up to you. Your function should be
able to satisfy the following examples:

```javascript
console.log(starVowels("caterpillar")); // 'c*t*rp*ll*r'
console.log(starVowels("snowstorm")); // 'sn*wst*rm'
console.log(starVowels("programmer")); // 'pr*gr*mm*r'
```

Test your function thoroughly with the above test cases and feel free to test it
with other arguments.

You may have noticed that we are assuming the `starVowels` function will be
passed a single word _and not_ a sentence containing many words. This is because
our final product should be deliberate in _which_ words will be targeted.
`starVowels` is just a helper function that will be used within our main
`censorSentence` function. Create a function named `censorSentence` that accepts
two arguments: a sentence and an array of strings. The function should return a
new sentence where words of the original sentence are censored if they are found
inside of the array argument. You should use `starVowels` as a helper function,
but we leave the rest of the implementation detail to you. You can assume that
won't contain any punctuation. Your `censorSentence` should satisfy the
following behavior:

```javascript
console.log(censorSentence("what a wonderful life", ["wonderful", "tree"]));
// 'what a w*nd*rf*l life'

console.log(
  censorSentence("hey programmer why the long face", [
    "long",
    "programmer",
    "hey"
  ])
);
//  'h*y pr*gr*mm*r why the l*ng face'
```

Great! We're done with the censoring logic of our program. Notice how we
designed a _function_ to perform the act of censoring. This keeps our code
modular. We didn't even have to deal with any I/O yet! In general, you'll want
to keep your code loosely coupled so that it is easy to test and maintain. Now
that we have `censorSentence`, for the rest of the project we will concern
ourselves with passing the arguments dynamically into `censorSentence`. That is,
we have two open questions:

- how can we get the sentence argument for `censorSentence` from the user?
- how can we get the array argument for `censorSentence` from the dictionary
  file?

Before moving onto the next phase, don't forget to delete any test calls to
`censorSentence`.

## Phase 2: Interacting with the user

Let's tackle prompting the user for a sentence using the `readline` module.
You've seen this pattern a few times now. Reference the [readline
docs][readline-docs] to do three things:

1. import the readline module
2. create an interface so that the terminal can be used for I/O
3. use the `question` method to ask the user to enter a sentence; once they hit
   enter, repeat the sentence to them and `close` the interface

Here is an example of how the program should behave if you have satisfied the
three points above. For clarity, we've denoted the user's input with -dashes-:

```plaintext
$ node censor.js
Enter a sentence to be censored: -hey programmers-
hey programmers
```

Once you are satisfied with the user input, you can even begin to mock out how
the user's sentence will be modified. Instead of simply repeating their sentence
once they hit enter, use your `censorSentence` function to censor some arbitrary
words of their sentence. This means you'll have to pass a hard-coded array as
the second argument to `censorSentence`.

Just one more piece of the puzzle! Instead of using the static dictionary array
that we just hard-coded, we'll want to refactor our code to get this data from a
separate file.

## Phase 3: Parsing the dictionary

This part is tricky, so read the full instructions for this entire phase before
writing any more code.

Our task now is to use the `fs` module to read the contents of the
`forbidden-dictionary.txt` file that we created initially. To do this, feel free
to reference the [docs for readFile][fs-read-file-docs] and our previous reading
on file I/O. Like usual, you should use 'utf8' as the encoding and print any
potential errors that may occur when the file is read.

Since both the readline `question` method and fs `readFile` method are
asynchronous, you'll need to utilize _callback chaining_ in order to read the
`forbidden-dictionary.txt` file _after_ the user has entered their sentence.
Recall that _callback chaining_ is implemented by nesting callbacks. This means
that you'll have to call `readFile` from _within_ the callback that is passed
into `question`.

Remember that our `censorSentence` needs to be passed an array of strings to be
censored as its second argument. However, if we read the contents of the
`forbidden-dictionary.txt`, we will receive one long string that contains all of
the words. You'll need to reconcile this difference. How did we overcome this in
the previous reading? We'll leave it to you!

Test your final product by entering different sentences at runtime and changing
what words are included in the dictionary file. Amazing!

**Ask an instructor for a code review.**

## Bonus: Pick a file, any file

We recommend completing all other core projects in this lesson before going back
and working on this bonus or any other bonus features.

Create a copy of your entire `censor-project` directory so that you have a
working version of the core project to reference. You may find yourself making
some drastic changes in this bonus (but hopefully not :)).

In the core phases of this project, we hard-coded the location of the dictionary
file to be `forbidden-dictionary.txt`. Your objective for this bonus is to now
allow the user to specify which dictionary file they would like to use after
they enter their sentence. For example, let's say that we added some additional
files to our working directory so that it had the following structure:

```plaintext
/censor-project
├── censor.js
├── forbidden-dictionary.txt
├── bonus-dictionary-a.txt
└── some_deeper_directory
    └── bonus-dictionary-b.txt
```

We recommend that you mimic the structure above. Feel free to populate the
`.txt` files with whatever words you like (be sure to separate each word with a
newline).

Here are a few examples of how the final product might behave:

```plaintext
$ node censor.js
Enter a sentence to be censored: what a really strange place to park a car
Enter a path to a dictionary: forbidden-dictionary.txt
what a really str*ng* place to p*rk a car
```

```plaintext
$ node censor.js
Enter a sentence to be censored: eat your vegetables
Enter a path to a dictionary: bonus-dictionary-a.txt
eat y**r v*g*t*bl*s
```

```plaintext
$ node censor.js
Enter a sentence to be censored: don't slam the door
Enter a path to a dictionary: ./some_deeper_directory/bonus-dictionary-b.txt
don't slam the d**r
```

We'll leave the rest to you, programmer!

[readline-docs]: https://nodejs.org/api/readline.html
[fs-read-file-docs]:
  https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

________________________________________________________________________________
# Global Replace Project

Let's continue practicing I/O with another quick guided project. In this
project, you will be creating a program that will edit a file, replacing all
occurrences of a given string with another string. You may be familiar with this
"global replace" feature as it is frequently supported by word processors.
VSCode also supports this functionality through the `cmd/ctrl + f` shortcut.
Your goal is to implement this feature for yourself using JavaScript and Node's
`fs` module!

The solution for this project is available at the end of these instructions. Be
sure to give it an honest shot before you take a peek!

## The Objective

Let's take a bird's-eye-view of how our final product will behave. Let's say
that we had an `essay.txt` file that had the following random text:

```plaintext
Lorem ipsum dolor amet single-origin coffee trust fund organic
normcore, wayfarers narwhal fam hashtag ugh VHS af. Try-hard
brooklyn you probably haven't heard of them stumptown. Coloring book
selfies pickled plaid small batch butcher beard fixie disrupt
schlitz irony. Offal deep v meditation squid.

Truffaut ramps VHS, pabst air plant la croix godard authentic
everyday carry street art deep v shaman. 3 wolf moon cloud bread
brooklyn health goth meditation literally salvia, tumblr chambray.
Taiyaki slow-carb distillery, seitan food truck drinking vinegar
hexagon gastropub offal gluten-free banjo.
```

For the remainder of these instructions, you may assume that our **original**
`essay.txt` contains the text above, before the program edits it.

When we run our program, `global-replace.js`, we should be able to specify
command line arguments for the file to edit, the target string, and the
replacement string. For example, we should be able to use our program to edit
`essay.txt` by replacing every occurrence of `'oo'` with `'HIYAAAH'` by
executing the following command in our terminal:

```plaintext
$ node global-replace.js essay.txt oo HIYAAAH
```

Afterwards, the **modified** contents of `essay.txt` will be:

```plaintext
Lorem ipsum dolor amet single-origin coffee trust fund organic
normcore, wayfarers narwhal fam hashtag ugh VHS af. Try-hard
brHIYAAAHklyn you probably haven't heard of them stumptown. Coloring bHIYAAAHk
selfies pickled plaid small batch butcher beard fixie disrupt
schlitz irony. Offal deep v meditation squid.

Truffaut ramps VHS, pabst air plant la croix godard authentic
everyday carry street art deep v shaman. 3 wolf mHIYAAAHn cloud bread
brHIYAAAHklyn health goth meditation literally salvia, tumblr chambray.
Taiyaki slow-carb distillery, seitan fHIYAAAHd truck drinking vinegar
hexagon gastropub offal gluten-free banjo.
```

With this high-level goal in mind, let's jump in!

> **Did you know?** The random text we used above is a variation of [lorem
> ipsum][lorem-ipsum-wiki]. Lorem ipsum is meaningless placeholder text that is
> commonly used to temporarily fill space. You'll likely be seeing lorem ipsum
> text on websites that are in development when actual data isn't available yet.
> To generate our essay.txt, we used lorem hipsum.

## Phase 1: Setup and Command Line Arguments

We'll create this project from scratch. Begin by creating a
`global-replace-project` directory. This will be our working directory for the
entirety of this project, so `cd` into it. Inside of your directory, create two
files: `global-replace.js` and `essay.txt`. We recommend that you use VSCode to
populate the `essay.txt` file with our original text from above so you can
follow our examples. Your directory structure should be:

```plaintext
/global-replace-project
├── essay.txt
└── global-replace.js
```

We'll put `essay.txt` aside until the second phase.

### Taking command line arguments

Let's work on reading command line arguments when the user executes the program.
You may have noticed that the final product output provided in the introduction
shows the user specifying arguments along with the command that we classically
use to run the program, `node global-replace.js`. Previously, we've been
collecting input _during runtime_ with the `readline` module, but that is not
the case here.

Taking command line arguments is very simple in Node and doesn't require any
modules. To do this, we'll reference the `process.argv` value that is available
when a `.js` file is executed with Node. See this for yourself by writing this
simple line at the top of your `global-replace.js` file:

```javascript
console.log(process.argv);
```

If you execute your script with `node global-replace.js`, you should see an
array containing the paths to the Node runtime and your script. Here is what the
output looked like on our machine:

```plaintext
[ '/usr/local/bin/node',
  '/Users/az/Desktop/global-replace-project/global-replace.js' ]
```

See where this is heading? If you execute your script with additional arguments
separated by spaces, such as `node global-replace.js potato.txt tomato squash`,
the `process.argv` array will contain those additional arguments:

```plaintext
[ '/usr/local/bin/node',
  '/Users/az/app_academy/Module-JavaScript/projects/node/global-replace-project/global-replace-project/global-replace.js',
  'potato.txt',
  'tomato',
  'sqash' ]
```

We'll assume that the user will specify the `TARGET_FILE`, `OLD_STR`, and
`NEW_STR` arguments in that order. In your script, assign three global `const`
variables to contain these arguments from `process.argv`. Bragging rights
awarded if you do this with _array destructuring_.

> **Did you know?** It is convention in many programming languages to style
> global constant variables with CONSTANT_CASE.

The global `process` object is specific to Node and is not available in the
browser runtime. We use it here for [process.argv][process-argv] and we used it
previously for `process.stdin` and `process.stdout` when creating interfaces for
the readline module in past projects.

One more note before moving on. Depending on how you decide to implement things
during this project, your program may require you to enter all three command
line arguments in order to execute. That is, you'll have to execute your code
with `node global-replace.js arg1 arg2 arg3` and not just
`node global-replace.js`.

## Phase 2: Simple string replacement and file reading

For now, we won't be utilizing the command line arguments. Let's work on
implementing logic to perform global replacement on a string.

In `global-replace.js`, write a function named `replace` that accepts three
string arguments. The function should return a modified version of the first
string where all occurrences of the second string are replaced with the third.
Your function should satisfy the following examples:

```javascript
console.log(replace("what a great program", "a", "o")); // 'whot o greot progrom'
console.log(replace("what a great program", "gr", "d")); // 'what a deat prodam'
console.log(replace("have a nice day", "a nice", "an amazing")); // 'have an amazing day'
```

Now that the `replace` function is complete, delete all test calls you made to
it. We'll set this function aside for a moment to focus our attention on
performing some file I/O on the `TARGET_FILE`.

Import the `fs` module and use the `readFile` method to read the `TARGET_FILE`.
Look up the documentation if you forgot how to do this. Use 'utf8' as the
encoding and print any errors that occur during the read. Also simply print out
the contents of the file to check if everything is working as it should.

Upon running `node global-replace.js essay.txt`, you should see the contents of
your file printed out. If you do, take things a step further by printing out a
modified version of the file contents where all instances of `OLD_STR` are
replaced with `NEW_STR`. Recall that the data from `readFile` will be read as
one long string since we specified 'utf8'; this is a perfect fit for our
`replace` function. Do not worry about overwriting the contents of the file yet,
simply `console.log` the modified contents.

Test your work by passing three valid command line arguments. For example here
is what our program printed upon running `node global-replace.js essay.txt a X`:

```plaintext
Lorem ipsum dolor Xmet single-origin coffee trust fund orgXnic
normcore, wXyfXrers nXrwhXl fXm hXshtXg ugh VHS Xf. Try-hXrd
brooklyn you probXbly hXven't heXrd of them stumptown. Coloring book
selfies pickled plXid smXll bXtch butcher beXrd fixie disrupt
schlitz irony. OffXl deep v meditXtion squid.

TruffXut rXmps VHS, pXbst Xir plXnt lX croix godXrd Xuthentic
everydXy cXrry street Xrt deep v shXmXn. 3 wolf moon cloud breXd
brooklyn heXlth goth meditXtion literXlly sXlviX, tumblr chXmbrXy.
TXiyXki slow-cXrb distillery, seitXn food truck drinking vinegXr
hexXgon gXstropub offXl gluten-free bXnjo.
```

Almost done! Now we just need to take this new string and rewrite the
`TARGET_FILE`.

## Phase 3:

Let's take a quick recap of what we are dealing with before we put the finishing
touch on this project. So far, our program _asynchronously_ reads data from the
`TARGET_FILE` and we use `replace` to modify the incoming data from the
`TARGET_FILE`. In order to write this modified data back into the `TARGET_FILE`,
we need to utilize _callback chaining_ because all of these file operations are
asynchronous!

Utilize callback chaining and [writeFile][write-file] to rewrite the
`TARGET_FILE` with the new data. This means you will have to call `writeFile`
within the callback for `readFile`. Be sure to use 'utf8' and print any errors
that occur during the write.

Test your final product by running your program a few times, replacing different
substrings. Verify that the contents of `essay.txt` are changed. Test things
further by creating your own `.txt` files to edit! Remember that we can specify
any `TARGET_FILE` through command line arguments, so your program is very
dynamic!

**Ask an instructor for a code review.**

## Bonus: Replacing the first 'n' occurrences

We recommend completing all other core projects in this lesson before going back
and working on this bonus or any other bonus features.

For this bonus, we'll give our program the ability to accept an additional
fourth argument representing the number of occurrences to replace. In other
words, we should be able to run the program with the following arguments:

```plaintext
node global-replace.js essay.txt i hello 3
```

This should edit the `essay.txt` file, replacing the first 3 occurrences of 'i'
with 'hello'. This new argument should be optional, so if we run the program
with:

```plaintext
node global-replace.js essay.txt i hello
```

It should replace **all** occurrences of 'i' with 'hello', as it did in the core
project.

We'll leave the implementation up to you! Good luck.

[lorem-ipsum-wiki]: https://en.wikipedia.org/wiki/Lorem_ipsum
[process-argv]:
  https://nodejs.org/docs/latest/api/process.html#process_process_argv
[write-file]:
  https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback

________________________________________________________________________________
# Repo Madness Project: Managing Your Code With Git

Now that you've developed an understanding of what Git is and why we use it,
let's get to work! We're going on a time-traveling adventure with Git as our
vehicle.

We'll review:
- Creating and navigating a Git repository,
- Adding and changing our files,
- Browsing a timeline of our changes,
- and rewriting history! 

## Phase 1: Laying the foundation

To get started, we need to create a timeline. For this project, we'll be working
with plain old JavaScript objects. As we move forward and back in time, we'll
observe changes in our objects.

Let's start by creating our own timeline from scratch. Once we've practiced
this, we'll import an already-organized timeline from GitHub and use it as a
base for our adventure.

### Phase 1a: Create your own reality

We'll take control of time and space by creating our own timeline first! Create
a new Git repository called "my-custom-timeline". Within this repository, create
a file called `me.js`. Add an empty JavaScript object to your `js` file.
Finally, add `me.js` to the staging area of your repo and commit the new file
with a commit message of "Initial commit (before I came along)".

Since this is your timeline, let's add some important dates in your own life.
We'll start (as we all do!) with your birthday. Inside `me.js`, add a couple
properties to your JavaScript object. Add an `"age"` property and set it to `0`,
and add at least one more property to describe yourself: maybe `"hairColor":
"brown"`. Add these changes to your repo and commit them with a message like
"Add birthday (1987)". Including the year in your commit messages for this phase
will make it easy to follow your timeline in your commit history later on.

Time marches on - and so should you! Think of at least three more significant
dates in your life. These could be graduations, vacations, or even the day your
cohort started at App Academy! With each event, make appropriate changes to
`me.js`. Update your `"age"` value and modify the object to reflect what changes
you experienced. For example: if one of your significant dates was a wedding,
you might add a `"spouse"` property.

Your repository should end up with at least four commits: one for "Initial
commit (before I came along)" and three for events on your timeline. Remember:
we're focusing on Git, so you should use clear commit messages in imperative
voice that make it easy to look back over your changes.

Once you're satisfied, take a look at your Git commit log. It should read like a
(very) abridged biography. This is what every repo's commit history should look
like: a concise history of significant changes as the project has evolved. 

### Phase 1b: A shared experience

Let's move on to more advanced techniques. For this, we'll need to ensure we're
all starting with the same timeline. Leave your `my-custom-timeline` directory
and download the skeleton for this project below. After opening the .ZIP file, 
you should end up with a new directory containing a single file: `earth.js`. 
Navigate into this directory using `cd my-shared-timeline` from your terminal. 
We'll build on this shared timeline from here on.

Take a look at `earth.js`. You'll see a JavaScript object containing the name of
our planet as well as **very** rough population estimates. This object will
include all the data we track on our new timeline.

> A quick aside: Our "population estimates" are pretty silly, but you should be
> focused on the "time-traveling" techniques of Git and not the historical
> authenticity of these examples. If you'd like to know more, we've loosely
> based our original timeline on the ["Timeline of the evolutionary history of
> life"][Life timeline source]. Feel free to draw from this resource for ideas
> as you customize your own history!

## Phase 2: Exploring our timeline

What we're seeing in `earth.js` is representative of the present. Take a look at
your commit history. Notice how our log here reads like a very simplified
history of Earth. Let's travel back and see what we can find!

## Phase 2a: Looking around without moving

Before we set off, let's look back over our timeline so we know what we're
getting into. Using `git diff`, compare your current commit to the first commit
in the repository's history. You should see a single line change: one
subtraction, one addition, both on the same line. 

Of course, we can tell from the commit history that more has changed than just
that one line! `git diff` is a great tool for seeing the **overall** change
since a particular point in time, but to see **all** the changes since that
time, we have to look at each commit separately.

Try comparing more commits in the repo. Between which diffs can you see the most
changes? Are there any commits with a _net neutral_ (no change) diff between
them?

Notice that nothing changes about your current state as you view diffs. Diffing
is a safe way of browsing a repo without changing your position, so it's great
as a "quick reference" if you need to check a detail in your repo's history.

## Phase 2b: Our first steps through time

Now, let's relocate and see each commit with its respective context. Using `git
checkout`, navigate to the first commit in the repository. How many of each
population are there at this time?

Let's jump back to the present! Check out the `master` ref to return to the
latest commit on this branch.

Try stepping through your history one commit at a time and observing how
`earth.js` changes. As you browse through your repo, keep an eye on your `git
log` output as well. Notice that you're unable to see commits ahead of your
current position - only those that were created in the past.

Remember: checking out a commit is non-destructive, so it's a safe way to
explore the state of a repository at a given point in time.

## Phase 3: Changing history

Checking out and comparing commits are both safe, non-destructive ways of
browsing your repo. What if we would rather do some damage and make real
changes? It's time to get messy!

Before we make any changes, we need to ensure we're not damaging our original
timeline. The safest way to make isolated changes to a repo is via a branch.
Let's create a new branch titled
`alternate-timeline-for-<your-github-username-here>`. Use `git status` to make
sure you've checked your new branch out before continuing.

Let's go back a few million years and make a change that will have serious
effects on our timeline. Using `git reset`, travel back to 4.5 million years
ago. Let's assume mankind had never come along to drive the woolly mammoth to
extinction. How many mammoths might there be today: 200+? 500+? Even more?

Update `earth.js` to include your estimate of how many mammoths might roam the
Earth today. Add this change to your staging area and commit it with a message
like "Today: Mammoths rule the world".

Now, take a look at your commit history. You should see that the previous two
commits for "2.5 million years ago" and "Today" have been totally replaced by
your one new commit for "Today". Congratulations: you've changed history! You
can use `git diff` to compare your new branch with the `master` branch.

## Phase 4: Choose your fate

Take a few minutes to play around with your new branch. You can add additional
commits and rewrite different parts of history as you see fit. Did the dinosaurs
live into modern times, letting you own a cool Tyrannosaurus Rex pet? It's up to
you!

When you're done, let's share your new vision with the world. We'll do this with
the help of GitHub.

First, we need to make sure your alternative timeline is compatible with our
original timeline. Merge the `master` branch into your branch and resolve any
conflicts. Since we're only changing numbers, this should be an easy conflict to
resolve: just remove the "old" numbers from the `master` branch, replace them
with your "new" population totals, and make sure you don't leave any merge
conflict artifacts (`<<<<<`, `=====`, or `>>>>>`) hanging around in there! `git
status` will provide some helpful details if you're unsure how to proceed.

Once you've successfully merged `master` into your branch, we need to 
go to GitHub and create a new remote for our project. 

Go to GitHub and create a new repo under your account
called `my-shared-timeline`. This will serve as our new "remote". You can 
give it a description, but do not create a README file. The repository can be 
public or private.

Once you have created this repo, you need to tell your local git repository
to use this Github repo as its remote. Do the following on your local terminal:
`git checkout master`
`git remote add origin https://github.com/<USERNAME>/my-shared-timeline.git`
`git push -u origin master`

A note on HTTPS vs. SSH: For now, you should use HTTPS for cloning and pushing 
GitHub repos. This will require you to enter your username and password. 
Eventually, we will have you generate SSH keys which allow you to store a 
unique key on your local machine that GitHub reads for authentication purposes.

Now that we have our remote repository, we need to push up our new branch and 
open a pull request. You'll want `master` to be the _base_ branch and 
your branch to be the _compare_ branch. Don't forget to add a short description 
of the changes you made. You can review your changes on GitHub before opening 
the PR.

## What We've Learned

Whew! We're safely back in the present. Git is a powerful tool that lets us
explore and manage the history of our repository with ease. While playing with
dinosaurs can be fun, you've also been flexing your programming muscles by:

- Creating a new code repository from scratch,
- Tracking changes to a JavaScript file over time,
- Practicing how to explore an unfamiliar repo,
- Branching off a shared repo to make your own changes,
- and sharing those changes with your team and/or the world via GitHub.

These are skills you'll use on the job many times per day, so we'll continue to
get lots of practice together as you incorporate Git in upcoming projects.

[Life timeline source]: https://en.wikipedia.org/wiki/Timeline_of_the_evolutionary_history_of_life

________________________________________________________________________________
# WEEK-03 DAY-3<br>*Unix* {ignore=true}
________________________________________________________________________________
# Command Line Interface Basics Lesson Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given a folder structure diagram, a list of 'cd (path)' commands and target 
files, match the paths to the target files.
2. Create, rename, and move folders using unix command line tools.
3. Use grep and | to count matches of a pattern in a sample text file and save 
result to another file.
4. Find what -c, -r, and -b flags do in grep by reading the manual.
5. Identify the difference in two different files using diff.
6. Open and close nano with and without saving a file.
7. Use ‘curl’ to download a file.
8. Read the variables of $PATH.
9. Explain the difference between .bash_profile and .bashrc.
10. Create a new alias by editing the .bash_profile.
11. Given a list of common scenarios, identify when it is appropriate and safe 
to use sudo, and when it is a dangerous mistake.
12. Write a shell script that greets a user by their $USER name using echo.
13. Use chmod to make a shell script executable.list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given a folder structure diagram, a list of 'cd (path)' commands and target 
files, match the paths to the target files.
2. Create, rename, and move folders using unix command line tools.
3. Use grep and | to count matches of a pattern in a sample text file and save 
result to another file.
4. Find what -c, -r, and -b flags do in grep by reading the manual.
5. Identify the difference in two different files using diff.
6. Open and close nano with and without saving a file.
7. Use ‘curl’ to download a file.
8. Read the variables of $PATH.
9. Explain the difference between .bash_profile and .bashrc.
10. Create a new alias by editing the .bash_profile.
11. Given a list of common scenarios, identify when it is appropriate and safe 
to use sudo, and when it is a dangerous mistake.
12. Write a shell script that greets a user by their $USER name using echo.
13. Use chmod to make a shell script executable.

________________________________________________________________________________
# Navigating Your Filesystem

Imagine you're on a trip to a new country. You're carrying a dictionary, but
it's slow to translate every word you hear and you need to use a map. You would
get used to these limitations eventually, but wouldn't it be great if you spoke
a bit of the local language instead?

Believe it or not, this is likely how you've been using computers for most of
your life! Modern machines are built to make navigating easy and entertaining,
but you're not "speaking the computer's language". That changes today. Let's
explore the terminal!

We'll discuss:
- How to find your way around your files *without* double-clicking any folders,
- Creating & managing new files & directories,
- and cleaning up after yourself.

## Getting the lay of the land

You've already used a _terminal_ for some tasks like controlling Git, but let's
dive a little deeper. Your terminal is the interface you use to direct the
computer. The word "terminal", as used here, comes from the early days of modern
computing, when a _terminal interface_ (often a screen & keyboard) would be
hooked up to an otherwise manually-operated computer. This interface allowed a
human to provide instructions to the computer without turning dials or requiring
a complex manual to do so. Today, even though our terminal is built into our
computer, we still use the term to refer to the application we're using to input
our own instructions!

To keep everything in one place, we'll use the terminal that's built into Visual
Studio Code. If you haven't yet, go ahead and open it. You can do so by clicking
"View" from the top menu in VS Code, then "Terminal". You should see a new pane
at the bottom of your editor.

### Parts of the terminal

<p>
  <img src="images/cli-command-line-labeled.png" style="width: 100%; height: auto;">
</p>

1) The row in your terminal with a flashing _cursor_ is called the _command
   line_. It's exactly as the name describes: the line upon which we enter our
   commands. Because we're using the command line to instruct the computer, we
   sometimes refer to the terminal as a _command line interface_ or _CLI_.

2) The bit of text just before your command line is called the _prompt_. This
   will differ for each computer and will usually give you a little context
   about which directory you're in. You can customize your prompt to suit your
   style with custom code.

3) We refer to anything that's already been executed in the terminal as
   _output_. You'll likely see a little output in your terminal even if you
   haven't run anything yet. This is due to setup that's performed each time you
   begin a new terminal _session_.

### A few quick tricks

Here are a few keyboard shortcuts to help you along. Some of these may be review
for you. Give them a quick try before moving on.

- `Return/Enter` will submit the command you've typed.
- `↑/↓` will move up & down in your _command history_.
- Pressing `Ctrl + A` will move your cursor to the beginning of the line, while
  `Ctrl + E` will move you to the end.
- To clear the terminal screen, press `Ctrl + L`. You can still scroll up to see
  your previous output if you need to.

### Understanding directories

Let's run through a quick review of how your file system is structured. Your
computer contains both _files_ and _directories_. We distinguish these by their
content: a file contains text or binary content that we can interact with, and a
directory contains both files and other directories!

> As an aside: It's easy to confuse "files" and "folders", so it's best to use
> the term "directory" instead. It's worth an extra syllable to prevent
> confusion!

Directories and files form a tree-like structure, where each directory creates a
new branch and each file is like a leaf. We can write the _path_ to the file or
directory we want by joining all its _ancestors_ with forward slashes, like so:

```sh
  /users/app_academy_student/homework/my-homework.txt
```

Here's what that looks like in "tree" form:

<p>
  <img src="images/cli-file-system.png" style="width: 100%; height: auto;">
</p>

There are a few special short names for particular directories you should know,
too.

- `~` is your _home directory_. This is the same as `/Users/your_username/` on
  macOS.
- `/` is the _root directory_. This is the highest available directory and
  contains all the other directories & files in your file system.
- `.` is your current directory and `..` is your current directory's parent. For
  example, in `/Users/You/`, `.` refers to the `You/` directory and `..` refers
  to the `Users/` directory

## Getting around

Now, we're comfortable on our command line. Let's start navigating our
filesystem directly from our keyboard - no touchpad required!

### Where am I?

When getting started in a new place, it's often helpful to orient yourself to
your surroundings. The easiest way to orient yourself in the terminal is with
the `pwd` command. `pwd` stands for "Print Working Directory". It will print the
full path to your current directory out to your terminal. Give it a try now!

You might get back something unexpected here. If your prompt includes `~`, `pwd`
will return `/Users/your-user-name/` in its place. Remember that `pwd` always
returns the full path where you are, without any special characters or
shortcuts.

Once you know where you are, it's good to see what else is there! We can look at
what's present in the current folder with `ls`. `ls` is short for "List", and
will display the contents of whatever path you provide it with. For example, you
could run `ls .` to see your current directory's contents, or `ls ~/Projects` to
see the contents of the "Projects" directory inside your home directory. When
you don't provide any path, `ls` defaults to the contents of your current
working directory.

### A closer look at our contents

By itself, `ls` is useful but can be a little misleading. Linux & MacOS both
support the concept of hidden files. These are files or directories whose names
are preceded by a `.`. We've seen this before with the `.git` directory. Within
a Git repository, `ls` alone won't display the `.git` folder at all. We'll see
many more hidden files in upcoming lessons.

Command line instructions allow you to use _options_ to alter their behavior. We
set these options with either a single `-` (for shorthand options of one letter)
or a `--` (for option _keywords_: whole words or phrases). Here's an example
using short options with `ls`:

```sh
> ls -a -l
```

The above command runs `ls`, showing **a**ll files and displaying them in a
**l**ist format. This ensures that we see **all** files, including those that
are hidden. Viewing contents in a list format can make it a little easier to
read, and it will show us some extra info about each file/directory! We'll dig
into what that extra info means in a future lesson.

Here's one neat trick you'll see often with command line options: you can
combine short options! Instead of typing `-a` and `-l` separately, you can run
the same command this way:

```sh
> ls -al
```

Short options like this aren't order dependent, so `ls -la` will perform the
same action.

### Navigating directories

Now we know where we are and we know how to see what's around us. Let's set off
on an adventure! It's time to navigate to other directories.

We switch to a different directory with the `cd` command. `cd`, which stands for
"Change Directory", expects a path just like `ls`. Running `cd` with no
arguments will assume you'd like to change to your home directory, and you'll
end up back at `~`.

You can `cd` from any folder you have permission to access to any other folder
on your system. There's no need to move in small steps! You can jump directly
from `~` to `~/Projects/Homework-Week-1/Project-Name/code` with a single `cd`
command.

Here are some short examples of common `cd` commands you'll use:

- Change to your home directory:
  ```sh
  > cd
  # OR
  > cd ~
  # OR
  > cd /Users/YourUserName
  ```

- Navigate up a single level from your current position:
  ```sh
  > cd ..
  ```

- Move back to the last directory you were in:
  ```sh
  > cd -
  ```

### A caveat

You're browsing through your file system when you hit a snag: you encounter a
"Permission denied" error. Oh no!

Have no fear. This is perfectly normal. Your operating system has a strict
permissions system that tries its best to keep you from doing accidental damage.
This is less obvious when you're browsing folders with Finder or File Explorer,
where dangerous files/directories are hidden from view. In the terminal, though,
these unexpected blocks can be jarring.

If you have a problem with "Permission denied", it's best to ignore it and go
another direction for now. We'll discuss ways around this once you've had more
practice in the directories you already have permission to access.

## Making changes

You're a lean, mean, navigating machine! That's great, but now it's time to gain
more control of your environment. Let's discuss how to create your own files and
folders from the command line.

### Creating new files & directories

You may not have much navigating to do if you're in an empty home directory. To
start, let's discuss files. The fastest way to create an empty file is with the
`touch` command. You give `touch` a path & file name, and it creates an empty
file at that path with your given name. Here's an example:

```sh
> touch myApp.js

> touch ~/.js_settings
```

Note that `touch` doesn't put any content in the file, nor does it open the file
for editing. This is a great utility for laying your files out, but you'll
quickly want to move to a file editor (like VS Code) to make changes to these
files.

For directories, we have the `mkdir` command. `mkdir` is short for "Make
Directory" and will create a new, empty directory with the name you pass it:

```sh
> mkdir my-cool-projects

> mkdir ~/new-code
```

A common problem when learning `mkdir` is trying to create _nested_ directories.
For example, if I wanted to create a "first-week" directory inside a "homework"
directory in my home folder, I would need to ensure the "homework" directory
exists first. Here's what that looks like:

```sh
> mkdir ~/homework/first-week

mkdir: ~/homework: No such file or directory
```

We can solve this with a commonly-used short option for `mkdir`: `-p`. The `-p`
option stands for **parent**, and it will cause `mkdir` to create _all_ parent
directories it needs to create the requested directory:

```sh
> mkdir -p ~/none/of/these/directories/exist/but/now/they/will
```

One last thing: when naming files and directories, do not use spaces! You can
make multi-word names more distinct by using underscores, hyphens, and using
camelCase. While files are *allowed* to have spaces in their names, this can
complicate navigation. You'll thank yourself later if you avoid them altogether.

### Manipulating existing files

You're browsing directories. You're making files. Woohoo! Are you ready to make
some changes?

Just like using your mouse in Finder, you can copy/relocate files and
directories from the terminal. The commands you'll need are `cp` and `mv`.

`cp` is short for "copy" and will create a duplicate of a file. It requires two
arguments: a _source_ and a _destination_. _source_ can be the relative or
absolute path of a file, _destination_ can be a path to a file or a directory.
If _destination_ is a directory, `cp` will copy the source file into that
directory. If _destination_ is a file path, `cp` will copy the source file into
that new location.

**Gotcha**: If a file already exists in the destination of your copy command,
`cp` will overwrite the existing file.


```sh
# Will copy the file into the `people` subdirectory.
> cp best-friend.txt people/

# This command is identical to the above.
> cp best-friend.txt people/best-friend.txt
```

In each of these cases, we'll create an exact copy of `best-friend.txt` from
your current working directory and place that copy in the `people` folder.

You can copy directories just like files, but you'll need a special short
options to do so: `-r`. This option, short for "Recursive", copies not just the
directory but all of its contents! Without it, the directory will fail to copy:

```sh
> ls
my_dir my_other_dir

> cp my_dir my_other_dir/
cp: -r not specified; omitting directory 'my_dir/'
```


Alternatively, `mv` "moves" a file from one place to another. Think of this like
the "Cut" options on other operating systems. Again, you pass two arguments:

```sh
> mv breakfast-foods/cereal.txt anytime-foods/cereal.txt

# or identically:
> my breakfast-foods/cereal.txt anytime-foods/
```

What if you need to rename a file? There is no `rename` command in the terminal.
Instead, you'll use `mv` to accomplish this:

```sh
mv speled-rong.txt spelled-wrong.txt
```

Like `cp`, `mv` can be used to move or rename directories. However, unlike `cp`,
`mv` does *not* require a flag to do so. This is because the `mv` operation
simply renames the directory, so we're not concerned about the contents within
it.

### Clean up: aisle `~`!

Okay, file system traveler. You've thrown `mkdir` and `touch` around for long
enough! Let's discuss how we remove files and directories.

There are two removal commands in your terminal: `rm` and `rmdir`. The former is
for files or directories, while the latter is for directories only. The use
cases can be a little confusing, so let's look at some examples.

First, `rmdir`. This command, short for "Remove Directory" is only for removing
an empty directory. If the directory has any files or other directories within
it, the command will fail. You'll use this command occasionally for cleaning up
extra directories you've created, but you're more likely to use the other
removal command we mentioned.

```sh
# Remember, ~/my-app must be empty for this succeed!
rmdir ~/my-app
```

Last, `rm`. This command is short for "Remove" and can be one of the most
dangerous tools in your arsenal. We've mentioned this before, but it bears
repeating: *never use `rm` unless you're absolutely sure of what you're
removing*! The terminal is often much less forgiving than the Finder app or
Recycle Bin.

To use `rm`, you provide a filename or path. If you need to remove a directory
along with all of its contents, you can use the `-r` short option, which will
"Recursively" remove all files within the directory before removing the
directory itself. Your terminal will guide you along this process - all you have
to do is type "y" for "Yes" or any other key for "no" as it asks you about each
file within the directory you're deleting. Once a file has been `rm`'ed, it's
unrecoverable, so be *careful* about what you use `rm` on!

```sh
> rm file-we-dont-need.txt

> rm -r directory-full-of-files-we-dont-need/
```

Try practicing these new tools by cleaning up the mess you've made while
experimenting. You'll get lots more practice using these as the days progress.

## What we've learned

Navigating in the terminal is a little different than we're used to, but it's
much faster to type commands than to drag a mouse! You should now have a greater
mastery of:
- Exploring your file system via the terminal,
- Creating, updating, and removing files and directories,
- Using command line options to enhance our tools with new functionality.

________________________________________________________________________________
# Common Tasks On The Command Line

Let's go for a deeper dive into the tools we'll use day in and day out. We'll
cover:

- Searching for files by content,
- Performing multiple commands in sequence,
- Terminal text editors & file comparison,
- and how to perform common web tasks from the command line.

## `grep` marks the spot

One of the most common tasks you'll have is searching for a particular piece of
code in a project. This might be to help diagnose unexpected behavior, or it
might just be because you can't remember exactly where you left off! Either way,
having a tool to help you find your way to a specific point in your code is
critical to your workflow.

`grep` is a command line utility that was originally created in 1974 and stands
out as a well-tested, reliable tool that does one thing well: text search. The
name comes from the command sequence `g/re/p`, meaning "**G**lobally search for
a **R**egular **E**xpression and **P**rint" (We'll discuss _regular expressions_
in a future lesson). You can use `grep` to find text in a particular file or
across multiple files in a particular directory! It's like using "Cmd + F" from
the CLI. 

The simplest use of `grep` is with the contents of a single file. Here's an
example of using it to find all the variables in a JavaScript file:

```sh
> grep var ./myAppFile.js
```

Notice that `grep` expects at least 2 arguments: a _pattern_ and a _source_ to
search. In the above example, `var` is the pattern and `./myAppFile.js` is the
source. If your search string is more than a single word, you'll need to wrap it
in double-quotes:

```sh
> grep "I'm a programmer" ./resume.txt
```

By default, `grep` will return the whole line where your search string appears.
This can be a little confusing at first:

<p>
  <img src="images/cli-raw-grep-output.png" style="width: 100%; height: auto;">
</p>

In this example, there are four lines where the word "remote" appears in the
file `.git/config`. That's not particularly intuitive from this raw output,
though! Let's look at some ways to provide more helpful info from `grep`.

### Common `grep` options

We'll occasionally need to modify `grep`'s default behavior. One common
situation is when searching directories. It's likely that you'll want to use
`grep` to find any files in a directory that contain a certain pattern. You can
do this with the `-r` option, which stands for "**R**escursive". When run this
way, `grep` expects a directory path as its source. It will search the directory
and all of its children (files and subdirectories). Be aware: if there are lots
of files and you're searching a common phrase, you might get back more than you
expect with this option!

Another commonly-used option is `-n`, for "line **N**umber". This will show you
the exact line for each match. Handy if you want to find something extra-fast!

By default, `grep` is case-sensitive, so searching for `Let` won't bring back
instances of `let`. To override this behavior, use the `-i` option, for
"**I**gnore Case". 

The last common option we'll discuss is `-c`, for "**C**ount". This will return
only the number of matches, and not a full list of them. If you use this option
in conjunction with `-r`, you'll see filenames for each count as well. This will
be helpful when trying to track trends in code or when you need to know which
directory contains the largest number of matches.

## Teach yourself anything

`grep`, like most terminal commands, has many more options than we've discussed.
How can we keep track of them all? Fortunately, we don't have to! Our system
includes the `man` utility (short for **Man**ual) to help guide us when
questions arise.

To learn more about any built-in command, just use `man`:

```sh
> man grep
```

This will open `grep`'s manual page, the official documentation for the command.
You'll open in a _pager_, a lightweight document viewer meant to run in your
terminal. To browse the `man` page, use your arrow keys to scroll up & down, and
press the "Q" key on your keyboard to **q**uit.

`man` pages contain all the info you need to work with a command line utility.
They're typically structured in a predictable way:

- A short summary & description of special features at the top,
- Command line options with explanations in the middle,
- And examples & cool facts (like when the command was created) at the bottom.

They are often terse & technical, but `man` pages are the official word on the
tool you're curious about and are always a good place to start. Take some time
to read through the `man` pages of some of the commands we've already covered!

## Command redirection

With both `man` and `grep`, we experienced some serious terminal overload.
Wouldn't it be great if we could send that output somewhere else, like our text
editor or a file to read later? We can do this via _command redirection_.

As the name implies, redirection is all about taking the output from one command
and making it the input for a different command. Let's look at a very simple
example using `|`, the _pipe operator_, where we'll combine `man` and `grep` to
discover how to count pattern matches on a `man` page:

```sh
> man grep | grep -C1 count
```

Notice that we're not using the letters "L" or "I" but the vertical pipe
character, found on the same key as `\` and above your "Return" key on US
keyboard layouts. This operator takes the output from its left side and passes
it to the command on its right as the final argument. 

When we run the command above, we'll get back only the lines from `grep`'s `man`
page that include the word "count", along with one line above & below for
context:

<p>
  <img src="images/cli-grep-redirected-output.png" style="width: 100%; height:
  auto;">
</p>

It's common to want to save output from a command into a file, too! We can do
this a few different ways. The easiest is to use the `>` or `>>` operators:

```sh
# The single > operator will create a new file 
# to place output in. Existing content will be overwritten.
> grep -r "TODO" my_app/ > my-app-todos.txt

# The double > operator will append your output
# to an existing file (or create a new one if needed).
> grep "my-name" list-of-names.html >> name-locations.txt
```

These redirection operators are lightning-quick, but have the caveat of not
showing you the output before writing it to the given file! We can use the `tee`
utility to both see our output and have it written to a file:

```sh
> ls my_directory/ | tee directory_contents.txt
```

Your command line supports its own scripting language and we're just scratching
the surface with these redirection operators. Whenever you find yourself
performing one or two simple tasks in the same order numerous times, consider
how you might use redirection to simplify that process.

## Editing files directly from the CLI

We can create files from the command line, search for content, and even combine
commands into a single line! What about editing files directly from the command
line too? Yup - there's a utility for that!

> In fact, there are a **large** number of text editors available for the
> command line. Two of the most popular ones you'll hear about are _vim_ and
> _emacs_, which can both act as full development environments with a little
> customization! While you'll see lots of details about these editors online,
> it's best to avoid them for now. We'll focus on simpler editors with a much
> smaller learning curve.

We're going to take a look at `nano`, a terminal text editor that provides
easy-to-read instructions and is available on most systems. To get started, just
type `nano` on your command line.

Let's take a look at the `nano` interface:

<p>
  <img src="images/cli-nano-diagram.png" style="width: 100%; height: auto;">
</p>

The upper part of `nano` is the editor body. Here you can type just like you
would in any other editor. Text and linebreaks will work as expected, but
support may be limited for fancy characters or keyboard shortcuts.

At the bottom of the screen you can see the command menu. These are the actions
available to you and the keystrokes you need to access them. Remember that `^`
represents "Ctrl" on your keyboard, so `^O` is the same as `Ctrl + O`.

When you attempt to save a file via `Ctrl + O`, you may be asked to confirm the
filename. Type whatever name you'd like your file to have and hit "Enter" to
save. Don't worry: if you've forgotten to save recently, `nano` will help you
out by asking if you want to save unsaved changes before exiting!

When you run `nano` with no arguments, it opens to a new _buffer_, or empty
space in memory ready for you to write. No files will be created until you save
them. You can also run `nano` with a file path as an argument. `nano` will open
the given file for you to edit:

```sh
> nano myApp.js
```

### Why a terminal editor?

While `nano` is pretty stripped-down compared to a tool like VS Code, there are
really great reasons to get familiar with it. The biggest benefits come when
working in remote environments. 

You'll sometimes need to log into a server somewhere else in the world and
change a configuration file or run an update. If you need to edit text in that
remote environment, it's unlikely you'll have access to VS Code. It's
dramatically more likely that you'll have access to `nano` on your remote
terminal. Now you can confidently edit files on computers you may never see in
person! How cool is that?

## Bringing the internet into your terminal

One last task you'll perform frequently on the command line is downloading
files. This could be anything: an icon pack for your cool new app, an
installation script for a larger program, or even a whole webpage to scrape for
a project. 

You can use the `curl` command to download from a URL to a file on your
computer:

```sh
> curl https://www.my-website.com/my-file.html
```

With no other options, `curl` would download the contents of that URL to a new
file titled `my-file.html` on our system. If you'd rather name the new file
yourself, you can use the `-o` option:

```sh
> curl -o my-downloaded-file.html https://www.my-website.com/my-file.html
```

Like our other CLI utilities, `curl` is well-known and highly available. There's
an extensive `man` page that's worth browsing through, too! `curl` offers lots
of options that let you manage authentication, upload your own files, or even
customize the type of request you're making. It's a powerful tool behind its
rather simple facade.

## What we've learned

Whew! If this feels like a lot of new tools, don't worry! They're all things
you'll use on a daily basis. The beauty of using terminal tools like these is
their simplicity: you can build complex workflows out of very simple utilities,
and you get lots of practice in the process. 

After reading this lesson and exploring on your own, you should be able to:
- find specific phrases in files and directories with `grep`,
- learn more about any command using `man`
- link commands together by redirecting output as input,
- edit file content using `nano`,
- and download files from the web using `curl`.

________________________________________________________________________________
# Understanding The Shell

As a developer, you'll spend much of your time working at the command line.
Learning the commands you can use is important, but it's even more important to
build a foundational understanding of where those commands go! Let's get under
the hood and discuss the shell.

You'll learn:

- What a "shell" is,
- Shell-specific files and how to customize them,
- How commands are executed from the command line.

## No turtles here!

We've used the word "shell" a few times with no context. Let's fix that now! A
_shell_ in computing terms is the software layer that translates your command
line instructions into actual commands. Generally speaking, the shell serves two
purposes: **Calling applications using your input** and **supporting user
environments/customization**.

The shell is a small part of the much larger _operating system_, the software
that sits between your input and the microchips inside your computer. The
operating system, or _OS_, translates your actions all the way down into machine
instructions that can be processed by your CPU. You've heard of the most popular
OSes out there: Windows, macOS, and Linux.

### Selling C shells by the seashore

Like most things in web development, many people have strong opinions about
which shell is best. There are many shells available that you can install & use,
each with its own idiosyncrasies.

In our lessons, we'll focus on two shells, the _Bash_ shell and _Zsh_.
Bash has been around for a little over 30 years and has been battle-tested on
the most popular operating systems on the web. The biggest Linux operating
systems all use it as the default shell, and macOS has used it as the default
until switching to [Zsh in macoS Catalina].

Zsh is now the default shell in macOS Catalina and has been in use since the
1990s and has a strong following amongst linux users.

You'll want to keep which shell you use in mind as you search for help with
command line problems, as an answer intended for one shell may not work with
your shell.

One nice thing about Zsh is it's scripting compatibility with Bash. Which means
a shell script written for Bash will work in Zsh, although the opposite is not
always true.

### Shells vs Terminals

Your operating system may have an application called a "Terminal".  It's good to
note that a terminal is not a shell and a shell is not a terminal.  Terminal
applications are really emulating a piece of hardware known as a _terminal_ which
nobody really uses anymore.

![Terminal]

So we emulate a terminal using an application on our computers.  The Terminal
application will then execute the shell and it will give us a prompt so we can
then type commands.

### Shell Prompts

You'll notice your shell prompts you to type something by putting either a `$`
or a `%` before the cursor.  Bash uses `$` by default while Zsh uses a `%`. But
there's one more character you may see as your prompt character and that is
`#`. This appears if you are logged in as `root`, the unix superuser. Since with
great power comes great responsibility, whenever we see the `#` prompt we want
to be careful what we type because we could delete system files or cause files
to have the wrong permissions if we aren't absolutely sure what we are doing.

### Two purposes

A shell's primary purpose is to interpret your commands. It does this by looking
for applications installed on your computer and sharing any arguments or
environment-specific data they need. Let's think about the following command,
which will print the word "Test" to your terminal:

```sh
$ echo Test
```

In this command, `echo` refers to a program called "echo", while `Test` is an
argument you've given the program. Bash doesn't know what `echo` does, only that
it needs to find an application with that name and give it the word "Test". The
shell trusts the application will handle this input appropriately.

Bash searches for applications using the `PATH` variable. `PATH` is a special
variable that's available system-wide and includes all the directories you might
store applications in. You can view your own `PATH` using that `echo` utility:

```sh
$ echo $PATH
```

You should see a list of directory paths separated by colons. When you run a
command, your shell extracts the application name from the command and starts
going through the `PATH`, directory by directory, looking for that name. Once it
finds it, it passes along your input (or just starts the application, if there's
no input available), and stops looking.

Note that we didn't just write `echo PATH` above. Instead, we included a `$`
before the name of the variable. That's not a typo! On the command line, `$`
before a word indicates that we're looking for a variable with the following
name. Executing the command `echo PATH` would simply print out the word "PATH".

You might see a risk from this process right away: what happens if we have two
different versions of the same program? Bash will call whichever version of the
program it finds first in your `PATH`! If you're unsure which version of an
application Bash is going to run, you can use the `which` command:

```sh
$ which echo
/bin/echo
```

This output means Bash is going to run the application found at `/bin/echo`
every time you enter a command beginning with "echo". If `which` returns a
different version than you'd like to be running, you'll need to modify your
`PATH`, which we'll discuss as part of our customization options.

Speaking of customizations: that's the shell's secondary purpose! Your shell
makes things uniquely yours in a few different ways. The first is _environment
variables_. These are variables that are stored in memory and made available to
running applications by the shell. `PATH` is an example of an environment
variable. Another is `HOME`, which stores the location of your home directory.
You can see all your environment variables with the `env` command, but be
prepared to scroll! The list can get pretty long.

Other customizations include scripts, command aliases, and your prompt. We'll
discuss these more as we dig into deeper customization options in this and
future lessons.

### From the command line to the screen

It can be helpful to have a high-level overview of what's happening after you
press "Enter" on the command line. Check out the diagram below to see how your
command goes from keyboard to the monitor.

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-shell-breakdown-hc.png" style="width: 100%; height: auto;">
</p>

There are lots of extra steps we're overlooking here, but this should help you
visualize the role of the shell.

## Customizing your environment

Your shell's defaults (which may differ from system to system) are likely not
doing a lot to help you. They're meant to get things up and going quickly, but
you'll want to expand on them to suit your own tastes! Let's talk about how to
make changes to your shell.

### Startup files

The easiest way to make changes to the shell is directly from the command line.
For instance, you can use the `export` command to change/initialize a new
environment variable:

```sh
$ export NEW_VARIABLE=value
```

However, if you close your current terminal or open a new one, your environment
variable will no longer be present! To persist environment variables and other
customization settings, you'll need to put them in a file.

Bash supports several files intended for you to customize: `.profile`,
`.bash_profile` and `.bashrc`.

Zsh supports several customization files as well, but we will only need to use
`.zshrc` for most setups.

Each of these customization files are found in your home directory and are
hidden (as indicated by the `.` at the beginning of filename).

These customization files are sometimes referred to as _dotfiles_.

These startup files are executed automatically at different times when
you start your shell.

### Bash startup files

The `.bash_profile` or `.profile` are executed when bash is started with a
`-l` or `--login` command line flag.  This is called a _login shell_.  If you
run bash without this commmand line flag it instead is a _non-login shell_ and
runs the `.bashrc` file.

To add a little complexity, Bash will run the `.profile` only if there isn't a
`bash_profile`.

Now to confuse matters even more, often the `.bash_profile` will have a snippet of
code in it that executes the `.bashrc` as well (this is the default on Ubuntu
for instance)

To read more about which files Bash runs at which times at this link:
https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html

### Zsh startup files

The `.zshrc` file is started anytime you start Zsh for both _login shells_ and
_non-login_ shells. It does have a `.zlogin` file which is only executed on
login shells but since `.zshrc` loads on both most Zsh users don't use `.zlogin`
and instead put all their customizations in `.zshrc`.

To read more about all Zsh's various startup files you can follow this link:
http://zsh.sourceforge.net/Intro/intro_3.html

## To Login or Not to Login

So how can you tell if you have a login shell or a non-login shell? It depends
on how your operating system works.

### macOS

On macOS prior to Catalina if you open the Terminal
application, it runs Bash as a _login shell_ and therefore runs the
`.bash_profile` on every terminal window you open.

After macOS Catalina, if you open the Terminal application it launches Zsh
as a _login shell_ and therefore runs both `.zlogin` and `.zshrc`.

### Windows using WSL

On Windows using WSL, the Windows Ubuntu terminal app runs every bash
as a _login-shell_ and therefore will run the `.profile`.

### Ubuntu Linux

On Ubuntu Linux, by default the `.profile` is executed when
you login to the Ubuntu Desktop. Ubuntu does not include `.bash_profile` by
default. Then when you open the Terminal application, it runs each bash as a
_non-login shell_ which only runs `.bashrc`.

This can be somewhat frustrating to have to logout of the Ubuntu Desktop and
login back in each time you change your startup file. So instead you can change
the Terminal application to run each shell as a login shell by checking this
checkbox in the Terminal preferences that reads _"Run command as a login shell"_

![Ubuntu Terminal]

### Visual Studio Code

When you use Visual Studio Code's integrated terminal, on macOS it defaults
to being a login shell, while on Linux and Windows it does not.

You can change the integrated shell in vscode on Ubuntu and Windows using WSL
by modifying or adding these settings in the VSCode `settings.json` file.

```json
  "terminal.integrated.shell.linux": "bash",
  "terminal.integrated.shellArgs.linux": [ "-l" ]
```

If you use macOS Catalina, VSCode will still default to bash in it's integrated
shell, so you can set it to use Zsh like so:

```json
  "terminal.integrated.shell.osx": "zsh",
  "terminal.integrated.shellArgs.osx": [ "-l" ]
```

### Whew this seems complicated, can you just tell me which file to use?

Sure, here's our recommendations on how to customize your system depending on
platform to have the best results.

#### macOS Catalina with Zsh

- Put your customizations into your `.zshrc` file.
- Change Visual Studio Code to use `zsh` as it's shell.

#### macOS pre-Catalina with Bash

- Put your customizations into your `.bash_profile` file.

#### Ubuntu Linux

- Change your terminal to open login shells
- Put your customization into your `.profile` file.
- Change Visual Studio Code's integrated terminal to launch login shells as well.

#### Windows with WSL

- Put your customization into your `.profile` file.
- Change Visual Studio Code's integrated terminal to launch login shells as well.

### Customization options

Whew, that's a lot of new jargon & theory! Let's look at some practical examples
of what you can do with your dotfiles in Bash or Zsh.

Adding new options to your dotfiles starts with editing them.

You can open them directly from the command line using VS Code:

```sh
$ code ~/.bash_profile
# OR
$ code ~/.bashrc
# OR for Zsh
% code ~/.zshrc
```

Once you've saved your changes, you'll need to load any updated files into your
shell. You can do ths with the `source` command. `source` will execute the file
it's given, updating your currently-running environment with any changes you've
made:

```sh
# For Bash
$ source ~/.bash_profile
```

OR

```sh
# For Zsh
% source ~/.zshrc
```

One of the most common customizations are environment variables. These should
always be capitalized & use underscores instead of spaces to delineate words.
Here are a couple examples of code customizing environment variables, along with
comments explaining how each works.

```sh
# The simplest option: adding a totally new environment variable.
export FAVORITE_COLOR=blue

# Let's overwrite an existing environment variable with our own.
export HOME=/User/Student/Home

# Time to get get more creative: what if we want to _prepend_ 
# to the PATH variable, instead of overwriting it if it exists?
export PATH=/User/Student/Applications:$PATH
```

In that last example, notice how we used `$` before `PATH`. The dollar sign
indicates that we're referencing a variable. Bash will replace `$PATH` with the
value of the `PATH` variable, so we're effectively adding our own directory to
the beginning of the `PATH` variable. You'll see this technique used a **lot**
in dotfiles.

Another common customization is aliasing. An _alias_ is a shorthand way of
running a command. You might alias because a command is very long to type, or to
modify the system's default behavior! Here are some examples:

```sh
# Here's a Git alias that will save you a few keystrokes.
alias gst="git status"

# Some more Git magic: show the short log with an even shorter command!
alias glog="git log --oneline"

# By default, 'rm' will remove the file you pass it. The '-i'
# option makes 'rm' ask you "Are you sure?" before removing the
# given file. This is a great safety net to have while you're learning!
alias rm="rm -i"
```

Don't forget to `source` your dotfiles if you're following along!

Entering an alias on the command line makes the aliased command act just like
the full command was entered. You can still pass arguments like you normally
would! Here are some "before & after" examples of our aliases in action:

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-aliases-gst.png" style="width: 100%; height: auto;">
</p>

Notice how we get the same output from `gst` as `git status` with significantly
less typing.

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-aliases-glog.png" style="width: 100%; height: auto;">
</p>

Our `glog` alias provides us with a short, quick-to-read commit history that
takes even fewer characters typed than the default `git log`!

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-aliases-rm.png" style="width: 100%; height: auto;">
</p>

The `rm` alias is an example of changing the default behavior of a command.
Before we aliased `rm`, removing a file happened with no confirmation at all.
After the alias is applied, we see a prompt that lets us respond "y" (for
"**y**es") or "n" (for "**n**o"). Think of this as the command line version of a
"Confirm" or "Cancel" pop-up window!

## What we've learned

We're diving deeper behind the scenes of our terminal & operating system, and
hopefully you're beginning to understand how things work together! You should
now be comfortable with:

- What a "shell" is in computer terms,
- explaining, at a very high level, how your computer interprets your commands,
- reading and redefining the `PATH` environment variable,
- and customizing your system via _dotfiles_

[prior to Catalina which uses Zsh]: https://support.apple.com/en-us/HT208050
[Zsh in macoS Catalina]: https://support.apple.com/en-us/HT208050
[Ubuntu Terminal]:https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-shell-basics-ubuntu-terminal.png
[Terminal]:https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/DEC_VT100_terminal_transparent.png/675px-DEC_VT100_terminal_transparent.png at the command line.
Learning the commands you can use is important, but it's even more important to
build a foundational understanding of where those commands go! Let's get under
the hood and discuss the shell.

You'll learn:

- What a "shell" is,
- Shell-specific files and how to customize them,
- How commands are executed from the command line.

## No turtles here!

We've used the word "shell" a few times with no context. Let's fix that now! A
_shell_ in computing terms is the software layer that translates your command
line instructions into actual commands. Generally speaking, the shell serves two
purposes: **Calling applications using your input** and **supporting user
environments/customization**.

The shell is a small part of the much larger _operating system_, the software
that sits between your input and the microchips inside your computer. The
operating system, or _OS_, translates your actions all the way down into machine
instructions that can be processed by your CPU. You've heard of the most popular
OSes out there: Windows, macOS, and Linux.

### Selling C shells by the seashore

Like most things in web development, many people have strong opinions about
which shell is best. There are many shells available that you can install & use,
each with its own idiosyncrasies.

In our lessons, we'll focus on two shells, the _Bash_ shell and _Zsh_.
Bash has been around for a little over 30 years and has been battle-tested on
the most popular operating systems on the web. The biggest Linux operating
systems all use it as the default shell, and macOS has used it as the default
until switching to [Zsh in macoS Catalina].

Zsh is now the default shell in macOS Catalina and has been in use since the
1990s and has a strong following amongst linux users.

You'll want to keep which shell you use in mind as you search for help with
command line problems, as an answer intended for one shell may not work with
your shell.

One nice thing about Zsh is it's scripting compatibility with Bash. Which means
a shell script written for Bash will work in Zsh, although the opposite is not
always true.

### Shells vs Terminals

Your operating system may have an application called a "Terminal".  It's good to
note that a terminal is not a shell and a shell is not a terminal.  Terminal
applications are really emulating a piece of hardware known as a _terminal_ which
nobody really uses anymore.

![Terminal]

So we emulate a terminal using an application on our computers.  The Terminal
application will then execute the shell and it will give us a prompt so we can
then type commands.

### Shell Prompts

You'll notice your shell prompts you to type something by putting either a `$`
or a `%` before the cursor.  Bash uses `$` by default while Zsh uses a `%`. But
there's one more character you may see as your prompt character and that is
`#`. This appears if you are logged in as `root`, the unix superuser. Since with
great power comes great responsibility, whenever we see the `#` prompt we want
to be careful what we type because we could delete system files or cause files
to have the wrong permissions if we aren't absolutely sure what we are doing.

### Two purposes

A shell's primary purpose is to interpret your commands. It does this by looking
for applications installed on your computer and sharing any arguments or
environment-specific data they need. Let's think about the following command,
which will print the word "Test" to your terminal:

```sh
$ echo Test
```

In this command, `echo` refers to a program called "echo", while `Test` is an
argument you've given the program. Bash doesn't know what `echo` does, only that
it needs to find an application with that name and give it the word "Test". The
shell trusts the application will handle this input appropriately.

Bash searches for applications using the `PATH` variable. `PATH` is a special
variable that's available system-wide and includes all the directories you might
store applications in. You can view your own `PATH` using that `echo` utility:

```sh
$ echo $PATH
```

You should see a list of directory paths separated by colons. When you run a
command, your shell extracts the application name from the command and starts
going through the `PATH`, directory by directory, looking for that name. Once it
finds it, it passes along your input (or just starts the application, if there's
no input available), and stops looking.

Note that we didn't just write `echo PATH` above. Instead, we included a `$`
before the name of the variable. That's not a typo! On the command line, `$`
before a word indicates that we're looking for a variable with the following
name. Executing the command `echo PATH` would simply print out the word "PATH".

You might see a risk from this process right away: what happens if we have two
different versions of the same program? Bash will call whichever version of the
program it finds first in your `PATH`! If you're unsure which version of an
application Bash is going to run, you can use the `which` command:

```sh
$ which echo
/bin/echo
```

This output means Bash is going to run the application found at `/bin/echo`
every time you enter a command beginning with "echo". If `which` returns a
different version than you'd like to be running, you'll need to modify your
`PATH`, which we'll discuss as part of our customization options.

Speaking of customizations: that's the shell's secondary purpose! Your shell
makes things uniquely yours in a few different ways. The first is _environment
variables_. These are variables that are stored in memory and made available to
running applications by the shell. `PATH` is an example of an environment
variable. Another is `HOME`, which stores the location of your home directory.
You can see all your environment variables with the `env` command, but be
prepared to scroll! The list can get pretty long.

Other customizations include scripts, command aliases, and your prompt. We'll
discuss these more as we dig into deeper customization options in this and
future lessons.

### From the command line to the screen

It can be helpful to have a high-level overview of what's happening after you
press "Enter" on the command line. Check out the diagram below to see how your
command goes from keyboard to the monitor.

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-shell-breakdown-hc.png" style="width: 100%; height: auto;">
</p>

There are lots of extra steps we're overlooking here, but this should help you
visualize the role of the shell.

## Customizing your environment

Your shell's defaults (which may differ from system to system) are likely not
doing a lot to help you. They're meant to get things up and going quickly, but
you'll want to expand on them to suit your own tastes! Let's talk about how to
make changes to your shell.

### Startup files

The easiest way to make changes to the shell is directly from the command line.
For instance, you can use the `export` command to change/initialize a new
environment variable:

```sh
$ export NEW_VARIABLE=value
```

However, if you close your current terminal or open a new one, your environment
variable will no longer be present! To persist environment variables and other
customization settings, you'll need to put them in a file.

Bash supports several files intended for you to customize: `.profile`,
`.bash_profile` and `.bashrc`.

Zsh supports several customization files as well, but we will only need to use
`.zshrc` for most setups.

Each of these customization files are found in your home directory and are
hidden (as indicated by the `.` at the beginning of filename).

These customization files are sometimes referred to as _dotfiles_.

These startup files are executed automatically at different times when
you start your shell.

### Bash startup files

The `.bash_profile` or `.profile` are executed when bash is started with a
`-l` or `--login` command line flag.  This is called a _login shell_.  If you
run bash without this commmand line flag it instead is a _non-login shell_ and
runs the `.bashrc` file.

To add a little complexity, Bash will run the `.profile` only if there isn't a
`bash_profile`.

Now to confuse matters even more, often the `.bash_profile` will have a snippet of
code in it that executes the `.bashrc` as well (this is the default on Ubuntu
for instance)

To read more about which files Bash runs at which times at this link:
https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html

### Zsh startup files

The `.zshrc` file is started anytime you start Zsh for both _login shells_ and
_non-login_ shells. It does have a `.zlogin` file which is only executed on
login shells but since `.zshrc` loads on both most Zsh users don't use `.zlogin`
and instead put all their customizations in `.zshrc`.

To read more about all Zsh's various startup files you can follow this link:
http://zsh.sourceforge.net/Intro/intro_3.html

## To Login or Not to Login

So how can you tell if you have a login shell or a non-login shell? It depends
on how your operating system works.

### macOS

On macOS prior to Catalina if you open the Terminal
application, it runs Bash as a _login shell_ and therefore runs the
`.bash_profile` on every terminal window you open.

After macOS Catalina, if you open the Terminal application it launches Zsh
as a _login shell_ and therefore runs both `.zlogin` and `.zshrc`.

### Windows using WSL

On Windows using WSL, the Windows Ubuntu terminal app runs every bash
as a _login-shell_ and therefore will run the `.profile`.

### Ubuntu Linux

On Ubuntu Linux, by default the `.profile` is executed when
you login to the Ubuntu Desktop. Ubuntu does not include `.bash_profile` by
default. Then when you open the Terminal application, it runs each bash as a
_non-login shell_ which only runs `.bashrc`.

This can be somewhat frustrating to have to logout of the Ubuntu Desktop and
login back in each time you change your startup file. So instead you can change
the Terminal application to run each shell as a login shell by checking this
checkbox in the Terminal preferences that reads _"Run command as a login shell"_

![Ubuntu Terminal]

### Visual Studio Code

When you use Visual Studio Code's integrated terminal, on macOS it defaults
to being a login shell, while on Linux and Windows it does not.

You can change the integrated shell in vscode on Ubuntu and Windows using WSL
by modifying or adding these settings in the VSCode `settings.json` file.

```json
  "terminal.integrated.shell.linux": "bash",
  "terminal.integrated.shellArgs.linux": [ "-l" ]
```

If you use macOS Catalina, VSCode will still default to bash in it's integrated
shell, so you can set it to use Zsh like so:

```json
  "terminal.integrated.shell.osx": "zsh",
  "terminal.integrated.shellArgs.osx": [ "-l" ]
```

### Whew this seems complicated, can you just tell me which file to use?

Sure, here's our recommendations on how to customize your system depending on
platform to have the best results.

#### macOS Catalina with Zsh

- Put your customizations into your `.zshrc` file.
- Change Visual Studio Code to use `zsh` as it's shell.

#### macOS pre-Catalina with Bash

- Put your customizations into your `.bash_profile` file.

#### Ubuntu Linux

- Change your terminal to open login shells
- Put your customization into your `.profile` file.
- Change Visual Studio Code's integrated terminal to launch login shells as well.

#### Windows with WSL

- Put your customization into your `.profile` file.
- Change Visual Studio Code's integrated terminal to launch login shells as well.

### Customization options

Whew, that's a lot of new jargon & theory! Let's look at some practical examples
of what you can do with your dotfiles in Bash or Zsh.

Adding new options to your dotfiles starts with editing them.

You can open them directly from the command line using VS Code:

```sh
$ code ~/.bash_profile
# OR
$ code ~/.bashrc
# OR for Zsh
% code ~/.zshrc
```

Once you've saved your changes, you'll need to load any updated files into your
shell. You can do ths with the `source` command. `source` will execute the file
it's given, updating your currently-running environment with any changes you've
made:

```sh
# For Bash
$ source ~/.bash_profile
```

OR

```sh
# For Zsh
% source ~/.zshrc
```

One of the most common customizations are environment variables. These should
always be capitalized & use underscores instead of spaces to delineate words.
Here are a couple examples of code customizing environment variables, along with
comments explaining how each works.

```sh
# The simplest option: adding a totally new environment variable.
export FAVORITE_COLOR=blue

# Let's overwrite an existing environment variable with our own.
export HOME=/User/Student/Home

# Time to get get more creative: what if we want to _prepend_ 
# to the PATH variable, instead of overwriting it if it exists?
export PATH=/User/Student/Applications:$PATH
```

In that last example, notice how we used `$` before `PATH`. The dollar sign
indicates that we're referencing a variable. Bash will replace `$PATH` with the
value of the `PATH` variable, so we're effectively adding our own directory to
the beginning of the `PATH` variable. You'll see this technique used a **lot**
in dotfiles.

Another common customization is aliasing. An _alias_ is a shorthand way of
running a command. You might alias because a command is very long to type, or to
modify the system's default behavior! Here are some examples:

```sh
# Here's a Git alias that will save you a few keystrokes.
alias gst="git status"

# Some more Git magic: show the short log with an even shorter command!
alias glog="git log --oneline"

# By default, 'rm' will remove the file you pass it. The '-i'
# option makes 'rm' ask you "Are you sure?" before removing the
# given file. This is a great safety net to have while you're learning!
alias rm="rm -i"
```

Don't forget to `source` your dotfiles if you're following along!

Entering an alias on the command line makes the aliased command act just like
the full command was entered. You can still pass arguments like you normally
would! Here are some "before & after" examples of our aliases in action:

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-aliases-gst.png" style="width: 100%; height: auto;">
</p>

Notice how we get the same output from `gst` as `git status` with significantly
less typing.

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-aliases-glog.png" style="width: 100%; height: auto;">
</p>

Our `glog` alias provides us with a short, quick-to-read commit history that
takes even fewer characters typed than the default `git log`!

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-aliases-rm.png" style="width: 100%; height: auto;">
</p>

The `rm` alias is an example of changing the default behavior of a command.
Before we aliased `rm`, removing a file happened with no confirmation at all.
After the alias is applied, we see a prompt that lets us respond "y" (for
"**y**es") or "n" (for "**n**o"). Think of this as the command line version of a
"Confirm" or "Cancel" pop-up window!

## What we've learned

We're diving deeper behind the scenes of our terminal & operating system, and
hopefully you're beginning to understand how things work together! You should
now be comfortable with:

- What a "shell" is in computer terms,
- explaining, at a very high level, how your computer interprets your commands,
- reading and redefining the `PATH` environment variable,
- and customizing your system via _dotfiles_

[prior to Catalina which uses Zsh]: https://support.apple.com/en-us/HT208050
[Zsh in macoS Catalina]: https://support.apple.com/en-us/HT208050
[Ubuntu Terminal]:https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-shell-basics-ubuntu-terminal.png
[Terminal]:https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/DEC_VT100_terminal_transparent.png/675px-DEC_VT100_terminal_transparent.png
________________________________________________________________________________
# Bash Permissions & Scripting

Now that you're familiar with Bash, let's get back to what we're all here for:
PROGRAMMING! We'll discuss the basics of Bash scripting, including: 

- Creating a new script file,
- Accepting user input and conditionally responding to it,
- Modifying permissions to make the script executable,
- and choosing how to execute your script (or any other application).

## Understanding `sudo` and file permissions

Before we can write any code, we need to get a quick look at file permissions in
UNIX-based operating systems. Without understanding this critical part of file
management, you'll have a difficult time creating new scripts of your own.

Remember the command/option combo `ls -al`? We'll focus in particular on the
`-l` command line option, which **l**ists the files in the directory along with
their metadata. This includes their _file permissions_ (also sometimes referred
to as _modes_). Permissions determine who can access a given file or directory.

Here's an example of what a directory and file look like via `ls -al`:

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-ls-list-example.png" style="width: 100%; height: auto;">
</p>

The file permissions are the ten characters on the left side of each line. Let's
break them down:

<p>
  <img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Unix/cli/assets/cli-unix-permissions.png" style="width: 100%; height: auto;">
</p>

The leftmost position is the _directory indicator_. This is the easiest part to
read! You'll see a `d` for directories and a `-` for files.

The remaining nine characters are broken into groups of three, representing the
_owner_, _group_, and _others_ from left to right. Each group has three
permissions available: 

- _read (r)_: view a file or directory's contents
- _write (w)_: modify a file or directory's contents
- _execute (x)_: run a file like an application, navigate into a directory

A letter in any position means that permission is _granted_, while a `-` means
the permission is _restricted_. 

In our example above, we can see that the owner (`jdh`) of the file
`my-shared-timeline.zip` can view the file or edit it, but the group (`staff`)
and world (everyone else) can only view it. No one is allowed to execute the
file, but that makes sense in this case: `x` permissions are mostly used by
scripts/applications and directories.

### Numeric permission notation

While the letters `r`, `w`, and `x` are easy to read, you'll also see a numeric
notation for file permissions. To convert letter notation to numeric, you'll
need to grant each permission a number value. `x` is worth 1, `w` is worth 2,
and `r` is worth 4. Now, tally up points for each group and write them out side
by side.

From our example above, we'd get `644`. This is the numeric notation for the
permissions of `my-shared-timeline.zip`. You'll sometimes see these numeric
formats referenced in documentation or Bash error messages, so it's good to know
how to read them even if you don't use them often!

Numeric permissions are presented in _octal notation_. You can read a few more
details about how this works on [LinuxCommand.org][LinuxCommand octal
permissions].

### Modifying permissions

We're not stuck with the permissions a file starts with! We can use the `chmod`
command to update the permissions of a file ourselves. `chmod`, short for
"**ch**ange **mod**e", dates back to the early days of UNIX. You may hear it
pronounced as "cha-mod", "see-aych-mod", or even referred to as "change mod". 
 
Let's say we've written a cool "How To" guide that we'd like to share with all
users of our system. Assume we're starting with permissions where the owner can
read or update the file but no one else can even read it (`-rw-------` or
`600`). 

To change this so that anyone on the system can read it, we could run:

```sh
> chmod +r my-guide.txt
```

This is saying "Add the 'r' permission for all users who try to access
`my-guide.txt`.

To _revoke_ that permission, you can exchange `+` for `-`:

```sh
> chmod -r my-guide.txt
```

Uh oh! If we check `my-guide` now, we'll see that we're not back at `-rw-------`
- we're now at `--w------`! When you change permissions using letter notation
  and don't specify a target group, the change affects **all three** groups at
  once. You can scope this down by preceding the operator with either `u` (for
  **user**, meaning the file's owner), `g` (for the file's owning **group**),
  and `o` (for **others**).

Let's add read permissions back for the owner:

```sh
> chmod u+r my-guide.txt
```

Perfect! Now we've reverted our permissions back to their original state.



### Ignoring permissions entirely with sudo

Most systems include a _root_ user that has total authority. The root user can
run applications and change files indiscriminately. With that much power, it's
hard to keep a system safe! For this reason, it's a bad practice to log in as
`root`.

To keep us from having to memorize both our own password and that of the `root`
account for every system, we've got a helpful command called `sudo`. `sudo` is
short for "**S**uper **U**ser **Do**", and as the name implies it allows you to
impersonate the `root` user for a particular task.

**`sudo` is inherently dangerous.** Every time you use it, you're at risk of
doing real damage to the system you're on. While there are some [advanced
safeguards & security features][sudo manpage] for the `sudo` command, it's best
to use is sparingly if at all.

Generally, applications will provide a message letting you know if `sudo` is
needed. This might include installing new applications or browsing system
configuration files. These decisions are only as safe as you make them, so be
sure you're confident about the changes you're making before using `sudo`. 

There's a common trap we've mentioned before where `sudo` comes up frequently:
the `rm` command. Using `rm` indiscriminately as an unprivileged user can cause
you some frustration but is unlikely to do any permanent damage. Using `sudo rm`
in any capacity can wreak havoc on a system and may result in significant data
loss. 

**Never use `sudo` with `rm` or with code from the internet that you don't
understand!**

## Bash scripting

Let's talk about scripting. We've used the word "script" quite a few times
already, but what exactly is it? A _script_ is simply a text file that we've
granted permission to execute on our system.

You'll have lots of opportunities to run scripts for everything from setting up
your environment on a new computer to installing new applications. Writing your
own scripts is a great way to automate repetitive tasks.

### Script requirements

An effective script requires three things:

- An interpreter directive
- A commented description
- A script body

The _interpreter directive_ (more commonly called the _shebang_) is the first
line of the script file. It's used by the operating system to know which
application should be used to run your code. 

> Why "shebang"? This name is a combination of two words: _hash_, a reference to
> the octothorpe symbol (`#`) and _bang_, a reference to the exclamation point
> (`!`). Helpfully, the "shebang" nickname will also help you remember in which
> order these characters are expected!

Here's an example shebang for a Bash script:

```
#!/bin/bash
```

Adding that line to the top of your script file lets the system know that you'd
like to use the application `/bin/bash` to run your script file. As you learn
more scripting languages, you can change change the shebang to make sure the
script's language matches its executing environment.

The commented description is a best practice. Your script won't fail to run
without it, but saving scripts without comments is a dangerous game - if you
forget what it is or how it works, you won't have any reference to help re-learn
it! Investing a few minutes in a good comment explaining why you're writing this
script will save you a few of hours of headache down the road. Comments in Bash
scripts must be preceded by an octothorpe (`#`) on each line.

The script body is where the magic happens. Here, you'll write commands just as
you would enter them on your command line, and they'll be sequentially executed
to complete the script. Each line should include a separate command.

### A sample script

Here's a very simple "Hello World!" application in Bash:

```sh
#!/bin/bash

# "Hello, World!" by Alex Martin
#
# Prints a friendly message to the screen

echo "Hello, World! "
```

Notice that we've got all three of our key ingredients for a successful script.
All we need is to copy this script into an empty file and make it executable.

### Updating & running a script

Once you've written your script into a new file, you need to make that file
executable. For security, your system won't run just any file! You'll need to
mark it "safe" through the magic of `chmod`. 

Assuming our script is called `hello-world`, this will make the file executable:

```sh
> chmod +x hello-world
```

We can now run it simply by invoking the file:

```sh
> ./hello-world
Hello, World!
```

Notice how we used `./` before the script. This isn't strictly necessary, but
it's a good habit to get into. If we ran just `hello-world` and happened to have
an application called "hello-world" available in our `PATH`, we might never make
it to our own script! Preceding the script name with `./` ensures we're going to
the run the script with that name in the current directory.

## What we've learned

We've covered some of the basics of files and security, and we've looked at
Bash's native scripting support. After this lesson you should be able to:

- explain the basics of file permissions from `ls -l` output,
- read and modify file permissions from the command line,
- create and a run a small Bash script.

[LinuxCommand octal permissions]: http://linuxcommand.org/lc3_lts0090.php
[sudo manpage]: http://manpages.ubuntu.com/manpages/trusty/man8/sudo_root.8.html

________________________________________________________________________________
# WEEK-03 DAY-4<br>*Recursion* {ignore=true}
________________________________________________________________________________
# Recursion Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given a recursive function, identify what is the base case and the recursive
 case.
2. Explain when a recursive solution is appropriate to solving a problem over
 an iterative solution.
3. Write a recursive function that takes in a number, n, argument and
 calculates the n-th number of the Fibonacci sequence.
4. Write a function that calculates a factorial recursively.
5. Write a function that calculates an exponent (positive and negative)
 recursively.
6. Write a function that sums all elements of an array recursively.
7. Write a function that flattens an arbitrarily nested array into one
 dimension.
8. Given a buggy recursive function that causes a RangeError: Maximum call
 stack and examples of correct behavior, debug the function. learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given a recursive function, identify what is the base case and the recursive
 case.
2. Explain when a recursive solution is appropriate to solving a problem over
 an iterative solution.
3. Write a recursive function that takes in a number, n, argument and
 calculates the n-th number of the Fibonacci sequence.
4. Write a function that calculates a factorial recursively.
5. Write a function that calculates an exponent (positive and negative)
 recursively.
6. Write a function that sums all elements of an array recursively.
7. Write a function that flattens an arbitrarily nested array into one
 dimension.
8. Given a buggy recursive function that causes a RangeError: Maximum call
 stack and examples of correct behavior, debug the function.

________________________________________________________________________________
# Re-learning Functions With Recursion

Imagine it's your first day at a new job and your boss has asked you to unpack
some fruit crates. Not too bad, right? Now imagine each crate has smaller crates
inside. Still easy? Consider even smaller crates, nested within one another,
each needing to be unpacked. How long before you throw your hands up in
frustration and walk away?

Sometimes simple tasks get complicated and we need new tools to help us solve
them. Working with digital data is a little like working with those crates: they
may be simple to unpack, or they may be incredibly dense! Let's explore a new
way of approaching problems: _recursion_.

We'll cover:

- what recursion is and how to identify it,
- implementing recursive functions,
- and breaking complex problems down into simpler tasks.

## Re-what now?

So far, we've solved complex problems with _iteration_: the process of counting
through each item in a collection. Like most things in programming, though,
there's another way! Let's check out _recursion_: the process of calling a
function within itself.

To wrap your mind around this new concept, think back to that example of crates
within crates. If we have to gently unpack each crate but we don't know the
contents, we'll have to go one-by-one through each crate, pulling items out
individually. Let's think about a better way! What if we open each crate and
look inside. If it's more crates, we dump them out. If it's fruit, we gently
remove the fruit and set it aside.

What might this process look like in code? Here's some pseudocode to help us
think through it:

```js
function gentlyUnpackFruit(contents) {
  console.log("Your " + contents + " have been unpacked!");
}

function dump(crate) {
    if (crate.content_type === "crate") {
        dump(crate.contents);
    } else if (crate.content_type === "fruit") {
        gentlyUnpackFruit(crate.contents);
    }
}
```

Notice how we call the `dump` function from **within** the `dump` function.
That's recursion in action! The `dump` function may _recurse_ if we have crates
nested within each other.

### A note on language

You'll notice we've used the term _recurse_ here, which you may not have heard
before. Technically, the root word in "recursion" is "recur", but this is
ambiguous. Consider these two examples:

```js
console.log("Hello"); console.log("Hello");

// versus...

console.log(console.log("Hello"));
```

Both of these functions **recur** (as in, call the `console.log` function more
than once), but only one of these functions is **recursive** (as in, calling
`console.log` from within another `console.log`). To reduce confusion,
researchers began using the term ["recurse"][1] to refer specifically to
functions that are being called from within themselves. Creating a new word by
removing a suffix in this way is known as _back-formation_.

We'll prefer "recurse" when discussing this topic, but you may see "recur" in
other places! Carefully read the context and make sure you understand how these
words might differ. Interviewers may use the terms interchangeably to trip you
up, but we know you'll be ready for the challenge!

## Two cases

Understanding recursion means understanding the two _cases_, or expected output
for a particular input, in a recursive function. These are known as the _base
case_ and _recursive case_.

- The _base case_ describes the situation where data passed into our function is
  processed without any additional recursion. When the base case is executed,
  the function runs once and ends. Since this results in the function stopping,
  we may also refer to this as the _terminating case_.

- The _recursive case_, as the name suggests, is the situation where the
  function recurses. This represents the data state that causes a function to
  call itself. Without a recursive case, a function's just another function!

In our fruit crate example, the base case is "when the crate contains fruit" and
the recursive case is "when the crate contains other crates". When we encounter
fruit, we remove the fruit and the action is complete. However, when we
encounter more crates, we go back to the start and repeat the whole process
again. 

Identifying these cases for a process won't always be that simple, but it's
critical to figure out each one before writing any code. Without a recursive
case, we don't need recursion at all, and we should consider an alternative
approach. Without a base case, we might be creating an _infinite loop_ - yikes!
We need to know when to stop the process before we start it.

## A recursive example

Let's look at a more practical problem you might encounter in the wild. We're
going to use the "Movie Theater Problem" to demonstrate how recursion can help
us with a real world issue.

Imagine you're meeting a friend in a movie theater. The lights have gone down,
it's totally dark, and your friend just sent you a message asking which row
you're seated in. Without being able to see the rows or your ticket, how might
you figure out the row number?

Let's assume a few things:

- The theater is mostly occupied, so you can rely on people being in front of &
  behind you.
- You don't want to knock over anyone's drinks & snacks, so you must remain in
  your seat.
- Your phone is almost dead, so you can't use the flashlight or screen to
  illuminate the seats - no cheating!

What if we tap the person in front of us on the shoulder? If there's someone in
front of us, we know that we're at least one row back from the front of the
theater. If someone is in front of **them**, we're at least **two** rows back!
This pattern continues until we reach the screen.

If each person performs this action and they all report back, we can
count how many rows back we are! We've missed a key part in this analysis,
though - when do we stop tapping each other? If someone reaches forward and
there's no one else in front of them, we can assume we've reached the front of
the theater. That person becomes "Row #1", and our test stops.

In this example, our base case is "No one in front of me = Row #1" and our
recursive case is "Someone in front of me = Row #(1 + person in front of me's
row #)". Now the we know both cases, we can build a recursive function out of
them! Here's what this might look like in JavaScript:

```js
determineRow = function(moviegoer) {
  if (moviegoer.personInFront) {
      return 1 + determineRow(moviegoer.personInFront);
  } else {
      return 1;
  }
}
```

Now it doesn't matter if our movie theater has 5 rows or 5,000 rows - we have a
tool to figure out where we are at any time. We've also gone through an
important exercise in understanding our space to get here! By working to our
sides instead of in front of us, we could use the same process to figure out
exactly which seat we're in on the row. 

## What we've learned

Whew! If your head is spinning, don't worry - it's totally natural. Recursion
can get a lot mre complex than what we've covered here, but it comes down to
working smarter, not harder. We'll dig a little deeper into advanced recursion
and how to know when to build a recursive function in our next lesson.

Check out Computerphile's [What on Earth is Recursion?](https://www.youtube.com/watch?v=Mv9NEXX1VHc) to learn more about recursion and the stack. 

After completing the reading and video, you should be able to:

- define _recursion_,
- explain its use,
- and identify a simple base & recursive case in a problem.

[1]: https://en.wiktionary.org/wiki/recurse

________________________________________________________________________________
# When To Hold & When To Fold(Fold(Fold())): Recursion vs. Iteration

We know what _recursion_ is, but to truly understand what's happening, we need
to go deeper! Let's investigate the process of recursion and build a better
understanding of the risks involved.

We'll cover:

- recursion and the call stack,
- differentiating recursive and iterative functions,
- and know when to use each tool for maximum effect.

## A deeper dive into recursion

Learning about recursion requires that we review the _call stack_. Remember that
each function call in JavaScript _pushes_ a new _stack frame_ onto the top of
the call stack, and the last pushed frame gets _popped_ off as it gets executed.
We sometimes refer to this as a _Last In, First Out_, or _LIFO_, stack.

Here's an example to jog your memory:

![Stack trace reminder from "Call Stack" lesson][stack-trace-04]

Recursive functions risk placing extra load on the call stack. Each recursive
function call depends on the call before it, meaning we can't start executing a
recursive function's stack frames until we reach the _base case_. So what
happens if we never do? Look out!

### London Stack is falling down!

The JavaScript call stack has a size limit which varies between different
browsers and even different systems! Once the stack reaches this limit, we get
what's called a _stack overflow_. The program halts, the stack gets wiped out
entirely, and we're left with no results wondering what we did wrong.

![Stack overflow example with call stack][stack-overflow]

Let's look at an example of an obvious stack overflow issue:

```js
function pythagoreanCup() {
    pythagoreanCup();
};

pythagoreanCup();
```

Output:
```plaintext
Uncaught RangeError: Maximum call stack size exceeded
    at pythagoreanCup (<anonymous>)
    at pythagoreanCup (<anonymous>)
    at pythagoreanCup (<anonymous>)
    at pythagoreanCup (<anonymous>)
    at pythagoreanCup (<anonymous>)
    ...
```

The function `pythagoreanCup` is clearly recursive, since it calls itself, but
we're missing a base case to work towards! This means the function will recurse
until the call stack overflows, resulting in a `RangeError`. Whoops! Notice that
in our _stack trace_ (the output below the error name & message), we can see
that `pythagoreanCup` is the only function currently in the call stack.

Fixing the overflow issue in this case is straightforward: determine a base case
and implement it in your function. Here's a fixed version of the example above
with some extra comments:

```js
let justEnoughWine = false;

function pythagoreanCup() {
    // Base case:
    // - Is `justEnoughWine` true? Return & exit.
    if (justEnoughWine === true) {
        console.log("That's plenty, thanks!");
        return true;
    }

    // Recursive case:
    // - justEnoughWine must not have been true,
    //   so let's set it and check again.
    justEnoughWine = true;
    pythagoreanCup();
};

pythagoreanCup();
```

Output:
```plaintext
"That's plenty, thanks!"
```


> The stack size limit varies due to different implementations: some JavaScript
> environments might have a fixed limit, while others will rely on available
> memory on your computer. Regardless of your environment, if you're receiving
> `RangeError`s, you should refactor your function! It's bad practice to build
> software that only runs in one particular browser or using a specific runtime.

### Step by step

Notice that our change to `pythagoreanCup` did two things:

- Provided a base case that lets us end the recursion,
- and added an action that moves us **towards** the base case.

Without changing the value of `justEnoughWine`, we would never enter the base
case and our stack would still be at risk of growing out of control. 

We refer to the action that gets us closer to the base case as the _recursive
step_. Don't forget to build this step into your function! Your base case
doesn't mean anything if you're not moving towards it with each recurrence.

### Types of recursion

Our examples of recursion so far have involved a single function calling itself.
We refer to this situation as _direct recursion_: functions directly calling
themselves. There's a trickier type of recursion to debug, though. Take a look
at the following example:

```js
function didYouDoTheThing() {
    ofCourseIDidTheThing();
}

function ofCourseIDidTheThing() {
    didYouDoTheThing();
}

didYouDoTheThing();
```

Uh oh! Neither of these functions appears to be recursive by itself, but calling
either of them will put us into a recursive loop with no base case in sight. We
refer to recursive loops across multiple functions as _indirect recursion_.
There's nothing wrong with using this technique, but be careful! Because the
call stack will have multiple function names in it, debugging problems with
indirectly recursive functions can be a headache.

## When to iterate, when to recur

Alright, slow down, programmers. Before you rewrite all your recent projects to
use recursive functions, let's investigate why you might choose iteration
instead. 

Remember that _iteration_ is when we call a function for each member of a
collection, instead of letting the function call itself. So far, the code you've
written using `for` loops and iterator functions like `.forEach` has been
_iterative_. Iterative code tends to be less resource-intensive than recursive
code, and it requires less planning to get working. It's also usually easier to
read & understand - an important thing to consider when writing software!

Iterative approaches tend to break down when our data becomes _very complex_ or
_very large_. Consider the task of sorting paper folders by the number of files
in each. If you only had a few folders, this wouldn't be very daunting, and you
could take an iterative approach: open each folder individually, count the
files, and place the folders in the correct order. 

However, if you had thousands or even millions of folders, iteration would take
days instead of minutes. You'd want time to implement a system for getting
through those folders efficiently, and that system would likely involve a
procedure for ordering in batches. This is exactly what recursive functions do
best: repetitive processes on subsets of given data.

Consider recursion when your inputs are unpredictable, large, or highly complex.
Otherwise, iteration will almost always be the best approach. We'll look at lots
of examples to help you get a feel for this before someone asks you to identify
the best approach to a given problem in an interview

## Compare these approaches

Before we move on, let's compare an iterative & recursive approach with each
other. We'll create a `countdown` function that takes a number and counts down
from that number to zero.

Here's an iterative approach:

```js
countdown(startingNumber) {
    for(let i = startingNumber; i > 0; i--) {
        console.log(i);
    }

    console.log("Time's up!");
}
```

For comparison, a recursive approach:

```js
  countdown(startingNumber) {

      if (startingNumber === 0) {
          console.log("Time's up!");
          return;
      }

      console.log(startingNumber);
      countdown(startingNumber - 1);
  }
```

Can you identify the base case, recursive case, and recursive step?

## What we've learned

We're now equipped to solve problems of varying complexity with two different
approaches! Don't forget to be considerate of which approach might be best for
new challenges you encounter.

After completing this lesson, you should be able to:

- define "stack overflow" and debug functions causing one,
- differentiate between iterative and recursive functions,
- and identify good candidates for each type of approach.

[stack-trace-04]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/asynchronous-functions/assets/stack-trace/04.png
[stack-overflow]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/recursion/assets/image-recursion-stack-overflow.png
  
________________________________________________________________________________
# Recursion Problems

Here we `go(go(go()))`! It's time to flex your coding muscles on recursion. For
each problem, implement a **recursive** function that satisfies all the listed
requirements. Iterative solutions will be considered incorrect. The problems
aren't dependent on each other and may be completed in any order you wish.

As you complete each problem, use `mocha` to test your solutions. Make sure
you're in the project's root: you should be in the same place as the `problems/`
and `test/` directories. Once there, run the following command:

```sh
> mocha
```

Having trouble? Reach out to a TA for assistance! Once you've completed the
first 5 problems and all tests are passing, you can move onto the 6th bonus
problem.

We know you've got this!

________________________________________________________________________________
# Debugging A Stack Overflow

Uh oh! We've written a recursive function, but it's throwing an error! 
Investigate the included problem and see if you can figure out what's going on.

Once you think you've fixed the issue, use `mocha` to confirm. Make sure
you're in the project's root: you should be in the same place as the `problems/`
and `test/` directories. Once there, run the following command:

```sh
> mocha
```

If you get stuck, step back and try breaking the problem down. Are we missing 
any key steps for a recursive function?

When the tests pass and the error is gone, take a minute to celebrate - you're 
officially a recursion debugger!

________________________________________________________________________________
# WEEK-03 DAY-5<br>*JS Trivia* {ignore=true}
________________________________________________________________________________
# JS Trivia Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given a code snippet of a unassigned variable, predict its value.
2. Explain why functions are “First Class Objects” in JavaScript
3. Define what IIFEs are and explain their use case
4. (Whiteboarding) Implement a closure
5. Identify JavaScript’s falsey values
6. Interpolate a string using back-ticks
7. Identify that object keys are strings or symbols
8. A primitive type is data that is not an object and therefore cannot have
   methods(functions that belong to them).
9. Given a code snippet where variable and function hoisting occurs, identify
   the return value of a function learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given a code snippet of a unassigned variable, predict its value.
2. Explain why functions are “First Class Objects” in JavaScript
3. Define what IIFEs are and explain their use case
4. (Whiteboarding) Implement a closure
5. Identify JavaScript’s falsey values
6. Interpolate a string using back-ticks
7. Identify that object keys are strings or symbols
8. A primitive type is data that is not an object and therefore cannot have
   methods(functions that belong to them).
9. Given a code snippet where variable and function hoisting occurs, identify
   the return value of a function.
________________________________________________________________________________
# Stop Feeling Iffy about IIFEs!

It's time to learn about some built in JavaScript functionality that will allow
you to define an anonymous function and then immediately run that function as
soon as it has been defined. In JavaScript we call this an Immediately-Invoked
Function Expression or IIFE (pronounced as “iffy”).

When you finish this reading you should be able to identify an
Immediately-Invoked Function Expression, as well as write your own.

## Quick review of function expressions

Before we get started talking about IIFEs lets quickly do a review of the syntax
anonymous function expressions.

A function expression is when you define a function and assign that function to
a variable:

```js
// here we are assigning a named function declaration to a variable
const sayHi = function sayHello() {
  console.log("Hello, World!");
};

sayHi(); // prints "Hello, World!"
```

We can also use function expression syntax to assign variables to anonymous
functions effectively giving them names:

```js
// here we are assigning an anonymous function declaration to a variable
const sayHi = function() {
  console.log("Hello, World!");
};

sayHi(); // prints "Hello, World!"
```

Now what if we only ever wanted to invoke the above anonymous function once? We
didn't want to assign it a name? To do that we can define an Immediately-Invoked
Function Expression.

## IIFE syntax

An _Immediately-Invoked Function Expression_ is a function that is called
immediately after it had been defined. The typical syntax we use to write an
IIFE is to start by writing an anonymous function and then wrapping that
function with the grouping operator, `( )`. After the anonymous function is
wrapped in parenthesis you simply add another pair of closed parenthesis to
invoke your function.

Here is the syntax as described:

```js
// 1. wrap the anonymous function in the grouping operator
// 2. invoke the function!
(function() {
  statements;
})();
```

Let's take a look at an example. The below function will be invoked right after
it has been defined:

```javascript
(function() {
  console.log("run me immediately!");
})(); // => 'run me immediately!'
```

Our above function will be defined, invoked, and then will _never be invoked
again_. What we are doing with the above syntax is forcing JavaScript to run our
function as a **function expression** and then to invoke that function
expression immediately.

Since an Immediately-Invoked Function Expression is _immediately invoked_
attempting to assign an IIFE to a variable will return the value of the invoked
function.

Here is an example:

```js
let result = (function() {
  return "party!";
})();

console.log(result); // prints "party!"
```

So we can use IIFEs to run an anonymous function immediately and we can still
hold onto the result of that function by assigning the IIFE to a variable.

## IIFEs keep functions and variables private

Using IIFEs ensures our global namespace remains unpolluted by a ton of function
or variable names we don't intend to reuse. IIFEs can additionally protect
global variables to ensure they can't ever be read or overwritten by our
program. In short using an IIFE is a way of protecting not only the variables
within a function, but the function itself. Let's explore how IIFEs do this.

When learning about scope we talked about how an outer scope does not have
access to an inner scope's variables:

```js
function nameGen() {
  const bName = "Barry";
  console.log(bName);
}

// we can not reference the bName variable from this outer scope
console.log(bName);
console.log(nameGen()); // prints "Barry"
```

Now what if we didn't want our outer scope to be able to access our function at
all? Say we wanted our `nameGen` function to only be invoked once and not ever
be invoked again or even to be accessible by our application again? This is
where IIFEs come in to the rescue.

One of the main advantages gained by using an IIFE is the very fact that the
function cannot be invoked after the initial invocation. Meaning that no other
part of our program can ever access this function again.

Since we don't ever intend to invoke this function again - there is no point in
assigning a name to our function. Let's take a look at rewriting our nameGen
function using a sneaky IIFE:

```js
(function() {
  const bName = "Barry";
  console.log(bName);
})(); // prints "Barry"

// we still cannot reference the bName variable from this outer scope
// and now we have no hope of ever running the above function above again
console.log(bName);
```

## What you learned

How to identify an IIFE, as well as how to write one.

________________________________________________________________________________
# Interpolation in JavaScript

When working with the `String` primitive type in JavaScript, you've probably
noticed it is not always an easy experience adding in variables or working with
multi-line strings. In the ES6 edition of JavaScript one of the new features
that was introduced to help with this problem was the Template Literal. A
Template Literal is a new way to create a string literal that expands on the
syntax of the `String` primitive type allowing for interpolated expressions to
be inserted easily into strings.

When you finish this reading you should be able to interpolate a string using
template literals.

## Let's talk syntax

To create a template literal, instead of single quotes (`'`) or double quotes
(`"`) we use the grave character, also known as the backtick (`). Defining a new
string using a template literal is easy - we can simply use backticks to create
that new string:

```js
let apple = `apple`;
console.log(apple); // apple
```

The important thing to know is that a template literal is still a `String` -
just with some really nifty features! The real benefits of template literals
become more obvious when we start talking about interpolation.

### Interpolation using template literals

One of the main advantages we gain by using template literals is the ability to
_interpolate_ variables or expressions into strings. We do this by denoting the
values we'd like to interpolate by wrapping them within curly braces with a
dollar sign in front(`${}`). When your code is being run - the variables or
expressions wrapped within the `${}` will be evaluated and then will be replaced
with the value of that variable or expression.

Let's take a look at that syntax by looking at a simple example. Compare how
easy to read the following two functions are:

```js

function boringSayHello(name) => {
    console.log("Hello " + name + "!");
};

function templateSayHello(name) => {
    console.log(`Hello ${name}!`);
};

boringSayHello("Joe"); // prints "Hello Joe!"
templateSayHello("Joe"); // prints "Hello Joe!"
```

As we can see in the above example, the value of the variable is being
interpolated into the string that is being created using the template literal.
This makes our code easier to both write and read.

You'll most often be interpolating variables with template literals, however we
can also interpolate expressions. Here is an example of evaluating an expression
within a template literal:

```js
let string = `Let me tell you ${1 + 1} things!`;
console.log(string); // Let me tell you 2 things!
```

### Multi-line strings using template literals

We can also use template literals to create multi-line strings! Previously we'd
write multi-line strings by doing something like this:

```js
console.log("I am an example\n" + "of an extremely long string");
```

Using template literals this becomes even easier:

```js
console.log(`I am an example
of an extremely long string
on multiple lines`);
```

## What you learned

How to use template literals to interpolate values into a string.

________________________________________________________________________________
# Object Keys in JavaScript

As we previously covered, the Object type in JavaScript is a data structure that
stores key value pairs. An object's `values` can be anything: Booleans,
Functions, other Objects, etc. Up to this point we have been using strings as
our object `keys`. However, as of ES6 edition of JS we can use another data type
to create Object keys: `Symbols`.

In this reading we'll be talking about the `Symbol` primitive data type and how
an object's keys can be either a `String` _or_ a `Symbol`.

## A symbol of unique freedom

The main advantage of using the immutable `Symbol` primitive data type is that
each `Symbol` value is **unique**. Once a symbol has been created it **cannot**
be recreated.

Let's look at the syntax used to create a new symbol:

```js
// the description is an optional string used for debugging
Symbol([description]);
```

To create a new symbol you call the `Symbol()` function which will return a new
unique symbol:

```js
const sym1 = Symbol();

console.log(sym1); // Symbol()
```

Here is an example of how each created symbol is guaranteed to be **unique**:

```js
const sym1 = Symbol();
const sym2 = Symbol();

console.log(sym1 === sym2); // false
```

You can additionally pass in an optional `description` string that will allow
for easier debugging by giving you an identifier for the symbol you are working
with:

```js
const symApple = Symbol("apple");
console.log(symApple); // Symbol(apple)
```

Don't confuse the optional `description` string as way to access the Symbol you
defining though - the string value isn't included in the Symbol in anyway. We
can invoke the `Symbol()` function multiple times with the same description
string and each newly returned symbol will be unique:

```js
const symApple1 = Symbol("apple");
const symApple2 = Symbol("apple");

console.log(symApple1); // Symbol(apple)
console.log(symApple2); // Symbol(apple)
console.log(symApple1 === symApple2); // false
Symbol("foo") === Symbol("foo"); // returns false
```

Now that we've learned how to define symbols and that symbols are unique it's
time to talk about _why_ you would use a symbol. The main way the `Symbol`
primitive data type is used in JavaScript is to create unique object keys.

## Symbols vs. Strings as keys in Objects

Before the ES6 edition of JavaScript Object keys were exclusively strings. We
could you either dot or bracket notation to set or access an object's string
key's value.

Here is a brief refresher on that syntax:

```js
const dog = {};
dog["sound"] = "woof";
dog.age = 4;
// using bracket notation with a variable
const col = "color";
dog[col] = "grey";

console.log(dog); // { sound: 'woof', age: 4, color: 'grey' }
```

One of the problems with using strings as object keys is that in the Object type
each key is _unique_. Meaning that sometimes we could inadvertently overwrite a
key's value if we mistakenly try to reassign the same key name twice:

```js
const dog = {};
// I set an 'id' key value pair on my dog
dog["id"] = 39;

// Here imagine someone else comes into my code base and
// accidentally adds another key with the same name!
dog.id = 42;

console.log(dog); //  { id: 42 }
```

When a computer program attempts to use the same variable name twice for
different values we call this a _name collision_. While the above code snippet
is a contrived example, it is a good demonstration of a common issue. Further on
in this course you'll find yourself installing many code libraries (like the
`mocha` test library) for each project you work on. The more libraries that are
imported into a single application the greater the chance of a name collision.

I bet you are sensing a _unique_ theme by now. Using `Symbols` as your object
keys is a great way to prevent name collision on objects because Symbols are
_unique_!

Let take a took at how we could fix the above code snippet using symbols:

```js
const dog = {};
const dogId = Symbol("id");
dog[dogId] = 39;

const secondDogId = Symbol("id");
dog[secondDogId] = 42;

console.log(dog[dogId]); //  39
console.log(dog); //  { [Symbol(id)]: 39, [Symbol(id)]: 42 }
```

Note above that we can access our key value pair using bracket notation and
passing in the variable we assigned our symbol to (in this case `dogId`).

### Iterating through objects with symbol keys

One of the other ways that `Symbols` differ from `String` keys in an object is
the way we iterate through an object. Since `Symbols` are relatively new to
JavaScript older Object iteration methods don't know about them.

This includes using `for...each` and `Object.keys()`:

```js
const name = Symbol("name");
const dog = {
  age: 29
};
dog[name] = "Fido";

console.log(dog); // { age: 29, [Symbol(name)]: 'Fido' }

console.log(Object.keys(dog)); // prints ["age"]

for (let key in dog) {
  console.log(key);
} // prints age
```

This provides an additional bonus to using symbols as object keys because your
symbol keys that much more hidden (and safe) if they aren't accessible via the
normal object iteration methods.

If we do want to access all the symbols in an object we can use the built in
`Object.getOwnPropertySymbols()`. Let's take a look at that:

```js
const name = Symbol("name");
const dog = {
  age: 29,
  // when defining an object we can use square brackets within an object to
  // interpolate a variable key
  [name]: "Fido"
};

Object.getOwnPropertySymbols(dog); // prints [Symbol(name)];
```

Using symbols as object keys has some advantages in your local code but they
become really beneficial when dealing with importing larger libraries of code
into your own projects. The more code imported into one place means the more
variables floating around which leads to a greater chance of a name collisions -
which can lead to some really devious debugging.

## What you learned

There are two primitive data types that can be used to create keys on an Object
in JavaScript: `Strings` and `Symbols`. The main advantage to using a `Symbol`
as an object's key is that Symbols are guaranteed to be **unique**.

________________________________________________________________________________
## Primitive Data Types in Depth

It's time to dive deeper into the world of JavaScript data types! Previously, we
learned about the difference between the Primitive and Reference data types. The
main difference we covered between the two data types is that primitive types
are immutable, meaning they cannot change. It's now time to dive a little deeper
into this subject and talk about how primitive data types are not just immutable
in terms of reassignment - and also because we are not able to define new
methods on primitive data types in JavaScript.

At the end of this reading you you be able to identify why primitive types do
not have methods.

## Data types in JavaScript

With the JavaScript ECMAScript 2015 release, there are now eight different data
types in JavaScript. There are seven primitive types and one reference type.

Below we have listed JS data types along with a brief description of each type.

**Primitive Types**:

1. `Boolean` - `true` and `false`
2. `Null` - represents the intentional absence of value.
3. `Undefined` - default return value for many things in JavaScript.
4. `Number` - like the numbers we usually use (`15`, `4`, `42`)
5. `String` - ordered collection of characters ('apple')
6. `Symbol` - new to ES5 a symbol is a _unique_ primitive value
7. `BigInt` - a data type that can represent larger integers than the `Number`
   type can safely handle.

**One Reference Type**:

1.  `Object` - a collection of properties and methods

As we have previously discussed one of the main differences between primitive
and reference data types in JavaScript is that primitive data types are
**immutable**, meaning that they cannot be changed. The other main thing that
sets primitives apart is that primitive data types are not Objects and therefore
_do not have methods_.

## Methods and the object type

When we first learned about the Object data type we learned about the definition
of a _method_. As a reminder, the definition of a method is a function that
belongs to an object.

Here is a simple example:

```js
const corgi = {
  name: "Ein",
  func: function() {
    console.log("This is a method!");
  }
};

corgi.func(); // prints "This is a method!"
```

The Object type is the only data type in JavaScript that has methods. **Meaning
that primitive data types cannot have methods.** That's right - we cannot
declare new methods or use any methods on JavaScript primitive data types
because they are Objects.

For example when finding the square root of a number in JavaScript we would do
the following:

```js
// This works because we are calling the Math object's method sqrt
let num = Math.sqrt(25); // 5

// This will NOT work because the Number primitive has NO METHODS
let num = 25.sqrt; // SyntaxError: Invalid or unexpected token
```

The `Number` primitive data type above (`25`) does not have a `sqrt` method
because only Objects in JavaScript can have methods. To sum up the previous
sections: Primitive data types are **not** Objects therefore they do not have
methods.

## Primitives with object wrappers

Right now you might be thinking - wait a second what about the string type?
After all, we can call `String#toUpperCase` on an instance of a string? Well
that is because of how the string type is implemented in JavaScript.

The underlying primitive data type of `String` does not have methods. However,
to make the String data type easier to work with in JavaScript it is implemented
using a `String` object that _wraps_ around the `String` primitive data type.
This means that the `String` object will be responsible for constructing new
`String` primitive data types as well as allowing us to call methods upon it
because it is an Object.

We'll be diving a lot more into this concept when we get to JavaScript Classes
but for brevity's sake we are going to do a walkthough of the code snippet below
to clarify the difference between the `String` primitive type, and the `String`
object that wraps around it:

```js
let str1 = "apple";

str1.toUpperCase(); // returns APPLE

let str2 = str1.toUpperCase();

console.log(str1); //prints apple
console.log(str2); //prints APPLE
```

So in the above example when we call `str1.toUpperCase()` we are calling that on
the `String` object that wraps around the `String` primitive type.

This is why in the above example when we `console.log` both `str1` and `str2` we
can see they are different. The value of `str1` has not changed because it
can't - the `String` primitive type is _immutable_. The `str2` variable calls
the `String#toUpperCase` method on the `String` object which wraps around the
`String` primitive. This method cannot mutate the `String` primitive type
itself - it can only point to a new place in memory where the `String` primitive
for `APPLE` lives. This is why even though we call `str1.toUpperCase()` multiple
times the value of that variable will never change until we reassign it.

Don't worry if this is confusing at first, as we dive more into JavaScript
you'll learn more about how JavaScript implements different types of Objects to
try and make writing code as clear as possible.

## What you learned

The important takeaway here is that primitive data types in JavaScript are not
objects and therefore cannot have methods.

________________________________________________________________________________
# Unassigned Variables in JavaScript

Up this point we've covered a lot of of information about the different ways to
declare a variable in JavaScript. This reading is going to center in on a topic
we've touched on but haven't gone over in great detail: what is the value of a
declared variable with no assigned value?

By the end of this reading you should be able to look at a code snippet and
predict the value of any declared variable that is not assigned a value.

## The default value of variables

Whenever you declare a `let` or `var` variable in JavaScript that variable will
have a _name_ and a _value_. That is true of `let` or `var` variables with no
assigned value either! When declaring a variable using `let` or `var` we can
optionally assign a value to that variable.

Let's take a look at an example of declaring a variable with `var`:

```js
var hello;
console.log(hello); // prints undefined
```

So when we declare a variable using `var` the default value assigned to that
variable will be `undefined` if no value is assigned.

The same is true of declaring a variable using `let`. When declaring a variable
using `let` we can also choose to optionally assign a value:

```js
let goodbye;
console.log(goodbye); // prints undefined
```

However, this is a case where `let` and `const` variables differ. When declaring
a variable with `const` we must provide a value for that variable to be assigned
to.

```js
const goodbye;
console.log(goodbye); // SyntaxError: Missing initializer in const declaration
```

This behavior makes sense because a `const` variable cannot be reassigned -
meaning that is we don't assign a value when a `const` variable is declared we'd
never be able to assign a new value!

So the default assigned value of a variable declared using `var` or `let` is
`undefined`, whereas variables declared using `const` need to be assigned a
value.

## The difference between default values and hoisting

When talking about default values for variables we should also make sure to
underline the distinction between _hoisting_ variable names and default values.

Let's look at an example:

```js
function hoistBuddy() {
  var hello;
  console.log(hello); // prints undefined
}

hoistBuddy();
```

Whenever a variable is declared with `var` that variable's name is hoisted to
the top of its declared scope with a value of `undefined` until a value is
assigned to that variable name. If we never assign a value to the declared
variable name then the default value of a `var` declared variable is
`undefined`.

Now let's take a look at the example above but this time using `let`:

```js
function hoistBuddy() {
  let hello;
  console.log(hello); // prints undefined
}

hoistBuddy();
```

The default value of a `let` declared variable is `undefined`. However, don't
confuse this with how a `let` defined variable is hoisted. When a `let` variable
is declared the name of that variable is hoisted to the top of its declared
scope and if a line of code attempts to interact with that variable before it
has been assigned a value an error is thrown.

The following example shows the difference in **hoisting** between `var` and
`let` declared variables:

```js
function hoistBuddy() {
  console.log(hello); // prints undefined
  var hello;

  console.log(goodbye); // ReferenceError: Cannot access 'goodbye' before initialization
  let goodbye;
}

hoistBuddy();
```

## What you learned

The default value of a variable assigned with either `let` or `var` is
`undefined`. Variables declared using `const` need to have an assigned value
upon declaration to be valid.

________________________________________________________________________________
# WhiteBoarding Problem

## The Question

Write a function named `dynamicDivider(divisor)`. When invoked the
`dynamicDivider` function will intake a number to be used as a divisor and will
then return a new function. The function returned by `dynamicDivider` will
accept a number - and that number will then be divided by the `divisor` that was
defined when the `dynamicDivider` was first invoked.

Examples:

```js
let halvedbyTwo = dynamicDivider(2); //returns a function
halvedbyTwo(12); // returns 6
halvedbyTwo(18); // returns 9

let halvedbyThree = dynamicDivider(3); // returns a function
halvedbyThree(12); // returns 4
halvedbyThree(18); // returns 6
```

## The Answer

```js
function dynamicDivider(divisor) {
  // here we are returning an inner function that will create a closure by
  // closing over and accessing the above divisor argument to use within the
  // function returned below

  return function(num) {
    return num / divisor;
  };
}
```
