
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# React Builds

A "build" is the process of converting code into something that can actually
execute or run on the target platform. A "front-end build" is a process of
preparing a front-end or client-side application for the browser.

With React applications, that means (at a minimum) converting JSX to something
that browsers can actually understand. When using Create React App, the build
process is automatically configured to do that and a lot more.

When you finish this article, you should be able to:

* Describe what front-end builds are and why they're needed;
* Describe at a high level what happens in a Create React App when you run `npm
  start`; and
* Prepare to deploy a React application into a production environment.

## Understanding front-end builds

The need for front-end builds predates React. Over the years, developers have
found it helpful to extend the lowest common denominator version of JavaScript
and CSS that they could use.

Sometimes developers extend JavaScript and CSS with something like
[TypeScript][typescript] or [Sass][sass]. Using these non-standard languages and
syntaxes require you to use a build process to convert your code into standard
JavaScript and CSS that can actually run in the browser.

Browser-based applications also require a fair amount of optimization to deliver
the best, or at least acceptable, experience to end users. Front-end build
processes could be configured to lint code, run unit tests, optimize images,
minify and bundle code, and more--all automatically at the press of a button
(i.e. running a command at the terminal).

### JavaScript versions and the growth of front-end builds

Developers are generally an impatient lot. When new features are added to
JavaScript, we don't like to wait for browsers to widely support those features
before we start to use them in our code. And we _really_ don't like when we have
to support older, legacy versions of browsers.

In recent years, JavaScript has been updated on a yearly basis and browser
vendors do a decent job of updating their browsers to support the new features
as they're added to the language. Years ago though, there was an infamous delay
between versions 5 and 6 of JavaScript. It took _years_ before ES6 (or ES2015 as
it eventually was renamed to) to officially be completed and even longer before
browsers supported all of its features.

In the period of time before ES2015 was broadly supported by browsers,
developers used front-end builds to convert or _transpile_ ES2015 features and
syntax to an older version of the language that was more broadly supported by
browsers (typically ES5). The transpilation from ES2015/ES6 down to ES5 was one
of the major drivers for developers to add front-end builds to their client-side
projects.

### Reviewing common terminology

When learning about front-end or React builds, you'll encounter a lot of
terminology that you may or may not be familiar with. Here's some of the
terminology that you'll likely encounter:

**Linting** is process of using a tool to analyze your code to catch common
programming errors, bugs, stylistic inconsistencies, and suspicious coding
patterns. [ESLint][eslint] is a popular JavaScript linting tool.

**Transpilation** is the process of converting source code, like JavaScript,
from one version to another version. Usually this means converting newer
versions of JavaScript, [ES2019][es2019] or [ES2021][es2021], to a version
that's more widely supported by browsers, like [ES2015][es2015], or even
[ES5][es5] or [ES3][es3] (if you need to support the browser that your parents
or grandparents use).

**Minification** is the process of removing all unnecessary characters in your
code (e.g. white space characters, new line characters, comments) to produce an
overall smaller file. Minification tools will often also rename identifers in
your code (i.e. parameter and variable names) in the quest for smaller and
smaller file sizes. Source maps can also be generated to allow debugging tools
to cross reference between minified code and the original source code.

**Bundling** is the process of combining multiple code files into a single file.
Creating a bundle (or a handful of bundles) reduces the number of requests that
a client needs to make to the server.

**Tree shaking** is the process of removing unused (or dead) code from your
application before it's bundled. Tree shaking external dependencies can
sometimes have a dramatic positive impact on overall bundled file sizes.

### Configuration or code?

Front-end build tools have come and gone over the years; sometimes very quickly,
which helped bring about the phenomenon known as [JavaScript fatigue][js
fatigue].

Configuration based tools allow you to create your build tasks by declaring
(usually using JSON, XML, or YAML) what you want to be done, without explicitly
writing every step in the process. In contrast, coding or scripting based tools
allow you to, well, write code to create your build tasks. Configuration based
tools _can_ sometimes feel simpler to use while giving up some control (at least
initially) while coding based tools _can_ feel more familiar and predictable
(since you're describing tasks procedurally). Every generalization is false
though (including this one), so there are plenty of exceptions.

[Grunt][grunt] is a JSON configuration based task runner that can be used to
orchestrate the various tasks that make up your front-end build. Grunt was very
quickly supplanted by [Gulp][gulp], which allowed developers to write JavaScript
to define front-end build tasks. After Gulp, the front-end tooling landscape
became a bit more muddled. Some developers preferred the simplicity of using
[npm scripts] to define build tasks while others preferred the power of
configuration based bundlers like [webpack].

### Babel and webpack (yes, that's intentionally a lowercase 'w')

As front-end or client-side applications grew in complexity, developers found
themselves wanting to leverage more advanced JavaScript features and newer
syntax like classes, arrow functions, destructuring, async/await, etc. Using a
code transpiler, like [Babel][babel], allows you to use all of the latest and
greatest features and syntax without worrying about what browsers support what.

Module loaders and bundlers, like [webpack], also allowed developers to use
JavaScript modules without requiring users to use a browser that natively
supports ES modules. Also, module bundling (along with minification and
tree-shaking) helps to reduce the bandwidth that's required to deliver the
assets for your application to the client.

[Create React App][cra] uses webpack (along with Babel) under the covers to
build your React applications. Even if you're not using Create React App,
webpack and Babel are still very popular choices for building React
applications.

## Pulling back the covers (a bit) on the Create React App build process

Running an application created by Create React App using `npm start` can feel
magical. Some stuff happens in the terminal and your application opens into your
default browser. Even better, when you make changes to your application, your
changes will (usually) automatically appear in the browser!

### The Create React App build process

At a high level, here's what happens when you run `npm start`:

* Environment variables are loaded (more about this in a bit);
* The list of browsers to support are checked (more about this too in a bit);
* The configured HTTP port is checked to ensure that it's available;
* The application compiler is configured and created;
* [`webpack-dev-server`] is started;
* [`webpack-dev-server`] compiles your application;
* The `index.html` file is loaded into the browser; and
* A file watcher is started to watch your files, waiting for changes.

### Ejecting

Create React App provides a script that you can run to "eject" your application
from the Create React App tooling. When you eject your application, all of the
hidden stuff is exposed so that you can review and customize it.

> The need to customize Create React App rarely happens. Also, don't eject an
> actual project as it's a one-way trip! Once a Create React App project has
> been ejected, there's no going back (though you could always undo the ejection
> process by reverting to an earlier commit if you're using source control).

To eject your application from Create React App, run the command `npm run
eject`. You'll be prompted if you want to continue; type "y" to continue with
the ejection process. Once the ejection process has completed, you can review
the files that were previously hidden from you.

In the `package.json` file, you'll see the following npm scripts:

```json
{
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  }
}
```

You can open the `./scripts/start.js` file to see the code that's executed when
you run `npm start`.

If you're curious about the webpack configuration, you can open and review the
`./config/webpack.config.js`.

## Preparing to deploy a React application for production

Before you deploy your application to production, you'll want to make sure that
you've replaced static values in your code with environment variables and
considered what browsers you need to support.

### Defining environment variables

Create React App supports defining environment variables in an `.env` file. To
define an environment variable, add an `.env` file to your project and define
one or more variables that start with the prefix `REACT_APP_`:

```
REACT_APP_FOO: some value
REACT_APP_BAR: another value
```

Environment variables can be used in code like this:

```js
console.log(process.env.REACT_APP_FOO);
```

You can also reference environment variables in your `index.html` like this:

```html
<title>%REACT_APP_BAR%</title>
```

> **Important:** Environment variables are embedded into your HTML, CSS, and
> JavaScript bundles during the build process. Because of this, it's _very
> important_ to not store any secrets, like API keys, in your environment
> variables as anyone can view your bundled code in the browser by inspecting
> your files.

### Configuring the supported browsers

In your project's `package.json` file, you can see the list of targeted
browsers:

```json
{
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Adjusting these targets affect how your code will be transpiled. Specifying
older browser versions will result in your code being transpiled to older
versions of JavaScript in order to be compatible with the specified browser
versions. The `production` list specifies the browsers to target when creating a
production build and the `development` list specifics the browsers to target
when running the application using `npm start`.

The [browserl.ist] website can be used to see the browsers supported by your
configured `browserslist`.

### Creating a production build

To create a production build, run the command `npm run build`. The production
build process bundles React in production mode and optimizes the build for the
best performance. When the command completes, you'll find your production ready
files in the `build` folder.

Now your application is ready to be deployed!

> For more information about how to deploy a Create React App project into
> production, see [this page][cra deployment] in the official documentation.

## What you learned

In this article, you learned how to:

* Describe what front-end builds are and why they're needed;
* Describe at a high level what happens in a Create React App when you run `npm
  start`; and
* Prepare to deploy a React application into a production environment.

[coffeescript]: https://coffeescript.org/
[typescript]: https://www.typescriptlang.org/
[sass]: https://sass-lang.com/
[eslint]: https://eslint.org/
[es2019]: https://www.ecma-international.org/ecma-262/10.0/index.html
[es2021]: https://tc39.es/ecma262/ 
[es2015]: http://www.ecma-international.org/ecma-262/6.0/
[es5]: https://www.ecma-international.org/ecma-262/5.1/
[es3]: https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf
[grunt]: https://gruntjs.com/
[gulp]: https://gulpjs.com/
[npm scripts]: https://docs.npmjs.com/misc/scripts
[webpack]: https://webpack.js.org/
[js fatigue]: https://sdtimes.com/softwaredev/is-the-javascript-fatigue-real/
[json]: https://www.json.org/json-en.html
[xml]: https://www.w3.org/XML/
[yaml]: https://yaml.org/
[babel]:https://babeljs.io/
[`webpack-dev-server`]: https://webpack.js.org/configuration/dev-server/
[browserl.ist]: https://browserl.ist
[cra deployment]: https://facebook.github.io/create-react-app/docs/deployment
