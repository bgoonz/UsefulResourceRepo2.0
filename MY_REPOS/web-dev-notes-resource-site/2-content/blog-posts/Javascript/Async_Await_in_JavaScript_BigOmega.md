# Async Await in JavaScript | BigOmega

> A personal blog website

This blog is a follow up from my last blog in which I talked about promises. If you are unfamiliar with promises in JavaScript, please read [that article](https://bigomega.dev/promises) before reading this one. Also, some familiarity with exception handling would be useful.

Async Await is a syntactic sugar added in ECMAScript 2017 standard that helps us working with promises easier. As I mentioned on the last blog, promises were introduced to work with asynchronous code and avoid callback hell. Though promises aimed to do so, the code still looks kind of callbacky. Async and await help us to write asynchronous code but it looks like synchronous code.

On the last blog, we created an imitation of the fetch API. It was a function that returned a promise. It looked like this

    function fetch(requestPassed = true) {
    	return new Promise((resolve, reject) => {
    		if (requestPassed) {
    			resolve('{"success": true,
    			"data": {"movies": ["batman", "iron man"]}}')
    		} else {
    			reject('{"success": false,
    			"message": "Database connection failed"}')
    		}
    	})
    }

To consume the promise, we did the following

    fetch()
    	.then(data => JSON.parse(data))
    	.then(res => console.log(res))
    	.catch(err => JSON.parse(err))
    	.then(errorMsg => console.log(errorMsg))

This is the part where we can use async-await to make our code look better. To consume the promise, we have to use an async function which we can describe as follows:

    async function fetchData() {}

Inside an `async` function, we can use the `await` keyword to wait for the promise to resolve.

    async function fetchData() {
    	
    	const data = await fetch()
    	
    	
    	
    	const res = JSON.parse(data)
    	console.log(res)
    }
    
    fetchData()

The above code will print the following onto the console

    { success: true, data: { movies: [ 'batman', 'iron man' ] } } 

If we revisit the promise, we know that the promise might get resolved or might get rejected. Rejection of a promise might be because of some error (it all depends on the use case too but that's the only thing I can think of right now). Hence, the use of **exception handling** with **try-catch** can be really handy while using `async-await`.

    async function fetchData() {
    	try {
    		const data = await fetch(false)
    		const res = JSON.parse(data)
    		console.log(res)
    	} catch (error) {
    		const errorObject = JSON.parse(error)
    		console.log(errorObject)
    	}
    }
    
    fetchData()

I have intentionally passed false value as an argument to the fetch function to make the promise reject. Anything passed to the reject function will be received by the catch block as an exception. We can reference the rejected error on the `error` argument we have passed to the catch block. The above code logs the following onto the console.

    { success: false, message: 'Database connection failed' } 

This is how async and await can be used with promises to make our code more readable. If you revisit and make a comparison with the code we wrote earlier, you'll find a vast difference. Async-await is one of my favorite features on JavaScript and I use it all the time. It has made my life as a JavaScript developer easier.

Thanks for reading. If you like my content, consider subscribing.


[Source](https://www.bigomega.dev/async-await)