# Using Async Function



To me, async functions are the most exciting thing to happen to JavaScript since Ajax, because—finally—you can read JavaScript code in a synchronous manner while it executes asynchronously as it always has.

**Async Functions Overview**

Async functions are a relatively new feature of JavaScript (and not specific to Node.js). Support for the feature first landed in Node.js v7.6 via an update to the V8 JavaScript engine. Because async functions rely heavily on promises, 

I like to think of async functions as two parts: async and await. Let's look at each part in turn.

**async.** For the longest time, JavaScript developers could create functions using function statements (which must be named) or function expressions (which are often anonymous).


---


<table>
<tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p></td><td><div><p><code>function</code> <code>getNumber() { // </code><code>Function</code> <code>statement</code></p><p><code>&nbsp;&nbsp;</code><code>return</code> <code>42;</code></p><p><code>}</code></p><p><code>let logNumber = </code><code>function</code><code>() { // </code><code>Function</code> <code>expression</code></p><p><code>&nbsp;&nbsp;</code><code>console.log(getNumber());</code></p><p><code>}</code></p><p><code>logNumber(); // 42</code></p></div></td></tr></tbody></table> 

If you run this script in Node.js, you should see 42 printed to the console.

JavaScript now has asynchronous counterparts to these constructs. Placing the new async keyword before the function statement or expression returns an AsyncFunction (async function) object.


---


<table>
<tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p></td><td><div><p><code>async </code><code>function</code> <code>getNumber() { // Async </code><code>function</code> <code>statement</code></p><p><code>&nbsp;&nbsp;</code><code>return</code> <code>42;</code></p><p><code>}</code></p><p><code>let logNumber = async </code><code>function</code><code>() { // Async </code><code>function</code> <code>expression</code></p><p><code>&nbsp;&nbsp;</code><code>console.log(getNumber());</code></p><p><code>}</code></p><p><code>logNumber(); // Promise { 42 }</code></p></div></td></tr></tbody></table> 

If you run _this_ script in Node.js, you should see Promise { 42 } printed to the console. As you can see, when async functions are invoked, they return promises rather than the actual values.

For the async version of the script to be the functional equivalent of the first example, I'd have to rewrite it as follows.


---


<table>
<tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p></td><td><div><p><code>async </code><code>function</code> <code>getNumber() { // Async </code><code>function</code> <code>statement</code></p><p><code>&nbsp;&nbsp;</code><code>return</code> <code>42;</code></p><p><code>}</code></p><p><code>let logNumber = async </code><code>function</code><code>() { // Async </code><code>function</code> <code>expression</code></p><p><code>&nbsp;&nbsp;</code><code>getNumber() // </code><code>returns</code> <code>a promise</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>.</code><code>then</code><code>(</code><code>function</code><code>(value) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(value);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>});</code></p><p><code>}</code></p><p><code>logNumber(); // 42</code></p></div></td></tr></tbody></table> 

With this script, I'm back to logging 42 (rather than Promise { 42 }).

Just as you saw with promise chaining, if the async function is completed without error, the promise it returns is resolved. If the function returns a value, that becomes the promise's value. If an error is thrown and goes unhandled, the promise is rejected and the error becomes the promise's value.

Though interesting, returning promises isn't what makes async functions special. You could, after all, return promises from regular functions. What makes async functions special is await.

**await.** The await operator, which is available only inside an async function, is as close to magic as you'll get in JavaScript. It's like hitting the pause button on your code so that it can wait for a promise to be resolved or rejected before continuing. This is a concept known as a _coroutine_. Coroutines have been available in JavaScript since generator functions were introduced, but async functions make them much more approachable.

Using await will not block the main thread. Instead, the currently running call stack, up to the point of await, will be completed so that other functions in the callback queue can be executed. When the promise is resolved or rejected, the remaining portion of the code is queued for execution. If the promise was resolved, its value is returned. If the promise was rejected, the rejected value is thrown on the main thread.

Here's a demonstration of await that uses setTimeout to simulate an async API. I've added some additional console output to help illustrate what's happening.


---


<table>
<tbody> 





<tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p></td><td><div><p><code>function</code> <code>getRandomNumber() {</code></p><p><code>&nbsp;&nbsp;</code><code>return</code> <code>new Promise(</code><code>function</code><code>(resolve, reject) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>setTimeout(</code><code>function</code><code>() {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>const randomValue = Math.random();</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>const error = randomValue &gt; .8 ? </code><code>true</code> <code>: </code><code>false</code><code>;</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>if (error) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>reject(new Error(</code><code>'Ooops, something broke!'</code><code>));</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>} </code><code>else</code> <code>{</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>resolve(randomValue);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}, 2000);</code></p><p><code>&nbsp;&nbsp;</code><code>});</code></p><p><code>}</code></p><p><code>async </code><code>function</code> <code>logNumber() {</code></p><p><code>&nbsp;&nbsp;</code><code>let number;</code></p><p><code>&nbsp;&nbsp;</code><code>console.log(</code><code>'before await'</code><code>, number);</code></p><p><code>&nbsp;&nbsp;</code><code>number = await getRandomNumber();</code></p><p><code>&nbsp;&nbsp;</code><code>console.log(</code><code>'after await'</code><code>, number);</code></p><p><code>}</code></p><p><code>console.log(</code><code>'before async call'</code><code>);</code></p><p><code>logNumber();</code></p><p><code>console.log(</code><code>'after async call'</code><code>);</code></p></div></td></tr></tbody></table> 

When I run this script in Node.js without an error occurring, the output will appear as follows. (I've added a comment where the two-second delay happens.)


---


<table>
<tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p></td><td><div><p><code>before async call</code></p><p><code>before await undefined</code></p><p><code>after</code> <code>async call</code></p><p><code># 2 </code><code>second</code> <code>delay</code></p><p><code>after</code> <code>await 0.22454453163016597</code></p></div></td></tr></tbody></table> 

Note that "after async call" was logged before "after await 0.22454453163016597." Only the remaining code in the async function is paused; the remaining synchronous code in the call stack will finish executing.

If an error is thrown, you'll see UnhandledPromiseRejectionWarning You could handle the rejection with the methods mentioned in that article or by using try/catch.

**Try/catch**

A try/catch blocks doesn't work with asynchronous operations—you can't catch errors that occur outside of the current call stack. But now with async functions, you _can_ use try/catch for asynchronous operations.

Here's a slightly modified version of the previous script that catches errors that occur in the async API and uses a default value instead.


---


<table>
<tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p></td><td><div><p><code>function</code> <code>getRandomNumber() {</code></p><p><code>&nbsp;&nbsp;</code><code>return</code> <code>new Promise(</code><code>function</code><code>(resolve, reject) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>setTimeout(</code><code>function</code><code>() {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>const randomValue = Math.random();</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>const error = randomValue &gt; .8 ? </code><code>true</code> <code>: </code><code>false</code><code>;</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>if (error) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>reject(new Error(</code><code>'Ooops, something broke!'</code><code>));</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>} </code><code>else</code> <code>{</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>resolve(randomValue);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}, 2000);</code></p><p><code>&nbsp;&nbsp;</code><code>});</code></p><p><code>}</code></p><p><code>async </code><code>function</code> <code>logNumber() {</code></p><p><code>&nbsp;&nbsp;</code><code>let number;</code></p><p><code>&nbsp;&nbsp;</code><code>try {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>number = await getRandomNumber();</code></p><p><code>&nbsp;&nbsp;</code><code>} catch (err) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>number = 42;</code></p><p><code>&nbsp;&nbsp;</code><code>}</code></p><p><code>&nbsp;&nbsp;</code><code>console.log(number);</code></p><p><code>}</code></p><p><code>logNumber();</code></p></div></td></tr></tbody></table> 

If you run that script enough times, you'll eventually get 42 in the output. So, try/catch blocks finally work with async operations. Woohoo!

**Async Loops**

In addition to being able to use try/catch blocks again, you can use asynchronous loops, too. In the following example, I use a simple for loop that prints three values serially.


---


<table>
<tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p></td><td><div><p><code>function</code> <code>getRandomNumber() {</code></p><p><code>&nbsp;&nbsp;</code><code>return</code> <code>new Promise(</code><code>function</code><code>(resolve, reject) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>setTimeout(</code><code>function</code><code>() {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>const randomValue = Math.random();</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>const error = randomValue &gt; .8 ? </code><code>true</code> <code>: </code><code>false</code><code>;</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>if (error) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>reject(new Error(</code><code>'Ooops, something broke!'</code><code>));</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>} </code><code>else</code> <code>{</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>resolve(randomValue);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}, 2000);</code></p><p><code>&nbsp;&nbsp;</code><code>});</code></p><p><code>}</code></p><p><code>async </code><code>function</code> <code>logNumbers() {</code></p><p><code>&nbsp;&nbsp;</code><code>for</code> <code>(let x = 0; x &lt; 3; x += 1) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(await getRandomNumber());</code></p><p><code>&nbsp;&nbsp;</code><code>}</code></p><p><code>}</code></p><p><code>logNumbers();</code></p></div></td></tr></tbody></table> 

Running this script in Node.js, you should see three numbers printed to the console every two seconds. There are no third-party libraries and no complicated promise chains, just a simple loop. Loops work again!

**Parallel Execution**

Clearly, async functions make it easy to do sequential flows and use standard JavaScript constructs with asynchronous operations. But what about parallel flows? This is where Promise.all and Promise.race come in handy. Because they both return promises, await can work with them as with any other promise-based API.

Here's an example that uses Promise.all to get three random numbers in parallel.


---


<table>
<tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p>31</p></td><td><div><p><code>function</code> <code>getRandomNumber() {</code></p><p><code>&nbsp;&nbsp;</code><code>return</code> <code>new Promise(</code><code>function</code><code>(resolve, reject) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>setTimeout(</code><code>function</code><code>() {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>const randomValue = Math.random();</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>const error = randomValue &gt; .8 ? </code><code>true</code> <code>: </code><code>false</code><code>;</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>if (error) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>reject(new Error(</code><code>'Ooops, something broke!'</code><code>));</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>} </code><code>else</code> <code>{</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>resolve(randomValue);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}, 2000);</code></p><p><code>&nbsp;&nbsp;</code><code>});</code></p><p><code>}</code></p><p><code>async </code><code>function</code> <code>logNumbers() {</code></p><p><code>&nbsp;&nbsp;</code><code>let promises = [];</code></p><p><code>&nbsp;&nbsp;</code><code>promises[0] = getRandomNumber();</code></p><p><code>&nbsp;&nbsp;</code><code>promises[1] = getRandomNumber();</code></p><p><code>&nbsp;&nbsp;</code><code>promises[2] = getRandomNumber();</code></p><p><code>&nbsp;&nbsp;</code><code>try {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>values</code> <code>= await Promise.</code><code>all</code><code>(promises);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(</code><code>values</code><code>);</code></p><p><code>&nbsp;&nbsp;</code><code>} catch (err) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(err);</code></p><p><code>&nbsp;&nbsp;</code><code>}</code></p><p><code>}</code></p><p><code>logNumbers();</code></p></div></td></tr></tbody></table> 

Because Promise.all rejects its promise if any promise passed in is rejected, you might need to run the script a few times to see the three random numbers printed out.

**Executing a Query with Async Functions**

I'll end this article with one last example of executing a query using the Node.js driver for Oracle Database—only this time using an async function. For brevity, I'm using the async version of an immediately invoked function expression (IIFE).


---


<table>
<tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p>31</p><p>32</p><p>33</p><p>34</p><p>35</p><p>36</p><p>37</p><p>38</p><p>39</p><p>40</p></td><td><div><p><code>const oracledb = require(</code><code>'oracledb'</code><code>);</code></p><p><code>const dbConfig = {</code></p><p><code>&nbsp;&nbsp;</code><code>user</code><code>: </code><code>'hr'</code><code>,</code></p><p><code>&nbsp;&nbsp;</code><code>password</code><code>: </code><code>'oracle'</code><code>,</code></p><p><code>&nbsp;&nbsp;</code><code>connectString: </code><code>'localhost:1521/orcl'</code></p><p><code>};</code></p><p><code>(async </code><code>function</code><code>() {</code></p><p><code>&nbsp;&nbsp;</code><code>let conn; // Declared here </code><code>for</code> <code>scoping purposes</code></p><p><code>&nbsp;&nbsp;</code><code>try {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>conn = await oracledb.getConnection(dbConfig);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(</code><code>'Connected to database'</code><code>);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>let result = await conn.</code><code>execute</code><code>(</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>'select *</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>from employees'</code><code>,</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>[], // </code><code>no</code> <code>binds</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>{</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>outFormat: oracledb.OBJECT</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(</code><code>'Query executed'</code><code>);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(result.</code><code>rows</code><code>);</code></p><p><code>&nbsp;&nbsp;</code><code>} catch (err) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(</code><code>'Error in processing'</code><code>, err);</code></p><p><code>&nbsp;&nbsp;</code><code>} finally {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>if (conn) { // conn assignment worked, need </code><code>to</code> <code>close</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>try {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>await conn.</code><code>close</code><code>();</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(</code><code>'Connection closed'</code><code>);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>} catch (err) {</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>console.log(</code><code>'Error closing connection'</code><code>, err);</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}</code></p><p><code>&nbsp;&nbsp;&nbsp;&nbsp;</code><code>}</code></p><p><code>&nbsp;&nbsp;</code><code>}</code></p><p><code>})();</code></p></div></td></tr></tbody></table> 

Because the driver's asynchronous APIs already support promises, you can use the async operator without any additional work. To me, this version of the query example is the simplest, and it doesn't hurt that it uses the fewest lines of code as well.

