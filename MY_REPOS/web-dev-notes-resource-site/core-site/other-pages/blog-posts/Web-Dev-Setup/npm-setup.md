

- ⏱ 15 minutes

- Catalog
- Full Stack Online
- React
- Npm

You're likely already somewhat familiar with Node Package Manager (NPM) and how it can be used to install JavaScript dependencies called **node modules** to your app (e.g. `npm install webpack -g`).

This reading will cover the configuration process for automating node module installation for apps that have multiple JS dependencies.

## Generating `package.json` with `npm init`

Much like Ruby's `Gemfile`, the Node Package Manager can be used with a manifest file that lists all of an app's JavaScript dependencies. This file is called `package.json`. While you can write this file by hand, NPM's CLI (command line interface) significantly simplifies the process.

To initialize an app with NPM, run this in the root directory of the app:

    npm init --yes

This creates a `package.json` file using default boilerplate from the `--yes` flag. It should look something like this:

    {
      "name": "test",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC"
    }

Don't worry about the default settings above; they won't affect how your app runs, and you can always adjust them later.

## Installing Packages

Once you've generated a `package.json`, you can start installing NPM packages such as `react` and `redux` via the command line:

    npm install <package_name>

This will look up a package by its name and automatically download it into a folder in your app called `node_modules`, kind of like `gem install <gem_name>`. It will also add it to your `package.json` (unless you add a `--no-save` flag).

Thus, running the following command:

    npm install react redux

adds the following to your app's `package.json`:

      "dependencies": {
        "react": "^15.3.0",
        "redux": "^3.5.2"
      },

You can use the `--save-dev` flag to specify packages for your app's development environment only if you are using different packages for your development and production servers.

Now, anyone who gets a copy of your app can download all its dependencies in one fell swoop by running the following from the app's directory (with no arguments):

    npm install

## Add a Webpack Script

Recall that, in Ruby, running `bundle exec some_command` is **not the same** as running `some_command`. In the former, the `Gemfile`\-specified version of `some_command` is run, while in the latter, the local version is run. Omitting `bundle exec` when running commands can cause errors if our app isn't compatible with the local version.

To solve this issue with NPM packages, we add `"scripts"` for any packages that we intend to call from the command line. Once we've added a script for a package, we can use:

    npm run <package_name>

to ensure that we run the `package.json` specified version.

To create a `webpack` script, add the following attribute to your `package.json`:

      "scripts": {
        "webpack": "webpack --mode=development",
      },

Now, when you run `npm run webpack` in the terminal, the `package.json`\-specified version will run.

**NB**: Always run `npm run webpack` rather than `webpack` to minimize the chance of compatibility issues.

- `npm init --yes`: Initializes an app with NPM by generating a boilerplate `package.json`.
- `npm install <package_name>`: Installs and lists a NPM package as a dependency in a `package.json`.
- `npm install`: Downloads all JavaScript dependencies listed in a `package.json`.
- Add a `webpack` script to enable `npm run webpack`.

Did you find this lesson helpful?

[Source](https://open.appacademy.io/learn/full-stack-online/react/npm)
