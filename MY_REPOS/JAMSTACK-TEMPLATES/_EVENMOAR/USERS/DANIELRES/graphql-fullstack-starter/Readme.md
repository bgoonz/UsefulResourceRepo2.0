# Graphql fullstack starter

This is my personal ongoing research in building the best possible stack for myself.

## Principles

I'm trying, as much as possible, to:

- reduce potential for human error
- apply principles of least surprise
- maximize idiomatic code
- reduce the number of dependecies and simplify future maintenance
- maximize code reliability and robustness

All of that while retaining high customizability, for when defaults are lacking.

## Getting started (local development)

In local environments like "development" and "test", all commands should be started from the root folder.
Doing so injects the environment (with env-cmd).

Don't do:

```
  cd api
  yarn dev
```

Do:

```
  yarn api dev
```

### Step 1: Create the file `.env.js`

You can either:

```
cp .env.example.js .env.js
```

or extend `.env.example.js`:

```javascript
// .env.js

const env = require("./.env.example");

env.MY_CUSTOM_ENVIRONMENT_VARIABLE1 = "custom1";
env.MY_CUSTOM_ENVIRONMENT_VARIABLE2 = "custom2";

module.exports = env;
```

### Step 2: Start the postgres db

```
yarn db up
```

This will start the db as a background process.
First time will automatically create the user and db according to the values from in `.env.js` for `PG_DB`, `PG_PASSWORD`, and `PG_USER`.

Note that this background process will persist across reboots.

To kill the process instantly:

```
yarn db kill
```

This completely wipe destroy the db and restart from zero (for example after changing the `PG_*` environment variables):

```
yarn db rm
```

### Step 3: Migrate the db

```
yarn api db:migrate:up
```

### Step 4: Start the whole stack (api + ui)

```
yarn dev
```

## Development tips

TODO
