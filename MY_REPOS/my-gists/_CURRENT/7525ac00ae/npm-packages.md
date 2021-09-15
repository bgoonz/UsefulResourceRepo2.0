💻 Frontend frameworks
----------------------

1.[React](https://www.npmjs.com/package/react)

React uses a virtual DOM to manage sections of a page as individual components, allowing you to refresh a component without refreshing the entire page. Often used with [React-dom](https://www.npmjs.com/package/react-dom) and [React-router-dom](https://www.npmjs.com/package/react-router-dom).

2.[Vue](https://www.npmjs.com/package/vue)

Vue was built by combining the best approaches from React and others, focusing on features that made writing Web apps faster, easier, and more pleasant. Great documentation. Often used with [Vue-router](https://www.npmjs.com/package/vue-router) and [Vuex](https://www.npmjs.com/package/vuex).

3.[Svelte](https://www.npmjs.com/package/svelte)

Svelte is a new way to build web applications. It's a compiler that takes your declarative components and converts them into efficient JavaScript that surgically updates the DOM.

*Other notable frameworks include *[*Angular*](https://www.npmjs.com/package/angular)*, *[*Ember*](https://www.npmjs.com/package/ember)*, *[*Backbone*](https://www.npmjs.com/package/backbone)*, *[*Preact*](https://www.npmjs.com/package/preact)* and many others. You can do wonders with any of them, the golden rule is to learn *[*modern JS (ES6 and above)*](https://javascript.info/)* well before.*

🎨 Styling frameworks
---------------------

4.[Bootstrap](https://www.npmjs.com/package/bootstrap)

World's most popular framework for building responsive, mobile-first sites. Intuitive and powerful, tho relatively bulky in size. Many modern UI kits are based on it like [React Bootstrap](https://www.npmjs.com/package/react-bootstrap) or [Reactstrap](https://www.npmjs.com/package/reactstrap).

5.[Tailwind](https://www.npmjs.com/package/tailwindcss)

A low-level, utility-first CSS framework for rapid UI development. Built from the ground-up to be super customizable.

6.[Styled-components](https://www.npmjs.com/package/styled-components)

CSS-in-JS tool that bridges the gap between components and styling, offering numerous features to get you up and running in styling components in a functional and reusable way.

*Other great solutions include *[*Foundation*](https://www.npmjs.com/package/foundation-sites)*, *[*Bulma*](https://www.npmjs.com/package/bulma)*, *[*Materialize*](https://www.npmjs.com/package/materialize-css)* and *[*Ant Design*](https://www.npmjs.com/package/antd)*. If you prefer to write Vanilla CSS, you can use some CSS extension language like *[*SASS*](https://www.npmjs.com/package/sass)*, to extend its features.*

🔲 Backend frameworks
---------------------

7.[Express](https://www.npmjs.com/package/express)

Fast, unopinionated, minimalist web framework for Node.js. It is relatively minimal with many features available as plugins. Often referred to as a standard server framework for Node.js.

8.[Hapi](https://www.npmjs.com/package/@hapi/hapi)

Hapi was originally used for the Express framework. With Hapi you can build powerful, scalable applications, with minimal overhead and full out-of-the-box functionality.

9.[Sails](https://www.npmjs.com/package/sails)

Sails is the most popular MVC framework for Node.js with support for the requirements of modern apps: data-driven APIs with a scalable, service-oriented architecture.

*Same as for frontend frameworks, there are lots of backend alternatives as well like *[*Adonis*](https://www.npmjs.com/package/@adonisjs/cli)* and *[*Koa*](https://www.npmjs.com/package/koa)*. Pick one that suits your needs and learn it well.*

🔗 CORS and requests
--------------------

10.[Cors](https://www.npmjs.com/package/cors)

Node.js middleware for providing a Connect/Express middleware that can be used to enable cross-origin resource sharing with various options.

11.[Axios](https://www.npmjs.com/package/axios)

A promise-based HTTP client for the browser and Node.js. It's easy to set-up, intuitive, and simplifies a lot of stuff compared to JS built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

12.[Body-parser](https://www.npmjs.com/package/body-parser)

Body parsing middleware, that extracts the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with.

🧩 API services
---------------

13.[Restify](https://www.npmjs.com/package/restify)

A Node.js web service framework optimized for building semantically correct RESTful web services ready for production use at scale. Restify optimizes for introspection and performance.

14.[GraphQL](https://www.npmjs.com/package/graphql)

A query language for APIs and a runtime for fulfilling those queries with your existing data. Provides a complete description of the data in your API, gives clients the power to ask for exactly what they need.

🤝 Web sockets
--------------

15.[Socket.io](https://www.npmjs.com/package/socket.io)

Socket.IO enables real-time, bidirectional, and event-based communication. It works on every platform, browser, or device, focusing equally on reliability and speed.

16.[WS](https://www.npmjs.com/package/ws)

Simple to use, fast, and thoroughly tested WebSocket client and server implementation. A great, less abstract, and bare alternative to Socket.io.

✍ Loggers
---------

17.[Morgan](https://www.npmjs.com/package/morgan)

Specifically, an HTTP request logger, storing HTTP requests and giving you concise insight into how your app is being used, and where there could be potential errors.

18.[Winston](https://www.npmjs.com/package/winston)

A logger for just about everything with support for multiple means of transport. Has been out there for longer than Morgan, it also has a bigger community of maintainers and more downloads.

💾 Database tools
-----------------

19.[Mongoose](https://www.npmjs.com/package/mongoose)

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

20.[Sequelize](https://www.npmjs.com/package/sequelize)

Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

🔓 Auth tools
-------------

21.[Passport](https://www.npmjs.com/package/passport)

Passport's purpose is to authenticate requests through an extensible set of plugins known as strategies. You provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.

22.[Bcrypt](https://www.npmjs.com/package/bcrypt)

A library to help you hash passwords. Bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher and presented at USENIX in 1999.

23.[JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)

JSON Web Tokens (JWT) are an open, industry-standard RFC 7519 method for representing claims securely between two parties. This package allows you to decode, verify, and generate JWT.

🔧 Config modules
-----------------

24.[Config](https://www.npmjs.com/package/config)

Settings are stored in configuration files within your application and can be overridden and extended by environment variables, command line parameters, or external sources.

25.[Dotenv](https://www.npmjs.com/package/dotenv)

Zero-dependency module that loads environment variables from a .env file into process.env.

📃 Static site generators
-------------------------

26.[Gatsby](https://www.npmjs.com/package/gatsby)

A modern site generator that creates fast, high-quality, dynamic React apps, from blogs to e-commerce sites to user dashboards. Great plugin ecosystem and templates.

27.[NextJS](https://www.npmjs.com/package/next)

NextJS first and foremost supports server rendering as well as statically generated content. You can also define serverless functions as API endpoints.

28.[NuxtJS](https://www.npmjs.com/package/nuxt)

NuxtJS is basically a NextJS alternative in Vue's ecosystem. NuxtJS's goal is to make web development powerful and performant with great developer experience in mind.

🌟Templating languages
----------------------

29.[Mustache](https://www.npmjs.com/package/mustache)

Mustache is a logic-less template syntax. It can be used for HTML, config files, source code --- anything. It works by expanding tags in a template using values provided in a hash or object.

30.[Handlebars](https://www.npmjs.com/package/handlebars)

Uses a template and an input object to generate HTML or other text formats. Handlebars templates look like a regular text with embedded Handlebars expressions. Handlebars is largely compatible with Mustache templates.

31.[EJS](https://www.npmjs.com/package/ejs)

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript with a simple syntax, speedy execution, and easy debugging. EJS has a large community of active users, and the library is under active development.

📷 Image processing
-------------------

32.[Sharp](https://www.npmjs.com/package/sharp)

A great module to convert large images in common formats to smaller, web-friendly JPEG, PNG and WebP images of varying dimensions.

33.[GM](https://www.npmjs.com/package/gm)

Thanks to the Node.js module GM you can use two popular tools for creating, editing, composing, and converting images --- GraphicsMagick and ImageMagick directly from within your code.

34.[Cloudinary](https://www.npmjs.com/package/cloudinary)

Dedicated module to ease work with cloud service that offers a solution to a web application's entire image management pipeline.

📅 Date formatting
------------------

35.[DayJS](https://www.npmjs.com/package/dayjs)

DayJS is a fast and lightweight alternative to [MomentJS](https://www.npmjs.com/package/moment) (in maintenance mode since September, 2020). Uses similar API --- if you have used MomentJS, you already know how to use most of DayJS.

36.[Luxon](https://www.npmjs.com/package/luxon)

If you like another light-weight alternative, with a slightly different API, Luxon might be the right choice for you.

🧙‍♂️ Data generators
---------------------

37.[Shortid](https://www.npmjs.com/package/shortid)

Creates amazingly short non-sequential url-friendly unique ids. Perfect for url shorteners, DB ids, and any other ids.

38.[Uuid](https://www.npmjs.com/package/uuid)

Handy tiny package to quickly and easily generate more complex universally unique identifiers (UUIDs).

39.[Faker](https://www.npmjs.com/package/faker)

Useful package for generating massive amounts of fake data in the browser and Node.js.

✅ Validators
------------

40.[Validator](https://www.npmjs.com/package/validator)

Handy library of string validators and sanitizers. Lots of useful methods available, like `isEmail()`, `isCreditCard()`, `isDate()` and `isURL()`.

41.[Joi](https://www.npmjs.com/package/joi)

Powerful schema description language and data validator for JavaScript.

📧 Forms and emails
-------------------

42.[Formik](https://www.npmjs.com/package/formik)

Formik is a popular open-source form library for React and React Native. It's easy to use, declarative, and adaptive.

43.[Multer](https://www.npmjs.com/package/multer)

Multer is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

44.[Nodemailer](https://www.npmjs.com/package/nodemailer)

Nodemailer is a module for Node.js applications to allow easy email sending. The project got started back in 2010, today it is the solution most Node.js users turn to by default.

🧪 Testing
----------

45.[Jest](https://www.npmjs.com/package/jest)

Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It allows you to write tests with an approachable, familiar, and feature-rich API that gives you results quickly.

46.[Mocha](https://www.npmjs.com/package/mocha)

Mocha is a JavaScript test framework, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting while mapping uncaught exceptions to the correct test cases.

💫 Web scraping and automation
------------------------------

47.[Cheerio](https://www.npmjs.com/package/cheerio)

Cheerio is widely used for web scraping work and sometimes in automating the tasks. It pretty quick and fast as it is based on jquery. Cheerio wraps around Parse5 parser and is capable enough to parse any type of HTML and XML documents.

48.[Puppeteer](https://www.npmjs.com/package/puppeteer)

Puppeteer is widely used for automating browser tasks and can only work with google chrome headless browser i.e chromium. Puppeteer can also be used for web scraping tasks. It is much powerful and feature-rich compared to the Cheerio module.

🌷 Linters and formaters
------------------------

49.[ESLint](https://www.npmjs.com/package/eslint)

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

50.[Prettier](https://www.npmjs.com/package/prettier)

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

📦 Module bundlers and minimizers
---------------------------------

51.[Webpack](https://www.npmjs.com/package/webpack)

A well-known and powerful module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

52.[HTML-Minifier](https://www.npmjs.com/package/html-minifier)

Lightweight, highly configurable, and well tested Javascript-based HTML compressor/minifier (with Node.js support).

53.[Clean-CSS](https://www.npmjs.com/package/clean-css)

Fast and efficient CSS optimizer for Node.js platform and any modern browser. Highly configurable and lots of compatibility modes.

54.[UglifyJS2](https://www.npmjs.com/package/uglify-js)

JavaScript parser, minifier, compressor and beautifier toolkit. It can take multiple input files and supports lots of configuration options.

👨‍💻 Process managers and runners
----------------------------------

55.[Nodemon](https://www.npmjs.com/package/nodemon)

Simple monitor script for use during the development of a Node.js app. Useful for development, since it's incredibly easy to restart and has file-watching enabled and baked in by default

56.[PM2](https://www.npmjs.com/package/pm2)

Production process manager for Node.JS applications with a built-in load balancer. More comprehensive and better for production. Gives you lots of parameters to tune/act on.

57.[Concurrently](https://www.npmjs.com/package/concurrently)

Simple and straight to the point --- useful tool for running multiple commands concurrently.

🚧 CLI and debuggers
--------------------

58.[Commander](https://www.npmjs.com/package/commander)

Provides a fluent API for defining various aspects of CLI applications like the commands, options, aliases and help. Simplifies the creation of applications for the command line.

59.[Inquirer](https://www.npmjs.com/package/inquirer)

An easily embeddable and beautiful command-line interface for Node.js. Provides awesome inquiry session flow.

60.[Chalk](https://www.npmjs.com/package/chalk)

Chalk is an extremely simple library, created for one, simple purpose --- styling your terminal strings.

61.[Debug](https://www.npmjs.com/package/debug)

A tiny JavaScript debugging utility. Simply pass a function the name of your module, and it will return a decorated version of console.error for you to pass debug statements to.

🧰 Utilities
------------

62.[Lodash](https://www.npmjs.com/package/lodash)

A modern JavaScript utility library delivering modularity, performance & extras. Exposes many useful methods on JavaScript arrays, objects and other data structures.

63.[Underscore](https://www.npmjs.com/package/underscore)

Underscore provides lots of commonly used functional helpers as well as more specialized goodies: function binding, javascript templating, creating quick indexes, deep equality testing, etc.

64.[Async](https://www.npmjs.com/package/async)

Async is a utility module that provides straight-forward, powerful functions for working with asynchronous JavaScript.

🔩 System modules
-----------------

65.[Fs-extra](https://www.npmjs.com/package/fs-extra)

Fs-extra contains methods that aren't included in the vanilla Node.js `fs` package like `copy()`, `remove()`, `mkdirs()`.

66.[Node-dir](https://www.npmjs.com/package/node-dir)

A module for some common directory and file operations, including for getting an array of files, subdirectories, and methods for reading and processing the contents of files.

67.[Node-cache](https://www.npmjs.com/package/node-cache)

A simple caching module that has set, get and delete methods and works a little bit like [memcached](https://memcached.org/). Keys can have a timeout (ttl) after which they expire and are deleted from the cache.

🧷 Others:
----------

68.[Helmet](https://www.npmjs.com/package/helmet)

Helps you secure your apps by setting various HTTP headers. It's Connect-style middleware, which is compatible with frameworks like Express.

69.[PDFKit](https://www.npmjs.com/package/pdfkit)

DFKit is a PDF document generation library for Node and the browser that makes creating complex, multi-page, printable documents easy.

70.[CSV](https://www.npmjs.com/package/csv)

Comprehensive CSV suite combining 4 well-tested packages to generate, parse, transform and stringify CSV data.

71.[Marked](https://www.npmjs.com/package/marked)

Low-level compiler for parsing markdown without caching or blocking for long periods of time.

72.[Randomcolor](https://www.npmjs.com/package/randomcolor)

A tiny script for generating attractive random colors. You can pass an options object to influence the type of color it produces.

73.[Pluralize](https://www.npmjs.com/package/pluralize)

This module uses a pre-defined list of rules, applied in order, to singularize or pluralize a given word. There are many cases where this is useful, such as any automation based on user input.