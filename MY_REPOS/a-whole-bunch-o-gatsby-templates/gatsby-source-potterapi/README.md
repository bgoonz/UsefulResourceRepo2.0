# gatsby-source-potterapi

Source plugin for https://www.potterapi.com/. You can find an example in the [example](https://github.com/LekoArts/gatsby-source-potterapi/tree/master/example) directory.

## Install

```shell
npm install --save gatsby-source-potterapi
```

## How to use

### Prerequisites

Go to [potterapi.com](https://www.potterapi.com/) and create an account. Afterwards you can see your API key on your [profile](https://www.potterapi.com/login/).

Save the API key in an environment file like:

```
POTTER_KEY=your-api-key-here
```

### gatsby-config

Add the plugin and define the API key.

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-potterapi',
      options: {
        key: process.env.POTTER_KEY,
      },
    },
  ],
}
```
