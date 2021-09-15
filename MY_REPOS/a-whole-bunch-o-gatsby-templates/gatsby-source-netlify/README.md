# gatsby-source-netlify

Source plugin for [Netlify's API](https://www.netlify.com/docs/api/).

_**Please Note:** This plugin was initially created to deliver data for my [dashboard](https://status.lekoarts.de/) and hence only queries the user and sites. If you need more functionality, I'd be happy to review your PR and merge it into this plugin!_

## Install

```shell
npm install --save gatsby-source-netlify
```

## How to use

### Prerequisites

Go to [OAuth applications](https://app.netlify.com/account/applications) and create a new access token ("Personal access tokens").

Save the API key in an environment file like:

```
NETLIFY_KEY=your-access-token-here
```

### gatsby-config

Add the plugin and define the API key.

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-netlify",
      options: {
        apiKey: process.env.NETLIFY_KEY
      }
    }
  ]
};
```

#### Options

As per [netlify/js-client](https://github.com/netlify/js-client#api) you can also define options when passing the access token, for example:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-netlify",
      options: {
        apiKey: process.env.NETLIFY_KEY,
        opts: {
          userAgent: "netlify/js-client",
          scheme: "https",
          host: "api.netlify.com",
          pathPrefix: "/api/v1",
          globalParams: {} // parameters you want available for every request.
          // Global params are only sent of the open-api spec specifies the provided params.
        }
      }
    }
  ]
};
```
