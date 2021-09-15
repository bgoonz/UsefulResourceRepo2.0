# Express Middlewares, Demystified

> Understanding the inner workings of Express.js middlewares

[![Viral Shah](https://miro.medium.com/fit/c/56/56/0*jv23E5peC4zwBcMX.)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@viral_shah?source=post_page-----f0c2c37ea6a1--------------------------------)

![Image for post](https://miro.medium.com/max/1284/1*kMNzu4zx40QvwQUWa9dCOw.png)

Express application: **Middleware Layer Stack**

In the last few years, [Express](https://expressjs.com/) has been under the microscope for its position as the best _web framework_ in JavaScript. There are many worthy competitors that have come up; namely — _Koa, Hapi, Fastify, Restify._ While all these frameworks may have some benefits over _Express_, they are still far behind in the popularity race.

![Image for post](https://miro.medium.com/max/1728/1*ISKOnVnfNTFExsFMch0FrA.png)

Web frameworks download trends (courtesy [NPM trends](https://www.npmtrends.com/express-vs-fastify-vs-restify-vs-koa-vs-hapi))

_I’ve used Express in many of my Node.js applications. Express is the oldest web framework around the block. And a simple “Hello World” Express application indeed looks very clean and easy_

Hello World Express App
-----------------------

Hello World Express App

_However, the moment you start making a real production app, things get messy. You have to add a bunch of best-practice middlewares, some routers, the actual API routes, error handlers, etc. And let’s assume, you did your usual code cleaning, refactoring and all good stuff, your app will still look something like this_

Real World Express App
----------------------

Real world Express Production app

_If you place close attention to the code above, you will realize that the_ `.use()` _method in the express app is heavily overloaded._

**What’s up with the “.use( )” method ?**
-----------------------------------------

_Let us focus on all the variations for_ `.use()` _method,_

*   It is used for registering **_Routers_**, **_Middlewares_**_,_ **_Routes_** & **_Error handlers_.**
*   It can be used **_with or without a path_** as first param
*   Both an **_App_** and a **_Router_** have a `.use()` method

_Great!  
It means, we just have to use this_ `use()` _method everywhere and everything will just magically work, Right?  
Well, in most cases yes; but not necessary.  
If you really jumble the order of all these methods & test your app again,_

> Best case_: Your code will not work_  
> Worst case: _Your code will work in unexpected ways! 😮_

_I speak from experience!_ 😓_  
One fine day, I got frustrated with all the magic and decided to look behind the curtains; dive deeper into the source of Express.js. After hours of reading & debugging the source, I finally understood it. This post is to share some of those learnings._

_Yes, every Express app at it’s core is a Router. When we create an app using_ `express()` _, we are essentially creating a root level Router. The reverse is true as well. Every Router is like a mini-app in itself. In fact, that is why, the_ `.use()` _method of both Router and App looks so similar._

_So then it begs the question,_ **_What is really there in this Router?_**

Well a Router mainly consists of a two things,

1.  **handle()** functionIt is the function that processes all the requests received by the Router
2.  **Layer-stack**  
    It is a stack of Layers registered on the Router. I will soon get into the details of a Layer, but for now just understand that every Layer has a `path` and its own `handle` function. Every time we call the `.use()` method on an Express app or Router, we are basically creating a new **Layer** in the Router’s **stack**.

A **Layer** can be one of the following things,

1.  **Middleware**A function with signature `func(req, res, next)` . A **Middleware** usually runs some piece of code, optionally modifies the request or response and at the end, either **sends** the response or calls the **next** Layer.
2.  **Route**They consist of the actual Request handlers for processing one or more HTTP method Types (_GET, PUT, POST…_). A **Route** method’s handler also has the same signature as middleware, `func(req, res, next)` . Typically, it will contain the business logic to process the request and send a response. In case of an unexpected error, it can **throw the error** or call the **next()** function by passing the error as its first param.
3.  **Error handler**They are the functions responsible for handling the **errors thrown** by any previous Layer or sent by previous Layer using **next()** method. They have a signature of `func(error, req, res, next)` . While defining them, it is absolutely **necessary to have all four params** in the signature. This is the only way, app can differentiate between errorHandlers and other middlewares
4.  Another **Router**As I mentioned before, a Router is like a mini-app. Only difference is that a Router will usually be registered on the main Express app using a `path`. It is both **contained in a Layer** and **has its own stack of Layers** This kind of nested structure of Routers allows us to create modular mini apps within an Express app. They are created by invoking Router() method on express object.

_Okay. So now that we understand the basic structure of our App let us understand how a request is actually handled._

*   **Iterating the Layer stack  
    **When the **_handle_** method of the Router receives a new request, it starts processing the request by looping through the **_Layer-stack_**_._ The Router will loop through the Layers and call the `handle` function on every Layer with a **matching** `path`
*   **Path Matching  
    **Path matching refers to matching, the **_path_** provided for the Layer in `.use(path, handler)` to the Request url. When we do not provide a `path` in the `.use()` method, the Layer defaults to the root path for Router. Which means, the Layer will match all the requests passing through the router.
*   **Nested Layers  
    **To understand nested Layers, let us see code on creating new Routers

Express Router

*   Here, we are defining a new _adminRouter_, and registering it on path `/admin` . This creates a new _Layer_ on app’s root Router, with path `/admin` . After that, any _middlewares_ or _routes_ registered on the _adminRouter,_ will create a new Layer inside Layer-stack of the _adminRouter._
*   **_Error Handling  
    _**The _errorHandlers_ are responsible for all the error handling logic in an Express app. They are part of the same stack as the middlewares, routers & routes. However, as I said before, they do have a different signature with error as an additional first param `func(error, req, res, next)`.
*   **_handle\_request_ vs _handle\_error  
    _**When we define the **_handle_** function of any Layer, it is actually called by another wrapper function; either **_handle\_request_** or **_handle\_error_**. While iterating through a Layer-stack, the Router keeps track of a variable called **_LayerError_**_,_ which is initialized as _null_. The request is considered to be in a non-error-ed state. While iterating through the stack if the any Layer throws an Error or passes any some object via next function like `next(someObject)` the **_LayerError_** will store that error/object and Request is not considered to be in errored state\*

_\* small exception is when someObject is a String with value “route” or “router”  
That is a special instruction to skip all pending route Layers or router Layers_

*   So, as long as Request is in a non-error-ed state, the Router will keep calling the **_handle\_request_** method for all Layers. Here, if underlying _Layer_ is an error handler, it’s **_handle_** method will not be called. Similarly, when Request in an error-ed state, the Router will now switch to calling **_handle\_error_** method, which will only call the underlying **_handle_** method of the Layer, provided it is an _errorHandler._

> _Phew!! I know that was too much to “_**handle”**_  
> But if you are with me till now,  
> you are close to understanding all the E_xpress _magic!_

_With all the learning of Express internals, let us now understand the how a Request is actually processed. Referring to the same code above, let us say we wanted an admin to get all users details. To do so,_

1.  We will make an HTTP GET request by concatenating the path of Route’s API and the path of all its parent Routers i.e. `GET /admin/users`
2.  When the Express app receives the request, it will pass it to the root Router’s handle method.
3.  Root router will first pass Request through the app level middlewares defined on top, namely — _Helmet, Compression._
4.  Next, this request will try to match the _adminRouter’s_ path `/admin` . Since our request will match the `/admin` path, it will go inside the Layer stack of _adminRouter_
5.  It will run through the _verifyAdminMiddleware()_ defined on the _adminRouter._ This middleware will verify if the client requesting is indeed an _admin.  
    _**If admin** — it will simply call _next()_ method without any param.  
    **If non-admin** — it can either send a 401 or 403 error response, and end the Request-Response cycle here. Optionally, it can continue the cycle by **throwing an Error** or passing an Error via **_next(error_**_)._ Either way, the error passed is stored in the **_LayerError_**
6.  If there **is no** **_LayerError_** yet_,_ the app will invoke the _getUsers()_ function. The function fetches the user details and sends it to the client with a 200 success Response, thus ending the Request-Response cycle here.
7.  However, if there **is a _LayerError_** from previous step, the API handler _getUsers()_ function will be bypassed, in spite of matching
8.  If any of the previous steps have passed down a **_LayerError_**, the next Layer i.e. _notifyErrorHandler_ will be invoked. This is **irrespective of whether the Response is sent** to the client.
9.  The _notifyErrorHandler_ will probably log the error & send alerts. If Response is not yet sent, it can choose to send it. It can optionally **pass the error** to the next layer by calling **_next(error)_**
10.  Our _globalErrorHandler_ is like a final catch all error handler. It will be called if there was an error passed from the previous middlewares and error handlers. It will send a Response to the client, if not already sent. Strictly speaking, it is not needed as Express app too adds its own _finalHandler_ at the end of Layer stack

_After understanding the internals of Express and Request handling, it is quite intuitive now to understand the following guidelines suggested by the Express.js documentation_

> _The order of middleware loading is important: middleware functions that are loaded first are also executed first.  
> …  
> You define error-handling middleware last, after other_ `_app.use()_` _and routes_

— _Because the middlewares are registered & called in order on the Layer-stack. The errorHandlers are expected to handle error thrown from other middlewares and routes, hence they should go at the end of the stack._

> _If the current middleware function does not end the request-response cycle, it must call_ `_next()_` _to pass control. Otherwise, the request will be left hanging._

— _Because calling_ `_next()_` _function is the only way of telling Router that I am done and you can pass Request to next Layer._

> _Calls to_ `_next()_` _and_ `_next(err)_` _indicate that the current handler is complete and in what state._ `_next(err)_` _will skip all remaining handlers in the chain except for those that are set up to handle errors._

_— Because passing error in next() will register a LayerError and only handle\_error function will be invoked on all the matching Layers after that._

> _You must provide_ **_four_** _arguments to identify a middleware as an error-handling middleware function, even if you don’t need to use all the arguments_

— _Because that is the only way express understands difference between ‘middleware’ and ‘errorHandlers’, which are both registered via ‘.use()’ but called by the Request in different states._

> _For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the_ `_next()_`_function, where Express will catch and process them_

— _Express was not built to await on handlers or handle returned promises. Hence, when a handler function is an async function, it will return a promise. When we throw an error, we are simply rejecting that promise. So, the only way to pass an error is via ‘next(err)’ function_ [**_Or is it?_**](https://www.npmjs.com/package/express-async-errors)

_For more details I encourage you to go through the_ [_source code_](https://github.com/expressjs/express)_. If source code is too much for you, you can also checkout this amazing_ [_blog post_](http://sohamkamani.com/blog/2018/05/30/understanding-how-expressjs-works/) _by_ [_Soham Kamani_](https://www.sohamkamani.com/about)_, explaining some of the source code._


[Source](https://medium.com/@viral_shah/express-middlewares-demystified-f0c2c37ea6a1)