# OAuth example using grant.js and cookie-session

## Prerequisites

### 1) Setup `.env.js`

In a terminal:

`cp .env.example.js .env.js`

**OR:**

Create a new file `.env.js` and just extend `env.example.js`:

```javascript
// .env.js

const env = require("./.env.example");

module.exports = env;
```

### 2) Setup Google Auth

1. Visit: https://console.developers.google.com/apis/credentials
2. Create a web application.
3. Add an entry under "Authorized redirect urls",\
   For example: `http://localhost:4000/connect/google/callback`
4. Copy the provided `key` and `secret`, and declare them in `.env.js`.\
   For example:

```javascript
// .env.js

const env = require("./.env.example");

env.GRANT_GOOGLE_KEY: "XXX-XXX.apps.googleusercontent.com",
env.GRANT_GOOGLE_SECRET: "XXXXXXXXXXXXXXXXXXXXXXXX",

module.exports = env;
```

## You can now start the app

In a terminal:

`yarn watch`

## Preview

![Preview](https://raw.githubusercontent.com/danielres/oauth-grant-cookie-session-example/gh-pages/assets/flow.gif)
