# Gatsby Environment Variables Plugin

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin to allow system environment variables to be made available to client-side scripts.

By default, Gatsby only makes system environment variables [prefixed with `GATSBY_`](https://www.gatsbyjs.org/docs/environment-variables/#accessing-environment-variables-in-javascript) available to client scripts. Using this plugin, you can make any arbitrary environment variable available at runtime.

## Install

```
npm install gatsby-plugin-env-variables
```

## How to use

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["MY_VAR", "MY_OTHER_VAR"]
      },
    },
  ],
}
```

This will make `MY_VAR` & `MY_OTHER_VAR` available at runtime in your app by accessing `process.env.MY_VAR` or `process.env.MY_OTHER_VAR`.
