# branding 0.1.0

CSS utility classes for branding

#### Stats

253 | 23 | 26
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev branding
```

#### With Git

```
git clone https://github.com/tachyons-css/branding
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "branding";
```

Then process the CSS using the [`tachyons-cli`](https://github.com/tachyons-css/tachyons-cli)

```sh
$ npm i -g tachyons-cli
$ tachyons-cli path/to/css-file.css > dist/t.css
```

#### Using the CSS

The built CSS is located in the `css` directory. It contains an unminified and minified version.
You can either cut and paste that css or link to it directly in your html.

```html
<link rel="stylesheet" href="path/to/module/css/branding">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
.primary { color: #07c; }
.bg-primary { background-color: #07c; }
.border-primary { border-color: #07c; }
.secondary { color: #001f3f; }
.bg-secondary { background-color: #001f3f; }
.border-secondary { border-color: #001f3f; }
.tertiary { color: #FFDC00; }
.bg-tertiary { background-color: #FFDC00; }
.border-tertiary { border-color: #FFDC00; }
.primary-contrast { color: #fff; }
.bg-primary-contrast { background-color: #fff; }
.border-primary-contrast { border-color: #fff; }
.secondary-contrast { color: #fff; }
.bg-secondary-contrast { background-color: #fff; }
.border-secondary-contrast { border-color: #fff; }
.tertiary-contrast { color: #444; }
.bg-tertiary-contrast { background-color: #444; }
.border-tertiary-contrast { border-color: #444; }
.bg-header { background-color: #fafafa; }
.header { color: #444; }
body { background-color: #fff; color: #444; }
a { color: #07c; text-decoration: none; }
a:hover { color: #07a; text-decoration: underline; }
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Authors

* [mrmrs](http://mrmrs.io)
* [johno](http://johnotander.com)

## License

MIT

