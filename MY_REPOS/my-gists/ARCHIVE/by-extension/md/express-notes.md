* Express middleware

    - functions that extend software
    - biggest feature of express
    - most of the server code we write incl. route handlers are middleware
        (sure tip-off is the .use() function passing in the middleware for use)
    - can be considered an array of functions that gets executed in the order they are introduced into the server   code
    - express middleware is compatible with connect middleware
        * connect is a web application framework for node.js that only provides the middleware layer (very lightweight)
        * has been around a long time so it has a rich ecosystem to be used. 
        * if you can't find an express middleware that you like you can search for a connect middleware module instead

three categories of middleware
    1.built in 
    2. third party
    3. custom 


* Built-in 
    built in is included with express but not added to the app automatically 
    we see this example when using json parsing support out of the request body using: 

        server.use(express.json());
    
    Every type of middle middleware works the same way. Express is turned on for the application by making the      .use() call on the server and passing it the middleware piece we want to apply. .use() is global level

    this comes after invoking: 
    
         const server = express()
         const postsRouter = require('./posts/posts-router')
         server.use(express.json()) //invocation of middle ware json parser
         server.use('/api/posts', postsRouter) // invocation of middleware router


* Third Party 
    Third party are npm modules that we can install and then import using .require() 
    in most cases writing your own middleware is no necessary. SOme of these are: 

        morgan  =>   const morgan = require('morgan')
        npm i morgan
        protects response

        cors =>  const cors = require('cors')
        npm i cors

        helmet => const helmet = require('helmet')
        npm i helmet
        protects headers


* Custom 
    Custom looks something like this snippet made to handle displaying a 404 message

        **two types are regular middleware and error handling middleware**

        server.use(function(req, res) {
            res.status(404).send(`Oops... you've stepped in the void!! This page is 404 NOT FOUND`)
        });

    Writing a custom middleware is a two step process. 

        1.) write a function that will receive 3-4 args typically (3 for regular, 4 for error handling

        function logger(req, res, next) {
            console.log(
                `[${new.Date().toISOString()}] ${req.url} from ${req.get(
                    'Origin'
                )}`
            );
            //next() will signal express that the middleware has finished and it should call the next middleware /////function
            next();
        }

        2.) invoke it in server.use

         function logger(req, res, next) {
            console.log(
                `[${new.Date().toISOString()}] ${req.url} from ${req.get(
                    'Origin'
                )}`
            );

            next();
        }

        server.use(logger)

        This receives three args (the req, the res, and a function that points to the next middleware)

        * By convention, we name the third parameter next. Please stick to that convention. *

        Notes: Any middleware in the queue CAN modify both the request and response objects, but it's NOT required. In this case, we are not making changes to either.

        Any middleware in the queue can stop the request and send a response back to the client. When that happens, the rest of the middleware, including the route handlers, will not work. 

        Calling the next() function signals to Express that the middleware has finished, and it should call the next middleware function. If next() is not called and a response is not sent back to the client, the request will hang, and clients will get a timeout error.


        ERROR HANDLING MIDDLEWARE

        when application hits an errors while handling middleware code error handling middleware can be used by calling next with a single arg. will be similar to 

        next(new Error(message: 'you messed up bro'))




