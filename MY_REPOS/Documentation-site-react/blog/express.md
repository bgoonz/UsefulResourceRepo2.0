---
slug: Data structures
title: Data Structures
author: Bryan Guner
author_title: Web Developer
author_url: https://github.com/bgoonz
author_image_url: https://avatars.githubusercontent.com/u/66654881?s=460&u=4614c45125eb6ab7e4b04468cb9cdf5c998c879d&v=4
tags: [Data Structures, Algorithms]
---

Express.js {#expressjs .mume-header}
==========

#### Jump to... {#jump-to .mume-header}

-   [Routing](#routing)
    -   [Methods](#routingmethods)
    -   [Paths](#paths)
    -   [Parameters](#parameters)
    -   [Handlers](#handlers)
-   [Middleware](#middleware)
    -   [Sessions](#sessions)
-   [Express Properties](#properties)
-   [Express Methods](#methods)
-   [Forms](#forms)

#### Installing Express {#installing-express .mume-header}

-   Open terminal window in your project folder and initialize npm\
     `npm init -y`{.language-javascript}
-   This should install `package.json`{.language-javascript} and
    `package-lock.json`{.language-javascript} in the root of your
    project.
-   Install Express 4.0\
     `npm install express@^4.0.0`{.language-javascript}
-   The `package.json`{.language-javascript} file will now list Express
    as a dependency:

``` {.language-json data-role="codeBlock" data-info="json"}
{
 "name": "my-project-folder-name",
 "version": "1.0.0",
 "description": "",
 "main": "index.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 "keywords": [],
 "author": "",
 "license": "ISC",
 "dependencies": {
   "express": "^4.17.1"
 }
}
```

#### Creating an Express Application {#creating-an-express-application .mume-header}

-   Add a file named `app.js`{.language-javascript} and open in your
    code editor
-   Use the `require`{.language-javascript} directive to import the
    `express`{.language-javascript} model and assign it to a variable
    named `express`{.language-javascript}.

``` {.language-javascript data-role="codeBlock" data-info="js"}
const express = require('express');
```

-   Assign the return value from the `express`{.language-javascript}
    function call to a variable named `app`{.language-javascript}:

``` {.language-javascript data-role="codeBlock" data-info="js"}
const app = express();
```

-   The `app`{.language-javascript} variable holds a reference to an
    Express Application ( `app`{.language-javascript}) object. You'll
    call methods on the `app`{.language-javascript} object as you build
    out your web application.

### Routing []() {#routing-a-idroutinga .mume-header}

-   **Routing** refers to determining how an application should respond
    to a client request
    -   Each route can have one or more handler functions, which are
        executed when the route is matched.
-   Route definition takes the following structure:\
     `app.METHOD(PATH, HANDLER)`{.language-javascript}
    -   `app`{.language-javascript} is an instance of express.
    -   `METHOD`{.language-javascript} is an HTTP request method, in
        lowercase.
    -   `PATH`{.language-javascript} is a path on the server.
    -   `HANDLER`{.language-javascript} is the function executed when
        the route is matched.
        -   You can provide multiple callback functions that behave like
            [middleware](#middleware) to handle a [request](#methods).

#### Route Methods []() {#route-methods-a-idroutingmethodsa .mume-header}

-   A route method is derived from one of the HTTP methods, and is
    attached to an instance of the express class.

    -   `GET`{.language-javascript} and `POST`{.language-javascript} are
        two of the most commonly used HTTP methods, followed by
        `PUT`{.language-javascript} and `DELETE`{.language-javascript}.
-   #### `get()`{.language-javascript}

    -   to handle GET requests

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    app.get('/', function (req, res) => {
      res.send('Hello from Express!');
    });
    ```

-   #### `post()`{.language-javascript}

    -   to handle POST requests

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    app.post('/', function (req, res) {
      res.send('Got a POST request')
    })
    ```

-   #### `put()`{.language-javascript}

    -   to handle PUT requests

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    app.put('/user', function (req, res) {
      res.send('Got a PUT request at /user')
    })
    ```

-   #### `delete()`{.language-javascript}

    -   to handle DELETE requests

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    app.delete('/user', function (req, res) {
      res.send('Got a DELETE request at /user')
    })
    ```

#### Route Paths []() {#route-paths-a-idpathsa .mume-header}

-   Route paths, in combination with a request method, define the
    endpoints at which requests can be made.
    -   Route paths can be strings, string patterns, or regular
        expressions.
    -   Route paths can be based on regular expressions by surrounding
        search string with `/`{.language-javascript}s

[List of root paths](https://expressjs.com/en/guide/routing.html)

#### Route Parameters []() {#route-parameters-a-idparametersa .mume-header}

-   Route parameters are named URL segments that are used to capture the
    values specified at their position in the URL.
    -   The captured values are populated in the
        `req.params`{.language-javascript} object, with the name of the
        route parameter specified in the path as their respective keys.

        ``` {.language- data-role="codeBlock" data-info=""}
         Route path: /users/:userId/books/:bookId
        Request URL: http://localhost:3000/users/34/books/8989
        req.params: { "userId": "34", "bookId": "8989" }
        ```

    -   To define routes with route parameters, simply specify the route
        parameters in the path of the route as shown below.

        ``` {.language-javascript data-role="codeBlock" data-info="js"}
        app.get('/users/:userId/books/:bookId', function (req, res) {
          res.send(req.params)
        })
        ```

#### Route Handlers []() {#route-handlers-a-idhandlersa .mume-header}

-   You can provide multiple callback functions that behave like
    [middleware](#middleware) to handle a request.
-   Route handlers can be in the form of a function, an array of
    functions, or combinations of both.

    -   You can create chainable route handlers for a route path by
        using **`app.route()`{.language-javascript}**

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    app.route('/book')
    .get(function (req, res) {
      res.send('Get a random book')
    })
    .post(function (req, res) {
      res.send('Add a book')
    })
    .put(function (req, res) {
      res.send('Update the book')
    })
    ```

    -   Use the `express.Router`{.language-javascript} class to create
        modular, mountable route handlers.
        -   A `Router`{.language-javascript} instance is a complete
            middleware and routing system; for this reason, it is often
            referred to as a "mini-app".

### Middleware []() {#middleware-a-idmiddlewarea .mume-header}

-   **Express is a routing and middleware web framework** that has
    minimal functionality of its own: An Express application is
    essentially a series of middleware function calls.
-   Middleware functions are functions that have access to the request
    object ( `req`{.language-javascript}), the response object (
    `res`{.language-javascript}), and the `next`{.language-javascript}
    function in the application's request-response cycle.
    -   The `next`{.language-javascript} function is a function in the
        Express router which, when invoked, executes the middleware
        succeeding the current middleware.
-   Middleware functions can perform the following tasks:
    -   Execute any code.
    -   Make changes to the request and the response objects.
    -   End the request-response cycle.
    -   Call the next middleware in the stack.
-   If the current middleware function does not end the request-response
    cycle, it must call `next()`{.language-javascript} to pass control
    to the next middleware function. Otherwise, the request will be left
    hanging.

``` {.language-javascript data-role="codeBlock" data-info="js"}
const express = require('express');
const app = express();

app.get('/', function(req, res, next) {
  next();
});

app.listen(3000)
```

-   `.get()`{.language-javascript}: HTTP method for which the middleware
    function applies
-   `'/'`{.language-javascript}: Path (route) for which the middleware
    function applies
-   `function`{.language-javascript}: The middleware function
-   `req`{.language-javascript}: HTTP request argument to the middleware
    function
-   `res`{.language-javascript}: HTTP response argument to the
    middleware function
-   **`next`{.language-javascript}**: Callback argument to the
    middleware function

#### Listening for HTTP Connections {#listening-for-http-connections .mume-header}

-   To start the server listening for HTTP connections from clients,
    call the `app.listen()`{.language-javascript} method passing:

    -   The desired port to use
    -   An *optional* callback function

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    const port = 8081;

    app.listen(port, () => console.log(`Listening on port ${port}...`));
    ```

#### Configurable Middleware {#configurable-middleware .mume-header}

-   If you need your middleware to be configurable, export a function
    which accepts an options object or other parameters, which, then
    returns the middleware implementation based on the input parameters.

``` {.language-javascript data-role="codeBlock" data-info="js"}
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```

The middleware can now be used as shown below.

``` {.language-javascript data-role="codeBlock" data-info="js"}
var mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

An Express Application can use the following types of middleware:

-   ##### Application-level middleware

    -   Bind application-level middleware to an instance of the
        `app`{.language-javascript} object by using the
        `app.use()`{.language-javascript} and
        `app.METHOD()`{.language-javascript} functions, where
        `METHOD`{.language-javascript} is the HTTP method of the request
        that the middleware function handles (such as
        `GET`{.language-javascript}, `PUT`{.language-javascript}, or
        `POST`{.language-javascript}) in lowercase.
-   ##### Router-level middleware

    -   Router-level middleware works in the same way as
        application-level middleware, except it is bound to an instance
        of `express.Router()`{.language-javascript}.
    -   Load router-level middleware by using the
        `router.use()`{.language-javascript} and
        `router.METHOD()`{.language-javascript} functions.
-   ##### Error-handling

    -   Define
        [error-handling](https://expressjs.com/en/guide/error-handling.html)
        middleware functions in the same way as other middleware
        functions, except with four arguments instead of three,
        specifically with the signature ( `err`{.language-javascript},
        `req`{.language-javascript}, `res`{.language-javascript},
        `next`{.language-javascript})):

        ``` {.language-javascript data-role="codeBlock" data-info="js"}
        app.use(function (err, req, res, next) {
          console.error(err.stack)
          res.status(500).send('Something broke!')
        })
        ```

-   ##### Built-in middleware

  Function                                                  Action                                                        Arguments
  --------------------------------------------------------- ------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  `express.static(root, [options])`{.language-javascript}   serves status assets such as HTML files, images, and so on.   `root`{.language-javascript}: specifies the root directory `options`{.language-javascript}: [options object](https://expressjs.com/en/4x/api.html#express.static)
  `express.json([options])`{.language-javascript}           parses incoming requests with JSON payloads                   `options`{.language-javascript}: [options object](https://expressjs.com/en/4x/api.html#express.json)
  `express.urlencoded([options])`{.language-javascript}     parses incoming requests with URL-encoded payloads            `options`{.language-javascript}: [options object](https://expressjs.com/en/4x/api.html#express.urlencoded)

-   ##### Third-party middleware

    -   Use third-party middleware to add functionality to Express apps.
    -   Install the Node.js module for the required functionality, then
        load it in your app at the application level or at the router
        level.\
         `$ npm install cookie-parser`{.language-javascript}
    -   The following example illustrates installing and loading the
        cookie-parsing middleware function cookie-parser.

        ``` {.language-javascript data-role="codeBlock" data-info="js"}
        const express = require('express')
        const app = express()
        const cookieParser = require('cookie-parser')

        // load the cookie-parsing middleware
        app.use(cookieParser())
        ```

### Sessions []() {#sessions-a-idsessionsa .mume-header}

-   Sessions build upon the idea of an HTTP cookie.
    -   Instead of storing data in the cookie itself, a unique
        identifier known as the **session ID** is stored. This session
        ID is linked to an object stored on the server.
-   Sessions give you a way to identify a series of requests as being
    connected to the same client.
    -   Once you know that a request is connected to a known client
        session, you can associate the data of that session without
        having to send that data to the client and rely upon them to
        send that data back to the server unaltered.

#### Installing Express sessions {#installing-express-sessions .mume-header}

``` {.language- data-role="codeBlock" data-info=""}
 npm install express-session
```

#### Adding `express-session`{.language-javascript} middleware to the `app`{.language-javascript} module. {#adding-express-session-middleware-to-the-app-module .mume-header}

``` {.language- data-role="codeBlock" data-info=""}
 const express = require('express');
const session = require('express-session');

const app = express();

app.set('view engine', 'pug');
app.use(session({
  secret: 'a5d63fc5-17a5-459c-b3ba-6d81792158fc',
  resave: false,
  saveUninitialized: false,
}));
```

-   **`secret`{.language-javascript}**: This is the secret used to sign
    the session ID cookie. The secret value above was generated using
    the uuid npm package.

    -   The **uuid package** allows you to generate universally unique
        identifiers (UUIDs) from random cryptographically-strong values,
        a timestamp, or a user-supplied string.
-   **`resave`{.language-javascript}**: This option forces the session
    to be saved into the session store, even if the session was never
    modified during the request.

-   **`saveUninitialized`{.language-javascript}**: This forces an
    uninitialized session to be saved to the store. An uninitialized
    session is when a session is new but not modified.

    -   Not setting the resave and saveUninitialized options results in
        the following warning in the console:

        ``` {.language- data-role="codeBlock" data-info=""}
         express-session deprecated undefined resave option; provide resave option app.js:8:9
        express-session deprecated undefined saveUninitialized option; provide saveUninitialized option app.js:8:9
        ```

-   **`name`{.language-javascript}**: By default, the express-session
    middleware uses the name `connect.sid`{.language-javascript}.

    -   it's important to set a specific name property and separate each
        application's session cookies from each other.

    #### Express-session options properties

    Option

    Action

    Default Value

    `cookie`{.language-javascript}

    Settings object for the session ID cookie. The default value is {
    path: '/', httpOnly: true, secure: false, maxAge: null }.

    `genid`{.language-javascript}

    Function to call to generate a new session ID. Provide a function
    that returns a string that will be used as a session ID.

    `proxy`{.language-javascript}

    Trust the reverse proxy when setting secure cookies (via the
    "X-Forwarded-Proto" header).

    `rolling`{.language-javascript}

    Force the session identifier cookie to be set on every response. The
    expiration is reset to the original `maxAge`{.language-javascript},
    resetting the expiration countdown

    `false`{.language-javascript}

    `store`{.language-javascript}

    The session store instance, defaults to a new
    `MemoryStore`{.language-javascript} instance

    `unset`{.language-javascript}

    Control the result of unsetting `req.session`{.language-javascript}
    (through delete, setting to null, etc.).

    `keep`{.language-javascript}

#### Session Store {#session-store .mume-header}

-   Every session store must be an EventEmitter and implement specific
    methods. The following methods are the list of required,
    recommended, and optional.

    -   **Required methods** are ones that this module will always call
        on the store.
    -   **Recommended methods** are ones that this module will call on
        the store if available.
    -   **Optional methods** are ones this module does not call at all,
        but helps present uniform stores to users.

    Method

    Required?

    `store.all(callback)`{.language-javascript}

    Optional

    Gets all sessions in the store as an array. The
    `callback`{.language-javascript} should be called as
    `callback(error, sessions)`{.language-javascript}.

    `store.destroy(sid, callback)`{.language-javascript}

    Required

    Destroys/deletes a session from the store given a session ID (
    `sid`{.language-javascript}). The `callback`{.language-javascript}
    should be called as `callback(error)`{.language-javascript} once the
    session is destroyed.

    `store.clear(callback)`{.language-javascript}

    Optional

    Deletes all sessions from the store. The
    `callback`{.language-javascript} should be called as
    `callback(error)`{.language-javascript} once the store is cleared.

    `store.length(callback)`{.language-javascript}

    Optional

    Gets the count of all sessions in the store. The
    `callback`{.language-javascript} should be called as
    `callback(error, len)`{.language-javascript}.

    `store.get(sid, callback)`{.language-javascript}

    Required

    Gets a session from the store given a session ID (
    `sid`{.language-javascript}). The `callback`{.language-javascript}
    should be called as
    `callback(error, session)`{.language-javascript}.

    `store.set(sid, session, callback)`{.language-javascript}

    Required

    Upserts a session into the store given a session ID (
    `sid`{.language-javascript}) and session (
    `session`{.language-javascript}) object. The callback should be
    called as `callback(error)`{.language-javascript} once the session
    has been set in the store.

    `store.touch(sid, session, callback)`{.language-javascript}

    Recommended

    Used to "touch" a given session given a session ID (
    `sid`{.language-javascript}) and session (
    `session`{.language-javascript}) object. The
    `callback`{.language-javascript} should be called as
    `callback(error)`{.language-javascript} once the session has been
    touched.

-   You can also configure session cookies with the following options
    that are not set by default: `domain`{.language-javascript}

#### Drawbacks {#drawbacks .mume-header}

-   Using sessions increases the overhead required to serve clients.
-   Server affinity, the ability of a router to send a request to the
    same server over and over for a specific client, can be an issue
    depending on the session store that you're using.

### Express Methods []() {#express-methods-a-idmethodsa .mume-header}

-   #### `express.json([options])`{.language-javascript}

-   This is a built-in middleware function in Express. It parses
    incoming requests with JSON payloads and is based on body-parser.

[Request](https://expressjs.com/en/4x/api.html#req)

[Application](https://expressjs.com/en/4x/api.html#app)

[Response](https://expressjs.com/en/4x/api.html#res)

[Router](https://expressjs.com/en/4x/api.html#router)

Middleware

`req.accepts()`{.language-javascript}

`app.delete()`{.language-javascript}

`res.`{.language-javascript}append() `()`{.language-javascript}

`router.all()`{.language-javascript}

`bodyParser()`{.language-javascript}

`req.acceptsCharsets()`{.language-javascript}

`app.disable()`{.language-javascript}

`res.attachment()`{.language-javascript}

`router.METHOD()`{.language-javascript}

`compress()`{.language-javascript}

`req.acceptsEncodings()`{.language-javascript}

`app.enable()`{.language-javascript}

`res.cookie()`{.language-javascript}

`router.param()`{.language-javascript}

`cookieParser()`{.language-javascript}

`req.acceptsLanguages()`{.language-javascript}

`app.engine()`{.language-javascript}

`res.clearCookie()`{.language-javascript}

`router.route()`{.language-javascript}

`cookieSession()`{.language-javascript}

`req.get()`{.language-javascript}

`app.get()`{.language-javascript}

`res.download()`{.language-javascript}

`router.use()`{.language-javascript}

`csrf()`{.language-javascript}

`req.is()`{.language-javascript}

`app.listen()`{.language-javascript}

`res.end()`{.language-javascript}

`errorHandler()`{.language-javascript}

`req.param()`{.language-javascript}

`app.method()`{.language-javascript}

`res.format()`{.language-javascript}

`methodOverride()`{.language-javascript}

`req.range()`{.language-javascript}

`app.param()`{.language-javascript}

`res.get()`{.language-javascript}

`morgan()`{.language-javascript}

`app.path()`{.language-javascript}

`res.json()`{.language-javascript}

`responseTime()`{.language-javascript}

`app.post()`{.language-javascript}

`res.links()`{.language-javascript}

`favicon()`{.language-javascript}

`app.put()`{.language-javascript}

`res.location()`{.language-javascript}

`directory()`{.language-javascript}

`app.render()`{.language-javascript}

`res.redirect()`{.language-javascript}

`serveStatic()`{.language-javascript}

`app.route()`{.language-javascript}

`res.render()`{.language-javascript}

`timeout()`{.language-javascript}

`app.set()`{.language-javascript}

`res.send()`{.language-javascript}

`vhost()`{.language-javascript}

`app.use()`{.language-javascript}

`res.sendFile()`{.language-javascript}

`session()`{.language-javascript}

`res.sendStatus()`{.language-javascript}

`res.set()`{.language-javascript}

`res.status()`{.language-javascript}

`res.type()`{.language-javascript}

`res.vary()`{.language-javascript}

### Express Properties []() {#express-properties-a-idpropertiesa .mume-header}

Request

Response

Application

`req.app`{.language-javascript}

`res.app`{.language-javascript}

`app.locals`{.language-javascript}

`req.baseUrl`{.language-javascript}

`res.headersSent`{.language-javascript}

`app.mountpath`{.language-javascript}

`req.body`{.language-javascript}

`res.locals`{.language-javascript}

`req.cookies`{.language-javascript}

`req.fresh`{.language-javascript}

`req.hostname`{.language-javascript}

`req.ip`{.language-javascript}

`req.ips`{.language-javascript}

`req.method`{.language-javascript}

`req.originalUrl`{.language-javascript}

`req.params`{.language-javascript}

`req.path`{.language-javascript}

`req.protocol`{.language-javascript}

`req.query`{.language-javascript}

`req.route`{.language-javascript}

`req.secure`{.language-javascript}

`req.signedCookies`{.language-javascript}

`req.stale`{.language-javascript}

`req.subdomains`{.language-javascript}

`req.xhr`{.language-javascript}

### Forms []() {#forms-a-idformsa .mume-header}

-   The form is defined in HTML as a collection of elements inside
    `<form>...</form>`{.language-javascript} tags, containing at least
    one `input`{.language-javascript} element of
    `type="submit"`{.language-javascript}.

``` {.language-html data-role="codeBlock" data-info="HTML"}
<form action="/team_name_url/" method="post">
    <label for="team_name">Enter name: </label>
    <input id="team_name" type="text" name="name_field" value="Default name for team.">
    <input type="submit" value="OK">
</form>
```

#### Form Handling {#form-handling .mume-header}

-   The route sends our request to a controller function which performs
    any database actions required, including reading data from the
    models, then generates and returns an HTML page.
    -   the server also needs to be able to process the data provided by
        the user, and redisplay the form with error information if there
        are any problems.

##### Process flowchart for processing form requests {#process-flowchart-for-processing-form-requests .mume-header}

![](https://mdn.mozillademos.org/files/14478/Web%20server%20form%20handling.png)

1.  Display the default form the first time it is requested by the user.

-   The form may contain blank fields (e.g. if you're creating a new
    record), or it may be pre-populated with initial values (e.g. if you
    are changing a record, or have useful default initial values).

2.  Receive data submitted by the user, usually in an HTTP POST request.
3.  Validate and sanitize the data.
4.  If any data is invalid, re-display the form—this time with any user
    populated values and error messages for the problem fields.
5.  If all data is valid, perform required actions (e.g. save the data
    in the database, send a notification email, return the result of a
    search, upload a file, etc.)
6.  Once all actions are complete, redirect the user to another page.

-   **Express itself doesn't provide any specific support for form
    handling operations, but it can use middleware to process
    `POST`{.language-javascript} and `GET`{.language-javascript}
    parameters from the form, and to validate/sanitize their values.**

#### Validation and Sanitazion {#validation-and-sanitazion .mume-header}

-   **Validation** checks that entered values are appropriate for each
    field (are in the right range, format, etc.) and that values have
    been supplied for all required fields.
-   **Sanitization** removes/replaces characters in the data that might
    potentially be used to send malicious content to the server.
    -   Installation:\
         `npm install express-validator`{.language-javascript}
    -   To use the validator in our controllers we have to require the
        functions we want to use from the 'express-validator/check' and
        'express-validator/filter' modules, as shown below:

        ``` {.language-javascript data-role="codeBlock" data-info="js"}
        const { body,validationResult } = require('express-validator');
        ```

        -   **`body([fields, message])`{.language-javascript}**:
            Specifies a set of fields in the request body (a
            `POST`{.language-javascript} parameter) to validate and/or
            sanitize along with an optional error message that can be
            displayed if it fails the tests
        -   **`validationResults(req)`{.language-javascript}**: Runs the
            validation, making errors available in the form of a
            `validation`{.language-javascript} result object.

#### Routes {#routes .mume-header}

-   In order to implement our form handling code, we will need two
    routes that have the same URL pattern.
    -   The first ( `GET`{.language-javascript}) route is used to
        display a new empty form for creating the object.

        ``` {.language-javascript data-role="codeBlock" data-info="js"}
        // GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
        router.get('/genre/create', genre_controller.genre_create_get);
        ```

    -   The second route ( `POST`{.language-javascript}) is used for
        validating data entered by the user, and then saving the
        information and redirecting to the detail page (if the data is
        valid) or redisplaying the form with errors (if the data is
        invalid).

        ``` {.language-javascript data-role="codeBlock" data-info="js"}
        // POST request for creating Genre.
        router.post('/genre/create', genre_controller.genre_create_post);
        ```

[Bootstrap Form
Control](https://getbootstrap.com/docs/4.4/components/forms/)

Error Handling {#error-handling .mume-header}
--------------

-   If you need to use any of the special characters literally (actually
    searching for a "\*", for instance), you must escape it by putting a
    backslash in front of it.

-   Errors that occur in synchronous code inside route handlers and
    middleware require no extra work.

    -   If synchronous code throws an error, then Express will catch and
        process it.

#### The default error handler {#the-default-error-handler .mume-header}

-   Express comes with a built-in error handler that takes care of any
    errors that might be encountered in the app.
-   This default error-handling middleware function is added at the end
    of the middleware function stack.
-   If you pass an error to `next()`{.language-javascript} and you do
    not handle it in a custom error handler, it will be handled by the
    built-in error handler; the error will be written to the client with
    the stack trace.
-   When an error is written, the following information is added to the
    response:
    -   The `res.statusCode`{.language-javascript} is set from
        `err.status`{.language-javascript} (or
        `err.statusCode`{.language-javascript}). If this value is
        outside the 4xx or 5xx range, it will be set to 500.
    -   The `res.statusMessage`{.language-javascript} is set according
        to the status code.
    -   The body will be the HTML of the status code message when in
        production environment, otherwise will be err.stack.
    -   Any headers specified in an `err.headers`{.language-javascript}
        object

Template Inheritance {#template-inheritance .mume-header}
--------------------

-   Pug supports template inheritance. Template inheritance works via
    the block and extends keywords.
-   In a template, a block is simply a "block" of Pug that a child
    template may replace. This process is recursive.
-   Pug blocks can provide default content, if appropriate. Providing
    default content is purely optional, though. The example below
    defines block scripts, block content, and block foot.

#### Block `append`{.language-javascript} / `prepend`{.language-javascript} {#block-append-prepend .mume-header}

-   Pug allows you to `replace`{.language-javascript} (default),
    `prepend`{.language-javascript}, or `append`{.language-javascript}
    blocks.
    -   When using block append or block prepend, the word "block" is
        optional.
-   Note that only named blocks and mixin definitions can appear at the
    top (unindented) level of a child template.

-   [Express.js](#expressjs)\
     - [Jump to...](#jump-to)\
     - [Installing Express](#installing-express)\
     - [Creating an Express
    Application](#creating-an-express-application)
    -   [Routing](#routing-a-idroutinga)
        -   [Route Methods](#route-methods-a-idroutingmethodsa)
        -   [Route Paths](#route-paths-a-idpathsa)
        -   [Route Parameters](#route-parameters-a-idparametersa)
        -   [Route Handlers](#route-handlers-a-idhandlersa)
    -   [Middleware](#middleware-a-idmiddlewarea)
        -   [Listening for HTTP
            Connections](#listening-for-http-connections)
        -   [Configurable Middleware](#configurable-middleware)
    -   [Sessions](#sessions-a-idsessionsa)
        -   [Installing Express sessions](#installing-express-sessions)
        -   [Adding `express-session`{.language-javascript} middleware
            to the `app`{.language-javascript}
            module.](#adding-express-session-middleware-to-the-app-module)
        -   [Session Store](#session-store)
        -   [Drawbacks](#drawbacks)
    -   [Express Methods](#express-methods-a-idmethodsa)
    -   [Express Properties](#express-properties-a-idpropertiesa)
    -   [Forms](#forms-a-idformsa)
        -   [Form Handling](#form-handling)
            -   [Process flowchart for processing form
                requests](#process-flowchart-for-processing-form-requests)
        -   [Validation and Sanitazion](#validation-and-sanitazion)
        -   [Routes](#routes)
    -   [Error Handling](#error-handling)
        -   [The default error handler](#the-default-error-handler)
    -   [Template Inheritance](#template-inheritance)
        -   [Block `append`{.language-javascript} /
            `prepend`{.language-javascript}](#block-append-prepend)

≡
