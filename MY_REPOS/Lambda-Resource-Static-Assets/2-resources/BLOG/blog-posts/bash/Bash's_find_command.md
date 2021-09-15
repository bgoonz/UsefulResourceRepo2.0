# Bash's find command

> The find command in bash is quite powerful, and knowing the basics might save
you some scripting.
What does it do? It “finds” files. By default, it outputs their path relative to
where you ran find. But, in addition of providing you with advanced “filters”
it actually allows you to run commands on each of those files.

The `find` command in bash is quite powerful, and knowing the basics might save you some scripting.

What does it do? It “finds” files. By default, it outputs their path relative to where you ran `find`. But, in addition of providing you with advanced “filters” it actually allows you to run commands on each of those files.

### The basics

With this structure:

    .
    ├── app
    │   ├── index.html
    │   ├── app.js
    │   └── style.css
    └── dist
        ├── app.js
        ├── index.html
        └── style.css
    

    $ find
    .
    ./app
    ./app/app.js
    ./app/index.html
    ./app/style.css
    ./dist
    ./dist/app.js
    ./dist/index.html
    ./dist/style.css
    

It lists every folder and files recursively.

You can specify a path to find items in, like so:

    $ find app
    app
    app/index.html
    app/script
    app/script/app.js
    app/style
    app/style/style.css
    

### Tests (filters)

Some of `find`'s power comes from it's ability to _filter_ which files and folder it “selects”. They are called _tests_. So, here are some of them:

#### `-type`

    $ find -type f
    ./app/app.js
    ./app/index.html
    ./app/style.css
    ./dist/app.js
    ./dist/index.html
    ./dist/style.css
    $ find -type d
    .
    ./app
    ./dist
    

Here, the filter is `-type`. You guessed it, `-type f` selects files, and `-type d` selects directories. [More about `-type`](https://www.gnu.org/software/findutils/manual/html_mono/find.html#Type)

#### `-name`

    $ find -name "*.js"
    ./app/app.js
    ./dist/app.js
    $ find -name "*.JS"
    $ find -iname "*.JS"
    ./app/app.js
    ./dist/app.js
    

`-name` takes a glob. The `-iname` variant is case insensitive. [More about `-name`](https://www.gnu.org/software/findutils/manual/html_mono/find.html#Base-Name-Patterns)

#### `-path`

This is the exact same as name, except that it doesn't only apply on the filename, but the whole path (the path that would be outputted). Unlike `-path` though, `*` will match both `/` and leading dots in filename

Same, you have `-ipath` for a case _insensitive_ version of it. [More about `-path`](https://www.gnu.org/software/findutils/manual/html_mono/find.html#Full-Name-Patterns)

Note: `-wholename` is the same as `-path`, but `-path` is more portable.

### Combining test – operators

Every expression returns a value except operators. A test returns true if it matches the current file (`-name "*.js"` returns true for `app.js`, but not `index.html`). You can conjugate everything with operators.

Every operators only applies to the next expression. So, `expr1 or expr2 and expr3` is the same as `(expr1 or expr2) and expr3`.

#### `-and`

    $ find -name "*.js" -type f
    ./app/app.js
    ./dist/app.js
    

Pretty straight forward, right? You select items that finish with `.js` _and_ that are file. You can guess the operator `-and` is the default one. Therefore `find -name "*.js" -and -type f` is the exact same!

#### `-or`

What if you want `.js` and `.css` files? You can use the `-or` operator:

    $ find -name "*.js" -or -name "*.css" -type f
    ./app/app.js
    ./app/style.css
    ./dist/app.js
    ./dist/style.css
    

Again, this is the same as `find -name "*.js" -or -name "*.css" -and -type f`.

#### `-not`

If you want every files that do _not_ end with `.js`, you can do:

    $ find -not -name "*.js" -type f
    ./app/index.html
    ./app/style.css
    ./dist/index.html
    ./dist/style.css
    

#### Grouping

Of course, you can group expressions together. Here, we find every file that finishes by `.js` or any directories.

    $ find \( -name "*.js" -type f \) -or -type d
    .
    ./app
    ./app/script
    ./app/script/app.js
    ./app/style
    ./dist
    ./dist/app.js
    

Thanks to bash (😡), you have to escape the brackets.

#### Comma `,`

Separates 2 expressions: it evaluates both of them, but only returns the value of the second one.

    $ find -name "whatever" , -name "*.html"
    ./app/index.html
    ./dist/index.html
    

#### Aliases

You can use some aliases, although I don't recommend doing so, they aren't as clear:

    -o = -or
    -a = -and
    ! = -not (you'll need to escape it though, like so \!)
    

[More about operators](https://www.gnu.org/software/findutils/manual/html_mono/find.html#Combining-Primaries-With-Operators)

### Actions

Now, printing out the filenames if fun, doing some stuff with them is even better! And guess why it actually prints out the filenames: because the default action is `-print`!

    $ find -type f -print
    ./app/app.js
    ./app/index.html
    ./app/style.css
    ./dist/app.js
    ./dist/index.html
    ./dist/style.css
    

It's exactly what you'd expect, right?

Note: Just as the tests, actions **return a value** too. Remember this.

#### `-delete`

`-delete` is a pretty useful action. Guess what it does: deletes files (watch out though: it doesn't throw what it deletes to the bin, it _actually_ deletes them, like `rm`).

If you want to delete every temporary file created by vim (files that end with `~`), you can just run this:

    $ find -name "*~" -delete
    

Gone! Every temp files are gone!

What I recommend you do before this is run just `find -name "*~"` so that you see which file are going to be deleted.

#### `-exec`

If you want to do some more complex things though, you might want to use the action `-exec`.

This action takes an undefined number of parameters representing a command that it's going to run on _every_ selected files. It stops “consuming” arguments as soon as it sees a `;`. Note that `{}` will be replace with file's path. So,

    $ find -name "*~" -delete
    $ # does the same thing as
    $ find -name "*~" -exec rm {} \;
    

Note: as you can see, we need to escape the `;` to prevent bash from interpreting it.

`-delete` is more efficient though, and more secure. Use it when you can.

##### Optimizing

It's better to run one command on multiple files than multiple commands on one file each time. For example, the first one is better:

    $ rm 1.jpg 2.jpg 3.jpg
    

    $ rm 1.jpg
    $ rm 2.jpg
    $ rm 3.jpg
    

Of course, the ability to do that depends on the command, but `find` gives you the possibility of doing that in your `-exec` actions.

Note: It'll automatically adapt to the maximum command line length of your system.

In order to do that, you have to use `{} +`, like so:

    $ find -name "*~" -exec rm {} +
    

In this case `{} +` will be replaced by as many paths as the maximum command line length of your system allows.

Note that `{} +` has to be at the _end_ of the command. [More about optimizing](https://www.gnu.org/software/findutils/manual/html_mono/find.html#Multiple-Files)

### Tips and tricks

#### `-maxdepth`

> Descend at most levels (a non-negative integer) levels of directories below the command line arguments. ‘-maxdepth 0’ means only apply the tests and actions to the command line arguments.

#### `-depth`

The `-depth` option makes `find` list folders’ _content_ before itself.

Note: the `-delete` action implies `-depth`

Examples are shown in the `-prune` explanation.

#### `-prune`

The `-prune` action allows you to prevent `find` from going into a directory that matches some tests. Weirdly enough though, it returns `true` when it found a directory to ignore. For example:

    $ find -name "app" -prune
    ./app
    

So, it only lists directories that it ignores. To counter that, just add `-or -print`

    $ find -name "app" -prune -or -print
    .
    ./dist
    ./dist/app.js
    ./dist/index.html
    ./dist/style.css
    

> Hold on a sec… `-or`? But `-prune` would return false when it looks at `./app/app.js` for example, why doesn't it print then?

No, because `-prune` **excludes** the directory, remember. So, `./app/app.js` **never** gets looked at.

##### Gotcha

The problem is that it doesn't play well with `-depth`. It actually doesn't work, have a look:

    $ find -depth -name "app" -prune -or -print
    ./app/index.html
    ./app/script/app.js
    ./app/script
    ./app/style/style.css
    ./app/style
    ./dist/app.js
    ./dist/index.html
    ./dist/style.css
    ./dist
    .
    

It doesn't have the time to “prune” the directory since we start from the bottom.

Remember: `-delete` implies `-depth`. Therefore, DO NOT USE `-prune` with `-delete`. Instead, “prune” it manually with `-path`:

    $ find -depth -not -path "*app*"
    ./dist/index.html
    ./dist/style.css
    ./dist
    .
    

Ok, I guess that's it! If you want to learn even more, have a look at the [documentation](https://www.gnu.org/software/findutils/manual/html_mono/find.html).

Hope it'll save you some time. If it does, please share this post!


[Source](https://math2001.github.io/article/bashs-find-command/)