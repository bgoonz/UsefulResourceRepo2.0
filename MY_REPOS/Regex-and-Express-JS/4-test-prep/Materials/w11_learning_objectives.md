# Week 11 Learning Objectives

## Regular Expressions Objectives
### Define the effect of the * operator and use it in a regular expression
- star operator: matches if there is 0 or more of the preceding character/bracketed expression
### Define the effect of the ? operator and use it in a regular expression
- optional operator: only matches 0 or 1 of the preceding character/bracketed expression
### Define the effect of the + operator and use it in a regular expression
- plus operator: matches 1 or more of the preceding character/bracketed expression
### Define the effect of the . operator and use it in a regular expression
- dot operator: matches any single character
### Define the effect of the ^ operator and use it in a regular expression
- hat operator: indicates that it starts at the beginning of the input
### Define the effect of the $ operator and use it in a regular expression
- dollar sign operator: indicates the end of the input
### Define the effect of the [] bracket expression and use it in a regular expression
- square brackets: matches for any of the characters inside the expression
### Define the effect of the - inside brackets and use it in a regular expression
- dash operator: indicates a range of characters
### Define the effect of the ^ inside brackets and use it in a regular expression
- hat operator: can mean 'not' when it's inside brackets
### () and \
- grouping operator: primarily used to capture groups of characters for replacements, later
- backslash escapes so that you can use (e.g. if you are looking for a question mark and don't want to use it as the optional operator)
### Shorthands
- \s: whitespace
- \d: digit
- \w: word character (letter, digit, _)
- \S: not whitespace
- \D: not a digit
- \W: not a word character

## HTTP Full-Stack Objectives
### Identify the five parts of a URL
- scheme: e.g. http https file
- authority: domain name of the resource that has the resource that you're trying to access, usually including the port number (the authority of "http://localhost:3000" is "localhost:3000")
- path: the first part of an HTTP request, the stuff that follows
- query: extra information sent to the browser meant for the processing of the request
- fragment: never sent to the server. tells the browser to access a specific section of the page after it loads.
### Identify at least three protocols handled by the browser
- http, https, file
### Use an `IncomingMessage` object to
#### access the headers sent by a client (like a Web browser) as part of the HTTP request
- `req.headers`
#### access the HTTP method of the request
- `req.method`
#### access the path of the request
- `req.url`
#### access and read the stream of content for requests that have a body
```javascript
let bodyContent = '';
for await (let chunk of req) {
    bodyContent += chunk;
}
```
### Use a `ServerResponse` object to
#### write the status code, message, and headers for an HTTP response
```javascript
res.writeHead(200, { 'Content-Type': 'text/plain',
                          'Trailer': 'Content-MD5' });
```
- `res.statusCode(200)`
- `res.setHeader('Content-Type', 'text/html')`
#### write the content of the body of the response
- `res.write(data)`
#### properly end the response to indicate to the client (like a Web browser) that all content has been written
- `res.end()`

## Express Objectives
- popular node.js web framework
- makes common webdev tasks easier, reduces boilerplate code
- route in express consists of an http method, a path, and a route handler function
### Send plain text responses for any HTTP request
```javascript
const express = require('express');
const app = express();

// http://localhost:8081/ --> "Hello from Express!"

app.get('/', (req,res) => {
    res.send('Hello from Express!')
});

const port = 8081;
app.listen(port, () => console.log(`Listening on port ${port}.`));

```
### Use pattern matching to match HTTP request paths to route handlers
### Use the Pug template engine to generate HTML from Pug templates to send to the browser
- templates (files that contain markup and code) are used to render HTML. templating engines are libraries that provide support for writing templates
```javascript
app.set('view engine', 'pug')
...
res.render('template_file_name', {variable1: 'value', variable2: 'value'})
```
### Pass data to Pug templates to generate dynamic content
### Use the `Router` class to modularize the definition of routes
```javascript
// in my router file
const express = require('express');

// Create the Router instance.
const router = express.Router();

// Define routes.

router.get('/', (req, res) => {
 res.send('Home');
});

router.get('/schedule', (req, res) => {
 res.send('Schedule');
});

router.get('/roster', (req, res) => {
 res.send('Roster');
});

module.exports = router;
```
```javascript
//
const express = require('express');
const routes = require('./routes');

// Create the Express app.
const app = express();

// Mount router instances.
app.use('/portland-thorns', routes);
app.use('/orlando-pride', routes);
```

## Pug Template Objectives
### Declare HTML tags and their associated ids, classes, attributes, and content
```pug
html
    head
    title This is my title
    body
        h1 welcome to page
        div#coolID my ID is coolID
        div.coolClass my class is coolClass
        a(href='/destination') this link goes to a destination

```
### Use conditional statements to determine whether or not to render a block
```pug
if userIsLoggedIn
  h2 Welcome!
else
  a(href='/login') Please login
```
### Use interpolation to mix static text and dynamic values in content and attributes
```pug
ul
  li= firstName
  li= lastName
form
  div
    label First Name:
    input(type='text' name='firstName' value=firstName)
  div
    label Last Name:
    input(type='text' name='lastName' value=lastName)
```
### Use iteration to generate multiple blocks of HTML based on data provided to the template
```pug
ul
  each color in colors
    li= color
```

## HTML Forms Objectives
### Describe the interaction between the client and server when an HTML form is loaded into the browser, the user submits it, and the server processes it
- client requests the page, form loads
- client submits the form, and it makes a request (defined by the method attribute of the form element, typically 'POST') to the url defined by the action attribute of the form element(if the url is relative it gets sent to the server that the user is on), using the `x-www-form-urlencoded` format
- server recieves the request and validates the data to ensure it meets the standards to be posted (front-end validations are typically not enough)
- if unsuccessful, a meaningful error message should be displayed to a user
- if successful, server would typically redirect the user to a different page by responding with a `302 found` status
### Create an HTML form using the Pug template engine
- note: the `extends` key word denotes that the template will inherit from another template. when the template is rendered, it will render all of the content that exists in the layout it extends. the named `block` allows for any child template to redefine the content within that block.
```pug
h2 Add Guest
form(method="post" action="/guest")
  label(for="fullname") Full Name:
  input(type="fullname" id="fullname" name="fullname")
  label(for="email") Email:
  input(type="email" id="email" name="email")
  label(for="numGuests") Num Guests
  input(type="number" id="numGuests" name="numGuests")
  input(type="submit" value="Add Guest")
```
### Use express to handle a form's POST request
```javascript
app.post("/sign-up", (req, res) => {
  // handle the request here
});
```
### Use the built-in `express.urlencoded()` middleware function to parse incoming request body form data
- allows you to automatically parse the form encoding scheme as an object literal
```javascript
app.use(express.urlencoded());
```
### Explain what data validation is and why it's necessary for the server to validate incoming data
- easy to circumvent front end validation checks
- prevent malicious or simply junk data from being inserted in server
### Validate user-provided data from within an Express route handler function
```javascript
app.post("/guest", (req, res) => {
  const { fullname, email, numGuests } = req.body;
  const errors = [];

  if (!fullname) {
    errors.push("Please fill out the full name field.");
  }

  if (!email) {
    errors.push("Please fill out the email field.");
  }

  if (!numGuests || numGuests < 1) {
    errors.push("Please fill out a valid number for the field for number of guests.");
  }

  if (errors.length > 0) {
    res.render("guest-form", { title: "Guest Form", errors });
    return; // `return` if there are errors.
  }

  const guest = {
    fullname,
    email,
    numGuests
  };
  guests.push(guest);
  res.redirect("/");
});
```

```pug
extends layout.pug

block content
  if errors
    div
      ul
        each error in errors
          li #{error}
  h2 Add Guest
  form(method="post" action="/guest")
    label(for="fullname") Full Name:
    input(type="fullname" id="fullname" name="fullname")
    label(for="email") Email:
    input(type="email" id="email" name="email")
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests")
    input(type="submit" value="Add Guest")
```
### Write a custom middleware function that validates user-provided data
- a middleware function is a function that takes three arguments, in this specific order:
  - req: the request object
  - res: the response object
  - next: "the next middleware function in the application’s request-response cycle"
- there is a library for this called 'express-validator'
```javascript
const validateGuest = (req, res, next) => {
  const { fullname, email, numGuests } = req.body;
  const numGuestsNum = parseInt(numGuests, 10);
  const errors = [];

  if (!fullname) {
    errors.push("Please fill out the full name field.");
  }

  if (!email) {
    errors.push("Please fill out the email field.");
  }

  if (!numGuests || numGuests < 1) {
    errors.push("Please fill out a valid number for number of guests.");
  }

  req.errors = errors;
  next();
};
app.post("/guest", validateGuest, (req, res) => {
  const { fullname, email, numGuests } = req.body;
  if (req.errors.length > 0) {
    res.render("guest-form", {
      title: "Guest Form",
      errors: req.errors,
      email,
      fullname,
      numGuests
    });
    return;
  }

  const guest = {
    fullname,
    email,
    numGuests
  };
  guests.push(guest);
  res.redirect("/");
});
```
### Use the `csurf` middleware to embed a token value in forms to protect against Cross-Site Request Forgery exploits
- idea: when the form gets submitted, it checks for the secret token to verify that it actually came from a form that the server itself had rendered, and not from some other malicious source
- `csurf`:
  - creates a secret value, which is sent to the client and stored as a cookie named `_csrf`.
  - on every request for a form, a CSRF token is generated from that secret value. CSRF token is sent back to the client as part of the form in a hidden input field.
  - whenever the client submits the form, the server checks the CSRF token that's embedded in the form and verifies that it is a valid CSRF token by checking it against the secret `_csrf` value that was attached to the request as a cookie.
```zsh
npm install csurf@^1.0.0.
npm install cookie-parser@^1.0.0
```
```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(cookieParser()); // Adding cookieParser() as application-wide middleware
app.use(express.urlencoded());
const csrfProtection = csrf({ cookie: true }); // creating csrfProtection middleware to use in specific routes
```

```pug
extends layout.pug

block content
  if errors
    div
      ul
        each error in errors
          li #{error}
  h2 Add Guest
  form(method="post" action="/guest")
    input(type="hidden" name="_csrf" value=csrfToken)
    label(for="fullname") Full Name:
    input(type="fullname" id="fullname" name="fullname" value=fullname)
    label(for="email") Email:
    input(type="email" id="email" name="email" value=email)
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests" value=numGuests)
    input(type="submit" value="Add Guest")
```
## Data-Driven Websites Objectives
### Use environment variables to specify configuration of or provide sensitive information for your code
- you can set environment variables from the command line (or in the start script) e.g. `PORT=8080 NODE_ENV=development node app.js`
  - among other purposes sequelize uses the `NODE_ENV` variable to determine which section of the config.json file it will use for database configuration. you can specify it in the start script
```javascript
// to set it env variables if they aren't already specified
const port = process.env.PORT || 8080;
```
### Use the `dotenv` npm package to load environment variables defined in an `.env` file
```zsh
npm install dotenv --save-dev
```
- add `.env` file to the root of your project (DON'T FORGET TO PUT IT IN GIT IGNORE), e.g.
```
PORT=8080
DB_USERNAME=mydbuser
DB_PASSWORD=mydbuserpassword
DB_DATABASE=mydbname
DB_HOST=localhost
```
- load env variables from the .env file in your app
```javascript
require('dotenv').config();
```
- OR use dotenv in the npm start script
- or use a config module
```javascript
// config.js

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
};
```

```javascript
// Load the environment variables from the .env file
require('dotenv').config();

// Get the port environment variable value.
const { port } = require('./config');
```
### Recall that Express cannot process unhandled Promise rejections from within route handler (or middleware) functions;
### Use a Promise `catch` block or a `try`/`catch` statement with `async`/`await` to properly handle errors thrown from within an asynchronous route handler (or middleware) function
### Write a wrapper function to simplify catching errors thrown within asynchronous route handler (or middleware) functions
### Use the `morgan` npm package to log requests to the terminal window to assist with auditing and debugging
### Add support for the Bootstrap front-end component library to a Pug layout template
### Install and configure Sequelize within an Express application.
### Use Sequelize to test the connection to a database before starting the HTTP server on application startup
### Define a collection of routes (and views) that perform CRUD operations against a single resource using Sequelize
### Handle Sequelize validation errors when users are attempting to create or update data and display error messages to the user so that they can resolve any data quality issues
### Describe how an Express.js error handler function differs from middleware and route handler functions
### Define a global Express.js error-handling function to catch and process unhandled errors
### Define a middleware function to handle requests for unknown routes by returning a 404 NOT FOUND error
