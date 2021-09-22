# antimatter [![NPM version](https://badge.fury.io/js/antimatter.png)](http://badge.fury.io/js/antimatter)

> Annihilate YAML front matter.

## Getting Started
To install the module with [npm](npmjs.org), run the following in the command line:

```bash
npm i antimatter --save
```

To install with [bower](https://github.com/bower/bower), run:

```bash
bower install antimatter --save
```

Use within your application with the following line of JavaScript:

```js
var antimatter = require('antimatter');
```

## Options

#### custom delimiters
Type: `String`

Default: `{close: '---', open: '---'}`

Open and close delimiters can be a string or an array of strings. If an array of strings is passed for a delimiter then all patterns supplied will be used to check for YAML front matter.

For example, this:

```js
{
  close: '~~~',
  open: '~~~'
}
```

Would strip this from files:

    ~~~
    title: I'm still front-matter
    description: Tilde's are people too!
    ~~~

    <h1>Not me though, I wouldn't be stripped.</h1>


## Example usage

```js
var file = require('fs-utils')
var antimatter = require('antimatter');
var glob = require('globule');

var globOpts = {
  ext: '.html',
  srcBase: 'templates',
  destBase: 'foo',
  matchBase: true,
};

glob.findMapping('**/*.html', globOpts).map(function(fp) {
  var src = file.readFileSync(fp.src);
  file.writeFileSync(fp.dest, antimatter(src));
});
```

**Jon Schlinkert**

+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)
+ [github.com/jonschlinkert](https://github.com/jonschlinkert)

## Related

+ [helpers](https://github.com/helpers): some great handlebars helpers that we decided not to include in the [handlebars-helpers](https://github.com/assemble/handlebars-helpers) project, most likely because the code footprint was too big or the helper wasn't generic enough.

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license