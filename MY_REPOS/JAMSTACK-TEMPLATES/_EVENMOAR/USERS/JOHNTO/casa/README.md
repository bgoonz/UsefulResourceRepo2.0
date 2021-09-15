# casa [![Build Status](https://secure.travis-ci.org/johnotander/casa.png?branch=master)](https://travis-ci.org/johnotander/casa)

_Work in progress._

Yet another static site generator.
Casa is a minimal, opinionated site generator that leverages lodash and folder conventions to ensure it's as lightweight as possible.

## Installation

```
npm i -g casa-cli
```

## Usage

```
casa init my-site
cd my-site
npm i && casa s
```

## Folder Structure

```
build/
components/
data/
templates/
pages/
public/
  css/
  images/
  js/
```

### Templates

Templates can be used to specify different layouts or page types within your site.
Templates can also call other templates, however it is required that every template contains a `<%= content %>` call to populate the content.

### Pages

The `pages/` directory can consist of HTML templates or markdown files. They will be automatically parsed, compiled, and added to the distribution directory.
You can further customize the behavior and data for a page by adding front matter.

#### Front Matter

```
{{{
  "template": "posts",
  "title": "Some Page",
  "url": "some/page/url",
  "data": "some/page/data"
}}}
```

##### Options

* `template`: specify the template to be used by the page.
* `title`: the title to be used.
* `url`: the url for the page, it defaults to its location in the main directory.
* `data`: the json file in the `data/` directory to be read in. For example `foobar` => `data/foobar.json`.

### Components

Components consist of shared HTML snippets that accept data.

So, consider the following component in `components/greetings/hello.js`:

```js
var _ = require('lodash')

module.exports = function hello (name) {
  return 'Hello, '+ _.capitalize(name) + '!'
}
```

You can call then call it in a page:

```html
<h1><%= component('foo/bar', 'jane') %></h1>
```

And the compiled output will be:

```html
<h1>Hello, Jane!</h1>
```

### Build

This directory can contains a `build/index.js` file which is run before casa generates the site.
This is where you can hook in any data preparation, fetching, etc.

Here's an example of a `build/index.js` file:

```js
var someTask = require('./some-task')
var someOtherTask = require('./some-other-task')

someTask(function (someRandomData) {
  someOtherTask(someRandomData)
})
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

***

> Crafted with <3 by [John Otander (@4lpine)](https://twitter.com/4lpine).
