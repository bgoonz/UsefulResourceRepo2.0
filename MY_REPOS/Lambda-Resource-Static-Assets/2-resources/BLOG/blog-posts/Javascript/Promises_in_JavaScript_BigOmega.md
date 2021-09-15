# Promises in JavaScript | BigOmega

> A personal blog website

Promises in JavaScript behave similarly to promises we make normally to people. It's something like **you'll get great score if submit your assignments on time.** In this example, if the student submits his assignments on time, the promise made to him gets fulfilled else, it will not. In JavaScript, promises let us handle tasks that might happen in the future. This concept is really important while doing tasks like making **network requests**, as we're not certain if the request gets resolved or not.

Promises were released in ES2015 to minimize the callbacky code we used to write.

The Syntax
----------

To use a promise, we have to create a promise object that takes in a callback function with 2 arguments: **resolve** and **reject**.

    let myPromise = new Promise((resolve, reject) => {})

### Resolve

If the **promise is fulfilled**, **resolve gets called**.

    let myPromise = new Promise((resolve, reject) => {
    	let condition = true
    
    	if (condition) resolve('Promise is resolved.')
    })

Here, if the value of the condition is true, we resolve the promise. The promise returns the thing inside the resolve function if it gets resolved.

### Reject

If the **promise is not fulfilled**, **reject gets called**.

    let myPromise = new Promise((resolve, reject) => {
    	let condition = true
    
    	if (condition) resolve('Promise is resolved.')
    	else reject('Promise is rejected.')
    })

We have successfully created a promise object that resolves if the condition is true and rejects if the condition is false. You can modify the use case as you want but this is the basic concept with which you can create promises.

The next step is to use the promise.

Using the promise object
------------------------

Before promises, we had a concept of callbacks. With callbacks, we'd create a function to do something and after the function completes its execution, we'd call a function that does something to complement the task done by the first function. This step would be repeated again and again until we reach a callback hell. Promises solve this problem.

We can use a series of `.then`s to use a promise, **if it's resolved**.

Let's see how we'd use the `myPromise` promise object we defined above.

    myPromise.then(data => console.log(data))

This would output the following on the console

If the promise is rejected, we have to use a catch to handle promise. To make the promise reject, we can change the value of the condition variable to equal `false`. In such a case, our promise gets rejected.

    myPromise
    	.then(data => {
    		
    		
    		console.log(data)
    	})
    	.catch(err => {
    		
    		
    		console.log(err)
    	})

After running the following program, we'll get the following output on the shell.

If you've noticed, the `data` and `err` we've passed on then and catch equals to the data we've passed to the `resolve` and `reject` functions in the promise object we created above.

Implementation of existing fetch API on our own
-----------------------------------------------

The fetch API in JavaScript is a recent addition to JavaScript that allows us to make AJAX requests. Here's how it looks on code

    fetch('https://jsonplaceholder.typicode.com/todos/1')
    	.then(response => response.json())
    	.then(json => console.log(json))

Here, the `fetch` requests for data on the URL. The data we receive might not be in a JSON format, therefore we change it to be a JSON on the first _then_ call. The JSON response after we convert the string is passed as `json` variable on the second _then_, which is printed on the console after that.

If we run the code above, we get the following output on the console.

    {
      completed: false,
      id: 1,
      title: "delectus aut autem",
      userId: 1
    }

Let's try to create a simulation of the fetch API. For simplicity, we'll not handle the network request part. We will just see how the promise is used in the fetch API.

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

To use this function that returns a promise, we can do the following

    fetch()
    	.then(data => JSON.parse(data))
    	.then(res => console.log(res))
    	.catch(err => JSON.parse(err))
    	.then(errorMsg => console.log(errorMsg))

Here, we have a default argument `requestPassed` which is a boolean. If it is set to `true` or even `false`, we return a JSON string. We have to parse the string to JavaScript objects so that we can use that properly on our application. Therefore, on the first `.then` call, we parse the string to represent it in an object format.

Thank you for reading. The next blog will be about `async-await` which makes using promises even more fun.


[Source](https://www.bigomega.dev/promises)