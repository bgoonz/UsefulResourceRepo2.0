# Middleware Pattern

- Middleware pattern allows us to design a pipeline of functions that can modify or augment incoming data before it reaches the target function
- A middleware manager manages middleware functions
- Incoming data/requests are sequentially handled by the middleware functions which can invoke a call back (usually a variable named next) to invoke the next middleware in the pipeline
- Example of middleware pattern is express.js. Express allows developers to write all kinds of middleware such as parsers, loggers, session managers and protection against attacks
