# WEEK 5<br>*Object-Oriented Programming* {ignore=true}
________________________________________________________________________________

<!-- code_chunk_output -->

[**npm Learning Objectives**](#npm-learning-objectives)
- [Free Same-Day Delivery: Package Managers & npm](#free-same-day-delivery-package-managers-npm)
  - [Package management](#package-management)
  - [Package management for JavaScript](#package-management-for-javascript)
  - [Getting started with npm](#getting-started-with-npm)
- [Return To Sender: Understanding Dependency Management With npm](#return-to-sender-understanding-dependency-management-with-npm)
  - [Dependency management](#dependency-management)
  - [Little boxes, all the same.](#little-boxes-all-the-same)
  - [Saying a lot with three little numbers](#saying-a-lot-with-three-little-numbers)
  - [Semantic versioning & npm](#semantic-versioning-npm)
- [Introduction to npm](#introduction-to-npm)
  - [Phase 1: Using npm to manage npm](#phase-1-using-npm-to-manage-npm)
  - [Phase 2: Using npm to manage a project's dependencies](#phase-2-using-npm-to-manage-a-projects-dependencies)
- [Going Further with npm](#going-further-with-npm)
  - [Phase 1: Creating a project with multiple dependencies](#phase-1-creating-a-project-with-multiple-dependencies)
  - [Phase 2: Using the npm registry](#phase-2-using-the-npm-registry)
- [npm and Application Security](#npm-and-application-security)
  - [Phase 1: Setting up the project](#phase-1-setting-up-the-project)
  - [Phase 2: Using npm to audit and fix security vulnerabilities](#phase-2-using-npm-to-audit-and-fix-security-vulnerabilities)
- [Project: Create Your Own File Utilities!](#project-create-your-own-file-utilities)
  - [Setting up your project](#setting-up-your-project)
  - [Hash Bang files](#hash-bang-files)
  - [Getting command-line arguments in your program](#getting-command-line-arguments-in-your-program)
  - [Specifying an exit code from your utility](#specifying-an-exit-code-from-your-utility)
  - [Copy](#copy)
  - [Delete](#delete)
  - [Touch](#touch)
  - [Head](#head)
  - [Chalk it up to ls](#chalk-it-up-to-ls)
  - [Word count](#word-count)

[**Classes Learning Objectives**](#classes-learning-objectives)
- [Constructor Function, What's Your Function?](#constructor-function-whats-your-function)
  - [Defining a constructor function](#defining-a-constructor-function)
  - [Invoking a constructor function](#invoking-a-constructor-function)
  - [Using the `instanceof` operator to check an object's type](#using-the-instanceof-operator-to-check-an-objects-type)
  - [Defining sharable methods](#defining-sharable-methods)
- [Putting the Class in JavaScript Classes](#putting-the-class-in-javascript-classes)
  - [Defining an ES2015 class](#defining-an-es2015-class)
  - [Instantiating an instance of a class](#instantiating-an-instance-of-a-class)
  - [Defining methods](#defining-methods)
  - [Comparing classes to constructor functions](#comparing-classes-to-constructor-functions)
  - [Using the `instanceof` operator to check an object's type](#using-the-instanceof-operator-to-check-an-objects-type-1)
- [The DNA of JavaScript Inheritance](#the-dna-of-javascript-inheritance)
  - [Defining a parent class](#defining-a-parent-class)
  - [Inheriting from a class](#inheriting-from-a-class)
  - [Understanding how inheritance works in JavaScript](#understanding-how-inheritance-works-in-javascript)
  - [Overriding a method in a parent class](#overriding-a-method-in-a-parent-class)
- [Using Modules in Node.js](#using-modules-in-nodejs)
  - [Introducing Node.js modules](#introducing-nodejs-modules)
  - [Adding a local module to a Node.js application](#adding-a-local-module-to-a-nodejs-application)
  - [Exporting from a module](#exporting-from-a-module)
  - [Importing from a module](#importing-from-a-module)
  - [Using single item modules](#using-single-item-modules)
  - [Understanding module loading](#understanding-module-loading)
- [Constructor Functions and Classes Project](#constructor-functions-and-classes-project)

[**Object-Oriented Programming Learning Objectives**](#object-oriented-programming-learning-objectives)
- [Object-Oriented Programming Explained](#object-oriented-programming-explained)
  - [Encapsulation: enclose (something) in or as if in a capsule](#encapsulation-enclose-something-in-or-as-if-in-a-capsule)
  - [Inheritance: derived from one's ancestors](#inheritance-derived-from-ones-ancestors)
  - [Polymorphism: a cool sounding word to impress your friends](#polymorphism-a-cool-sounding-word-to-impress-your-friends)
- [The SOLID Principles Explained](#the-solid-principles-explained)
  - [Single-Responsibility Principle](#single-responsibility-principle)
  - [The Liskov Substitution Principle](#the-liskov-substitution-principle)
  - [The other principles](#the-other-principles)
- [Controlling Coupling With The Law Of Demeter](#controlling-coupling-with-the-law-of-demeter)
  - [Coupling](#coupling)
  - [The formal definition](#the-formal-definition)
  - [Practical advice](#practical-advice)
  - [You can't cheat the Law](#you-cant-cheat-the-law)
  - [When to ignore the Law of Demeter](#when-to-ignore-the-law-of-demeter)
  - [When else should you ignore the Law of Demeter?](#when-else-should-you-ignore-the-law-of-demeter)
- [OOPS! I Forgot A Thing Project](#oops-i-forgot-a-thing-project)
  - [Interacting with your to-do-list](#interacting-with-your-to-do-list)
  - [Modeling your application](#modeling-your-application)
  - [Stretch goal](#stretch-goal)

<!-- /code_chunk_output -->
________________________________________________________________________________
# WEEK-05 DAY-1<br>*Node Package Manager* {ignore=true}
________________________________________________________________________________
# npm Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Explain what "npm" stands for.
2. Explain the purpose of the `package.json` file and `node_modules` directory.
3. Given multiple choices, identify the difference between npm's `package.json`
   and `package-lock.json` files.
4. Use `npm --version` to check what version is currently installed and use npm
   to update itself to the latest version.
5. Use `npm init` to create a new package and `npm install` to add a package as
   a dependency. Then use `require` to import the module and utilize it in a
   JavaScript file.
6. Given a package version number following the MAJOR.MINOR.PATCH semantic
   versioning spec that may include tilde (~) and caret (^) ranges, identify the
   range of versions of the package that will be compatible.
7. Explain the difference between a dependency and a development dependency.
8. Given an existing GitHub repository, clone the repo and use npm to install
   it's dependencies.
9. Use `npm uninstall` to remove a dependency.
10. Use `npm update` to update an out-of-date dependency.
11. Given a problem description, use the npm registry to find a reputable
    package (by popularity and quality stats) that provides functionality to
    solve that problem.
12. Given a package with vulnerabilities due to outdated dependency versions,
    use `npm audit` to scan and fix any vulnerabilities.
13. Write and run an npm script.ing objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Explain what "npm" stands for.
2. Explain the purpose of the `package.json` file and `node_modules` directory.
3. Given multiple choices, identify the difference between npm's `package.json`
   and `package-lock.json` files.
4. Use `npm --version` to check what version is currently installed and use npm
   to update itself to the latest version.
5. Use `npm init` to create a new package and `npm install` to add a package as
   a dependency. Then use `require` to import the module and utilize it in a
   JavaScript file.
6. Given a package version number following the MAJOR.MINOR.PATCH semantic
   versioning spec that may include tilde (~) and caret (^) ranges, identify the
   range of versions of the package that will be compatible.
7. Explain the difference between a dependency and a development dependency.
8. Given an existing GitHub repository, clone the repo and use npm to install
   it's dependencies.
9. Use `npm uninstall` to remove a dependency.
10. Use `npm update` to update an out-of-date dependency.
11. Given a problem description, use the npm registry to find a reputable
    package (by popularity and quality stats) that provides functionality to
    solve that problem.
12. Given a package with vulnerabilities due to outdated dependency versions,
    use `npm audit` to scan and fix any vulnerabilities.
13. Write and run an npm script.

________________________________________________________________________________
# Free Same-Day Delivery: Package Managers & npm

So far, you've written lots of code yourself. Think of all the other developers
out there writing code by themselves as well. Wouldn't it be great if we could
share that code and all work together - without needing one **giant** office
space? Lucky for us, we don't need to share desks: we've got the Internet!

Let's discuss _packages_ and _package management_, a simple way of sharing
working code across time & space. 

We'll cover:

- defining "packages" in relation to programming;
- understanding package management;
- and using npm to manage packages in our JavaScript projects;

## Package management

It's rare that you'd prepare a meal by grinding grain to make flour, or that
you'd hatch your own chickens just to get some scrambled eggs! Most industries
have learned to bundle the work of others into off-the-shelf goods, like a loaf
of bread or a dozen eggs, that everyone can benefit from.

Up to now, you've mostly written projects from scratch. This is a little like
grinding your own grain: it's a great learning experience, but you'll quickly
find that you're writing the same code over and over to accomplish common tasks
like authentication, file parsing, or accepting user input. Thankfully, we've
got a better way: _packages_.

A _package_ is a collection of files & configuration wrapped up in an
easy-to-distribute wrapper. By using packages, we can rely on the work of other
developers to help move our own projects along at a rapid pace. Even better, we
can create our own packages to share our code with the world!

Applications you write may be dependent on packages to work. We refer to these
packages as _dependencies_ of your code. Depending on the size of your project,
you may have hundreds or even thousands of dependencies! In addition, a package
may have its own dependencies on other packages. We'll discuss dependency
management in an upcoming lesson.

### Special delivery!

The oldest and most basic way of sharing code is good old "copy & paste". One
developer could write a file they're proud of and share it directly with another
person on their team. This is fast and simple, but unsustainable for quite a few
reasons:

- Each time the file changes, the author would need to re-share the file.
- The author would need to keep multiple versions of the same file, just in case
  an old project breaks unexpectedly.
- Other developers might want to improve the file, but how? Now there are lots
  of different files that no one's keeping track of.

You can probably think of other reasons, too. It's like mailing a gift: you
wouldn't throw your unwrapped gift in a mailbox and hope it ends up in the right
place! You package your gift up and add important information the postal service
can use to manage it appropriately.

### Package managers

Software packages work in a similar way. _Package managers_ are applications
that accept your code, bundled up with some important metadata, and provide
services like _versioning_, _change-management_, and even tracking how many
projects are using your code. This would be a ton of work for one person to
handle by themselves! Package managers have been used for decades to manage
server software, but are relatively new to web development.

When we talk about a package manager, we may be referring to a few different
things. Most package managers consist of at least two parts: a _command line
interface (CLI)_ and a _registry_. The CLI is an application you run locally, and
lets you download and install/uninstall packages as needed. The registry is a
database of package information, tracking which are available at any time.

These parts work together to make your experience smoother. Without a CLI, you'd
have to manually download and configure each dependency of your app. Without a
registry, you'd have to remember exactly where each package is stored to
download it. Yikes!

Package managers may include lots of other functionality, like _bundling_,
_build pipelines_, and _dependency management_. At their core, though, the CLI &
registry are their primary parts. Without these, they're likely to fall into the
broader category of _build tools_, which we'll introduce more about later on.

## Package management for JavaScript

Like all languages, JavaScript went through a long period of unmanaged sharing.
Since early JavaScript was used exclusively for the browser runtime, embedded
`<script>` tags were the preferred way to share code. However, Node.js changed
the game! Backend developers working with JavaScript brought common patterns
from their own backgrounds, including package management.

Node.js was released in 2009. In early 2010, _npm_ was released and included in
Node.js. _npm_, the "Node Package Manager", was designed to give Node.js
engineers a similar experience to backend development in other languages. It was
[inspired by `yinst`][1], a package manager used at "Yahoo!", where npm's
creator had worked previously.

npm took off quickly as the _de facto_ standard for Node.js packages. However,
the JavaScript development world was still fragmented! Some frontend developers
working in the browser runtime created their own package managers for
frontend-oriented packages ([Bower][2] was one popular manager still in use
today). Ultimately, the confusion of dealing with multiple package managers for
the same programming language grew too great, and frontend developers started
adding their packages to npm. Today, npm is the most widely-used package manager
for all JavaScript packages, regardless of whether they're backend dependencies,
frontend dependencies, or command-line tools.

> An aside on "npm": If you're attentive to grammar, seeing the name of this
> package manager written in all lowercase letters may be infuriating! It's a
> [hot topic][3] online, too. We'll stick with formatting used by npm itself,
> but you may see it capitalized elsewhere. Just remember: we're all referring
> to the same tool!

## Getting started with npm

Here's a great thing about npm: since it's part of Node.js, you don't have to
install it separately. Once you've added Node.js to your system, you've got npm
for free. Nice!

We'll walk through setting up & using the `npm` CLI tool soon, but if you'd like
to experiment on your own, here are a few basic terminal commands to get you
started:

- `npm` will show npm's help info, including some common commands and how to
  access more detailed guides.

- `npm init` will set your current project directory up for npm. This requires
  answering a few questions to generate a `package.json` file, a critical part
  of npm's dependency management functionality.

- `npm install` will download and install a package into your project. You can
  use the `-g` (or `--global`) flag to install a package for use everywhere on
  your system. To have some fun, run `npm install -g cowsay`. Once the
  download's completed, try running `cowsay Hello, world!`. 

### Just the basics

Here's a (very short) overview of how npm works its magic. Let's imagine we're
installing a package called `pack-overflow`:

- You request the package with `npm install pack-overflow`.
- The `npm` CLI tool updates your `package.json` file to include `pack-overflow`
  as a dependency and requests the package from the npm registry.
- `npm` downloads the package and installs it to the `node_modules` folder in
  your current directory (one will be created if it's not already there). It
  chooses the most recent version by default.
- `npm` creates a `package-lock.json` file that includes where the installed
  package is located and exactly which version was used.
- You're all set! You can now `require('pack-overflow');` in your project.

We'll walk through this process in more detail later in this lesson.

## What we've learned

Package management is a massive topic that we're just scratching the surface of.
You'll get lots of practice using packages and npm as we get into more complex
projects. For now, after reading this lesson, you should be comfortable with:

- discussing the role of packages & package managers;
- and explaining what npm stands for.

Next up, we'll learn more about what npm does can do for us.

[1]: https://www.reddit.com/r/npm/comments/aounfi/best_package_manager/eg4r6oo/
[2]: https://bower.io/
[3]: https://css-tricks.com/start-sentence-npm/
________________________________________________________________________________
# Return To Sender: Understanding Dependency Management With npm

Now that you've seen npm in action, let's dig into the details. How can we
read npm's file changes ourselves?

We'll cover:
- dependency management;
- semantic versioning;
- and how npm implements these features;

## Dependency management

To understand dependency management, let's revisit our kitchen. Making a
sandwich depends on us having bread. The type of sandwich depends on a certain
type of bread: a hamburger might call for a sesame seed bun, while a falafel
wrap uses pita. In each of these cases, we'd consider the bread a
_dependency_ of our sandwich.

Of course, the _dependency chain_ goes further than our breadbox. The baker
who made our bread has dependencies as well. Baking a gluten-free loaf? They
might need almond flour. Specialty breads might require a unique oven or
technique. Even though we don't see this process in our own kitchen, we're
dependent on it too! If the baker can't make the correct bread, we can't create
the sandwich of our dreams.

Software has a similar problem with dependencies. If my application depends on
an authentication library that itself depends on an insecure password encryption
package, then my application is now inherently insecure. Oh no!

Keeping all the possible dependencies of an application straight ourselves would
be nearly impossible. Package managers to the rescue!

### Get the right package every time

Many package managers, including npm, have the ability to _resolve_ correct
dependency versions. This means the manager can compare all the packages used by
an application and determine which versions are most compatible. This ability
makes dependencies much safer: there's less worry that an update will break your
app if your package manager is warning you of changes.

npm accomplishes this dependency resolution process using both the
`package.json` and `package-lock.json` files. Let's take a look at how this
works.

### Ask...

The `package.json` file contains lots of JSON-formatted metadata for your
project, including its `dependencies`. Each dependency is formatted like so:

```js
"package-name": "semantic.version.number"
```

The package name tells npm which package to search for, and the _semantic
version number_ lets the CLI know more about exactly which version of that
package to grab. npm compares the version number with all your own dependencies
to resolve the correct version.

You should consider your `package.json`'s dependencies to be a list of requests.
Adding a dependency here lets you say "I'd like at least version 1.0 of the
'vue' package, please". It sets the stage for dependency resolution.

### ...and you shall receive!

The actual record of packages being used by an application is in
`package-lock.json`. This file, commonly known as a _lockfile_ in package
manager parlance, contains every detail needed to identify the exact version of
an npm package that's being used by an application. The lockfile is the key;
without it, you can't say with any certainty whether a particular version was
installed or not.

The lockfile for npm will be updated whenever an update is made to
`package.json` and `npm install` is run. You can do this manually (for example,
when you'd like to try a particular version of a package), or you can run `npm
update <package-name>`. While you'll frequently make manual changes to your
`package.json`, you should never make manual changes to your
`package-lock.json`! Let npm be responsible for generating the lockfile.

## Little boxes, all the same.

When the `npm` CLI utility installs a package, it adds it to the `node_modules`
subdirectory in your project. Each package will be placed in a directory named
after itself, and contain the raw code for the package along with any associated
`package.json`s and documentation.

The `node_modules` folder is special for a couple reasons. For one, it's a great
way to keep dependencies separated for each project. Some package managers keep
dependencies in a central location on your computer. While npm can do this when
run with the `--global` flag, it's not ideal, as it makes it harder to keep
different versions of the same dependency. By keeping `node_modules` for each
project separate, you can have as many different versions of each package as you
like! Each project has the specific version it needs right on-hand.

This introduces a challenge, though. If you have **every** version of a package,
imagine how much space that might take up! Your `node_modules` folders,
especially on larger apps, may grow to a massive size. There are build tools you
will encounter that minimize storage space being used by dependencies, but in
general it's good practice to keep `node_modules` out of git repositories or
other version control. After all, future users can use your `package.json` along
with `npm install` to recreate their own `node_modules` directory!

## Saying a lot with three little numbers

Let's talk about that `semantic.versioning.number` above. _Semantic versioning_
(often abbreviated to _semver_) is a way of tracking version numbers that lets
other developers know what to expect from each release of your package.

Semantic version numbers are made up of three parts, each numbered sequentially
and with no limit on how large they can be. The leftmost digit in semver is most
significant, meaning that `1.0.0` is "larger" than `0.8.99`, though both are
valid.

Here's a high-level overview:

![Version number with major, minor, and patch numbers labeled][image-npm-semver]

- _Major_ changes should be considered _breaking_. They will be incompatible
  with other major versions of the same package and may require significant
  changes in any app that depends on them. Creating a sequel to a hit video game
  would be a major change.

- _Minor_ changes generally represent new features. These shouldn't totally
  break anything, but might require a little tweak to keep dependent apps
  up-to-date. Adding a new level to a video game would be a minor change.

- _Patch_-level changes are for fixing bugs or small issues. These shouldn't
  break any other functionality or force dependent apps to make any changes
  themselves. Fixing a typo in a video game's instructions would be a
  patch-level change.

Notice that each of these versions is most-concerned with compatibility. This is
semver's greatest strength! With it, we can compare two versions of a package
and know immediately whether they are compatible or not, even if we don't know
much about how the code changed between those two versions.

### Creating version ranges

Of course, part of the reason we're using a package manager is that we may not
know exactly which version we need. Don't worry, though - semver & npm have you
covered! When adding a new dependency to your `package.json` file, you can
designate a _range_ by adding some special characters to your version number:

- `*` indicates "whatever the latest version is".
- `>1.0.0` indicates "any version above major version 1".
- `^1.0.0` indicates "any version in the 1.x.x range".
- `~1.0.0` indicates "any patch version in the 1.0.x range".
- `1.0.0` indicates "exactly version 1.0.0".

You may also omit consecutive trailing zeroes, so `^1.0.0` is the same as `^1.0`
or just `^1`. `~1.0.2` ("any patch version greater than 1.0.2") would need to
written out in its entirely, though. You should consider the numbers in your
semver to be a minimum value, so `~2.1.3` would include `2.1.4`, but not
`2.1.2`.

npm's website includes a fantastic [semver calculator][1] you can use to
practice as you're learning this new syntax. Check it out!

## Semantic versioning & npm

Semantic versioning is npm's secret weapon for dependency management. Using the
rules of semver, npm is able to determine whether a package will be compatible
with your application or not based on minimum-acceptable versions you set.

You might determine your minimums by trial and error, or you might just start
building against the latest version and work hard to keep your code up to date
as dependencies change. No matter how you do it, npm will make sure the packages
you install fit within the version range you've set in your `package.json`.

> Beware! While npm helps manage your dependencies, it won't automatically keep
> them up to date! Out-of-date dependencies may introduce serious security risks
> and require a substantial amount of work to fix. At the very least, you should
> ensure that any apps you maintain stay up-to-date with the latest patch
> versions of their dependencies. We'll look at some cool tools npm provides to
> assist with this during lecture.

## What we've learned

Dependency management can be a lot of work! We're lucky to have package managers
to help sort things out for us.

After reading this lesson, you should feel confident:

- defining "dependency management" and explaining why we need it;
- explaining npm's `package.json` and `package-lock.json` files;
- and evaluating semantic versions to find acceptable ranges.


[1]: https://semver.npmjs.com/
[image-npm-semver]: https://assets.aaonline.io/Module-JavaScript/npm/assets/image-npm-semver.svg

________________________________________________________________________________

# Introduction to npm

Now that you've learned about npm, it's time to apply your knowledge!

In this project, you'll:

* verify the version of npm you have installed;
* use npm to update itself to the latest version;
* initialize a project to use npm;
* use npm to install a dependency;
* and use a dependency in code.

## Phase 1: Using npm to manage npm

Before you create your project, let's verify what version of npm you have
installed. Visit [the `npm` package page][npm package] in the npm registry to
check what the current version is. If you don't have the current version
installed, use npm to update itself to the latest version.

## Phase 2: Using npm to manage a project's dependencies

Now let's use npm to initialize your project and install a dependency. After
installing the dependency, you'll use it in code.

### Phase 2A: Initializing a new package

Create a folder for your project, open a terminal window (if you haven't
already), and browse to your project folder. Use npm to initialize your project
to use npm. Ensure that you have a `package.json` file in the root of your
project before continuing to the next step.

### Phase 2B: Installing a dependency

Use npm to install the `moment` npm package. Per `moment`'s page in the npm
registry, it's a "lightweight JavaScript date library for parsing, validating,
manipulating, and formatting dates".

### Phase 2C: Using a dependency

Add a file named `index.js` to your project and use the `require` function to
import the `moment` module. Then add the following code to the `index.js` file:

```js
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
console.log(moment().format('dddd'));
console.log(moment().format("MMM Do YY"));
```

Now you're ready to test your application using Node.js by running the following
command:

```sh
node index.js
```

You should see in the terminal today's date/time formatted three different ways.
Congrats!

## What we've learned

In this project, you

* verified the version of npm you have installed;
* used npm to update itself to the latest version;
* initialized a project to use npm;
* used npm to install a dependency;
* and used a dependency in code.

[npm package]: https://www.npmjs.com/package/npm

________________________________________________________________________________

# Going Further with npm

It's time to stretch a bit and dig a little further into npm's capabilities.

In this project, you'll:

* initialize a project to use npm;
* use npm to install multiple dependencies;
* use one of your project's dependencies in code;
* write an npm script;
* initialize and configure Git for your project;
* and use the npm registry to find a package.

## Phase 1: Creating a project with multiple dependencies

Let's create a project!

### Phase 1A: Setting up the project

Create a folder for your project, open a terminal window (if you haven't
already), and browse to your project folder. Use npm to initialize your project
to use npm.

Then use npm to:

* install the `faker` package as a dependency;
* and install the `nodemon` package as a **development dependency**.

### Phase 1B: Writing the code

Add an `index.js` file to the root of your project. Update the `index.js` file
to use the `faker` package to print 10 random names to the console. Use Node.js
(i.e. `node index.js`) to run your application and check if your code is working
as expected.

### Phase 1C: Adding an npm script

In the `package.json` file, add an npm script named `watch` that uses the
`nodemon` package to restart the application whenever changes are made to any of
the project files. After adding the script, be sure to use npm to test that it
functions as expected.

### Phase 1D: Initialize and configure Git

Now it's time to initialize your project as a Git repository. After you've initialized
Git, you'll need to add the `node_modules` folder to a `.gitignore` file to
prevent that folder from being committed to your repository. Remember that you only
need to commit the `package.json` and `package-lock.json` files to your repository as
that's all that npm needs to download and install your project's dependencies.

Once you're confident that you've got Git configured properly, go ahead and
commit your project's files to your repository.

## Phase 2: Using the npm registry

For this part of the project, use the [npm registry][npm registry] to find a
reputable package (by popularity and quality stats) to pluralize a given word.
When comparing packages, remember to ask yourself the following questions:

* Does the package do what I need?
* How popular is the package?
* Is the package being maintained?

Once you've found a package that you like, go ahead and add it as a dependency
to your project. Optionally, you can experiment with adding code to your project
that uses your new package.

## What we've learned

In this project, you

* initialized a project to use npm;
* used npm to install multiple dependencies;
* used one of your project's dependencies in code;
* wrote an npm script;
* initialized and configured Git for your project;
* and used the npm registry to find a package.

[npm registry]: https://www.npmjs.com/

________________________________________________________________________________

# npm and Application Security

Sooner or later, you'll encounter a project that has a dependency with a
security vulnerability. To prepare you for that, let's practice auditing and
updating a package with security vulnerabilities.

In this project, you'll:

* clone an existing project from a GitHub repository;
* use npm to install the project's dependencies;
* and use npm to audit and fix security vulnerabilities.

## Phase 1: Setting up the project

To get started with this project, clone the following GitHub repository:

[https://github.com/-starters/javascript-npm-and-application-security][repo to clone]

Then use npm to install the project's dependencies.

## Phase 2: Using npm to audit and fix security vulnerabilities

When installing the project's dependencies, you might have noticed that npm
found security vulnerabilities. Use npm to view more information about those
security vulnerabilities and to update the offending package.

To confirm that you've resolved security vulnerabilities, use npm to audit your
project's dependencies again.

## What we've learned

In this project, you

* cloned an existing project from a GitHub repository;
* used npm to install the project's dependencies;
* and used npm to audit and fix security vulnerabilities.

[repo to clone]: https://github.com/-starters/javascript-npm-and-application-security

________________________________________________________________________________
# Project: Create Your Own File Utilities!

It's kind of a rite of passage that developers get the chance to write their own
versions of command line utilities. You're going to get to do that, now, using
Node.js!

This project is meant to give you an opportunity to learn how to use the
`require` keyword to load CommonJS modules. Then, you get to practice reading
the Node.js documentation to get a better understanding of the built-in
libraries and how to use them. Finally, you'll bring in some third-party
packages to really get the party started!

## Setting up your project

Create a directory named `my-file-utilities` in which you will create your
utility files. In that directory, initialize an `npm` package.

## Hash Bang files

All of the utilities that you create, today, are going to be in so-called "hash
bang" files. That's because the first line of them start with the sequence "#!".
In old Unix, "#" is known as "hash" and "!" is known as "bang". (Also, "*" is
known as "splat" :-)

Once you have a file opened in Visual Studio Code, the first line that you write
in it will be this:

```
#!/usr/bin/env node
```

The "hash-bang" instructs the shell (Bash or Zsh) to run the file with the
command that follows it. In this case, `/usr/bin/env node` tells the shell to
find the executable "node" in the user's environment.

The final step is to make the file executable. To do that, you may recall that
you use the "change mode" command (`chmod`). If your file is named **cp.js**,
then to make it executable, you would type the following in your shell.

```
chmod +x cp.js
```

Then, to run that file, you will type `./cp.js`.

## Getting command-line arguments in your program

The first stop you need to make is to learn about the `process.argv` array that
every running Node.js process has. ([process.argv documentation]) That array
will allow you to access any arguments that someone types on the command line.

For example, when writing your first utility, the copy utility, you will need
to have two arguments: the file someone wants copied and the file that they
want it copied to. When you run your utility (assuming you did the hash-bang
thing above), you could run it like this:

```
./cp.js original.txt copy.txt
```

The `process.argv` array will contain the following:

```
[
  '/path/to/your/node',
  '/path/to/your/cp.js',
  'original.txt',
  'copy.txt'
]
```

You will access the third and fourth arguments in that array, for example, to
know the files that the user has specified.

## Specifying an exit code from your utility

When a program finishes without an error, it returns an "exit code" to the shell
of 0. That way, the shell knows everything went ok.

When a program finishes due to an error, it returns a non-zero "exit code" to
the shell. That way, the shell knows something went awry.

Check out [the documentation for _process.exit_] to find out how you can return
a non-zero "exit code" from your programs.

## Copy

Create your own file copying utility. Use the built-in [File System] library.
Don't use any of the methods in the library that end with `Sync`. Those are
_not_ in the spirit of JavaScript.

For your copy utility:

* It should be run with the form `./cp.js source-file-path target-file-path`
* If the user does not provide exactly two arguments, write a "using" message
  which shows the user how to properly use your copy utility.
* If the `source-file-path` does not exist, write an error message that
  describes the problem and exit with a status code of 9.
* If the `source-file-path` is a directory, write an error message that
  describes the problem and exit with a status code of 10.
* If an error occurs during the copy, throw the error provided to the callback.
* If everything succeeds, don't print anything.

## Delete

Create your own file removal utility. Use the built-in [File System] library.
You'll notice that there's no method named "remove" or "delete". Look through
the options. There's a method in there that you can use to accomplish this.

Don't use any of the methods in the library that end with `Sync`. Those are
_not_ in the spirit of JavaScript.

For your delete utility:

* It should be run with the form `./rm.js file-paths` where the user can specify
  one or more files to remove from the file system. For example, they could type
  `./rm.js original.txt` to remove one file or `./rm.js 1.txt 2.txt 3.txt` to
  remove three files.
* If the user does provides no arguments, write a "using" message which shows
  the user how to properly use your copy utility.
* If an error occurs during the removal of any file, throw the error provided to
  the callback.
* If everything succeeds, don't print anything.

## Touch

Create your own "touch" utility. Touch takes one parameter, a file path. If the
file at the path does not exist, it will create an empty file at that path. If
the file does exist, it updates the last modified time to "now".

Don't use any of the methods in the library that end with `Sync`. Those are
_not_ in the spirit of JavaScript.

For your touch utility:

* It should be run with the form `./touch.js file-path`.
* If the user does not provide exactly one argument, write a "using" message
  which shows the user how to properly use your copy utility.
* If the `file-path` points to a directory, write an error message and exit with
  a status code of 2.
* If everything succeeds, don't print anything.

## Head

Create your own "head" utility. Head takes one parameter, a file path. It then
displays tp to the first 10 lines of the file.

Don't use any of the methods in the library that end with `Sync`. Those are
_not_ in the spirit of JavaScript.

For your head utility:

* It should be run with the form `./head.js file-path`.
* If the user does not provide exactly one argument, write a "using" message
  which shows the user how to properly use your copy utility.
* If the `file-path` does not point to a file, write an error message and exit
  with a status code of 17.
* If everything succeeds, it will print up to the first ten lines of the file.

## Chalk it up to ls

Have a look at [Chalk], a commonly-used library to make colorful output in
Node.js console applications. Install Chalk to your project directory.

Create your own "ls" utility using Chalk. Color files based on their extension.
You choose the colors. For example, maybe you decide that all JavaScript files
should show up as purple in the terminal. Then, when you type `./ls.js` for a
directory, all of the files that are JavaScript files will appear in purple.

For your ls utility:

* It should be run with the form `./ls.js path`.
* If the path does not exist, write an error message describing the error and
  exit with status code 2.
* If the path is a file, write out the colorized name of the file.
* If the path is a directory, write out the colorized names of all the files
  in the directory.

## Word count

Create your own "wc" utility. Wc takes a file path and prints out the number of
characters, words, and lines in the file.

For your wc utility:

* It should be run with the form `./wc.js path`.
* If the path does not exist, write an error message describing the error and
  exit with status code 2.
* If the path is a directory, write an error message describing that it can't
  count the number of words in a directory. Be a little snarky about it. Exit
  with status code 14.
* If the path is a file, count the number of characters, the number of words (as
  separated by spaces, tabs, and new lines), and lines. Output the findings in
  the following format:

  number of lines«tab»number of words«tab»number of characters

Start out by reading the entire file into memory. Once you get that working,
try to come up with a way to do the same thing but without reading the entire
file into memory. You'll want to read about how [Readable Streams] work in
Node.js. Then, maybe, you can use something like the [line-reader package] to
read the file line-by-line while you keep track of all of its stats.

[process.argv documentation]: https://nodejs.org/api/process.html#process_process_argv
[File System]: https://nodejs.org/api/fs.html
[the documentation for _process.exit_]: https://nodejs.org/api/process.html#process_process_exit_code
[Chalk]: https://github.com/chalk/chalk
[Readable Streams]: https://nodejs.org/api/stream.html#stream_readable_streams
[line-reader package]: https://www.npmjs.com/package/line-reader

________________________________________________________________________________
# WEEK-05 DAY-2<br>*Classes and Objects* {ignore=true}
________________________________________________________________________________
# Classes Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Define a constructor function using ES5 syntax.
2. Define a method on the prototype of a constructor function.
3. Declare a class using ES6 syntax.
4. Define an instance method on a class (ES6).
5. Define a static method on a class (ES6).
6. Instantiate an instance of a class using the `new` keyword.
7. Implement inheritance using the ES6 `extends` syntax for an ES6 class.
8. Utilize the `super` keyword in a child class to inherit from a parent class.
9. Utilize `module.exports` and `require` to import and export functions and
   class from one file to another.earning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Define a constructor function using ES5 syntax.
2. Define a method on the prototype of a constructor function.
3. Declare a class using ES6 syntax.
4. Define an instance method on a class (ES6).
5. Define a static method on a class (ES6).
6. Instantiate an instance of a class using the `new` keyword.
7. Implement inheritance using the ES6 `extends` syntax for an ES6 class.
8. Utilize the `super` keyword in a child class to inherit from a parent class.
9. Utilize `module.exports` and `require` to import and export functions and
   class from one file to another.

________________________________________________________________________________

# Constructor Function, What's Your Function?

Up until now, you've used object initializer or "literal notation" to create
POJOs (plain old JavaScript objects). While this approach to creating objects is
convenient (and not to mention easy), it's not an ideal way to define the
attributes and behaviors for an object type nor is it an efficient way to create
many objects of that type.

In ES2015, JavaScript gained the `class` keyword, giving developers a formal way
to create a class definition to specify an object type's attributes and
behavior. The class definition is also used to create objects of that specific
type.

In this article, you'll learn how constructor functions and prototypes were
used, prior to the introduction of the ES2015 `class` keyword, to mimic or
imitate classes. Understanding constructor functions and prototypes will not
only prepare you for working with legacy code, it'll prepare you to understand
how ES2015's classes are really just a syntactic layer of sugar over these
language features.

When you finish this article, you should be able to:

* Define a constructor function for an object type that initializes one or more
  properties;
* Invoke a constructor function using the `new` keyword;
* Use the `instanceof` operator to check if an object is an instance of a
  specific object type; and
* Define sharable methods on the `prototype` property of a constructor function.

## Defining a constructor function

To review, an object created using object initializer or literal notation syntax
looks like this:

```js
const fellowshipOfTheRing = {
  title: 'The Fellowship of the Ring',
  series: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien'
};
```

While it's not explicitly stated, the above object literal represents a "Book"
object type. An object type is defined by its attributes and behaviors. This
particular "Book" object type has "title", "series", and "author" attributes
which are represented by the object literal's `title`, `series`, and `author`
properties.

> Behaviors are represented by methods, but this particular object literal
> doesn't define any methods. We'll see an example of an object type behavior
> later in this article.

A constructor function in JavaScript handles the creation of an object—it's a
"factory" for creating objects of a specific type. Calling a constructor
function returns an object with its properties initialized to the provided
argument values along with any available methods for operating on the object's
data.

Here's an example of a constructor function for the "Book" object type:

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}
```

This `Book` constructor function is responsible for creating "Book" objects. If
your application had four unique object types, then you'd typically declare four
constructor functions—one constructor function for each unique object type.

While the `Book` constructor function uses JavaScript's standard syntax for
function declarations, there are a few things specific to constructor functions
worth highlighting:

* **The name of the constructor function is capitalized.** Following this
  convention will help you (and other developers) to correctly identify this
  function as a constructor function.
* **The function doesn't explicitly return a value.** When invoked with the
  `new` keyword, constructor functions implicitly return the newly created
  object. In just a bit, you'll see an example of this.
* **Within the constructor function's body, the `this` keyword references the
  newly created object.** This allows you to initialize properties on the
  object.

## Invoking a constructor function

Constructor functions are designed to be invoked with the `new` keyword: 

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}

const fellowshipOfTheRing = new Book(
  'The Fellowship of the Ring',
  'The Lord of the Rings',
  'J.R.R. Tolkien');

console.log(fellowshipOfTheRing); // Book { title: 'The Fellowship of the Ring', ... }
```

Four things occur when invoking a constructor function with the `new` keyword:

1. A new empty object is created (i.e. `{}`);
2. The new object's prototype is set to the object referenced by the constructor
   function's `prototype` property (more about this in just a bit);
3. The constructor function is called and `this` is bound to the new object; and
4. The new object is returned after the constructor function has completed.

> **Important:** If you return something from a constructor function then you'll
> break the behavior described in item #4 as the return value will be whatever
> you're explicitly returning instead of the new object.

### Understanding object type instances

Remember that a constructor function handles the creation of an object—it's a
"factory" for creating objects of a specific type. An object created from a
constructor function is said to be an **instance** of the object type defined by
the constructor function.

In the below example, the `Book` constructor function defines a `Book` object
type. Calling the `Book` constructor function with the `new` keyword creates an
instance of the `Book` object type:

```js
// This constructor function defines
// a `Book` object type.
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}

// Use the `new` keyword to create
// three instances of the `Book` object type.

const fellowshipOfTheRing = new Book(
  'The Fellowship of the Ring',
  'The Lord of the Rings',
  'J.R.R. Tolkien');

const twoTowers = new Book(
  'The Two Towers',
  'The Lord of the Rings',
  'J.R.R. Tolkien');

const returnOfTheKing = new Book(
  'The Return of the King',
  'The Lord of the Rings',
  'J.R.R. Tolkien');

// Logging each instance to the console
// shows that each is a `Book` object type.

console.log(fellowshipOfTheRing); // Book { title: 'The Fellowship of the Ring', ... }
console.log(twoTowers); // Book { title: 'The Two Towers', ... }
console.log(returnOfTheKing); // Book { title: 'The Return of the King', ... }

// Comparing each instance to the others
// shows that each instance is a unique object
// and not equal to the others even though they
// are all `Book` object types.

console.log(fellowshipOfTheRing === twoTowers); // false
console.log(fellowshipOfTheRing === returnOfTheKing); // false
console.log(twoTowers === returnOfTheKing); // false
```

In this example, the `new` keyword is used to create three instances of the
`Book` object type, which are referenced by the `fellowshipOfTheRing`,
`twoTowers`, and `returnOfTheKing` variables. While each instance is a `Book`
object type, they are also unique objects and therefore not equal to each other.

## Using the `instanceof` operator to check an object's type

Sometimes it's helpful to know if an object is an instance of a specific type.
JavaScript makes this easy to do using the `instanceof` operator:

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

// Use the `instanceof` operator to check if the
// `fellowshipOfTheRing` object is an instance of `Book`.
console.log(fellowshipOfTheRing instanceof Book); // true
```

The `instanceof` operator allows us to confirm that calling the `Book`
constructor with the `new` keyword creates an instance of the `Book` object
type.

### Invoking a constructor function without the `new` keyword

We can use the `instanceof` operator to prevent our constructor functions from
being misused. 

Invoking a constructor function without the `new` keyword results in one of two
unexpected outcomes:

* When running in non-strict mode, `this` will be bound to the global object
  **not** the newly created object; or
* When running in strict mode, `this` will be `undefined`, which results in a
  runtime error when attempting to initialize a property on the newly created
  object using the `this` keyword.

You can write the string below at the top of your file to enable strict mode 
for an entire script or inside a function body for function-level strict mode. 

[Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) 
can be enabled by writing the following string: 

```js
"use strict";
```

Because the second outcome results in an error when calling the constructor
function, it's a bit easier to debug than the first outcome. Up until now, 
we've only seen errors generated by JavaScript. With the `throw` keyword and the 
`Error` constructor function, we can throw our own custom errors:

```js
function Book(title, series, author) {
  if (!(this instanceof Book)) {
    // Throws a custom error when `Book` is called without the `new` keyword.
    throw new Error('Book needs to be called with the `new` keyword.');
  }

  this.title = title;
  this.series = series;
  this.author = author;
}

// Calling the `Book` constructor method with the `new` keyword
// successfully creates a new instance.
const fellowshipOfTheRing = new Book(
  'The Fellowship of the Ring',
  'The Lord of the Rings',
  'J.R.R. Tolkien');

// Calling the `Book` constructor method without the `new` keyword
// throws an error with the message
// "Book needs to be called with the `new` keyword."
const fellowshipOfTheRing = Book(
  'The Fellowship of the Ring',
  'The Lord of the Rings',
  'J.R.R. Tolkien');
```

In this example, an `if` statement has been added to the `Book` constructor
function that checks if `this` isn't bound to an instance of the `Book`
constructor and throws an error explaining the problem.

## Defining sharable methods

When defining the behavior or methods for an object type, avoid the temptation
to define the methods within the constructor function:

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;

  // For example only!
  // To avoid inefficient use of computer memory
  // don't define methods directly on the newly created object.
  this.getInformation = function() {
    return `${this.title} by ${this.author}`;
  };
}
```

> Remember that a method is a function that's associated with a specific object
> using a property.

Using this approach is inefficient in terms of computer memory usage as each
object instance would have its own method definition. If you had a hundred
object instances there'd be a hundred method definitions! A better approach is
to define the method once and then share that method definition across all
instances of that object type.

Let's explore how prototypes can be used to define sharable methods.

### Prototypes and delegation

In JavaScript, a **prototype** is an object that is delegated to when a
reference to an object property or method can't be resolved.

For example, if a property or method isn't available on an object, JavaScript
will delegate to the object's prototype to see if that object has the requested
property or method. If the property or method is found on the prototype, then
the action is carried out on the prototype object. The delegation to the
prototype happens automatically, so from the caller's perspective it looks as if
the original object had the request property or method.

In JavaScript, you can make an object the prototype of another object. When an
object is a prototype of another object, it's properties and methods are made
available to the other object.

Here's a simple, arbitrary example involving two [object literals][mdn object literal]: `a` and `b`.
Object `a` defines a method named `alpha()` and object `b` defines a method
named `beta()`:

```js
const a = {
 alpha() {
   return 'Alpha';
 }
};

const b = {
 beta() {
   return 'Beta';
 }
};
```

The first time that you attempt to call the `alpha()` and `beta()` methods on
object `a`, only the call to the `alpha()` method succeeds as the `beta()`
method is only defined on object `b`:

```js
console.log(a.alpha()); // Alpha
console.log(a.beta());  // Error: a.beta is not a function
```

When you check the data type of `a` or `b`, you see that they are 
[objects][mdn object]. This means you can access the `alpha()` and `beta()` 
with [property accessors][mdn property accessors] using `dot notation` or 
`bracket notation`.

```js
console.log(typeof a); // Prints 'object'

// Dot notation
a.alpha(); // Alpha

// Bracket notation
a["alpha"](); // Alpha
```

After using the `Object.setPrototypeOf()` method to set object `b` as the
prototype of `a`, the call to the `beta()` method on object `a` succeeds:

```js
// For example only!
// Calling the `Object.setPrototypeOf()` method can have
// a negative impact on the performance of your application.
Object.setPrototypeOf(a, b);

console.log(a.alpha()); // Alpha
console.log(a.beta()); // Beta
```

> **Important: The `Object.setPrototypeOf()` method is used in this example for
> demonstration purposes only.** Calling the `Object.setPrototypeOf()` method
> can have a negative impact on the performance of your application, so you
> should generally avoid using it.

The call to `beta()` method works now because when the method isn't found on
object `a`, the call is delegated to object `a`'s prototype which is object `b`.
The `beta()` method is found on object `b` and it's successfully called.

Starting with ES2015, you can use the `Object.getPrototypeOf()` method to get an
object's prototype. Calling the `Object.getPrototypeOf()` method and passing
object `a` allows us to verify that object `a`'s prototype is object `b`:

```js
// Use the `Object.getPrototypeOf()` method
// to get the prototype of object `a`.
console.log(Object.getPrototypeOf(a)); // { beta: [Function: beta] }
```

> An object's prototype is sometimes referred to in writing using the notation
> `[[prototype]]`. For example, [MDN Web Docs' JavaScript documentation][mdn js]
> will sometimes refer to an object's prototype as its `[[prototype]]`.

### The `__proto__` property

Prior to ES2015 and the addition of the `Object.getPrototypeOf()` and
`Object.setPrototypeOf()` methods, there wasn't an official way to get or set an
object's internal `[[prototype]]` object. As a workaround, many browsers
(including Google Chrome and Mozilla Firefox) made available a `__proto__`
property providing an easy way to access an object's `[[prototype]]`:

```js
// For example only!
// The `__proto__` property is deprecated in favor of
// the `Object.getPrototypeOf()` and `Object.setPrototypeOf()` methods.
console.log(a.__proto__); // { beta: [Function: beta] }
```

**While the `__proto__` property is widely supported by browsers and handy to
use when debugging, you should never use it in your code as it's deprecated in
favor of the `Object.getPrototypeOf()` and `Object.setPrototypeOf()` methods.**

Code that relies upon the deprecated `__proto__` property will unexpectedly stop
working if any of the browser vendors decide to remove the property from their
implementation of the JavaScript language specification. When the need arises,
use the `Object.getPrototypeOf()` method to get an object's prototype.

> Instead of having to say "underscore underscore proto underscore underscore"
> or "double underscore proto double underscore" when referring to the
> `__proto__` property, developers will sometimes say "dunder proto". 

### Defining sharable methods on a constructor function's `prototype` property

Let's use what you've learned about prototypes and delegation in JavaScript to
define methods for an object type that'll be shared across all of its instances.

Every constructor function has a `prototype` property that represents the object
that'll be used as the prototype for instances created by invoking the
constructor function with the `new` keyword. We can confirm this by comparing
the prototype for an instance created from a constructor function to the
constructor function's `prototype` property:

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

const twoTowers = new Book(
 'The Two Towers',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

// Get the prototypes for both `Book` instances.
const fellowshipOfTheRingPrototype = Object.getPrototypeOf(fellowshipOfTheRing);
const twoTowersPrototype = Object.getPrototypeOf(twoTowers);

// Compare the `fellowshipOfTheRing` and `twoTowers` prototypes
// to the `Book` constructor function's `prototype` property.
console.log(fellowshipOfTheRingPrototype === Book.prototype); // true
console.log(twoTowersPrototype === Book.prototype); // true

// Compare the `fellowshipOfTheRing` and `twoTowers` prototypes
// to each other.
console.log(fellowshipOfTheRingPrototype === twoTowersPrototype); // true
```

This example shows that:

* Every instance created by a constructor function has its prototype (i.e.
  `[[prototype]]`) set to the object referenced by the constructor function's
  `prototype` property; and
* The object referenced by the constructor function's `prototype` property isn't
  copied when it's set as an instance's prototype—every instance's prototype
  references the same object.

This means that any method that we define on the constructor function's
`prototype` property will be shared across all instances of that object type:

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}

// Any method defined on the `Book.prototype` property
// will be shared across all `Book` instances.
Book.prototype.getInformation = function() {
 return `${this.title} by ${this.author}`;
};

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

console.log(fellowshipOfTheRing.getInformation()); // The Fellowship of the Ring by J.R.R. Tolkien
```

When the `getInformation()` method is called, the `fellowshipOfTheRing` object
is checked first to see if the method is defined on that object. When the method
isn't found, the method call is delegated to the instance's prototype, which is
set to the `Book` constructor function's `prototype` property. This time, the
`getInformation()` method is found and called.

Notice that we can use the `this` keyword in our shared `getInformation()`
method implementation to access properties (or methods) on the instance that
we're calling the method on.

### The problem with arrow functions

If you're like me, you like the concise syntax of arrow functions.
Unfortunately, you can't use arrow functions when defining methods on a
constructor function's `prototype` property:

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}

// For example only!
// Using an arrow function to define a method
// on a constructor function doesn't work as expected
// when using the `this` keyword.
Book.prototype.getInformation = () => `${this.title} by ${this.author}`;

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

// Oops! Not what we expected.
console.log(fellowshipOfTheRing.getInformation()); // undefined by undefined
```

Remember that arrow functions don't have their own `this` binding—they use the
`this` binding from the enclosing lexical scope. This is why the `this` keyword
within the `getInformation()` method doesn't work as expected in the above
example as it doesn't reference the current instance (the object instance
created by the `Book` constructor function).

> For more information on arrow functions, the `this` keyword, and lexical
> scoping, see [this page][mdn arrow functions] on MDN Web Docs.

This problem is easily avoided—just stick with using the `function` keyword when
defining methods on a constructor function's `prototype` property.

### Prototypes and the `instanceof` operator

Earlier, you saw an example of how the `instanceof` operator can be used to
check if an object is an instance of a specific type:

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}

const fellowshipOfTheRing = new Book(
  'The Fellowship of the Ring',
  'The Lord of the Rings',
  'J.R.R. Tolkien');

// Use the `instanceof` operator to check if the
// `fellowshipOfTheRing` object is an instance of `Book`.
console.log(fellowshipOfTheRing instanceof Book); // true
```

The `instanceof` operator uses prototypes to determine if an object is an
instance of a specific constructor function. To do that, the `instanceof`
operator checks if the prototype of the object on the left side of the operator
is set to the `prototype` property of the constructor function on the right side
of the operator.

## What you learned

In this article, you learned

* how to define a constructor function for an object type that initializes one
  or more properties;
* how to invoke a constructor function using the `new` keyword;
* how to use the `instanceof` operator to check if an object is an instance of a
  specific object type; and
* how to define sharable methods on the `prototype` property of a constructor
  function.

[mdn js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[mdn arrow functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[mdn object]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
[mdn object literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
[mdn property accessors]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors
________________________________________________________________________________

# Putting the Class in JavaScript Classes

For years, JavaScript developers used constructor functions and prototypes to
mimic classes. Starting with ES2015, support for classes were added to the
language, giving developers an official way to define classes.

When you finish this article, you should be able to:

* Define an ES2015 class containing a constructor method that initializes one or
  more properties;
* Instantiate an instance of a class using the `new` keyword;
* Define instance and static class methods;
* Understand that ES2015 classes are primarily syntactic sugar over constructor
  functions and prototypes; and
* Use the `instanceof` operator to check if an object is an instance of a
  specific class.

## Defining an ES2015 class

To review, a constructor function in JavaScript handles the creation of an
object—it's a "factory" for creating instances of a specific object type. Here's
an example of a constructor function for a `Book` object type:

```js
function Book(title, series, author) {
  this.title = title;
  this.series = series;
  this.author = author;
}
```

An ES2015 class defines the attributes and behavior for an object type and is
used to create instances of that type—just like a constructor function. Classes
are defined using the `class` keyword, followed by the name of the class, and a
set of curly braces. Here's an example of the above `Book` constructor function
rewritten as an ES2015 class:

```js
class Book {
  constructor(title, series, author) {
    this.title = title;
    this.series = series;
    this.author = author;
  }
}
```

Note that you **cannot** use the following syntax inside of classes:

```js
// THIS IS BAD CODE. DO NOT COPY. ILLUSTRATIVE USE ONLY.
class MyClass {
    function constructor() {

    }
}
```
or
```js
// THIS IS BAD CODE. DO NOT COPY. ILLUSTRATIVE USE ONLY.
class MyClass {
    let constructor = () => {

    }
}
```

Notice that class names, like constructor functions, begin with a capital
letter. Following this convention will help you (and other developers) to
correctly identify the name as a class.

While not required, the above class definition includes a `constructor` method.
Class `constructor` methods are similar to constructor functions in the
following ways:

* **`constructor` methods don't explicitly return a value.** When instantiating
  class instances with the `new` keyword, `constructor` methods implicitly
  return the newly created object instance. In just a bit, you'll see an example
  of this.
* **Within a `constructor` method's body, the `this` keyword references the
  newly created object instance.** This allows you to initialize properties on
  the object instance.

## Instantiating an instance of a class

To create or instantiate an instance of a class, you use the `new` keyword:

```js
class Book {
  constructor(title, series, author) {
    this.title = title;
    this.series = series;
    this.author = author;
  }
}

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

// Output:
// Book {
//  title: 'The Fellowship of the Ring',
//  series: 'The Lord of the Rings',
//  author: 'J.R.R. Tolkien'
// }
console.log(fellowshipOfTheRing);
```

Four things occur when instantiating an instance of a class:

1. A new empty object is created (i.e. `{}`);
2. The new object's prototype is set to the class' `prototype` property value
   (more about this in just a bit);
3. The `constructor` method is called and `this` is bound to the new object; and
4. The new object is returned after the `constructor` method has completed.

> **Important:** Just like with constructor functions, if you return something
> from a `constructor` method then you'll break the behavior described in item
> #4 as the return value will be whatever you're explicitly returning instead of
> the new object.

### Attempting to instantiate a class instance without the `new` keyword

You might recall that invoking a constructor function without the `new` keyword
produced an unexpected outcome. Unlike constructor functions, attempting to
instantiate a class instance without using the `new` keyword results in a
runtime error:

```js
// This code throws the following runtime error:
// TypeError: Class constructor Book cannot be invoked without 'new'
// Notice the lack of the `new` keyword.
const fellowshipOfTheRing = Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');
```

This default behavior is an example of how ES2015 classes improve upon
constructor functions.

### Class definitions aren't hoisted

In JavaScript, you can call a function before it's declared:

```js
test();

function test() {
  console.log('This works!');
}
```

This behavior is known as [hoisting][hoisting].

Unlike function declarations, class declarations aren't hoisted. The following
code will throw an error at runtime:

```js
// This code throws the following runtime error:
// ReferenceError: Cannot access 'Book' before initialization
const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

class Book {
  constructor(title, series, author) {
    this.title = title;
    this.series = series;
    this.author = author;
  }
}
```

This error is easy to avoid: simply get into the habit of declaring your classes
**before** you use them.

## Defining methods

A class can contain two types of method definitions: instance methods and static
methods. So far, when working with constructor functions, you've only seen
examples of instance methods.

### Defining an instance method

Instance methods, as the name suggests, are invoked on an instance of the class.
Instance methods are useful for performing an action on a specific instance.

The syntax for defining a class instance method is the same as the shorthand
method syntax for object literals: the method name, the method's parameters
wrapped in parentheses, followed by a set of curly braces for the method body.
Here's an example of an instance method named `getInformation()`:

```js
class Book {
  constructor(title, series, author) {
    this.title = title;
    this.series = series;
    this.author = author;
 }

  getInformation() {
    return `${this.title} by ${this.author}`;
  }
}

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

console.log(fellowshipOfTheRing.getInformation()); // The Fellowship of the Ring by J.R.R. Tolkien
```

Notice that you can use the `this` keyword within the instance method body to
access properties (and methods) on the instance that the method was invoked on.

### Instance methods and prototypes

While the code for a class instance method doesn't give any indication of this,
instance methods are made available to instances via a shared prototype object.
Just like with constructor functions, this approach prevents method definitions
from being unnecessarily duplicated across instances, saving on memory
utilization.

Because instance methods are actually defined on a shared prototype object,
they're sometimes referred to as "prototype" methods.

### Defining a static method

Static methods are invoked directly on a class, not on an instance. Attempting
to invoke a static method on an instance will result in a runtime error.

The syntax for defining a class static method is the same as an instance method
except that static methods start with the `static` keyword. Here's an example of
a static method named `getTitles()`:

```js
class Book {
 constructor(title, series, author) {
   this.title = title;
   this.series = series;
   this.author = author;
 }

 // Static method that accepts a variable number
 // of Book instances and returns an array of their titles.
 // Notice the use of a rest parameter (...books)
 // to capture the passed parameters as an array of values.
 static getTitles(...books) {
   return books.map((book) => book.title);
 }

 getInformation() {
   return `${this.title} by ${this.author}`;
 }
}

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

const theTwoTowers = new Book(
 'The Two Towers',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

// Call the static `Book.getTitles()` method
// to get an array of the book titles.
const bookTitles = Book.getTitles(fellowshipOfTheRing, theTwoTowers);

console.log(bookTitles.join(', ')); // The Fellowship of the Ring, The Two Towers
```

The `getTitles()` static method accepts a variable number of Book instances and
returns an array of their titles.

> Notice that the method makes use of a [rest parameter][rest parameters]
> (`...books`) to capture the passed parameters as an array of values. Using
> this approach is merely a convenience; the code could be rewritten to require
> callers to pass in an array of `Book` instances.

Static methods aren't invoked on an instance, so they can't use the `this`
keyword to access an instance. You can pass one or more instances into a static
method via a method parameter, which is exactly what the above `getTitles()`
method does. This allows static methods to perform actions across groups of
instances.

Static methods can also be used to perform "utility" actions—actions that are
independent of any specific instances but are related to the object type in some
way.

### Static methods and constructor functions

Static methods aren't unique to ES2015 classes. It's also possible to define
static methods when working with constructor functions.

Here's the above example rewritten to use a constructor function:

```js
function Book(title, series, author) {
 this.title = title;
 this.series = series;
 this.author = author;
}

// Static methods are defined
// directly on the constructor function.
Book.getTitles = function(...books) {
 return books.map((book) => book.title);
}

// Instance methods are defined
// on the constructor function's `prototype` property.
Book.prototype.getInformation = function() {
 return `${this.title} by ${this.author}`;
};

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

const theTwoTowers = new Book(
 'The Two Towers',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

console.log(fellowshipOfTheRing.getInformation()); // The Fellowship of the Ring by J.R.R. Tolkien

console.log(theTwoTowers.getInformation()); // The Two Towers by J.R.R. Tolkien

// Call the static `Book.getTitles()` method
// to get an array of the book titles.
const bookTitles = Book.getTitles(
 fellowshipOfTheRing, theTwoTowers);

console.log(bookTitles.join(', ')); // The Fellowship of the Ring, The Two Towers
```

## Comparing classes to constructor functions

You've already seen how class `constructor`, instance, and static methods behave
in a similar fashion to their constructor function counterparts. This is
evidence that ES2015 classes are primarily syntactic sugar over constructor
functions and prototypes.

> "Syntactic sugar" refers to the addition of syntax to a programming language
> that provides a simpler or more concise way to leverage features that already
> exist as opposed to adding new features.

We can use the `instanceof` operator to validate how the various elements of a
class map to constructor functions and prototypes.

For reference, here's the `Book` class definition that we've been working with
in this article:

```js
class Book {
 constructor(title, series, author) {
   this.title = title;
   this.series = series;
   this.author = author;
 }

 static getTitles(...books) {
   return books.map((book) => book.title);
 }

 getInformation() {
   return `${this.title} by ${this.author}`;
 }
}
```

First, we can use the `instanceof` operator to verify that the `Book` class is
actually a `Function` object, not a special "Class" object or type:

```js
console.log(Book instanceof Function); // true
```

We can also use the `instanceof` operator to verify that the `getInformation()`
instance method is defined on the underlying `Book` function's `prototype`
property:

```js
console.log(Book.prototype.getInformation instanceof Function); // true
```

Similarly, we can verify that the `getTitles()` static method is defined on the
`Book` function:

```js
console.log(Book.getTitles instanceof Function); // true
```

Going even further, we can use the `isPrototypeOf()` method to check if an
instance of the `Book` class has its prototype set to the `Book.prototype`
property:

```js
const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

console.log(Book.prototype.isPrototypeOf(fellowshipOfTheRing)); // true
```

All of this confirms that the `Book` class is simply an alternative way of
writing this `Book` constructor function:

```js
function Book(title, series, author) {
 this.title = title;
 this.series = series;
 this.author = author;
}

Book.getTitles = function(...books) {
 return books.map((book) => book.title);
}

Book.prototype.getInformation = function() {
 return `${this.title} by ${this.author}`;
};
```

## Using the `instanceof` operator to check an object's type

When working with constructor functions, you saw how the `instanceof` operator
could be used to check if an object is an instance of a specific type. This
technique also works to check if an object is an instance of a specific class:

```js
class Book {
  constructor(title, series, author) {
    this.title = title;
    this.series = series;
    this.author = author;
  }
}

const fellowshipOfTheRing = new Book(
 'The Fellowship of the Ring',
 'The Lord of the Rings',
 'J.R.R. Tolkien');

// Use the `instanceof` operator to check if the
// `fellowshipOfTheRing` object is an instance of the `Book` class.
console.log(fellowshipOfTheRing instanceof Book); // true
```

Knowing that ES2015 classes are a layer of syntactic sugar over constructor
functions and prototypes, this use of the `instanceof` operator probably isn't
surprising to you. The `instanceof` operator checks if the prototype of the
object on the left side of the operator is set to the `prototype` property of
the class on the right side of the operator.

## What you learned

In this article, you learned

* how to define an ES2015 class containing a constructor method that initializes
  one or more properties;
* how to instantiate an instance of a class using the `new` keyword;
* how to define instance and static class methods;
* that ES2015 classes are primarily syntactic sugar over constructor functions
  and prototypes; and
* how to use the `instanceof` operator to check if an object is an instance of a
  specific class.

[hoisting]: https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
[rest parameters]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters

________________________________________________________________________________

# The DNA of JavaScript Inheritance

Classes don't have to be defined and used in isolation from one another. It's
possible to base a class—a _child_ class—upon another class—the _parent_
class—so that the child class can access or inherit properties and methods
defined within the parent class.

Basing a class upon another class is commonly known as _inheritance_. Leveraging
inheritance gives you a way to share code across classes, preventing code
duplication and keeping your code DRY (don't repeat yourself).

When you finish this article, you should be able to:

* Define a parent class;
* Use the `extends` keyword to define a child class that inherits from a parent
  class;
* Understand that inheritance in JavaScript is implemented using prototypes; and
* Define a method in a child class that overrides a method in the parent class.

## Defining a parent class

Imagine that you recently started a new project developing an application to
track your local library's catalog of books and movies. You're excited to get
started with coding, so you jump right in and define two classes: `Book` and
`Movie`.

### Defining the `Book` and `Movie` classes

The `Book` class contains `title`, `series`, and `author` properties and a
`getInformation()` method. The `getInformation()` method returns a string
containing the `title` and `series` property values if the `series` property has
a value. Otherwise, it simply returns the `title` property value. Here's what
your initial implementation looks like:

```js
class Book {
  constructor(title, series, author) {
    this.title = title;
    this.series = series;
    this.author = author;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}
```

The `Movie` class contains `title`, `series`, and `director` properties and a
`getInformation()` method which behaves just like the `Book.getInformation()`
method. Here's your initial implementation:

```js
class Movie {
  constructor(title, series, director) {
    this.title = title;
    this.series = series;
    this.director = director;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}
```

To help facilitate a quick test, you instantiate an instance of each class and
log to the console a call to each instance's `getInformation()` method:

```js
const theGrapesOfWrath = new Book('The Grapes of Wrath', null, 'John Steinbeck');
const aNewHope = new Movie('Episode 4: A New Hope', 'Star Wars', 'George Lucas');

console.log(theGrapesOfWrath.getInformation()); // The Grapes of Wrath
console.log(aNewHope.getInformation()); // Episode 4: A New Hope (Star Wars)
```

To test your code, you use Node.js to execute the JavaScript file that contains
your code (`index.js`) from the terminal by running the command `node index.js`.
Here's the output in the terminal window:

```sh
The Grapes of Wrath
Episode 4: A New Hope (Star Wars)
```

Feeling good about the progress that you've made on the project, you decide to
take a break and grab a snack and something to drink. Upon your return, you
review your code for the `Book` and `Movie` classes and quickly notice that the
classes both contain the following members (i.e. properties and methods):

* The `title` and `series` properties; and
* The `getInformation()` method.

Your code isn't very DRY (don't repeat yourself)!

### Defining the `CatalogItem` parent class

While this is an arbitrary example, it illustrates a situation that often arises
in software development projects. It can be difficult to anticipate when and
where code duplication will occur.

While the `Book` and `Movie` classes represent two different types of items
found in the library's catalog, they're also both catalog items. That
commonality between the classes allows you to leverage inheritance to keep your
code DRY.

Inheritance is when a class is based upon another class. When a class inherits
from another class, it gets access to its properties and methods.

To use inheritance, you'll create a new `CatalogItem` parent class and move the
`title` and `series` properties and the `getInformation()` method into that
class. Then you'll update the `Book` and `Movie` classes to inherit from the
`CatalogItem` parent class.

Here's what the implementation for the `CatalogItem` parent class looks like:

```js
class CatalogItem {
  constructor(title, series) {
    this.title = title;
    this.series = series;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}
```

## Inheriting from a class

Now you need to update the `Book` and `Movie` classes to inherit from the
`CatalogItem` parent class. To do that, you'll make the following changes to the
`Book` class:

* Use the `extends` keyword to indicate that the `Book` class inherits from the
  `CatalogItem` class;
* Use the `super` keyword to call the `CatalogItem` class's `constructor()`
  method from within the `Book` class's `constructor()` method; and
* Remove the `getInformation()` method from the `Book` class.

To indicate that the `Book` class inherits from the `CatalogItem` class, add the
`extends` keyword after the class name followed by the name of the parent class:

```js
class Book extends CatalogItem {
  constructor(title, series, author) {
    this.title = title;
    this.series = series;
    this.author = author;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}
```

> Remember that class declarations aren't hoisted like function declarations, so
> you need to ensure that the `CatalogItem` class is declared **before** the
> `Book` and `Movie` classes or a runtime error will be thrown.

Since the `Book` class defines a `constructor()` method, the `constructor()`
method in the `CatalogItem` parent class must be called before attempting to use
the `this` keyword to initialize properties within the `Book` class's
`constructor()` method. To call the `constructor()` method in the parent class,
use the `super` keyword:

```js
class Book extends CatalogItem {
  constructor(title, series, author) {
    super(title, series);
    this.author = author;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}
```

Notice that the `title` and `series` parameters are passed to the parent class's
`constructor()` method by calling the `super` keyword as a method and passing in
the `title` and `series` parameters as arguments. Failing to call the parent
class's `constructor()` method before attempting to use the `this` keyword would
result in a runtime error.

Lastly, since the `getInformation()` is defined in the `CatalogItem` parent
class, the `getInformation()` method can be safely removed from the `Book`
class:

```js
class Book extends CatalogItem {
  constructor(title, series, author) {
    super(title, series);
    this.author = author;
  }
}
```

That completes the updates to the `Book` class! Now you can turn your attention
to the `Movie` class, which needs to be refactored in a similar way.

> **Time to practice!** To help reinforce your learning, try to make the changes
> to the `Movie` class on your own. When you're done, compare your code to the
> code shown below.

Here's the updated `Movie` class:

```js
class Movie extends CatalogItem {
  constructor(title, series, director) {
    super(title, series);
    this.director = director;
  }
}
```

Go ahead and use Node to re-run your application (`node index.js`) to confirm
that the output to the terminal window is unchanged. You should see the
following output:

```sh
The Grapes of Wrath
Episode 4: A New Hope (Star Wars)
```

Great job! You've improved your code without breaking the behavior of your
application.

For reference, here's the current state of your code:

```js
class CatalogItem {
  constructor(title, series) {
    this.title = title;
    this.series = series;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}

class Book extends CatalogItem {
  constructor(title, series, author) {
    super(title, series);
    this.author = author;
  }
}

class Movie extends CatalogItem {
  constructor(title, series, director) {
    super(title, series);
    this.director = director;
  }
}

const theGrapesOfWrath = new Book('The Grapes of Wrath', null, 'John Steinbeck');
const aNewHope = new Movie('Episode 4: A New Hope', 'Star Wars', 'George Lucas');

console.log(theGrapesOfWrath.getInformation()); // The Grapes of Wrath
console.log(aNewHope.getInformation()); // Episode 4: A New Hope (Star Wars)
```

> The `CatalogItem`, `Book`, and `Movie` classes form a simple _class
> hierarchy_. More complicated class hierarchies can include as many as a dozen
> or more classes.

### Understanding how `this` works from within a parent class

Reviewing the `CatalogItem` parent class, you'll notice that the `this` keyword
is used both in the `constructor()` and `getInformation()` methods:

```js
class CatalogItem {
 constructor(title, series) {
   this.title = title;
   this.series = series;
 }

 getInformation() {
   if (this.series) {
     return `${this.title} (${this.series})`;
   } else {
     return this.title;
   }
 }
}
```

Regardless of where the `this` keyword is used, it always references the
instance object (the object created using the `new` keyword). This behavior
allows the `constructor()` method in a class—child or parent—to initialize
properties on the instance object. It also gives access to instance object
properties from within any instance method, regardless if the method is defined
in a child or parent class.

## Understanding how inheritance works in JavaScript

Earlier in this lesson, you saw how the `instanceof` operator and the
`Object.getPrototypeOf()` method could be used to confirm that ES2015 classes
are primarily _syntactic sugar_ over constructor functions and prototypes. We
can use similar debugging techniques to see how class inheritance in JavaScript
is implemented using prototypes.

> _Syntactic sugar_ refers to the addition of syntax to a programming language
> that provides a simpler or more concise way to leverage features that already
> exist as opposed to adding new features.

For reference, here are the `CatalogItem` and `Book` class definitions that
we've been working with in this article:

```js
class CatalogItem {
  constructor(title, series) {
    this.title = title;
    this.series = series;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}

class Book extends CatalogItem {
  constructor(title, series, author) {
    super(title, series);
    this.author = author;
  }
}
```

To review, we can use the `instanceof` operator to verify that the `CatalogItem`
and `Book` classes are actually `Function` objects, not special "Class" objects
or types:

```js
console.log(Catalogitem instanceof Function); // true
console.log(Book instanceof Function); // true
```

The underlying function for the `Book` class, like a constructor function, has a
`prototype` property. The object referenced by the `Book.prototype` property is
used to set the prototype (i.e. `[[prototype]]`) for every instance of the
`Book` class.

We can verify this using the `Object.getPrototypeOf()` method:

```js
// Create an instance of the Book class.
const theGrapesOfWrath = new Book('The Grapes of Wrath', null, 'John Steinbeck');

// Verify that the prototype of the instance
// references the `Book.prototype` object.
console.log(Object.getPrototypeOf(theGrapesOfWrath) === Book.prototype); // true
```

The `Book` class uses the `extends` keyword to inherit from the `CatalogItem`
class. This gives instances of the `Book` class access to the `getInformation()`
method defined within the `CatalogItem` class. But how is that accomplished?

### Inheritance, prototype chains, and delegation

Just like the `Book` class, the underlying function for the `CatalogItem` class
has a `prototype` property. Because the `Book` class inherits from the
`CatalogItem` class, the object referenced by the `Book.prototype` property will
have its `[[prototype]]` set to the `CatalogItem.prototype` property.

Again, we can verify this using the `Object.getPrototypeOf()` method:

```js
console.log(Object.getPrototypeOf(Book.prototype) === CatalogItem.prototype); // true
```

The relationships between the `Book` instance, the `Book.prototype` property,
and the `CatalogItem.prototype` property form a _prototype chain_.

In fact, the prototype chain doesn't end with the `CatalogItem.prototype`
property. The object referenced by the `CatalogItem.prototype` property has its
`[[prototype]]` set to the `Object.prototype` property, which is the default
base prototype for all objects.

Yet again, we can verify this using the `Object.getPrototypeOf()` method:

```js
console.log(Object.getPrototypeOf(CatalogItem.prototype) === Object.prototype); // true
```

Notice that as we move from the bottom of the prototype chain to the top, from
the `Book.prototype` object to the `CatalogItem.prototype` object to the
`Object.prototype` object, we move from more specialized objects to more generic
objects.

> Prototype trivia: `Object.prototype` is the `[[prototype]]` for all object
> literals and the base `[[prototype]]` for any objects created with the `new`
> keyword.

Remember that a prototype is an object that's delegated to when a property or
method can't be found on an object. We just saw that a class hierarchy defines a
prototype chain. A prototype chain in turn defines a series of prototype objects
that are delegated to, one by one, when a property or method can't be found on
an instance object.

For example, we can call the `getInformation()` method on an instance of the
`Book` class, like this:

```js
console.log(theGrapesOfWrath.getInformation()); // The Grapes of Wrath
```

The following occurs when the `getInformation()` method is invoked:

* JavaScript looks for the `getInformation()` method on the `theGrapesOfWrath`
  object.
* When the method isn't found, the method call is delegated to the
  `theGrapesOfWrath` object's `[[prototype]]` (the object referenced by the
  `Book.prototype` property).
* When the method isn't found (again), the method call is delegated to the
  `Book.prototype` property object's `[[prototype]]` (the object referenced by
  the `CatalogItem.prototype` property).
* This time the method is found (yes!) and the method is successfully called
  with `this` set to the `theGrapesOfWrath` object.

Using this system of delegation, JavaScript provides a mechanism for objects to
"inherit" properties and methods from other objects. Because of its use of
prototypes, JavaScript's implementation of inheritance is technically known as
_prototypal inheritance_.

## Overriding a method in a parent class

Defining a method in a parent class to add behavior to all of its descendant
classes is useful and helps to keep your code DRY (don't repeat yourself). But
what if a specific child class needs to modify the behavior of the parent class
method?

For example, what if the `getInformation()` method for the `Movie` class needs
to add the director's name to the end of the string that's returned by the
method? One way to satisfy this requirement is to override the parent class's
`getInformation()` method in the child class.

> _Method overriding_ is when a child class provides an implementation of a
> method that's already defined in a parent class.

Taking advantage of how delegation works in JavaScript, to override a method in
a parent class, you can simply define a method in a child class with the same
method name:

```js
class Movie extends CatalogItem {
  constructor(title, series, director) {
    super(title, series);
    this.director = director;
  }

  getInformation() {
    // TODO Implement this method!
  }
}
```

Now when the `getInformation()` method is called on an instance of the `Movie`
class, the method will be found on the instance's `[[prototype]]` (the object
referenced by the `Movie.prototype` property). This stops JavaScript from
searching any further up the prototype chain, so the `getInformation()` method
that's defined in the `CatalogItem` class isn't even considered.

> You can think of the `getInformation()` method that's defined in the `Movie`
> class as "shadowing" or "hiding" the `getInformation()` method that's defined
> in the `CatalogItem` class.

Now we need to implement the `getInformation()` method in the `Movie` class. We
**could** copy and paste the code from the `getInformation()` method in the
`CatalogItem` class as a starting point, but we want to keep our code DRY!

What if we could call the `getInformation()` method in the `CatalogItem` class
from within the `getInformation()` method in the `Movie` class? Using the
`super` keyword, we can:

```js
class Movie extends CatalogItem {
  constructor(title, series, director) {
    super(title, series);
    this.director = director;
  }

  getInformation() {
    let result = super.getInformation();

    if (this.director) {
      result += ` [directed by ${this.director}]`;
    }

    return result;
  }
}
```

In the above implementation of the `getInformation()` method, the `super`
keyword is used to reference the `getInformation()` method that's defined in the
parent class—the `CatalogItem` class. We then take that result of calling the
`getInformation()` method in the parent class and append the `director` property
in brackets (i.e. `[]`) as long as the `director` property actually has a value.

Now we've modified the behavior of a parent class method without having to
duplicate code between classes!

## What you learned

In this article, you learned

* how to define a parent class;
* how to use the `extends` keyword to define a child class that inherits from a
  parent class;
* that inheritance in JavaScript is implemented using prototypes; and
* how to define a method in a child class that overrides a method in the parent
  class.

________________________________________________________________________________
# Using Modules in Node.js

Up until now, you've used Node to run a single JavaScript file that contains all
of your code. For trivial Node applications, this approach works fine, but for
most Node applications, a different approach is required. Instead of a single,
monolithic JavaScript file that contains all of your application code, you'll
use multiple files, with each file containing a logical unit of code that
defines a module.

When you finish this article, you should be able to:

- Add a local module to a Node.js application;
- Use the `module.exports` property to export from a module;
- Use the `require()` function to import from a module;
- Use modules that export a single item; and
- Understand how module loading works in Node.js.

> **This article only covers using modules in Node.js.** Later on, you'll learn
> how to use modules with JavaScript that runs in the browser.

## Introducing Node.js modules

In Node.js, each JavaScript file in a project defines a module. A module's
content is private by default, preventing content from being unexpectedly
accessed by other modules. Content must be explicitly exported from a module so
that other modules can import it. You'll learn how to share content between
modules later in this article.

Modules defined within your project are known as _local modules_. Ideally, each
local module has a single purpose that's focused on implementing a single bit of
functionality. Local modules, along with core and third-party modules, are
combined to create your application.

### Core and third-party modules

_Core modules_ are the native modules contained within Node.js that you can use
to perform tasks or to add functionality to your application. Node contains a
variety of core modules, including modules for working with file paths (`path`),
reading data from a stream one line at a time (`readline`), reading and writing
files to the local file system (`fs`), and creating HTTP servers (`http`).

Developers, companies, and organizations that use Node.js also create and
publish modules that you can use in your applications. These _third-party
modules_ are distributed and managed using [npm][npm], a popular package manager
for Node.js. You'll learn about npm and package managers in a future lesson.

### The CommonJS module system

Recent versions of Node.js actually contain two different module systems. A
legacy module system known as _CommonJS_ and a newer module system known as
_ECMAScript Modules_ or simply _ES Modules_. Conceptually, CommonJS and ES
Modules are similar, but their syntax and implementation details differ.

ES Modules will eventually replace CommonJS, but the transition won't happen
overnight. Like older versions of JavaScript, CommonJS modules may never
disappear completely due to the amount of legacy Node.js code that exists.

> You'll start with learning about and using CommonJS modules. In a future
> lesson, you'll be introduced to ES Modules.

## Adding a local module to a Node.js application

To add a local module to a Node application, simply add a new JavaScript file
(`.js`) to your project! You can locate the file in the root of the project or
within a folder or a nested folder.

Here's a screenshot of adding a `classes` module (`classes.js`) to the root
folder of a Node application in Visual Studio Code:

![new-module][new-module]

[new-module]:
  https://-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/classes/assets/js-classes-new-module.png

The `classes` module will define the classes for a simple library catalog
application, which will be used to track a library's catalog of books and
movies.

Here's the code for the `CatalogItem`, `Book`, and `Movie` classes:

**classes.js**

```js
class CatalogItem {
  constructor(title, series) {
    this.title = title;
    this.series = series;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}

class Book extends CatalogItem {
  constructor(title, series, author) {
    super(title, series);
    this.author = author;
  }
}

class Movie extends CatalogItem {
  constructor(title, series, director) {
    super(title, series);
    this.director = director;
  }

  getInformation() {
    let result = super.getInformation();

    if (this.director) {
      result += ` [directed by ${this.director}]`;
    }

    return result;
  }
}
```

The `CatalogItem` class represents an item in the library's catalog. The
`CatalogItem` class serves as the parent class to the `Book` and `Movie`
classes, which respectively represent books and movies in the library's catalog.

Code contained within a module is private by default, meaning that it's only
accessible to other code contained with that module. If you attempted to
reference the `Book` or `Movie` classes in the `index.js` file, you'd get a
runtime error.

> The `index.js` file is the entry point for the application. A Node
> application's _entry point_ is the file that's passed to the `node` command
> (i.e. `node index.js`) when starting an application from the terminal.

## Exporting from a module

To make the `Book` and `Movie` classes accessible to other modules in our
application, you need to export them.

Each module in Node has access to a `module` object that represents the current
module. The `module` object contains a number of properties that provide
information about the current module. One of those properties, the
`module.exports` property, is used to export items from the module.

To export an item, simply define a property for that item on the
`module.exports` object:

**classes.js**

```js
class CatalogItem {
  // Contents removed for brevity.
}

class Book extends CatalogItem {
  // Contents removed for brevity.
}

class Movie extends CatalogItem {
  // Contents removed for brevity.
}

module.exports.Book = Book;
module.exports.Movie = Movie;
```

Node initializes the `module.exports` property to an empty object. If you don't
declare and initialize any properties on the `module.exports` object, then
nothing will be exported from the module.

The `module.exports` property names don't need to match the class names, but for
this specific example, it makes sense to keep the property names consistent with
the class names.

> Notice that we're intentionally not exporting the `CatalogItem` class. The
> `CatalogItem` class is the parent class for the `Book` and `Movie` classes and
> can stay private to this module.

In this example (and the others that follow), we're exporting an ES2015 class,
but what you can export from a module isn't restricted to just classes. You can
just as easily export a function or an object.

### Assigning a new object to the `module.exports` property

Instead of defining properties on the `module.exports` property, you can assign
a new object that contains a property for each item that you want to export:

**classes.js**

```js
class CatalogItem {
  // Contents removed for brevity.
}

class Book extends CatalogItem {
  // Contents removed for brevity.
}

class Movie extends CatalogItem {
  // Contents removed for brevity.
}

module.exports = {
  Book,
  Movie
};
```

Both approaches will look the same to the consumers of the module, so choosing
which approach to use is a stylistic choice.

### The `exports` shortcut

In addition to the `module.exports` property, Node provides an `exports`
variable that's initialized to the `module.exports` property value. Instead of
defining properties on the `module.exports` property, you can use the `exports`
variable as a shortcut:

**classes.js**

```js
class CatalogItem {
  // Contents removed for brevity.
}

class Book extends CatalogItem {
  // Contents removed for brevity.
}

class Movie extends CatalogItem {
  // Contents removed for brevity.
}

exports.Book = Book;
exports.Movie = Movie;
```

While this is handy, it's important to note that you can't use the `exports`
variable if you want to assign a new object to the `module.exports` property:

**classes.js**

```js
class CatalogItem {
  // Contents removed for brevity.
}

class Book extends CatalogItem {
  // Contents removed for brevity.
}

class Movie extends CatalogItem {
  // Contents removed for brevity.
}

// Don't do this!
// Assigning a new value to the `exports` variable
// doesn't update the `module.exports` property.
exports = {
  Book,
  Movie
};
```

To understand why this doesn't work, let's imagine how Node initializes the
`module.exports` property and declares and initializes the `exports` variable:

```js
// Initialize the `module.exports` property to an empty object.
module.exports = {};

// Declare and initialize the `exports` variable.
let exports = module.exports;
```

Assigning a new value to the `exports` variable breaks the linkage between the
variable and the `module.exports` property:

**classes.js**

```js
// Class definitions removed for brevity.

// Assign a new value to the `exports` variable.
exports = {
  Book,
  Movie
};

// The `module.exports` property still references an empty object.
console.log(module.exports); // {}
```

While the `exports` variable now references your new object, the
`module.exports` property still references the empty object that Node assigned
to it. This results in nothing being exported from your module.

Just remember to only define properties on the `exports` variable—never assign a
new value to it!

> Because of this issue, some developers and teams prefer to use the
> `module.exports` property exclusively and ignore that the `exports` shortcut
> exists. As long as you understand how to properly use the `exports` variable,
> it's safe to use in your applications.

## Importing from a module

The code for the application's entry point, `index.js`, looks like this:

**index.js**

```js
const theGrapesOfWrath = new Book(
  "The Grapes of Wrath",
  null,
  "John Steinbeck"
);
const aNewHope = new Movie(
  "Episode 4: A New Hope",
  "Star Wars",
  "George Lucas"
);

console.log(theGrapesOfWrath.getInformation()); // The Grapes of Wrath
console.log(aNewHope.getInformation()); // Episode 4: A New Hope (Star Wars) [directed by George Lucas]
```

If you attempted to run your application using the command `node index.js`,
you'd receive the following error:

```sh
ReferenceError: Book is not defined
```

You're attempting to instantiate an instance of the `Book` class but that class
is defined in the `classes` module, not the `index` module (the module defined
by the `index.js` file).

Each module needs to explicitly state what it needs from other modules by saying
"I need this and this to run". When a module needs something from another
module, it's said to be dependent on that module. A module's dependencies are
the modules that it needs to run.

### The `require()` function

The `index` module is dependent upon the `Book` and `Movie` classes, so you need
to import them from the `classes` module. To do that, you can use the
`require()` function:

**index.js**

```js
// Use the `require()` function to import the `classes` module.
const classes = require("./classes");

// Declare variables for each of the properties
// defined on the `classes` object.
const Book = classes.Book;
const Movie = classes.Movie;

const theGrapesOfWrath = new Book(
  "The Grapes of Wrath",
  null,
  "John Steinbeck"
);
const aNewHope = new Movie(
  "Episode 4: A New Hope",
  "Star Wars",
  "George Lucas"
);

console.log(theGrapesOfWrath.getInformation()); // The Grapes of Wrath
console.log(aNewHope.getInformation()); // Episode 4: A New Hope (Star Wars) [directed by George Lucas]
```

To import from a local module, you pass to the `require()` function a path to
the module: `./classes`. The dot in the path means to start in the current
folder and look for a module named `classes`. The module name is the name of the
file without the `.js` file extension.

> You can optionally include the `.js` file extension after the module name, but
> most of the time it's omitted.

Remember that the `classes` module exports an object (using the `module.exports`
property) with two properties, `Book` and `Movie`, which reference the `Book`
and `Movie` classes defined within the `classes` module. The object that the
`classes` module exports is what's returned from the `require()` function call
and captured by the `classes` variable:

**index.js**

```js
const classes = require("./classes");
```

To make it a little easier to reference the `Book` and `Movie` classes, local
variables are declared for each:

**index.js**

```js
const Book = classes.Book;
const Movie = classes.Movie;
```

Now if you run your application using the command `node index.js`, you'll see
the following output:

```sh
The Grapes of Wrath
Episode 4: A New Hope (Star Wars) [directed by George Lucas]
```

To review, when a module requires code from another module it becomes dependent
on that module. So, in this example, the `index` module has a dependency on the
`classes` module—without the `Book` and `Movie` classes this code in the `index`
module wouldn't be able to successfully run.

### Using destructuring when importing

Instead of declaring a variable for the module that you're importing and then
declaring a variable for each individual item that the module exports, you can
use destructuring to condense that code to a single statement:

**index.js**

```js
const { Book, Movie } = require("./classes");

const theGrapesOfWrath = new Book(
  "The Grapes of Wrath",
  null,
  "John Steinbeck"
);
const aNewHope = new Movie(
  "Episode 4: A New Hope",
  "Star Wars",
  "George Lucas"
);

console.log(theGrapesOfWrath.getInformation()); // The Grapes of Wrath
console.log(aNewHope.getInformation()); // Episode 4: A New Hope (Star Wars) [directed by George Lucas]
```

Either approach works fine, so this is one of the many stylistic choices you'll
make as a developer.

## Using single item modules

Knowing how best to organize a project using modules is challenging—even for
experienced developers. There's also a variety of valid approaches for
organizing projects. While there's no single "best" way (each approach has
benefits and drawbacks), some developers prefer modules that only export a
single item.

> Following the convention of a single exported item per module helps to keep
> modules focused and less likely to become bloated with too much code. This has
> many advantages including improving the readability and manageability of your
> code.

### Splitting apart the `classes` module

Currently, the `classes` module (defined by the `classes.js` file) defines and
exports three classes: `CatalogItem`, `Book`, and `Movie`. Let's split apart the
`classes` module so that each class will become its own module.

Start by adding a folder to your project named `classes`. Then add three files
to the `classes` folder, one for each class: `catalog-item.js`, `book.js`, and
`movie.js`. Here's a screenshot of the project after these changes:

![module-refactoring][module-refactoring]

[module-refactoring]:
  https://-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/classes/assets/js-classes-module-refactoring.png

Now you're ready to move the `CatalogItem` class from the `classes` module to
the `catalog-item` module. To do that, copy and paste the code for the
`CatalogItem` class from one module to the other:

**classes/catalog-item.js**

```js
class CatalogItem {
  constructor(title, series) {
    this.title = title;
    this.series = series;
  }

  getInformation() {
    if (this.series) {
      return `${this.title} (${this.series})`;
    } else {
      return this.title;
    }
  }
}
```

For any module that contains or exports a single item, we can simply assign that
item to the `module.exports` property:

**classes/catalog-item.js**

```js
class CatalogItem {
  // Contents removed for brevity.
}

module.exports = CatalogItem;
```

Next, move the `Book` class from the `classes` module to the `book` module,
copying and pasting the code for the `Book` class from one module to the other:

**classes/book.js**

```js
class Book extends CatalogItem {
  constructor(title, series, author) {
    super(title, series);
    this.author = author;
  }
}
```

Sharp eyes will notice that the `Book` class inherits from the `CatalogItem`
class (using the `extends` keyword). This means that the `book` module has a
dependency on the `catalog-item` module.

You can import the `CatalogItem` class using the `require()` function, declaring
and initializing a variable for the single item that's exported from the module:

**classes/book.js**

```js
const CatalogItem = require("./catalog-item");

class Book extends CatalogItem {
  // Contents removed for brevity.
}
```

This demonstrates that when importing from a module, you need to be aware if the
module exports a single item or multiple items. For local modules, you can
review the code for the module you're importing from to determine how the
`module.exports` property is being used. For core modules in Node or third-party
modules, you'll need to consult the documentation for the module if you're
unfamiliar with the module.

Finish up the `book` module by exporting the `Book` class from the module:

**classes/book.js**

```js
const CatalogItem = require("./catalog-item");

class Book extends CatalogItem {
  // Contents removed for brevity.
}

module.exports = Book;
```

Now you're ready to move the `Movie` class from the `classes` module to the
`movie` module. The process and end result, will look a lot like the `book`
module:

**classes/movie.js**

```js
const CatalogItem = require("./catalog-item");

class Movie extends CatalogItem {
  constructor(title, series, director) {
    super(title, series);
    this.director = director;
  }

  getInformation() {
    let result = super.getInformation();

    if (this.director) {
      result += ` [directed by ${this.director}]`;
    }

    return result;
  }
}

module.exports = Movie;
```

After moving the classes to their own modules, you can safely remove the
`classes` module by deleting the `classes.js` file.

The last change that you need to make is to the `index` module. The `index`
module needs to import the `Book` and `Movie` classes from the new modules:

**index.js**

```js
const Book = require("./classes/book");
const Movie = require("./classes/movie");

const theGrapesOfWrath = new Book(
  "The Grapes of Wrath",
  null,
  "John Steinbeck"
);
const aNewHope = new Movie(
  "Episode 4: A New Hope",
  "Star Wars",
  "George Lucas"
);

console.log(theGrapesOfWrath.getInformation()); // The Grapes of Wrath
console.log(aNewHope.getInformation()); // Episode 4: A New Hope (Star Wars) [directed by George Lucas]
```

Notice that the `classes` folder name needed to be added to the path that's
passed to the `require()` function.

If you run your application again using the command `node index.js`, you'll see
the following output (which is unchanged from the previous version of the
application):

```sh
The Grapes of Wrath
Episode 4: A New Hope (Star Wars) [directed by George Lucas]
```

## Understanding module loading

In this article, we've focused on creating and using local modules, but that's
just one of the available module types. How does Node determine if a module is a
local, core, or third-party module?

### Module loading logic

When attempting to load a module, Node will examine the identifier passed to the
`require()` function to determine if the module is a local, core, or third-party
module:

- Local module = identifier starts with `./`, `../`, or `/`
- Node.js core module = identifier matches a core module name
- Third-party module = identifier matches a module in the `node_modules` folder

If the identifier starts with `./`, `../`, or `/`, then Node will attempt to
load a local module from the current project using the provided path.

If the identifier passed to the `require()` function isn't a path, then Node
will check if the module name matches a core module name.

If the identifier isn't a core module, then Node will attempt to load the module
from the `node_modules` folder. The `node_modules` folder is a special folder
that the `npm` package manager creates. You'll learn more about npm and the
`node_modules` folder in a future lesson.

### Module loading process

The first time that a module is imported by another module, Node will load the
module, execute the code contained with the module, and return the
`module.exports` object to the consuming module. To help improve performance,
Node caches modules so that they only need to be loaded and executed once.

An interesting side effect of the module loading process is that code contained
within a module is only executed when it's first imported by another module. If
a module is never imported by another module—meaning that it's not a dependency
of another module—then the code contained within that module won't be executed.

The exception to this rule is the module that's specified as the entry point for
your application. Typically that's the `index.js` or `app.js` file located in
the root of your project folder. Code in the entry point module is automatically
executed by Node when the application is started.

## What you learned

In this article, you learned

- how to add a local module to a Node.js application;
- how to use the `module.exports` property to export from a module;
- how to use the `require()` function to import from a module;
- how to use modules that export a single item; and
- how module loading works in Node.js.

[npm]: https://www.npmjs.com/

________________________________________________________________________________

# Constructor Functions and Classes Project

Time to practice creating and using constructor functions and ES2015 classes.
Your objective is to implement the requirements listed in each file of the
`/problems` directory. In addition to the prompts available at the top of each
file, Mocha specs are provided to test your work.

To get started, use the following commands:

1. `cd` into the project directory
2. `npm install` to install any dependencies
3. `mocha` to run the test cases

________________________________________________________________________________
# WEEK-05 DAY-3<br>*Classes and Objects* {ignore=true}
________________________________________________________________________________

# Object-Oriented Programming Learning Objectives

Object-Oriented Programming (OOP) is one of the most popular programming
paradigms. Additionally, OOP can help beginning engineers learn how to breakdown
complex problems.

You will be tested on this material by completing a guided project using the
following principles. You will also answer questions about their definitions.

* The three pillars of object-oriented programming
* How to apply the Law of Demeter
________________________________________________________________________________
# Object-Oriented Programming Explained

JavaScript is an object-oriented language. You've already used objects in your
programming. For example, when you write

```js
const array = [1, 2, 3, 4];
const squares = array.map(x => x * x);
```

the value stored in `array` is an object! The value stored in `squares` is
_another_ object! There are objects all over the place!

In this article, you're going to learn the theory of object-oriented
programming, the features that make it different than other kinds of
programming.

* The property of encapsulation.
* The property of inheritance.
* The property of polymorphism.

These features allow us to thoughts in a way that (hopefully) represents the way
that we, as humans, think and reason about the world.

## Encapsulation: enclose (something) in or as if in a capsule

When you write a class, you do something amazing which revolutionized the
organization of computer software source code: you put behavior (the methods)
and the data it works on (instance variables, also called _fields_) together. Up
to that point, programmers had to deal with code that declared data structures
in one file and used in multiple other files all over the code base.
Understanding where data got changed became exponentially difficult as the size
of software grew.

Knowing where data changes is the most important aspect of software. Every
change in the way programmers like yourself organize your code has been about
maintainability, about how and where you should put the code that runs the
instructions that makes the software works. In a lot of object-oriented
languages, like Java, C++, Objective-C, and C#, they tend to either enforce or
encourage putting _one class definition per file_. You are not bound by that
restriction or convention in JavaScript.

![vending machines](images/lighted-vending-machines-on-street-2338113-v2.jpg)

Imagine, if you will, that you want to buy something from a vending machine. You
tap your phone against the payment reader (or insert coins into a slot, or swipe
a credit card). Once the payment is authorized in any of those forms, you can
make a selection and receive your tasty treat. If you were to think about that
as a series of steps, you could write them like this.

1. Authorize payment through payment vendor
1. Make selection
1. Retrieve tasty treat

With respect to the concepts of object-oriented programming, the vending machine
would be an object. All of the internal workings of the machine, how it
communicates wirelessly with a payment vendor, how its internal mechanics thrash
about to deliver a beverage or snack to you, all of that is hidden behind a
plastic advertisement. All of that behavior is _encapsulated_ inside the machine
so that you don't have to worry about the details. Imagine a less encapsulated
world where you had to perform the following steps to get your tasty treat.

1. Call your payment provider.
1. Specify that you want to spend no more than $2 on your next purchase.
1. Write down a confirmation number for an authorization of up to a $2 payment.
1. Call the vending machine company.
1. Give them your payment authorization confirmation number.
1. Key in a 16-digit authorization number that they tell you.
1. Make selection.
1. Tell the vending company the transaction number and the total amount.
1. Retrieve tasty treat.

Now, instead of hiding all the details about how payments work, the vending
machines forces you to have to participate in the payment process. A system such
as this relies on people acting as good agents when they report the total amount
with the transaction number. A system such as this is inconvenient for the
person that has a desire to sate. The vending machine _encapsulates the
complexity of its internal mechanisms behind easy-to-use interactions_. The same
goes with encapsulation with object-oriented programming.

Say that you wanted to write software that helped gyms manage their business.
Something that can happen at the gym would be that you want to register a person
as a member for the gym. Code that does that may look something like this.

```js
class Gym {
  registerMember(firstName, lastName, email, creditCardInfo) {
    const person = new Person(lastName, firstName, email);
    person.addCardInfo(creditCardInfo);
    this.members.push(person);
  }

  // Lots of other code
}
```

When other code uses this, all it knows about how the gym object works is that
there's a method named `registerMember` and if you give it some information,
then a person becomes a member of the gym. Imagine that the code inside the
`registerMember` function was written like this instead:

```js
class Gym {
  registerMember(firstName, lastName, email, creditCardInfo) {
    this.members[this.members.length] = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      creditCardInfo: creditCardInfo,
    };
  }

  // Lots of other code
}
```

The encapsulation of the behavior (adding a new member to the gym) is hidden
behind the method name `registerMember`. Any code which uses the `registerMember`
method of the `Gym` class doesn't care what the code looks like inside of `Gym`.
It still just uses it like this:

```js
gym = new Gym();
gym.registerMember('Margaret', 'Hamilton', 'mh@mit.edu', null);
```

Encapsulation puts the behavior and data together behind methods that hide the
specific implementation so that code that uses it doesn't need to worry about
the details of it.

## Inheritance: derived from one's ancestors

![grandchild and grandmother](images/man-and-woman-sitting-on-bench-in-grayscale-photography-1049557-v2.jpg)

In the same way that biology passes traits of a parent organism to its
descendants, so does object-oriented programming through its support of
**inheritance**. There are a lot of different kinds of inheritance because there
are a bunch of different "type systems" that programming languages support.
JavaScript, in particular, supports a type of inheritance known as
**implementation inheritance** through a mechanism known as **prototypal
inheritance**. _Implementation inheritance_ means that the data and methods
defined on a parent class are available on objects created from classes that
inherit from those parent classes. _Prototypal inheritance_ means that
JavaScript uses prototype objects to make its _implementation inheritance_
actually work.

Notes: Here is some terminology for you.
* For the sake of brevity, you should understand that whenever you read the
  phrase "parent class", that also means "prototype".
* "Super class" is another name for "parent class".
* "Base class" is another name for "parent class".
* Sometimes, you will see "inheritance" referred to as "subtyping".

### A built-in example of inheritance

All object in JavaScript share a common parent class, the `Object` parent class.
The `Object` class has a method named `toString()` on it. Since all objects in
JavaScript are child classes (or grandchild classes or great grandchild classes
or great great...), that means that every object in JavaScript has a
`toString()` method! If a class doesn't create its own, then it will fall back
to its parent class' implementation of `toString()`. If the parent class doesn't
have an implementation, and the parent's parent class doesn't have an
implementation, it will keep going until it gets to the `Object` class and use
that one. (That's some recursion in there. Did you sense that?) Open a terminal,
start node, and type the following.

```sh
> [1, 2, 3].toString();
'1,2,3'
> "some text".toString();
'some text'
> new Date().toString();
'«the current date and time»'
> new Object().toString();
[object Object]
```

You'll note the following:

* The `toString()` method of an array takes the values in the array and turns
  them into a comma-delimited string, that is, it puts commas between each of
  the items.
* The `toString()` method of a string does nothing and just returns the string
  object. (You might remember that strings are primitive types, but strings are
  special and you can also call methods on them like they are objects.)
* The `toString()` method of a `Date` object returns a long textual
  representation of the date and time that the `Date` object represents.
* The `toString()` method of `Object` returns the not so helpful "\[object
  Object\]".

When you declare a class with no explicit parent class, then JavaScript will
make it a child of `Object`.

```js
class MyClass {}

// is the same as
class MyClass extends Object {}
```

### A custom example of implementation inheritance

Imagine that you have created the following code in a JavaScript file and loaded
it into a browser (through a `<script>` tag) or run it with the node command.

```js
class Charity {}

class Business {
  toString() { return 'Give us your money.'; }
}

class Restaurant extends Business {
  toString() { return 'Eat at Joe\'s!'; }
}

class AutoRepairShop extends Business {}

class Retail extends Business {
  toString() { return 'Buy some stuff!'; }
}

class ClothingStore extends Retail {}

class PhoneStore extends Retail {
  toString() { return 'Upgrade your perfectly good phone, now!'; }
}

console.log(new PhoneStore().toString());
console.log(new ClothingStore().toString());
console.log(new Restaurant().toString());
console.log(new AutoRepairShop().toString());
console.log(new Charity().toString());
```

What do you think those last four lines will print out? Try running that code
to confirm your suspicions. (**Important**: When given the opportunity to try
out short snippets of code like the above example, _do not_ copy and paste it.
This is an opportunity for you to type it into an editor or command line to
become familiar with the syntax.)

The three classes `AutoRepairShop`, `Charity`, and `ClothingStore` in the
example above do not have their own `toString()` methods. That means that an
object of one of those three types can't respond to that method invocation. The
JavaScript runtime at that point starts inspecting prototype objects to find
a `toString()` method.

* For `AutoRepairShop`, it finds a `toString()` method on its parent class
  `Business`, and prints "Give us your money.".
* For `ClothingStore`, it finds a `toString()` method on its parent class
  `Retail`, and prints "Buy some stuff!".
* For `Charity`, it finds a `toString()` method on its implicit parent class
  `Object`, and prints "[object Object]".

### The nuts and bolts of prototypal inheritance

JavaScript is almost singularly unique in its concept of prototype-based
inheritance. No other commonly used language in the modern world has this kind
of inheritance. (Examples of languages that _do_ have prototypal inheritance
are [Common Lisp], [Self], and [Io]. These languages have niche markets that
some people adore. However, you would be hard-pressed to find them in use in
most software development shops.)

As you saw in the example from the last section, when you write code that
accesses a method (or property) on an object, if JavaScript doesn't find it, it
will "delegate" it to its prototype, that is, it will determine if the prototype
has that method (or property). If it doesn't find it there, it will delegate it
to the object's prototype's prototype until it reaches `Object`. If it doesn't
find it on `Object`, then you'll get an error or `undefined`, depending on the
mechanism that you're using.

Consider the following diagrams which show an object with `name` and `getAge`
properties. It has a parent object (prototype) that has `name` and `lastName`
properties. That parent object has another parent object that has a `toString`
property.

If you write code to get the `name` property of the object, it will look on that
object, determine that a `name` property exists, and return the value of that
property, "Djimon".

![resolve the name property](images/find-name-v2.png)

If you write code to get the `lastName` property of the object, it will look at
that object, see that there's no `lastName` property on it, and go to its parent
object, its prototype object. There, it sees a `lastName` property defined and
returns the value of that property, "Hounsou".

![resolve the lastName property](images/find-last-name-v2.png)

If you write code to invoke the `toString()` method of the object, it will look at
that object, see that there's no `toString` property on it, and go to its parent
object, which also doesn't have a `toString` property. Finally, it will look at
the grandparent object (the one in green) and see that it has that `toString()`
method on it and invoke it. But, the story doesn't end there.

![resolve the lastName property](images/find-tostring-v3.png)

When the `toString()` method runs, it accesses the `this` property to get
`this.name` and `this.lastName`. The `this` property _references the object that
the call originally came from_. That's really important.

> When JavaScript uses a property (or method) from a prototype that it found
> through prototypal inheritance, then the `this` property points to the
> original object on which the first call was made.

In this case, the call to `this.name` in the `toString()` method of the original
object's grandparent class acts just like the call to `o.name` from
two examples back. The call to `this.lastName` acts the same way.

Try the following code in your JavaScript environment to get a feel for it.
Change the assignments in the constructor. Remove assignments in the
constructor. See how changes affect the messages printed to the console.

```js
class Parent {
  constructor() {
    this.name = 'PARENT';
  }
  toString() {
    return `My name is ${this.name}`;
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.name = 'CHILD';
  }
}

const parent = new Parent();
console.log(parent.toString());

const child = new Child();
console.log(child.toString());
```

## Polymorphism: a cool sounding word to impress your friends

In object-oriented programming, polymorphism means that you can treat a variable
as if it were one of its parent types. You've already been doing this in
JavaScript through its prototypal inheritance. So, just remember its definition
for this course. It's a perennial favored question in interviews:

_Polymorphism is the ability to treat an object as if it were an instance of one
of its parent classes._

## What you've learned

In this reading, you learned about the three pillars of object-oriented
programming (encapsulation, inheritance, and polymorphism) and how they relate
to JavaScript.

You learned that encapsulation is just all of the details behind an object's
methods.

You learned that inheritance is the ability to gain behavior and data from
parent classes.

You learned that polymorphism is just a fancy work for being able to use the
methods of a parent class on an object of a child class.


[Common Lisp]: http://common-lisp.net/
[Io]: http://iolanguage.com/
[Self]: http://www.selflanguage.org/

________________________________________________________________________________
# The SOLID Principles Explained

The three pillars of object-oriented programming describe _how_ classes and
objects work. What they don't describe are good practices for _what_ should go
into a class. That's the difference between object-oriented programming
(pillars) and _object-oriented design_ (SOLID)! That's where the SOLID Principles
come in. "SOLID" is an anagram that stands for

* The Single-Responsibility Principle
* The Open-Close Principle
* The Liskov Substitution Principle
* The Interface Segregation Principle
* The Dependency Inversion Principle

Of these five principles, only two are directly applicable to your use of
JavaScript (and Python) in this course. Moreover, two are only truly applicable
in languages like Java, C++, and C#. This article spends many words explaining
the applicable ones and provides a definition for those that are not so
applicable in JavaScript (and Python).

It's really important that you don't stress out over being able to expertly
apply these principles any time in the next three years. Being able to apply
them takes practice and experience. You're getting introduced to them, now, so
that you can have the ideas in your brain. With them in your brain, they can
influence how you go about writing classes.

But, don't sit around thinking about the best way to apply these object-oriented
design principles. That is **analysis paralysis**! You'll get stuck and not be
able to get out of it. Working code is usually better than no code at all. You
can write code and, then, think about it, look at it, and start asking yourself
whether it follows these principles. That's the best way to start out. Don't
worry about applying them to your design _before_ you write any code. That will
come with practice.

## Single-Responsibility Principle

_A class should do one thing and do it well._

Robert C. Martin, otherwise known as "Uncle Bob", created the SOLID principles.
He explains the Single-Responsibility Principle as, "A class should have only
one reason to change." He has also described the way to do it as "Gather
together the things that change for the same reasons. Separate those things that
change for different reasons."

This principle is about limiting the impact of change.

A class should have the responsibility to have the data and behavior over a
single part of the functionality provided by your software, and that
responsibility should be entirely encapsulated by the class.

For example, consider the following class.

```js
// THIS IS BADLY DESIGNED CODE
class Book {
  constructor (title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.currentPage = 0;
  }

  addPage(page) {
    this.pages.push(page);
  }

  getCurrentPage() {
    return this.pages[this.currentPage];
  }

  turnPage() {
    this.currentPage += 1;
    if (this.currentPage >= this.pages.length) {
      this.currentPage = this.pages.length - 1;
    }
  }

  printText() {
    const firstPage = [this.title + "\n" + this.author];
    return firstPage.concat(this.pages);
  }

  printHTML() {
    const firstPage = [`<h1>${this.title}</h1>`];
    const htmlPages = this.pages.map(x => `<section>${x}</section>`);
    return htmlPages;
  }
}
```

What does the book class know about?

* How to manage the information about a book.
* How to print that book to different formats.

Think about a book that you would hold in your hand. Which of those two
"concerns" does the physical book know _nothing_ about?

If you answered "printing to different formats", yeah, that's the one. Printing
is a different "concern", a different set of responsibilities. Instead of having
a single `Book` class that can print itself, following the Single-Responsibility
Principle would have you create two classes.

```js
class Book {
  constructor (title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.currentPage = 0;
  }

  addPage(page) {
    this.pages.push(page);
  }

  getCurrentPage() {
    return this.pages[this.currentPage];
  }

  getPrintableUnits() {
    return this.pages;
  }

  turnPage() {
    this.currentPage += 1;
    if (this.currentPage >= this.pages.length) {
      this.currentPage = this.pages.length - 1;
    }
  }
}

class SimplePrinter {
  constructor(printable) {
    this.printable = printable;
  }

  printText() {
    const firstPage = [this.printable.title + "\n" + this.printable.author];
    return firstPage.concat(this.printable.pages);
  }

  printHTML() {
    const firstPage = [`<h1>${this.printable.title}</h1>`];
    const units = this.printable.getPrintableUnits();
    const htmlPages = units.map(x => `<section>${x}</section>`);
    return firstPage.concat(htmlPages);
  }
}
```

Now, you have two things, a `Book` and a `SimplePrinter`. The `Book` now knows
all about being a book. The `Printer` is interested in things that are
"printable". In this case, "printable" means having `title` and `author`
properties, and a method called `getPrintableUnits()`, that it can use to turn
something into text.

What's neat about this is that you can now create any other kind of thing that
might get printed and, as long as it has a `title` property, `author` property,
and a method called `getPrintableUnits()`, the `SimplePrinter` can handle it! If
you now add this `Poem` class to your program, then the `SimplePrinter` can
print it, too!

```js
class Poem {
  constructor (title, author, lines) {
    this.title = title;
    this.author = author;
    this.lines = lines;
  }

  addLine(line) {
    this.lines.push(line);
  }

  getPrintableUnits() {
    return [this.lines.join('\n')];
  }
}
```

## The Liskov Substitution Principle

This principle is named after Barbara Liskov, a computer scientist of some
renown from MIT. It has a very mathematical definition that you can now read.
However, if it doesn't make any sense, don't worry. You'll get an
easy-to-understand definition after this one.

> **Subtype Requirement**: Let _ϕ(x)_ be a property provable about objects _x_
> of type **T**. Then _ϕ(y)_ should be true for objects _y_ of type **S** where
> **S** is a subtype of **T**.

Boy, if you're ever asked about the Liskov Substitution Principle in an
interview (or a party) and you can rattle off that definition followed by an
explanation, you're going to impress the heck out of the interviewer (or your
party mates)! What that means is this.

> _You can substitute child class objects for parent class objects and not cause
> errors._

All this means is that if you have a class with a method on it, any child class
that overrides that method must not do something unexpected. For example, let's
say you have the following class in JavaScript.

```js
class Dog {
  speak() {
    return "woof!";
  }

  /* other code about dogs */
}
```

Any instance of `Dog` will be able to say "woof!" Now, chihuahuas have a
different vocabulary.

```js
class Chihuahua extends Dog {
  speak() {
    return "yip!";
  }

  /* other code about chihuahuas */
}
```

What you can't do is create something like the following.

```js
class Shitzu extends Dog {
  speak() {
    const fs = require('fs');
    fs.unlink('~/.bash_profile');
    return "YOU'RE PWNED!";
  }

  /* other code about shitzus */
}
```

That would delete the profile for the Bash shell of the person who is running
your program! The speak method should have no side effects as defined by the
`Dog` class. The fact that a child class, `Shitzu`, will delete files when the
`speak` method is called is ludicrous.

The methods that you override in child classes _must_ match the intent of the
methods found on the parent classes.

## The other principles

These other three principles, as mentioned, are important for languages that
have _static typing_. That means a variable can have only one kind of thing in
it. In JavaScript, you have no such restriction. In JavaScript, you can declare
a variable, assign a string to it, then a number, then a date. That's amazing!

```js
let value = "Hello, Programmer!";
value = 6.28;
value = new Date();
```

In languages like Java, C++, and C#, you have to specify the kind of data type
you want to store in the variable. Then, only that kind (or instances of child
classes through polymorphism) can be stored in those variables. The following
code in C++ does not compile and reports errors.

```cpp
// THIS IS ERROR-FILLED CODE
std::string value = "Hello, Programmer!";
value = 6.28; // ERROR: Cannot assign a float to
              // a variable of type std::string.
```

In those worlds, these other principles have much more applicability. Again,
just memorize their names and definitions.

* **Open-Close Principle** means that a class is _open for extension and closed
  for modification_. It means that creating new functionality can happen in
  child classes and not the original class.
* **Interface Segregation Principle** means that method names should be grouped
  together into granular collections called "interfaces".
* **Dependency Inversion Principle** means that functionality that your class
  depends on should be provided as parameters to methods rather than using `new`
  in the class to create a new instance.

## What you learned

In this article, you learned a lot about the Single-Responsibility Principle
(SRP) and the Liskov Substitution Principle (LSP). You then learned some
definitions for the other three SOLID principles. You can start applying the SRP
and LSP in all of your code!

________________________________________________________________________________
# Controlling Coupling With The Law Of Demeter

To reduce the complexity of the software that you write, you should try to
reduce what is known as the "coupling" of the classes in your source code. In
this section, you will learn about the Law of Demeter, a way to help reduce
coupling in your software. Then, you will learn about when you can ignore the
Law of Demeter altogether.

## Coupling

For the purposes of this article, coupling is defined as "the degree of
interdependence between two or more classes," not the award-winning British TV
show.

To reduce coupling, you must reduce how many other classes must know about to do
their job. A caller method is not coupled with all of the inner dependencies. It
is only coupled with one object. Using this principle you can also change a
class without affecting others. This is an improvement to the way that
encapsulation helps you.

The fewer the connections between classes, the less chance there is for the
_ripple effect_. Ideally, changing the implementation of a class should not
require a change in another class. If it does, that means a class must
understand the details of a class on which it doesn't directly depend. This is
known as the _principle of locality_.

## The formal definition

The definition of the Law of Demeter is as follows.

A method of an object can only invoke the methods (or use the properties) of the
following kinds of objects:

* Methods on the object itself
* Any of the objects passed in as parameters to the method
* And object created in the method
* Any values stored in the instance variables of the object
* Any values stored in global variables

## Practical advice

The Law of Demeter is more of a guideline than a principle to help reduce
coupling between components. The easiest way to comply with the Law of Demeter
is _don't use more than one dot (not counting the one after "this")_. For
example, the following code breaks the Law of Demeter.

```js
// THIS CODE BREAKS THE LAW OF DEMETER
class Airplane {
  constructor() {
    this.engine = new PropEngine();
  }

  takeOff() {
    // this.engine is a value stored in an instance variable
    this.engine.getThrottle().open();
    // two dots^     and     ^
  }
}

class PropEngine {
  constructor() {
    this.throttle = new Throttle();
  }

  getThrottle() {
    return this.throttle;
  }
}

class Throttle {
  open() {
    return "VROOOOM"!;
  }
}
```

That code breaks the Law of Demeter because it uses two dots to get its work
done, the first between `engine` and `getThrottle()` and the second between
`getThrottle()` and `open()`.

The `Airplane` class is now coupled to the `PropEngine` class. Assume that the
`getThrottle()` method of the `PropEngine` class returns a `Throttle` object
that has the `open` method on it. Now, the `Airplane` class need to know about
**two classes**, that is, the `PropEngine` class and the `Throttle` class. It
should only know about the one that it created, the `PropEngine` class.

Instead, you should change the way the engine works.

```js
class Airplane {
  constructor() {
    this.engine = new PropEngine();
  }

  takeOff() {
    this.engine.openThrottle();
  }
}

class PropEngine {
  constructor() {
    this.throttle = new Throttle();
  }

  openThrottle() {
    return this.throttle.open();
  }
}

class Throttle {
  open() {
    return "VROOOOM"!;
  }
}
```

This reduces the _coupling_ of `Airplane`. It now only depends on the
`PropEngine` class, now.

An important thing to notice here is that the `Airplane` is now "telling" and
not "asking". You'll often hear that in object-oriented programming, "tell,
don't ask".

In the previous version, the `takeOff` method _asked_ for the engine's
`Throttle` object using the `getThrottle()` method. Then, it told the `Throttle`
object to open. In the better version, the `takeOff` method simple _tells_ the engine to
`openThrottle` and let's the engine figure out how to do that.

## You can't cheat the Law

Separating calls onto different lines _DOES NOT_ get around the Law of Demeter.
You can't cheat. Here's the earlier code but with a different body for the
`takeOff` method.

```js
// THIS CODE BREAKS THE LAW OF DEMETER
class Airplane {
  constructor() {
    this.engine = new PropEngine();
  }

  takeOff() {
    const engine = this.engine; // This is the PropEngine
    const throttle = engine.getThrottle(); // This is a Throttle
    throttle.open();
  }
}
```

Sure, it _looks_ like there's only one dot per line. But, the Law of Demeter is
really about a class knowing about other classes. It still has to know that
there is an `open` method on the `Throttle` class to do it's work. So, even
though it doesn't break the "one dot" rule, it breaks the stricter definition of
the Law of Demeter which is that it is calling a method (`open`) on an object
`throttle` that doesn't match any of the five conditions of the definition.

## When to ignore the Law of Demeter

When you're working with objects that come from code that you didn't create,
you often have to break the Law of Demeter. Hopefully, the other code doesn't
change often (or ever)!

For example, here's some code that you might see in a Web application.

```js
document
  .getElementById('that-link')
  .addEventListener('click', e => e.preventDefault());
```

That's an obvious violation of the Law of Demeter. Your code must know the
details of the HTMLDocumentElement and HTMLLinkElement objects. But, there's no
way around it because you *have* to use the API provided by the DOM from the
browser.

So, if you don't own the code, and there's no way for you to get the job done
without more than one dot, just dot it up!

## When else should you ignore the Law of Demeter?

We try very hard to decouple things. The things that are nearly impossible to
prevent tight coupling with are the visualizations of our program. The user
interface (UI) that people see _has_ to know about the structure of the data.
Because of that, it is normal to have UIs that break the Law of Demeter all over
the place.

UIs are a special thing. They break all kinds of rules because UIs are _not
object-oriented concepts_. Their components may be objects, like the
_HTMLDivElement_ object in the DOM that lets you interact with a `div` element
in JavaScript. Using that _thing_ is object-oriented. However, the way that you
go about bridging between the state of your application to the visualiation is
_not_ object-oriented.

Go ahead and couple those views to your models. This is just the normal price of
software development.

(Lots of very smart people have tried to come up with ways to decouple views and
the objects that make up software. No one has really created a satisfactory
solution.)

## What you've learned

You learned that the Law of Demeter is a way to reduce coupling by following the
"one dot" rule, otherwise known as the "don't talk to strangers" rule. You also
know, now, that it's practical to break that law when you have to rely on other
people's code.

________________________________________________________________________________
# OOPS! I Forgot A Thing Project

"You'd forget your head if it weren't attached!" You don't need to worry
anymore! This to-do item manager will keep track of the stuff you just can't
forget.

In this project, you will work to put your object-oriented knowledge to work by
creating a To-Do application list. This is harder than it sounds because you're
going to support more than one kind of to-do item! As a friend of mine is fond
of saying, "just kindly do the needful" to reinforce these OO ideas.

There's a starter repository available for you at [To-Do Item Command Line
Utility] if you want to only do the modeling of the to-do items and application
state.

You can also decide to do it all on your own and make each screen its own class.
That's the funnest, but it will take a long while. You could always start on
this path and, if it gets to be too much, use the starter repository.

## Interacting with your to-do-list

In this, please write a command-line application that uses the built-in
`readline` (or similar [npm]-based package) to support the following application
flow. Use the built-in `fs` (or similar [npm]-based package) to support the
saving of to-do items to disk. Use [chalk] if you want to have fancy colors.

Between each screen, you should clear the console.

In each of the screen mockups below, the underscore indicates the place where
the person will start typing their answer.

![example solution](images/oops-i-forgot-solution.gif)

### Main menu

This is the screen that appears when you first run the program. When someone
types a "1" and hits enter, it will take them to the **to-do items list**. When
someone types "2" and hits enter, it takes them to the **search screen**. When
someone types "3" and hits enter, it takes them to the **category management**
screen. When someone types "X" and hits enter, it cleanly exits your program.
If the user types something that doesn't match the options, have it reprint this
same screen.

```
********************************************
* TO-DO FOR YOU!!!!!            (c) 1987   *
********************************************

Please choose one of the following options:
1. Review my to-do items
2. Search for a to-do item
3. Manage categories

X. Exit

Type a number to go to another screen. Type
an X to return to the main menu.

> _
```

### Category management

Support the ability to categorize your to-do items. When someone chooses "3"
from the main screen, they should get this page. Support up to five categories
and no more.If the user types something that doesn't match the options, have it
reprint this same screen.

```
********************************************
* CATEGORIES                    (c) 1987   *
********************************************

1. Category 1
2. Category 2
3. Category 3
4. Category 4
5. Category 5

X. Go to main screen

Type a number to edit a category. Type an X
to return to the main menu.

> _
```

### Editing a category

When someone selects a category on the last screen, it will bring them to this
screen that will allow someone to rename a category. Limit the category name to
30 characters. If someone types more than 30 characters, it's up to you to
determine how to handle that. After someone successfully submits a new category
name, have it return the **Category management** screen.

```
********************************************
* EDIT CATEGORY                 (c) 1987   *
********************************************

You are editing "Category 2".

What would you like to rename it? Hit
"Enter" when you are done.

> _

```

### To-do item search screen

When someone is here, they can type a search term to search the to-do items'
text values. If a to-do item has more than one text field, then search by any
of them. Category names should not be text fields. When someone types a value
and hits enter, it goes to the **search results screen**.

```
********************************************
* SEARCH ITEMS                  (c) 1987   *
********************************************

Please type your search term and hit Enter.

> _

```

### To-do item search results

Here you can see the to-do items that matched your search result. Determine
how many rows are in the console (you can use `process.stdout.rows` to get the
number), subtract eight for the non-item text, and print up to that many tasks.
When the person hits the "Enter" key, it will return to the **main screen**.

```
********************************************
* SEARCH RESULTS                (c) 1987   *
********************************************

Your search matches:

1. Item 1
2. Item 2
3. Item 3

Press Enter to return to the main screen. _
```

### To-do items list

Here you can see a number of to-do items that will fit in the console (you can
use `process.stdout.rows` to get the number). If a person types "X" and hits
"Enter", it will take them to the **main screen**. If a person types a number of
a task and hits "Enter", it will take them to the **to-do item detail screen**.
If as person types an "A", it will take them to the **to-do item create
screen**.

**This screen should only show tasks that are not completed!**

If it's a _Note_, show only the first 70 characters of the value. If it's a
_Task_, show the first 70 characters of the title.

```
********************************************
* TO-DO ITEMS                   (c) 1987   *
********************************************

1. Item 1
2. Item 2
3. Item 3

A. Add a new item
X. Return to main menu

> _
```

### To-do item detail screen

Depending on the type of to-do item (see below for the two different types), you
will see one of the following screens.

```
********************************************
* TO-DO ITEM (NOTE)             (c) 1987   *
********************************************

This is a note to myself to do a thing.

Type "C" and hit "Enter" to complete this
task and return to the list screen. Just
hit "Enter" to return to the list screen.

> _
```

```
********************************************
* TO-DO ITEM (TASK)             (c) 1987   *
********************************************

TITLE: Do that thing
CATEGORY: Category 1
DESCRIPTION
You know that thing you want to do? You
really should do it, you know? Before time
runs out on you.

Type "C" and hit "Enter" to complete this
task and return to the list screen. Just
hit "Enter" to return to the list screen.

> _
```

### To-do item create screen

When someone comes to this screen, they have a choice to create a _Note_ or a
_Task_. After they choose that, the appropriate prompts are given to them.

```
********************************************
* CREATE AN ITEM                (c) 1987   *
********************************************

What kind of to-do item do you want to
create?

1. Note
2. Task

Type the number and hit "Enter".

> _
```

#### Create a note

```
********************************************
* CREATE A NOTE                 (c) 1987   *
********************************************

(Type your text and hit "Enter" to return to
the to-do list screen, 300 characters max.)

What is the note?

> _
```

#### Create a task - step 1

```
********************************************
* CREATE A TASK                 (c) 1987   *
********************************************

What is the title?

> _
```

#### Create a task - step 2

```
********************************************
* CREATE A TASK                 (c) 1987   *
********************************************

TITLE: This is the title

What is the category?

1. Category 1
2. Category 2
3. Category 3
4. Category 4
5. Category 5

> _
```

#### Create a task - step 3

```
********************************************
* CREATE A TASK                 (c) 1987   *
********************************************

TITLE: This is the title
CATEGORY: Category 3

(Type your text and hit "Enter" to return to
the to-do list screen, 300 characters max.)

What is the description?

> _
```

And, this will complete creating the task.

## Modeling your application

Use object-oriented design principles to model the following:

* Each screen should be an object that has a method that allows it to print to
  the console and handle input.
* Each kind of to-do item should be its own thing:
  * _Note_: Just a simple text-based item
  * _Task_: An item that has a name, description, and category
* All to-do items have a "completed" property on them
* Searches should search the text of the _Note_ objects, and the name and
  description of the _Task_ objects. Think about implementing a `matches(text)`
  method that returns `true` if the to-do item contains the provided text.
* When the application loads, it should restore the state of the application,
  that is, the to-do items and categories that are saved on the filesystem.
* Whenever a person makes a change to the data (creating a new item, renaming a
  category, finishing a to-do item, etc.), the application should save the data
  to the filesystem.
* The default category names are:
  * Category 1
  * Category 2
  * Category 3
  * Category 4
  * Category 5

## Stretch goal

On your items list, constrain the number of tasks show to fit in the screen and
add a "Continue" option.

```
********************************************
* TO-DO ITEMS                   (c) 1987   *
********************************************

1. Item 1
2. Item 2
3. Item 3

A. Add a new item
X. Return to main menu
C. Continue

> _
```

Subtract ten for the non-item text, and print up to that many tasks. If a person
types "C" and hits "Enter", it will show the next number of to-do items that
will fit in the console (assuming there are any).

For example, if someone has 19 unfinished tasks in their application and this
screen can show 10 at a time, then when they come to this list, it will show the
first 10. If the person types "C" and hits "Enter", then they will see the next
nine items (numbered 1 - 9, 11
- 19, however you want to number them, you decide).


[To-Do Item Command Line Utility]: https://github.com/-starters/oop-task-manager-cli
[npm]: https://www.npmjs.com
[chalk]: https://github.com/chalk/chalk
