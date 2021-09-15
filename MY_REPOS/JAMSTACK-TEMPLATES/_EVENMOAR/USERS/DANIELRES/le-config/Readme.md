# le-config

A simple config handler and validator for all your projects and environments.

[![travis build](https://img.shields.io/travis/danielres/le-config.svg)](https://travis-ci.org/danielres/le-config)
[![Coverage Status](https://coveralls.io/repos/github/danielres/le-config/badge.svg?branch=master)](https://coveralls.io/github/danielres/le-config?branch=master)

<div text-align="center">

Your no-brainer/easy/secure/lightweight/DRY config maker.\
Zero dependencies.

</div>

- [Why](#why)
- [Enter le-config](#le-config)
  - [Usage](#usage)
  - [Example "fail fast" terminal output](#error-output)

<hr/>

<a name="why"></a>

## Why

It is a very common practice, and a highly recommended one, to [store config in the environment](https://12factor.net/config).

Very well, but quickly, some limitations and gotchas appear, especially when having a significant number of config vars, as well as many environments to manage (local development, test, CI, multiple staging versions, production,...).

The becomes very error-prone, as it is easy to forget setting environment variables properly across all these different contexts. Even locally, when switching between local branches.

What makes it worse, is that forgetting to define environment variables rarely prevents the app from running or building. This can easily let problems slip unnoticed into the different environments, notably into production.

### A common, better practice

A common solution you might be familiar with is to centralize all config management in a unique `config.js`, solely responsible for reading environment variables, and validating them. This approach is already a huge win as, done properly, it can solve most, if not all problems desribed above.

But this introduces new downsides, like:

1. reinventing the wheel for each new project, writing your own validators, or:
2. relying on external validation libraries, which are most often overkill for this specific use case
3. A lack of DRYness, like demonstrated in the pseudo-code below:

   ```javascript
   // pseudo-code
   const config = {
     FOO: process.env.FOO,
     BAR: process.env.BAR,
   };

   const validators = {
     FOO: someValidator,
     BAR: someOtherValidator,
   };

   export default validate(config, validators);
   ```

   While this offers more safety, we can see how it can be easily cumbersome and error-prone, as for every config property added or removed, we need to keep the validators in sync manually.

<a name="le-config"></a>

## Enter le-config

`le-config` aims to solve all the problems listed above.

1. It is a very lightweight micro-library, with no external dependencies.
2. It packs the most common validators, but allows easy customization. You can easily write your own validators (and use an external validation library if you choose to).
3. It offers a very DRY and minimal syntax.

<a name="usage"></a>

### Usage

1. Create a new file `config.js`
2. Import or require `le-config` as follow:

   ```javascript
   // config.js (ES6)
   import { checks, makeConfig } from "@danielres/le-config";
   ```

   or

   ```javascript
   // config.js (CommonJS)
   const { checks, makeConfig } = require("@danielres/le-config");
   ```

3. Generate a secure, centralized config for you app:

   ```javascript
   // config.js (ES6)
   import { checks, makeConfig } from "@danielres/le-config";

   const REGEXP_EMAIL =
     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const emailCheck = checks.string.regexp(REGEXP_EMAIL);

   export default makeConfig({
     port: [process.env.PORT, checks.int.port()],
     flags: {
       feature1: [process.env.FLAGS_FEATURE1, checks.boolean.boolean],
       feature2: [process.env.FLAGS_FEATURE2, checks.boolean.boolean],
     },
     emails: {
       admin: [process.env.EMAILS_ADMIN, emailCheck],
       editor: [process.env.EMAILS_EDITOR, emailCheck],
     },
   });
   ```

4. Use the resulting secure config thourought your app:

   ```javascript
   // src/index.js (ES6)
   import express from "express";
   import config from "./config";

   const { emails, flags, port } = config;

   const app = express();

   if (flags.feature1) console.log("Feature1 enabled.");
   if (flags.feature2) console.log("Feature2 enabled.");

   app.get("/", (req, res) =>
     res.send(`Hello world! Contact the admin at: ${emails.admin}`)
   );

   app.listen(port, () => {
     console.log(`Listening on http://localhost:${port}`);
   });
   ```

5. Fail **FAST** when the config is not valid.

   This prevents your app from being started or deployed if any check fails, while offering helpful console output.

   - **Example 1:** If your app has a build step:

     ```json
     // in package.json
     {
       "scripts": {
         "prebuild": "node ./config.js",
         "dev": "node ./config.js && nodemon src",
         "start": "node ./config.js && node src"
       }
     }
     ```

   - **Example 2:** If your app has no build step:

     ```json
     // in package.json
     {
       "scripts": {
         "dev": "node ./config.js && nodemon src",
         "start": "node ./config.js && node src"
       }
     }
     ```

<a name="error-output"></a>

### Example "fail fast" terminal output

```
[nodemon] starting `node -r esm ./index.js`

╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
 3 config validation errors:
 ✗ port: should be an integer within 1025 and 65534 | Actual: 8000000
 ✗ feature1: should be a boolean | Actual: oopsie
 ✗ feature2: should be a boolean | Actual: undefined
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌

[nodemon] app crashed - waiting for file changes before starting...
```
