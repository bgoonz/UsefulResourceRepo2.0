# OAuth + subdomains + Nextjs proof of concept

<div style="text-align: center; max-width: 30rem; margin: auto">

## Disclaimer

This is a proof of concept, please consider it as **alpha version**.\
**Use at your own risk!**

Feedback, suggestions and contributions are most welcome!

</div>

<hr/>

## Characteristics of this implementation

- **No reliance on external oauth services** like Auth0, Firebase Auth, Okta,... Note that this might be an advantage or a disadvantage depending on your requirements. Such services typically come with some extras like analytics, user management or anomaly detection, it's a question of tradeoffs.
- **Minimal boilerplate** by leveraging high-quality libraries like grant.js, Nextjs and cookie-session.
- **serverless**: the backend-side relies only on (vercel) functions
- uses [**grant.js**](https://github.com/simov/grant) under the hood, which is customizable to the extreme, and supports a [very large number of OAuth providers](https://github.com/simov/grant#200-supported-providers--oauth-playground) out of the box
- supports **workspaces** (subdomains)
- shares the user's authentication across the top domain and all subdomains
- if the user triggers authentication from any page under any domain/subdomain/path, the user is sent back to the same exact page after the authentication
- **stateless** session (does not require a db), stores the session in a secure, encrypted cookie
- uses a short cookie/session maxAge of 15 minutes, but sliding: session life is auto-extended as long as the user remains active
- to minimize cookie rewrites, the session auto-extention mechanism happens max. once per minute

## Gotchas

- cookie sharing with subdomains under `localhost` (for example with `sub.localhost`) is not supported by browsers. It is thus necessary to add entries manually inside `/etc/hosts`

## Preparing the app in development

### 1) Update your `/etc/hosts` file

In order for subdomains to work locally, please make sure to add these lines to your `/etc/hosts` file

```
127.0.0.1    localhost.com
127.0.0.1    sub1.localhost.com
127.0.0.1    sub2.localhost.com
```

### 2) Create your local `.env.js`

In a terminal:

```
cp .env.example.js .env.js
```

In your newly created `.env.js`, make sure to update all values marked with `CHANGEME` by your own.

```
COOKIE_SESSION_SECRET: "CHANGEME",
OAUTH_GOOGLE_KEY: "CHANGEME.apps.googleusercontent.com",
OAUTH_GOOGLE_SECRET: "CHANGEME",
...
```

## Starting and using the app in development

In a terminal:

```
yarn dev
```

Then:

1. Navigate to `http://localhost.com:3000` or `http://sub1.localhost.com:3000`
2. Click on "Continue with Google" to authenticate
3. You should now be authenticated and see your profile data
4. Navigate to either `http://localhost.com:3000`, `http://sub1.localhost.com:3000` or `http://sub2.localhost.com:3000`. You should stay authenticated across [sub]domains and still be able to see your profile data.

## Integrating to your code

This demo/proof of concept is intentionally kept extremely bare-bones and minimal so it remains easy to read, understand and reproduce.

The first thing you might want to do is to persist your authenticated users in a database. The place to do so would be in the `pages/api/oauth/callback.js`, where you can process the OAuth response as you wish.

## Building and deploying

[TODO]
