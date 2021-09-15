This demonstrates issue https://github.com/auth0/auth0-spa-js/issues/245

Usage:

1. Be sure to copy `auth_config.json.example` as `auth_config.json` and fill in the properties.

2. Run the example:

```
cd 02-Calling-an-API
yarn install
yarn dev
```

3. Be sure to login with Google

4. See the problem in the browser console:

```
Uncaught (in promise) Error: Invalid state
    at t.<anonymous> (Auth0Client.ts:248)
    at tslib.es6.js:99
    at Object.next (tslib.es6.js:80)
    at tslib.es6.js:73
    at new Promise (<anonymous>)
    at r (tslib.es6.js:69)
    at t.handleRedirectCallback (Auth0Client.ts:233)
    at initAuth0 (react-auth0-spa.js:27)
```

- The spinner loads indefinitely
