# gatsby-plugin-doctype

Change the DOCTYPE of HTML files in Gatsby. By default, Gatsby adds `<!DOCTYPE html>` to the start to every HTML file it generates. You can now edit the `html` portion.

## Install

```shell
npm install gatsby-plugin-doctype
```

## How to use

Include the plugin in your `gatsby-config.js` file and use the `doctype` option.

```js=title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-doctype`,
      options: {
        doctype: 'HTML',
      },
    },
  ],
}
```

If you want to use something like `HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"` you'll need to make sure that you wrap the option with single quotes/backticks or escape the quotes.

Run a `gatsby build` as this plugin only changes files with the `onPostBuild` lifecycle.

---

You can see the finished result in the HTML files inside `public`.
